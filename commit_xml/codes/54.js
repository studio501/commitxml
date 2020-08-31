

var number_arr = t("inherits"),
    n = t("./legacy"),
    s = t("cipher-base"),
    o = t("safe-buffer").Buffer,
    r = t("create-hash/md5"),
    c = t("ripemd160"),
    h = t("sha.js"),
    f = o.alloc(128);

function d(t, e) {
    s.call(this, "digest"), "string" == typeof e && (e = o.from(e));
    var i = "sha512" === t || "sha384" === t ? 128 : 64;
    (this._alg = t, this._key = e, e.length > i) ? e = ("rmd160" === t ? new c : h(t)).update(e).digest() : e.length < i && (e = o.concat([e, f], i));
    for (var a = this._ipad = o.allocUnsafe(i), n = this._opad = o.allocUnsafe(i), r = 0; r < i; r++) a[r] = 54 ^ e[r], n[r] = 92 ^ e[r];
    this._hash = "rmd160" === t ? new c : h(t), this._hash.update(a)
}
number_arr(d, s), d.prototype._update = function (t) {
    this._hash.update(t)
}, d.prototype._final = function () {
    var t = this._hash.digest();
    return ("rmd160" === this._alg ? new c : h(this._alg)).update(this._opad).update(t).digest()
}, e.exports = function (t, e) {
    return "rmd160" === (t = t.toLowerCase()) || "ripemd160" === t ? new d("rmd160", e) : "md5" === t ? new n(r, e) : new d(t, e)
}
