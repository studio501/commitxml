
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    labelTitle: cc.Label,
                    editBoxValue: cc.EditBox,
                    editBoxCode: cc.EditBox,
                    buttonGet: cc.Button,
                    buttonOk: cc.Button,
                    buttonClose: cc.Button,
                    labelTip: cc.Label,
                    labelTipErr: cc.Label,
                    labelGet: cc.Label,
                    labelOk: cc.Label,
                    labelCountry: cc.Label,
                    nodeCountry: cc.Node,
                    nodeList: cc.Node,
                    buttonCountrys: [cc.Button],
                    buttonList: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonOk), this.addClick(this.buttonGet), this.addClick(this.buttonClose), ftc.ManagerTV.addClick(this.node, this.editBoxValue, void 0, this.onClick.bind(this)), ftc.ManagerTV.addClick(this.node, this.editBoxCode, void 0, this.onClick.bind(this)), ftc.ManagerTV.setBackButton(this.buttonClose), this.listCountrys = [86, 886]
                },
                load: function () {
                    this._tickSecondDt = 0, this.node.opacity = 0, this.selectCountryIndex = 0
                },
                setData: function (t, e) {
                    if (this.type = t, this.mode = e, this.labelTipErr.string = "", t == ftr.Account.Type.SWITCH) return ftc.send("readyTouch"), void ftr.showWait("正在保存数据中...");
                    if (e == ftr.Account.MODE.PHONE) {
                        this.editBoxValue.placeholder = ftc.language("请输入手机号"), t == ftr.Account.Type.LOGIN ? (this.labelTip.string = ftc.language("请使用已绑定的手机号登录"), this.labelTitle.string = ftc.language("手机号登录")) : t == ftr.Account.Type.BIND || t == ftr.Account.Type.BINDLOGIN ? (this.labelTip.string = ftc.language("升级为手机账户，可以提高账户安全"), this.labelTitle.string = ftc.language("绑定手机号")) : t == ftr.Account.Type.RETRIEVE && (this.labelTip.string = ftc.language("请使用已绑定的手机号验证"), this.labelTitle.string = ftc.language("手机号验证")), this.nodeCountry.active = !0;
                        this.editBoxValue.node.x = -135, this.editBoxValue.node.width = 315, this.updateCountry()
                    } else {
                        if (e != ftr.Account.MODE.EMAIL) return this.startListenLogin = !0, ftr.showWait("正在检查账号..."), void (e == ftr.Account.MODE.SDK ? ftc.callNativeFunction("login") : e == ftr.Account.MODE.WX ? ftc.callNativeFunction("loginWX") : e == ftr.Account.MODE.GOOGLE ? ftc.callNativeFunction("loginGooglePlay") : e == ftr.Account.MODE.APPLE ? ftc.callNativeFunction("loginAppleGameCenter") : (this.cancel(), ftc.err("打开LayoutSysPhoneEmail参数错误")));
                        this.editBoxValue.placeholder = ftc.language("请输入邮箱账号"), t == ftr.Account.Type.LOGIN ? (this.labelTip.string = ftc.language("请使用已绑定的邮箱账号登录"), this.labelTitle.string = ftc.language("邮箱登录")) : t == ftr.Account.Type.BIND || t == ftr.Account.Type.BINDLOGIN ? (this.labelTip.string = ftc.language("升级为邮箱账户，可以提高账户安全"), this.labelTitle.string = ftc.language("绑定邮箱")) : t == ftr.Account.Type.RETRIEVE && (this.labelTip.string = ftc.language("请使用已绑定的邮箱账号验证"), this.labelTitle.string = ftc.language("邮箱验证")), this.nodeCountry.active = !1, this.editBoxValue.node.x = -180, this.editBoxValue.node.width = 360
                    }
                    this.node.opacity = 255, t == ftr.Account.Type.RETRIEVE ? this.labelOk.string = ftc.language("下一步") : this.labelOk.string = ftc.language("确定"), this.editBoxValue.string = "", this.editBoxCode.string = "", this.tickGet(!0)
                },
                updateCountry: function () { },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tickGet: function (t) {
                    t ? (this._tickGet = -1, this.labelGet.string = ftc.language("获取验证码"), this.buttonGet.node.opacity = 255, this.buttonGet.interactable = !0) : (this.labelGet.string = this._tickGet + ftc.language("秒后重新获取"), this.buttonGet.node.opacity = 196, this.buttonGet.interactable = !1)
                },
                tick: function (t) {
                    if (this.startListenLogin) {
                        var e = ftc.callNativeFunction("getName2");
                        if (e)
                            if (this.startListenLogin = !1, ftr.cancelWait(), 1 == e) this.type == ftr.Account.Type.LOGIN ? ftr.showTip("登录账号出错，请重试") : ftr.showTip("绑定账号出错，请重试"), this.cancel();
                            else if (ftr.showWait("获取数据中..."), ftr.Account.Type.BIND == this.type) this.mode >= ftr.Account.MODE.WX ? ftc.send("bindByAttach", {
                                type: this.mode - ftr.Account.MODE.WX + 1,
                                attach: e
                            }) : ftc.send("bindByOpenid", {
                                openid: e
                            });
                            else if (this.mode >= ftr.Account.MODE.WX) {
                                var i = 1;
                                this.mode == ftr.Account.MODE.WX && (i = 0), ftc.send("loginByAttach", {
                                    type: this.mode - ftr.Account.MODE.WX + 1,
                                    attach: e,
                                    autoreg: i
                                })
                            } else ftc.send("loginByOpenid", {
                                openid: e
                            })
                    }
                    this._tickSecondDt += t, this._tickSecondDt > 1 && (this._tickSecondDt--, this._tickGet > 0 && (this._tickGet--, this._tickGet <= 0 ? this.tickGet(!0) : this.tickGet()))
                },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        getPlayer: function (t, e) {
                            this.type == ftr.Account.Type.SWITCH ? (ftr.cancelWait(), t.type == ft.type.http.Touch && this.setData(ftr.Account.Type.LOGIN, this.mode), t.txt && ftr.showTip(t.txt)) : ftc.throwMsg("getPlayer", t, e, this)
                        },
                        sysAcountResult: function (t, e) {
                            if (ftr.cancelWait(), 0 == t.result) {
                                t.isLogin ? ftr.showLoginWait(t.isLogin) : ftr.showTip("操作成功"), this.cancel();
                                var i = ftc.ManagerRes.findLayout("LayoutSysInputAccount");
                                i && i.cancel()
                            } else t.txt ? (ftr.showTip(t.txt), !this.node.opacity && this.cancel()) : this.cancel()
                        },
                        sysGetVerCode: function (t, e) {
                            ftr.cancelWait(), 0 == t.result ? (this._tickGet = 60, this.tickGet(), ftr.showTip("验证码发送成功")) : t.txt && ftr.showTip(t.txt), this.exist = t.exist
                        },
                        sysCheckVerCode: function (t, e) {
                            ftr.cancelWait(), 0 == t.result ? (ftr.showAccount(ftr.Account.Type.SETPWD, ftr.Account.MODE.SELF, void 0, this.nextParam), this.cancel()) : t.txt ? ftr.showTip(t.txt) : this.cancel()
                        }
                    }
                },
                checkIsPhone: function () {
                    this.editBoxValue.string = this.editBoxValue.string.trim();
                    return !!/^1\d{10}$/.test(this.editBoxValue.string) || (ftr.showTip("请输入正确的手机号码"), !1)
                },
                checkIsEmail: function () {
                    this.editBoxValue.string = this.editBoxValue.string.trim();
                    return !!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.editBoxValue.string) || (ftr.showTip("请输入正确的邮箱地址"), !1)
                },
                onClick: function (t) {
                    if (!(this.node.opacity <= 0))
                        if (this.nodeList.active = !1, t.target == this.buttonOk.node) {
                            var e, i = this.editBoxCode.string.trim();
                            try {
                                i.length < 4 ? i = null : parseInt(i)
                            } catch (t) {
                                i = null
                            }
                            if (!i) return void ftr.showTip("请输入正确的验证码");
                            if (this.mode == ftr.Account.MODE.EMAIL) {
                                if (!this.checkIsEmail()) return;
                                e = {
                                    email: this.editBoxValue.string,
                                    vercode: i
                                }
                            } else {
                                if (this.mode != ftr.Account.MODE.PHONE) return void this.cancel();
                                if (!this.checkIsPhone()) return;
                                e = {
                                    phone: this.editBoxValue.string,
                                    vercode: i
                                }
                            }
                            if (this.type == ftr.Account.Type.LOGIN) {
                                var a = function () {
                                    ftr.showWait("正在登录..."), ftc.send("loginByPhoneOrEmail", e)
                                };
                                if (this.exist) a();
                                else {
                                    var n = this.mode == ftr.Account.MODE.EMAIL ? "该邮箱未绑定，是否将当前存档绑定至该邮箱？" : "该手机号未绑定，是否将当前存档绑定至该手机号？";
                                    ftr.showDialog({
                                        text: n,
                                        clickOk: function () {
                                            a()
                                        },
                                        clickCancel: function () { }
                                    })
                                }
                            } else if (this.type == ftr.Account.Type.BIND) {
                                a = function () {
                                    ftr.showWait("正在绑定..."), ftc.send("bindPhoneOrMail", e)
                                };
                                if (this.exist) {
                                    n = this.mode == ftr.Account.MODE.EMAIL ? "该邮箱已绑定其他账号，如果继续操作已绑定账号将自动解绑，是否继续？" : "该手机号已绑定其他账号，如果继续操作已绑定账号将自动解绑，是否继续？";
                                    ftr.showDialog({
                                        text: n,
                                        clickOk: function () {
                                            a()
                                        },
                                        clickCancel: function () { }
                                    })
                                } else a()
                            } else if (this.type == ftr.Account.Type.BINDLOGIN)
                                if (this.exist) {
                                    n = this.mode == ftr.Account.MODE.EMAIL ? "该邮箱已绑定其他账号，不能再次绑定" : "该手机号已绑定其他账号，不能再次绑定";
                                    ftr.showDialog({
                                        text: n,
                                        clickOk: function () { }
                                    })
                                } else ftr.showWait("正在创建并绑定..."), ftc.send("loginByPhoneOrEmail", e);
                            else this.type == ftr.Account.Type.RETRIEVE && (this.nextParam = e, ftc.send("checkVerCode", e), ftr.showWait("正在确认验证码..."))
                        } else if (t.target == this.buttonClose.node) this.cancel();
                        else if (t.target == this.buttonGet.node) {
                            if (-1 == this._tickGet) {
                                var s = 0;
                                switch (this.type) {
                                    case ftr.Account.Type.LOGIN:
                                    case ftr.Account.Type.BINDLOGIN:
                                        s = 0;
                                        break;
                                    case ftr.Account.Type.BIND:
                                        s = 1;
                                        break;
                                    case ftr.Account.Type.RETRIEVE:
                                        s = 2
                                }
                                if (this.mode == ftr.Account.MODE.EMAIL) {
                                    if (!this.checkIsEmail()) return;
                                    ftc.send("getVerCode", {
                                        type: s,
                                        email: this.editBoxValue.string
                                    })
                                } else {
                                    if (!this.checkIsPhone()) return;
                                    ftc.send("getVerCode", {
                                        type: s,
                                        phone: this.editBoxValue.string,
                                        country: this.listCountrys[this.selectCountryIndex]
                                    })
                                }
                                this.exist = !1, ftr.showWait("正在获取...")
                            }
                        } else t.target == this.editBoxValue.node ? this.editBoxValue.setFocus() : t.target == this.editBoxCode.node && this.editBoxCode.setFocus()
                }
            })
        