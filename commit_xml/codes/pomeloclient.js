
(function (t) {


    function () {
        function t(t) {
            if (t) return e(t)
        }

        function e(e) {
            for (var i in t.prototype) e[i] = t.prototype[i];
            return e
        }
        t.prototype.on = t.prototype.addEventListener = function (t, e) {
            return this._callbacks = this._callbacks || {}, (this._callbacks[t] = this._callbacks[t] || []).push(e), this
        }, t.prototype.once = function (t, e) {
            var i = this;

            function a() {
                i.off(t, a), e.apply(this, arguments)
            }
            return this._callbacks = this._callbacks || {}, a.fn = e, this.on(t, a), this
        }, t.prototype.off = t.prototype.removeListener = t.prototype.removeAllListeners = t.prototype.removeEventListener = function (t, e) {
            if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
            var i, a = this._callbacks[t];
            if (!a) return this;
            if (1 == arguments.length) return delete this._callbacks[t], this;
            for (var n = 0; n < a.length; n++)
                if ((i = a[n]) === e || i.fn === e) {
                    a.splice(n, 1);
                    break
                } return this
        }, t.prototype.emit = function (t) {
            this._callbacks = this._callbacks || {};
            var e = [].slice.call(arguments, 1),
                i = this._callbacks[t];
            if (i)
                for (var a = 0, n = (i = i.slice(0)).length; a < n; ++a) i[a].apply(this, e);
            return this
        }, t.prototype.listeners = function (t) {
            return this._callbacks = this._callbacks || {}, this._callbacks[t] || []
        }, t.prototype.hasListeners = function (t) {
            return !!this.listeners(t).length
        }, "undefined" != typeof window && (window.EventEmitter = t)
    } (),
        function (t, e, i) {
            var a = t,
                n = a.Package = {},
                s = a.Message = {};
            n.TYPE_HANDSHAKE = 1, n.TYPE_HANDSHAKE_ACK = 2, n.TYPE_HEARTBEAT = 3, n.TYPE_DATA = 4, n.TYPE_KICK = 5, s.TYPE_REQUEST = 0, s.TYPE_NOTIFY = 1, s.TYPE_RESPONSE = 2, s.TYPE_PUSH = 3, a.strencode = function (t) {
                for (var i = new e(3 * t.length), a = 0, n = 0; n < t.length; n++) {
                    var s = t.charCodeAt(n),
                        o = null;
                    o = s <= 127 ? [s] : s <= 2047 ? [192 | s >> 6, 128 | 63 & s] : [224 | s >> 12, 128 | (4032 & s) >> 6, 128 | 63 & s];
                    for (var r = 0; r < o.length; r++) i[a] = o[r], ++a
                }
                var h = new e(a);
                return c(h, 0, i, 0, a), h
            }, a.strdecode = function (t) {
                for (var i = new e(t), a = [], n = 0, s = 0, o = i.length; n < o;) i[n] < 128 ? (s = i[n], n += 1) : i[n] < 224 ? (s = ((63 & i[n]) << 6) + (63 & i[n + 1]), n += 2) : (s = ((15 & i[n]) << 12) + ((63 & i[n + 1]) << 6) + (63 & i[n + 2]), n += 3), a.push(s);
                var r, c = "";
                for (r = 0; r < a.length / 8192; r++) c += String.fromCharCode.apply(null, a.slice(8192 * r, 8192 * (r + 1)));
                return c += String.fromCharCode.apply(null, a.slice(8192 * r))
            }, n.encode = function (t, i) {
                var a = i ? i.length : 0,
                    n = new e(4 + a),
                    s = 0;
                return n[s++] = 255 & t, n[s++] = a >> 16 & 255, n[s++] = a >> 8 & 255, n[s++] = 255 & a, i && c(n, s, i, 0, a), n
            }, n.decode = function (t) {
                for (var i = 0, a = new e(t), n = 0, s = []; i < a.length;) {
                    var o = a[i++],
                        r = (n = (a[i++] << 16 | a[i++] << 8 | a[i++]) >>> 0) ? new e(n) : null;
                    c(r, 0, a, i, n), i += n, s.push({
                        type: o,
                        body: r
                    })
                }
                return 1 === s.length ? s[0] : s
            };
            var o = function (t) {
                for (var i = Math.ceil(1e4 * Math.random() + 1e4), a = [i >> 8 & 255, 255 & i], n = 0, s = 0, o = t.length; s < o; s++) n += t[s] * (s + 1);
                for (var r = [n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, 255 & n], h = 0, f = t.length; h < f; h++) {
                    var d = 2 * (h + 1) + i * Math.pow(h, 2);
                    if (d > f && 0 == (d %= f) && (d = f), (d -= 1) != h) {
                        var l = t[h];
                        t[h] = t[d], t[d] = l
                    }
                }
                var u = new e(6 + t.length);
                return c(u, 0, a, 0, a.length), c(u, a.length, r, 0, r.length), c(u, a.length + r.length, t, 0, t.length), u
            },
                r = function (t) {
                    var i = (t[0] << 8) + t[1],
                        a = (t[2] << 24) + (t[3] << 16) + (t[4] << 8) + t[5],
                        n = new e(t.length - 6);
                    c(n, 0, t, 6, t.length);
                    for (var s = n.length, o = s - 1; o >= 0; o--) {
                        var r = 2 * (o + 1) + i * Math.pow(o, 2);
                        if (r > s && 0 == (r %= s) && (r = s), (r -= 1) != s) {
                            var h = n[o];
                            n[o] = n[r], n[r] = h
                        }
                    }
                    for (var f = 0, d = 0, l = n.length; d < l; d++) f += n[d] * (d + 1);
                    return (f &= 4294967295) != a ? null : n
                };
            s.encode = function (t, i, n, s, r) {
                var c = 1 + (h(i) ? d(t) : 0);
                if (f(i))
                    if (n) {
                        if ("number" != typeof s) throw new Error("error flag for number route!");
                        c += 2
                    } else if (c += 1, s) {
                        if ((s = a.strencode(s)).length > 255) throw new Error("route maxlength is overflow");
                        c += s.length
                    }
                r && (c += r.length);
                var m = new e(c),
                    b = 0;
                return b = l(i, n, m, b), h(i) && (b = u(t, m, b)), f(i) && (b = p(n, s, m, b)), r && (b = g(r, m, b)), o(m)
            }, s.decode = function (t) {
                t = r(t);
                var i = new e(t),
                    n = i.length || i.byteLength,
                    s = 0,
                    o = 0,
                    d = null,
                    l = i[s++],
                    u = 1 & l,
                    p = l >> 1 & 7;
                if (h(p)) {
                    var g = parseInt(i[s]),
                        m = 0;
                    do {
                        o += (127 & (g = parseInt(i[s]))) * Math.pow(2, 7 * m), s++, m++
                    } while (g >= 128)
                }
                if (f(p))
                    if (u) d = i[s++] << 8 | i[s++];
                    else {
                        var b = i[s++];
                        b ? (d = new e(b), c(d, 0, i, s, b), d = a.strdecode(d)) : d = "", s += b
                    } var v = n - s,
                        y = new e(v);
                return c(y, 0, i, s, v), {
                    id: o,
                    type: p,
                    compressRoute: u,
                    route: d,
                    body: y
                }
            };
            var c = function (t, e, i, a, n) {
                if ("function" == typeof i.copy) i.copy(t, e, a, a + n);
                else
                    for (var s = 0; s < n; s++) t[e++] = i[a++]
            },
                h = function (t) {
                    return t === s.TYPE_REQUEST || t === s.TYPE_RESPONSE
                },
                f = function (t) {
                    return t === s.TYPE_REQUEST || t === s.TYPE_NOTIFY || t === s.TYPE_PUSH
                },
                d = function (t) {
                    var e = 0;
                    do {
                        e += 1, t >>= 7
                    } while (t > 0);
                    return e
                },
                l = function (t, e, i, a) {
                    if (t !== s.TYPE_REQUEST && t !== s.TYPE_NOTIFY && t !== s.TYPE_RESPONSE && t !== s.TYPE_PUSH) throw new Error("unkonw message type: " + t);
                    return i[a] = t << 1 | (e ? 1 : 0), a + 1
                },
                u = function (t, e, i) {
                    do {
                        var a = t % 128,
                            n = Math.floor(t / 128);
                        0 !== n && (a += 128), e[i++] = a, t = n
                    } while (0 !== t);
                    return i
                },
                p = function (t, e, i, a) {
                    if (t) {
                        if (e > 65535) throw new Error("route number is overflow");
                        i[a++] = e >> 8 & 255, i[a++] = 255 & e
                    } else e ? (i[a++] = 255 & e.length, c(i, a, e, 0, e.length), a += e.length) : i[a++] = 0;
                    return a
                },
                g = function (t, e, i) {
                    return c(e, i, t, 0, t.length), i + t.length
                };
            "undefined" != typeof window && (window.Protocol = a)
        }("undefined" == typeof window ? e.exports : {}, "undefined" == typeof window ? t : Uint8Array),
        function (t, i) {
            var a = typeof window == "undefined" ? e.exports : {};
            a.init = function (t) {
                a.encoder.init(t.encoderProtos), a.decoder.init(t.decoderProtos)
            }, a.encode = function (t, e) {
                return a.encoder.encode(t, e)
            }, a.decode = function (t, e) {
                return a.decoder.decode(t, e)
            }, "undefined" != typeof window && (window.protobuf = a)
        }(), (("undefined" != typeof protobuf ? protobuf : e.exports).constants = {}).TYPES = {
            uInt32: 0,
            sInt32: 0,
            int32: 0,
            double: 1,
            string: 2,
            message: 2,
            float: 5
        }, (("undefined" != typeof protobuf ? protobuf : e.exports).util = {}).isSimpleType = function (t) {
            return "uInt32" === t || "sInt32" === t || "int32" === t || "uInt64" === t || "sInt64" === t || "float" === t || "double" === t
        },
        function (t, i) {
            var a = ("undefined" !== typeof protobuf ? protobuf : e.exports).codec = {},
                n = new ArrayBuffer(8),
                s = new Float32Array(n),
                o = new Float64Array(n),
                r = new Uint8Array(n);

            function c(t) {
                return t <= 127 ? [t] : t <= 2047 ? [192 | t >> 6, 128 | 63 & t] : [224 | t >> 12, 128 | (4032 & t) >> 6, 128 | 63 & t]
            }

            function h(t) {
                return t <= 127 ? 1 : t <= 2047 ? 2 : 3
            }
            a.encodeUInt32 = function (t) {
                t = parseInt(t);
                if (isNaN(t) || t < 0) return null;
                var e = [];
                do {
                    var i = t % 128,
                        a = Math.floor(t / 128);
                    0 !== a && (i += 128), e.push(i), t = a
                } while (0 !== t);
                return e
            }, a.encodeSInt32 = function (t) {
                t = parseInt(t);
                return isNaN(t) ? null : (t = t < 0 ? 2 * Math.abs(t) - 1 : 2 * t, a.encodeUInt32(t))
            }, a.decodeUInt32 = function (t) {
                for (var e = 0, i = 0; i < t.length; i++) {
                    var a = parseInt(t[i]);
                    if (e += (127 & a) * Math.pow(2, 7 * i), a < 128) return e
                }
                return e
            }, a.decodeSInt32 = function (t) {
                var e = this.decodeUInt32(t);
                return e = (e % 2 + e) / 2 * (e % 2 == 1 ? -1 : 1)
            }, a.encodeFloat = function (t) {
                return s[0] = t, r
            }, a.decodeFloat = function (t, e) {
                if (!t || t.length < e + 4) return null;
                for (var i = 0; i < 4; i++) r[i] = t[e + i];
                return s[0]
            }, a.encodeDouble = function (t) {
                return o[0] = t, r.subarray(0, 8)
            }, a.decodeDouble = function (t, e) {
                if (!t || t.length < e + 8) return null;
                for (var i = 0; i < 8; i++) r[i] = t[e + i];
                return o[0]
            }, a.encodeStr = function (t, e, i) {
                for (var a = 0; a < i.length; a++)
                    for (var n = c(i.charCodeAt(a)), s = 0; s < n.length; s++) t[e] = n[s], e++;
                return e
            }, a.decodeStr = function (t, e, i) {
                for (var a = [], n = e + i; e < n;) {
                    var s = 0;
                    t[e] < 128 ? (s = t[e], e += 1) : t[e] < 224 ? (s = ((63 & t[e]) << 6) + (63 & t[e + 1]), e += 2) : (s = ((15 & t[e]) << 12) + ((63 & t[e + 1]) << 6) + (63 & t[e + 2]), e += 3), a.push(s)
                }
                for (var o = "", r = 0; r < a.length;) o += String.fromCharCode.apply(null, a.slice(r, r + 1e4)), r += 1e4;
                return o
            }, a.byteLength = function (t) {
                if ("string" != typeof t) return -1;
                for (var e = 0, i = 0; i < t.length; i++) {
                    e += h(t.charCodeAt(i))
                }
                return e
            }
        }(),
        function (t, e) {
            var i = t,
                a = t.encoder = {},
                n = i.codec,
                s = i.constants,
                o = i.util;

            function r(t, e) {
                if (!e) return !1;
                for (var i in e) {
                    var n = e[i];
                    switch (n.option) {
                        case "required":
                            if (void 0 === t[i]) return console.warn("no property exist for required! name: %j, proto: %j, msg: %j", i, n, t), !1;
                        case "optional":
                            if (void 0 !== t[i])
                                if ((s = e.__messages[n.type] || a.protos["message " + n.type]) && !r(t[i], s)) return console.warn("inner proto error! name: %j, proto: %j, msg: %j", i, n, t), !1;
                            break;
                        case "repeated":
                            var s = e.__messages[n.type] || a.protos["message " + n.type];
                            if (t[i] && s)
                                for (var o = 0; o < t[i].length; o++)
                                    if (!r(t[i][o], s)) return !1
                    }
                }
                return !0
            }

            function c(t, e, i, a) {
                for (var n in a)
                    if (i[n]) {
                        var s = i[n];
                        switch (s.option) {
                            case "required":
                            case "optional":
                                e = d(t, e, l(s.type, s.tag)), e = h(a[n], s.type, e, t, i);
                                break;
                            case "repeated":
                                a[n].length > 0 && (e = f(a[n], s, e, t, i))
                        }
                    } return e
            }

            function h(t, e, i, s, o) {
                switch (e) {
                    case "uInt32":
                        i = d(s, i, n.encodeUInt32(t));
                        break;
                    case "int32":
                    case "sInt32":
                        i = d(s, i, n.encodeSInt32(t));
                        break;
                    case "float":
                        d(s, i, n.encodeFloat(t)), i += 4;
                        break;
                    case "double":
                        d(s, i, n.encodeDouble(t)), i += 8;
                        break;
                    case "string":
                        var r = n.byteLength(t);
                        i = d(s, i, n.encodeUInt32(r)), n.encodeStr(s, i, t), i += r;
                        break;
                    default:
                        var h = o.__messages[e] || a.protos["message " + e];
                        if (h) {
                            var f = new ArrayBuffer(2 * n.byteLength(JSON.stringify(t)));
                            r = c(f, r = 0, h, t), i = d(s, i, n.encodeUInt32(r));
                            for (var l = 0; l < r; l++) s[i] = f[l], i++
                        }
                }
                return i
            }

            function f(t, e, i, a, s) {
                var r = 0;
                if (o.isSimpleType(e.type))
                    for (i = d(a, i = d(a, i, l(e.type, e.tag)), n.encodeUInt32(t.length)), r = 0; r < t.length; r++) i = h(t[r], e.type, i, a);
                else
                    for (r = 0; r < t.length; r++) i = d(a, i, l(e.type, e.tag)), i = h(t[r], e.type, i, a, s);
                return i
            }

            function d(t, e, i) {
                for (var a = 0; a < i.length; a++, e++) t[e] = i[a];
                return e
            }

            function l(t, e) {
                var i = s.TYPES[t] || 2;
                return n.encodeUInt32(e << 3 | i)
            }
            a.init = function (t) {
                this.protos = t || {}
            }, a.encode = function (t, e) {
                var i = this.protos[t];
                if (!r(e, i)) return null;
                var a = n.byteLength(JSON.stringify(e)),
                    s = new ArrayBuffer(a),
                    o = new Uint8Array(s),
                    h = 0;
                return i && (h = c(o, h, i, e)) > 0 ? o.subarray(0, h) : null
            }
        }("undefined" != typeof protobuf ? protobuf : e.exports),
        function (t, e) {
            var i, a = t,
                n = t.decoder = {},
                s = a.codec,
                o = a.util,
                r = 0;

            function c(t, e, i) {
                for (; r < i;) {
                    var a = h(),
                        n = (a.type, a.tag),
                        s = e.__tags[n];
                    switch (e[s].option) {
                        case "optional":
                        case "required":
                            t[s] = f(e[s].type, e);
                            break;
                        case "repeated":
                            t[s] || (t[s] = []), d(t[s], e[s].type, e)
                    }
                }
                return t
            }

            function h() {
                var t = s.decodeUInt32(l());
                return {
                    type: 7 & t,
                    tag: t >> 3
                }
            }

            function f(t, e) {
                switch (t) {
                    case "uInt32":
                        return s.decodeUInt32(l());
                    case "int32":
                    case "sInt32":
                        return s.decodeSInt32(l());
                    case "float":
                        var a = s.decodeFloat(i, r);
                        return r += 4, a;
                    case "double":
                        var o = s.decodeDouble(i, r);
                        return r += 8, o;
                    case "string":
                        var h = s.decodeUInt32(l()),
                            f = s.decodeStr(i, r, h);
                        return r += h, f;
                    default:
                        var d = e && (e.__messages[t] || n.protos["message " + t]);
                        if (d) {
                            h = s.decodeUInt32(l());
                            var u = {};
                            return c(u, d, r + h), u
                        }
                }
            }

            function d(t, e, i) {
                if (o.isSimpleType(e))
                    for (var a = s.decodeUInt32(l()), n = 0; n < a; n++) t.push(f(e));
                else t.push(f(e, i))
            }

            function l(t) {
                var e, a = [],
                    n = r;
                t = t || !1;
                do {
                    e = i[n], a.push(e), n++
                } while (e >= 128);
                return t || (r = n), a
            }
            n.init = function (t) {
                this.protos = t || {}
            }, n.setProtos = function (t) {
                t && (this.protos = t)
            }, n.decode = function (t, e) {
                var a = this.protos[t];
                return i = e, r = 0, a ? c({}, a, i.length) : null
            }
        }("undefined" != typeof protobuf ? protobuf : e.exports),
        function () {
            var t = window.Protocol,
                e = window.protobuf,
                i = window.decodeIO_protobuf,
                a = null,
                n = null,
                s = t.Package,
                o = t.Message,
                r = window.EventEmitter,
                c = window.rsa,
                h = null;
            "undefined" != typeof window && "undefined" != typeof sys && sys.localStorage && (window.localStorage = sys.localStorage);
            "function" != typeof Object.create && (Object.create = function (t) {
                function e() { }
                return e.prototype = t, new e
            });
            var f = window,
                d = Object.create(r.prototype);
            f.pomelo = d;
            var l, u = null,
                p = 0,
                g = {},
                m = {},
                b = {},
                v = {},
                y = {},
                _ = {},
                x = {},
                w = 0,
                S = 0,
                k = 0,
                I = 0,
                T = null,
                C = null,
                E = null,
                M = null,
                P = null,
                D = !1,
                L = null,
                N = null,
                B = 0,
                A = 5e3,
                R = {
                    sys: {
                        type: "js-websocket",
                        version: "0.0.1",
                        rsa: {}
                    },
                    user: {}
                },
                H = null;
            d.init = function (t, e) {
                H = e;
                var i = t.host,
                    a = t.port;
                P = t.encode || V, M = t.decode || F;
                var n = "ws://" + i;
                if (-1 == i.indexOf("192.168.0.") && -1 == i.indexOf("test.") && (n = "wss://" + i), a && (n += ":" + a), R.user = t.user, t.encrypt) {
                    l = !0, c.generate(1024, "10001");
                    var s = {
                        rsa_n: c.n.toString(16),
                        rsa_e: c.e
                    };
                    R.sys.rsa = s
                }
                E = t.handshakeCallback, O(t, n, e)
            };
            var F = d.decode = function (t) {
                var e = o.decode(t);
                if (!(e.id > 0) || (e.route = b[e.id], delete b[e.id], e.route)) return e.body = J(e), e
            },
                V = d.encode = function (i, n, s) {
                    var r = i ? o.TYPE_REQUEST : o.TYPE_NOTIFY;
                    if (e && x[n]) s = e.encode(n, s);
                    else if (a && a.lookup(n)) {
                        s = new (a.build(n))(s).encodeNB()
                    } else s = t.strencode(JSON.stringify(s));
                    var c = 0;
                    return v && v[n] && (n = v[n], c = 1), o.encode(i, r, c, n, s)
                },
                O = function o(r, c, f) {
                    console.log("connect to " + c);
                    var l = (r = r || {}).maxReconnectAttempts || 10;
                    if (N = c, window.localStorage && window.localStorage.getItem("protos") && 0 === w) {
                        var p = JSON.parse(window.localStorage.getItem("protos"));
                        w = p.version || 0, _ = p.server || {}, x = p.client || {}, e && e.init({
                            encoderProtos: x,
                            decoderProtos: _
                        }), i && (a = i.loadJson(x), n = i.loadJson(_))
                    }
                    R.sys.protoVersion = w;
                    (u = new WebSocket(c)).binaryType = "arraybuffer", u.onopen = function (e) {
                        D && d.emit("reconnect"), G();
                        var i = s.encode(s.TYPE_HANDSHAKE, t.strencode(JSON.stringify(R)));
                        U(i)
                    }, u.onmessage = function (t) {
                        W(s.decode(t.data), f), k && (I = Date.now() + k), ftc._serverClose = !1
                    }, u.onerror = function (t) {
                        d.emit("io-error", t), console.error("socket error: ", t), ftc._serverClose = !0, ftc._serverReconnectCount = 0
                    }, u.onclose = function (t) {
                        d.emit("close", t), d.emit("disconnect", t), console.error("socket close: ", t), r.reconnect && B < l ? (D = !0, B++, L = setTimeout(function () {
                            o(r, N, f)
                        }, A), A *= 2) : ftc._serverClose = !0, u = null, h && h(), h = null
                    }
                };
            d.disconnect = function (t) {
                h = t, u && (u.disconnect && u.disconnect(), u.close && u.close(), console.log("disconnect"), u = null), T && (clearTimeout(T), T = null), C && (clearTimeout(C), C = null)
            };
            var G = function () {
                D = !1, A = 5e3, B = 0, clearTimeout(L)
            };
            d.request = function (t, e, i) {
                2 === arguments.length && "function" == typeof e ? (i = e, e = {}) : e = e || {}, (t = t || e.route) && (q(++p, t, e), g[p] = i, b[p] = t)
            }, d.notify = function (t, e) {
                q(0, t, e = e || {})
            };
            var q = function (t, e, i) {
                if (l) {
                    i = JSON.stringify(i);
                    var a = c.signString(i, "sha256");
                    (i = JSON.parse(i)).__crypto__ = a
                }
                P && (i = P(t, e, i));
                var n = s.encode(s.TYPE_DATA, i);
                U(n)
            },
                U = function (t) {
                    null !== u && u.send(t.buffer)
                },
                z = function t() {
                    var e = I - Date.now();
                    e > 100 ? C = setTimeout(t, e) : (console.error("server heartbeat timeout"), d.emit("heartbeat timeout"), d.disconnect())
                };
            m[s.TYPE_HANDSHAKE] = function (e) {
                if (501 !== (e = JSON.parse(t.strdecode(e))).code)
                    if (200 === e.code) {
                        Y(e);
                        var i = s.encode(s.TYPE_HANDSHAKE_ACK);
                        U(i), H && H(u)
                    } else d.emit("error", "handshake fail");
                else d.emit("error", "client version not fullfill")
            }, m[s.TYPE_HEARTBEAT] = function (t) {
                if (S) {
                    var e = s.encode(s.TYPE_HEARTBEAT);
                    C && (clearTimeout(C), C = null), T || (T = setTimeout(function () {
                        T = null, U(e), I = Date.now() + k, C = setTimeout(z, k)
                    }, S))
                }
            }, m[s.TYPE_DATA] = function (t) {
                var e = t;
                M && (e = M(e)), j(d, e)
            }, m[s.TYPE_KICK] = function (e) {
                e = JSON.parse(t.strdecode(e)), d.emit("onKick", e)
            };
            var W = function (t) {
                if (Array.isArray(t))
                    for (var e = 0; e < t.length; e++) {
                        var i = t[e];
                        m[i.type](i.body)
                    } else m[t.type](t.body)
            },
                j = function (t, e) {
                    if (e)
                        if (e.id) {
                            var i = g[e.id];
                            delete g[e.id], "function" == typeof i && i(e.body)
                        } else t.emit(e.route, e.body);
                    else console.log("err:msg == undefined")
                },
                J = function (i) {
                    var a = i.route;
                    if (i.compressRoute) {
                        if (!y[a]) return {};
                        a = i.route = y[a]
                    }
                    return e && _[a] ? e.decode(a, i.body) : n && n.lookup(a) ? n.build(a).decode(i.body) : JSON.parse(t.strdecode(i.body))
                },
                Y = function (t) {
                    t.sys && t.sys.heartbeat ? (S = 1e3 * t.sys.heartbeat, k = 2 * S) : (S = 0, k = 0), Z(t), "function" == typeof E && E(t.user)
                },
                Z = function (t) {
                    if (t && t.sys) {
                        v = t.sys.dict;
                        var s = t.sys.protos;
                        if (v)
                            for (var o in y = {}, v = v) y[v[o]] = o;
                        s && (w = s.version || 0, _ = s.server || {}, x = s.client || {}, window.localStorage.setItem("protos", JSON.stringify(s)), e && e.init({
                            encoderProtos: s.client,
                            decoderProtos: s.server
                        }), i && (a = i.loadJson(x), n = i.loadJson(_)))
                    }
                }
        }()
}).call(this, t("buffer").Buffer)
