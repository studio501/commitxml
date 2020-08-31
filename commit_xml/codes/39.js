
            (function (i) {
                var a = t("bn.js"),
                    n = t("randombytes");

                function s(t) {
                    var e = r(t);
                    return {
                        blinder: e.toRed(a.mont(t.modulus)).redPow(new a(t.publicExponent)).fromRed(),
                        unblinder: e.invm(t.modulus)
                    }
                }

                function o(t, e) {
                    var n = s(e),
                        o = e.modulus.byteLength(),
                        r = (a.mont(e.modulus), new a(t).mul(n.blinder).umod(e.modulus)),
                        c = r.toRed(a.mont(e.prime1)),
                        h = r.toRed(a.mont(e.prime2)),
                        f = e.coefficient,
                        d = e.prime1,
                        l = e.prime2,
                        u = c.redPow(e.exponent1),
                        p = h.redPow(e.exponent2);
                    u = u.fromRed(), p = p.fromRed();
                    var g = u.isub(p).imul(f).umod(d);
                    return g.imul(l), p.iadd(g), new i(p.imul(n.unblinder).umod(e.modulus).toArray(!1, o))
                }

                function r(t) {
                    for (var e = t.modulus.byteLength(), i = new a(n(e)); i.cmp(t.modulus) >= 0 || !i.umod(t.prime1) || !i.umod(t.prime2);) i = new a(n(e));
                    return i
                }
                e.exports = o, o.getr = r
            }).call(this, t("buffer").Buffer)
        