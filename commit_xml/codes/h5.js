

window.ftc = window.ftc || {}, ftc.H5 = {}, ftc.H5.init = function (t) {
    window.mainH5ServerIp || (window.mainH5ServerIp = "server.ftaro.com", window.mainH5ServerPort = 34001, window.mainH5SourceId = 98), t()
}, ftc.H5.login = function () {
    ftr.showAccount(ftr.Account.Type.LOGIN, ftr.Account.MODE.SELF)
}, ftc.H5.getVersion = function () {
    return "1"
}, ftc.H5.openCustomer = function (t) {
    ftc.showTip("暂不支持客服")
}, ftc.H5.getPayInfo = function (t) {
    t("")
}, ftc.H5.startPay = function (t, e, i) {
    ftr.cancelWait()
}, ftc.H5.showBanner = function () { }, ftc.H5.hideBanner = function () { }, ftc.H5.initFull = function (t, e) { }, ftc.H5.showFull = function () { }, ftc.H5.startShare = function (t, e, i, a) { }, ftc.H5.openShare = function () {
    return "0"
}, ftc.H5.openFullAd = function () {
    return "0"
}, ftc.H5.openAd = function () {
    return "0"
}, ftc.H5.downloadFile = function (t, e) {
    cc.loader.load(t, function (t, i) {
        if (!t) {
            var a = new cc.SpriteFrame(i);
            if (a) return void e(a)
        }
        e(null)
    })
}
