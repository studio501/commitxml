

var number_arr = t("bn.js"),
    n = t("../utils"),
    s = n.assert;

function o(t, e) {
    if (t instanceof o) return t;
    this._importDER(t, e) || (s(t.r && t.s, "Signature without r or s"), this.r = new number_arr(t.r, 16), this.s = new number_arr(t.s, 16), void 0 === t.recoveryParam ? this.recoveryParam = null : this.recoveryParam = t.recoveryParam)
}

function r() {
    this.place = 0
}

function c(t, e) {
    var i = t[e.place++];
    if (!(128 & i)) return i;
    for (var a = 15 & i, n = 0, s = 0, o = e.place; s < a; s++, o++) n <<= 8, n |= t[o];
    return e.place = o, n
}

function h(t) {
    for (var e = 0, i = t.length - 1; !t[e] && !(128 & t[e + 1]) && e < i;) e++;
    return 0 === e ? t : t.slice(e)
}

function f(t, e) {
    if (e < 128) t.push(e);
    else {
        var i = 1 + (Math.log(e) / Math.LN2 >>> 3);
        for (t.push(128 | i); --i;) t.push(e >>> (i << 3) & 255);
        t.push(e)
    }
}
e.exports = o, o.prototype._importDER = function (t, e) {
    t = n.toArray(t, e);
    var i = new r;
    if (48 !== t[i.place++]) return !1;
    if (c(t, i) + i.place !== t.length) return !1;
    if (2 !== t[i.place++]) return !1;
    var s = c(t, i),
        o = t.slice(i.place, s + i.place);
    if (i.place += s, 2 !== t[i.place++]) return !1;
    var h = c(t, i);
    if (t.length !== h + i.place) return !1;
    var f = t.slice(i.place, h + i.place);
    return 0 === o[0] && 128 & o[1] && (o = o.slice(1)), 0 === f[0] && 128 & f[1] && (f = f.slice(1)), this.r = new number_arr(o), this.s = new number_arr(f), this.recoveryParam = null, !0
}, o.prototype.toDER = function (t) {
    var e = this.r.toArray(),
        i = this.s.toArray();
    for (128 & e[0] && (e = [0].concat(e)), 128 & i[0] && (i = [0].concat(i)), e = h(e), i = h(i); !(i[0] || 128 & i[1]);) i = i.slice(1);
    var a = [2];
    f(a, e.length), (a = a.concat(e)).push(2), f(a, i.length);
    var s = a.concat(i),
        o = [48];
    return f(o, s.length), o = o.concat(s), n.encode(o, t)
}
