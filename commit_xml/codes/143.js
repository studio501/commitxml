
var number_arr = t("buffer"),
    n = number_arr.Buffer;

function s(t, e) {
    for (var i in t) e[i] = t[i]
}

function o(t, e, i) {
    return n(t, e, i)
}
n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? e.exports = number_arr : (s(number_arr, i), i.Buffer = o), s(n, o), o.from = function (t, e, i) {
    if ("number" == typeof t) throw new TypeError("Argument must not be a number");
    return n(t, e, i)
}, o.alloc = function (t, e, i) {
    if ("number" != typeof t) throw new TypeError("Argument must be a number");
    var a = n(t);
    return void 0 !== e ? "string" == typeof i ? a.fill(e, i) : a.fill(e) : a.fill(0), a
}, o.allocUnsafe = function (t) {
    if ("number" != typeof t) throw new TypeError("Argument must be a number");
    return n(t)
}, o.allocUnsafeSlow = function (t) {
    if ("number" != typeof t) throw new TypeError("Argument must be a number");
    return number_arr.SlowBuffer(t)
}
