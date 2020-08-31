
            (function (i) {
                var a = t("bn.js"),
                    n = new (t("miller-rabin")),
                    s = new a(24),
                    o = new a(11),
                    r = new a(10),
                    c = new a(3),
                    h = new a(7),
                    f = t("./generatePrime"),
                    d = t("randombytes");

                function l(t, e) {
                    return e = e || "utf8", i.isBuffer(t) || (t = new i(t, e)), this._pub = new a(t), this
                }

                function u(t, e) {
                    return e = e || "utf8", i.isBuffer(t) || (t = new i(t, e)), this._priv = new a(t), this
                }
                e.exports = m;
                var p = {};

                function g(t, e) {
                    var i = e.toString("hex"),
                        a = [i, t.toString(16)].join("_");
                    if (a in p) return p[a];
                    var d, l = 0;
                    if (t.isEven() || !f.simpleSieve || !f.fermatTest(t) || !n.test(t)) return l += 1, l += "02" === i || "05" === i ? 8 : 4, p[a] = l, l;
                    switch (n.test(t.shrn(1)) || (l += 2), i) {
                        case "02":
                            t.mod(s).cmp(o) && (l += 8);
                            break;
                        case "05":
                            (d = t.mod(r)).cmp(c) && d.cmp(h) && (l += 8);
                            break;
                        default:
                            l += 4
                    }
                    return p[a] = l, l
                }

                function m(t, e, i) {
                    this.setGenerator(e), this.__prime = new a(t), this._prime = a.mont(this.__prime), this._primeLen = t.length, this._pub = void 0, this._priv = void 0, this._primeCode = void 0, i ? (this.setPublicKey = l, this.setPrivateKey = u) : this._primeCode = 8
                }

                function b(t, e) {
                    var a = new i(t.toArray());
                    return e ? a.toString(e) : a
                }
                Object.defineProperty(m.prototype, "verifyError", {
                    enumerable: !0,
                    get: function () {
                        return "number" != typeof this._primeCode && (this._primeCode = g(this.__prime, this.__gen)), this._primeCode
                    }
                }), m.prototype.generateKeys = function () {
                    return this._priv || (this._priv = new a(d(this._primeLen))), this._pub = this._gen.toRed(this._prime).redPow(this._priv).fromRed(), this.getPublicKey()
                }, m.prototype.computeSecret = function (t) {
                    var e = (t = (t = new a(t)).toRed(this._prime)).redPow(this._priv).fromRed(),
                        n = new i(e.toArray()),
                        s = this.getPrime();
                    if (n.length < s.length) {
                        var o = new i(s.length - n.length);
                        o.fill(0), n = i.concat([o, n])
                    }
                    return n
                }, m.prototype.getPublicKey = function (t) {
                    return b(this._pub, t)
                }, m.prototype.getPrivateKey = function (t) {
                    return b(this._priv, t)
                }, m.prototype.getPrime = function (t) {
                    return b(this.__prime, t)
                }, m.prototype.getGenerator = function (t) {
                    return b(this._gen, t)
                }, m.prototype.setGenerator = function (t, e) {
                    return e = e || "utf8", i.isBuffer(t) || (t = new i(t, e)), this.__gen = t, this._gen = new a(t), this
                }
            }).call(this, t("buffer").Buffer)
        