
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    nodeRoot: cc.Node,
                    labelRefresh: cc.Label,
                    listView: ftc.ListView,
                    nodeTab: cc.Node,
                    buttonTabs: [cc.Button],
                    labelTitle: cc.Label,
                    nodeMoney: cc.Node,
                    spriteIcon: cc.Sprite,
                    labelNum: cc.Label
                },
                init: function () {
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t], !0);
                    var e = this.nodeMoney.getComponent(cc.Widget);
                    ftc.ManagerH5.hasRightTopMenu() ? e.right = 810 : e.right = 660, e.updateAlignment()
                },
                load: function () {
                    this.partTopStatus = this.newPart("PartTopStatus"), this.node.addChild(this.partTopStatus.node), this.shopId = void 0, ftc.setTvTip(this.node, "【返回键】关闭界面，【菜单键】切换标签")
                },
                setData: function (t) {
                    this.data = t;
                    var e = t.ids,
                        i = t.levels;
                    if (this.tabOpens = [!0, !0, !0, !0, !0], this.tabTips = ["", "", "", "", ""], i)
                        for (var a = ftc.ManagerData.get1("Player").level, n = 0; n < e.length; n++) a < i[n] && (this.tabOpens[n] = !1, this.tabTips[n] = i[n] + ftc.language("级开放"));
                    1 === e.length ? (this.nodeTab.active = !1, this.nodeRoot.x = 0) : (this.nodeTab.active = !0, this.nodeRoot.x = 70), this.selectTab(0)
                },
                selectTab: function (t) {
                    if (this.tableIndex = t, this.tabOpens[t]) {
                        var e = this.data.ids[t];
                        if (this.shopId = e, this.partTopStatus.setTitle(ft.ExtShop.getName(this.shopId)), this.data.ids.length > 1) {
                            for (var i = [ftc.type.tab.shop_honor, ftc.type.tab.shop_spirit, ftc.type.tab.shop_hufu, ftc.type.tab.shop_biography, ftc.type.tab.shop_other], a = 0; a < this.buttonTabs.length; a++)
                                if (this.buttonTabs[a].interactable = a !== t, this.buttonTabs[a].node.getChildByName("spriteTabIcon").getComponent(cc.Sprite).spriteFrame = ftc.getTabSpriteFrame(i[a], t === a), this.buttonTabs[a].node.getChildByName("labelTab").color = t !== a ? ftc.newColor(ftc.value.color.tabNormal) : ftc.newColor(ftc.value.color.tabPressed), this.buttonTabs[a].node.getChildByName("labelTab").getComponent(cc.LabelOutline).color = t !== a ? ftc.newColor(ftc.value.color.tabNormalOutline) : ftc.newColor(ftc.value.color.tabPressedOutline), a === t) {
                                    var n = this.buttonTabs[a].node.getChildByName("labelTab").getComponent(cc.Label);
                                    this.labelTitle.string = n.string
                                }
                        } else this.labelTitle.string = ft.ExtShop.getName(this.shopId);
                        this.labelRefresh.node.parent.active = !0, this.shopId === ft.value.shop.mystery ? this.labelRefresh.string = "每日0点，12点刷新" : this.shopId === ft.value.shop.biography || this.shopId === ft.value.shop.other || this.shopId === ft.value.shop.crystal ? this.labelRefresh.node.parent.active = !1 : this.labelRefresh.string = "每日00:00刷新", this.currencyId = this.getCurrencyId(e), this.currencyId ? (this.nodeMoney.active = !0, this.spriteIcon.spriteFrame = ft.ExtItem.getLittleIconSprite(this.currencyId), this.labelNum.string = ft.ExtItem.getNum(this.currencyId)) : this.nodeMoney.active = !1, this.updateData()
                    } else ftc.showTip(this.tabTips[t])
                },
                getCurrencyId: function (t) {
                    return t === ft.value.shop.honor ? ft.value.item.honor : t === ft.value.shop.spirit ? ft.value.item.spirit : t === ft.value.shop.huFu ? ft.value.item.huFu : t === ft.value.shop.biography ? ft.value.item.biographyPiece : t === ft.value.shop.other ? ft.value.item.primaryMould : t === ft.value.shop.crystal ? ft.value.item.spiritCrystal : t === ft.value.shop.copy1 ? ft.value.item.yearPicture : void ft.value.shop.copy2
                },
                enter: function () { },
                updateData: function () {
                    if (this.partTopStatus.updateData(), this.shopId) {
                        var t = ft.ExtShop.getShopDatas(this.shopId);
                        t ? this.listView.setListView(t, this.shopId) : ftc.send("shopLoad", this.shopId), ftc.ManagerTV.nextSelect()
                    }
                },
                tick: function (t) {
                    this.labelNum.string = ft.ExtItem.getNum(this.currencyId)
                },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectShop2Item: function (t, e) {
                            ftc.loadLayout("LayoutShop2Buy", function (e) {
                                e.setData(t.data, function (e) {
                                    ftc.send("shopBuyItem", {
                                        shop: this.shopId,
                                        index: t.index,
                                        num: e
                                    })
                                }.bind(this))
                            }.bind(this))
                        },
                        shopBuyItem: function (t, e) {
                            if (-1 !== t) {
                                ftc.showTip("购买成功"), ftc.playEffect(ftc.type.effect.shop_get);
                                var i = ft.ExtShop.getShopDatas(this.shopId)[t];
                                this.listView.updateListViewItem(t, i)
                            }
                        },
                        shopLoad: function (t, e) {
                            1 === t ? (ftc.showTip("加载商店失败"), this.listView.setListView([])) : this.updateData()
                        }
                    }
                },
                onClick: function (t, e) {
                    for (var i = 0; i < this.buttonTabs.length; i++)
                        if (t.target === this.buttonTabs[i].node) {
                            this.selectTab(i);
                            break
                        }
                },
                onKeyMenu: function (t) {
                    if (!t) return this.tableIndex++, this.tableIndex >= this.buttonTabs.length && (this.tableIndex = 0), this.selectTab(this.tableIndex), !0
                }
            })
        