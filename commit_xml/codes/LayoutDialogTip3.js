
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    ftc.setTvTip(this.node)
                },
                setData: function (t) { },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                onClick: function (t, e) {
                    t.target === this.buttonClose.node && this.cancel()
                }
            })
        