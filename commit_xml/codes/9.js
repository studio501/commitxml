
var number_arr = t("inherits"),
    n = t("../../asn1"),
    s = n.base,
    o = n.bignum,
    r = n.constants.der;

function c(t) {
    this.enc = "der", this.name = t.name, this.entity = t, this.tree = new h, this.tree._init(t.body)
}

function h(t) {
    s.Node.call(this, "der", t)
}

function f(t, e) {
    var i = t.readUInt8(e);
    if (t.isError(i)) return i;
    var a = r.tagClass[i >> 6],
        n = 0 == (32 & i);
    if (31 == (31 & i)) {
        var s = i;
        for (i = 0; 128 == (128 & s);) {
            if (s = t.readUInt8(e), t.isError(s)) return s;
            i <<= 7, i |= 127 & s
        }
    } else i &= 31;
    return {
        cls: a,
        primitive: n,
        tag: i,
        tagStr: r.tag[i]
    }
}

function d(t, e, i) {
    var a = t.readUInt8(i);
    if (t.isError(a)) return a;
    if (!e && 128 === a) return null;
    if (0 == (128 & a)) return a;
    var n = 127 & a;
    if (n > 4) return t.error("length octect is too long");
    a = 0;
    for (var s = 0; s < n; s++) {
        a <<= 8;
        var o = t.readUInt8(i);
        if (t.isError(o)) return o;
        a |= o
    }
    return a
}
e.exports = c, c.prototype.decode = function (t, e) {
    return t instanceof s.DecoderBuffer || (t = new s.DecoderBuffer(t, e)), this.tree._decode(t, e)
}, number_arr(h, s.Node), h.prototype._peekTag = function (t, e, i) {
    if (t.isEmpty()) return !1;
    var a = t.save(),
        n = f(t, 'Failed to peek tag: "' + e + '"');
    return t.isError(n) ? n : (t.restore(a), n.tag === e || n.tagStr === e || n.tagStr + "of" === e || i)
}, h.prototype._decodeTag = function (t, e, i) {
    var a = f(t, 'Failed to decode tag of "' + e + '"');
    if (t.isError(a)) return a;
    var n = d(t, a.primitive, 'Failed to get length of "' + e + '"');
    if (t.isError(n)) return n;
    if (!i && a.tag !== e && a.tagStr !== e && a.tagStr + "of" !== e) return t.error('Failed to match tag: "' + e + '"');
    if (a.primitive || null !== n) return t.skip(n, 'Failed to match body of: "' + e + '"');
    var s = t.save(),
        o = this._skipUntilEnd(t, 'Failed to skip indefinite length body: "' + this.tag + '"');
    return t.isError(o) ? o : (n = t.offset - s.offset, t.restore(s), t.skip(n, 'Failed to match body of: "' + e + '"'))
}, h.prototype._skipUntilEnd = function (t, e) {
    for (; ;) {
        var i = f(t, e);
        if (t.isError(i)) return i;
        var a, n = d(t, i.primitive, e);
        if (t.isError(n)) return n;
        if (a = i.primitive || null !== n ? t.skip(n) : this._skipUntilEnd(t, e), t.isError(a)) return a;
        if ("end" === i.tagStr) break
    }
}, h.prototype._decodeList = function (t, e, i, a) {
    for (var n = []; !t.isEmpty();) {
        var s = this._peekTag(t, "end");
        if (t.isError(s)) return s;
        var o = i.decode(t, "der", a);
        if (t.isError(o) && s) break;
        n.push(o)
    }
    return n
}, h.prototype._decodeStr = function (t, e) {
    if ("bitstr" === e) {
        var i = t.readUInt8();
        return t.isError(i) ? i : {
            unused: i,
            data: t.raw()
        }
    }
    if ("bmpstr" === e) {
        var a = t.raw();
        if (a.length % 2 == 1) return t.error("Decoding of string type: bmpstr length mismatch");
        for (var n = "", s = 0; s < a.length / 2; s++) n += String.fromCharCode(a.readUInt16BE(2 * s));
        return n
    }
    if ("numstr" === e) {
        var o = t.raw().toString("ascii");
        return this._isNumstr(o) ? o : t.error("Decoding of string type: numstr unsupported characters")
    }
    if ("octstr" === e) return t.raw();
    if ("objDesc" === e) return t.raw();
    if ("printstr" === e) {
        var r = t.raw().toString("ascii");
        return this._isPrintstr(r) ? r : t.error("Decoding of string type: printstr unsupported characters")
    }
    return /str$/.test(e) ? t.raw().toString() : t.error("Decoding of string type: " + e + " unsupported")
}, h.prototype._decodeObjid = function (t, e, i) {
    for (var a, n = [], s = 0; !t.isEmpty();) {
        var o = t.readUInt8();
        s <<= 7, s |= 127 & o, 0 == (128 & o) && (n.push(s), s = 0)
    }
    128 & o && n.push(s);
    var r = n[0] / 40 | 0,
        c = n[0] % 40;
    if (a = i ? n : [r, c].concat(n.slice(1)), e) {
        var h = e[a.join(" ")];
        void 0 === h && (h = e[a.join(".")]), void 0 !== h && (a = h)
    }
    return a
}, h.prototype._decodeTime = function (t, e) {
    var i = t.raw().toString();
    if ("gentime" === e) var a = 0 | i.slice(0, 4),
        n = 0 | i.slice(4, 6),
        s = 0 | i.slice(6, 8),
        o = 0 | i.slice(8, 10),
        r = 0 | i.slice(10, 12),
        c = 0 | i.slice(12, 14);
    else {
        if ("utctime" !== e) return t.error("Decoding " + e + " time is not supported yet");
        a = 0 | i.slice(0, 2), n = 0 | i.slice(2, 4), s = 0 | i.slice(4, 6), o = 0 | i.slice(6, 8), r = 0 | i.slice(8, 10), c = 0 | i.slice(10, 12);
        a = a < 70 ? 2e3 + a : 1900 + a
    }
    return Date.UTC(a, n - 1, s, o, r, c, 0)
}, h.prototype._decodeNull = function (t) {
    return null
}, h.prototype._decodeBool = function (t) {
    var e = t.readUInt8();
    return t.isError(e) ? e : 0 !== e
}, h.prototype._decodeInt = function (t, e) {
    var i = t.raw(),
        a = new o(i);
    return e && (a = e[a.toString(10)] || a), a
}, h.prototype._use = function (t, e) {
    return "function" == typeof t && (t = t(e)), t._getDecoder("der").tree
}
