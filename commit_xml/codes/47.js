
            (function (e) {
                
                var a = t("base64-js"),
                    n = t("ieee754"),
                    s = t("isarray");

                function o() {
                    return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
                }

                function r(t, e) {
                    if (o() < e) throw new RangeError("Invalid typed array length");
                    return c.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = c.prototype : (null === t && (t = new c(e)), t.length = e), t
                }

                function c(t, e, i) {
                    if (!(c.TYPED_ARRAY_SUPPORT || this instanceof c)) return new c(t, e, i);
                    if ("number" == typeof t) {
                        if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                        return l(this, t)
                    }
                    return h(this, t, e, i)
                }

                function h(t, e, i, a) {
                    if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                    return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? g(t, e, i, a) : "string" == typeof e ? u(t, e, i) : m(t, e)
                }

                function f(t) {
                    if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
                    if (t < 0) throw new RangeError('"size" argument must not be negative')
                }

                function d(t, e, i, a) {
                    return f(e), e <= 0 ? r(t, e) : void 0 !== i ? "string" == typeof a ? r(t, e).fill(i, a) : r(t, e).fill(i) : r(t, e)
                }

                function l(t, e) {
                    if (f(e), t = r(t, e < 0 ? 0 : 0 | b(e)), !c.TYPED_ARRAY_SUPPORT)
                        for (var i = 0; i < e; ++i) t[i] = 0;
                    return t
                }

                function u(t, e, i) {
                    if ("string" == typeof i && "" !== i || (i = "utf8"), !c.isEncoding(i)) throw new TypeError('"encoding" must be a valid string encoding');
                    var a = 0 | v(e, i),
                        n = (t = r(t, a)).write(e, i);
                    return n !== a && (t = t.slice(0, n)), t
                }

                function p(t, e) {
                    var i = e.length < 0 ? 0 : 0 | b(e.length);
                    t = r(t, i);
                    for (var a = 0; a < i; a += 1) t[a] = 255 & e[a];
                    return t
                }

                function g(t, e, i, a) {
                    if (e.byteLength, i < 0 || e.byteLength < i) throw new RangeError("'offset' is out of bounds");
                    if (e.byteLength < i + (a || 0)) throw new RangeError("'length' is out of bounds");
                    return e = void 0 === i && void 0 === a ? new Uint8Array(e) : void 0 === a ? new Uint8Array(e, i) : new Uint8Array(e, i, a), c.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = c.prototype : t = p(t, e), t
                }

                function m(t, e) {
                    if (c.isBuffer(e)) {
                        var i = 0 | b(e.length);
                        return 0 === (t = r(t, i)).length ? t : (e.copy(t, 0, 0, i), t)
                    }
                    if (e) {
                        if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || $(e.length) ? r(t, 0) : p(t, e);
                        if ("Buffer" === e.type && s(e.data)) return p(t, e.data)
                    }
                    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
                }

                function b(t) {
                    if (t >= o()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");
                    return 0 | t
                }

                function v(t, e) {
                    if (c.isBuffer(t)) return t.length;
                    if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
                    "string" != typeof t && (t = "" + t);
                    var i = t.length;
                    if (0 === i) return 0;
                    for (var a = !1; ;) switch (e) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return i;
                        case "utf8":
                        case "utf-8":
                        case void 0:
                            return Y(t).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * i;
                        case "hex":
                            return i >>> 1;
                        case "base64":
                            return X(t).length;
                        default:
                            if (a) return Y(t).length;
                            e = ("" + e).toLowerCase(), a = !0
                    }
                }

                function y(t, e, i) {
                    var a = !1;
                    if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                    if ((void 0 === i || i > this.length) && (i = this.length), i <= 0) return "";
                    if ((i >>>= 0) <= (e >>>= 0)) return "";
                    for (t || (t = "utf8"); ;) switch (t) {
                        case "hex":
                            return A(this, e, i);
                        case "utf8":
                        case "utf-8":
                            return P(this, e, i);
                        case "ascii":
                            return N(this, e, i);
                        case "latin1":
                        case "binary":
                            return B(this, e, i);
                        case "base64":
                            return M(this, e, i);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return R(this, e, i);
                        default:
                            if (a) throw new TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase(), a = !0
                    }
                }

                function _(t, e, i) {
                    var a = t[e];
                    t[e] = t[i], t[i] = a
                }

                function x(t, e, i, a, n) {
                    if (0 === t.length) return -1;
                    if ("string" == typeof i ? (a = i, i = 0) : i > 2147483647 ? i = 2147483647 : i < -2147483648 && (i = -2147483648), i = +i, isNaN(i) && (i = n ? 0 : t.length - 1), i < 0 && (i = t.length + i), i >= t.length) {
                        if (n) return -1;
                        i = t.length - 1
                    } else if (i < 0) {
                        if (!n) return -1;
                        i = 0
                    }
                    if ("string" == typeof e && (e = c.from(e, a)), c.isBuffer(e)) return 0 === e.length ? -1 : w(t, e, i, a, n);
                    if ("number" == typeof e) return e &= 255, c.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? n ? Uint8Array.prototype.indexOf.call(t, e, i) : Uint8Array.prototype.lastIndexOf.call(t, e, i) : w(t, [e], i, a, n);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function w(t, e, i, a, n) {
                    var s, o = 1,
                        r = t.length,
                        c = e.length;
                    if (void 0 !== a && ("ucs2" === (a = String(a).toLowerCase()) || "ucs-2" === a || "utf16le" === a || "utf-16le" === a)) {
                        if (t.length < 2 || e.length < 2) return -1;
                        o = 2, r /= 2, c /= 2, i /= 2
                    }

                    function h(t, e) {
                        return 1 === o ? t[e] : t.readUInt16BE(e * o)
                    }
                    if (n) {
                        var f = -1;
                        for (s = i; s < r; s++)
                            if (h(t, s) === h(e, -1 === f ? 0 : s - f)) {
                                if (-1 === f && (f = s), s - f + 1 === c) return f * o
                            } else -1 !== f && (s -= s - f), f = -1
                    } else
                        for (i + c > r && (i = r - c), s = i; s >= 0; s--) {
                            for (var d = !0, l = 0; l < c; l++)
                                if (h(t, s + l) !== h(e, l)) {
                                    d = !1;
                                    break
                                } if (d) return s
                        }
                    return -1
                }

                function S(t, e, i, a) {
                    i = Number(i) || 0;
                    var n = t.length - i;
                    a ? (a = Number(a)) > n && (a = n) : a = n;
                    var s = e.length;
                    if (s % 2 != 0) throw new TypeError("Invalid hex string");
                    a > s / 2 && (a = s / 2);
                    for (var o = 0; o < a; ++o) {
                        var r = parseInt(e.substr(2 * o, 2), 16);
                        if (isNaN(r)) return o;
                        t[i + o] = r
                    }
                    return o
                }

                function k(t, e, i, a) {
                    return Q(Y(e, t.length - i), t, i, a)
                }

                function I(t, e, i, a) {
                    return Q(Z(e), t, i, a)
                }

                function T(t, e, i, a) {
                    return I(t, e, i, a)
                }

                function C(t, e, i, a) {
                    return Q(X(e), t, i, a)
                }

                function E(t, e, i, a) {
                    return Q(K(e, t.length - i), t, i, a)
                }

                function M(t, e, i) {
                    return 0 === e && i === t.length ? a.fromByteArray(t) : a.fromByteArray(t.slice(e, i))
                }

                function P(t, e, i) {
                    i = Math.min(t.length, i);
                    for (var a = [], n = e; n < i;) {
                        var s, o, r, c, h = t[n],
                            f = null,
                            d = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1;
                        if (n + d <= i) switch (d) {
                            case 1:
                                h < 128 && (f = h);
                                break;
                            case 2:
                                128 == (192 & (s = t[n + 1])) && (c = (31 & h) << 6 | 63 & s) > 127 && (f = c);
                                break;
                            case 3:
                                s = t[n + 1], o = t[n + 2], 128 == (192 & s) && 128 == (192 & o) && (c = (15 & h) << 12 | (63 & s) << 6 | 63 & o) > 2047 && (c < 55296 || c > 57343) && (f = c);
                                break;
                            case 4:
                                s = t[n + 1], o = t[n + 2], r = t[n + 3], 128 == (192 & s) && 128 == (192 & o) && 128 == (192 & r) && (c = (15 & h) << 18 | (63 & s) << 12 | (63 & o) << 6 | 63 & r) > 65535 && c < 1114112 && (f = c)
                        }
                        null === f ? (f = 65533, d = 1) : f > 65535 && (f -= 65536, a.push(f >>> 10 & 1023 | 55296), f = 56320 | 1023 & f), a.push(f), n += d
                    }
                    return L(a)
                }
                i.Buffer = c, i.SlowBuffer = function (t) {
                    +t != t && (t = 0);
                    return c.alloc(+t)
                }, i.INSPECT_MAX_BYTES = 50, c.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function () {
                    try {
                        var t = new Uint8Array(1);
                        return t.__proto__ = {
                            __proto__: Uint8Array.prototype,
                            foo: function () {
                                return 42
                            }
                        }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
                    } catch (t) {
                        return !1
                    }
                }(), i.kMaxLength = o(), c.poolSize = 8192, c._augment = function (t) {
                    return t.__proto__ = c.prototype, t
                }, c.from = function (t, e, i) {
                    return h(null, t, e, i)
                }, c.TYPED_ARRAY_SUPPORT && (c.prototype.__proto__ = Uint8Array.prototype, c.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && c[Symbol.species] === c && Object.defineProperty(c, Symbol.species, {
                    value: null,
                    configurable: !0
                })), c.alloc = function (t, e, i) {
                    return d(null, t, e, i)
                }, c.allocUnsafe = function (t) {
                    return l(null, t)
                }, c.allocUnsafeSlow = function (t) {
                    return l(null, t)
                }, c.isBuffer = function (t) {
                    return !(null == t || !t._isBuffer)
                }, c.compare = function (t, e) {
                    if (!c.isBuffer(t) || !c.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                    if (t === e) return 0;
                    for (var i = t.length, a = e.length, n = 0, s = Math.min(i, a); n < s; ++n)
                        if (t[n] !== e[n]) {
                            i = t[n], a = e[n];
                            break
                        } return i < a ? -1 : a < i ? 1 : 0
                }, c.isEncoding = function (t) {
                    switch (String(t).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, c.concat = function (t, e) {
                    if (!s(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length) return c.alloc(0);
                    var i;
                    if (void 0 === e)
                        for (e = 0, i = 0; i < t.length; ++i) e += t[i].length;
                    var a = c.allocUnsafe(e),
                        n = 0;
                    for (i = 0; i < t.length; ++i) {
                        var o = t[i];
                        if (!c.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
                        o.copy(a, n), n += o.length
                    }
                    return a
                }, c.byteLength = v, c.prototype._isBuffer = !0, c.prototype.swap16 = function () {
                    var t = this.length;
                    if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var e = 0; e < t; e += 2) _(this, e, e + 1);
                    return this
                }, c.prototype.swap32 = function () {
                    var t = this.length;
                    if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var e = 0; e < t; e += 4) _(this, e, e + 3), _(this, e + 1, e + 2);
                    return this
                }, c.prototype.swap64 = function () {
                    var t = this.length;
                    if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var e = 0; e < t; e += 8) _(this, e, e + 7), _(this, e + 1, e + 6), _(this, e + 2, e + 5), _(this, e + 3, e + 4);
                    return this
                }, c.prototype.toString = function () {
                    var t = 0 | this.length;
                    return 0 === t ? "" : 0 === arguments.length ? P(this, 0, t) : y.apply(this, arguments)
                }, c.prototype.equals = function (t) {
                    if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    return this === t || 0 === c.compare(this, t)
                }, c.prototype.inspect = function () {
                    var t = "",
                        e = i.INSPECT_MAX_BYTES;
                    return this.length > 0 && (t = this.toString("hex", 0, e).match(/.{2}/g).join(" "), this.length > e && (t += " ... ")), "<Buffer " + t + ">"
                }, c.prototype.compare = function (t, e, i, a, n) {
                    if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    if (void 0 === e && (e = 0), void 0 === i && (i = t ? t.length : 0), void 0 === a && (a = 0), void 0 === n && (n = this.length), e < 0 || i > t.length || a < 0 || n > this.length) throw new RangeError("out of range index");
                    if (a >= n && e >= i) return 0;
                    if (a >= n) return -1;
                    if (e >= i) return 1;
                    if (e >>>= 0, i >>>= 0, a >>>= 0, n >>>= 0, this === t) return 0;
                    for (var s = n - a, o = i - e, r = Math.min(s, o), h = this.slice(a, n), f = t.slice(e, i), d = 0; d < r; ++d)
                        if (h[d] !== f[d]) {
                            s = h[d], o = f[d];
                            break
                        } return s < o ? -1 : o < s ? 1 : 0
                }, c.prototype.includes = function (t, e, i) {
                    return -1 !== this.indexOf(t, e, i)
                }, c.prototype.indexOf = function (t, e, i) {
                    return x(this, t, e, i, !0)
                }, c.prototype.lastIndexOf = function (t, e, i) {
                    return x(this, t, e, i, !1)
                }, c.prototype.write = function (t, e, i, a) {
                    if (void 0 === e) a = "utf8", i = this.length, e = 0;
                    else if (void 0 === i && "string" == typeof e) a = e, i = this.length, e = 0;
                    else {
                        if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        e |= 0, isFinite(i) ? (i |= 0, void 0 === a && (a = "utf8")) : (a = i, i = void 0)
                    }
                    var n = this.length - e;
                    if ((void 0 === i || i > n) && (i = n), t.length > 0 && (i < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    a || (a = "utf8");
                    for (var s = !1; ;) switch (a) {
                        case "hex":
                            return S(this, t, e, i);
                        case "utf8":
                        case "utf-8":
                            return k(this, t, e, i);
                        case "ascii":
                            return I(this, t, e, i);
                        case "latin1":
                        case "binary":
                            return T(this, t, e, i);
                        case "base64":
                            return C(this, t, e, i);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return E(this, t, e, i);
                        default:
                            if (s) throw new TypeError("Unknown encoding: " + a);
                            a = ("" + a).toLowerCase(), s = !0
                    }
                }, c.prototype.toJSON = function () {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                };
                var D = 4096;

                function L(t) {
                    var e = t.length;
                    if (e <= D) return String.fromCharCode.apply(String, t);
                    for (var i = "", a = 0; a < e;) i += String.fromCharCode.apply(String, t.slice(a, a += D));
                    return i
                }

                function N(t, e, i) {
                    var a = "";
                    i = Math.min(t.length, i);
                    for (var n = e; n < i; ++n) a += String.fromCharCode(127 & t[n]);
                    return a
                }

                function B(t, e, i) {
                    var a = "";
                    i = Math.min(t.length, i);
                    for (var n = e; n < i; ++n) a += String.fromCharCode(t[n]);
                    return a
                }

                function A(t, e, i) {
                    var a = t.length;
                    (!e || e < 0) && (e = 0), (!i || i < 0 || i > a) && (i = a);
                    for (var n = "", s = e; s < i; ++s) n += J(t[s]);
                    return n
                }

                function R(t, e, i) {
                    for (var a = t.slice(e, i), n = "", s = 0; s < a.length; s += 2) n += String.fromCharCode(a[s] + 256 * a[s + 1]);
                    return n
                }

                function H(t, e, i) {
                    if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                    if (t + e > i) throw new RangeError("Trying to access beyond buffer length")
                }

                function F(t, e, i, a, n, s) {
                    if (!c.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (e > n || e < s) throw new RangeError('"value" argument is out of bounds');
                    if (i + a > t.length) throw new RangeError("Index out of range")
                }

                function V(t, e, i, a) {
                    e < 0 && (e = 65535 + e + 1);
                    for (var n = 0, s = Math.min(t.length - i, 2); n < s; ++n) t[i + n] = (e & 255 << 8 * (a ? n : 1 - n)) >>> 8 * (a ? n : 1 - n)
                }

                function O(t, e, i, a) {
                    e < 0 && (e = 4294967295 + e + 1);
                    for (var n = 0, s = Math.min(t.length - i, 4); n < s; ++n) t[i + n] = e >>> 8 * (a ? n : 3 - n) & 255
                }

                function G(t, e, i, a, n, s) {
                    if (i + a > t.length) throw new RangeError("Index out of range");
                    if (i < 0) throw new RangeError("Index out of range")
                }

                function q(t, e, i, a, s) {
                    return s || G(t, 0, i, 4), n.write(t, e, i, a, 23, 4), i + 4
                }

                function U(t, e, i, a, s) {
                    return s || G(t, 0, i, 8), n.write(t, e, i, a, 52, 8), i + 8
                }
                c.prototype.slice = function (t, e) {
                    var i, a = this.length;
                    if (t = ~~t, e = void 0 === e ? a : ~~e, t < 0 ? (t += a) < 0 && (t = 0) : t > a && (t = a), e < 0 ? (e += a) < 0 && (e = 0) : e > a && (e = a), e < t && (e = t), c.TYPED_ARRAY_SUPPORT) (i = this.subarray(t, e)).__proto__ = c.prototype;
                    else {
                        var n = e - t;
                        i = new c(n, void 0);
                        for (var s = 0; s < n; ++s) i[s] = this[s + t]
                    }
                    return i
                }, c.prototype.readUIntLE = function (t, e, i) {
                    t |= 0, e |= 0, i || H(t, e, this.length);
                    for (var a = this[t], n = 1, s = 0; ++s < e && (n *= 256);) a += this[t + s] * n;
                    return a
                }, c.prototype.readUIntBE = function (t, e, i) {
                    t |= 0, e |= 0, i || H(t, e, this.length);
                    for (var a = this[t + --e], n = 1; e > 0 && (n *= 256);) a += this[t + --e] * n;
                    return a
                }, c.prototype.readUInt8 = function (t, e) {
                    return e || H(t, 1, this.length), this[t]
                }, c.prototype.readUInt16LE = function (t, e) {
                    return e || H(t, 2, this.length), this[t] | this[t + 1] << 8
                }, c.prototype.readUInt16BE = function (t, e) {
                    return e || H(t, 2, this.length), this[t] << 8 | this[t + 1]
                }, c.prototype.readUInt32LE = function (t, e) {
                    return e || H(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
                }, c.prototype.readUInt32BE = function (t, e) {
                    return e || H(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
                }, c.prototype.readIntLE = function (t, e, i) {
                    t |= 0, e |= 0, i || H(t, e, this.length);
                    for (var a = this[t], n = 1, s = 0; ++s < e && (n *= 256);) a += this[t + s] * n;
                    return a >= (n *= 128) && (a -= Math.pow(2, 8 * e)), a
                }, c.prototype.readIntBE = function (t, e, i) {
                    t |= 0, e |= 0, i || H(t, e, this.length);
                    for (var a = e, n = 1, s = this[t + --a]; a > 0 && (n *= 256);) s += this[t + --a] * n;
                    return s >= (n *= 128) && (s -= Math.pow(2, 8 * e)), s
                }, c.prototype.readInt8 = function (t, e) {
                    return e || H(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                }, c.prototype.readInt16LE = function (t, e) {
                    e || H(t, 2, this.length);
                    var i = this[t] | this[t + 1] << 8;
                    return 32768 & i ? 4294901760 | i : i
                }, c.prototype.readInt16BE = function (t, e) {
                    e || H(t, 2, this.length);
                    var i = this[t + 1] | this[t] << 8;
                    return 32768 & i ? 4294901760 | i : i
                }, c.prototype.readInt32LE = function (t, e) {
                    return e || H(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
                }, c.prototype.readInt32BE = function (t, e) {
                    return e || H(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
                }, c.prototype.readFloatLE = function (t, e) {
                    return e || H(t, 4, this.length), n.read(this, t, !0, 23, 4)
                }, c.prototype.readFloatBE = function (t, e) {
                    return e || H(t, 4, this.length), n.read(this, t, !1, 23, 4)
                }, c.prototype.readDoubleLE = function (t, e) {
                    return e || H(t, 8, this.length), n.read(this, t, !0, 52, 8)
                }, c.prototype.readDoubleBE = function (t, e) {
                    return e || H(t, 8, this.length), n.read(this, t, !1, 52, 8)
                }, c.prototype.writeUIntLE = function (t, e, i, a) {
                    (t = +t, e |= 0, i |= 0, a) || F(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
                    var n = 1,
                        s = 0;
                    for (this[e] = 255 & t; ++s < i && (n *= 256);) this[e + s] = t / n & 255;
                    return e + i
                }, c.prototype.writeUIntBE = function (t, e, i, a) {
                    (t = +t, e |= 0, i |= 0, a) || F(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
                    var n = i - 1,
                        s = 1;
                    for (this[e + n] = 255 & t; --n >= 0 && (s *= 256);) this[e + n] = t / s & 255;
                    return e + i
                }, c.prototype.writeUInt8 = function (t, e, i) {
                    return t = +t, e |= 0, i || F(this, t, e, 1, 255, 0), c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
                }, c.prototype.writeUInt16LE = function (t, e, i) {
                    return t = +t, e |= 0, i || F(this, t, e, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : V(this, t, e, !0), e + 2
                }, c.prototype.writeUInt16BE = function (t, e, i) {
                    return t = +t, e |= 0, i || F(this, t, e, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : V(this, t, e, !1), e + 2
                }, c.prototype.writeUInt32LE = function (t, e, i) {
                    return t = +t, e |= 0, i || F(this, t, e, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : O(this, t, e, !0), e + 4
                }, c.prototype.writeUInt32BE = function (t, e, i) {
                    return t = +t, e |= 0, i || F(this, t, e, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : O(this, t, e, !1), e + 4
                }, c.prototype.writeIntLE = function (t, e, i, a) {
                    if (t = +t, e |= 0, !a) {
                        var n = Math.pow(2, 8 * i - 1);
                        F(this, t, e, i, n - 1, -n)
                    }
                    var s = 0,
                        o = 1,
                        r = 0;
                    for (this[e] = 255 & t; ++s < i && (o *= 256);) t < 0 && 0 === r && 0 !== this[e + s - 1] && (r = 1), this[e + s] = (t / o >> 0) - r & 255;
                    return e + i
                }, c.prototype.writeIntBE = function (t, e, i, a) {
                    if (t = +t, e |= 0, !a) {
                        var n = Math.pow(2, 8 * i - 1);
                        F(this, t, e, i, n - 1, -n)
                    }
                    var s = i - 1,
                        o = 1,
                        r = 0;
                    for (this[e + s] = 255 & t; --s >= 0 && (o *= 256);) t < 0 && 0 === r && 0 !== this[e + s + 1] && (r = 1), this[e + s] = (t / o >> 0) - r & 255;
                    return e + i
                }, c.prototype.writeInt8 = function (t, e, i) {
                    return t = +t, e |= 0, i || F(this, t, e, 1, 127, -128), c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
                }, c.prototype.writeInt16LE = function (t, e, i) {
                    return t = +t, e |= 0, i || F(this, t, e, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : V(this, t, e, !0), e + 2
                }, c.prototype.writeInt16BE = function (t, e, i) {
                    return t = +t, e |= 0, i || F(this, t, e, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : V(this, t, e, !1), e + 2
                }, c.prototype.writeInt32LE = function (t, e, i) {
                    return t = +t, e |= 0, i || F(this, t, e, 4, 2147483647, -2147483648), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : O(this, t, e, !0), e + 4
                }, c.prototype.writeInt32BE = function (t, e, i) {
                    return t = +t, e |= 0, i || F(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : O(this, t, e, !1), e + 4
                }, c.prototype.writeFloatLE = function (t, e, i) {
                    return q(this, t, e, !0, i)
                }, c.prototype.writeFloatBE = function (t, e, i) {
                    return q(this, t, e, !1, i)
                }, c.prototype.writeDoubleLE = function (t, e, i) {
                    return U(this, t, e, !0, i)
                }, c.prototype.writeDoubleBE = function (t, e, i) {
                    return U(this, t, e, !1, i)
                }, c.prototype.copy = function (t, e, i, a) {
                    if (i || (i = 0), a || 0 === a || (a = this.length), e >= t.length && (e = t.length), e || (e = 0), a > 0 && a < i && (a = i), a === i) return 0;
                    if (0 === t.length || 0 === this.length) return 0;
                    if (e < 0) throw new RangeError("targetStart out of bounds");
                    if (i < 0 || i >= this.length) throw new RangeError("sourceStart out of bounds");
                    if (a < 0) throw new RangeError("sourceEnd out of bounds");
                    a > this.length && (a = this.length), t.length - e < a - i && (a = t.length - e + i);
                    var n, s = a - i;
                    if (this === t && i < e && e < a)
                        for (n = s - 1; n >= 0; --n) t[n + e] = this[n + i];
                    else if (s < 1e3 || !c.TYPED_ARRAY_SUPPORT)
                        for (n = 0; n < s; ++n) t[n + e] = this[n + i];
                    else Uint8Array.prototype.set.call(t, this.subarray(i, i + s), e);
                    return s
                }, c.prototype.fill = function (t, e, i, a) {
                    if ("string" == typeof t) {
                        if ("string" == typeof e ? (a = e, e = 0, i = this.length) : "string" == typeof i && (a = i, i = this.length), 1 === t.length) {
                            var n = t.charCodeAt(0);
                            n < 256 && (t = n)
                        }
                        if (void 0 !== a && "string" != typeof a) throw new TypeError("encoding must be a string");
                        if ("string" == typeof a && !c.isEncoding(a)) throw new TypeError("Unknown encoding: " + a)
                    } else "number" == typeof t && (t &= 255);
                    if (e < 0 || this.length < e || this.length < i) throw new RangeError("Out of range index");
                    if (i <= e) return this;
                    var s;
                    if (e >>>= 0, i = void 0 === i ? this.length : i >>> 0, t || (t = 0), "number" == typeof t)
                        for (s = e; s < i; ++s) this[s] = t;
                    else {
                        var o = c.isBuffer(t) ? t : Y(new c(t, a).toString()),
                            r = o.length;
                        for (s = 0; s < i - e; ++s) this[s + e] = o[s % r]
                    }
                    return this
                };
                var z = /[^+\/0-9A-Za-z-_]/g;

                function W(t) {
                    if ((t = j(t).replace(z, "")).length < 2) return "";
                    for (; t.length % 4 != 0;) t += "=";
                    return t
                }

                function j(t) {
                    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                }

                function J(t) {
                    return t < 16 ? "0" + t.toString(16) : t.toString(16)
                }

                function Y(t, e) {
                    var i;
                    e = e || 1 / 0;
                    for (var a = t.length, n = null, s = [], o = 0; o < a; ++o) {
                        if ((i = t.charCodeAt(o)) > 55295 && i < 57344) {
                            if (!n) {
                                if (i > 56319) {
                                    (e -= 3) > -1 && s.push(239, 191, 189);
                                    continue
                                }
                                if (o + 1 === a) {
                                    (e -= 3) > -1 && s.push(239, 191, 189);
                                    continue
                                }
                                n = i;
                                continue
                            }
                            if (i < 56320) {
                                (e -= 3) > -1 && s.push(239, 191, 189), n = i;
                                continue
                            }
                            i = 65536 + (n - 55296 << 10 | i - 56320)
                        } else n && (e -= 3) > -1 && s.push(239, 191, 189);
                        if (n = null, i < 128) {
                            if ((e -= 1) < 0) break;
                            s.push(i)
                        } else if (i < 2048) {
                            if ((e -= 2) < 0) break;
                            s.push(i >> 6 | 192, 63 & i | 128)
                        } else if (i < 65536) {
                            if ((e -= 3) < 0) break;
                            s.push(i >> 12 | 224, i >> 6 & 63 | 128, 63 & i | 128)
                        } else {
                            if (!(i < 1114112)) throw new Error("Invalid code point");
                            if ((e -= 4) < 0) break;
                            s.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, 63 & i | 128)
                        }
                    }
                    return s
                }

                function Z(t) {
                    for (var e = [], i = 0; i < t.length; ++i) e.push(255 & t.charCodeAt(i));
                    return e
                }

                function K(t, e) {
                    for (var i, a, n, s = [], o = 0; o < t.length && !((e -= 2) < 0); ++o) a = (i = t.charCodeAt(o)) >> 8, n = i % 256, s.push(n), s.push(a);
                    return s
                }

                function X(t) {
                    return a.toByteArray(W(t))
                }

                function Q(t, e, i, a) {
                    for (var n = 0; n < a && !(n + i >= e.length || n >= t.length); ++n) e[n + i] = t[n];
                    return n
                }

                function $(t) {
                    return t != t
                }
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        