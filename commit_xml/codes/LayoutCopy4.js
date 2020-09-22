
            
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
                    this.id = ft.value.copy.ZY, this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle(ft.ExtCopy.getName(this.id)), this.node.addChild(this.partTopStatus.node), ftc.setTvTip(this.node, "【返回键】关闭界面，【菜单键】切换难度")
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
                            0 === t || (1 === t ? ftc.showTip("次数不足") : 2 === t ? ftc.showTip("不能进入") : 3 === t && ftc.showTip("数量不足"))
                        },
                        copyMopUp: function (t, e) {
                            0 === t ? (ftc.showTip("扫荡成功"), this.updateData()) : 1 === t ? ftc.showTip("次数不足") : 2 === t ? ftc.showTip("不能进入") : 3 === t && ftc.showTip("战役挑战券不足")
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
                                            text: "终极难度中将无法更换非魏国武将，还望主公多多注意!",
                                            click1: function () {
                                                ftc.send("copyEnter", {
                                                    id: ft.value.copy.ZY,
                                                    param: this.tabIndex
                                                }), this.cancel(), ftc.sendClient("c_copyEnter", void 0, "LayoutCopy")
                                            }.bind(this),
                                            click2: function () { }
                                        }) : ftc.showTip("该难度只能使用魏国武将，请调整阵容")
                                    } else ftc.send("copyEnter", {
                                        id: ft.value.copy.ZY,
                                        param: this.tabIndex
                                    }), this.cancel(), ftc.sendClient("c_copyEnter", void 0, "LayoutCopy");
                                else ftc.showTip("战役挑战券不足");
                            else ftc.ManagerData.get1("Player").level < this.levels[this.tabIndex] ? ftc.showTip(this.levels[this.tabIndex] + "级开放") : ftc.showTip("请先通过前置战役");
                        else ft.ExtCopy.checkConsume(ft.value.copy.ZY) ? ft.ExtItem.getNum(ft.value.item.mopUpTicket) < ft.value.com.mopUpTicketNumWeekly ? ftc.showTip("扫荡券不足") : ft.ExtCopy.isFinishChallenge(ft.value.copy.ZY, this.tabIndex) ? ftc.showDialog({
                            text: "确定消耗5张扫荡券和1张战役挑战券?",
                            click1: function () {
                                ftc.send("copyMopUp", {
                                    id: ft.value.copy.ZY,
                                    param: this.tabIndex
                                })
                            }.bind(this),
                            click2: function () { }
                        }) : ftc.showTip("请先完成挑战") : ftc.showTip("战役挑战券不足")
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
        