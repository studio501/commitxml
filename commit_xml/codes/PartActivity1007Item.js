
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    nodeItem: cc.Node,
                    labelDiscount: cc.Label,
                    labelOldPrice: cc.Label,
                    labelName: cc.Label,
                    labelTimes: cc.Label,
                    spriteIcon: cc.Sprite,
                    labelPrice: cc.Label,
                    nodePriceInfo: cc.Node,
                    nodeSellOut: cc.Node,
                    nodeOwned: cc.Node
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                load: function () {
                    this._item = this.newPart("PartItem"), this._item.setInteractable(!1), this._item.node.scale = .85, this.nodeItem.addChild(this._item.node)
                },
                updateData: function (t) {
                    this.param = t, this._item.setData(this.data.id), this.labelName.string = ft.ExtItem.getName(this.data.id) + "x" + this.data.num, this.spriteIcon.spriteFrame = ft.ExtItem.getLittleIconSprite(this.data.switchId), this.labelPrice.string = this.data.switchNum, this.nodePriceInfo.active = !1;
                    var e, i = this.param.ste.split(",")[this.index];
                    if (void 0 === i && (i = 0), this.count = this.data.count - i, this.count <= 0) this.nodeSellOut.active = !0;
                    else {
                        var a = ft.ExtItem.getTopLimit(this.data.id),
                            n = 0;
                        if (ft.ExtItem.getType(this.data.id) == ft.type.item.whole) {
                            var s = ft.ExtItem.getEquip(this.data.id);
                            s && (n = ft.ExtEquip.getNum(s))
                        } else n = ft.ExtItem.getNum(this.data.id);
                        a && n >= a ? this.nodeOwned.active = !0 : (this.nodeOwned.active = !1, this.nodeSellOut.active = !1, this.nodePriceInfo.active = !0)
                    }
                    if (this.labelTimes.string = ftc.language("可购买次数:") + this.count + "/" + this.data.count, this.data.switchId == ft.value.item.gem || this.data.switchId == ft.value.item.gem2) {
                        var o = ft.ExtItem.getBuyGem(this.data.id);
                        o > 0 && (e = o * this.data.num)
                    } else if (this.data.switchId == ft.value.item.gold) {
                        var r = ft.ExtItem.getBuyGold(this.data.id);
                        r > 0 && (e = r * this.data.num)
                    }
                    if (e && e > this.data.switchNum) {
                        this.labelDiscount.node.parent.active = !0;
                        var c = 10 * this.data.switchNum / e;
                        c = c > Math.floor(c) ? c.toFixed(1) : c, this.labelDiscount.string = c + ftc.language("折"), this.labelOldPrice.node.active = !0, this.labelOldPrice.string = ftc.language("原价:") + e
                    } else this.labelDiscount.node.parent.active = !1, this.labelOldPrice.node.active = !1
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && this.count > 0 && ftc.loadLayout("LayoutShop2Buy", function (t) {
                        t.setData({
                            id: this.data.id,
                            num: this.data.num,
                            currency: this.data.switchId,
                            currencyNum: this.data.switchNum,
                            count: this.count
                        }, function (t) {
                            ft.ExtItem.getNum(this.data.switchId) < this.data.switchNum * t ? ftc.showTip(ft.ExtItem.getName(this.data.switchId) + ftc.language("不足")) : ftc.send("msgActivityGet", {
                                eid: this.param.entityId,
                                index: this.index,
                                num: t
                            })
                        }.bind(this))
                    }.bind(this))
                }
            })
        