
            
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
                    this._item.setData(t), this.labelName.string = ft.ExtItem.getName(t), this.labelNum.string = e;
                    var i = e.split("/"),
                        a = Number(i[0]),
                        n = Number(i[1]);
                    this.labelNum.node.color = a >= n ? ftc.newColor(3407708) : ftc.newColor(13512192)
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        