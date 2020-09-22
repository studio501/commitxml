
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonSelf: cc.Button,
                    editBox: cc.EditBox,
                    buttonConfirm: cc.Button,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonSelf, !0), this.addClick(this.buttonConfirm), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose), ftc.ManagerTV.addClick(this.node, this.editBox, void 0, this.onClick.bind(this))
                },
                load: function () { },
                setData: function (t) { },
                enter: function () {
                    this.updateData(), ftc.setTvTip(this.node)
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        getPlayer: function (t, e) {
                            t.type == ft.type.http.ModifyNick ? (0 == t.ste ? (ftc.showTip("修改成功"), this.cancel()) : t.txt && ftc.showTip(t.txt), ftc.cancelWait()) : ftc.throwMsg("getPlayer", t, e)
                        }
                    }
                },
                onClick: function (t) {
                    t.target === this.buttonSelf.node || t.target === this.buttonClose.node ? this.cancel() : t.target === this.buttonConfirm.node ? this.editBox.string.length > 0 ? ftc.ManagerH5.isH5() && ftc.ManagerH5.canTextCheck() ? (ftc.showWait("修改中..."), ftc.ManagerH5.textCheck(this.editBox.string, function (t, e) {
                        0 == t ? ftc.send("modifyNick", this.editBox.string) : (ftc.cancelWait(), ftc.showTip(e))
                    }.bind(this))) : (ftc.send("modifyNick", this.editBox.string), ftc.showWait("修改中...")) : ftc.showTip("请输入昵称") : t.target == this.editBox.node && this.editBox.setFocus()
                }
            })
        