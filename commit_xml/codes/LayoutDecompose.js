
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    nodeNothing: cc.Node,
                    nodeContent: cc.Node,
                    listView: ftc.ListView,
                    listViewMaterial1: ftc.ListView,
                    listViewMaterial2: ftc.ListView,
                    labelGold: cc.Label,
                    buttonDecompose: cc.Button,
                    buttonHelp: cc.Button,
                    buttonOneKey: cc.Button,
                    buttonSelect: cc.Button,
                    labelSelect: cc.Label,
                    labelTip1: cc.Label,
                    nodeHelp: cc.Node,
                    buttonTabs: [cc.Button],
                    buttonTvDecompose: cc.Button,
                    buttonTvOneKey: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonDecompose, !0), this.addClick(this.buttonHelp, !0), this.addClick(this.buttonOneKey, !0), this.addClick(this.buttonSelect, !0);
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t], !0);
                    ftc.isTv() ? (this.buttonHelp.node.active = !1, this.buttonSelect.node.active = !1, this.buttonTvDecompose.node.active = !0, this.buttonTvOneKey.node.active = !0, this.addClick(this.buttonTvOneKey), this.addClick(this.buttonTvDecompose), this.listViewMaterial1.node.x = 26, this.listViewMaterial2.node.x = 26, this.buttonDecompose.node.active = !1, this.buttonOneKey.node.active = !1) : (this.buttonTvDecompose.node.active = !1, this.buttonTvOneKey.node.active = !1)
                },
                load: function () {
                    this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("分解"), this.node.addChild(this.partTopStatus.node), this.selectTab(0), this.updateTvTip()
                },
                selectTab: function (t) {
                    this.tabIndex = t;
                    for (var e = [ftc.type.tab.decompose_equip, ftc.type.tab.decompose_piece, ftc.type.tab.decompose_biography, ftc.type.tab.decompose_jewel, ftc.type.tab.decompose_other], i = 0; i < this.buttonTabs.length; i++) this.buttonTabs[i].interactable = i !== t, this.buttonTabs[i].node.getChildByName("spriteTabIcon").getComponent(cc.Sprite).spriteFrame = ftc.getTabSpriteFrame(e[i], t === i), this.buttonTabs[i].node.getChildByName("labelTab").color = t !== i ? ftc.newColor(ftc.value.color.tabNormal) : ftc.newColor(ftc.value.color.tabPressed), this.buttonTabs[i].node.getChildByName("labelTab").getComponent(cc.LabelOutline).color = t !== i ? ftc.newColor(ftc.value.color.tabNormalOutline) : ftc.newColor(ftc.value.color.tabPressedOutline);
                    ftc.isTv() ? this.labelTip1.node.active = !1 : this.labelTip1.node.active = 0 === t, this.nodeHelp.active && (this.nodeHelp.active = !1), this.selectedIndex = -1, this.selectedIndexs = [], this.isSingleSelect = !1, this.setButtonOneKeyText(!1), this.labelSelect.string = ftc.language("多选");
                    var a = this.getListDatas(t);
                    a.length > 0 ? (this.listView.setListView(a, {
                        tabIndex: this.tabIndex,
                        selectedIndexs: this.selectedIndexs
                    }), this.nodeNothing.active = !1, this.nodeContent.active = !0, this.tvZone = 1) : (this.listView.setListView([]), this.nodeNothing.active = !0, this.nodeContent.active = !1, this.tvZone = 0), ftc.ManagerTV.nextSelect(this.buttonTvOneKey), this.listViewMaterial1.setListView([]), this.listViewMaterial2.setListView([]), this.labelGold.string = "0"
                },
                getListDatas: function (t) {
                    var e = [];
                    if (0 === t) {
                        var i = ftc.ManagerData.get2("Equip");
                        for (var a in i) ft.ExtEquip.getQuality(i[a].id) <= 4 && -1 == i[a].pos && e.push(i[a]);
                        e.sort(function (t, e) {
                            return 1 === t.lv && 1 === e.lv ? ft.ExtEquip.getQuality(t.id) - ft.ExtEquip.getQuality(e.id) : 1 === t.lv ? -1 : 1 === e.lv ? 1 : ft.ExtEquip.getQuality(t.id) === ft.ExtEquip.getQuality(e.id) ? t.lv - e.lv : ft.ExtEquip.getQuality(t.id) - ft.ExtEquip.getQuality(e.id)
                        })
                    } else if (1 === t) {
                        var n = ftc.ManagerData.get2("Item");
                        for (var a in n)
                            if (n[a].num > 0 && ft.ExtItem.getType(n[a].id) === ft.type.item.piece && ft.ExtItem.getHero(n[a].id)) {
                                var s = ft.ExtItem.getHero(n[a].id);
                                (f = ft.ExtHero.getHero(s)) && f.star >= ft.value.com.maxHeroStar && e.push(n[a])
                            } e.sort(function (t, e) {
                                return ft.ExtItem.getQuality(t.id) === ft.ExtItem.getQuality(e.id) ? e.num - t.num : ft.ExtItem.getQuality(t.id) - ft.ExtItem.getQuality(e.id)
                            })
                    } else if (2 === t) {
                        n = ftc.ManagerData.get2("Item");
                        for (var a in n) n[a].num > 0 && ft.ExtItem.getType(n[a].id) === ft.type.item.biography && 3002 != n[a].id && 3057 != n[a].id && e.push(n[a])
                    } else if (3 === t) {
                        var o = ftc.ManagerData.get2("Jewel");
                        for (var a in o) {
                            if (o[a].num > 0 && -1 === o[a].pos) ft.ExtItem.getDecompose(ft.ExtItem.mapJewels[o[a].id]) && e.push(o[a])
                        }
                        e.sort(function (t, e) {
                            var i = ft.ExtJewel.getType(t.id),
                                a = ft.ExtJewel.getType(e.id);
                            return i === a ? ft.ExtJewel.getPropValue(e.id) - ft.ExtJewel.getPropValue(t.id) : i - a
                        })
                    } else if (4 === t) {
                        n = ftc.ManagerData.get2("Item");
                        var r = [],
                            c = [];
                        for (var a in n)
                            if (n[a].num > 0 && ft.ExtItem.getDecompose(n[a].id)) {
                                var h = ft.ExtItem.getType(n[a].id);
                                if (h === ft.type.item.material) r.push(n[a]);
                                else if (h === ft.type.item.spirit) {
                                    var f;
                                    (f = ft.ExtHero.getHero(ft.ExtItem.getHero(n[a].id))) && f.up >= ft.value.com.maxHeroUp && c.push(n[a])
                                }
                            } e = r.concat(c)
                    }
                    return e
                },
                updateTvTip: function () {
                    ftc.setTvTip(this.node, "【返回键】关闭界面，【菜单键】切换标签")
                },
                setData: function (t) { },
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
                        c_onSelectDecomposeItem1: function (t, e) {
                            if (this.isSingleSelect)
                                if (t.data.num <= 1) this.selectedIndexs = [t.index], this.selectedNum = 1, this.listView.updateListViewItems({
                                    tabIndex: this.tabIndex,
                                    selectedIndexs: this.selectedIndexs
                                }), this.setDecomposeInfo();
                                else {
                                    var i;
                                    if (3 === this.tabIndex) {
                                        var a = ft.ExtItem.mapJewels[t.data.id];
                                        i = {
                                            id: a,
                                            num: t.data.num
                                        }
                                    } else i = t.data;
                                    ftc.loadLayout("LayoutDialogTip6", function (e) {
                                        e.setData(i, function (e) {
                                            this.selectedIndexs = 0 === e ? [] : [t.index], this.selectedNum = e, this.listView.updateListViewItems({
                                                tabIndex: this.tabIndex,
                                                selectedIndexs: this.selectedIndexs
                                            }), this.setDecomposeInfo()
                                        }.bind(this))
                                    }.bind(this))
                                }
                            else {
                                var n = this.selectedIndexs.indexOf(t.index); - 1 == n ? this.selectedIndexs.push(t.index) : this.selectedIndexs.splice(n, 1)
                            }
                            this.selectedIndexs.length > 0 ? this.selectedIndex = this.selectedIndexs[this.selectedIndexs.length - 1] : this.selectedIndex = -1, this.listView.updateListViewItems({
                                tabIndex: this.tabIndex,
                                selectedIndexs: this.selectedIndexs
                            }), this.setDecomposeInfo()
                        },
                        equipDecompose: function (t, e) {
                            t > 0 ? this.refreshListView() : ftc.showTip("分解失败")
                        },
                        itemDecompose: function (t, e) {
                            0 === t ? this.refreshListView() : ftc.showTip("分解失败")
                        },
                        jewelDecompose: function (t, e) {
                            t > 0 ? this.refreshListView() : ftc.showTip("分解失败")
                        }
                    }
                },
                refreshListView: function () {
                    this.selectedIndex = -1, this.selectedIndexs = [];
                    var t = this.getListDatas(this.tabIndex);
                    t.length > 0 ? (this.listView.setListView(t, {
                        tabIndex: this.tabIndex,
                        selectedIndexs: this.selectedIndexs
                    }), this.nodeNothing.active = !1, this.nodeContent.active = !0) : (this.listView.setListView([]), this.nodeNothing.active = !0, this.nodeContent.active = !1), this.setDecomposeInfo(), this.setButtonOneKeyText(!1)
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonDecompose.node || t.target == this.buttonTvDecompose.node) {
                        var i = parseInt(this.labelGold.string);
                        if (ft.ExtItem.getNum(ft.value.item.gold) < i) ftc.showTip("银币不足");
                        else if (0 === this.selectedIndexs.length) ftc.showTip("没有选中");
                        else if (0 === this.tabIndex || 3 === this.tabIndex) {
                            if (this.selectedIndexs.length > 0) {
                                var a, n, s;
                                if (this.isSingleSelect && !this.isOneKeySelect) a = [this.listView.getDatas()[this.selectedIndexs[0]].entityId], h = [this.selectedNum], f = this.selectedNum;
                                else {
                                    a = [], h = [], f = 0;
                                    for (var o = 0; o < this.selectedIndexs.length; o++) {
                                        var r = this.listView.getDatas()[this.selectedIndexs[o]];
                                        a.push(r.entityId), h.push(r.num), f += r.num
                                    }
                                }
                                0 === this.tabIndex ? (n = "确定消耗{0}银币,分解{1}件装备?", s = "equipDecompose") : (n = "确定消耗{0}银币,分解{1}个宝石?", s = "jewelDecompose"), ftc.showDialog({
                                    text: n.replace(/\{(\d+)\}/g, function (t, e) {
                                        return [i, f][e]
                                    }.bind(this)),
                                    click1: function () {
                                        ftc.send(s, {
                                            eids: a,
                                            nums: h
                                        })
                                    },
                                    click2: function () { }
                                })
                            }
                        } else if (this.selectedIndexs.length > 0) {
                            var c, h, f;
                            if (this.isSingleSelect && !this.isOneKeySelect) c = [this.listView.getDatas()[this.selectedIndexs[0]].id], h = [this.selectedNum], f = this.selectedNum;
                            else {
                                c = [], h = [], f = 0;
                                for (o = 0; o < this.selectedIndexs.length; o++) {
                                    r = this.listView.getDatas()[this.selectedIndexs[o]];
                                    c.push(r.id), h.push(r.num), f += r.num
                                }
                            }
                            ftc.showDialog({
                                text: "确定消耗{0}银币,分解{1}件物品?".replace(/\{(\d+)\}/g, function (t, e) {
                                    return [i, f][e]
                                }.bind(this)),
                                click1: function () {
                                    ftc.send("itemDecompose", {
                                        ids: c,
                                        nums: h
                                    })
                                },
                                click2: function () { }
                            })
                        }
                    } else if (t.target === this.buttonHelp.node) ftc.showDetailInfo(t.target, ft.ExtDetail.getInfo(this.tabIndex + 1));
                    else if (t.target === this.buttonOneKey.node || t.target == this.buttonTvOneKey.node) {
                        if (this.isOneKeySelect = !this.isOneKeySelect, this.isOneKeySelect) {
                            this.isSingleSelect = !1, this.labelSelect.string = ftc.language("多选");
                            var d = this.listView.getDatas();
                            if (this.selectedIndexs = [], this.selectedIndex = -1, 0 === this.tabIndex)
                                for (o = 0; o < d.length; o++) ft.ExtEquip.getQuality(d[o].id) < 4 && this.selectedIndexs.push(o);
                            else
                                for (o = 0; o < d.length; o++) this.selectedIndexs.push(o)
                        } else ftc.showTip("取消一键选择"), this.selectedIndexs = [], this.selectedIndex = -1;
                        this.setButtonOneKeyText(this.isOneKeySelect), this.listView.updateListViewItems({
                            tabIndex: this.tabIndex,
                            selectedIndexs: this.selectedIndexs
                        }), this.setDecomposeInfo()
                    } else if (t.target === this.buttonSelect.node) this.isSingleSelect = !this.isSingleSelect, this.isSingleSelect && this.setButtonOneKeyText(!1), this.labelSelect.string = this.isSingleSelect ? ftc.language("单选") : ftc.language("多选"), this.selectedIndexs = [], this.selectedIndex = -1, this.listView.updateListViewItems({
                        tabIndex: this.tabIndex,
                        selectedIndexs: this.selectedIndexs
                    }), this.setDecomposeInfo();
                    else
                        for (o = 0; o < this.buttonTabs.length; o++)
                            if (t.target === this.buttonTabs[o].node) {
                                this.selectTab(o);
                                break
                            }
                },
                setButtonOneKeyText: function (t) {
                    var e;
                    this.isOneKeySelect = t, e = t ? ftc.language("取消选择") : ftc.language("一键选择"), this.buttonOneKey.node.getChildByName("Text_7").getComponent(cc.Label).string = e, ftc.isTv() && (this.buttonTvOneKey.node.getChildByName("Text_7").getComponent(cc.Label).string = e.split("").join("\n"))
                },
                setDecomposeInfo: function () {
                    var t = [],
                        e = [],
                        i = 0;
                    if (this.selectedIndexs.length > 0) {
                        for (var a = [], n = [], s = [], o = 0; o < this.selectedIndexs.length; o++) {
                            var r, c = this.listView.getDatas()[this.selectedIndexs[o]],
                                h = this.isSingleSelect ? this.selectedNum : c.num;
                            if (0 === this.tabIndex ? i += ft.value.decomposeGolds[ft.ExtEquip.getQuality(c.id) - 1] * h : 1 === this.tabIndex ? i += ft.value.decomposeGolds[ft.ExtHero.getQuality(ft.ExtItem.getHero(c.id), !0) - 1] * h : 2 === this.tabIndex ? i += ft.value.com.biographyDecomposeGold * h : 3 === this.tabIndex ? i += ft.value.com.jewelDecomposeGold * h : 4 === this.tabIndex && (i += ft.value.com.itemDecomposeGold * h), r = 0 === this.tabIndex ? ft.ExtEquip.getDecomposePreview(c.id) : 3 === this.tabIndex ? ft.ExtJewel.getDecomposePreview(c.id) : ft.ExtItem.getDecomposePreview(c.id), a = a.concat(r.ids), r.nums) {
                                for (var f = 0; f < r.nums.length; f++) r.nums[f] *= h;
                                n = n.concat(r.nums), s = s.concat(r.gls)
                            }
                        }
                        for (o = a.length - 1; o > 0; o--) {
                            var d = a.indexOf(a[o], 0);
                            d !== o && (100 === s[o] && 100 === s[d] || s[o] < 100 && s[d] < 100) && (n[d] += n[o], a.splice(o, 1), s.splice(o, 1), n.splice(o, 1))
                        }
                        for (o = 0; o < a.length; o++) s[o] < 100 ? e.push({
                            id: a[o],
                            num: 0
                        }) : t.push({
                            id: a[o],
                            num: n[o]
                        })
                    }
                    this.labelGold.string = i, this.listViewMaterial1.setListView(t), this.listViewMaterial2.setListView(e)
                },
                onKeyMenu: function (t) {
                    if (!t) {
                        var e = this.tabIndex + 1;
                        return e > 4 && (e = 0), this.selectTab(e), !0
                    }
                }
            })
        