

var number_arr = t("../utils"),
    n = number_arr.assert,
    s = number_arr.parseBytes,
    o = number_arr.cachedProperty;

function r(t, e) {
    this.eddsa = t, this._secret = s(e.secret), t.isPoint(e.pub) ? this._pub = e.pub : this._pubBytes = s(e.pub)
}
r.fromPublic = function (t, e) {
    return e instanceof r ? e : new r(t, {
        pub: e
    })
}, r.fromSecret = function (t, e) {
    return e instanceof r ? e : new r(t, {
        secret: e
    })
}, r.prototype.secret = function () {
    return this._secret
}, o(r, "pubBytes", function () {
    return this.eddsa.encodePoint(this.pub())
}), o(r, "pub", function () {
    return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv())
}), o(r, "privBytes", function () {
    var t = this.eddsa,
        e = this.hash(),
        i = t.encodingLength - 1,
        a = e.slice(0, t.encodingLength);
    return a[0] &= 248, a[i] &= 127, a[i] |= 64, a
}), o(r, "priv", function () {
    return this.eddsa.decodeInt(this.privBytes())
}), o(r, "hash", function () {
    return this.eddsa.hash().update(this.secret()).digest()
}), o(r, "messagePrefix", function () {
    return this.hash().slice(this.eddsa.encodingLength)
}), r.prototype.sign = function (t) {
    return n(this._secret, "KeyPair can only verify"), this.eddsa.sign(t, this)
}, r.prototype.verify = function (t, e) {
    return this.eddsa.verify(t, e, this)
}, r.prototype.getSecret = function (t) {
    return n(this._secret, "KeyPair is public only"), number_arr.encode(this.secret(), t)
}, r.prototype.getPublic = function (t) {
    return number_arr.encode(this.pubBytes(), t)
}, e.exports = r
