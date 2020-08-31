
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    nodeJewel: cc.Node,
                    nodeItem: cc.Node,
                    labelName: cc.Label,
                    labelDesc: cc.Label,
                    nodeEmpty: cc.Node,
                    spriteAdd: cc.Sprite,
                    spriteLock1: cc.Sprite,
                    spriteLock2: cc.Sprite,
                    labelDesc2: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                load: function () {
                    this.ste = 0, this.item = this.newPart("PartItem"), this.item.setInteractable(!1), this.nodeItem.addChild(this.item.node)
                },
                updateData: function (t) {
                    if (this.equip = t, this.nodeJewel.active = !!this.data, this.nodeEmpty.active = !this.nodeJewel.active, this.nodeJewel.active) this.ste = 4, this.item.setJewelData(this.data), this.labelName.string = ft.ExtJewel.getName(this.data.id), this.labelDesc.node.active = !0, this.labelDesc.string = ft.ExtJewel.getValueInfo(this.data.id);
                    else {
                        var e;
                        if (this.spriteAdd.node.active = !1, this.spriteLock1.node.active = !1, this.spriteLock2.node.active = !1, this.equip.slotNum > this.index || this.equip.star > 0 && 0 === this.index) this.ste = 3, this.spriteAdd.node.active = !0, e = "\u672a\u9576\u5d4c";
                        else {
                            var i = ft.value.equipUnlockSlotNeeds;
                            0 === this.index && this.equip.star < i[0] || 1 === this.index && this.equip.star < i[1] || 2 === this.index && this.equip.star < i[2] ? (this.ste = 1, this.spriteLock2.node.active = !0, e = "\u672a\u89e3\u9501") : (this.ste = 2, this.spriteLock1.node.active = !0, e = "\u53ef\u89e3\u9501")
                        }
                        this.labelDesc2.string = e
                    }
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    1 === this.ste ? ftc.showTip(ft.value.equipUnlockSlotNeeds[this.index] + "\u661f\u53ef\u89e3\u9501") : 2 === this.ste ? ft.ExtItem.getNum(ft.value.item.equipPerforation) < 1 ? ftc.showTip("\u6570\u91cf\u4e0d\u8db3") : ftc.showDialog({
                        text: "\u89e3\u9501\u63d2\u69fd\u9700\u8981\u6d88\u80171\u4e2a\u6253\u5b54\u5668\u3002\u786e\u5b9a\u6d88\u8017\u6253\u5b54\u5668\u89e3\u9501\u63d2\u69fd\u4e48?",
                        click1: function () {
                            ftc.send("equipUnlockSlot", {
                                eid: this.equip.entityId
                            })
                        }.bind(this),
                        click2: function () { },
                        consume1: {
                            id: ft.value.item.equipPerforation,
                            num: 1
                        }
                    }) : 3 === this.ste ? ftc.loadLayout("LayoutList", function (t) {
                        t.setData({
                            type: ft.type.list.ChooseJewel,
                            equip: this.equip,
                            slot: this.index
                        })
                    }.bind(this)) : 4 === this.ste && ftc.showDialog({
                        text: "\u5f53\u524d\u69fd\u4f4d\u5df2\u6709\u5b9d\u77f3\uff0c\u5982\u8981\u66ff\u6362\u65b0\u5b9d\u77f3\u4f1a\u6467\u6bc1\u5f53\u524d\u5b9d\u77f3\uff0c\u5e76\u6d88\u8017100\u3010\u9576\u5d4c\u7c89\u3011\u3002\u5982\u8981\u5b8c\u6574\u53d6\u4e0b\u5b9d\u77f3\uff0c\u9700\u8981\u6d88\u80171\u4e2a\u3010\u53d6\u94bb\u5668\u3011\u3002",
                        button1: "\u53d6\u4e0b",
                        button2: "\u66ff\u6362",
                        click1: function () {
                            ft.ExtItem.getNum(ft.value.item.jewelUnloadTool) < 1 ? ftc.showTip("\u53d6\u94bb\u5668\u6570\u91cf\u4e0d\u8db3") : ftc.send("jewelUnload", {
                                eid: this.data.entityId
                            })
                        }.bind(this),
                        click2: function () {
                            ftc.loadLayout("LayoutList", function (t) {
                                t.setData({
                                    type: ft.type.list.ChooseJewel,
                                    equip: this.equip,
                                    slot: this.index
                                })
                            }.bind(this))
                        }.bind(this),
                        clickClose: function () { },
                        consume1: {
                            id: ft.value.item.jewelUnloadTool,
                            num: 1
                        },
                        consume2: {
                            id: ft.value.item.inlayPowder,
                            num: 100
                        }
                    })
                }
            })
        