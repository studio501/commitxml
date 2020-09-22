
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonSelf: cc.Button,
                    partInheritHeroes: [t("PartHeroInherit")],
                    button50: cc.Button,
                    button100: cc.Button,
                    spriteIcon50: cc.Sprite,
                    labelNum1: cc.Label,
                    spriteIcon100: cc.Sprite,
                    labelNum2: cc.Label,
                    buttonInherit: cc.Button,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonSelf, !0), this.addClick(this.button50), this.addClick(this.button100), this.addClick(this.buttonInherit), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    for (var t = 0; t < this.partInheritHeroes.length; t++) this.initPart(this.partInheritHeroes[t]);
                    this.selectedHero = void 0, this.button50.interactable = !0, this.button100.interactable = !1, this.rate = 1, this.inheritType = ft.type.inherit.all, this.partInheritHeroes[0].reset(!0), this.partInheritHeroes[1].reset(!1)
                },
                setData: function (t) {
                    this.data = t, this.partInheritHeroes[0].setData(this.data, !0), this.partInheritHeroes[1].setData(this.data, !1);
                    var e = ft.ExtHero.getInheritConsume(ft.type.inherit.half);
                    this.spriteIcon50.spriteFrame = ft.ExtItem.getLittleIconSprite(e.ids[0]), this.labelNum1.string = e.nums[0], e = ft.ExtHero.getInheritConsume(ft.type.inherit.all), this.spriteIcon100.spriteFrame = ft.ExtItem.getLittleIconSprite(e.ids[0]), this.labelNum2.string = e.nums[0]
                },
                enter: function () {
                    ftc.setTvTip(this.node)
                },
                updateData: function () {
                    this.setData(this.data), this.selectedHero && (this.partInheritHeroes[0].setSelectedHero(this.selectedHero, this.rate), this.partInheritHeroes[1].setSelectedHero(this.selectedHero, this.rate))
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectListHeroItem: function (t, e) {
                            this.data.id === t.data.id ? ftc.showTip("不可以传承自己") : (this.selectedHero = t.data, this.partInheritHeroes[0].setSelectedHero(t.data, this.rate), this.partInheritHeroes[1].setSelectedHero(t.data, this.rate))
                        },
                        heroInherit: function (t, e) {
                            0 === t ? (ftc.showTip("传承成功"), ftc.playEffect(ftc.type.effect.heroUp), this.updateData()) : 1 === t ? this.inheritType === ft.type.inherit.all ? ftc.showTip("元宝不足") : this.inheritType === ft.type.inherit.all && ftc.showTip("银币不足") : 2 === t && ftc.showTip("请选择传承武将")
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.button50.node ? (this.button50.interactable = !1, this.button100.interactable = !0, this.inheritType = ft.type.inherit.half, this.rate = .5, this.partInheritHeroes[0].setRate(this.rate), this.partInheritHeroes[1].setRate(this.rate)) : t.target === this.button100.node ? (this.button50.interactable = !0, this.button100.interactable = !1, this.inheritType = ft.type.inherit.all, this.rate = 1, this.partInheritHeroes[0].setRate(this.rate), this.partInheritHeroes[1].setRate(this.rate)) : t.target === this.buttonInherit.node ? this.data.lv < ftc.ManagerData.get1("Player").level ? this.selectedHero ? ft.ExtHero.calcTotalExp(this.selectedHero) > 0 ? ftc.send("heroInherit", {
                        id: this.data.id,
                        id2: this.selectedHero.id,
                        type: this.inheritType
                    }) : ftc.showTip("武将无经验，无法传承") : ftc.showTip("请选择传承武将") : ftc.showTip("英雄已经达到玩家上限") : t.target !== this.buttonClose.node && t.target !== this.buttonSelf.node || this.cancel()
                }
            })
        