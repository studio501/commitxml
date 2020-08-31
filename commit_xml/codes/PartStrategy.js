
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spriteAdd: cc.Sprite,
                    spriteIcon: cc.Sprite,
                    spriteSelect: cc.Sprite
                },
                init: function () { },
                setData: function (t) {
                    this.data = t, this.spriteAdd.node.active = !this.data, this.spriteIcon.node.active = this.data, this.data && this.data.id && (this.spriteIcon.spriteFrame = ft.ExtPet.getIconSprite(this.data.id)), this.spriteSelect.node.active = !1
                },
                getData: function () {
                    return this.data
                },
                setSelect: function (t) {
                    this.spriteSelect.node.active = t
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        