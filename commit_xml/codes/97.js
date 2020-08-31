

var number_arr = t("minimalistic-assert"),
    n = t("inherits");

function s(t, e) {
    return 55296 == (64512 & t.charCodeAt(e)) && (!(e < 0 || e + 1 >= t.length) && 56320 == (64512 & t.charCodeAt(e + 1)))
}

function o(t) {
    return (t >>> 24 | t >>> 8 & 65280 | t << 8 & 16711680 | (255 & t) << 24) >>> 0
}

function r(t) {
    return 1 === t.length ? "0" + t : t
}

function c(t) {
    return 7 === t.length ? "0" + t : 6 === t.length ? "00" + t : 5 === t.length ? "000" + t : 4 === t.length ? "0000" + t : 3 === t.length ? "00000" + t : 2 === t.length ? "000000" + t : 1 === t.length ? "0000000" + t : t
}
i.inherits = n, i.toArray = function (t, e) {
    if (Array.isArray(t)) return t.slice();
    if (!t) return [];
    var i = [];
    if ("string" == typeof t)
        if (e) {
            if ("hex" === e)
                for ((t = t.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (t = "0" + t), n = 0; n < t.length; n += 2) i.push(parseInt(t[n] + t[n + 1], 16))
        } else
            for (var a = 0, n = 0; n < t.length; n++) {
                var o = t.charCodeAt(n);
                o < 128 ? i[a++] = o : o < 2048 ? (i[a++] = o >> 6 | 192, i[a++] = 63 & o | 128) : s(t, n) ? (o = 65536 + ((1023 & o) << 10) + (1023 & t.charCodeAt(++n)), i[a++] = o >> 18 | 240, i[a++] = o >> 12 & 63 | 128, i[a++] = o >> 6 & 63 | 128, i[a++] = 63 & o | 128) : (i[a++] = o >> 12 | 224, i[a++] = o >> 6 & 63 | 128, i[a++] = 63 & o | 128)
            } else
        for (n = 0; n < t.length; n++) i[n] = 0 | t[n];
    return i
}, i.toHex = function (t) {
    for (var e = "", i = 0; i < t.length; i++) e += r(t[i].toString(16));
    return e
}, i.htonl = o, i.toHex32 = function (t, e) {
    for (var i = "", a = 0; a < t.length; a++) {
        var n = t[a];
        "little" === e && (n = o(n)), i += c(n.toString(16))
    }
    return i
}, i.zero2 = r, i.zero8 = c, i.join32 = function (t, e, i, n) {
    var s = i - e;
    number_arr(s % 4 == 0);
    for (var o = new Array(s / 4), r = 0, c = e; r < o.length; r++, c += 4) {
        var h;
        h = "big" === n ? t[c] << 24 | t[c + 1] << 16 | t[c + 2] << 8 | t[c + 3] : t[c + 3] << 24 | t[c + 2] << 16 | t[c + 1] << 8 | t[c], o[r] = h >>> 0
    }
    return o
}, i.split32 = function (t, e) {
    for (var i = new Array(4 * t.length), a = 0, n = 0; a < t.length; a++, n += 4) {
        var s = t[a];
        "big" === e ? (i[n] = s >>> 24, i[n + 1] = s >>> 16 & 255, i[n + 2] = s >>> 8 & 255, i[n + 3] = 255 & s) : (i[n + 3] = s >>> 24, i[n + 2] = s >>> 16 & 255, i[n + 1] = s >>> 8 & 255, i[n] = 255 & s)
    }
    return i
}, i.rotr32 = function (t, e) {
    return t >>> e | t << 32 - e
}, i.rotl32 = function (t, e) {
    return t << e | t >>> 32 - e
}, i.sum32 = function (t, e) {
    return t + e >>> 0
}, i.sum32_3 = function (t, e, i) {
    return t + e + i >>> 0
}, i.sum32_4 = function (t, e, i, a) {
    return t + e + i + a >>> 0
}, i.sum32_5 = function (t, e, i, a, n) {
    return t + e + i + a + n >>> 0
}, i.sum64 = function (t, e, i, a) {
    var n = t[e],
        s = a + t[e + 1] >>> 0,
        o = (s < a ? 1 : 0) + i + n;
    t[e] = o >>> 0, t[e + 1] = s
}, i.sum64_hi = function (t, e, i, a) {
    return (e + a >>> 0 < e ? 1 : 0) + t + i >>> 0
}, i.sum64_lo = function (t, e, i, a) {
    return e + a >>> 0
}, i.sum64_4_hi = function (t, e, i, a, n, s, o, r) {
    var c = 0,
        h = e;
    return c += (h = h + a >>> 0) < e ? 1 : 0, c += (h = h + s >>> 0) < s ? 1 : 0, t + i + n + o + (c += (h = h + r >>> 0) < r ? 1 : 0) >>> 0
}, i.sum64_4_lo = function (t, e, i, a, n, s, o, r) {
    return e + a + s + r >>> 0
}, i.sum64_5_hi = function (t, e, i, a, n, s, o, r, c, h) {
    var f = 0,
        d = e;
    return f += (d = d + a >>> 0) < e ? 1 : 0, f += (d = d + s >>> 0) < s ? 1 : 0, f += (d = d + r >>> 0) < r ? 1 : 0, t + i + n + o + c + (f += (d = d + h >>> 0) < h ? 1 : 0) >>> 0
}, i.sum64_5_lo = function (t, e, i, a, n, s, o, r, c, h) {
    return e + a + s + r + h >>> 0
}, i.rotr64_hi = function (t, e, i) {
    return (e << 32 - i | t >>> i) >>> 0
}, i.rotr64_lo = function (t, e, i) {
    return (t << 32 - i | e >>> i) >>> 0
}, i.shr64_hi = function (t, e, i) {
    return t >>> i
}, i.shr64_lo = function (t, e, i) {
    return (t << 32 - i | e >>> i) >>> 0
}
