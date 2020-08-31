
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    nodeHero: cc.Node,
                    spriteBg: cc.Sprite,
                    spriteIcon: cc.Sprite,
                    spriteJunShi: cc.Sprite,
                    progressHp: cc.ProgressBar,
                    spriteQuality: cc.Sprite,
                    spriteRedPoint: cc.Sprite,
                    spriteSelect: cc.Sprite,
                    spriteStatus: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf, {
                        auto: !0
                    })
                },
                updateData: function (t) {
                    if (this.nodeHero.active = this.data, this.data) {
                        var e = this.data.id;
                        this.spriteIcon.spriteFrame = ft.ExtHero.getIconSprite(e), this.spriteQuality.spriteFrame = ft.ExtHero.getQualitySprite(e), this.progressHp.progress = this.data.hp, this.spriteSelect.node.active = this.index === t, this.isChange = this.index === t;
                        var i = ft.ExtHero.getTeamIndex(e);
                        this.spriteJunShi.node.active = -1 !== i && ftc.ManagerData.get1("ManagerHero")["commander" + i] == e, this.spriteRedPoint.node.active = ft.ExtHero.getType(e) === ft.type.hero.our && (ft.ExtHero.checkCanEquip(this.data) || ft.ExtHero.checkCanLvUp(this.data) || ft.ExtHero.checkCanStarUp(this.data) || ft.ExtHero.checkCanWakeUp(this.data) || ft.ExtHero.checkCanBiographyUnlock(this.data)), this.spriteStatus.node.active = this.data.hp <= 0
                    } else this.isChange = !1
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    this.isChange ? t.auto || ftc.sendClient("c_onSelectHeroItem2", this) : ftc.sendClient("c_onSelectHeroItem", this)
                }
            })
        