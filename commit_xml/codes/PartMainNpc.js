

var number_arr = [0, 180, 0, -90, 90],
    n = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1042, 1043, 1048, 1049, 1061, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074, 1075, 1076, 1077, 1078, 1079, 1081, 1086, 1087, 1089, 1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1559, 1562, 1563, 1575, 2010, 2545, 2546, 3, 3006, 3008, 3009, 3012, 3013, 3015, 4];
cc.Class({
    extends: ftc.BasePart,
    properties: {
        spine: sp.Skeleton,
        sprite: cc.Sprite,
        labelName: cc.Label,
        spriteLight: cc.Sprite,
        npc: null,
        tx: 0,
        ty: 0,
        tw: 2,
        th: 2,
        _inNpcIds: null
    },
    init: function () { },
    load: function () {
        this._isApiTick = void 0, this._stopmoveTick = 0, this._dirTick = 0, this._movingTick = 0, this._mapModel = void 0
    },
    setData: function (t, e, i) {
        var a = ft.ExtNpc.getNameVisible(t.id);
        a > 0 ? (this.labelName.node.active = !0, this.labelName.string = ft.ExtNpc.getName(t.id), 1 == a ? (this.sprite.node.y = -10, this.labelName.node.anchorX = 1, this.labelName.node.anchorY = 0, this.labelName.node.width = 24, this.labelName.node.position = cc.v2(-32, 16), this.labelName.overflow = cc.Label.Overflow.RESIZE_HEIGHT) : 2 == a && (this.sprite.node.y = -32, this.labelName.node.anchorX = .5, this.labelName.node.anchorY = 1, this.labelName.node.position = cc.v2(0, -30), this.labelName.overflow = cc.Label.Overflow.NONE)) : this.labelName.node.active = !1, this.setNodeActive(!1), this.parentNode = i, this.dir = -1, this.dirWalk = !1, this._noAni = !0, this.fixedDir = !1, this.isBattleAni = !1, this.node.scale = 1, this.npc = t, this.tw = t.tw, this.th = t.th, void 0 === this.tw && (this.tw = 2), void 0 === this.th && (this.th = 2), this.tx = parseInt(t.x), this.ty = parseInt(t.y);
        var s = ftd.Npc.get(t.id, "img");
        if (void 0 === this.npc.opacity || 255 == this.npc.opacity ? this.node.opacity = 255 : this.node.opacity = this.npc.opacity, this._isAniLoaded = !0, this._spineAnis = {}, s) {
            var o, r = ftc.ManagerData.get2Object("Npc", this.npc.id);
            if (r) {
                var c = r.pattern;
                if (c >= 0) {
                    for (var h = [], f = 0, d = s.toString().length / 4; f < d; f++) h.splice(0, 0, s % 1e4), s = Math.floor(s / 1e4);
                    s = h[c]
                }
            }
            if (s >= 3020 && s < 3100 || s > 4e3) this.spine.node.active = !1, this.sprite.node.active = !0, this.sprite.node.scale = 1, this.sprite.spriteFrame = ftc.ManagerRes.getSpriteFrame("icon_hero", "hero" + s), this.sprite.node.stopAllActions(), this.npc.move && 2 == this.npc.move[0] || this.sprite.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(ft.rand(100) / 300), cc.scaleTo(.625, 1.03), cc.scaleTo(.625, 1)))), this.setDir(t.face), e && e();
            else s >= 3e3 ? o = -1 === n.indexOf(Number(s)) ? "spine/npc/hero" + s : "spine/npc/map_role_" + s : (-1 === n.indexOf(Number(s)) && (s = 2010), o = "spine/npc/map_role_" + s, this.isBattleAni = !1), this.spine.node.active = !0, this.sprite.node.active = !1, this._isAniLoaded = !1, this.loadResource(o, sp.SkeletonData, function (t) {
                if (t) {
                    this._isAniLoaded = !0, this._noAni = !1, this.spine.skeletonData = t, this.isBattleAni ? this.spine.node.scale = .9 : this.spine.node.scale = 1;
                    for (var i = !1, a = 1; a <= 4; a++) this.spine.findAnimation("dir" + a) && (this._spineAnis["dir" + a] = !0, i = !0);
                    for (a = 1; a <= 8; a++) this.spine.findAnimation("wait" + a) && (this._spineAnis["wait" + a] = !0, i = !0);
                    i ? (this.spine.animation = "", this.showAniWait()) : this.spine.animation = "w1"
                }
                e && e()
            }.bind(this))
        } else this.spine.node.active = !1, this.sprite.node.active = !1, this.setDir(t.face), e && e();
        this._movingTick = 0, this._moveIndex = 0, this._moveRepeat = 0, this._stopmoveTick = 0, this._isCrashNpc = void 0, this._init = !0, this._inNpcIds = null, this.type = ftd.Npc.get(t.id, "type"), this.spriteLight.node.active = this.type == ft.type.npc.light;
        var l = ftd.Npc.get(t.id, "motion");
        this.setMotion(l), this._dirTick = 0, this._nextDir = 0, this._pauseMotion = !1, this.lightDis = 4e4
    },
    bindMapModel: function (t) {
        this._mapModel = t
    },
    setMotion: function (t) {
        t ? (this.motion = {}, this.motion.walktype = ftd.Npcmotion.get(t, "walktype"), this.motion.walkradius = ftd.Npcmotion.get(t, "walkradius"), this.motion.walkspeed = ftd.Npcmotion.get(t, "walkspeed"), this.motion.walkdirs = ftd.Npcmotion.get(t, "walkdirs"), this.motion.walkrepeat = ftd.Npcmotion.get(t, "walkrepeat"), this.motion.catchradius = ftd.Npcmotion.get(t, "catchradius"), this.motion.catchspeed = ftd.Npcmotion.get(t, "catchspeed"), this.motion.catchopacity = ftd.Npcmotion.get(t, "catchopacity")) : this.motion = void 0
    },
    setNodeActive: function (t) {
        this.node.active = t, this.nodeActive = t, this.spriteSte && (this.spriteSte.node.active = t)
    },
    addTx: function (t) {
        this.tx += t
    },
    addTy: function (t) {
        this.ty += t
    },
    enter: function () { },
    updateData: function () {
        if (this._init && (this._init = !1, this.node.opacity > 0 && this.setNodeActive(!0)), this._pauseMotion) {
            this.spriteLight.node.active = !1;
            ftd.Npc.get(this.npc.id, "action");
            this._recoverTick = 1
        }
        this.updateStatus(), this.updateOpacity(), 0 == this._movingTick && this.node.setPosition((this.tx + this.tw / 2) * ftc.TileSize, (this.ty + .5) * ftc.TileSize)
    },
    updateOpacity: function () {
        this.npc.toOpacity ? (this.npc.toOpacity[0] > 0 && this.setNodeActive(!0), this.npc.toOpacity[1] > 0 ? (this.node.stopAllActions(), this.node.runAction(cc.sequence(cc.fadeTo(this.npc.toOpacity[1], this.npc.toOpacity[0]), cc.callFunc(function () {
            this.npc.toOpacity[2] && 0 == this.node.opacity && this.setNodeActive(!1), this.npc.toOpacity = void 0
        }.bind(this)))), this.npc.toOpacity = 0) : (this.node.opacity = this.npc.toOpacity[0], this.npc.toOpacity = void 0, 0 == this.node.opacity && this.setNodeActive(!1))) : 0 !== this.npc.toOpacity && this.setNodeActive(!!this.npc.v)
    },
    tick: function (t) { },
    cleanup: function () { },
    onClick: function (t) { },
    updateStatus: function (t, e) {
        void 0 !== t && (this.npc.status = t), this.npc.status ? (this.spriteSte || (this.spriteSte = ftc.ManagerRes.getNode("SpriteSte", cc.Sprite), this.parentNode.addChild(this.spriteSte.node)), this.updateStatusPos(), this.spriteSte.node.active = !0, this.spriteSte.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "map_npc_status" + this.npc.status), this.spriteSte.node.stopAllActions(), 1 == e ? (this.spriteSte.node.opacity = 0, this.spriteSte.node.runAction(cc.sequence(cc.fadeIn(.1), cc.moveBy(.1, 0, 10), cc.delayTime(.1), cc.moveBy(.1, 0, -10), cc.delayTime(.1), cc.fadeOut(.05), cc.callFunc(function () {
            this.spriteSte.node.active = !1, this.npc.status = 0
        }.bind(this))))) : (this.spriteSte.node.runAction(cc.repeatForever(cc.sequence(cc.fadeIn(.1), cc.delayTime(1), cc.fadeOut(.1)))), this.spriteSte.node.opacity = 255)) : this.deleteStatus()
    },
    deleteStatus: function () {
        this.spriteSte && (ftc.ManagerRes.restoreNode(this.spriteSte.node), this.spriteSte = void 0)
    },
    updateStatusPos: function () {
        this.spriteSte && (this.spriteSte.node.x = this.node.x, this.spriteSte.node.y = this.node.y + 120, this.spriteSte.node.zIndex = this.node.zIndex + 500)
    },
    tickMove: function (t) {
        if (this.nodeActive || this._isApiTick) {
            if (this._recoverTick > 0) return this._recoverTick -= t, void (this._recoverTick <= 0 && this.resumeMotion());
            if (!this._pauseMotion) {
                if (!(this._stopmoveTick > 0)) return this._dirTick > 0 ? (this._dirTick -= t, void (this._dirTick <= 0 && this._toNextDir(this._nextDir))) : !(this._movingTick >= 0) || (this._movingTick -= t, this.updateStatusPos(), this._movingTick <= 0);
                this._stopmoveTick -= t
            }
        }
    },
    checkMotion: function (t, e, i, a) {
        this._mapRole = t, this._curSpeed = ftc.StandardSpeed;
        var n = this.npc,
            s = void 0,
            o = 0,
            r = 255;
        if (this.motion)
            if (o = this.motion.walkspeed, r = this.npc.opacity, this.motion.walktype === ft.type.npcWalk.custom)
                if (0 === this.motion.walkrepeat || this._moveRepeat < this.motion.walkrepeat) {
                    if (s = parseInt(this.motion.walkdirs.charAt(this._moveIndex)), -1 == (h = this._checkMapRoleWallNpcs(s))) return this._callbackOpenMoveNpc(), void (this.motion = void 0);
                    1 == h ? (this._moveIndex++, this._moveIndex >= this.motion.walkdirs.length && (this._moveIndex = 0, this._moveRepeat++), o || (o = .1)) : (this._callbackOpenMoveNpc(), this.showWaitAnimation(), this.motion = void 0)
                } else o = 0, this._callbackOpenMoveNpc(), this.motion = void 0, this.showWaitAnimation();
            else if (this.motion.walktype === ft.type.npcWalk.random)
                if (o || (o = .1), ft.rand(100) < 50) {
                    for (var c = 0; c < 4;) {
                        c++, s = ft.rand(4) + 1;
                        var h, f = ftc.MapModel.getDirXY(s),
                            d = ft.distance2Point(n.x, n.y, this.tx + f[0], this.ty + f[1]);
                        if (-1 == (h = this._checkMapRoleWallNpcs(s))) return;
                        if (d <= this.motion.walkradius && 1 == h) break;
                        s = void 0
                    }
                    void 0 === s && (this._stopmoveTick = .5, this.showWaitAnimation())
                } else this._stopmoveTick = .5, this.showWaitAnimation();
            else if (this.motion.walktype === ft.type.npcWalk.motionless) this.fixedDir = !0, this.showWaitAnimation();
            else if (this.motion.walktype === ft.type.npcWalk.turn) {
                var l = this.motion.walkradius;
                void 0 === l && (l = 5), ft.distance2Point(this.tx, this.ty, this._mapRole.tx, this._mapRole.ty) <= l && (this._mapRole.tx < this.tx ? this.showWaitAnimation(ft.DIRLEFT) : this.showWaitAnimation(ft.DIRRIGHT))
            }
        void 0 !== s && (o > 0 ? (this._movingTick = this._curSpeed / o, this.checkIsInWindow(e, i), this.dir === s ? this._toNextDir(s) : (this._nextDir = s, this._dirTick = .5, this._turnDir(s, this._dirTick))) : this.showWaitAnimation(s), void 0 === this.npc.toOpacity && (void 0 === r && (r = 255), this.node.opacity = r)), this._sectorSearchEnemy(this._mapRole) && (this.pauseMotion(), this._mapModel.startNpcEvent(this, !1))
    },
    pauseMotion: function () {
        this._pauseMotion = !0, this.spine.paused = !0, this.node.stopAllActions()
    },
    resumeMotion: function () {
        if (this._pauseMotion = !1, this.spine.paused = !1, this.spriteLight.node.active = this.type == ft.type.npc.light, this.setMotion(ftd.Npc.get(this.npc.id, "motion")), this._movingTick) {
            var t = (this.tx + this.tw / 2) * ftc.TileSize,
                e = this.ty * ftc.TileSize;
            this.node.runAction(cc.moveTo(this._movingTick, t, e))
        }
    },
    checkIsInWindow: function (t, e) {
        if (this.nodeActive) {
            var i = this.node.x + t,
                a = this.node.y + e;
            i + ftc.TileSize * this.tw < -ftc.TileSize || a + ftc.TileSize * (this.th + 1) < -ftc.TileSize || i > cc.winSize.width + ftc.TileSize || a > ftc.DesignHeight + ftc.TileSize ? this.node.active = !1 : this.node.active = !0
        }
    },
    setDir: function (t, e) {
        if (0 != t) {
            if (this.dir = t, this.dirWalk = e, this._noAni) t == ft.DIRRIGHT ? this.sprite.node.eulerAngles = cc.v3(0, 0, 0) : t == ft.DIRLEFT && (this.sprite.node.eulerAngles = cc.v3(0, 180, 0));
            else if (this._isAniLoaded) {
                var i, a = e ? "dir" : "wait";
                if (!this.isBattleAni && this._spineAnis[a + t]) this.spine.animation = a + t, this.spine.node.eulerAngles = cc.v3(0, 0, 0);
                else i = this.isBattleAni ? ftc.TypeHeroAct.wait + 1 : a + ft.DIRRIGHT, this._spineAnis[i] && (this.spine.animation = i), t == ft.DIRLEFT && (this.spine.node.eulerAngles = cc.v3(0, 180, 0))
            }
        } else ftc.err("npc\u9519\u8bef\u65b9\u5411 npcid" + this.npc.id)
    },
    showAniWait: function (t) {
        !this._noAni && this._isAniLoaded && (t || 2 != this.npc.v && 1 != this.npc.ste || !this._spineAnis.wait6 ? this.showWaitAnimation(this.npc.face) : (this.spine.animation = "wait6", this.npc.face == ft.DIRLEFT ? this.spine.node.eulerAngles = cc.v3(0, 180, 0) : this.spine.node.eulerAngles = cc.v3(0, 0, 0)))
    },
    showAniOpen: function (t) {
        !this._noAni && this._isAniLoaded && (1 == t ? this._spineAnis.wait5 && (this.spine.setCompleteListener(this.listenerComplete.bind(this)), this.spine.setAnimation(0, "wait5", !1)) : this._spineAnis.wait7 ? (this.spine.setCompleteListener(this.listenerComplete.bind(this)), this.spine.setAnimation(0, "wait7", !1)) : this.showAniWait(!0))
    },
    listenerComplete: function (t, e) {
        if (cc.isValid(this.node)) {
            var i = t.animation ? t.animation.name : "";
            "wait5" == i && this._spineAnis.wait6 ? (this.spine.animation = "wait6", this.dir == ft.DIRLEFT ? this.spine.node.eulerAngles = cc.v3(0, 180, 0) : this.spine.node.eulerAngles = cc.v3(0, 0, 0)) : "wait7" == i ? this.showAniWait(!0) : this.showWaitAnimation(), this.spine.setCompleteListener(function () { })
        }
    },
    getInNpc: function (t) {
        if (this._inNpcIds) return this._inNpcIds[t]
    },
    setInNpc: function (t, e) {
        this._inNpcIds || (this._inNpcIds = {}), this._inNpcIds[t] = e
    },
    showDirAnimation: function (t) {
        this.dir == t && this.dirWalk || this.setDir(t, !0)
    },
    showWaitAnimation: function (t) {
        void 0 === t && (t = this.dir), (this.dir != t || this.dirWalk) && this.setDir(t)
    },
    startMoveAction: function (t, e, i, a) { },
    tickMoveAction: function (t) { },
    isContains: function (t, e) {
        return this.tx <= t && this.tx + this.tw > t && this.ty <= e && this.ty + this.th > e
    },
    _turnDir: function (t, e) { },
    _toNextDir: function (t) {
        if (!this._pauseMotion) {
            this.spriteLight.node.angle = number_arr[t], this.showDirAnimation(t);
            var e = ftc.MapModel.getDirXY(t);
            this.tx += e[0], this.ty += e[1];
            var i = (this.tx + this.tw / 2) * ftc.TileSize,
                n = (this.ty + .5) * ftc.TileSize;
            this.node.active && (void 0 === this.npc.opacity || this.npc.opacity > 0) ? this.node.runAction(cc.moveTo(this._movingTick, i, n)) : (this.node.x = i, this.node.y = n)
        }
    },
    _sectorSearchEnemy: function (t) {
        if (this.type == ft.type.npc.light && !this._pauseMotion) {
            var e = Math.atan2(t.ty - this.ty, t.tx - this.tx) / Math.PI * 180,
                i = this.spriteLight.node.angle - 90;
            if (this._judgeAngle(e, i, 60)) {
                var a = t.getRolePosition().x - this.node.x,
                    n = t.getRolePosition().y - this.node.y;
                if (a * a + n * n <= this.lightDis) return !0
            }
        }
        return !1
    },
    _judgeAngle: function (t, e, i) {
        return (e > 90 || e < -90) && (e = (e + 360) % 360, t = (t + 360) % 360), t < e + i && t >= e - i
    },
    _callbackOpenMoveNpc: function () {
        this.motion.callbackName && (ftc.sendCallback(this.motion.callbackName + this.npc.id), 0 === this.node.opacity && (this.node.active = !1), this.motion.callbackName = void 0, this._isApiTick = void 0, ftc.cancelTop())
    },
    _checkMapRoleWallNpcs: function (t) {
        if (this._isCrashNpc && !this._isApiTick) return -1;
        var e = ftc.MapModel.getDirXY(t);
        try {
            var i = this.tx + e[0],
                a = this.ty + e[1];
            if (this._mapModel.isCrashWall(i, a, this.npc.floor)) return 0;
            if (this._mapRole.isContains(i, a) && this._mapRole.floor == this.npc.floor) return this._mapModel.startNpcEvent(this), this.showWaitAnimation(), this._stopmoveTick = .5, -1;
            for (var n in this._mapModel._partNpcs) {
                var s = this._mapModel._partNpcs[n];
                if (this != s && this._mapModel.checkNpcIsCanShow(s.npc) && s.isContains(i, a) && s.npc.floor == this.npc.floor) return 0
            }
            return 1
        } catch (e) {
            return ftc.uploadCatch(e, "npc id = " + this.npc.id + ",dir = " + t), 0
        }
    }
})
