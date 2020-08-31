
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    spineBg: sp.Skeleton,
                    spineBg2: sp.Skeleton,
                    spineHero: sp.Skeleton,
                    buttonSelf: cc.Button,
                    spriteWeapon: cc.Sprite,
                    spriteCountry: cc.Sprite,
                    spriteName: cc.Sprite,
                    spriteStar: cc.Sprite,
                    labelTip: cc.Label,
                    buttonConfirm: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonSelf, !0), this.addClick(this.buttonConfirm), this.spineBg2.setCompleteListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "wait1" === (t.animation ? t.animation.name : "") && (this.playAni = !1, this.buttonConfirm.node.active = !0, this.buttonConfirm.node.opacity = 0, this.buttonConfirm.node.runAction(cc.fadeIn(.2)), ftc.ManagerTV.nextSelect(this.buttonConfirm, this.node))
                    }.bind(this)), ftc.ManagerTV.setNotShowOnEnter(this.node)
                },
                load: function () {
                    ftc.playEffect(ftc.type.effect.getGoods), this.heroes = void 0, this.callback = void 0, this.playAni = !1, this.buttonConfirm.node.active = !1
                },
                setData: function (t, e) {
                    this.heroes = ft.toArray(t), this.callback = e, this.index = 0, this.showHero(this.heroes[this.index])
                },
                showHero: function (t) {
                    if (t) {
                        this.playAni = !0, this.buttonConfirm.node.active = !1, this.spineBg.setAnimation(0, "wait1", !1), this.spineBg.addAnimation(0, "wait2", !0), this.spineBg2.setAnimation(0, "wait1", !1), this.spineBg2.addAnimation(0, "wait2", !0);
                        var e = t[0],
                            i = t[1],
                            a = ftc.ManagerData.get2Object("Hero")[e];
                        this.spriteWeapon.spriteFrame = ft.ExtHero.getWeaponSprite(a.id), this.spriteCountry.spriteFrame = ft.ExtHero.getCountrySprite(a.id), this.spriteName.spriteFrame = ft.ExtHero.getNameSprite(a.id), 1 === i && (this.spriteStar.spriteFrame = ft.ExtHero.getStarSprite(a.star)), this.loadResource(ft.ExtHero.getSpineRes(a.id), sp.SkeletonData, function (t) {
                            t && (this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "w1", !0))
                        }.bind(this), this);
                        var n = ft.ExtHero.getPos(a.id);
                        if (this.labelTip.node.active = !0, i > 1) {
                            this.labelTip.string = ftc.language("\u83b7\u5f97\u6b66\u5c06\u5df2\u8f6c\u6362\u6210 \u788e\u7247x") + i;
                            var s = 0,
                                o = 10;
                            if (i > o)
                                for (var r = 0; r < ft.value.com.maxHeroStar && i >= (o += ft.value.heroStarNeed[r]); r++) s += 1;
                            this.spriteStar.spriteFrame = ft.ExtHero.getStarSprite(s)
                        } else 1 === i ? (this.labelTip.node.active = -1 !== n, this.labelTip.node.active && (this.labelTip.string = ftc.language("\u65b0\u83b7\u5f97\u6b66\u5c06\u5df2\u4e0a\u9635"))) : this.labelTip.string = ftc.language("\u5df2\u62e5\u6709\u8be5\u6b66\u5c06")
                    }
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                onClick: function (t, e) {
                    this.playAni || t.target !== this.buttonSelf.node && t.target !== this.buttonConfirm.node || (this.index < this.heroes.length - 1 ? (this.index++, this.showHero(this.heroes[this.index])) : (this.cancel(), this.callback && this.callback()))
                }
            })
        