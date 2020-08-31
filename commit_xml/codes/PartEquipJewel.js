
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    listView: ftc.ListView
                },
                init: function () { },
                load: function () {
                    this.jewels = void 0
                },
                setData: function (t) {
                    this.data = t, this.jewels = ft.ExtJewel.getJewelsByEquip(this.data), this.listView.setListView(this.jewels, this.data)
                },
                cleanup: function () { },
                updateData: function () {
                    this.jewels = ft.ExtJewel.getJewelsByEquip(this.data), this.listView.updateListViewItems(this.data, this.jewels)
                },
                tick: function (t) { },
                onSelectJewelItem: function (t) {
                    this.jewels
                },
                onClick: function (t, e) { }
            })
        