
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    nodeRoot: cc.Node,
                    partEquipTip: cc.Node,
                    labelName: cc.Label,
                    labelStatus: cc.Label,
                    spriteQuality: cc.Sprite,
                    spriteIcon: cc.Sprite,
                    spineLvUp: sp.Skeleton,
                    spriteStars: [cc.Sprite],
                    nodePanelProp: cc.Node,
                    nodeInfo: cc.Node,
                    labelInfo: cc.Label,
                    buttonChange: cc.Button,
                    partEquipDetail: t("PartEquipDetail"),
                    partEquipLvUp: t("PartEquipLvUp"),
                    partEquipStarUp: t("PartEquipStarUp"),
                    partEquipJewel: t("PartEquipJewel"),
                    nodeTabs: cc.Node,
                    buttonTabs: [cc.Button],
                    buttonLeft: cc.Button,
                    buttonRight: cc.Button,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.prepareParts(["PartWakeUpMaterial"]), this.partEquips = [this.partEquipDetail, this.partEquipLvUp, this.partEquipStarUp, this.partEquipJewel];
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t], !0);
                    this.addClick(this.buttonChange), this.addClick(this.buttonLeft, !0), this.addClick(this.buttonRight, !0), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    this.initPart(this.partEquipDetail), this.initPart(this.partEquipLvUp), this.initPart(this.partEquipStarUp), this.spineLvUp.node.active = !1, this.partEquipTip.active = !1, this.partEquipTipPos = this.partEquipTip.getPosition(), this.equips = void 0, this.index = -1, this.equip = void 0, this.equipValue = 0, this.pos = -1, this.tabIndex = 0, this.isTeam = !1, this.isBag = !1, ftc.setTvTip(this.node, "\u3010\u8fd4\u56de\u952e\u3011\u5173\u95ed\u754c\u9762\uff0c\u3010\u83dc\u5355\u952e\u3011\u5207\u6362\u6807\u7b7e")
                },
                setData: function (t, e, i, a, n) {
                    if (this.isTeam = e, this.isBag = i, e || i) {
                        if (e) {
                            this.index = t.index, this.pos = t.pos;
                            var s = [ft.type.part.weapon, ft.type.part.armet, ft.type.part.clothes, ft.type.part.decoration, ft.type.part.shoes, ft.type.part.rider, ft.type.part.exclusive];
                            this.equips = [];
                            for (var o = ft.ExtHero.getHeroByPos(this.pos), r = 0; r < s.length; r++) {
                                var c = ft.ExtHero.getEquip(o.id, s[r]);
                                c ? this.equips.push(c) : r < t.index && this.index--
                            }
                        } else this.index = n, this.equips = a;
                        this.setEquipInfo(this.equips[this.index]), this.selectTab(0), ftc.isTv() || ftc.ManagerH5.isH5() ? (this.buttonLeft.node.active = !1, this.buttonRight.node.active = !1) : (this.buttonLeft.node.active = 0 !== this.index, this.buttonRight.node.active = this.index !== this.equips.length - 1), this.nodeRoot.x = 54, this.nodeTabs.active = !0
                    } else if (this.buttonLeft.node.active = !1, this.buttonRight.node.active = !1, this.equip = t, t.entityId) this.pos = this.equip.pos, this.nodeRoot.x = 54, this.nodeTabs.active = !0, this.setEquipInfo(t), this.selectTab(0);
                    else {
                        this.nodeRoot.x = 0, this.nodeTabs.active = !1;
                        for (r = 0; r < this.partEquips.length; r++) this.partEquips[r].node.active = 0 === r;
                        this.setEquipInfo(t), this.nodePanelProp.active = !1, this.partEquips[0].setData(t)
                    }
                },
                setEquipInfo: function (t) {
                    var e, i = t.id || t,
                        a = t.lv || 1,
                        n = t.star || 0;
                    this.buttonChange.node.active = this.isTeam && ft.ExtEquip.getPart(t.id) !== ft.type.part.exclusive, this.labelName.string = ft.ExtEquip.getName(i) + "  Lv" + a, this.spriteQuality.spriteFrame = ft.ExtEquip.getQualitySprite(i), this.spriteIcon.spriteFrame = ft.ExtEquip.getIconSprite(i);
                    var s = ft.ExtEquip.getType(i);
                    s > 1e3 && (e = ft.ExtHero.getName(s) + "\u4e13\u5c5e"), this.labelInfo.string = (e ? e + "\n" : "") + ft.ExtEquip.getInfo(i);
                    for (var o = 0; o < this.spriteStars.length; o++) {
                        this.spriteStars[o].node.active = !0;
                        var r = n > o ? "com_star" : "com_stargray";
                        n > o + 5 && (r = "com_star2"), this.spriteStars[o].spriteFrame = ftc.ManagerRes.getSpriteFrame("program", r)
                    }
                    if (t.entityId && -1 !== t.pos) {
                        var c = ft.ExtHero.getHeroByPos(t.pos);
                        this.labelStatus.string = c ? ft.ExtHero.getName(c.id) + ftc.language("\u5df2\u88c5\u5907") : ftc.language("\u672a\u88c5\u5907")
                    } else this.labelStatus.string = ftc.language("\u672a\u88c5\u5907");
                    if (t.entityId) {
                        this.buttonTabs[2].node.active = ft.ExtEquip.getMaxStar(t.id) > 0, this.buttonTabs[3].node.active = ft.ExtEquip.mapEquipPack[t.id] && ft.ExtEquip.getQuality(t.id) >= ft.type.quality.golden, (!this.buttonTabs[2].node.active && 2 === this.tabIndex || !this.buttonTabs[3].node.active && 3 === this.tabIndex) && this.selectTab(0);
                        for (o = 0; o < this.partEquips.length; o++) this.partEquips[o].setData(t)
                    }
                    this.setPropValue(this.tabIndex)
                },
                enter: function () { },
                updateData: function () {
                    if (this.equip) this.setEquipInfo(this.equip);
                    else {
                        if (this.isTeam) {
                            var t = [ft.type.part.weapon, ft.type.part.armet, ft.type.part.clothes, ft.type.part.decoration, ft.type.part.shoes, ft.type.part.rider, ft.type.part.exclusive];
                            this.equips = [];
                            for (var e = ft.ExtHero.getHeroByPos(this.pos), i = 0; i < t.length; i++) {
                                var a = ft.ExtHero.getEquip(e.id, t[i]);
                                a && this.equips.push(a)
                            }
                        }
                        this.setEquipInfo(this.equips[this.index])
                    }
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        equipOnload: function () {
                            ftc.playEffect(ftc.type.effect.equip), this.updateData()
                        },
                        equipLevelUp: function (t, e) {
                            var i, a = 0;
                            (t[0] && t[0][1] && (a = t[0][1]), a && a > 0) ? (i = this.isTeam || this.isBag ? this.equips[this.index].id : this.equip.id, this.equipValue = a * ft.ExtEquip.getUpgradeFactor(i), this.updateEquipTip(ft.getNumShow(this.equipValue)), ftc.playEffect(ftc.type.effect.equip_lvUp), ftc.showTip("\u5347\u7ea7\u6210\u529f"), this.spineLvUp.node.active = !0, this.spineLvUp.setAnimation(0, "wait1", !1), this.updateData()) : ftc.showTip("\u5347\u7ea7\u5931\u8d25")
                        },
                        equipStarUp: function (t, e) {
                            t > 0 ? this.updateData() : ftc.showTip("\u7a81\u7834\u5931\u8d25")
                        },
                        c_onSelectEquipLvUpItem: function (t, e) {
                            this.partEquipLvUp.onSelectEquipLvUpItem(t)
                        },
                        c_onSelectListJewelItem: function (t, e) {
                            this.partEquipJewel.onSelectJewelItem(t)
                        },
                        equipUnlockSlot: function (t, e) {
                            0 === t ? (ftc.showTip("\u89e3\u9501\u6210\u529f"), this.partEquipJewel.updateData()) : ftc.showTip("\u89e3\u9501\u5931\u8d25")
                        },
                        jewelOnload: function (t, e) {
                            0 === t ? (this.updateData(), ftc.showTip("\u9576\u5d4c\u6210\u529f"), this.partEquipJewel.updateData()) : 1 === t ? ftc.showTip("\u5df2\u6709\u540c\u7c7b\u578b\u5b9d\u77f3") : 2 === t && ftc.showTip("\u9576\u5d4c\u7c89\u4e0d\u8db3")
                        },
                        jewelUnload: function (t, e) {
                            0 === t ? (this.updateData(), ftc.showTip("\u53d6\u4e0b\u6210\u529f"), this.partEquipJewel.updateData()) : 1 === t && ftc.showTip("\u53d6\u94bb\u5668\u6570\u91cf\u4e0d\u8db3")
                        }
                    }
                },
                updateEquipTip: function (t) {
                    if (t > 0) {
                        this.equipTipIndex = 0, this.partEquipTip.active = !0;
                        var e = cc.moveBy(.45, cc.v2(0, 60)),
                            i = cc.callFunc(this.showEquipTip, this),
                            a = cc.callFunc(this.hideEquipTip, this);
                        this.partEquipTip.runAction(cc.sequence(i, e, a, i, e, a, i, e, a, cc.callFunc(function () {
                            this.partEquipTip.stopAllActions()
                        }.bind(this))))
                    }
                },
                showEquipTip: function () {
                    this.equipTipIndex++, this.partEquipTip.active = !0, this.partEquipTip.getChildByName("labelName").getComponent(cc.Label).string = "\u6b66\u529b+", this.partEquipTip.getChildByName("labelValue").getComponent(cc.Label).string = ft.getNumShow((this.equipValue * this.equipTipIndex / 3).toFixed(2))
                },
                hideEquipTip: function () {
                    this.partEquipTip.setPosition(this.partEquipTipPos), this.partEquipTip.active = !1
                },
                selectTab: function (t) {
                    this.tabIndex = t, this.tvTabIndex = t;
                    for (var e = 0; e < this.buttonTabs.length; e++) this.buttonTabs[e].interactable = this.tabIndex !== e, this.buttonTabs[e].node.getChildByName("labelTab").color = t !== e ? ftc.newColor(ftc.value.color.tabNormal) : ftc.newColor(ftc.value.color.tabPressed), this.buttonTabs[e].node.getChildByName("labelTab").getComponent(cc.LabelOutline).color = t !== e ? ftc.newColor(ftc.value.color.tabNormalOutline) : ftc.newColor(ftc.value.color.tabPressedOutline), this.partEquips[e].node.active = this.tabIndex === e, this.nodePanelProp.active = 0 !== this.tabIndex;
                    this.setPropValue(t), ftc.ManagerTV.nextSelect()
                },
                setPropValue: function (t) {
                    var e;
                    if (this.nodeInfo.active = 0 === t || 3 === t, this.nodePanelProp.active = !this.nodeInfo.active, e = this.equips ? this.equips[this.index] : this.equip, 0 === t) {
                        var i, a = e.id || e;
                        (c = ft.ExtEquip.getType(a)) > 1e3 && (i = ft.ExtHero.getName(c) + "\u4e13\u5c5e"), this.labelInfo.string = (i ? i + "\n" : "") + ft.ExtEquip.getInfo(a)
                    } else if (1 === t) {
                        this.nodePanelProp.children[0].active = !0, this.nodePanelProp.children[1].active = !1;
                        var n = (g = this.nodePanelProp.children[0]).getChildByName("spriteIcon").getComponent(cc.Sprite),
                            s = g.getChildByName("labelName").getComponent(cc.Label),
                            o = g.getChildByName("labelValue1").getComponent(cc.Label),
                            r = g.getChildByName("labelValue2").getComponent(cc.Label),
                            c = ft.ExtEquip.getUpgradeType(e.id);
                        n.spriteFrame = ft.ExtPropName.getSpriteIcon(c), s.string = ft.ExtPropName.getName(c);
                        var h = ft.ExtEquip.getLevelValue(e, c);
                        o.string = h + (c === ft.type.prop.gjjl ? "" : "%"), h = ft.ExtEquip.getLevelValue(e, c, e.lv + 1), r.string = h + (c === ft.type.prop.gjjl ? "" : "%");
                        var f = ft.ExtEquip.getExtraGrowths(e.id);
                        if (f)
                            for (var d = 0; d < f.length; d++)
                                if (f[d] > 0) {
                                    (g = this.nodePanelProp.children[1]).active = !0;
                                    n = g.getChildByName("spriteIcon").getComponent(cc.Sprite), s = g.getChildByName("labelName").getComponent(cc.Label), o = g.getChildByName("labelValue1").getComponent(cc.Label), r = g.getChildByName("labelValue2").getComponent(cc.Label), c = ft.ExtEquip.getExtraTypes(e.id)[d];
                                    n.spriteFrame = ft.ExtPropName.getSpriteIcon(c), s.string = ft.ExtPropName.getName(c);
                                    h = ft.ExtEquip.getExtraValue(e, c);
                                    o.string = h, h = ft.ExtEquip.getExtraValue(e, c, e.lv + 1), r.string = h;
                                    break
                                }
                    } else if (2 === t) {
                        this.nodePanelProp.children[0].active = !1, this.nodePanelProp.children[1].active = !1;
                        var l, u = ft.ExtEquip.getMaxStar(e.id);
                        if (e.star >= u) {
                            if (l = ft.ExtEquip.getAdvancedTypes(e.id, Math.max(e.star - 1, 0)))
                                for (d = 0; d < l.length && d < 2; d++) {
                                    (g = this.nodePanelProp.children[d]).active = !0;
                                    n = g.getChildByName("spriteIcon").getComponent(cc.Sprite);
                                    var p = g.getChildByName("spriteArrow").getComponent(cc.Sprite);
                                    s = g.getChildByName("labelName").getComponent(cc.Label), o = g.getChildByName("labelValue1").getComponent(cc.Label), r = g.getChildByName("labelValue2").getComponent(cc.Label);
                                    c = l[d], n.spriteFrame = ft.ExtPropName.getSpriteIcon(c), s.string = ft.ExtPropName.getName(c), o.string = ft.ExtEquip.getStarValue(e, c, void 0, !0), p.node.active = !1, r.node.active = !1
                                }
                        } else if (l = ft.ExtEquip.getAdvancedTypes(e.id, Math.max(e.star, 0)))
                            for (d = 0; d < l.length && d < 2; d++) {
                                var g;
                                (g = this.nodePanelProp.children[d]).active = !0;
                                n = g.getChildByName("spriteIcon").getComponent(cc.Sprite), p = g.getChildByName("spriteArrow").getComponent(cc.Sprite), s = g.getChildByName("labelName").getComponent(cc.Label), o = g.getChildByName("labelValue1").getComponent(cc.Label), r = g.getChildByName("labelValue2").getComponent(cc.Label);
                                c = l[d], n.spriteFrame = ft.ExtPropName.getSpriteIcon(c), s.string = ft.ExtPropName.getName(c), o.string = ft.ExtEquip.getStarValue(e, c, void 0, !0), r.string = ft.ExtEquip.getStarValue(e, c, Math.min(e.star + 1, u), !0), p.node.active = !0, r.node.active = !0
                            }
                    } else 3 === t && (this.labelInfo.string = "\u4e00\u661f\uff0c\u4e94\u661f\uff0c\u5341\u661f\u53ef\u4ee5\u5404\u5f00\u542f\u4e00\u4e2a\u5b9d\u77f3\u63d2\u69fd\u3002\u7b2c\u4e00\u4e2a\u63d2\u69fd\u81ea\u52a8\u89e3\u9501,\u5176\u4f59\u63d2\u69fd\u9700\u8981\u6253\u5b54\u5668\u3002")
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonChange.node) {
                        var i = this.equips[this.index];
                        if (i) {
                            var a = ft.ExtHero.getHeroByPos(i.pos),
                                n = ft.ExtEquip.getPart(i.id),
                                s = ft.ExtEquip.getEquipsByPart(n, ft.ExtHero.getWeapon(a.id), a.id);
                            ftc.loadLayout("LayoutList", function (t) {
                                t.setData({
                                    type: ft.type.list.ChangeEquip,
                                    pos: i.pos,
                                    datas: s
                                })
                            })
                        }
                    } else if (t.target === this.buttonLeft.node) this.index > 0 && (this.index -= 1, this.setEquipInfo(this.equips[this.index]), this.buttonLeft.node.active = 0 !== this.index, this.buttonRight.node.active = this.index !== this.equips.length - 1), ftc.ManagerTV.nextSelect();
                    else if (t.target === this.buttonRight.node) this.index < this.equips.length - 1 && (this.index += 1, this.setEquipInfo(this.equips[this.index]), this.buttonLeft.node.active = 0 !== this.index, this.buttonRight.node.active = this.index !== this.equips.length - 1), ftc.ManagerTV.nextSelect();
                    else if (t.target === this.buttonClose.node) this.cancel();
                    else
                        for (var o = 0; o < this.buttonTabs.length; o++)
                            if (t.target === this.buttonTabs[o].node) {
                                this.selectTab(o);
                                break
                            }
                },
                onKeyMenu: function (t) {
                    if (!t) {
                        for (; this.tvTabIndex++, this.tvTabIndex >= this.buttonTabs.length && (this.tvTabIndex = 0), !this.buttonTabs[this.tvTabIndex].node.active;);
                        return this.selectTab(this.tvTabIndex), !0
                    }
                }
            })
        