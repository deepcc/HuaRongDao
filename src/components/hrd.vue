<template>
  <div class="hrd">
    <div class="hrd-box" @mouseout="mouseoutFn">
        <!-- v-bind:class="{w1h1:item.classname=='w1h1',w1h2:item.classname=='w1h2,w2h2:item.classname=='w2h2',w2h1:item.classname=='w2h1'}"  -->
        <div v-for="(item,i) in hrdObj"
            :class="['checker', ('w'+item.w+'h'+item.h)]" 
            :id="'id'+(i+1)"
            @mouseover="checkerOverFn(item)">
            {{hrdNameArr[i]}}
            <div :class="['btns',item.f]"  v-if="item.f">
                <span class="top" @click="btnFn((i+1),'top')">↑</span>
                <span class="bottom" @click="btnFn((i+1),'bottom')">↓</span>
                <span class="left" @click="btnFn((i+1),'left')">←</span>
                <span class="right" @click="btnFn((i+1),'right')">→</span>
            </div>
        </div>

    </div>
    <div class="btn-list">
<el-row>
  <el-button @click.native="backFn()" :disabled="!record.length">后退</el-button>
  <el-button @click.native="frontFn()" :disabled="!backRecord.length">前进</el-button>
  <el-button type="primary" @click.native="restartFn()">重新开始</el-button>
  <el-button type="success" :disabled="!(checkerboardInit.join()==checkerboard.join())" @click.native="autoFn(autoArr)">自动运行</el-button>
</el-row>
        <!-- <button class="back">后退</button>
        <button class="front">前进</button>
        <button class="restart">重新开始</button>
        <button class="auto">自动</button> -->
    </div>
  </div>
</template>

