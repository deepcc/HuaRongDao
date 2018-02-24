window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
    window.setTimeout(a, 1000 / 30)
};

function getHorizontalBoundary(b) {
    var a, c;
    b.forEach(function (d) {
        if (!a && !c) {
            a = d.x;
            c = d.x
        } else {
            if (d.x < a) {
                a = d.x
            }
            if (d.x > c) {
                c = d.x
            }
        }
    });
    return {
        minX: a,
        maxX: c
    }
}
var Element = function (a) {
    var a = a || {};
    this.x = a.x;
    this.y = a.y;
    this.size = a.size;
    this.speed = a.speed
};
Element.prototype = {
    move: function (a, d) {
        var c = a || 0;
        var b = d || 0;
        this.x += a;
        this.y += d
    },
    draw: function () { }
};
var CONFIG = {
    status: "start",
    level: 1,
    totalLevel: 6,
    numPerLine: 7,
    canvasPadding: 28,
    bulletSize: 10,
    bulletSpeed: 10,
    enemySpeed: 2,
    enemySize: 50,
    enemyGap: 10,
    enemyIcon: "./img/enemy.png",
    enemyBoomIcon: "./img/boom.png",
    enemyDirection: "right",
    planeSpeed: 5,
    planeSize: {
        width: 60,
        height: 100
    },
    planeIcon: "./img/plane.png",
};
var Bullet = function (a) {
    var a = a || {};
    Element.call(this, a)
};
Bullet.prototype = new Element();
Bullet.prototype.fly = function () {
    this.move(0, -this.speed);
    return this
};
Bullet.prototype.draw = function () {
    context.beginPath();
    context.strokeStyle = "#fff";
    context.moveTo(this.x, this.y);
    context.lineTo(this.x, this.y - this.size);
    context.closePath();
    context.stroke();
    return this
};
var Plane = function (a) {
    var a = a || {};
    Element.call(this, a);
    this.minX = a.minX;
    this.maxX = a.maxX;
    this.bulletSpeed = a.bulletSpeed || CONFIG.bulletSpeed;
    this.bulletSize = a.bulletSize || CONFIG.bulletSize;
    console.log(11);
    this.bullets = [];
    this.load()
};
Plane.prototype = new Element();
Plane.prototype.hasHit = function (f) {
    var b = this.bullets;
    for (var c = b.length - 1; c >= 0; c--) {
        var a = b[c];
        var e = f.x < a.x && a.x < (f.x + f.size);
        var d = f.y < a.y && a.y < (f.y + f.size);
        if (e && d) {
            this.bullets.splice(c, 1);
            return true
        }
    }
    return false
};
Plane.prototype.load = function () {
    if (Plane.icon) {
        return this
    }
    var a = new Image();
    a.src = CONFIG.planeIcon;
    a.onload = function () {
        Plane.icon = a
    };
    return this
};
Plane.prototype.translate = function (c) {
    var b = this.speed;
    var a;
    if (c === "left") {
        a = this.x < this.minX ? 0 : -b
    } else {
        a = this.x > this.maxX ? 0 : b
    }
    this.move(a, 0);
    return this
};
Plane.prototype.shoot = function () {
    var a = this.x + this.size.width / 2;
    this.bullets.push(new Bullet({
        x: a,
        y: this.y,
        size: this.bulletSize,
        speed: this.bulletSpeed
    }));
    return this
};
Plane.prototype.drawBullets = function () {
    var b = this.bullets;
    var c = b.length;
    while (c--) {
        var a = b[c];
        a.fly();
        if (a.y <= 0) {
            b.splice(c, 1)
        }
        a.draw()
    }
};
Plane.prototype.draw = function () {
    this.drawBullets();
    if (!Plane.icon) {
        context.fillRect(this.x, this.y, this.size.width, this.size.height)
    } else {
        context.drawImage(Plane.icon, this.x, this.y, this.size.width, this.size.height)
    }
    return this
};
var Enemy = function (a) {
    var a = a || {};
    Element.call(this, a);
    this.status = "normal";
    this.boomCount = 0;
    this.load()
};
Enemy.prototype = new Element();
Enemy.prototype.down = function () {
    this.move(0, this.size);
    return this
};
Enemy.prototype.load = function () {
    if (Enemy.icon) {
        return this
    }
    var b = new Image();
    b.src = CONFIG.enemyIcon;
    b.onload = function () {
        Enemy.icon = b
    };
    var a = new Image();
    a.src = CONFIG.enemyBoomIcon;
    a.onload = function () {
        Enemy.boomIcon = a
    };
    return this
};
Enemy.prototype.translate = function (a) {
    if (a === "left") {
        this.move(-this.speed, 0)
    } else {
        this.move(this.speed, 0)
    }
    return this
};
Enemy.prototype.booming = function () {
    this.status = "booming";
    this.boomCount += 1;
    if (this.boomCount > 4) {
        this.status = "boomed"
    }
    return this
};
Enemy.prototype.draw = function () {
    if (Enemy.icon && Enemy.boomIcon) {
        switch (this.status) {
            case "normal":
                context.drawImage(Enemy.icon, this.x, this.y, this.size, this.size);
                break;
            case "booming":
                context.drawImage(Enemy.boomIcon, this.x, this.y, this.size, this.size);
                break
        }
    } else {
        context.fillRect(this.x, this.y, this.size, this.size)
    }
    return this
};
var KeyBoard = function () {
    document.onkeydown = this.keydown.bind(this);
    document.onkeyup = this.keyup.bind(this)
};
KeyBoard.prototype = {
    pressedLeft: false,
    pressedRight: false,
    pressedUp: false,
    heldLeft: false,
    heldRight: false,
    pressedSpace: false,
    keydown: function (b) {
        var a = b.keyCode;
        switch (a) {
            case 32:
                this.pressedSpace = true;
                break;
            case 37:
                this.pressedLeft = true;
                this.heldLeft = true;
                this.pressedRight = false;
                this.heldRight = false;
                break;
            case 38:
                this.pressedUp = true;
                break;
            case 39:
                this.pressedLeft = false;
                this.heldLeft = false;
                this.pressedRight = true;
                this.heldRight = true;
                break
        }
    },
    keyup: function (b) {
        var a = b.keyCode;
        switch (a) {
            case 32:
                this.pressedSpace = false;
                break;
            case 37:
                this.heldLeft = false;
                this.pressedLeft = false;
            case 38:
                this.pressedUp = false;
                break;
            case 39:
                this.heldRight = false;
                this.pressedRight = false;
                break
        }
    }
};
var container = document.getElementById("game");
var levelText = document.querySelector(".game-level");
var nextLevelText = document.querySelector(".game-next-level");
var scoreText = document.querySelector(".game-info .score");
var totalScoreText = document.querySelector(".game-failed .score");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var canvasWidth = canvas.clientWidth;
var canvasHeight = canvas.clientHeight;
var hash = location.hash;
var isBaseVersion = hash === "#base";
var GAME = {
    init: function (b) {
        var b = Object.assign({}, b, CONFIG);
        var c = b.canvasPadding;
        this.padding = c;
        this.enemyLimitY = canvasHeight - c - b.planeSize.height;
        this.enemyMinX = c;
        this.enemyMaxX = canvasWidth - c - b.enemySize;
        var a = b.planeSize.width;
        this.planeMinX = c;
        this.planeMaxX = canvasWidth - c - a;
        this.planePosX = canvasWidth / 2 - a;
        this.planePosY = this.enemyLimitY;
        this.opts = b;
        this.score = 0;
        if (isBaseVersion) {
            this.opts.totalLevel = 1
        }
        this.keyBoard = new KeyBoard();
        this.status = "start";
        this.bindEvent();
        this.renderLevel()
    },
    bindEvent: function () {
        var c = this;
        var b = document.querySelector(".js-play");
        var d = document.querySelectorAll(".js-replay");
        var a = document.querySelector(".js-next");
        b.onclick = function () {
            c.play()
        };
        d.forEach(function (e) {
            e.onclick = function () {
                c.opts.level = 1;
                c.play();
                c.score = 0;
                totalScoreText.innerText = c.score
            }
        });
        a.onclick = function () {
            c.opts.level += 1;
            c.play()
        }
    },
    setStatus: function (a) {
        this.status = a;
        container.setAttribute("data-status", a)
    },
    play: function () {
        var a = this.opts;
        var l = this;
        var k = this.padding;
        var b = a.level;
        var c = a.numPerLine;
        var e = a.enemyGap;
        var m = a.enemySize;
        var d = a.enemySpeed;
        this.enemies = [];
        for (var h = 0; h < b; h++) {
            for (var g = 0; g < c; g++) {
                var f = {
                    x: k + g * (m + e),
                    y: k + h * (m + e),
                    size: m,
                    speed: d
                };
                this.enemies.push(new Enemy(f))
            }
        }
        this.plane = new Plane({
            x: this.planePosX,
            y: this.planePosY,
            size: a.planeSize,
            minX: this.planeMinX,
            speed: a.planeSpeed,
            maxX: this.planeMaxX,
        });
        this.setStatus("playing");
        this.renderLevel();
        this.update()
    },
    pause: function () {
        this.setStatus("pause")
    },
    end: function (a) {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        this.setStatus(a)
    },
    update: function () {
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const element = object[key];
                
            }
        }
        var b = this;
        var e = this.opts;
        var d = this.keyBoard;
        var f = e.padding;
        var c = e.enemySize;
        var a = this.enemies;
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        this.updatePanel();
        this.updateEnemies();
        this.draw();
        if (a.length === 0) {
            if (b.opts.level === b.opts.totalLevel) {
                this.end("all-success")
            } else {
                this.end("success")
            }
            return
        }
        if (a[a.length - 1].y >= this.enemyLimitY) {
            this.end("failed");
            return
        }
        requestAnimFrame(function () {
            b.update(this)
        })
    },
    updatePanel: function () {
        var a = this.plane;
        var b = this.keyBoard;
        if (b.pressedLeft || b.heldLeft) {
            a.translate("left")
        }
        if (b.pressedRight || b.heldRight) {
            a.translate("right")
        }
        if (b.pressedUp || b.pressedSpace) {
            b.pressedUp = false;
            b.pressedSpace = false;
            a.shoot()
        }
    },
    updateEnemies: function () {
        var b = this.opts;
        var g = b.padding;
        var j = b.enemySize;
        var c = this.enemies;
        var f = this.plane;
        var e = c.length;
        var h = false;
        var a = getHorizontalBoundary(c);
        if (a.minX < this.enemyMinX || a.maxX > this.enemyMaxX) {
            b.enemyDirection = b.enemyDirection === "right" ? "left" : "right";
            h = true
        }
        while (e--) {
            var d = c[e];
            if (h) {
                d.down()
            }
            d.translate(b.enemyDirection);
            switch (d.status) {
                case "normal":
                    if (f.hasHit(d)) {
                        d.booming()
                    }
                    break;
                case "booming":
                    d.booming();
                    break;
                case "boomed":
                    this.enemies.splice(e, 1);
                    this.score += 1
            }
        }
    },
    draw: function () {
        this.renderScore();
        this.plane.draw();
        this.enemies.forEach(function (a) {
            a.draw()
        })
    },
    renderLevel: function () {
        levelText.innerText = "当前Level：" + this.opts.level;
        nextLevelText.innerText = "下一个Level： " + (this.opts.level + 1)
    },
    renderScore: function () {
        scoreText.innerText = this.score
    }
};
GAME.init();