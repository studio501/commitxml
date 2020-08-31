
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    labelWaiting: cc.Label,
                    nodeWait: cc.Node
                },
                init: function () {
                    cc.tween(this.nodeWait).repeatForever(cc.tween().by(2, {
                        angle: -360
                    })).start()
                },
                load: function () { },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) {
                    this._delayTime && this._delayTime > 0 && (this._delayTime -= t, this._delayTime <= 0 && this.cancelWait())
                },
                onClick: function (t) { },
                setData: function (t, e, i, a) {
                    void 0 == e && (e = 0), void 0 === t ? (this.labelWaiting.node.active = !1, void 0 === a && (a = 0)) : (this.labelWaiting.string = ftc.language(t), this.labelWaiting.node.active = !0, void 0 === a && (a = ftc.DialogShadeOpacity)), this.node.getChildByName("SpriteBg").opacity = a, this.node.active = !0, this._delayTime = e, this._callback = i
                },
                cancelWait: function (t) {
                    t && "number" == typeof t ? this._delayTime = t : (this._callback && this._callback(), this.node.active = !1)
                }
            })
        