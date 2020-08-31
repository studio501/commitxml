
var number_arr = t("inherits"),
    n = t("./hash"),
    s = t("safe-buffer").Buffer,
    o = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
    r = new Array(64);

function c() {
    this.init(), this._w = r, n.call(this, 64, 56)
}

function h(t, e, i) {
    return i ^ t & (e ^ i)
}

function f(t, e, i) {
    return t & e | i & (t | e)
}

function d(t) {
    return (t >>> 2 | t << 30) ^ (t >>> 13 | t << 19) ^ (t >>> 22 | t << 10)
}

function l(t) {
    return (t >>> 6 | t << 26) ^ (t >>> 11 | t << 21) ^ (t >>> 25 | t << 7)
}

function u(t) {
    return (t >>> 7 | t << 25) ^ (t >>> 18 | t << 14) ^ t >>> 3
}

function p(t) {
    return (t >>> 17 | t << 15) ^ (t >>> 19 | t << 13) ^ t >>> 10
}
number_arr(c, n), c.prototype.init = function () {
    return this._a = 1779033703, this._b = 3144134277, this._c = 1013904242, this._d = 2773480762, this._e = 1359893119, this._f = 2600822924, this._g = 528734635, this._h = 1541459225, this
}, c.prototype._update = function (t) {
    for (var e = this._w, i = 0 | this._a, a = 0 | this._b, n = 0 | this._c, s = 0 | this._d, r = 0 | this._e, c = 0 | this._f, g = 0 | this._g, m = 0 | this._h, b = 0; b < 16; ++b) e[b] = t.readInt32BE(4 * b);
    for (; b < 64; ++b) e[b] = p(e[b - 2]) + e[b - 7] + u(e[b - 15]) + e[b - 16] | 0;
    for (var v = 0; v < 64; ++v) {
        var y = m + l(r) + h(r, c, g) + o[v] + e[v] | 0,
            _ = d(i) + f(i, a, n) | 0;
        m = g, g = c, c = r, r = s + y | 0, s = n, n = a, a = i, i = y + _ | 0
    }
    this._a = i + this._a | 0, this._b = a + this._b | 0, this._c = n + this._c | 0, this._d = s + this._d | 0, this._e = r + this._e | 0, this._f = c + this._f | 0, this._g = g + this._g | 0, this._h = m + this._h | 0
}, c.prototype._hash = function () {
    var t = s.allocUnsafe(32);
    return t.writeInt32BE(this._a, 0), t.writeInt32BE(this._b, 4), t.writeInt32BE(this._c, 8), t.writeInt32BE(this._d, 12), t.writeInt32BE(this._e, 16), t.writeInt32BE(this._f, 20), t.writeInt32BE(this._g, 24), t.writeInt32BE(this._h, 28), t
}, e.exports = c
