

var number_arr = t("../utils"),
    n = t("bn.js"),
    s = t("inherits"),
    o = t("./base"),
    r = number_arr.assert;

function c(t) {
    o.call(this, "short", t), this.a = new n(t.a, 16).toRed(this.red), this.b = new n(t.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = 0 === this.a.fromRed().cmpn(0), this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3), this.endo = this._getEndomorphism(t), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4)
}

function h(t, e, i, a) {
    o.BasePoint.call(this, t, "affine"), null === e && null === i ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new n(e, 16), this.y = new n(i, 16), a && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1)
}

function f(t, e, i, a) {
    o.BasePoint.call(this, t, "jacobian"), null === e && null === i && null === a ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new n(0)) : (this.x = new n(e, 16), this.y = new n(i, 16), this.z = new n(a, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one
}
s(c, o), e.exports = c, c.prototype._getEndomorphism = function (t) {
    if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
        var e, i;
        if (t.beta) e = new n(t.beta, 16).toRed(this.red);
        else {
            var a = this._getEndoRoots(this.p);
            e = (e = a[0].cmp(a[1]) < 0 ? a[0] : a[1]).toRed(this.red)
        }
        if (t.lambda) i = new n(t.lambda, 16);
        else {
            var s = this._getEndoRoots(this.n);
            0 === this.g.mul(s[0]).x.cmp(this.g.x.redMul(e)) ? i = s[0] : (i = s[1], r(0 === this.g.mul(i).x.cmp(this.g.x.redMul(e))))
        }
        return {
            beta: e,
            lambda: i,
            basis: t.basis ? t.basis.map(function (t) {
                return {
                    a: new n(t.a, 16),
                    b: new n(t.b, 16)
                }
            }) : this._getEndoBasis(i)
        }
    }
}, c.prototype._getEndoRoots = function (t) {
    var e = t === this.p ? this.red : n.mont(t),
        i = new n(2).toRed(e).redInvm(),
        a = i.redNeg(),
        s = new n(3).toRed(e).redNeg().redSqrt().redMul(i);
    return [a.redAdd(s).fromRed(), a.redSub(s).fromRed()]
}, c.prototype._getEndoBasis = function (t) {
    for (var e, i, a, s, o, r, c, h, f, d = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), l = t, u = this.n.clone(), p = new n(1), g = new n(0), m = new n(0), b = new n(1), v = 0; 0 !== l.cmpn(0);) {
        var y = u.div(l);
        h = u.sub(y.mul(l)), f = m.sub(y.mul(p));
        var _ = b.sub(y.mul(g));
        if (!a && h.cmp(d) < 0) e = c.neg(), i = p, a = h.neg(), s = f;
        else if (a && 2 == ++v) break;
        c = h, u = l, l = h, m = p, p = f, b = g, g = _
    }
    o = h.neg(), r = f;
    var x = a.sqr().add(s.sqr());
    return o.sqr().add(r.sqr()).cmp(x) >= 0 && (o = e, r = i), a.negative && (a = a.neg(), s = s.neg()), o.negative && (o = o.neg(), r = r.neg()), [{
        a: a,
        b: s
    }, {
        a: o,
        b: r
    }]
}, c.prototype._endoSplit = function (t) {
    var e = this.endo.basis,
        i = e[0],
        a = e[1],
        n = a.b.mul(t).divRound(this.n),
        s = i.b.neg().mul(t).divRound(this.n),
        o = n.mul(i.a),
        r = s.mul(a.a),
        c = n.mul(i.b),
        h = s.mul(a.b);
    return {
        k1: t.sub(o).sub(r),
        k2: c.add(h).neg()
    }
}, c.prototype.pointFromX = function (t, e) {
    (t = new n(t, 16)).red || (t = t.toRed(this.red));
    var i = t.redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b),
        a = i.redSqrt();
    if (0 !== a.redSqr().redSub(i).cmp(this.zero)) throw new Error("invalid point");
    var s = a.fromRed().isOdd();
    return (e && !s || !e && s) && (a = a.redNeg()), this.point(t, a)
}, c.prototype.validate = function (t) {
    if (t.inf) return !0;
    var e = t.x,
        i = t.y,
        a = this.a.redMul(e),
        n = e.redSqr().redMul(e).redIAdd(a).redIAdd(this.b);
    return 0 === i.redSqr().redISub(n).cmpn(0)
}, c.prototype._endoWnafMulAdd = function (t, e, i) {
    for (var a = this._endoWnafT1, n = this._endoWnafT2, s = 0; s < t.length; s++) {
        var o = this._endoSplit(e[s]),
            r = t[s],
            c = r._getBeta();
        o.k1.negative && (o.k1.ineg(), r = r.neg(!0)), o.k2.negative && (o.k2.ineg(), c = c.neg(!0)), a[2 * s] = r, a[2 * s + 1] = c, n[2 * s] = o.k1, n[2 * s + 1] = o.k2
    }
    for (var h = this._wnafMulAdd(1, a, n, 2 * s, i), f = 0; f < 2 * s; f++) a[f] = null, n[f] = null;
    return h
}, s(h, o.BasePoint), c.prototype.point = function (t, e, i) {
    return new h(this, t, e, i)
}, c.prototype.pointFromJSON = function (t, e) {
    return h.fromJSON(this, t, e)
}, h.prototype._getBeta = function () {
    if (this.curve.endo) {
        var t = this.precomputed;
        if (t && t.beta) return t.beta;
        var e = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
        if (t) {
            var i = this.curve,
                a = function (t) {
                    return i.point(t.x.redMul(i.endo.beta), t.y)
                };
            t.beta = e, e.precomputed = {
                beta: null,
                naf: t.naf && {
                    wnd: t.naf.wnd,
                    points: t.naf.points.map(a)
                },
                doubles: t.doubles && {
                    step: t.doubles.step,
                    points: t.doubles.points.map(a)
                }
            }
        }
        return e
    }
}, h.prototype.toJSON = function () {
    return this.precomputed ? [this.x, this.y, this.precomputed && {
        doubles: this.precomputed.doubles && {
            step: this.precomputed.doubles.step,
            points: this.precomputed.doubles.points.slice(1)
        },
        naf: this.precomputed.naf && {
            wnd: this.precomputed.naf.wnd,
            points: this.precomputed.naf.points.slice(1)
        }
    }] : [this.x, this.y]
}, h.fromJSON = function (t, e, i) {
    "string" == typeof e && (e = JSON.parse(e));
    var a = t.point(e[0], e[1], i);
    if (!e[2]) return a;

    function n(e) {
        return t.point(e[0], e[1], i)
    }
    var s = e[2];
    return a.precomputed = {
        beta: null,
        doubles: s.doubles && {
            step: s.doubles.step,
            points: [a].concat(s.doubles.points.map(n))
        },
        naf: s.naf && {
            wnd: s.naf.wnd,
            points: [a].concat(s.naf.points.map(n))
        }
    }, a
}, h.prototype.inspect = function () {
    return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">"
}, h.prototype.isInfinity = function () {
    return this.inf
}, h.prototype.add = function (t) {
    if (this.inf) return t;
    if (t.inf) return this;
    if (this.eq(t)) return this.dbl();
    if (this.neg().eq(t)) return this.curve.point(null, null);
    if (0 === this.x.cmp(t.x)) return this.curve.point(null, null);
    var e = this.y.redSub(t.y);
    0 !== e.cmpn(0) && (e = e.redMul(this.x.redSub(t.x).redInvm()));
    var i = e.redSqr().redISub(this.x).redISub(t.x),
        a = e.redMul(this.x.redSub(i)).redISub(this.y);
    return this.curve.point(i, a)
}, h.prototype.dbl = function () {
    if (this.inf) return this;
    var t = this.y.redAdd(this.y);
    if (0 === t.cmpn(0)) return this.curve.point(null, null);
    var e = this.curve.a,
        i = this.x.redSqr(),
        a = t.redInvm(),
        n = i.redAdd(i).redIAdd(i).redIAdd(e).redMul(a),
        s = n.redSqr().redISub(this.x.redAdd(this.x)),
        o = n.redMul(this.x.redSub(s)).redISub(this.y);
    return this.curve.point(s, o)
}, h.prototype.getX = function () {
    return this.x.fromRed()
}, h.prototype.getY = function () {
    return this.y.fromRed()
}, h.prototype.mul = function (t) {
    return t = new n(t, 16), this.isInfinity() ? this : this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [t]) : this.curve._wnafMul(this, t)
}, h.prototype.mulAdd = function (t, e, i) {
    var a = [this, e],
        n = [t, i];
    return this.curve.endo ? this.curve._endoWnafMulAdd(a, n) : this.curve._wnafMulAdd(1, a, n, 2)
}, h.prototype.jmulAdd = function (t, e, i) {
    var a = [this, e],
        n = [t, i];
    return this.curve.endo ? this.curve._endoWnafMulAdd(a, n, !0) : this.curve._wnafMulAdd(1, a, n, 2, !0)
}, h.prototype.eq = function (t) {
    return this === t || this.inf === t.inf && (this.inf || 0 === this.x.cmp(t.x) && 0 === this.y.cmp(t.y))
}, h.prototype.neg = function (t) {
    if (this.inf) return this;
    var e = this.curve.point(this.x, this.y.redNeg());
    if (t && this.precomputed) {
        var i = this.precomputed,
            a = function (t) {
                return t.neg()
            };
        e.precomputed = {
            naf: i.naf && {
                wnd: i.naf.wnd,
                points: i.naf.points.map(a)
            },
            doubles: i.doubles && {
                step: i.doubles.step,
                points: i.doubles.points.map(a)
            }
        }
    }
    return e
}, h.prototype.toJ = function () {
    return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one)
}, s(f, o.BasePoint), c.prototype.jpoint = function (t, e, i) {
    return new f(this, t, e, i)
}, f.prototype.toP = function () {
    if (this.isInfinity()) return this.curve.point(null, null);
    var t = this.z.redInvm(),
        e = t.redSqr(),
        i = this.x.redMul(e),
        a = this.y.redMul(e).redMul(t);
    return this.curve.point(i, a)
}, f.prototype.neg = function () {
    return this.curve.jpoint(this.x, this.y.redNeg(), this.z)
}, f.prototype.add = function (t) {
    if (this.isInfinity()) return t;
    if (t.isInfinity()) return this;
    var e = t.z.redSqr(),
        i = this.z.redSqr(),
        a = this.x.redMul(e),
        n = t.x.redMul(i),
        s = this.y.redMul(e.redMul(t.z)),
        o = t.y.redMul(i.redMul(this.z)),
        r = a.redSub(n),
        c = s.redSub(o);
    if (0 === r.cmpn(0)) return 0 !== c.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
    var h = r.redSqr(),
        f = h.redMul(r),
        d = a.redMul(h),
        l = c.redSqr().redIAdd(f).redISub(d).redISub(d),
        u = c.redMul(d.redISub(l)).redISub(s.redMul(f)),
        p = this.z.redMul(t.z).redMul(r);
    return this.curve.jpoint(l, u, p)
}, f.prototype.mixedAdd = function (t) {
    if (this.isInfinity()) return t.toJ();
    if (t.isInfinity()) return this;
    var e = this.z.redSqr(),
        i = this.x,
        a = t.x.redMul(e),
        n = this.y,
        s = t.y.redMul(e).redMul(this.z),
        o = i.redSub(a),
        r = n.redSub(s);
    if (0 === o.cmpn(0)) return 0 !== r.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
    var c = o.redSqr(),
        h = c.redMul(o),
        f = i.redMul(c),
        d = r.redSqr().redIAdd(h).redISub(f).redISub(f),
        l = r.redMul(f.redISub(d)).redISub(n.redMul(h)),
        u = this.z.redMul(o);
    return this.curve.jpoint(d, l, u)
}, f.prototype.dblp = function (t) {
    if (0 === t) return this;
    if (this.isInfinity()) return this;
    if (!t) return this.dbl();
    if (this.curve.zeroA || this.curve.threeA) {
        for (var e = this, i = 0; i < t; i++) e = e.dbl();
        return e
    }
    var a = this.curve.a,
        n = this.curve.tinv,
        s = this.x,
        o = this.y,
        r = this.z,
        c = r.redSqr().redSqr(),
        h = o.redAdd(o);
    for (i = 0; i < t; i++) {
        var f = s.redSqr(),
            d = h.redSqr(),
            l = d.redSqr(),
            u = f.redAdd(f).redIAdd(f).redIAdd(a.redMul(c)),
            p = s.redMul(d),
            g = u.redSqr().redISub(p.redAdd(p)),
            m = p.redISub(g),
            b = u.redMul(m);
        b = b.redIAdd(b).redISub(l);
        var v = h.redMul(r);
        i + 1 < t && (c = c.redMul(l)), s = g, r = v, h = b
    }
    return this.curve.jpoint(s, h.redMul(n), r)
}, f.prototype.dbl = function () {
    return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl()
}, f.prototype._zeroDbl = function () {
    var t, e, i;
    if (this.zOne) {
        var a = this.x.redSqr(),
            n = this.y.redSqr(),
            s = n.redSqr(),
            o = this.x.redAdd(n).redSqr().redISub(a).redISub(s);
        o = o.redIAdd(o);
        var r = a.redAdd(a).redIAdd(a),
            c = r.redSqr().redISub(o).redISub(o),
            h = s.redIAdd(s);
        h = (h = h.redIAdd(h)).redIAdd(h), t = c, e = r.redMul(o.redISub(c)).redISub(h), i = this.y.redAdd(this.y)
    } else {
        var f = this.x.redSqr(),
            d = this.y.redSqr(),
            l = d.redSqr(),
            u = this.x.redAdd(d).redSqr().redISub(f).redISub(l);
        u = u.redIAdd(u);
        var p = f.redAdd(f).redIAdd(f),
            g = p.redSqr(),
            m = l.redIAdd(l);
        m = (m = m.redIAdd(m)).redIAdd(m), t = g.redISub(u).redISub(u), e = p.redMul(u.redISub(t)).redISub(m), i = (i = this.y.redMul(this.z)).redIAdd(i)
    }
    return this.curve.jpoint(t, e, i)
}, f.prototype._threeDbl = function () {
    var t, e, i;
    if (this.zOne) {
        var a = this.x.redSqr(),
            n = this.y.redSqr(),
            s = n.redSqr(),
            o = this.x.redAdd(n).redSqr().redISub(a).redISub(s);
        o = o.redIAdd(o);
        var r = a.redAdd(a).redIAdd(a).redIAdd(this.curve.a),
            c = r.redSqr().redISub(o).redISub(o);
        t = c;
        var h = s.redIAdd(s);
        h = (h = h.redIAdd(h)).redIAdd(h), e = r.redMul(o.redISub(c)).redISub(h), i = this.y.redAdd(this.y)
    } else {
        var f = this.z.redSqr(),
            d = this.y.redSqr(),
            l = this.x.redMul(d),
            u = this.x.redSub(f).redMul(this.x.redAdd(f));
        u = u.redAdd(u).redIAdd(u);
        var p = l.redIAdd(l),
            g = (p = p.redIAdd(p)).redAdd(p);
        t = u.redSqr().redISub(g), i = this.y.redAdd(this.z).redSqr().redISub(d).redISub(f);
        var m = d.redSqr();
        m = (m = (m = m.redIAdd(m)).redIAdd(m)).redIAdd(m), e = u.redMul(p.redISub(t)).redISub(m)
    }
    return this.curve.jpoint(t, e, i)
}, f.prototype._dbl = function () {
    var t = this.curve.a,
        e = this.x,
        i = this.y,
        a = this.z,
        n = a.redSqr().redSqr(),
        s = e.redSqr(),
        o = i.redSqr(),
        r = s.redAdd(s).redIAdd(s).redIAdd(t.redMul(n)),
        c = e.redAdd(e),
        h = (c = c.redIAdd(c)).redMul(o),
        f = r.redSqr().redISub(h.redAdd(h)),
        d = h.redISub(f),
        l = o.redSqr();
    l = (l = (l = l.redIAdd(l)).redIAdd(l)).redIAdd(l);
    var u = r.redMul(d).redISub(l),
        p = i.redAdd(i).redMul(a);
    return this.curve.jpoint(f, u, p)
}, f.prototype.trpl = function () {
    if (!this.curve.zeroA) return this.dbl().add(this);
    var t = this.x.redSqr(),
        e = this.y.redSqr(),
        i = this.z.redSqr(),
        a = e.redSqr(),
        n = t.redAdd(t).redIAdd(t),
        s = n.redSqr(),
        o = this.x.redAdd(e).redSqr().redISub(t).redISub(a),
        r = (o = (o = (o = o.redIAdd(o)).redAdd(o).redIAdd(o)).redISub(s)).redSqr(),
        c = a.redIAdd(a);
    c = (c = (c = c.redIAdd(c)).redIAdd(c)).redIAdd(c);
    var h = n.redIAdd(o).redSqr().redISub(s).redISub(r).redISub(c),
        f = e.redMul(h);
    f = (f = f.redIAdd(f)).redIAdd(f);
    var d = this.x.redMul(r).redISub(f);
    d = (d = d.redIAdd(d)).redIAdd(d);
    var l = this.y.redMul(h.redMul(c.redISub(h)).redISub(o.redMul(r)));
    l = (l = (l = l.redIAdd(l)).redIAdd(l)).redIAdd(l);
    var u = this.z.redAdd(o).redSqr().redISub(i).redISub(r);
    return this.curve.jpoint(d, l, u)
}, f.prototype.mul = function (t, e) {
    return t = new n(t, e), this.curve._wnafMul(this, t)
}, f.prototype.eq = function (t) {
    if ("affine" === t.type) return this.eq(t.toJ());
    if (this === t) return !0;
    var e = this.z.redSqr(),
        i = t.z.redSqr();
    if (0 !== this.x.redMul(i).redISub(t.x.redMul(e)).cmpn(0)) return !1;
    var a = e.redMul(this.z),
        n = i.redMul(t.z);
    return 0 === this.y.redMul(n).redISub(t.y.redMul(a)).cmpn(0)
}, f.prototype.eqXToP = function (t) {
    var e = this.z.redSqr(),
        i = t.toRed(this.curve.red).redMul(e);
    if (0 === this.x.cmp(i)) return !0;
    for (var a = t.clone(), n = this.curve.redN.redMul(e); ;) {
        if (a.iadd(this.curve.n), a.cmp(this.curve.p) >= 0) return !1;
        if (i.redIAdd(n), 0 === this.x.cmp(i)) return !0
    }
}, f.prototype.inspect = function () {
    return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">"
}, f.prototype.isInfinity = function () {
    return 0 === this.z.cmpn(0)
}
