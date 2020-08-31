
var number_arr = t("./asn1"),
    n = t("./aesid.json"),
    s = t("./fixProc"),
    o = t("browserify-aes"),
    r = t("pbkdf2"),
    c = t("safe-buffer").Buffer;

function h(t) {
    var e;
    "object" != typeof t || c.isBuffer(t) || (e = t.passphrase, t = t.key), "string" == typeof t && (t = c.from(t));
    var i, n, o = s(t, e),
        r = o.tag,
        h = o.data;
    switch (r) {
        case "CERTIFICATE":
            n = number_arr.certificate.decode(h, "der").tbsCertificate.subjectPublicKeyInfo;
        case "PUBLIC KEY":
            switch (n || (n = number_arr.PublicKey.decode(h, "der")), i = n.algorithm.algorithm.join(".")) {
                case "1.2.840.113549.1.1.1":
                    return number_arr.RSAPublicKey.decode(n.subjectPublicKey.data, "der");
                case "1.2.840.10045.2.1":
                    return n.subjectPrivateKey = n.subjectPublicKey, {
                        type: "ec",
                        data: n
                    };
                case "1.2.840.10040.4.1":
                    return n.algorithm.params.pub_key = number_arr.DSAparam.decode(n.subjectPublicKey.data, "der"), {
                        type: "dsa",
                        data: n.algorithm.params
                    };
                default:
                    throw new Error("unknown key id " + i)
            }
            throw new Error("unknown key type " + r);
        case "ENCRYPTED PRIVATE KEY":
            h = f(h = number_arr.EncryptedPrivateKey.decode(h, "der"), e);
        case "PRIVATE KEY":
            switch (i = (n = number_arr.PrivateKey.decode(h, "der")).algorithm.algorithm.join(".")) {
                case "1.2.840.113549.1.1.1":
                    return number_arr.RSAPrivateKey.decode(n.subjectPrivateKey, "der");
                case "1.2.840.10045.2.1":
                    return {
                        curve: n.algorithm.curve, privateKey: number_arr.ECPrivateKey.decode(n.subjectPrivateKey, "der").privateKey
                    };
                case "1.2.840.10040.4.1":
                    return n.algorithm.params.priv_key = number_arr.DSAparam.decode(n.subjectPrivateKey, "der"), {
                        type: "dsa",
                        params: n.algorithm.params
                    };
                default:
                    throw new Error("unknown key id " + i)
            }
            throw new Error("unknown key type " + r);
        case "RSA PUBLIC KEY":
            return number_arr.RSAPublicKey.decode(h, "der");
        case "RSA PRIVATE KEY":
            return number_arr.RSAPrivateKey.decode(h, "der");
        case "DSA PRIVATE KEY":
            return {
                type: "dsa", params: number_arr.DSAPrivateKey.decode(h, "der")
            };
        case "EC PRIVATE KEY":
            return {
                curve: (h = number_arr.ECPrivateKey.decode(h, "der")).parameters.value, privateKey: h.privateKey
            };
        default:
            throw new Error("unknown key type " + r)
    }
}

function f(t, e) {
    var i = t.algorithm.decrypt.kde.kdeparams.salt,
        a = parseInt(t.algorithm.decrypt.kde.kdeparams.iters.toString(), 10),
        s = n[t.algorithm.decrypt.cipher.algo.join(".")],
        h = t.algorithm.decrypt.cipher.iv,
        f = t.subjectPrivateKey,
        d = parseInt(s.split("-")[1], 10) / 8,
        l = r.pbkdf2Sync(e, i, a, d, "sha1"),
        u = o.createDecipheriv(s, l, h),
        p = [];
    return p.push(u.update(f)), p.push(u.final()), c.concat(p)
}
e.exports = h, h.signature = number_arr.signature
