
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    labelDate: cc.Label,
                    buttonDetail: cc.Button,
                    nodeLayoutAward: cc.Node,
                    buttonEnter: cc.Button,
                    buttonGet: cc.Button,
                    spineHero: sp.Skeleton,
                    buttonAchievement: cc.Button,
                    buttonExchange: cc.Button,
                    spriteRedPoint: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonDetail), this.addClick(this.buttonEnter), this.addClick(this.buttonGet), this.buttonAchievement && this.addClick(this.buttonAchievement), this.buttonExchange && this.addClick(this.buttonExchange)
                },
                load: function () {
                    this.spineHero.setCompleteListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "ready" == (t.animation ? t.animation.name : "") && (this.spineHero.setAnimation(0, "w1", !0), this.spineHero.addAnimation(0, "ready", !1, 3))
                    }.bind(this)), this.partItems = [], this.spineHero.node.scaleX = 1, this._tickDate = 0
                },
                setData: function (t) {
                    this.data = t;
                    var e, i = JSON.parse(this.data.base);
                    this.activity = i;
                    for (var a = 0; a < i.ids.length; a++) {
                        var n = this.newPart("PartItem");
                        n.node.scale = .7, n.setData(i.ids[a], i.nums[a]), this.nodeLayoutAward.addChild(n.node), this.partItems.push(n)
                    }
                    this.updateDate(), this.updateData(), this.spineHero.node.scaleX = 1, i.copyId == ft.value.copy.CZDA ? (e = "spine/role/1095", this.spineHero.node.scaleX = -1) : i.copyId == ft.value.copy.TFDZ ? e = "spine/role/1098" : i.copyId == ft.value.copy.PDJD ? e = "spine/role/1090" : i.copyId == ft.value.copy.SBBZ ? (e = "spine/role/1077", this.spineHero.node.scaleX = -1) : i.copyId == ft.value.copy.LSHY && (e = "spine/role/1036", this.spineHero.node.scaleX = -1), this.loadResource(e, sp.SkeletonData, function (t) {
                        t && (this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "w1", !0), this.spineHero.addAnimation(0, "ready", !1, 3))
                    }.bind(this), this), this.buttonDetail.node.active = this.data.txt && this.data.txt.length > 0, ftc.isTv() && (this.buttonDetail.node.active = !1), this.buttonExchange && (this.buttonExchange.node.active = this.activity.activityId > 0)
                },
                cleanup: function () { },
                updateData: function () {
                    if (this.data) {
                        if (this.buttonEnter.node.active = !1, this.buttonGet.node.active = !1, 0 == this.data.ste) {
                            var t = this.activity.countId;
                            ft.ExtItem.getNum(t) > this.data.ext ? this.buttonGet.node.active = !0 : this.buttonEnter.node.active = !0;
                            for (var e = 0; e < this.partItems.length; e++) this.partItems[e].setStatus(0)
                        } else {
                            this.buttonEnter.node.active = !0;
                            for (e = 0; e < this.partItems.length; e++) this.partItems[e].setStatus(1)
                        }
                        this.activity.copyId === ft.value.copy.SBBZ ? this.spriteRedPoint.node.active = ft.ExtAchievement.hasAchievementComplete(ft.type.achievement.copySBBZ) : this.activity.copyId === ft.value.copy.LSHY ? this.spriteRedPoint.node.active = ft.ExtAchievement.hasAchievementComplete(ft.type.achievement.copyLSHY) : this.activity.copyId === ft.value.copy.QJQC && this.spriteRedPoint && (this.spriteRedPoint.node.active = ft.ExtAchievement.hasAchievementComplete(ft.type.achievement.copyQJQC)), this.updateDate()
                    }
                },
                updateDate: function () {
                    this.labelDate.string = ftc.language("\u5269\u4f59\u65f6\u95f4: ") + ftc.calcTimeDelta(void 0, this.data.date1)
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonDetail.node ? ftc.showDetailInfo(this.buttonDetail.node, this.data.txt) : t.target === this.buttonEnter.node ? ft.ExtMap.getType(ftc.ManagerData.get1("ManagerMap").cur) !== ft.type.map.normal ? ftc.showTip("\u8bf7\u5148\u79bb\u5f00\u5f53\u524d\u526f\u672c") : ftc.send("copyEnter", {
                        id: this.activity.copyId
                    }) : t.target === this.buttonGet.node ? ftc.send("msgActivityGet", {
                        eid: this.data.entityId
                    }) : this.buttonAchievement && t.target === this.buttonAchievement.node ? ftc.loadLayout("LayoutCopyAchievement", function (t) {
                        t.setData(this.activity.copyId)
                    }.bind(this)) : this.buttonExchange && t.target === this.buttonExchange.node && (this.activity.activityId ? ftc.sendClient("c_onSelectActivity", this.activity.activityId) : ftc.showTip("\u6682\u65e0\u5151\u6362"))
                }
            })
        