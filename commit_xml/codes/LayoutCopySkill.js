
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    listView1: ftc.ListView,
                    listView2: ftc.ListView,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose, this.node)
                },
                load: function () {
                    ftc.setTvTip(this.node);
                    var t = ft.ExtCopy.getCopy(ftc.ManagerData.get1("ManagerCopy").cur);
                    if (t) {
                        for (var e = t.skills.split(","), i = [], a = [], n = 0; n < e.length; n++) {
                            var s = Number(e[n]);
                            12500 <= s && s < 13e3 ? i.push(s) : 13500 <= s && s < 14e3 && a.push(s)
                        }
                        this.listView1.setListView(i), this.listView2.setListView(a)
                    }
                },
                setData: function (t) { },
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
                    t.target === this.buttonClose.node && this.cancel()
                }
            })
        