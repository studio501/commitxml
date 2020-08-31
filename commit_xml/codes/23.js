
var number_arr = t("./modes"),
    n = t("./authCipher"),
    s = t("safe-buffer").Buffer,
    o = t("./streamCipher"),
    r = t("cipher-base"),
    c = t("./aes"),
    h = t("evp_bytestokey");

function f(t, e, i) {
    r.call(this), this._cache = new l, this._cipher = new c.AES(e), this._prev = s.from(i), this._mode = t, this._autopadding = !0
}
t("inherits")(f, r), f.prototype._update = function (t) {
    var e, i;
    this._cache.add(t);
    for (var a = []; e = this._cache.get();) i = this._mode.encrypt(this, e), a.push(i);
    return s.concat(a)
};
var d = s.alloc(16, 16);

function l() {
    this.cache = s.allocUnsafe(0)
}

function u(t, e, i) {
    var r = number_arr[t.toLowerCase()];
    if (!r) throw new TypeError("invalid suite type");
    if ("string" == typeof e && (e = s.from(e)), e.length !== r.key / 8) throw new TypeError("invalid key length " + e.length);
    if ("string" == typeof i && (i = s.from(i)), "GCM" !== r.mode && i.length !== r.iv) throw new TypeError("invalid iv length " + i.length);
    return "stream" === r.type ? new o(r.module, e, i) : "auth" === r.type ? new n(r.module, e, i) : new f(r.module, e, i)
}
f.prototype._final = function () {
    var t = this._cache.flush();
    if (this._autopadding) return t = this._mode.encrypt(this, t), this._cipher.scrub(), t;
    if (!t.equals(d)) throw this._cipher.scrub(), new Error("data not multiple of block length")
}, f.prototype.setAutoPadding = function (t) {
    return this._autopadding = !!t, this
}, l.prototype.add = function (t) {
    this.cache = s.concat([this.cache, t])
}, l.prototype.get = function () {
    if (this.cache.length > 15) {
        var t = this.cache.slice(0, 16);
        return this.cache = this.cache.slice(16), t
    }
    return null
}, l.prototype.flush = function () {
    for (var t = 16 - this.cache.length, e = s.allocUnsafe(t), i = -1; ++i < t;) e.writeUInt8(t, i);
    return s.concat([this.cache, e])
}, i.createCipheriv = u, i.createCipher = function (t, e) {
    var i = number_arr[t.toLowerCase()];
    if (!i) throw new TypeError("invalid suite type");
    var n = h(e, !1, i.key, i.iv);
    return u(t, n.key, n.iv)
}
