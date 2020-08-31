
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    spriteQuality: cc.Sprite,
                    spriteIcon: cc.Sprite,
                    labelName: cc.Label
                },
                init: function () { },
                updateData: function (t) {
                    this.spriteQuality.spriteFrame = ft.ExtItem.getQualitySprite(this.data.id), this.spriteIcon.spriteFrame = ft.ExtItem.getIconSprite(this.data.id), this.labelName.string = ft.ExtItem.getName(this.data.id) + (this.data.num ? " x" + this.data.num : "")
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        