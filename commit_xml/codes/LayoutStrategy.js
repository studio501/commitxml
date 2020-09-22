
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonTabs: [cc.Button],
                    listView: ftc.ListView,
                    nodeLayout: cc.Node,
                    partStrategies: [t("PartStrategy")],
                    buttonStrategies: [cc.Button]
                },
                init: function () {
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t], !0);
                    for (t = 0; t < this.buttonStrategies.length; t++) this.addClick(this.buttonStrategies[t], {
                        auto: !0
                    })
                },
                load: function () {
                    this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("策略"), this.partTopStatus.setCloseCallback(function () {
                        ftc.send("petDelTip", 2), this.cancel()
                    }.bind(this)), this.node.addChild(this.partTopStatus.node);
                    for (var t = 0; t < this.partStrategies.length; t++) this.initPart(this.partStrategies[t]);
                    var e = ftc.ManagerData.get2("Pet"),
                        i = [];
                    for (var t in e) {
                        var a = ft.ExtPet.getType(e[t].id);
                        a != ft.type.pet.embattle && (i[a - 2] = e[t])
                    }
                    t = 0;
                    for (var n = ft.value.com.strategySize; t < n; t++) i[t] || (i[t] = ft.value.strategies[t]);
                    i.sort(function (t, e) {
                        return t.id && e.id ? ft.ExtPet.getType(t.id) - ft.ExtPet.getType(e.id) : t.id || e.id ? e.id ? 1 : -1 : ft.ExtPet.getType(t) - ft.ExtPet.getType(e)
                    }), this.tips = ftc.ManagerData.get1("ManagerPet").addTipsStrategy, this.listView.setListView(i, {
                        team: 0,
                        tips: this.tips
                    }), this.selectTab(0)
                },
                setData: function (t) { },
                enter: function () {
                    this.updateData()
                },
                updateTvTip: function () {
                    var t, e = this.getTvSelectSte();
                    t = -2 == e ? "【返回键】返回上阵策略，【菜单键】切换队伍，【确定键】上阵策略" : -1 == e ? "【返回键】关闭界面，【菜单键】切换队伍，【确定键】选择策略" : "【返回键】关闭界面，【菜单键】切换队伍，【确定键】下阵策略", ftc.setTvTip(this.node, t)
                },
                updateData: function () {
                    this.partTopStatus.updateData()
                },
                tick: function (t) {
                    if (this.toTvUpdate) {
                        if (this.toTvUpdate = void 0, 1 == this.tvZone) {
                            var e = this.listView.getFirstIndex();
                            e >= 0 && ftc.ManagerTV.nextSelect(this.listView.getItem(e).buttonSelf)
                        }
                        this.updateTvTip()
                    }
                },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectStrategyItem: function (t, e) {
                            if (t.isUpped()) ftc.showTip("策略已上阵");
                            else if (t.data.id) {
                                var i = this.getUpPos();
                                i >= 0 ? ftc.send("artifactSet", {
                                    id: t.data.id,
                                    pos: i,
                                    team: this.tabIndex
                                }) : ftc.showTip("没有空位了")
                            } else ftc.showTip("尚未解锁");
                            if (t.data.id) {
                                for (var a = this.tips.split(","), n = 0; n < a.length; n++)
                                    if (a[n] == t.data.id) {
                                        a.splice(n, 1);
                                        break
                                    } this.tips = a.join(",")
                            }
                        },
                        artifactSet: function (t, e) {
                            this.listView.updateListViewItems({
                                team: this.tabIndex,
                                tips: this.tips
                            }), this.setStrategies(), 1 == this.tvZone && (this.tvZone = 0, ftc.ManagerTV.nextSelect(this.tvOldSelect)), this.updateTvTip()
                        },
                        petDelTip: function (t, e) { }
                    }
                },
                onClick: function (t) {
                    for (var e = 0; e < this.buttonTabs.length; e++)
                        if (t.target === this.buttonTabs[e].node) {
                            this.selectTab(e);
                            break
                        } if (ftc.isTv()) this.updateTvTip();
                    else
                        for (e = 0; e < this.buttonStrategies.length; e++)
                            if (t.target == this.buttonStrategies[e].node) {
                                var i = this.partStrategies[e];
                                i && i.getData() && ftc.send("artifactSet", {
                                    id: 0,
                                    pos: e,
                                    team: this.tabIndex
                                });
                                break
                            }
                },
                getTvSelectSte: function () {
                    if (this.tvZone) return -2;
                    for (var t = ftc.ManagerTV.getSelectButton(), e = 0, i = 0; i < this.buttonStrategies.length; i++)
                        if (t == this.buttonStrategies[i]) {
                            e = i;
                            break
                        } var a = this.partStrategies[e];
                    return a && a.getData() ? e : -1
                },
                selectTab: function (t) {
                    if (ft.ExtHero.getIsOpenTeam(t)) {
                        this.tabIndex = t;
                        for (var e = [ftc.type.tab.team, ftc.type.tab.team], i = 0; i < this.buttonTabs.length; i++) this.buttonTabs[i].interactable = t !== i, this.buttonTabs[i].node.getChildByName("spriteTabIcon").getComponent(cc.Sprite).spriteFrame = ftc.getTabSpriteFrame(e[i], t === i), this.buttonTabs[i].node.getChildByName("labelTab").color = t !== i ? ftc.newColor(ftc.value.color.tabNormal) : ftc.newColor(ftc.value.color.tabPressed), this.buttonTabs[i].node.getChildByName("labelTab").getComponent(cc.LabelOutline).color = t !== i ? ftc.newColor(ftc.value.color.tabNormalOutline) : ftc.newColor(ftc.value.color.tabPressedOutline);
                        this.setStrategies();
                        var a = ftc.ManagerData.get1("ManagerPet").addTipsStrategy;
                        this.listView.updateListViewItems({
                            team: this.tabIndex,
                            tips: a
                        }), ftc.isTv() && (this.toTvUpdate = !0)
                    } else ftc.showTip("3\u5468\u76ee\u5f00\u653e\u961f\u4f0d2")
                },
                setStrategies: function () {
                    for (var t = ftc.ManagerData.get1("ManagerPet")["selectArtifacts" + this.tabIndex].split(","), e = 0; e < t.length; e++) {
                        var i = parseInt(t[e]);
                        0 !== i ? this.partStrategies[e].setData({
                            id: i,
                            pos: e,
                            team: this.tabIndex
                        }) : this.partStrategies[e].setData(null)
                    }
                },
                getUpPos: function () {
                    for (var t = 0; t < this.partStrategies.length; t++)
                        if (!this.partStrategies[t].getData()) return t;
                    return -1
                },
                onKeyMenu: function (t) {
                    if (!t) {
                        var e = 1 - this.tabIndex;
                        return this.selectTab(e), !0
                    }
                },
                onKeyOk: function (t) {
                    if (!t) {
                        var e = this.getTvSelectSte();
                        if (-1 == e) return this.tvOldSelect = ftc.ManagerTV.getSelectButton(), this.tvZone = 1, ftc.ManagerTV.nextSelect(void 0, this.node, this.tvZone), this.updateTvTip(), !0;
                        if (e >= 0) return ftc.send("artifactSet", {
                            id: 0,
                            pos: e,
                            team: this.tabIndex
                        }), !0
                    }
                },
                onKeyBack: function (t) {
                    if (!t && 1 == this.tvZone) return this.tvZone = 0, ftc.ManagerTV.nextSelect(this.tvOldSelect), !0
                }
            })
        