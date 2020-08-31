
            (function (e, a) {
                

                function n() {
                    throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11")
                }
                var s = t("safe-buffer"),
                    o = t("randombytes"),
                    r = s.Buffer,
                    c = s.kMaxLength,
                    h = a.crypto || a.msCrypto,
                    f = Math.pow(2, 32) - 1;

                function d(t, e) {
                    if ("number" != typeof t || t != t) throw new TypeError("offset must be a number");
                    if (t > f || t < 0) throw new TypeError("offset must be a uint32");
                    if (t > c || t > e) throw new RangeError("offset out of range")
                }

                function l(t, e, i) {
                    if ("number" != typeof t || t != t) throw new TypeError("size must be a number");
                    if (t > f || t < 0) throw new TypeError("size must be a uint32");
                    if (t + e > i || t > c) throw new RangeError("buffer too small")
                }

                function u(t, i, a, n) {
                    if (e.browser) {
                        var s = t.buffer,
                            r = new Uint8Array(s, i, a);
                        return h.getRandomValues(r), n ? void e.nextTick(function () {
                            n(null, t)
                        }) : t
                    }
                    if (!n) return o(a).copy(t, i), t;
                    o(a, function (e, a) {
                        if (e) return n(e);
                        a.copy(t, i), n(null, t)
                    })
                }
                h && h.getRandomValues || !e.browser ? (i.randomFill = function (t, e, i, n) {
                    if (!(r.isBuffer(t) || t instanceof a.Uint8Array)) throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
                    if ("function" == typeof e) n = e, e = 0, i = t.length;
                    else if ("function" == typeof i) n = i, i = t.length - e;
                    else if ("function" != typeof n) throw new TypeError('"cb" argument must be a function');
                    return d(e, t.length), l(i, e, t.length), u(t, e, i, n)
                }, i.randomFillSync = function (t, e, i) {
                    void 0 === e && (e = 0);
                    if (!(r.isBuffer(t) || t instanceof a.Uint8Array)) throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
                    d(e, t.length), void 0 === i && (i = t.length - e);
                    return l(i, e, t.length), u(t, e, i)
                }) : (i.randomFill = n, i.randomFillSync = n)
            }).call(this, t("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        