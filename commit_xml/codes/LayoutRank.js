
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    spriteList: cc.Sprite,
                    buttonTabs: [cc.Button],
                    buttonClose: cc.Button
                },
                init: function () {
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t], !0);
                    this.addClick(this.buttonClose), this.spriteList.getComponent(cc.WXSubContextView).enabled = !1
                },
                load: function () {
                    this.selectTab(0), this.node.runAction(cc.sequence(cc.delayTime(.1), cc.callFunc(function () {
                        this.spriteList.getComponent(cc.WXSubContextView).enabled = !0, ftc.ManagerH5.getFriendRank()
                    }.bind(this))))
                },
                setData: function (t) { },
                selectTab: function (t) {
                    if (1 !== t)
                        for (var e = [ftc.type.tab.rank_friend, ftc.type.tab.rank_world], i = 0; i < this.buttonTabs.length; i++) this.buttonTabs[i].interactable = t !== i, this.buttonTabs[i].node.getChildByName("spriteTabIcon").getComponent(cc.Sprite).spriteFrame = ftc.getTabSpriteFrame(e[i], t === i), this.buttonTabs[i].node.getChildByName("labelTab").color = t !== i ? ftc.newColor(ftc.value.color.tabNormal) : ftc.newColor(ftc.value.color.tabPressed), this.buttonTabs[i].node.getChildByName("labelTab").getComponent(cc.LabelOutline).color = t !== i ? ftc.newColor(ftc.value.color.tabNormalOutline) : ftc.newColor(ftc.value.color.tabPressedOutline);
                    else ftc.showTip("暂未开放")
                },
                enter: function () { },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonClose.node) this.cancel();
                    else
                        for (var i = 0; i < this.buttonTabs.length; i++)
                            if (t.target === this.buttonTabs[i].node) {
                                this.selectTab(i);
                                break
                            }
                }
            })
        