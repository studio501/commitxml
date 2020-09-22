
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeFirst: cc.Node,
                    nodeSecond: cc.Node,
                    nodeAgreement: cc.Node,
                    nodeMultStore: cc.Node,
                    buttonGuest: cc.Button,
                    buttonAccount: cc.Button,
                    buttonUserCenter: cc.Button,
                    buttonStart: cc.Button,
                    labelName: cc.Label,
                    buttonBindOrSwitch: cc.Button,
                    labelBindOrSwitch: cc.Label,
                    buttonSelect: cc.Button,
                    buttonPrivacy: cc.Button,
                    buttonAgreement: cc.Button,
                    nodeSelect: cc.Node
                },
                init: function () {
                    this.addClick(this.buttonStart), this.addClick(this.buttonAccount), this.addClick(this.buttonGuest), this.addClick(this.buttonUserCenter), this.addClick(this.buttonBindOrSwitch), this.addClick(this.buttonAgreement), this.addClick(this.buttonSelect), this.addClick(this.buttonPrivacy), this.node.active = !1
                },
                load: function () { },
                setData: function (t, e, i) {
                    this.labelName.string = t || "", this._callbackEntry = e, this._hasDoc = i, this.node.active = !0, ftc.ManagerData.firstStart && this.nodeAgreement.active && (this.nodeSelect.active = !1, ftsdk && ftsdk.showUserAgreement(function (t) {
                        try {
                            this.nodeSelect.active = t
                        } catch (t) { }
                    }.bind(this))), fts && ftc.openUserCenter && "1" == ftc.callNativeFunction("isLogin") && ((ftc.ManagerData.passport.account || ftc.ManagerData.passport.uid) && "1" != ftc.callNativeFunction("isForceLogin") || ftr.showAccount(ftr.Account.Type.LOGIN, ftr.Account.MODE.SDK)), this.updateData()
                },
                cleanup: function () { },
                updateData: function () {
                    this.node.active && (this.nodeFirst.active = !1, this.nodeSecond.active = !1, this.nodeAgreement.active = !1, this.nodeSelect.active = !ftsdk || ftsdk.getUserAgreementSwitch(), this.nodeAgreement.active = !ftc.ManagerH5.isH5(), ftc.ManagerData.firstStart && !ftc.ManagerData.passport.uid && ftc.openUserCenter ? this.nodeFirst.active = !0 : (this.nodeSecond.active = !0, this.buttonUserCenter.node.active = ftc.getUserCenter(), this.nodeMultStore.active = !1, ftc.ManagerData.passport.account ? this._hasDoc && (this.nodeMultStore.active = !0, this.labelBindOrSwitch.string = ftc.language("点击切换存档")) : ftc.openUserCenter && (this.labelBindOrSwitch.string = ftc.language("点击升级账号"), this.nodeMultStore.active = !0)))
                },
                tick: function (t) { },
                onClick: function (t) {
                    t.target == this.buttonGuest.node || t.target == this.buttonStart.node ? this.nodeSelect.active ? this._callbackEntry && this._callbackEntry() : ftr.showTip("请先同意《用户使用许可协议》和《用户隐私协议》") : t.target == this.buttonAccount.node ? ftjp ? ftjp.showAbroadLogin() : "1" == ftc.callNativeFunction("isLogin") ? ftr.showAccount(ftr.Account.Type.LOGIN, ftr.Account.MODE.SDK) : ftr.showAccount(ftr.Account.Type.LOGIN, ftr.Account.MODE.SELF) : t.target == this.buttonUserCenter.node ? ftr.showUserCenter() : t.target == this.buttonBindOrSwitch.node ? ftc.ManagerData.passport.account ? ftr.loadLayout("LayoutSysDoc", function (t) {
                        t.setData(this._callbackEntry)
                    }.bind(this), {
                        field: "_ftaro"
                    }) : "1" == ftc.callNativeFunction("isLogin") ? ftr.showAccount(ftr.Account.Type.LOGIN, ftr.Account.MODE.SDK) : ftr.showUserCenter() : t.target == this.buttonSelect.node ? (this.nodeSelect.active = !this.nodeSelect.active, ftsdk.setUserAgreementSwitch(this.nodeSelect.active)) : t.target == this.buttonPrivacy.node ? ftsdk.showDetailPrivacy() : t.target == this.buttonAgreement.node && ftsdk.showDetailAgreement()
                }
            })
        