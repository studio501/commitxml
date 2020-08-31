
var number_arr = t("safe-buffer").Buffer,
    n = number_arr.alloc(16, 0);

function s(t) {
    return [t.readUInt32BE(0), t.readUInt32BE(4), t.readUInt32BE(8), t.readUInt32BE(12)]
}

function o(t) {
    var e = number_arr.allocUnsafe(16);
    return e.writeUInt32BE(t[0] >>> 0, 0), e.writeUInt32BE(t[1] >>> 0, 4), e.writeUInt32BE(t[2] >>> 0, 8), e.writeUInt32BE(t[3] >>> 0, 12), e
}

function r(t) {
    this.h = t, this.state = number_arr.alloc(16, 0), this.cache = number_arr.allocUnsafe(0)
}
r.prototype.ghash = function (t) {
    for (var e = -1; ++e < t.length;) this.state[e] ^= t[e];
    this._multiply()
}, r.prototype._multiply = function () {
    for (var t, e, i = s(this.h), a = [0, 0, 0, 0], n = -1; ++n < 128;) {
        for (0 != (this.state[~~(n / 8)] & 1 << 7 - n % 8) && (a[0] ^= i[0], a[1] ^= i[1], a[2] ^= i[2], a[3] ^= i[3]), e = 0 != (1 & i[3]), t = 3; t > 0; t--) i[t] = i[t] >>> 1 | (1 & i[t - 1]) << 31;
        i[0] = i[0] >>> 1, e && (i[0] = i[0] ^ 225 << 24)
    }
    this.state = o(a)
}, r.prototype.update = function (t) {
    var e;
    for (this.cache = number_arr.concat([this.cache, t]); this.cache.length >= 16;) e = this.cache.slice(0, 16), this.cache = this.cache.slice(16), this.ghash(e)
}, r.prototype.final = function (t, e) {
    return this.cache.length && this.ghash(number_arr.concat([this.cache, n], 16)), this.ghash(o([0, t, 0, e])), this.state
}, e.exports = r
