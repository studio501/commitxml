
            
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
                        if (this.spriteAdd.node.active = !1, this.spriteLock1.node.active = !1, this.spriteLock2.node.active = !1, this.equip.slotNum > this.index || this.equip.star > 0 && 0 === this.index) this.ste = 3, this.spriteAdd.node.active = !0, e = "未镶嵌";
                        else {
                            var i = ft.value.equipUnlockSlotNeeds;
                            0 === this.index && this.equip.star < i[0] || 1 === this.index && this.equip.star < i[1] || 2 === this.index && this.equip.star < i[2] ? (this.ste = 1, this.spriteLock2.node.active = !0, e = "未解锁") : (this.ste = 2, this.spriteLock1.node.active = !0, e = "可解锁")
                        }
                        this.labelDesc2.string = e
                    }
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    1 === this.ste ? ftc.showTip(ft.value.equipUnlockSlotNeeds[this.index] + "星可解锁") : 2 === this.ste ? ft.ExtItem.getNum(ft.value.item.equipPerforation) < 1 ? ftc.showTip("数量不足") : ftc.showDialog({
                        text: "解锁插槽需要消耗1个打孔器。确定消耗打孔器解锁插槽么?",
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
                        text: "当前槽位已有宝石，如要替换新宝石会摧毁当前宝石，并消耗100【镶嵌粉】。如要完整取下宝石，需要消耗1个【取钻器】。",
                        button1: "取下",
                        button2: "替换",
                        click1: function () {
                            ft.ExtItem.getNum(ft.value.item.jewelUnloadTool) < 1 ? ftc.showTip("取钻器数量不足") : ftc.send("jewelUnload", {
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
        