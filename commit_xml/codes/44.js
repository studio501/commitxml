
            (function (i) {
                var a = t("create-hmac"),
                    n = t("browserify-rsa"),
                    s = t("elliptic").ec,
                    o = t("bn.js"),
                    r = t("parse-asn1"),
                    c = t("./curves.json");

                function h(t, e) {
                    var a = c[e.curve.join(".")];
                    if (!a) throw new Error("unknown curve " + e.curve.join("."));
                    var n = new s(a).keyFromPrivate(e.privateKey).sign(t);
                    return new i(n.toDER())
                }

                function f(t, e, i) {
                    for (var a, n = e.params.priv_key, s = e.params.p, r = e.params.q, c = e.params.g, h = new o(0), f = u(t, r).mod(r), p = !1, b = l(n, r, t, i); !1 === p;) h = m(c, a = g(r, b, i), s, r), 0 === (p = a.invm(r).imul(f.add(n.mul(h))).mod(r)).cmpn(0) && (p = !1, h = new o(0));
                    return d(h, p)
                }

                function d(t, e) {
                    t = t.toArray(), e = e.toArray(), 128 & t[0] && (t = [0].concat(t)), 128 & e[0] && (e = [0].concat(e));
                    var a = [48, t.length + e.length + 4, 2, t.length];
                    return a = a.concat(t, [2, e.length], e), new i(a)
                }

                function l(t, e, n, s) {
                    if ((t = new i(t.toArray())).length < e.byteLength()) {
                        var o = new i(e.byteLength() - t.length);
                        o.fill(0), t = i.concat([o, t])
                    }
                    var r = n.length,
                        c = p(n, e),
                        h = new i(r);
                    h.fill(1);
                    var f = new i(r);
                    return f.fill(0), f = a(s, f).update(h).update(new i([0])).update(t).update(c).digest(), h = a(s, f).update(h).digest(), {
                        k: f = a(s, f).update(h).update(new i([1])).update(t).update(c).digest(),
                        v: h = a(s, f).update(h).digest()
                    }
                }

                function u(t, e) {
                    var i = new o(t),
                        a = (t.length << 3) - e.bitLength();
                    return a > 0 && i.ishrn(a), i
                }

                function p(t, e) {
                    t = (t = u(t, e)).mod(e);
                    var a = new i(t.toArray());
                    if (a.length < e.byteLength()) {
                        var n = new i(e.byteLength() - a.length);
                        n.fill(0), a = i.concat([n, a])
                    }
                    return a
                }

                function g(t, e, n) {
                    var s, o;
                    do {
                        for (s = new i(0); 8 * s.length < t.bitLength();) e.v = a(n, e.k).update(e.v).digest(), s = i.concat([s, e.v]);
                        o = u(s, t), e.k = a(n, e.k).update(e.v).update(new i([0])).digest(), e.v = a(n, e.k).update(e.v).digest()
                    } while (-1 !== o.cmp(t));
                    return o
                }

                function m(t, e, i, a) {
                    return t.toRed(o.mont(i)).redPow(e).fromRed().mod(a)
                }
                e.exports = function (t, e, a, s, o) {
                    var c = r(e);
                    if (c.curve) {
                        if ("ecdsa" !== s && "ecdsa/rsa" !== s) throw new Error("wrong private key type");
                        return h(t, c)
                    }
                    if ("dsa" === c.type) {
                        if ("dsa" !== s) throw new Error("wrong private key type");
                        return f(t, c, a)
                    }
                    if ("rsa" !== s && "ecdsa/rsa" !== s) throw new Error("wrong private key type");
                    t = i.concat([o, t]);
                    for (var d = c.modulus.byteLength(), l = [0, 1]; t.length + l.length + 1 < d;) l.push(255);
                    l.push(0);
                    for (var u = -1; ++u < t.length;) l.push(t[u]);
                    return n(l, c)
                }, e.exports.getKey = l, e.exports.makeKey = g
            }).call(this, t("buffer").Buffer)
        