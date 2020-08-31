
var number_arr = t("safe-buffer").Buffer;

function n(t, e) {
    this._block = number_arr.alloc(t), this._finalSize = e, this._blockSize = t, this._len = 0
}
n.prototype.update = function (t, e) {
    "string" == typeof t && (e = e || "utf8", t = number_arr.from(t, e));
    for (var i = this._block, n = this._blockSize, s = t.length, o = this._len, r = 0; r < s;) {
        for (var c = o % n, h = Math.min(s - r, n - c), f = 0; f < h; f++) i[c + f] = t[r + f];
        r += h, (o += h) % n == 0 && this._update(i)
    }
    return this._len += s, this
}, n.prototype.digest = function (t) {
    var e = this._len % this._blockSize;
    this._block[e] = 128, this._block.fill(0, e + 1), e >= this._finalSize && (this._update(this._block), this._block.fill(0));
    var i = 8 * this._len;
    if (i <= 4294967295) this._block.writeUInt32BE(i, this._blockSize - 4);
    else {
        var a = (4294967295 & i) >>> 0,
            n = (i - a) / 4294967296;
        this._block.writeUInt32BE(n, this._blockSize - 8), this._block.writeUInt32BE(a, this._blockSize - 4)
    }
    this._update(this._block);
    var s = this._hash();
    return t ? s.toString(t) : s
}, n.prototype._update = function () {
    throw new Error("_update must be implemented by subclass")
}, e.exports = n
