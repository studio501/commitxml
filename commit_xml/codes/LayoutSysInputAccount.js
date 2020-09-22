
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    labelTitle: cc.Label,
                    editBoxName: cc.EditBox,
                    editBoxPwd: cc.EditBox,
                    buttonConfirm: cc.Button,
                    labelConfirm: cc.Label,
                    buttonClose: cc.Button,
                    labelTip1: cc.Label,
                    labelTip2: cc.Label,
                    buttonRegist: cc.Button,
                    buttonForget: cc.Button,
                    buttonLoginPhone: cc.Button,
                    buttonLoginEmail: cc.Button,
                    buttonLoginWX: cc.Button,
                    nodeLogin: cc.Node,
                    nodeRegist: cc.Node,
                    buttonSelect: cc.Button,
                    nodeSelect: cc.Node,
                    buttonAgreement: cc.Button,
                    buttonBackLogin: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonConfirm), this.addClick(this.buttonClose), this.addClick(this.buttonRegist), this.addClick(this.buttonForget), this.addClick(this.buttonLoginPhone), this.addClick(this.buttonLoginEmail), this.addClick(this.buttonLoginWX), this.addClick(this.buttonSelect), this.addClick(this.buttonAgreement), this.addClick(this.buttonBackLogin), ftc.ManagerTV.addClick(this.node, this.editBoxName, void 0, this.onClick.bind(this)), ftc.ManagerTV.addClick(this.node, this.editBoxPwd, void 0, this.onClick.bind(this)), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () { },
                setData: function (t, e) {
                    this.type = t, ftc.ManagerData.passport.uid ? this.buttonRegist.node.active = !1 : this.buttonRegist.node.active = !0, this.editBoxName.string = "", this.editBoxPwd.string = "", this.labelTip1.string = "", this.labelTip2.string = e || "", this.nodeLogin.active = !1, this.nodeRegist.active = !1, t == ftr.Account.Type.LOGIN ? (this.labelTitle.string = ftc.language("登录"), this.nodeLogin.active = !0, this.labelConfirm.string = ftc.language("登录"), ftjp ? ("1" == ftc.callNativeFunction("isLoginGooglePlay") || ftc.callNativeFunction("isLoginAppleGameCenter"), this.buttonLoginPhone.node.active = !1) : ("1" != ftc.callNativeFunction("isLoginWX") || ftc.ManagerData.passport.uid ? this.buttonLoginWX.node.active = !1 : this.buttonLoginWX.node.active = !0, this.buttonLoginPhone.node.active = 598 != ftc.getSourceId())) : (this.labelTitle.string = ftc.language("注册"), this.labelConfirm.string = ftc.language("注册"), this.nodeRegist.active = !0)
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
                            ftr.cancelWait(), 0 == t.result ? (this.type == ftr.Account.Type.REGIST ? (ftr.showTip("注册成功"), ftsdk && _ftsdkcertify.openUserCertifyTip()) : ftr.showLoginWait(t.isLogin), this.cancel()) : t.txt ? ftr.showTip(t.txt) : this.cancel()
                        },
                        c_enter: function (t, e) {
                            e ? (ftr.showDialog({
                                text: e,
                                clickOk: function () { }
                            }), ftr.cancelWait()) : (ftc.throwMsg("c_enter", t, e, this), this.cancel())
                        }
                    }
                },
                onClick: function (t) {
                    if (t.target === this.buttonClose.node) this.cancel();
                    else if (t.target === this.buttonConfirm.node) {
                        var e = this.editBoxName.string.trim(),
                            i = this.editBoxPwd.string.trim();
                        this.type == ftr.Account.Type.LOGIN ? e && i ? fts ? ftr.showDialog({
                            text: "登录账号会清除当前的数据，是否继续?",
                            click1: function () {
                                ftc.send("login", {
                                    account: e,
                                    pwd: i
                                }), ftr.showWait("登录中...")
                            },
                            click2: function () { }
                        }) : (ftc.pomeloLogin(e, i), ftr.showWait("登录中...")) : ftr.showTip("账号密码不能为空") : ftr.checkAccount(e) && ftr.checkPwd(i) && (this.nodeSelect.active ? (fts ? ftc.send("regist", {
                            account: e,
                            pwd: i
                        }) : ftc.pomeloRegist(e, i), ftr.showWait("注册中...")) : ftr.showTip("请先同意《用户使用许可协议》"))
                    } else t.target == this.editBoxName.node ? this.editBoxName.setFocus() : t.target == this.editBoxPwd.node ? this.editBoxPwd.setFocus() : t.target == this.buttonRegist.node ? this.setData(1) : t.target == this.buttonLoginPhone.node ? ftr.showAccount(ftr.Account.Type.LOGIN, ftr.Account.MODE.PHONE) : t.target == this.buttonLoginEmail.node ? ftr.showAccount(ftr.Account.Type.LOGIN, ftr.Account.MODE.EMAIL) : t.target == this.buttonLoginWX.node ? ftr.showAccount(ftr.Account.Type.LOGIN, ftr.Account.MODE.WX) : t.target == this.buttonBackLogin.node ? this.setData(0) : t.target == this.buttonAgreement.node ? ftsdk.showDetailAgreement() : t.target == this.buttonSelect.node ? this.nodeSelect.active = !this.nodeSelect.active : t.target == this.buttonForget.node && ftr.loadLayout("LayoutSysForgetPwd", function (t) {
                        t.setData()
                    }, {
                        field: "_ftaro"
                    })
                }
            })
        