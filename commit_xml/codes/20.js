
var number_arr = t("./aes"),
    n = t("safe-buffer").Buffer,
    s = t("cipher-base"),
    o = t("inherits"),
    r = t("./ghash"),
    c = t("buffer-xor"),
    h = t("./incr32");

function f(t, e) {
    var i = 0;
    t.length !== e.length && i++;
    for (var a = Math.min(t.length, e.length), n = 0; n < a; ++n) i += t[n] ^ e[n];
    return i
}

function d(t, e, i) {
    if (12 === e.length) return t._finID = n.concat([e, n.from([0, 0, 0, 1])]), n.concat([e, n.from([0, 0, 0, 2])]);
    var a = new r(i),
        s = e.length,
        o = s % 16;
    a.update(e), o && (o = 16 - o, a.update(n.alloc(o, 0))), a.update(n.alloc(8, 0));
    var c = 8 * s,
        f = n.alloc(8);
    f.writeUIntBE(c, 0, 8), a.update(f), t._finID = a.state;
    var d = n.from(t._finID);
    return h(d), d
}

function l(t, e, i, o) {
    s.call(this);
    var c = n.alloc(4, 0);
    this._cipher = new number_arr.AES(e);
    var h = this._cipher.encryptBlock(c);
    this._ghash = new r(h), i = d(this, i, h), this._prev = n.from(i), this._cache = n.allocUnsafe(0), this._secCache = n.allocUnsafe(0), this._decrypt = o, this._alen = 0, this._len = 0, this._mode = t, this._authTag = null, this._called = !1
}
o(l, s), l.prototype._update = function (t) {
    if (!this._called && this._alen) {
        var e = 16 - this._alen % 16;
        e < 16 && (e = n.alloc(e, 0), this._ghash.update(e))
    }
    this._called = !0;
    var i = this._mode.encrypt(this, t);
    return this._decrypt ? this._ghash.update(t) : this._ghash.update(i), this._len += t.length, i
}, l.prototype._final = function () {
    if (this._decrypt && !this._authTag) throw new Error("Unsupported state or unable to authenticate data");
    var t = c(this._ghash.final(8 * this._alen, 8 * this._len), this._cipher.encryptBlock(this._finID));
    if (this._decrypt && f(t, this._authTag)) throw new Error("Unsupported state or unable to authenticate data");
    this._authTag = t, this._cipher.scrub()
}, l.prototype.getAuthTag = function () {
    if (this._decrypt || !n.isBuffer(this._authTag)) throw new Error("Attempting to get auth tag in unsupported state");
    return this._authTag
}, l.prototype.setAuthTag = function (t) {
    if (!this._decrypt) throw new Error("Attempting to set auth tag in unsupported state");
    this._authTag = t
}, l.prototype.setAAD = function (t) {
    if (this._called) throw new Error("Attempting to set AAD in unsupported state");
    this._ghash.update(t), this._alen += t.length
}, e.exports = l
