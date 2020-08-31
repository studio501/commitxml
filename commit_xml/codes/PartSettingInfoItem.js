
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    spriteQuality: cc.Sprite,
                    spriteIcon: cc.Sprite,
                    spriteCountry: cc.Sprite,
                    spriteName: cc.Sprite,
                    spritePlus: cc.Sprite,
                    spriteStar: cc.Sprite
                },
                init: function () { },
                updateData: function (t) {
                    this.spriteQuality.spriteFrame = ft.ExtHero.getQualitySprite(this.data.id), this.spriteIcon.spriteFrame = ft.ExtHero.getIconSprite(this.data.id), this.spriteCountry.spriteFrame = ft.ExtHero.getCountrySprite2(this.data.id), this.spriteName.spriteFrame = ft.ExtHero.getNameSprite(this.data.id), this.spriteName.node.color = ft.ExtHero.getNameColor(this.data.id), this.spritePlus.node.active = !1, this.spritePlus.node.active && (this.spritePlus.spriteFrame = ft.ExtHero.getUpSprite(this.data.up), this.spritePlus.node.active = !!this.spritePlus.spriteFrame, this.spritePlus.node.color = ft.ExtHero.getNameColor(this.data.id)), this.spriteStar.spriteFrame = ft.ExtHero.getStarSprite(this.data.star)
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        