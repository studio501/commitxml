
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    labelName: cc.Label,
                    spritePrefix: cc.Sprite,
                    spriteSuffix: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                updateData: function (t) {
                    this.buttonSelf.interactable = this.index !== t, this.labelName.string = ft.ExtTitle.getName(this.data.id);
                    var e = ftc.ManagerData.get1("ManagerTitle").titleIds.split(",");
                    this.spritePrefix.node.active = e[0] == this.data.id, this.spriteSuffix.node.active = e[1] == this.data.id, this.spritePrefix.node.active && this.spriteSuffix.node.active ? (this.spritePrefix.node.x = 67, this.spriteSuffix.node.x = 97) : this.spritePrefix.node.active ? this.spritePrefix.node.x = 88 : this.spriteSuffix.node.active && (this.spriteSuffix.node.x = 88)
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectTitleItem", this)
                }
            })
        