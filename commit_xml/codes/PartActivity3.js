
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    listView: ftc.ListView
                },
                init: function () { },
                setData: function (t) {
                    this.data = t;
                    var e = ft.ExtMsg.getActivityData(this.data);
                    this.listView.setListView(e.items, this.data)
                },
                cleanup: function () { },
                updateData: function () {
                    this.listView.updateListViewItems()
                },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        