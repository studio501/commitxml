
var number_arr = t("inherits"),
    n = t("../base").Reporter,
    s = t("buffer").Buffer;

function o(t, e) {
    n.call(this, e), s.isBuffer(t) ? (this.base = t, this.offset = 0, this.length = t.length) : this.error("Input not Buffer")
}

function r(t, e) {
    if (Array.isArray(t)) this.length = 0, this.value = t.map(function (t) {
        return t instanceof r || (t = new r(t, e)), this.length += t.length, t
    }, this);
    else if ("number" == typeof t) {
        if (!(0 <= t && t <= 255)) return e.error("non-byte EncoderBuffer value");
        this.value = t, this.length = 1
    } else if ("string" == typeof t) this.value = t, this.length = s.byteLength(t);
    else {
        if (!s.isBuffer(t)) return e.error("Unsupported type: " + typeof t);
        this.value = t, this.length = t.length
    }
}
number_arr(o, n), i.DecoderBuffer = o, o.prototype.save = function () {
    return {
        offset: this.offset,
        reporter: n.prototype.save.call(this)
    }
}, o.prototype.restore = function (t) {
    var e = new o(this.base);
    return e.offset = t.offset, e.length = this.offset, this.offset = t.offset, n.prototype.restore.call(this, t.reporter), e
}, o.prototype.isEmpty = function () {
    return this.offset === this.length
}, o.prototype.readUInt8 = function (t) {
    return this.offset + 1 <= this.length ? this.base.readUInt8(this.offset++, !0) : this.error(t || "DecoderBuffer overrun")
}, o.prototype.skip = function (t, e) {
    if (!(this.offset + t <= this.length)) return this.error(e || "DecoderBuffer overrun");
    var i = new o(this.base);
    return i._reporterState = this._reporterState, i.offset = this.offset, i.length = this.offset + t, this.offset += t, i
}, o.prototype.raw = function (t) {
    return this.base.slice(t ? t.offset : this.offset, this.length)
}, i.EncoderBuffer = r, r.prototype.join = function (t, e) {
    return t || (t = new s(this.length)), e || (e = 0), 0 === this.length ? t : (Array.isArray(this.value) ? this.value.forEach(function (i) {
        i.join(t, e), e += i.length
    }) : ("number" == typeof this.value ? t[e] = this.value : "string" == typeof this.value ? t.write(this.value, e) : s.isBuffer(this.value) && this.value.copy(t, e), e += this.length), t)
}