<script>
    import $ from 'jquery'
    
    
    export default {
        // el: '.hrd', 
        name: 'HelloWorld',
        data() {
            return {

                hrdNameArr:['张飞', '曹操', '马超', '关羽', '黄忠', '赵云', '兵', '兵', '兵', '兵' ],
                hrdObjInit:[],
                hrdObj: [{
                    top: 0,
                    left: 0,
                    w: 1,
                    h: 2,
                    f: 0
                }, {

                    top: 0,
                    left: 1,
                    w: 2,
                    h: 2,
                    f: 0
                }, {
                    top: 0,
                    left: 3,
                    w: 1,
                    h: 2,
                    f: 0
                }, {
                    top: 2,
                    left: 1,
                    w: 2,
                    h: 1,
                    f: 0
                }, {
                    top: 2,
                    left: 0,
                    w: 1,
                    h: 2,
                    f: 0
                }, {
                    top: 2,
                    left: 3,
                    w: 1,
                    h: 2,
                    f: 0
                }, {
                    top: 3,
                    left: 1,
                    w: 1,
                    h: 1,
                    f: 0
                }, {

                    top: 3,
                    left: 2,
                    w: 1,
                    h: 1,
                    f: 0
                }, {

                    top: 4,
                    left: 0,
                    w: 1,
                    h: 1,
                    f: 0
                }, {

                    top: 4,
                    left: 3,
                    w: 1,
                    h: 1,
                    f: 0
                }],
                timeF: null,
                // 初始化
                checkerboardInit: [],
                checkerboard: [
                    [1, 1, 1, 1],
                    [1, 1, 1, 1],
                    [1, 1, 1, 1],
                    [1, 1, 1, 1],
                    [1, 0, 0, 1]
                ],
                autoArrInit:[],
                autoArr: [
                    ["id10", "left"],
                    ["id6", "bottom"],
                    ["id4", "right"],
                    ["id7", "bottom"],
                    ["id5", "right"],
                    ["id9", "top"],
                    ["id7", "left"],
                    ["id5", "bottom"],
                    ["id4", "left"],
                    ["id4", "left"],
                    ["id8", "top"],
                    ["id8", "right"],
                    ["id10", "top"],
                    ["id10", "top"],
                    ["id5", "right"],
                    ["id9", "right"],
                    ["id9", "bottom"],
                    ["id4", "bottom"],
                    ["id10", "left"],
                    ["id10", "left"],
                    ["id8", "left"],
                    ["id8", "left"],
                    ["id5", "top"],
                    ["id6", "top"],
                    ["id9", "right"],
                    ["id9", "right"],
                    ["id7", "right"],
                    ["id7", "right"],
                    ["id4", "bottom"],
                    ["id8", "bottom"],
                    ["id8", "left"],
                    ["id5", "left"],
                    ["id6", "left"],
                    ["id3", "bottom"],
                    ["id3", "bottom"],
                    ["id2", "right"],
                    ["id1", "right"],
                    ["id10", "top"],
                    ["id10", "top"],
                    ["id8", "top"],
                    ["id8", "top"],
                    ["id5", "left"],
                    ["id1", "bottom"],
                    ["id1", "bottom"],
                    ["id2", "left"],
                    ["id3", "top"],
                    ["id3", "top"],
                    ["id6", "right"],
                    ["id7", "top"],
                    ["id7", "top"],
                    ["id9", "left"],
                    ["id9", "top"],
                    ["id4", "right"],
                    ["id4", "right"],
                    ["id5", "bottom"],
                    ["id1", "bottom"],
                    ["id7", "left"],
                    ["id7", "left"],
                    ["id2", "bottom"],
                    ["id10", "right"],
                    ["id10", "right"],
                    ["id8", "top"],
                    ["id8", "right"],
                    ["id7", "top"],
                    ["id7", "top"],
                    ["id5", "top"],
                    ["id5", "top"],
                    ["id1", "left"],
                    ["id9", "left"],
                    ["id9", "bottom"],
                    ["id2", "bottom"],
                    ["id10", "bottom"],
                    ["id10", "left"],
                    ["id3", "left"],
                    ["id6", "top"],
                    ["id6", "top"],
                    ["id2", "right"],
                    ["id10", "bottom"],
                    ["id8", "bottom"],
                    ["id7", "right"],
                    ["id5", "top"],
                    ["id1", "top"],
                    ["id9", "left"],
                    ["id10", "bottom"],
                    ["id10", "bottom"],
                    ["id2", "left"],
                    ["id6", "bottom"],
                    ["id6", "bottom"],
                    ["id3", "right"],
                    ["id7", "right"],
                    ["id8", "right"],
                    ["id5", "right"],
                    ["id1", "top"],
                    ["id1", "top"],
                    ["id2", "left"],
                    ["id8", "bottom"],
                    ["id8", "bottom"],
                    ["id7", "bottom"],
                    ["id7", "bottom"],
                    ["id3", "left"],
                    ["id6", "top"],
                    ["id6", "top"],
                    ["id8", "right"],
                    ["id8", "top"],
                    ["id4", "top"],
                    ["id10", "right"],
                    ["id10", "right"],
                    ["id9", "right"],
                    ["id9", "right"],
                    ["id2", "bottom"],
                    ["id7", "left"],
                    ["id7", "left"],
                    ["id8", "left"],
                    ["id8", "left"],
                    ["id4", "top"],
                    ["id9", "top"],
                    ["id9", "right"],
                    ["id2", "right"]
                ],


                record: [], // 历史记录
                backRecord: [], // 后退记录
                pointer: -1,
                // 撤销用
                moveObj: {
                    'top': 'bottom',
                    'bottom': 'top',
                    'left': 'right',
                    'right': 'left'
                },
                unit: 100,
                htmlArr: ['<span class="top">↑</span>', '<span class="bottom">↓</span>', ],
                htmlObj: {
                    'top': ' showtop',
                    'bottom': ' showbottom',
                    'left': ' showleft',
                    'right': ' showright'
                },
                html: '<span class="top">↑</span>\
                    <span class="bottom">↓</span>\
                    <span class="left">←</span>\
                    <span class="right">→</span>'

            }
        },
        created:function(){
            var o = {}
            var s=''
            o.a=this.hrdObj
            o.b=this.autoArr
            o.c=this.checkerboard

            s=JSON.stringify(o)
            this.hrdObjInit=JSON.parse(s).a
            this.autoArrInit=JSON.parse(s).b
            this.checkerboardInit=JSON.parse(s).c
            console.log('this.hrdObjInit',this.hrdObjInit)
        },
        methods: {
            /* 自动运行 */
            autoFn(autoArr2) {
                var a = autoArr2.shift()
                console.log(a,autoArr2)
                var id = a[0].replace(/id/, '')
                var move = a[1]
                var _this = this;
                _this.btnFn(id, move)
                console.log(autoArr2.length)
                if (!autoArr2.length) {
                    return;
                }
                this.timeAuto = setTimeout(function() {
                    _this.autoFn(autoArr2)
                }, 300);
            },

            /* 重新开始 */
            restartFn() {
                clearTimeout(this.timeAuto)
                this.record = []; // 历史记录
                this.backRecord = []; // 后退记录
                this.pointer = -1;

                var o = {}
                var s=''
                o.a=this.hrdObjInit
                o.b=this.autoArrInit
                o.c=this.checkerboardInit
                s=JSON.stringify(o)
                this.hrdObj=JSON.parse(s).a
                this.autoArr=JSON.parse(s).b
                this.checkerboard=JSON.parse(s).c
                // console.log('this.hrdObj',this.hrdObj)
                // console.log('this.autoArr',this.autoArr)
                // console.log('this.checkerboardInit')
                // console.log(this.checkerboardInit)
                // console.log('this.checkerboard')
                // console.log(this.checkerboard)
                $('#id1').css({
                    top: 0,
                    left: 0
                })
                $('#id2').css({
                    top: 0,
                    left: '100px'
                })
                $('#id3').css({
                    top: 0,
                    left: '300px'
                })
                $('#id4').css({
                    top: '200px',
                    left: '100px'
                })
                $('#id5').css({
                    top: '200px',
                    left: '000px'
                })
                $('#id6').css({
                    top: '200px',
                    left: '300px'
                })
                $('#id7').css({
                    top: '300px',
                    left: '100px'
                })
                $('#id8').css({
                    top: '300px',
                    left: '200px'
                })
                $('#id9').css({
                    top: '400px',
                    left: '000px'
                })
                $('#id10').css({
                    top: '400px',
                    left: '300px'
                })
            },
            /* 后退按钮 */
            backFn() {
                if (this.record.length == 0) {
                    return
                }
                if (this.pointer == -1) {
                    this.pointer = this.record.length - 1
                }
                var id = this.record[this.pointer][0]
                var move = this.record[this.pointer][1]
                this.btnFn(id, this.moveObj[move], 'm')
                this.backRecord.push(this.record.pop())
                this.pointer--;
                console.log(this.backRecord)

            },

            /* 前进按钮 */
            frontFn() {

                if (this.backRecord.length==0) {
                    return
                }
                this.pointer++;
                console.log(this.pointer)
                var a = this.backRecord.pop()
                var id = a[0]
                var move = a[1]
                this.btnFn(id, move, 'f')

            },
            /* 棋子移动 */
            btnFn(id, move, m) {
                var $div = $('#id' + id)
                var unit = this.unit
                var t = this.hrdObj[id - 1]
                var w = t.w;
                var h = t.h;
                var top = t.top;
                var left = t.left;

                console.log(id, top,left)
                var csstop = t.top * this.unit;
                var cssleft = t.left * this.unit;

                // console.log(this.checkerboard)
                var _this = this;
                if(m==undefined){
                    this.backRecord=[]
                }
                function btnMoveFn(num, orient) {
                    if (orient == 'left' || orient == 'right') {
                        _this.hrdObj[id - 1].left = num
                        $div.css('left', (num) * (unit))
                    } else {
                        _this.hrdObj[id - 1].top = num
                        $div.css('top', (num) * (unit))
                    }

                    if (m != 'm') {
                        _this.pointer = _this.record.length
                        _this.record.push([id, orient])
                    }

                }
                if (move == ('right')) {
                    if (w == 1 && h == 1) {
                        if (this.checkerboard[top][left + 1] === 0) {
                            // console.log(111)
                            this.checkerboard[top][left] = 0
                            this.checkerboard[top][left + 1] = 1
                            btnMoveFn(left + 1, 'right')
                        }
                    } else if (w == 1 && h == 2) {
                        if (this.checkerboard[top][left + 1] == 0 && this.checkerboard[top + 1][left + 1] == 0) {
                            this.checkerboard[top][left] = 0
                            this.checkerboard[top + 1][left] = 0
                            this.checkerboard[top][left + 1] = 1
                            this.checkerboard[top + 1][left + 1] = 1
                            btnMoveFn(left + 1, 'right')
                        }

                    } else if (w == 2 && h == 2) {
                        if (this.checkerboard[top][left + 2] == 0 && this.checkerboard[top + 1][left + 2] == 0) {
                            this.checkerboard[top][left] = 0
                            this.checkerboard[top + 1][left] = 0
                            this.checkerboard[top][left + 2] = 1
                            this.checkerboard[top + 1][left + 2] = 1
                            btnMoveFn(left + 1, 'right')
                        }
                    } else if (w == 2 && h == 1) {
                        if (this.checkerboard[top][left + 2] == 0) {
                            this.checkerboard[top][left] = 0
                            this.checkerboard[top][left + 2] = 1
                            btnMoveFn(left + 1, 'right')
                        }

                    }
                }
                if (move == ('left')) {
                    if (w == 1 && h == 1) {
                        if (this.checkerboard[top][left - 1] == 0) {
                            this.checkerboard[top][left] = 0
                            this.checkerboard[top][left - 1] = 1
                            btnMoveFn(left - 1, 'left')
                        }
                    } else if (w == 1 && h == 2) {
                        if (this.checkerboard[top][left - 1] == 0 && this.checkerboard[top + 1][left - 1] == 0) {
                            this.checkerboard[top][left] = 0
                            this.checkerboard[top + 1][left] = 0
                            this.checkerboard[top][left - 1] = 1
                            this.checkerboard[top + 1][left - 1] = 1
                            btnMoveFn(left - 1, 'left')
                        }

                    } else if (w == 2 && h == 2) {
                        if (this.checkerboard[top][left - 1] == 0 && this.checkerboard[top + 1][left - 1] == 0) {
                            this.checkerboard[top][left + 1] = 0
                            this.checkerboard[top + 1][left + 1] = 0
                            this.checkerboard[top][left - 1] = 1
                            this.checkerboard[top + 1][left - 1] = 1
                            btnMoveFn(left - 1, 'left')
                        }
                    } else if (w == 2 && h == 1) {
                        if (this.checkerboard[top][left - 1] == 0) {
                            this.checkerboard[top][left + 1] = 0
                            this.checkerboard[top][left - 1] = 1
                            btnMoveFn(left - 1, 'left')
                        }

                    }
                }
                if (move == ('top')) {
                    if (w == 1 && h == 1) {
                        if (this.checkerboard[top - 1] && this.checkerboard[top - 1][left] == 0) {
                            this.checkerboard[top][left] = 0
                            this.checkerboard[top - 1][left] = 1
                            btnMoveFn(top - 1, 'top')

                        }
                    } else if (w == 1 && h == 2) {
                        if (this.checkerboard[top - 1] && this.checkerboard[top - 1][left] == 0) {
                            this.checkerboard[top + 1][left] = 0
                            this.checkerboard[top - 1][left] = 1
                            btnMoveFn(top - 1, 'top')
                        }

                    } else if (w == 2 && h == 2) {
                        if (this.checkerboard[top - 1] && this.checkerboard[top - 1][left] === 0 && this.checkerboard[top - 1][left + 1] === 0) {
                            this.checkerboard[top + 1][left] = 0
                            this.checkerboard[top + 1][left + 1] = 0
                            this.checkerboard[top - 1][left] = 1
                            this.checkerboard[top - 1][left + 1] = 1
                            btnMoveFn(top - 1, 'top')
                        }
                    } else if (w == 2 && h == 1) {
                        if (this.checkerboard[top - 1] && this.checkerboard[top - 1][left] === 0 && this.checkerboard[top - 1][left + 1] === 0) {
                            this.checkerboard[top][left] = 0
                            this.checkerboard[top][left + 1] = 0
                            this.checkerboard[top - 1][left] = 1
                            this.checkerboard[top - 1][left + 1] = 1
                            btnMoveFn(top - 1, 'top')
                        }

                    }
                }
                if (move == ('bottom')) {
                    // console.log(this.checkerboard[top + 1][left])
                    //     // console.log(csstop + unit)
                    // console.log(top, left)
                    if (w == 1 && h == 1) {
                        if (this.checkerboard[top + 1][left] === 0) {
                            this.checkerboard[top][left] = 0
                            this.checkerboard[top + 1][left] = 1

                            btnMoveFn(top + 1, 'bottom')

                        }
                    } else if (w == 1 && h == 2) {
                        if (this.checkerboard[top + 2][left] === 0) {
                            this.checkerboard[top][left] = 0
                            this.checkerboard[top + 2][left] = 1
                            btnMoveFn(top + 1, 'bottom')
                        }

                    } else if (w == 2 && h == 2) {
                        if (this.checkerboard[top + 2][left] === 0 && this.checkerboard[top + 2][left + 1] === 0) {
                            this.checkerboard[top][left] = 0
                            this.checkerboard[top][left + 1] = 0
                            this.checkerboard[top + 2][left] = 1
                            this.checkerboard[top + 2][left + 1] = 1
                            btnMoveFn(top + 1, 'bottom')
                        }
                    } else if (w == 2 && h == 1) {
                        if (this.checkerboard[top + 1][left] === 0 && this.checkerboard[top + 1][left + 1] === 0) {
                            this.checkerboard[top][left] = 0
                            this.checkerboard[top][left + 1] = 0
                            this.checkerboard[top + 1][left] = 1
                            this.checkerboard[top + 1][left + 1] = 1
                            btnMoveFn(top + 1, 'bottom')
                        }

                    }

                    // console.log('bottom')
                }
                // console.log(this.checkerboard)
                // console.log(this.record)
            },

            htmlFn(o) {
                // console.log(o)
                // console.log(this.checkerboard)
                    // $(_this).siblings().removeClass('on').find('span').remove()
                    // var $div = $(_this)
                    // var w = $div.data('w');
                    // var h = $div.data('h');
                    // var top = $div.data('top');
                    // var left = $div.data('left');
                var w = o.w;
                var h = o.h;
                var top = o.top;
                var left = o.left;
                var html = ''
                    // o.f = 1
                for (let i = 0; i < this.hrdObj.length; i++) {
                    this.hrdObj[i].f = 0;
                }
                if (w == 1 && h == 1) {

                    if (this.checkerboard[top][left + 1] === 0) {
                        html += this.htmlObj.right
                    }
                    if (this.checkerboard[top][left - 1] === 0) {
                        html += this.htmlObj.left
                    }
                    if (this.checkerboard[top - 1] && this.checkerboard[top - 1][left] === 0) {
                        html += this.htmlObj.top
                    }
                    if (this.checkerboard[top + 1] && this.checkerboard[top + 1][left] === 0) {
                        html += this.htmlObj.bottom
                    }
                } else if (w == 1 && h == 2) {

                    if (this.checkerboard[top][left + 1] === 0 && this.checkerboard[top + 1][left + 1] === 0) {
                        html += this.htmlObj.right
                    }
                    if (this.checkerboard[top][left - 1] === 0 && this.checkerboard[top + 1][left - 1] === 0) {
                        html += this.htmlObj.left
                    }
                    if (this.checkerboard[top - 1] && this.checkerboard[top - 1][left] === 0) {
                        html += this.htmlObj.top
                    }
                    if (this.checkerboard[top + 2] && this.checkerboard[top + 2][left] === 0) {
                        html += this.htmlObj.bottom
                    }

                } else if (w == 2 && h == 2) {


                    if (this.checkerboard[top][left + 2] === 0 && this.checkerboard[top + 1][left + 2] === 0) {
                        html += this.htmlObj.right
                    }
                    if (this.checkerboard[top][left - 1] === 0 && this.checkerboard[top + 1][left - 1] === 0) {
                        html += this.htmlObj.left
                    }
                    if (this.checkerboard[top - 1] && this.checkerboard[top - 1][left] === 0 && this.checkerboard[top - 1][left + 1] === 0) {
                        html += this.htmlObj.top
                    }
                    if (this.checkerboard[top + 2] && this.checkerboard[top + 2][left] === 0 && this.checkerboard[top + 2][left + 1] === 0) {
                        html += this.htmlObj.bottom
                    }
                } else if (w == 2 && h == 1) {
                    if (this.checkerboard[top][left + 2] === 0) {
                        html += this.htmlObj.right
                    }
                    if (this.checkerboard[top][left - 1] === 0) {
                        html += this.htmlObj.left
                    }
                    if (this.checkerboard[top - 1] && this.checkerboard[top - 1][left] === 0 && this.checkerboard[top - 1][left + 1] === 0) {
                        html += this.htmlObj.top
                    }
                    if (this.checkerboard[top + 1] && this.checkerboard[top + 1][left] === 0 && this.checkerboard[top + 1][left + 1] === 0) {
                        html += this.htmlObj.bottom
                    }

                }
                o.f = html
                    // if (!$(_this).find('.btns').length || !(html == $(_this).find('.btns').html())) {
                    //     html = '<div class="btns">' + html + '</div>'
                    //     $(_this).addClass('on')
                    //     $(_this).find('.btns').remove()
                    //     $(_this).append(html)
                    // }
            },
            checkerOverFn(_t) {
                // console.log('mouseover')
                clearTimeout(this.timeF)
                this.htmlFn(_t)

                var top = _t.top;
                var left = _t.left;

                console.log( top,left)
            },

            // var this.timeF = null
            spanOverFn() {
                clearTimeout(this.timeF)
            },
            mouseoutFn() {
                for (let i = 0; i < this.hrdObj.length; i++) {
                    this.hrdObj[i].f = 0
                }
            },
            checkerOutFn() {
                console.log('mouseout')
                var $div = $(this)
                clearTimeout(this.timeF)

                this.timeF = setTimeout(function() {
                    $div.removeClass('on').find('span').remove()
                }, 500);

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" >
body{
        background: #F2EFE6;
}
    .hrd-box {
        position: relative;
        width: 402px;
        height: 502px;margin: auto;
        /* background: #edd0be; */
        background: #f8f8f8;
        border: 4px solid #ff3e3e
    }
    .btn-list{margin: 20px;}
    .btn-list button{padding:10px 25px;    border-radius: 5px;}
    .hrd-box .checker.on {
        z-index: 22
    }
    
    .hrd-box .checker {
        position: absolute;
        background: #24c6fc;
    border: 1px solid #f8f8f8;
        text-align: center;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #fff;
        transition: top 0.6s, left 0.6s;
    }
    
    .hrd-box .checker .btns {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    
    .hrd-box .checker span {
        display: none;
        border: #ff0 100% solid;
        /* border-radius: 40% 50% 50% 40%; */
        font-weight: bold;
        transition: opacity 0.6s;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        background: rgb(230, 200, 152);
        width: 100%;
        height: 50px;
        cursor: pointer;
    }
    
    .hrd-box .checker .showtop span.top {
        display: flex;
        border-radius:  70% 70%  0 0;
    }
    
    .hrd-box .checker .showbottom span.bottom {
        display: flex;
        border-radius:   0 0 70% 70%;
    }
    
    .hrd-box .checker .showleft span.left {
        display: flex;
        border-radius: 70%  0 0 70% ;
    }
    
    .hrd-box .checker .showright span.right {
        display: flex;
        border-radius:  0 70% 70% 0 ;
    }
    
    .hrd-box .checker span.top {
        top: -50px;
    }
    
    .hrd-box .checker span.bottom {
        bottom: -50px;
    }
    
    .hrd-box .checker span.left {
        left: -50px;
        height: 100%;
        top: 0;
        width: 50px;
    }
    
    .hrd-box .checker span.right {
        right: -50px;
        top: 0;
        height: 100%;
        width: 50px;
    }
    
    .w1h2 {
        height: 201px;
        width: 101px;
    }
    
    .w1h1 {
        height: 101px;
        width: 101px;
    }
    
    .w2h2 {
        width: 201px;
        height: 201px;
    }
    
    .w2h1 {
        width: 201px;
        height: 101px;
    }
    
    #id1 {
        top: 0;
        left: 0
    }
    
    #id2 {
        top: 0;
        left: 100px
    }
    
    #id3 {
        top: 0;
        left: 300px
    }
    
    #id4 {
        top: 200px;
        left: 100px;
    }
    
    #id5 {
        top: 200px;
        left: 0px;
    }
    
    #id6 {
        top: 200px;
        left: 300px;
    }
    
    #id7 {
        top: 300px;
        left: 100px;
    }
    
    #id8 {
        top: 300px;
        left: 200px;
    }
    
    #id9 {
        top: 400px;
        left: 000px;
    }
    
    #id10 {
        top: 400px;
        left: 300px;
    }
</style>