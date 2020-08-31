
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    spriteHeader: cc.Sprite,
                    spriteGray: cc.Sprite,
                    spriteLock: cc.Sprite,
                    labelName: cc.Label,
                    spriteUsing: cc.Sprite,
                    spriteSelect: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf, {
                        auto: !0
                    })
                },
                updateData: function (t) {
                    var e = !!ftc.ManagerData.get2Object("Decoration", this.data),
                        i = this.data;
                    ft.ExtDecoration.getType(i) === ft.type.decoration.header ? (this.spriteUsing.node.active = ftc.ManagerData.get1("ManagerDecoration").headerId == i, this.labelName.node.y = -50, this.spriteHeader.node.setContentSize(94, 94)) : (this.spriteUsing.node.active = ftc.ManagerData.get1("ManagerDecoration").headerFrameId == i, this.labelName.node.y = -56, this.spriteHeader.node.setContentSize(120, 140)), this.spriteHeader.spriteFrame = ft.ExtDecoration.getIconSprite(i), this.labelName.string = ft.ExtDecoration.getName(i), this.spriteLock.node.active = !e, this.spriteGray.node.active = !e, this.spriteSelect.node.active = this.index === t
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.send("c_onSelectHeaderItem", this)
                }
            })
        