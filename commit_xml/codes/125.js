
            (function (i, a) {
                
                var n = 65536,
                    s = 4294967295;
                var o = t("safe-buffer").Buffer,
                    r = a.crypto || a.msCrypto;
                r && r.getRandomValues ? e.exports = function (t, e) {
                    if (t > s) throw new RangeError("requested too many random bytes");
                    var a = o.allocUnsafe(t);
                    if (t > 0)
                        if (t > n)
                            for (var c = 0; c < t; c += n) r.getRandomValues(a.slice(c, c + n));
                        else r.getRandomValues(a);
                    if ("function" == typeof e) return i.nextTick(function () {
                        e(null, a)
                    });
                    return a
                } : e.exports = function () {
                    throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11")
                }
            }).call(this, t("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        