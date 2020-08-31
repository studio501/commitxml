
            
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
                    if (this.type = t, this.mode = e, this.labelTipErr.string = "", t == ftr.Account.Type.SWITCH) return ftc.send("readyTouch"), void ftr.showWait("\u6b63\u5728\u4fdd\u5b58\u6570\u636e\u4e2d...");
                    if (e == ftr.Account.MODE.PHONE) {
                        this.editBoxValue.placeholder = ftc.language("\u8bf7\u8f93\u5165\u624b\u673a\u53f7"), t == ftr.Account.Type.LOGIN ? (this.labelTip.string = ftc.language("\u8bf7\u4f7f\u7528\u5df2\u7ed1\u5b9a\u7684\u624b\u673a\u53f7\u767b\u5f55"), this.labelTitle.string = ftc.language("\u624b\u673a\u53f7\u767b\u5f55")) : t == ftr.Account.Type.BIND || t == ftr.Account.Type.BINDLOGIN ? (this.labelTip.string = ftc.language("\u5347\u7ea7\u4e3a\u624b\u673a\u8d26\u6237\uff0c\u53ef\u4ee5\u63d0\u9ad8\u8d26\u6237\u5b89\u5168"), this.labelTitle.string = ftc.language("\u7ed1\u5b9a\u624b\u673a\u53f7")) : t == ftr.Account.Type.RETRIEVE && (this.labelTip.string = ftc.language("\u8bf7\u4f7f\u7528\u5df2\u7ed1\u5b9a\u7684\u624b\u673a\u53f7\u9a8c\u8bc1"), this.labelTitle.string = ftc.language("\u624b\u673a\u53f7\u9a8c\u8bc1")), this.nodeCountry.active = !0;
                        this.editBoxValue.node.x = -135, this.editBoxValue.node.width = 315, this.updateCountry()
                    } else {
                        if (e != ftr.Account.MODE.EMAIL) return this.startListenLogin = !0, ftr.showWait("\u6b63\u5728\u68c0\u67e5\u8d26\u53f7..."), void (e == ftr.Account.MODE.SDK ? ftc.callNativeFunction("login") : e == ftr.Account.MODE.WX ? ftc.callNativeFunction("loginWX") : e == ftr.Account.MODE.GOOGLE ? ftc.callNativeFunction("loginGooglePlay") : e == ftr.Account.MODE.APPLE ? ftc.callNativeFunction("loginAppleGameCenter") : (this.cancel(), ftc.err("\u6253\u5f00LayoutSysPhoneEmail\u53c2\u6570\u9519\u8bef")));
                        this.editBoxValue.placeholder = ftc.language("\u8bf7\u8f93\u5165\u90ae\u7bb1\u8d26\u53f7"), t == ftr.Account.Type.LOGIN ? (this.labelTip.string = ftc.language("\u8bf7\u4f7f\u7528\u5df2\u7ed1\u5b9a\u7684\u90ae\u7bb1\u8d26\u53f7\u767b\u5f55"), this.labelTitle.string = ftc.language("\u90ae\u7bb1\u767b\u5f55")) : t == ftr.Account.Type.BIND || t == ftr.Account.Type.BINDLOGIN ? (this.labelTip.string = ftc.language("\u5347\u7ea7\u4e3a\u90ae\u7bb1\u8d26\u6237\uff0c\u53ef\u4ee5\u63d0\u9ad8\u8d26\u6237\u5b89\u5168"), this.labelTitle.string = ftc.language("\u7ed1\u5b9a\u90ae\u7bb1")) : t == ftr.Account.Type.RETRIEVE && (this.labelTip.string = ftc.language("\u8bf7\u4f7f\u7528\u5df2\u7ed1\u5b9a\u7684\u90ae\u7bb1\u8d26\u53f7\u9a8c\u8bc1"), this.labelTitle.string = ftc.language("\u90ae\u7bb1\u9a8c\u8bc1")), this.nodeCountry.active = !1, this.editBoxValue.node.x = -180, this.editBoxValue.node.width = 360
                    }
                    this.node.opacity = 255, t == ftr.Account.Type.RETRIEVE ? this.labelOk.string = ftc.language("\u4e0b\u4e00\u6b65") : this.labelOk.string = ftc.language("\u786e\u5b9a"), this.editBoxValue.string = "", this.editBoxCode.string = "", this.tickGet(!0)
                },
                updateCountry: function () { },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tickGet: function (t) {
                    t ? (this._tickGet = -1, this.labelGet.string = ftc.language("\u83b7\u53d6\u9a8c\u8bc1\u7801"), this.buttonGet.node.opacity = 255, this.buttonGet.interactable = !0) : (this.labelGet.string = this._tickGet + ftc.language("\u79d2\u540e\u91cd\u65b0\u83b7\u53d6"), this.buttonGet.node.opacity = 196, this.buttonGet.interactable = !1)
                },
                tick: function (t) {
                    if (this.startListenLogin) {
                        var e = ftc.callNativeFunction("getName2");
                        if (e)
                            if (this.startListenLogin = !1, ftr.cancelWait(), 1 == e) this.type == ftr.Account.Type.LOGIN ? ftr.showTip("\u767b\u5f55\u8d26\u53f7\u51fa\u9519\uff0c\u8bf7\u91cd\u8bd5") : ftr.showTip("\u7ed1\u5b9a\u8d26\u53f7\u51fa\u9519\uff0c\u8bf7\u91cd\u8bd5"), this.cancel();
                            else if (ftr.showWait("\u83b7\u53d6\u6570\u636e\u4e2d..."), ftr.Account.Type.BIND == this.type) this.mode >= ftr.Account.MODE.WX ? ftc.send("bindByAttach", {
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
                                t.isLogin ? ftr.showLoginWait(t.isLogin) : ftr.showTip("\u64cd\u4f5c\u6210\u529f"), this.cancel();
                                var i = ftc.ManagerRes.findLayout("LayoutSysInputAccount");
                                i && i.cancel()
                            } else t.txt ? (ftr.showTip(t.txt), !this.node.opacity && this.cancel()) : this.cancel()
                        },
                        sysGetVerCode: function (t, e) {
                            ftr.cancelWait(), 0 == t.result ? (this._tickGet = 60, this.tickGet(), ftr.showTip("\u9a8c\u8bc1\u7801\u53d1\u9001\u6210\u529f")) : t.txt && ftr.showTip(t.txt), this.exist = t.exist
                        },
                        sysCheckVerCode: function (t, e) {
                            ftr.cancelWait(), 0 == t.result ? (ftr.showAccount(ftr.Account.Type.SETPWD, ftr.Account.MODE.SELF, void 0, this.nextParam), this.cancel()) : t.txt ? ftr.showTip(t.txt) : this.cancel()
                        }
                    }
                },
                checkIsPhone: function () {
                    this.editBoxValue.string = this.editBoxValue.string.trim();
                    return !!/^1\d{10}$/.test(this.editBoxValue.string) || (ftr.showTip("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801"), !1)
                },
                checkIsEmail: function () {
                    this.editBoxValue.string = this.editBoxValue.string.trim();
                    return !!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.editBoxValue.string) || (ftr.showTip("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u90ae\u7bb1\u5730\u5740"), !1)
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
                            if (!i) return void ftr.showTip("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u9a8c\u8bc1\u7801");
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
                                    ftr.showWait("\u6b63\u5728\u767b\u5f55..."), ftc.send("loginByPhoneOrEmail", e)
                                };
                                if (this.exist) a();
                                else {
                                    var n = this.mode == ftr.Account.MODE.EMAIL ? "\u8be5\u90ae\u7bb1\u672a\u7ed1\u5b9a\uff0c\u662f\u5426\u5c06\u5f53\u524d\u5b58\u6863\u7ed1\u5b9a\u81f3\u8be5\u90ae\u7bb1\uff1f" : "\u8be5\u624b\u673a\u53f7\u672a\u7ed1\u5b9a\uff0c\u662f\u5426\u5c06\u5f53\u524d\u5b58\u6863\u7ed1\u5b9a\u81f3\u8be5\u624b\u673a\u53f7\uff1f";
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
                                    ftr.showWait("\u6b63\u5728\u7ed1\u5b9a..."), ftc.send("bindPhoneOrMail", e)
                                };
                                if (this.exist) {
                                    n = this.mode == ftr.Account.MODE.EMAIL ? "\u8be5\u90ae\u7bb1\u5df2\u7ed1\u5b9a\u5176\u4ed6\u8d26\u53f7\uff0c\u5982\u679c\u7ee7\u7eed\u64cd\u4f5c\u5df2\u7ed1\u5b9a\u8d26\u53f7\u5c06\u81ea\u52a8\u89e3\u7ed1\uff0c\u662f\u5426\u7ee7\u7eed\uff1f" : "\u8be5\u624b\u673a\u53f7\u5df2\u7ed1\u5b9a\u5176\u4ed6\u8d26\u53f7\uff0c\u5982\u679c\u7ee7\u7eed\u64cd\u4f5c\u5df2\u7ed1\u5b9a\u8d26\u53f7\u5c06\u81ea\u52a8\u89e3\u7ed1\uff0c\u662f\u5426\u7ee7\u7eed\uff1f";
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
                                    n = this.mode == ftr.Account.MODE.EMAIL ? "\u8be5\u90ae\u7bb1\u5df2\u7ed1\u5b9a\u5176\u4ed6\u8d26\u53f7\uff0c\u4e0d\u80fd\u518d\u6b21\u7ed1\u5b9a" : "\u8be5\u624b\u673a\u53f7\u5df2\u7ed1\u5b9a\u5176\u4ed6\u8d26\u53f7\uff0c\u4e0d\u80fd\u518d\u6b21\u7ed1\u5b9a";
                                    ftr.showDialog({
                                        text: n,
                                        clickOk: function () { }
                                    })
                                } else ftr.showWait("\u6b63\u5728\u521b\u5efa\u5e76\u7ed1\u5b9a..."), ftc.send("loginByPhoneOrEmail", e);
                            else this.type == ftr.Account.Type.RETRIEVE && (this.nextParam = e, ftc.send("checkVerCode", e), ftr.showWait("\u6b63\u5728\u786e\u8ba4\u9a8c\u8bc1\u7801..."))
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
                                this.exist = !1, ftr.showWait("\u6b63\u5728\u83b7\u53d6...")
                            }
                        } else t.target == this.editBoxValue.node ? this.editBoxValue.setFocus() : t.target == this.editBoxCode.node && this.editBoxCode.setFocus()
                }
            })
        