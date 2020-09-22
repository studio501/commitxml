
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonSelf: cc.Button,
                    spineLevelUp: sp.Skeleton,
                    nodeAni: cc.Node,
                    spriteGrade: cc.Sprite,
                    labelDifficult: cc.Label,
                    labelScore: cc.Label,
                    labelOutput: cc.Label,
                    nodeLayoutAward: cc.Node,
                    buttonDetail: cc.Button
                },
                init: function () {
                    this.prepareParts(["PartItemShine"]), this.addClick(this.buttonSelf), this.addClick(this.buttonDetail)
                },
                load: function () {
                    this.spineLevelUp.setEventListener(function (t, e) {
                        "player_shengji" === e.data.name && (this.itemShine && this.itemShine.playAnimation(), this.nodeAni.runAction(cc.fadeIn(.5)))
                    }.bind(this)), this.spineLevelUp.setCompleteListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "wait2" === (t.animation ? t.animation.name : "") && (this.canClose = !0)
                    }.bind(this)), this.canClose = !1, this.nodeAni.opacity = 1, this.callback = void 0, this.itemShine = void 0, this.award = void 0
                },
                setData: function (t) {
                    this.spineLevelUp.setAnimation(0, "wait1"), this.spineLevelUp.addAnimation(0, "wait2", !0);
                    var e = ft.ExtCopy.getAchievements(ftc.ManagerData.get2Object("Achievement")),
                        i = ft.ExtCopy.getAchievementScore(e);
                    if (i > 0) {
                        var a = ft.ExtCopy.getAchievementGrade(i),
                            n = ft.ExtCopy.getCopy(ft.value.copy.XSWJ),
                            s = n.ste - 1;
                        this.labelDifficult.string = ["简单", "普通", "困难", "地狱", "深渊"][s], this.labelDifficult.getComponent(cc.LabelOutline).color = ftc.newColor([1362281, 412567, 6628550, 13590528, 8458563][s]), this.labelScore.string = i;
                        var o = "copy_grade_" + a;
                        this.spriteGrade.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", o), this.labelOutput.string = Number(n.ext) + "/" + ft.value.com.yearPictureMax, n.ext < ft.value.com.yearPictureMax ? this.labelOutput.node.color = ftc.newColor(65280) : this.labelOutput.node.color = ftc.newColor(16711680)
                    }
                    if (ftc.ManagerRes.restoreNodeChildren(this.nodeLayoutAward), t && t.length > 0) {
                        for (var r = [], c = [], h = 0; h < t.length; h++) {
                            var f = t[h][0];
                            ft.ExtItem.getType(f) === ft.type.item.base && f !== ft.value.item.exp || ft.ExtItem.getType(f) === ft.type.item.task || (r.push(f), c.push(t[h][1]))
                        }
                        this.award = {
                            ids: r,
                            nums: c
                        }, this.addAward()
                    }
                },
                enter: function () { },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                addAward: function () {
                    if (this.award)
                        for (var t = 0, e = this.award.ids.length; t < e; t++) {
                            var i = this.newPart("PartItemShine");
                            this.itemShine = i, this.itemShine.setData({
                                id: this.award.ids[t],
                                num: this.award.nums[t]
                            }), this.nodeLayoutAward.addChild(i.node, t)
                        }
                },
                setCallback: function (t) {
                    this.callback = t
                },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node ? this.canClose && (this.callback && this.callback(), this.cancel()) : t.target === this.buttonDetail.node && ftc.loadLayout("LayoutCopyGradeDetail")
                }
            })
        