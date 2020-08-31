
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {},
                init: function () { },
                load: function () {
                    this._item = this.newPart("PartItem"), this._item.setNameColor(cc.Color.WHITE), this._item.node.y = 10, this.node.addChild(this._item.node)
                },
                updateData: function (t) {
                    this._item.setData(this.data.id, this.data.num, !0)
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        