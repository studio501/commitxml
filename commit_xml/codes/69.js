

var number_arr = t("../utils"),
    n = t("bn.js"),
    s = t("inherits"),
    o = t("./base"),
    r = number_arr.assert;

function c(t) {
    this.twisted = 1 != (0 | t.a), this.mOneA = this.twisted && -1 == (0 | t.a), this.extended = this.mOneA, o.call(this, "edwards", t), this.a = new n(t.a, 16).umod(this.red.m), this.a = this.a.toRed(this.red), this.c = new n(t.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new n(t.d, 16).toRed(this.red), this.dd = this.d.redAdd(this.d), r(!this.twisted || 0 === this.c.fromRed().cmpn(1)), this.oneC = 1 == (0 | t.c)
}

function h(t, e, i, a, s) {
    o.BasePoint.call(this, t, "projective"), null === e && null === i && null === a ? (this.x = this.curve.zero, this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x = new n(e, 16), this.y = new n(i, 16), this.z = a ? new n(a, 16) : this.curve.one, this.t = s && new n(s, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z.redInvm()))))
}
s(c, o), e.exports = c, c.prototype._mulA = function (t) {
    return this.mOneA ? t.redNeg() : this.a.redMul(t)
}, c.prototype._mulC = function (t) {
    return this.oneC ? t : this.c.redMul(t)
}, c.prototype.jpoint = function (t, e, i, a) {
    return this.point(t, e, i, a)
}, c.prototype.pointFromX = function (t, e) {
    (t = new n(t, 16)).red || (t = t.toRed(this.red));
    var i = t.redSqr(),
        a = this.c2.redSub(this.a.redMul(i)),
        s = this.one.redSub(this.c2.redMul(this.d).redMul(i)),
        o = a.redMul(s.redInvm()),
        r = o.redSqrt();
    if (0 !== r.redSqr().redSub(o).cmp(this.zero)) throw new Error("invalid point");
    var c = r.fromRed().isOdd();
    return (e && !c || !e && c) && (r = r.redNeg()), this.point(t, r)
}, c.prototype.pointFromY = function (t, e) {
    (t = new n(t, 16)).red || (t = t.toRed(this.red));
    var i = t.redSqr(),
        a = i.redSub(this.c2),
        s = i.redMul(this.d).redMul(this.c2).redSub(this.a),
        o = a.redMul(s.redInvm());
    if (0 === o.cmp(this.zero)) {
        if (e) throw new Error("invalid point");
        return this.point(this.zero, t)
    }
    var r = o.redSqrt();
    if (0 !== r.redSqr().redSub(o).cmp(this.zero)) throw new Error("invalid point");
    return r.fromRed().isOdd() !== e && (r = r.redNeg()), this.point(r, t)
}, c.prototype.validate = function (t) {
    if (t.isInfinity()) return !0;
    t.normalize();
    var e = t.x.redSqr(),
        i = t.y.redSqr(),
        a = e.redMul(this.a).redAdd(i),
        n = this.c2.redMul(this.one.redAdd(this.d.redMul(e).redMul(i)));
    return 0 === a.cmp(n)
}, s(h, o.BasePoint), c.prototype.pointFromJSON = function (t) {
    return h.fromJSON(this, t)
}, c.prototype.point = function (t, e, i, a) {
    return new h(this, t, e, i, a)
}, h.fromJSON = function (t, e) {
    return new h(t, e[0], e[1], e[2])
}, h.prototype.inspect = function () {
    return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
}, h.prototype.isInfinity = function () {
    return 0 === this.x.cmpn(0) && (0 === this.y.cmp(this.z) || this.zOne && 0 === this.y.cmp(this.curve.c))
}, h.prototype._extDbl = function () {
    var t = this.x.redSqr(),
        e = this.y.redSqr(),
        i = this.z.redSqr();
    i = i.redIAdd(i);
    var a = this.curve._mulA(t),
        n = this.x.redAdd(this.y).redSqr().redISub(t).redISub(e),
        s = a.redAdd(e),
        o = s.redSub(i),
        r = a.redSub(e),
        c = n.redMul(o),
        h = s.redMul(r),
        f = n.redMul(r),
        d = o.redMul(s);
    return this.curve.point(c, h, d, f)
}, h.prototype._projDbl = function () {
    var t, e, i, a = this.x.redAdd(this.y).redSqr(),
        n = this.x.redSqr(),
        s = this.y.redSqr();
    if (this.curve.twisted) {
        var o = (h = this.curve._mulA(n)).redAdd(s);
        if (this.zOne) t = a.redSub(n).redSub(s).redMul(o.redSub(this.curve.two)), e = o.redMul(h.redSub(s)), i = o.redSqr().redSub(o).redSub(o);
        else {
            var r = this.z.redSqr(),
                c = o.redSub(r).redISub(r);
            t = a.redSub(n).redISub(s).redMul(c), e = o.redMul(h.redSub(s)), i = o.redMul(c)
        }
    } else {
        var h = n.redAdd(s);
        r = this.curve._mulC(this.z).redSqr(), c = h.redSub(r).redSub(r);
        t = this.curve._mulC(a.redISub(h)).redMul(c), e = this.curve._mulC(h).redMul(n.redISub(s)), i = h.redMul(c)
    }
    return this.curve.point(t, e, i)
}, h.prototype.dbl = function () {
    return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl()
}, h.prototype._extAdd = function (t) {
    var e = this.y.redSub(this.x).redMul(t.y.redSub(t.x)),
        i = this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)),
        a = this.t.redMul(this.curve.dd).redMul(t.t),
        n = this.z.redMul(t.z.redAdd(t.z)),
        s = i.redSub(e),
        o = n.redSub(a),
        r = n.redAdd(a),
        c = i.redAdd(e),
        h = s.redMul(o),
        f = r.redMul(c),
        d = s.redMul(c),
        l = o.redMul(r);
    return this.curve.point(h, f, l, d)
}, h.prototype._projAdd = function (t) {
    var e, i, a = this.z.redMul(t.z),
        n = a.redSqr(),
        s = this.x.redMul(t.x),
        o = this.y.redMul(t.y),
        r = this.curve.d.redMul(s).redMul(o),
        c = n.redSub(r),
        h = n.redAdd(r),
        f = this.x.redAdd(this.y).redMul(t.x.redAdd(t.y)).redISub(s).redISub(o),
        d = a.redMul(c).redMul(f);
    return this.curve.twisted ? (e = a.redMul(h).redMul(o.redSub(this.curve._mulA(s))), i = c.redMul(h)) : (e = a.redMul(h).redMul(o.redSub(s)), i = this.curve._mulC(c).redMul(h)), this.curve.point(d, e, i)
}, h.prototype.add = function (t) {
    return this.isInfinity() ? t : t.isInfinity() ? this : this.curve.extended ? this._extAdd(t) : this._projAdd(t)
}, h.prototype.mul = function (t) {
    return this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve._wnafMul(this, t)
}, h.prototype.mulAdd = function (t, e, i) {
    return this.curve._wnafMulAdd(1, [this, e], [t, i], 2, !1)
}, h.prototype.jmulAdd = function (t, e, i) {
    return this.curve._wnafMulAdd(1, [this, e], [t, i], 2, !0)
}, h.prototype.normalize = function () {
    if (this.zOne) return this;
    var t = this.z.redInvm();
    return this.x = this.x.redMul(t), this.y = this.y.redMul(t), this.t && (this.t = this.t.redMul(t)), this.z = this.curve.one, this.zOne = !0, this
}, h.prototype.neg = function () {
    return this.curve.point(this.x.redNeg(), this.y, this.z, this.t && this.t.redNeg())
}, h.prototype.getX = function () {
    return this.normalize(), this.x.fromRed()
}, h.prototype.getY = function () {
    return this.normalize(), this.y.fromRed()
}, h.prototype.eq = function (t) {
    return this === t || 0 === this.getX().cmp(t.getX()) && 0 === this.getY().cmp(t.getY())
}, h.prototype.eqXToP = function (t) {
    var e = t.toRed(this.curve.red).redMul(this.z);
    if (0 === this.x.cmp(e)) return !0;
    for (var i = t.clone(), a = this.curve.redN.redMul(this.z); ;) {
        if (i.iadd(this.curve.n), i.cmp(this.curve.p) >= 0) return !1;
        if (e.redIAdd(a), 0 === this.x.cmp(e)) return !0
    }
}, h.prototype.toP = h.prototype.normalize, h.prototype.mixedAdd = h.prototype.add
