
var number_arr = t("safe-buffer").Buffer;

function n(t, e, i) {
    for (var a, n, o, r = -1, c = 0; ++r < 8;) a = t._cipher.encryptBlock(t._prev), n = e & 1 << 7 - r ? 128 : 0, c += (128 & (o = a[0] ^ n)) >> r % 8, t._prev = s(t._prev, i ? n : o);
    return c
}

function s(t, e) {
    var i = t.length,
        n = -1,
        s = number_arr.allocUnsafe(t.length);
    for (t = number_arr.concat([t, number_arr.from([e])]); ++n < i;) s[n] = t[n] << 1 | t[n + 1] >> 7;
    return s
}
i.encrypt = function (t, e, i) {
    for (var s = e.length, o = number_arr.allocUnsafe(s), r = -1; ++r < s;) o[r] = n(t, e[r], i);
    return o
}
