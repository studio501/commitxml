
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    nodeRoot: cc.Node,
                    listView: ftc.ListView,
                    spriteNothing: cc.Sprite,
                    buttonOneKeySale: cc.Button,
                    labelCapacity: cc.Label,
                    nodeItemInfo: cc.Node,
                    buttonMenu: cc.Button,
                    spriteQuality: cc.Sprite,
                    spriteIcon: cc.Sprite,
                    labelName: cc.Label,
                    labelNum: cc.Label,
                    button1: cc.Button,
                    button2: cc.Button,
                    labelInfo: cc.Label,
                    labelEquipInfo: cc.RichText,
                    labelPrice: cc.Label,
                    labelPieceNum: cc.Label,
                    buttonTabs: [cc.Button],
                    spriteRedPoint: cc.Sprite,
                    nodePrice: cc.Node
                },
                init: function () {
                    this.prepareParts(["PartMenu"]), this.addClick(this.button1, {
                        zone: 1
                    }), this.addClick(this.button2, {
                        zone: 1
                    }), this.addClick(this.buttonOneKeySale, !0), this.addClick(this.buttonMenu, !0);
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t], !0)
                },
                load: function () {
                    this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("\u80cc\u5305"), this.node.addChild(this.partTopStatus.node), this.tvShowOneKeySale = 0, this._tvSelectZone = 0, ftc.isTv() && (this.buttonMenu.node.active = !1, this.button1.node.active = !1, this.button2.node.active = !1, this.nodePrice.active = !1, this.labelPieceNum.node.active = !1), this._lastBagItemIndex = -1;
                    for (var t = 0; t < this.buttonTabs.length; t++)
                        if (this.getListDatas(t).length > 0) {
                            this.selectTab(t);
                            break
                        } this.addPartMenu(), this.setRedPoint()
                },
                addPartMenu: function () {
                    var t = this.nodeRoot.convertToNodeSpaceAR(this.buttonMenu.node.convertToWorldSpaceAR(cc.v2(0, 0)));
                    this._partMenuGoods = this.newPart("PartMenu"), this._partMenuGoods.setData(ft.type.item.goodsNames, this.onClickGoods.bind(this)), this._partMenuGoods.nodeLayout.position = cc.v2(t.x, t.y + 26), this.node.addChild(this._partMenuGoods.node), this._partMenuGoods.node.active = !1, this._partMenuPiece = this.newPart("PartMenu"), this._partMenuPiece.setData(ft.type.item.pieceNames, this.onClickPiece.bind(this)), this._partMenuPiece.nodeLayout.position = cc.v2(t.x, t.y + 26), this.node.addChild(this._partMenuPiece.node), this._partMenuPiece.node.active = !1, this._partMenuPart = this.newPart("PartMenu"), this._partMenuPart.setData(ft.type.part.partNames, this.onClickPart.bind(this)), this._partMenuPart.nodeLayout.position = cc.v2(t.x, t.y + 26), this.node.addChild(this._partMenuPart.node), this._partMenuPart.node.active = !1, this._partMenuRes = this.newPart("PartMenu"), this._partMenuRes.setData(ft.type.resource.resourceNames, this.onClickResource.bind(this)), this._partMenuRes.nodeLayout.position = cc.v2(t.x, t.y + 26), this.node.addChild(this._partMenuRes.node), this._partMenuRes.node.active = !1
                },
                setRedPoint: function () {
                    for (var t = !1, e = this.getListDatas(1), i = 0; i < e.length; i++)
                        if (ft.ExtItem.checkRedPoint(e[i].data.id)) {
                            t = !0;
                            break
                        } this.spriteRedPoint.node.active = t
                },
                updateTvTip: function () {
                    var t;
                    t = 0 === this._tvSelectZone ? "\u3010\u8fd4\u56de\u952e\u3011\u5173\u95ed\u754c\u9762\uff0c\u3010\u83dc\u5355\u952e\u3011\u5207\u6362\u6807\u7b7e\uff0c\u3010\u786e\u5b9a\u952e\u3011\u64cd\u4f5c" : "\u3010\u8fd4\u56de\u952e\u3011\u8fd4\u56de\u5217\u8868\uff0c\u3010\u83dc\u5355\u952e\u3011\u5207\u6362\u6807\u7b7e", ftc.setTvTip(this.node, t)
                },
                updateItems: function (t) {
                    return t.length > 0 ? (this._lastBagItemIndex >= t.length && (this._lastBagItemIndex = t.length - 1), this.listView.updateListViewItems(this._lastBagItemIndex, t), this.updateListItemInfo(this._lastBagItemIndex), !0) : (this.listView.setListView([]), this.spriteNothing.node.active = !0, this.nodeItemInfo.active = !1, !1)
                },
                onClickGoods: function (t) {
                    this._select = [ft.type.item.all, ft.type.item.goods, ft.type.item.material][t];
                    var e = this.getListDatas(this.tabIndex, this._select);
                    e.length > 0 ? (this.buttonMenu.node.getChildByName("Text").getComponent(cc.Label).string = ft.type.item.goodsNames[t], this.listView.setListView(e, 0), this.updateListItemInfo(0), this._lastBagItemIndex = 0) : ftc.showTip("\u65e0\u6b64\u7c7b\u578b\u7684\u7269\u54c1"), this.updateTv(e.length), this._partMenuGoods.node.active = !1
                },
                onClickPiece: function (t) {
                    this._select = t;
                    var e = this.getListDatas(this.tabIndex, this._select);
                    e.length > 0 ? (this.buttonMenu.node.getChildByName("Text").getComponent(cc.Label).string = ft.type.item.pieceNames[t], this.listView.setListView(e, 0), this.updateListItemInfo(0), this._lastBagItemIndex = 0) : ftc.showTip("\u65e0\u6b64\u7c7b\u578b\u7684\u788e\u7247"), this.updateTv(e.length), this._partMenuPiece.node.active = !1
                },
                onClickPart: function (t) {
                    this._select = t;
                    var e = this.getListDatas(this.tabIndex, this._select);
                    e.length > 0 ? (this.buttonMenu.node.getChildByName("Text").getComponent(cc.Label).string = ftc.language("\u90e8\u4f4d:") + ft.type.part.partNames[t], this.listView.setListView(e, 0), this.updateListItemInfo(0), this._lastBagItemIndex = 0) : ftc.showTip("\u65e0\u6b64\u90e8\u4f4d\u7684\u88c5\u5907"), this.updateTv(e.length), this._partMenuPart.node.active = !1
                },
                onClickResource: function (t) {
                    this._select = [ft.type.resource.all, ft.type.resource.heroMaterial, ft.type.resource.equipMaterial, ft.type.resource.jewel][t];
                    var e = this.getListDatas(this.tabIndex, this._select);
                    e.length > 0 ? (this.buttonMenu.node.getChildByName("Text").getComponent(cc.Label).string = ft.type.resource.resourceNames[t], this.listView.setListView(e, 0), this.updateListItemInfo(0), this._lastBagItemIndex = 0) : ftc.showTip("\u65e0\u6b64\u7c7b\u578b\u7684\u788e\u7247"), this.updateTv(e.length), this._partMenuRes.node.active = !1
                },
                setData: function (t) { },
                enter: function () { },
                updateData: function () {
                    if (this.partTopStatus.updateData(), -1 !== this._lastBagItemIndex) {
                        var t = this.getListDatas(this.tabIndex, this._select),
                            e = this.listView.getDatas();
                        t.length === e.length ? this.updateItems(t) : (this.labelCapacity.string = ftc.language("\u7a7a\u95f4: ") + t.length + "/" + ft.value.com.bagSize, this.updateItems(t))
                    } else this.selectTab(this.tabIndex);
                    this.setRedPoint()
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectBagItem: function (t, e) {
                            this.listView.updateListViewItem(this._lastBagItemIndex, void 0, t.index), this._lastBagItemIndex = t.index, this.listView.updateListViewItem(this._lastBagItemIndex, void 0, t.index), this.updateListItemInfo(t.index)
                        },
                        itemUse: function (t, e) {
                            void 0 === t ? ftc.showTip("\u9053\u5177\u65e0\u6cd5\u4f7f\u7528") : t > 0 && this.updateData()
                        },
                        itemCompose: function (t, e) {
                            if (0 === t) {
                                var i = ft.ExtItem.getHero(this.selectedData.id);
                                i ? ftc.loadLayout("LayoutAwardHero", function (t) {
                                    t.setData([
                                        [i, 1]
                                    ])
                                }.bind(this)) : ftc.showTip("\u5408\u6210\u6210\u529f"), this.updateData()
                            } else 1 === t ? ftc.showTip("\u788e\u7247\u6570\u91cf\u4e0d\u8db3") : 2 === t ? ftc.showTip("\u5df2\u62e5\u6709\u8be5\u82f1\u96c4") : 3 === t && ftc.showTip("\u65e0\u6cd5\u5408\u6210")
                        },
                        itemSale: function (t, e) {
                            t > 0 ? (ftc.showTip("\u51fa\u552e\u6210\u529f"), ftc.playEffect(ftc.type.effect.gold), this.updateData()) : ftc.showTip("\u51fa\u552e\u5931\u8d25");
                            var i = ftc.ManagerRes.findLayout("LayoutBagSale");
                            i && i.cancel()
                        },
                        equipSale: function (t, e) {
                            t > 0 ? (ftc.showTip("\u51fa\u552e\u6210\u529f"), ftc.playEffect(ftc.type.effect.gold), this.updateData()) : ftc.showTip("\u51fa\u552e\u5931\u8d25")
                        },
                        jewelSale: function (t, e) {
                            t > 0 ? (ftc.showTip("\u51fa\u552e\u6210\u529f"), ftc.playEffect(ftc.type.effect.gold), this.updateData()) : ftc.showTip("\u51fa\u552e\u5931\u8d25")
                        },
                        showLayoutList: function (t, e) {
                            var i = [];
                            if (t.part) {
                                var a = ftc.ManagerData.get2("Equip");
                                if (t.part === ft.type.part.exclusive)
                                    for (var n in a) ft.ExtEquip.getType(a[n].id) > 1e3 && i.push(a[n]);
                                else
                                    for (var n in a) ft.ExtEquip.getPart(a[n].id) === t.part && i.push(a[n]);
                                if (0 === i.length) return void ftc.showTip("\u8be5\u7c7b\u578b\u88c5\u5907\u4e0d\u5b58\u5728")
                            }
                            ftc.loadLayout("LayoutList", function (e) {
                                e.setData({
                                    type: t.type,
                                    part: t.part,
                                    id: this.selectedData.id
                                })
                            }.bind(this))
                        },
                        openBatchUse: function (t, e) {
                            ftc.loadLayout("LayoutDialogTip6", function (t) {
                                t.setData(this.selectedData, function (t) {
                                    ftc.sendCallback("openBatchUse", t)
                                }.bind(this))
                            }.bind(this))
                        },
                        openBatchSelectUse: function (t, e) {
                            ftc.loadLayout("LayoutDialogTip5", function (e) {
                                e.setData({
                                    item: this.selectedData,
                                    ids: t.ids,
                                    nums: t.nums
                                }, function (t, e) {
                                    ftc.sendCallback("openBatchSelectUse", [t, e])
                                })
                            }.bind(this))
                        }
                    }
                },
                selectTab: function (t) {
                    this._select = void 0;
                    var e = this.getListDatas(t);
                    if (e.length > 0) {
                        this.tabIndex = t;
                        for (var i = [ftc.type.tab.bag_goods, ftc.type.tab.bag_piece, ftc.type.tab.bag_equip, ftc.type.tab.bag_resource], a = 0; a < this.buttonTabs.length; a++) this.buttonTabs[a].interactable = this.tabIndex !== a, this.buttonTabs[a].node.getChildByName("spriteTabIcon").getComponent(cc.Sprite).spriteFrame = ftc.getTabSpriteFrame(i[a], t === a), this.buttonTabs[a].node.getChildByName("labelTab").color = this.tabIndex !== a ? ftc.newColor(ftc.value.color.tabNormal) : ftc.newColor(ftc.value.color.tabPressed), this.buttonTabs[a].node.getChildByName("labelTab").getComponent(cc.LabelOutline).color = this.tabIndex !== a ? ftc.newColor(ftc.value.color.tabNormalOutline) : ftc.newColor(ftc.value.color.tabPressedOutline);
                        this.buttonOneKeySale.node.active = 2 === this.tabIndex, this.listView.setListView(e, 0), this.updateListItemInfo(0), this._lastBagItemIndex = 0, this.labelCapacity.string = ftc.language("\u7a7a\u95f4: ") + e.length + "/" + ft.value.com.bagSize, this.spriteNothing.node.active = !1, this.nodeItemInfo.active = !0, this.updateTv(e.length)
                    } else ftc.showTip(ftc.language("\u6ca1\u6709") + ftc.language(["\u9053\u5177", "\u788e\u7247", "\u88c5\u5907", "\u8d44\u6e90"][t]))
                },
                updateTv: function (t) {
                    t && ftc.ManagerTV.nextSelect(this.listView.getItem(0).buttonSelf)
                },
                getListDatas: function (t, e) {
                    var i = [];
                    if (0 === t) {
                        var a = ft.ExtMap.getType(ftc.ManagerData.get1("ManagerMap").cur),
                            n = ftc.ManagerData.get2("Item");
                        for (var s in n)
                            if (n[s].num > 0) {
                                var o = ft.ExtItem.getMapTypes(n[s].id);
                                if (o && o.length > 0) {
                                    if (-1 === o.indexOf(a)) continue
                                } else if (ft.ExtItem.mapForbidOther[a]) continue;
                                (c = ft.ExtItem.getType(n[s].id)) !== ft.type.item.material && c !== ft.type.item.goods || e !== ft.type.item.all && void 0 !== e && e !== c || i.push({
                                    kind: 0,
                                    data: n[s]
                                })
                            } i.sort(function (t, e) {
                                return ft.ExtItem.getIndex(t.data.id) - ft.ExtItem.getIndex(e.data.id)
                            })
                    } else if (1 === t) i = ft.ExtItem.getItemPieces(e);
                    else if (2 === t) {
                        var r = ftc.ManagerData.get2("Equip");
                        for (var s in r) r[s].id > 0 && r[s].num > 0 && (!e || e === ft.ExtEquip.getPart(r[s].id) || e === ft.type.part.exclusive && ft.ExtEquip.getType(r[s].id) > 1e3) && i.push({
                            kind: 2,
                            data: r[s]
                        });
                        i.sort(function (t, e) {
                            return ft.ExtEquip.getQuality(t.data.id) === ft.ExtEquip.getQuality(e.data.id) ? e.data.lv - t.data.lv : ft.ExtEquip.getQuality(e.data.id) - ft.ExtEquip.getQuality(t.data.id)
                        }.bind(this))
                    } else if (3 === t) {
                        n = ftc.ManagerData.get2("Item");
                        for (var s in n) {
                            var c;
                            if (n[s].num > 0) (c = ft.ExtItem.getType(n[s].id)) !== ft.type.resource.heroMaterial && c !== ft.type.resource.equipMaterial || e !== ft.type.resource.all && void 0 !== e && e !== c || i.push({
                                kind: 3,
                                data: n[s]
                            })
                        }
                        if (i.sort(function (t, e) {
                            return ft.ExtItem.getIndex(t.data.id) - ft.ExtItem.getIndex(e.data.id)
                        }), e === ft.type.resource.all || void 0 === e || e === ft.type.resource.jewel) {
                            var h = ft.ExtJewel.getJewels();
                            for (var s in h) - 1 === h[s].pos && i.push({
                                kind: 4,
                                data: h[s]
                            })
                        }
                    }
                    return void 0 === e && (this.buttonMenu.node.getChildByName("Text").getComponent(cc.Label).string = ftc.language("\u5168\u90e8")), i
                },
                updateListItemInfo: function (t) {
                    if (!(this.listView.getDatas().length <= t)) {
                        var e, i = this.listView.getDatas()[t];
                        if (this.selectedIndex = t, this.selectedData = i.data, this.button1.node.active = !0, this.button2.node.active = !0, this.labelPrice.node.parent.active = !0, this.labelInfo.node.active = !0, this.labelEquipInfo.node.active = !1, 0 === i.kind || 1 === i.kind || 3 === i.kind) {
                            this.spriteQuality.spriteFrame = ft.ExtItem.getQualitySprite(this.selectedData.id), this.spriteIcon.spriteFrame = ft.ExtItem.getIconSprite(this.selectedData.id), this.labelName.string = ft.ExtItem.getName(this.selectedData.id), this.labelNum.string = ftc.language("\u6570\u91cf: ") + this.selectedData.num, this.labelInfo.string = ft.ExtItem.getInfo(this.selectedData.id);
                            var a = ft.ExtItem.getSaleGold(this.selectedData.id),
                                n = !(0 === i.kind && (ft.ExtItem.getType(this.selectedData.id) === ft.type.item.material || 0 === ft.ExtItem.getNeedPiecesNum(this.selectedData.id).length));
                            if (3 === i.kind && (n = !1), this.labelPrice.string = a, this.button1.interactable = a > 0, this.button2.interactable = n, 0 === i.kind || 3 === i.kind) e = "\u4f7f\u7528";
                            else if (1 === i.kind) {
                                ft.ExtItem.getHero(this.selectedData.id) ? e = ftc.ManagerData.get2Object("Hero")[this.selectedData.id] ? "\u8fdb\u9636" : "\u5408\u6210" : ft.ExtItem.getEquip(this.selectedData.id) && (e = "\u5408\u6210");
                                var s = 0,
                                    o = ft.ExtItem.getHero(this.selectedData.id);
                                if (o) {
                                    var r = ft.ExtHero.getHero(o),
                                        c = ft.ExtItem.mapPartHeros[o];
                                    r ? r.star < ft.value.com.maxHeroStar && (s = ft.value.heroStarNeed[r.star]) : s = ft.ExtItem.getNeedPiecesNum(c)
                                }
                                if (o = ft.ExtItem.getEquip(this.selectedData.id)) {
                                    c = ft.ExtItem.mapPartEquips[o];
                                    s = ft.ExtItem.getNeedPiecesNum(c)
                                }
                                this.labelPieceNum.string = s > 0 ? this.selectedData.num + "/" + s : "", this.button2.interactable = s > 0
                            }
                            this.button2.node.getChildByName("Text").getComponent(cc.Label).string = ftc.language(e)
                        } else if (2 === i.kind) {
                            e = "\u8be6\u60c5", this.spriteQuality.spriteFrame = ft.ExtEquip.getQualitySprite(this.selectedData.id), this.spriteIcon.spriteFrame = ft.ExtEquip.getIconSprite(this.selectedData.id), this.labelName.string = ft.ExtEquip.getName(this.selectedData.id), this.labelNum.string = ftc.language("\u6570\u91cf: ") + this.selectedData.num, this.labelInfo.node.active = !1, this.labelEquipInfo.node.active = !0;
                            for (var h = ft.ExtEquip.getInfoArr(this.selectedData), f = "", d = 0; d < h.length; d++) h[d] && (f += h[d] + "\n\n");
                            this.labelEquipInfo.string = f;
                            a = ft.ExtEquip.getSaleGold(this.selectedData.id);
                            if (ft.ExtEquip.getQuality(this.selectedData.id) > 4) a = 0;
                            else {
                                var l = ft.ExtEquip.getUpgradeCost(this.selectedData.id),
                                    u = 0;
                                for (d = 0; d < this.selectedData.goldLv; d++) u += ft.ExtEquip.getLvGold(l, d);
                                a += parseInt(.5 * u)
                            }
                            this.labelPrice.string = a, this.button1.interactable = a > 0, this.button2.interactable = !0, this.button2.node.getChildByName("Text").getComponent(cc.Label).string = ftc.language(e)
                        } else if (4 === i.kind) {
                            this.spriteQuality.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "common_icon_bg1"), this.spriteIcon.spriteFrame = ft.ExtJewel.getIconSprite(this.selectedData.id), this.labelName.string = ft.ExtJewel.getName(this.selectedData.id), this.labelNum.string = ftc.language("\u6570\u91cf: ") + this.selectedData.num, this.labelInfo.string = ft.ExtJewel.getInfo(this.selectedData.id);
                            c = ft.ExtItem.mapJewels[this.selectedData.id];
                            var p = ft.ExtItem.getSaleGold(c);
                            p > 0 ? (this.labelPrice.string = p, this.labelPrice.node.parent.active = !0, this.button1.node.active = !0, this.button2.node.active = !0, this.button1.interactable = !0, this.button2.interactable = !1, this.button1.node.getChildByName("Text").getComponent(cc.Label).string = ftc.language("\u51fa\u552e"), this.button2.node.getChildByName("Text").getComponent(cc.Label).string = ftc.language("\u4f7f\u7528")) : (this.labelPrice.node.parent.active = !1, this.button1.node.active = !1, this.button2.node.active = !1)
                        }
                        ftc.isTv() ? this.updateTvTip(e) : this.labelPieceNum.node.active = 1 === this.tabIndex
                    }
                },
                onClick: function (t, e) {
                    if (t.target === this.button1.node) {
                        if (this.selectedData) {
                            if (2 === this.tabIndex && -1 !== this.selectedData.pos) return void ftc.showTip("\u8bf7\u5148\u5378\u4e0b\u88c5\u5907\u518d\u51fa\u552e");
                            ftc.loadLayout("LayoutBagSale", function (t) {
                                2 === this.tabIndex ? t.setData(this.selectedData, 1) : 4 === this.listView.getDatas()[this.selectedIndex].kind ? t.setData(this.selectedData, 3) : t.setData(this.selectedData, 0)
                            }.bind(this))
                        }
                    } else if (t.target === this.button2.node)
                        if (0 === this.tabIndex) ftc.send("itemUse", {
                            id: this.selectedData.id,
                            param: 0
                        });
                        else if (1 === this.tabIndex)
                            if (this.button2.node.getChildByName("Text").getComponent(cc.Label).string === ftc.language("\u8fdb\u9636")) {
                                var i = ft.ExtItem.getHero(this.selectedData.id),
                                    a = ft.ExtHero.getHero(i);
                                ftc.loadLayout("LayoutHero", function (t) {
                                    t.setData(a, !1, 2)
                                })
                            } else ftc.send("itemCompose", {
                                id: this.selectedData.id
                            });
                        else 2 === this.tabIndex && ftc.loadLayout("LayoutEquipDetail", function (t) {
                            for (var e = [], i = this.listView.getDatas(), a = 0; a < i.length; a++) e.push(i[a].data);
                            t.setData(this.selectedData, !1, !0, e, this.selectedIndex)
                        }.bind(this));
                    else if (t.target === this.buttonOneKeySale.node) {
                        var n = [],
                            s = [],
                            o = ftc.ManagerData.get2("Equip");
                        for (var r in o) - 1 === o[r].pos && ft.ExtEquip.getQuality(o[r].id) <= 3 && o[r].lv < 2 && (n.push(o[r].entityId), s.push(o[r].num));
                        n.length > 0 ? ftc.showDialog({
                            text: ftc.language("\u662f\u5426\u51fa\u552e\u7d2b\u8272\u4ee5\u4e0b\u672a\u5347\u7ea7\u88c5\u5907(\u6570\u91cf") + n.length + ")?",
                            click1: function () {
                                ftc.send("equipSale", {
                                    eids: n,
                                    nums: s
                                })
                            },
                            click2: function () { }
                        }) : ftc.showTip("\u65e0\u53ef\u51fa\u552e\u7269\u54c1")
                    } else if (t.target === this.buttonMenu.node) 0 === this.tabIndex ? this._partMenuGoods.node.active = !this._partMenuGoods.node.active : 1 === this.tabIndex ? this._partMenuPiece.node.active = !this._partMenuPiece.node.active : 2 === this.tabIndex ? this._partMenuPart.node.active = !this._partMenuPart.node.active : 3 === this.tabIndex && (this._partMenuRes.node.active = !this._partMenuRes.node.active);
                    else
                        for (r = 0; r < this.buttonTabs.length; r++)
                            if (t.target === this.buttonTabs[r].node) {
                                this.selectTab(r);
                                break
                            }
                },
                onKeyBack: function () {
                    if (1 === this._tvSelectZone) return this.listView.getItem(this.selectedIndex) && (this._tvSelectZone = 0, ftc.ManagerTV.nextSelect(this.listView.getItem(this.selectedIndex).buttonSelf, this.node, 0), this.updateTvTip()), !0
                },
                onKeyMenu: function (t) {
                    if (!t) {
                        var e = this.tabIndex + 1;
                        return e > 2 && 0 == this.tvShowOneKeySale ? (this.tvShowOneKeySale = 1, this.buttonOneKeySale.node.active = !1, this.onClick({
                            target: this.buttonOneKeySale.node
                        }), !0) : (e > 3 && (e = 0, this.tvShowOneKeySale = 0), this.selectTab(e), 1 === this._tvSelectZone && (this._tvSelectZone = 0, this.updateTvTip()), !0)
                    }
                },
                onKeyOk: function (t) {
                    if (!t && 0 === this._tvSelectZone) return this._tvSelectZone = 1, ftc.ManagerTV.nextSelect(void 0, this.node, 1), this.updateTvTip(), !0
                }
            })
        