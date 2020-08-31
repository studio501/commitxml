
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    labelInfo: cc.Label
                },
                init: function () { },
                updateData: function (t) {
                    this.labelInfo.string = this.data
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        