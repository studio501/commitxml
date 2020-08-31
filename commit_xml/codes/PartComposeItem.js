
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    nodeItem: cc.Node,
                    labelName: cc.Label,
                    labelCondition: cc.Label,
                    spriteLock: cc.Sprite,
                    spriteRedPoint: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf, {
                        auto: !0,
                        zone: 1
                    })
                },
                load: function () {
                    this.item = this.newPart("PartItem"), this.item.setInteractable(!1), this.item.node.scale = .8, this.nodeItem.addChild(this.item.node)
                },
                updateData: function (t) {
                    this.buttonSelf.interactable = this.index !== t.index;
                    var e = ft.ExtConsume.checkIsLock(this.data) && t.type === ft.type.compose.equip;
                    if (this.spriteLock.node.active = e, this.labelCondition.node.active = e, this.labelName.node.active = !e, this.item.setStatus(e ? 3 : 0), t.type === ft.type.compose.jewel) this.item.setJewelTypeData({
                        id: this.data
                    }), this.labelName.string = ftd.Jeweltype.get(this.data, "name");
                    else {
                        var i = ft.ExtConsume.getOut(this.data);
                        this.item.setData(i), this.labelName.string = ft.ExtItem.getName(i)
                    }
                    e && (this.labelCondition.string = ft.ExtConsume.getCondition(this.data))
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectComposeItem", this)
                }
            })
        