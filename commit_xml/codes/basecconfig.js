window.ftc = window.ftc || {}, window.fts || (window.fts = !1), window.ftsdk || (window.ftsdk = !1), window.ftjp || (window.ftjp = !1), fts || require("pomeloclient"), ftc.firstViewName = "LayoutLoading", ftc.registTextures = [], ftc.registDirs = [], ftc.registAudios = [], ftc.registImgs = [], ftc.registPrefabs = [], ftc.ActiveNative = !1, ftc.RestoreNodeTime = 18e4, ftc.DialogShadeOpacity = 190, ftc.DesignWidth = 1136, ftc.DesignHeight = 640, ftc.viewOnEnterCallbacks = {}, ftc.openFmod = !1, ftc.showTip = function (t, e, i) {
    ftr && ftr.showTip(t, e, i)
}, ftc.showDialog = function (t) {
    ftr && ftr.showDialog(t)
}, ftc.showWait = function (t, e, i, a) {
    ftr && ftr.showWait(t, e, i, a)
}, ftc.cancelWait = function (t) {
    ftr && ftr.cancelWait(t)
}, ftc.showExitTip = function () {
    ftr.showTip("\u518d\u6309\u4e00\u6b21\u9000\u51fa\u6e38\u620f")
}, ftc.showErrorDialog = function (t, e) {
    t || (t = "\u5f88\u62b1\u6b49\uff0c\u7a0b\u5e8f\u4e0d\u5c0f\u5fc3\u51fa\u9519\u4e86!"), e || (e = 0), ftr.showDialog({
        text: t + "-" + e,
        clickOk: function () {
            ftc.sysEnd()
        }
    })
}, ftc.showRollTitle = function (t, e) {
    ftr && ftr.showRollTitle(t, e)
}, ftc.showTop = function (t, e) {
    ftr && ftr.showTop(t, e)
}, ftc.cancelTop = function (t, e) {
    ftr && ftr.cancelTop(t, e)
}, ftc.isShowTop = function () {
    return ftr && ftr.isShowTop()
}, ftc.onClick = function () { }, ftc.tick = function (t) { }, ftc.setTvTip = function (t, e, i) {
    ftr.setTvTip(t, e, i)
}, ftc.hideTvTip = function (t) {
    ftr.setTvTip(t, void 0, 1)
}, ftc.openTvTip = function () {
    ftr.setTvTip(void 0, void 0, 5)
}, ftc.closeTvTip = function () {
    ftr.setTvTip(void 0, void 0, 6)
}, ftc.loadLayout = function (t, e, i) {
    ftr && ftr.loadLayout(t, e, i)
}, ftc.loadPart = function (t, e, i) {
    ftr && ftr.loadPart(t, e, i)
}, ftc.ListView = require("ListView"), ftc.Hypertext = require("Hypertext"), ftc.LabelLocalized = require("LabelLocalized"), ftc.SpriteLocalized = require("SpriteLocalized"), ftc.BasePart = require("BasePart"), ftc.BasePartItem = require("BasePartItem"), ftc.BaseView = require("BaseView"), ftc.scene = null, ftc.openLog = !1, ftc.openTest = !1, ftc.openChat = !0, ftc.openUserCenter = !0, ftc.localDay = 0, ftc.localHoliday = 0, ftc.__logBuffer = [], ftc.__isSendWaitBack = !1, ftc.__linkedToServer = !1, ftc.replaceLayoutFunc = {}, ftc.replacePartFunc = {}, ftc.delaySuccessShare = 0, ftc.__unHandlerMsg = [], ftc.__payResult = 0, ftc.__shareResult = -1, ftc.__adResult = 0, ftc.__dts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ftc.__dtPos = 0, ftc.__dtSum = 0, ftc.__dtSave = 0, ftc.__dtSwitchLogin = 0, ftc._uiLogs = [], ftc._uploadErrors = [], ftc._uiLogType = {
    NewLayout: 1,
    RemoveLayout: 2,
    ClickButton: 3,
    LongClickButton: 4
}, ftc.init = function (t) {
    if (ftc._fmodInit(), fts && (fts.loadMemoryValues(ft, "value"), fts.loadMemoryValues(fts, "value")), ftc.isWindows()) try {
        if (jsb) {
            var e = jsb.fileUtils.getStringFromFile(jsb.fileUtils.getWritablePath() + "f_config" + ft.getAppId() + ".txt");
            if ("" != e) {
                ftc.windowsConfig = {};
                for (var i = e.split("\r\n"), a = 0; a < i.length; a++) {
                    var n = i[a].split(":");
                    ftc.windowsConfig[n[0]] = n[1].split("#")[0]
                }
                for (var a in window.ftaroHotUpdate = ftc.windowsConfig.ftaroHotUpdate, ftc.windowsConfig) ft.console("\u8bfb\u53d6windows\u914d\u7f6e" + a + ":" + ftc.windowsConfig[a])
            }
        }
    } catch (t) { }
    var s = ftc.callNativeFunction("getLanguage");
    ftc.windowsConfig && (s = ftc.windowsConfig.language), ftc.ManagerLan.init(s), ftc.ManagerData.init(), ftc.isNative() && ft_c_init(), ftr ? ftr.init(t) : t()
}, ftc._checkSpeedUp = function (t) {
    ftc.__dtSum += t - ftc.__dts[ftc.__dtPos], ftc.__dts[ftc.__dtPos] = t, ftc.__dtPos = (1 + ftc.__dtPos) % 10, ftc.__dtSum > 60 && ftc.sysEnd()
}, ftc._tickPay = function () {
    var t = ftc.tickPayEnd();
    0 != t && (t = ("" + t).split(","), ftr.cancelWait(), 1 == t[0] ? ftr.showPayCountdown() : -1 == t[0] ? ftr.showTip("\u652f\u4ed8\u5931\u8d25") : -2 == t[0] ? ftr.showTip("\u652f\u4ed8\u53d6\u6d88") : -3 == t[0] ? ftr.showDialog({
        text: "\u5145\u503c\u5230\u8d26\u53ef\u80fd\u5b58\u5728\u5ef6\u8fdf\uff0c\u8bf7\u5c1d\u8bd5\u91cd\u65b0\u8fdb\u5165\u6e38\u620f",
        clickOk: function () { }
    }) : 2 == t[0] && ftr.showWait("\u83b7\u53d6\u8ba2\u5355\u6210\u529f..."))
}, ftc._tickShare = function (t) {
    var e = ftc.tickShareEnd(); - 1 != e && (0 == e || ftc.delaySuccessShare ? (ftc.delaySuccessShare > 0 && (ftc.delaySuccessShare -= t), (0 == e || ftc.delaySuccessShare <= 0) && (ftc.sendClient("c_shareSuccess", 1), ftr.showTip("\u5206\u4eab\u6210\u529f"), ftc.delaySuccessShare = 0)) : 1 == e ? (ftr.showTip("\u5206\u4eab\u5931\u8d25"), ftc.delaySuccessShare = 0) : 2 == e && (ftr.showTip("\u5206\u4eab\u53d6\u6d88"), ftc.delaySuccessShare = 0))
}, ftc._tickAd = function () {
    if (ftc.watchingAd) {
        var t = ftc.tickAdEnd();
        0 != t && (ftc.watchingAd = !1, 1 == t ? ftc.sendClient("c_successFullAd") : ftr.showTip("\u89c2\u770b\u53d6\u6d88"))
    }
}, ftc._tickLocalStorage = function (t) {
    if (ftc.__dtSave += t, ftc.__dtSave >= ftc.__dtSum) {
        ftc.__dtSave = 0;
        var e = ftc.player;
        e._readyWriteString && (cc.sys.localStorage.setItem(e.dbFile._playerId, e._readyWriteString), e._readyWriteString = void 0, ftc.openTest && ftc.log(("\u5b58\u50a8\u6210\u529f\uff0c\u6700\u77ed\u95f4\u9694" + ftc.__dtSum).substr(0, 13) + "\u79d2"))
    }
}, ftc._tickSendRecvMsg = function (t) {
    if (ftc._serverClose) ftc._pomeloReconnect();
    else {
        if (ftc._sendPackMsgs.l > 0) {
            if (fts) ftc.player.gate(ftc._sendPackMsgs);
            else {
                if (ftc._serverReconnectCount) return;
                null == ftc.pomeloOnPushMsg && (pomelo.on("pushMsg", function (t) {
                    ftc._recv(t)
                }), ftc.pomeloOnPushMsg = !0), pomelo.request("game.gamehandler.sendMsg", ftc._sendPackMsgs, function (t) { }), ftc._latestSendMsg = ftc._sendPackMsgs
            }
            ftc._sendPackMsgs = {
                l: 0
            }, ftc._forbidSendMsg = !0
        }
        if (ftc._clientPackMsgs.length > 0)
            for (var e = ftc._clientPackMsgs.length - 1; e >= 0; e--) ftc._clientPackMsgs[e][1] -= t, ftc._clientPackMsgs[e][1] <= 0 && (ftc._recv([ftc._clientPackMsgs[e][0]], !0), ftc._clientPackMsgs.splice(e, 1))
    }
}, ftc._tickSwitchLogin = function (t) {
    (ftc.__dtSwitchLogin += t, ftc.__dtSwitchLogin > 1) && (ftc.__dtSwitchLogin = 0, "1" === ftc.callNativeFunction("isSwitchLogin") && (ftc.ManagerData.passport.account ? ftr.showAccount(ftr.Account.Type.SWITCH, ftr.Account.MODE.SDK) : ftr.showAccount(ftr.Account.Type.LOGIN, ftr.Account.MODE.SDK)))
}, ftc._load = function () {
    ftc._uiLogs = [], ftc._uploadErrors = [], ftc._sendPackMsgs = {
        l: 0
    }, ftc._clientPackMsgs = [], ftc.__unHandlerMsg = [], ftc._sendMsgIndex = 0, ftc._forbidSendMsg = !1, ftc._latestSendMsg = null, ftc.__serverEnterIp = "", ftc.__serverEnterPort = "", ftc.__serverUid = null, ftc.__serverToken = 0, ftc._serverClose = !1, ftc._serverReconnectCount = 0, ftc.__delaySendMsgs = [], ftc._forbidReconnect = !0, ftc.ManagerRes.init(), ftsdk && ftsdk.init(), ftc.ManagerData.load()
}, ftc.language = function (t, e) {
    return ftc.ManagerLan.t(t, e)
}, ftc.callNativeFunction = function (t, e) {
    if (ftc.isNative()) try {
        return void 0 === e ? ft_c_call_func0(t) : ft_c_call_func1(t, e)
    } catch (t) { } else if (ftc.ManagerH5.isH5() && ftc.ManagerH5[t]) return ftc.ManagerH5[t](e)
}, ftc.getZone = function () {
    var t = ftc.callNativeFunction("getZone");
    return void 0 !== t ? t : 0
}, ftc.getDeviceId = function () {
    if (fts) {
        var t = ftc.callNativeFunction("getDevice");
        return t ? ft_c_md5_encode(t) : ftc.windowsConfig ? ftc.windowsConfig.device : "win_1234567890123456789012345678"
    }
    return cc.sys.os == cc.sys.OS_IOS ? "ios12345678900000000000000000000" : cc.sys.os == cc.sys.OS_ANDROID ? "and12345678900000000000000000000" : "win12345678900000000000000000000"
}, ftc.getShowVersion = function () {
    var t = ftc.callNativeFunction("getVersion");
    return t || "1.0.0"
}, ftc.getBuildVersion = function () {
    var t = ftc.callNativeFunction("getBuild");
    if (t) {
        var e = t.split("."),
            i = "";
        for (var a in e) i += e[a];
        return parseInt(i)
    }
    return 0
}, ftc.getSourceId = function () {
    if (window.mainH5SourceId) return cc.sys.os == cc.sys.OS_IOS ? window.mainH5SourceId + 200 : window.mainH5SourceId;
    if (!fts) return ftc.isWindows() ? 98 : 0;
    var t = ftc.callNativeFunction("getSourceId");
    return t || ftc.isAndroid() || ftc.isIos() ? t : ftc.windowsConfig ? ftc.windowsConfig.source : 99
}, ftc._fmodInit = function () {
    ftc.openFmod && (ftc.openFmod = !1, ftc.isNative() && 0 == ft_c_fmod_init(128) && (ftc.openFmod = !0))
}, ftc._fmodRelease = function () {
    ftc.openFmod && ftc.isNative() && ft_c_fmod_release()
}, ftc._fmodUpdate = function () {
    ftc.openFmod && ftc.isNative() && ft_c_fmod_update()
}, ftc.startPay = function (t, e, i, a, n) {
    if (ftc.isNative()) return ft_c_start_pay(t, e, i, a, n)
}, ftc.startShare = function (t, e) {
    if (ftc.isNative()) return ft_c_start_share(t, e)
}, ftc._checkSign = function () {
    if (fts && ftc.ActiveNative && ftc.isAndroid()) return ft_android_get_sign()
}, ftc.tickPayEnd = function () {
    var t = ftc.__payResult;
    return !t && ftc.isNative() ? ft_c_listen_pay_end() : (ftc.__payResult = 0, t)
}, ftc.setPayEnd = function (t) {
    ftc.__payResult = t
}, ftc.tickShareEnd = function () {
    var t = ftc.__shareResult;
    return -1 == t && ftc.isNative() ? ft_c_listen_share_end() : (ftc.__shareResult = -1, t)
}, ftc.setShareEnd = function (t) {
    ftc.__shareResult = t
}, ftc.tickAdEnd = function () {
    var t = ftc.__adResult;
    return 0 == t && ftc.isNative() && (t = ftc.callNativeFunction("getFullAdEndSte")), ftc.__adResult = 0, t
}, ftc.setAdEnd = function (t) {
    ftc.__adResult = t, ftc.watchingAd = !0
}, ftc.showChat = function () {
    var t = ftc.ManagerData.sid,
        e = ft.md5("sid=" + t + "&gameId=" + ft.getAppId() + "9T6YMohfcw"),
        i = "http://chat.ftaro.com/login.aspx?sid=" + t + "&gameId=" + ft.getAppId() + "&sign=" + e + "&name=" + ftc.ManagerData.passport.account + "&email=&attach=" + ft.getVersion() + "," + ftc.getSourceId();
    ftc.ManagerH5.isH5() ? ftc.ManagerH5.openCustomer(i) : ftc.isTv() ? ftsdk && ftsdk.loadLayout("LayoutTvCustomer") : ftsdk ? ftjp ? ftsdk.loadLayout("LayoutFormList", void 0, !0) : ftsdk.loadLayout("LayoutChat", void 0, !0) : ftc.showBroser(i)
}, ftc.getChat = function () {
    return !!ftc.openChat && (!ftc.ManagerH5.isH5() || ftc.ManagerH5.isOpenCustomerService())
}, ftc.getUserCenter = function () {
    return !(!ftc.openUserCenter || !fts) && "1" != ftc.callNativeFunction("isLogin")
}, ftc.showBroser = function (t) {
    ftc.isAndroid() || ftc.isIos() ? ftc.callNativeFunction("showBrowser", t) : cc.sys.openURL(t)
}, ftc.showWeb = function (t) {
    ftc.isAndroid() || ftc.isIos() ? ftc.callNativeFunction("showWeb", t) : cc.sys.openURL(t)
}, ftc.readFile = function (t, e) {
    return ftc.isNative() ? ft_c_read_file(t + e) : ftc.isWindows() ? jsb.fileUtils.getStringFromFile(t + e) : ""
}, ftc.writeFile = function (t, e, i) {
    ftc.isNative() ? (i || (i = ""), ft_c_write_file(t, e, i)) : ftc.isWindows() && (jsb.fileUtils.createDirectory(t), jsb.fileUtils.writeStringToFile(i, t + e))
}, ftc.removeDir = function (t) {
    ftc.isNative() ? ft_c_remove_dir(t) : ftc.isWindows() && jsb.fileUtils.removeDirectory(t)
}, ftc.log = function (t, e) {
    ftc.openLog && (void 0 === e && (e = 9), ftc._addLog(ft.createLog(t, e)), console && console.log("ftc.log#" + t))
}, ftc.err = function (t, e) {
    if (ftc.openLog) {
        var i = t.toString();
        e && (i = i + "\n" + e), ftc._addLog(ft.createLog(i, 1)), console && console.log("ftc.err#" + i)
    }
    t && (ftc._uploadErrors.push(t), ftc._uploadErrors.length > 10 && ftc._uploadErrors.splice(0, 1))
}, ftc.warn = function (t) {
    ftc.openLog && (ftc._addLog(ft.createLog(t, 5)), console && console.log("ftc.warn#" + t)), t && (ftc._uploadErrors.push(t), ftc._uploadErrors.length > 10 && ftc._uploadErrors.splice(0, 1))
}, ftc.uploadCatch = function (t, e) {
    if (t || e) try {
        var i = e || "";
        ft.isString(t) ? i += "\n" + t : ft.isObject(t) && (t.stack ? i += "\n" + t.stack : i += "\n" + t.toString()), i += "\n" + ftc.ManagerRes.latestOptionUrl, i += ftc._getExtLogs(), ftc.openLog ? ftc.err(i) : fts ? ftc.player.addDebug(i) : ftc.send("addDebug", i)
    } catch (t) { }
}, ftc._getExtLogs = function () {
    var t = "";
    if (ftc._uiLogs.length) {
        t += "\n[UILOG]";
        for (var e = 0; e < ftc._uiLogs.length; e++) t += "\n" + ftc._uiLogs[e];
        ftc._uiLogs = []
    }
    if (ftc._uploadErrors.length) {
        t += "\n[ERRLOG]";
        for (e = 0; e < ftc._uploadErrors.length; e++) t += "\n" + ftc._uploadErrors[e];
        ftc._uploadErrors = []
    }
    return t
}, ftc._recordUILog = function (t, e) {
    ftc._uiLogs.push(t + "," + e), ftc._uiLogs.length > 20 && ftc._uiLogs.splice(0, 1)
}, ftc._getLog = function () {
    var t = ftc.__logBuffer;
    return ftc.__logBuffer = [], t
}, ftc._addLog = function (t) {
    1 == t.c && ftc.openTest && ftc.openLog && ftr && ftr.getTestPart() && ftr.getTestPart().showNormal(), ftc.__logBuffer.push(t)
}, ftc.sysEnd = function () {
    fts && ftc._tickLocalStorage(1e3), ftc.ManagerH5.end() || (cc.sys.isBrowser ? document.location.reload() : cc.game.end())
}, ftc.sysRestart = function () {
    cc.audioEngine.stopAll(), ftr.showWait("\u6b63\u5728\u91cd\u65b0\u542f\u52a8\u6e38\u620f..."), fts && ftc._tickLocalStorage(1e3), ftc.ManagerH5.isH5() ? (ftc.send("exit"), ftc.scene.update(0), ftc.scene.isLoaded = !1, ftc._forbidReconnect = !0, window.setTimeout(function () {
        for (ftr.cancelWait(), ftc._pomeloDisConnect(); ftc.ManagerRes.topLayout();) ftc.ManagerRes.topLayout().cancel(!0, !0);
        ftc.scene.loading()
    }, 2e3)) : cc.sys.isBrowser ? window.setTimeout(function () {
        ftc.scene = null, document.location.reload()
    }, 2e3) : (ftc._fmodRelease(), window.setTimeout(function () {
        ftc.scene = null, cc.game.restart()
    }, 500))
}, ftc.sysGC = function () {
    ftc.ManagerH5.gc() || cc.sys.garbageCollect()
}, ftc.forbidGame = function () {
    ftc.loadLayout = function () { }, ftc.scene.stopPlayer()
}, ftc.isWindows = function () {
    if (cc.sys.os === cc.sys.OS_WINDOWS || cc.sys.os == cc.sys.OS_OSX) return !0
}, ftc.isIos = function () {
    if (cc.sys.os == cc.sys.OS_IOS && (cc.sys.platform == cc.sys.IPHONE || cc.sys.platform == cc.sys.IPAD)) return !0
}, ftc.isAndroid = function () {
    if (cc.sys.os == cc.sys.OS_ANDROID && cc.sys.platform == cc.sys.ANDROID) return !0
}, ftc.isTv = function () {
    return !(!ftc.isTvSource() || !ftc.ManagerTV.keyDownCount)
}, ftc.isTvSource = function () {
    if (ftc.windowsConfig && 1 == ftc.windowsConfig.tv) return !0;
    var t = ftc.getSourceId();
    return t >= 250 && t <= 300
}, ftc.setFrameRate = function (t) {
    (!t || t < 30) && (t = ftc.ManagerH5.isH5() ? 45 : 60), ftc.gameFrameRate = t, cc.game.setFrameRate(t)
}, ftc.isIphoneX = function () {
    return cc.winSize.width / cc.winSize.height > 2
}, ftc.isNative = function () {
    return ftc.ActiveNative && fts && cc.sys.isNative && (ftc.isAndroid() || ftc.isIos())
}, ftc.pomeloRegist = function (t, e) {
    ftc.log("pomeloRegist start...", 2), ftc.__pomeloConnect(function () {
        ftc.__pomeloEnter(t, e, void 0, 0)
    })
}, ftc.pomeloLogin = function (t, e, i, a, n) {
    ftc.log("pomeloLogin start...", 2), ftc.__pomeloConnect(function () {
        ftc.__pomeloEnter(t, e, i, 1, a, n)
    })
}, ftc._pomeloReconnect = function () {
    ftc._forbidReconnect || (ftc.log("_pomeloReconnect start...", 2), ftc.__serverToken > 0 && 0 == ftc._serverReconnectCount && (ftr.showWait("\u6b63\u5728\u91cd\u8fde..."), ftc._serverReconnectCount = 1, ftc.__pomeloEnter()))
}, ftc.__pomeloConnect = function (t) {
    ftc._serverClose = !1, pomelo.init({
        host: window.mainH5ServerIp,
        port: window.mainH5ServerPort
    }, function () {
        pomelo.request("gate.gatehandler.queryEntry", {}, function (e) {
            pomelo.disconnect(function () {
                ftc.log("__pomeloConnect end..." + e.code, 2), 1 == e.code ? (ftc.__serverEnterIp = e.host, ftc.__serverEnterPort = e.port, t && t()) : ftr.showTip(ftc.__getPomeloError(e.code))
            })
        })
    })
}, ftc.__pomeloEnter = function (t, e, i, a, n, s) {
    ftc._serverClose = !1, void 0 == a && (a = 1), pomelo.init({
        host: ftc.__serverEnterIp,
        port: ftc.__serverEnterPort
    }, function () {
        null != ftc.__serverUid && (t = ftc.__serverUid), pomelo.request("connector.entryhandler.enter", {
            token: ftc.__serverToken,
            uid: t,
            pwd: e,
            type: a,
            third: i,
            source: ftc.getSourceId(),
            device: ftc.getDeviceId(),
            language: ftc.ManagerLan.getLanguage(),
            zone: ftc.getZone(),
            anonymous_openid: s
        }, function (t) {
            ftc.log("__pomeloEnter end..." + t.code, 2), ftc._forbidReconnect = !1, 1 == t.code ? (ftc._serverReconnectCount = 0, ftc.__serverUid = t.uid, ftc.__serverToken = t.token, t.openid && (ftc.serverOpenid = t.openid), ftc._latestSendMsg && (ftc._sendPackMsgs = ftc._latestSendMsg, ftc.warn("\u91cd\u53d1\u6d88\u606f" + JSON.stringify(ftc._sendPackMsgs))), ftc.send("c_enter"), ftr.cancelWait(!0)) : pomelo.disconnect(function () {
                ftc.__serverToken > 0 ? 12 == t.code || ftc._serverReconnectCount >= 3 ? (ftc._endShowSendWait(!1), ftc.ManagerH5.countEvent("2_" + ftc._serverReconnectCount, "\u91cd\u8fde\u5931\u8d25"), ftr.showDialog({
                    text: "\u5df2\u7ecf\u4e0e\u670d\u52a1\u5668\u5931\u53bb\u8054\u7cfb\uff0c\u8bf7\u91cd\u65b0\u5f00\u59cb\u6e38\u620f",
                    clickOk: function () {
                        ftc.sysRestart()
                    }
                }), ftr.cancelWait()) : (ftc.ManagerH5.countEvent("2_" + ftc._serverReconnectCount, "\u91cd\u8fde\u5931\u8d25"), ft.console("ftc.__pomeloEnter" + t.code + "," + t.txt), ftc._serverReconnectCount++, ftc.__pomeloEnter()) : t.txt ? ftc.send("c_enter", void 0, t.txt) : ftc.send("c_enter", void 0, ftc.__getPomeloError(t.code))
            }), n && n()
        })
    })
}, ftc._pomeloDisConnect = function () {
    pomelo.disconnect(function () {
        ft.console("\u65ad\u7ebf\u6210\u529f")
    })
}, ftc.__getPomeloError = function (t) {
    var e = "";
    switch (t) {
        case 0:
            e = "\u670d\u52a1\u5668\u9519\u8bef";
            break;
        case 1:
            e = "\u767b\u9646\u6216\u6ce8\u518c\u5931\u8d25";
            break;
        case 2:
            e = "\u53c2\u6570\u9519\u8bef";
            break;
        case 3:
            e = "\u6ce8\u518c\u5931\u8d25";
            break;
        case 4:
            e = "\u7528\u6237\u5df2\u5b58\u5728";
            break;
        case 5:
            e = "\u767b\u5f55\u5931\u8d25";
            break;
        case 6:
            e = "\u7528\u6237\u4e0d\u5b58\u5728";
            break;
        case 7:
            e = "\u5bc6\u7801\u9519\u8bef";
            break;
        case 8:
            e = "\u9a8c\u8bc1\u5931\u8d25";
            break;
        case 9:
            e = "\u767b\u5f55\u8d85\u65f6";
            break;
        case 12:
            e = "\u91cd\u8fde\u5931\u8d25";
            break;
        case 14:
            e = "\u670d\u52a1\u5668\u7e41\u5fd9";
            break;
        default:
            e = "\u670d\u52a1\u5668\u7ef4\u62a4\u4e2d..." + t
    }
    return e
}, ftc.__startShowSendWait = function () {
    ftc.__linkedToServer && !ftc.__isSendWaitBack && (ftc.__isSendWaitBack = !0, ftc.showTop(!0, 1))
}, ftc._endShowSendWait = function (t) {
    ftc.__linkedToServer && ftc.__isSendWaitBack && (ftc.__isSendWaitBack = !1, ftc.cancelTop(1, .01)), ftc.__linkedToServer = t
}, ftc.__layoutHandleMsg = function (t, e, i, a) {
    if (t.msg && t.msg[e]) return t.msg.check && !t.msg.check(e, i, a) || t.msg[e](i, a), t.msg.final && t.msg.final(), !0
}, ftc.throwMsg = function (t, e, i, a) {
    for (var n = ftc.ManagerRes.allLayouts(), s = 0; s < n.length - 1; s++)
        if (n[s] != a && ftc.__layoutHandleMsg(n[s], t, e, i)) return
}, ftc._checkUnHandlerMsg = function () {
    if (ftc.__unHandlerMsg.length > 0) {
        var t = ftc.__unHandlerMsg;
        ftc.__unHandlerMsg = [];
        for (var e = 0; e < t.length; e++) ftc.__notifyLayoutMsg(t[e])
    }
}, ftc.__notifyLayoutMsg = function (t, e) {
    for (var i = ftc.ManagerRes.allLayouts(), a = i.length - 1; a >= 0; a--) {
        var n = i[a];
        if (!t.name || n.getName() == t.name) {
            if (ftc.__layoutHandleMsg(n, t.k, t.v, t.e)) return;
            if (t.name) return void ftc.warn(t.layoutName + "\u65e0\u6cd5\u5904\u7406msg:" + t.k)
        }
    }
    e ? ftc.warn("\u4e22\u5f03\u6d88\u606f" + t.k) : ftc.__unHandlerMsg.push(t)
}, ftc.sendApi = function (t) {
    ftc.send("code", {
        code: t,
        debug: 1
    })
}, ftc.sendCallback = function (t, e) {
    ftc.send("callback", {
        k: t,
        v: e
    })
}, ftc.sendClient = function (t, e, i, a, n) {
    if (void 0 != t) {
        var s = {
            k: t,
            v: e,
            e: n,
            name: i
        };
        void 0 === a ? ftc._recv([s], !0) : ftc._clientPackMsgs.push([s, a])
    } else this.err("\u53d1\u9001\u6d88\u606f\u5931\u8d25key==undefined")
}, ftc.send = function (t, e, i) {
    var a;
    void 0 != t ? ft._getMsgType(t) === ft._SERVER_MSG ? ftc._forbidSendMsg ? ftc.__delaySendMsgs.push([t, e, i]) : (ftc.__startShowSendWait(), ftc.openLog && ftc.log(ftc._sendMsgIndex + "\u53d1\u9001: " + t + (e ? ", " + JSON.stringify(e) : ""), 6), a = i ? {
        k: t,
        e: i
    } : {
            k: t,
            v: e
        }, 0 == ftc._sendPackMsgs.l && (ftc._sendPackMsgs.i = ftc._sendMsgIndex), ftc._sendPackMsgs[ftc._sendPackMsgs.l++] = a) : ftc.sendClient(t, e, void 0, void 0, i) : this.err("\u53d1\u9001\u6d88\u606f\u5931\u8d25key==undefined")
}, ftc._recv = function (t, e) {
    ftc.closeReceiveMsg = !1;
    for (var i = 0; i < t.length; i++) {
        if (ftc.openLog && "log" != t[i].k && (ft._getMsgType(t[i].k) == ft._SERVER_MSG ? ftc.log(ftc._sendMsgIndex + "\u63a5\u6536: " + JSON.stringify(t[i]), t[i].e ? 8 : 4) : ft.console(ftc._sendMsgIndex + "\u63a5\u6536: " + t[i].k)), ftc.ManagerData.msg[t[i].k]) {
            if (t[i].e && ft.isNumber(t[i].e)) {
                var a = ft.getError(t[i].e);
                a && (t[i].e = a)
            }
            ftc.ManagerData.msg[t[i].k](t[i].v, t[i].e)
        } else {
            if (ftc.openTest && ftc.openLog && ftr && ftr.getTestPart() && ftr.getTestPart().msg[t[i].k]) {
                ftr.getTestPart().msg[t[i].k](t[i].v, t[i].e);
                continue
            }
            ftc.__notifyLayoutMsg(t[i], e)
        }
        if (ftc.closeReceiveMsg) {
            var n = t.length - i - 1;
            n > 0 && ftc.warn("\u4e22\u5f03" + n + "\u6761\u6d88\u606f");
            break
        }
    }
    if (!ftc._forbidSendMsg && ftc.__delaySendMsgs.length > 0) {
        for (i = ftc.__delaySendMsgs.length - 1; i >= 0; i--) ftc.send(ftc.__delaySendMsgs[i][0], ftc.__delaySendMsgs[i][1], ftc.__delaySendMsgs[i][2]);
        ftc.__delaySendMsgs = []
    }
}, ftc.setViewOnEnterCallback = function (t, e) {
    return !ftc.viewOnEnterCallbacks[t] && (ftc.viewOnEnterCallbacks[t] = e, !0)
}, ftc.startMoveAction = function (t, e, i, a, n) {
    t._ftMoveTime = e, t._ftMoveX = i, t._ftMoveY = a, t._ftMoveCallback = n, t._ftMoveSpeedX = (i - t.x) / e, t._ftMoveSpeedY = (a - t.y) / e, t.ftMoveTick || (t.ftMoveTick = function (e) {
        t._ftMoveTime && (t._ftMoveTime > e ? (t._ftMoveTime -= e, t.x += t._ftMoveSpeedX * e, t.y += t._ftMoveSpeedY * e) : (t.x += t._ftMoveSpeedX * t._ftMoveTime, t.y += t._ftMoveSpeedY * t._ftMoveTime, e -= t._ftMoveTime, t._ftMoveTime = 0, t._ftMoveCallback && t._ftMoveCallback(e)))
    })
}, ftc._loadCoreData = function (callback) {
    if (ftc.isWindows()) {
        var func = function func(data) {
            for (var _i = "", _k = "", i = 0; i < 16; i++) _i += 37209123 * (i + 1) % 10, _k += 97324687 * (i + 1) % 10;
            data = fts.Aes.decrypt(data, _i, _k), data && eval(data), callback()
        },
            down = function (t) {
                var e = cc.loader.getXMLHttpRequest();
                e.open("GET", "http://test.ftaro.com:8081/getCoreData?gid=0"), e.timeout = 5e3, e.setRequestHeader("Access-Control-Allow-Origin", "*"), ["abort", "error", "timeout"].forEach(function (t) {
                    e["on" + t] = function () { }
                }), e.onreadystatechange = function () {
                    200 == e.status ? 4 == e.readyState && (t && jsb.fileUtils.writeStringToFile(e.responseText, "ftaro_core.dt"), func(e.responseText)) : cc.log("\u83b7\u53d6\u914d\u7f6e\u6587\u4ef6\uff1aftaro_core.dt\u5931\u8d25")
                }, e.send(null)
            };
        try {
            var data = jsb.fileUtils.getStringFromFile("ftaro_core.dt");
            data ? func(data) : down(!0)
        } catch (t) {
            down()
        }
    } else ft_c_call_core(), callback()
}, ftc.getLocalTime = function () {
    return ftc._localTimeDt ? ft.getSysSecond() + ftc._localTimeDt : ft.getSysSecond()
}, ftc.getOrder = function (t, e) {
    var i = 0;
    if (ftc.openTest && fts) {
        if (99 != ftc.getSourceId()) return void ftr.showTip("\u6d4b\u8bd5\u7248\u672c\u65e0\u6cd5\u8fdb\u884c\u5145\u503c");
        i = 1
    }
    ftc.send("addOrder", {
        goodsId: t,
        sandbox: i,
        openid: ftc.serverOpenid,
        age: ftsdk && _ftsdkcertify.getUserCertifyAge(),
        fcm: ftsdk && _ftsdkcertify.getUserCertifyPayOpen(),
        gift: e
    }), ftc.__orderIndex = t, ftr.showWait("\u83b7\u53d6\u8ba2\u5355\u4e2d...")
}, ftc._startPay = function (t) {
    var e = 0;
    if (t.txt) t.certify ? ftsdk && _ftsdkcertify.openUserCertifyTip(!1, t.txt) : ftr.showTip(t.txt);
    else if (ftsdk && ftsdk.getMyPaySwitch()) e = ftsdk.showMyPay(ftc.__orderIndex, t.order, t.sid, t.url, ftc.ManagerData.passport.account);
    else if (ftc.ManagerH5.isH5()) {
        var i = ft.value["product" + ftc.__orderIndex];
        e = ftc.ManagerH5.startPay({
            index: ftc.__orderIndex,
            orderId: t.order,
            account: ftc.ManagerData.passport.account,
            sid: t.sid,
            source: ftc.getSourceId(),
            version: ft.getVersion(),
            productName: i.gem + i.gemAdd + "\u5143\u5b9d",
            productPrice: i.price
        })
    } else ftc.openTest ? ftc.send("testPayNotify", t.order) : e = ftc.startPay(ftc.__orderIndex, t.order, t.sid, t.url, ftc.ManagerData.passport.account);
    ftr.cancelWait(), 1 == e && ftr.showWait("\u7b49\u5f85\u5145\u503c\u5b8c\u6210...")
}, ftc.addActivityLog = function (t, e, i, a) {
    ftc.send("addLog", {
        type: "addActivityLog",
        params: [t, e, i, a]
    })
}, ftc.addEventLog = function (t, e) {
    ftc.send("addLog", {
        type: "addEventLog",
        params: [ft.getAppId() + "-" + t, e]
    })
};
for (var BASE64_KEYS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", BASE64_VALUES = new Array(123), i = 0; i < 123; ++i) BASE64_VALUES[i] = 64;
for (var i = 0; i < 64; ++i) BASE64_VALUES[BASE64_KEYS.charCodeAt(i)] = i;
var HexChars = "0123456789abcdef".split(""),
    _t = ["", "", "", ""],
    UuidTemplate = _t.concat(_t, "-", _t, "-", _t, "-", _t, "-", _t, _t, _t),
    Indices = UuidTemplate.map(function (t, e) {
        return "-" === t ? NaN : e
    }).filter(isFinite);
ftc.getResUuid = function (t) {
    var e = cc.loader._getResUuid(t);
    if (22 !== e.length) return e;
    UuidTemplate[0] = e[0], UuidTemplate[1] = e[1];
    for (var i = 2, a = 2; i < 22; i += 2) {
        var n = BASE64_VALUES[e.charCodeAt(i)],
            s = BASE64_VALUES[e.charCodeAt(i + 1)];
        UuidTemplate[Indices[a++]] = HexChars[n >> 2], UuidTemplate[Indices[a++]] = HexChars[(3 & n) << 2 | s >> 4], UuidTemplate[Indices[a++]] = HexChars[15 & s]
    }
    return UuidTemplate.join("")
}, ftc.loadNetImage = function (t, e) {
    (new (require("imageloader"))).imageLoadTool(t, e)
}
