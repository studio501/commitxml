
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    listView: ftc.ListView,
                    buttonPromote1: cc.Button,
                    buttonPromote2: cc.Button,
                    buttonUp: cc.Button,
                    buttonDetail: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonPromote2), this.addClick(this.buttonPromote1), this.addClick(this.buttonUp), this.addClick(this.buttonDetail, !0)
                },
                load: function () {
                    this.selectedItem = void 0, ftc.isTv() && (this.buttonDetail.node.active = !1)
                },
                setData: function (t) {
                    this.data = t;
                    for (var e, i, a, n, s, o, r = [], c = 0; c < 4; c++)(s = c + 1) === ft.type.prop.wl ? (e = "\u6b66\u529b\u6210\u957f\u503c", i = this.data.addWl, a = this.data.addWlUp * ft.value.heroAttrAddMax[0] + 100, n = this.data.addWlUp) : s === ft.type.prop.zl ? (e = "\u667a\u529b\u6210\u957f\u503c", i = this.data.addZl, a = this.data.addZlUp * ft.value.heroAttrAddMax[1] + 100, n = this.data.addZlUp) : s === ft.type.prop.sd ? (e = "\u901f\u5ea6\u6210\u957f\u503c", i = this.data.addSd, a = this.data.addSdUp * ft.value.heroAttrAddMax[2] + 100, n = this.data.addSdUp) : s === ft.type.prop.nl && (e = "\u8010\u529b\u6210\u957f\u503c", i = this.data.addNl, a = this.data.addNlUp * ft.value.heroAttrAddMax[3] + 100, n = this.data.addNlUp), o = i < a ? ft.value.item.stoneAttrs[c] : ft.value.item.stoneAttrUps[c], r.push({
                        id: this.data.id,
                        lv: this.data.lv,
                        up: n,
                        desc: ftc.language(e),
                        type: s,
                        itemId: o,
                        itemNum: ft.ExtItem.getNum(o),
                        num: i,
                        needNum: a
                    });
                    this.selectedItem ? (this.listView.updateListViewItems(this.selectedItem.index, r), this.updateItemInfo(this.selectedItem.index)) : (this.listView.setListView(r, 0), this.selectedItem = this.listView.getItem(0), this.updateItemInfo(0))
                },
                playAnimation: function (t) {
                    var e = (t - 1) % 10;
                    this.listView.updateListViewItem(e, void 0, e)
                },
                onSelectAttributeItem: function (t) {
                    this.selectedItem = t, this.listView.updateListViewItems(t.index), this.updateItemInfo(t.index)
                },
                updateItemInfo: function (t) {
                    var e = this.listView.getDatas()[t],
                        i = e.num < e.needNum;
                    this.buttonPromote1.node.active = i, this.buttonPromote2.node.active = i, this.buttonUp.node.active = !i
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    if (this.selectedItem) {
                        var i = this.selectedItem;
                        if (t.target === this.buttonPromote1.node) i.data.itemNum > 0 ? (i.data.useNum = 1, ftc.sendClient("c_onClickHeroAttrUp", i), this.selectedItem.playAni()) : ftc.showTip(ftc.language("\u7f3a\u5c11") + ft.ExtItem.getName(i.data.itemId));
                        else if (t.target === this.buttonPromote2.node)
                            if (i.data.itemNum > 0) {
                                var a = Math.min(i.data.needNum - i.data.num, i.data.itemNum);
                                ftc.showDialog({
                                    text: ftc.language("\u6d88\u8017") + a + ft.ExtItem.getName(i.data.itemId),
                                    click1: function () {
                                        i.data.useNum = a, ftc.sendClient("c_onClickHeroAttrUp", i), this.selectedItem.playAni()
                                    }.bind(this),
                                    click2: function () { }
                                })
                            } else ftc.showTip(ftc.language("\u7f3a\u5c11") + ft.ExtItem.getName(i.data.itemId));
                        else if (t.target === this.buttonUp.node) {
                            var n = 50 + 4 * i.data.up;
                            i.data.lv < n ? ftc.showTip(n + ftc.language("\u7ea7\u5f00\u653e")) : i.data.itemNum < i.data.up + 1 ? ftc.showTip(ftc.language("\u7f3a\u5c11") + ft.ExtItem.getName(i.data.itemId)) : (i.data.useNum = i.data.up + 1, ftc.sendClient("c_onClickHeroAttrUp2", i), this.selectedItem.playAni())
                        } else t.target === this.buttonDetail.node && ftc.showDetailInfo(t.target, ft.ExtDetail.getInfo(ft.value.detail.hero_attr))
                    }
                }
            })
        