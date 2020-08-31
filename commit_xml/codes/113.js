
            (function (i, a) {
                var n, s = t("./precondition"),
                    o = t("./default-encoding"),
                    r = t("./sync"),
                    c = t("safe-buffer").Buffer,
                    h = a.crypto && a.crypto.subtle,
                    f = {
                        sha: "SHA-1",
                        "sha-1": "SHA-1",
                        sha1: "SHA-1",
                        sha256: "SHA-256",
                        "sha-256": "SHA-256",
                        sha384: "SHA-384",
                        "sha-384": "SHA-384",
                        "sha-512": "SHA-512",
                        sha512: "SHA-512"
                    },
                    d = [];

                function l(t) {
                    if (a.process && !a.process.browser) return Promise.resolve(!1);
                    if (!h || !h.importKey || !h.deriveBits) return Promise.resolve(!1);
                    if (void 0 !== d[t]) return d[t];
                    var e = u(n = n || c.alloc(8), n, 10, 128, t).then(function () {
                        return !0
                    }).catch(function () {
                        return !1
                    });
                    return d[t] = e, e
                }

                function u(t, e, i, a, n) {
                    return h.importKey("raw", t, {
                        name: "PBKDF2"
                    }, !1, ["deriveBits"]).then(function (t) {
                        return h.deriveBits({
                            name: "PBKDF2",
                            salt: e,
                            iterations: i,
                            hash: {
                                name: n
                            }
                        }, t, a << 3)
                    }).then(function (t) {
                        return c.from(t)
                    })
                }

                function p(t, e) {
                    t.then(function (t) {
                        i.nextTick(function () {
                            e(null, t)
                        })
                    }, function (t) {
                        i.nextTick(function () {
                            e(t)
                        })
                    })
                }
                e.exports = function (t, e, n, h, d, g) {
                    "function" == typeof d && (g = d, d = void 0);
                    var m = f[(d = d || "sha1").toLowerCase()];
                    if (!m || "function" != typeof a.Promise) return i.nextTick(function () {
                        var i;
                        try {
                            i = r(t, e, n, h, d)
                        } catch (t) {
                            return g(t)
                        }
                        g(null, i)
                    });
                    if (s(t, e, n, h), "function" != typeof g) throw new Error("No callback provided to pbkdf2");
                    c.isBuffer(t) || (t = c.from(t, o)), c.isBuffer(e) || (e = c.from(e, o)), p(l(m).then(function (i) {
                        return i ? u(t, e, n, h, m) : r(t, e, n, h, d)
                    }), g)
                }
            }).call(this, t("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        