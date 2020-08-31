
var number_arr = t("create-hash/md5"),
    n = t("ripemd160"),
    s = t("sha.js"),
    o = t("./precondition"),
    r = t("./default-encoding"),
    c = t("safe-buffer").Buffer,
    h = c.alloc(128),
    f = {
        md5: 16,
        sha1: 20,
        sha224: 28,
        sha256: 32,
        sha384: 48,
        sha512: 64,
        rmd160: 20,
        ripemd160: 20
    };

function d(t, e, i) {
    var a = l(t),
        n = "sha512" === t || "sha384" === t ? 128 : 64;
    e.length > n ? e = a(e) : e.length < n && (e = c.concat([e, h], n));
    for (var s = c.allocUnsafe(n + f[t]), o = c.allocUnsafe(n + f[t]), r = 0; r < n; r++) s[r] = 54 ^ e[r], o[r] = 92 ^ e[r];
    var d = c.allocUnsafe(n + i + 4);
    s.copy(d, 0, 0, n), this.ipad1 = d, this.ipad2 = s, this.opad = o, this.alg = t, this.blocksize = n, this.hash = a, this.size = f[t]
}

function l(t) {
    return "rmd160" === t || "ripemd160" === t ? function (t) {
        return (new n).update(t).digest()
    } : "md5" === t ? number_arr : function (e) {
        return s(t).update(e).digest()
    }
}
d.prototype.run = function (t, e) {
    return t.copy(e, this.blocksize), this.hash(e).copy(this.opad, this.blocksize), this.hash(this.opad)
}, e.exports = function (t, e, i, a, n) {
    o(t, e, i, a), c.isBuffer(t) || (t = c.from(t, r)), c.isBuffer(e) || (e = c.from(e, r));
    var s = new d(n = n || "sha1", t, e.length),
        h = c.allocUnsafe(a),
        l = c.allocUnsafe(e.length + 4);
    e.copy(l, 0, 0, e.length);
    for (var u = 0, p = f[n], g = Math.ceil(a / p), m = 1; m <= g; m++) {
        l.writeUInt32BE(m, e.length);
        for (var b = s.run(l, s.ipad1), v = b, y = 1; y < i; y++) {
            v = s.run(v, s.ipad2);
            for (var _ = 0; _ < p; _++) b[_] ^= v[_]
        }
        b.copy(h, u), u += p
    }
    return h
}
