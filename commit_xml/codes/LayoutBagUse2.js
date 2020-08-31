
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    animation: cc.Animation
                },
                init: function () {
                    this.datas && ftc.loadLayout("LayoutAwardGoods", function (t) {
                        t.setData(this.datas, function () {
                            ftc.sendCallback("openAward")
                        })
                    }.bind(this)), this.cancel()
                },
                load: function () {
                    this.datas = void 0, this.animation.play()
                },
                setData: function (t) { },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        openAward: function (t, e) {
                            t.items && 0 === t.type && (this.datas = t.items)
                        }
                    }
                },
                onClick: function (t, e) { }
            })
        