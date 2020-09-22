
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    buttonDetail: cc.Button,
                    spriteTurntable: cc.Sprite,
                    labelDeadline: cc.Label,
                    spriteIcon: cc.Sprite,
                    labelNum: cc.Label,
                    progressBar: cc.ProgressBar,
                    labelProgress: cc.Label,
                    buttonBoxes: [cc.Button],
                    labelBoxes: [cc.Label],
                    buttonTurn: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonDetail), this.addClick(this.buttonTurn);
                    for (var t = 0; t < this.buttonBoxes.length; t++) this.addClick(this.buttonBoxes[t])
                },
                load: function () {
                    this.initTurntable()
                },
                initTurntable: function () {
                    this.awardItems = [];
                    for (var t = 0; t < 8; t++) {
                        var e = this.newPart("PartItem");
                        e.node.position = cc.v2(160 * Math.sin(t * (-Math.PI / 4)), 160 * Math.cos(t * (-Math.PI / 4))), e.node.angle = 45 * t, e.node.scale = .9, this.spriteTurntable.node.addChild(e.node), this.awardItems.push(e)
                    }
                },
                setData: function (t) {
                    this.resetTurntable(), this.data = t, this.activity = ft.ExtMsg.getActivityData(this.data);
                    for (var e = 0; e < this.awardItems.length; e++) this.awardItems[e].setData(this.activity.ids[e], this.activity.nums[e]);
                    this.updateDate(), this.updateData(), this.buttonDetail.node.active = this.data.txt && this.data.txt.length > 0, ftc.isTv() && (this.buttonDetail.node.active = !1)
                },
                resetTurntable: function () {
                    this.result = -1, this.spriteTurntable.node.angle = 0, this.turning = !1
                },
                setResult: function (t) {
                    for (var e = -1, i = 0; i < this.awardItems.length; i++) {
                        var a = this.awardItems[i];
                        if (a.getData().id == t[0] && a.getData().num == t[1]) {
                            e = i;
                            break
                        }
                    }
                    if (-1 !== e) {
                        var n = 360 * (Math.floor(3 * Math.random()) + 3) + 45 * e + 35 * Math.random() - 17.5;
                        this.spriteTurntable.node.angle = 0;
                        var s = [cc.rotateBy(5, n).easing(cc.easeSineOut()), cc.delayTime(.5), cc.callFunc(function () {
                            this.turning = !1, this.buttonTurn.interactable = !0, ftc.cancelTop(), ftc.loadLayout("LayoutAwardGoods", function (e) {
                                e.setData([t])
                            }), this.updateData()
                        }.bind(this))];
                        this.spriteTurntable.node.runAction(cc.sequence(s)), this.turning = !0, this.buttonTurn.interactable = !1, ftc.showTop()
                    }
                },
                cleanup: function () { },
                updateData: function (t) {
                    if (void 0 !== t) this.setResult(t);
                    else {
                        var e, i;
                        ft.ExtItem.getNum(ft.value.item.turntableTicket) > 0 ? (e = ft.value.item.turntableTicket, i = ft.ExtItem.getNum(ft.value.item.turntableTicket) + "/1") : (e = this.activity.consumeId, i = this.activity.consumeNum), this.spriteIcon.spriteFrame = ft.ExtItem.getLittleIconSprite(e), this.labelNum.string = i + "/" + ft.ExtItem.getNum(e);
                        var a = this.activity.extNeedUseNums[this.activity.extNeedUseNums.length - 1];
                        this.progressBar.progress = Number(this.data.ext) / a, this.labelProgress.string = Number(this.data.ext) + "/" + a;
                        var n = this.data.ste.split(",");
                        this.boxStes = [];
                        for (var s = 0, o = this.activity.extNeedUseNums.length; s < o; s++) this.buttonBoxes[s].node.active = !0, this.buttonBoxes[s].node.x = this.progressBar.node.width * (this.activity.extNeedUseNums[s] / a), this.buttonBoxes[s].node.stopAllActions(), this.buttonBoxes[s].node.scale = 1, this.buttonBoxes[s].interactable = !0, 1 == n[s] ? (this.boxStes.push(2), this.buttonBoxes[s].interactable = !1) : this.data.ext >= this.activity.extNeedUseNums[s] ? (this.boxStes.push(1), this.buttonBoxes[s].node.runAction(cc.sequence(cc.scaleTo(.5, 1.2), cc.scaleTo(.5, 1)).repeatForever())) : this.boxStes.push(0), this.labelBoxes[s].node.active = !0, this.labelBoxes[s].string = this.activity.extNeedUseNums[s];
                        for (s = this.activity.extNeedUseNums.length; s < this.buttonBoxes.length; s++) this.buttonBoxes[s].node.active = !1, this.labelBoxes[s].node.active = !1
                    }
                    this.updateDate()
                },
                updateDate: function () {
                    this.labelDeadline.string = ftc.calcTimeDelta(void 0, this.data.date1)
                },
                tick: function (t) {
                    this.buttonTurn.interactable = !this.turning
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonDetail.node) ftc.showDetailInfo(this.buttonDetail.node, this.data.txt);
                    else if (t.target === this.buttonTurn.node) this.turning ? ftc.showTip("转动中...") : this.data.ext >= this.activity.max ? ftc.showTip("转盘次数已达上限") : ft.ExtItem.getNum(ft.value.item.turntableTicket) > 0 ? ftc.send("msgActivityGet", {
                        eid: this.data.entityId,
                        type: 0
                    }) : ft.ExtItem.getNum(this.activity.consumeId) < this.activity.consumeNum ? ftc.showTip(ft.ExtItem.getName(this.activity.consumeId) + ftc.language("不足")) : ftc.mapDialogNoTip[ftc.type.dialogNoTip.turntable] ? ftc.send("msgActivityGet", {
                        eid: this.data.entityId,
                        type: 0
                    }) : ftc.showDialog({
                        text: ftc.language("确定消耗") + ft.ExtItem.getName(this.activity.consumeId) + "*" + this.activity.consumeNum + ftc.language("使用1次转盘"),
                        click1: function () {
                            ftc.send("msgActivityGet", {
                                eid: this.data.entityId,
                                type: 0
                            })
                        }.bind(this),
                        click2: function () { },
                        noTip: ftc.type.dialogNoTip.turntable
                    });
                    else
                        for (var i = 0; i < this.buttonBoxes.length; i++)
                            if (t.target === this.buttonBoxes[i].node) {
                                2 === this.boxStes[i] ? ftc.showTip("已领取") : 1 === this.boxStes[i] ? ftc.send("msgActivityGet", {
                                    eid: this.data.entityId,
                                    index: i,
                                    type: 1
                                }) : ftc.loadLayout("LayoutAwardPreview", function (t) {
                                    t.setData({
                                        ids: this.activity.extId2s[i],
                                        nums: this.activity.extNum2s[i]
                                    })
                                }.bind(this));
                                break
                            }
                }
            })
        