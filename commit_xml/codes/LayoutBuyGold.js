
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonSelf: cc.Button,
                    labelGemNum: cc.Label,
                    labelGoldNum: cc.Label,
                    labelTimes: cc.Label,
                    buttonUse: cc.Button,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonSelf, !0), this.addClick(this.buttonUse), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    this.labelGemNum.string = ft.value.com.exchangeGoldGem, this.labelGoldNum.string = ft.value.com.exchangeGold, this.labelTimes.string = ft.value.com.exchangeGoldTimes - ftc.ManagerData.get1("ManagerItem").buyGoldCount + "/" + ft.value.com.exchangeGoldTimes
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
                        itemBuyGold: function (t, e) {
                            0 === t ? ftc.showTip("元宝不足") : 1 === t ? ftc.showTip("次数不足") : 2 === t && (ftc.showTip("购买成功"), ftc.playEffect(ftc.type.effect.gold), this.labelTimes.string = ft.value.com.exchangeGoldTimes - ftc.ManagerData.get1("ManagerItem").buyGoldCount + "/" + ft.value.com.exchangeGoldTimes)
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node || t.target === this.buttonClose.node ? this.cancel() : t.target === this.buttonUse.node && ftc.showDialog({
                        text: "确定购买金币?",
                        click1: function () {
                            ftc.send("itemBuyGold")
                        },
                        click2: function () { }
                    })
                }
            })
        