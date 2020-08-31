
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spriteQuality: cc.Sprite,
                    spriteIcon: cc.Sprite,
                    spriteName: cc.Sprite,
                    spritePlus: cc.Sprite,
                    spriteStar: cc.Sprite
                },
                init: function () { },
                setData: function (t) {
                    this.data = t, this.spriteQuality.spriteFrame = ft.ExtHero.getQualitySprite(this.data.id), this.spriteIcon.spriteFrame = ft.ExtHero.getIconSprite(this.data.id), this.spriteName.spriteFrame = ft.ExtHero.getNameSprite(this.data.id), this.spritePlus.node.active = this.data.up > 0, this.data.up > 0 && (this.spritePlus.spriteFrame = ft.ExtHero.getUpSprite(this.data.up), this.spritePlus.node.active = !!this.spritePlus.spriteFrame, this.spritePlus.node.color = ft.ExtHero.getNameColor(this.data.id)), this.spriteStar.spriteFrame = ft.ExtHero.getStarSprite(this.data.star)
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        