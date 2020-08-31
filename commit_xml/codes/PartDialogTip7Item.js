
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                load: function () {
                    this._item = this.newPart("PartItem"), this._item.node.y = 10, this.node.addChild(this._item.node)
                },
                updateData: function (t) {
                    var e = this.data.id,
                        i = this.data.num;
                    this._item.setData(e, i, !0)
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target, this.buttonSelf.node
                }
            })
        