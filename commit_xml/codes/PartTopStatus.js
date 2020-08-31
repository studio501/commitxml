
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeLeft: cc.Node,
                    buttonBack: cc.Button,
                    labelTitle: cc.Label,
                    nodeRight: cc.Node,
                    labelGold: cc.Label,
                    buttonGold: cc.Button,
                    labelGem: cc.Label,
                    buttonGem: cc.Button,
                    labelPower: cc.Label,
                    buttonPower: cc.Button,
                    tvGem: cc.Node,
                    tvPower: cc.Node,
                    tvGold: cc.Node,
                    nodeExt: cc.Node,
                    spriteExt: cc.Sprite,
                    labelExt: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonBack, {
                        zone: 99,
                        phoneBack: !0
                    }), this.addClick(this.buttonGold, !0), this.addClick(this.buttonGem, !0), this.addClick(this.buttonPower, !0), ftc.isIphoneX() ? this.buttonBack.node.x = 30 : this.buttonBack.node.x = 0, ftc.isTv() ? (this.tvGem.active = !1, this.tvPower.active = !1, this.tvGold.active = !1) : ftc.ManagerH5.isH5() && (807 !== ftc.getSourceId() && 809 !== ftc.getSourceId() || (this.buttonGem.interactable = !1, this.tvGem.active = !1));
                    var t = this.nodeRight.getComponent(cc.Widget);
                    ftc.ManagerH5.hasRightTopMenu() ? t.right = 180 : t.right = 30, t.updateAlignment()
                },
                load: function () {
                    this.callback = void 0, this.data = void 0, this.labelTitle.string = "", this.updateData(), ftc.ManagerTV.setBackButton(this.buttonBack);
                    var t = ftc.ManagerRes.topLayout();
                    "LayoutMain" != t.getName() && ftc.setTvTip(t.node), ftc.ManagerTV.setPhoneBack(ftc.ManagerRes.topLayout().node, ftc.ManagerTV.getPhoneBack(this.node)), this.node.zIndex = 1, this.nodeExt.active = !1, this.extId = 0
                },
                setData: function (t) {
                    this.data = t
                },
                setTitle: function (t, e) {
                    t = ftc.language(t), this.labelTitle.string = t, void 0 === e && (e = 0), this.nodeLeft.active = 0 === e || 1 === e, this.nodeRight.active = 0 === e || 2 === e
                },
                setExt: function (t) {
                    this.extId = t, this.extId ? (this.nodeExt.active = !0, this.spriteExt.spriteFrame = ft.ExtItem.getLittleIconSprite(this.extId), this.labelExt.string = ft.ExtItem.getNum(this.extId)) : this.nodeExt.active = !1
                },
                setCloseCallback: function (t) {
                    this.callback = t
                },
                cleanup: function () { },
                updateData: function () {
                    this.labelGold.string = ft.getNumShow(ft.ExtItem.getGold()), this.labelGem.string = ft.ExtItem.getGem(), this.labelPower.string = ft.ExtItem.getPower(), this.extId && (this.labelExt.string = ft.ExtItem.getNum(this.extId))
                },
                tick: function (t) {
                    ftc.ManagerData.isNewC2() && this.updateData()
                },
                onClick: function (t, e) {
                    var i = ftc.ManagerRes.topLayout();
                    i && (t.target === this.buttonBack.node ? (this.setExt(0), this.callback ? this.callback() : i.cancel()) : t.target === this.buttonGold.node ? ftc.loadLayout("LayoutBuyGold") : t.target === this.buttonGem.node ? ftc.ManagerRes.findLayout("LayoutBuyGem") || ftc.openBuyGem() : t.target === this.buttonPower.node && ftc.loadLayout("LayoutBuyPower"))
                }
            })
        