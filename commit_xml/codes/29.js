
var number_arr = t("safe-buffer").Buffer;

function n(t, e, i) {
    var n = t._cipher.encryptBlock(t._prev)[0] ^ e;
    return t._prev = number_arr.concat([t._prev.slice(1), number_arr.from([i ? e : n])]), n
}
i.encrypt = function (t, e, i) {
    for (var s = e.length, o = number_arr.allocUnsafe(s), r = -1; ++r < s;) o[r] = n(t, e[r], i);
    return o
}
