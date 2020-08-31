(function (i) {


    function getType(t) {
        "@babel/helpers - typeof";
        return (getType = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        })(t)
    }
    cc._RF.push(e, "2ec59OqiPVKuJvrq1EyGivB", "baseconfig");
    try {
        window.ft = window.ft || {}
    } catch (t) {
        i.ft = i.ft || {}
    }
    ft.getAppId = function () {
        return 1
    }, ft.getVersion = function () {
        return 1e3
    }, ft.getHotupdateVersion = function () {
        return 0
    }, ft.getHotupdateFile = function () {
        return 0
    }, ft.getAppName = function () {
        return ""
    }, ft._SERVER_MSG = 0, ft._CLIENT_MSG = 1, ft._getMsgType = function (t) {
        return t.length > 2 && "_" == t.charAt(1) && "c" == t.charAt(0) ? ft._CLIENT_MSG : ft._SERVER_MSG
    }, ft.DIRUP = 1, ft.DIRDOWN = 2, ft.DIRLEFT = 3, ft.DIRRIGHT = 4, ft.DIRLEFTUP = 11, ft.DIRLEFTDOWN = 12, ft.DIRRIGHTUP = 13, ft.DIRRIGHTDOWN = 14, ft.console = function () {
        if (ftc && (ftc.openLog || ftc.isWindows()) || fts && fts.LOG) {
            for (var t = arguments[0], e = 1; e < arguments.length; e++) t += "," + arguments[e];
            console && console.log("ft.console:" + ft.getSysMilli() + "#" + t)
        }
    }, ft.createLog = function (t, e) {
        return {
            t: ft.getSysMilli().toString().substr(6),
            s: "" + t,
            c: e
        }
    }, ft.getSysMilli = function () {
        return (new Date).getTime()
    }, ft.getSysSecond = function () {
        return Math.floor(new Date / 1e3)
    }, ft.getSysDay = function () {
        return Math.floor(new Date / 864e5)
    }, ft.convert2TimeString = function (t, e) {
        var i = Math.floor(t / 3600);
        t -= 3600 * i;
        var a = Math.floor(t / 60),
            n = t % 60;
        return i < 10 && (i = "0" + i), a < 10 && (a = "0" + a), n < 10 && (n = "0" + n), !e || e >= 3 ? i + ":" + a + ":" + n : 2 == e ? a + ":" + n : void 0
    }, ft.convertSecond2String = function (t) {
        var e = new Date;
        e.setTime(1e3 * t);
        var i = e.getFullYear(),
            a = e.getMonth() + 1;
        a = a < 10 ? "0" + a : a;
        var n = e.getDate();
        n = n < 10 ? "0" + n : n;
        var s = e.getHours();
        s = s < 10 ? "0" + s : s;
        var o = e.getMinutes(),
            r = e.getSeconds();
        return i + "-" + a + "-" + n + " " + s + ":" + (o = o < 10 ? "0" + o : o) + ":" + (r = r < 10 ? "0" + r : r)
    }, ft.__CHARS62 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], ft.__CHARS62Obj = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        a: 10,
        b: 11,
        c: 12,
        d: 13,
        e: 14,
        f: 15,
        g: 16,
        h: 17,
        i: 18,
        j: 19,
        k: 20,
        l: 21,
        m: 22,
        n: 23,
        o: 24,
        p: 25,
        q: 26,
        r: 27,
        s: 28,
        t: 29,
        u: 30,
        v: 31,
        w: 32,
        x: 33,
        y: 34,
        z: 35,
        A: 36,
        B: 37,
        C: 38,
        D: 39,
        E: 40,
        F: 41,
        G: 42,
        H: 43,
        I: 44,
        J: 45,
        K: 46,
        L: 47,
        M: 48,
        N: 49,
        O: 50,
        P: 51,
        Q: 52,
        R: 53,
        S: 54,
        T: 55,
        U: 56,
        V: 57,
        W: 58,
        X: 59,
        Y: 60,
        Z: 61
    }, ft.string10to62 = function (t) {
        var e = Number(t),
            i = [];
        do {
            var a = e % 62;
            e = (e - a) / 62, i.unshift(ft.__CHARS62[a])
        } while (e);
        return i.join("")
    }, ft.string62to10 = function (t) {
        for (var e = (t = String(t)).length, i = 0, a = 0; i < e;) a += Math.pow(62, i++) * ft.__CHARS62Obj[t.charAt(e - i)];
        return a
    }, ft.randString62 = function (t) {
        for (var e = "", i = 0; i < t; i++) e += ft.__CHARS62[ft.rand(62)];
        return e
    }, ft.rand = function (t) {
        if (t > 1) {
            var e = parseInt(Math.random() * t);
            return e == t && e--, e
        }
        return 0
    }, ft.createRandSeed = function (t, e) {
        for (var i = 0, a = 0; a < t.length; a++) i += t.charCodeAt(a) * (a + 1);
        return e || (e = 0), i * (e + 1) % 95471665
    }, ft.nextRandSeed = function (t, e) {
        e || (e = 2147483647);
        var i = (5471663 * t + 49297) % 95471665;
        return [i, parseInt(i / 95471665 * e)]
    }, ft.sumArray = function (t) {
        for (var e = 0, i = 0; i < t.length; i++) e += t[i];
        return e
    }, ft.randHit = function (t, e) {
        for (var i = 0, a = 0; a < t.length; a++)
            if ((i += t[a]) > e) return a;
        return -1
    }, ft.isObject = function (t) {
        return 111 == getType(t).charCodeAt(0)
    }, ft.isNumber = function (t) {
        return 110 == getType(t).charCodeAt(0)
    }, ft.isString = function (t) {
        return 115 == getType(t).charCodeAt(0)
    }, ft.isFunction = function (t) {
        return 102 == getType(t).charCodeAt(0)
    }, ft.formatArray = function (t) {
        if (t && ft.isObject(t)) return ft.isObject(t[0]) ? t[0] : t
    }, ft.bindMsg = function (t) {
        if (t.msg)
            for (var e in t.msg) t.msg[e] = t.msg[e].bind(t)
    }, ft.split = function (t, e) {
        if (void 0 == t || 0 == t.length) return [];
        var i = t.split(e);
        return void 0 !== i[i.length - 1] && "" !== i[i.length - 1] || i.splice(i.length - 1, 1), i
    }, ft.replaceAll = function (t, e, i) {
        return t.indexOf(e) >= 0 ? t.split(e).join(i) : t
    }, ft.format = function (t) {
        return ft.replaceAll(t, "|", "\n")
    }, ft.getFormData = function (t, e, i, a) {
        return !a && ftc && fts ? fts.getFormData(t, e, i) : (t.data[e] && (n = void 0 === t.data[e][t.keys[i]] ? t.default[i] : t.data[e][t.keys[i]]), n);
        var n
    }, ft._loadAllFormJson = function (t, e) {
        if (ft._isLoaded) e && e();
        else {
            if (ft._isLoaded = !0, window.ftd) throw "\u8bf7\u5148\u5220\u9664shared/game/data\u76ee\u5f55\u6570\u636e";
            if (t) {
                window.ftd = {};
                var i = JSON.parse(t);
                for (var a in i) ftd[a] = i[a];
                ft.__loadAllFormData(e)
            } else e && e()
        }
    }, ft._loadAllFormData = function (t) {
        try {
            ftd
        } catch (e) {
            if (t) return void t()
        }
        if (ft._isLoaded) {
            if (t) return void t()
        } else ft._isLoaded = !0, ftc.windowsConfig && 1 != ftc.windowsConfig.net ? ft.__loadAllFormData(t) : ft.__tryGetDataFromNet(function () {
            ft.__loadAllFormData(t)
        })
    }, ft.__loadAllFormData = function (t) {
        var e = [];
        for (var i in ftd) e.push(i);
        var a = setInterval(function () {
            var i = !1;
            try {
                e.length > 0 ? (ft.__loadFormData(e[0]), e.splice(0, 1)) : i = !0
            } catch (t) {
                ftc && ft.console("ft.__loadAllFormData:" + e[0] + "," + t.stack), i = !0
            }
            if (i) return clearInterval(a), void t()
        }, 0)
    }, ft.__loadFormData = function (t) {
        var e = ftd[t];
        if (ft.isString(e) && (e = JSON.parse(e)), ftc) {
            var i = ftc.ManagerLan.getLanguage();
            if ("zh" != i) {
                i = "_" + i;
                var a = {};
                for (var n in e.keys) a[e.keys[n]] = n;
                for (var n in e.data)
                    for (var s in e.data[n]) {
                        var o = a[s],
                            r = o.length - 3;
                        r > 0 && o.lastIndexOf(i) == r && (e.data[n][e.keys[o.substr(0, r)]] = e.data[n][s], e.data[n][s] = null)
                    }
            }
        }
        ftc && fts && fts._loadFormData(e), e.get = function (t, i, a) {
            return ft.getFormData(e, t, i, a)
        }, ftd[t] = e
    }, ft.basehttp = {}, ft.basehttp.GetTableData = "getTableData", ft.basehttp.Authenticate = "Authenticate", ft.basehttp.CheckIpAbroad = "CheckIpAbroad", ft.basehttp.AddDebug = "AddDebug", ft.basehttp.Regist = "Regist", ft.basehttp.Login = "LoginV2", ft.basehttp.ModifyAccount = "ModifyAccount", ft.basehttp.AddOrder = "AddOrder2", ft.basehttp.LoginByOpenid = "LoginByOpenidV2", ft.basehttp.BindByOpenid = "BindOpenId", ft.basehttp.BindByAttach = "BindAttach", ft.basehttp.GetUids = "GetUids", ft.basehttp.H5GetReferrerCount = "h5GetReferrerCount", ft.basehttp.AddLogs = "AddLogs", ft.basehttp.LoginByCitation = "LoginByCitation", ft.basehttp.CreateCitation = "CreateCitation", ft.basehttp.BindPhoneOrMail = "BindPhoneOrMail", ft.basehttp.GetVerCode = "GetVerCode", ft.basehttp.LoginByPhoneOrEmail = "LoginByPhoneOrEmail", ft.basehttp.ChangePwd = "ChangePwd", ft.basehttp.CheckVerCode = "CheckVerCode", ft.basehttp.LoginByAttach = "LoginByAttach", ft.__tryGetDataFromNet = function (t) {
        ftc && fts && fts.TEST && ftc.isWindows() ? ftc.player.http.testGetTableData(t) : t()
    }, ft.ungzip = function (e) {
        return t("gzip").inflate(e, {
            to: "string"
        })
    }, ft.gzip = function (e) {
        return t("gzip").deflate(e, {
            to: "string",
            gzip: !0
        })
    }, ft.md5 = function (e) {
        if (!ftc) return t("crypto").createHash("md5").update(e).digest("hex").toLowerCase();
        try {
            return ft_c_md5_encode(e)
        } catch (t) {
            return ft.MD5.hex_md5(e)
        }
    }, ft.base64Encode = function (t, e) {
        if (!ftc) return ft.Base64.encode(t, e);
        try {
            return ft_c_base64_encode(t, e)
        } catch (i) {
            return ft.Base64.encode(t, e)
        }
    }, ft.base64Decode = function (t, e) {
        if (!ftc) return ft.Base64.decode(t, e);
        try {
            return ft_c_base64_decode(t, e)
        } catch (i) {
            return ft.Base64.decode(t, e)
        }
    }, ft.httpConnect || (ft.httpConnect = function (t, url, i, a, n) {
        ft.console("sendUrl:" + url), i && "{" == i[0] && ft.console("data:" + i);
        var s = cc.loader.getXMLHttpRequest();
        s.open(t, url), s.timeout = 15e3, n && (s.responseType = "arraybuffer"), s.setRequestHeader("Access-Control-Allow-Origin", "*"), ["abort", "error", "timeout"].forEach(function (t) {
            s["on" + t] = function () {
                ft.console("recvData:" + t), a(!1, t, s.status, s.readyState)
            }.bind(this)
        }.bind(this)), s.onreadystatechange = function () {
            if (200 == s.status) 4 == s.readyState && (n ? a(!0, s.response) : ("{" == s.responseText[0] && ft.console("recvData:" + s.responseText), a(!0, s.responseText)));
            else {
                var t = s.responseText;
                t || (t = "unknown"), ft.console("recvData:" + t), a(!1, t, s.status, s.readyState)
            }
        }.bind(this), s.send(i)
    })
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
