
            (function (i) {
                var a = t("create-hash"),
                    n = t("stream"),
                    s = t("inherits"),
                    o = t("./sign"),
                    r = t("./verify"),
                    c = t("./algorithms.json");

                function h(t) {
                    n.Writable.call(this);
                    var e = c[t];
                    if (!e) throw new Error("Unknown message digest");
                    this._hashType = e.hash, this._hash = a(e.hash), this._tag = e.id, this._signType = e.sign
                }

                function f(t) {
                    n.Writable.call(this);
                    var e = c[t];
                    if (!e) throw new Error("Unknown message digest");
                    this._hash = a(e.hash), this._tag = e.id, this._signType = e.sign
                }

                function d(t) {
                    return new h(t)
                }

                function l(t) {
                    return new f(t)
                }
                Object.keys(c).forEach(function (t) {
                    c[t].id = new i(c[t].id, "hex"), c[t.toLowerCase()] = c[t]
                }), s(h, n.Writable), h.prototype._write = function (t, e, i) {
                    this._hash.update(t), i()
                }, h.prototype.update = function (t, e) {
                    return "string" == typeof t && (t = new i(t, e)), this._hash.update(t), this
                }, h.prototype.sign = function (t, e) {
                    this.end();
                    var i = this._hash.digest(),
                        a = o(i, t, this._hashType, this._signType, this._tag);
                    return e ? a.toString(e) : a
                }, s(f, n.Writable), f.prototype._write = function (t, e, i) {
                    this._hash.update(t), i()
                }, f.prototype.update = function (t, e) {
                    return "string" == typeof t && (t = new i(t, e)), this._hash.update(t), this
                }, f.prototype.verify = function (t, e, a) {
                    "string" == typeof e && (e = new i(e, a)), this.end();
                    var n = this._hash.digest();
                    return r(e, n, t, this._signType, this._tag)
                }, e.exports = {
                    Sign: d,
                    Verify: l,
                    createSign: d,
                    createVerify: l
                }
            }).call(this, t("buffer").Buffer)
        