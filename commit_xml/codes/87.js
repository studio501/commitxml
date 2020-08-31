

var number_arr = t("./utils"),
    n = t("minimalistic-assert");

function s() {
    this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32
}
i.BlockHash = s, s.prototype.update = function (t, e) {
    if (t = number_arr.toArray(t, e), this.pending ? this.pending = this.pending.concat(t) : this.pending = t, this.pendingTotal += t.length, this.pending.length >= this._delta8) {
        var i = (t = this.pending).length % this._delta8;
        this.pending = t.slice(t.length - i, t.length), 0 === this.pending.length && (this.pending = null), t = number_arr.join32(t, 0, t.length - i, this.endian);
        for (var n = 0; n < t.length; n += this._delta32) this._update(t, n, n + this._delta32)
    }
    return this
}, s.prototype.digest = function (t) {
    return this.update(this._pad()), n(null === this.pending), this._digest(t)
}, s.prototype._pad = function () {
    var t = this.pendingTotal,
        e = this._delta8,
        i = e - (t + this.padLength) % e,
        a = new Array(i + this.padLength);
    a[0] = 128;
    for (var n = 1; n < i; n++) a[n] = 0;
    if (t <<= 3, "big" === this.endian) {
        for (var s = 8; s < this.padLength; s++) a[n++] = 0;
        a[n++] = 0, a[n++] = 0, a[n++] = 0, a[n++] = 0, a[n++] = t >>> 24 & 255, a[n++] = t >>> 16 & 255, a[n++] = t >>> 8 & 255, a[n++] = 255 & t
    } else
        for (a[n++] = 255 & t, a[n++] = t >>> 8 & 255, a[n++] = t >>> 16 & 255, a[n++] = t >>> 24 & 255, a[n++] = 0, a[n++] = 0, a[n++] = 0, a[n++] = 0, s = 8; s < this.padLength; s++) a[n++] = 0;
    return a
}
