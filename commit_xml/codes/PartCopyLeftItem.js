
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    labelName: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonSelf, !0)
                },
                load: function () { },
                updateData: function (t) {
                    this.buttonSelf.interactable = this.index !== t, this.labelName.string = ft.type.copy.names[this.data]
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectCopyLeftItem", this)
                }
            })
        