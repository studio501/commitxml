
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    layoutEquip: cc.Node,
                    labelPriceOld: cc.Label,
                    labelPrice: cc.Label,
                    buttonBuy: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonBuy)
                },
                load: function () {
                    this._partItems = []
                },
                updateData: function (t) {
                    this.param = t;
                    for (var e = this.data.id2s, i = this.data.num2s, a = e.length > this._partItems.length ? e.length : this._partItems.length, n = 0; n < a; n++)
                        if (n < e.length) {
                            var s = this._partItems[n];
                            s || ((s = this.newPart("PartItem")).node.scale = .9, this.layoutEquip.addChild(s.node), this._partItems[n] = s), s.setData(e[n], i[n])
                        } else this._partItems[n] && (this._partItems[n].cancel(), this._partItems.splice(n, 1));
                    this.labelPriceOld.string = ftc.language("原价:") + this.data.oldPrice, this.labelPrice.string = ftc.language("现价:") + this.data.price;
                    var o = this.param.ext.split(",");
                    this.buttonBuy.interactable = 0 == o[this.index]
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonBuy.node && (ft.ExtItem.getGem() >= this.data.price ? ftc.send("msgActivityGet", {
                        eid: this.param.entityId,
                        index: this.index
                    }) : ftc.showTip("元宝不足"))
                }
            })
        