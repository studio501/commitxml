
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    buttonDetail: cc.Button,
                    spineHero: sp.Skeleton,
                    labelDate: cc.Label,
                    nodeLayout: cc.Node,
                    labelSkill: cc.Label,
                    buttonEnter: cc.Button,
                    buttonAchievement: cc.Button,
                    buttonExchange: cc.Button,
                    spriteRedPoint: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonDetail), this.addClick(this.buttonEnter), this.addClick(this.buttonAchievement), this.addClick(this.buttonExchange)
                },
                load: function () {
                    this.data = void 0
                },
                setData: function (t) {
                    this.data = t;
                    var e = ft.ExtMsg.getActivityData(this.data);
                    this.activity = e, this.updateDate(), ftc.ManagerRes.restoreNodeChildren(this.nodeLayout);
                    for (var i = 0; i < e.heroIds.length; i++) {
                        var a = this.newPart("PartItem");
                        a.node.scale = .7, a.node.position = cc.v2(0, 8), a.setHeroData({
                            id: e.heroIds[i]
                        }, !0), a.setNameColor(cc.Color.WHITE), a.setInteractable(!1), this.nodeLayout.addChild(a.node, i)
                    }
                    this.activity.copyId === ft.value.copy.XSWJ && this.loadResource("spine/role/1096", sp.SkeletonData, function (t) {
                        t && (this.spineHero.node.scaleX = -1, this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "jump"), this.spineHero.addAnimation(0, "w1", !0))
                    }.bind(this), this), this.labelSkill.string = ft.ExtSkill.getInfo(this.activity.skillId), this.updateData(), this.buttonDetail.node.active = this.data.txt && this.data.txt.length > 0, ftc.isTv() && (this.buttonDetail.node.active = !1)
                },
                cleanup: function () { },
                updateData: function () {
                    this.data && (this.spriteRedPoint.node.active = ft.ExtMsg.checkCanGet(this.data), this.updateDate())
                },
                updateDate: function () {
                    this.labelDate.string = ftc.language("剩余时间: ") + ftc.calcTimeDelta(void 0, this.data.date1)
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonDetail.node ? ftc.showDetailInfo(this.buttonDetail.node, this.data.txt) : t.target === this.buttonEnter.node ? ft.ExtMap.getType(ftc.ManagerData.get1("ManagerMap").cur) !== ft.type.map.normal ? ftc.showTip("请先离开当前副本") : ftc.send("copyEnter", {
                        id: this.activity.copyId,
                        param: 0
                    }) : t.target === this.buttonAchievement.node ? ftc.loadLayout("LayoutCopyAchievement", function (t) {
                        t.setData(this.activity.copyId)
                    }.bind(this)) : t.target === this.buttonExchange.node && (this.activity.activityId ? ftc.sendClient("c_onSelectActivity", this.activity.activityId) : ftc.showTip("暂无兑换"))
                }
            })
        