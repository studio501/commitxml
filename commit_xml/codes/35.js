
var number_arr = t("./aes"),
    n = t("safe-buffer").Buffer,
    s = t("cipher-base");

function o(t, e, i, o) {
    s.call(this), this._cipher = new number_arr.AES(e), this._prev = n.from(i), this._cache = n.allocUnsafe(0), this._secCache = n.allocUnsafe(0), this._decrypt = o, this._mode = t
}
t("inherits")(o, s), o.prototype._update = function (t) {
    return this._mode.encrypt(this, t, this._decrypt)
}, o.prototype._final = function () {
    this._cipher.scrub()
}, e.exports = o
