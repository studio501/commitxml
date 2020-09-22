
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    nodeItem: cc.Node,
                    spriteSellOut: cc.Sprite,
                    labelName: cc.Label,
                    labelInfo: cc.Label,
                    spriteIcon: cc.Sprite,
                    labelPrice: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                load: function () {
                    this._item = this.newPart("PartItem"), this._item.interactable = !1, this.nodeItem.addChild(this._item.node)
                },
                updateData: function (t) {
                    this._item.setData(this.data.id), this.labelName.string = ft.ExtItem.getName(this.data.id), this.labelInfo.string = ft.ExtItem.getInfo(this.data.id);
                    var e = ft.ExtItem.getBuyGem(this.data.id);
                    if (e > 0) this.spriteIcon.spriteFrame = ft.ExtItem.getLittleIconSprite(ft.value.item.gem), this.labelPrice.string = e;
                    else {
                        var i = ft.ExtItem.getBuyGold(this.data.id);
                        i > 0 && (this.spriteIcon.spriteFrame = ft.ExtItem.getLittleIconSprite(ft.value.item.gold), this.labelPrice.string = i)
                    }
                    if (ft.ExtItem.getType(this.data.id) === ft.type.item.whole) {
                        for (var a = "", n = 0; n < ft.value.com.basePropCount; n++) {
                            var s = ft.ExtPropName.getName(n + 1);
                            0 !== (o = ft.ExtEquip.getLevelValue({
                                id: this.data.id
                            }, n + 1, 1)) && (n + 1 === ft.type.prop.gjjl ? a += s + o + "  " : a += s + o + "%  ")
                        }
                        for (n = 0; n < ft.value.com.basePropCount; n++) {
                            s = ft.ExtPropName.getName(n + 1);
                            0 !== (o = ft.ExtEquip.getExtraValue({
                                id: this.data.id
                            }, n + 1, 1)) && (a += s + o + "  ")
                        }
                        for (n = 0; n < ft.value.com.basePropCount; n++) {
                            var o;
                            s = ft.ExtPropName.getName(n + 1);
                            0 !== (o = ft.ExtEquip.getStarValue({
                                id: this.data.id
                            }, n + 1, 0)) && (a += s + (o > 0 ? "" : "-") + Math.abs(o) + "  ")
                        }
                        this.labelInfo.string = a
                    }
                    this.spriteSellOut.node.active = 0 == this.data.num
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && (this.data.count > 0 ? ftc.sendClient("c_onSelectShop1Item", this) : ftc.showTip("已售空"))
                }
            })
        