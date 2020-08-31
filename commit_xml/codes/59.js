

var number_arr = t("minimalistic-assert");

function n(t) {
    this.options = t, this.type = this.options.type, this.blockSize = 8, this._init(), this.buffer = new Array(this.blockSize), this.bufferOff = 0
}
e.exports = n, n.prototype._init = function () { }, n.prototype.update = function (t) {
    return 0 === t.length ? [] : "decrypt" === this.type ? this._updateDecrypt(t) : this._updateEncrypt(t)
}, n.prototype._buffer = function (t, e) {
    for (var i = Math.min(this.buffer.length - this.bufferOff, t.length - e), a = 0; a < i; a++) this.buffer[this.bufferOff + a] = t[e + a];
    return this.bufferOff += i, i
}, n.prototype._flushBuffer = function (t, e) {
    return this._update(this.buffer, 0, t, e), this.bufferOff = 0, this.blockSize
}, n.prototype._updateEncrypt = function (t) {
    var e = 0,
        i = 0,
        a = (this.bufferOff + t.length) / this.blockSize | 0,
        n = new Array(a * this.blockSize);
    0 !== this.bufferOff && (e += this._buffer(t, e), this.bufferOff === this.buffer.length && (i += this._flushBuffer(n, i)));
    for (var s = t.length - (t.length - e) % this.blockSize; e < s; e += this.blockSize) this._update(t, e, n, i), i += this.blockSize;
    for (; e < t.length; e++, this.bufferOff++) this.buffer[this.bufferOff] = t[e];
    return n
}, n.prototype._updateDecrypt = function (t) {
    for (var e = 0, i = 0, a = Math.ceil((this.bufferOff + t.length) / this.blockSize) - 1, n = new Array(a * this.blockSize); a > 0; a--) e += this._buffer(t, e), i += this._flushBuffer(n, i);
    return e += this._buffer(t, e), n
}, n.prototype.final = function (t) {
    var e, i;
    return t && (e = this.update(t)), i = "encrypt" === this.type ? this._finalEncrypt() : this._finalDecrypt(), e ? e.concat(i) : i
}, n.prototype._pad = function (t, e) {
    if (0 === e) return !1;
    for (; e < t.length;) t[e++] = 0;
    return !0
}, n.prototype._finalEncrypt = function () {
    if (!this._pad(this.buffer, this.bufferOff)) return [];
    var t = new Array(this.blockSize);
    return this._update(this.buffer, 0, t, 0), t
}, n.prototype._unpad = function (t) {
    return t
}, n.prototype._finalDecrypt = function () {
    number_arr.equal(this.bufferOff, this.blockSize, "Not enough data to decrypt");
    var t = new Array(this.blockSize);
    return this._flushBuffer(t, 0), this._unpad(t)
}
