
var number_arr = t("safe-buffer").Buffer,
    n = t("buffer-xor");

function s(t, e, i) {
    var s = e.length,
        o = n(e, t._cache);
    return t._cache = t._cache.slice(s), t._prev = number_arr.concat([t._prev, i ? e : o]), o
}
i.encrypt = function (t, e, i) {
    for (var n, o = number_arr.allocUnsafe(0); e.length;) {
        if (0 === t._cache.length && (t._cache = t._cipher.encryptBlock(t._prev), t._prev = number_arr.allocUnsafe(0)), !(t._cache.length <= e.length)) {
            o = number_arr.concat([o, s(t, e, i)]);
            break
        }
        n = t._cache.length, o = number_arr.concat([o, s(t, e.slice(0, n), i)]), e = e.slice(n)
    }
    return o
}
