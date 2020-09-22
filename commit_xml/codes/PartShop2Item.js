
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    nodeItem: cc.Node,
                    labelDiscount: cc.Label,
                    labelOldPrice: cc.Label,
                    labelName: cc.Label,
                    spriteIcon: cc.Sprite,
                    labelPrice: cc.Label,
                    nodeSellOut: cc.Node,
                    nodeCondition: cc.Node,
                    labelCondition: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                load: function () {
                    this._item = this.newPart("PartItem"), this._item.setInteractable(!1), this.nodeItem.addChild(this._item.node), this.nodeCondition.active = !1
                },
                updateData: function (t) {
                    if (this._item.setData(this.data.id), this.labelName.string = ft.ExtItem.getName(this.data.id) + "x" + this.data.num, this.spriteIcon.spriteFrame = ft.ExtItem.getLittleIconSprite(this.data.currency), this.labelPrice.string = this.data.currencyNum, this.nodeSellOut.active = 0 == this.data.count, this.buttonSelf.interactable = !this.nodeSellOut.active, this.data.oldCurrencyNum) {
                        this.labelDiscount.node.parent.active = !0;
                        var e = 10 * this.data.currencyNum / this.data.oldCurrencyNum;
                        e >= 1 ? (e = e > Math.floor(e) ? e.toFixed(1) : e, this.labelDiscount.string = Math.floor(e) + ftc.language("折")) : this.labelDiscount.string = ftc.language("特惠"), this.labelOldPrice.node.active = !0, this.labelOldPrice.string = ftc.language("原价:") + this.data.oldCurrencyNum
                    } else this.labelDiscount.node.parent.active = !1, this.labelOldPrice.node.active = !1;
                    t == ft.value.shop.crystal && (this.nodeCondition.active = !ft.ExtShop.checkCanBuy(this.data.id, ftc.ManagerData.get2Object("Hero")), this.nodeCondition.active && (this.buttonSelf.interactable = !1, this._item.setInteractable(!0), 12015 == this.data.id ? this.labelCondition.string = "兑换条件:\n宝箱内武将3名3星、1名觉醒+3" : this.labelCondition.string = "兑换条件:\n宝箱内武将3名3星、1名金色"))
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node ? ftc.sendClient("c_onSelectShop2Item", this) : ftc.showTip("已售空")
                }
            })
        