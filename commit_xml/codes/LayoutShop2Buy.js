
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonSelf: cc.Button,
                    nodeGoods: cc.Node,
                    nodeItem: cc.Node,
                    labelName: cc.Label,
                    spritePrice: cc.Sprite,
                    labelPrice: cc.Label,
                    labelInfo: cc.Label,
                    nodeSelectNum: cc.Node,
                    slider: cc.Slider,
                    maskSlider: cc.Mask,
                    buttonAdd: cc.Button,
                    buttonSub: cc.Button,
                    buttonBuy: cc.Button,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonSelf, !0), this.addClick(this.buttonBuy), this.addClick(this.buttonAdd), this.addClick(this.buttonSub), this.addClick(this.buttonClose, {
                        zone: 99
                    }), this.slider.node.on("slide", function (t) {
                        this.itemNum = Math.ceil(this.slider.progress * this.data.count), 0 === this.itemNum && (this.itemNum = 1), this.setItemNumDesc(this.itemNum), this.updateTip()
                    }, this), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    this._item = this.newPart("PartItem"), this._item.node.scale = .9, this.nodeItem.addChild(this._item.node), ftc.setTvTip(this.node, "\u8fd4\u56de\u952e\u5173\u95ed\uff0c\u5de6\u53f3\u952e\u52a0\u51cf1\uff0c\u4e0a\u4e0b\u952e\u52a0\u51cf10")
                },
                setData: function (t, e) {
                    this.data = t, this.callback = e, this._item.setData(this.data.id), this.setItemNumDesc(1), this.spritePrice.spriteFrame = ft.ExtItem.getLittleIconSprite(this.data.currency), this.labelInfo.string = ft.ExtItem.getInfo(this.data.id), this.itemNum = 1, this.data.count > 1 ? (this.nodeGoods.y = 0, this.nodeSelectNum.active = !0) : (this.nodeGoods.y = -38, this.nodeSelectNum.active = !1), this.slider.progress = this.itemNum / this.data.count, this.updateTip()
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
                    t > this.data.count ? t = this.data.count : t < 1 && (t = 1), this.itemNum !== t && (this.itemNum = t, this.setItemNumDesc(this.itemNum), this.slider.progress = this.itemNum / this.data.count, this.updateTip())
                },
                setItemNumDesc: function (t) {
                    this.labelName.string = ft.ExtItem.getName(this.data.id) + "x" + this.data.num * t
                },
                updateTip: function () {
                    this.labelPrice.string = this.data.currencyNum * this.itemNum, this.maskSlider.node.width = 300 * this.slider.progress
                },
                onClick: function (t, e) {
                    t.target === this.buttonAdd.node ? this.setItemNum(this.itemNum + 1) : t.target === this.buttonSub.node ? this.setItemNum(this.itemNum - 1) : t.target === this.buttonBuy.node ? (this.callback && this.callback(this.itemNum), this.cancel()) : t.target !== this.buttonClose.node && t.target !== this.buttonSelf.node || this.cancel()
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
        