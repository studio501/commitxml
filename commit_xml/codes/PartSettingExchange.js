
            
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
                    t.target === this.buttonConfirm.node ? this.editBox.string.length > 0 ? (ftc.showWait("正在使用兑换码，请稍等..."), ftc.send("useCDKey", this.editBox.string)) : ftc.showTip("请输入兑换码") : t.target == this.editBox.node && this.editBox.setFocus()
                }
            })
        