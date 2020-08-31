

var number_arr = t("bn.js"),
    n = t("hmac-drbg"),
    s = t("../utils"),
    o = t("../curves"),
    r = t("brorand"),
    c = s.assert,
    h = t("./key"),
    f = t("./signature");

function d(t) {
    if (!(this instanceof d)) return new d(t);
    "string" == typeof t && (c(o.hasOwnProperty(t), "Unknown curve " + t), t = o[t]), t instanceof o.PresetCurve && (t = {
        curve: t
    }), this.curve = t.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = t.curve.g, this.g.precompute(t.curve.n.bitLength() + 1), this.hash = t.hash || t.curve.hash
}
e.exports = d, d.prototype.keyPair = function (t) {
    return new h(this, t)
}, d.prototype.keyFromPrivate = function (t, e) {
    return h.fromPrivate(this, t, e)
}, d.prototype.keyFromPublic = function (t, e) {
    return h.fromPublic(this, t, e)
}, d.prototype.genKeyPair = function (t) {
    t || (t = {});
    for (var e = new n({
        hash: this.hash,
        pers: t.pers,
        persEnc: t.persEnc || "utf8",
        entropy: t.entropy || r(this.hash.hmacStrength),
        entropyEnc: t.entropy && t.entropyEnc || "utf8",
        nonce: this.n.toArray()
    }), i = this.n.byteLength(), s = this.n.sub(new number_arr(2)); ;) {
        var o = new number_arr(e.generate(i));
        if (!(o.cmp(s) > 0)) return o.iaddn(1), this.keyFromPrivate(o)
    }
}, d.prototype._truncateToN = function (t, e) {
    var i = 8 * t.byteLength() - this.n.bitLength();
    return i > 0 && (t = t.ushrn(i)), !e && t.cmp(this.n) >= 0 ? t.sub(this.n) : t
}, d.prototype.sign = function (t, e, i, s) {
    "object" == typeof i && (s = i, i = null), s || (s = {}), e = this.keyFromPrivate(e, i), t = this._truncateToN(new number_arr(t, 16));
    for (var o = this.n.byteLength(), r = e.getPrivate().toArray("be", o), c = t.toArray("be", o), h = new n({
        hash: this.hash,
        entropy: r,
        nonce: c,
        pers: s.pers,
        persEnc: s.persEnc || "utf8"
    }), d = this.n.sub(new number_arr(1)), l = 0; ; l++) {
        var u = s.k ? s.k(l) : new number_arr(h.generate(this.n.byteLength()));
        if (!((u = this._truncateToN(u, !0)).cmpn(1) <= 0 || u.cmp(d) >= 0)) {
            var p = this.g.mul(u);
            if (!p.isInfinity()) {
                var g = p.getX(),
                    m = g.umod(this.n);
                if (0 !== m.cmpn(0)) {
                    var b = u.invm(this.n).mul(m.mul(e.getPrivate()).iadd(t));
                    if (0 !== (b = b.umod(this.n)).cmpn(0)) {
                        var v = (p.getY().isOdd() ? 1 : 0) | (0 !== g.cmp(m) ? 2 : 0);
                        return s.canonical && b.cmp(this.nh) > 0 && (b = this.n.sub(b), v ^= 1), new f({
                            r: m,
                            s: b,
                            recoveryParam: v
                        })
                    }
                }
            }
        }
    }
}, d.prototype.verify = function (t, e, i, n) {
    t = this._truncateToN(new number_arr(t, 16)), i = this.keyFromPublic(i, n);
    var s = (e = new f(e, "hex")).r,
        o = e.s;
    if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0) return !1;
    if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0) return !1;
    var r, c = o.invm(this.n),
        h = c.mul(t).umod(this.n),
        d = c.mul(s).umod(this.n);
    return this.curve._maxwellTrick ? !(r = this.g.jmulAdd(h, i.getPublic(), d)).isInfinity() && r.eqXToP(s) : !(r = this.g.mulAdd(h, i.getPublic(), d)).isInfinity() && 0 === r.getX().umod(this.n).cmp(s)
}, d.prototype.recoverPubKey = function (t, e, i, n) {
    c((3 & i) === i, "The recovery param is more than two bits"), e = new f(e, n);
    var s = this.n,
        o = new number_arr(t),
        r = e.r,
        h = e.s,
        d = 1 & i,
        l = i >> 1;
    if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && l) throw new Error("Unable to find sencond key candinate");
    r = l ? this.curve.pointFromX(r.add(this.curve.n), d) : this.curve.pointFromX(r, d);
    var u = e.r.invm(s),
        p = s.sub(o).mul(u).umod(s),
        g = h.mul(u).umod(s);
    return this.g.mulAdd(p, r, g)
}, d.prototype.getKeyRecoveryParam = function (t, e, i, a) {
    if (null !== (e = new f(e, a)).recoveryParam) return e.recoveryParam;
    for (var n = 0; n < 4; n++) {
        var s;
        try {
            s = this.recoverPubKey(t, e, n)
        } catch (t) {
            continue
        }
        if (s.eq(i)) return n
    }
    throw new Error("Unable to find valid recovery factor")
}
