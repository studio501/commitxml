
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    labelTitle: cc.Label,
                    editBox1: cc.EditBox,
                    editBox2: cc.EditBox,
                    nodeInput1: cc.Node,
                    nodeInput2: cc.Node,
                    labelTip1: cc.Label,
                    buttonOk: cc.Button,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonOk), this.addClick(this.buttonClose), ftc.ManagerTV.addClick(this.node, this.editBox1, void 0, this.onClick.bind(this)), ftc.ManagerTV.addClick(this.node, this.editBox2, void 0, this.onClick.bind(this)), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    this.nodeInput2.active = !1, this.editBox1.string = "", this.editBox2.string = ""
                },
                setData: function (t, e, i) {
                    this.type = t, this.param = i, this.labelTip1.string = e || "", this.buttonClose.node.active = !0, t == ftr.Account.Type.SETACCOUNT ? (this.labelTitle.string = ftc.language("\u4fee\u6539\u8d26\u53f7"), this.editBox1.placeholder = ftc.language("\u8bf7\u8f93\u51653-18\u4f4d\u65b0\u8d26\u53f7"), this.editBox1.inputFlag = cc.EditBox.InputFlag.DEFAULT) : t == ftr.Account.Type.SETACCOUNTPWD ? (this.labelTitle.string = ftc.language("\u8bbe\u7f6e\u8d26\u53f7\u5bc6\u7801"), this.nodeInput2.active = !0, this.editBox1.placeholder = ftc.language("\u8bf7\u8f93\u51653-18\u4f4d\u65b0\u8d26\u53f7"), this.editBox2.placeholder = ftc.language("\u8bf7\u8f93\u51656-18\u4f4d\u65b0\u5bc6\u7801"), this.editBox1.inputFlag = cc.EditBox.InputFlag.DEFAULT, this.editBox2.inputFlag = cc.EditBox.InputFlag.PASSWORD) : t == ftr.Account.Type.SETPWD ? (this.labelTitle.string = ftc.language("\u91cd\u7f6e\u5bc6\u7801"), this.nodeInput2.active = !0, this.editBox1.placeholder = ftc.language("\u8bf7\u8f93\u51656-18\u4f4d\u65b0\u5bc6\u7801"), this.editBox2.placeholder = ftc.language("\u8bf7\u518d\u6b21\u8f93\u5165\u5bc6\u7801"), this.editBox1.inputFlag = cc.EditBox.InputFlag.PASSWORD, this.editBox2.inputFlag = cc.EditBox.InputFlag.PASSWORD) : t == ftr.Account.Type.SETACCOUNT2 && (this.buttonClose.node.active = !1, this.labelTitle.string = ftc.language("\u5347\u7ea7\u8d26\u53f7"), this.editBox1.placeholder = ftc.language("\u8bf7\u8f93\u51653-18\u4f4d\u65b0\u8d26\u53f7"), this.editBox1.inputFlag = cc.EditBox.InputFlag.DEFAULT)
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        sysAcountResult: function (t, e) {
                            ftr.cancelWait(), 0 == t.result ? (t.isLogin ? ftr.showLoginWait(t.isLogin) : ftr.showTip("\u64cd\u4f5c\u6210\u529f"), this.cancel()) : t.txt ? ftr.showTip(t.txt) : this.cancel()
                        }
                    }
                },
                onClick: function (t) {
                    if (t.target === this.buttonClose.node) this.cancel();
                    else if (t.target === this.buttonOk.node) {
                        var e = this.editBox1.string.trim(),
                            i = this.editBox2.string;
                        if (this.type == ftr.Account.Type.SETACCOUNT) {
                            if (!ftc.ManagerData.passport.pwd) return void ftr.showTip("\u8bf7\u5148\u767b\u5f55");
                            ftr.checkAccount(e) && (ftc.send("modifyAccount", {
                                account2: e,
                                pwd2: ftc.ManagerData.passport.pwd
                            }), ftr.showWait("\u8bbe\u7f6e\u4e2d..."))
                        } else if (this.type == ftr.Account.Type.SETACCOUNTPWD) ftr.checkAccount(e) && ftr.checkPwd(i) && (ftc.send("modifyAccount", {
                            account2: e,
                            pwd2: i
                        }), ftr.showWait("\u8bbe\u7f6e\u4e2d..."));
                        else if (this.type == ftr.Account.Type.SETPWD) {
                            if (e != i) return void ftr.showTip("\u4e24\u6b21\u8f93\u5165\u5bc6\u7801\u4e0d\u4e00\u81f4");
                            ftr.checkPwd(i) && ftr.showDialog({
                                text: "\u5bc6\u7801\u91cd\u7f6e\u540e\uff0c\u5df2\u767b\u5f55\u6b64\u8d26\u53f7\u7684\u8bbe\u5907\u5c06\u4f1a\u5931\u6548\uff0c\u662f\u5426\u7ee7\u7eed\uff1f",
                                clickOk: function () {
                                    ftc.send("changePwd", {
                                        pwd: i,
                                        phone: this.param.phone,
                                        email: this.param.email,
                                        vercode: this.param.vercode
                                    }), ftr.showWait("\u91cd\u7f6e\u4e2d...")
                                }.bind(this),
                                clickCancel: function () { }.bind(this)
                            })
                        } else this.type == ftr.Account.Type.SETACCOUNT2 && ftr.checkAccount(e) && (ftc.send("login", {
                            account2: e
                        }), ftr.showWait("\u5347\u7ea7\u4e2d..."))
                    } else t.target == this.editBox1.node ? this.editBox1.setFocus() : t.target == this.editBox2.node && this.editBox2.setFocus()
                }
            })
        