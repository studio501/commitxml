
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    listViewL: ftc.ListView,
                    listViewR: ftc.ListView,
                    buttonShop: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonShop), ftc.ManagerTV.setNotShowOnEnter(this.node);
                    var t = this.listViewL.getComponent(cc.Widget),
                        e = this.listViewR.getComponent(cc.Widget);
                    ftc.isIphoneX() ? (t.left = 80, e.left = 315) : (t.left = 0, e.left = 235), t.updateAlignment(), e.updateAlignment()
                },
                load: function () {
                    for (var t in this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("\u526f\u672c"), this.node.addChild(this.partTopStatus.node), this.mapTypeCopys = {}, ftd.Copy.data) {
                        var e = Number(t),
                            i = ft.ExtCopy.getType(e);
                        this.mapTypeCopys[i] ? this.mapTypeCopys[i].push(e) : this.mapTypeCopys[i] = [e]
                    }
                    var a = [ft.type.copy.daily, ft.type.copy.weekly, ft.type.copy.challenge];
                    this.listViewL.setListView(a, 0), this.selectCopyType(a[0]), this._tickTime = 0, this._tabIndex = 0, ftc.setTvTip(this.node, "\u3010\u8fd4\u56de\u952e\u3011\u5173\u95ed\u754c\u9762\uff0c\u3010\u83dc\u5355\u952e\u3011\u5207\u6362\u526f\u672c\u7c7b\u578b"), ftc.ManagerTV.nextFrameSelect(this.listViewR.getItem(0).buttonSelf, this.node)
                },
                setData: function (t) { },
                selectCopyType: function (t) {
                    this.listViewR.setListView(this.mapTypeCopys[t])
                },
                enter: function () { },
                updateData: function () {
                    this.partTopStatus.updateData(), this.listViewR.updateListViewItems()
                },
                tick: function (t) {
                    this._tickTime += t, this._tickTime > 60 && (this._tickTime -= 60, this.listViewR.updateListViewItems())
                },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectCopyLeftItem: function (t, e) {
                            this.listViewL.updateListViewItems(t.index), this.selectCopyType(t.data)
                        },
                        c_onSelectCopyRightItem: function (t, e) {
                            if (t.conditionDesc) ftc.showTip(t.conditionDesc + "\u540e\u5f00\u653e");
                            else {
                                var i, a, n = t.data;
                                switch (n) {
                                    case ft.value.copy.HJZ:
                                    case ft.value.copy.ZYS:
                                    case ft.value.copy.CCJJ:
                                        i = "LayoutCopy1", a = [n];
                                        break;
                                    case ft.value.copy.YXT:
                                        i = "LayoutCopy2", a = 3;
                                        break;
                                    case ft.value.copy.ShenBing:
                                        i = "LayoutCopy3";
                                        break;
                                    case ft.value.copy.YXT2:
                                        i = "LayoutCopy2", a = 5;
                                        break;
                                    case ft.value.copy.ZSJ:
                                        i = "LayoutCopy1", a = [7, 0];
                                        break;
                                    case ft.value.copy.ZY:
                                        i = "LayoutCopy4";
                                        break;
                                    case ft.value.copy.FLHJ:
                                        i = "LayoutCopy5";
                                        break;
                                    case ft.value.copy.HSLY:
                                        i = "LayoutCopy6";
                                        break;
                                    case ft.value.copy.LZHJ:
                                        i = "LayoutCopy8";
                                        break;
                                    case ft.value.copy.YWC:
                                        i = "LayoutCopy9";
                                        break;
                                    case ft.value.copy.TFDZ:
                                    case ft.value.copy.CZDA:
                                    case ft.value.copy.XSWJ:
                                    case ft.value.copy.PDJD:
                                    case ft.value.copy.SBBZ:
                                }
                                ftc.loadLayout(i, function (t) {
                                    t.setData(a)
                                }.bind(this), {
                                    hide: !0
                                })
                            }
                        },
                        c_copyEnter: function (t, e) {
                            this.node.active = !0, this.cancel()
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.buttonShop.node && ftc.loadLayout("LayoutShop", void 0, {
                        hide: !0
                    })
                },
                onKeyMenu: function (t) {
                    t || (this._tabIndex++, this._tabIndex > 2 && (this._tabIndex = 0), this.msg.c_onSelectCopyLeftItem(this.listViewL.getItem(this._tabIndex)), ftc.ManagerTV.nextSelect(this.listViewR.getItem(0).buttonSelf))
                }
            })
        