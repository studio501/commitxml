
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    labelName: cc.Label,
                    labelIndex: cc.Label,
                    layoutHeroes: cc.Node,
                    buttonLeft: cc.Button,
                    buttonRight: cc.Button,
                    nodeSkillItems: [cc.Node],
                    buttonRefresh: cc.Button,
                    scrollView: cc.ScrollView,
                    layoutRewards: cc.Node,
                    progressBar: cc.ProgressBar,
                    labelProgress: cc.Label,
                    buttonReward: cc.Button,
                    buttonTeam: cc.Button,
                    buttonChallenge: cc.Button,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonChallenge), this.addClick(this.buttonTeam), this.addClick(this.buttonLeft, !0), this.addClick(this.buttonRight, !0), this.addClick(this.buttonRefresh), this.addClick(this.buttonReward), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    ftc.setTvTip(this.node, "【返回键】关闭界面，【菜单键】切换显示队伍")
                },
                setData: function (t, e) {
                    this.callback = e, this.npcId = parseInt(t.id), this.battleIds = t.battleIds, this.setSkill(), this.selectBattle(0), ftc.ManagerRes.restoreNodeChildren(this.layoutRewards);
                    var i = ft.ExtBattle.getAwardPreview(this.battleIds[this.battleIds.length - 1]);
                    if (i) {
                        var a = i.ids.length;
                        a < 5 ? (this.scrollView.node.width = 118 * a - 20, this.scrollView.node.x = -this.scrollView.node.width / 2) : (this.scrollView.node.width = 430, this.scrollView.node.x = -215);
                        for (var n = 0; n < a; n++) {
                            var s = this.newPart("PartItem");
                            s.setData(i.ids[n], i.nums[n], !0), s.node.y = 10, this.layoutRewards.addChild(s.node, n)
                        }
                    }
                    this.updateData()
                },
                setSkill: function () {
                    for (var t = this.nodeSkillItems.length - 1; t >= 0; t--) this.nodeSkillItems[t].removeAllChildren();
                    var e = ft.ExtCopy.getCopySkillIds(this.npcId);
                    for (t = 0; t < e.length; t++) {
                        var i = this.newPart("PartItem");
                        i.setSkillData(parseInt(e[t]), !0), this.nodeSkillItems[t].addChild(i.node)
                    }
                },
                selectBattle: function (t) {
                    this.battleIndex = t, this.labelIndex.string = ftc.language("第") + (this.battleIndex + 1) + "/" + this.battleIds.length + ftc.language("场"), ftc.ManagerRes.restoreNodeChildren(this.layoutHeroes), this.labelName.string = ft.ExtBattle.getName(this.battleIds[this.battleIndex]);
                    for (var e = ft.ExtBattle.getHeroIds(this.battleIds[this.battleIndex]), i = 0; i < e.length; i++)
                        if (0 != e[i]) {
                            var a = this.newPart("PartItem");
                            a.setHeroData({
                                id: e[i]
                            }), a.setInteractable(!1), this.layoutHeroes.addChild(a.node, i)
                        } this.buttonLeft.node.active = t > 0, this.buttonRight.node.active = t < this.battleIds.length - 1
                },
                enter: function () { },
                updateData: function () {
                    this.progressBar.progress = ft.ExtItem.getNum(ft.value.item.fantasylandScore) / ft.value.com.fantasylandBoxScore, this.labelProgress.string = ft.ExtItem.getName(ft.value.item.fantasylandScore) + " " + ft.ExtItem.getNum(ft.value.item.fantasylandScore) + "/" + ft.value.com.fantasylandBoxScore
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        copyFantasylandBoxExchange: function (t, e) {
                            0 === t ? (ftc.showTip("兑换成功"), this.updateData()) : ftc.showTip("兑换失败")
                        },
                        copyRefreshSkill: function (t, e) {
                            0 === t ? (ftc.showTip("刷新成功"), this.setSkill()) : ftc.showTip("刷新失败")
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.buttonLeft.node ? this.selectBattle(this.battleIndex - 1) : t.target === this.buttonRight.node ? this.selectBattle(this.battleIndex + 1) : t.target === this.buttonRefresh.node ? ft.ExtItem.getNum(ft.value.item.fantasylandSandglass) < 1 ? ftc.showTip(ft.ExtItem.getName(ft.value.item.fantasylandSandglass) + ftc.language("不足") + ")") : ftc.showDialog({
                        text: ftc.language("每次刷新需要消耗") + ft.ExtItem.getName(ft.value.item.fantasylandSandglass) + "1" + ftc.language("个"),
                        click1: function () {
                            ftc.send("copyRefreshSkill", this.npcId)
                        }.bind(this),
                        click2: function () { }
                    }) : t.target === this.buttonReward.node ? ft.ExtItem.getNum(ft.value.item.fantasylandScore) < ft.value.com.fantasylandBoxScore ? ftc.showTip(ft.ExtItem.getName(ft.value.item.fantasylandScore) + "\xd7" + ft.value.com.fantasylandBoxScore + ftc.language("兑换") + ft.ExtItem.getName(ft.value.item.fantasylandBox) + "\xd71") : ftc.send("copyFantasylandBoxExchange") : t.target === this.buttonTeam.node ? ftc.loadLayout("LayoutTeam", void 0, {
                        hide: !0
                    }) : t.target === this.buttonChallenge.node ? (this.callback && this.callback(!0), this.cancel()) : t.target === this.buttonClose.node && (this.callback && this.callback(!1), this.cancel())
                },
                onKeyMenu: function (t) {
                    if (!t) return this.buttonRight.node.active ? this.selectBattle(this.battleIndex + 1) : this.buttonLeft.node.active && this.selectBattle(0), !0
                }
            })
        