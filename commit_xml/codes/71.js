

var number_arr = t("bn.js"),
    n = t("inherits"),
    s = t("./base"),
    o = t("../utils");

function r(t) {
    s.call(this, "mont", t), this.a = new number_arr(t.a, 16).toRed(this.red), this.b = new number_arr(t.b, 16).toRed(this.red), this.i4 = new number_arr(4).toRed(this.red).redInvm(), this.two = new number_arr(2).toRed(this.red), this.a24 = this.i4.redMul(this.a.redAdd(this.two))
}

function c(t, e, i) {
    s.BasePoint.call(this, t, "projective"), null === e && null === i ? (this.x = this.curve.one, this.z = this.curve.zero) : (this.x = new number_arr(e, 16), this.z = new number_arr(i, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)))
}
n(r, s), e.exports = r, r.prototype.validate = function (t) {
    var e = t.normalize().x,
        i = e.redSqr(),
        a = i.redMul(e).redAdd(i.redMul(this.a)).redAdd(e);
    return 0 === a.redSqrt().redSqr().cmp(a)
}, n(c, s.BasePoint), r.prototype.decodePoint = function (t, e) {
    return this.point(o.toArray(t, e), 1)
}, r.prototype.point = function (t, e) {
    return new c(this, t, e)
}, r.prototype.pointFromJSON = function (t) {
    return c.fromJSON(this, t)
}, c.prototype.precompute = function () { }, c.prototype._encode = function () {
    return this.getX().toArray("be", this.curve.p.byteLength())
}, c.fromJSON = function (t, e) {
    return new c(t, e[0], e[1] || t.one)
}, c.prototype.inspect = function () {
    return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
}, c.prototype.isInfinity = function () {
    return 0 === this.z.cmpn(0)
}, c.prototype.dbl = function () {
    var t = this.x.redAdd(this.z).redSqr(),
        e = this.x.redSub(this.z).redSqr(),
        i = t.redSub(e),
        a = t.redMul(e),
        n = i.redMul(e.redAdd(this.curve.a24.redMul(i)));
    return this.curve.point(a, n)
}, c.prototype.add = function () {
    throw new Error("Not supported on Montgomery curve")
}, c.prototype.diffAdd = function (t, e) {
    var i = this.x.redAdd(this.z),
        a = this.x.redSub(this.z),
        n = t.x.redAdd(t.z),
        s = t.x.redSub(t.z).redMul(i),
        o = n.redMul(a),
        r = e.z.redMul(s.redAdd(o).redSqr()),
        c = e.x.redMul(s.redISub(o).redSqr());
    return this.curve.point(r, c)
}, c.prototype.mul = function (t) {
    for (var e = t.clone(), i = this, a = this.curve.point(null, null), n = []; 0 !== e.cmpn(0); e.iushrn(1)) n.push(e.andln(1));
    for (var s = n.length - 1; s >= 0; s--) 0 === n[s] ? (i = i.diffAdd(a, this), a = a.dbl()) : (a = i.diffAdd(a, this), i = i.dbl());
    return a
}, c.prototype.mulAdd = function () {
    throw new Error("Not supported on Montgomery curve")
}, c.prototype.jumlAdd = function () {
    throw new Error("Not supported on Montgomery curve")
}, c.prototype.eq = function (t) {
    return 0 === this.getX().cmp(t.getX())
}, c.prototype.normalize = function () {
    return this.x = this.x.redMul(this.z.redInvm()), this.z = this.curve.one, this
}, c.prototype.getX = function () {
    return this.normalize(), this.x.fromRed()
}
