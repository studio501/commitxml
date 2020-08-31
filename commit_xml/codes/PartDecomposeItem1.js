
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    nodeItem: cc.Node,
                    spriteSelect: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                load: function () {
                    this.item = this.newPart("PartItem"), this.item.setInteractable(!1), this.nodeItem.addChild(this.item.node)
                },
                updateData: function (t) {
                    0 === t.tabIndex ? this.item.setEquipData(this.data, !0) : 3 === t.tabIndex ? this.item.setJewelData(this.data, !0) : this.item.setData(this.data.id, this.data.num, !0);
                    var e = -1;
                    t.selectedIndexs instanceof Array && (e = t.selectedIndexs.indexOf(this.index)), this.spriteSelect.node.active = -1 != e
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectDecomposeItem1", this)
                }
            })
        