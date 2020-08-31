
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    nodeContent: cc.Node,
                    tiledMap: cc.TiledMap,
                    buttonUp: cc.Button,
                    buttonDown: cc.Button,
                    progressBar: cc.ProgressBar,
                    labelProgress: cc.Label,
                    buttonPause: cc.Button,
                    spriteLives: [cc.Sprite],
                    labelCountDown: cc.Label,
                    labelHighestScore: cc.Label,
                    labelCurrentScore: cc.Label
                },
                init: function () {
                    this.prepareParts(["PartEvasionNpc", "PartEvasionRole"]), this.addClick(this.buttonUp, .05, !0), this.addClick(this.buttonDown, .05, !0), this.addClick(this.buttonPause, !0)
                },
                load: function () {
                    ftc.setTvTip(this.node, "\u3010\u786e\u5b9a\u3011\u952e\u6682\u505c\uff0c\u4e0a\u4e0b\u952e\u79fb\u52a8\u4eba\u7269"), ftc.playBackMusic(ftc.type.effect.musicBattle2)
                },
                setData: function (t, e) {
                    this._params = t, this._callback = e, this._npcPosYNext = -ftc.TileSize, this.initGame()
                },
                initGame: function () {
                    this._gameId = this._params.id, this._liftCount = this._params.life, this._gameTotalTime = this._params.time, this._frequency = this._params.frequency, this._frequencyDev = this._params.frequencyDev, this._speed = this._params.speed, this._speedDev = this._params.speedDev, this._bgSpeed = this._params.bgSpeed, this._heroSpeed = this._params.heroSpeed, this._running = !1, this._countDown = 4, this._curScore = 0, this._curSpeed = ft.getNumberInNormalDistribution(this._speed, this._speedDev), this._timeTotal = 0, this._timeTotalNext = 0, this._gameTotalTimeRemaining = this._gameTotalTime, this._partNpcWidth = 64, this.labelProgress.string = parseInt(this._gameTotalTimeRemaining) + "s";
                    for (var t = 0; t < this.spriteLives.length; t++) this.spriteLives[t].node.active = !0;
                    if (this.buttonPause.node.active = !0, this.progressBar.progress = 1, this.labelHighestScore.string = ftapp.getItem("game_1_highest_score", 0), this.labelCurrentScore.string = this._curScore, this._partEvasionNpcs) {
                        for (t = 0; t < this._partEvasionNpcs.length; t++)
                            for (var e = 0; e < this._partEvasionNpcs[t].length; e++) this._partEvasionNpcs[t][e].removeFromParent();
                        this._partEvasionNpcs = []
                    } else this._partEvasionNpcs = [];
                    ftc.MapModel.getInstance().loadMap(this.tiledMap, 9001, function () {
                        this.tiledMap.node.x = 0, this._mapEvasionRole = this.newPart("PartEvasionRole"), this._mapEvasionRole.setData({
                            id: 1032,
                            type: 1
                        }), this._mapEvasionRole.node.position = cc.v2(cc.winSize.width - 192, cc.winSize.height / 2 - ftc.TileSize), this.tiledMap.node.addChild(this._mapEvasionRole.node, ftc.MapModel.getInstance().getZIndex(1, 0)), this._mapEvasionRole.moveSpeed = this._heroSpeed, this._mapEvasionRole2 = this.newPart("PartEvasionRole"), this._mapEvasionRole2.setData({
                            id: 1071,
                            type: 2
                        }), this._mapEvasionRole2.node.position = cc.v2(ftc.TileSize, cc.winSize.height / 2 - ftc.TileSize), this.tiledMap.node.addChild(this._mapEvasionRole2.node, ftc.MapModel.getInstance().getZIndex(1, 0));
                        var t = function () {
                            this.labelCountDown.node.active = !1, this.labelCountDown.string = this._countDown, this.schedule(function () {
                                this._countDown -= 1, this.labelCountDown.node.active = !0, this.labelCountDown.string = this._countDown, this.labelCountDown.node.scale = 3, this.labelCountDown.node.runAction(cc.scaleTo(.5, 1, 1)), 0 === this._countDown && (this.labelCountDown.node.active = !1, this._running = !0, this._mapEvasionRole.showDirAnimation(ft.DIRRIGHT), this._mapEvasionRole2.showDirAnimation(ft.DIRRIGHT))
                            }.bind(this), 1, 3)
                        }.bind(this);
                        0 == ftapp.getItem("game_1_highest_score", 0) ? ftc.showDialog({
                            text: "1.\u53f3\u4fa7\u7bad\u5934\u53ef\u4ee5\u63a7\u5236\u4eba\u7269\u4e0a\u4e0b\u79fb\u52a8\n2.\u4e0a\u65b9\u5012\u8ba1\u65f6\u4e3a0\u65f6\u5c0f\u6e38\u620f\u7ed3\u675f\n3.\u5750\u4e0b\u89d2\u8840\u91cf\u4e3a0\u65f6\u5c0f\u6e38\u620f\u7ed3\u675f\n4.\u6e38\u620f\u7ed3\u675f\u524d\u9000\u51fa\u5219\u4e0d\u8ba1\u5206",
                            click1: function () {
                                t()
                            }
                        }) : t()
                    }.bind(this))
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) {
                    if (this._running) {
                        this._mapEvasionRole.tickMove(t), this._mapEvasionRole2.tickMove(t);
                        var e = t * this._bgSpeed;
                        if (this.tiledMap.node.x - e >= -this.tiledMap.node.width / 2 ? (this.tiledMap.node.x -= e, this._mapEvasionRole.node.x += e, this._mapEvasionRole2.node.x += e) : (this.tiledMap.node.x = 0, this._mapEvasionRole.node.x -= this.tiledMap.node.width / 2, this._mapEvasionRole2.node.x -= this.tiledMap.node.width / 2), this._timeTotal += t, this._timeTotal >= this._timeTotalNext) {
                            this._timeTotalNext > 0 && this.addEvasionNpc(), this._curSpeed = ft.getNumberInNormalDistribution(this._speed, this._speedDev), this._curfrequency = ft.getNumberInNormalDistribution(this._frequency, this._frequencyDev), this._curfrequency < this._frequency - this._frequencyDev && (this._curfrequency = this._frequency - this._frequencyDev), this._curSpeed <= 0 && (this._curSpeed = this._speed), this._timeTotalNext = this._timeTotal + 1 / this._curfrequency, this._npcPosYNext = (ft.rand(7) + 1) * ftc.TileSize;
                            var i = this._npcPosYNext - this._mapEvasionRole2.node.y,
                                a = 1 / this._curfrequency;
                            this._mapEvasionRole2.setMove(i > 0 ? ft.DIRUP : ft.DIRDOWN, Math.abs(i / a))
                        }
                        for (var n = this._partEvasionNpcs.length - 1; n >= 0; n--) this._partEvasionNpcs[n].node.x > this.nodeContent.width + this._partNpcWidth / 2 && (this._partEvasionNpcs[n].node.removeFromParent(), this._curScore += 1, this.labelCurrentScore.string = this._curScore, this._partEvasionNpcs.splice(n, 1));
                        var s = this.nodeContent.convertToNodeSpaceAR(this.tiledMap.node.convertToWorldSpaceAR(this._mapEvasionRole.node.position)),
                            o = new cc.Rect(s.x - 32, s.y, 64, 108);
                        for (n = this._partEvasionNpcs.length - 1; n >= 0; n--) {
                            var r = this._partEvasionNpcs[n];
                            if (r.node.x + r.width / 2 >= s.x - 16) {
                                var c = new cc.Rect(r.node.x, r.node.y + 10, r.width / 2, r.height);
                                if (o.intersects(c) && (r.node.removeFromParent(), this._partEvasionNpcs.splice(n, 1), ftc.playEffect("303a"), this._liftCount--, this.spriteLives[this._liftCount].node.active = !1, 0 === this._liftCount)) {
                                    this.gameOver(!0);
                                    break
                                }
                            }
                        }
                        this._gameTotalTimeRemaining -= t, this.labelProgress.string = parseInt(this._gameTotalTimeRemaining) + "s", this.progressBar.progress = this._gameTotalTimeRemaining / this._gameTotalTime, this._gameTotalTimeRemaining <= 0 && this.gameOver()
                    }
                },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                onClick: function (t, e) {
                    this._countDown > 0 || t.target === this.buttonPause.node && this.pauseGame()
                },
                onLongClick: function (t, e) {
                    this._countDown > 0 || (e ? this._mapEvasionRole.moveDir = null : t.target === this.buttonUp.node ? this._mapEvasionRole.moveDir = ft.DIRUP : t.target === this.buttonDown.node && (this._mapEvasionRole.moveDir = ft.DIRDOWN))
                },
                addEvasionNpc: function () {
                    var t = this.newPart("PartEvasionNpc");
                    t.setData({
                        id: 1
                    }), t.node.x = 1.5 * ftc.TileSize, t.node.y = this._npcPosYNext, this.nodeContent.addChild(t.node), this._partEvasionNpcs.push(t);
                    var e = (this.nodeContent.width + t.node.width) / this._curSpeed;
                    t.node.runAction(cc.moveTo(e, this.nodeContent.width + t.node.width, t.node.y))
                },
                pauseGame: function (t) {
                    this._running = !1, ftc.pauseBackMusic(), this._mapEvasionRole.pauseAnimation(), this._mapEvasionRole2.pauseAnimation();
                    for (var e = 0; e < this._partEvasionNpcs.length; e++) this._partEvasionNpcs[e].node.pauseAllActions();
                    t || ftc.showDialog({
                        text: "\u6e38\u620f\u5df2\u6682\u505c",
                        button1: "\u7ee7\u7eed",
                        button2: "\u9000\u51fa",
                        click1: function () {
                            this.resumeGame(), ftc.playBackMusic(ftc.type.effect.musicBattle2)
                        }.bind(this),
                        click2: function () {
                            this._callback && this._callback(), ftc.playBackMusic(ftc.type.effect.musicMap), this.cancel()
                        }.bind(this),
                        clickClose: function () {
                            this.resumeGame()
                        }.bind(this)
                    })
                },
                resumeGame: function () {
                    this._running = !0, this._mapEvasionRole.resumeAnimation(), this._mapEvasionRole2.resumeAnimation();
                    for (var t = 0; t < this._partEvasionNpcs.length; t++) this._partEvasionNpcs[t].node.resumeAllActions()
                },
                gameOver: function (t) {
                    this.buttonPause.node.active = !1, this.pauseGame(!0), ftc.playEffect(ftc.type.effect.battleWin), ftc.showDialog({
                        text: "\u6e38\u620f\u7ed3\u675f\n\n\u672c\u6b21\u5f97\u5206:" + this._curScore + "\n\n\u6700\u4f73\u5f97\u5206:" + ftapp.getItem("game_1_highest_score", 0),
                        button1: "\u7ed3\u675f\u6e38\u620f",
                        click1: function () {
                            this._callback && this._callback(this._curScore), ftc.playBackMusic(ftc.type.effect.musicMap), this.cancel()
                        }.bind(this)
                    }), ftapp.getItem("game_1_highest_score", 0) < this._curScore && ftapp.setItem("game_1_highest_score", this._curScore)
                },
                onKeyOk: function (t) {
                    t || this.pauseGame()
                },
                onKeyDirection: function (t, e) {
                    if (t) {
                        if (1 == e) return this._mapEvasionRole.moveDir = ft.DIRUP, !0;
                        if (2 == e) return this._mapEvasionRole.moveDir = ft.DIRDOWN, !0
                    } else this._mapEvasionRole.moveDir = null
                }
            })
        