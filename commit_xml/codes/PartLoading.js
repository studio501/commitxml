
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spriteLoading: cc.Sprite
                },
                init: function () { },
                load: function () { },
                setData: function (t) { },
                startLoading: function () {
                    this.spriteLoading.node.runAction(cc.repeatForever(cc.rotateBy(2, 360)))
                },
                stopLoading: function () {
                    this.spriteLoading.node.stopAllActions()
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        