
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    spriteQuality: cc.Sprite,
                    spriteIcon: cc.Sprite,
                    spriteCountry: cc.Sprite,
                    spriteName: cc.Sprite,
                    labelName: cc.Label,
                    spriteUsing: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                updateData: function (t) {
                    var e = this.data.type;
                    if (e === ft.type.skin.team || e === ft.type.skin.commander) this.spriteQuality.spriteFrame = ft.ExtHero.getQualitySprite(0), this.spriteIcon.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "skin_" + e), this.labelName.string = e === ft.type.skin.team ? "队列形象" : "军师形象", this.spriteCountry.node.active = !1, this.spriteName.node.active = !1, this.labelName.node.active = !0;
                    else if (e === ft.type.skin.specify) {
                        var i = ft.ExtItem.getHero(this.data.id);
                        this.spriteQuality.spriteFrame = ft.ExtHero.getQualitySprite(i), this.spriteIcon.spriteFrame = ft.ExtItem.getIconSprite(this.data.id), this.labelName.string = ft.ExtItem.getName(this.data.id).split(":")[1], this.spriteCountry.spriteFrame = ft.ExtHero.getCountryMarkSprite(i), this.spriteCountry.node.active = !0, this.spriteName.node.active = !1, this.labelName.node.active = !0
                    } else {
                        var a = this.data.id;
                        this.spriteQuality.spriteFrame = ft.ExtHero.getQualitySprite(a), this.spriteIcon.spriteFrame = ft.ExtHero.getIconSprite(a), this.spriteCountry.spriteFrame = ft.ExtHero.getCountryMarkSprite(a), this.spriteName.spriteFrame = ft.ExtHero.getNameSprite(a), this.spriteName.node.color = ft.ExtHero.getNameColor(a), this.spriteCountry.node.active = !0, this.spriteName.node.active = !0, this.labelName.node.active = !1
                    }
                    var n = t,
                        s = ftc.ManagerData.get1("ManagerMap").skinTypes.split(","),
                        o = ftc.ManagerData.get1("ManagerMap").skins.split("|"),
                        r = !1;
                    (e === ft.type.skin.commander && s[n] == ft.type.skin.commander || e === ft.type.skin.team && s[n] == ft.type.skin.team || o[n] == this.data.id && s[n] == ft.type.skin.lord) && (r = !0), this.spriteUsing.node.active = r
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && (this.spriteUsing.node.active ? ftc.showTip("形象使用中") : ftc.send("c_onSelectSkinItem", this))
                }
            })
        