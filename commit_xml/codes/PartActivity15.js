
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeLayout: cc.Node,
                    spineHero: sp.Skeleton,
                    spriteDesc: cc.Sprite,
                    buttonRecharge: cc.Button,
                    labelTime: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonRecharge)
                },
                load: function () {
                    this.tickAdd = 0
                },
                setData: function (t) {
                    this.data = t;
                    for (var e = this.nodeLayout.children.length - 1; e >= 0; e--) ftc.ManagerRes.restoreNode(this.nodeLayout.children[e]);
                    this.activity = ft.ExtMsg.getActivityData(this.data);
                    var i = this.activity.items[0].id2s,
                        a = this.activity.items[0].num2s;
                    for (e = 0; e < i.length; e++)
                        if (0 === e) {
                            var n = ft.ExtItem.getHero(i[0]);
                            (s = this.newPart("PartItem")).setData(i[0], a[0]), this.nodeLayout.addChild(s.node), this.loadResource(ft.ExtHero.getSpineRes(n), sp.SkeletonData, function (t) {
                                t && (this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "w1", !0))
                            }.bind(this), this)
                        } else {
                            var s;
                            (s = this.newPart("PartItem")).setData(i[e], a[e], !0), s.setNameColor(cc.Color.WHITE), this.nodeLayout.addChild(s.node)
                        } this.updateData(), this.updateRemainingTime()
                },
                cleanup: function () { },
                updateData: function () {
                    this.activity && (this.buttonRecharge.node.getChildByName("Label").getComponent(cc.Label).string = ft.ExtItem.getGem() < this.activity.items[0].price ? ftc.language("\u524d\u5f80\u5145\u503c") : "\u8d2d\u4e70\u793c\u5305")
                },
                tick: function (t) {
                    this.tickAdd += t, this.tickAdd >= 1 && (this.updateRemainingTime(), this.tickAdd = 0)
                },
                updateRemainingTime: function (t) {
                    var e = this.data.ext - ft.getSysSecond(),
                        i = ft.prefixZeroTime(Math.floor(e / 3600)),
                        a = ft.prefixZeroTime(Math.floor(e / 60 % 60)),
                        n = ft.prefixZeroTime(e % 60);
                    this.labelTime.string = ftc.language("\u5269\u4f59\u65f6\u95f4") + i + ":" + a + ":" + n
                },
                onClick: function (t, e) {
                    t.target === this.buttonRecharge.node && (ft.ExtItem.getGem() >= this.activity.items[0].price ? ftc.send("msgActivityGet", {
                        eid: this.data.entityId
                    }) : ftc.openBuyGem())
                }
            })
        