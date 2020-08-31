
var number_arr;

function n(t) {
    this.rand = t
}
if (e.exports = function (t) {
    return number_arr || (number_arr = new n(null)), number_arr.generate(t)
}, e.exports.Rand = n, n.prototype.generate = function (t) {
    return this._rand(t)
}, n.prototype._rand = function (t) {
    if (this.rand.getBytes) return this.rand.getBytes(t);
    for (var e = new Uint8Array(t), i = 0; i < e.length; i++) e[i] = this.rand.getByte();
    return e
}, "object" == typeof self) self.crypto && self.crypto.getRandomValues ? n.prototype._rand = function (t) {
    var e = new Uint8Array(t);
    return self.crypto.getRandomValues(e), e
} : self.msCrypto && self.msCrypto.getRandomValues ? n.prototype._rand = function (t) {
    var e = new Uint8Array(t);
    return self.msCrypto.getRandomValues(e), e
} : "object" == typeof window && (n.prototype._rand = function () {
    throw new Error("Not implemented yet")
});
else try {
    var s = t("crypto");
    if ("function" != typeof s.randomBytes) throw new Error("Not supported");
    n.prototype._rand = function (t) {
        return s.randomBytes(t)
    }
} catch (t) { }
