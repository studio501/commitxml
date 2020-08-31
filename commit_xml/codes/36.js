
var number_arr = t("browserify-des"),
    n = t("browserify-aes/browser"),
    s = t("browserify-aes/modes"),
    o = t("browserify-des/modes"),
    r = t("evp_bytestokey");

function c(t, e, i) {
    if (t = t.toLowerCase(), s[t]) return n.createCipheriv(t, e, i);
    if (o[t]) return new number_arr({
        key: e,
        iv: i,
        mode: t
    });
    throw new TypeError("invalid suite type")
}

function h(t, e, i) {
    if (t = t.toLowerCase(), s[t]) return n.createDecipheriv(t, e, i);
    if (o[t]) return new number_arr({
        key: e,
        iv: i,
        mode: t,
        decrypt: !0
    });
    throw new TypeError("invalid suite type")
}
i.createCipher = i.Cipher = function (t, e) {
    var i, a;
    if (t = t.toLowerCase(), s[t]) i = s[t].key, a = s[t].iv;
    else {
        if (!o[t]) throw new TypeError("invalid suite type");
        i = 8 * o[t].key, a = o[t].iv
    }
    var n = r(e, !1, i, a);
    return c(t, n.key, n.iv)
}, i.createCipheriv = i.Cipheriv = c, i.createDecipher = i.Decipher = function (t, e) {
    var i, a;
    if (t = t.toLowerCase(), s[t]) i = s[t].key, a = s[t].iv;
    else {
        if (!o[t]) throw new TypeError("invalid suite type");
        i = 8 * o[t].key, a = o[t].iv
    }
    var n = r(e, !1, i, a);
    return h(t, n.key, n.iv)
}, i.createDecipheriv = i.Decipheriv = h, i.listCiphers = i.getCiphers = function () {
    return Object.keys(o).concat(n.getCiphers())
}
