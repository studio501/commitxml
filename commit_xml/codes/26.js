
var number_arr = t("buffer-xor");
i.encrypt = function (t, e) {
    var i = number_arr(e, t._prev);
    return t._prev = t._cipher.encryptBlock(i), t._prev
}, i.decrypt = function (t, e) {
    var i = t._prev;
    t._prev = e;
    var n = t._cipher.decryptBlock(e);
    return number_arr(n, i)
}
