
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    labelDialog: cc.Label,
                    buttonDialogOk: cc.Button,
                    buttonDialogCancel: cc.Button,
                    buttonDialogClose: cc.Button,
                    labelButtonOk: cc.Label,
                    labelButtonCancel: cc.Label
                },
                init: function () { },
                load: function () {
                    this.node.active = !1, this.addClick(this.buttonDialogOk), this.addClick(this.buttonDialogCancel), this.addClick(this.buttonDialogClose)
                },
                setData: function (t) {
                    this.node.active = !0, this._param = t, this.updateData(), ftc.ManagerTV.nextSelect(void 0, this.node, 101), t.text || t.txt ? this.labelDialog.string = ftc.language(t.text ? t.text : t.txt) : this.labelDialog.string = "", this.buttonDialogOk.node.active = !1, this.buttonDialogCancel.node.active = !1, this.buttonDialogClose.node.active = !1, (t.button1 || t.click1 || t.clickOk) && (this.buttonDialogOk.node.active = !0, t.button1 ? this.labelButtonOk.string = ftc.language(t.button1) : this.labelButtonOk.string = ftc.language("确定")), (t.button2 || t.click2 || t.clickCancel) && (this.buttonDialogCancel.node.active = !0, t.button2 ? this.labelButtonCancel.string = ftc.language(t.button2) : this.labelButtonCancel.string = ftc.language("取消")), t.clickClose && (this.buttonDialogClose.node.active = !0)
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t) {
                    t.target === this.buttonDialogOk.node ? this.cancelDialog(!0) : t.target === this.buttonDialogCancel.node ? this.cancelDialog() : t.target === this.buttonDialogClose.node && (this._param.clickClose && this._param.clickClose(), this.cancel())
                },
                cancelDialog: function (t) {
                    t ? this._param.click1 ? this._param.click1() : this._param.clickOk && this._param.clickOk() : this._param.click2 ? this._param.click2() : this._param.clickCancel && this._param.clickCancel(), this.cancel()
                }
            })
        