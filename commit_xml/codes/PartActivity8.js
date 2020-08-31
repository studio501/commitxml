
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeItem: cc.Node,
                    buttonGo: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonGo)
                },
                load: function () {
                    this._item = this.newPart("PartItem"), this.nodeItem.addChild(this._item.node)
                },
                setData: function (t) {
                    this.data = t;
                    var e = ft.ExtMsg.getActivityData(this.data).items[0];
                    this._item.setData(e.ids, e.nums), ftc.addEventLog(103, 1)
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t) {
                    t.target === this.buttonGo.node && (ftc.addEventLog(103, 2), ftc.startShareKingWar(ft.type.share.activity))
                }
            })
        