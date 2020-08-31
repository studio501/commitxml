
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    labelDate: cc.Label,
                    labelCount: cc.Label,
                    spriteTxtTr: cc.Sprite,
                    nodeLayout: cc.Node,
                    buttonGo: cc.Button,
                    spineTree: sp.Skeleton,
                    buttonPreview: cc.Button,
                    spineHero: sp.Skeleton,
                    nodeActivity: cc.Node,
                    progressBar: cc.ProgressBar,
                    labelProgress: cc.Label,
                    buttonCharge: cc.Button,
                    spriteIcon: cc.Sprite,
                    labelNeedNum: cc.Label,
                    buttonGet: cc.Button,
                    spriteIcon2: cc.Sprite,
                    labelNum: cc.Label,
                    spriteGet: cc.Sprite,
                    spriteRedPoint: cc.Sprite,
                    buttonGetWater: cc.Button,
                    buttonDetail: cc.Button
                },
                init: function () {
                    this.buttonPreview ? (this.addClick(this.buttonPreview), this.addClick(this.buttonCharge), this.addClick(this.buttonGet), this.addClick(this.buttonDetail), this.addClick(this.buttonGetWater)) : this.addClick(this.buttonGo), ftc.isTv() && (this.buttonDetail.node.active = !1)
                },
                load: function () {
                    this.spineTree && this.spineTree.setCompleteListener(function (t) {
                        if (!ftc.ManagerRes.checkNodeIsRestored(this.node)) {
                            var e = t.animation ? t.animation.name : "";
                            e && "wait2" === e && (ftc.send("msgActivityGet", {
                                eid: this.data.entityId,
                                type: 0
                            }), this.isOpening = !1)
                        }
                    }.bind(this))
                },
                setData: function (t) {
                    this.data = t;
                    var e = ft.ExtMsg.getActivityData(this.data);
                    this.activity = e, this.labelDate.string = ftc.language("\u5269\u4f59\u65f6\u95f4: ") + ftc.calcTimeDelta(void 0, this.data.date1);
                    for (var i = e.getCountMax, a = 0, n = this.data.ste.split(","), s = 0; s < n.length; s++) n[s] && n[s] > 0 && (a += Number(n[s]));
                    var o = i - a;
                    if (this.labelCount.string = ftc.language("\u5269\u4f59\u6b21\u6570:") + o, 0 == this.data.ui) {
                        ftc.ManagerRes.restoreNodeChildren(this.nodeLayout);
                        for (s = 0; s < e.showIds.length; s++) {
                            var r = this.newPart("PartItem");
                            r.setData(e.showIds[s], e.showNums[s]), this.nodeLayout.addChild(r.node)
                        }
                        this.buttonGo.interactable = o > 0, this.spriteTxtTr.node.active = "tr" == ftc.ManagerLan.getLanguage()
                    } else 1 == this.data.ui && (this.nodeActivity.active = o > 0, this.spriteGet.node.active = 0 == o, this.buttonDetail.node.active = this.data.txt && this.data.txt.length, this.nodeActivity.active && (this.spriteIcon.spriteFrame = ft.ExtItem.getLittleIconSprite(this.activity.chargeNeedId), this.spriteIcon2.spriteFrame = ft.ExtItem.getLittleIconSprite(this.activity.chargeNeedId), this.labelNeedNum.string = this.activity.chargeNeedNum), this.loadResource("spine/npc/npc_2548", sp.SkeletonData, function (t) {
                        t && (this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "wait4", !0))
                    }.bind(this)), this.msgConsume = ftc.ManagerData.get2Object("Msg", this.activity.activityId), this.updateData())
                },
                cleanup: function () { },
                updateData: function (t) {
                    this.updateDate();
                    for (var e = this.activity.getCountMax, i = 0, a = this.data.ste.split(","), n = 0; n < a.length; n++) a[n] && a[n] > 0 && (i += Number(a[n]));
                    var s = e - i;
                    this.labelCount.string = ftc.language("\u5269\u4f59\u6b21\u6570:") + s, 0 == this.data.ui ? this.buttonGo.interactable = s > 0 : 1 == this.data.ui && (this.spriteRedPoint.node.active = ft.ExtMsg.checkCanGet(this.msgConsume), this.nodeActivity.active = s > 0, this.spriteGet.node.active = 0 == s, s > 0 && (this.progressBar.progress = this.data.ext / this.activity.chargeMax, this.labelProgress.string = this.data.ext + "/" + this.activity.chargeMax, this.labelNum.string = ft.ExtItem.getNum(this.activity.chargeNeedId), this.buttonCharge.node.active = this.progressBar.progress < 1, this.buttonGet.node.active = !this.buttonCharge.node.active, this.buttonCharge.node.active || ftc.ManagerTV.getSelectButton() == this.buttonCharge && ftc.ManagerTV.updateSelect(this.node), this.buttonGet.node.active || ftc.ManagerTV.getSelectButton() == this.buttonGet && ftc.ManagerTV.updateSelect(this.node), t && t.mutil ? (t.mutil > 1 && ftc.showTip("\u6d47\u6c34 x" + t.mutil), this.data.ext >= this.activity.chargeMax ? (this.spineTree.setAnimation(0, "wait3"), this.spineTree.addAnimation(0, "wait4", !0)) : this.spineTree.setAnimation(0, "wait1", !0)) : this.data.ext >= this.activity.chargeMax ? (this.spineTree.animation = "wait4", this.spineTree.loop = !0) : this.spineTree.setAnimation(0, "wait1", !0)))
                },
                updateDate: function () {
                    this.isOpening = !1, this.labelDate.string = ftc.language("\u5269\u4f59\u65f6\u95f4: ") + ftc.calcTimeDelta(void 0, this.data.date1)
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    0 == this.data.ui ? t.target === this.buttonGo.node && ftc.loadLayout("LayoutActivityMoonlight") : 1 == this.data.ui && (t.target === this.buttonPreview.node ? ftc.loadLayout("LayoutAwardPreview", function (t) {
                        t.setData({
                            ids: this.activity.getIds,
                            nums: this.activity.getNums
                        })
                    }.bind(this)) : t.target === this.buttonCharge.node ? ft.ExtItem.getNum(this.activity.chargeNeedId) < this.activity.chargeNeedNum ? ftc.showTip(ft.ExtItem.getName(this.activity.chargeNeedId) + "\u4e0d\u8db3") : this.isOpening ? ftc.showTip("\u6d47\u6c34\u4e2d...") : (this.isOpening = !0, this.spineTree.setAnimation(0, "wait2")) : t.target === this.buttonGet.node ? ftc.loadLayout("LayoutDialogTip8", function (t) {
                        for (var e = this.data.ste.split(","), i = [], a = 0; a < this.activity.getCounts.length; a++) e[a] || (e[a] = 0), i.push(this.activity.getCounts[a] - Number(e[a]));
                        t.setData({
                            ids: this.activity.getIds,
                            nums: this.activity.getNums,
                            times: i
                        }, function (t) {
                            ftc.send("msgActivityGet", {
                                eid: this.data.entityId,
                                type: 1,
                                index: t
                            })
                        }.bind(this))
                    }.bind(this)) : t.target === this.buttonGetWater.node ? ftc.loadLayout("LayoutActivityConsume", function (t) {
                        t.setData(this.msgConsume)
                    }.bind(this)) : t.target === this.buttonDetail.node && ftc.showDetailInfo(this.buttonDetail.node, this.data.txt))
                }
            })
        