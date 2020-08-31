
            
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
                    this.initPart(this.partJewelExchange), ftc.setTvTip(this.node, "\u3010\u8fd4\u56de\u952e\u3011\u5173\u95ed\u754c\u9762")
                },
                setData: function (t) { },
                enter: function () { },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        jewelExchange: function (t, e) {
                            0 === t ? (ftc.showTip("\u5151\u6362\u6210\u529f"), this.partJewelExchange.updateData()) : ftc.showTip("\u5151\u6362\u5931\u8d25")
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.buttonClose.node && this.cancel()
                }
            })
        