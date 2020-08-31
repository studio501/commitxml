
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    listView: ftc.ListView
                },
                init: function () { },
                setData: function (t) {
                    this.data = t;
                    var e = new Date(1e3 * (ftc.getLocalTime() + 28800)).getUTCDay(),
                        i = ft.ExtMsg.getActivityData(this.data);
                    if (i) {
                        for (var a = [], n = 0; n < i.items.length; n++) i.items[n].ids === ft.value.item.campaignTicket && 6 !== e || (i.items[n].index = n, a.push(i.items[n]));
                        this.listView.setListView(a, this.data)
                    }
                },
                cleanup: function () { },
                updateData: function () {
                    this.listView.updateListViewItems()
                },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        