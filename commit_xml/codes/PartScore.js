
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    labelScore: cc.Label,
                    ani: cc.Animation
                },
                init: function () { },
                load: function () {
                    this.node.opacity = 255, this.node.scale = 1, this.node.y = 0
                },
                setData: function (t) {
                    this.labelScore.string = "+" + t, this.ani.play()
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        