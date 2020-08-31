
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spriteName: cc.Sprite,
                    spineHero: sp.Skeleton,
                    buttonAdd: cc.Button,
                    spriteAdd: cc.Sprite,
                    nodeLv: cc.Node,
                    labelLv: cc.Label,
                    labelLvAfter: cc.Label,
                    labelTip: cc.Label,
                    labelExp: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonAdd)
                },
                load: function () { },
                setData: function (t, e) {
                    this.data = t, this.isInherit = e, this.isInherit && (this.spriteAdd.node.active = !1, this.spriteName.node.parent.active = !0, this.spriteName.spriteFrame = ft.ExtHero.getNameSprite(this.data.id), this.spriteName.node.color = ft.ExtHero.getNameColor(this.data.id), this.spineHero.node.active = !0, this.loadResource(ft.ExtHero.getSpineRes(this.data.id), sp.SkeletonData, function (t) {
                        t && (this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "w1", !0))
                    }.bind(this), this), this.labelTip.string = this.data.lv + ftc.language("\u7ea7"))
                },
                setSelectedHero: function (t, e) {
                    this.selectedHero = t, this.nodeLv.active = !0, this.labelTip.string = "", this.spriteAdd.node.active = !1, this.isInherit || (this.spriteName.node.parent.active = !0, this.spriteName.spriteFrame = ft.ExtHero.getNameSprite(this.selectedHero.id), this.spriteName.node.color = ft.ExtHero.getNameColor(this.selectedHero.id), this.spineHero.node.active = !0, this.loadResource(ft.ExtHero.getSpineRes(this.selectedHero.id), sp.SkeletonData, function (t) {
                        t && (this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "w1", !0))
                    }.bind(this), this)), this.setRate(e)
                },
                setRate: function (t) {
                    if (this.selectedHero) {
                        var e = ft.ExtHero.calcTotalExp(this.selectedHero),
                            i = ft.ExtHero.calcExpAdd(this.data, e * t, ftc.ManagerData.get1("Player").level),
                            a = ft.ExtHero.calcExpSub(this.selectedHero, e - Math.round(i.surplusExp / t));
                        this.isInherit ? (this.labelLv.string = this.data.lv + ftc.language("\u7ea7"), this.labelLvAfter.string = i.lv + ftc.language("\u7ea7"), this.labelExp.string = ftc.language("\u7ecf\u9a8c\u589e\u52a0:") + ft.getNumShow(Math.round(e * t) - i.surplusExp)) : (this.labelLv.string = this.selectedHero.lv + ftc.language("\u7ea7"), this.labelLvAfter.string = a.lv + ftc.language("\u7ea7"), this.labelExp.string = ftc.language("\u7ecf\u9a8c\u6d88\u8017:") + ft.getNumShow(e - Math.round(i.surplusExp / t)))
                    }
                },
                reset: function (t) {
                    this.spriteName.node.parent.active = !1, this.spriteName.spriteFrame = null, this.spineHero.node.active = !1, this.buttonAdd.node.active = !t, this.spriteAdd.node.active = !0, this.nodeLv.active = !1, this.labelTip.string = t ? ftc.language("0\u7ea7") : ftc.language("\u8bf7\u9009\u62e9\u6b66\u5c06"), this.labelExp.string = "", this.selectedHero = void 0
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    if (t.target === this.buttonAdd.node) {
                        ftc.ManagerRes.topLayout();
                        ftc.loadLayout("LayoutList", function (t) {
                            t.setData({
                                type: ft.type.list.ChooseHero
                            })
                        })
                    }
                }
            })
        