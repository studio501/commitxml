
            (function (i) {
                var a = t("elliptic"),
                    n = t("bn.js");
                e.exports = function (t) {
                    return new o(t)
                };
                var s = {
                    secp256k1: {
                        name: "secp256k1",
                        byteLength: 32
                    },
                    secp224r1: {
                        name: "p224",
                        byteLength: 28
                    },
                    prime256v1: {
                        name: "p256",
                        byteLength: 32
                    },
                    prime192v1: {
                        name: "p192",
                        byteLength: 24
                    },
                    ed25519: {
                        name: "ed25519",
                        byteLength: 32
                    },
                    secp384r1: {
                        name: "p384",
                        byteLength: 48
                    },
                    secp521r1: {
                        name: "p521",
                        byteLength: 66
                    }
                };

                function o(t) {
                    this.curveType = s[t], this.curveType || (this.curveType = {
                        name: t
                    }), this.curve = new a.ec(this.curveType.name), this.keys = void 0
                }

                function r(t, e, a) {
                    Array.isArray(t) || (t = t.toArray());
                    var n = new i(t);
                    if (a && n.length < a) {
                        var s = new i(a - n.length);
                        s.fill(0), n = i.concat([s, n])
                    }
                    return e ? n.toString(e) : n
                }
                s.p224 = s.secp224r1, s.p256 = s.secp256r1 = s.prime256v1, s.p192 = s.secp192r1 = s.prime192v1, s.p384 = s.secp384r1, s.p521 = s.secp521r1, o.prototype.generateKeys = function (t, e) {
                    return this.keys = this.curve.genKeyPair(), this.getPublicKey(t, e)
                }, o.prototype.computeSecret = function (t, e, a) {
                    return e = e || "utf8", i.isBuffer(t) || (t = new i(t, e)), r(this.curve.keyFromPublic(t).getPublic().mul(this.keys.getPrivate()).getX(), a, this.curveType.byteLength)
                }, o.prototype.getPublicKey = function (t, e) {
                    var i = this.keys.getPublic("compressed" === e, !0);
                    return "hybrid" === e && (i[i.length - 1] % 2 ? i[0] = 7 : i[0] = 6), r(i, t)
                }, o.prototype.getPrivateKey = function (t) {
                    return r(this.keys.getPrivate(), t)
                }, o.prototype.setPublicKey = function (t, e) {
                    return e = e || "utf8", i.isBuffer(t) || (t = new i(t, e)), this.keys._importPublic(t), this
                }, o.prototype.setPrivateKey = function (t, e) {
                    e = e || "utf8", i.isBuffer(t) || (t = new i(t, e));
                    var a = new n(t);
                    return a = a.toString(16), this.keys = this.curve.genKeyPair(), this.keys._importPrivate(a), this
                }
            }).call(this, t("buffer").Buffer)
        