
            (function (e, i) {
                

                function a(t, e) {
                    if (!t) throw new Error(e || "Assertion failed")
                }

                function n(t, e) {
                    t.super_ = e;
                    var i = function () { };
                    i.prototype = e.prototype, t.prototype = new i, t.prototype.constructor = t
                }

                function s(t, e, i) {
                    if (s.isBN(t)) return t;
                    this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && ("le" !== e && "be" !== e || (i = e, e = 10), this._init(t || 0, e || 10, i || "be"))
                }
                var o;
                "object" == typeof e ? e.exports = s : i.BN = s, s.BN = s, s.wordSize = 26;
                try {
                    o = t("buffer").Buffer
                } catch (t) { }

                function r(t, e, i) {
                    for (var a = 0, n = Math.min(t.length, i), s = e; s < n; s++) {
                        var o = t.charCodeAt(s) - 48;
                        a <<= 4, a |= o >= 49 && o <= 54 ? o - 49 + 10 : o >= 17 && o <= 22 ? o - 17 + 10 : 15 & o
                    }
                    return a
                }

                function c(t, e, i, a) {
                    for (var n = 0, s = Math.min(t.length, i), o = e; o < s; o++) {
                        var r = t.charCodeAt(o) - 48;
                        n *= a, n += r >= 49 ? r - 49 + 10 : r >= 17 ? r - 17 + 10 : r
                    }
                    return n
                }
                s.isBN = function (t) {
                    return t instanceof s || null !== t && "object" == typeof t && t.constructor.wordSize === s.wordSize && Array.isArray(t.words)
                }, s.max = function (t, e) {
                    return t.cmp(e) > 0 ? t : e
                }, s.min = function (t, e) {
                    return t.cmp(e) < 0 ? t : e
                }, s.prototype._init = function (t, e, i) {
                    if ("number" == typeof t) return this._initNumber(t, e, i);
                    if ("object" == typeof t) return this._initArray(t, e, i);
                    "hex" === e && (e = 16), a(e === (0 | e) && e >= 2 && e <= 36);
                    var n = 0;
                    "-" === (t = t.toString().replace(/\s+/g, ""))[0] && n++, 16 === e ? this._parseHex(t, n) : this._parseBase(t, e, n), "-" === t[0] && (this.negative = 1), this.strip(), "le" === i && this._initArray(this.toArray(), e, i)
                }, s.prototype._initNumber = function (t, e, i) {
                    t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [67108863 & t], this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863], this.length = 2) : (a(t < 9007199254740992), this.words = [67108863 & t, t / 67108864 & 67108863, 1], this.length = 3), "le" === i && this._initArray(this.toArray(), e, i)
                }, s.prototype._initArray = function (t, e, i) {
                    if (a("number" == typeof t.length), t.length <= 0) return this.words = [0], this.length = 1, this;
                    this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);
                    for (var n = 0; n < this.length; n++) this.words[n] = 0;
                    var s, o, r = 0;
                    if ("be" === i)
                        for (n = t.length - 1, s = 0; n >= 0; n -= 3) o = t[n] | t[n - 1] << 8 | t[n - 2] << 16, this.words[s] |= o << r & 67108863, this.words[s + 1] = o >>> 26 - r & 67108863, (r += 24) >= 26 && (r -= 26, s++);
                    else if ("le" === i)
                        for (n = 0, s = 0; n < t.length; n += 3) o = t[n] | t[n + 1] << 8 | t[n + 2] << 16, this.words[s] |= o << r & 67108863, this.words[s + 1] = o >>> 26 - r & 67108863, (r += 24) >= 26 && (r -= 26, s++);
                    return this.strip()
                }, s.prototype._parseHex = function (t, e) {
                    this.length = Math.ceil((t.length - e) / 6), this.words = new Array(this.length);
                    for (var i = 0; i < this.length; i++) this.words[i] = 0;
                    var a, n, s = 0;
                    for (i = t.length - 6, a = 0; i >= e; i -= 6) n = r(t, i, i + 6), this.words[a] |= n << s & 67108863, this.words[a + 1] |= n >>> 26 - s & 4194303, (s += 24) >= 26 && (s -= 26, a++);
                    i + 6 !== e && (n = r(t, e, i + 6), this.words[a] |= n << s & 67108863, this.words[a + 1] |= n >>> 26 - s & 4194303), this.strip()
                }, s.prototype._parseBase = function (t, e, i) {
                    this.words = [0], this.length = 1;
                    for (var a = 0, n = 1; n <= 67108863; n *= e) a++;
                    a--, n = n / e | 0;
                    for (var s = t.length - i, o = s % a, r = Math.min(s, s - o) + i, h = 0, f = i; f < r; f += a) h = c(t, f, f + a, e), this.imuln(n), this.words[0] + h < 67108864 ? this.words[0] += h : this._iaddn(h);
                    if (0 !== o) {
                        var d = 1;
                        for (h = c(t, f, t.length, e), f = 0; f < o; f++) d *= e;
                        this.imuln(d), this.words[0] + h < 67108864 ? this.words[0] += h : this._iaddn(h)
                    }
                }, s.prototype.copy = function (t) {
                    t.words = new Array(this.length);
                    for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
                    t.length = this.length, t.negative = this.negative, t.red = this.red
                }, s.prototype.clone = function () {
                    var t = new s(null);
                    return this.copy(t), t
                }, s.prototype._expand = function (t) {
                    for (; this.length < t;) this.words[this.length++] = 0;
                    return this
                }, s.prototype.strip = function () {
                    for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
                    return this._normSign()
                }, s.prototype._normSign = function () {
                    return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
                }, s.prototype.inspect = function () {
                    return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
                };
                var h = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"],
                    f = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                    d = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

                function l(t) {
                    for (var e = new Array(t.bitLength()), i = 0; i < e.length; i++) {
                        var a = i / 26 | 0,
                            n = i % 26;
                        e[i] = (t.words[a] & 1 << n) >>> n
                    }
                    return e
                }

                function u(t, e, i) {
                    i.negative = e.negative ^ t.negative;
                    var a = t.length + e.length | 0;
                    i.length = a, a = a - 1 | 0;
                    var n = 0 | t.words[0],
                        s = 0 | e.words[0],
                        o = n * s,
                        r = 67108863 & o,
                        c = o / 67108864 | 0;
                    i.words[0] = r;
                    for (var h = 1; h < a; h++) {
                        for (var f = c >>> 26, d = 67108863 & c, l = Math.min(h, e.length - 1), u = Math.max(0, h - t.length + 1); u <= l; u++) {
                            var p = h - u | 0;
                            f += (o = (n = 0 | t.words[p]) * (s = 0 | e.words[u]) + d) / 67108864 | 0, d = 67108863 & o
                        }
                        i.words[h] = 0 | d, c = 0 | f
                    }
                    return 0 !== c ? i.words[h] = 0 | c : i.length--, i.strip()
                }
                s.prototype.toString = function (t, e) {
                    var i;
                    if (t = t || 10, e = 0 | e || 1, 16 === t || "hex" === t) {
                        i = "";
                        for (var n = 0, s = 0, o = 0; o < this.length; o++) {
                            var r = this.words[o],
                                c = (16777215 & (r << n | s)).toString(16);
                            i = 0 !== (s = r >>> 24 - n & 16777215) || o !== this.length - 1 ? h[6 - c.length] + c + i : c + i, (n += 2) >= 26 && (n -= 26, o--)
                        }
                        for (0 !== s && (i = s.toString(16) + i); i.length % e != 0;) i = "0" + i;
                        return 0 !== this.negative && (i = "-" + i), i
                    }
                    if (t === (0 | t) && t >= 2 && t <= 36) {
                        var l = f[t],
                            u = d[t];
                        i = "";
                        var p = this.clone();
                        for (p.negative = 0; !p.isZero();) {
                            var g = p.modn(u).toString(t);
                            i = (p = p.idivn(u)).isZero() ? g + i : h[l - g.length] + g + i
                        }
                        for (this.isZero() && (i = "0" + i); i.length % e != 0;) i = "0" + i;
                        return 0 !== this.negative && (i = "-" + i), i
                    }
                    a(!1, "Base should be between 2 and 36")
                }, s.prototype.toNumber = function () {
                    var t = this.words[0];
                    return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && a(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t : t
                }, s.prototype.toJSON = function () {
                    return this.toString(16)
                }, s.prototype.toBuffer = function (t, e) {
                    return a(void 0 !== o), this.toArrayLike(o, t, e)
                }, s.prototype.toArray = function (t, e) {
                    return this.toArrayLike(Array, t, e)
                }, s.prototype.toArrayLike = function (t, e, i) {
                    var n = this.byteLength(),
                        s = i || Math.max(1, n);
                    a(n <= s, "byte array longer than desired length"), a(s > 0, "Requested array length <= 0"), this.strip();
                    var o, r, c = "le" === e,
                        h = new t(s),
                        f = this.clone();
                    if (c) {
                        for (r = 0; !f.isZero(); r++) o = f.andln(255), f.iushrn(8), h[r] = o;
                        for (; r < s; r++) h[r] = 0
                    } else {
                        for (r = 0; r < s - n; r++) h[r] = 0;
                        for (r = 0; !f.isZero(); r++) o = f.andln(255), f.iushrn(8), h[s - r - 1] = o
                    }
                    return h
                }, Math.clz32 ? s.prototype._countBits = function (t) {
                    return 32 - Math.clz32(t)
                } : s.prototype._countBits = function (t) {
                    var e = t,
                        i = 0;
                    return e >= 4096 && (i += 13, e >>>= 13), e >= 64 && (i += 7, e >>>= 7), e >= 8 && (i += 4, e >>>= 4), e >= 2 && (i += 2, e >>>= 2), i + e
                }, s.prototype._zeroBits = function (t) {
                    if (0 === t) return 26;
                    var e = t,
                        i = 0;
                    return 0 == (8191 & e) && (i += 13, e >>>= 13), 0 == (127 & e) && (i += 7, e >>>= 7), 0 == (15 & e) && (i += 4, e >>>= 4), 0 == (3 & e) && (i += 2, e >>>= 2), 0 == (1 & e) && i++, i
                }, s.prototype.bitLength = function () {
                    var t = this.words[this.length - 1],
                        e = this._countBits(t);
                    return 26 * (this.length - 1) + e
                }, s.prototype.zeroBits = function () {
                    if (this.isZero()) return 0;
                    for (var t = 0, e = 0; e < this.length; e++) {
                        var i = this._zeroBits(this.words[e]);
                        if (t += i, 26 !== i) break
                    }
                    return t
                }, s.prototype.byteLength = function () {
                    return Math.ceil(this.bitLength() / 8)
                }, s.prototype.toTwos = function (t) {
                    return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
                }, s.prototype.fromTwos = function (t) {
                    return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
                }, s.prototype.isNeg = function () {
                    return 0 !== this.negative
                }, s.prototype.neg = function () {
                    return this.clone().ineg()
                }, s.prototype.ineg = function () {
                    return this.isZero() || (this.negative ^= 1), this
                }, s.prototype.iuor = function (t) {
                    for (; this.length < t.length;) this.words[this.length++] = 0;
                    for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
                    return this.strip()
                }, s.prototype.ior = function (t) {
                    return a(0 == (this.negative | t.negative)), this.iuor(t)
                }, s.prototype.or = function (t) {
                    return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
                }, s.prototype.uor = function (t) {
                    return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
                }, s.prototype.iuand = function (t) {
                    var e;
                    e = this.length > t.length ? t : this;
                    for (var i = 0; i < e.length; i++) this.words[i] = this.words[i] & t.words[i];
                    return this.length = e.length, this.strip()
                }, s.prototype.iand = function (t) {
                    return a(0 == (this.negative | t.negative)), this.iuand(t)
                }, s.prototype.and = function (t) {
                    return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
                }, s.prototype.uand = function (t) {
                    return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
                }, s.prototype.iuxor = function (t) {
                    var e, i;
                    this.length > t.length ? (e = this, i = t) : (e = t, i = this);
                    for (var a = 0; a < i.length; a++) this.words[a] = e.words[a] ^ i.words[a];
                    if (this !== e)
                        for (; a < e.length; a++) this.words[a] = e.words[a];
                    return this.length = e.length, this.strip()
                }, s.prototype.ixor = function (t) {
                    return a(0 == (this.negative | t.negative)), this.iuxor(t)
                }, s.prototype.xor = function (t) {
                    return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
                }, s.prototype.uxor = function (t) {
                    return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
                }, s.prototype.inotn = function (t) {
                    a("number" == typeof t && t >= 0);
                    var e = 0 | Math.ceil(t / 26),
                        i = t % 26;
                    this._expand(e), i > 0 && e--;
                    for (var n = 0; n < e; n++) this.words[n] = 67108863 & ~this.words[n];
                    return i > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - i), this.strip()
                }, s.prototype.notn = function (t) {
                    return this.clone().inotn(t)
                }, s.prototype.setn = function (t, e) {
                    a("number" == typeof t && t >= 0);
                    var i = t / 26 | 0,
                        n = t % 26;
                    return this._expand(i + 1), this.words[i] = e ? this.words[i] | 1 << n : this.words[i] & ~(1 << n), this.strip()
                }, s.prototype.iadd = function (t) {
                    var e, i, a;
                    if (0 !== this.negative && 0 === t.negative) return this.negative = 0, e = this.isub(t), this.negative ^= 1, this._normSign();
                    if (0 === this.negative && 0 !== t.negative) return t.negative = 0, e = this.isub(t), t.negative = 1, e._normSign();
                    this.length > t.length ? (i = this, a = t) : (i = t, a = this);
                    for (var n = 0, s = 0; s < a.length; s++) e = (0 | i.words[s]) + (0 | a.words[s]) + n, this.words[s] = 67108863 & e, n = e >>> 26;
                    for (; 0 !== n && s < i.length; s++) e = (0 | i.words[s]) + n, this.words[s] = 67108863 & e, n = e >>> 26;
                    if (this.length = i.length, 0 !== n) this.words[this.length] = n, this.length++;
                    else if (i !== this)
                        for (; s < i.length; s++) this.words[s] = i.words[s];
                    return this
                }, s.prototype.add = function (t) {
                    var e;
                    return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, e = this.sub(t), t.negative ^= 1, e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0, e = t.sub(this), this.negative = 1, e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
                }, s.prototype.isub = function (t) {
                    if (0 !== t.negative) {
                        t.negative = 0;
                        var e = this.iadd(t);
                        return t.negative = 1, e._normSign()
                    }
                    if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this._normSign();
                    var i, a, n = this.cmp(t);
                    if (0 === n) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
                    n > 0 ? (i = this, a = t) : (i = t, a = this);
                    for (var s = 0, o = 0; o < a.length; o++) s = (e = (0 | i.words[o]) - (0 | a.words[o]) + s) >> 26, this.words[o] = 67108863 & e;
                    for (; 0 !== s && o < i.length; o++) s = (e = (0 | i.words[o]) + s) >> 26, this.words[o] = 67108863 & e;
                    if (0 === s && o < i.length && i !== this)
                        for (; o < i.length; o++) this.words[o] = i.words[o];
                    return this.length = Math.max(this.length, o), i !== this && (this.negative = 1), this.strip()
                }, s.prototype.sub = function (t) {
                    return this.clone().isub(t)
                };
                var p = function (t, e, i) {
                    var a, n, s, o = t.words,
                        r = e.words,
                        c = i.words,
                        h = 0,
                        f = 0 | o[0],
                        d = 8191 & f,
                        l = f >>> 13,
                        u = 0 | o[1],
                        p = 8191 & u,
                        g = u >>> 13,
                        m = 0 | o[2],
                        b = 8191 & m,
                        v = m >>> 13,
                        y = 0 | o[3],
                        _ = 8191 & y,
                        x = y >>> 13,
                        w = 0 | o[4],
                        S = 8191 & w,
                        k = w >>> 13,
                        I = 0 | o[5],
                        T = 8191 & I,
                        C = I >>> 13,
                        E = 0 | o[6],
                        M = 8191 & E,
                        P = E >>> 13,
                        D = 0 | o[7],
                        L = 8191 & D,
                        N = D >>> 13,
                        B = 0 | o[8],
                        A = 8191 & B,
                        R = B >>> 13,
                        H = 0 | o[9],
                        F = 8191 & H,
                        V = H >>> 13,
                        O = 0 | r[0],
                        G = 8191 & O,
                        q = O >>> 13,
                        U = 0 | r[1],
                        z = 8191 & U,
                        W = U >>> 13,
                        j = 0 | r[2],
                        J = 8191 & j,
                        Y = j >>> 13,
                        Z = 0 | r[3],
                        K = 8191 & Z,
                        X = Z >>> 13,
                        Q = 0 | r[4],
                        $ = 8191 & Q,
                        tt = Q >>> 13,
                        et = 0 | r[5],
                        it = 8191 & et,
                        at = et >>> 13,
                        nt = 0 | r[6],
                        st = 8191 & nt,
                        ot = nt >>> 13,
                        rt = 0 | r[7],
                        ct = 8191 & rt,
                        ht = rt >>> 13,
                        ft = 0 | r[8],
                        dt = 8191 & ft,
                        lt = ft >>> 13,
                        ut = 0 | r[9],
                        pt = 8191 & ut,
                        gt = ut >>> 13;
                    i.negative = t.negative ^ e.negative, i.length = 19;
                    var mt = (h + (a = Math.imul(d, G)) | 0) + ((8191 & (n = (n = Math.imul(d, q)) + Math.imul(l, G) | 0)) << 13) | 0;
                    h = ((s = Math.imul(l, q)) + (n >>> 13) | 0) + (mt >>> 26) | 0, mt &= 67108863, a = Math.imul(p, G), n = (n = Math.imul(p, q)) + Math.imul(g, G) | 0, s = Math.imul(g, q);
                    var bt = (h + (a = a + Math.imul(d, z) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(d, W) | 0) + Math.imul(l, z) | 0)) << 13) | 0;
                    h = ((s = s + Math.imul(l, W) | 0) + (n >>> 13) | 0) + (bt >>> 26) | 0, bt &= 67108863, a = Math.imul(b, G), n = (n = Math.imul(b, q)) + Math.imul(v, G) | 0, s = Math.imul(v, q), a = a + Math.imul(p, z) | 0, n = (n = n + Math.imul(p, W) | 0) + Math.imul(g, z) | 0, s = s + Math.imul(g, W) | 0;
                    var vt = (h + (a = a + Math.imul(d, J) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(d, Y) | 0) + Math.imul(l, J) | 0)) << 13) | 0;
                    h = ((s = s + Math.imul(l, Y) | 0) + (n >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863, a = Math.imul(_, G), n = (n = Math.imul(_, q)) + Math.imul(x, G) | 0, s = Math.imul(x, q), a = a + Math.imul(b, z) | 0, n = (n = n + Math.imul(b, W) | 0) + Math.imul(v, z) | 0, s = s + Math.imul(v, W) | 0, a = a + Math.imul(p, J) | 0, n = (n = n + Math.imul(p, Y) | 0) + Math.imul(g, J) | 0, s = s + Math.imul(g, Y) | 0;
                    var yt = (h + (a = a + Math.imul(d, K) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(d, X) | 0) + Math.imul(l, K) | 0)) << 13) | 0;
                    h = ((s = s + Math.imul(l, X) | 0) + (n >>> 13) | 0) + (yt >>> 26) | 0, yt &= 67108863, a = Math.imul(S, G), n = (n = Math.imul(S, q)) + Math.imul(k, G) | 0, s = Math.imul(k, q), a = a + Math.imul(_, z) | 0, n = (n = n + Math.imul(_, W) | 0) + Math.imul(x, z) | 0, s = s + Math.imul(x, W) | 0, a = a + Math.imul(b, J) | 0, n = (n = n + Math.imul(b, Y) | 0) + Math.imul(v, J) | 0, s = s + Math.imul(v, Y) | 0, a = a + Math.imul(p, K) | 0, n = (n = n + Math.imul(p, X) | 0) + Math.imul(g, K) | 0, s = s + Math.imul(g, X) | 0;
                    var _t = (h + (a = a + Math.imul(d, $) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(d, tt) | 0) + Math.imul(l, $) | 0)) << 13) | 0;
                    h = ((s = s + Math.imul(l, tt) | 0) + (n >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863, a = Math.imul(T, G), n = (n = Math.imul(T, q)) + Math.imul(C, G) | 0, s = Math.imul(C, q), a = a + Math.imul(S, z) | 0, n = (n = n + Math.imul(S, W) | 0) + Math.imul(k, z) | 0, s = s + Math.imul(k, W) | 0, a = a + Math.imul(_, J) | 0, n = (n = n + Math.imul(_, Y) | 0) + Math.imul(x, J) | 0, s = s + Math.imul(x, Y) | 0, a = a + Math.imul(b, K) | 0, n = (n = n + Math.imul(b, X) | 0) + Math.imul(v, K) | 0, s = s + Math.imul(v, X) | 0, a = a + Math.imul(p, $) | 0, n = (n = n + Math.imul(p, tt) | 0) + Math.imul(g, $) | 0, s = s + Math.imul(g, tt) | 0;
                    var xt = (h + (a = a + Math.imul(d, it) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(d, at) | 0) + Math.imul(l, it) | 0)) << 13) | 0;
                    h = ((s = s + Math.imul(l, at) | 0) + (n >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, a = Math.imul(M, G), n = (n = Math.imul(M, q)) + Math.imul(P, G) | 0, s = Math.imul(P, q), a = a + Math.imul(T, z) | 0, n = (n = n + Math.imul(T, W) | 0) + Math.imul(C, z) | 0, s = s + Math.imul(C, W) | 0, a = a + Math.imul(S, J) | 0, n = (n = n + Math.imul(S, Y) | 0) + Math.imul(k, J) | 0, s = s + Math.imul(k, Y) | 0, a = a + Math.imul(_, K) | 0, n = (n = n + Math.imul(_, X) | 0) + Math.imul(x, K) | 0, s = s + Math.imul(x, X) | 0, a = a + Math.imul(b, $) | 0, n = (n = n + Math.imul(b, tt) | 0) + Math.imul(v, $) | 0, s = s + Math.imul(v, tt) | 0, a = a + Math.imul(p, it) | 0, n = (n = n + Math.imul(p, at) | 0) + Math.imul(g, it) | 0, s = s + Math.imul(g, at) | 0;
                    var wt = (h + (a = a + Math.imul(d, st) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(d, ot) | 0) + Math.imul(l, st) | 0)) << 13) | 0;
                    h = ((s = s + Math.imul(l, ot) | 0) + (n >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863, a = Math.imul(L, G), n = (n = Math.imul(L, q)) + Math.imul(N, G) | 0, s = Math.imul(N, q), a = a + Math.imul(M, z) | 0, n = (n = n + Math.imul(M, W) | 0) + Math.imul(P, z) | 0, s = s + Math.imul(P, W) | 0, a = a + Math.imul(T, J) | 0, n = (n = n + Math.imul(T, Y) | 0) + Math.imul(C, J) | 0, s = s + Math.imul(C, Y) | 0, a = a + Math.imul(S, K) | 0, n = (n = n + Math.imul(S, X) | 0) + Math.imul(k, K) | 0, s = s + Math.imul(k, X) | 0, a = a + Math.imul(_, $) | 0, n = (n = n + Math.imul(_, tt) | 0) + Math.imul(x, $) | 0, s = s + Math.imul(x, tt) | 0, a = a + Math.imul(b, it) | 0, n = (n = n + Math.imul(b, at) | 0) + Math.imul(v, it) | 0, s = s + Math.imul(v, at) | 0, a = a + Math.imul(p, st) | 0, n = (n = n + Math.imul(p, ot) | 0) + Math.imul(g, st) | 0, s = s + Math.imul(g, ot) | 0;
                    var St = (h + (a = a + Math.imul(d, ct) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(d, ht) | 0) + Math.imul(l, ct) | 0)) << 13) | 0;
                    h = ((s = s + Math.imul(l, ht) | 0) + (n >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, a = Math.imul(A, G), n = (n = Math.imul(A, q)) + Math.imul(R, G) | 0, s = Math.imul(R, q), a = a + Math.imul(L, z) | 0, n = (n = n + Math.imul(L, W) | 0) + Math.imul(N, z) | 0, s = s + Math.imul(N, W) | 0, a = a + Math.imul(M, J) | 0, n = (n = n + Math.imul(M, Y) | 0) + Math.imul(P, J) | 0, s = s + Math.imul(P, Y) | 0, a = a + Math.imul(T, K) | 0, n = (n = n + Math.imul(T, X) | 0) + Math.imul(C, K) | 0, s = s + Math.imul(C, X) | 0, a = a + Math.imul(S, $) | 0, n = (n = n + Math.imul(S, tt) | 0) + Math.imul(k, $) | 0, s = s + Math.imul(k, tt) | 0, a = a + Math.imul(_, it) | 0, n = (n = n + Math.imul(_, at) | 0) + Math.imul(x, it) | 0, s = s + Math.imul(x, at) | 0, a = a + Math.imul(b, st) | 0, n = (n = n + Math.imul(b, ot) | 0) + Math.imul(v, st) | 0, s = s + Math.imul(v, ot) | 0, a = a + Math.imul(p, ct) | 0, n = (n = n + Math.imul(p, ht) | 0) + Math.imul(g, ct) | 0, s = s + Math.imul(g, ht) | 0;
                    var kt = (h + (a = a + Math.imul(d, dt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(d, lt) | 0) + Math.imul(l, dt) | 0)) << 13) | 0;
                    h = ((s = s + Math.imul(l, lt) | 0) + (n >>> 13) | 0) + (kt >>> 26) | 0, kt &= 67108863, a = Math.imul(F, G), n = (n = Math.imul(F, q)) + Math.imul(V, G) | 0, s = Math.imul(V, q), a = a + Math.imul(A, z) | 0, n = (n = n + Math.imul(A, W) | 0) + Math.imul(R, z) | 0, s = s + Math.imul(R, W) | 0, a = a + Math.imul(L, J) | 0, n = (n = n + Math.imul(L, Y) | 0) + Math.imul(N, J) | 0, s = s + Math.imul(N, Y) | 0, a = a + Math.imul(M, K) | 0, n = (n = n + Math.imul(M, X) | 0) + Math.imul(P, K) | 0, s = s + Math.imul(P, X) | 0, a = a + Math.imul(T, $) | 0, n = (n = n + Math.imul(T, tt) | 0) + Math.imul(C, $) | 0, s = s + Math.imul(C, tt) | 0, a = a + Math.imul(S, it) | 0, n = (n = n + Math.imul(S, at) | 0) + Math.imul(k, it) | 0, s = s + Math.imul(k, at) | 0, a = a + Math.imul(_, st) | 0, n = (n = n + Math.imul(_, ot) | 0) + Math.imul(x, st) | 0, s = s + Math.imul(x, ot) | 0, a = a + Math.imul(b, ct) | 0, n = (n = n + Math.imul(b, ht) | 0) + Math.imul(v, ct) | 0, s = s + Math.imul(v, ht) | 0, a = a + Math.imul(p, dt) | 0, n = (n = n + Math.imul(p, lt) | 0) + Math.imul(g, dt) | 0, s = s + Math.imul(g, lt) | 0;
                    var It = (h + (a = a + Math.imul(d, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(d, gt) | 0) + Math.imul(l, pt) | 0)) << 13) | 0;
                    h = ((s = s + Math.imul(l, gt) | 0) + (n >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863, a = Math.imul(F, z), n = (n = Math.imul(F, W)) + Math.imul(V, z) | 0, s = Math.imul(V, W), a = a + Math.imul(A, J) | 0, n = (n = n + Math.imul(A, Y) | 0) + Math.imul(R, J) | 0, s = s + Math.imul(R, Y) | 0, a = a + Math.imul(L, K) | 0, n = (n = n + Math.imul(L, X) | 0) + Math.imul(N, K) | 0, s = s + Math.imul(N, X) | 0, a = a + Math.imul(M, $) | 0, n = (n = n + Math.imul(M, tt) | 0) + Math.imul(P, $) | 0, s = s + Math.imul(P, tt) | 0, a = a + Math.imul(T, it) | 0, n = (n = n + Math.imul(T, at) | 0) + Math.imul(C, it) | 0, s = s + Math.imul(C, at) | 0, a = a + Math.imul(S, st) | 0, n = (n = n + Math.imul(S, ot) | 0) + Math.imul(k, st) | 0, s = s + Math.imul(k, ot) | 0, a = a + Math.imul(_, ct) | 0, n = (n = n + Math.imul(_, ht) | 0) + Math.imul(x, ct) | 0, s = s + Math.imul(x, ht) | 0, a = a + Math.imul(b, dt) | 0, n = (n = n + Math.imul(b, lt) | 0) + Math.imul(v, dt) | 0, s = s + Math.imul(v, lt) | 0;
                    var Tt = (h + (a = a + Math.imul(p, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(p, gt) | 0) + Math.imul(g, pt) | 0)) << 13) | 0;
                    h = ((s = s + Math.imul(g, gt) | 0) + (n >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863, a = Math.imul(F, J), n = (n = Math.imul(F, Y)) + Math.imul(V, J) | 0, s = Math.imul(V, Y), a = a + Math.imul(A, K) | 0, n = (n = n + Math.imul(A, X) | 0) + Math.imul(R, K) | 0, s = s + Math.imul(R, X) | 0, a = a + Math.imul(L, $) | 0, n = (n = n + Math.imul(L, tt) | 0) + Math.imul(N, $) | 0, s = s + Math.imul(N, tt) | 0, a = a + Math.imul(M, it) | 0, n = (n = n + Math.imul(M, at) | 0) + Math.imul(P, it) | 0, s = s + Math.imul(P, at) | 0, a = a + Math.imul(T, st) | 0, n = (n = n + Math.imul(T, ot) | 0) + Math.imul(C, st) | 0, s = s + Math.imul(C, ot) | 0, a = a + Math.imul(S, ct) | 0, n = (n = n + Math.imul(S, ht) | 0) + Math.imul(k, ct) | 0, s = s + Math.imul(k, ht) | 0, a = a + Math.imul(_, dt) | 0, n = (n = n + Math.imul(_, lt) | 0) + Math.imul(x, dt) | 0, s = s + Math.imul(x, lt) | 0;
                    var Ct = (h + (a = a + Math.imul(b, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(b, gt) | 0) + Math.imul(v, pt) | 0)) << 13) | 0;
                    h = ((s = s + Math.imul(v, gt) | 0) + (n >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863, a = Math.imul(F, K), n = (n = Math.imul(F, X)) + Math.imul(V, K) | 0, s = Math.imul(V, X), a = a + Math.imul(A, $) | 0, n = (n = n + Math.imul(A, tt) | 0) + Math.imul(R, $) | 0, s = s + Math.imul(R, tt) | 0, a = a + Math.imul(L, it) | 0, n = (n = n + Math.imul(L, at) | 0) + Math.imul(N, it) | 0, s = s + Math.imul(N, at) | 0, a = a + Math.imul(M, st) | 0, n = (n = n + Math.imul(M, ot) | 0) + Math.imul(P, st) | 0, s = s + Math.imul(P, ot) | 0, a = a + Math.imul(T, ct) | 0, n = (n = n + Math.imul(T, ht) | 0) + Math.imul(C, ct) | 0, s = s + Math.imul(C, ht) | 0, a = a + Math.imul(S, dt) | 0, n = (n = n + Math.imul(S, lt) | 0) + Math.imul(k, dt) | 0, s = s + Math.imul(k, lt) | 0;
                    var Et = (h + (a = a + Math.imul(_, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(_, gt) | 0) + Math.imul(x, pt) | 0)) << 13) | 0;
                    h = ((s = s + Math.imul(x, gt) | 0) + (n >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863, a = Math.imul(F, $), n = (n = Math.imul(F, tt)) + Math.imul(V, $) | 0, s = Math.imul(V, tt), a = a + Math.imul(A, it) | 0, n = (n = n + Math.imul(A, at) | 0) + Math.imul(R, it) | 0, s = s + Math.imul(R, at) | 0, a = a + Math.imul(L, st) | 0, n = (n = n + Math.imul(L, ot) | 0) + Math.imul(N, st) | 0, s = s + Math.imul(N, ot) | 0, a = a + Math.imul(M, ct) | 0, n = (n = n + Math.imul(M, ht) | 0) + Math.imul(P, ct) | 0, s = s + Math.imul(P, ht) | 0, a = a + Math.imul(T, dt) | 0, n = (n = n + Math.imul(T, lt) | 0) + Math.imul(C, dt) | 0, s = s + Math.imul(C, lt) | 0;
                    var Mt = (h + (a = a + Math.imul(S, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(S, gt) | 0) + Math.imul(k, pt) | 0)) << 13) | 0;
                    h = ((s = s + Math.imul(k, gt) | 0) + (n >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863, a = Math.imul(F, it), n = (n = Math.imul(F, at)) + Math.imul(V, it) | 0, s = Math.imul(V, at), a = a + Math.imul(A, st) | 0, n = (n = n + Math.imul(A, ot) | 0) + Math.imul(R, st) | 0, s = s + Math.imul(R, ot) | 0, a = a + Math.imul(L, ct) | 0, n = (n = n + Math.imul(L, ht) | 0) + Math.imul(N, ct) | 0, s = s + Math.imul(N, ht) | 0, a = a + Math.imul(M, dt) | 0, n = (n = n + Math.imul(M, lt) | 0) + Math.imul(P, dt) | 0, s = s + Math.imul(P, lt) | 0;
                    var Pt = (h + (a = a + Math.imul(T, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(T, gt) | 0) + Math.imul(C, pt) | 0)) << 13) | 0;
                    h = ((s = s + Math.imul(C, gt) | 0) + (n >>> 13) | 0) + (Pt >>> 26) | 0, Pt &= 67108863, a = Math.imul(F, st), n = (n = Math.imul(F, ot)) + Math.imul(V, st) | 0, s = Math.imul(V, ot), a = a + Math.imul(A, ct) | 0, n = (n = n + Math.imul(A, ht) | 0) + Math.imul(R, ct) | 0, s = s + Math.imul(R, ht) | 0, a = a + Math.imul(L, dt) | 0, n = (n = n + Math.imul(L, lt) | 0) + Math.imul(N, dt) | 0, s = s + Math.imul(N, lt) | 0;
                    var Dt = (h + (a = a + Math.imul(M, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(M, gt) | 0) + Math.imul(P, pt) | 0)) << 13) | 0;
                    h = ((s = s + Math.imul(P, gt) | 0) + (n >>> 13) | 0) + (Dt >>> 26) | 0, Dt &= 67108863, a = Math.imul(F, ct), n = (n = Math.imul(F, ht)) + Math.imul(V, ct) | 0, s = Math.imul(V, ht), a = a + Math.imul(A, dt) | 0, n = (n = n + Math.imul(A, lt) | 0) + Math.imul(R, dt) | 0, s = s + Math.imul(R, lt) | 0;
                    var Lt = (h + (a = a + Math.imul(L, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(L, gt) | 0) + Math.imul(N, pt) | 0)) << 13) | 0;
                    h = ((s = s + Math.imul(N, gt) | 0) + (n >>> 13) | 0) + (Lt >>> 26) | 0, Lt &= 67108863, a = Math.imul(F, dt), n = (n = Math.imul(F, lt)) + Math.imul(V, dt) | 0, s = Math.imul(V, lt);
                    var Nt = (h + (a = a + Math.imul(A, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(A, gt) | 0) + Math.imul(R, pt) | 0)) << 13) | 0;
                    h = ((s = s + Math.imul(R, gt) | 0) + (n >>> 13) | 0) + (Nt >>> 26) | 0, Nt &= 67108863;
                    var Bt = (h + (a = Math.imul(F, pt)) | 0) + ((8191 & (n = (n = Math.imul(F, gt)) + Math.imul(V, pt) | 0)) << 13) | 0;
                    return h = ((s = Math.imul(V, gt)) + (n >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, c[0] = mt, c[1] = bt, c[2] = vt, c[3] = yt, c[4] = _t, c[5] = xt, c[6] = wt, c[7] = St, c[8] = kt, c[9] = It, c[10] = Tt, c[11] = Ct, c[12] = Et, c[13] = Mt, c[14] = Pt, c[15] = Dt, c[16] = Lt, c[17] = Nt, c[18] = Bt, 0 !== h && (c[19] = h, i.length++), i
                };

                function g(t, e, i) {
                    i.negative = e.negative ^ t.negative, i.length = t.length + e.length;
                    for (var a = 0, n = 0, s = 0; s < i.length - 1; s++) {
                        var o = n;
                        n = 0;
                        for (var r = 67108863 & a, c = Math.min(s, e.length - 1), h = Math.max(0, s - t.length + 1); h <= c; h++) {
                            var f = s - h,
                                d = (0 | t.words[f]) * (0 | e.words[h]),
                                l = 67108863 & d;
                            r = 67108863 & (l = l + r | 0), n += (o = (o = o + (d / 67108864 | 0) | 0) + (l >>> 26) | 0) >>> 26, o &= 67108863
                        }
                        i.words[s] = r, a = o, o = n
                    }
                    return 0 !== a ? i.words[s] = a : i.length--, i.strip()
                }

                function m(t, e, i) {
                    return (new b).mulp(t, e, i)
                }

                function b(t, e) {
                    this.x = t, this.y = e
                }
                Math.imul || (p = u), s.prototype.mulTo = function (t, e) {
                    var i = this.length + t.length;
                    return 10 === this.length && 10 === t.length ? p(this, t, e) : i < 63 ? u(this, t, e) : i < 1024 ? g(this, t, e) : m(this, t, e)
                }, b.prototype.makeRBT = function (t) {
                    for (var e = new Array(t), i = s.prototype._countBits(t) - 1, a = 0; a < t; a++) e[a] = this.revBin(a, i, t);
                    return e
                }, b.prototype.revBin = function (t, e, i) {
                    if (0 === t || t === i - 1) return t;
                    for (var a = 0, n = 0; n < e; n++) a |= (1 & t) << e - n - 1, t >>= 1;
                    return a
                }, b.prototype.permute = function (t, e, i, a, n, s) {
                    for (var o = 0; o < s; o++) a[o] = e[t[o]], n[o] = i[t[o]]
                }, b.prototype.transform = function (t, e, i, a, n, s) {
                    this.permute(s, t, e, i, a, n);
                    for (var o = 1; o < n; o <<= 1)
                        for (var r = o << 1, c = Math.cos(2 * Math.PI / r), h = Math.sin(2 * Math.PI / r), f = 0; f < n; f += r)
                            for (var d = c, l = h, u = 0; u < o; u++) {
                                var p = i[f + u],
                                    g = a[f + u],
                                    m = i[f + u + o],
                                    b = a[f + u + o],
                                    v = d * m - l * b;
                                b = d * b + l * m, m = v, i[f + u] = p + m, a[f + u] = g + b, i[f + u + o] = p - m, a[f + u + o] = g - b, u !== r && (v = c * d - h * l, l = c * l + h * d, d = v)
                            }
                }, b.prototype.guessLen13b = function (t, e) {
                    var i = 1 | Math.max(e, t),
                        a = 1 & i,
                        n = 0;
                    for (i = i / 2 | 0; i; i >>>= 1) n++;
                    return 1 << n + 1 + a
                }, b.prototype.conjugate = function (t, e, i) {
                    if (!(i <= 1))
                        for (var a = 0; a < i / 2; a++) {
                            var n = t[a];
                            t[a] = t[i - a - 1], t[i - a - 1] = n, n = e[a], e[a] = -e[i - a - 1], e[i - a - 1] = -n
                        }
                }, b.prototype.normalize13b = function (t, e) {
                    for (var i = 0, a = 0; a < e / 2; a++) {
                        var n = 8192 * Math.round(t[2 * a + 1] / e) + Math.round(t[2 * a] / e) + i;
                        t[a] = 67108863 & n, i = n < 67108864 ? 0 : n / 67108864 | 0
                    }
                    return t
                }, b.prototype.convert13b = function (t, e, i, n) {
                    for (var s = 0, o = 0; o < e; o++) s += 0 | t[o], i[2 * o] = 8191 & s, s >>>= 13, i[2 * o + 1] = 8191 & s, s >>>= 13;
                    for (o = 2 * e; o < n; ++o) i[o] = 0;
                    a(0 === s), a(0 == (-8192 & s))
                }, b.prototype.stub = function (t) {
                    for (var e = new Array(t), i = 0; i < t; i++) e[i] = 0;
                    return e
                }, b.prototype.mulp = function (t, e, i) {
                    var a = 2 * this.guessLen13b(t.length, e.length),
                        n = this.makeRBT(a),
                        s = this.stub(a),
                        o = new Array(a),
                        r = new Array(a),
                        c = new Array(a),
                        h = new Array(a),
                        f = new Array(a),
                        d = new Array(a),
                        l = i.words;
                    l.length = a, this.convert13b(t.words, t.length, o, a), this.convert13b(e.words, e.length, h, a), this.transform(o, s, r, c, a, n), this.transform(h, s, f, d, a, n);
                    for (var u = 0; u < a; u++) {
                        var p = r[u] * f[u] - c[u] * d[u];
                        c[u] = r[u] * d[u] + c[u] * f[u], r[u] = p
                    }
                    return this.conjugate(r, c, a), this.transform(r, c, l, s, a, n), this.conjugate(l, s, a), this.normalize13b(l, a), i.negative = t.negative ^ e.negative, i.length = t.length + e.length, i.strip()
                }, s.prototype.mul = function (t) {
                    var e = new s(null);
                    return e.words = new Array(this.length + t.length), this.mulTo(t, e)
                }, s.prototype.mulf = function (t) {
                    var e = new s(null);
                    return e.words = new Array(this.length + t.length), m(this, t, e)
                }, s.prototype.imul = function (t) {
                    return this.clone().mulTo(t, this)
                }, s.prototype.imuln = function (t) {
                    a("number" == typeof t), a(t < 67108864);
                    for (var e = 0, i = 0; i < this.length; i++) {
                        var n = (0 | this.words[i]) * t,
                            s = (67108863 & n) + (67108863 & e);
                        e >>= 26, e += n / 67108864 | 0, e += s >>> 26, this.words[i] = 67108863 & s
                    }
                    return 0 !== e && (this.words[i] = e, this.length++), this
                }, s.prototype.muln = function (t) {
                    return this.clone().imuln(t)
                }, s.prototype.sqr = function () {
                    return this.mul(this)
                }, s.prototype.isqr = function () {
                    return this.imul(this.clone())
                }, s.prototype.pow = function (t) {
                    var e = l(t);
                    if (0 === e.length) return new s(1);
                    for (var i = this, a = 0; a < e.length && 0 === e[a]; a++, i = i.sqr());
                    if (++a < e.length)
                        for (var n = i.sqr(); a < e.length; a++, n = n.sqr()) 0 !== e[a] && (i = i.mul(n));
                    return i
                }, s.prototype.iushln = function (t) {
                    a("number" == typeof t && t >= 0);
                    var e, i = t % 26,
                        n = (t - i) / 26,
                        s = 67108863 >>> 26 - i << 26 - i;
                    if (0 !== i) {
                        var o = 0;
                        for (e = 0; e < this.length; e++) {
                            var r = this.words[e] & s,
                                c = (0 | this.words[e]) - r << i;
                            this.words[e] = c | o, o = r >>> 26 - i
                        }
                        o && (this.words[e] = o, this.length++)
                    }
                    if (0 !== n) {
                        for (e = this.length - 1; e >= 0; e--) this.words[e + n] = this.words[e];
                        for (e = 0; e < n; e++) this.words[e] = 0;
                        this.length += n
                    }
                    return this.strip()
                }, s.prototype.ishln = function (t) {
                    return a(0 === this.negative), this.iushln(t)
                }, s.prototype.iushrn = function (t, e, i) {
                    var n;
                    a("number" == typeof t && t >= 0), n = e ? (e - e % 26) / 26 : 0;
                    var s = t % 26,
                        o = Math.min((t - s) / 26, this.length),
                        r = 67108863 ^ 67108863 >>> s << s,
                        c = i;
                    if (n -= o, n = Math.max(0, n), c) {
                        for (var h = 0; h < o; h++) c.words[h] = this.words[h];
                        c.length = o
                    }
                    if (0 === o);
                    else if (this.length > o)
                        for (this.length -= o, h = 0; h < this.length; h++) this.words[h] = this.words[h + o];
                    else this.words[0] = 0, this.length = 1;
                    var f = 0;
                    for (h = this.length - 1; h >= 0 && (0 !== f || h >= n); h--) {
                        var d = 0 | this.words[h];
                        this.words[h] = f << 26 - s | d >>> s, f = d & r
                    }
                    return c && 0 !== f && (c.words[c.length++] = f), 0 === this.length && (this.words[0] = 0, this.length = 1), this.strip()
                }, s.prototype.ishrn = function (t, e, i) {
                    return a(0 === this.negative), this.iushrn(t, e, i)
                }, s.prototype.shln = function (t) {
                    return this.clone().ishln(t)
                }, s.prototype.ushln = function (t) {
                    return this.clone().iushln(t)
                }, s.prototype.shrn = function (t) {
                    return this.clone().ishrn(t)
                }, s.prototype.ushrn = function (t) {
                    return this.clone().iushrn(t)
                }, s.prototype.testn = function (t) {
                    a("number" == typeof t && t >= 0);
                    var e = t % 26,
                        i = (t - e) / 26,
                        n = 1 << e;
                    return !(this.length <= i) && !!(this.words[i] & n)
                }, s.prototype.imaskn = function (t) {
                    a("number" == typeof t && t >= 0);
                    var e = t % 26,
                        i = (t - e) / 26;
                    if (a(0 === this.negative, "imaskn works only with positive numbers"), this.length <= i) return this;
                    if (0 !== e && i++, this.length = Math.min(i, this.length), 0 !== e) {
                        var n = 67108863 ^ 67108863 >>> e << e;
                        this.words[this.length - 1] &= n
                    }
                    return this.strip()
                }, s.prototype.maskn = function (t) {
                    return this.clone().imaskn(t)
                }, s.prototype.iaddn = function (t) {
                    return a("number" == typeof t), a(t < 67108864), t < 0 ? this.isubn(-t) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) < t ? (this.words[0] = t - (0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(t), this.negative = 1, this) : this._iaddn(t)
                }, s.prototype._iaddn = function (t) {
                    this.words[0] += t;
                    for (var e = 0; e < this.length && this.words[e] >= 67108864; e++) this.words[e] -= 67108864, e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
                    return this.length = Math.max(this.length, e + 1), this
                }, s.prototype.isubn = function (t) {
                    if (a("number" == typeof t), a(t < 67108864), t < 0) return this.iaddn(-t);
                    if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1, this;
                    if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this.words[0], this.negative = 1;
                    else
                        for (var e = 0; e < this.length && this.words[e] < 0; e++) this.words[e] += 67108864, this.words[e + 1] -= 1;
                    return this.strip()
                }, s.prototype.addn = function (t) {
                    return this.clone().iaddn(t)
                }, s.prototype.subn = function (t) {
                    return this.clone().isubn(t)
                }, s.prototype.iabs = function () {
                    return this.negative = 0, this
                }, s.prototype.abs = function () {
                    return this.clone().iabs()
                }, s.prototype._ishlnsubmul = function (t, e, i) {
                    var n, s, o = t.length + i;
                    this._expand(o);
                    var r = 0;
                    for (n = 0; n < t.length; n++) {
                        s = (0 | this.words[n + i]) + r;
                        var c = (0 | t.words[n]) * e;
                        r = ((s -= 67108863 & c) >> 26) - (c / 67108864 | 0), this.words[n + i] = 67108863 & s
                    }
                    for (; n < this.length - i; n++) r = (s = (0 | this.words[n + i]) + r) >> 26, this.words[n + i] = 67108863 & s;
                    if (0 === r) return this.strip();
                    for (a(-1 === r), r = 0, n = 0; n < this.length; n++) r = (s = -(0 | this.words[n]) + r) >> 26, this.words[n] = 67108863 & s;
                    return this.negative = 1, this.strip()
                }, s.prototype._wordDiv = function (t, e) {
                    var i = (this.length, t.length),
                        a = this.clone(),
                        n = t,
                        o = 0 | n.words[n.length - 1];
                    0 !== (i = 26 - this._countBits(o)) && (n = n.ushln(i), a.iushln(i), o = 0 | n.words[n.length - 1]);
                    var r, c = a.length - n.length;
                    if ("mod" !== e) {
                        (r = new s(null)).length = c + 1, r.words = new Array(r.length);
                        for (var h = 0; h < r.length; h++) r.words[h] = 0
                    }
                    var f = a.clone()._ishlnsubmul(n, 1, c);
                    0 === f.negative && (a = f, r && (r.words[c] = 1));
                    for (var d = c - 1; d >= 0; d--) {
                        var l = 67108864 * (0 | a.words[n.length + d]) + (0 | a.words[n.length + d - 1]);
                        for (l = Math.min(l / o | 0, 67108863), a._ishlnsubmul(n, l, d); 0 !== a.negative;) l--, a.negative = 0, a._ishlnsubmul(n, 1, d), a.isZero() || (a.negative ^= 1);
                        r && (r.words[d] = l)
                    }
                    return r && r.strip(), a.strip(), "div" !== e && 0 !== i && a.iushrn(i), {
                        div: r || null,
                        mod: a
                    }
                }, s.prototype.divmod = function (t, e, i) {
                    return a(!t.isZero()), this.isZero() ? {
                        div: new s(0),
                        mod: new s(0)
                    } : 0 !== this.negative && 0 === t.negative ? (r = this.neg().divmod(t, e), "mod" !== e && (n = r.div.neg()), "div" !== e && (o = r.mod.neg(), i && 0 !== o.negative && o.iadd(t)), {
                        div: n,
                        mod: o
                    }) : 0 === this.negative && 0 !== t.negative ? (r = this.divmod(t.neg(), e), "mod" !== e && (n = r.div.neg()), {
                        div: n,
                        mod: r.mod
                    }) : 0 != (this.negative & t.negative) ? (r = this.neg().divmod(t.neg(), e), "div" !== e && (o = r.mod.neg(), i && 0 !== o.negative && o.isub(t)), {
                        div: r.div,
                        mod: o
                    }) : t.length > this.length || this.cmp(t) < 0 ? {
                        div: new s(0),
                        mod: this
                    } : 1 === t.length ? "div" === e ? {
                        div: this.divn(t.words[0]),
                        mod: null
                    } : "mod" === e ? {
                        div: null,
                        mod: new s(this.modn(t.words[0]))
                    } : {
                                div: this.divn(t.words[0]),
                                mod: new s(this.modn(t.words[0]))
                            } : this._wordDiv(t, e);
                    var n, o, r
                }, s.prototype.div = function (t) {
                    return this.divmod(t, "div", !1).div
                }, s.prototype.mod = function (t) {
                    return this.divmod(t, "mod", !1).mod
                }, s.prototype.umod = function (t) {
                    return this.divmod(t, "mod", !0).mod
                }, s.prototype.divRound = function (t) {
                    var e = this.divmod(t);
                    if (e.mod.isZero()) return e.div;
                    var i = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
                        a = t.ushrn(1),
                        n = t.andln(1),
                        s = i.cmp(a);
                    return s < 0 || 1 === n && 0 === s ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1)
                }, s.prototype.modn = function (t) {
                    a(t <= 67108863);
                    for (var e = (1 << 26) % t, i = 0, n = this.length - 1; n >= 0; n--) i = (e * i + (0 | this.words[n])) % t;
                    return i
                }, s.prototype.idivn = function (t) {
                    a(t <= 67108863);
                    for (var e = 0, i = this.length - 1; i >= 0; i--) {
                        var n = (0 | this.words[i]) + 67108864 * e;
                        this.words[i] = n / t | 0, e = n % t
                    }
                    return this.strip()
                }, s.prototype.divn = function (t) {
                    return this.clone().idivn(t)
                }, s.prototype.egcd = function (t) {
                    a(0 === t.negative), a(!t.isZero());
                    var e = this,
                        i = t.clone();
                    e = 0 !== e.negative ? e.umod(t) : e.clone();
                    for (var n = new s(1), o = new s(0), r = new s(0), c = new s(1), h = 0; e.isEven() && i.isEven();) e.iushrn(1), i.iushrn(1), ++h;
                    for (var f = i.clone(), d = e.clone(); !e.isZero();) {
                        for (var l = 0, u = 1; 0 == (e.words[0] & u) && l < 26; ++l, u <<= 1);
                        if (l > 0)
                            for (e.iushrn(l); l-- > 0;)(n.isOdd() || o.isOdd()) && (n.iadd(f), o.isub(d)), n.iushrn(1), o.iushrn(1);
                        for (var p = 0, g = 1; 0 == (i.words[0] & g) && p < 26; ++p, g <<= 1);
                        if (p > 0)
                            for (i.iushrn(p); p-- > 0;)(r.isOdd() || c.isOdd()) && (r.iadd(f), c.isub(d)), r.iushrn(1), c.iushrn(1);
                        e.cmp(i) >= 0 ? (e.isub(i), n.isub(r), o.isub(c)) : (i.isub(e), r.isub(n), c.isub(o))
                    }
                    return {
                        a: r,
                        b: c,
                        gcd: i.iushln(h)
                    }
                }, s.prototype._invmp = function (t) {
                    a(0 === t.negative), a(!t.isZero());
                    var e = this,
                        i = t.clone();
                    e = 0 !== e.negative ? e.umod(t) : e.clone();
                    for (var n, o = new s(1), r = new s(0), c = i.clone(); e.cmpn(1) > 0 && i.cmpn(1) > 0;) {
                        for (var h = 0, f = 1; 0 == (e.words[0] & f) && h < 26; ++h, f <<= 1);
                        if (h > 0)
                            for (e.iushrn(h); h-- > 0;) o.isOdd() && o.iadd(c), o.iushrn(1);
                        for (var d = 0, l = 1; 0 == (i.words[0] & l) && d < 26; ++d, l <<= 1);
                        if (d > 0)
                            for (i.iushrn(d); d-- > 0;) r.isOdd() && r.iadd(c), r.iushrn(1);
                        e.cmp(i) >= 0 ? (e.isub(i), o.isub(r)) : (i.isub(e), r.isub(o))
                    }
                    return (n = 0 === e.cmpn(1) ? o : r).cmpn(0) < 0 && n.iadd(t), n
                }, s.prototype.gcd = function (t) {
                    if (this.isZero()) return t.abs();
                    if (t.isZero()) return this.abs();
                    var e = this.clone(),
                        i = t.clone();
                    e.negative = 0, i.negative = 0;
                    for (var a = 0; e.isEven() && i.isEven(); a++) e.iushrn(1), i.iushrn(1);
                    for (; ;) {
                        for (; e.isEven();) e.iushrn(1);
                        for (; i.isEven();) i.iushrn(1);
                        var n = e.cmp(i);
                        if (n < 0) {
                            var s = e;
                            e = i, i = s
                        } else if (0 === n || 0 === i.cmpn(1)) break;
                        e.isub(i)
                    }
                    return i.iushln(a)
                }, s.prototype.invm = function (t) {
                    return this.egcd(t).a.umod(t)
                }, s.prototype.isEven = function () {
                    return 0 == (1 & this.words[0])
                }, s.prototype.isOdd = function () {
                    return 1 == (1 & this.words[0])
                }, s.prototype.andln = function (t) {
                    return this.words[0] & t
                }, s.prototype.bincn = function (t) {
                    a("number" == typeof t);
                    var e = t % 26,
                        i = (t - e) / 26,
                        n = 1 << e;
                    if (this.length <= i) return this._expand(i + 1), this.words[i] |= n, this;
                    for (var s = n, o = i; 0 !== s && o < this.length; o++) {
                        var r = 0 | this.words[o];
                        s = (r += s) >>> 26, r &= 67108863, this.words[o] = r
                    }
                    return 0 !== s && (this.words[o] = s, this.length++), this
                }, s.prototype.isZero = function () {
                    return 1 === this.length && 0 === this.words[0]
                }, s.prototype.cmpn = function (t) {
                    var e, i = t < 0;
                    if (0 !== this.negative && !i) return -1;
                    if (0 === this.negative && i) return 1;
                    if (this.strip(), this.length > 1) e = 1;
                    else {
                        i && (t = -t), a(t <= 67108863, "Number is too big");
                        var n = 0 | this.words[0];
                        e = n === t ? 0 : n < t ? -1 : 1
                    }
                    return 0 !== this.negative ? 0 | -e : e
                }, s.prototype.cmp = function (t) {
                    if (0 !== this.negative && 0 === t.negative) return -1;
                    if (0 === this.negative && 0 !== t.negative) return 1;
                    var e = this.ucmp(t);
                    return 0 !== this.negative ? 0 | -e : e
                }, s.prototype.ucmp = function (t) {
                    if (this.length > t.length) return 1;
                    if (this.length < t.length) return -1;
                    for (var e = 0, i = this.length - 1; i >= 0; i--) {
                        var a = 0 | this.words[i],
                            n = 0 | t.words[i];
                        if (a !== n) {
                            a < n ? e = -1 : a > n && (e = 1);
                            break
                        }
                    }
                    return e
                }, s.prototype.gtn = function (t) {
                    return 1 === this.cmpn(t)
                }, s.prototype.gt = function (t) {
                    return 1 === this.cmp(t)
                }, s.prototype.gten = function (t) {
                    return this.cmpn(t) >= 0
                }, s.prototype.gte = function (t) {
                    return this.cmp(t) >= 0
                }, s.prototype.ltn = function (t) {
                    return -1 === this.cmpn(t)
                }, s.prototype.lt = function (t) {
                    return -1 === this.cmp(t)
                }, s.prototype.lten = function (t) {
                    return this.cmpn(t) <= 0
                }, s.prototype.lte = function (t) {
                    return this.cmp(t) <= 0
                }, s.prototype.eqn = function (t) {
                    return 0 === this.cmpn(t)
                }, s.prototype.eq = function (t) {
                    return 0 === this.cmp(t)
                }, s.red = function (t) {
                    return new k(t)
                }, s.prototype.toRed = function (t) {
                    return a(!this.red, "Already a number in reduction context"), a(0 === this.negative, "red works only with positives"), t.convertTo(this)._forceRed(t)
                }, s.prototype.fromRed = function () {
                    return a(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
                }, s.prototype._forceRed = function (t) {
                    return this.red = t, this
                }, s.prototype.forceRed = function (t) {
                    return a(!this.red, "Already a number in reduction context"), this._forceRed(t)
                }, s.prototype.redAdd = function (t) {
                    return a(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
                }, s.prototype.redIAdd = function (t) {
                    return a(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
                }, s.prototype.redSub = function (t) {
                    return a(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
                }, s.prototype.redISub = function (t) {
                    return a(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
                }, s.prototype.redShl = function (t) {
                    return a(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
                }, s.prototype.redMul = function (t) {
                    return a(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.mul(this, t)
                }, s.prototype.redIMul = function (t) {
                    return a(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.imul(this, t)
                }, s.prototype.redSqr = function () {
                    return a(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
                }, s.prototype.redISqr = function () {
                    return a(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
                }, s.prototype.redSqrt = function () {
                    return a(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
                }, s.prototype.redInvm = function () {
                    return a(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
                }, s.prototype.redNeg = function () {
                    return a(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
                }, s.prototype.redPow = function (t) {
                    return a(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, t)
                };
                var v = {
                    k256: null,
                    p224: null,
                    p192: null,
                    p25519: null
                };

                function y(t, e) {
                    this.name = t, this.p = new s(e, 16), this.n = this.p.bitLength(), this.k = new s(1).iushln(this.n).isub(this.p), this.tmp = this._tmp()
                }

                function _() {
                    y.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
                }

                function x() {
                    y.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
                }

                function w() {
                    y.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
                }

                function S() {
                    y.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
                }

                function k(t) {
                    if ("string" == typeof t) {
                        var e = s._prime(t);
                        this.m = e.p, this.prime = e
                    } else a(t.gtn(1), "modulus must be greater than 1"), this.m = t, this.prime = null
                }

                function I(t) {
                    k.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new s(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv)
                }
                y.prototype._tmp = function () {
                    var t = new s(null);
                    return t.words = new Array(Math.ceil(this.n / 13)), t
                }, y.prototype.ireduce = function (t) {
                    var e, i = t;
                    do {
                        this.split(i, this.tmp), e = (i = (i = this.imulK(i)).iadd(this.tmp)).bitLength()
                    } while (e > this.n);
                    var a = e < this.n ? -1 : i.ucmp(this.p);
                    return 0 === a ? (i.words[0] = 0, i.length = 1) : a > 0 ? i.isub(this.p) : i.strip(), i
                }, y.prototype.split = function (t, e) {
                    t.iushrn(this.n, 0, e)
                }, y.prototype.imulK = function (t) {
                    return t.imul(this.k)
                }, n(_, y), _.prototype.split = function (t, e) {
                    for (var i = Math.min(t.length, 9), a = 0; a < i; a++) e.words[a] = t.words[a];
                    if (e.length = i, t.length <= 9) return t.words[0] = 0, void (t.length = 1);
                    var n = t.words[9];
                    for (e.words[e.length++] = 4194303 & n, a = 10; a < t.length; a++) {
                        var s = 0 | t.words[a];
                        t.words[a - 10] = (4194303 & s) << 4 | n >>> 22, n = s
                    }
                    n >>>= 22, t.words[a - 10] = n, 0 === n && t.length > 10 ? t.length -= 10 : t.length -= 9
                }, _.prototype.imulK = function (t) {
                    t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
                    for (var e = 0, i = 0; i < t.length; i++) {
                        var a = 0 | t.words[i];
                        e += 977 * a, t.words[i] = 67108863 & e, e = 64 * a + (e / 67108864 | 0)
                    }
                    return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t
                }, n(x, y), n(w, y), n(S, y), S.prototype.imulK = function (t) {
                    for (var e = 0, i = 0; i < t.length; i++) {
                        var a = 19 * (0 | t.words[i]) + e,
                            n = 67108863 & a;
                        a >>>= 26, t.words[i] = n, e = a
                    }
                    return 0 !== e && (t.words[t.length++] = e), t
                }, s._prime = function (t) {
                    if (v[t]) return v[t];
                    var e;
                    if ("k256" === t) e = new _;
                    else if ("p224" === t) e = new x;
                    else if ("p192" === t) e = new w;
                    else {
                        if ("p25519" !== t) throw new Error("Unknown prime " + t);
                        e = new S
                    }
                    return v[t] = e, e
                }, k.prototype._verify1 = function (t) {
                    a(0 === t.negative, "red works only with positives"), a(t.red, "red works only with red numbers")
                }, k.prototype._verify2 = function (t, e) {
                    a(0 == (t.negative | e.negative), "red works only with positives"), a(t.red && t.red === e.red, "red works only with red numbers")
                }, k.prototype.imod = function (t) {
                    return this.prime ? this.prime.ireduce(t)._forceRed(this) : t.umod(this.m)._forceRed(this)
                }, k.prototype.neg = function (t) {
                    return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
                }, k.prototype.add = function (t, e) {
                    this._verify2(t, e);
                    var i = t.add(e);
                    return i.cmp(this.m) >= 0 && i.isub(this.m), i._forceRed(this)
                }, k.prototype.iadd = function (t, e) {
                    this._verify2(t, e);
                    var i = t.iadd(e);
                    return i.cmp(this.m) >= 0 && i.isub(this.m), i
                }, k.prototype.sub = function (t, e) {
                    this._verify2(t, e);
                    var i = t.sub(e);
                    return i.cmpn(0) < 0 && i.iadd(this.m), i._forceRed(this)
                }, k.prototype.isub = function (t, e) {
                    this._verify2(t, e);
                    var i = t.isub(e);
                    return i.cmpn(0) < 0 && i.iadd(this.m), i
                }, k.prototype.shl = function (t, e) {
                    return this._verify1(t), this.imod(t.ushln(e))
                }, k.prototype.imul = function (t, e) {
                    return this._verify2(t, e), this.imod(t.imul(e))
                }, k.prototype.mul = function (t, e) {
                    return this._verify2(t, e), this.imod(t.mul(e))
                }, k.prototype.isqr = function (t) {
                    return this.imul(t, t.clone())
                }, k.prototype.sqr = function (t) {
                    return this.mul(t, t)
                }, k.prototype.sqrt = function (t) {
                    if (t.isZero()) return t.clone();
                    var e = this.m.andln(3);
                    if (a(e % 2 == 1), 3 === e) {
                        var i = this.m.add(new s(1)).iushrn(2);
                        return this.pow(t, i)
                    }
                    for (var n = this.m.subn(1), o = 0; !n.isZero() && 0 === n.andln(1);) o++, n.iushrn(1);
                    a(!n.isZero());
                    var r = new s(1).toRed(this),
                        c = r.redNeg(),
                        h = this.m.subn(1).iushrn(1),
                        f = this.m.bitLength();
                    for (f = new s(2 * f * f).toRed(this); 0 !== this.pow(f, h).cmp(c);) f.redIAdd(c);
                    for (var d = this.pow(f, n), l = this.pow(t, n.addn(1).iushrn(1)), u = this.pow(t, n), p = o; 0 !== u.cmp(r);) {
                        for (var g = u, m = 0; 0 !== g.cmp(r); m++) g = g.redSqr();
                        a(m < p);
                        var b = this.pow(d, new s(1).iushln(p - m - 1));
                        l = l.redMul(b), d = b.redSqr(), u = u.redMul(d), p = m
                    }
                    return l
                }, k.prototype.invm = function (t) {
                    var e = t._invmp(this.m);
                    return 0 !== e.negative ? (e.negative = 0, this.imod(e).redNeg()) : this.imod(e)
                }, k.prototype.pow = function (t, e) {
                    if (e.isZero()) return new s(1).toRed(this);
                    if (0 === e.cmpn(1)) return t.clone();
                    var i = new Array(16);
                    i[0] = new s(1).toRed(this), i[1] = t;
                    for (var a = 2; a < i.length; a++) i[a] = this.mul(i[a - 1], t);
                    var n = i[0],
                        o = 0,
                        r = 0,
                        c = e.bitLength() % 26;
                    for (0 === c && (c = 26), a = e.length - 1; a >= 0; a--) {
                        for (var h = e.words[a], f = c - 1; f >= 0; f--) {
                            var d = h >> f & 1;
                            n !== i[0] && (n = this.sqr(n)), 0 !== d || 0 !== o ? (o <<= 1, o |= d, (4 === ++r || 0 === a && 0 === f) && (n = this.mul(n, i[o]), r = 0, o = 0)) : r = 0
                        }
                        c = 26
                    }
                    return n
                }, k.prototype.convertTo = function (t) {
                    var e = t.umod(this.m);
                    return e === t ? e.clone() : e
                }, k.prototype.convertFrom = function (t) {
                    var e = t.clone();
                    return e.red = null, e
                }, s.mont = function (t) {
                    return new I(t)
                }, n(I, k), I.prototype.convertTo = function (t) {
                    return this.imod(t.ushln(this.shift))
                }, I.prototype.convertFrom = function (t) {
                    var e = this.imod(t.mul(this.rinv));
                    return e.red = null, e
                }, I.prototype.imul = function (t, e) {
                    if (t.isZero() || e.isZero()) return t.words[0] = 0, t.length = 1, t;
                    var i = t.imul(e),
                        a = i.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                        n = i.isub(a).iushrn(this.shift),
                        s = n;
                    return n.cmp(this.m) >= 0 ? s = n.isub(this.m) : n.cmpn(0) < 0 && (s = n.iadd(this.m)), s._forceRed(this)
                }, I.prototype.mul = function (t, e) {
                    if (t.isZero() || e.isZero()) return new s(0)._forceRed(this);
                    var i = t.mul(e),
                        a = i.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                        n = i.isub(a).iushrn(this.shift),
                        o = n;
                    return n.cmp(this.m) >= 0 ? o = n.isub(this.m) : n.cmpn(0) < 0 && (o = n.iadd(this.m)), o._forceRed(this)
                }, I.prototype.invm = function (t) {
                    return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
                }
            })(void 0 === e || e, this)
        