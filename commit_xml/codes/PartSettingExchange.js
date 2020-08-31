
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    editBox: cc.EditBox,
                    buttonConfirm: cc.Button
                },
                init: function () {
                    ftc.ManagerTV.addClick(this.node, this.editBox, void 0, this.onClick.bind(this)), this.addClick(this.buttonConfirm)
                },
                load: function () { },
                setData: function (t) { },
                cleanup: function () { },
                updateData: function () {
                    this.editBox.string = ""
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonConfirm.node ? this.editBox.string.length > 0 ? (ftc.showWait("\u6b63\u5728\u4f7f\u7528\u5151\u6362\u7801\uff0c\u8bf7\u7a0d\u7b49..."), ftc.send("useCDKey", this.editBox.string)) : ftc.showTip("\u8bf7\u8f93\u5165\u5151\u6362\u7801") : t.target == this.editBox.node && this.editBox.setFocus()
                }
            })
        