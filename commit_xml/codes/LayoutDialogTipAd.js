
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    labelContent: cc.Label,
                    button2: cc.Button,
                    label2: cc.Label,
                    button1: cc.Button,
                    label1: cc.Label,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.button2), this.addClick(this.button1), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    this.msgData = ft.ExtMsg.getMsgDatas(ft.type.msg.pos.ad, ft.type.activity.watchAd), this.msgData ? (this.labelContent.string = ft.ExtMsg.getTxt(this.msgData), this._watchingAd = !1) : this.cancel()
                },
                setData: function (t) { },
                enter: function () {
                    this.updateData(), ftc.setTvTip(this.node)
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        msgActivityGet: function (t, e) {
                            this.msgData && this.msgData.entityId == t.eid && (-1 === t && ftc.showTip("领取失败"), this._watchingAd = !1, this.cancel())
                        },
                        c_successFullAd: function (t, e) {
                            ftc.ManagerH5.countEvent("8_3"), ftc.send("msgActivityGet", {
                                eid: this.msgData.entityId
                            })
                        }
                    }
                },
                onClick: function (t) {
                    if (t.target === this.button2.node || t.target === this.buttonClose.node) this._watchingAd = !1, this.cancel();
                    else if (t.target === this.button1.node) {
                        var e;
                        ftc.ManagerH5.countEvent("8_2"), ftc.ManagerH5.isH5() ? e = ftc.ManagerH5.showFull(0) : ftc.ManagerH5.isH5() || "1" != ftc.callNativeFunction("openFullAd") || (e = ftc.callNativeFunction("showFull", ft.type.fullAd.main + "")), "1" != e ? ftc.showTip("暂无广告，请稍后再试") : (ftc.watchingAd = !0, cc.audioEngine.pauseAll())
                    }
                }
            })
        