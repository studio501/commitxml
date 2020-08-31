
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    spriteIcon: cc.Sprite,
                    labelName: cc.Label,
                    labelInfo: cc.Label,
                    spriteSelect: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                load: function () { },
                updateData: function (t) {
                    this.labelName.string = ft.ExtSkill.getName(Number(this.data)), this.labelInfo.string = ft.ExtSkill.getInfo(Number(this.data)), this.spriteSelect.node.active = this.index === t
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectSkillItem", this)
                }
            })
        