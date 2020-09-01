

window.ftc = window.ftc || {}, ftc.ManagerTV = {
    isActive: !1,
    disableLayoutOnKey: !1,
    disableCount: 0,
    timeOutId: 0,
    openOkReplaceMenu: !1,
    onOkTimeInterval: -1,
    keyDownCount: 1,
    loadSelectNode: function (t) {
        ftc.scene.node.addChild(t, 1025), this.selectPointer = t, t.active = !1, this.isActive = !0, window.setInterval(this.tick.bind(this), 0), "zh" != ftc.ManagerLan.getLanguage() && (this.openOkReplaceMenu = !0)
    },
    checkSelectNode: function () {
        this.isActive && 1 == this.keyDownCount && (ftc.setTvTip(void 0, void 0, 6), this.keyDownCount = 0, this.isActive = !1, this.currentNode = void 0, this.selectPointer && (this.selectPointer.removeFromParent(!0), this.selectPointer = void 0)), this.checkSelectNode = void 0
    },
    tick: function () {
        this.openOkReplaceMenu && this.onOkTimeInterval > 0 && ft.getSysMilli() - this.onOkTimeInterval >= 250 && (this.onOkTimeInterval = -2, this._onKeyMenu(!1))
    },
    addClick: function (t, e, i, a, n) {
        if (e.node) {
            if (!this.isActive) return;
            n || (n = {}), n.zone || (n.zone = 0), t._tvClicks || (t._tvClicks = {}), t._tvClicks[n.zone] || (t._tvClicks[n.zone] = []);
            for (var s = t._tvClicks[n.zone], o = {
                button: e,
                startCallback: i,
                endCallback: a,
                node: t,
                zone: n.zone,
                list: n.list,
                auto: n.auto,
                bar: n.bar,
                priority: n.priority ? n.priority : 0
            }, r = 0; r < s.length; r++)
                if (s[r].button == e) return void (s[r] = o);
            var c = s.length;
            if (n.priority)
                for (r = 0; r < s.length; r++)
                    if (n.priority > s[r].priority) {
                        c = r;
                        break
                    } s.splice(c, 0, o)
        } else ftc.err("ManagerTV.addClick \u9519\u8bef\uff1abutton \u662f\u4e2anode")
    },
    setPhoneBack: function (t, e, i, a) {
        t._phoneBackClick = i && a ? {
            button: e,
            startCallback: i,
            endCallback: a
        } : e
    },
    getPhoneBack: function (t) {
        return t._phoneBackClick
    },
    setClickList: function (t, e, i, a, n) {
        if (this.isActive) {
            n || (n = 0);
            for (var s = t._tvClicks[n], o = 0; o < s.length; o++)
                if (s[o].button == e) {
                    s[o].node = i, s[o].list = a;
                    break
                }
        }
    },
    updateSelect: function (t) {
        this.isActive && (this.disableCount || (t ? (this.currentNode = t, this._updateSelect(!0, t.selectTvClick, t)) : this.selectPointer.active = !1))
    },
    nextSelect: function (t, e, i, a) {
        if (this.isActive) {
            e || (e = ftc.ManagerRes.topLayout().node), this.selectPointer.active = !1;
            var n = function () {
                i || (i = 0);
                var a = void 0;
                !t && e.selectTvClick && i == e.selectTvClick.zone && this._checkButtonIsShow(e.selectTvClick.button) && (a = e.selectTvClick), a || (a = this._findClickButton(e, t, i)), this.currentNode = e, a && this._updateSelect(!0, a, e)
            }.bind(this);
            if (a) {
                if (this.timeOutId) return;
                var s = ftc.ManagerRes.topLayout();
                this.timeOutId = window.setTimeout(function () {
                    this.timeOutId = 0, ftc.ManagerRes.topLayout() == s && n()
                }.bind(this), 100)
            } else n();
            return !0
        }
    },
    nextFrameSelect: function (t, e, i) {
        this.nextSelect(t, e, i, !0)
    },
    cancelNextSelect: function () {
        this.timeOutId && window.clearTimeout(this.timeOutId), this.timeOutId = 0
    },
    hasSelect: function (t, e) {
        return e || (e = 0), this._findClickButton(t, void 0, e)
    },
    setOpacity: function (t) {
        this.isActive && (this.selectPointer.opacity = t)
    },
    setMenuButton: function (t, e) {
        this.isActive && (e || (e = ftc.ManagerRes.topLayout().node), e._tvButtonMenu = t)
    },
    setBackButton: function (t, e) {
        this.isActive && (e || (e = ftc.ManagerRes.topLayout().node), e._tvButtonBack = t)
    },
    setOkButton: function (t, e) {
        this.isActive && (e || (e = ftc.ManagerRes.topLayout().node), e._tvButtonOk = t)
    },
    setNotShowOnEnter: function (t) {
        this.isActive && (t || (t = ftc.ManagerRes.topLayout().node), t._notAutoShowOnEnter = !0)
    },
    autoShowOnEnter: function (t) {
        this.isActive && (t._notAutoShowOnEnter || (this.cancelNextSelect(), t.selectTvClick = void 0, this.nextSelect(void 0, t)))
    },
    setNotShowOnCancel: function (t) {
        this.isActive && (t || (t = ftc.ManagerRes.topLayout().node), t._notAutoShowOnCancel = !0)
    },
    autoShowOnCancel: function (t) {
        this.isActive && (t._notAutoShowOnCancel || this.nextSelect(void 0, t))
    },
    setEnable: function () {
        if (this.isActive) {
            this.disableCount--, this.disableCount <= 0 && (this.disableCount = 0);
            var t = ftc.ManagerRes.topLayout();
            t && t.node && ftc.ManagerTV.autoShowOnCancel(t.node)
        }
    },
    setDisable: function () {
        this.isActive && (this.disableCount++, this.selectPointer.active = !1)
    },
    setDisableLayout: function (t) {
        this.isActive && (this.disableLayoutOnKey = t)
    },
    getSelectNode: function () {
        if (this.currentNode && this.currentNode.selectTvClick) return this.currentNode.selectTvClick.node
    },
    getSelectButton: function () {
        if (this.currentNode && this.currentNode.selectTvClick) return this.currentNode.selectTvClick.button
    },
    cleanClicks: function (t) {
        if (this.isActive) {
            if (t.__partBuffer)
                for (var e = 0; e < t.__partBuffer.length; e++) this.cleanClicks(t.__partBuffer[e]);
            if (t._allListView)
                for (e = 0; e < t._allListView.length; e++) {
                    var i = t._allListView[e];
                    if (i.setListView)
                        for (var a = i._partBuffer, n = 0; n < a.length; n++) a[n] && this.cleanClicks(a[n].node);
                    else i.node._tvClicks && (i.node._tvClicks = void 0)
                }
            t._tvClicks && (t._tvClicks = void 0)
        }
    },
    _updateSelect: function (t, e, i, a) {
        if (this.isActive && !this.disableCount)
            if (t || (t = !1), this.selectPointer.active = !1, t) {
                if (!i) {
                    var n = ftc.ManagerRes.topLayout();
                    if (!n) return;
                    var s = n.node;
                    e || s == this.currentNode && (e = s.selectTvClick), i = s
                }
                if (this.currentNode = i, e && (this._checkButtonIsShow(e.button) || (e = void 0)), e || (a || (a = 0), e = this._findClickButton(i, void 0, a)), e) {
                    var o = this._getWorldPosition(e.button.node);
                    this.selectPointer.setPosition(o), this.selectPointer.active = !0, i.selectTvClick = e
                }
            } else this.currentNode = void 0
    },
    _pushDirMap: function (t, e, i, a) {
        if (i.button && i.button.node) {
            var n = this._getWorldPosition(i.button.node),
                s = !1,
                o = t[a];
            1 == a && parseInt(e.y) < parseInt(n.y) && (s = !0), 2 == a && parseInt(e.y) > parseInt(n.y) && (s = !0), 3 == a && parseInt(e.x) > parseInt(n.x) && (s = !0), 4 == a && parseInt(e.x) < parseInt(n.x) && (s = !0), s && (i.bar || this._checkButtonIsShow(i.button)) && (i.pos = n, o.push(i))
        }
    },
    _pushRecursionDirMap: function (t, e, i, a, n) {
        var s = t._tvClicks;
        if (s && s[a])
            for (var o = 0; o < s[a].length; o++) this._pushDirMap(e, i, s[a][o], n);
        if (s = t.__partBuffer)
            for (o = 0; o < s.length; o++) this._pushRecursionDirMap(s[o], e, i, a, n);
        if (s = t._allListView)
            for (o = 0; o < s.length; o++) {
                var r = s[o];
                if (r.setListView) {
                    var c = r._partBuffer;
                    if (c)
                        for (var h = 0; h < c.length; h++) c[h] && this._pushRecursionDirMap(c[h].node, e, i, a, n)
                } else this._pushRecursionDirMap(r.node, e, i, a, n)
            }
    },
    onKeyDirection: function (t, e) {
        if (!this._checkIsNotClick0() && !this._checkIsNotClick1()) {
            var i;
            if (this.disableLayoutOnKey || (i = ftc.ManagerRes.topLayout()), i && i.onKeyDirection && i.onKeyDirection(t, e));
            else if (!t && this.currentNode && this.currentNode.selectTvClick && this.selectPointer.active) {
                if (this.currentNode.selectTvClick.bar && e <= 2 && this._upOrDownList(1 == e, this.currentNode.selectTvClick.list)) return;
                var a = this.currentNode.selectTvClick.zone,
                    n = [
                        [],
                        [],
                        [],
                        [],
                        []
                    ],
                    s = this._getWorldPosition(this.currentNode.selectTvClick.button.node);
                this._pushRecursionDirMap(this.currentNode, n, s, a, e);
                var o = n[e];
                if (o.length) {
                    var r = -1,
                        c = void 0,
                        h = 1,
                        f = 1;
                    e <= 2 ? f = .1 : h = .1;
                    for (var d = 0; d < o.length; d++) {
                        var l = Math.pow(o[d].pos.x - s.x, 2) * h + Math.pow(o[d].pos.y - s.y, 2) * f;
                        (r < 0 || r > l) && (r = l, c = o[d])
                    }
                    c && (c.list && this._updateListView(c) && (c.pos = this._getWorldPosition(c.button.node)), this._updateSelect(!0, c, this.currentNode), c.auto && (this._clickButton(c, !0, !0), this._clickButton(c, !1, !0)))
                }
            }
            return !!(i && i.onAfterKeyDirection && i.onAfterKeyDirection(t, e)) || void 0
        }
    },
    onKeyOk: function (t) {
        if (!this._checkIsNotClick0() && !this._checkIsNotClick1()) {
            if (this.openOkReplaceMenu)
                if (t) {
                    if (this.onOkTimeInterval > 0 || -2 == this.onOkTimeInterval) return;
                    this.onOkTimeInterval = ft.getSysMilli()
                } else {
                    if (-2 == this.onOkTimeInterval) return void (this.onOkTimeInterval = -1);
                    this.onOkTimeInterval = -1
                } if (!this.disableLayoutOnKey) {
                    var e = ftc.ManagerRes.topLayout();
                    if (e.onKeyOk && e.onKeyOk(t)) return !0
                }
            if (this.currentNode)
                if (this.currentNode._tvButtonOk) {
                    var i = this._findClickButton(this.currentNode, this.currentNode._tvButtonOk);
                    if (i) return this._clickButton(i, t), !0
                } else if (this.currentNode.selectTvClick) return this._clickButton(this.currentNode.selectTvClick, t), !0
        }
    },
    onKeyBack: function (t) {
        if (this._checkIsNotClick0()) return !1;
        var e;
        if (!this.isActive && ((e = ftc.ManagerRes.topLayout()) && e.node._phoneBackClick)) return this._clickButton(e.node._phoneBackClick, t);
        if (this._checkIsNotClick1()) return !1;
        if (!this.disableLayoutOnKey && ((e = ftc.ManagerRes.topLayout()) && e.onKeyBack && e.onKeyBack(t))) return !0;
        if (this.currentNode && this.currentNode._tvButtonBack) {
            var i = this._findClickButton(this.currentNode, this.currentNode._tvButtonBack);
            if (i) return this._clickButton(i, t)
        }
        return !1
    },
    _onKeyMenu: function (t) {
        if (!this.disableLayoutOnKey) {
            var e = ftc.ManagerRes.topLayout();
            if (e.onKeyMenu && e.onKeyMenu(t)) return !0
        }
        if (this.currentNode && this.currentNode._tvButtonMenu) {
            var i = this._findClickButton(this.currentNode, this.currentNode._tvButtonMenu);
            if (i) return this._clickButton(i, t), !0
        }
    },
    onKeyMenu: function (t) {
        this._checkIsNotClick0() || this._checkIsNotClick1() || (this.openOkReplaceMenu = !1, this.onOkTimeInterval = -1, this._onKeyMenu(t))
    },
    _checkButtonIsShow: function (t) {
        if (t)
            for (var e = t.node; e && e.active;) {
                if (!(e = e.parent)) return !1;
                if (e == this.currentNode || e == ftc.scene.node) return !0
            }
        return !1
    },
    _clickButton: function (t, e, i) {
        if (e) {
            if (t.startCallback) return t.startCallback({
                target: t.button.node
            }), !0
        } else if (t.endCallback && this._checkButtonIsShow(t.button)) return t.endCallback({
            target: t.button.node,
            auto: i
        }), this.isActive && !this._checkButtonIsShow(t.button) && t.node.active && t.node.parent && this._updateSelect(!0, void 0, t.node, t.zone), !0
    },
    _findClickButton: function (t, e, i) {
        var a = t._tvClicks;
        if (a)
            if (e)
                for (var n in a) {
                    var s;
                    if (s = a[n])
                        for (var o = 0; o < s.length; o++)
                            if (e == s[o].button) return s[o]
                } else if (s = a[i])
                for (o = 0; o < s.length; o++)
                    if (this._checkButtonIsShow(s[o].button)) return s[o];
        if (a = t.__partBuffer)
            for (n = 0; n < a.length; n++) {
                if (h = this._findClickButton(a[n], e, i)) return h
            }
        if (a = t._allListView)
            for (n = 0; n < a.length; n++) {
                var r = a[n];
                if (r.setListView) {
                    var c = r._partBuffer;
                    if (c)
                        for (o = 0; o < c.length; o++) {
                            if (c[o])
                                if (h = this._findClickButton(c[o].node, e, i)) return h
                        }
                } else {
                    var h;
                    if (h = this._findClickButton(r.node, e, i)) return h
                }
            }
    },
    _checkIsNotClick0: function () {
        return 1 == ftc.ManagerRes.lockClicking || (!!ftc.isShowTop() || void 0)
    },
    _checkIsNotClick1: function () {
        if (!this.isActive || this.disableCount || this.timeOutId) return !0
    },
    _getWorldPosition: function (t) {
        var e = t.getAnchorPoint(),
            i = t.convertToWorldSpaceAR(cc.v2(-e.x * t.width, -e.y * t.height));
        return i.x = i.x - cc.winSize.width / 2 + t.width / 2, i.y = i.y - cc.winSize.height / 2 + t.height / 2, -1 == t.scaleX && (i.x -= t.width), i
    },
    _updateListView: function (t) {
        var e = t.list,
            i = t.node,
            a = t.button;
        if (!e.setListView) {
            var n = this._getWorldPosition(a.node),
                s = this._getWorldPosition(e._scrollView.node),
                o = e._scrollView.node.height;
            return n.y = n.y + (1 - e._scrollView.node.anchorY) * o, n.y < s.y + 20 ? void (e._content.y = e._content.y + o / 2) : !(n.y > s.y + o - 20) || void (e._content.y = e._content.y - o / 2)
        }
        for (var r = -1, c = 0; c < e._partBuffer.length; c++)
            if (e._partBuffer[c] && e._partBuffer[c].node == i) {
                r = c;
                break
            } if (r > -1) {
                var h = e._getItemBegPos(r),
                    f = e._getItemEndPos(r);
                if (r = 0, e._scrollView.vertical)
                    if (h <= e._content.y) r -= e._lineSize;
                    else {
                        if (!(f >= e._content.y + e.node.height)) return;
                        r += e._lineSize
                    }
                else if (h <= -e._content.x) r -= e._lineSize;
                else {
                    if (!(f >= -e._content.x + e.node.width)) return;
                    r += e._lineSize
                }
                return r += e.getFirstIndex(), e.toIndex(r), e.update(), e._tickLoad = 1, !0
            }
    },
    _upOrDownList: function (t, e) {
        var i = e._scrollView.node.height;
        if (t) {
            if (e._content.y - i / 2 > 0) return e._content.y = e._content.y - i / 2, !0
        } else if (e._content.y + i / 2 < e._content.height) return e._content.y = e._content.y + i / 2, !0
    }
}
