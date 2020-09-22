
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    spriteQuality: cc.Sprite,
                    spriteIcon: cc.Sprite,
                    spriteCountry: cc.Sprite,
                    spriteRedPoint: cc.Sprite,
                    spriteStar: cc.Sprite,
                    labelLevel: cc.Label,
                    labelNum1: cc.Label,
                    progressBar1: cc.ProgressBar,
                    labelNum2: cc.Label,
                    progressBar2: cc.ProgressBar,
                    labelNum3: cc.Label,
                    progressBar3: cc.ProgressBar,
                    spriteName: cc.Sprite,
                    spritePlus: cc.Sprite,
                    spriteShadow: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                updateData: function (t) {
                    var e = 0,
                        i = -1,
                        a = 0,
                        n = 0;
                    if (void 0 === this.data.id) {
                        e = this.data;
                        var s = ftc.ManagerData.get2("Hero");
                        for (var o in s)
                            if (e == s[o].id) {
                                this.data = s[o];
                                break
                            }
                    }
                    this.data.id && (e = this.data.id, i = this.data.star, a = this.data.lv, n = this.data.up), this.spriteQuality.spriteFrame = ft.ExtHero.getQualitySprite(e), this.spriteIcon.spriteFrame = ft.ExtHero.getIconSprite(e), this.spriteCountry.spriteFrame = ft.ExtHero.getCountrySprite2(e), this.spriteStar.node.active = i > -1, i > -1 && (this.spriteStar.spriteFrame = ft.ExtHero.getStarSprite(i)), this.labelLevel.node.active = !!a, this.labelLevel.node.active && (this.labelLevel.string = a + ftc.language("级"));
                    var r = ft.ExtItem.mapPartHeros[e],
                        c = ft.ExtItem.getNum(r),
                        h = i < ft.value.com.maxHeroStar ? ft.value.heroStarNeed[i] : 0; - 1 === i && (h = ft.ExtHero.getNeedPiecesNum(e)), this.labelNum1.string = h ? c + "/" + h : c, this.progressBar1.progress = h ? c / h : 1, this.spriteRedPoint.node.active = h && c >= h, r = ft.ExtItem.mapHeroSpirit[e], c = ft.ExtItem.getNum(r), h = n < ft.value.com.maxHeroUp ? ft.value.heroSpiritNeed[n] : 0, this.labelNum2.string = h ? c + "/" + h : c, this.progressBar2.progress = h ? c / h : 1, r = ft.ExtItem.mapHeroBiography[e], c = ft.ExtItem.getNum(r), h = ft.value.com.biographyMaxNum, this.labelNum3.string = h ? c + "/" + h : c, this.progressBar3.progress = h ? c / h : 1, this.spriteName.spriteFrame = ft.ExtHero.getNameSprite(e), this.spriteName.node.color = ft.ExtHero.getNameColor(e), this.spritePlus.node.active = n > 0, n > 0 && (this.spritePlus.spriteFrame = ft.ExtHero.getUpSprite(n), this.spritePlus.node.active = !!this.spritePlus.spriteFrame, this.spritePlus.node.color = ft.ExtHero.getNameColor(e)), this.spriteShadow.node.active = -1 === i
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectHeroesItem", this)
                }
            })
        