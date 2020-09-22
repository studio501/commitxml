
            
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
                            0 === t ? this.cancel() : 1 === t ? ftc.showTip("次数不足") : 2 === t ? ftc.showTip("不能进入") : 3 === t && ftc.showTip("数量不足")
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
                    } else ftc.showTip("通过上一难度后解锁")
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonDetail.node) "tr" === ftc.ManagerLan.getLanguage() ? ftc.showDetailInfo(this.buttonDetail.node, "副本幫助：\n1.副本中屏幕左上角可查看當前所在關卡數。(例如：危險洞穴2-1)\n2.副本中存在大量的隨機戰鬥，敵人的陣型和類型都是隨機的。\n3.副本中的道具只能在本副本內使用。\n4.神樹房可以恢復兵力、策略值(難度越高，恢復越少)。\n5.祝福&詛咒：副本內能獲得壹些特殊增益或減益，可點擊屏幕上的“印記”按鈕來查看。\n6.關於不同難度：\n   ①簡單：初始1隨機祝福\n   ②普通：無任何效果\n   ③困難：初始1隨機詛咒；\n   ④地獄：初始2隨機詛咒；敵方全體免疫百分比傷害\n   ⑤深淵：初始3隨機詛咒；敵方全體免疫百分比傷害\n") : ftc.showDetailInfo(this.buttonDetail.node, "副本帮助：\n1.副本中屏幕左上角可查看当前所在关卡数。(例如：危险洞穴2-1)\n2.副本中存在大量的随机战斗，敌人的阵型和类型都是随机的。\n3.副本中的道具只能在本副本内使用。\n4.神树房可以恢复兵力、策略值(难度越高，恢复越少)。\n5.祝福&诅咒：副本内能获得一些特殊增益或减益，可点击屏幕上的“印记”按钮来查看。\n6.关于不同难度：\n   ①简单：初始1随机祝福\n   ②普通：无任何效果\n   ③困难：初始1随机诅咒；\n   ④地狱：初始2随机诅咒；敌方全体免疫百分比伤害\n   ⑤深渊：初始3随机诅咒；敌方全体免疫百分比伤害\n");
                    else if (t.target === this.buttonRefresh.node) ft.ExtItem.getNum(ft.value.item.yeYingZhang1) + ft.ExtItem.getNum(ft.value.item.yeYingZhang2) ? ftc.loadLayout("LayoutDialogTip2", function (t) {
                        t.setData(2)
                    }) : ftc.showTip("野营帐数量不足");
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
                            a ? ftc.showTip("有未上阵武将") : n ? ftc.showTip("全队兵力未满") : ftc.send("copyEnter", {
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
        