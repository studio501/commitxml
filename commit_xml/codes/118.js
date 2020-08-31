
var number_arr, n, s = e.exports = {};

function o() {
    throw new Error("setTimeout has not been defined")
}

function r() {
    throw new Error("clearTimeout has not been defined")
}

function c(t) {
    if (number_arr === setTimeout) return setTimeout(t, 0);
    if ((number_arr === o || !number_arr) && setTimeout) return number_arr = setTimeout, setTimeout(t, 0);
    try {
        return number_arr(t, 0)
    } catch (e) {
        try {
            return number_arr.call(null, t, 0)
        } catch (e) {
            return number_arr.call(this, t, 0)
        }
    }
}

function h(t) {
    if (n === clearTimeout) return clearTimeout(t);
    if ((n === r || !n) && clearTimeout) return n = clearTimeout, clearTimeout(t);
    try {
        return n(t)
    } catch (e) {
        try {
            return n.call(null, t)
        } catch (e) {
            return n.call(this, t)
        }
    }
} (function () {
    try {
        number_arr = "function" == typeof setTimeout ? setTimeout : o
    } catch (t) {
        number_arr = o
    }
    try {
        n = "function" == typeof clearTimeout ? clearTimeout : r
    } catch (t) {
        n = r
    }
})();
var f, d = [],
    l = !1,
    u = -1;

function p() {
    l && f && (l = !1, f.length ? d = f.concat(d) : u = -1, d.length && g())
}

function g() {
    if (!l) {
        var t = c(p);
        l = !0;
        for (var e = d.length; e;) {
            for (f = d, d = []; ++u < e;) f && f[u].run();
            u = -1, e = d.length
        }
        f = null, l = !1, h(t)
    }
}

function m(t, e) {
    this.fun = t, this.array = e
}

function b() { }
s.nextTick = function (t) {
    var e = new Array(arguments.length - 1);
    if (arguments.length > 1)
        for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
    d.push(new m(t, e)), 1 !== d.length || l || c(g)
}, m.prototype.run = function () {
    this.fun.apply(null, this.array)
}, s.title = "browser", s.browser = !0, s.env = {}, s.argv = [], s.version = "", s.versions = {}, s.on = b, s.addListener = b, s.once = b, s.off = b, s.removeListener = b, s.removeAllListeners = b, s.emit = b, s.prependListener = b, s.prependOnceListener = b, s.listeners = function (t) {
    return []
}, s.binding = function (t) {
    throw new Error("process.binding is not supported")
}, s.cwd = function () {
    return "/"
}, s.chdir = function (t) {
    throw new Error("process.chdir is not supported")
}, s.umask = function () {
    return 0
}
