
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonVip: cc.Button,
                    listView: ftc.ListView
                },
                init: function () {
                    this.addClick(this.buttonVip), ftc.ManagerTV.setNotShowOnEnter(this.node)
                },
                load: function () {
                    var t, e = ftc.callNativeFunction("getProductPrices");
                    e && (t = e.split("|")), this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("\u5145\u503c"), this.node.addChild(this.partTopStatus.node);
                    var i = ftc.ManagerH5.getOrderIds();
                    i || (i = ["2", "3", "4", "5", "6", "1"]);
                    for (var a = [], n = [], s = 0; s < i.length; s++) {
                        var o = ft.value["product" + [i[s]]];
                        o && (t && t[i[s] - 1] ? n.push(t[i[s] - 1]) : n.push("\xa5" + o.price), a.push(o))
                    }
                    this.listView.setListView(a, n), this.playStarAni(), this.playStarAni(1), ftc.ManagerTV.nextFrameSelect(this.listView.getItem(0).buttonSelf, this.node)
                },
                playStarAni: function (t) {
                    var e = function () {
                        var t = ft.rand(4) + this.listView.getFirstIndex(),
                            e = this.listView.getItem(t);
                        e && e.playStarAni()
                    }.bind(this);
                    this.scheduleOnce(e, t)
                },
                setData: function (t) { },
                enter: function () {
                    this.updateData()
                },
                updateData: function () {
                    this.partTopStatus.updateData(), this.buttonVip.node.parent.active = 0 === ftc.ManagerData.get1("Player").vip
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectBuyGemItem: function (t, e) {
                            ftc.getOrder(t.data.id)
                        },
                        c_buyGemItemStarEnd: function (t, e) {
                            this.playStarAni()
                        }
                    }
                },
                onClick: function (t) {
                    t.target === this.buttonVip.node && (ftc.ManagerData.get1("Player").rmb < ft.value.com.giftVipNeed ? ftc.showTip("\u5145\u503c\u672a\u6ee130\u5143") : ftc.loadLayout("LayoutActivity", function (t) {
                        t.setData(ft.type.msg.pos.gift, ft.type.activity.giftVip)
                    }, {
                        hide: !0
                    }))
                }
            })
        