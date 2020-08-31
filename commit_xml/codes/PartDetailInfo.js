
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeRoot: cc.Node,
                    labelDetailInfo: cc.Label,
                    buttonTvClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonTvClose), this.node.on(cc.Node.EventType.TOUCH_END, function () {
                        this.cancel()
                    }, this), this.node._touchListener.swallowTouches = !1, ftc.ManagerTV.setBackButton(this.buttonTvClose, this.node)
                },
                load: function () {
                    this.labelDetailInfo.string = ""
                },
                setData: function (t) {
                    this.labelDetailInfo.string = ftc.language(t), ftc.ManagerTV.nextFrameSelect(this.buttonClose, this.node)
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    this.cancel(), ftc.ManagerTV.nextSelect()
                }
            })
        