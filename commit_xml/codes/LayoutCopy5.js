
            
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
                    if (this.labelTimes.string = ftc.language("\u672c\u5468\u5269\u4f59\u6b21\u6570:") + e + ftc.language("\u6b21"), ftc.localDay > 0) {
                        this.labelRefreshTime.node.active = !0;
                        var i = ftc.getLocalTime(),
                            a = 6 - (Math.floor(i / 86400) + 3) % 7,
                            n = 23 - (Math.floor(i / 3600) + 8) % 24;
                        this.labelRefreshTime.string = ftc.language("\u8ddd\u79bb\u5237\u65b0\u5269\u4f59:") + a + ftc.language("\u5929") + n + ftc.language("\u5c0f\u65f6")
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
                            0 === t || (1 === t ? ftc.showTip("\u6b21\u6570\u4e0d\u8db3") : 2 === t ? ftc.showTip("\u4e0d\u80fd\u8fdb\u5165") : 3 === t && ftc.showTip("\u6570\u91cf\u4e0d\u8db3"))
                        },
                        copyFantasylandBoxExchange: function (t, e) {
                            0 === t ? ftc.showTip("\u5151\u6362\u6210\u529f") : ftc.showTip("\u5151\u6362\u5931\u8d25")
                        }
                    }
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonBox.node) ft.ExtItem.getNum(ft.value.item.fantasylandScore) < ft.value.com.fantasylandBoxScore ? ftc.showTip(ft.ExtItem.getName(ft.value.item.fantasylandScore) + "\xd7" + ft.value.com.fantasylandBoxScore + ftc.language("\u5151\u6362") + ft.ExtItem.getName(ft.value.item.fantasylandBox) + "\xd71") : ftc.send("copyFantasylandBoxExchange");
                    else if (t.target === this.buttonTeam.node) ftc.loadLayout("LayoutTeam", void 0, {
                        hide: !0
                    });
                    else if (t.target === this.buttonEnter.node) {
                        if (0 === ft.ExtCopy.getRemainingCount(ft.value.copy.FLHJ)) ftc.showTip("\u6b21\u6570\u4e0d\u8db3");
                        else {
                            for (var i = !1, a = ftc.ManagerData.get1("ManagerHero").teamIds.split(","), n = 0; n < a.length; n++)
                                if (0 == a[n]) {
                                    i = !0;
                                    break
                                } i ? ftc.showDialog({
                                    text: "\u6709\u672a\u4e0a\u9635\u6b66\u5c06\uff0c\u8fdb\u5165\u540e\u5c06\u65e0\u6cd5\u4e0a\u9635\u65b0\u6b66\u5c06\uff0c\u662f\u5426\u7ee7\u7eed\u8fdb\u5165?",
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
        