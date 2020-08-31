
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    spriteIcon: cc.Sprite,
                    labelSelf: cc.Label,
                    labelValue: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                updateData: function (t) {
                    this.spriteIcon.spriteFrame = ft.ExtPropName.getSpriteIcon(this.data.id), this.labelSelf.string = this.data.name, this.labelValue.string = this.data.value
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    ftc.send("c_onSelectHeroPropDetailItem", this)
                }
            })
        