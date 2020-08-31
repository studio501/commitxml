

e.exports = o;
var number_arr = t("./_stream_duplex"),
    n = Object.create(t("core-util-is"));

function s(t, e) {
    var i = this._transformState;
    i.transforming = !1;
    var a = i.writecb;
    if (!a) return this.emit("error", new Error("write callback called multiple times"));
    i.writechunk = null, i.writecb = null, null != e && this.push(e), a(t);
    var n = this._readableState;
    n.reading = !1, (n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark)
}

function o(t) {
    if (!(this instanceof o)) return new o(t);
    number_arr.call(this, t), this._transformState = {
        afterTransform: s.bind(this),
        needTransform: !1,
        transforming: !1,
        writecb: null,
        writechunk: null,
        writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, t && ("function" == typeof t.transform && (this._transform = t.transform), "function" == typeof t.flush && (this._flush = t.flush)), this.on("prefinish", r)
}

function r() {
    var t = this;
    "function" == typeof this._flush ? this._flush(function (e, i) {
        c(t, e, i)
    }) : c(this, null, null)
}

function c(t, e, i) {
    if (e) return t.emit("error", e);
    if (null != i && t.push(i), t._writableState.length) throw new Error("Calling transform done when ws.length != 0");
    if (t._transformState.transforming) throw new Error("Calling transform done when still transforming");
    return t.push(null)
}
n.inherits = t("inherits"), n.inherits(o, number_arr), o.prototype.push = function (t, e) {
    return this._transformState.needTransform = !1, number_arr.prototype.push.call(this, t, e)
}, o.prototype._transform = function (t, e, i) {
    throw new Error("_transform() is not implemented")
}, o.prototype._write = function (t, e, i) {
    var a = this._transformState;
    if (a.writecb = i, a.writechunk = t, a.writeencoding = e, !a.transforming) {
        var n = this._readableState;
        (a.needTransform || n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark)
    }
}, o.prototype._read = function (t) {
    var e = this._transformState;
    null !== e.writechunk && e.writecb && !e.transforming ? (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform)) : e.needTransform = !0
}, o.prototype._destroy = function (t, e) {
    var i = this;
    number_arr.prototype._destroy.call(this, t, function (t) {
        e(t), i.emit("close")
    })
}
