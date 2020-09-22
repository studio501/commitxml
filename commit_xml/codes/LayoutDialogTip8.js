
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    listView: ftc.ListView,
                    labelTip: cc.Label,
                    buttonConfirm: cc.Button,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonConfirm), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    ftc.setTvTip(this.node)
                },
                setData: function (t, e) {
                    this.data = t, this.callback = e;
                    for (var i = [], a = 0; a < this.data.ids.length; a++) i.push({
                        id: this.data.ids[a],
                        num: this.data.nums[a],
                        times: this.data.times[a]
                    });
                    this.listView.setListView(i, 0), this.selectedItemIndex = 0, i.length < 5 ? this.listView.node.x = 55.5 * -i.length + 7.5 : this.listView.node.x = -229
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectDialogTip8Item: function (t, e) {
                            this.listView.updateListViewItems(t.index), this.selectedItemIndex = t.index
                        }
                    }
                },
                updateTip: function () { },
                onClick: function (t, e) {
                    t.target === this.buttonConfirm.node ? (this.callback && this.callback(this.selectedItemIndex), this.cancel()) : t.target === this.buttonClose.node && ftc.showTip("请选择奖励")
                }
            })
        