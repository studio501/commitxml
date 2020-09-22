
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    nodeRoot: cc.Node,
                    buttonDetail: cc.Button,
                    labelTip: cc.Label,
                    labelTime: cc.Label,
                    labelCount: cc.Label,
                    nodeLayout: cc.Node,
                    spineBox: sp.Skeleton,
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
                    buttonClose: cc.Button
                },
                init: function () {
                    this.prepareParts(["PartActivity1004_1"]), this.addClick(this.buttonCharge), this.addClick(this.buttonGet), this.addClick(this.buttonDetail), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose, this.node)
                },
                load: function () {
                    ftc.setTvTip(this.node), this.spineBox.setEventListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || e.data.name && ftc.loadLayout("LayoutDialogTip8", function (t) {
                            for (var e = this.msgMoonlight.ste.split(","), i = [], a = 0; a < this.activity.getCounts.length; a++) e[a] || (e[a] = 0), i.push(this.activity.getCounts[a] - Number(e[a]));
                            t.setData({
                                ids: this.activity.getIds,
                                nums: this.activity.getNums,
                                times: i
                            }, function (t) {
                                ftc.send("msgActivityGet", {
                                    eid: this.msgMoonlight.entityId,
                                    type: 1,
                                    index: t
                                })
                            }.bind(this))
                        }.bind(this))
                    }.bind(this)), this.msgMoonlight = void 0, this.activity = void 0, this.partActivity = void 0, this.isOpening = !1, this.setData()
                },
                setData: function (t) {
                    var e = ft.ExtMsg.getMsgByType(ft.type.activity.moonlightBox);
                    if (e) {
                        this.msgMoonlight = e, this.activity = ft.ExtMsg.getActivityData(this.msgMoonlight);
                        var i = ftc.ManagerData.get2Object("Msg", this.activity.activityId);
                        if (i) {
                            var a = this.newPart("PartActivity1004", "PartActivity1004_1");
                            a.setData(i), a.node.position = cc.v2(250, -20), this.nodeRoot.addChild(a.node), this.partActivity = a
                        }
                        for (var n = 0; n < this.activity.getIds.length; n++) {
                            var s = this.newPart("PartItem");
                            s.setData(this.activity.getIds[n], this.activity.getNums[n], !0), this.nodeLayout.addChild(s.node)
                        }
                        this.spriteIcon.spriteFrame = ft.ExtItem.getLittleIconSprite(this.activity.chargeNeedId), this.spriteIcon2.spriteFrame = ft.ExtItem.getLittleIconSprite(this.activity.chargeNeedId), this.labelNeedNum.string = this.activity.chargeNeedNum, this.msgMoonlight.ext >= this.activity.chargeMax ? this.spineBox.setAnimation(0, "wait6", !0) : this.spineBox.setAnimation(0, "wait1", !0), this.updateData(), this.buttonDetail.node.active = this.msgMoonlight.txt && this.msgMoonlight.txt.length > 0, ftc.isTv() && (this.buttonDetail.node.active = !1)
                    } else this.cancel()
                },
                enter: function () { },
                updateData: function () {
                    if (this.msgMoonlight) {
                        var t = new Date(1e3 * ftc.getLocalTime()),
                            e = this.msgMoonlight.date1;
                        e = e.replace(/\-/g, "/");
                        var i, a = new Date(e),
                            n = this.intervalTime(t, a);
                        i = n.days > 0 ? n.days + "天" + n.hours + "小时" : n.hours > 0 ? n.hours + "小时" + n.minutes + "分钟" : n.minutes > 0 ? n.minutes + "分钟" : "无", this.labelTime.string = "剩余时间:" + i;
                        for (var s = this.activity.getCountMax, o = 0, r = this.msgMoonlight.ste.split(","), c = 0; c < r.length; c++) r[c] && r[c] > 0 && (o += Number(r[c]));
                        var h = s - o;
                        this.labelCount.string = "剩余次数:" + h, this.nodeActivity.active = h > 0, this.spriteGet.node.active = 0 == h, h > 0 ? (this.progressBar.progress = this.msgMoonlight.ext / this.activity.chargeMax, this.labelProgress.string = this.msgMoonlight.ext + "/" + this.activity.chargeMax, this.labelNum.string = ft.ExtItem.getNum(this.activity.chargeNeedId), this.buttonCharge.node.active = this.progressBar.progress < 1, this.buttonGet.node.active = !this.buttonCharge.node.active, this.buttonCharge.node.active || ftc.ManagerTV.getSelectButton() == this.buttonCharge && ftc.ManagerTV.updateSelect(this.node), this.buttonGet.node.active || ftc.ManagerTV.getSelectButton() == this.buttonGet && ftc.ManagerTV.updateSelect(this.node)) : this.spineBox.setAnimation(0, "wait3", !0)
                    }
                },
                intervalTime: function (t, e) {
                    var i = e.getTime() - t.getTime(),
                        a = i % 864e5,
                        n = a % 36e5,
                        s = n % 6e4;
                    return {
                        days: Math.floor(i / 864e5),
                        hours: Math.floor(a / 36e5),
                        minutes: Math.floor(n / 6e4),
                        seconds: Math.round(s / 1e3)
                    }
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        msgActivityGet: function (t, e) {
                            if (t.eid === this.msgMoonlight.entityId) this.isOpening = !1, t.mutil > 1 ? (ftc.showTip("充能暴击 x" + t.mutil), this.spineBox.setAnimation(0, "wait5")) : this.spineBox.setAnimation(0, "wait4"), this.msgMoonlight.ext >= this.activity.chargeMax ? this.spineBox.addAnimation(0, "wait6", !0) : this.spineBox.addAnimation(0, "wait1", !0), this.updateData(), this.partActivity && this.partActivity.updateData();
                            else {
                                var i = this.partActivity;
                                i && (-1 === t.ret ? ftc.showTip("领取失败") : 0 === t.ret && (i.updateData(t.index), this.updateData()))
                            }
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.buttonDetail.node ? ftc.showDetailInfo(this.buttonDetail.node, this.msgMoonlight.txt) : t.target === this.buttonCharge.node ? ft.ExtItem.getNum(this.activity.chargeNeedId) < this.activity.chargeNeedNum ? ftc.showTip(ft.ExtItem.getName(this.activity.chargeNeedId) + "不足") : this.isOpening ? ftc.showTip("充能中...") : (this.isOpening = !0, ftc.send("msgActivityGet", {
                        eid: this.msgMoonlight.entityId,
                        type: 0
                    })) : t.target === this.buttonGet.node ? this.isOpening ? ftc.showTip("开启中...") : (this.isOpening = !0, this.spineBox.setAnimation(0, "wait2")) : t.target === this.buttonClose.node && this.cancel()
                }
            })
        