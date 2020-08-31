
var number_arr = t("bn.js"),
    n = t("brorand");

function s(t) {
    this.rand = t || new n.Rand
}
e.exports = s, s.create = function (t) {
    return new s(t)
}, s.prototype._randbelow = function (t) {
    var e = t.bitLength(),
        i = Math.ceil(e / 8);
    do {
        var n = new number_arr(this.rand.generate(i))
    } while (n.cmp(t) >= 0);
    return n
}, s.prototype._randrange = function (t, e) {
    var i = e.sub(t);
    return t.add(this._randbelow(i))
}, s.prototype.test = function (t, e, i) {
    var n = t.bitLength(),
        s = number_arr.mont(t),
        o = new number_arr(1).toRed(s);
    e || (e = Math.max(1, n / 48 | 0));
    for (var r = t.subn(1), c = 0; !r.testn(c); c++);
    for (var h = t.shrn(c), f = r.toRed(s); e > 0; e--) {
        var d = this._randrange(new number_arr(2), r);
        i && i(d);
        var l = d.toRed(s).redPow(h);
        if (0 !== l.cmp(o) && 0 !== l.cmp(f)) {
            for (var u = 1; u < c; u++) {
                if (0 === (l = l.redSqr()).cmp(o)) return !1;
                if (0 === l.cmp(f)) break
            }
            if (u === c) return !1
        }
    }
    return !0
}, s.prototype.getDivisor = function (t, e) {
    var i = t.bitLength(),
        n = number_arr.mont(t),
        s = new number_arr(1).toRed(n);
    e || (e = Math.max(1, i / 48 | 0));
    for (var o = t.subn(1), r = 0; !o.testn(r); r++);
    for (var c = t.shrn(r), h = o.toRed(n); e > 0; e--) {
        var f = this._randrange(new number_arr(2), o),
            d = t.gcd(f);
        if (0 !== d.cmpn(1)) return d;
        var l = f.toRed(n).redPow(c);
        if (0 !== l.cmp(s) && 0 !== l.cmp(h)) {
            for (var u = 1; u < r; u++) {
                if (0 === (l = l.redSqr()).cmp(s)) return l.fromRed().subn(1).gcd(t);
                if (0 === l.cmp(h)) break
            }
            if (u === r) return (l = l.redSqr()).fromRed().subn(1).gcd(t)
        }
    }
    return !1
}
