
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    listView: ftc.ListView
                },
                init: function () { },
                load: function () {
                    this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("\u5546\u5e97"), this.node.addChild(this.partTopStatus.node), this.id = void 0
                },
                setData: function (t) {
                    if (this.id = t, this.id) {
                        var e = ft.ExtShop.getShopDatas(this.id);
                        this.listView.setListView(e), e.length && ftc.ManagerTV.nextSelect(this.listView.getItem(0).buttonSelf)
                    }
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () {
                    this.partTopStatus.updateData()
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectShop1Item: function (t, e) {
                            ftc.loadLayout("LayoutBagSale", function (e) {
                                e.setData({
                                    id: t.data.id,
                                    num: t.data.count
                                }, 2, function (e) {
                                    ftc.send("shopBuyItem", {
                                        shop: this.id,
                                        index: t.index,
                                        num: e
                                    })
                                }.bind(this))
                            }.bind(this))
                        },
                        shopBuyItem: function (t, e) {
                            if (-1 !== t) {
                                ftc.showTip("\u8d2d\u4e70\u6210\u529f"), ftc.playEffect(ftc.type.effect.shop_get);
                                var i = ft.ExtShop.getShopDatas(this.id)[t];
                                this.listView.updateListViewItem(t, i)
                            } else ftc.showTip("\u8d2d\u4e70\u5931\u8d25\uff0c\u8d27\u5e01\u4e0d\u8db3")
                        }
                    }
                },
                onClick: function (t, e) { }
            })
        