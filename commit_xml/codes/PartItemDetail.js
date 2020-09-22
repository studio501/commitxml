
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeRoot: cc.Node,
                    nodeItem: cc.Node,
                    labelName: cc.Label,
                    labelNum: cc.Label,
                    labelType: cc.Label,
                    labelInfo: cc.Label,
                    nodeLayoutMenu: cc.Node,
                    buttonMenu: cc.Button,
                    labelMenu: cc.Label,
                    buttonTvClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonMenu), this.node.on(cc.Node.EventType.TOUCH_END, function () {
                        this.cancel()
                    }, this), this.node._touchListener.swallowTouches = !1, this.addClick(this.buttonTvClose), ftc.ManagerTV.setBackButton(this.buttonTvClose, this.node)
                },
                load: function () {
                    this.callback = void 0
                },
                setData: function (t) {
                    if (this.nodeLayoutMenu.active = !1, this.data = t, this.data.id) {
                        this.nodeItem.removeAllChildren();
                        var e = this.newPart("PartItem");
                        e.setData(this.data.id), e.setInteractable(!1), this.nodeItem.addChild(e.node), this.labelName.string = ft.ExtItem.getName(this.data.id === ft.value.item.gem2 ? ft.value.item.gem : this.data.id), this.labelNum.string = "拥有数量:" + ft.ExtItem.getNum(this.data.id);
                        var i, a = ft.ExtItem.getType(this.data.id);
                        if (a === ft.type.item.goods) i = "消耗道具";
                        else if (a === ft.type.item.material) i = "进阶材料";
                        else if (a === ft.type.item.base || a === ft.type.item.baseVisible) i = "货币";
                        else if (a === ft.type.item.piece) {
                            ft.ExtItem.getHero(this.data.id) && (i = "武将碎片"), ft.ExtItem.getEquip(this.data.id) && (i = "装备碎片")
                        } else i = "特殊";
                        this.labelType.string = ftc.language("类型: ") + ftc.language(i), this.labelInfo.string = ft.ExtItem.getInfo(this.data.id), ftc.ManagerTV.nextFrameSelect(this.buttonTvClose, this.node)
                    } else ftc.showTip("装备不存在")
                },
                setMenuCallback: function (t) {
                    this.callback = t
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t) {
                    t.target === this.buttonMenu.node ? this.callback && (ftc.ManagerTV.nextSelect(), this.callback(), this.cancel()) : t.target === this.buttonTvClose.node && (this.cancel(), ftc.ManagerTV.nextSelect())
                }
            })
        