
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    listView: ftc.ListView,
                    labelTitle: cc.Label,
                    labelTxt: cc.Label,
                    buttonConfirm: cc.Button,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonConfirm), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    this._callback = null, this.datas = [], ftc.setTvTip(this.node)
                },
                setData: function (t, e, i, a) {
                    this._callback = a, this.labelTitle.string = e || ftc.language("\u7269\u54c1\u5956\u52b1"), this.labelTxt.string = i || ftc.language("\u8fd9\u662f\u4f60\u7684\u5956\u52b1");
                    for (var n = [], s = [], o = 0; o < t.length; o++) n.push(t[o][0]), s.push(t[o][1]);
                    var r = {};
                    for (o = 0; o < n.length; o++) ft.ExtItem.getType(n[o]) === ft.type.item.base && n[o] !== ft.value.item.exp || ft.ExtItem.getType(n[o]) === ft.type.item.task || (r[n[o]] ? r[n[o]] += s[o] : r[n[o]] = s[o]);
                    var c = [];
                    for (var o in r) c.push({
                        id: o,
                        num: r[o]
                    });
                    this.datas = c, this.listView.setListView(this.datas)
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
                    t.target !== this.buttonConfirm.node && t.target !== this.buttonClose.node || (this.cancel(), this._callback && this._callback())
                }
            })
        