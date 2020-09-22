
            
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
                    this.type = t, this.param = i, this.labelTip1.string = e || "", this.buttonClose.node.active = !0, t == ftr.Account.Type.SETACCOUNT ? (this.labelTitle.string = ftc.language("修改账号"), this.editBox1.placeholder = ftc.language("请输入3-18位新账号"), this.editBox1.inputFlag = cc.EditBox.InputFlag.DEFAULT) : t == ftr.Account.Type.SETACCOUNTPWD ? (this.labelTitle.string = ftc.language("设置账号密码"), this.nodeInput2.active = !0, this.editBox1.placeholder = ftc.language("请输入3-18位新账号"), this.editBox2.placeholder = ftc.language("请输入6-18位新密码"), this.editBox1.inputFlag = cc.EditBox.InputFlag.DEFAULT, this.editBox2.inputFlag = cc.EditBox.InputFlag.PASSWORD) : t == ftr.Account.Type.SETPWD ? (this.labelTitle.string = ftc.language("重置密码"), this.nodeInput2.active = !0, this.editBox1.placeholder = ftc.language("请输入6-18位新密码"), this.editBox2.placeholder = ftc.language("请再次输入密码"), this.editBox1.inputFlag = cc.EditBox.InputFlag.PASSWORD, this.editBox2.inputFlag = cc.EditBox.InputFlag.PASSWORD) : t == ftr.Account.Type.SETACCOUNT2 && (this.buttonClose.node.active = !1, this.labelTitle.string = ftc.language("升级账号"), this.editBox1.placeholder = ftc.language("请输入3-18位新账号"), this.editBox1.inputFlag = cc.EditBox.InputFlag.DEFAULT)
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
                            ftr.cancelWait(), 0 == t.result ? (t.isLogin ? ftr.showLoginWait(t.isLogin) : ftr.showTip("操作成功"), this.cancel()) : t.txt ? ftr.showTip(t.txt) : this.cancel()
                        }
                    }
                },
                onClick: function (t) {
                    if (t.target === this.buttonClose.node) this.cancel();
                    else if (t.target === this.buttonOk.node) {
                        var e = this.editBox1.string.trim(),
                            i = this.editBox2.string;
                        if (this.type == ftr.Account.Type.SETACCOUNT) {
                            if (!ftc.ManagerData.passport.pwd) return void ftr.showTip("请先登录");
                            ftr.checkAccount(e) && (ftc.send("modifyAccount", {
                                account2: e,
                                pwd2: ftc.ManagerData.passport.pwd
                            }), ftr.showWait("设置中..."))
                        } else if (this.type == ftr.Account.Type.SETACCOUNTPWD) ftr.checkAccount(e) && ftr.checkPwd(i) && (ftc.send("modifyAccount", {
                            account2: e,
                            pwd2: i
                        }), ftr.showWait("设置中..."));
                        else if (this.type == ftr.Account.Type.SETPWD) {
                            if (e != i) return void ftr.showTip("两次输入密码不一致");
                            ftr.checkPwd(i) && ftr.showDialog({
                                text: "密码重置后，已登录此账号的设备将会失效，是否继续？",
                                clickOk: function () {
                                    ftc.send("changePwd", {
                                        pwd: i,
                                        phone: this.param.phone,
                                        email: this.param.email,
                                        vercode: this.param.vercode
                                    }), ftr.showWait("重置中...")
                                }.bind(this),
                                clickCancel: function () { }.bind(this)
                            })
                        } else this.type == ftr.Account.Type.SETACCOUNT2 && ftr.checkAccount(e) && (ftc.send("login", {
                            account2: e
                        }), ftr.showWait("升级中..."))
                    } else t.target == this.editBox1.node ? this.editBox1.setFocus() : t.target == this.editBox2.node && this.editBox2.setFocus()
                }
            })
        