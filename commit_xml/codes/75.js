

var number_arr = t("bn.js"),
    n = t("../utils").assert;

function s(t, e) {
    this.ec = t, this.priv = null, this.pub = null, e.priv && this._importPrivate(e.priv, e.privEnc), e.pub && this._importPublic(e.pub, e.pubEnc)
}
e.exports = s, s.fromPublic = function (t, e, i) {
    return e instanceof s ? e : new s(t, {
        pub: e,
        pubEnc: i
    })
}, s.fromPrivate = function (t, e, i) {
    return e instanceof s ? e : new s(t, {
        priv: e,
        privEnc: i
    })
}, s.prototype.validate = function () {
    var t = this.getPublic();
    return t.isInfinity() ? {
        result: !1,
        reason: "Invalid public key"
    } : t.validate() ? t.mul(this.ec.curve.n).isInfinity() ? {
        result: !0,
        reason: null
    } : {
            result: !1,
            reason: "Public key * N != O"
        } : {
                result: !1,
                reason: "Public key is not a point"
            }
}, s.prototype.getPublic = function (t, e) {
    return "string" == typeof t && (e = t, t = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), e ? this.pub.encode(e, t) : this.pub
}, s.prototype.getPrivate = function (t) {
    return "hex" === t ? this.priv.toString(16, 2) : this.priv
}, s.prototype._importPrivate = function (t, e) {
    this.priv = new number_arr(t, e || 16), this.priv = this.priv.umod(this.ec.curve.n)
}, s.prototype._importPublic = function (t, e) {
    if (t.x || t.y) return "mont" === this.ec.curve.type ? n(t.x, "Need x coordinate") : "short" !== this.ec.curve.type && "edwards" !== this.ec.curve.type || n(t.x && t.y, "Need both x and y coordinate"), void (this.pub = this.ec.curve.point(t.x, t.y));
    this.pub = this.ec.curve.decodePoint(t, e)
}, s.prototype.derive = function (t) {
    return t.mul(this.priv).getX()
}, s.prototype.sign = function (t, e, i) {
    return this.ec.sign(t, this, e, i)
}, s.prototype.verify = function (t, e) {
    return this.ec.verify(t, e, this)
}, s.prototype.inspect = function () {
    return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >"
}
