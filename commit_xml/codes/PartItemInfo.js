
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeRoot: cc.Node,
                    labelName: cc.Label,
                    labelCd: cc.Label,
                    labelInfo: cc.RichText,
                    buttonTvClose: cc.Button
                },
                init: function () {
                    this.node.on(cc.Node.EventType.TOUCH_END, function () {
                        this.cancel()
                    }, this), this.node._touchListener.swallowTouches = !1, this.addClick(this.buttonTvClose), ftc.ManagerTV.setBackButton(this.buttonTvClose, this.node)
                },
                load: function () { },
                setData: function (t) {
                    this.labelName.string = t.name, this.labelInfo.string = t.info, t.cdInfo ? (this.labelCd.node.active = !0, this.labelCd.string = t.cdInfo) : this.labelCd.node.active = !1, ftc.ManagerTV.nextFrameSelect(this.buttonTvClose, this.node)
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t) {
                    t.target == this.buttonTvClose.node && (this.cancel(), ftc.ManagerTV.nextSelect())
                }
            })
        