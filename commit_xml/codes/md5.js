
(function (t) {

    cc._RF.push(e, "427c9kLqSpEn7kGmyD8GXP8", "md5");
    try {
        window.ft = window.ft || {}
    } catch (e) {
        t.ft = t.ft || {}
    }
    var i = new Array,
        a = 0,
        n = 0;
    ft.MD5 = {
        hex_md5: function (t) {
            var e, i, a, n, s;
            this._utf8Encode(t);
            var o = this._convertToWordArray(),
                r = 1732584193,
                c = 4023233417,
                h = 2562383102,
                f = 271733878;
            for (e = 0; e < o.length; e += 16) i = r, a = c, n = h, s = f, r = this.FF(r, c, h, f, o[e + 0], 7, 3614090360), f = this.FF(f, r, c, h, o[e + 1], 12, 3905402710), h = this.FF(h, f, r, c, o[e + 2], 17, 606105819), c = this.FF(c, h, f, r, o[e + 3], 22, 3250441966), r = this.FF(r, c, h, f, o[e + 4], 7, 4118548399), f = this.FF(f, r, c, h, o[e + 5], 12, 1200080426), h = this.FF(h, f, r, c, o[e + 6], 17, 2821735955), c = this.FF(c, h, f, r, o[e + 7], 22, 4249261313), r = this.FF(r, c, h, f, o[e + 8], 7, 1770035416), f = this.FF(f, r, c, h, o[e + 9], 12, 2336552879), h = this.FF(h, f, r, c, o[e + 10], 17, 4294925233), c = this.FF(c, h, f, r, o[e + 11], 22, 2304563134), r = this.FF(r, c, h, f, o[e + 12], 7, 1804603682), f = this.FF(f, r, c, h, o[e + 13], 12, 4254626195), h = this.FF(h, f, r, c, o[e + 14], 17, 2792965006), c = this.FF(c, h, f, r, o[e + 15], 22, 1236535329), r = this.GG(r, c, h, f, o[e + 1], 5, 4129170786), f = this.GG(f, r, c, h, o[e + 6], 9, 3225465664), h = this.GG(h, f, r, c, o[e + 11], 14, 643717713), c = this.GG(c, h, f, r, o[e + 0], 20, 3921069994), r = this.GG(r, c, h, f, o[e + 5], 5, 3593408605), f = this.GG(f, r, c, h, o[e + 10], 9, 38016083), h = this.GG(h, f, r, c, o[e + 15], 14, 3634488961), c = this.GG(c, h, f, r, o[e + 4], 20, 3889429448), r = this.GG(r, c, h, f, o[e + 9], 5, 568446438), f = this.GG(f, r, c, h, o[e + 14], 9, 3275163606), h = this.GG(h, f, r, c, o[e + 3], 14, 4107603335), c = this.GG(c, h, f, r, o[e + 8], 20, 1163531501), r = this.GG(r, c, h, f, o[e + 13], 5, 2850285829), f = this.GG(f, r, c, h, o[e + 2], 9, 4243563512), h = this.GG(h, f, r, c, o[e + 7], 14, 1735328473), c = this.GG(c, h, f, r, o[e + 12], 20, 2368359562), r = this.HH(r, c, h, f, o[e + 5], 4, 4294588738), f = this.HH(f, r, c, h, o[e + 8], 11, 2272392833), h = this.HH(h, f, r, c, o[e + 11], 16, 1839030562), c = this.HH(c, h, f, r, o[e + 14], 23, 4259657740), r = this.HH(r, c, h, f, o[e + 1], 4, 2763975236), f = this.HH(f, r, c, h, o[e + 4], 11, 1272893353), h = this.HH(h, f, r, c, o[e + 7], 16, 4139469664), c = this.HH(c, h, f, r, o[e + 10], 23, 3200236656), r = this.HH(r, c, h, f, o[e + 13], 4, 681279174), f = this.HH(f, r, c, h, o[e + 0], 11, 3936430074), h = this.HH(h, f, r, c, o[e + 3], 16, 3572445317), c = this.HH(c, h, f, r, o[e + 6], 23, 76029189), r = this.HH(r, c, h, f, o[e + 9], 4, 3654602809), f = this.HH(f, r, c, h, o[e + 12], 11, 3873151461), h = this.HH(h, f, r, c, o[e + 15], 16, 530742520), c = this.HH(c, h, f, r, o[e + 2], 23, 3299628645), r = this.II(r, c, h, f, o[e + 0], 6, 4096336452), f = this.II(f, r, c, h, o[e + 7], 10, 1126891415), h = this.II(h, f, r, c, o[e + 14], 15, 2878612391), c = this.II(c, h, f, r, o[e + 5], 21, 4237533241), r = this.II(r, c, h, f, o[e + 12], 6, 1700485571), f = this.II(f, r, c, h, o[e + 3], 10, 2399980690), h = this.II(h, f, r, c, o[e + 10], 15, 4293915773), c = this.II(c, h, f, r, o[e + 1], 21, 2240044497), r = this.II(r, c, h, f, o[e + 8], 6, 1873313359), f = this.II(f, r, c, h, o[e + 15], 10, 4264355552), h = this.II(h, f, r, c, o[e + 6], 15, 2734768916), c = this.II(c, h, f, r, o[e + 13], 21, 1309151649), r = this.II(r, c, h, f, o[e + 4], 6, 4149444226), f = this.II(f, r, c, h, o[e + 11], 10, 3174756917), h = this.II(h, f, r, c, o[e + 2], 15, 718787259), c = this.II(c, h, f, r, o[e + 9], 21, 3951481745), r = this._addUnsigned(r, i), c = this._addUnsigned(c, a), h = this._addUnsigned(h, n), f = this._addUnsigned(f, s);
            return (this._wordToHex(r) + this._wordToHex(c) + this._wordToHex(h) + this._wordToHex(f)).toLowerCase()
        },
        _rotateLeft: function (t, e) {
            return t << e | t >>> 32 - e
        },
        _addUnsigned: function (t, e) {
            var i, a, n, s, o;
            return n = 2147483648 & t, s = 2147483648 & e, o = (1073741823 & t) + (1073741823 & e), (i = 1073741824 & t) & (a = 1073741824 & e) ? 2147483648 ^ o ^ n ^ s : i | a ? 1073741824 & o ? 3221225472 ^ o ^ n ^ s : 1073741824 ^ o ^ n ^ s : o ^ n ^ s
        },
        F: function (t, e, i) {
            return t & e | ~t & i
        },
        G: function (t, e, i) {
            return t & i | e & ~i
        },
        H: function (t, e, i) {
            return t ^ e ^ i
        },
        I: function (t, e, i) {
            return e ^ (t | ~i)
        },
        FF: function (t, e, i, a, n, s, o) {
            return t = this._addUnsigned(t, this._addUnsigned(this._addUnsigned(this.F(e, i, a), n), o)), this._addUnsigned(this._rotateLeft(t, s), e)
        },
        GG: function (t, e, i, a, n, s, o) {
            return t = this._addUnsigned(t, this._addUnsigned(this._addUnsigned(this.G(e, i, a), n), o)), this._addUnsigned(this._rotateLeft(t, s), e)
        },
        HH: function (t, e, i, a, n, s, o) {
            return t = this._addUnsigned(t, this._addUnsigned(this._addUnsigned(this.H(e, i, a), n), o)), this._addUnsigned(this._rotateLeft(t, s), e)
        },
        II: function (t, e, i, a, n, s, o) {
            return t = this._addUnsigned(t, this._addUnsigned(this._addUnsigned(this.I(e, i, a), n), o)), this._addUnsigned(this._rotateLeft(t, s), e)
        },
        _convertToWordArray: function () {
            for (var t, e = a, n = e + 8, s = 16 * ((n - n % 64) / 64 + 1), o = Array(s - 1), r = 0, c = 0; c < e;) r = c % 4 * 8, o[t = (c - c % 4) / 4] = o[t] | i[c] << r, c++;
            return r = c % 4 * 8, o[t = (c - c % 4) / 4] = o[t] | 128 << r, o[s - 2] = e << 3, o[s - 1] = e >>> 29, o
        },
        _wordToHex: function (t) {
            var e, i = "",
                a = "";
            for (e = 0; e <= 3; e++) i += (a = "0" + (t >>> 8 * e & 255).toString(16)).substr(a.length - 2, 2);
            return i
        },
        _utf8Encode: function (t) {
            var e = t.length;
            a = 0;
            for (var i = 0; i < e; i++) {
                var n = t.charCodeAt(i);
                n < 128 ? this._pushBuffArray(n) : n > 127 && n < 2048 ? (this._pushBuffArray(n >> 6 | 192), this._pushBuffArray(63 & n | 128)) : (this._pushBuffArray(n >> 12 | 224), this._pushBuffArray(n >> 6 & 63 | 128), this._pushBuffArray(63 & n | 128))
            }
        },
        _pushBuffArray: function (t) {
            a < n ? i[a] = t : (i.push(t), n++), a++
        }
    }
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
