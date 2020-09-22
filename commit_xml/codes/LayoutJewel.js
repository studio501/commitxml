
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    labelTitle: cc.Label,
                    partJewelExchange: t("PartJewelExchange"),
                    buttonClose: cc.Button,
                    buttonTabs: [cc.Button]
                },
                init: function () {
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t], !0);
                    this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    this.initPart(this.partJewelExchange), ftc.setTvTip(this.node, "【返回键】关闭界面")
                },
                setData: function (t) { },
                enter: function () { },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        jewelExchange: function (t, e) {
                            0 === t ? (ftc.showTip("兑换成功"), this.partJewelExchange.updateData()) : ftc.showTip("兑换失败")
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.buttonClose.node && this.cancel()
                }
            })
        