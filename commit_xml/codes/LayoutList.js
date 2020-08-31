
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    nodeRoot: cc.Node,
                    labelTitle: cc.Label,
                    buttonClose: cc.Button,
                    listViewEquip: ftc.ListView,
                    listViewHero: ftc.ListView,
                    listViewJewel: ftc.ListView,
                    buttonSelect: cc.Button,
                    labelSelect: cc.Label,
                    labelTip: cc.Label
                },
                init: function () {
                    this.prepareParts(["PartMenu"]), this.addClick(this.buttonClose, {
                        zone: 99
                    }), this.addClick(this.buttonSelect, !0), ftc.ManagerTV.setBackButton(this.buttonClose), this.listViews = [this.listViewEquip, this.listViewHero, this.listViewJewel]
                },
                load: function () {
                    for (var t = 0; t < this.listViews.length; t++) this.listViews[t].node.active = !1;
                    this._partMenuPart = void 0, this._partMenuCountry = void 0, this._partMenuJewel = void 0, this.labelSelect.string = ftc.language("\u5168\u90e8"), this.lastSelectItem = null, this._notUpdate = !0, this.datas = void 0, this.labelTip.node.active = !1, ftc.setTvTip(this.node)
                },
                setData: function (t) {
                    this.data = t, this.type = t.type, this.datas = t.datas, this.pos = t.pos;
                    var e = !1;
                    switch (this.type) {
                        case ft.type.list.ChangeHero:
                        case ft.type.list.ChooseHero:
                            if (this.labelTitle.string = ftc.language("\u9009\u62e9\u6b66\u5c06"), this.listViewHero.node.active = !0, e = !0, !this.datas) {
                                ft.ExtHero.load(!0), (o = ftc.ManagerData.get2Array("Hero")).sort(function (t, e) {
                                    return t.favour && !e.favour ? -1 : !t.favour && e.favour ? 1 : ft.ExtHero.getIndex(t.id) - ft.ExtHero.getIndex(e.id)
                                });
                                for (var i = [], a = [], n = 0; n < o.length; n++) {
                                    -1 !== ft.ExtHero.getPos(o[n].id) ? i.push(o[n]) : a.push(o[n])
                                }
                                if (i.sort(function (t, e) {
                                    return ft.ExtHero.getPos(t.id) - ft.ExtHero.getPos(e.id)
                                }), ft.ExtMap.getType(ftc.ManagerData.get1("ManagerMap").cur) === ft.type.map.flhj) this.labelTip.node.active = !0, this.labelTip.string = ftc.language("\u5df2\u9690\u85cf\u4e0d\u53ef\u4e0a\u9635\u6b66\u5c06"), this.datas = i, e = !1;
                                else if (ft.ExtMap.getType(ftc.ManagerData.get1("ManagerMap").cur) === ft.type.map.zy && ftc.ManagerData.get1("ManagerTask").cur >= 3301) {
                                    this.labelTip.node.active = !0, this.labelTip.string = ftc.language("\u5df2\u9690\u85cf\u975e\u9b4f\u56fd\u6b66\u5c06");
                                    var s = i.concat(a);
                                    this.datas = [];
                                    for (n = 0; n < s.length; n++) ft.ExtHero.getCountry(s[n].id) === ft.type.country.Wei && this.datas.push(s[n]);
                                    e = !1
                                } else this.datas = i.concat(a)
                            }
                            break;
                        case ft.type.list.ChooseJewel:
                            this.datas = ft.ExtJewel.getJewels(void 0, !1), this.labelTitle.string = ftc.language("\u9009\u62e9\u5b9d\u77f3"), this.listViewJewel.node.active = !0, e = !0;
                            break;
                        case ft.type.list.ChooseJewelUpgrade:
                            this.labelTitle.string = ftc.language("\u9009\u62e9\u5b9d\u77f3"), this.listViewJewel.node.active = !0;
                            break;
                        case ft.type.list.Inherit:
                            break;
                        case ft.type.list.UseGoods:
                            this.labelTitle.string = ftc.language("\u70b9\u51fb\u4f7f\u7528"), this.listViewHero.node.active = !0, e = !0, (o = ftc.ManagerData.get2Array("Hero")).sort(function (t, e) {
                                return t.favour && !e.favour ? -1 : !t.favour && e.favour ? 1 : ft.ExtHero.getIndex(t.id) - ft.ExtHero.getIndex(e.id)
                            });
                            for (i = [], a = [], n = 0; n < o.length; n++) {
                                -1 !== ft.ExtHero.getPos(o[n].id) ? i.push(o[n]) : a.push(o[n])
                            }
                            i.sort(function (t, e) {
                                return ft.ExtHero.getPos(t.id) - ft.ExtHero.getPos(e.id)
                            }), this.datas = i.concat(a);
                            break;
                        case ft.type.list.UseStrategy:
                            break;
                        case ft.type.list.EquipUpgrade:
                            t.part && (this.labelTitle.string = ftc.language("\u70b9\u51fb\u4f7f\u7528"), this.listViewEquip.node.active = !0, this.datas = ft.ExtEquip.getEquipsByPart(t.part), e = !0);
                            break;
                        case ft.type.list.ChangeEquip:
                        case ft.type.list.EquipSwitch:
                            this.labelTitle.string = ftc.language("\u9009\u62e9\u88c5\u5907"), this.listViewEquip.node.active = !0;
                            break;
                        case ft.type.list.ChangeCommander:
                            break;
                        case ft.type.list.UseGoods2:
                            var o;
                            this.labelTitle.string = ftc.language("\u70b9\u51fb\u4f7f\u7528"), this.listViewHero.node.active = !0, e = !0, (o = ftc.ManagerData.get2Array("Hero")).sort(function (t, e) {
                                return t.favour && !e.favour ? -1 : !t.favour && e.favour ? 1 : ft.ExtHero.getIndex(t.id) - ft.ExtHero.getIndex(e.id)
                            });
                            for (i = [], a = [], n = 0; n < o.length; n++) {
                                -1 !== ft.ExtHero.getPos(o[n].id) ? i.push(o[n]) : a.push(o[n])
                            }
                            i.sort(function (t, e) {
                                return ft.ExtHero.getPos(t.id) - ft.ExtHero.getPos(e.id)
                            }), this.datas = i.concat(a)
                    }
                    this.listViewEquip.node.active ? (this.listView = this.listViewEquip, e && this.addPartMenu(1)) : this.listViewHero.node.active ? (this.listView = this.listViewHero, e && this.addPartMenu(2)) : this.listViewJewel.node.active && (this.listView = this.listViewJewel, e && this.addPartMenu(3)), this.datas && this.listView.setListView(this.datas), ftc.isTv() ? this.buttonSelect.node.active = !1 : this.buttonSelect.node.active = e
                },
                addPartMenu: function (t) {
                    var e = this.nodeRoot.convertToNodeSpaceAR(this.buttonSelect.node.convertToWorldSpaceAR(cc.v2(0, 0)));
                    1 === t ? (this._partMenuPart = this.newPart("PartMenu"), this._partMenuPart.setData(ft.type.part.partNames, this.onClickPart.bind(this)), this._partMenuPart.nodeLayout.position = cc.v2(e.x, e.y + 26), this.node.addChild(this._partMenuPart.node), this._partMenuPart.node.active = !1) : 2 === t ? (this._partMenuCountry = this.newPart("PartMenu"), this._partMenuCountry.setData(ft.type.country.countryNames, this.onClickCountry.bind(this)), this._partMenuCountry.nodeLayout.position = cc.v2(e.x, e.y + 26), this.node.addChild(this._partMenuCountry.node), this._partMenuCountry.node.active = !1) : 3 === t && (this._partMenuJewel = this.newPart("PartMenu"), this._partMenuJewel.setData(ft.type.jewel.jewelNames, this.onClickJewelType.bind(this)), this._partMenuJewel.nodeLayout.position = cc.v2(e.x, e.y + 26), this.node.addChild(this._partMenuJewel.node), this._partMenuJewel.node.active = !1)
                },
                onClickPart: function (t) {
                    var e = this.getListDatas(t);
                    e.length > 0 ? (this.labelSelect.string = ft.type.part.partNames[index], this.listView.setListView(e)) : ftc.showTip("\u65e0\u6b64\u90e8\u4f4d\u7684\u88c5\u5907"), this.updateTv(e.length)
                },
                onClickCountry: function (t) {
                    var e = this.getListDatas(void 0, t);
                    e.length > 0 ? (this.labelSelect.string = ft.type.country.countryNames[t], this.listView.setListView(e)) : ftc.showTip("\u65e0\u6b64\u56fd\u5bb6\u7684\u6b66\u5c06"), this.updateTv(e.length)
                },
                onClickJewelType: function (t) {
                    var e = this.getListDatas(void 0, void 0, t);
                    e.length > 0 ? (this.labelSelect.string = ft.type.jewel.jewelNames[t], this.listView.setListView(e)) : ftc.showTip("\u65e0\u6b64\u7c7b\u578b\u7684\u5b9d\u77f3"), this.updateTv(e.length)
                },
                updateTv: function (t) {
                    t ? (this.tvZone = 1, ftc.ManagerTV.nextSelect(this.listView.getItem(0).buttonSelf)) : (this.tvZone = 0, ftc.ManagerTV.nextSelect())
                },
                getListDatas: function (t, e, i) {
                    var a = [];
                    if (void 0 !== t) {
                        var n = ftc.ManagerData.get2("Equip");
                        for (var s in n) this.part !== ft.type.part.all && ft.ExtEquip.getPart(n[s].id) !== this.part || a.push(n[s])
                    } else if (void 0 !== e)
                        for (s = 0; s < ft.ExtHero.myHeroes.length; s++) !ft.ExtHero.myHeroes[s].id || e !== ft.type.country.all && ft.ExtHero.getCountry(ft.ExtHero.myHeroes[s].id) !== e || a.push(ft.ExtHero.myHeroes[s]);
                    else void 0 !== i && (a = ft.ExtJewel.getJewels(i));
                    return a
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectEquipItem: function (t, e) {
                            if (this.type === ft.type.list.EquipUpgrade) {
                                var i = ft.ExtEquip.getPart(t.data.id);
                                ft.ExtItem.getNum(ft.value.item["equipUpgrade" + i]) > 0 ? ftc.send("equipLevelUp", {
                                    eids: [t.data.entityId],
                                    ups: [1]
                                }) : ftc.showTip("\u5f3a\u5316\u5238\u6570\u91cf\u4e0d\u8db3")
                            } else if (this.type === ft.type.list.ChangeEquip) {
                                if (t.data.pos === this.pos) {
                                    var a = ftc.ManagerRes.findLayout("LayoutEquipDetail");
                                    a && a.cancel(!0, void 0, !0), ftc.send("equipUnload", {
                                        eid: t.data.entityId
                                    })
                                } else ftc.send("equipOnload", {
                                    eid: t.data.entityId,
                                    pos: this.pos
                                });
                                this.cancel(!0)
                            } else this.type === ft.type.list.EquipSwitch && (ftc.send("c_onSelectListEquipItem", t, "LayoutEquipSwitch"), this.cancel())
                        },
                        c_onSelectHeroItem1: function (t, e) {
                            if (this.type === ft.type.list.UseGoods) ft.ExtItem.getNum(this.data.id) <= 0 ? ftc.showTip("\u9053\u5177\u6570\u91cf\u4e0d\u8db3") : (ftc.send("itemUse", {
                                id: this.data.id,
                                param: t.data.id
                            }), this._notUpdate = !1), this.lastSelectItem = t;
                            else if (this.type === ft.type.list.ChangeHero) ftc.send("c_onSelectListHeroItem", {
                                id: t.data.id,
                                pos: this.pos
                            }, "LayoutTeam"), this.cancel();
                            else if (this.type === ft.type.list.ChooseHero) ftc.send("c_onSelectListHeroItem", t, "LayoutHeroInherit"), this.cancel();
                            else if (this.type === ft.type.list.ChooseJewel) {
                                var i = this.data.equip,
                                    a = this.data.slot;
                                if (void 0 !== i && void 0 !== a) ft.ExtJewel.getJewel(i, a) ? (ftc.send("jewelOnload", {
                                    eid: t.data.entityId,
                                    eid2: i.entityId,
                                    slot: a
                                }), this.cancel()) : ftc.showDialog({
                                    text: "\u9576\u5d4c\u5b9d\u77f3\u9700\u8981\u6d88\u8017100\u3010\u9576\u5d4c\u7c89\u3011\uff0c\u786e\u5b9a\u9576\u5d4c\u4e48?",
                                    click1: function () {
                                        ftc.send("jewelOnload", {
                                            eid: t.data.entityId,
                                            eid2: i.entityId,
                                            slot: a
                                        }), this.cancel()
                                    }.bind(this),
                                    click2: function () { },
                                    consume1: {
                                        id: ft.value.item.inlayPowder,
                                        num: 100
                                    }
                                })
                            } else this.type === ft.type.list.ChooseJewelUpgrade && (ftc.sendClient("c_onSelectListJewelItem", t), this.cancel())
                        },
                        equipLevelUp: function (t, e) {
                            var i = t[0][1];
                            if (i && i > 0) {
                                ftc.showTip("\u5347\u7ea7\u6210\u529f"), this._notUpdate = !1;
                                var a = t[0][0],
                                    n = this.listView.getDatas(),
                                    s = ft.ExtEquip.getEquipsByPart(this.data.part);
                                if (n.length === s.length) {
                                    for (var o = 0; o < n.length; o++)
                                        if (n[o].entityId == a) {
                                            this.listView.updateListViewItem(o), this.listView.getItem(o).playAni();
                                            break
                                        }
                                } else
                                    for (o = 0; o < n.length; o++)
                                        if (n[o].entityId == a) {
                                            this.listView.getItem(o).playAni(), this.listView.updateListViewItems(o, s);
                                            break
                                        }
                            } else ftc.showTip("\u5347\u7ea7\u5931\u8d25")
                        },
                        itemUse: function (t, e) {
                            this.lastSelectItem && t > 0 && this.listView.updateListViewItem(this.lastSelectItem.index)
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.buttonClose.node ? this.cancel(this._notUpdate) : t.target === this.buttonSelect.node && (this._partMenuPart ? this._partMenuPart.node.active = !this._partMenuPart.node.active : this._partMenuCountry ? this._partMenuCountry.node.active = !this._partMenuCountry.node.active : this._partMenuJewel && (this._partMenuJewel.node.active = !this._partMenuJewel.node.active))
                },
                onKeyMenu: function (t) {
                    t || (this.tvZone ? this.tvZone = 0 : this.tvZone = 1, ftc.ManagerTV.nextSelect(void 0, this.node, this.tvZone))
                }
            })
        