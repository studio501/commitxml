
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeItem: cc.Node,
                    labelName: cc.Label,
                    labelNum: cc.Label
                },
                init: function () { },
                load: function () {
                    this._item = this.newPart("PartItem"), this._item.node.scale = .64, this.nodeItem.addChild(this._item.node)
                },
                setData: function (t, e) {
                    this._item.setData(t), this.labelName.string = ft.ExtItem.getName(t), this.labelNum.string = e
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        