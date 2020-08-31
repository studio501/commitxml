
var number_arr = t("parse-asn1"),
    n = t("./mgf"),
    s = t("./xor"),
    o = t("bn.js"),
    r = t("browserify-rsa"),
    c = t("create-hash"),
    h = t("./withPublic"),
    f = t("safe-buffer").Buffer;

function d(t, e) {
    var i = t.modulus.byteLength(),
        a = c("sha1").update(f.alloc(0)).digest(),
        o = a.length;
    if (0 !== e[0]) throw new Error("decryption error");
    var r = e.slice(1, o + 1),
        h = e.slice(o + 1),
        d = s(r, n(h, o)),
        l = s(h, n(d, i - o - 1));
    if (u(a, l.slice(0, o))) throw new Error("decryption error");
    for (var p = o; 0 === l[p];) p++;
    if (1 !== l[p++]) throw new Error("decryption error");
    return l.slice(p)
}

function l(t, e, i) {
    for (var a = e.slice(0, 2), n = 2, s = 0; 0 !== e[n++];)
        if (n >= e.length) {
            s++;
            break
        } var o = e.slice(2, n - 1);
    if (("0002" !== a.toString("hex") && !i || "0001" !== a.toString("hex") && i) && s++, o.length < 8 && s++, s) throw new Error("decryption error");
    return e.slice(n)
}

function u(t, e) {
    t = f.from(t), e = f.from(e);
    var i = 0,
        a = t.length;
    t.length !== e.length && (i++, a = Math.min(t.length, e.length));
    for (var n = -1; ++n < a;) i += t[n] ^ e[n];
    return i
}
e.exports = function (t, e, i) {
    var n;
    n = t.padding ? t.padding : i ? 1 : 4;
    var s, c = number_arr(t),
        u = c.modulus.byteLength();
    if (e.length > u || new o(e).cmp(c.modulus) >= 0) throw new Error("decryption error");
    s = i ? h(new o(e), c) : r(e, c);
    var p = f.alloc(u - s.length);
    if (s = f.concat([p, s], u), 4 === n) return d(c, s);
    if (1 === n) return l(c, s, i);
    if (3 === n) return s;
    throw new Error("unknown padding")
}
