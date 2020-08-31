
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    spriteDecorationL: cc.Sprite,
                    labelTitle: cc.Label,
                    spriteDecorationR: cc.Sprite,
                    spriteUsing: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                load: function () { },
                updateData: function (t) {
                    this.buttonSelf.interactable = this.index !== t.index, this.labelTitle.string = t.title, this.spriteDecorationL.spriteFrame = ft.ExtDecoration.getSpriteFrame(this.data.id), this.spriteDecorationR.spriteFrame = ft.ExtDecoration.getSpriteFrame(this.data.id), this.spriteUsing.node.active = this.data.id === ftc.ManagerData.get1("ManagerDecoration").decorationId
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    ftc.sendClient("c_onSelectDecorationItem", this)
                }
            })
        