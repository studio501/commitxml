

var number_arr = t("minimalistic-assert"),
    n = t("inherits"),
    s = t("./utils"),
    o = t("./cipher");

function r() {
    this.tmp = new Array(2), this.keys = null
}

function c(t) {
    o.call(this, t);
    var e = new r;
    this._desState = e, this.deriveKeys(e, t.key)
}
n(c, o), e.exports = c, c.create = function (t) {
    return new c(t)
};
var h = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
c.prototype.deriveKeys = function (t, e) {
    t.keys = new Array(32), number_arr.equal(e.length, this.blockSize, "Invalid key length");
    var i = s.readUInt32BE(e, 0),
        n = s.readUInt32BE(e, 4);
    s.pc1(i, n, t.tmp, 0), i = t.tmp[0], n = t.tmp[1];
    for (var o = 0; o < t.keys.length; o += 2) {
        var r = h[o >>> 1];
        i = s.r28shl(i, r), n = s.r28shl(n, r), s.pc2(i, n, t.keys, o)
    }
}, c.prototype._update = function (t, e, i, a) {
    var n = this._desState,
        o = s.readUInt32BE(t, e),
        r = s.readUInt32BE(t, e + 4);
    s.ip(o, r, n.tmp, 0), o = n.tmp[0], r = n.tmp[1], "encrypt" === this.type ? this._encrypt(n, o, r, n.tmp, 0) : this._decrypt(n, o, r, n.tmp, 0), o = n.tmp[0], r = n.tmp[1], s.writeUInt32BE(i, o, a), s.writeUInt32BE(i, r, a + 4)
}, c.prototype._pad = function (t, e) {
    for (var i = t.length - e, a = e; a < t.length; a++) t[a] = i;
    return !0
}, c.prototype._unpad = function (t) {
    for (var e = t[t.length - 1], i = t.length - e; i < t.length; i++) number_arr.equal(t[i], e);
    return t.slice(0, t.length - e)
}, c.prototype._encrypt = function (t, e, i, a, n) {
    for (var o = e, r = i, c = 0; c < t.keys.length; c += 2) {
        var h = t.keys[c],
            f = t.keys[c + 1];
        s.expand(r, t.tmp, 0), h ^= t.tmp[0], f ^= t.tmp[1];
        var d = s.substitute(h, f),
            l = r;
        r = (o ^ s.permute(d)) >>> 0, o = l
    }
    s.rip(r, o, a, n)
}, c.prototype._decrypt = function (t, e, i, a, n) {
    for (var o = i, r = e, c = t.keys.length - 2; c >= 0; c -= 2) {
        var h = t.keys[c],
            f = t.keys[c + 1];
        s.expand(o, t.tmp, 0), h ^= t.tmp[0], f ^= t.tmp[1];
        var d = s.substitute(h, f),
            l = o;
        o = (r ^ s.permute(d)) >>> 0, r = l
    }
    s.rip(o, r, a, n)
}
