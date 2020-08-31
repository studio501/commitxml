
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    spriteNumBg: cc.Sprite,
                    labelNum: cc.Label,
                    spriteSelect: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf), this.spriteSelect.node.zIndex = 10
                },
                load: function () {
                    this._item = this.newPart("PartItem"), this._item.node.y = 11, this._item.setInteractable(!1), this.node.addChild(this._item.node, 0), this.spriteNumBg.node.active = !1, this.spriteNumBg.node.zIndex = 1, this.labelNum.node.active = !1, this.labelNum.node.zIndex = 2
                },
                updateData: function (t) {
                    var e = this.data.id,
                        i = this.data.num;
                    if (this._item.setData(e, i, !0), this.spriteNumBg.node.active = this.data.give, this.labelNum.node.active = this.data.give, this.buttonSelf.interactable = !0, this.data.give) {
                        var a = ft.ExtItem.getNum(e);
                        this._item.setNum(0), this.labelNum.string = a + "/" + i, this.labelNum.node.color = a >= i ? ftc.newColor(ftc.value.color.green) : ftc.newColor(ftc.value.color.red), this.buttonSelf.interactable = a >= i
                    }
                    this.spriteSelect.node.active = this.index === t
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    ftc.sendClient("c_onSelectGoodsItem", this)
                }
            })
        