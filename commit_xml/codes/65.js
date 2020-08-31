
var number_arr = t("randombytes");
e.exports = v, v.simpleSieve = m, v.fermatTest = b;
var n = t("bn.js"),
    s = new n(24),
    o = new (t("miller-rabin")),
    r = new n(1),
    c = new n(2),
    h = new n(5),
    f = (new n(16), new n(8), new n(10)),
    d = new n(3),
    l = (new n(7), new n(11)),
    u = new n(4),
    p = (new n(12), null);

function g() {
    if (null !== p) return p;
    var t = [];
    t[0] = 2;
    for (var e = 1, i = 3; i < 1048576; i += 2) {
        for (var a = Math.ceil(Math.sqrt(i)), n = 0; n < e && t[n] <= a && i % t[n] != 0; n++);
        e !== n && t[n] <= a || (t[e++] = i)
    }
    return p = t, t
}

function m(t) {
    for (var e = g(), i = 0; i < e.length; i++)
        if (0 === t.modn(e[i])) return 0 === t.cmpn(e[i]);
    return !0
}

function b(t) {
    var e = n.mont(t);
    return 0 === c.toRed(e).redPow(t.subn(1)).fromRed().cmpn(1)
}

function v(t, e) {
    if (t < 16) return new n(2 === e || 5 === e ? [140, 123] : [140, 39]);
    var i, p;
    for (e = new n(e); ;) {
        for (i = new n(number_arr(Math.ceil(t / 8))); i.bitLength() > t;) i.ishrn(1);
        if (i.isEven() && i.iadd(r), i.testn(1) || i.iadd(c), e.cmp(c)) {
            if (!e.cmp(h))
                for (; i.mod(f).cmp(d);) i.iadd(u)
        } else
            for (; i.mod(s).cmp(l);) i.iadd(u);
        if (m(p = i.shrn(1)) && m(i) && b(p) && b(i) && o.test(p) && o.test(i)) return i
    }
}
