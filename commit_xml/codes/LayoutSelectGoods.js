
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonSelf: cc.Button,
                    listView: ftc.ListView,
                    buttonConfirm: cc.Button,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonSelf, !0), this.addClick(this.buttonConfirm), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    this._callback = void 0, this._selectItem = void 0, ftc.setTvTip(this.node)
                },
                setData: function (t, e, i) {
                    for (var a = [], n = 0; n < t.ids.length; n++) a.push({
                        id: t.ids[n],
                        num: t.nums[n],
                        give: i
                    });
                    this.listView.setListView(a);
                    var s = a.length;
                    this.listView.node.x = s < 5 ? -57.5 * s : -250, this._callback = e
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectGoodsItem: function (t, e) {
                            this._selectItem = t, this.listView.updateListViewItems(t.index)
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node || t.target === this.buttonClose.node ? this.cancel() : t.target === this.buttonConfirm.node && (this._selectItem ? (this.cancel(), this._callback && this._callback(this._selectItem)) : ftc.showTip("请选择物品"))
                }
            })
        