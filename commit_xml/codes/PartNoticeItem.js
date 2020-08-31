
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    labelName: cc.Label,
                    labelTime: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonSelf, {
                        auto: !0
                    })
                },
                updateData: function (t) {
                    this.buttonSelf.interactable = this.index !== t, this.labelName.string = this.data.title, this.labelTime.string = this.data.date0.split(" ")[0]
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectNoticeItem", this)
                }
            })
        