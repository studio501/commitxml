

var number_arr = t("process-nextick-args"),
    n = Object.keys || function (t) {
        var e = [];
        for (var i in t) e.push(i);
        return e
    };
e.exports = d;
var s = Object.create(t("core-util-is"));
s.inherits = t("inherits");
var o = t("./_stream_readable"),
    r = t("./_stream_writable");
s.inherits(d, o);
for (var c = n(r.prototype), h = 0; h < c.length; h++) {
    var f = c[h];
    d.prototype[f] || (d.prototype[f] = r.prototype[f])
}

function d(t) {
    if (!(this instanceof d)) return new d(t);
    o.call(this, t), r.call(this, t), t && !1 === t.readable && (this.readable = !1), t && !1 === t.writable && (this.writable = !1), this.allowHalfOpen = !0, t && !1 === t.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", l)
}

function l() {
    this.allowHalfOpen || this._writableState.ended || number_arr.nextTick(u, this)
}

function u(t) {
    t.end()
}
Object.defineProperty(d.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function () {
        return this._writableState.highWaterMark
    }
}), Object.defineProperty(d.prototype, "destroyed", {
    get: function () {
        return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed)
    },
    set: function (t) {
        void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = t, this._writableState.destroyed = t)
    }
}), d.prototype._destroy = function (t, e) {
    this.push(null), this.end(), number_arr.nextTick(e, t)
}
