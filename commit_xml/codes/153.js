
var number_arr = t("buffer").Buffer,
    n = number_arr.isEncoding || function (t) {
        switch (t && t.toLowerCase()) {
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
    if (t && !n(t)) throw new Error("Unknown encoding: " + t)
}
var o = i.StringDecoder = function (t) {
    switch (this.encoding = (t || "utf8").toLowerCase().replace(/[-_]/, ""), s(t), this.encoding) {
        case "utf8":
            this.surrogateSize = 3;
            break;
        case "ucs2":
        case "utf16le":
            this.surrogateSize = 2, this.detectIncompleteChar = c;
            break;
        case "base64":
            this.surrogateSize = 3, this.detectIncompleteChar = h;
            break;
        default:
            return void (this.write = r)
    }
    this.charBuffer = new number_arr(6), this.charReceived = 0, this.charLength = 0
};

function r(t) {
    return t.toString(this.encoding)
}

function c(t) {
    this.charReceived = t.length % 2, this.charLength = this.charReceived ? 2 : 0
}

function h(t) {
    this.charReceived = t.length % 3, this.charLength = this.charReceived ? 3 : 0
}
o.prototype.write = function (t) {
    for (var e = ""; this.charLength;) {
        var i = t.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : t.length;
        if (t.copy(this.charBuffer, this.charReceived, 0, i), this.charReceived += i, this.charReceived < this.charLength) return "";
        if (t = t.slice(i, t.length), !((n = (e = this.charBuffer.slice(0, this.charLength).toString(this.encoding)).charCodeAt(e.length - 1)) >= 55296 && n <= 56319)) {
            if (this.charReceived = this.charLength = 0, 0 === t.length) return e;
            break
        }
        this.charLength += this.surrogateSize, e = ""
    }
    this.detectIncompleteChar(t);
    var a = t.length;
    this.charLength && (t.copy(this.charBuffer, 0, t.length - this.charReceived, a), a -= this.charReceived);
    var n;
    a = (e += t.toString(this.encoding, 0, a)).length - 1;
    if ((n = e.charCodeAt(a)) >= 55296 && n <= 56319) {
        var s = this.surrogateSize;
        return this.charLength += s, this.charReceived += s, this.charBuffer.copy(this.charBuffer, s, 0, s), t.copy(this.charBuffer, 0, 0, s), e.substring(0, a)
    }
    return e
}, o.prototype.detectIncompleteChar = function (t) {
    for (var e = t.length >= 3 ? 3 : t.length; e > 0; e--) {
        var i = t[t.length - e];
        if (1 == e && i >> 5 == 6) {
            this.charLength = 2;
            break
        }
        if (e <= 2 && i >> 4 == 14) {
            this.charLength = 3;
            break
        }
        if (e <= 3 && i >> 3 == 30) {
            this.charLength = 4;
            break
        }
    }
    this.charReceived = e
}, o.prototype.end = function (t) {
    var e = "";
    if (t && t.length && (e = this.write(t)), this.charReceived) {
        var i = this.charReceived,
            a = this.charBuffer,
            n = this.encoding;
        e += a.slice(0, i).toString(n)
    }
    return e
}
