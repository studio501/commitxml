

window.ftc = window.ftc || {}, ftc.ManagerH5 = {
    currentH5: null,
    _shareSuccessCallback: null,
    _shareFailCallback: null,
    _paySuccessCallback: null,
    _payFailCallback: null,
    _startPayInfo: null,
    _isLogin: !1,
    isH5: function () {
        return !!this.currentH5
    },
    setH5: function (t, e, i) {
        this.currentH5 = t, t.init ? t.init(function () {
            i || (t.login(), this._isLogin = !0), e && e()
        }.bind(this)) : ftc.err("ftc.ManagerH5\u521d\u59cb\u5316\u5931\u8d25\uff0c\u5fc5\u987b\u5305\u542binit,login")
    },
    loadFormData: function (t) {
        cc.loader.loadRes("data", function (e, i) {
            if (i) {
                var a = ft.Base64.decodeBin(i.text, "qzjh1CpD9lYCNjEGPUn7");
                a && (a = ft.ungzip(a)), t && t(a)
            } else t && t()
        }.bind(this))
    },
    login: function () {
        !this._isLogin && this.currentH5 && (this.currentH5.login(), this._isLogin = !0)
    },
    setShare: function (t, e) {
        this._shareSuccessCallback = t, this._shareFailCallback = e
    },
    setPay: function (t, e) {
        this._paySuccessCallback = t, this._payFailCallback = e
    },
    getStartPayInfo: function () {
        return this._startPayInfo
    },
    getPayInfo: function (t) {
        this.currentH5 && this.currentH5.getPayInfo ? this.currentH5.getPayInfo(t) : t("")
    },
    startPay: function (t) {
        return this.currentH5 && this.currentH5.startPay ? (this.getPayInfo(function (e) {
            t.ext = e, pomelo.request("game.gamehandler.getPayInfo", t, function (e) {
                if (0 == e.result) return this._startPayInfo = t, this.currentH5.startPay(e.info, this._paySuccessCallback, this._payFailCallback);
                ftr.cancelWait(), ftr.showDialog({
                    text: e.text,
                    clickOk: function () {
                        ftr.cancelWait()
                    }
                })
            }.bind(this))
        }.bind(this)), "1") : "0"
    },
    startShare: function (t, e, i) {
        if (this.currentH5 && this.currentH5.startShare) return this.currentH5.startShare(t, e, i, this._shareSuccessCallback, this._shareFailCallback)
    },
    clearStorage: function (t) {
        if (this.currentH5) {
            var e = cc.sys.localStorage.getItem("h5_resource_version");
            e || (e = 0), (!t || e < t) && this.currentH5.clearStorage && this.currentH5.clearStorage(), cc.sys.localStorage.setItem("h5_resource_version", ft.getVersion())
        }
    },
    _getValue: function (t, e) {
        return this.currentH5 ? this.currentH5[t] : e
    },
    _callFunc: function (t, e, i) {
        if (this.currentH5 && this.currentH5[t]) {
            var a = this.currentH5[t].apply(this.currentH5, i);
            return void 0 === a || a
        }
        return e
    },
    showFull: function (t) {
        return this._callFunc("showFull", void 0, [t])
    },
    showBanner: function () {
        return this._callFunc("showBanner")
    },
    hideBanner: function () {
        return this._callFunc("hideBanner")
    },
    openShare: function () {
        return this._callFunc("openShare", "0")
    },
    openAd: function () {
        return this._callFunc("openAd", "0")
    },
    openFullAd: function () {
        return this._callFunc("openFullAd", "0")
    },
    initFull: function (t, e) {
        return this._callFunc("initFull", void 0, [t, e])
    },
    showMenuShare: function () {
        return this._callFunc("showMenuShare")
    },
    openPay: function () {
        return this._callFunc("openPay", "1")
    },
    isOpenInvite: function () {
        return this._callFunc("isOpenInvite", "0")
    },
    openRank: function () {
        return this._callFunc("openRank", "0")
    },
    gc: function () {
        return this._callFunc("gc")
    },
    restart: function () {
        return this._callFunc("restart")
    },
    end: function () {
        return this._callFunc("end")
    },
    getOrderIds: function () {
        return this._callFunc("getOrderIds")
    },
    hasRightTopMenu: function () {
        return this._getValue("hasRightTopMenu", !1)
    },
    openCustomer: function (t) {
        return this._callFunc("openCustomer", void 0, [t])
    },
    getOtherOpenId: function () {
        return this._callFunc("getOtherOpenId")
    },
    getFrom: function () {
        return this._callFunc("getFrom")
    },
    getFriendRank: function () {
        return this._callFunc("getFriendRank")
    },
    setUserStorage: function () {
        return this._callFunc("setUserStorage")
    },
    countEvent: function (t, e, i) {
        return this._callFunc("countEvent", void 0, [t, e, i])
    },
    downloadFile: function (t, e) {
        return 0 == t.indexOf("http://") && (t = ft.replaceAll(t, "http://", "https://")), this._callFunc("downloadFile", void 0, [t, e])
    },
    isShowRecharge: function () {
        return this._callFunc("isShowRecharge", !1)
    },
    canTextCheck: function () {
        return !(!this.currentH5 || !this.currentH5.textCheck)
    },
    textCheck: function (t, e) {
        return this._callFunc("textCheck", !1, [t, e])
    },
    setUserReferrer: function (t) {
        return this._callFunc("setUserReferrer", void 0, [t])
    },
    isOpenMiniProgram: function () {
        return this._callFunc("isOpenMiniProgram", "0")
    },
    isOpenPublic: function () {
        return this._callFunc("isOpenPublic", "0")
    },
    isOpenDesktop: function () {
        return this._callFunc("isOpenDesktop", "0")
    },
    isOpenGamePortalAd: function () {
        return this._callFunc("isOpenGamePortalAd", "0")
    },
    isOpenRecordVideo: function () {
        return this._callFunc("isOpenRecordVideo", "0")
    },
    startRecordScreen: function (t) {
        return this._callFunc("startRecordScreen", void 0, [t])
    },
    stopRecordScreen: function () {
        return this._callFunc("stopRecordScreen")
    },
    isOpenShareVideo: function () {
        return this._callFunc("isOpenShareVideo", "0")
    },
    shareVideo: function () {
        return this._callFunc("shareVideo")
    },
    roleLogin: function () {
        return this._callFunc("roleLogin")
    },
    isOpenCustomerService: function () {
        return this._callFunc("isOpenCustomerService", !0)
    },
    setClipboardData: function (t) {
        return this._callFunc("setClipboardData", void 0, [t])
    },
    getVersion: function () {
        return this._callFunc("getVersion", "")
    },
    enterFromMiniProgram: function () {
        return this._callFunc("enterFromMiniProgram", "")
    },
    enterFromPublic: function () {
        return this._callFunc("enterFromPublic", "")
    },
    enterFromDesktop: function () {
        return this._callFunc("enterFromDesktop", "")
    },
    showPortalAd: function () {
        return this._callFunc("showPortalAd")
    }
}
