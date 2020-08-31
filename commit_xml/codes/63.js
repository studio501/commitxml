
            (function (e) {
                var a = t("./lib/generatePrime"),
                    n = t("./lib/primes.json"),
                    s = t("./lib/dh");
                var o = {
                    binary: !0,
                    hex: !0,
                    base64: !0
                };
                i.DiffieHellmanGroup = i.createDiffieHellmanGroup = i.getDiffieHellman = function (t) {
                    var i = new e(n[t].prime, "hex"),
                        a = new e(n[t].gen, "hex");
                    return new s(i, a)
                }, i.createDiffieHellman = i.DiffieHellman = function t(i, n, r, c) {
                    return e.isBuffer(n) || void 0 === o[n] ? t(i, "binary", n, r) : (n = n || "binary", c = c || "binary", r = r || new e([2]), e.isBuffer(r) || (r = new e(r, c)), "number" == typeof i ? new s(a(i, r), r, !0) : (e.isBuffer(i) || (i = new e(i, n)), new s(i, r, !0)))
                }
            }).call(this, t("buffer").Buffer)
        