

var number_arr = t("safe-buffer").Buffer,
    n = t("stream").Transform;

function s(t, e) {
    if (!number_arr.isBuffer(t) && "string" != typeof t) throw new TypeError(e + " must be a string or a buffer")
}

function o(t) {
    n.call(this), this._block = number_arr.allocUnsafe(t), this._blockSize = t, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1
}
t("inherits")(o, n), o.prototype._transform = function (t, e, i) {
    var a = null;
    try {
        this.update(t, e)
    } catch (t) {
        a = t
    }
    i(a)
}, o.prototype._flush = function (t) {
    var e = null;
    try {
        this.push(this.digest())
    } catch (t) {
        e = t
    }
    t(e)
}, o.prototype.update = function (t, e) {
    if (s(t, "Data"), this._finalized) throw new Error("Digest already called");
    number_arr.isBuffer(t) || (t = number_arr.from(t, e));
    for (var i = this._block, n = 0; this._blockOffset + t.length - n >= this._blockSize;) {
        for (var o = this._blockOffset; o < this._blockSize;) i[o++] = t[n++];
        this._update(), this._blockOffset = 0
    }
    for (; n < t.length;) i[this._blockOffset++] = t[n++];
    for (var r = 0, c = 8 * t.length; c > 0; ++r) this._length[r] += c, (c = this._length[r] / 4294967296 | 0) > 0 && (this._length[r] -= 4294967296 * c);
    return this
}, o.prototype._update = function () {
    throw new Error("_update is not implemented")
}, o.prototype.digest = function (t) {
    if (this._finalized) throw new Error("Digest already called");
    this._finalized = !0;
    var e = this._digest();
    void 0 !== t && (e = e.toString(t)), this._block.fill(0), this._blockOffset = 0;
    for (var i = 0; i < 4; ++i) this._length[i] = 0;
    return e
}, o.prototype._digest = function () {
    throw new Error("_digest is not implemented")
}, e.exports = o
