
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    progressBar: cc.ProgressBar,
                    labelProgress: cc.Label,
                    layoutItems: cc.Node,
                    buttonLeft: cc.Button,
                    buttonRight: cc.Button,
                    spineHero: sp.Skeleton,
                    spriteDesc: cc.Sprite,
                    buttonRecharge: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonLeft), this.addClick(this.buttonRight), this.addClick(this.buttonRecharge)
                },
                setData: function (t) {
                    this.data = t, this.startIndex = Number(this.data.ext), this.selectGift(this.startIndex)
                },
                selectGift: function (t) {
                    this.index = t;
                    for (var e = this.layoutItems.children.length - 1; e >= 0; e--) ftc.ManagerRes.restoreNode(this.layoutItems.children[e]);
                    var i = ft.ExtMsg.getActivityData(this.data).items,
                        a = i[this.index],
                        n = ftc.ManagerData.get1("Player").rmb,
                        s = a.totals;
                    this.progressBar.progress = n / s, this.labelProgress.string = n + "/" + s;
                    var o = a.id2s,
                        r = a.num2s;
                    for (e = 0; e < o.length; e++)
                        if (0 === e) {
                            var c = ft.ExtItem.getHero(o[0]);
                            (h = this.newPart("PartItem")).node.scale = .8, h.setData(o[0], r[0]), this.layoutItems.addChild(h.node, e), this.loadResource(ft.ExtHero.getSpineRes(c), sp.SkeletonData, function (t) {
                                t && (this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "w1", !0))
                            }.bind(this), this), this.spriteDesc.spriteFrame = ft.ExtMsg.getHeroDesc(this.index)
                        } else {
                            var h;
                            (h = this.newPart("PartItem")).node.scale = .8, h.setData(o[e], r[e], !0), h.setNameColor(cc.Color.WHITE), this.layoutItems.addChild(h.node, e)
                        } this.buttonLeft.node.active = this.index > this.startIndex, this.buttonRight.node.active = this.index < i.length - 1, this.progressBar.progress < 1 ? this.buttonRecharge.node.getChildByName("Label").getComponent(cc.Label).string = ftc.language("前往充值") : (this.buttonRecharge.node.getChildByName("Label").getComponent(cc.Label).string = ftc.language("领取"), this.buttonRecharge.interactable = this.data.ext == this.index)
                },
                cleanup: function () { },
                updateData: function () {
                    this.startIndex = Number(this.data.ext), this.selectGift(this.startIndex)
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonLeft.node ? this.selectGift(this.index - 1) : t.target === this.buttonRight.node ? this.selectGift(this.index + 1) : t.target === this.buttonRecharge.node && (this.progressBar.progress < 1 ? ftc.openBuyGem() : ftc.send("msgActivityGet", {
                        eid: this.data.entityId
                    }))
                }
            })
        