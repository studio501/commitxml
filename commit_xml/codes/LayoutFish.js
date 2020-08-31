
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    nodeRoot: cc.Node,
                    spineMan: sp.Skeleton,
                    nodePoint: cc.Node,
                    labelTime: cc.Label,
                    labelCount: cc.Label,
                    labelScore1: cc.Label,
                    labelScore2: cc.Label,
                    labelCountDown: cc.Label
                },
                init: function () {
                    this.prepareParts(["PartFish", "PartBullet", "PartScore"]), this.fishTypes = [], this.fishProbs = [];
                    for (var t = 0; t < 4; t++) this.fishTypes.push(ftapp.value["fishType" + t]), this.fishProbs.push(this.fishTypes[t].probability);
                    this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart.bind(this));
                    var e = cc.sequence(cc.rotateTo(1, 70), cc.rotateTo(1, -70)).repeatForever();
                    cc.director.getActionManager().addAction(e, this.nodePoint, !0)
                },
                load: function () {
                    this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("", 1), this.partTopStatus.setCloseCallback(function () {
                        cc.director.getCollisionManager().enabled = !1, this.cancel()
                    }.bind(this)), this.node.addChild(this.partTopStatus.node), ftc.setTvTip(this.node, "\u3010\u786e\u5b9a\u952e\u3011\u6295\u7cbd"), cc.director.getCollisionManager().enabled = !0, ftc.playBackMusic(ftc.type.effect.musicBattle1), this._bulletPool = [], this._fishPool = [];
                    for (var t = 0; t < 10; t++) {
                        var e = this.newPart("PartFish");
                        this._fishPool.push(e)
                    }
                    this.schedule(this.createFish, 1), this._cd = 0, this._curScore = 0, this._playing = !1, ftc.showTop(), this.nodePoint.rotation = -70, this._countDown = 3, this.labelCountDown.node.active = !0;
                    var i = function () {
                        this.labelCountDown.string = this._countDown, this.labelCountDown.node.scale = 2, cc.tween(this.labelCountDown.node).to(1, {
                            scale: 1
                        }).start()
                    }.bind(this);
                    i(), this.schedule(function () {
                        this._countDown--, i(), 0 === this._countDown && (ftc.cancelTop(), this._playing = !0, this.labelCountDown.node.active = !1, this.nodePoint.resumeAllActions())
                    }.bind(this), 1, 3), this.labelScore1.string = 0
                },
                setData: function (t, e, i, a, n) {
                    this._callback = e, this._time = i, this._count = a, this.labelTime.string = this._time, this.labelCount.string = this._count, this.labelScore2.string = n
                },
                enter: function () { },
                updateData: function () { },
                tick: function (t) {
                    this._playing && (this._cd > 0 && (this._cd -= t), this._time > 0 && (this.labelTime.string = Math.floor(this._time), this._time -= t, this._time <= 0 && this.gameOver()))
                },
                cleanup: function () { },
                createFish: function () {
                    for (var t = 0; t < 2; t++) {
                        var e = null;
                        (e = this._fishPool.length > 0 ? this._fishPool.pop() : this.newPart("PartFish")).setData(this), this.nodeRoot.addChild(e.node)
                    }
                },
                shot: function () {
                    this._count > 0 && ((this._bulletPool.length > 0 ? this._bulletPool.pop() : this.newPart("PartBullet")).shot(this), this._count--, this.labelCount.string = this._count)
                },
                despawnFish: function (t) {
                    t.node.removeFromParent(), this._fishPool.push(t)
                },
                despawnBullet: function (t) {
                    t.node.removeFromParent(), this._bulletPool.push(t), this._playing && this._count <= 0 && this.gameOver()
                },
                gainScore: function (t, e) {
                    if (this._playing) {
                        var i = this.newPart("PartScore");
                        i.node.position = t, i.setData(e), this.nodeRoot.addChild(i.node), this._curScore += e, this.labelScore1.string = this._curScore
                    }
                },
                gameOver: function () {
                    this._playing = !1, ftapp.getItem("game_2_highest_score", 0) < this._curScore && ftapp.setItem("game_2_highest_score", this._curScore), this.unschedule(this.createFish), ftc.playEffect(ftc.type.effect.battleWin), ftc.showDialog({
                        text: "\u6e38\u620f\u7ed3\u675f\n\n\u672c\u6b21\u5f97\u5206:" + this._curScore + "\n\n\u4eca\u65e5\u6700\u4f73:" + ftapp.getItem("game_2_highest_score", 0),
                        button1: "\u7ed3\u675f\u6e38\u620f",
                        click1: function () {
                            this._callback && this._callback(this._curScore), ftc.playBackMusic(ftc.type.effect.musicMap), this.cancel()
                        }.bind(this)
                    })
                },
                touchStart: function (t) {
                    this._playing && (this._cd <= 0 ? (this.spineMan.setAnimation(0, "wait2", !1), this.spineMan.addAnimation(0, "wait1", !0), this.shot(), ftc.playEffect(ftc.type.effect.game2_luoshui), this._cd = .5) : ftc.showTip("\u51c6\u5907\u4e2d!"))
                },
                msg: function () {
                    this.msg = {}
                },
                onClick: function (t, e) { },
                onKeyOk: function (t) {
                    t && this.touchStart()
                }
            })
        