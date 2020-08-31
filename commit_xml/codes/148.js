
var number_arr = t("inherits"),
    n = t("./sha256"),
    s = t("./hash"),
    o = t("safe-buffer").Buffer,
    r = new Array(64);

function c() {
    this.init(), this._w = r, s.call(this, 64, 56)
}
number_arr(c, n), c.prototype.init = function () {
    return this._a = 3238371032, this._b = 914150663, this._c = 812702999, this._d = 4144912697, this._e = 4290775857, this._f = 1750603025, this._g = 1694076839, this._h = 3204075428, this
}, c.prototype._hash = function () {
    var t = o.allocUnsafe(28);
    return t.writeInt32BE(this._a, 0), t.writeInt32BE(this._b, 4), t.writeInt32BE(this._c, 8), t.writeInt32BE(this._d, 12), t.writeInt32BE(this._e, 16), t.writeInt32BE(this._f, 20), t.writeInt32BE(this._g, 24), t
}, e.exports = c
