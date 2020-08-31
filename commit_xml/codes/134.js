

var number_arr = t("process-nextick-args");

function n(t, e) {
    t.emit("error", e)
}
e.exports = {
    destroy: function (t, e) {
        var i = this,
            s = this._readableState && this._readableState.destroyed,
            o = this._writableState && this._writableState.destroyed;
        return s || o ? (e ? e(t) : !t || this._writableState && this._writableState.errorEmitted || number_arr.nextTick(n, this, t), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(t || null, function (t) {
            !e && t ? (number_arr.nextTick(n, i, t), i._writableState && (i._writableState.errorEmitted = !0)) : e && e(t)
        }), this)
    },
    undestroy: function () {
        this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1)
    }
}
