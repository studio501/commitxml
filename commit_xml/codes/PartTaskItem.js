
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    spriteIcon: cc.Sprite,
                    spriteStatus: cc.Sprite,
                    labelName: cc.Label,
                    labelStatus: cc.Label,
                    spriteRedPoint: cc.Sprite,
                    spriteGuide: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf, {
                        auto: !0
                    })
                },
                updateData: function (t) {
                    this.spriteIcon.spriteFrame = ft.ExtTask.geIconSpriteFrame(this.data.id), this.labelName.string = ft.ExtTask.getName(this.data.id), this.labelStatus.string = ftc.language(["未完成", "已完成", "已领取"][this.data.ste]), this.buttonSelf.interactable = this.index !== t, this.spriteGuide.node.active = ftc.ManagerData.get1("ManagerTask").cur == this.data.id
                },
                update: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectTaskItem", this)
                }
            })
        