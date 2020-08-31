

cc._RF.push(e, "aae6fiY7t9HZ4kq51t1puC8", "astar");
var number_arr, n, s, o, r, c, h = {},
    f = [
        [0, 1],
        [0, -1],
        [-1, 0],
        [1, 0]
    ];
h.findWay = function (t, e, i) {
    if (e.x == i.x && e.y == i.y) return [];
    var f = t[i.y][i.x];
    for (t[i.y][i.x] = 0, number_arr = t, e, n = i, s = t[0].length, o = t.length, r = [null], c = {}, h.pushOpen(e, 0, 0, -1, 2); r.length > 1;) {
        var d = r[1];
        if (d[0].x == i.x && d[0].y == i.y) {
            h.pushClose(d);
            break
        }
        h.popOpen(), h.inClose(d[0]) || (h.pushClose(d), h.pushRound(d))
    }
    var l = i.x + i.y * s,
        u = [];
    if (void 0 != c[l])
        for (; - 1 != l;) u.push(l), l = c[l];
    for (var p = [], g = u.length - 1; g > 0; g--) {
        var m = Math.floor(u[g - 1] / s) - Math.floor(u[g] / s),
            b = u[g - 1] % s - u[g] % s;
        p.push(h.offsetToDir(b, m))
    }
    return t[i.y][i.x] = f, p
}, h.pushOpen = function (t, e, i, a, n) {
    var s = r.length;
    r.push([t, e, i, a, n]), h.trimOpen(s)
}, h.trimOpen = function (t) {
    for (var e, i; t > 1 && r[e = t >> 1][1] > r[t][1];) i = r[e], r[e] = r[t], r[t] = i, t = e
}, h.pushRound = function (t) {
    for (var e = t[0], i = e.x + e.y * s, r = t[4], c = t[2], d = 0; d < 4; d++) {
        var l = e.x + f[d][0],
            u = e.y + f[d][1],
            p = c + 1;
        if (!(l < 0 || l >= s || u < 0 || u >= o)) {
            var g = Math.abs(l - n.x) + Math.abs(u - n.y),
                m = g;
            r != d && (m++, p += .5), number_arr[u][l] % 2 == 1 ? (m += 70 * (1 + .01 * g), p += 1) : 0 != number_arr[u][l] && (m += 50 * (1 + .01 * g)), m = c + 1.01 * m, h.inClose({
                x: l,
                y: u
            }) || h.pushOpen({
                x: l,
                y: u
            }, m, p, i, d)
        }
    }
}, h.popOpen = function () {
    for (var t = 1, e = r.length; 2 * t < e;) 2 * t + 1 >= e || r[2 * t][1] < r[2 * t + 1][1] ? (r[t] = r[2 * t], t <<= 1) : (r[t] = r[2 * t + 1], t = 2 * t + 1);
    r[t] = r[r.length - 1], r.length--, t != r.length && h.trimOpen(t)
}, h.pushClose = function (t) {
    var e = t[0].x + t[0].y * s;
    c[e] = t[3]
}, h.offsetToDir = function (t, e) {
    return 0 == t ? 1 == e ? ft.DIRUP : ft.DIRDOWN : 1 == t ? ft.DIRRIGHT : ft.DIRLEFT
}, h.inClose = function (t) {
    var e = t.y * s + t.x;
    return void 0 != c[e]
}, e.exports = h
