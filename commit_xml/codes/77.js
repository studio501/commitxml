

var number_arr = t("hash.js"),
    n = t("../curves"),
    s = t("../utils"),
    o = s.assert,
    r = s.parseBytes,
    c = t("./key"),
    h = t("./signature");

function f(t) {
    if (o("ed25519" === t, "only tested with ed25519 so far"), !(this instanceof f)) return new f(t);
    t = n[t].curve;
    this.curve = t, this.g = t.g, this.g.precompute(t.n.bitLength() + 1), this.pointClass = t.point().constructor, this.encodingLength = Math.ceil(t.n.bitLength() / 8), this.hash = number_arr.sha512
}
e.exports = f, f.prototype.sign = function (t, e) {
    t = r(t);
    var i = this.keyFromSecret(e),
        a = this.hashInt(i.messagePrefix(), t),
        n = this.g.mul(a),
        s = this.encodePoint(n),
        o = this.hashInt(s, i.pubBytes(), t).mul(i.priv()),
        c = a.add(o).umod(this.curve.n);
    return this.makeSignature({
        R: n,
        S: c,
        Rencoded: s
    })
}, f.prototype.verify = function (t, e, i) {
    t = r(t), e = this.makeSignature(e);
    var a = this.keyFromPublic(i),
        n = this.hashInt(e.Rencoded(), a.pubBytes(), t),
        s = this.g.mul(e.S());
    return e.R().add(a.pub().mul(n)).eq(s)
}, f.prototype.hashInt = function () {
    for (var t = this.hash(), e = 0; e < arguments.length; e++) t.update(arguments[e]);
    return s.intFromLE(t.digest()).umod(this.curve.n)
}, f.prototype.keyFromPublic = function (t) {
    return c.fromPublic(this, t)
}, f.prototype.keyFromSecret = function (t) {
    return c.fromSecret(this, t)
}, f.prototype.makeSignature = function (t) {
    return t instanceof h ? t : new h(this, t)
}, f.prototype.encodePoint = function (t) {
    var e = t.getY().toArray("le", this.encodingLength);
    return e[this.encodingLength - 1] |= t.getX().isOdd() ? 128 : 0, e
}, f.prototype.decodePoint = function (t) {
    var e = (t = s.parseBytes(t)).length - 1,
        i = t.slice(0, e).concat(-129 & t[e]),
        a = 0 != (128 & t[e]),
        n = s.intFromLE(i);
    return this.curve.pointFromY(n, a)
}, f.prototype.encodeInt = function (t) {
    return t.toArray("le", this.encodingLength)
}, f.prototype.decodeInt = function (t) {
    return s.intFromLE(t)
}, f.prototype.isPoint = function (t) {
    return t instanceof this.pointClass
}
