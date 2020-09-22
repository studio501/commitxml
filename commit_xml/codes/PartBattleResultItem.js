
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spineLvUp1: sp.Skeleton,
                    spineHero: sp.Skeleton,
                    spineLvUp2: sp.Skeleton,
                    spriteMvp: cc.Sprite,
                    spriteStar: cc.Sprite,
                    progressHp: cc.ProgressBar,
                    labelExp: cc.Label,
                    spriteName: cc.Sprite,
                    spritePlus: cc.Sprite
                },
                init: function () {
                    this.spineHero.setCompleteListener(function (t, e) {
                        if (this.spineHero && !ftc.ManagerRes.checkNodeIsRestored(this.spineHero.node) && "a4" === (t.animation ? t.animation.name : ""))
                            if (this.isMvp) this.spineHero.setAnimation(0, "w1"), this.node.runAction(cc.sequence(cc.delayTime(.5), cc.callFunc(function () {
                                this.spineHero.setAnimation(0, "a4")
                            }.bind(this))));
                            else {
                                var i = this.data.hp > 0 ? "w1" : "wait1";
                                this.spineHero.setAnimation(0, i, !0)
                            }
                    }.bind(this))
                },
                load: function () {
                    this.data = void 0, this.isLvUp = !1, this.spineHero.node.active = !1, this.isMvp = !1
                },
                setData: function (t, e, i, a, n) {
                    if (this.data = t, this.result = e, this.isMvp = a, this.data) {
                        var s = this.data.hp > 0 ? ft.ExtHero.getSpineRes(this.data.id) : "spine/view/com_dead",
                            o = this.data.hp > 0 ? "w1" : "wait1";
                        this.loadResource(s, sp.SkeletonData, function (t) {
                            t && (this.spineHero.node.active = 0 === e || this.data.hp <= 0 || !n, this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, o, !0))
                        }.bind(this)), this.spriteStar.node.active = this.data.star > 0, this.spriteStar.node.active && (this.spriteStar.spriteFrame = ft.ExtHero.getStarSprite(this.data.star)), this.progressHp.progress = this.data.hp, this.labelExp.string = i >= 0 ? ftc.language("经验") + "+" + ft.getNumShow(i) : "", this.spriteName.spriteFrame = ft.ExtHero.getNameSprite(this.data.id), this.spriteName.node.color = ft.ExtHero.getNameColor(this.data.id), this.spritePlus.node.active = this.data.up > 0, this.data.up > 0 && (this.spritePlus.spriteFrame = ft.ExtHero.getUpSprite(this.data.up), this.spritePlus.node.active = !!this.spritePlus.spriteFrame, this.spritePlus.node.color = ft.ExtHero.getNameColor(this.data.id)), this.spriteMvp.node.active = 1 === e && this.isMvp
                    }
                    this.isLvUp = i > this.data.exp
                },
                updateData: function (t) {
                    this.progressHp.progress = t.hp;
                    var e = this.data.hp > 0 ? ft.ExtHero.getSpineRes(this.data.id) : "spine/view/com_dead",
                        i = this.data.hp > 0 ? "w1" : "wait1";
                    this.loadResource(e, sp.SkeletonData, function (t) {
                        t && (this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, i, !0))
                    }.bind(this))
                },
                playJumpAni: function () {
                    this.data && this.data.hp > 0 && (this.spineHero.node.active = !0, this.spineHero.skeletonData && (this.spineHero.setAnimation(0, "jump", !1), this.isMvp ? this.spineHero.addAnimation(0, "a4") : this.spineHero.addAnimation(0, "w1", !0)))
                },
                playLvUpAni: function () {
                    this.data && this.data.hp > 0 && (this.spineHero.node.active = !0, this.spineHero.skeletonData && (this.spineLvUp1.setAnimation(0, "wait1"), this.spineLvUp2.setAnimation(0, "wait1")))
                },
                playReadyAni: function () {
                    this.data && this.data.hp > 0 && (this.spineHero.node.active = !0, this.spineHero.skeletonData && this.spineHero.addAnimation(0, "w1", !0))
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        