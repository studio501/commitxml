
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {},
                init: function () { },
                load: function () {
                    this._item = this.newPart("PartItem"), this._item.node.y = 10, this.node.addChild(this._item.node)
                },
                updateData: function (t) {
                    this._item.setData(this.data.id, this.data.num, !0), this.data.name && this._item.setName(this.data.name)
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        