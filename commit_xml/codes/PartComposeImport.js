
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    buttonAdd: cc.Button,
                    spriteNumBg: cc.Sprite,
                    labelNum: cc.Label,
                    labelDesc: cc.Label
                },
                init: function () {
                    this.buttonAdd && this.addClick(this.buttonAdd)
                },
                load: function () {
                    this._callback = void 0, this._data = void 0, this._sufficient = void 0, this._composeType = void 0, this.buttonAdd && (this.buttonAdd.node.zIndex = 1);
                    var t = this.newPart("PartItemShine");
                    t.node.active = !1, this.node.addChild(t.node), t.node.zIndex = 2, this._itemShine = t, this._item = t.getItem(), this._item.node.active = !0, this.spriteNumBg && (this.spriteNumBg.node.active = !1, this.spriteNumBg.node.zIndex = 3, this.labelNum.node.active = !1, this.labelNum.node.zIndex = 4), this.labelDesc && (this.labelDesc.node.ative = !0, this.labelDesc.node.zIndex = 5), this.buttonAdd && this._item.setInteractable(!1)
                },
                setData: function (t, e, i) {
                    if (this._data = t, this._sufficient = void 0, this._composeType = i, t) {
                        if (this._itemShine.node.active = !0, i === ft.type.compose.equip ? this._item.setEquipData(t, !1) : i === ft.type.compose.jewel ? this._item.setJewelData(t, !1) : this._item.setData(t.id, 0, !1), this.spriteNumBg) {
                            var a;
                            this.spriteNumBg.node.active = !0, this.labelNum.node.active = !0, a = i === ft.type.compose.jewel ? ft.ExtJewel.getNum(t.entityId) : ft.ExtItem.getNum(t.id);
                            var n = t.num;
                            this.labelNum.string = a + "/" + n, this.labelNum.node.color = a >= n ? ftc.newColor(65280) : ftc.newColor(16711680), this._sufficient = a >= n
                        }
                        this.labelDesc && (this.labelDesc.node.ative = !1)
                    } else this._itemShine.node.active = !1, this.spriteNumBg && (this.spriteNumBg.node.active = !1, this.labelNum.node.active = !1), this.labelDesc && (this.labelDesc.node.ative = !0, this.labelDesc.string = "\u4efb\u610f\u7d2b\u8272\u4e94\u661f" + ft.type.equip.equipNames[ft.ExtEquip.getType(ft.ExtItem.getEquip(ft.ExtConsume.getOut(e)))])
                },
                setCallback: function (t) {
                    this._callback = t, this.buttonAdd && (this.buttonAdd.node.active = !!t), this._item.setInteractable(!t)
                },
                setNum: function (t) {
                    if (t > 0) {
                        var e = 0;
                        e = this._composeType === ft.type.compose.jewel ? ft.ExtJewel.getNum(this._data.entityId) : ft.ExtItem.getNum(this._data.id);
                        var i = this._data.num * t;
                        this.labelNum.string = e + "/" + i, this._sufficient = e >= i
                    }
                },
                getData: function () {
                    return this._data
                },
                isSufficient: function () {
                    return this._sufficient
                },
                setWaitAnimation: function () {
                    this._itemShine.setWaitAnimation()
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    this.buttonAdd && t.target === this.buttonAdd.node && this._callback && this._callback()
                }
            })
        