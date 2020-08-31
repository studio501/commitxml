
            
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
                        e >= 1 ? (e = e > Math.floor(e) ? e.toFixed(1) : e, this.labelDiscount.string = Math.floor(e) + ftc.language("\u6298")) : this.labelDiscount.string = ftc.language("\u7279\u60e0"), this.labelOldPrice.node.active = !0, this.labelOldPrice.string = ftc.language("\u539f\u4ef7:") + this.data.oldCurrencyNum
                    } else this.labelDiscount.node.parent.active = !1, this.labelOldPrice.node.active = !1;
                    t == ft.value.shop.crystal && (this.nodeCondition.active = !ft.ExtShop.checkCanBuy(this.data.id, ftc.ManagerData.get2Object("Hero")), this.nodeCondition.active && (this.buttonSelf.interactable = !1, this._item.setInteractable(!0), 12015 == this.data.id ? this.labelCondition.string = "\u5151\u6362\u6761\u4ef6:\n\u5b9d\u7bb1\u5185\u6b66\u5c063\u540d3\u661f\u30011\u540d\u89c9\u9192+3" : this.labelCondition.string = "\u5151\u6362\u6761\u4ef6:\n\u5b9d\u7bb1\u5185\u6b66\u5c063\u540d3\u661f\u30011\u540d\u91d1\u8272"))
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node ? ftc.sendClient("c_onSelectShop2Item", this) : ftc.showTip("\u5df2\u552e\u7a7a")
                }
            })
        