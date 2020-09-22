
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spriteQuality1: cc.Sprite,
                    spriteQuality2: cc.Sprite,
                    spriteIcon1: cc.Sprite,
                    spriteIcon2: cc.Sprite,
                    spriteStar1: cc.Sprite,
                    spriteStar2: cc.Sprite,
                    labelStars: [cc.Label],
                    progressBar: cc.ProgressBar,
                    labelProgress: cc.Label,
                    labelName: cc.Label,
                    buttonStarUp: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonStarUp)
                },
                setData: function (t) {
                    this.data = t, this.spriteQuality1.spriteFrame = ft.ExtHero.getQualitySprite(this.data.id), this.spriteQuality2.spriteFrame = ft.ExtHero.getQualitySprite(this.data.id), this.spriteIcon1.spriteFrame = ft.ExtHero.getIconSprite(this.data.id), this.spriteIcon2.spriteFrame = ft.ExtHero.getIconSprite(this.data.id), this.spriteStar1.spriteFrame = ft.ExtHero.getStarSprite(this.data.star), this.spriteStar2.spriteFrame = ft.ExtHero.getStarSprite(this.data.star + 1);
                    for (var e = 0; e < this.labelStars.length; e++) this.labelStars[e].string = ft.ExtHero.getStarInfo(this.data.id, e + 1);
                    for (e = 0; e < ft.value.com.maxHeroStar; e++) this.labelStars[e].node.color = this.data.star > e ? ftc.newColor(13512192) : ftc.newColor(8410945);
                    var i = ft.ExtHero.getConsumeStar(this.data.id, this.data.star + 1);
                    if (i) {
                        var a = i.ids,
                            n = i.nums;
                        if (a[0] && n[0]) {
                            var s = ft.ExtItem.getNum(a[0]);
                            this.progressBar.node.active = !0, this.progressBar.progress = s / n[0], this.labelProgress.string = s + "/" + n[0], this.labelName.string = ft.ExtHero.getName(this.data.id) + ftc.language("碎片")
                        }
                    } else this.progressBar.node.active = !1, this.labelProgress.string = ""
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonStarUp.node && (this.data.star == ft.value.com.maxHeroStar ? ftc.showTip("已升至最高") : this.progressBar.progress < 1 ? ftc.showTip("碎片不足") : ftc.send("heroStar", {
                        id: this.data.id,
                        up: 1
                    }))
                }
            })
        