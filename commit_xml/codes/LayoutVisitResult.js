
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonConfirm: cc.Button,
                    buttonAgain: cc.Button,
                    labelTip: cc.Label,
                    nodePrice: cc.Node,
                    spriteIcon: cc.Sprite,
                    labelPrice: cc.Label,
                    nodeItem: cc.Node,
                    nodeLayout: cc.Node,
                    listView: ftc.ListView,
                    spineBg: sp.Skeleton,
                    spineVisit: sp.Skeleton,
                    spine2: sp.Skeleton
                },
                init: function () {
                    this.prepareParts(["PartItemShine"]), this.addClick(this.buttonAgain), this.addClick(this.buttonConfirm), this.tickAdd = 0, ftc.ManagerTV.setNotShowOnEnter(this.node), ftc.ManagerTV.setBackButton(this.buttonConfirm)
                },
                load: function () {
                    this.spineVisit.setEventListener(function (t, e) {
                        if (!ftc.ManagerRes.checkNodeIsRestored(this.node) && e.data.name && e.data.name.startsWith("1_")) {
                            var i = e.data.name.substring(2) - 1;
                            if (this.visitType === ft.type.visit.gem1) {
                                if (0 === i) {
                                    this.nodeItem.active = !0;
                                    var a = this.newPart("PartItemShine");
                                    this.nodeItem.addChild(a.node), a.setData({
                                        id: this.ids[0],
                                        num: this.nums[0]
                                    }), a.playAnimation(), a.node.position = cc.v2(0, 0), this.showButton()
                                }
                            } else if (this.visitType === ft.type.visit.gold1 || this.visitType === ft.type.visit.gem10 || this.visitType === ft.type.visit.limited10) {
                                if (0 === i) {
                                    this.nodeLayout.active = !0;
                                    for (var n = function (t, e) {
                                        if (t === ft.type.visit.gold1) {
                                            var i = this.newPart("PartItem");
                                            this.nodeLayout.addChild(i.node, e), i.node.position = cc.v2(0, 144 * Math.floor(e / 5) - 72), i.setData(this.ids[e], this.nums[e], !0), i.setNameColor(cc.Color.WHITE)
                                        } else {
                                            var a = this.newPart("PartItemShine");
                                            this.nodeLayout.addChild(a.node, e), a.setData({
                                                id: this.ids[e],
                                                num: this.nums[e]
                                            }), a.playAnimation(), a.node.position = cc.v2(0, 144 * Math.floor(e / 5) - 72)
                                        }
                                    }.bind(this), s = 0; s < this.ids.length; s++) n(this.visitType, s);
                                    this.nodeLayout.runAction(cc.sequence(cc.delayTime(.4), cc.callFunc(function () {
                                        this.showButton()
                                    }.bind(this))))
                                }
                                if (i < 2) {
                                    var o = this.nodeLayout.children,
                                        r = [];
                                    for (s = 0; s < o.length; s++) Math.floor(s % 5 / 2) == i && r.push(s);
                                    for (s = 0; s < r.length; s++) {
                                        var c = o[r[s]],
                                            h = .2 * (2 - i),
                                            f = 124 * (2 - i);
                                        s % 2 == 0 ? c.runAction(cc.moveBy(h, -f, 0)) : c.runAction(cc.moveBy(h, f, 0))
                                    }
                                }
                            } else this.visitType === ft.type.visit.gold10 && 0 === i && (this.listView.node.active = !0, this.listView.setListView(this.datas), ftc.isTv() && (this.tvToUpdate = 1), this.showButton())
                        }
                    }.bind(this)), this.index = 0, this.datas = [], this.msgVisitLimited = void 0, this.activity = void 0
                },
                setData: function (t, e) {
                    this.visitType = e, this.visitType === ft.type.visit.limited10 && (this.msgVisitLimited = ft.ExtMsg.getMsgByType(ft.type.activity.limitedVisit), this.activity = ft.ExtMsg.getActivityData(this.msgVisitLimited)), this.updateData(t)
                },
                enter: function () {
                    ftc.playEffect(ftc.type.effect.visit_get)
                },
                updateData: function (t) {
                    if (t) {
                        if (this.hideButton(), this.tvToUpdate = 0, this.ids = ft.toArray(t[0]), this.nums = ft.toArray(t[1]), ftc.ManagerRes.restoreNodeChildren(this.nodeItem), ftc.ManagerRes.restoreNodeChildren(this.nodeLayout), this.nodeItem.active = !1, this.nodeLayout.active = !1, this.listView.node.active = !1, ftc.hideTvTip(this.node), this.updatePrice(), this.visitType === ft.type.visit.gold10) {
                            for (var e = {}, i = 0; i < this.ids.length; i++) e[this.ids[i]] ? e[this.ids[i]] += this.nums[i] : e[this.ids[i]] = this.nums[i];
                            var a = [],
                                n = [],
                                s = [];
                            for (var i in e) {
                                var o = ft.ExtItem.getType(i);
                                o === ft.type.item.piece ? a.push({
                                    id: i,
                                    num: e[i]
                                }) : o === ft.type.item.whole ? n.push({
                                    id: i,
                                    num: e[i]
                                }) : o !== ft.type.item.material && o !== ft.type.item.goods || s.push({
                                    id: i,
                                    num: e[i]
                                })
                            }
                            a.sort(function (t, e) {
                                var i = ft.ExtItem.getHero(t.id),
                                    a = ft.ExtItem.getHero(e.id);
                                if (i && a) return ft.ExtHero.getQuality(a) - ft.ExtHero.getQuality(i)
                            }), n.sort(function (t, e) {
                                var i = ft.ExtItem.getEquip(t.id),
                                    a = ft.ExtItem.getEquip(e.id);
                                if (i && a) return ft.ExtEquip.getQuality(a) - ft.ExtEquip.getQuality(i)
                            }), this.datas = a.concat(n).concat(s)
                        }
                        var r, c;
                        this.spineBg.node.active = !1, this.visitType === ft.type.visit.gold1 || this.visitType === ft.type.visit.gold10 || this.visitType === ft.type.visit.gem1 || this.visitType === ft.type.visit.gem10 ? r = "spine/view/visit_di" : this.visitType === ft.type.visit.limited10 && (r = "spine/view/visitlimited_di"), this.loadResource(r, sp.SkeletonData, function (t) {
                            t && (this.spineBg.node.active = !0, this.spineBg.skeletonData = t, this.spineBg.setAnimation(0, "wait1"), this.spineBg.addAnimation(0, "wait2", !0))
                        }.bind(this)), this.spineVisit.node.active = !1, this.visitType === ft.type.visit.gold1 || this.visitType === ft.type.visit.gold10 ? c = "spine/view/visit_100" : this.visitType === ft.type.visit.gem1 || this.visitType === ft.type.visit.gem10 ? c = "spine/view/visit_10" : this.visitType === ft.type.visit.limited10 && (c = "spine/view/visitlimited_10"), this.loadResource(c, sp.SkeletonData, function (t) {
                            t && (this.spineVisit.node.active = !0, this.spineVisit.skeletonData = t, this.visitType === ft.type.visit.limited10 ? this.spineVisit.setAnimation(0, "wait3") : this.spineVisit.setAnimation(0, "wait1"))
                        }.bind(this)), this.spine2.node.active = !1, this.visitType === ft.type.visit.limited10 && this.loadResource("spine/view/visitlimited_baokai", sp.SkeletonData, function (t) {
                            t && (this.spine2.node.active = !0, this.spine2.skeletonData = t, this.spine2.setAnimation(0, "wait1"), this.spine2.addAnimation(0, "wait2", !0))
                        }.bind(this))
                    }
                },
                updatePrice: function () {
                    var t, e, i;
                    this.visitType === ft.type.visit.gold1 ? (t = "\u83b7\u5f97\u5c0f\u578b\u7ecf\u9a8c\u836f\xd710", e = ft.value.item.gold, i = ft.value.visit.gold1) : this.visitType === ft.type.visit.gold10 ? (t = "\u83b7\u5f97\u5c0f\u578b\u7ecf\u9a8c\u836f\xd7100", e = ft.value.item.gold, i = ft.value.visit.gold10) : this.visitType === ft.type.visit.gem1 ? (t = "\u83b7\u5f97\u7ecf\u9a8c\u836f\xd71", ft.ExtItem.getNum(ft.value.item.recruitTicket) >= 1 ? (e = ft.value.item.recruitTicket, i = 1) : (e = ft.value.item.gem, i = ft.value.visit.gem1)) : this.visitType === ft.type.visit.gem10 ? (t = "\u83b7\u5f97\u7ecf\u9a8c\u836f\xd710", ft.ExtItem.getNum(ft.value.item.recruitTicket) >= 10 ? (e = ft.value.item.recruitTicket, i = 10) : (e = ft.value.item.gem, i = ft.value.visit.gem10)) : this.visitType === ft.type.visit.limited10 && (t = "", e = this.activity.consumeId, i = this.activity.consumeNum), this.labelTip.string = ftc.language(t), this.spriteIcon.spriteFrame = ft.ExtItem.getLittleIconSprite(e), this.labelPrice.string = i
                },
                tick: function (t) {
                    this.tvToUpdate > 0 && (this.tvToUpdate -= t, this.tvToUpdate <= 0 && this.listView.getScrollView().scrollToBottom(3))
                },
                showButton: function () {
                    this.buttonConfirm.node.active = !0, this.buttonAgain.node.active = !0, this.labelTip.node.active = !0, this.nodePrice.active = !0, this.buttonConfirm.node.runAction(cc.fadeIn(.5)), this.buttonAgain.node.runAction(cc.fadeIn(.5)), this.labelTip.node.runAction(cc.fadeIn(.5)), this.nodePrice.runAction(cc.fadeIn(.5)), ftc.setTvTip(this.node), ftc.ManagerTV.nextSelect(this.buttonAgain)
                },
                hideButton: function () {
                    this.buttonConfirm.node.active = !1, this.buttonAgain.node.active = !1, this.labelTip.node.active = !1, this.nodePrice.active = !1, this.buttonConfirm.node.opacity = 0, this.buttonAgain.node.opacity = 0, this.labelTip.node.opacity = 0, this.nodePrice.opacity = 0
                },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                onClick: function (t, e) {
                    t.target === this.buttonConfirm.node ? this.cancel() : t.target === this.buttonAgain.node && this.visitType && (ftc.ManagerTV.updateSelect(), this.msgVisitLimited ? ftc.send("visitHero", {
                        type: this.visitType,
                        eid: this.msgVisitLimited.entityId
                    }) : ftc.send("visitHero", {
                        type: this.visitType
                    }))
                }
            })
        