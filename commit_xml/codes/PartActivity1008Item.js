
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    nodeItem: cc.Node,
                    labelName: cc.Label,
                    labelTimes: cc.Label,
                    labelPoints: cc.Label,
                    nodeCondition: cc.Node,
                    labelCondition: cc.Label,
                    nodeSellOut: cc.Node
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                load: function () {
                    this._item = this.newPart("PartItem"), this._item.setInteractable(!1), this.nodeItem.addChild(this._item.node)
                },
                updateData: function (t) {
                    this.param = t, this._item.setData(this.data.id), this.labelName.string = ft.ExtItem.getName(this.data.id) + "x" + this.data.num, this.labelPoints.string = ftc.language("\u6d88\u8017") + this.data.switchNum + ftc.language("\u79ef\u5206"), this.nodeCondition.active = !1, this.buttonSelf.interactable = !0, this.param.pointTotal < this.data.needTotalPoint ? (this.nodeCondition.active = !0, this.buttonSelf.interactable = !1, this.labelCondition.string = ftc.language("\u7d2f\u8ba1") + this.data.needTotalPoint + ftc.language("\u79ef\u5206\u5f00\u542f")) : ft.ExtItem.getRmb() < this.data.needTotalPay && (this.nodeCondition.active = !0, this.buttonSelf.interactable = !1, this.labelCondition.string = ftc.language("\u7d2f\u8ba1") + this.data.needTotalPay + ftc.language("\u989d\u5ea6\u5f00\u542f"));
                    var e = this.param.data.ste.split(",")[this.index];
                    void 0 === e && (e = 0), this.count = this.data.count - e, this.nodeSellOut.active = this.count <= 0, this.labelTimes.string = ftc.language("\u53ef\u5151\u6362\u6b21\u6570:") + this.count + "/" + this.data.count
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.loadLayout("LayoutShop2Buy", function (t) {
                        t.setData({
                            id: this.data.id,
                            num: this.data.num,
                            currency: this.data.switchId,
                            currencyNum: this.data.switchNum,
                            count: this.count
                        }, function (t) {
                            this.param.pointCur < this.data.switchNum * t ? ftc.showTip("\u79ef\u5206\u4e0d\u8db3") : ftc.send("msgActivityGet", {
                                eid: this.param.data.entityId,
                                index: this.index,
                                num: t
                            })
                        }.bind(this))
                    }.bind(this))
                }
            })
        