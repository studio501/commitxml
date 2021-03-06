
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    nodeItem: cc.Node,
                    spriteSelect: cc.Sprite,
                    spriteGray: cc.Sprite,
                    labelStatus: cc.Label,
                    labelTimes: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonSelf), this.spriteSelect.node.zIndex = 10
                },
                load: function () {
                    this._item = this.newPart("PartItem"), this._item.setInteractable(!1), this.nodeItem.addChild(this._item.node)
                },
                updateData: function (t) {
                    var e = this.data.id,
                        i = this.data.num;
                    this._item.setData(e, i, !0), this.spriteSelect.node.active = t === this.index, this.spriteGray.node.active = !1;
                    var a = ft.ExtItem.getTitle(e);
                    a && ftc.ManagerData.get2Object("Title", a) && (this.spriteGray.node.active = !0, this.labelStatus.string = "已拥有"), ft.ExtItem.getType(e) === ft.type.item.specialLord && ftc.ManagerData.get2Object("Item", e) && (this.spriteGray.node.active = !0, this.labelStatus.string = "已拥有"), this.data.times <= 0 && (this.spriteGray.node.active = !0, this.labelStatus.string = "已换完"), this.buttonSelf.interactable = !this.spriteGray.node.active, this.labelTimes.string = "剩余" + this.data.times + "次", this.labelTimes.node.color = this.data.times > 0 ? ftc.newColor(1598222) : ftc.newColor(10227978)
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectDialogTip8Item", this)
                }
            })
        