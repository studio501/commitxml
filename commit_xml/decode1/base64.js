var ft = {}
ft.__CHARS62 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], ft.__CHARS62Obj = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15,
    g: 16,
    h: 17,
    i: 18,
    j: 19,
    k: 20,
    l: 21,
    m: 22,
    n: 23,
    o: 24,
    p: 25,
    q: 26,
    r: 27,
    s: 28,
    t: 29,
    u: 30,
    v: 31,
    w: 32,
    x: 33,
    y: 34,
    z: 35,
    A: 36,
    B: 37,
    C: 38,
    D: 39,
    E: 40,
    F: 41,
    G: 42,
    H: 43,
    I: 44,
    J: 45,
    K: 46,
    L: 47,
    M: 48,
    N: 49,
    O: 50,
    P: 51,
    Q: 52,
    R: 53,
    S: 54,
    T: 55,
    U: 56,
    V: 57,
    W: 58,
    X: 59,
    Y: 60,
    Z: 61
};

ft.string10to62 = function (t) {
    var e = Number(t),
        i = [];
    do {
        var a = e % 62;
        e = (e - a) / 62, i.unshift(ft.__CHARS62[a])
    } while (e);
    return i.join("")
}, ft.string62to10 = function (t) {
    for (var e = (t = String(t)).length, i = 0, a = 0; i < e;) a += Math.pow(62, i++) * ft.__CHARS62Obj[t.charAt(e - i)];
    return a
}, ft.randString62 = function (t) {
    for (var e = "", i = 0; i < t; i++) e += ft.__CHARS62[ft.rand(62)];
    return e
}, ft.rand = function (t) {
    if (t > 1) {
        var e = parseInt(Math.random() * t);
        return e == t && e--, e
    }
    return 0
}, ft.createRandSeed = function (t, e) {
    for (var i = 0, a = 0; a < t.length; a++) i += t.charCodeAt(a) * (a + 1);
    return e || (e = 0), i * (e + 1) % 95471665
}, ft.nextRandSeed = function (t, e) {
    e || (e = 2147483647);
    var i = (5471663 * t + 49297) % 95471665;
    return [i, parseInt(i / 95471665 * e)]
}, ft.ungzip = function (e) {
    // return require("gzip").inflate(e, {
    //     to: "string"
    // })
}, ft.gzip = function (e) {
    // return require("gzip").deflate(e, {
    //     to: "string",
    //     gzip: !0
    // })
}

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

const fs = require('fs');
const { gzip, ungzip } = require('node-gzip');
fs.readFile('data.json', (err, data) => {
    if (err) throw err;
    let t_data = JSON.parse(data);
    var a = ft.Base64.decodeBin(t_data.text, "qzjh1CpD9lYCNjEGPUn7");
    // var buf = Buffer.from(t_data.text, 'utf8');
    ungzip(a).then((decompressed) => {
        ss = decompressed.toString();
        fs.writeFile("data.txt", ss, (err) => {
            if (err) throw err;
            console.log('It\'s saved!');
        });
        // console.log(decompressed.toString());     //Hello World
    });
    console.log(t_data);
});




// gzip('Hello World')
//     .then((compressed) => {
//         return ungzip(compressed);
//     })
//     .then((decompressed) => {
//         console.log(decompressed.toString());     //Hello World
//     });