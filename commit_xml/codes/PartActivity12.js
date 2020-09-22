
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeItem: cc.Node,
                    labelDay: cc.Label,
                    buttonDetail: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonDetail, !0), ftc.isTv() && (this.buttonDetail.node.active = !1)
                },
                load: function () {
                    this._item = this.newPart("PartItem"), this._item.node.scale = .8, this.nodeItem.addChild(this._item.node)
                },
                setData: function (t) {
                    this.data = t, this.updateData()
                },
                cleanup: function () { },
                updateData: function () {
                    var t = ft.getSysDay(),
                        e = Number(this.data.ste),
                        i = Number(this.data.ext),
                        a = e === t,
                        n = 0 === e ? 0 : t - i;
                    n < 0 && (n = 0);
                    var s = a ? n + 1 : n;
                    this.labelDay.string = s;
                    var o = ft.ExtMsg.getActivityData(this.data);
                    n = Math.min(n, o.items.length - 1);
                    var r = o.items[n];
                    this._item.setData(r.ids, r.nums), this._item.setStatus(a ? 1 : 2)
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonDetail.node && ftc.loadLayout("LayoutAwardPreview", function (t) {
                        for (var e = JSON.parse(ft.ExtMsg.getBase(this.data)), i = [], a = 0; a < e.ids.length; a++) i.push("连续" + (a + 1) + "天");
                        t.setData({
                            ids: e.ids,
                            nums: e.nums,
                            names: i
                        })
                    }.bind(this))
                }
            })
        