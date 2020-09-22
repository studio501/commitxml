
            
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
                        desc: ftc.language("下一级需要") + ft.ExtItem.getName(i.ids[0]) + i.nums[0]
                    }), i = ft.ExtEquip.getConsumeLevel(this.data.id), e.push({
                        id: i.ids[0],
                        num: 1,
                        desc: ftc.language("每次升级消耗1个")
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
                        if (this.data.lv >= ftc.ManagerData.get1("Player").level) ftc.showTip("不可超过玩家等级");
                        else if (this.data.lv >= ft.value.com.maxEquipLevel) ftc.showTip("已达到装备等级上限");
                        else if (ft.ExtItem.getNum(this.selectedItem.data.id) < this.selectedItem.data.num) ftc.showTip("银币不足");
                        else if (t.target === this.buttonUp.node) ftc.send("equipLevelUp", {
                            eids: this.data.entityId,
                            ups: 1,
                            gold: !0
                        }), this.selectedItem.playAni();
                        else {
                            var i = Math.min(ft.value.com.maxEquipLevel, ftc.ManagerData.get1("Player").level) - this.data.lv,
                                a = ft.ExtEquip.calcNeedGold(this.data.id, i, this.data.goldLv);
                            ftc.showDialog({
                                text: ftc.language("确定一键强化装备, 消耗") + a + ft.ExtItem.getName(this.selectedItem.data.id),
                                click1: function () {
                                    ftc.send("equipLevelUp", {
                                        eids: this.data.entityId,
                                        ups: i,
                                        gold: !0
                                    }), this.selectedItem.playAni()
                                }.bind(this),
                                click2: function () { }
                            })
                        } else if (this.data.lv >= ftc.ManagerData.get1("Player").level) ftc.showTip("不可超过玩家等级");
                    else if (this.data.lv >= ft.value.com.maxEquipLevel) ftc.showTip("已达到装备等级上限");
                    else if (ft.ExtItem.getNum(this.selectedItem.data.id) < this.selectedItem.data.num) ftc.showTip("强化券不足");
                    else if (t.target === this.buttonUp.node) ftc.send("equipLevelUp", {
                        eids: this.data.entityId,
                        ups: 1
                    }), this.selectedItem.playAni();
                    else {
                        var n = Math.min(ft.ExtItem.getNum(this.selectedItem.data.id), Math.min(ft.value.com.maxEquipLevel, ftc.ManagerData.get1("Player").level) - this.data.lv);
                        ftc.showDialog({
                            text: ftc.language("确定一键强化装备, 消耗") + n + ft.ExtItem.getName(this.selectedItem.data.id),
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
        