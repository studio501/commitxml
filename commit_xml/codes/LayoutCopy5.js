
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    labelTimes: cc.Label,
                    labelRefreshTime: cc.Label,
                    labelInfo: cc.RichText,
                    buttonBox: cc.Button,
                    labelScore: cc.Label,
                    buttonTeam: cc.Button,
                    buttonEnter: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonEnter), this.addClick(this.buttonTeam), this.addClick(this.buttonBox)
                },
                load: function () {
                    this.id = ft.value.copy.FLHJ, this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle(ft.ExtCopy.getName(this.id)), this.node.addChild(this.partTopStatus.node), ftc.setTvTip(this.node)
                },
                setData: function (t) {
                    this.labelInfo.string = ft.replaceAll(ft.ExtCopy.getInfo(this.id), "|", "\n");
                    var e = ft.ExtCopy.getRemainingCount(this.id);
                    if (this.labelTimes.string = ftc.language("本周剩余次数:") + e + ftc.language("次"), ftc.localDay > 0) {
                        this.labelRefreshTime.node.active = !0;
                        var i = ftc.getLocalTime(),
                            a = 6 - (Math.floor(i / 86400) + 3) % 7,
                            n = 23 - (Math.floor(i / 3600) + 8) % 24;
                        this.labelRefreshTime.string = ftc.language("距离刷新剩余:") + a + ftc.language("天") + n + ftc.language("小时")
                    } else this.labelRefreshTime.node.active = !1;
                    this.updateData()
                },
                enter: function () { },
                updateData: function () {
                    this.partTopStatus.updateData();
                    var t = ft.ExtItem.getNum(ft.value.item.fantasylandScore);
                    this.labelScore.string = t + "/" + ft.value.com.fantasylandBoxScore, this.buttonEnter.interactable = ft.ExtCopy.getRemainingCount(ft.value.copy.FLHJ) > 0
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        copyEnter: function (t, e) {
                            0 === t || (1 === t ? ftc.showTip("次数不足") : 2 === t ? ftc.showTip("不能进入") : 3 === t && ftc.showTip("数量不足"))
                        },
                        copyFantasylandBoxExchange: function (t, e) {
                            0 === t ? ftc.showTip("兑换成功") : ftc.showTip("兑换失败")
                        }
                    }
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonBox.node) ft.ExtItem.getNum(ft.value.item.fantasylandScore) < ft.value.com.fantasylandBoxScore ? ftc.showTip(ft.ExtItem.getName(ft.value.item.fantasylandScore) + "\xd7" + ft.value.com.fantasylandBoxScore + ftc.language("兑换") + ft.ExtItem.getName(ft.value.item.fantasylandBox) + "\xd71") : ftc.send("copyFantasylandBoxExchange");
                    else if (t.target === this.buttonTeam.node) ftc.loadLayout("LayoutTeam", void 0, {
                        hide: !0
                    });
                    else if (t.target === this.buttonEnter.node) {
                        if (0 === ft.ExtCopy.getRemainingCount(ft.value.copy.FLHJ)) ftc.showTip("次数不足");
                        else {
                            for (var i = !1, a = ftc.ManagerData.get1("ManagerHero").teamIds.split(","), n = 0; n < a.length; n++)
                                if (0 == a[n]) {
                                    i = !0;
                                    break
                                } i ? ftc.showDialog({
                                    text: "有未上阵武将，进入后将无法上阵新武将，是否继续进入?",
                                    click1: function () {
                                        ftc.send("copyEnter", {
                                            id: ft.value.copy.FLHJ
                                        }), ftc.sendClient("c_copyEnter", void 0, "LayoutCopy"), this.cancel()
                                    }.bind(this),
                                    click2: function () { }
                                }) : (ftc.send("copyEnter", {
                                    id: ft.value.copy.FLHJ
                                }), ftc.sendClient("c_copyEnter", void 0, "LayoutCopy"), this.cancel())
                        }
                    }
                }
            })
        