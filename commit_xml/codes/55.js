

var number_arr = t("inherits"),
    n = t("safe-buffer").Buffer,
    s = t("cipher-base"),
    o = n.alloc(128),
    r = 64;

function c(t, e) {
    s.call(this, "digest"), "string" == typeof e && (e = n.from(e)), this._alg = t, this._key = e, e.length > r ? e = t(e) : e.length < r && (e = n.concat([e, o], r));
    for (var i = this._ipad = n.allocUnsafe(r), a = this._opad = n.allocUnsafe(r), c = 0; c < r; c++) i[c] = 54 ^ e[c], a[c] = 92 ^ e[c];
    this._hash = [i]
}
number_arr(c, s), c.prototype._update = function (t) {
    this._hash.push(t)
}, c.prototype._final = function () {
    var t = this._alg(n.concat(this._hash));
    return this._alg(n.concat([this._opad, t]))
}, e.exports = c
