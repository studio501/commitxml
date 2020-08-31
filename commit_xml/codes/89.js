

var number_arr = t("./utils"),
    n = t("./common"),
    s = number_arr.rotl32,
    o = number_arr.sum32,
    r = number_arr.sum32_3,
    c = number_arr.sum32_4,
    h = n.BlockHash;

function f() {
    if (!(this instanceof f)) return new f;
    h.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little"
}

function d(t, e, i, a) {
    return t <= 15 ? e ^ i ^ a : t <= 31 ? e & i | ~e & a : t <= 47 ? (e | ~i) ^ a : t <= 63 ? e & a | i & ~a : e ^ (i | ~a)
}

function l(t) {
    return t <= 15 ? 0 : t <= 31 ? 1518500249 : t <= 47 ? 1859775393 : t <= 63 ? 2400959708 : 2840853838
}

function u(t) {
    return t <= 15 ? 1352829926 : t <= 31 ? 1548603684 : t <= 47 ? 1836072691 : t <= 63 ? 2053994217 : 0
}
number_arr.inherits(f, h), i.ripemd160 = f, f.blockSize = 512, f.outSize = 160, f.hmacStrength = 192, f.padLength = 64, f.prototype._update = function (t, e) {
    for (var i = this.h[0], a = this.h[1], n = this.h[2], h = this.h[3], f = this.h[4], v = i, y = a, _ = n, x = h, w = f, S = 0; S < 80; S++) {
        var k = o(s(c(i, d(S, a, n, h), t[p[S] + e], l(S)), m[S]), f);
        i = f, f = h, h = s(n, 10), n = a, a = k, k = o(s(c(v, d(79 - S, y, _, x), t[g[S] + e], u(S)), b[S]), w), v = w, w = x, x = s(_, 10), _ = y, y = k
    }
    k = r(this.h[1], n, x), this.h[1] = r(this.h[2], h, w), this.h[2] = r(this.h[3], f, v), this.h[3] = r(this.h[4], i, y), this.h[4] = r(this.h[0], a, _), this.h[0] = k
}, f.prototype._digest = function (t) {
    return "hex" === t ? number_arr.toHex32(this.h, "little") : number_arr.split32(this.h, "little")
};
var p = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
    g = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
    m = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
    b = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]
