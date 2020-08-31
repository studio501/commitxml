
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    listView: ftc.ListView,
                    buttonUp: cc.Button,
                    buttonUpAll: cc.Button,
                    buttonInherit: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonUpAll), this.addClick(this.buttonUp), this.addClick(this.buttonInherit)
                },
                load: function () {
                    this.selectedItem = void 0
                },
                setData: function (t) {
                    if (this.data = t, this.selectedItem) this.listView.updateListViewItems(this.selectedItem.index);
                    else {
                        var e = ft.ExtHero.getConsumeLevel().ids;
                        this.listView.setListView(e, 0), this.selectedItem = this.listView.getItem(0)
                    }
                },
                onSelectLvUpItem: function (t) {
                    this.listView.updateListViewItems(t.index), this.selectedItem = t
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                lvUpConsume: function (t) {
                    var e = ft.ExtItem.getNum(t),
                        i = ftc.ManagerData.get1("Player").level,
                        a = this.data.lv,
                        n = 0;
                    if (t === ft.value.item.expMedicine1) {
                        var s = ft.value.expMedicineValue[0],
                            o = ft.ExtHero.calcNeedExp(this.data, i);
                        n = Math.min(Math.ceil(o / s), e)
                    } else if (t === ft.value.item.expMedicine2) {
                        for (var r = 0; r < e && a < i; r += 4) n += 4, a += 1;
                        n = Math.min(n, e)
                    }
                    return n
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonInherit.node) this.data.lv < ftc.ManagerData.get1("Player").level ? ftc.loadLayout("LayoutHeroInherit", function (t) {
                        t.setData(this.data)
                    }.bind(this)) : ftc.showTip("\u6b66\u5c06\u5df2\u7ecf\u8fbe\u5230\u73a9\u5bb6\u4e0a\u9650");
                    else if (t.target === this.buttonUp.node) {
                        var i = this.selectedItem.data;
                        ft.ExtItem.getNum(i) <= 0 ? ftc.showTip("\u6ca1\u6709\u9053\u5177") : this.data.lv >= ft.value.com.maxHeroLevel ? ftc.showTip("\u6b66\u5c06\u5df2\u7ecf\u8fbe\u5230\u7b49\u7ea7\u4e0a\u9650") : this.data.lv === ftc.ManagerData.get1("Player").level ? ftc.showTip("\u6b66\u5c06\u5df2\u7ecf\u8fbe\u5230\u73a9\u5bb6\u4e0a\u9650") : (ftc.send("heroExp", {
                            id: this.data.id,
                            itemId: i,
                            num: 1
                        }), this.selectedItem.playAni())
                    } else if (t.target === this.buttonUpAll.node) {
                        i = this.selectedItem.data;
                        if (ft.ExtItem.getNum(i) <= 0) ftc.showTip("\u6ca1\u6709\u9053\u5177");
                        else if (this.data.lv >= ft.value.com.maxHeroLevel) ftc.showTip("\u6b66\u5c06\u5df2\u7ecf\u8fbe\u5230\u7b49\u7ea7\u4e0a\u9650");
                        else if (this.data.lv === ftc.ManagerData.get1("Player").level) ftc.showTip("\u6b66\u5c06\u5df2\u7ecf\u8fbe\u5230\u73a9\u5bb6\u4e0a\u9650");
                        else {
                            var a = this.lvUpConsume(i);
                            ftc.showDialog({
                                text: ftc.language("\u6d88\u8017") + a + ft.ExtItem.getName(i),
                                click1: function () {
                                    ftc.send("heroExp", {
                                        id: this.data.id,
                                        itemId: i,
                                        num: a
                                    }), this.selectedItem.playAni()
                                }.bind(this),
                                click2: function () { }
                            })
                        }
                    }
                }
            })
        