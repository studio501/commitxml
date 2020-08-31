
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    spriteQuality: cc.Sprite,
                    spriteIcon: cc.Sprite,
                    spriteCountry: cc.Sprite,
                    spriteName: cc.Sprite,
                    spriteGray: cc.Sprite,
                    spriteRare: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                updateData: function (t) {
                    var e = this.data.id;
                    this.spriteQuality.spriteFrame = ft.ExtHero.getQualitySprite(e, !0), this.spriteIcon.spriteFrame = ft.ExtHero.getIconSprite(e), this.spriteCountry.spriteFrame = ft.ExtHero.getCountryMarkSprite(e), this.spriteName.spriteFrame = ft.ExtHero.getNameSprite(e), this.spriteName.node.color = ft.ExtHero.getNameColor(e, !0), void 0 !== this.data.isOpen ? this.spriteGray.node.active = !this.data.isOpen : this.spriteGray.node.active = !1, this.spriteRare.node.active = ft.ExtHero.getRarity(e) >= ft.type.rarity.rare
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.send("c_onSelectVisitPreviewItem", this)
                }
            })
        