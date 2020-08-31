

cc._RF.push(e, "08fae6l2URM74d0BHzTQNj1", "PartMainRole");
var number_arr = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1042, 1043, 1048, 1049, 1061, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074, 1075, 1076, 1077, 1078, 1079, 1081, 1086, 1087, 1089, 1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1559, 1562, 1563, 1575, 2010, 2545, 2546, 3, 3006, 3008, 3009, 3012, 3013, 3015, 4];
cc.Class({
    extends: ftc.BasePart,
    properties: {
        tx: 0,
        ty: 0
    },
    init: function () {
        this.tw = 1, this.th = 1
    },
    load: function () {
        this.floor = 0, this._curAddAni = -1, this._spines = [], this._spineAdd = void 0, this._queueDirs = [], this._spineLength = 1
    },
    updateData: function () { },
    tick: function (t) { },
    cleanup: function () { },
    onClick: function (t) { },
    addTx: function (t) {
        this.tx += t
    },
    addTy: function (t) {
        this.ty += t
    },
    lockDir: function () {
        this._lockDir = !0
    },
    unlockDir: function () {
        this._lockDir = !1
    },
    setData: function (t, e, i, a, n) {
        this._aniSte = -1, this.dir = void 0 !== e ? e : ft.DIRUP, this._lockDir = !1, this.tx = parseInt(i), this.ty = parseInt(a), this._parentNode = t, this.speed = n, this.updateSkin(), this.updateAddAni(), this.updateTitle()
    },
    updateSkin: function () {
        for (var t = this.getSkinInfo(), e = t.skins, i = t.types, a = e.length, n = 0; n < a; n++) this.loadSkin(e[n], n, i[n]);
        for (n = a; n < this._spines.length; n++) this._spines[n].node.active = !1;
        this._spineLength = a, this.updateDirs(a)
    },
    getSkinInfo: function () {
        var t = [],
            e = [],
            i = ftc.ManagerData.get1("ManagerMap"),
            a = i.lockSkin;
        if (a) t[0] = a, e[0] = ft.type.skin.lock;
        else {
            var n = i.mapSkin;
            if (n) t[0] = n, e[0] = ft.type.skin.lock;
            else if ("0|0" == i.skins) t[0] = i.skin0, t[1] = i.skin1, e[0] = ft.type.skin.lord, e[1] = ft.type.skin.lord;
            else {
                var s = i.skinTypes.split(","),
                    o = i.skins.split("|");
                if (s[0] == ft.type.skin.team) {
                    t = o[0].split(",");
                    for (var r = 0; r < t.length; r++) e[r] = ft.type.skin.team
                } else t = o, e = s
            }
        }
        t[0] || (t[0] = 1001, e[0] = ft.type.skin.lord);
        for (r = t.length - 1; r >= 0; r--) 0 == t[r] && (t.splice(r, 1), e.splice(r, 1));
        return {
            skins: t,
            types: e
        }
    },
    loadSkin: function (t, e, i) {
        var n, s;
        this._spines[e] || (this._spines[e] = ftc.ManagerRes.getNode("PartMainRole2", sp.Skeleton)), this._spines[e].node.parent || this._parentNode.addChild(this._spines[e].node), n = i == ft.type.skin.specify ? ftd.Item.get(t, "c_work") : t > 1e3 ? ft.ExtHero.getImg(t) : t, i == ft.type.skin.commander || i == ft.type.skin.team || i == ft.type.skin.lock ? (s = "spine/npc/map_role_", -1 === number_arr.indexOf(Number(n)) && (n = 2010)) : s = "spine/npc/npc_", this.loadResource(s + n, sp.SkeletonData, function (t) {
            if (this._spines[e].node.active = !0, this._spines[e].skeletonData = t, this._spines[e].node.scale = 1, this._spines[e].timeScale = this.speed, this.showDirAnimation(), this.showWaitAnimation(), e > 0) {
                var i = this._spines[e - 1];
                if (1 === e) {
                    var a = this._queueDirs[e],
                        n = this.getOffset(a);
                    this._spines[e].node.position = cc.v2(i.node.x + n.x, i.node.y + n.y)
                } else this._spines[e].node.position = cc.v2(i.node.x, i.node.y)
            }
            this.setZIndex()
        }.bind(this))
    },
    updateDirs: function (t) {
        void 0 === t && (t = this._queueDirs.length);
        for (var e = 0; e < t; e++) void 0 === this._queueDirs[e] && (this._queueDirs[e] = ft.DIRUP);
        for (e = t; e < this._spines.length; e++) this._queueDirs[e] = void 0;
        this._queueDirs.unshift(this.dir), this._queueDirs.pop()
    },
    updateSpeed: function (t) {
        this.speed = t;
        for (var e = 0; e < this._spines.length; e++) this._spines[e] && this._spines[e].node.active && (this._spines[e].timeScale = this.speed)
    },
    updateAddAni: function () {
        var t = ftc.ManagerData.get1("ManagerMap").addRoleAni;
        t != this._curAddAni && (1 != t || this._spineAdd ? 0 == t && this._spineAdd && (ftc.ManagerRes.restoreNode(this._spineAdd.node), this._spineAdd = void 0) : (this._spineAdd = ftc.ManagerRes.getNode("PartMainRoleAddAni", sp.Skeleton), this.loadResource("spine/npc/hudie", sp.SkeletonData, function (t) {
            this._spineAdd.skeletonData = t, this._spineAdd.animation = "wait1"
        }.bind(this)), this.getFirstRole().node.addChild(this._spineAdd.node)), this._curAddAni = t)
    },
    updateTitle: function () {
        this.partTitle || (this.partTitle = this.newPart("PartTitle"), this._parentNode.addChild(this.partTitle.node)), this.partTitle.updateData(), this.updateTitlePos(this.getFirstRole().node.x, this.getFirstRole().node.y, 0)
    },
    updateTitlePos: function (t, e, i) {
        this.partTitle && this.partTitle.node.active && (e += 136, 0 == i ? (this.partTitle.node.x = t, this.partTitle.node.y = e) : ftc.startMoveAction(this.partTitle.node, i, t, e), this.partTitle.node.zIndex = this.getFirstRole().node.zIndex + 500)
    },
    removeFromParent: function () {
        for (var t = 0; t < this._spines.length; t++) this._spines[t] && this._spines[t].node.removeFromParent(!1)
    },
    showDirAnimation: function (t) {
        if (!this._lockDir && (void 0 == t && (t = this.dir), this.dir != t || 1 != this._aniSte)) {
            this._aniSte = 1, this.dir = t, this.updateDirs();
            for (var e = 0; e < this._spines.length; e++) this._spines[e] && this._spines[e].node.active && (this._spines[e].animation = "dir" + this._queueDirs[e]);
            this.setZIndex()
        }
    },
    showWaitAnimation: function (t) {
        if (!this._lockDir && (void 0 == t && (t = this.dir), this.dir != t || 0 != this._aniSte)) {
            this._aniSte = 0, this.dir = t, this.updateDirs();
            for (var e = 0; e < this._spines.length; e++) this._spines[e] && this._spines[e].node.active && (this._spines[e].animation = "wait" + this._queueDirs[e])
        }
    },
    moveTo: function (t, e, i, a) {
        for (var n = 0; n < this._spines.length; n++)
            if (this._spines[n] && this._spines[n].node.active)
                if (n > 0) {
                    var s, o = this._spines[n - 1];
                    o.node.x > this._spines[n].node.x + ftc.TileSize / 2 ? s = ft.DIRRIGHT : o.node.x + ftc.TileSize / 2 < this._spines[n].node.x ? s = ft.DIRLEFT : o.node.y > this._spines[n].node.y + ftc.TileSize / 2 ? s = ft.DIRUP : o.node.y + ftc.TileSize / 2 < this._spines[n].node.y && (s = ft.DIRDOWN), this._queueDirs[n] != s && (this._queueDirs[n] = s, this._spines[n].animation = "dir" + this._queueDirs[n]);
                    var r = o.node.position;
                    ftc.startMoveAction(this._spines[n].node, t, r.x, r.y)
                } else ftc.startMoveAction(this._spines[n].node, t, e, i, a), this.updateTitlePos(e, i, t)
    },
    moveTick: function (t) {
        for (var e = 0; e < this._spineLength; e++) {
            var i = this._spines[e].node.ftMoveTick;
            i && i(t)
        }
        this.partTitle.node.ftMoveTick && this.partTitle.node.ftMoveTick(t)
    },
    fadeTo: function (t, e) {
        for (var i = 0; i < this._spines.length; i++) this._spines[i] && this._spines[i].node.active && this._spines[i].node.runAction(cc.fadeTo(t, e));
        this.partTitle.node.runAction(cc.fadeTo(t, e))
    },
    setAllAnimation: function (t) {
        for (var e = 0; e < this._spines.length; e++) this._spines[e] && this._spines[e].node.active && (this._spines[e].pause = t)
    },
    stopAllActions: function () {
        for (var t = 0; t < this._spines.length; t++) this._spines[t] && this._spines[t].node.active && (this._spines[t].node.stopAllActions(), this._spines[t].node._ftMoveTime = 0);
        this.partTitle.node._ftMoveTime = 0
    },
    setPosition: function (t, e) {
        for (var i = 0, a = 0; a < this._spines.length; a++)
            if (this._spines[a] && this._spines[a].node.active) {
                if (i >= 1) {
                    var n = this.getFirstRole(),
                        s = this._queueDirs[i],
                        o = this.getOffset(s);
                    this._spines[a].node.position = cc.v2(n.node.x + o.x, n.node.y + o.y)
                } else this._spines[a].node.position = cc.v2(t, e), this.updateTitlePos(t, e, 0);
                i++
            }
    },
    getFirstRole: function () {
        for (var t = 0; t < this._spines.length; t++)
            if (this._spines[t] && this._spines[t].node.active) return this._spines[t];
        return null
    },
    getRolePosition: function () {
        return this.getFirstRole().node.position
    },
    setZIndex: function (t) {
        t && (this.getFirstRole().node.zIndex = t);
        for (var e = 1; e < this._spines.length; e++)
            if (this._spines[e] && this._spines[e].node.active) {
                var i = this._spines[e - 1];
                i && (this._spines[e].node.y >= i.node.y + ftc.TileSize / 2 ? this._spines[e].node.zIndex = i.node.zIndex - 1 : this._spines[e].node.y + ftc.TileSize / 2 <= i.node.y ? this._spines[e].node.zIndex = i.node.zIndex + 1 : this._spines[e].node.zIndex = i.node.zIndex)
            }
    },
    getZIndex: function () {
        return this.getFirstRole().node.zIndex
    },
    getOffset: function (t) {
        var e = 0,
            i = 0;
        return t === ft.DIRUP ? i = -ftc.TileSize : t === ft.DIRDOWN ? i = ftc.TileSize : t === ft.DIRLEFT ? e = ftc.TileSize : t === ft.DIRRIGHT && (e = -ftc.TileSize), cc.v2(e, i)
    },
    pauseMotion: function () {
        this._pauseMotion = !0, this.setAllAnimation(!0), this.stopAllActions()
    },
    resumeMotion: function () {
        this._pauseMotion = !1, this.setAllAnimation(!1), this.stopAllActions()
    },
    isContains: function (t, e) {
        return this.tx <= t && this.tx + this.tw > t && this.ty <= e && this.ty + this.th > e
    }
})
