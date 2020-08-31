
(function (t) {

    cc._RF.push(e, "a829eoBU/xHDKpS1Yjx4GVp", "base64");
    try {
        window.ft = window.ft || {}
    } catch (e) {
        t.ft = t.ft || {}
    }
    var i = new Array,
        a = 0,
        n = 0;
    ft.Base64 = {
        _keyStr: "KLMNOPQR_abcdefUVWFGHIJstqr345XYZ0wxyz12DEuvijklmnopgh6789-ABCST*",
        _pushBuffArray: function (t) {
            a < n ? i[a] = t : (i.push(t), n++), a++
        },
        _getKey: function (t) {
            if (t) {
                for (var e = this._keyStr.split(""), i = 0; i < t.length; i++) {
                    var a = ft.string62to10(t[i]),
                        n = i % 2 ? i : 63 - i,
                        s = e[n];
                    e[n] = e[a], e[a] = s
                }
                return e.join("")
            }
            return this._keyStr
        },
        _getKeyDecode: function (t) {
            t = this._getKey(t);
            for (var e = {}, i = 0; i < 65; i++) e[t.charAt(i)] = i;
            return e
        },
        encode: function (t, e) {
            if (void 0 != t) {
                var n = this._getKey(e),
                    s = 0,
                    o = t.length;
                for (a = 0; s < o; s++) {
                    var r = t.charCodeAt(s);
                    r < 128 ? this._pushBuffArray(r) : r > 127 && r < 2048 ? (this._pushBuffArray(r >> 6 | 192), this._pushBuffArray(63 & r | 128)) : (this._pushBuffArray(r >> 12 | 224), this._pushBuffArray(r >> 6 & 63 | 128), this._pushBuffArray(63 & r | 128))
                }
                this._pushBuffArray(0), this._pushBuffArray(0);
                var c, h, f, d, l, u, p, g = "";
                for (s = 0, o = a -= 2; s < o;) c = i[s++], h = i[s++], f = i[s++], d = c >> 2, l = (3 & c) << 4 | h >> 4, s == o + 2 ? u = p = 64 : (u = (15 & h) << 2 | f >> 6, p = s == o + 1 ? 64 : 63 & f), g += n.charAt(d) + n.charAt(l) + n.charAt(u) + n.charAt(p);
                return g
            }
        },
        decode: function (t, e) {
            if (void 0 != t) {
                var n, s, o, r, c = this._getKeyDecode(e),
                    h = 0,
                    f = t.length;
                for (a = 0; h < f;) n = c[t.charAt(h++)], s = c[t.charAt(h++)], o = c[t.charAt(h++)], r = c[t.charAt(h++)], this._pushBuffArray(n << 2 | s >> 4), 64 != o && this._pushBuffArray((15 & s) << 4 | o >> 2), 64 != r && this._pushBuffArray((3 & o) << 6 | r);
                var d, l = "",
                    u = 0,
                    p = 0;
                for (h = 0, f = a; h < f;)(u = i[h++]) < 128 ? l += String.fromCharCode(u) : u > 191 && u < 224 ? (p = i[h++], l += String.fromCharCode((31 & u) << 6 | 63 & p)) : (p = i[h++], d = i[h++], l += String.fromCharCode((15 & u) << 12 | (63 & p) << 6 | 63 & d));
                return l
            }
        },
        encodeBin: function (t, e) {
            for (var i, a, n, s, o, r, c, h = this._getKey(e), f = t.length, d = "", l = 0; l < f;) s = (i = t.charCodeAt(l++)) >> 2, l >= f ? (a = 0, r = 64) : a = t.charCodeAt(l++), o = (3 & i) << 4 | a >> 4, l >= f ? c = 64 : (r = (15 & a) << 2 | (n = t.charCodeAt(l++)) >> 6, c = 63 & n), d += h.charAt(s) + h.charAt(o) + h.charAt(r) + h.charAt(c);
            return d
        },
        decodeBin: function (t, e) {
            if (void 0 != t) {
                var i, a, n, s, o = this._getKeyDecode(e),
                    r = 3 * t.length / 4;
                "*" == t.charAt(t.length - 2) ? r -= 2 : "*" == t.charAt(t.length - 1) && r--;
                var c = new Uint8Array(r),
                    h = 0,
                    f = 0;
                for (r = t.length; f < r;) i = o[t.charAt(f++)], a = o[t.charAt(f++)], n = o[t.charAt(f++)], s = o[t.charAt(f++)], c[h++] = i << 2 | a >> 4, 64 != n && (c[h++] = (15 & a) << 4 | n >> 2), 64 != s && (c[h++] = (3 & n) << 6 | s);
                return c
            }
        }
    }
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
