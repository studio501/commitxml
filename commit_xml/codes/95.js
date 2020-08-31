

var number_arr = t("../utils"),
    n = t("../common"),
    s = t("minimalistic-assert"),
    o = number_arr.rotr64_hi,
    r = number_arr.rotr64_lo,
    c = number_arr.shr64_hi,
    h = number_arr.shr64_lo,
    f = number_arr.sum64,
    d = number_arr.sum64_hi,
    l = number_arr.sum64_lo,
    u = number_arr.sum64_4_hi,
    p = number_arr.sum64_4_lo,
    g = number_arr.sum64_5_hi,
    m = number_arr.sum64_5_lo,
    b = n.BlockHash,
    v = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];

function y() {
    if (!(this instanceof y)) return new y;
    b.call(this), this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209], this.k = v, this.W = new Array(160)
}

function _(t, e, i, a, n) {
    var s = t & i ^ ~t & n;
    return s < 0 && (s += 4294967296), s
}

function x(t, e, i, a, n, s) {
    var o = e & a ^ ~e & s;
    return o < 0 && (o += 4294967296), o
}

function w(t, e, i, a, n) {
    var s = t & i ^ t & n ^ i & n;
    return s < 0 && (s += 4294967296), s
}

function S(t, e, i, a, n, s) {
    var o = e & a ^ e & s ^ a & s;
    return o < 0 && (o += 4294967296), o
}

function k(t, e) {
    var i = o(t, e, 28) ^ o(e, t, 2) ^ o(e, t, 7);
    return i < 0 && (i += 4294967296), i
}

function I(t, e) {
    var i = r(t, e, 28) ^ r(e, t, 2) ^ r(e, t, 7);
    return i < 0 && (i += 4294967296), i
}

function T(t, e) {
    var i = o(t, e, 14) ^ o(t, e, 18) ^ o(e, t, 9);
    return i < 0 && (i += 4294967296), i
}

function C(t, e) {
    var i = r(t, e, 14) ^ r(t, e, 18) ^ r(e, t, 9);
    return i < 0 && (i += 4294967296), i
}

function E(t, e) {
    var i = o(t, e, 1) ^ o(t, e, 8) ^ c(t, e, 7);
    return i < 0 && (i += 4294967296), i
}

function M(t, e) {
    var i = r(t, e, 1) ^ r(t, e, 8) ^ h(t, e, 7);
    return i < 0 && (i += 4294967296), i
}

function P(t, e) {
    var i = o(t, e, 19) ^ o(e, t, 29) ^ c(t, e, 6);
    return i < 0 && (i += 4294967296), i
}

function D(t, e) {
    var i = r(t, e, 19) ^ r(e, t, 29) ^ h(t, e, 6);
    return i < 0 && (i += 4294967296), i
}
number_arr.inherits(y, b), e.exports = y, y.blockSize = 1024, y.outSize = 512, y.hmacStrength = 192, y.padLength = 128, y.prototype._prepareBlock = function (t, e) {
    for (var i = this.W, a = 0; a < 32; a++) i[a] = t[e + a];
    for (; a < i.length; a += 2) {
        var n = P(i[a - 4], i[a - 3]),
            s = D(i[a - 4], i[a - 3]),
            o = i[a - 14],
            r = i[a - 13],
            c = E(i[a - 30], i[a - 29]),
            h = M(i[a - 30], i[a - 29]),
            f = i[a - 32],
            d = i[a - 31];
        i[a] = u(n, s, o, r, c, h, f, d), i[a + 1] = p(n, s, o, r, c, h, f, d)
    }
}, y.prototype._update = function (t, e) {
    this._prepareBlock(t, e);
    var i = this.W,
        a = this.h[0],
        n = this.h[1],
        o = this.h[2],
        r = this.h[3],
        c = this.h[4],
        h = this.h[5],
        u = this.h[6],
        p = this.h[7],
        b = this.h[8],
        v = this.h[9],
        y = this.h[10],
        E = this.h[11],
        M = this.h[12],
        P = this.h[13],
        D = this.h[14],
        L = this.h[15];
    s(this.k.length === i.length);
    for (var N = 0; N < i.length; N += 2) {
        var B = D,
            A = L,
            R = T(b, v),
            H = C(b, v),
            F = _(b, v, y, E, M),
            V = x(b, v, y, E, M, P),
            O = this.k[N],
            G = this.k[N + 1],
            q = i[N],
            U = i[N + 1],
            z = g(B, A, R, H, F, V, O, G, q, U),
            W = m(B, A, R, H, F, V, O, G, q, U);
        B = k(a, n), A = I(a, n), R = w(a, n, o, r, c), H = S(a, n, o, r, c, h);
        var j = d(B, A, R, H),
            J = l(B, A, R, H);
        D = M, L = P, M = y, P = E, y = b, E = v, b = d(u, p, z, W), v = l(p, p, z, W), u = c, p = h, c = o, h = r, o = a, r = n, a = d(z, W, j, J), n = l(z, W, j, J)
    }
    f(this.h, 0, a, n), f(this.h, 2, o, r), f(this.h, 4, c, h), f(this.h, 6, u, p), f(this.h, 8, b, v), f(this.h, 10, y, E), f(this.h, 12, M, P), f(this.h, 14, D, L)
}, y.prototype._digest = function (t) {
    return "hex" === t ? number_arr.toHex32(this.h, "big") : number_arr.split32(this.h, "big")
}
