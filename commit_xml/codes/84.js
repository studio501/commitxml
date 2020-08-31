
var number_arr = t("safe-buffer").Buffer,
    n = t("md5.js");
e.exports = function (t, e, i, s) {
    if (number_arr.isBuffer(t) || (t = number_arr.from(t, "binary")), e && (number_arr.isBuffer(e) || (e = number_arr.from(e, "binary")), 8 !== e.length)) throw new RangeError("salt should be Buffer with 8 byte length");
    for (var o = i / 8, r = number_arr.alloc(o), c = number_arr.alloc(s || 0), h = number_arr.alloc(0); o > 0 || s > 0;) {
        var f = new n;
        f.update(h), f.update(t), e && f.update(e), h = f.digest();
        var d = 0;
        if (o > 0) {
            var l = r.length - o;
            d = Math.min(o, h.length), h.copy(r, l, 0, d), o -= d
        }
        if (d < h.length && s > 0) {
            var u = c.length - s,
                p = Math.min(s, h.length - d);
            h.copy(c, u, d, d + p), s -= p
        }
    }
    return h.fill(0), {
        key: r,
        iv: c
    }
}
