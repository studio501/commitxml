
            
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
                    this.param = t, this._item.setData(this.data.id), this.labelName.string = ft.ExtItem.getName(this.data.id) + "x" + this.data.num, this.labelPoints.string = ftc.language("消耗") + this.data.switchNum + ftc.language("积分"), this.nodeCondition.active = !1, this.buttonSelf.interactable = !0, this.param.pointTotal < this.data.needTotalPoint ? (this.nodeCondition.active = !0, this.buttonSelf.interactable = !1, this.labelCondition.string = ftc.language("累计") + this.data.needTotalPoint + ftc.language("积分开启")) : ft.ExtItem.getRmb() < this.data.needTotalPay && (this.nodeCondition.active = !0, this.buttonSelf.interactable = !1, this.labelCondition.string = ftc.language("累计") + this.data.needTotalPay + ftc.language("额度开启"));
                    var e = this.param.data.ste.split(",")[this.index];
                    void 0 === e && (e = 0), this.count = this.data.count - e, this.nodeSellOut.active = this.count <= 0, this.labelTimes.string = ftc.language("可兑换次数:") + this.count + "/" + this.data.count
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
                            this.param.pointCur < this.data.switchNum * t ? ftc.showTip("积分不足") : ftc.send("msgActivityGet", {
                                eid: this.param.data.entityId,
                                index: this.index,
                                num: t
                            })
                        }.bind(this))
                    }.bind(this))
                }
            })
        