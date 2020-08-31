
            
             cc.Class({
                extends: cc.Component,
                properties: {
                    _label: null,
                    _text: "",
                    key: {
                        get: function () {
                            return this._key
                        },
                        set: function (t) {
                            this._key !== t && (this._key = t)
                        }
                    },
                    _key: ""
                },
                onLoad: function () {
                    this._label = this.getComponent(cc.Label), this._label && (this._text = this._label.string, this.updateLabel())
                },
                update: function () {
                    this._label && this._text != this._label.string && this.updateLabel()
                },
                updateLabel: function () {
                    var t = ftc.ManagerLan.t(this._key);
                    t && (this._label.string = t, this._text = this._label.string)
                }
            })
        