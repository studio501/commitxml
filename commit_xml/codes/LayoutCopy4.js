
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    nodeItem: cc.Node,
                    scrollViewReward: cc.ScrollView,
                    labelInfo: cc.RichText,
                    buttonTabs: [cc.Button],
                    labelIntro: cc.RichText,
                    toggleChallenge: cc.Toggle,
                    buttonChallenge: cc.Button,
                    toggleMopUp: cc.Toggle,
                    buttonMopUp: cc.Button,
                    labelTicket1: cc.Label,
                    labelTicket2: cc.Label,
                    buttonEnter: cc.Button,
                    buttonTeam: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonEnter), this.addClick(this.buttonTeam), this.addClick(this.buttonChallenge), this.addClick(this.buttonMopUp);
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t], !0)
                },
                load: function () {
                    this.id = ft.value.copy.ZY, this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle(ft.ExtCopy.getName(this.id)), this.node.addChild(this.partTopStatus.node), ftc.setTvTip(this.node, "\u3010\u8fd4\u56de\u952e\u3011\u5173\u95ed\u754c\u9762\uff0c\u3010\u83dc\u5355\u952e\u3011\u5207\u6362\u96be\u5ea6")
                },
                setData: function (t) {
                    this.levels = ftd.Copy.get(this.id, "c_open").split(",");
                    var e = ftc.ManagerData.get1("Player").level;
                    this.opens = [!1, !1, !1, !1];
                    for (var i = 0; i < this.opens.length; i++) this.opens[i] = 0 === i ? e >= this.levels[i] : e >= this.levels[i] && ft.ExtItem.getNum(ft.value.item["zyCount" + (i - 1)]), this.buttonTabs[i].node.getChildByName("Text").x = this.opens[i] ? 0 : -15, this.buttonTabs[i].node.getChildByName("spriteLock").active = !this.opens[i];
                    this.updateData(), this.selectTab(0)
                },
                selectTab: function (t) {
                    this.tvTabIndex = t, this.buttonTeam.node.active = 3 === t, this.tabIndex = t;
                    for (var e = 0; e < this.buttonTabs.length; e++) this.buttonTabs[e].interactable = e !== t;
                    this.labelInfo.string = ft.ExtCopy.getInfo(this.id).split("|")[t], this.labelIntro.string = ft.ExtDetail.getInfo(ft.value.detail.copy_gd).replace("%d", this.levels[this.tabIndex]), this.nodeItem.removeAllChildren(), ftc.ManagerRes.restoreNodeChildren(this.scrollViewReward.content);
                    var i = ft.ExtCopy.getAwards(this.id, 2 * this.tabIndex);
                    i && ((n = this.newPart("PartItem")).node.scale = .54, n.setData(i.ids[0], i.nums[0]), this.nodeItem.addChild(n.node));
                    var a = ft.ExtCopy.getAwards(this.id, 2 * this.tabIndex + 1);
                    if (a)
                        for (e = 0; e < a.ids.length; e++) {
                            var n;
                            (n = this.newPart("PartItem")).node.scale = .54, n.setData(a.ids[e], a.nums[e]), this.scrollViewReward.content.addChild(n.node)
                        }
                    return this.selectMode(this.mode ? this.mode : ft.type.copyMode.challenge), !0
                },
                selectMode: function (t) {
                    this.mode = t, this.toggleChallenge.isChecked = t === ft.type.copyMode.challenge, this.toggleMopUp.isChecked = t === ft.type.copyMode.mopUp, this.labelTicket2.node.parent.active = t === ft.type.copyMode.mopUp, this.updateData()
                },
                enter: function () { },
                updateData: function () {
                    this.partTopStatus.updateData();
                    var t = ft.ExtItem.getNum(ft.value.item.campaignTicket),
                        e = ft.ExtItem.getNum(ft.value.item.mopUpTicket);
                    this.labelTicket1.string = t + "/1", this.labelTicket1.node.color = ftc.newColor(t >= 1 ? ftc.value.color.normal : ftc.value.color.lackRed), this.labelTicket2.string = e + "/" + ft.value.com.mopUpTicketNumWeekly, this.labelTicket2.node.color = ftc.newColor(e >= ft.value.com.mopUpTicketNumWeekly ? ftc.value.color.normal : ftc.value.color.lackRed), this.mode === ft.type.copyMode.challenge ? this.buttonEnter.interactable = this.opens[this.tabIndex] && t >= 1 : this.buttonEnter.interactable = this.opens[this.tabIndex] && t >= 1 && e >= ft.value.com.mopUpTicketNumWeekly
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        copyEnter: function (t, e) {
                            0 === t || (1 === t ? ftc.showTip("\u6b21\u6570\u4e0d\u8db3") : 2 === t ? ftc.showTip("\u4e0d\u80fd\u8fdb\u5165") : 3 === t && ftc.showTip("\u6570\u91cf\u4e0d\u8db3"))
                        },
                        copyMopUp: function (t, e) {
                            0 === t ? (ftc.showTip("\u626b\u8361\u6210\u529f"), this.updateData()) : 1 === t ? ftc.showTip("\u6b21\u6570\u4e0d\u8db3") : 2 === t ? ftc.showTip("\u4e0d\u80fd\u8fdb\u5165") : 3 === t && ftc.showTip("\u6218\u5f79\u6311\u6218\u5238\u4e0d\u8db3")
                        },
                        taskSetGuide: function (t, e) {
                            ftc.sendClient("c_updateMap", void 0, "LayoutMain")
                        },
                        shopLoad: function (t, e) { }
                    }
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonChallenge.node) this.selectMode(ft.type.copyMode.challenge);
                    else if (t.target === this.buttonMopUp.node) this.selectMode(ft.type.copyMode.mopUp);
                    else if (t.target === this.buttonEnter.node) {
                        if (this.mode === ft.type.copyMode.challenge)
                            if (this.opens[this.tabIndex])
                                if (ft.ExtCopy.checkConsume(ft.value.copy.ZY))
                                    if (3 === this.tabIndex) {
                                        for (var i = !0, a = ft.ExtHero.getTeam(ftc.ManagerData.get2Object("Hero"), ftc.ManagerData.get1("ManagerHero").teamIds, 0), n = 0; n < a.length; n++) a[n] && ft.ExtHero.getCountry(a[n].id) !== ft.type.country.Wei && (i = !1);
                                        i ? ftc.showDialog({
                                            text: "\u7ec8\u6781\u96be\u5ea6\u4e2d\u5c06\u65e0\u6cd5\u66f4\u6362\u975e\u9b4f\u56fd\u6b66\u5c06\uff0c\u8fd8\u671b\u4e3b\u516c\u591a\u591a\u6ce8\u610f!",
                                            click1: function () {
                                                ftc.send("copyEnter", {
                                                    id: ft.value.copy.ZY,
                                                    param: this.tabIndex
                                                }), this.cancel(), ftc.sendClient("c_copyEnter", void 0, "LayoutCopy")
                                            }.bind(this),
                                            click2: function () { }
                                        }) : ftc.showTip("\u8be5\u96be\u5ea6\u53ea\u80fd\u4f7f\u7528\u9b4f\u56fd\u6b66\u5c06\uff0c\u8bf7\u8c03\u6574\u9635\u5bb9")
                                    } else ftc.send("copyEnter", {
                                        id: ft.value.copy.ZY,
                                        param: this.tabIndex
                                    }), this.cancel(), ftc.sendClient("c_copyEnter", void 0, "LayoutCopy");
                                else ftc.showTip("\u6218\u5f79\u6311\u6218\u5238\u4e0d\u8db3");
                            else ftc.ManagerData.get1("Player").level < this.levels[this.tabIndex] ? ftc.showTip(this.levels[this.tabIndex] + "\u7ea7\u5f00\u653e") : ftc.showTip("\u8bf7\u5148\u901a\u8fc7\u524d\u7f6e\u6218\u5f79");
                        else ft.ExtCopy.checkConsume(ft.value.copy.ZY) ? ft.ExtItem.getNum(ft.value.item.mopUpTicket) < ft.value.com.mopUpTicketNumWeekly ? ftc.showTip("\u626b\u8361\u5238\u4e0d\u8db3") : ft.ExtCopy.isFinishChallenge(ft.value.copy.ZY, this.tabIndex) ? ftc.showDialog({
                            text: "\u786e\u5b9a\u6d88\u80175\u5f20\u626b\u8361\u5238\u548c1\u5f20\u6218\u5f79\u6311\u6218\u5238?",
                            click1: function () {
                                ftc.send("copyMopUp", {
                                    id: ft.value.copy.ZY,
                                    param: this.tabIndex
                                })
                            }.bind(this),
                            click2: function () { }
                        }) : ftc.showTip("\u8bf7\u5148\u5b8c\u6210\u6311\u6218") : ftc.showTip("\u6218\u5f79\u6311\u6218\u5238\u4e0d\u8db3")
                    } else if (t.target === this.buttonTeam.node) ftc.loadLayout("LayoutTeam", void 0, {
                        hide: !0
                    });
                    else
                        for (n = 0; n < this.buttonTabs.length; n++)
                            if (t.target === this.buttonTabs[n].node) {
                                this.selectTab(n);
                                break
                            }
                },
                onKeyMenu: function (t) {
                    if (!t) return this.tvTabIndex++, this.tvTabIndex >= this.buttonTabs.length && (this.tvTabIndex = 0), this.selectTab(this.tvTabIndex), !0
                }
            })
        