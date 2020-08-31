
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    labelText: cc.Label
                },
                init: function () { },
                load: function () {
                    this.node.active = !1, this._speed = 100, this._labelWidth = 0, this._isPause = !0
                },
                setData: function (t, e) {
                    t.length > 0 && (this.node.active = !0, this._texts = t, this._index = 0, this.labelText.string = this._texts[this._index].txt, this.labelText.node.x = cc.winSize.width / 2, this._labelWidth = this.labelText.node.width, this.addCount(this._texts[this._index]), this._isPause = !1, this._showLayout = e, this.node.zIndex = e ? e.node.zIndex + 1 : 1024)
                },
                addCount: function (t) {
                    if (void 0 === t.cur && (t.cur = 0), 0 == t.count || t.count > 0 && t.cur < t.count) return t.cur++, !0
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) {
                    this._isPause || (this._showLayout && ftc.ManagerRes.topLayout() != this._showLayout ? this.node.active = !1 : (this.node.active = !0, this.labelText.node.x -= this._speed * t, this.labelText.node.x + this._labelWidth + cc.winSize.width / 2 < 0 && (this._index++, this._index >= this._texts.length && (this._index = 0), this.addCount(this._texts[this._index]) ? (this.labelText.node.x = cc.winSize.width / 2, this.labelText.string = this._texts[this._index].txt, this._labelWidth = this.labelText.node.width) : (this._texts.splice(this._index, 1), 0 == this._texts.length && (this.node.active = !1, this._isPause = !0)))))
                },
                onClick: function (t, e) { }
            })
        