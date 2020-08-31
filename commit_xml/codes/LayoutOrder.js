
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    nodeRoot: cc.Node,
                    partOrder: t("PartOrder"),
                    buttonTabs: [cc.Button],
                    listView: ftc.ListView,
                    buttonEnable: cc.Button,
                    buttonUp: cc.Button
                },
                init: function () {
                    this.prepareParts(["PartOrder", "PartOrderHero", "PartOrderHeroBg", "PartOrderHeroBgInfo"]);
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t], !0);
                    this.addClick(this.buttonEnable, {
                        zone: 1
                    }), this.addClick(this.buttonUp, {
                        zone: 1
                    }), ftc.ManagerTV.setNotShowOnEnter(this.node)
                },
                load: function () {
                    this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("\u5e03\u9635", 1), this.partTopStatus.setCloseCallback(function () {
                        ftc.send("petDelTip", 1), this.cancel()
                    }.bind(this)), this.node.addChild(this.partTopStatus.node), this.initPart(this.partOrder), this.orderIndex = void 0, this.listView.setListView(this._getOrderData()), this.selectTab(0)
                },
                selectTab: function (t) {
                    if (ft.ExtHero.getIsOpenTeam(t)) {
                        this.team = t;
                        for (var e = 0; e < this.buttonTabs.length; e++) this.buttonTabs[e].interactable = t !== e;
                        var i = ftc.ManagerData.get1("ManagerPet")["selectPet" + t],
                            a = this.listView.getDatas();
                        for (e = 0; e < a.length; e++) {
                            if ((a[e].id || a[e]) == i) {
                                this.listView.updateListViewItems({
                                    index: e,
                                    selectPet: i
                                }), this.listView.toIndex(e), this.selectIndex = e;
                                break
                            }
                        }
                        this.partOrder.selectTeam(t), this.partOrder.setOrder(i), ftc.isTv() && (this.toTvUpdate = !0)
                    } else ftc.showTip("3\u5468\u76ee\u5f00\u653e\u961f\u4f0d2")
                },
                setData: function (t) { },
                enter: function () {
                    this.updateData()
                },
                updateData: function () {
                    this.partTopStatus.updateData(), this.listView.updateListViewItems(), this.partOrder.updateData()
                },
                _getOrderData: function (t) {
                    var e = ftc.ManagerData.get2("Pet"),
                        i = [],
                        a = [];
                    for (var n in e) ft.ExtPet.getType(e[n].id) === ft.type.pet.embattle && i.push(e[n]);
                    if (t) return i;
                    for (var n in ftd.Pet.data)
                        if (ft.ExtPet.getType(n) === ft.type.pet.embattle && -1 !== ft.ExtPet.getLevel(n)) {
                            for (var s = !1, o = 0; o < i.length; o++)
                                if (i[o].id == n) {
                                    s = !0;
                                    break
                                } s || a.push(n)
                        } return i.concat(a)
                },
                tick: function (t) {
                    if (this.toTvUpdate)
                        if (this.toTvUpdate = void 0, this.tvZone) ftc.ManagerTV.nextSelect(void 0, this.node, this.tvZone);
                        else if (this.selectIndex >= 0) {
                            var e = this.listView.getItem(this.selectIndex);
                            e && (ftc.ManagerTV.nextSelect(e.buttonSelf), this.updateTvTip(!0))
                        }
                },
                updateTvSelect: function (t) {
                    for (var e = this.listView.getDatas(), i = 0; i < e.length; i++) {
                        if ((e[i].id || e[i]) == t) {
                            this.selectIndex = i;
                            break
                        }
                    }
                    var a = this.listView.getItem(this.selectIndex);
                    this.updateTvTip(a && a.node == ftc.ManagerTV.getSelectNode())
                },
                updateTvTip: function (t) {
                    var e;
                    this.tvZone ? e = "\u3010\u8fd4\u56de\u952e\u3011\u9635\u6cd5\u5217\u8868\uff0c\u3010\u83dc\u5355\u952e\u3011\u5207\u6362\u961f\u4f0d" : (e = "\u3010\u8fd4\u56de\u952e\u3011\u5173\u95ed\u754c\u9762\uff0c\u3010\u83dc\u5355\u952e\u3011\u5207\u6362\u961f\u4f0d\uff0c\u3010\u786e\u5b9a\u952e\u3011", e += t ? "\u6b66\u5c06\u5e03\u9635" : "\u542f\u7528\u9635\u6cd5"), ftc.setTvTip(this.node, e)
                },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectOrderItem: function (t, e) {
                            if (t.data.id) {
                                var i = ftc.ManagerData.get1("ManagerPet")["selectPet" + this.team];
                                this.listView.updateListViewItems({
                                    index: t.index,
                                    selectPet: i
                                }), this.selectIndex = t.index, this.orderIndex = t.index, this.partOrder.setOrder(t.data.id || t.data), ftc.isTv() && this.updateTvSelect(i)
                            } else ftc.showTip("\u5c1a\u672a\u89e3\u9501")
                        },
                        petSet: function (t, e) {
                            var i = ftc.ManagerData.get1("ManagerPet")["selectPet" + this.team];
                            this.listView.updateListViewItems({
                                index: this.orderIndex,
                                selectPet: i
                            }), this.updateTvSelect(i), ftc.playEffect(ftc.type.effect.order_change), ftc.showTip("\u542f\u7528\u9635\u6cd5\u6210\u529f")
                        }
                    }
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonEnable.node) this.partOrder.isTeamFull() ? void 0 !== this.orderIndex && (i = this.listView.getDatas()[this.orderIndex]) && (ftc.ManagerData.get1("ManagerPet")["selectPet" + this.team] == i.id ? ftc.showTip("\u9635\u6cd5\u542f\u7528\u4e2d") : ftc.send("petSet", {
                        id: i.id,
                        team: this.team
                    })) : ftc.showTip("\u6b64\u9635\u6cd5\u9700\u8981\u5168\u90e8\u6b66\u5c06\u4e0a\u5c06\u5e76\u4e14\u65e0\u9635\u4ea1\u624d\u80fd\u8d77\u4f5c\u7528");
                    else if (t.target === this.buttonUp.node) {
                        var i;
                        (i = this.listView.getDatas()[this.selectIndex]).id ? 1 === i.id ? ftc.showTip("\u6563\u5f00\u9635\u65e0\u6cd5\u7a81\u7834") : ftc.loadLayout("LayoutOrderUp", function (t) {
                            t.setData(this.team, this._getOrderData(!0), this.selectIndex)
                        }.bind(this)) : ftc.showTip("\u5c1a\u672a\u89e3\u9501")
                    } else
                        for (var a = 0; a < this.buttonTabs.length; a++)
                            if (t.target === this.buttonTabs[a].node) {
                                this.selectTab(a);
                                break
                            }
                },
                onKeyMenu: function (t) {
                    if (!t) {
                        var e = 1 - this.team;
                        return this.selectTab(e), !0
                    }
                },
                onKeyOk: function (t) {
                    if (!t && !this.tvZone) {
                        var e = this.listView.getItem(this.selectIndex);
                        return e && e.node && (this.tvZone = 1, ftc.ManagerTV.nextSelect(this.buttonEnable, void 0, this.tvZone), this.updateTvTip()), !0
                    }
                },
                onKeyBack: function (t) {
                    if (!t && 1 == this.tvZone) return this.tvZone = 0, ftc.ManagerTV.nextSelect(this.listView.getItem(this.selectIndex).buttonSelf, this.node, this.tvZone), this.updateTvTip(!0), !0
                }
            })
        