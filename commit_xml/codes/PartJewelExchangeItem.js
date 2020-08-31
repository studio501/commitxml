
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    nodeItem: cc.Node,
                    nodeLayout: cc.Node,
                    buttonExchange: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonExchange)
                },
                load: function () {
                    this.item = this.newPart("PartItem"), this.item.node.scale = .9, this.nodeItem.addChild(this.item.node)
                },
                updateData: function (t) {
                    ftc.ManagerRes.restoreNodeChildren(this.nodeLayout), this.item.setEquipData(this.data.equip);
                    for (var e = 0; e < this.data.ids.length; e++) {
                        var i = this.newPart("PartItem");
                        i.node.scale = .9, i.setData(this.data.ids[e], this.data.nums[e]), this.nodeLayout.addChild(i.node)
                    }
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonExchange.node && ftc.loadLayout("LayoutDialogTip7", function (t) {
                        t.setData(this.data)
                    }.bind(this))
                }
            })
        