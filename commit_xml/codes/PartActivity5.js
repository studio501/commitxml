
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    listView: ftc.ListView
                },
                init: function () { },
                setData: function (t) {
                    this.data = t;
                    var e = Number(this.data.ext),
                        i = ft.ExtMsg.getActivityData(this.data),
                        a = e > 0 ? i.items[e - 1].levels : 0;
                    i.items.sort(function (t, e) {
                        return t.levels > a && e.levels > a ? t.levels - e.levels : t.levels > a ? -1 : e.levels > a ? 1 : t.levels - e.levels
                    }.bind(this)), this.listView.setListView(i.items, a)
                },
                cleanup: function () { },
                updateData: function () {
                    var t = Number(this.data.ext),
                        e = ft.ExtMsg.getActivityData(this.data),
                        i = t > 0 ? e.items[t - 1].levels : 0;
                    e.items.sort(function (t, e) {
                        return t.levels > i && e.levels > i ? t.levels - e.levels : t.levels > i ? -1 : e.levels > i ? 1 : t.levels - e.levels
                    }.bind(this)), this.listView.updateListViewItems(i, e.items)
                },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        