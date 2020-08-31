
            
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
                            0 === t ? ftc.showTip("\u5143\u5b9d\u4e0d\u8db3") : 1 === t ? ftc.showTip("\u6b21\u6570\u4e0d\u8db3") : 2 === t && (ftc.showTip("\u8d2d\u4e70\u6210\u529f"), ftc.playEffect(ftc.type.effect.gold), this.labelTimes.string = ft.value.com.exchangeGoldTimes - ftc.ManagerData.get1("ManagerItem").buyGoldCount + "/" + ft.value.com.exchangeGoldTimes)
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node || t.target === this.buttonClose.node ? this.cancel() : t.target === this.buttonUse.node && ftc.showDialog({
                        text: "\u786e\u5b9a\u8d2d\u4e70\u91d1\u5e01?",
                        click1: function () {
                            ftc.send("itemBuyGold")
                        },
                        click2: function () { }
                    })
                }
            })
        