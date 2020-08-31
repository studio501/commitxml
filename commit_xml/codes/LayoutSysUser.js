
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    labelName: cc.Label,
                    labelTip: cc.Label,
                    buttonClose: cc.Button,
                    buttonModify: cc.Button,
                    buttonSwitch: cc.Button,
                    buttonPhone: cc.Button,
                    buttonEmail: cc.Button,
                    buttonPrivacy: cc.Button,
                    buttonChat: cc.Button,
                    buttonCertify: cc.Button,
                    buttonWX: cc.Button,
                    buttonCitation: cc.Button,
                    buttonGooglePlay: cc.Button,
                    buttonGameCenter: cc.Button,
                    labelPhone: cc.Label,
                    labelEmail: cc.Label,
                    labelCertify: cc.Label,
                    labelWX: cc.Label,
                    labelCitation: cc.Label,
                    labelGooglePlay: cc.Label,
                    labelGameCenter: cc.Label,
                    nodeRedPhone: cc.Node,
                    nodeRedEmail: cc.Node,
                    nodeRedCertify: cc.Node,
                    nodeRedWX: cc.Node,
                    labelSwitch: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonPhone), this.addClick(this.buttonEmail), this.addClick(this.buttonCertify), this.addClick(this.buttonPrivacy), this.addClick(this.buttonChat), this.addClick(this.buttonModify), this.addClick(this.buttonSwitch), this.addClick(this.buttonWX), this.addClick(this.buttonCitation), this.addClick(this.buttonGooglePlay), this.addClick(this.buttonGameCenter), this.addClick(this.buttonClose), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    this.updateData()
                },
                setData: function (t) { },
                enter: function () { },
                updateData: function () {
                    if (ftc.ManagerData.passport.account ? (this.labelName.string = ftc.ManagerData.passport.account.substr(0, 16), this.buttonModify.node.active = ftc.ManagerData.passport.account.length > 18, this.labelSwitch.string = ftc.language("\u5207\u6362\u8d26\u53f7"), this.buttonSwitch.node.active = !1, ftc.ManagerData.bindInfo.phone || ftc.ManagerData.bindInfo.email ? this.labelTip.node.active = !1 : (this.labelTip.node.active = !0, this.labelTip.string = ftc.language("\u5efa\u8bae\u5c3d\u5feb\u7ed1\u5b9a\u8d26\u6237\uff0c\u4ee5\u9632\u6570\u636e\u4e22\u5931"))) : (this.buttonModify.node.active = !1, this.labelName.string = ftc.language("\u6e38\u5ba2"), this.labelSwitch.string = ftc.language("\u767b\u5f55\u8d26\u53f7"), this.buttonSwitch.node.active = !0, this.labelTip.string = ftc.language("\u5efa\u8bae\u5c3d\u5feb\u521b\u5efa\u8d26\u6237\uff0c\u4ee5\u9632\u6570\u636e\u4e22\u5931")), ftsdk && _ftsdkcertify.getUserCertifyOpen() && _ftsdkcertify.getUserCertifyAge() >= 0 ? (this.buttonCertify.node.active = !0, this.labelCertify.string = ftc.language(_ftsdkcertify.getUserCertifyAge() > 0 ? "\u4f60\u5df2\u5b9e\u540d\u8ba4\u8bc1" : "\u524d\u5f80\u5b9e\u540d\u8ba4\u8bc1"), this.nodeRedCertify.active = !1) : (this.buttonCertify.node.active = !1, this.nodeRedCertify.active = !0), ftjp) this.buttonPhone.node.active = !1, this.buttonCitation.node.active = !0, ftjp.getCitation() ? this.labelCitation.string = ftc.language("\u67e5\u770b\u5f15\u7ee7\u7801") : this.labelCitation.string = ftc.language("\u521b\u5efa\u5f15\u7ee7\u7801");
                    else {
                        if (598 != ftc.getSourceId())
                            if (this.buttonPhone.node.active = !0, ftc.ManagerData.bindInfo.phone) {
                                var t = ftc.ManagerData.bindInfo.phone;
                                this.labelPhone.string = ftc.language("\u5df2\u7ed1\u5b9a\u624b\u673a\u53f7") + "\n" + t.substr(0, 3) + "****" + t.substr(7), this.nodeRedPhone.active = !1
                            } else this.labelPhone.string = ftc.language("\u7ed1\u5b9a\u624b\u673a\u53f7"), this.nodeRedPhone.active = !0;
                        else this.buttonPhone.node.active = !1;
                        this.buttonCitation.node.active = !1
                    }
                    ftc.isTv() ? this.buttonEmail.node.active = !1 : (this.buttonEmail.node.active = !0, ftc.ManagerData.bindInfo.email ? (this.labelEmail.string = ftc.language("\u5df2\u7ed1\u5b9a\u90ae\u7bb1") + "\n***" + ftc.ManagerData.bindInfo.email.substr(3), this.nodeRedEmail.active = !1) : (this.labelEmail.string = ftc.language("\u7ed1\u5b9a\u90ae\u7bb1"), this.nodeRedEmail.active = !0)), "1" == ftc.callNativeFunction("isLoginWX") && ftc.ManagerData.passport.account ? (this.buttonWX.node.active = !0, this._checkThird(ftr.Account.MODE.WX) ? (this.labelWX.string = ftc.language("\u5df2\u7ed1\u5b9a\u5fae\u4fe1"), this.nodeRedWX.active = !1) : (this.labelWX.string = ftc.language("\u7ed1\u5b9a\u5fae\u4fe1"), this.nodeRedWX.active = !0)) : this.buttonWX.node.active = !1, "1" == ftc.callNativeFunction("isLoginGooglePlay") ? (this.buttonGooglePlay.node.active = !0, this._checkThird(ftr.Account.MODE.GOOGLE) ? this.labelGooglePlay.string = ftc.language("\u5df2\u7ed1\u5b9aGooglePlay") : this.labelGooglePlay.string = ftc.language("\u7ed1\u5b9aGooglePlay")) : this.buttonGooglePlay.node.active = !1, "1" == ftc.callNativeFunction("isLoginAppleGameCenter") ? (this.buttonGameCenter.node.active = !0, this._checkThird(ftr.Account.MODE.APPLE) ? this.labelGameCenter.string = ftc.language("\u5df2\u7ed1\u5b9aGameCenter") : this.labelGameCenter.string = ftc.language("\u7ed1\u5b9aGameCenter")) : this.buttonGameCenter.node.active = !1, this.buttonChat.node.active = ftc.getChat()
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () { },
                _checkThird: function (t) {
                    for (var e = t - ftr.Account.MODE.WX + 1, i = 0; i < ftc.ManagerData.bindInfo.third.length; i++)
                        if (ftc.ManagerData.bindInfo.third[i] == e) return !0;
                    return !1
                },
                _bind: function (t) {
                    ftc.ManagerData.passport.account ? ftr.showAccount(ftr.Account.Type.BIND, t) : ftr.showAccount(ftr.Account.Type.BINDLOGIN, t)
                },
                onClick: function (t) {
                    t.target == this.buttonClose.node ? this.cancel() : t.target == this.buttonModify.node ? ftr.showDialog({
                        text: "\u8d26\u53f7\u53ea\u80fd\u4fee\u6539\u4e00\u6b21\uff0c\u662f\u5426\u7acb\u5373\u524d\u5f80\u4fee\u6539\uff1f",
                        clickOk: function () {
                            ftr.showAccount(ftr.Account.Type.SETACCOUNTPWD, ftr.Account.MODE.SELF)
                        }.bind(this),
                        clickCancel: function () { }
                    }) : t.target == this.buttonSwitch.node ? ftjp ? ftjp.showAbroadLogin() : ftr.showAccount(ftr.Account.Type.LOGIN, ftr.Account.MODE.SELF) : t.target == this.buttonPhone.node ? ftc.ManagerData.bindInfo.phone ? ftr.showTip("\u4f60\u5df2\u7ed1\u5b9a\u624b\u673a\u53f7") : this._bind(ftr.Account.MODE.PHONE) : t.target == this.buttonEmail.node ? ftc.ManagerData.bindInfo.email ? ftr.showTip("\u4f60\u5df2\u7ed1\u5b9a\u90ae\u7bb1") : this._bind(ftr.Account.MODE.EMAIL) : t.target == this.buttonPrivacy.node ? ftsdk.showDetailPrivacy() : t.target == this.buttonChat.node ? ftc.showChat() : t.target == this.buttonCertify.node ? 0 == _ftsdkcertify.getUserCertifyAge() ? _ftsdkcertify.openUserCertify() : ftr.showTip("\u4f60\u5df2\u5b9e\u540d\u8ba4\u8bc1") : t.target == this.buttonCitation.node ? ftjp.getCitation() ? ftjp.showCitationResult() : ftjp.showCitationRegist() : t.target == this.buttonWX.node ? this._checkThird(ftr.Account.MODE.WX) ? ftr.showTip("\u4f60\u5df2\u7ed1\u5b9a\u5fae\u4fe1") : ftc.ManagerData.passport.account && ftr.showAccount(ftr.Account.Type.BIND, ftr.Account.MODE.WX) : t.target == this.buttonGooglePlay.node ? this._checkThird(ftr.Account.MODE.GOOGLE) ? ftr.showTip("\u4f60\u5df2\u7ed1\u5b9aGoogle\u8d26\u53f7") : this._bind(ftr.Account.MODE.GOOGLE) : t.target == this.buttonGameCenter.node && (this._checkThird(ftr.Account.MODE.APPLE) ? ftr.showTip("\u4f60\u5df2\u7ed1\u5b9aGameCenter") : this._bind(ftr.Account.MODE.APPLE))
                }
            })
        