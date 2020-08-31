
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonSelf: cc.Button,
                    nodeItem1: cc.Node,
                    spriteSelect1: cc.Sprite,
                    buttonItem1: cc.Button,
                    nodeItem2: cc.Node,
                    spriteSelect2: cc.Sprite,
                    buttonItem2: cc.Button,
                    labelDesc: cc.Label,
                    buttonConfirm: cc.Button,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonSelf, !0), this.addClick(this.buttonConfirm), this.addClick(this.buttonItem1), this.addClick(this.buttonItem2), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    ftc.setTvTip(this.node);
                    var t = this.newPart("PartItem");
                    t.setInteractable(!1), this.nodeItem1.addChild(t.node), this.item1 = t, (t = this.newPart("PartItem")).setInteractable(!1), this.nodeItem2.addChild(t.node), this.item2 = t, this.spriteSelect1.node.active = !0, this.spriteSelect2.node.active = !1
                },
                setData: function (t, e) {
                    this.type = t, 1 === t ? (this.id = e, this.item1.setData(ft.value.item.gold), this.item1.setName(ftc.language("\u94f6\u5e01\u5f3a\u5316")), this.item2.setData(ft.value.item.equipUpgrade1), this.item2.setName(ftc.language("\u5f3a\u5316\u5238\u5f3a\u5316")), this.updateData()) : 2 === t && (this.item1.setData(ft.value.item.yeYingZhang1, ft.ExtItem.getNum(ft.value.item.yeYingZhang1)), this.item1.setName(ftc.language("\u91ce\u8425\u5e10")), this.item2.setData(ft.value.item.yeYingZhang2, ft.ExtItem.getNum(ft.value.item.yeYingZhang2)), this.item2.setName(ftc.language("\u9ad8\u7ea7\u91ce\u8425\u5e10")), this.updateData())
                },
                enter: function () { },
                updateData: function () {
                    if (1 === this.type) {
                        var t = ft.ExtHero.getPos(this.id),
                            e = ft.ExtEquip.getEquipsByPos(t);
                        if (0 === e.length) this.labelDesc.string = ftc.language("\u65e0\u88c5\u5907");
                        else {
                            for (var i = {}, a = {}, n = {}, s = 0; s < e.length; s++) i[e[s].entityId] = e[s].lv, a[e[s].entityId] = e[s].goldLv, n[e[s].entityId] = 0;
                            var o, r = function () {
                                for (var t = i[e[0].entityId], a = e[0], n = 1; n < e.length; n++) t > i[e[n].entityId] && (t = i[e[n].entityId], a = e[n]);
                                return a
                            },
                                c = ftc.ManagerData.get1("Player").level,
                                h = Math.min(ft.value.com.maxEquipLevel, c),
                                f = 0;
                            for (ftc.ManagerData.get2Object("Item"), s = 0; s < 2400; s++) {
                                var d = r();
                                if (i[d.entityId] >= h) {
                                    o = "\u5df2\u7ecf\u8fbe\u5230\u73a9\u5bb6\u6700\u5927\u7b49\u7ea7";
                                    break
                                }
                                if (this.spriteSelect1.node.active) {
                                    var l = ft.ExtEquip.calcNeedGold(d.id, 1, a[d.entityId]);
                                    if (l > ft.ExtItem.getGold()) {
                                        o = "\u94f6\u5e01\u4e0d\u8db3";
                                        break
                                    }
                                    if (f + l > ft.ExtItem.getGold()) break;
                                    f += l, i[d.entityId] += 1, a[d.entityId] += 1, n[d.entityId] += 1
                                } else {
                                    var u = ft.ExtEquip.getPart(d.id);
                                    if (!(ft.ExtItem.getNum(ft.value.item["equipUpgrade" + u]) > 0)) {
                                        o = "\u5f3a\u5316\u5238\u4e0d\u8db3";
                                        break
                                    }
                                    f += 1, i[d.entityId] += 1, n[d.entityId] += 1
                                }
                            }
                            var p = [],
                                g = [];
                            for (var s in n) p.push(s), g.push(n[s]);
                            this.consume = f, this.tip = o, f > 0 ? this.spriteSelect1.node.active ? (this.labelDesc.string = "\u786e\u5b9a\u4e00\u952e\u5f3a\u5316\u88c5\u5907\uff0c\u6d88\u8017{0}\u94f6\u5e01".replace("{0}", f), this.lvUpParam = {
                                eids: p,
                                ups: g,
                                gold: !0
                            }) : (this.labelDesc.string = "\u786e\u5b9a\u4e00\u952e\u5f3a\u5316\u88c5\u5907\uff0c\u6d88\u8017{0}\u5f20\u5f3a\u5316\u5238".replace("{0}", f), this.lvUpParam = {
                                eids: p,
                                ups: g
                            }) : this.labelDesc.string = ftc.language(o)
                        }
                    } else 2 === this.type && (this.spriteSelect1.node.active ? this.labelDesc.string = ftc.language("\u6062\u590d\u6240\u6709\u6b66\u5c06\u7684\u5175\u529b\u4e0e\u7b56\u7565\uff0c\u65e0\u6cd5\u590d\u6d3b\u9635\u4ea1\u6b66\u5c06") : this.labelDesc.string = ftc.language("\u6062\u590d\u6240\u6709\u6b66\u5c06\u7684\u5175\u529b\u4e0e\u7b56\u7565\uff0c\u53ef\u590d\u6d3b\u9635\u4ea1\u6b66\u5c06"))
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node || t.target === this.buttonClose.node ? this.cancel() : t.target === this.buttonItem1.node ? (this.spriteSelect1.node.active = !0, this.spriteSelect2.node.active = !1, this.updateData()) : t.target === this.buttonItem2.node ? (this.spriteSelect1.node.active = !1, this.spriteSelect2.node.active = !0, this.updateData()) : t.target === this.buttonConfirm.node && (1 === this.type ? this.consume > 0 ? ftc.showDialog({
                        text: this.labelDesc.string,
                        click1: function () {
                            ftc.send("equipLevelUp", this.lvUpParam), this.cancel()
                        }.bind(this),
                        click2: function () { }
                    }) : ftc.showTip(this.tip) : 2 === this.type && (this.spriteSelect1.node.active ? ftc.send("heroRefreshStatus") : ftc.send("heroRefreshStatus", !0), this.cancel()))
                }
            })
        