

var number_arr = t("safe-buffer").Buffer,
    n = number_arr.isEncoding || function (t) {
        switch ((t = "" + t) && t.toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
            case "raw":
                return !0;
            default:
                return !1
        }
    };

function s(t) {
    if (!t) return "utf8";
    for (var e; ;) switch (t) {
        case "utf8":
        case "utf-8":
            return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return "utf16le";
        case "latin1":
        case "binary":
            return "latin1";
        case "base64":
        case "ascii":
        case "hex":
            return t;
        default:
            if (e) return;
            t = ("" + t).toLowerCase(), e = !0
    }
}

function o(t) {
    var e = s(t);
    if ("string" != typeof e && (number_arr.isEncoding === n || !n(t))) throw new Error("Unknown encoding: " + t);
    return e || t
}

function r(t) {
    var e;
    switch (this.encoding = o(t), this.encoding) {
        case "utf16le":
            this.text = l, this.end = u, e = 4;
            break;
        case "utf8":
            this.fillLast = d, e = 4;
            break;
        case "base64":
            this.text = p, this.end = g, e = 3;
            break;
        default:
            return this.write = m, void (this.end = b)
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = number_arr.allocUnsafe(e)
}

function c(t) {
    return t <= 127 ? 0 : t >> 5 == 6 ? 2 : t >> 4 == 14 ? 3 : t >> 3 == 30 ? 4 : t >> 6 == 2 ? -1 : -2
}

function h(t, e, i) {
    var a = e.length - 1;
    if (a < i) return 0;
    var n = c(e[a]);
    return n >= 0 ? (n > 0 && (t.lastNeed = n - 1), n) : --a < i || -2 === n ? 0 : (n = c(e[a])) >= 0 ? (n > 0 && (t.lastNeed = n - 2), n) : --a < i || -2 === n ? 0 : (n = c(e[a])) >= 0 ? (n > 0 && (2 === n ? n = 0 : t.lastNeed = n - 3), n) : 0
}

function f(t, e, i) {
    if (128 != (192 & e[0])) return t.lastNeed = 0, "\ufffd";
    if (t.lastNeed > 1 && e.length > 1) {
        if (128 != (192 & e[1])) return t.lastNeed = 1, "\ufffd";
        if (t.lastNeed > 2 && e.length > 2 && 128 != (192 & e[2])) return t.lastNeed = 2, "\ufffd"
    }
}

function d(t) {
    var e = this.lastTotal - this.lastNeed,
        i = f(this, t);
    return void 0 !== i ? i : this.lastNeed <= t.length ? (t.copy(this.lastChar, e, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (t.copy(this.lastChar, e, 0, t.length), void (this.lastNeed -= t.length))
}

function l(t, e) {
    if ((t.length - e) % 2 == 0) {
        var i = t.toString("utf16le", e);
        if (i) {
            var a = i.charCodeAt(i.length - 1);
            if (a >= 55296 && a <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1], i.slice(0, -1)
        }
        return i
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = t[t.length - 1], t.toString("utf16le", e, t.length - 1)
}

function u(t) {
    var e = t && t.length ? this.write(t) : "";
    if (this.lastNeed) {
        var i = this.lastTotal - this.lastNeed;
        return e + this.lastChar.toString("utf16le", 0, i)
    }
    return e
}

function p(t, e) {
    var i = (t.length - e) % 3;
    return 0 === i ? t.toString("base64", e) : (this.lastNeed = 3 - i, this.lastTotal = 3, 1 === i ? this.lastChar[0] = t[t.length - 1] : (this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1]), t.toString("base64", e, t.length - i))
}

function g(t) {
    var e = t && t.length ? this.write(t) : "";
    return this.lastNeed ? e + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : e
}

function m(t) {
    return t.toString(this.encoding)
}

function b(t) {
    return t && t.length ? this.write(t) : ""
}
i.StringDecoder = r, r.prototype.write = function (t) {
    if (0 === t.length) return "";
    var e, i;
    if (this.lastNeed) {
        if (void 0 === (e = this.fillLast(t))) return "";
        i = this.lastNeed, this.lastNeed = 0
    } else i = 0;
    return i < t.length ? e ? e + this.text(t, i) : this.text(t, i) : e || ""
}, r.prototype.end = function (t) {
    var e = t && t.length ? this.write(t) : "";
    return this.lastNeed ? e + "\ufffd" : e
}, r.prototype.text = function (t, e) {
    var i = h(this, t, e);
    if (!this.lastNeed) return t.toString("utf8", e);
    this.lastTotal = i;
    var a = t.length - (i - this.lastNeed);
    return t.copy(this.lastChar, 0, a), t.toString("utf8", e, a)
}, r.prototype.fillLast = function (t) {
    if (this.lastNeed <= t.length) return t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length), this.lastNeed -= t.length
}
