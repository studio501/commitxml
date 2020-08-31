
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    labelTip: cc.Label,
                    listView: ftc.ListView,
                    button1: cc.Button,
                    button2: cc.Button,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.button1), this.addClick(this.button2), this.addClick(this.buttonClose, {
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
                    var a = ft.ExtEquip.getCost(this.data.equip, 1);
                    if (a.ids.length > 0)
                        for (i = 0; i < a.ids.length; i++) e.push({
                            id: a.ids[i],
                            num: a.nums[i]
                        });
                    this.listView.setListView(e)
                },
                enter: function () { },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                onClick: function (t) {
                    t.target === this.button1.node ? (ftc.send("jewelExchange", this.data.equip.entityId), this.cancel()) : t.target !== this.button2.node && t.target !== this.buttonClose.node || this.cancel()
                }
            })
        