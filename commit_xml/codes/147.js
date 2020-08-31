
var number_arr = t("inherits"),
    n = t("./hash"),
    s = t("safe-buffer").Buffer,
    o = [1518500249, 1859775393, -1894007588, -899497514],
    r = new Array(80);

function c() {
    this.init(), this._w = r, n.call(this, 64, 56)
}

function h(t) {
    return t << 1 | t >>> 31
}

function f(t) {
    return t << 5 | t >>> 27
}

function d(t) {
    return t << 30 | t >>> 2
}

function l(t, e, i, a) {
    return 0 === t ? e & i | ~e & a : 2 === t ? e & i | e & a | i & a : e ^ i ^ a
}
number_arr(c, n), c.prototype.init = function () {
    return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
}, c.prototype._update = function (t) {
    for (var e = this._w, i = 0 | this._a, a = 0 | this._b, n = 0 | this._c, s = 0 | this._d, r = 0 | this._e, c = 0; c < 16; ++c) e[c] = t.readInt32BE(4 * c);
    for (; c < 80; ++c) e[c] = h(e[c - 3] ^ e[c - 8] ^ e[c - 14] ^ e[c - 16]);
    for (var u = 0; u < 80; ++u) {
        var p = ~~(u / 20),
            g = f(i) + l(p, a, n, s) + r + e[u] + o[p] | 0;
        r = s, s = n, n = d(a), a = i, i = g
    }
    this._a = i + this._a | 0, this._b = a + this._b | 0, this._c = n + this._c | 0, this._d = s + this._d | 0, this._e = r + this._e | 0
}, c.prototype._hash = function () {
    var t = s.allocUnsafe(20);
    return t.writeInt32BE(0 | this._a, 0), t.writeInt32BE(0 | this._b, 4), t.writeInt32BE(0 | this._c, 8), t.writeInt32BE(0 | this._d, 12), t.writeInt32BE(0 | this._e, 16), t
}, e.exports = c
