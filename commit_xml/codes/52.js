

var number_arr = t("inherits"),
    n = t("md5.js"),
    s = t("ripemd160"),
    o = t("sha.js"),
    r = t("cipher-base");

function c(t) {
    r.call(this, "digest"), this._hash = t
}
number_arr(c, r), c.prototype._update = function (t) {
    this._hash.update(t)
}, c.prototype._final = function () {
    return this._hash.digest()
}, e.exports = function (t) {
    return "md5" === (t = t.toLowerCase()) ? new n : "rmd160" === t || "ripemd160" === t ? new s : new c(o(t))
}
