
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    listView: ftc.ListView
                },
                init: function () { },
                load: function () {
                    this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("商店"), this.node.addChild(this.partTopStatus.node);
                    var t = [ft.value.shop.mystery, ft.value.shop.honor, ft.value.shop.spirit, ft.value.shop.huFu, ft.value.shop.biography, ft.value.shop.other, ft.value.shop.crystal, 10001];
                    this.listView.setListView(t), this.remainingSeconds = 0, this._tickSeconds = 0
                },
                setData: function (t) { },
                enter: function () {
                    this.updateData()
                },
                updateData: function () {
                    this.partTopStatus.updateData()
                },
                tick: function (t) {
                    if (this.remainingSeconds > 0) this._tickSeconds += t, this._tickSeconds > 1 && (this._tickSeconds -= 1, this.remainingSeconds -= 1, this.updateRefreshTime(this.remainingSeconds));
                    else {
                        var e = 1e3 * (43200 * (Math.floor((ftc.getLocalTime() + 28800) / 43200) + 1) - 28800);
                        this.remainingSeconds = ftc.calcSecondDelta(void 0, e), this.updateRefreshTime(this.remainingSeconds)
                    }
                },
                updateRefreshTime: function (t) {
                    var e, i, a = Math.floor(t / 3600),
                        n = Math.floor(t / 60) % 60,
                        s = t % 60;
                    a > 0 ? e = a + "小时" + n + "分钟" : n > 0 ? e = n + "分钟" : s > 0 && (e = s + "秒"), i = Math.floor((ftc.getLocalTime() + 28800) / 3600) % 24 < 12 ? a + 12 + "小时" + n + "分钟" : e, this.listView.updateListViewItems({
                        timeTip1: e,
                        timeTip2: i
                    })
                },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectShopItem: function (t, e) {
                            10001 !== t.data ? ftc.loadLayout("LayoutShop2", function (e) {
                                e.setData({
                                    ids: [t.data]
                                })
                            }, {
                                hide: !0
                            }) : ftc.loadLayout("LayoutTreasure")
                        }
                    }
                },
                onClick: function (t, e) { }
            })
        