window.ftr = window.ftr || {}, ftr.init = function (t) {
    ftc.ManagerRes.newPart("PartSysTop", "PartSysTop", ftc.scene, function (e) {
        ftr._partTop = e, ftc.scene.node.addChild(e.node, 260), t()
    }, "_ftaro")
}, ftr.initTestPart = function () {
    1 !== ftr._partTest && (ftr._partTest ? ftr._partTest.setData() : (ftr._partTest = 1, ftc.ManagerRes.newPart("PartSysTest", "PartSysTest", ftc.scene, function (t) {
        ftr._partTest = t, ftr._partTest.setData(), ftc.scene.node.addChild(t.node, 1024)
    }, "_ftaro")))
}, ftr.getTestPart = function () {
    return 1 !== ftr._partTest ? ftr._partTest : void 0
}, ftr.showTip = function (t, e, i) {
    (t || 0 === t) && (void 0 === i && (i = 1), void 0 !== (t = ftc.language(t, e)) && null !== t && ftc.ManagerRes.newPart("PartSysTip", "PartSysTip", ftc.scene, function (e) {
        e.show({
            str: t,
            duration: i
        })
    }, "_ftaro"))
}, ftr.showDialog = function (t) {
    ftr.loadLayout("LayoutSysDialog", function (e) {
        e.setData(t)
    }, {
        field: "_ftaro"
    })
}, ftr.cancelDialog = function () {
    var t = ftc.ManagerRes.findLayout("LayoutSysDialog");
    t && t.cancel()
}, ftr.showWait = function (t, e, i, a) {
    ftc.ManagerTV.setDisable(), 1 !== ftr._partWait && 2 !== ftr._partWait && (ftr._partWait ? ftr._partWait.setData(t, e, i, a) : (ftr._partWait = 1, ftc.ManagerRes.newPart("PartSysWait", "PartSysWait", ftc.scene, function (n) {
        ftc.scene && (2 == ftr._partWait ? n.cancelWait() : n.setData(t, e, i, a), ftr._partWait = n, ftc.scene.node.addChild(n.node, 257))
    }, "_ftaro")))
}, ftr.cancelWait = function (t) {
    ftc.ManagerTV.setEnable(), 1 !== ftr._partWait ? ftr._partWait && ftr._partWait.cancelWait(t) : ftr._partWait = 2
}, ftr.showRollTitle = function (t, e) {
    1 !== ftr._partRollTitle && (ftr._partRollTitle ? ftr._partRollTitle.setData(t, e) : (ftr._partRollTitle = 1, ftc.ManagerRes.newPart("PartSysRollTitle", "PartSysRollTitle", ftc.scene, function (i) {
        i.setData(t, e), ftr._partRollTitle = i, ftc.scene.node.addChild(i.node, 256)
    }, "_ftaro")))
}, ftr.showTop = function (t, e) {
    ftr._partTop.show(t, e)
}, ftr.cancelTop = function (t, e) {
    ftr._partTop.hide(t, e)
}, ftr.isShowTop = function () {
    return ftr._partTop.node.active
}, ftr.showPayCountdown = function () {
    ftr.loadLayout("LayoutSysCountDown", function (t) {
        t.setData()
    }, {
        field: "_ftaro"
    })
}, ftr.cancelPayCountdown = function () {
    var t = ftc.ManagerRes.findLayout("LayoutSysCountDown");
    t && t.cancel()
}, ftr.setTvTip = function (t, e, i) {
    if (ftc.isTv() && ftc.ManagerTV.isActive) {
        if (1 === ftr._partTvTip) return;
        ftc.ManagerTV.openOkReplaceMenu && e && (e = ft.replaceAll(e, "\u3010\u83dc\u5355\u952e\u3011", "\u3010\u83dc\u5355\u952e/\u957f\u6309\u786e\u8ba4\u952e\u3011")), ftr._partTvTip ? ftr._partTvTip.setData(t, e, i) : (ftr._partTvTip = 1, ftc.ManagerRes.newPart("PartSysTvTip", "PartSysTvTip", ftc.scene, function (a) {
            ftr._partTvTip = a, ftc.scene.node.addChild(a.node, 255), ftr._partTvTip.setData(t, e, i)
        }, "_ftaro"))
    }
}, ftr.Account = {
    Type: {
        LOGIN: 0,
        REGIST: 1,
        BIND: 2,
        RETRIEVE: 3,
        BINDLOGIN: 4,
        SETACCOUNT: 5,
        SETACCOUNTPWD: 6,
        SETPWD: 7,
        SETACCOUNT2: 8,
        SWITCH: 9
    },
    MODE: {
        SELF: 0,
        EMAIL: 1,
        PHONE: 2,
        SDK: 3,
        WX: 11,
        QQ: 12,
        FACEBOOK: 13,
        GOOGLE: 14,
        APPLE: 15,
        WEBO: 16
    }
}, ftr.showAccount = function (t, e, i, a) {
    e == ftr.Account.MODE.SELF ? t == ftr.Account.Type.LOGIN || t == ftr.Account.Type.REGIST || t == ftr.Account.Type.SWITCH ? ftr.loadLayout("LayoutSysInputAccount", function (e) {
        e.setData(t, i)
    }, {
        field: "_ftaro"
    }) : ftr.loadLayout("LayoutSysModifyPwd", function (e) {
        e.setData(t, i, a)
    }, {
        field: "_ftaro"
    }) : ftr.loadLayout("LayoutSysPhoneEmail", function (i) {
        i.setData(t, e)
    }, {
        field: "_ftaro"
    })
}, ftr.showHelp = function (t) {
    ftr.loadLayout("LayoutSysHelp", function (e) {
        e.setData(t)
    }, {
        field: "_ftaro"
    })
}, ftr.showUserCenter = function () {
    ftc.localDay > 0 ? ftr.loadLayout("LayoutSysUser", function (t) {
        t.setData()
    }, {
        field: "_ftaro"
    }) : ftr.showTip("\u65e0\u6cd5\u8fdb\u5165\u7528\u6237\u4e2d\u5fc3\uff0c\u8bf7\u786e\u4fdd\u7f51\u7edc\u8fde\u901a")
}, ftr.loadLayout = function (t, e, i) {
    ftr.showTop(), ftc.ManagerRes.newLayout(t, function (t) {
        ftr.cancelTop(), e && e(t)
    }, i)
}, ftr.loadPart = function (t, e, i) {
    ftr.showTop(), ftc.ManagerRes.newPart(t, t, i, function (t) {
        ftr.cancelTop(), e && e(t)
    })
}, ftr.setItem = function (t, e) {
    cc.sys.localStorage.setItem(ft.getAppId() + "ftr_" + t, e)
}, ftr.getItem = function (t) {
    return cc.sys.localStorage.getItem(ft.getAppId() + "ftr_" + t)
}, ftr.tick = function (t) { }, ftr.checkPwd = function (t) {
    if (t.length < 6) ftr.showTip("\u5bc6\u7801\u4e0d\u5f97\u5c0f\u4e8e6\u4f4d");
    else {
        if (!(t.length > 18)) return !0;
        ftr.showTip("\u5bc6\u7801\u4e0d\u5f97\u5927\u4e8e18\u4f4d")
    }
    return !1
}, ftr.checkAccount = function (t) {
    if (t)
        if (t.length < 3) ftr.showTip("\u8d26\u53f7\u4e0d\u5f97\u5c0f\u4e8e3\u4f4d");
        else if (t.length > 18) ftr.showTip("\u8d26\u53f7\u4e0d\u5f97\u5927\u4e8e18\u4f4d");
        else {
            if (/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(t)) return !0;
            ftr.showTip("\u8d26\u53f7\u4e0d\u80fd\u5305\u542b\u7279\u6b8a\u5b57\u7b26")
        } else ftr.showTip("\u8d26\u53f7\u4e0d\u5f97\u4e3a\u7a7a");
    return !1
}, ftr.showLoginWait = function (t) {
    t && ftr.showWait("\u767b\u5f55\u6210\u529f\uff0c\u6b63\u5728\u4e0b\u8f7d\u6570\u636e\uff0c\u8bf7\u7a0d\u7b49...")
}
