
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonSelf: cc.Button,
                    listView: ftc.ListView,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonSelf, !0), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    ftc.setTvTip(this.node)
                },
                setData: function (t) {
                    this.data = t;
                    for (var e = [], i = 0; i < this.data.ids.length; i++) e.push({
                        id: this.data.ids[i],
                        num: this.data.nums[i]
                    });
                    if (this.data.names)
                        for (i = 0; i < e.length; i++) e[i].name = this.data.names[i];
                    this.listView.setListView(e), this.listView.setListViewSize(e.length)
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                onClick: function (t, e) {
                    t.target !== this.buttonSelf.node && t.target !== this.buttonClose.node || this.cancel()
                }
            })
        