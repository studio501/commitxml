
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    listView: ftc.ListView,
                    buttonUp: cc.Button,
                    buttonUpOneKey: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonUp), this.addClick(this.buttonUpOneKey)
                },
                load: function () {
                    this.selectedItem = void 0
                },
                setData: function (t) {
                    this.data = t;
                    var e = [],
                        i = ft.ExtEquip.getConsumeLevel(this.data.id, this.data.goldLv);
                    e.push({
                        id: i.ids[0],
                        num: i.nums[0],
                        desc: ftc.language("\u4e0b\u4e00\u7ea7\u9700\u8981") + ft.ExtItem.getName(i.ids[0]) + i.nums[0]
                    }), i = ft.ExtEquip.getConsumeLevel(this.data.id), e.push({
                        id: i.ids[0],
                        num: 1,
                        desc: ftc.language("\u6bcf\u6b21\u5347\u7ea7\u6d88\u80171\u4e2a")
                    }), this.selectedItem ? this.listView.updateListViewItems(this.selectedItem.index, e) : (this.listView.setListView(e, 0), this.selectedItem = this.listView.getItem(0))
                },
                onSelectEquipLvUpItem: function (t) {
                    this.listView.updateListViewItems(t.index), this.selectedItem = t
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    if (0 === this.selectedItem.index)
                        if (this.data.lv >= ftc.ManagerData.get1("Player").level) ftc.showTip("\u4e0d\u53ef\u8d85\u8fc7\u73a9\u5bb6\u7b49\u7ea7");
                        else if (this.data.lv >= ft.value.com.maxEquipLevel) ftc.showTip("\u5df2\u8fbe\u5230\u88c5\u5907\u7b49\u7ea7\u4e0a\u9650");
                        else if (ft.ExtItem.getNum(this.selectedItem.data.id) < this.selectedItem.data.num) ftc.showTip("\u94f6\u5e01\u4e0d\u8db3");
                        else if (t.target === this.buttonUp.node) ftc.send("equipLevelUp", {
                            eids: this.data.entityId,
                            ups: 1,
                            gold: !0
                        }), this.selectedItem.playAni();
                        else {
                            var i = Math.min(ft.value.com.maxEquipLevel, ftc.ManagerData.get1("Player").level) - this.data.lv,
                                a = ft.ExtEquip.calcNeedGold(this.data.id, i, this.data.goldLv);
                            ftc.showDialog({
                                text: ftc.language("\u786e\u5b9a\u4e00\u952e\u5f3a\u5316\u88c5\u5907, \u6d88\u8017") + a + ft.ExtItem.getName(this.selectedItem.data.id),
                                click1: function () {
                                    ftc.send("equipLevelUp", {
                                        eids: this.data.entityId,
                                        ups: i,
                                        gold: !0
                                    }), this.selectedItem.playAni()
                                }.bind(this),
                                click2: function () { }
                            })
                        } else if (this.data.lv >= ftc.ManagerData.get1("Player").level) ftc.showTip("\u4e0d\u53ef\u8d85\u8fc7\u73a9\u5bb6\u7b49\u7ea7");
                    else if (this.data.lv >= ft.value.com.maxEquipLevel) ftc.showTip("\u5df2\u8fbe\u5230\u88c5\u5907\u7b49\u7ea7\u4e0a\u9650");
                    else if (ft.ExtItem.getNum(this.selectedItem.data.id) < this.selectedItem.data.num) ftc.showTip("\u5f3a\u5316\u5238\u4e0d\u8db3");
                    else if (t.target === this.buttonUp.node) ftc.send("equipLevelUp", {
                        eids: this.data.entityId,
                        ups: 1
                    }), this.selectedItem.playAni();
                    else {
                        var n = Math.min(ft.ExtItem.getNum(this.selectedItem.data.id), Math.min(ft.value.com.maxEquipLevel, ftc.ManagerData.get1("Player").level) - this.data.lv);
                        ftc.showDialog({
                            text: ftc.language("\u786e\u5b9a\u4e00\u952e\u5f3a\u5316\u88c5\u5907, \u6d88\u8017") + n + ft.ExtItem.getName(this.selectedItem.data.id),
                            click1: function () {
                                ftc.send("equipLevelUp", {
                                    eids: this.data.entityId,
                                    ups: n
                                }), this.selectedItem.playAni()
                            }.bind(this),
                            click2: function () { }
                        })
                    }
                }
            })
        