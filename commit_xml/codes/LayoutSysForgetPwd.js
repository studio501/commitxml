
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonClose: cc.Button,
                    buttonPhone: cc.Button,
                    buttonEmail: cc.Button,
                    buttonCustomer: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonPhone), this.addClick(this.buttonEmail), this.addClick(this.buttonCustomer), this.addClick(this.buttonClose), ftc.ManagerTV.setBackButton(this.buttonClose), this.buttonCustomer.node.active = ftc.getChat()
                },
                load: function () { },
                setData: function (t) { },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () { },
                onClick: function (t) {
                    t.target == this.buttonPhone.node ? ftr.showAccount(ftr.Account.Type.RETRIEVE, ftr.Account.MODE.PHONE) : t.target == this.buttonEmail.node ? ftr.showAccount(ftr.Account.Type.RETRIEVE, ftr.Account.MODE.EMAIL) : t.target == this.buttonCustomer.node && ftc.showChat(), this.cancel()
                }
            })
        