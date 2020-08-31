
            
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
                        e.setData(this.data.id), e.setInteractable(!1), this.nodeItem.addChild(e.node), this.labelName.string = ft.ExtItem.getName(this.data.id === ft.value.item.gem2 ? ft.value.item.gem : this.data.id), this.labelNum.string = "\u62e5\u6709\u6570\u91cf:" + ft.ExtItem.getNum(this.data.id);
                        var i, a = ft.ExtItem.getType(this.data.id);
                        if (a === ft.type.item.goods) i = "\u6d88\u8017\u9053\u5177";
                        else if (a === ft.type.item.material) i = "\u8fdb\u9636\u6750\u6599";
                        else if (a === ft.type.item.base || a === ft.type.item.baseVisible) i = "\u8d27\u5e01";
                        else if (a === ft.type.item.piece) {
                            ft.ExtItem.getHero(this.data.id) && (i = "\u6b66\u5c06\u788e\u7247"), ft.ExtItem.getEquip(this.data.id) && (i = "\u88c5\u5907\u788e\u7247")
                        } else i = "\u7279\u6b8a";
                        this.labelType.string = ftc.language("\u7c7b\u578b: ") + ftc.language(i), this.labelInfo.string = ft.ExtItem.getInfo(this.data.id), ftc.ManagerTV.nextFrameSelect(this.buttonTvClose, this.node)
                    } else ftc.showTip("\u88c5\u5907\u4e0d\u5b58\u5728")
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
        