
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    spriteIcon: cc.Sprite,
                    labelName: cc.Label,
                    labelNum: cc.Label,
                    nodeSelect: cc.Node
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                updateData: function (t) {
                    var e = this.data.id;
                    t ? (this.type = 2, this.spriteIcon.spriteFrame = ft.ExtItem.getIconSprite(e), this.labelNum.node.active = !0, t[1][e] ? this.labelNum.string = "" + (this.data.num - t[1][e]) : this.labelNum.string = this.data.num, this.labelName.string = ft.ExtItem.getName(e), this.nodeSelect.active = !1) : (this.type = 3, this.spriteIcon.spriteFrame = ft.ExtPet.getIconSprite(e), this.labelNum.node.active = !1, this.labelName.string = ft.ExtPet.getName(e))
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t) {
                    ftc.sendClient("c_item", this, "LayoutBattle")
                }
            })
        