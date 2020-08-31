
var number_arr = t("inherits"),
    n = t("buffer").Buffer,
    s = t("../../asn1"),
    o = s.base,
    r = s.constants.der;

function c(t) {
    this.enc = "der", this.name = t.name, this.entity = t, this.tree = new h, this.tree._init(t.body)
}

function h(t) {
    o.Node.call(this, "der", t)
}

function f(t) {
    return t < 10 ? "0" + t : t
}

function d(t, e, i, a) {
    var n;
    if ("seqof" === t ? t = "seq" : "setof" === t && (t = "set"), r.tagByName.hasOwnProperty(t)) n = r.tagByName[t];
    else {
        if ("number" != typeof t || (0 | t) !== t) return a.error("Unknown tag: " + t);
        n = t
    }
    return n >= 31 ? a.error("Multi-octet tag encoding unsupported") : (e || (n |= 32), n |= r.tagClassByName[i || "universal"] << 6)
}
e.exports = c, c.prototype.encode = function (t, e) {
    return this.tree._encode(t, e).join()
}, number_arr(h, o.Node), h.prototype._encodeComposite = function (t, e, i, a) {
    var s, o = d(t, e, i, this.reporter);
    if (a.length < 128) return (s = new n(2))[0] = o, s[1] = a.length, this._createEncoderBuffer([s, a]);
    for (var r = 1, c = a.length; c >= 256; c >>= 8) r++;
    (s = new n(2 + r))[0] = o, s[1] = 128 | r;
    c = 1 + r;
    for (var h = a.length; h > 0; c--, h >>= 8) s[c] = 255 & h;
    return this._createEncoderBuffer([s, a])
}, h.prototype._encodeStr = function (t, e) {
    if ("bitstr" === e) return this._createEncoderBuffer([0 | t.unused, t.data]);
    if ("bmpstr" === e) {
        for (var i = new n(2 * t.length), a = 0; a < t.length; a++) i.writeUInt16BE(t.charCodeAt(a), 2 * a);
        return this._createEncoderBuffer(i)
    }
    return "numstr" === e ? this._isNumstr(t) ? this._createEncoderBuffer(t) : this.reporter.error("Encoding of string type: numstr supports only digits and space") : "printstr" === e ? this._isPrintstr(t) ? this._createEncoderBuffer(t) : this.reporter.error("Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark") : /str$/.test(e) ? this._createEncoderBuffer(t) : "objDesc" === e ? this._createEncoderBuffer(t) : this.reporter.error("Encoding of string type: " + e + " unsupported")
}, h.prototype._encodeObjid = function (t, e, i) {
    if ("string" == typeof t) {
        if (!e) return this.reporter.error("string objid given, but no values map found");
        if (!e.hasOwnProperty(t)) return this.reporter.error("objid not found in values map");
        t = e[t].split(/[\s\.]+/g);
        for (var a = 0; a < t.length; a++) t[a] |= 0
    } else if (Array.isArray(t)) {
        t = t.slice();
        for (a = 0; a < t.length; a++) t[a] |= 0
    }
    if (!Array.isArray(t)) return this.reporter.error("objid() should be either array or string, got: " + JSON.stringify(t));
    if (!i) {
        if (t[1] >= 40) return this.reporter.error("Second objid identifier OOB");
        t.splice(0, 2, 40 * t[0] + t[1])
    }
    var s = 0;
    for (a = 0; a < t.length; a++) {
        var o = t[a];
        for (s++; o >= 128; o >>= 7) s++
    }
    var r = new n(s),
        c = r.length - 1;
    for (a = t.length - 1; a >= 0; a--) {
        o = t[a];
        for (r[c--] = 127 & o;
            (o >>= 7) > 0;) r[c--] = 128 | 127 & o
    }
    return this._createEncoderBuffer(r)
}, h.prototype._encodeTime = function (t, e) {
    var i, a = new Date(t);
    return "gentime" === e ? i = [f(a.getFullYear()), f(a.getUTCMonth() + 1), f(a.getUTCDate()), f(a.getUTCHours()), f(a.getUTCMinutes()), f(a.getUTCSeconds()), "Z"].join("") : "utctime" === e ? i = [f(a.getFullYear() % 100), f(a.getUTCMonth() + 1), f(a.getUTCDate()), f(a.getUTCHours()), f(a.getUTCMinutes()), f(a.getUTCSeconds()), "Z"].join("") : this.reporter.error("Encoding " + e + " time is not supported yet"), this._encodeStr(i, "octstr")
}, h.prototype._encodeNull = function () {
    return this._createEncoderBuffer("")
}, h.prototype._encodeInt = function (t, e) {
    if ("string" == typeof t) {
        if (!e) return this.reporter.error("String int or enum given, but no values map");
        if (!e.hasOwnProperty(t)) return this.reporter.error("Values map doesn't contain: " + JSON.stringify(t));
        t = e[t]
    }
    if ("number" != typeof t && !n.isBuffer(t)) {
        var i = t.toArray();
        !t.sign && 128 & i[0] && i.unshift(0), t = new n(i)
    }
    if (n.isBuffer(t)) {
        var a = t.length;
        0 === t.length && a++;
        var s = new n(a);
        return t.copy(s), 0 === t.length && (s[0] = 0), this._createEncoderBuffer(s)
    }
    if (t < 128) return this._createEncoderBuffer(t);
    if (t < 256) return this._createEncoderBuffer([0, t]);
    a = 1;
    for (var o = t; o >= 256; o >>= 8) a++;
    for (o = (s = new Array(a)).length - 1; o >= 0; o--) s[o] = 255 & t, t >>= 8;
    return 128 & s[0] && s.unshift(0), this._createEncoderBuffer(new n(s))
}, h.prototype._encodeBool = function (t) {
    return this._createEncoderBuffer(t ? 255 : 0)
}, h.prototype._use = function (t, e) {
    return "function" == typeof t && (t = t(e)), t._getEncoder("der").tree
}, h.prototype._skipDefault = function (t, e, i) {
    var a, n = this._baseState;
    if (null === n.default) return !1;
    var s = t.join();
    if (void 0 === n.defaultBuffer && (n.defaultBuffer = this._encodeValue(n.default, e, i).join()), s.length !== n.defaultBuffer.length) return !1;
    for (a = 0; a < s.length; a++)
        if (s[a] !== n.defaultBuffer[a]) return !1;
    return !0
}
