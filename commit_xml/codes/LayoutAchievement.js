
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    nodePanel: cc.Node,
                    buttonTabs: [cc.Button],
                    spriteRedPoints: [cc.Sprite]
                },
                init: function () {
                    this.prepareParts(["PartActive", "PartAchievement"]);
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t], !0)
                },
                load: function () {
                    this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("\u6d3b\u8dc3"), this.node.addChild(this.partTopStatus.node), this.partActives = [], this.selectTab(0), this.updateData()
                },
                setData: function (t) { },
                updateTvTip: function () {
                    var t = "\u3010\u8fd4\u56de\u952e\u3011\u5173\u95ed\u754c\u9762\uff0c\u3010\u83dc\u5355\u952e\u3011\u5207\u6362\u6807\u7b7e";
                    1 == this.tabIndex && this.partActives[1].getTvIsCanGet() && (t += "\uff0c\u3010\u786e\u5b9a\u952e\u3011\u9886\u53d6\u5956\u52b1"), ftc.setTvTip(this.node, t)
                },
                selectTab: function (t) {
                    var e;
                    (this.tabIndex = t, this.partActives[this.tabIndex]) || (0 === this.tabIndex ? (e = this.newPart("PartActive")).setData(this.tabIndex + 1) : e = this.newPart("PartAchievement"), this.nodePanel.addChild(e.node), this.partActives[this.tabIndex] = e);
                    for (var i = [ftc.type.tab.active_day, ftc.type.tab.achievement], a = 0; a < this.buttonTabs.length; a++) this.buttonTabs[a].interactable = t !== a, this.buttonTabs[a].node.getChildByName("spriteTabIcon").getComponent(cc.Sprite).spriteFrame = ftc.getTabSpriteFrame(i[a], t === a), this.buttonTabs[a].node.getChildByName("labelTab").color = t !== a ? ftc.newColor(ftc.value.color.tabNormal) : ftc.newColor(ftc.value.color.tabPressed), this.buttonTabs[a].node.getChildByName("labelTab").getComponent(cc.LabelOutline).color = t !== a ? ftc.newColor(ftc.value.color.tabNormalOutline) : ftc.newColor(ftc.value.color.tabPressedOutline), this.partActives[a] && (this.partActives[a].node.active = this.tabIndex === a);
                    if (ftc.isTv())
                        if (1 == this.tabIndex) {
                            var n = this.partActives[this.tabIndex].listView.getItem(0);
                            n && ftc.ManagerTV.nextSelect(n.button1)
                        } else ftc.ManagerTV.nextSelect();
                    this.updateTvTip()
                },
                enter: function () { },
                updateData: function () {
                    this.partTopStatus.updateData(), this.spriteRedPoints[0].node.active = ft.ExtAchievement.hasAchievementComplete(ft.type.achievement.day), this.spriteRedPoints[1].node.active = ft.ExtAchievement.hasAchievementComplete(ft.type.achievement.achieve)
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectAchievement: function (t, e) {
                            this.partActives[this.tabIndex].selectTab(t.index), this.updateTvTip()
                        },
                        achievementGet: function (t, e) {
                            0 === t.ret ? this.partActives[this.tabIndex].updateData(t) : ftc.showTip("\u9886\u53d6\u5931\u8d25"), this.updateTvTip()
                        }
                    }
                },
                onClick: function (t, e) {
                    for (var i = 0; i < this.buttonTabs.length; i++)
                        if (t.target === this.buttonTabs[i].node) {
                            this.selectTab(i);
                            break
                        }
                },
                onKeyMenu: function (t) {
                    if (!t) {
                        var e = this.tabIndex + 1;
                        return e >= this.buttonTabs.length && (e = 0), this.selectTab(e), !0
                    }
                },
                onAfterKeyDirection: function (t, e) {
                    t || 1 == this.tabIndex && this.updateTvTip()
                },
                onKeyOk: function (t) {
                    if (!t && 1 == this.tabIndex && this.partActives[1].getTvIsCanGet()) return this.partActives[1].onClick({
                        target: this.partActives[1].buttonGet.node
                    }), !0
                }
            })
        