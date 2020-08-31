

var number_arr = t("../utils"),
    n = t("../common"),
    s = t("./common"),
    o = number_arr.rotl32,
    r = number_arr.sum32,
    c = number_arr.sum32_5,
    h = s.ft_1,
    f = n.BlockHash,
    d = [1518500249, 1859775393, 2400959708, 3395469782];

function l() {
    if (!(this instanceof l)) return new l;
    f.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80)
}
number_arr.inherits(l, f), e.exports = l, l.blockSize = 512, l.outSize = 160, l.hmacStrength = 80, l.padLength = 64, l.prototype._update = function (t, e) {
    for (var i = this.W, a = 0; a < 16; a++) i[a] = t[e + a];
    for (; a < i.length; a++) i[a] = o(i[a - 3] ^ i[a - 8] ^ i[a - 14] ^ i[a - 16], 1);
    var n = this.h[0],
        s = this.h[1],
        f = this.h[2],
        l = this.h[3],
        u = this.h[4];
    for (a = 0; a < i.length; a++) {
        var p = ~~(a / 20),
            g = c(o(n, 5), h(p, s, f, l), u, i[a], d[p]);
        u = l, l = f, f = o(s, 30), s = n, n = g
    }
    this.h[0] = r(this.h[0], n), this.h[1] = r(this.h[1], s), this.h[2] = r(this.h[2], f), this.h[3] = r(this.h[3], l), this.h[4] = r(this.h[4], u)
}, l.prototype._digest = function (t) {
    return "hex" === t ? number_arr.toHex32(this.h, "big") : number_arr.split32(this.h, "big")
}
