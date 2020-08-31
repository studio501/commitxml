
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    nodeItem: cc.Node,
                    labelName: cc.Label,
                    labelInfo: cc.Label,
                    labelNum: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                load: function () {
                    this.item = this.newPart("PartItem"), this.item.setInteractable(!1), this.nodeItem.addChild(this.item.node)
                },
                updateData: function (t) {
                    this.item.setJewelData(this.data), this.labelName.string = ft.ExtJewel.getName(this.data.id), this.labelInfo.string = ft.ExtJewel.getValueInfo(this.data.id), this.labelNum.string = ftc.language("\u6570\u91cf:") + this.data.num
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectHeroItem1", this)
                }
            })
        