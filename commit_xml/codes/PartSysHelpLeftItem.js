
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    labelName: cc.Label,
                    buttonSelfSub: cc.Button,
                    labelNameSub: cc.Label,
                    spriteIcon: cc.Node
                },
                init: function () {
                    this.addClick(this.buttonSelf), this.addClick(this.buttonSelfSub)
                },
                load: function () {
                    this.buttonSelf.node.active = !1, this.buttonSelfSub.node.active = !1
                },
                updateData: function (t) {
                    this.buttonSelf.node.active = !1, this.buttonSelfSub.node.active = !1, this.data.list ? (this.buttonSelf.node.active = !0, this.labelName.string = this.data.name, this.buttonSelf.interactable = t.main != this.index, t.main == this.index ? (this.labelName.node.color = cc.color(73, 165, 255), this.spriteIcon.color = cc.color(73, 165, 255)) : (this.labelName.node.color = cc.color(99, 99, 99), this.spriteIcon.color = cc.color(99, 99, 99))) : (this.buttonSelfSub.node.active = !0, this.labelNameSub.string = this.data.name, this.buttonSelfSub.interactable = t.sub != this.index, t.sub == this.index ? this.labelNameSub.node.color = cc.color(73, 165, 255) : this.labelNameSub.node.color = cc.color(99, 99, 99))
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t) {
                    ftc.sendClient("c_sysItemLeft", this.data)
                }
            })
        