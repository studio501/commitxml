

var number_arr = t("hash.js"),
    n = t("minimalistic-crypto-utils"),
    s = t("minimalistic-assert");

function o(t) {
    if (!(this instanceof o)) return new o(t);
    this.hash = t.hash, this.predResist = !!t.predResist, this.outLen = this.hash.outSize, this.minEntropy = t.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
    var e = n.toArray(t.entropy, t.entropyEnc || "hex"),
        i = n.toArray(t.nonce, t.nonceEnc || "hex"),
        a = n.toArray(t.pers, t.persEnc || "hex");
    s(e.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._init(e, i, a)
}
e.exports = o, o.prototype._init = function (t, e, i) {
    var a = t.concat(e).concat(i);
    this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
    for (var n = 0; n < this.V.length; n++) this.K[n] = 0, this.V[n] = 1;
    this._update(a), this._reseed = 1, this.reseedInterval = 281474976710656
}, o.prototype._hmac = function () {
    return new number_arr.hmac(this.hash, this.K)
}, o.prototype._update = function (t) {
    var e = this._hmac().update(this.V).update([0]);
    t && (e = e.update(t)), this.K = e.digest(), this.V = this._hmac().update(this.V).digest(), t && (this.K = this._hmac().update(this.V).update([1]).update(t).digest(), this.V = this._hmac().update(this.V).digest())
}, o.prototype.reseed = function (t, e, i, a) {
    "string" != typeof e && (a = i, i = e, e = null), t = n.toArray(t, e), i = n.toArray(i, a), s(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._update(t.concat(i || [])), this._reseed = 1
}, o.prototype.generate = function (t, e, i, a) {
    if (this._reseed > this.reseedInterval) throw new Error("Reseed is required");
    "string" != typeof e && (a = i, i = e, e = null), i && (i = n.toArray(i, a || "hex"), this._update(i));
    for (var s = []; s.length < t;) this.V = this._hmac().update(this.V).digest(), s = s.concat(this.V);
    var o = s.slice(0, t);
    return this._update(i), this._reseed++, n.encode(o, e)
}
