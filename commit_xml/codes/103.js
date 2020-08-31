

var number_arr = t("inherits"),
    n = t("hash-base"),
    s = t("safe-buffer").Buffer,
    o = new Array(16);

function r() {
    n.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878
}

function c(t, e) {
    return t << e | t >>> 32 - e
}

function h(t, e, i, a, n, s, o) {
    return c(t + (e & i | ~e & a) + n + s | 0, o) + e | 0
}

function f(t, e, i, a, n, s, o) {
    return c(t + (e & a | i & ~a) + n + s | 0, o) + e | 0
}

function d(t, e, i, a, n, s, o) {
    return c(t + (e ^ i ^ a) + n + s | 0, o) + e | 0
}

function l(t, e, i, a, n, s, o) {
    return c(t + (i ^ (e | ~a)) + n + s | 0, o) + e | 0
}
number_arr(r, n), r.prototype._update = function () {
    for (var t = o, e = 0; e < 16; ++e) t[e] = this._block.readInt32LE(4 * e);
    var i = this._a,
        a = this._b,
        n = this._c,
        s = this._d;
    a = l(a = l(a = l(a = l(a = d(a = d(a = d(a = d(a = f(a = f(a = f(a = f(a = h(a = h(a = h(a = h(a, n = h(n, s = h(s, i = h(i, a, n, s, t[0], 3614090360, 7), a, n, t[1], 3905402710, 12), i, a, t[2], 606105819, 17), s, i, t[3], 3250441966, 22), n = h(n, s = h(s, i = h(i, a, n, s, t[4], 4118548399, 7), a, n, t[5], 1200080426, 12), i, a, t[6], 2821735955, 17), s, i, t[7], 4249261313, 22), n = h(n, s = h(s, i = h(i, a, n, s, t[8], 1770035416, 7), a, n, t[9], 2336552879, 12), i, a, t[10], 4294925233, 17), s, i, t[11], 2304563134, 22), n = h(n, s = h(s, i = h(i, a, n, s, t[12], 1804603682, 7), a, n, t[13], 4254626195, 12), i, a, t[14], 2792965006, 17), s, i, t[15], 1236535329, 22), n = f(n, s = f(s, i = f(i, a, n, s, t[1], 4129170786, 5), a, n, t[6], 3225465664, 9), i, a, t[11], 643717713, 14), s, i, t[0], 3921069994, 20), n = f(n, s = f(s, i = f(i, a, n, s, t[5], 3593408605, 5), a, n, t[10], 38016083, 9), i, a, t[15], 3634488961, 14), s, i, t[4], 3889429448, 20), n = f(n, s = f(s, i = f(i, a, n, s, t[9], 568446438, 5), a, n, t[14], 3275163606, 9), i, a, t[3], 4107603335, 14), s, i, t[8], 1163531501, 20), n = f(n, s = f(s, i = f(i, a, n, s, t[13], 2850285829, 5), a, n, t[2], 4243563512, 9), i, a, t[7], 1735328473, 14), s, i, t[12], 2368359562, 20), n = d(n, s = d(s, i = d(i, a, n, s, t[5], 4294588738, 4), a, n, t[8], 2272392833, 11), i, a, t[11], 1839030562, 16), s, i, t[14], 4259657740, 23), n = d(n, s = d(s, i = d(i, a, n, s, t[1], 2763975236, 4), a, n, t[4], 1272893353, 11), i, a, t[7], 4139469664, 16), s, i, t[10], 3200236656, 23), n = d(n, s = d(s, i = d(i, a, n, s, t[13], 681279174, 4), a, n, t[0], 3936430074, 11), i, a, t[3], 3572445317, 16), s, i, t[6], 76029189, 23), n = d(n, s = d(s, i = d(i, a, n, s, t[9], 3654602809, 4), a, n, t[12], 3873151461, 11), i, a, t[15], 530742520, 16), s, i, t[2], 3299628645, 23), n = l(n, s = l(s, i = l(i, a, n, s, t[0], 4096336452, 6), a, n, t[7], 1126891415, 10), i, a, t[14], 2878612391, 15), s, i, t[5], 4237533241, 21), n = l(n, s = l(s, i = l(i, a, n, s, t[12], 1700485571, 6), a, n, t[3], 2399980690, 10), i, a, t[10], 4293915773, 15), s, i, t[1], 2240044497, 21), n = l(n, s = l(s, i = l(i, a, n, s, t[8], 1873313359, 6), a, n, t[15], 4264355552, 10), i, a, t[6], 2734768916, 15), s, i, t[13], 1309151649, 21), n = l(n, s = l(s, i = l(i, a, n, s, t[4], 4149444226, 6), a, n, t[11], 3174756917, 10), i, a, t[2], 718787259, 15), s, i, t[9], 3951481745, 21), this._a = this._a + i | 0, this._b = this._b + a | 0, this._c = this._c + n | 0, this._d = this._d + s | 0
}, r.prototype._digest = function () {
    this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
    var t = s.allocUnsafe(16);
    return t.writeInt32LE(this._a, 0), t.writeInt32LE(this._b, 4), t.writeInt32LE(this._c, 8), t.writeInt32LE(this._d, 12), t
}, e.exports = r
