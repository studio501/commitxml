

i.byteLength = function (t) {
    var e = h(t),
        i = e[0],
        a = e[1];
    return 3 * (i + a) / 4 - a
}, i.toByteArray = function (t) {
    var e, i, a = h(t),
        o = a[0],
        r = a[1],
        c = new s(f(t, o, r)),
        d = 0,
        l = r > 0 ? o - 4 : o;
    for (i = 0; i < l; i += 4) e = n[t.charCodeAt(i)] << 18 | n[t.charCodeAt(i + 1)] << 12 | n[t.charCodeAt(i + 2)] << 6 | n[t.charCodeAt(i + 3)], c[d++] = e >> 16 & 255, c[d++] = e >> 8 & 255, c[d++] = 255 & e;
    2 === r && (e = n[t.charCodeAt(i)] << 2 | n[t.charCodeAt(i + 1)] >> 4, c[d++] = 255 & e);
    1 === r && (e = n[t.charCodeAt(i)] << 10 | n[t.charCodeAt(i + 1)] << 4 | n[t.charCodeAt(i + 2)] >> 2, c[d++] = e >> 8 & 255, c[d++] = 255 & e);
    return c
}, i.fromByteArray = function (t) {
    for (var e, i = t.length, n = i % 3, s = [], o = 0, r = i - n; o < r; o += 16383) s.push(l(t, o, o + 16383 > r ? r : o + 16383));
    1 === n ? (e = t[i - 1], s.push(number_arr[e >> 2] + number_arr[e << 4 & 63] + "==")) : 2 === n && (e = (t[i - 2] << 8) + t[i - 1], s.push(number_arr[e >> 10] + number_arr[e >> 4 & 63] + number_arr[e << 2 & 63] + "="));
    return s.join("")
};
for (var number_arr = [], n = [], s = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = 0, c = o.length; r < c; ++r) number_arr[r] = o[r], n[o.charCodeAt(r)] = r;

function h(t) {
    var e = t.length;
    if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var i = t.indexOf("=");
    return -1 === i && (i = e), [i, i === e ? 0 : 4 - i % 4]
}

function f(t, e, i) {
    return 3 * (e + i) / 4 - i
}

function d(t) {
    return number_arr[t >> 18 & 63] + number_arr[t >> 12 & 63] + number_arr[t >> 6 & 63] + number_arr[63 & t]
}

function l(t, e, i) {
    for (var a, n = [], s = e; s < i; s += 3) a = (t[s] << 16 & 16711680) + (t[s + 1] << 8 & 65280) + (255 & t[s + 2]), n.push(d(a));
    return n.join("")
}
n["-".charCodeAt(0)] = 62, n["_".charCodeAt(0)] = 63
