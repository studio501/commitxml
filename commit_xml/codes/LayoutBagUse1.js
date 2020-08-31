
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    progressBar: cc.ProgressBar,
                    labelProgress: cc.Label,
                    labelPlus: cc.Label
                },
                init: function () { },
                load: function () { },
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
                onClick: function (t, e) { }
            })
        