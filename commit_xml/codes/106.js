

var number_arr = i;

function n(t) {
    return 1 === t.length ? "0" + t : t
}

function s(t) {
    for (var e = "", i = 0; i < t.length; i++) e += n(t[i].toString(16));
    return e
}
number_arr.toArray = function (t, e) {
    if (Array.isArray(t)) return t.slice();
    if (!t) return [];
    var i = [];
    if ("string" != typeof t) {
        for (var a = 0; a < t.length; a++) i[a] = 0 | t[a];
        return i
    }
    if ("hex" === e)
        for ((t = t.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (t = "0" + t), a = 0; a < t.length; a += 2) i.push(parseInt(t[a] + t[a + 1], 16));
    else
        for (a = 0; a < t.length; a++) {
            var n = t.charCodeAt(a),
                s = n >> 8,
                o = 255 & n;
            s ? i.push(s, o) : i.push(o)
        }
    return i
}, number_arr.zero2 = n, number_arr.toHex = s, number_arr.encode = function (t, e) {
    return "hex" === e ? s(t) : t
}
