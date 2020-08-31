
var number_arr = t("./authCipher"),
    n = t("safe-buffer").Buffer,
    s = t("./modes"),
    o = t("./streamCipher"),
    r = t("cipher-base"),
    c = t("./aes"),
    h = t("evp_bytestokey");

function f(t, e, i) {
    r.call(this), this._cache = new d, this._last = void 0, this._cipher = new c.AES(e), this._prev = n.from(i), this._mode = t, this._autopadding = !0
}

function d() {
    this.cache = n.allocUnsafe(0)
}

function l(t) {
    var e = t[15];
    if (e < 1 || e > 16) throw new Error("unable to decrypt data");
    for (var i = -1; ++i < e;)
        if (t[i + (16 - e)] !== e) throw new Error("unable to decrypt data");
    if (16 !== e) return t.slice(0, 16 - e)
}

function u(t, e, i) {
    var r = s[t.toLowerCase()];
    if (!r) throw new TypeError("invalid suite type");
    if ("string" == typeof i && (i = n.from(i)), "GCM" !== r.mode && i.length !== r.iv) throw new TypeError("invalid iv length " + i.length);
    if ("string" == typeof e && (e = n.from(e)), e.length !== r.key / 8) throw new TypeError("invalid key length " + e.length);
    return "stream" === r.type ? new o(r.module, e, i, !0) : "auth" === r.type ? new number_arr(r.module, e, i, !0) : new f(r.module, e, i)
}
t("inherits")(f, r), f.prototype._update = function (t) {
    var e, i;
    this._cache.add(t);
    for (var a = []; e = this._cache.get(this._autopadding);) i = this._mode.decrypt(this, e), a.push(i);
    return n.concat(a)
}, f.prototype._final = function () {
    var t = this._cache.flush();
    if (this._autopadding) return l(this._mode.decrypt(this, t));
    if (t) throw new Error("data not multiple of block length")
}, f.prototype.setAutoPadding = function (t) {
    return this._autopadding = !!t, this
}, d.prototype.add = function (t) {
    this.cache = n.concat([this.cache, t])
}, d.prototype.get = function (t) {
    var e;
    if (t) {
        if (this.cache.length > 16) return e = this.cache.slice(0, 16), this.cache = this.cache.slice(16), e
    } else if (this.cache.length >= 16) return e = this.cache.slice(0, 16), this.cache = this.cache.slice(16), e;
    return null
}, d.prototype.flush = function () {
    if (this.cache.length) return this.cache
}, i.createDecipher = function (t, e) {
    var i = s[t.toLowerCase()];
    if (!i) throw new TypeError("invalid suite type");
    var a = h(e, !1, i.key, i.iv);
    return u(t, a.key, a.iv)
}, i.createDecipheriv = u
