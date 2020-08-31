
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    labelTip: cc.Label,
                    buttonDetail: cc.Button,
                    listView: ftc.ListView
                },
                init: function () {
                    this.addClick(this.buttonDetail)
                },
                load: function () {
                    this.updateData()
                },
                setData: function (t) { },
                cleanup: function () { },
                updateData: function () {
                    var t = [],
                        e = ftc.ManagerData.get2("Equip");
                    for (var i in e)
                        if (-1 === e[i].pos) {
                            var a = ft.ExtJewel.mapEquipJewel[e[i].id];
                            a && t.push({
                                equip: e[i],
                                ids: a.ids,
                                nums: a.nums
                            })
                        } t.length > 0 ? (this.listView.node.active = !0, this.labelTip.node.active = !1, this.listView.setListView(t)) : (this.listView.node.active = !1, this.labelTip.node.active = !0)
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonDetail.node && ftc.showDetailInfo(this.buttonDetail.node, ft.ExtDetail.getInfo(ft.value.detail.hsly_jewelExchange))
                }
            })
        