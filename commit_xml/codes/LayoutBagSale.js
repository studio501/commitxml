
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    labelTitle: cc.Label,
                    nodeItem: cc.Node,
                    labelName: cc.Label,
                    labelTip: cc.Label,
                    spriteIcon: cc.Sprite,
                    labelPrice: cc.Label,
                    slider: cc.Slider,
                    maskSlider: cc.Mask,
                    buttonAdd: cc.Button,
                    buttonSub: cc.Button,
                    buttonClose: cc.Button,
                    buttonSale: cc.Button,
                    buttonBuy: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonSale), this.addClick(this.buttonBuy), this.addClick(this.buttonAdd, !0), this.addClick(this.buttonSub, !0), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose), this.slider.node.on("slide", function (t) {
                        this.setItemNum(parseInt(this.slider.progress * this.data.num))
                    }, this)
                },
                load: function () {
                    this._item = this.newPart("PartItem"), this.nodeItem.addChild(this._item.node), this.item = void 0, ftc.setTvTip(this.node, "\u8fd4\u56de\u952e\u5173\u95ed\uff0c\u5de6\u53f3\u952e\u52a0\u51cf1\uff0c\u4e0a\u4e0b\u952e\u52a0\u51cf10")
                },
                setData: function (t, e, i) {
                    this.data = t, void 0 === e && (e = 0), this.type = e, this.callback = i, 0 === e ? this._item.setData(this.data.id, this.data.num) : 1 === e ? this._item.setEquipData(this.data) : 3 === e ? this._item.setJewelData(this.data) : this._item.setData(this.data.id);
                    var a = this.data.id;
                    if (0 === e) {
                        this.labelTitle.string = ftc.language("\u51fa\u552e"), this.itemNum = this.data.num;
                        var n = ft.ExtItem.getSaleGold(this.data.id);
                        this.itemPrice = ft.ExtItem.getSaleGold(this.data.id), this.spriteIcon.spriteFrame = ft.ExtItem.getLittleIconSprite(ft.value.item.gold)
                    } else if (1 === e) {
                        this.labelTitle.string = ftc.language("\u51fa\u552e"), this.itemNum = this.data.num, a = ft.ExtItem.mapWholeEquips[this.data.id];
                        n = ft.ExtItem.getSaleGold(a);
                        for (var s = ft.ExtEquip.getUpgradeCost(this.data.id), o = 0; o < this.data.goldLv; o++) n += .5 * ft.ExtEquip.getLvGold(s, o);
                        this.itemPrice = parseInt(n), this.spriteIcon.spriteFrame = ft.ExtItem.getLittleIconSprite(ft.value.item.gold)
                    } else if (3 === e) {
                        this.labelTitle.string = ftc.language("\u51fa\u552e"), this.itemNum = this.data.num, a = ft.ExtItem.mapJewels[this.data.id];
                        n = ft.ExtItem.getSaleGold(a);
                        this.itemPrice = parseInt(n), this.spriteIcon.spriteFrame = ft.ExtItem.getLittleIconSprite(ft.value.item.gold)
                    } else if (2 === e) {
                        this.labelTitle.string = ftc.language("\u8d2d\u4e70"), this.itemNum = 1, (n = ft.ExtItem.getBuyGem(this.data.id)) > 0 ? (this.spriteIcon.spriteFrame = ft.ExtItem.getLittleIconSprite(ft.value.item.gem), this.item = ft.value.item.gem) : (n = ft.ExtItem.getBuyGold(this.data.id), this.item = ft.value.item.gold, this.spriteIcon.spriteFrame = ft.ExtItem.getLittleIconSprite(ft.value.item.gold)), this.itemPrice = n
                    }
                    this.labelName.string = ft.ExtItem.getName(a), this.labelPrice.string = this.itemPrice, this.slider.progress = this.itemNum / this.data.num, this.buttonSale.node.active = 0 === e || 1 === e || 3 === e, this.buttonBuy.node.active = 2 === e, this.updateTip()
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                setItemNum: function (t) {
                    t > this.data.num ? t = this.data.num : t < 1 && (t = 1), this.itemNum !== t && (this.itemNum = t, this.slider.progress = this.itemNum / this.data.num, this.updateTip())
                },
                updateTip: function () {
                    0 === this.type || 1 === this.type || 3 === this.type ? this.labelTip.string = ftc.language("\u51fa\u552e") + this.itemNum + ftc.language("\u4e2a, \u5171\u53ef\u83b7\u5f97\u94f6\u5e01") + this.itemPrice * this.itemNum : 2 === this.type && (this.labelTip.string = ftc.language("\u8d2d\u4e70") + this.itemNum + ftc.language("\u4e2a, \u5171\u6d88\u8017") + ft.ExtItem.getName(this.item) + this.itemPrice * this.itemNum), this.maskSlider.node.width = 300 * this.slider.progress
                },
                onClick: function (t, e) {
                    t.target === this.buttonAdd.node ? this.setItemNum(this.itemNum + 1) : t.target === this.buttonSub.node ? this.setItemNum(this.itemNum - 1) : t.target === this.buttonClose.node ? this.cancel(!0) : t.target === this.buttonSale.node ? (0 === this.type ? ftc.send("itemSale", {
                        ids: this.data.id,
                        nums: this.itemNum
                    }) : 1 === this.type ? ftc.send("equipSale", {
                        eids: this.data.entityId,
                        nums: this.itemNum
                    }) : 3 === this.type && ftc.send("jewelSale", {
                        eids: this.data.entityId,
                        nums: this.itemNum
                    }), this.cancel()) : t.target === this.buttonBuy.node && this.callback && (this.itemPrice * this.itemNum > ft.ExtItem.getGold() ? ftc.showTip("\u94f6\u5e01\u4e0d\u8db3") : (this.callback(this.itemNum), this.cancel()))
                },
                onKeyDirection: function (t, e) {
                    if (!t) {
                        if (1 == e) return this.setItemNum(this.itemNum + 10), !0;
                        if (2 == e) return this.setItemNum(this.itemNum - 10), !0;
                        if (3 == e) return this.setItemNum(this.itemNum - 1), !0;
                        if (4 == e) return this.setItemNum(this.itemNum + 1), !0
                    }
                }
            })
        