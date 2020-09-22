
            
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
                    this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("布阵", 1), this.partTopStatus.setCloseCallback(function () {
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
                    this.tvZone ? e = "【返回键】阵法列表，【菜单键】切换队伍" : (e = "【返回键】关闭界面，【菜单键】切换队伍，【确定键】", e += t ? "武将布阵" : "启用阵法"), ftc.setTvTip(this.node, e)
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
                            } else ftc.showTip("尚未解锁")
                        },
                        petSet: function (t, e) {
                            var i = ftc.ManagerData.get1("ManagerPet")["selectPet" + this.team];
                            this.listView.updateListViewItems({
                                index: this.orderIndex,
                                selectPet: i
                            }), this.updateTvSelect(i), ftc.playEffect(ftc.type.effect.order_change), ftc.showTip("启用阵法成功")
                        }
                    }
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonEnable.node) this.partOrder.isTeamFull() ? void 0 !== this.orderIndex && (i = this.listView.getDatas()[this.orderIndex]) && (ftc.ManagerData.get1("ManagerPet")["selectPet" + this.team] == i.id ? ftc.showTip("阵法启用中") : ftc.send("petSet", {
                        id: i.id,
                        team: this.team
                    })) : ftc.showTip("此阵法需要全部武将上将并且无阵亡才能起作用");
                    else if (t.target === this.buttonUp.node) {
                        var i;
                        (i = this.listView.getDatas()[this.selectIndex]).id ? 1 === i.id ? ftc.showTip("散开阵无法突破") : ftc.loadLayout("LayoutOrderUp", function (t) {
                            t.setData(this.team, this._getOrderData(!0), this.selectIndex)
                        }.bind(this)) : ftc.showTip("尚未解锁")
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
        