
            (function (i, a) {
                
                var n = t("process-nextick-args");

                function s(t) {
                    var e = this;
                    this.next = null, this.entry = null, this.finish = function () {
                        R(e, t)
                    }
                }
                e.exports = y;
                var o, r = !i.browser && ["v0.10", "v0.9."].indexOf(i.version.slice(0, 5)) > -1 ? setImmediate : n.nextTick;
                y.WritableState = v;
                var c = Object.create(t("core-util-is"));
                c.inherits = t("inherits");
                var h = {
                    deprecate: t("util-deprecate")
                },
                    f = t("./internal/streams/stream"),
                    d = t("safe-buffer").Buffer,
                    l = a.Uint8Array || function () { };

                function u(t) {
                    return d.from(t)
                }

                function p(t) {
                    return d.isBuffer(t) || t instanceof l
                }
                var g, m = t("./internal/streams/destroy");

                function b() { }

                function v(e, i) {
                    o = o || t("./_stream_duplex"), e = e || {};
                    var a = i instanceof o;
                    this.objectMode = !!e.objectMode, a && (this.objectMode = this.objectMode || !!e.writableObjectMode);
                    var n = e.highWaterMark,
                        r = e.writableHighWaterMark,
                        c = this.objectMode ? 16 : 16384;
                    this.highWaterMark = n || 0 === n ? n : a && (r || 0 === r) ? r : c, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
                    var h = !1 === e.decodeStrings;
                    this.decodeStrings = !h, this.defaultEncoding = e.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function (t) {
                        C(i, t)
                    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new s(this)
                }

                function y(e) {
                    if (o = o || t("./_stream_duplex"), !(g.call(y, this) || this instanceof o)) return new y(e);
                    this._writableState = new v(e, this), this.writable = !0, e && ("function" == typeof e.write && (this._write = e.write), "function" == typeof e.writev && (this._writev = e.writev), "function" == typeof e.destroy && (this._destroy = e.destroy), "function" == typeof e.final && (this._final = e.final)), f.call(this)
                }

                function _(t, e) {
                    var i = new Error("write after end");
                    t.emit("error", i), n.nextTick(e, i)
                }

                function x(t, e, i, a) {
                    var s = !0,
                        o = !1;
                    return null === i ? o = new TypeError("May not write null values to stream") : "string" == typeof i || void 0 === i || e.objectMode || (o = new TypeError("Invalid non-string/buffer chunk")), o && (t.emit("error", o), n.nextTick(a, o), s = !1), s
                }

                function w(t, e, i) {
                    return t.objectMode || !1 === t.decodeStrings || "string" != typeof e || (e = d.from(e, i)), e
                }

                function S(t, e, i, a, n, s) {
                    if (!i) {
                        var o = w(e, a, n);
                        a !== o && (i = !0, n = "buffer", a = o)
                    }
                    var r = e.objectMode ? 1 : a.length;
                    e.length += r;
                    var c = e.length < e.highWaterMark;
                    if (c || (e.needDrain = !0), e.writing || e.corked) {
                        var h = e.lastBufferedRequest;
                        e.lastBufferedRequest = {
                            chunk: a,
                            encoding: n,
                            isBuf: i,
                            callback: s,
                            next: null
                        }, h ? h.next = e.lastBufferedRequest : e.bufferedRequest = e.lastBufferedRequest, e.bufferedRequestCount += 1
                    } else k(t, e, !1, r, a, n, s);
                    return c
                }

                function k(t, e, i, a, n, s, o) {
                    e.writelen = a, e.writecb = o, e.writing = !0, e.sync = !0, i ? t._writev(n, e.onwrite) : t._write(n, s, e.onwrite), e.sync = !1
                }

                function I(t, e, i, a, s) {
                    --e.pendingcb, i ? (n.nextTick(s, a), n.nextTick(B, t, e), t._writableState.errorEmitted = !0, t.emit("error", a)) : (s(a), t._writableState.errorEmitted = !0, t.emit("error", a), B(t, e))
                }

                function T(t) {
                    t.writing = !1, t.writecb = null, t.length -= t.writelen, t.writelen = 0
                }

                function C(t, e) {
                    var i = t._writableState,
                        a = i.sync,
                        n = i.writecb;
                    if (T(i), e) I(t, i, a, e, n);
                    else {
                        var s = D(i);
                        s || i.corked || i.bufferProcessing || !i.bufferedRequest || P(t, i), a ? r(E, t, i, s, n) : E(t, i, s, n)
                    }
                }

                function E(t, e, i, a) {
                    i || M(t, e), e.pendingcb--, a(), B(t, e)
                }

                function M(t, e) {
                    0 === e.length && e.needDrain && (e.needDrain = !1, t.emit("drain"))
                }

                function P(t, e) {
                    e.bufferProcessing = !0;
                    var i = e.bufferedRequest;
                    if (t._writev && i && i.next) {
                        var a = e.bufferedRequestCount,
                            n = new Array(a),
                            o = e.corkedRequestsFree;
                        o.entry = i;
                        for (var r = 0, c = !0; i;) n[r] = i, i.isBuf || (c = !1), i = i.next, r += 1;
                        n.allBuffers = c, k(t, e, !0, e.length, n, "", o.finish), e.pendingcb++, e.lastBufferedRequest = null, o.next ? (e.corkedRequestsFree = o.next, o.next = null) : e.corkedRequestsFree = new s(e), e.bufferedRequestCount = 0
                    } else {
                        for (; i;) {
                            var h = i.chunk,
                                f = i.encoding,
                                d = i.callback;
                            if (k(t, e, !1, e.objectMode ? 1 : h.length, h, f, d), i = i.next, e.bufferedRequestCount--, e.writing) break
                        }
                        null === i && (e.lastBufferedRequest = null)
                    }
                    e.bufferedRequest = i, e.bufferProcessing = !1
                }

                function D(t) {
                    return t.ending && 0 === t.length && null === t.bufferedRequest && !t.finished && !t.writing
                }

                function L(t, e) {
                    t._final(function (i) {
                        e.pendingcb--, i && t.emit("error", i), e.prefinished = !0, t.emit("prefinish"), B(t, e)
                    })
                }

                function N(t, e) {
                    e.prefinished || e.finalCalled || ("function" == typeof t._final ? (e.pendingcb++, e.finalCalled = !0, n.nextTick(L, t, e)) : (e.prefinished = !0, t.emit("prefinish")))
                }

                function B(t, e) {
                    var i = D(e);
                    return i && (N(t, e), 0 === e.pendingcb && (e.finished = !0, t.emit("finish"))), i
                }

                function A(t, e, i) {
                    e.ending = !0, B(t, e), i && (e.finished ? n.nextTick(i) : t.once("finish", i)), e.ended = !0, t.writable = !1
                }

                function R(t, e, i) {
                    var a = t.entry;
                    for (t.entry = null; a;) {
                        var n = a.callback;
                        e.pendingcb--, n(i), a = a.next
                    }
                    e.corkedRequestsFree ? e.corkedRequestsFree.next = t : e.corkedRequestsFree = t
                }
                c.inherits(y, f), v.prototype.getBuffer = function () {
                    for (var t = this.bufferedRequest, e = []; t;) e.push(t), t = t.next;
                    return e
                },
                    function () {
                        try {
                            Object.defineProperty(v.prototype, "buffer", {
                                get: h.deprecate(function () {
                                    return this.getBuffer()
                                }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                            })
                        } catch (t) { }
                    }(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (g = Function.prototype[Symbol.hasInstance], Object.defineProperty(y, Symbol.hasInstance, {
                        value: function (t) {
                            return !!g.call(this, t) || this === y && (t && t._writableState instanceof v)
                        }
                    })) : g = function (t) {
                        return t instanceof this
                    }, y.prototype.pipe = function () {
                        this.emit("error", new Error("Cannot pipe, not readable"))
                    }, y.prototype.write = function (t, e, i) {
                        var a = this._writableState,
                            n = !1,
                            s = !a.objectMode && p(t);
                        return s && !d.isBuffer(t) && (t = u(t)), "function" == typeof e && (i = e, e = null), s ? e = "buffer" : e || (e = a.defaultEncoding), "function" != typeof i && (i = b), a.ended ? _(this, i) : (s || x(this, a, t, i)) && (a.pendingcb++, n = S(this, a, s, t, e, i)), n
                    }, y.prototype.cork = function () {
                        this._writableState.corked++
                    }, y.prototype.uncork = function () {
                        var t = this._writableState;
                        t.corked && (t.corked--, t.writing || t.corked || t.finished || t.bufferProcessing || !t.bufferedRequest || P(this, t))
                    }, y.prototype.setDefaultEncoding = function (t) {
                        if ("string" == typeof t && (t = t.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((t + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + t);
                        return this._writableState.defaultEncoding = t, this
                    }, Object.defineProperty(y.prototype, "writableHighWaterMark", {
                        enumerable: !1,
                        get: function () {
                            return this._writableState.highWaterMark
                        }
                    }), y.prototype._write = function (t, e, i) {
                        i(new Error("_write() is not implemented"))
                    }, y.prototype._writev = null, y.prototype.end = function (t, e, i) {
                        var a = this._writableState;
                        "function" == typeof t ? (i = t, t = null, e = null) : "function" == typeof e && (i = e, e = null), null !== t && void 0 !== t && this.write(t, e), a.corked && (a.corked = 1, this.uncork()), a.ending || a.finished || A(this, a, i)
                    }, Object.defineProperty(y.prototype, "destroyed", {
                        get: function () {
                            return void 0 !== this._writableState && this._writableState.destroyed
                        },
                        set: function (t) {
                            this._writableState && (this._writableState.destroyed = t)
                        }
                    }), y.prototype.destroy = m.destroy, y.prototype._undestroy = m.undestroy, y.prototype._destroy = function (t, e) {
                        this.end(), e(t)
                    }
            }).call(this, t("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        