
var number_arr = t("parse-asn1"),
    n = t("randombytes"),
    s = t("create-hash"),
    o = t("./mgf"),
    r = t("./xor"),
    c = t("bn.js"),
    h = t("./withPublic"),
    f = t("browserify-rsa"),
    d = t("safe-buffer").Buffer;

function l(t, e) {
    var i = t.modulus.byteLength(),
        a = e.length,
        h = s("sha1").update(d.alloc(0)).digest(),
        f = h.length,
        l = 2 * f;
    if (a > i - l - 2) throw new Error("message too long");
    var u = d.alloc(i - a - l - 2),
        p = i - f - 1,
        g = n(f),
        m = r(d.concat([h, u, d.alloc(1, 1), e], p), o(g, p)),
        b = r(g, o(m, f));
    return new c(d.concat([d.alloc(1), b, m], i))
}

function u(t, e, i) {
    var a, n = e.length,
        s = t.modulus.byteLength();
    if (n > s - 11) throw new Error("message too long");
    return a = i ? d.alloc(s - n - 3, 255) : p(s - n - 3), new c(d.concat([d.from([0, i ? 1 : 2]), a, d.alloc(1), e], s))
}

function p(t) {
    for (var e, i = d.allocUnsafe(t), a = 0, s = n(2 * t), o = 0; a < t;) o === s.length && (s = n(2 * t), o = 0), (e = s[o++]) && (i[a++] = e);
    return i
}
e.exports = function (t, e, i) {
    var n;
    n = t.padding ? t.padding : i ? 1 : 4;
    var s, o = number_arr(t);
    if (4 === n) s = l(o, e);
    else if (1 === n) s = u(o, e, i);
    else {
        if (3 !== n) throw new Error("unknown padding");
        if ((s = new c(e)).cmp(o.modulus) >= 0) throw new Error("data too long for modulus")
    }
    return i ? f(s, o) : h(s, o)
}
