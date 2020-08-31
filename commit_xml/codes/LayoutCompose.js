
            
            cc._RF.push(e, "039faIPDx9D767megju23A7", "LayoutCompose");
            cc.Class({
                extends: ftc.BaseView,
                properties: {
                    listView: ftc.ListView,
                    partImports: [t("PartComposeImport")],
                    spriteLock: cc.Sprite,
                    labelCondition: cc.Label,
                    nodeExportItem: cc.Node,
                    spriteEquipBg: cc.Sprite,
                    spriteIcon: cc.Sprite,
                    labelNum: cc.Label,
                    nodeInputNum: cc.Node,
                    buttonSub: cc.Button,
                    editBox: cc.EditBox,
                    buttonAdd: cc.Button,
                    buttonMax: cc.Button,
                    buttonConfirm: cc.Button,
                    buttonDetail: cc.Button,
                    buttonPutIn: cc.Button,
                    buttonTabs: [cc.Button]
                },
                init: function () {
                    this.prepareParts(["PartItemShine"]), this.addClick(this.buttonPutIn), this.addClick(this.buttonConfirm), this.addClick(this.buttonSub), this.addClick(this.buttonAdd), this.addClick(this.buttonMax), this.addClick(this.buttonDetail, !0);
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t], !0);
                    this.editBox.node.on("text-changed", function () {
                        this._setNum(Number(this.editBox.textLabel.string))
                    }.bind(this)), ftc.isTv() && (this.buttonDetail.node.active = !1), this.spriteLock.node.zIndex = 10
                },
                load: function () {
                    this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("\u5408\u6210"), this.node.addChild(this.partTopStatus.node);
                    for (var t = 0; t < this.partImports.length; t++) this.initPart(this.partImports[t]);
                    this.itemExport = this.newPart("PartItem"), this.spriteEquipBg.node.addChild(this.itemExport.node), this.itemExport.node.active = !1, this.labelNum.string = "0", this._composeType = void 0, this._conditions = [!1, !1, !1, !1], this._inputNum = 0, this._inputNumMax = 0, this._checkCanCompose(), this.selectTab(0)
                },
                setData: function (t) { },
                enter: function () {
                    this.updateData()
                },
                updateData: function () {
                    if (this._composeType === ft.type.compose.equip || this._composeType === ft.type.compose.material) {
                        var t = ft.ExtItem.getGold(),
                            e = ft.ExtConsume.getItems(this._recipeId, 5).nums[0] * Math.max(this._inputNum, 1);
                        this.labelNum.string = e, this.labelNum.node.color = t >= e ? ftc.newColor(4855815) : ftc.newColor(ftc.value.color.lackRed), this._conditions[3] = t >= e, this._checkCanCompose()
                    }
                },
                tick: function (t) {
                    this.toTvUpdate && (this.toTvUpdate = void 0, this.selectedIndex < this.datas.length && ftc.ManagerTV.nextSelect(this.listView.getItem(this.selectedIndex).buttonSelf))
                },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectListEquipItem: function (t, e) {
                            this.partImports[0].setData(t.data, void 0, this._composeType), this._updateItemExport(), this._conditions[0] = t.data.star >= 5, this._checkCanCompose()
                        },
                        c_onSelectListJewelItem: function (t, e) {
                            var i = t.data,
                                a = ft.ExtJewel.mapJewelConsume[i.id],
                                n = a.need,
                                s = a.out;
                            this.partImports[1].setData({
                                id: i.id,
                                num: n,
                                entityId: i.entityId
                            }, void 0, this._composeType), this._conditions[1] = this.partImports[1].isSufficient(), this.itemExport.node.active = !0, this.itemExport.setData(s), this._inputNumMax = Math.floor(ft.ExtJewel.getNum(i.entityId) / n), this._inputNum = this._inputNumMax > 0 ? 1 : 0, this.editBox.string = this._inputNum, this._checkCanCompose()
                        },
                        c_onSelectComposeItem: function (t, e) {
                            this.setRecipeInfo(t.data), this.listView.updateListViewItems({
                                type: this._composeType,
                                index: t.index
                            }), this.selectedIndex = t.index
                        },
                        equipCompose: function (t, e) {
                            t > 0 ? (this._showComposeTip(), this.setRecipeInfo(this._recipeId)) : ftc.showTip("\u91cd\u94f8\u5931\u8d25")
                        },
                        itemRecipeCompose: function (t, e) {
                            this._showComposeTip(), this.setRecipeInfo(this._recipeId)
                        },
                        jewelUpgrade: function (t, e) {
                            this._showComposeTip(), this.setRecipeInfo(this._recipeId)
                        }
                    }
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonSub.node) this._setNum(this._inputNum - 1);
                    else if (t.target === this.buttonAdd.node) this._setNum(this._inputNum + 1);
                    else if (t.target === this.buttonMax.node) this._setNum(this._inputNumMax);
                    else if (t.target === this.buttonDetail.node) ftc.showDetailInfo(this.buttonDetail.node, ft.ExtDetail.getInfo(ft.value.detail.compose));
                    else if (t.target === this.buttonConfirm.node)
                        if (this._composeType === ft.type.compose.equip) ftc.send("equipCompose", {
                            recipeId: this._recipeId,
                            eid: this.partImports[0].getData().entityId,
                            itemId: this.partImports[1].getData().id
                        });
                        else if (this._composeType === ft.type.compose.material) ftc.send("itemRecipeCompose", {
                            recipeId: this._recipeId,
                            num: this._inputNum
                        });
                        else {
                            var i = this.partImports[1].getData(),
                                a = ft.ExtJewel.mapJewelConsume[i.id],
                                n = a.need,
                                s = ft.ExtItem.getJewel(a.out),
                                o = ft.ExtJewel.getName(i.id),
                                r = ft.ExtJewel.getName(s),
                                c = "\u662f\u5426\u6d88\u8017{0}\u4e2a{1}\u5408\u6210{2}\u4e2a{3}".replace(/\{(\d+)\}/g, function (t, e) {
                                    return [n * this._inputNum, o, this._inputNum, r][e]
                                }.bind(this));
                            ftc.showDialog({
                                text: c,
                                click1: function () {
                                    ftc.send("jewelUpgrade", {
                                        eid: i.entityId,
                                        num: this._inputNum
                                    })
                                }.bind(this),
                                click2: function () { }
                            })
                        } else if (t.target === this.buttonPutIn.node) {
                            var h = !0;
                            if (!this.partImports[0].getData()) {
                                h = !1;
                                var f = ft.ExtConsume.getItems(this._recipeId, 2),
                                    d = ftc.ManagerData.get2("Equip");
                                for (var l in d) {
                                    if (d[l].star >= 5)
                                        if (-1 !== (g = f.ids.indexOf(d[l].id)) && d[l].num >= f.nums[g]) {
                                            this.partImports[0].setData(d[l], void 0, ft.type.compose.equip), this._updateItemExport(), h = !0;
                                            break
                                        }
                                }
                                this._conditions[0] = h
                            }
                            var u = !0;
                            if (!this.partImports[1].getData()) {
                                u = !1;
                                f = ft.ExtConsume.getItems(this._recipeId, 3);
                                var p = ftc.ManagerData.get2("Item");
                                for (var l in p) {
                                    var g;
                                    if (-1 !== (g = f.ids.indexOf(p[l].id)) && p[l].num >= f.nums[g]) {
                                        this.partImports[1].setData({
                                            id: p[l].id,
                                            num: f.nums[g]
                                        }), u = !0;
                                        break
                                    }
                                }
                                this._conditions[2] = u
                            }
                            this._checkCanCompose(), h && u ? ftc.showTip("\u653e\u5165\u6210\u529f") : ftc.showTip("\u653e\u5165\u5931\u8d25")
                        } else
                        for (l = 0; l < this.buttonTabs.length; l++)
                            if (t.target === this.buttonTabs[l].node) {
                                this.selectTab(l);
                                break
                            }
                },
                selectTab: function (t) {
                    this.tabIndex = t, this._composeType = [ft.type.compose.equip, ft.type.compose.material, ft.type.compose.jewel][this.tabIndex];
                    for (var e = [ftc.type.tab.compose_equip, ftc.type.tab.compose_material, ftc.type.tab.compose_jewel], i = 0; i < this.buttonTabs.length; i++) this.buttonTabs[i].interactable = this.tabIndex !== i, this.buttonTabs[i].node.getChildByName("spriteTabIcon").getComponent(cc.Sprite).spriteFrame = ftc.getTabSpriteFrame(e[i], t === i), this.buttonTabs[i].node.getChildByName("labelTab").color = t !== i ? ftc.newColor(ftc.value.color.tabNormal) : ftc.newColor(ftc.value.color.tabPressed), this.buttonTabs[i].node.getChildByName("labelTab").getComponent(cc.LabelOutline).color = t !== i ? ftc.newColor(ftc.value.color.tabNormalOutline) : ftc.newColor(ftc.value.color.tabPressedOutline);
                    this.partImports[0].node.active = this._composeType === ft.type.compose.equip, this.partImports[1].node.active = !0, this.partImports[2].node.active = this._composeType === ft.type.compose.equip || this._composeType === ft.type.compose.material, this.nodeInputNum.active = this._composeType !== ft.type.compose.equip, this.buttonPutIn.node.active = !this.nodeInputNum.active, this.buttonConfirm.node.x = this.nodeInputNum.active ? 185 : 140, this.buttonConfirm.node.getChildByName("Text").getComponent(cc.Label).string = this._composeType === ft.type.compose.equip ? "\u5f00\u59cb\u91cd\u94f8" : "\u5f00\u59cb\u5408\u6210";
                    var a = ft.ExtConsume.getRecipesByType(this._composeType);
                    this.listView.setListView(a, {
                        type: this._composeType,
                        index: 0
                    }), this.setRecipeInfo(a[0]), this.datas = a, this.selectedIndex = 0, ftc.isTv() && (this.toTvUpdate = !0, this.tvSelectList = !0, this.updateTvTip())
                },
                setRecipeInfo: function (t) {
                    if (this._recipeId = t, this.itemExport.node.active = !0, this.labelCondition.node.active = !1, this.spriteLock.node.active = !1, this._composeType === ft.type.compose.equip) {
                        this._inputNum = 1, this.updateData();
                        var e = ft.ExtConsume.checkIsLock(this._recipeId);
                        this.itemExport.setData(ft.ExtConsume.getOut(this._recipeId)), this.itemExport.setStatus(e ? 3 : 0), e && (this.spriteLock.node.active = !0, this.labelCondition.node.active = !0, this.labelCondition.string = ft.ExtConsume.getCondition(this._recipeId)), this._conditions[0] = !1, this.partImports[0].setData(null, this._recipeId, ft.type.compose.equip), this.partImports[0].setCallback(function () {
                            var t = ft.ExtConsume.getItems(this._recipeId, 2).ids,
                                e = ftc.ManagerData.get2("Equip"),
                                i = [];
                            for (var a in e)
                                if (!(e[a].star < 5))
                                    for (var n in t)
                                        if (e[a].id === parseInt(t[n])) {
                                            i.push(e[a]);
                                            break
                                        } i.length > 0 ? ftc.loadLayout("LayoutList", function (t) {
                                            t.setData({
                                                type: ft.type.list.EquipSwitch,
                                                datas: i
                                            })
                                        }) : ftc.showTip("\u65e0\u6ee1\u8db3\u6761\u4ef6\u88c5\u5907")
                        }.bind(this));
                        var i = ft.ExtConsume.getItems(this._recipeId, 3);
                        1 === i.ids.length ? (this.partImports[1].setData({
                            id: i.ids[0],
                            num: i.nums[0]
                        }), this.partImports[1].setCallback(null), this._conditions[2] = this.partImports[1].isSufficient()) : (this.partImports[1].setData(null), this.partImports[1].setCallback(function () {
                            ftc.loadLayout("LayoutSelectGoods", function (t) {
                                t.setData(i, function (t) {
                                    this.onSelectListGoodsItem(t)
                                }.bind(this), !0)
                            }.bind(this))
                        }.bind(this)));
                        var a = ft.ExtConsume.getItems(this._recipeId, 1);
                        this.partImports[2].setData({
                            id: a.ids[0],
                            num: a.nums[0]
                        }), this._conditions[1] = this.partImports[2].isSufficient(), this._checkCanCompose()
                    } else if (this._composeType === ft.type.compose.material) {
                        this.itemExport.setData(ft.ExtConsume.getOut(this._recipeId), 1);
                        var n = ft.ExtConsume.getItems(this._recipeId, 1);
                        this.partImports[1].setData({
                            id: n.ids[0],
                            num: n.nums[0]
                        }), this.partImports[1].setCallback(null), this._conditions[1] = this.partImports[1].isSufficient();
                        var s = ft.ExtConsume.getItems(this._recipeId, 2);
                        this.partImports[2].setData({
                            id: s.ids[0],
                            num: s.nums[0]
                        }), this.partImports[2].setCallback(null), this._conditions[2] = this.partImports[2].isSufficient();
                        var o = ft.ExtConsume.getItems(this._recipeId, 5),
                            r = ft.ExtItem.getNum(n.ids[0]) / n.nums[0],
                            c = ft.ExtItem.getNum(s.ids[0]) / s.nums[0],
                            h = ft.ExtItem.getNum(o.ids[0]) / o.nums[0];
                        this._inputNumMax = Math.floor(Math.min(r, c, h)), this._inputNum = this._inputNumMax > 0 ? 1 : 0, this.editBox.string = this._inputNum, this.updateData(), this._checkCanCompose()
                    } else this._composeType === ft.type.compose.jewel && (this.itemExport.node.active = !1, this.partImports[1].setData(null), this.partImports[1].setCallback(function () {
                        var t = ft.ExtJewel.getJewels(void 0, !0, this._recipeId);
                        t.length > 0 ? ftc.loadLayout("LayoutList", function (e) {
                            e.setData({
                                type: ft.type.list.ChooseJewelUpgrade,
                                datas: t
                            })
                        }.bind(this)) : ftc.showTip("\u65e0\u6b64\u7c7b\u578b\u5b9d\u77f3")
                    }.bind(this)), this._inputNum = 0, this._inputNumMax = 0, this.labelNum.string = 0, this.labelNum.node.color = ftc.newColor(4855815), this.editBox.string = 0, this._conditions[1] = !1, this._checkCanCompose())
                },
                onSelectListGoodsItem: function (t) {
                    this.partImports[1].setData(t.data), this._conditions[2] = this.partImports[1].isSufficient(), this._checkCanCompose()
                },
                _checkCanCompose: function () {
                    if (this._composeType === ft.type.compose.equip) {
                        for (var t = !0, e = 0; e < this._conditions.length; e++)
                            if (!this._conditions[e]) {
                                t = !1;
                                break
                            } this.buttonConfirm.interactable = t
                    } else this._composeType === ft.type.compose.material ? this.buttonConfirm.interactable = this._conditions[1] && this._conditions[2] && this._conditions[3] : this._composeType === ft.type.compose.jewel && (this.buttonConfirm.interactable = this._conditions[1])
                },
                _updateItemExport: function () {
                    var t = ft.ExtItem.getEquip(ft.ExtConsume.getOut(this._recipeId)),
                        e = this.partImports[0].getData();
                    this.itemExport.setEquipData({
                        id: t,
                        num: 1,
                        lv: e.lv
                    })
                },
                _setNum: function (t) {
                    if (t <= 0 ? t = Math.min(this._inputNumMax, 1) : t > this._inputNumMax && (t = this._inputNumMax), this._inputNum = t, this.editBox.textLabel.string = t, this._composeType === ft.type.compose.material) {
                        this.itemExport.setNum(t), this.partImports[1].setNum(t), this.partImports[2].setNum(t);
                        var e = ft.ExtConsume.getItems(this._recipeId, 5).nums[0];
                        this.labelNum.string = e * Math.max(t, 1)
                    } else this.itemExport.setNum(t), this.partImports[1].setNum(t)
                },
                _showComposeTip: function () {
                    for (var t = 0; t < this.partImports.length; t++) this.partImports[t].node.active && this.partImports[t].setWaitAnimation();
                    var e = this.itemExport.getData();
                    this.node.runAction(cc.sequence(cc.delayTime(.6), cc.callFunc(function () {
                        ftc.loadLayout("LayoutComposeTip", function (t) {
                            t.setData(this._composeType, e)
                        }.bind(this))
                    }.bind(this))))
                },
                onKeyMenu: function (t) {
                    if (!t) {
                        var e = this.tabIndex + 1;
                        return e > 2 && (e = 0), this.selectTab(e), !0
                    }
                },
                onKeyOk: function (t) {
                    if (!t && this.tvSelectList) return this.tvSelectList = !1, ftc.ManagerTV.nextSelect(void 0, this.node, 0), this.updateTvTip(), !0
                },
                onKeyBack: function (t) {
                    if (!t && !this.tvSelectList) return this.toTvUpdate = !0, this.tvSelectList = !0, this.updateTvTip(), !0
                },
                updateTvTip: function () {
                    this.tvSelectList ? ftc.setTvTip(this.node, "\u3010\u8fd4\u56de\u952e\u3011\u5173\u95ed\u754c\u9762,\u3010\u83dc\u5355\u952e\u3011\u5207\u6362\u6807\u7b7e,\u3010\u786e\u8ba4\u952e\u3011\u5408\u6210\u8be6\u60c5") : ftc.setTvTip(this.node, "\u3010\u8fd4\u56de\u952e\u3011\u8fd4\u56de\u5217\u8868,\u3010\u83dc\u5355\u952e\u3011\u5207\u6362\u6807\u7b7e")
                }
            })
        