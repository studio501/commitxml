
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    nodeItem: cc.Node,
                    spriteSelect: cc.Sprite,
                    spriteRedPoint: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf, {
                        auto: !0
                    })
                },
                load: function () {
                    this._item = this.newPart("PartItem"), this._item.setInteractable(!1), this.nodeItem.addChild(this._item.node)
                },
                updateData: function (t) {
                    var e = this.data.kind,
                        i = this.data.data;
                    0 === e || 1 === e || 3 === e ? this._item.setData(i.id, i.num, !0) : 2 === e ? this._item.setEquipData(i, !0) : 4 === e && this._item.setJewelData(i, !0), this.spriteRedPoint.node.active = 1 === e && ft.ExtItem.checkRedPoint(i.id), this.spriteSelect.node.active = this.index === t
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectBagItem", this)
                }
            })
        