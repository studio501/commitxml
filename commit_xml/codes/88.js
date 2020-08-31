

var number_arr = t("./utils"),
    n = t("minimalistic-assert");

function s(t, e, i) {
    if (!(this instanceof s)) return new s(t, e, i);
    this.Hash = t, this.blockSize = t.blockSize / 8, this.outSize = t.outSize / 8, this.inner = null, this.outer = null, this._init(number_arr.toArray(e, i))
}
e.exports = s, s.prototype._init = function (t) {
    t.length > this.blockSize && (t = (new this.Hash).update(t).digest()), n(t.length <= this.blockSize);
    for (var e = t.length; e < this.blockSize; e++) t.push(0);
    for (e = 0; e < t.length; e++) t[e] ^= 54;
    for (this.inner = (new this.Hash).update(t), e = 0; e < t.length; e++) t[e] ^= 106;
    this.outer = (new this.Hash).update(t)
}, s.prototype.update = function (t, e) {
    return this.inner.update(t, e), this
}, s.prototype.digest = function (t) {
    return this.outer.update(this.inner.digest()), this.outer.digest(t)
}
