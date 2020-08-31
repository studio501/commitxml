
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    labelName: cc.Label,
                    spriteRedPoint: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf, {
                        auto: !0
                    })
                },
                updateData: function (t) {
                    this.labelName.string = ft.ExtMsg.getTitle(this.data), this.buttonSelf.interactable = this.index !== t, this.spriteRedPoint.node.active = ft.ExtMsg.checkCanGet(this.data), this.labelName.node.color = this.index !== t ? ftc.newColor(ftc.value.color.tabNormal) : ftc.newColor(ftc.value.color.tabPressed), this.labelName.node.getComponent(cc.LabelOutline).color = this.index !== t ? ftc.newColor(ftc.value.color.tabNormalOutline) : ftc.newColor(ftc.value.color.tabPressedOutline)
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectLeftItem", this)
                }
            })
        