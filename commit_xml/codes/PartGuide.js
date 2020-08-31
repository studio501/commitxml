
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    buttonSelf: cc.Button,
                    spriteBg: [cc.Node],
                    buttonClick: cc.Button,
                    spriteCircle: cc.Sprite,
                    nodeTip: cc.Node,
                    labelTip: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonSelf, !0), this.addClick(this.buttonClick, {
                        zone: 99
                    })
                },
                load: function () {
                    this.data = void 0, this.target = void 0, this.callback = void 0, this._setClick = !1, this._guide = !1, this._guideVisible = !1, this.tickAdd = 0
                },
                setData: function (t, e) {
                    ftc.ManagerTV.setDisableLayout(!0), ftc.ManagerTV.currentNode = void 0, ftc.ManagerTV.cancelNextSelect(), this.node.active = !0, this.data = t;
                    for (var i = 0; i < this.data.texts.length; i++) this.data.texts[i] = ftc.language(this.data.texts[i]);
                    this.callback = e;
                    var a = t.delay;
                    a || (a = 0), this.setGuideVisible(!1), this._guide = !1, this.scheduleOnce(this.setGuide, a), this.view = ftc.ManagerRes.findLayout(t.view), ftc.closeTvTip(), this.view ? this.node.zIndex = this.view.node.zIndex + 1 : (e && e(), this.hide())
                },
                setGuideVisible: function (t) {
                    this._guideVisible = t;
                    for (var e = 0; e < this.spriteBg.length; e++) this.spriteBg[e].active = !1;
                    this.buttonClick.node.active = t, this.nodeTip.active = t
                },
                setGuide: function (t) {
                    this._guide = !0, this.tickAdd = 0, this.target = this.getTarget(), this._setClick = this.setClickNode()
                },
                getTarget: function () {
                    var t;
                    if (this.view) {
                        if (this.data.target.startsWith("button")) this.targetType = 1, t = "buttonBack" === this.data.target ? this.view.partTopStatus.buttonBack : this.view[this.data.target];
                        else if (this.data.target.startsWith("npc")) {
                            this.targetType = 2;
                            var e = this.data.target.substring(3),
                                i = this.view.mapModel.findMapNpcs(e);
                            i.length > 0 && (t = i[0])
                        } else if ("mainRole" === this.data.target) this.targetType = 3, t = this.view.getMainRole();
                        else if (this.data.target.startsWith("listView")) {
                            this.targetType = 4;
                            var a = this.view[this.data.target];
                            if (a)
                                for (var n = this.data.index, s = a.getDatas(), o = "LayoutBag" === this.data.view, r = 0; r < s.length; r++) {
                                    if ((o ? s[r].data.id : s[r].id || s[r]) == n) {
                                        (t = a.getItem(r)) || a.toIndex(r);
                                        break
                                    }
                                }
                        } else if (this.data.target.startsWith("part") || this.data.target.startsWith("Part")) {
                            this.targetType = 5;
                            var c = this.data.target.split(","),
                                h = this.view[c[0]];
                            if (h) {
                                var f = h[c[1]];
                                f && (t = f)
                            }
                        } else this.targetType = 0, this.view[this.data.target] && (t = this.view[this.data.target]);
                        return t && t instanceof Array && (t = t[this.data.index]), t
                    }
                },
                setClickNode: function () {
                    if (this.target) {
                        var t;
                        if (!(t = this.data.target.startsWith("node") ? this.target : this.target.node).active || t.opacity < 255) return !1;
                        if (this.setGuideVisible(!0), this._textIndex = -1, this.data.texts) {
                            this.nodeTip.active = !0, this._textIndex++;
                            var e = this.data.texts[this._textIndex];
                            e.length > 12 ? (this.labelTip.overflow = cc.Label.Overflow.RESIZE_HEIGHT, this.labelTip.node.width = 270) : this.labelTip.overflow = cc.Label.Overflow.NONE, this.labelTip.string = e
                        } else this.nodeTip.active = !1;
                        var i = t.convertToWorldSpaceAR(cc.v2((.5 - t.anchorX) * t.width, (.5 - t.anchorY) * t.height));
                        this.buttonClick.node.width = t.width ? t.width : 88, this.buttonClick.node.height = t.height ? t.height : 88, this.buttonClick.node.x = i.x + (this.data.offsetX ? this.data.offsetX : 0), this.buttonClick.node.y = i.y + (this.data.offsetY ? this.data.offsetY : 0);
                        var a = this.buttonClick.node.x,
                            n = this.buttonClick.node.y;
                        if (this.data.textOffsetX || this.data.textOffsetY) this.nodeTip.position = cc.v2(a + this.data.textOffsetX, n + this.data.textOffsetY);
                        else {
                            var s, o, r = this.labelTip.node.parent.width;
                            s = a + 80 + r <= cc.winSize.width ? a + 80 : a - (80 + r), o = n + 80 + 44 <= cc.winSize.height ? n + 80 : n - 80, this.nodeTip.position = cc.v2(s, o)
                        }
                        return ftc.ManagerTV.setOpacity(0), ftc.ManagerTV.currentNode = this.node, ftc.ManagerTV.nextSelect(this.buttonClick, this.node), !0
                    }
                    return !1
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) {
                    if (this._guide) {
                        if (this.target || (this.target = this.getTarget()), !this._setClick && (this._setClick = this.setClickNode(), this.tickAdd += t, this.tickAdd >= 10)) return this.tickAdd = 0, this.callback && this.callback(), void this.hide();
                        this.view == ftc.ManagerRes.topLayout() ? (ftc.ManagerTV.currentNode != this.node && (ftc.ManagerTV.currentNode = this.node, ftc.ManagerTV.nextSelect(this.buttonClick, this.node)), ftc.ManagerTV.setOpacity(0), ftc.ManagerTV.setDisableLayout(!0)) : (ftc.ManagerTV.setOpacity(255), ftc.ManagerTV.setDisableLayout(!1))
                    }
                },
                cleanup: function () { },
                msg: function () { },
                hide: function () {
                    ftc.openTvTip(), this.node.active = !1, this.buttonClick.node.active = !1, ftc.ManagerRes.topLayout() && ftc.ManagerTV.updateSelect(ftc.ManagerRes.topLayout().node), ftc.ManagerTV.setOpacity(255), ftc.ManagerTV.setDisableLayout(!1)
                },
                onClick: function (t) {
                    if (this.data.target)
                        if (t.target === this.buttonSelf.node) this.data.texts && this._textIndex < this.data.texts.length - 1 && (this._textIndex++, (i = this.data.texts[this._textIndex]).length > 12 ? (this.labelTip.overflow = cc.Label.Overflow.RESIZE_HEIGHT, this.labelTip.node.width = 270) : this.labelTip.overflow = cc.Label.Overflow.NONE, this.labelTip.string = i);
                        else if (t.target === this.buttonClick.node) {
                            if (ftc.ManagerData.get1("ManagerTask").cur < 6) {
                                for (var e = 0, i = this.labelTip.string, a = 0; a < i.length; a++) e += i.charCodeAt(a) * (a + 1);
                                ftc.addEventLog(105, e)
                            }
                            if (this.callback && this.callback(), ftc.guideCache.length > 0 && ftc.guideCache.splice(0, 1), this.view && this.target)
                                if (1 === this.targetType) {
                                    var n = this.target.node || this.target;
                                    "buttonBack" === n.name ? this.view.partTopStatus.onClick({
                                        target: n
                                    }) : this.view.onClick({
                                        target: n
                                    })
                                } else if (4 === this.targetType) this.target.onClick({
                                    target: this.target.node
                                });
                                else if (5 === this.targetType) {
                                    var s = this.data.target.split(","),
                                        o = this.view[s[0]];
                                    o && o.onClick({
                                        target: this.target.node
                                    })
                                } else if ("LayoutMain" === this.data.view) {
                                    var r = this.buttonClick.node.convertToWorldSpaceAR(cc.v2(0, 0));
                                    this.view.partMainControl.touchStart({
                                        touch: {
                                            getLocation: function () {
                                                return r
                                            }
                                        }
                                    }), this.view.partMainControl.touchEnd({
                                        touch: {
                                            getLocation: function () {
                                                return r
                                            }
                                        }
                                    })
                                } else this.target.onClick && this.target.onClick({
                                    target: this.target.node
                                });
                            if (ftc.guideCache.length > 0) {
                                var c = ftc.ManagerRes.topLayout(),
                                    h = ftc.guideCache[0];
                                c.getName() === h.view ? (this.setData(h), ftc.guideCache.splice(0, 1)) : this.data.hold || this.hide()
                            } else this.data.hold || this.hide()
                        }
                }
            })
        