
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    labelText: cc.Label,
                    labelTextCopy: cc.Label,
                    buttonNext: cc.Button
                },
                init: function () {
                    ftc.isTv() || this.addClick(this.buttonNext, {
                        zone: 1
                    })
                },
                setData: function (t) {
                    "string" == typeof t && (t = [t]), this.tickAdd = 0, this._textIndex = 0, this._wordIndex = 0, this._texts = t, this.labelText.string = "", this._textWidth = 0;
                    for (var e = 0; e < this._texts.length; e++) this._texts[e] = ftc.language(this._texts[e]);
                    this.labelTextCopy.string = this._texts[this._textIndex], this._textWidth = this.labelTextCopy.node.width, ftc.isTv() && (this.toTvUpdate = !0)
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) {
                    this.tickAdd += t, this._textWidth !== this.labelTextCopy.node.width && (this._textWidth = this.labelTextCopy.node.width, this._textWidth <= 800 ? (this.labelText.node.width = this._textWidth, this.labelText.node.height = 32, this.labelText.node.x = -this._textWidth / 2, this.labelText.node.y = 16) : (this.labelText.node.width = 800, this.labelText.node.height = 16 * (Math.floor(this._textWidth / 800) + 1), this.labelText.node.x = -400, this.labelText.node.y = this.labelText.node.height / 2));
                    for (var e = 0; this.tickAdd >= .064;) e++, this.tickAdd -= .064;
                    e > 0 && this.tickText(e)
                },
                tickText: function (t) {
                    if (this._texts) {
                        var e = this._texts[this._textIndex];
                        e && (this._wordIndex + t >= e.length ? (this._wordIndex = e.length, this._tickText = !1, ftc.isTv() && this._textIndex < this._texts.length && this.setNext()) : this._wordIndex += t, this.labelText.string = e.substr(0, this._wordIndex))
                    }
                },
                setNext: function () {
                    if (this._texts && this._texts[this._textIndex] && this._texts[this._textIndex].length - 1 > this._wordIndex) return this._wordIndex = this._texts[this._textIndex].length - 1, void (this.labelText.string = this._texts[this._textIndex]);
                    this._textIndex++, this._texts && null != this._texts[this._textIndex] && (this._wordIndex = 0), !this._texts || this._textIndex >= this._texts.length - 1 && this._wordIndex >= this._texts[this._texts.length - 1].length - 1 ? ftc.isTv() ? this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
                        this.cancelScreenText()
                    }.bind(this)))) : this.cancelScreenText() : this._texts[this._textIndex] && (this.labelTextCopy.string = this._texts[this._textIndex])
                },
                cancelScreenText: function () {
                    ftc.ManagerRes.restoreNode(this.node), ftc.sendCallback("openScreenText"), ftc.ManagerTV.nextSelect()
                },
                onClick: function (t) {
                    t.target === this.buttonNext.node && this._textIndex < this._texts.length && this.setNext()
                }
            })
        