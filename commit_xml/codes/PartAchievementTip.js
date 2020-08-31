
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spriteIcon: cc.Sprite,
                    labelTitle: cc.Label,
                    labelInfo: cc.Label
                },
                init: function () { },
                load: function () { },
                setData: function (t) {
                    this.labelTitle.string = t.title, this.labelInfo.string = t.info, this.node.runAction(cc.sequence(cc.delayTime(t.delay), cc.spawn(cc.moveBy(.5, -368, 0), cc.fadeIn(.5)), cc.delayTime(2), cc.spawn(cc.moveBy(.5, 368, 0), cc.fadeOut(.5)), cc.callFunc(this.hide, this)))
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                hide: function () {
                    ftc._nodeAchievementTipBuffers.splice(ftc._nodeAchievementTipBuffers.length - 1, 1), ftc.ManagerRes.restoreNode(this.node)
                },
                onClick: function (t, e) { }
            })
        