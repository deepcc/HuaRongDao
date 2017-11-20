<template>
  <div class="hrd">
    <div class="hrd-box">
        
        
        <!-- v-bind:class="{w1h1:item.classname=='w1h1',w1h2:item.classname=='w1h2,w2h2:item.classname=='w2h2',w2h1:item.classname=='w2h1'}"  -->
        <div v-for="(item,i) in hrdObj"
            :class="['checker', ('w'+item.w+'h'+item.h)]" 
            :id="'id'+(i+1)"
            @mouseover="checkerOverFn(item)">11
            <div :class="['btns',item.f]"  v-if="item.f">
                <span class="top" @click="btnFn((i+1),'top')">↑</span>
                <span class="bottom" @click="btnFn((i+1),'bottom')">↓</span>
                <span class="left" @click="btnFn((i+1),'left')">←</span>
                <span class="right" @click="btnFn((i+1),'right')">→</span>
            </div>
        </div>

    </div>

    <div class="btn-list">
        <button class="back">后退</button>
        <button class="front">前进</button>
        <button class="restart">重新开始</button>
        <button class="auto">自动</button>
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
                hrdObj: [{
                    id: 1,
                    top: 0,
                    left: 0,
                    w: 1,
                    h: 2,
                    f: 0
                }, {

                    id: 2,
                    top: 0,
                    left: 1,
                    w: 2,
                    h: 2,
                    f: 0
                }, {
                    id: 3,
                    top: 0,
                    left: 3,
                    w: 1,
                    h: 2,
                    f: 0
                }, {
                    id: 4,
                    top: 2,
                    left: 1,
                    w: 2,
                    h: 1,
                    f: 0
                }, {
                    id: 5,
                    top: 2,
                    left: 0,
                    w: 1,
                    h: 2,
                    f: 0
                }, {
                    id: 6,
                    top: 2,
                    left: 3,
                    w: 1,
                    h: 2,
                    f: 0
                }, {
                    id: 7,
                    top: 3,
                    left: 1,
                    w: 1,
                    h: 1,
                    f: 0
                }, {

                    id: 8,
                    top: 3,
                    left: 2,
                    w: 1,
                    h: 1,
                    f: 0
                }, {

                    id: 9,
                    top: 4,
                    left: 0,
                    w: 1,
                    h: 1,
                    f: 0
                }, {

                    id: 10,
                    top: 4,
                    left: 3,
                    w: 1,
                    h: 1,
                    f: 0
                }],
                timeF: null,
                // 初始化
                checkerboardInit: [
                    [1, 1, 1, 1],
                    [1, 1, 1, 1],
                    [1, 1, 1, 1],
                    [1, 1, 1, 1],
                    [1, 0, 0, 1]
                ],
                checkerboard: [
                    [1, 1, 1, 1],
                    [1, 1, 1, 1],
                    [1, 1, 1, 1],
                    [1, 1, 1, 1],
                    [1, 0, 0, 1]
                ],
                autoArr: [
                    ["id11", "left"],
                    ["id7", "bottom"],
                    ["id5", "right"],
                    ["id8", "bottom"],
                    ["id6", "right"],
                    ["id10", "top"],
                    ["id8", "left"],
                    ["id6", "bottom"],
                    ["id5", "left"],
                    ["id5", "left"],
                    ["id9", "top"],
                    ["id9", "right"],
                    ["id11", "top"],
                    ["id11", "top"],
                    ["id6", "right"],
                    ["id10", "right"],
                    ["id10", "bottom"],
                    ["id5", "bottom"],
                    ["id11", "left"],
                    ["id11", "left"],
                    ["id9", "left"],
                    ["id9", "left"],
                    ["id6", "top"],
                    ["id7", "top"],
                    ["id10", "right"],
                    ["id10", "right"],
                    ["id8", "right"],
                    ["id8", "right"],
                    ["id5", "bottom"],
                    ["id9", "bottom"],
                    ["id9", "left"],
                    ["id6", "left"],
                    ["id7", "left"],
                    ["id3", "bottom"],
                    ["id3", "bottom"],
                    ["id2", "right"],
                    ["id1", "right"],
                    ["id11", "top"],
                    ["id11", "top"],
                    ["id9", "top"],
                    ["id9", "top"],
                    ["id6", "left"],
                    ["id1", "bottom"],
                    ["id1", "bottom"],
                    ["id2", "left"],
                    ["id3", "top"],
                    ["id3", "top"],
                    ["id7", "right"],
                    ["id8", "top"],
                    ["id8", "top"],
                    ["id10", "left"],
                    ["id10", "top"],
                    ["id5", "right"],
                    ["id5", "right"],
                    ["id6", "bottom"],
                    ["id1", "bottom"],
                    ["id8", "left"],
                    ["id8", "left"],
                    ["id2", "bottom"],
                    ["id11", "right"],
                    ["id11", "right"],
                    ["id9", "top"],
                    ["id9", "right"],
                    ["id8", "top"],
                    ["id8", "top"],
                    ["id6", "top"],
                    ["id6", "top"],
                    ["id1", "left"],
                    ["id10", "left"],
                    ["id10", "bottom"],
                    ["id2", "bottom"],
                    ["id11", "bottom"],
                    ["id11", "left"],
                    ["id3", "left"],
                    ["id7", "top"],
                    ["id7", "top"],
                    ["id2", "right"],
                    ["id11", "bottom"],
                    ["id9", "bottom"],
                    ["id8", "right"],
                    ["id6", "top"],
                    ["id1", "top"],
                    ["id10", "left"],
                    ["id11", "bottom"],
                    ["id11", "bottom"],
                    ["id2", "left"],
                    ["id7", "bottom"],
                    ["id7", "bottom"],
                    ["id3", "right"],
                    ["id8", "right"],
                    ["id9", "right"],
                    ["id6", "right"],
                    ["id1", "top"],
                    ["id1", "top"],
                    ["id2", "left"],
                    ["id9", "bottom"],
                    ["id9", "bottom"],
                    ["id8", "bottom"],
                    ["id8", "bottom"],
                    ["id3", "left"],
                    ["id7", "top"],
                    ["id7", "top"],
                    ["id9", "right"],
                    ["id9", "top"],
                    ["id5", "top"],
                    ["id11", "right"],
                    ["id11", "right"],
                    ["id10", "right"],
                    ["id10", "right"],
                    ["id2", "bottom"],
                    ["id8", "left"],
                    ["id8", "left"],
                    ["id9", "left"],
                    ["id9", "left"],
                    ["id5", "top"],
                    ["id10", "top"],
                    ["id10", "right"],
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
        methods: {
            autoFn(arr) {
                var a = arr.shift()
                var id = a[0]
                var move = a[1]
                btnFn($('#' + id), move)
                arr.length
                if (!arr.length) {
                    return;
                }
                setTimeout(function() {
                    autoFn(arr)
                }, 300);
            },
            spanFn(_t) {

                var $div = $(_t).parent().parent()
                var move = $(_t).attr('class')

                console.log(_t)
                console.log($div)
                this.btnFn($div, move)
            },
            /* 重新开始 */
            restartFn() {
                checkerboard = checkerboardInit
                this.record = []; // 历史记录
                this.backRecord = []; // 后退记录
                this.pointer = -1;
                console.log(checkerboard)
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
                $('#id5').css({
                    top: '200px',
                    left: '100px'
                })
                $('#id6').css({
                    top: '200px',
                    left: '000px'
                })
                $('#id7').css({
                    top: '200px',
                    left: '300px'
                })
                $('#id8').css({
                    top: '300px',
                    left: '100px'
                })
                $('#id9').css({
                    top: '300px',
                    left: '200px'
                })
                $('#id10').css({
                    top: '400px',
                    left: '000px'
                })
                $('#id11').css({
                    top: '400px',
                    left: '300px'
                })
            },
            /* 撤销按钮 */
            backFn() {
                if (this.record.length == 0) {
                    return
                }
                if (this.pointer == -1) {
                    this.pointer = this.record.length - 1
                }
                var id = this.record[this.pointer][0]
                var move = this.record[this.pointer][1]
                btnFn($('#' + id), moveObj[move], 'm')
                this.backRecord.push(this.record.pop())
                this.pointer--;
                console.log(this.backRecord)

            },

            /* 前进按钮 */
            frontFn() {

                if (!this.backRecord.length) {
                    return
                }
                this.pointer++;
                console.log(this.pointer)
                var a = this.backRecord.pop()
                var id = a[0]
                var move = a[1]
                this.btnFn($('#' + id), move)

            },

            btnFn(id, move, m) {
                var $div = $('#id' + id)
                    // var w = $div.data('w');
                    // var h = $div.data('h');
                    // var top = $div.data('top');
                    // var left = $div.data('left');
                var t = this.hrdObj[id - 1]
                console.log(id, t)
                var w = t.w;
                var h = t.h;
                var top = t.top;
                var left = t.left;
                console.log($div)
                var unit = this.unit
                var csstop = t.top * this.unit;
                var cssleft = t.left * this.unit;
                // var csstop = $div.css('top').replace(/px/g, '');
                // var cssleft = $div.css('left').replace(/px/g, '');

                console.log(this.checkerboard)
                var _this = this;

                function btnMoveFn(num, orient) {
                    if (orient == 'left' || orient == 'right') {

                        $div.data('left', num)
                        $div.css('left', (num) * (unit))
                    } else {

                        $div.data('top', num)
                        $div.css('top', (num) * (unit))
                    }

                    if (m != 'm') {
                        _this.pointer = _this.record.length
                        _this.record.push([$div.attr('id'), orient])
                    }

                }
                if (move == ('right')) {
                    if (w == 1 && h == 1) {
                        if (this.checkerboard[top][left + 1] === 0) {
                            console.log(111)
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
                    console.log(this.checkerboard[top + 1][left])
                        // console.log(csstop + unit)
                    console.log(top, left)
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

                    console.log('bottom')
                }
                console.log(this.checkerboard)
                console.log(this.record)
            },

            htmlFn(o) {
                console.log(o)
                    // $(_this).siblings().removeClass('on').find('span').remove()
                    // var $div = $(_this)
                    // var w = $div.data('w');
                    // var h = $div.data('h');
                    // var top = $div.data('top');
                    // var left = $div.data('left');
                console.log(this.checkerboard)
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
                console.log('mouseover')
                clearTimeout(this.timeF)
                this.htmlFn(_t)
            },

            // var this.timeF = null
            spanOverFn() {
                clearTimeout(this.timeF)
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
<style>
    .hrd-box {
        position: relative;
        width: 402px;
        height: 502px;
        background: #ccc;
        border: 2px solid #666
    }
    
    .hrd-box .checker.on {
        z-index: 22
    }
    
    .hrd-box .checker {
        position: absolute;
        background: rgb(122, 50, 2);
        border: 1px solid #ff0;
        text-align: center;
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
        border-radius: 50%;
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
    }
    
    .hrd-box .checker .showbottom span.bottom {
        display: flex;
    }
    
    .hrd-box .checker .showleft span.left {
        display: flex;
    }
    
    .hrd-box .checker .showright span.right {
        display: flex;
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
        height: 200px;
        width: 100px;
    }
    
    .w1h1 {
        height: 100px;
        width: 100px;
    }
    
    .w2h2 {
        width: 200px;
        height: 200px;
    }
    
    .w2h1 {
        width: 200px;
        height: 100px;
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