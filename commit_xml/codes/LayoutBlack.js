
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {},
                init: function () { },
                load: function () { },
                setData: function () { },
                setFadeIn: function (t) {
                    this.node.opacity = 0, this.node.active = !0, this.node.stopAllActions(), this.node.runAction(cc.sequence(cc.fadeIn(.2), cc.callFunc(t)))
                },
                setFadeOut: function (t) {
                    this.node.runAction(cc.sequence(cc.fadeOut(.2), cc.callFunc(function () {
                        t(), this.cancel()
                    }.bind(this))))
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () { },
                onClick: function (t) { }
            })
        