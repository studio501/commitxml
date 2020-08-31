
            (function (t) {
                function i(e) {
                    try {
                        if (!t.localStorage) return !1
                    } catch (t) {
                        return !1
                    }
                    var i = t.localStorage[e];
                    return null != i && "true" === String(i).toLowerCase()
                }
                e.exports = function (t, e) {
                    if (i("noDeprecation")) return t;
                    var a = !1;
                    return function () {
                        if (!a) {
                            if (i("throwDeprecation")) throw new Error(e);
                            i("traceDeprecation") ? console.trace(e) : console.warn(e), a = !0
                        }
                        return t.apply(this, arguments)
                    }
                }
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        