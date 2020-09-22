
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    listView: ftc.ListView
                },
                init: function () { },
                load: function () {
                    this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("商店"), this.node.addChild(this.partTopStatus.node), this.id = void 0
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
                                ftc.showTip("购买成功"), ftc.playEffect(ftc.type.effect.shop_get);
                                var i = ft.ExtShop.getShopDatas(this.id)[t];
                                this.listView.updateListViewItem(t, i)
                            } else ftc.showTip("购买失败，货币不足")
                        }
                    }
                },
                onClick: function (t, e) { }
            })
        