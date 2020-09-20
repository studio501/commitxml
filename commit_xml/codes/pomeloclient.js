
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
        function (t, ByteArray, i) {
            var a = t,
                Package = a.Package = {},
                s = a.Message = {};
            Package.TYPE_HANDSHAKE = 1, Package.TYPE_HANDSHAKE_ACK = 2, Package.TYPE_HEARTBEAT = 3, Package.TYPE_DATA = 4, Package.TYPE_KICK = 5, s.TYPE_REQUEST = 0, s.TYPE_NOTIFY = 1, s.TYPE_RESPONSE = 2, s.TYPE_PUSH = 3, a.strencode = function (t) {
                for (var i = new ByteArray(3 * t.length), a = 0, n = 0; n < t.length; n++) {
                    var s = t.charCodeAt(n),
                        o = null;
                    o = s <= 127 ? [s] : s <= 2047 ? [192 | s >> 6, 128 | 63 & s] : [224 | s >> 12, 128 | (4032 & s) >> 6, 128 | 63 & s];
                    for (var r = 0; r < o.length; r++) i[a] = o[r], ++a
                }
                var h = new ByteArray(a);
                return copyArray(h, 0, i, 0, a), h
            }, a.strdecode = function (t) {
                for (var i = new ByteArray(t), a = [], n = 0, s = 0, o = i.length; n < o;) i[n] < 128 ? (s = i[n], n += 1) : i[n] < 224 ? (s = ((63 & i[n]) << 6) + (63 & i[n + 1]), n += 2) : (s = ((15 & i[n]) << 12) + ((63 & i[n + 1]) << 6) + (63 & i[n + 2]), n += 3), a.push(s);
                var r, c = "";
                for (r = 0; r < a.length / 8192; r++) c += String.fromCharCode.apply(null, a.slice(8192 * r, 8192 * (r + 1)));
                return c += String.fromCharCode.apply(null, a.slice(8192 * r))
            }, Package.encode = function (t, i) {
                var a = i ? i.length : 0,
                    n = new ByteArray(4 + a),
                    s = 0;
                return n[s++] = 255 & t, n[s++] = a >> 16 & 255, n[s++] = a >> 8 & 255, n[s++] = 255 & a, i && copyArray(n, s, i, 0, a), n
            }, Package.decode = function (t) {
                for (var offset = 0, bytes = new ByteArray(t), length = 0, rs = []; offset < bytes.length;) {
                    var type = bytes[offset++];
                    var body = (length = (bytes[offset++] << 16 | bytes[offset++] << 8 | bytes[offset++]) >>> 0) ? new ByteArray(length) : null;
                    copyArray(body, 0, bytes, offset, length);
                    offset += length;
                    rs.push({ type: type, body: body });
                }
                return 1 === rs.length ? rs[0] : rs
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
                var u = new ByteArray(6 + t.length);
                return copyArray(u, 0, a, 0, a.length), copyArray(u, a.length, r, 0, r.length), copyArray(u, a.length + r.length, t, 0, t.length), u
            },
                r = function (t) {
                    var i = (t[0] << 8) + t[1],
                        a = (t[2] << 24) + (t[3] << 16) + (t[4] << 8) + t[5],
                        n = new ByteArray(t.length - 6);
                    copyArray(n, 0, t, 6, t.length);
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
                var m = new ByteArray(c),
                    b = 0;
                return b = l(i, n, m, b), h(i) && (b = u(t, m, b)), f(i) && (b = p(n, s, m, b)), r && (b = g(r, m, b)), o(m)
            }, s.decode = function (t) {
                t = r(t);
                var i = new ByteArray(t),
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
                        b ? (d = new ByteArray(b), copyArray(d, 0, i, s, b), d = a.strdecode(d)) : d = "", s += b
                    } var v = n - s,
                        y = new ByteArray(v);
                return copyArray(y, 0, i, s, v), {
                    id: o,
                    type: p,
                    compressRoute: u,
                    route: d,
                    body: y
                }
            };
            var copyArray = function (t, e, i, a, n) {
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
                    } else e ? (i[a++] = 255 & e.length, copyArray(i, a, e, 0, e.length), a += e.length) : i[a++] = 0;
                    return a
                },
                g = function (t, e, i) {
                    return copyArray(e, i, t, 0, t.length), i + t.length
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
                protobuf = window.protobuf,
                decodeIO_protobuf = window.decodeIO_protobuf,
                a = null,
                n = null,
                Package = t.Package,
                o = t.Message,
                r = window.EventEmitter,
                rsa = window.rsa,
                h = null;
            "undefined" != typeof window && "undefined" != typeof sys && sys.localStorage && (window.localStorage = sys.localStorage);
            "function" != typeof Object.create && (Object.create = function (t) {
                function e() { }
                return e.prototype = t, new e
            });
            var f = window,
                pomelo = Object.create(r.prototype);
            f.pomelo = pomelo;
            var useCrypto, socket = null,
                p = 0,
                callbacks = {},
                handlers = {},
                b = {},
                dict = {},
                abbrs = {},
                serverProtos = {},
                clientProtos = {},
                protoVersion = 0,
                heartbeatInterval = 0,
                heartbeatTimeout = 0,
                nextHeartbeatTimeout = 0,
                heartbeatId = null,
                heartbeatTimeoutId = null,
                handshakeCallback = null,
                decode = null,
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
                initCallback = null;
            pomelo.init = function (t, e) {
                initCallback = e;
                var i = t.host;
                var a = t.port;
                P = t.encode || V;
                decode = t.decode || F;
                var n = "ws://" + i;
                if (i.indexOf("192.168.0.") == -1 && i.indexOf("test.") == -1) {
                    n = "wss://" + i;
                }
                if (a) {
                    n += ":" + a;
                }
                R.user = t.user;
                if (t.encrypt) {
                    useCrypto = true;
                    rsa.generate(1024, "10001");
                    var s = { rsa_n: rsa.n.toString(16), rsa_e: rsa.e };
                    R.sys.rsa = s;
                }
                handshakeCallback = t.handshakeCallback;
                O(t, n, e);

            };
            var F = pomelo.decode = function (t) {
                var e = o.decode(t);
                if (!(e.id > 0) || (e.route = b[e.id], delete b[e.id], e.route)) return e.body = J(e), e
            },
                V = pomelo.encode = function (i, n, s) {
                    var r = i ? o.TYPE_REQUEST : o.TYPE_NOTIFY;
                    if (protobuf && clientProtos[n]) s = protobuf.encode(n, s);
                    else if (a && a.lookup(n)) {
                        s = new (a.build(n))(s).encodeNB()
                    } else s = t.strencode(JSON.stringify(s));
                    var c = 0;
                    return dict && dict[n] && (n = dict[n], c = 1), o.encode(i, r, c, n, s)
                },
                O = function o(r, c, f) {
                    console.log("connect to " + c);
                    var l = (r = r || {}).maxReconnectAttempts || 10;
                    if (N = c, window.localStorage && window.localStorage.getItem("protos") && 0 === protoVersion) {
                        var p = JSON.parse(window.localStorage.getItem("protos"));
                        protoVersion = p.version || 0, serverProtos = p.server || {}, clientProtos = p.client || {}, protobuf && protobuf.init({
                            encoderProtos: clientProtos,
                            decoderProtos: serverProtos
                        }), decodeIO_protobuf && (a = decodeIO_protobuf.loadJson(clientProtos), n = decodeIO_protobuf.loadJson(serverProtos))
                    }
                    R.sys.protoVersion = protoVersion;
                    (socket = new WebSocket(c)).binaryType = "arraybuffer", socket.onopen = function (e) {
                        D && pomelo.emit("reconnect"), G();
                        var i = Package.encode(Package.TYPE_HANDSHAKE, t.strencode(JSON.stringify(R)));
                        send(i)
                    }, socket.onmessage = function (event) {
                        processPackage(Package.decode(event.data), f);
                        if (heartbeatTimeout) {
                            nextHeartbeatTimeout = Date.now() + heartbeatTimeout;
                        }
                        ftc._serverClose = false;

                    }, socket.onerror = function (t) {
                        pomelo.emit("io-error", t), console.error("socket error: ", t), ftc._serverClose = !0, ftc._serverReconnectCount = 0
                    }, socket.onclose = function (t) {
                        pomelo.emit("close", t), pomelo.emit("disconnect", t), console.error("socket close: ", t), r.reconnect && B < l ? (D = !0, B++, L = setTimeout(function () {
                            o(r, N, f)
                        }, A), A *= 2) : ftc._serverClose = !0, socket = null, h && h(), h = null
                    }
                };
            pomelo.disconnect = function (t) {
                h = t, socket && (socket.disconnect && socket.disconnect(), socket.close && socket.close(), console.log("disconnect"), socket = null), heartbeatId && (clearTimeout(heartbeatId), heartbeatId = null), heartbeatTimeoutId && (clearTimeout(heartbeatTimeoutId), heartbeatTimeoutId = null)
            };
            var G = function () {
                D = !1, A = 5e3, B = 0, clearTimeout(L)
            };
            pomelo.request = function (t, e, i) {
                2 === arguments.length && "function" == typeof e ? (i = e, e = {}) : e = e || {}, (t = t || e.route) && (q(++p, t, e), callbacks[p] = i, b[p] = t)
            }, pomelo.notify = function (t, e) {
                q(0, t, e = e || {})
            };
            var q = function (t, e, i) {
                if (useCrypto) {
                    i = JSON.stringify(i);
                    var a = rsa.signString(i, "sha256");
                    (i = JSON.parse(i)).__crypto__ = a
                }
                P && (i = P(t, e, i));
                var n = Package.encode(Package.TYPE_DATA, i);
                send(n)
            },
                send = function (t) {
                    null !== socket && socket.send(t.buffer)
                },
                z = function t() {
                    var e = nextHeartbeatTimeout - Date.now();
                    e > 100 ? heartbeatTimeoutId = setTimeout(t, e) : (console.error("server heartbeat timeout"), pomelo.emit("heartbeat timeout"), pomelo.disconnect())
                };
            handlers[Package.TYPE_HANDSHAKE] = function (data) {
                if ((data = JSON.parse(t.strdecode(data))).code === 501) {
                    pomelo.emit("error", "client version not fullfill");
                } else if (data.code === 200) {
                    handshakeInit(data);
                    var obj = Package.encode(Package.TYPE_HANDSHAKE_ACK);
                    send(obj);
                    if (initCallback) {
                        initCallback(socket);
                    }
                } else {
                    pomelo.emit("error", "handshake fail");
                }

            }, handlers[Package.TYPE_HEARTBEAT] = function (t) {
                if (heartbeatInterval) {
                    var obj = Package.encode(Package.TYPE_HEARTBEAT);
                    if (heartbeatTimeoutId) {
                        clearTimeout(heartbeatTimeoutId);
                        heartbeatTimeoutId = null;
                    }
                    if (!heartbeatId) {
                        heartbeatId = setTimeout(function () {
                            heartbeatId = null;
                            send(obj);
                            nextHeartbeatTimeout = Date.now() + heartbeatTimeout;
                            heartbeatTimeoutId = setTimeout(z, heartbeatTimeout);
                        }, heartbeatInterval);
                    }
                }

            }, handlers[Package.TYPE_DATA] = function (data) {
                var msg = data;
                if (decode) {
                    msg = decode(msg);
                }
                processMessage(pomelo, msg);

            }, handlers[Package.TYPE_KICK] = function (e) {
                e = JSON.parse(t.strdecode(e)), pomelo.emit("onKick", e)
            };
            var processPackage = function (msgs) {
                if (Array.isArray(msgs)) {
                    for (var e = 0; e < msgs.length; e++) {
                        var msg = msgs[e];
                        handlers[msg.type](msg.body);
                    }
                } else {
                    handlers[msgs.type](msgs.body);
                }

            },
                processMessage = function (pomelo, msg) {
                    if (msg) {
                        if (msg.id) {
                            var cb = callbacks[msg.id];
                            delete callbacks[msg.id];
                            if (typeof cb == "function") {
                                cb(msg.body);
                            }
                        } else {
                            pomelo.emit(msg.route, msg.body);
                        }
                    } else {
                        console.log("err:msg == undefined");
                    }

                },
                J = function (i) {
                    var a = i.route;
                    if (i.compressRoute) {
                        if (!abbrs[a]) return {};
                        a = i.route = abbrs[a]
                    }
                    return protobuf && serverProtos[a] ? protobuf.decode(a, i.body) : n && n.lookup(a) ? n.build(a).decode(i.body) : JSON.parse(t.strdecode(i.body))
                },
                handshakeInit = function (data) {
                    if (data.sys && data.sys.heartbeat) {
                        heartbeatInterval = 1e3 * data.sys.heartbeat;
                        heartbeatTimeout = 2 * heartbeatInterval;
                    } else {
                        heartbeatInterval = 0;
                        heartbeatTimeout = 0;
                    }
                    initData(data);
                    if (typeof handshakeCallback == "function") {
                        handshakeCallback(data.user);
                    }

                },
                initData = function (data) {
                    if (data && data.sys) {
                        dict = data.sys.dict;
                        var protos = data.sys.protos;
                        if (dict) {
                            for (var route in abbrs = {}, dict = dict) {
                                abbrs[dict[route]] = route;
                            }
                        }
                        if (protos) {
                            protoVersion = protos.version || 0;
                            serverProtos = protos.server || {};
                            clientProtos = protos.client || {};
                            window.localStorage.setItem("protos", JSON.stringify(protos));
                            if (protobuf) {
                                protobuf.init({ encoderProtos: protos.client, decoderProtos: protos.server });
                            }
                            if (decodeIO_protobuf) {
                                a = decodeIO_protobuf.loadJson(clientProtos);
                                n = decodeIO_protobuf.loadJson(serverProtos);
                            }
                        }
                    }

                }
        }()
}).call(this, t("buffer").Buffer)
