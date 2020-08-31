
            (function (i) {
                var a = t("bn.js"),
                    n = t("elliptic").ec,
                    s = t("parse-asn1"),
                    o = t("./curves.json");

                function r(t, e, i) {
                    var a = o[i.data.algorithm.curve.join(".")];
                    if (!a) throw new Error("unknown curve " + i.data.algorithm.curve.join("."));
                    var s = new n(a),
                        r = i.data.subjectPrivateKey.data;
                    return s.verify(e, t, r)
                }

                function c(t, e, i) {
                    var n = i.data.p,
                        o = i.data.q,
                        r = i.data.g,
                        c = i.data.pub_key,
                        f = s.signature.decode(t, "der"),
                        d = f.s,
                        l = f.r;
                    h(d, o), h(l, o);
                    var u = a.mont(n),
                        p = d.invm(o);
                    return 0 === r.toRed(u).redPow(new a(e).mul(p).mod(o)).fromRed().mul(c.toRed(u).redPow(l.mul(p).mod(o)).fromRed()).mod(n).mod(o).cmp(l)
                }

                function h(t, e) {
                    if (t.cmpn(0) <= 0) throw new Error("invalid sig");
                    if (t.cmp(e) >= e) throw new Error("invalid sig")
                }
                e.exports = function (t, e, n, o, h) {
                    var f = s(n);
                    if ("ec" === f.type) {
                        if ("ecdsa" !== o && "ecdsa/rsa" !== o) throw new Error("wrong public key type");
                        return r(t, e, f)
                    }
                    if ("dsa" === f.type) {
                        if ("dsa" !== o) throw new Error("wrong public key type");
                        return c(t, e, f)
                    }
                    if ("rsa" !== o && "ecdsa/rsa" !== o) throw new Error("wrong public key type");
                    e = i.concat([h, e]);
                    for (var d = f.modulus.byteLength(), l = [1], u = 0; e.length + l.length + 2 < d;) l.push(255), u++;
                    l.push(0);
                    for (var p = -1; ++p < e.length;) l.push(e[p]);
                    l = new i(l);
                    var g = a.mont(f.modulus);
                    t = (t = new a(t).toRed(g)).redPow(new a(f.publicExponent)), t = new i(t.fromRed().toArray());
                    var m = u < 8 ? 1 : 0;
                    for (d = Math.min(t.length, l.length), t.length !== l.length && (m = 1), p = -1; ++p < d;) m |= t[p] ^ l[p];
                    return 0 === m
                }
            }).call(this, t("buffer").Buffer)
        