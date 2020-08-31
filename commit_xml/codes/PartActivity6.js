
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeInput: cc.Node,
                    buttonRegister: cc.Button,
                    buttonLogin: cc.Button,
                    buttonBind: cc.Button,
                    buttonSet: cc.Button,
                    nodeAward: cc.Node,
                    nodeLayout: cc.Node,
                    buttonGet: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonRegister), this.addClick(this.buttonLogin), this.addClick(this.buttonBind), this.addClick(this.buttonGet), this.addClick(this.buttonSet)
                },
                setData: function (t) {
                    if (this.data = t, this.nodeLayout.removeAllChildren(), this.data)
                        for (var e = ft.ExtMsg.getAward(this.data), i = 0; i < e.ids.length; i++) {
                            var a = this.newPart("PartItem");
                            a.setData(e.ids[i], e.nums[i]), this.nodeLayout.addChild(a.node)
                        }
                    this.updateData()
                },
                cleanup: function () { },
                updateData: function () {
                    var t = ftc.ManagerData.get1("ManagerMsg").giftDocSte;
                    this.nodeInput.active = "0" === t, this.nodeAward.active = "1" === t, this.buttonBind.node.active = "1" == ftc.callNativeFunction("isLogin"), this.buttonRegister.node.active = !this.buttonBind.node.active, this.buttonLogin.node.active = !this.buttonBind.node.active, this.buttonSet.node.active = !1
                },
                tick: function (t) { },
                onClick: function (t) {
                    t.target === this.buttonGet.node ? ftc.send("msgActivityGet", {
                        eid: this.data.entityId
                    }) : t.target === this.buttonRegister.node ? ftr.showAccount(ftr.Account.Type.REGIST, ftr.Account.MODE.SELF) : t.target === this.buttonLogin.node ? ftr.showAccount(ftr.Account.Type.LOGIN, ftr.Account.MODE.SELF) : t.target === this.buttonBind.node ? ftr.showAccount(ftr.Account.Type.LOGIN, ftr.Account.MODE.SDK) : t.target == this.buttonSet.node && ftr.showAccount(ftr.Account.Type.SETACCOUNTPWD, ftr.Account.MODE.SELF)
                }
            })
        