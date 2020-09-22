
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    labelDeadline: cc.Label,
                    buttonDetail: cc.Button,
                    progressBar: cc.ProgressBar,
                    labelProgress: cc.Label,
                    nodeBoxes: [cc.Node],
                    buttonBoxes: [cc.Button],
                    labelBoxes: [cc.Label],
                    labelPrice1: cc.Label,
                    buttonTurn1: cc.Button,
                    labelPrice2: cc.Label,
                    buttonTurn10: cc.Button,
                    labelLampNum: cc.Label,
                    spriteLamp: cc.Sprite,
                    spriteIcon1: cc.Sprite,
                    spriteIcon2: cc.Sprite,
                    spineAni: sp.Skeleton
                },
                init: function () {
                    for (var t = 0; t < this.buttonBoxes.length; t++) this.addClick(this.buttonBoxes[t]);
                    this.buttonDetail && this.addClick(this.buttonDetail), this.addClick(this.buttonTurn1), this.addClick(this.buttonTurn10), this.spineAni.setCompleteListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || this.result && (0 == this.data.ui || 103 == this.data.ui ? (this.spriteLamp.node.active = !1, ftc.showTip(ftc.language("获得") + ft.ExtItem.getName(this.result[0]) + "X" + this.result[1]), this.updateActivityInfo(), this.result = void 0) : 1 == this.data.ui && (this.visitCount++, (0 === this.type || this.visitCount >= 5) && (this.spineAni.setAnimation(0, "w1", !0), this.spineAni.timeScale = 1, ftc.showTip(ftc.language("获得") + ft.ExtItem.getName(this.result[0]) + "X" + this.result[1]), this.updateActivityInfo(), this.result = void 0, this.type = void 0, this.visitCount = 0, ftc.cancelTop())))
                    }.bind(this))
                },
                load: function () {
                    this.type = void 0, this.result = void 0, this.visitCount = 0, this.spriteLamp && (this.spriteLamp.node.active = !1)
                },
                setData: function (t) {
                    this.data = t, this.buttonDetail.node.active = this.data.txt && this.data.txt.length > 0, this.activity = ft.ExtMsg.getActivityData(this.data);
                    for (var e = 0; e < this.activity.extNeedUseNums.length; e++) this.labelBoxes[e].string = this.activity.extNeedUseNums[e];
                    this.updateActivityInfo(), 111 == this.data.ui ? (this.spriteIcon1.spriteFrame = ft.ExtItem.getLittleIconSprite(this.activity.consumeId), this.spriteIcon2.spriteFrame = ft.ExtItem.getLittleIconSprite(this.activity.consumeId), this.spineAni.setAnimation(0, "w1", !0)) : (this.labelPrice1.string = this.activity.consumeNum1, this.labelPrice2.string = this.activity.consumeNum2), this.updateDate(), ftc.isTv() && (this.buttonDetail.node.active = !1)
                },
                tick: function (t) { },
                cleanup: function () { },
                updateData: function (t) {
                    this.data && (void 0 !== t ? 0 === this.type ? (111 == this.data.ui ? this.spineAni.setAnimation(0, "wait4") : (this.spineAni.setAnimation(0, "wait2"), this.type = void 0), this.result = t) : 1 === this.type ? (111 == this.data.ui ? (this.spineAni.setAnimation(0, "wait4", !0), this.spineAni.timeScale = 5) : (this.spineAni.setAnimation(0, "wait2"), this.type = void 0), this.result = t) : this.updateActivityInfo() : this.updateActivityInfo(), this.updateDate())
                },
                updateDate: function () {
                    this.labelDeadline.string = ftc.language("剩余时间: ") + ftc.calcTimeDelta(void 0, this.data.date1)
                },
                updateActivityInfo: function () {
                    var t = this.activity.extNeedUseNums[this.activity.extNeedUseNums.length - 1],
                        e = Number(this.data.ext);
                    this.progressBar.progress = e / t, this.labelProgress.string = e;
                    var i = ft.ExtItem.getNum(this.activity.consumeId);
                    this.labelLampNum.string = i, 0 == this.data.ui || 103 == this.data.ui ? (this.labelPrice1.node.parent.active = i < 1, this.labelPrice2.node.parent.active = i < 10) : this.data.ui;
                    var a = this.data.ste.split(",");
                    this.boxStes = [];
                    for (var n = 0, s = this.activity.extNeedUseNums.length; n < s; n++) {
                        this.nodeBoxes[n].active = !0;
                        var o = this.progressBar.node.width * (this.activity.extNeedUseNums[n] / t);
                        this.buttonBoxes[n].node.x = o, this.labelBoxes[n].node.parent.x = o, this.buttonBoxes[n].node.stopAllActions(), this.buttonBoxes[n].node.scale = 1, this.buttonBoxes[n].interactable = !0, 1 == a[n] ? (this.boxStes.push(2), this.buttonBoxes[n].interactable = !1) : this.data.ext >= this.activity.extNeedUseNums[n] ? (this.boxStes.push(1), this.buttonBoxes[n].node.runAction(cc.sequence(cc.scaleTo(.5, 1.2), cc.scaleTo(.5, 1)).repeatForever())) : this.boxStes.push(0)
                    }
                    for (n = this.activity.extNeedUseNums.length; n < this.buttonBoxes.length; n++) this.nodeBoxes[n].active = !1
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonDetail.node) ftc.showDetailInfo(this.buttonDetail.node, this.data.txt);
                    else if (t.target === this.buttonTurn1.node) {
                        var i = ft.ExtItem.getNum(this.activity.consumeId);
                        0 == this.data.ui || 103 == this.data.ui ? i >= 1 || this.activity.consumeNum1 > 0 && ft.ExtItem.getGem() >= this.activity.consumeNum1 ? (this.type = 0, this.spriteLamp.node.active = !0, i >= 1 || ftc.mapDialogNoTip[ftc.type.dialogNoTip.ccjj] ? ftc.send("msgActivityGet", {
                            eid: this.data.entityId,
                            type: 0
                        }) : ftc.showDialog({
                            text: ftc.language("确定消耗") + ft.ExtItem.getName(ft.value.item.gem) + "*" + this.activity.consumeNum1 + ftc.language("草船借箭1次"),
                            click1: function () {
                                ftc.send("msgActivityGet", {
                                    eid: this.data.entityId,
                                    type: 0
                                })
                            }.bind(this),
                            click2: function () { },
                            noTip: ftc.type.dialogNoTip.ccjj
                        })) : ftc.showTip("元宝不足") : 1 == this.data.ui && (i >= 1 ? (this.type = 0, ftc.send("msgActivityGet", {
                            eid: this.data.entityId,
                            type: 0
                        }), ftc.showTop()) : ftc.showTip(ft.ExtItem.getName(this.activity.consumeId) + "不足"))
                    } else if (t.target === this.buttonTurn10.node) {
                        i = ft.ExtItem.getNum(this.activity.consumeId);
                        0 == this.data.ui || 103 == this.data.ui ? i >= 10 || ft.ExtItem.getGem() >= this.activity.consumeNum2 ? (this.type = 1, this.spriteLamp && (this.spriteLamp.node.active = !0), i >= 10 || ftc.mapDialogNoTip[ftc.type.dialogNoTip.ccjj] ? ftc.send("msgActivityGet", {
                            eid: this.data.entityId,
                            type: 1
                        }) : ftc.showDialog({
                            text: ftc.language("确定消耗") + ft.ExtItem.getName(ft.value.item.gem) + "*" + this.activity.consumeNum2 + ftc.language("草船借箭10次"),
                            click1: function () {
                                ftc.send("msgActivityGet", {
                                    eid: this.data.entityId,
                                    type: 1
                                })
                            }.bind(this),
                            click2: function () { },
                            noTip: ftc.type.dialogNoTip.ccjj
                        })) : ftc.showTip("元宝不足") : 1 == this.data.ui && (i >= 10 ? (this.type = 1, ftc.send("msgActivityGet", {
                            eid: this.data.entityId,
                            type: 1
                        }), ftc.showTop()) : ftc.showTip(ft.ExtItem.getName(this.activity.consumeId) + "不足"))
                    } else
                        for (var a = 0; a < this.buttonBoxes.length; a++)
                            if (t.target === this.buttonBoxes[a].node) {
                                2 === this.boxStes[a] ? ftc.showTip("已领取") : 1 === this.boxStes[a] ? (this.type = 2, ftc.send("msgActivityGet", {
                                    eid: this.data.entityId,
                                    index: a,
                                    type: 2
                                })) : ftc.loadLayout("LayoutAwardPreview", function (t) {
                                    t.setData({
                                        ids: this.activity.extId2s[a],
                                        nums: this.activity.extNum2s[a]
                                    })
                                }.bind(this));
                                break
                            }
                }
            })
        