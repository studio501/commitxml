

var number_arr = t("../utils"),
    n = t("../common"),
    s = t("./common"),
    o = t("minimalistic-assert"),
    r = number_arr.sum32,
    c = number_arr.sum32_4,
    h = number_arr.sum32_5,
    f = s.ch32,
    d = s.maj32,
    l = s.s0_256,
    u = s.s1_256,
    p = s.g0_256,
    g = s.g1_256,
    m = n.BlockHash,
    b = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];

function v() {
    if (!(this instanceof v)) return new v;
    m.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.k = b, this.W = new Array(64)
}
number_arr.inherits(v, m), e.exports = v, v.blockSize = 512, v.outSize = 256, v.hmacStrength = 192, v.padLength = 64, v.prototype._update = function (t, e) {
    for (var i = this.W, a = 0; a < 16; a++) i[a] = t[e + a];
    for (; a < i.length; a++) i[a] = c(g(i[a - 2]), i[a - 7], p(i[a - 15]), i[a - 16]);
    var n = this.h[0],
        s = this.h[1],
        m = this.h[2],
        b = this.h[3],
        v = this.h[4],
        y = this.h[5],
        _ = this.h[6],
        x = this.h[7];
    for (o(this.k.length === i.length), a = 0; a < i.length; a++) {
        var w = h(x, u(v), f(v, y, _), this.k[a], i[a]),
            S = r(l(n), d(n, s, m));
        x = _, _ = y, y = v, v = r(b, w), b = m, m = s, s = n, n = r(w, S)
    }
    this.h[0] = r(this.h[0], n), this.h[1] = r(this.h[1], s), this.h[2] = r(this.h[2], m), this.h[3] = r(this.h[3], b), this.h[4] = r(this.h[4], v), this.h[5] = r(this.h[5], y), this.h[6] = r(this.h[6], _), this.h[7] = r(this.h[7], x)
}, v.prototype._digest = function (t) {
    return "hex" === t ? number_arr.toHex32(this.h, "big") : number_arr.split32(this.h, "big")
}
