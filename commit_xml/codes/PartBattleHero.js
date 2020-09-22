
            
            cc._RF.push(e, "1b181gnpmZIvaWK4omIaQa9", "PartBattleHero");
            cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spine: sp.Skeleton,
                    spineActionNow: sp.Skeleton,
                    spineTarget: sp.Skeleton,
                    spineTargetSelect: sp.Skeleton,
                    spineDie: sp.Skeleton,
                    spriteDie: cc.Sprite,
                    nodeActionNow: cc.Node,
                    nodeTarget: cc.Node,
                    nodeTargetSelect: cc.Node,
                    nodeBlood: cc.Node,
                    layoutBuffs: cc.Node,
                    nodeBottom: cc.Node,
                    spriteBuffs: [cc.Sprite],
                    progressBarHp: cc.ProgressBar,
                    progressBarHp2: cc.ProgressBar
                },
                init: function () {
                    this.handleEvent && this.handleEvent(), this.spineActionNow.setCompleteListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "wait1" == (t.animation ? t.animation.name : "") && this.spineActionNow.setAnimation(0, "wait2", !0)
                    }.bind(this)), this.spineTarget.setCompleteListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "wait1" == (t.animation ? t.animation.name : "") && this.spineTarget.setAnimation(0, "wait2", !0)
                    }.bind(this)), this.spineTargetSelect.setCompleteListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "wait1" == (t.animation ? t.animation.name : "") && this.spineTargetSelect.setAnimation(0, "wait2", !0)
                    }.bind(this)), this._hasDieAni = !1
                },
                load: function () {
                    this.spine.setCompleteListener(this.listenerComplete.bind(this)), this.spine.setEventListener(this.listenerEvent.bind(this))
                },
                get: function (t) {
                    return ftd.Hero.get(this.battleHero.id, t)
                },
                setData: function (t, e, i) {
                    this._attackActs = [], this._tickShowHps = [], this.idShowHps = {}, this._tickShowBuffs = [], this._tickShowSkills = [], this._tickShowChanges = [], this.packHero = t, this.battleHero = t.hero, this.currentAction = 0, this.node.active = !0, this.nodeActionNow.active = !1, this.nodeTarget.active = !1, this.nodeTargetSelect.active = !1, this.spineDie.node.active = !1, this.spriteDie.node.active = !1, this.progressBarHp2.node.active = !1, this.progressBarHp.progress = 1, this.allBuffParts = {}, this.allBuffIds = [], this.allBuffImgs = [], this.allHpParts = [], this._isWait2 = !1, this._hasWait2Ani = !1, 1 == this.battleHero.type ? this.nodeBlood.scaleX = 1 : this.nodeBlood.scaleX = -1, 1 == this.battleHero.type ? this.node.scaleX = 1 : this.node.scaleX = -1, this.nodeBlood.active = !0, this.attackIndex = 0, this.oldExtHp = 0, this.maxExtHp = 0, this.playingHpSize = 0, this.isMoveOut = !1, this.spine.node.opacity = 255, this.nodeBlood.opacity = 255, this.isSpinePause = !1, this.spine.paused = !1, this.isReadAni = !1, this.simulcast = {}, this.loadRes(e, i)
                },
                listenerEvent: function (t, e) {
                    var i;
                    if (!ftc.ManagerRes.checkNodeIsRestored(this.spine.node) && (i = e.data.name.indexOf("_") > 0 ? e.data.name.split("_") : e.data.name.split(" ")).length > 0) {
                        var a;
                        a = i[1] ? i[1].split(",") : [];
                        try {
                            this.handleEvent[i[0]].apply(this, [a[0], a[1], a[2], a[3]])
                        } catch (t) {
                            ftc.err(this.battleHero.id + "错误事件" + i[0] + "," + e.data.name + "," + t + "\n" + ft.isObject(t) ? t.stack : "")
                        }
                    }
                },
                handleEvent: function () {
                    this.handleEvent = {
                        move: function (t) {
                            this.isMoveOut = !0, ftc.sendClient("c_move", {
                                actor: this.packHero,
                                targets: this._attackActs[0][2],
                                frame: t
                            }, "LayoutBattle")
                        },
                        change: function () {
                            this._tickShowChanges.length && (this._tickShowChanges[0] && (this._attackActs[0][2] = [this._tickShowChanges[0]], this.isMoveOut && ftc.sendClient("c_move", {
                                actor: this.packHero,
                                targets: this._attackActs[0][2],
                                frame: 0
                            }, "LayoutBattle")), this._tickShowChanges.splice(0, 1))
                        },
                        back: function (t) {
                            this.isMoveOut = !1, ftc.sendClient("c_back", {
                                actor: this.packHero,
                                frame: t
                            }, "LayoutBattle")
                        },
                        shake: function (t, e) {
                            ftc.sendClient("c_shake", {
                                type: t,
                                frame: e,
                                scaleX: this.battleHero.type
                            }, "LayoutBattle")
                        },
                        black: function (t) {
                            ftc.sendClient("c_black", t, "LayoutBattle")
                        },
                        bullet: function (t, e, i, a) {
                            this._tickShowChanges.length > 0 && this._tickShowChanges[0] && (this._attackActs[0][2] = [this._tickShowChanges[0]], this._tickShowChanges.splice(0, 1));
                            var n = this._attackActs[0][2],
                                s = this._attackActs[0][0],
                                o = this._attackActs[0][3];
                            if (!t) {
                                var r = ftd.Skill.get(s, "a_anibullet");
                                if (r && r.length > 0) {
                                    var c = r[0].split("|");
                                    t = c[0], e = c[1], i = c[2]
                                }
                            }
                            if (t) {
                                a || (a = 0);
                                for (var h = 0; h < n.length; h++) ftc.sendClient("c_bullet", {
                                    playId: o,
                                    actor: this.packHero,
                                    target: n[h],
                                    frame: e,
                                    id: t,
                                    type: i,
                                    offsetY: Number(a)
                                }, "LayoutBattle")
                            }
                        },
                        boom: function (t, e, i) {
                            var a = this._attackActs[0][2],
                                n = this._attackActs[0][0],
                                s = this._attackActs[0][3],
                                o = [];
                            if (t) o.push([t, 1, 1, i]);
                            else {
                                var r = ftd.Skill.get(n, "a_aniboom");
                                if (r)
                                    for (var c in r) {
                                        var h = r[c].split("|"),
                                            f = h[0],
                                            d = h[1],
                                            l = h[2],
                                            u = h[3];
                                        void 0 === d && (d = 1), void 0 === l && (l = 0), void 0 === u && (u = 0), o.push([f, d, l, u])
                                    }
                            }
                            for (var c in o) {
                                t = o[c][0], o[c][1];
                                var p = o[c][2];
                                if (1 == (i = o[c][3])) ftc.sendClient("c_boom", {
                                    playId: s,
                                    id: "boom_" + t,
                                    actor: this.packHero,
                                    targets: a,
                                    from: this.packHero,
                                    pos: i,
                                    hitAct: p,
                                    downLayer: e
                                }, "LayoutBattle");
                                else if (2 == i) ftc.sendClient("c_boom", {
                                    playId: s,
                                    id: "boom_" + t,
                                    actor: a[0],
                                    targets: a,
                                    from: this.packHero,
                                    pos: i,
                                    hitAct: p,
                                    downLayer: e
                                }, "LayoutBattle");
                                else if (3 == i) ftc.sendClient("c_boom", {
                                    playId: s,
                                    id: "boom_" + t,
                                    actor: this.packHero,
                                    targets: [this.packHero],
                                    from: this.packHero,
                                    pos: i,
                                    hitAct: p,
                                    downLayer: e
                                }, "LayoutBattle");
                                else
                                    for (var g = 0; g < a.length; g++) ftc.sendClient("c_boom", {
                                        playId: s,
                                        id: "boom_" + t,
                                        actor: a[g],
                                        targets: [a[g]],
                                        from: this.packHero,
                                        pos: i,
                                        hitAct: p,
                                        downLayer: e
                                    }, "LayoutBattle")
                            }
                        },
                        skill: function (t) {
                            try {
                                var e = this.newPart("PartBattleBoom"),
                                    i = this._attackActs[0] ? this._attackActs[0][3] : 0;
                                e.setData("skill_" + t, i, this.packHero, [this.packHero], 1, !1, 0), e.node.x = 0, e.node.y = 0, this.node.addChild(e.node)
                            } catch (e) {
                                ftc.uploadCatch(e, "PartBattleHero.skill," + t)
                            }
                        },
                        effect: function (t, e) {
                            this.newEffect(t, e)
                        },
                        music: function (t) {
                            this._playMusic(t)
                        },
                        ww: function () { }
                    }
                },
                playMusic: function (t, e) {
                    this.simulcast[e] && (this.simulcast[e] = !0, this._playMusic(t))
                },
                _playMusic: function (t) {
                    if (ftc.ManagerData.get1("ManagerMap").isOpenEffect) {
                        var e = "audio/effect/" + t;
                        ftc.battleView.effectResource[e] ? cc.audioEngine.play(ftc.battleView.effectResource[e], !1, 1) : cc.loader.loadRes(e, function (i, a) {
                            a && !i ? (ftc.ManagerRes.setAutoReleaseWithLayout(ftc.battleView, e), ftc.battleView.effectResource[e] = a, this._playMusic(t)) : ftc.err("播放声音出错 " + t + i)
                        }.bind(this))
                    }
                },
                newEffect: function (t, e) {
                    try {
                        var i = this.newPart("PartBattleBoom");
                        i.setData("effect_" + t, void 0, this.packHero, [this.packHero], 2 == this.battleHero.type ? -1 : 1, !1), i.node.angle = 0, i.node.x = this.packHero.button.node.x, i.node.y = this.packHero.button.node.y, this.layout.nodeHeros.addChild(i.node), i.node.zIndex = e ? 10 : 102
                    } catch (e) {
                        ftc.uploadCatch(e, "PartBattleHero.newEffect," + t)
                    }
                },
                listenerComplete: function (t, e) {
                    if (!ftc.ManagerRes.checkNodeIsRestored(this.spine.node)) {
                        var i = t.animation ? t.animation.name : "",
                            a = i.charAt(0);
                        if (i == ftc.TypeHeroAct.jump) this.setWaitAct(), this.nodeBlood.active = !0;
                        else if (i == ftc.TypeHeroAct.ready) this.isReadAni = !0, this.setWaitAct(), this.nodeBlood.active = !0;
                        else if (a == ftc.TypeHeroAct.wait) this._isWait2 && this._hasWait2Ani && "w1" == i && this.setReadyAct();
                        else if (a == ftc.TypeHeroAct.attack) {
                            var n = this._attackActs[0][3];
                            this.startPlayHp(n, this.attackIndex), this.startPlayBuff(n, this.attackIndex), this._attackActs.splice(0, 1), this._attackActs.length > 0 ? this.setAttackAct(this._attackActs[0][1]) : this.setWaitAct()
                        } else a != ftc.TypeHeroAct.hit && a != ftc.TypeHeroAct.hitDie || (this.hitPlayId && (this.startPlayHp(this.hitPlayId, this.attackIndex), this.startPlayBuff(this.hitPlayId, this.attackIndex), this.startPlaySkill(this.hitPlayId, this.attackIndex)), this.setWaitAct(), this.hitPlayId = void 0)
                    }
                },
                setReadyAct: function () {
                    this.attackIndex = 0, this.currentAction = 5, this._setSpineAni(ftc.TypeHeroAct.ready, !1)
                },
                setJumpAct: function () {
                    this._setSpineAni(ftc.TypeHeroAct.jump)
                },
                setWaitAct: function () {
                    if (this._setZorderScale(), this.showHp > 0) {
                        if (this.spineDie.node.active = !1, this.spriteDie.node.active = !1, this.spine.node.active = !0, this._attackActs.length > 0) return void this.setAttackAct(this._attackActs[0][1]);
                        var t = 1;
                        this.isReadAni && this._hasWait2Ani && (t = 2), this.currentAction = 3, this.nodeBlood.active = !0, this._setSpineAni(ftc.TypeHeroAct.wait + t, !0), this.spine.paused = this.isSpinePause
                    } else this.currentAction = 4, this._setSpineAni(ftc.TypeHeroAct.die, !0)
                },
                setHitAct: function (t, e, i) {
                    this.spine.paused = !1;
                    var a = this.startPlayHp(e, i);
                    if (0 == t || 1 == this.currentAction) return (4 == this.currentAction && this.showHp > 0 || 0 == this.showHp && 4 != this.currentAction) && this.setWaitAct(), this.startPlayBuff(e, i), void this.startPlaySkill(e, i);
                    this.hitPlayId = e, this.showHp > 0 ? 2 == t ? 4 == this.currentAction && this.setWaitAct() : a ? (this.currentAction = 2, this._setSpineAni(ftc.TypeHeroAct.hit + 3, !1)) : 3 == t || 4 == t ? (this.currentAction = 2, this._setSpineAni(ftc.TypeHeroAct.hitDie, !1)) : (this.currentAction = 2, this._setSpineAni(ftc.TypeHeroAct.hit + 1, !1)) : 4 != this.currentAction && (this.currentAction = 2, this._setSpineAni(ftc.TypeHeroAct.hitDie, !1)), this.currentAction && this._setZorderScale(!1, !0), this.startPlaySkill(e, this.attackIndex)
                },
                setAttackAct: function (t) {
                    if (this.simulcast = {}, t) {
                        if (this.node.active = !0, this.currentAction = 1, this._setZorderScale(!0, !1), this._setSpineAni(t, !1), a = this._attackActs[0][2])
                            for (var e = 0; e < a.length; e++) a[e].part._setZorderScale(!1, !0)
                    } else {
                        var i = ftd.Skill.get(this._attackActs[0][0], "a_aniboom");
                        if (i && i.length > 0) this.handleEvent.boom.apply(this, []);
                        else {
                            var a = this._attackActs[0][2];
                            for (e = 0; e < a.length; e++) a[e] ? (a[e].part.setHitAct(0, this._attackActs[0][3], this.attackIndex), a[e].part.attackIndex++) : ft.console("错误setAttackAct：" + e)
                        }
                        this._attackActs.splice(0, 1)
                    }
                },
                _setSpineAni: function (t, e) {
                    try {
                        if (this.spine.timeScale = ftc.ManagerData.get1("ManagerBattle").speed, this.spine.paused = !1, t == ftc.TypeHeroAct.die) ftc.ManagerData.get1("ManagerBattle").model != ft.type.battleModel.turns ? this.battleHero.completelyDead ? this.spriteDie.node.active = !0 : this._hasDieAni ? (this.spineDie.node.active = !0, this.spineDie.setAnimation(0, "wait1", e)) : (this._hasDieAni = !0, this.loadResource("spine/view/com_dead", sp.SkeletonData, function (t) {
                            t && (this.spineDie.skeletonData = t, this.spineDie.node.active = !0, this.spineDie.setAnimation(0, "wait1", e))
                        }.bind(this))) : this.cleanAllBuff(), this.spine.node.active = !1, this.nodeBlood.active = !1;
                        else this.spine.node.active = !0, null == this.spine.setAnimation(0, t, e) && ("a5" != t && "h3" != t && ftc.err("武将" + this.battleHero.id + "未找到动画" + t), t = 0 == t.indexOf(ftc.TypeHeroAct.attack) ? "a1" : "h1", this.spine.setAnimation(0, t, e)), this.spineDie.node.active = !1, this.spriteDie.node.active = !1
                    } catch (e) {
                        ftc.uploadCatch(e, "PartBattleHero._setSpineAni," + this.battleHero.id + "," + t)
                    }
                },
                _setZorderScale: function (t, e) {
                    this.packHero.button.node.zIndex = t ? 101 : e ? this.battleHero.initZIndex + 11 : this.battleHero.initZIndex
                },
                setSelect: function () {
                    this.node.active = !0, this.nodeActionNow.active = !0, this.spineActionNow.setAnimation(0, "wait1", !1)
                },
                setTarget: function (t) {
                    this.node.active = !0, t ? (this.nodeTarget.active = !1, this.nodeTargetSelect.active = !0, this.spineTargetSelect.setAnimation(0, "wait1", !1)) : (this.nodeTarget.active = !0, this.nodeTargetSelect.active = !1, this.spineTarget.setAnimation(0, "wait1", !1))
                },
                setShowExtHp: function (t, e) {
                    e && (this.maxExtHp = e), this.maxExtHp || (this.maxExtHp = this.battleHero.maxExtHp), t > 0 ? (this.progressBarHp2.node.active = !0, this.progressBarHp2.progress = t / this.maxExtHp) : t <= 0 && (this.progressBarHp2.node.active = !1)
                },
                setShowHp: function (t, e) {
                    this.showHp = t, this.progressBarHp.progress = this.showHp / this.battleHero.maxHp
                },
                startPlayHp: function (t, e) {
                    void 0 == e && (e = 0);
                    for (var i = !1, a = this._tickShowHps.length - 1; a >= 0; a--) {
                        var n = this._tickShowHps[a];
                        if (n[0] == t && n[1] <= e && (this.idShowHps[n[7]] = n, this._tickShowHps.splice(a, 1), n[7] <= this.curHpId))
                            for (; this.idShowHps[this.curHpId];) {
                                var s = this.idShowHps[this.curHpId],
                                    o = s[2],
                                    r = s[4],
                                    c = s[5],
                                    h = s[6];
                                ftc.sendClient("c_hp", {
                                    actor: this,
                                    hurt: o,
                                    bj: r % 100,
                                    type: h
                                }, "LayoutBattle"), r < 100 ? (c.setShowHp(s[3], !0), 2 == r && (i = !0)) : r >= 100 && c.setShowExtHp(s[3]), delete this.idShowHps[this.curHpId], this.curHpId++
                            }
                    }
                    return i
                },
                startPlayBuff: function (t, e) {
                    void 0 == e && (e = 0);
                    for (var i = this._tickShowBuffs.length - 1; i >= 0; i--) {
                        var a = this._tickShowBuffs[i];
                        if (a[0] == t && a[1] <= e) {
                            var n = a[2],
                                s = a[3],
                                o = a[4],
                                r = a[5],
                                c = ftd.Skillbuff.get(n, "img");
                            if (s) {
                                var h = ftd.Skillbuff.get(n, "aniboom");
                                (c || h) && (r.addBuffImg(c), r.allBuffParts[n] ? r.allBuffParts[n].count++ : r.allBuffParts[n] = {
                                    img: c,
                                    param: o,
                                    boom: r.addBuffAni(t, h),
                                    count: 1
                                }, h && r.allBuffParts[n].boom.setAnimation("wait" + (r.allBuffParts[n].count + 1))), "眩晕" == o ? r.isSpinePause = !0 : "护盾" == o ? r.setShowExtHp(r.battleHero.maxExtHp, r.battleHero.maxExtHp) : "亡魂" == o && (r.spine.node.opacity = 64), r.allBuffIds.push(n)
                            } else
                                for (var f in r.allBuffParts[n] && (r.deleteBuffImg(r.allBuffParts[n].img), r.allBuffParts[n].count--, r.allBuffParts[n].count <= 0 && (r.deleteBuffAni(r.allBuffParts[n].boom), delete r.allBuffParts[n])), "眩晕" == o ? (r.isSpinePause = !1, r.spine.paused = !1, r.nodeBlood.opacity = 255) : "护盾" == o ? (r.oldExtHp = 0, r.oldMaxExtHp = 0, r.setShowExtHp(0)) : "亡魂" == o && (r.spine.node.opacity = 255, this._setSpineAni(ftc.TypeHeroAct.die)), r.allBuffIds)
                                    if (r.allBuffIds[f] == n) {
                                        r.allBuffIds.splice(f, 1);
                                        break
                                    } this._tickShowBuffs.splice(i, 1)
                        }
                    }
                },
                startPlaySkill: function (t, e, i) {
                    void 0 == e && (e = 0);
                    for (var a = this._tickShowSkills.length - 1; a >= 0; a--) {
                        var n = this._tickShowSkills[a];
                        if (n[0] == t && n[1] <= e) {
                            var s, o = n[2];
                            i && o.skill && (s = ftd.Skill.get(o.skill[0], "a_aniboom")), (!i || s && s.length) && (o.subSkills ? ftc.sendClient("c_skill2", o, "LayoutBattle") : ftc.sendClient("c_skill", o, "LayoutBattle"), this._tickShowSkills.splice(a, 1))
                        }
                    }
                },
                addBuffAni: function (t, e) {
                    var i;
                    if (e) try {
                        if (ftc.ManagerRes.checkNodeIsRestored(this.node)) return;
                        (i = this.newPart("PartBattleBoom")).setData("boom_" + e, t, this.packHero, [this.packHero], 1, !0, 0), this.node.addChild(i.node)
                    } catch (t) {
                        ftc.uploadCatch(t, "PartBattleHero.addBuffAni," + e)
                    }
                    return i
                },
                deleteBuffAni: function (t) {
                    t && ftc.ManagerRes.restoreNode(t.node)
                },
                cleanAllBuff: function () {
                    for (var t in this.allBuffParts) this.deleteBuffImg(this.allBuffParts[t].img), this.deleteBuffAni(this.allBuffParts[t].boom);
                    this.allBuffParts = {}
                },
                updateBuffImgs: function () {
                    for (var t = 0; t < this.spriteBuffs.length; t++)
                        if (t < this.allBuffImgs.length) {
                            if (this.spriteBuffs[t].node.active = !1, this.allBuffImgs[t][1] > 0) {
                                var e = ftc.ManagerRes.getSpriteFrame("program", "play_buff" + this.allBuffImgs[t][0]);
                                e && (this.spriteBuffs[t].node.active = !0, this.spriteBuffs[t].spriteFrame = e)
                            }
                        } else this.spriteBuffs[t].node.active = !1
                },
                deleteBuffImg: function (t) {
                    if (t)
                        for (var e = 0; e < this.allBuffImgs.length; e++)
                            if (this.allBuffImgs[e][0] == t) {
                                if (this.allBuffImgs[e][1]--, this.allBuffImgs[e][1] > 0) return;
                                this.allBuffImgs.splice(e, 1), this.updateBuffImgs();
                                break
                            }
                },
                addBuffImg: function (t) {
                    if (t) {
                        for (var e = 0; e < this.allBuffImgs.length; e++)
                            if (this.allBuffImgs[e][0] == t) return void this.allBuffImgs[e][1]++;
                        if (this.allBuffImgs.push([t, 1]), this.updateBuffImgs(), 12 != t) {
                            var i = Number(t) + 100;
                            i && ftc.sendClient("c_hp", {
                                actor: this,
                                hurt: 0,
                                bj: i
                            }, "LayoutBattle")
                        }
                    }
                },
                addAttackAct: function (t, e, i, a, n) {
                    if (a) {
                        if (this._attackActs[0] && e ? this._attackActs[0] = [t, e, i, n] : this._attackActs.splice(0, 0, [t, e, i, n]), e && this.hitPlayId) return
                    } else this.attackIndex = 0, this._attackActs.push([t, e, i, n]), this.startPlaySkill(n, this.attackIndex, !0);
                    (1 == this._attackActs.length || a) && this.setAttackAct(e)
                },
                addShowHp: function (t, e, i, a, n, s, o, r, c) {
                    this._tickShowHps.splice(0, 0, [t, e, i, a, n, s, r, c]), o && this.startPlayHp(t, e)
                },
                addShowBuff: function (t, e, i, a, n, s, o) {
                    this._tickShowBuffs.push([t, e, i, a, n, s]), o && this.startPlayBuff(t, e)
                },
                addShowSkill: function (t, e, i) {
                    this._tickShowSkills.splice(0, 0, [t, e, i])
                },
                addShowChange: function (t) {
                    this._tickShowChanges.push(t)
                },
                getBulletInitPos: function () {
                    var t = this.spine.findBone("_a1");
                    if (t) return {
                        x: t.worldX,
                        y: t.worldY
                    }
                },
                cleanSelect: function () {
                    this.nodeActionNow.active = !1
                },
                cleanTarget: function () {
                    this.nodeTarget.active = !1, this.nodeTargetSelect.active = !1
                },
                loadRes: function (t, e) {
                    this.setShowHp(this.battleHero.curHp), this.setShowExtHp(0), this.updateBuffImgs();
                    var i = ft.ExtHero.getImg(this.battleHero.id, !0);
                    try {
                        this.loadResource("spine/role/" + i, sp.SkeletonData, function (i) {
                            if (i) {
                                this.spine.paused = !1, this.spine.skeletonData = i, this._hasWait2Ani = this.spine.findAnimation("w2");
                                var a = [],
                                    n = [];
                                if (i.skeletonJson.events)
                                    for (var s in i.skeletonJson.events) {
                                        var o;
                                        if ((o = s.indexOf("_") > 0 ? s.split("_") : s.split(" "))[1]) switch (o[0]) {
                                            case "boom":
                                                a.push("spine/boom/boom_" + o[1]);
                                                break;
                                            case "effect":
                                                a.push("spine/boom/effect_" + o[1]);
                                                break;
                                            case "skill":
                                                a.push("spine/boom/skill_" + o[1]);
                                                break;
                                            case "music":
                                                n.push("audio/effect/" + o[1])
                                        }
                                    }
                                a.length && cc.loader.loadResArray(a, sp.SkeletonData, function (t, e) {
                                    if (e && e.length == e.length)
                                        for (var i = 0; i < e.length; i++) e[i] && ftc.ManagerRes.setAutoReleaseWithLayout(ftc.battleView, a[i], sp.SkeletonData)
                                }), n.length && ftc.ManagerData.get1("ManagerMap").isOpenEffect && cc.loader.loadResArray(n, function (t, e) {
                                    if (e && e.length == n.length)
                                        for (var i = 0; i < n.length; i++) ftc.ManagerRes.setAutoReleaseWithLayout(ftc.battleView, n[i]), ftc.battleView.effectResource[n[i]] = e[i]
                                })
                            }
                            e ? this.setJumpAct() : this.setWaitAct(), t()
                        }.bind(this), this)
                    } catch (t) {
                        ftc.err(i + "骨骼动画有误：" + t)
                    }
                },
                checkIsAniEnd: function () {
                    return 3 == this.currentAction || 4 == this.currentAction
                },
                updateData: function (t) { },
                tick: function (t) {
                    this.tickAddPlayingHpSize > 0 && (this.tickAddPlayingHpSize -= t, this.tickAddPlayingHpSize <= 0 && (this.playingHpSize--, this.playingHpSize <= 0 ? this.playingHpSize = 0 : this.tickAddPlayingHpSize = .1))
                },
                onClick: function (t, e) { },
                getPlayingHpSize: function () {
                    return this.playingHpSize
                },
                addPlayingHpSize: function () {
                    this.playingHpSize++, this.tickAddPlayingHpSize = .1
                },
                newHpart: function (t, e, i) {
                    var a = this.newPart("PartBattleBloodAni");
                    return a.node.x = this.packHero.button.node.x, a.node.y = this.packHero.button.node.y + ftc.PartHeroHeight + 30 * this.getPlayingHpSize(), a.node.zIndex = 104, this.addPlayingHpSize(), a.setData(t, e, i, this), this.allHpParts.push(a), a
                },
                updateAllHpPartPos: function () {
                    for (var t = 0; t < this.allHpParts.length; t++) {
                        var e = this.allHpParts[t];
                        e.node.x = this.packHero.button.node.x, e.node.y = this.packHero.button.node.y + ftc.PartHeroHeight + 30 * this.getPlayingHpSize()
                    }
                }
            })
        