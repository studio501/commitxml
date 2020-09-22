
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    spriteName: cc.Sprite,
                    spriteIcon: cc.Sprite,
                    labelRefreshTime: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                load: function () { },
                updateData: function (t) {
                    this.spriteName.spriteFrame = ftc.ManagerRes.getSpriteFrame("txt", "txt_shop_" + this.data), this.spriteIcon.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "shop_icon_" + this.data), this.labelRefreshTime.node.active = !1, t && (this.data !== ft.value.shop.mystery && this.data !== ft.value.shop.honor && this.data !== ft.value.shop.spirit && this.data !== ft.value.shop.huFu || (this.labelRefreshTime.node.active = !0, this.labelRefreshTime.string = "刷新剩余:" + (this.data === ft.value.shop.mystery ? t.timeTip1 : t.timeTip2)))
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectShopItem", this)
                }
            })
        