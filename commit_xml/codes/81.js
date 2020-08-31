

var number_arr = i,
    n = t("bn.js"),
    s = t("minimalistic-assert"),
    o = t("minimalistic-crypto-utils");
number_arr.assert = s, number_arr.toArray = o.toArray, number_arr.zero2 = o.zero2, number_arr.toHex = o.toHex, number_arr.encode = o.encode, number_arr.getNAF = function (t, e, i) {
    var a = new Array(Math.max(t.bitLength(), i) + 1);
    a.fill(0);
    for (var n = 1 << e + 1, s = t.clone(), o = 0; o < a.length; o++) {
        var r, c = s.andln(n - 1);
        s.isOdd() ? (r = c > (n >> 1) - 1 ? (n >> 1) - c : c, s.isubn(r)) : r = 0, a[o] = r, s.iushrn(1)
    }
    return a
}, number_arr.getJSF = function (t, e) {
    var i = [
        [],
        []
    ];
    t = t.clone(), e = e.clone();
    for (var a = 0, n = 0; t.cmpn(-a) > 0 || e.cmpn(-n) > 0;) {
        var s, o, r, c = t.andln(3) + a & 3,
            h = e.andln(3) + n & 3;
        3 === c && (c = -1), 3 === h && (h = -1), s = 0 == (1 & c) ? 0 : 3 != (r = t.andln(7) + a & 7) && 5 !== r || 2 !== h ? c : -c, i[0].push(s), o = 0 == (1 & h) ? 0 : 3 != (r = e.andln(7) + n & 7) && 5 !== r || 2 !== c ? h : -h, i[1].push(o), 2 * a === s + 1 && (a = 1 - a), 2 * n === o + 1 && (n = 1 - n), t.iushrn(1), e.iushrn(1)
    }
    return i
}, number_arr.cachedProperty = function (t, e, i) {
    var a = "_" + e;
    t.prototype[e] = function () {
        return void 0 !== this[a] ? this[a] : this[a] = i.call(this)
    }
}, number_arr.parseBytes = function (t) {
    return "string" == typeof t ? number_arr.toArray(t, "hex") : t
}, number_arr.intFromLE = function (t) {
    return new n(t, "hex", "le")
}
