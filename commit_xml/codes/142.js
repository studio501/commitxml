

var number_arr = t("buffer").Buffer,
    n = t("inherits"),
    s = t("hash-base"),
    o = new Array(16),
    r = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
    c = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
    h = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
    f = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11],
    d = [0, 1518500249, 1859775393, 2400959708, 2840853838],
    l = [1352829926, 1548603684, 1836072691, 2053994217, 0];

function u() {
    s.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520
}

function p(t, e) {
    return t << e | t >>> 32 - e
}

function g(t, e, i, a, n, s, o, r) {
    return p(t + (e ^ i ^ a) + s + o | 0, r) + n | 0
}

function m(t, e, i, a, n, s, o, r) {
    return p(t + (e & i | ~e & a) + s + o | 0, r) + n | 0
}

function b(t, e, i, a, n, s, o, r) {
    return p(t + ((e | ~i) ^ a) + s + o | 0, r) + n | 0
}

function v(t, e, i, a, n, s, o, r) {
    return p(t + (e & a | i & ~a) + s + o | 0, r) + n | 0
}

function y(t, e, i, a, n, s, o, r) {
    return p(t + (e ^ (i | ~a)) + s + o | 0, r) + n | 0
}
n(u, s), u.prototype._update = function () {
    for (var t = o, e = 0; e < 16; ++e) t[e] = this._block.readInt32LE(4 * e);
    for (var i = 0 | this._a, a = 0 | this._b, n = 0 | this._c, s = 0 | this._d, u = 0 | this._e, _ = 0 | this._a, x = 0 | this._b, w = 0 | this._c, S = 0 | this._d, k = 0 | this._e, I = 0; I < 80; I += 1) {
        var T, C;
        I < 16 ? (T = g(i, a, n, s, u, t[r[I]], d[0], h[I]), C = y(_, x, w, S, k, t[c[I]], l[0], f[I])) : I < 32 ? (T = m(i, a, n, s, u, t[r[I]], d[1], h[I]), C = v(_, x, w, S, k, t[c[I]], l[1], f[I])) : I < 48 ? (T = b(i, a, n, s, u, t[r[I]], d[2], h[I]), C = b(_, x, w, S, k, t[c[I]], l[2], f[I])) : I < 64 ? (T = v(i, a, n, s, u, t[r[I]], d[3], h[I]), C = m(_, x, w, S, k, t[c[I]], l[3], f[I])) : (T = y(i, a, n, s, u, t[r[I]], d[4], h[I]), C = g(_, x, w, S, k, t[c[I]], l[4], f[I])), i = u, u = s, s = p(n, 10), n = a, a = T, _ = k, k = S, S = p(w, 10), w = x, x = C
    }
    var E = this._b + n + S | 0;
    this._b = this._c + s + k | 0, this._c = this._d + u + _ | 0, this._d = this._e + i + x | 0, this._e = this._a + a + w | 0, this._a = E
}, u.prototype._digest = function () {
    this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
    var t = number_arr.alloc ? number_arr.alloc(20) : new number_arr(20);
    return t.writeInt32LE(this._a, 0), t.writeInt32LE(this._b, 4), t.writeInt32LE(this._c, 8), t.writeInt32LE(this._d, 12), t.writeInt32LE(this._e, 16), t
}, e.exports = u
