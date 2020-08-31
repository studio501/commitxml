

cc._RF.push(e, "76342h6DipOf4uoEDYngqxZ", "PartMainControl");
var number_arr = 0,
    n = 0;
cc.Class({
    extends: ftc.BasePart,
    properties: {
        nodeWalk: cc.Node,
        spriteRocker: cc.Sprite,
        spriteDirs: [cc.Sprite]
    },
    init: function () {
        this.nodeWalk.active = !1, this._oldTouchDir = -1, this._touchStart = !1, this._aimPos = void 0, this._controlType = 0
    },
    load: function () {
        ftc.isIphoneX() ? this.initControlDirPos = cc.v2(270, 160) : this.initControlDirPos = cc.v2(230, 160), number_arr = this.nodeWalk.width, n = number_arr / 2
    },
    onEvent: function (t) {
        t.on(cc.Node.EventType.TOUCH_START, this.touchStart, this), t.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this), t.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this), t.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this)
    },
    setData: function (t, e) {
        this.layoutMain = t, this.mapModel = e
    },
    touchStart: function (t) {
        if (1 != ftc.ManagerRes.lockClicking && !ftc.isShowTop() && ftc.ManagerRes.topLayout() == this.layoutMain && this.layoutMain.currentMap && this.layoutMain._isloaded) {
            if (this.layoutMain._unHandleMsgs.length > 0) return;
            this._touchStart = !0, this.layoutMain.hideOptionBar();
            var e = t.touch.getLocation(),
                i = ftc.ManagerData.get1("ManagerMap").isOpenKeyDir;
            if (1 == i || 0 == i || 0 === this._tempControlType) {
                if (this.startControlDirPos = this.initControlDirPos, 1 == i || 0 === this._tempControlType) {
                    var a = this.checkTouchPosition(e, !1);
                    a ? (this._controlRoleDir(!0, a), this.spriteRocker.node.position = this.nodeWalk.convertToNodeSpaceAR(e)) : this._controlType = 1
                } else this._controlType = 1;
                this._aimPos = void 0
            } else this._controlType = 2, this.startControlDirPos = e
        }
    },
    touchMove: function (t) {
        if (this._touchStart && !ftc.isShowTop())
            if (ftc.ManagerRes.topLayout() == this.layoutMain) {
                var e = t.touch.getLocation();
                if (2 == this._controlType && (Math.abs(this.startControlDirPos.y - e.y) > 50 || Math.abs(this.startControlDirPos.x - e.x) > 50) && (this._controlType = 0, this._hideOnControlEnd = !0, this.nodeWalk.active = !0, this.nodeWalk.position = this.startControlDirPos, this._aimPos = void 0), 0 == this._controlType) {
                    var i = cc.v2(this.spriteRocker.node.x, this.spriteRocker.node.y),
                        a = this.nodeWalk.convertToNodeSpaceAR(e),
                        n = Math.sqrt(a.x * a.x + a.y * a.y);
                    if (n < 100) this.spriteRocker.node.position = a;
                    else {
                        var s = cc.v2(a.x / n * 100, a.y / n * 100);
                        if (this.spriteRocker.node.position = s, 2 == ftc.ManagerData.get1("ManagerMap").isOpenKeyDir) {
                            var o = this.nodeWalk.convertToWorldSpaceAR(s),
                                r = this.nodeWalk.x + (e.x - o.x),
                                c = this.nodeWalk.y + (e.y - o.y);
                            this._aimPos = cc.v2(r, c)
                        }
                    }
                    var h = cc.v2(this.spriteRocker.node.x, this.spriteRocker.node.y),
                        f = this.checkTouchPosition2(a);
                    if (f) {
                        if (this._oldTouchDir > 2 && f <= 2 && Math.abs(h.x - i.x) > 5 || this._oldTouchDir <= 2 && f > 2 && Math.abs(h.y - i.y) > 5) return;
                        this._controlRoleDir(!0, f)
                    }
                }
            } else this.touchCancel()
    },
    touchEnd: function (t) {
        if (this._touchStart && !this._isApiQueueDir) {
            if (this._controlType && void 0 === this._tempControlType) {
                var e = t.touch.getLocation();
                this.mapModel.checkNpcClick(e) || this.mapModel.planWalkToPosition(e)
            }
            this.touchCancel()
        }
    },
    touchCancel: function () {
        this._touchStart && (this._isApiQueueDir || (this._controlType || (this._oldTouchDir > -1 && (this.mapModel._isLastDir = !0, this._oldTouchDir = -1, this.spriteRocker.node.position = cc.v2(0, 0)), this._hideOnControlEnd && (this._hideOnControlEnd = void 0, this.nodeWalk.active = !1, this.nodeWalk.position = this.initControlDirPos, this._aimPos = void 0)), this.cleanDirButtons(), this._touchStart = !1))
    },
    cleanup: function () { },
    updateData: function () {
        this._hideOnControlEnd || (this.nodeWalk.active = 1 == ftc.ManagerData.get1("ManagerMap").isOpenKeyDir, this.nodeWalk.position = this.initControlDirPos)
    },
    onClick: function (t) { },
    checkTouchPosition: function (t, e) {
        var i = 0,
            s = t.x - this.startControlDirPos.x + n,
            o = t.y - this.startControlDirPos.y + n;
        if (e) {
            var r = Math.sqrt((s - n) * (s - n) + (o - n) * (o - n));
            if (r > n) {
                var c = s * (r - n) / r,
                    h = o * (r - n) / r;
                s > n ? s -= c : s <= n && (s += c), o > n ? o -= h : o <= n && (o += h)
            }
        }
        return s <= number_arr && o <= number_arr && s >= 0 && o >= 0 && (i = s <= n ? o <= n ? o <= s ? ft.DIRDOWN : ft.DIRLEFT : number_arr - o <= s ? ft.DIRUP : ft.DIRLEFT : o <= n ? o <= number_arr - s ? ft.DIRDOWN : ft.DIRRIGHT : o > s ? ft.DIRUP : ft.DIRRIGHT), i
    },
    checkTouchPosition2: function (t) {
        var e = Math.atan2(t.y, t.x) / Math.PI * 180;
        return e >= -135 && e < -45 ? ft.DIRDOWN : e >= -45 && e < 45 ? ft.DIRRIGHT : e >= 45 && e < 135 ? ft.DIRUP : ft.DIRLEFT
    },
    _controlRoleDir: function (t, e, i) {
        if (this._controlType = 0, t) {
            if (e !== this._oldTouchDir) {
                this.cleanDirButtons();
                for (var a = [], n = 0; n < 64; n++) a.push(e);
                this.controlMoveDir(a), this._oldTouchDir = e
            }
            return !0
        } (-1 == this._oldTouchDir || i) && (this._oldTouchDir = -1, this.cleanDirButtons(), this.mapModel._isLastDir = !0)
    },
    cleanDirButtons: function () {
        for (var t = 0; t < 4; t++) this.spriteDirs[t].node.active = !1
    },
    tickMove: function (t) {
        if (2 == ftc.ManagerData.get1("ManagerMap").isOpenKeyDir && 0 == this._controlType && this._aimPos && !this._aimPos.equals(this.nodeWalk.position)) {
            var e = this.nodeWalk.position.lerp(this._aimPos, 10 * t);
            this.nodeWalk.position = e
        }
    },
    controlMoveDir: function (t) {
        "LayoutMain" === ftc.ManagerRes.topLayout().getName() && (this.mapModel._queueDirs = t, this.spriteDirs[t[0] - 1].node.active = !0, this.layoutMain.hideOptionBar())
    },
    stopMove: function () {
        this.mapModel._isLastDir = !0, this._oldTouchDir = -1
    }
})
