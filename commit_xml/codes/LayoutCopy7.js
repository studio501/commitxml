
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonTabs: [cc.Button],
                    spriteSelects: [cc.Sprite],
                    buttonDetail: cc.Button,
                    labelDesc: cc.Label,
                    nodeLayoutEnemy: cc.Node,
                    nodeLayoutAward: cc.Node,
                    buttonRefresh: cc.Button,
                    buttonTeam: cc.Button,
                    buttonEnter: cc.Button,
                    labelTicket: cc.Label,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonEnter), this.addClick(this.buttonTeam), this.addClick(this.buttonDetail), this.addClick(this.buttonRefresh), this.addClick(this.buttonClose, {
                        zone: 99
                    });
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t]);
                    ftc.ManagerTV.setBackButton(this.buttonClose, this.node)
                },
                load: function () {
                    ftc.setTvTip(this.node)
                },
                setData: function (t) {
                    this.id = ft.value.copy.XSWJ, this.opens = [!0, !1, !1, !1, !1];
                    for (var e = 0, i = 1; i < this.opens.length; i++) this.opens[i] = ft.ExtItem.getNum(ft.value.item.xswjCounts[i - 1]) > 0, this.opens[i] && e++;
                    var a = [1362281, 412567, 6628550, 13590528, 8458563];
                    for (i = 1; i < this.opens.length; i++) this.buttonTabs[i].getComponent(cc.Sprite).spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "copy13_" + i + (this.opens[i] ? "" : "_1")), this.buttonTabs[i].node.getChildByName("spriteLock").active = !this.opens[i], this.buttonTabs[i].node.getChildByName("Text").getComponent(cc.LabelOutline).color = this.opens[i] ? ftc.newColor(a[i]) : ftc.newColor(8547429);
                    this.selectTab(e)
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        copyEnter: function (t, e) {
                            0 === t ? this.cancel() : 1 === t ? ftc.showTip("\u6b21\u6570\u4e0d\u8db3") : 2 === t ? ftc.showTip("\u4e0d\u80fd\u8fdb\u5165") : 3 === t && ftc.showTip("\u6570\u91cf\u4e0d\u8db3")
                        }
                    }
                },
                selectTab: function (t) {
                    if (this.opens[t]) {
                        this.tabIndex = t;
                        for (var e = 0; e < this.buttonTabs.length; e++) this.buttonTabs[e].interactable = e !== t, this.spriteSelects[e].node.active = e === t;
                        var i = ft.ExtCopy.getInfo(this.id).split("|")[t].split(",");
                        ftc.ManagerRes.restoreNodeChildren(this.nodeLayoutEnemy);
                        var a = function (t) {
                            var e = this.newPart("PartItem");
                            e.node.scale = .8, e.setHeroData({
                                id: i[t]
                            }), e.setCallback(function () {
                                ftc.showItemInfo(e.node, {
                                    name: ft.ExtHero.getName(i[t]),
                                    info: ft.ExtHero.getInfo(i[t])
                                })
                            }.bind(this)), this.nodeLayoutEnemy.addChild(e.node)
                        }.bind(this);
                        for (e = 0; e < i.length; e++) a(e);
                        ftc.ManagerRes.restoreNodeChildren(this.nodeLayoutAward);
                        var n = ft.ExtCopy.getAwards(this.id, t);
                        if (n && n.ids.length > 0)
                            for (e = 0; e < n.ids.length; e++) {
                                var s = this.newPart("PartItem");
                                s.node.y = 10, s.node.scale = .8, s.setData(n.ids[e], 0, !0), this.nodeLayoutAward.addChild(s.node)
                            }
                    } else ftc.showTip("\u901a\u8fc7\u4e0a\u4e00\u96be\u5ea6\u540e\u89e3\u9501")
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonDetail.node) "tr" === ftc.ManagerLan.getLanguage() ? ftc.showDetailInfo(this.buttonDetail.node, "\u526f\u672c\u5e6b\u52a9\uff1a\n1.\u526f\u672c\u4e2d\u5c4f\u5e55\u5de6\u4e0a\u89d2\u53ef\u67e5\u770b\u7576\u524d\u6240\u5728\u95dc\u5361\u6578\u3002(\u4f8b\u5982\uff1a\u5371\u96aa\u6d1e\u7a742-1)\n2.\u526f\u672c\u4e2d\u5b58\u5728\u5927\u91cf\u7684\u96a8\u6a5f\u6230\u9b25\uff0c\u6575\u4eba\u7684\u9663\u578b\u548c\u985e\u578b\u90fd\u662f\u96a8\u6a5f\u7684\u3002\n3.\u526f\u672c\u4e2d\u7684\u9053\u5177\u53ea\u80fd\u5728\u672c\u526f\u672c\u5167\u4f7f\u7528\u3002\n4.\u795e\u6a39\u623f\u53ef\u4ee5\u6062\u5fa9\u5175\u529b\u3001\u7b56\u7565\u503c(\u96e3\u5ea6\u8d8a\u9ad8\uff0c\u6062\u5fa9\u8d8a\u5c11)\u3002\n5.\u795d\u798f&\u8a5b\u5492\uff1a\u526f\u672c\u5167\u80fd\u7372\u5f97\u58f9\u4e9b\u7279\u6b8a\u589e\u76ca\u6216\u6e1b\u76ca\uff0c\u53ef\u9ede\u64ca\u5c4f\u5e55\u4e0a\u7684\u201c\u5370\u8a18\u201d\u6309\u9215\u4f86\u67e5\u770b\u3002\n6.\u95dc\u65bc\u4e0d\u540c\u96e3\u5ea6\uff1a\n   \u2460\u7c21\u55ae\uff1a\u521d\u59cb1\u96a8\u6a5f\u795d\u798f\n   \u2461\u666e\u901a\uff1a\u7121\u4efb\u4f55\u6548\u679c\n   \u2462\u56f0\u96e3\uff1a\u521d\u59cb1\u96a8\u6a5f\u8a5b\u5492\uff1b\n   \u2463\u5730\u7344\uff1a\u521d\u59cb2\u96a8\u6a5f\u8a5b\u5492\uff1b\u6575\u65b9\u5168\u9ad4\u514d\u75ab\u767e\u5206\u6bd4\u50b7\u5bb3\n   \u2464\u6df1\u6df5\uff1a\u521d\u59cb3\u96a8\u6a5f\u8a5b\u5492\uff1b\u6575\u65b9\u5168\u9ad4\u514d\u75ab\u767e\u5206\u6bd4\u50b7\u5bb3\n") : ftc.showDetailInfo(this.buttonDetail.node, "\u526f\u672c\u5e2e\u52a9\uff1a\n1.\u526f\u672c\u4e2d\u5c4f\u5e55\u5de6\u4e0a\u89d2\u53ef\u67e5\u770b\u5f53\u524d\u6240\u5728\u5173\u5361\u6570\u3002(\u4f8b\u5982\uff1a\u5371\u9669\u6d1e\u7a742-1)\n2.\u526f\u672c\u4e2d\u5b58\u5728\u5927\u91cf\u7684\u968f\u673a\u6218\u6597\uff0c\u654c\u4eba\u7684\u9635\u578b\u548c\u7c7b\u578b\u90fd\u662f\u968f\u673a\u7684\u3002\n3.\u526f\u672c\u4e2d\u7684\u9053\u5177\u53ea\u80fd\u5728\u672c\u526f\u672c\u5185\u4f7f\u7528\u3002\n4.\u795e\u6811\u623f\u53ef\u4ee5\u6062\u590d\u5175\u529b\u3001\u7b56\u7565\u503c(\u96be\u5ea6\u8d8a\u9ad8\uff0c\u6062\u590d\u8d8a\u5c11)\u3002\n5.\u795d\u798f&\u8bc5\u5492\uff1a\u526f\u672c\u5185\u80fd\u83b7\u5f97\u4e00\u4e9b\u7279\u6b8a\u589e\u76ca\u6216\u51cf\u76ca\uff0c\u53ef\u70b9\u51fb\u5c4f\u5e55\u4e0a\u7684\u201c\u5370\u8bb0\u201d\u6309\u94ae\u6765\u67e5\u770b\u3002\n6.\u5173\u4e8e\u4e0d\u540c\u96be\u5ea6\uff1a\n   \u2460\u7b80\u5355\uff1a\u521d\u59cb1\u968f\u673a\u795d\u798f\n   \u2461\u666e\u901a\uff1a\u65e0\u4efb\u4f55\u6548\u679c\n   \u2462\u56f0\u96be\uff1a\u521d\u59cb1\u968f\u673a\u8bc5\u5492\uff1b\n   \u2463\u5730\u72f1\uff1a\u521d\u59cb2\u968f\u673a\u8bc5\u5492\uff1b\u654c\u65b9\u5168\u4f53\u514d\u75ab\u767e\u5206\u6bd4\u4f24\u5bb3\n   \u2464\u6df1\u6e0a\uff1a\u521d\u59cb3\u968f\u673a\u8bc5\u5492\uff1b\u654c\u65b9\u5168\u4f53\u514d\u75ab\u767e\u5206\u6bd4\u4f24\u5bb3\n");
                    else if (t.target === this.buttonRefresh.node) ft.ExtItem.getNum(ft.value.item.yeYingZhang1) + ft.ExtItem.getNum(ft.value.item.yeYingZhang2) ? ftc.loadLayout("LayoutDialogTip2", function (t) {
                        t.setData(2)
                    }) : ftc.showTip("\u91ce\u8425\u5e10\u6570\u91cf\u4e0d\u8db3");
                    else if (t.target === this.buttonTeam.node) ftc.loadLayout("LayoutTeam");
                    else if (t.target === this.buttonEnter.node)
                        if (ft.ExtCopy.checkConsume(ft.value.copy.XSWJ)) {
                            for (var i = ft.ExtHero.getTeam(ftc.ManagerData.get2Object("Hero"), ftc.ManagerData.get1("ManagerHero").teamIds, 0), a = !1, n = !1, s = 0; s < i.length; s++) {
                                if (!i[s]) {
                                    a = !0;
                                    break
                                }
                                if (i[s].hp < 1) {
                                    n = !0;
                                    break
                                }
                            }
                            a ? ftc.showTip("\u6709\u672a\u4e0a\u9635\u6b66\u5c06") : n ? ftc.showTip("\u5168\u961f\u5175\u529b\u672a\u6ee1") : ftc.send("copyEnter", {
                                id: ft.value.copy.XSWJ,
                                param: this.tabIndex + 1
                            })
                        } else;
                    else if (t.target === this.buttonClose.node) this.cancel();
                    else
                        for (s = 0; s < this.buttonTabs.length; s++)
                            if (t.target === this.buttonTabs[s].node) {
                                this.selectTab(s);
                                break
                            }
                }
            })
        