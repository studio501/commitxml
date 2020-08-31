
            (function (i, a) {
                
                var n = t("process-nextick-args");
                e.exports = w;
                var s, o = t("isarray");
                w.ReadableState = x;
                t("events").EventEmitter;
                var r = function (t, e) {
                    return t.listeners(e).length
                },
                    c = t("./internal/streams/stream"),
                    h = t("safe-buffer").Buffer,
                    f = a.Uint8Array || function () { };

                function d(t) {
                    return h.from(t)
                }

                function l(t) {
                    return h.isBuffer(t) || t instanceof f
                }
                var u = Object.create(t("core-util-is"));
                u.inherits = t("inherits");
                var p = t("util"),
                    g = void 0;
                g = p && p.debuglog ? p.debuglog("stream") : function () { };
                var m, b = t("./internal/streams/BufferList"),
                    v = t("./internal/streams/destroy");
                u.inherits(w, c);
                var y = ["error", "close", "destroy", "pause", "resume"];

                function _(t, e, i) {
                    if ("function" == typeof t.prependListener) return t.prependListener(e, i);
                    t._events && t._events[e] ? o(t._events[e]) ? t._events[e].unshift(i) : t._events[e] = [i, t._events[e]] : t.on(e, i)
                }

                function x(e, i) {
                    s = s || t("./_stream_duplex"), e = e || {};
                    var a = i instanceof s;
                    this.objectMode = !!e.objectMode, a && (this.objectMode = this.objectMode || !!e.readableObjectMode);
                    var n = e.highWaterMark,
                        o = e.readableHighWaterMark,
                        r = this.objectMode ? 16 : 16384;
                    this.highWaterMark = n || 0 === n ? n : a && (o || 0 === o) ? o : r, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new b, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = e.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, e.encoding && (m || (m = t("string_decoder/").StringDecoder), this.decoder = new m(e.encoding), this.encoding = e.encoding)
                }

                function w(e) {
                    if (s = s || t("./_stream_duplex"), !(this instanceof w)) return new w(e);
                    this._readableState = new x(e, this), this.readable = !0, e && ("function" == typeof e.read && (this._read = e.read), "function" == typeof e.destroy && (this._destroy = e.destroy)), c.call(this)
                }

                function S(t, e, i, a, n) {
                    var s, o = t._readableState;
                    null === e ? (o.reading = !1, P(t, o)) : (n || (s = I(o, e)), s ? t.emit("error", s) : o.objectMode || e && e.length > 0 ? ("string" == typeof e || o.objectMode || Object.getPrototypeOf(e) === h.prototype || (e = d(e)), a ? o.endEmitted ? t.emit("error", new Error("stream.unshift() after end event")) : k(t, o, e, !0) : o.ended ? t.emit("error", new Error("stream.push() after EOF")) : (o.reading = !1, o.decoder && !i ? (e = o.decoder.write(e), o.objectMode || 0 !== e.length ? k(t, o, e, !1) : N(t, o)) : k(t, o, e, !1))) : a || (o.reading = !1));
                    return T(o)
                }

                function k(t, e, i, a) {
                    e.flowing && 0 === e.length && !e.sync ? (t.emit("data", i), t.read(0)) : (e.length += e.objectMode ? 1 : i.length, a ? e.buffer.unshift(i) : e.buffer.push(i), e.needReadable && D(t)), N(t, e)
                }

                function I(t, e) {
                    var i;
                    return l(e) || "string" == typeof e || void 0 === e || t.objectMode || (i = new TypeError("Invalid non-string/buffer chunk")), i
                }

                function T(t) {
                    return !t.ended && (t.needReadable || t.length < t.highWaterMark || 0 === t.length)
                }
                Object.defineProperty(w.prototype, "destroyed", {
                    get: function () {
                        return void 0 !== this._readableState && this._readableState.destroyed
                    },
                    set: function (t) {
                        this._readableState && (this._readableState.destroyed = t)
                    }
                }), w.prototype.destroy = v.destroy, w.prototype._undestroy = v.undestroy, w.prototype._destroy = function (t, e) {
                    this.push(null), e(t)
                }, w.prototype.push = function (t, e) {
                    var i, a = this._readableState;
                    return a.objectMode ? i = !0 : "string" == typeof t && ((e = e || a.defaultEncoding) !== a.encoding && (t = h.from(t, e), e = ""), i = !0), S(this, t, e, !1, i)
                }, w.prototype.unshift = function (t) {
                    return S(this, t, null, !0, !1)
                }, w.prototype.isPaused = function () {
                    return !1 === this._readableState.flowing
                }, w.prototype.setEncoding = function (e) {
                    return m || (m = t("string_decoder/").StringDecoder), this._readableState.decoder = new m(e), this._readableState.encoding = e, this
                };
                var C = 8388608;

                function E(t) {
                    return t >= C ? t = C : (t--, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, t |= t >>> 16, t++), t
                }

                function M(t, e) {
                    return t <= 0 || 0 === e.length && e.ended ? 0 : e.objectMode ? 1 : t != t ? e.flowing && e.length ? e.buffer.head.data.length : e.length : (t > e.highWaterMark && (e.highWaterMark = E(t)), t <= e.length ? t : e.ended ? e.length : (e.needReadable = !0, 0))
                }

                function P(t, e) {
                    if (!e.ended) {
                        if (e.decoder) {
                            var i = e.decoder.end();
                            i && i.length && (e.buffer.push(i), e.length += e.objectMode ? 1 : i.length)
                        }
                        e.ended = !0, D(t)
                    }
                }

                function D(t) {
                    var e = t._readableState;
                    e.needReadable = !1, e.emittedReadable || (g("emitReadable", e.flowing), e.emittedReadable = !0, e.sync ? n.nextTick(L, t) : L(t))
                }

                function L(t) {
                    g("emit readable"), t.emit("readable"), V(t)
                }

                function N(t, e) {
                    e.readingMore || (e.readingMore = !0, n.nextTick(B, t, e))
                }

                function B(t, e) {
                    for (var i = e.length; !e.reading && !e.flowing && !e.ended && e.length < e.highWaterMark && (g("maybeReadMore read 0"), t.read(0), i !== e.length);) i = e.length;
                    e.readingMore = !1
                }

                function A(t) {
                    return function () {
                        var e = t._readableState;
                        g("pipeOnDrain", e.awaitDrain), e.awaitDrain && e.awaitDrain--, 0 === e.awaitDrain && r(t, "data") && (e.flowing = !0, V(t))
                    }
                }

                function R(t) {
                    g("readable nexttick read 0"), t.read(0)
                }

                function H(t, e) {
                    e.resumeScheduled || (e.resumeScheduled = !0, n.nextTick(F, t, e))
                }

                function F(t, e) {
                    e.reading || (g("resume read 0"), t.read(0)), e.resumeScheduled = !1, e.awaitDrain = 0, t.emit("resume"), V(t), e.flowing && !e.reading && t.read(0)
                }

                function V(t) {
                    var e = t._readableState;
                    for (g("flow", e.flowing); e.flowing && null !== t.read(););
                }

                function O(t, e) {
                    return 0 === e.length ? null : (e.objectMode ? i = e.buffer.shift() : !t || t >= e.length ? (i = e.decoder ? e.buffer.join("") : 1 === e.buffer.length ? e.buffer.head.data : e.buffer.concat(e.length), e.buffer.clear()) : i = G(t, e.buffer, e.decoder), i);
                    var i
                }

                function G(t, e, i) {
                    var a;
                    return t < e.head.data.length ? (a = e.head.data.slice(0, t), e.head.data = e.head.data.slice(t)) : a = t === e.head.data.length ? e.shift() : i ? q(t, e) : U(t, e), a
                }

                function q(t, e) {
                    var i = e.head,
                        a = 1,
                        n = i.data;
                    for (t -= n.length; i = i.next;) {
                        var s = i.data,
                            o = t > s.length ? s.length : t;
                        if (o === s.length ? n += s : n += s.slice(0, t), 0 === (t -= o)) {
                            o === s.length ? (++a, i.next ? e.head = i.next : e.head = e.tail = null) : (e.head = i, i.data = s.slice(o));
                            break
                        } ++a
                    }
                    return e.length -= a, n
                }

                function U(t, e) {
                    var i = h.allocUnsafe(t),
                        a = e.head,
                        n = 1;
                    for (a.data.copy(i), t -= a.data.length; a = a.next;) {
                        var s = a.data,
                            o = t > s.length ? s.length : t;
                        if (s.copy(i, i.length - t, 0, o), 0 === (t -= o)) {
                            o === s.length ? (++n, a.next ? e.head = a.next : e.head = e.tail = null) : (e.head = a, a.data = s.slice(o));
                            break
                        } ++n
                    }
                    return e.length -= n, i
                }

                function z(t) {
                    var e = t._readableState;
                    if (e.length > 0) throw new Error('"endReadable()" called on non-empty stream');
                    e.endEmitted || (e.ended = !0, n.nextTick(W, e, t))
                }

                function W(t, e) {
                    t.endEmitted || 0 !== t.length || (t.endEmitted = !0, e.readable = !1, e.emit("end"))
                }

                function j(t, e) {
                    for (var i = 0, a = t.length; i < a; i++)
                        if (t[i] === e) return i;
                    return -1
                }
                w.prototype.read = function (t) {
                    g("read", t), t = parseInt(t, 10);
                    var e = this._readableState,
                        i = t;
                    if (0 !== t && (e.emittedReadable = !1), 0 === t && e.needReadable && (e.length >= e.highWaterMark || e.ended)) return g("read: emitReadable", e.length, e.ended), 0 === e.length && e.ended ? z(this) : D(this), null;
                    if (0 === (t = M(t, e)) && e.ended) return 0 === e.length && z(this), null;
                    var a, n = e.needReadable;
                    return g("need readable", n), (0 === e.length || e.length - t < e.highWaterMark) && g("length less than watermark", n = !0), e.ended || e.reading ? g("reading or ended", n = !1) : n && (g("do read"), e.reading = !0, e.sync = !0, 0 === e.length && (e.needReadable = !0), this._read(e.highWaterMark), e.sync = !1, e.reading || (t = M(i, e))), null === (a = t > 0 ? O(t, e) : null) ? (e.needReadable = !0, t = 0) : e.length -= t, 0 === e.length && (e.ended || (e.needReadable = !0), i !== t && e.ended && z(this)), null !== a && this.emit("data", a), a
                }, w.prototype._read = function (t) {
                    this.emit("error", new Error("_read() is not implemented"))
                }, w.prototype.pipe = function (t, e) {
                    var a = this,
                        s = this._readableState;
                    switch (s.pipesCount) {
                        case 0:
                            s.pipes = t;
                            break;
                        case 1:
                            s.pipes = [s.pipes, t];
                            break;
                        default:
                            s.pipes.push(t)
                    }
                    s.pipesCount += 1, g("pipe count=%d opts=%j", s.pipesCount, e);
                    var o = (!e || !1 !== e.end) && t !== i.stdout && t !== i.stderr ? h : y;

                    function c(t, e) {
                        g("onunpipe"), t === a && e && !1 === e.hasUnpiped && (e.hasUnpiped = !0, l())
                    }

                    function h() {
                        g("onend"), t.end()
                    }
                    s.endEmitted ? n.nextTick(o) : a.once("end", o), t.on("unpipe", c);
                    var f = A(a);
                    t.on("drain", f);
                    var d = !1;

                    function l() {
                        g("cleanup"), t.removeListener("close", b), t.removeListener("finish", v), t.removeListener("drain", f), t.removeListener("error", m), t.removeListener("unpipe", c), a.removeListener("end", h), a.removeListener("end", y), a.removeListener("data", p), d = !0, !s.awaitDrain || t._writableState && !t._writableState.needDrain || f()
                    }
                    var u = !1;

                    function p(e) {
                        g("ondata"), u = !1, !1 !== t.write(e) || u || ((1 === s.pipesCount && s.pipes === t || s.pipesCount > 1 && -1 !== j(s.pipes, t)) && !d && (g("false write response, pause", a._readableState.awaitDrain), a._readableState.awaitDrain++, u = !0), a.pause())
                    }

                    function m(e) {
                        g("onerror", e), y(), t.removeListener("error", m), 0 === r(t, "error") && t.emit("error", e)
                    }

                    function b() {
                        t.removeListener("finish", v), y()
                    }

                    function v() {
                        g("onfinish"), t.removeListener("close", b), y()
                    }

                    function y() {
                        g("unpipe"), a.unpipe(t)
                    }
                    return a.on("data", p), _(t, "error", m), t.once("close", b), t.once("finish", v), t.emit("pipe", a), s.flowing || (g("pipe resume"), a.resume()), t
                }, w.prototype.unpipe = function (t) {
                    var e = this._readableState,
                        i = {
                            hasUnpiped: !1
                        };
                    if (0 === e.pipesCount) return this;
                    if (1 === e.pipesCount) return t && t !== e.pipes ? this : (t || (t = e.pipes), e.pipes = null, e.pipesCount = 0, e.flowing = !1, t && t.emit("unpipe", this, i), this);
                    if (!t) {
                        var a = e.pipes,
                            n = e.pipesCount;
                        e.pipes = null, e.pipesCount = 0, e.flowing = !1;
                        for (var s = 0; s < n; s++) a[s].emit("unpipe", this, i);
                        return this
                    }
                    var o = j(e.pipes, t);
                    return -1 === o ? this : (e.pipes.splice(o, 1), e.pipesCount -= 1, 1 === e.pipesCount && (e.pipes = e.pipes[0]), t.emit("unpipe", this, i), this)
                }, w.prototype.on = function (t, e) {
                    var i = c.prototype.on.call(this, t, e);
                    if ("data" === t) !1 !== this._readableState.flowing && this.resume();
                    else if ("readable" === t) {
                        var a = this._readableState;
                        a.endEmitted || a.readableListening || (a.readableListening = a.needReadable = !0, a.emittedReadable = !1, a.reading ? a.length && D(this) : n.nextTick(R, this))
                    }
                    return i
                }, w.prototype.addListener = w.prototype.on, w.prototype.resume = function () {
                    var t = this._readableState;
                    return t.flowing || (g("resume"), t.flowing = !0, H(this, t)), this
                }, w.prototype.pause = function () {
                    return g("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (g("pause"), this._readableState.flowing = !1, this.emit("pause")), this
                }, w.prototype.wrap = function (t) {
                    var e = this,
                        i = this._readableState,
                        a = !1;
                    for (var n in t.on("end", function () {
                        if (g("wrapped end"), i.decoder && !i.ended) {
                            var t = i.decoder.end();
                            t && t.length && e.push(t)
                        }
                        e.push(null)
                    }), t.on("data", function (n) {
                        (g("wrapped data"), i.decoder && (n = i.decoder.write(n)), !i.objectMode || null !== n && void 0 !== n) && ((i.objectMode || n && n.length) && (e.push(n) || (a = !0, t.pause())))
                    }), t) void 0 === this[n] && "function" == typeof t[n] && (this[n] = function (e) {
                        return function () {
                            return t[e].apply(t, arguments)
                        }
                    }(n));
                    for (var s = 0; s < y.length; s++) t.on(y[s], this.emit.bind(this, y[s]));
                    return this._read = function (e) {
                        g("wrapped _read", e), a && (a = !1, t.resume())
                    }, this
                }, Object.defineProperty(w.prototype, "readableHighWaterMark", {
                    enumerable: !1,
                    get: function () {
                        return this._readableState.highWaterMark
                    }
                }), w._fromList = O
            }).call(this, t("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        