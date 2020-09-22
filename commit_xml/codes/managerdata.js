

window.ftc = window.ftc || {}, ftc.ManagerData = {
    _data1: {},
    _data2: {},
    _data2Id: {},
    _dataKeys: {},
    _newc1: !1,
    _newc2: !1,
    passport: {},
    sid: "",
    firstStart: !1,
    init: function () {
        ft.bindMsg(this)
    },
    load: function () {
        this._pk = "pp" + ft.getAppId();
        var t = fts && cc.sys.localStorage.getItem(this._pk);
        this.passport = t ? JSON.parse(ft.base64Decode(t, this._pk)) : {}, this.bindInfo = {
            third: []
        }, fts || (this.sid = cc.sys.localStorage.getItem("sid" + ft.getAppId()), this.sid || (this.sid = ""))
    },
    clean: function () {
        this._data1 = {}, this._data2 = {}, this._data2Id = {}, this._dataKeys = {}
    },
    isNewC1: function () {
        var t = this._newc1;
        return t && (this._newc1 = !1), t
    },
    isNewC2: function () {
        var t = this._newc2;
        return t && (this._newc2 = !1), t
    },
    get1: function (t) {
        return this._data1[t]
    },
    get2: function (t, e) {
        return void 0 !== e ? this._data2[t][e] : this._data2[t]
    },
    get2Array: function (t) {
        var e = [];
        for (var i in this._data2[t]) e.push(this._data2[t][i]);
        return e
    },
    get2Object: function (t, e) {
        if (!this._data2Id[t])
            for (var i in this._data2Id[t] = {}, this._data2[t]) {
                var a = this._data2[t][i];
                this._data2Id[t][a.id] = a
            }
        return void 0 !== e ? this._data2Id[t][e] : this._data2Id[t]
    },
    msg: {
        echo: function (t, e) {
            e || (t > ftc._sendMsgIndex ? ftc._sendMsgIndex = t : ftc.closeReceiveMsg = !0, ftc._forbidSendMsg = !1, ftc._latestSendMsg = null, ftc._endShowSendWait(!0))
        },
        c2: function (t, e) {
            if (e) ftc.err(e);
            else {
                for (var i in t) {
                    this._data2[i] || (this._data2[i] = {});
                    var a = this._dataKeys[i];
                    for (var n in t[i])
                        if (null !== t[i][n]) {
                            var s = void 0;
                            for (var o in this._data2[i][n] ? this._data2Id[i] && (s = this._data2[i][n].id) : (this._data2[i][n] = {}, this._data2[i][n].entityId = n, this._data2Id[i] && (s = -1)), t[i][n]) null === t[i][n][o] && (t[i][n][o] = void 0), this._data2[i][n][a[o]] = t[i][n][o]; - 1 == s ? this._data2Id[i][this._data2[i][n].id] = this._data2[i][n] : s && s != this._data2[i][n].id && (delete this._data2Id[i][s], this._data2Id[i][this._data2[i][n].id] = this._data2[i][n])
                        } else this._data2[i][n] && (this._data2Id[i] && delete this._data2Id[i][this._data2[i][n].id], delete this._data2[i][n])
                }
                this._newc2 = !0
            }
        },
        c1: function (t, e) {
            if (e) ftc.err(e);
            else {
                for (var i in t)
                    if (null !== t[i]) {
                        this._data1[i] || (this._data1[i] = {});
                        var a = this._dataKeys[i];
                        for (var n in t[i]) null === t[i][n] && (t[i][n] = void 0), this._data1[i][a[n]] = t[i][n]
                    } else delete this._data1[i];
                this._newc1 = !0
            }
        },
        ck: function (t, e) {
            if (!e)
                for (var i in t)
                    for (var a in this._dataKeys[i] || (this._dataKeys[i] = {}), t[i]) this._dataKeys[i][t[i][a]] = a
        },
        log: function (t, e) {
            e || ftc._addLog(t)
        },
        initManagerData: function (t, e) {
            this.sid = t.sid, ftc.openLog = t.log, ftc.openTest = t.test, ftc.openLog && ftc.openTest && ftr && ftr.initTestPart(), fts || cc.sys.localStorage.setItem("sid" + ft.getAppId(), this.sid)
        },
        setPassportInfo: function (t, e) {
            void 0 !== t.account && (this.passport.account = t.account), void 0 !== t.pwd && (this.passport.pwd = t.pwd), void 0 !== t.overseas && (this.passport.overseas = t.overseas), void 0 !== t.uid && (this.passport.uid = t.uid), void 0 !== t.token && (this.passport.token = t.token), fts && cc.sys.localStorage.setItem(this._pk, ft.base64Encode(JSON.stringify(this.passport), this._pk)), t.token && "" == t.uid && "" == t.account && "" == t.pwd && (this.firstStart = !0), void 0 !== t.phone && (this.bindInfo.phone = t.phone), void 0 !== t.email && (this.bindInfo.email = t.email), void 0 !== t.third && (this.bindInfo.third = t.third)
        },
        server: function (t, e) {
            e ? (ftc._endShowSendWait(!1), ftr.showDialog({
                text: e,
                clickOk: function () {
                    ftc.sysEnd()
                }
            })) : t && ftc.showRollTitle([{
                txt: t,
                count: 3
            }])
        },
        restartGame: function (t, e) {
            if (ftc.cancelWait(), ftr.cancelWait(), ftc.closeReceiveMsg = !0, t && fts) {
                for (ftc.ManagerRes.stopBackMusic(), ftc._tickLocalStorage(1e3), ftc.scene.isLoaded = !1; ftc.ManagerRes.topLayout();) ftc.ManagerRes.topLayout().cancel(!0);
                ftc.scene.loading()
            } else ftc.sysRestart()
        },
        updateLocalTime: function (t, e) {
            t.time > 0 ? (ftc._localTimeDt = t.time - ft.getSysSecond(), ftc.localDay = t.day, ftc.localHoliday = t.holiday) : (ftc._localTimeDt = 0, ftc.localDay = 0)
        },
        showExitDialog: function (t, e) {
            ftc.forbidGame(), ftr.cancelWait(), t.help && ftc.getChat() ? (t.txt && ftc._uploadErrors.push(t.txt), ftr.showDialog({
                text: t.txt,
                button2: ftc.language("联系客服"),
                clickOk: function () {
                    t.restart ? ftc.sysRestart() : ftc.sysEnd()
                },
                clickCancel: function () {
                    ftr.showDialog({
                        text: t.txt,
                        clickOk: function () {
                            ftc.sysEnd()
                        }
                    }), ftc.showChat()
                },
                clickClose: function () {
                    ftc.sysEnd()
                }
            })) : ftr.showDialog({
                text: t.txt,
                clickOk: function () {
                    t.restart ? ftc.sysRestart() : ftc.sysEnd()
                },
                clickClose: function () {
                    ftc.sysEnd()
                }
            })
        },
        showAccountDialog: function (t, e) {
            ftr.cancelWait(), 98 == t.result ? ftr.showAccount(ftr.Account.Type.LOGIN, ftr.Account.MODE.SELF, t.txt) : 99 == t.result && ftr.showAccount(ftr.Account.Type.SETACCOUNT2, ftr.Account.MODE.SELF, t.txt)
        },
        startPay: function (t, e) {
            ftc._startPay(t)
        },
        downloadUpdate: function (t, e) {
            t || (t = e), ftsdk && (t.apk ? _ftsdkhotupdate.startDownloadApk(t.apk, t.txt, e) : t.zip && (ftc.forbidGame(), _ftsdkhotupdate.startDownloadZip(t.zip, t.txt)))
        },
        setLocalSwitch: function (t, e) {
            ftsdk && (void 0 !== t.age ? (_ftsdkcertify.setUserCertifyAge(t.age), ftsdk.setItem("age", t.age)) : (t.offline ? (_ftsdkcertify.setUserCertifyAge(ftsdk.getItem("age", 0)), _ftsdkcertify.setUserCertify(ftsdk.getItem("fcm", 0), 0)) : (_ftsdkcertify.setUserCertify(t.fcm, t.holiday), ftsdk.setItem("fcm", t.fcm), ftsdk.setMyPaySwitch(t.cz), ftsdk.setCommentSwitch(t.comment), void 0 !== t.chat && (ftc.openChat = !!t.chat), void 0 !== t.uc && (ftc.openUserCenter = !!t.uc)), !this.firstStart && _ftsdkcertify.enterGameShowUserCertifyTip && _ftsdkcertify.enterGameShowUserCertifyTip(), _ftsdkcertify.enterGameShowUserCertifyTip = void 0))
        },
        sysAcountResult: function (t, e) {
            for (var i = ftc.ManagerRes.allLayouts(), a = i.length - 1; a >= 0; a--)
                if (ftc.__layoutHandleMsg(i[a], "sysAcountResult", t, e)) return;
            ftr.cancelWait(), t.txt && ftr.showTip(t.txt), "1" == ftc.callNativeFunction("isLogin") && 0 === t.openid && this.passport.account && ftr.showAccount(ftr.Account.Type.BIND, ftr.Account.MODE.SDK)
        }
    }
}
