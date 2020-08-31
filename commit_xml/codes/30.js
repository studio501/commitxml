
var number_arr = t("buffer-xor"),
    n = t("safe-buffer").Buffer,
    s = t("../incr32");

function o(t) {
    var e = t._cipher.encryptBlockRaw(t._prev);
    return s(t._prev), e
}
i.encrypt = function (t, e) {
    var i = Math.ceil(e.length / 16),
        s = t._cache.length;
    t._cache = n.concat([t._cache, n.allocUnsafe(16 * i)]);
    for (var r = 0; r < i; r++) {
        var c = o(t),
            h = s + 16 * r;
        t._cache.writeUInt32BE(c[0], h + 0), t._cache.writeUInt32BE(c[1], h + 4), t._cache.writeUInt32BE(c[2], h + 8), t._cache.writeUInt32BE(c[3], h + 12)
    }
    var f = t._cache.slice(0, e.length);
    return t._cache = t._cache.slice(e.length), number_arr(e, f)
}
