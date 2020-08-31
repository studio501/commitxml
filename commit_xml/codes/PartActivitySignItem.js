
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    nodeItem: cc.Node
                },
                init: function () { },
                load: function () {
                    this._item = this.newPart("PartItem"), this._item.node.scale = .75, this.nodeItem.addChild(this._item.node), this._itemSpecial = void 0
                },
                updateData: function (t) {
                    this._item.setData(this.data.id, this.data.num);
                    var e = 0,
                        i = Number(t.ext);
                    this.index < i ? e = 1 : this.index === i && "0" === t.ste && (e = 2), this._item.setStatus(e), 1 !== e && this.data.isSpecial ? (this._itemSpecial || (this._itemSpecial = this.newPart("PartItemSpecial"), this.node.addChild(this._itemSpecial.node)), this._itemSpecial.node.active = !0) : this._itemSpecial && (this._itemSpecial.node.active = !1)
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        