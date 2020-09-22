
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    spriteIcon: cc.Sprite,
                    spriteQuality: cc.Sprite,
                    spriteName: cc.Sprite,
                    spritePlus: cc.Sprite,
                    spriteStar: cc.Sprite,
                    spriteCountry: cc.Sprite,
                    progressHp: cc.ProgressBar,
                    progressExp: cc.ProgressBar,
                    progressMp: cc.ProgressBar,
                    spriteStatus: cc.Sprite,
                    spriteDie: cc.Sprite,
                    labelLv: cc.Label,
                    labelHp: cc.Label,
                    labelExp: cc.Label,
                    labelMp: cc.Label,
                    nodeExp: cc.Node,
                    nodeMp: cc.Node
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                updateData: function (t) {
                    this.spriteIcon.spriteFrame = ft.ExtHero.getIconSprite(this.data.id), this.spriteQuality.spriteFrame = ft.ExtHero.getQualitySprite(this.data.id), this.spriteName.spriteFrame = ft.ExtHero.getNameSprite(this.data.id), this.spriteName.node.color = ft.ExtHero.getNameColor(this.data.id), this.spritePlus.node.active = this.data.up > 0, this.data.up > 0 && (this.spritePlus.spriteFrame = ft.ExtHero.getUpSprite(this.data.up), this.spritePlus.node.active = !!this.spritePlus.spriteFrame, this.spritePlus.node.color = ft.ExtHero.getNameColor(this.data.id)), this.spriteStar.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "common_icon_xing" + this.data.star), this.spriteCountry.spriteFrame = ft.ExtHero.getCountrySprite2(this.data.id), this.progressHp.progress = this.data.hp, this.progressExp.progress = Math.round(this.data.exp) / ft.ExtHero.getNextExp(this.data.lv), this.progressMp.progress = this.data.mp, this.spriteStatus.node.active = !0;
                    var e = ftc.ManagerData.get1("ManagerHero");
                    e.commander0 == this.data.id || e.commander1 == this.data.id ? this.spriteStatus.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "common_img_jun") : ft.ExtHero.isInTeam(this.data.id) ? this.spriteStatus.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "common_img_jiang") : this.spriteStatus.node.active = !1, this.spriteDie.node.active = 0 == this.data.hp, this.labelLv.string = this.data.lv + ftc.language("级"), this.labelHp.string = ft.ExtHero.getHp(this.data), this.labelExp.string = ft.getNumShow(Math.round(this.data.exp)), this.labelMp.string = ft.ExtHero.getMp(this.data)
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectHeroItem1", this)
                }
            })
        