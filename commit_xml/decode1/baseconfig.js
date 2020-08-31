const { gzip, ungzip } = require('node-gzip');

function getType(t) {
    "@babel/helpers - typeof";
    return (getType = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
}

var ft = {}
var ftc = {}
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

ftc.newColor = function (t) {
    var e = t >> 16 & 255,
        i = t >> 8 & 255,
        a = 255 & t;
    return [e, i, a]
}

var a = ftc.newColor(0x12e4bf)
gzip('Hello World').then((compressed) => {
    console.log(compressed.toString());
    return ungzip(compressed);
}).then((decompressed) => {
    console.log(decompressed.toString());     //Hello World
});




// for (var i = 0; i < 10000; i++) {
//     console.log(ft.rand(5));
// }
// var a = ft.string10to62(63);



var _t = 100;