
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spine: sp.Skeleton
                },
                init: function () {
                    this.handleEvent && this.handleEvent()
                },
                load: function () {
                    this.spine.skeletonData = null, this.spine.setCompleteListener(this.listenerComplete.bind(this)), this.spine.setEventListener(this.listenerEvent.bind(this))
                },
                setData: function (t, e, i, a, n, s, o) {
                    this.targets = a, this.playId = e, this.id = t, this.hitAct = o, this.node.active = !0, void 0 === s && (s = !1), this.isLoop = s, this.toWait2 = !1, this.node.stopAllActions(), ftc.battleView.loadResource("spine/boom/" + t, sp.SkeletonData, function (e) {
                        if (this.spine && ftc.ManagerRes.checkNodeIsRestored(this.spine.node)) ftc.err("boom \u5df2\u7ecf\u88ab\u56de\u6536");
                        else try {
                            this.spine.skeletonData = e, s && this.spine.findAnimation("wait2") && (this.toWait2 = !0, s = !1), this.spine.setAnimation(0, "wait1", s)
                        } catch (e) {
                            ftc.err(t, e + " atlas\u6587\u4ef6\u5bf9\u5e94\u56fe\u7247\u627e\u4e0d\u5230")
                        }
                    }.bind(this), void 0, !0), this.from = i, this.spine.timeScale = ftc.ManagerData.get1("ManagerBattle").speed, this.spine.node.scaleX = n || 1
                },
                setAnimation: function (t) {
                    this.spine.findAnimation(t) && this.spine.setAnimation(0, t, !0)
                },
                updateData: function () { },
                listenerEvent: function (t, e) {
                    var i;
                    if (!ftc.ManagerRes.checkNodeIsRestored(this.node) && (ft.console("PartBattleBoom:", e.data.name), (i = e.data.name.indexOf("_") > 0 ? e.data.name.split("_") : e.data.name.split(" ")).length > 0)) {
                        var a;
                        a = i[1] ? i[1].split(",") : [];
                        try {
                            this.handleEvent[i[0]].apply(this, [a[0], a[1]])
                        } catch (t) {
                            ftc.err("\u9519\u8bef\u4e8b\u4ef6" + e.data.name + "," + t)
                        }
                    }
                },
                handleEvent: function () {
                    this.handleEvent = {
                        attack: function (t) {
                            if (this.playId) {
                                if (this.from.part.startPlaySkill(this.playId, this.from.part.attackIndex), this.from.part.startPlayHp(this.playId, this.from.part.attackIndex), this.targets) {
                                    void 0 !== this.hitAct && (t = this.hitAct);
                                    for (var e = 0; e < this.targets.length; e++) this.targets[e].part.setHitAct(t, this.playId, this.from.part.attackIndex), this.targets[e].part.attackIndex++
                                }
                                this.from.part.attackIndex++
                            }
                        },
                        boom: function (t, e) {
                            if (t && this.targets && this.playId)
                                for (var i = 0; i < this.targets.length; i++) ftc.sendClient("c_boom", {
                                    playId: this.playId,
                                    actor: this.targets[i],
                                    targets: [this.targets[i]],
                                    id: "boom_" + t,
                                    from: this.from,
                                    hitAct: this.hitAct,
                                    downLayer: e
                                }, "LayoutBattle")
                        },
                        opacity: function (t) {
                            if (this.targets)
                                for (var e = 0; e < this.targets.length; e++) this.targets[e].part.spine.node.opacity = t, this.targets[e].part.nodeBlood.opacity = t
                        },
                        shake: function (t, e) {
                            ftc.sendClient("c_shake", {
                                type: t,
                                frame: e,
                                scaleX: this.node.scaleX
                            }, "LayoutBattle")
                        },
                        black: function (t) {
                            ftc.sendClient("c_black", t, "LayoutBattle")
                        },
                        music: function (t) {
                            this.from && this.from.part.playMusic(t, this.id)
                        },
                        effect: function (t, e) {
                            this.from && this.from.part.newEffect(t, e)
                        }
                    }
                },
                listenerComplete: function (t, e) {
                    if (!ftc.ManagerRes.checkNodeIsRestored(this.node))
                        if (this.isLoop) this.toWait2 && (this.toWait2 = !1, this.spine.setAnimation(0, "wait2", !0));
                        else {
                            if (this.targets && this.playId && this.from)
                                for (var i = 0; i < this.targets.length; i++) this.targets[i] && (this.targets[i].part.startPlayBuff(this.playId, this.from.part.attackIndex), this.targets[i].part.attackIndex++);
                            this.cancel(!0)
                        }
                },
                tick: function (t) { },
                cleanup: function () { },
                onClick: function (t, e) { }
            })
        