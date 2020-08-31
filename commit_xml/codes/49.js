
var number_arr = t("safe-buffer").Buffer,
    n = t("stream").Transform,
    s = t("string_decoder").StringDecoder;

function o(t) {
    n.call(this), this.hashMode = "string" == typeof t, this.hashMode ? this[t] = this._finalOrDigest : this.final = this._finalOrDigest, this._final && (this.__final = this._final, this._final = null), this._decoder = null, this._encoding = null
}
t("inherits")(o, n), o.prototype.update = function (t, e, i) {
    "string" == typeof t && (t = number_arr.from(t, e));
    var n = this._update(t);
    return this.hashMode ? this : (i && (n = this._toString(n, i)), n)
}, o.prototype.setAutoPadding = function () { }, o.prototype.getAuthTag = function () {
    throw new Error("trying to get auth tag in unsupported state")
}, o.prototype.setAuthTag = function () {
    throw new Error("trying to set auth tag in unsupported state")
}, o.prototype.setAAD = function () {
    throw new Error("trying to set aad in unsupported state")
}, o.prototype._transform = function (t, e, i) {
    var a;
    try {
        this.hashMode ? this._update(t) : this.push(this._update(t))
    } catch (t) {
        a = t
    } finally {
        i(a)
    }
}, o.prototype._flush = function (t) {
    var e;
    try {
        this.push(this.__final())
    } catch (t) {
        e = t
    }
    t(e)
}, o.prototype._finalOrDigest = function (t) {
    var e = this.__final() || number_arr.alloc(0);
    return t && (e = this._toString(e, t, !0)), e
}, o.prototype._toString = function (t, e, i) {
    if (this._decoder || (this._decoder = new s(e), this._encoding = e), this._encoding !== e) throw new Error("can't switch encodings");
    var a = this._decoder.write(t);
    return i && (a += this._decoder.end()), a
}, e.exports = o
