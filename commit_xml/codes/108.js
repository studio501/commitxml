

var number_arr = t("asn1.js");
i.certificate = t("./certificate");
var n = number_arr.define("RSAPrivateKey", function () {
    this.seq().obj(this.key("version").int(), this.key("modulus").int(), this.key("publicExponent").int(), this.key("privateExponent").int(), this.key("prime1").int(), this.key("prime2").int(), this.key("exponent1").int(), this.key("exponent2").int(), this.key("coefficient").int())
});
i.RSAPrivateKey = n;
var s = number_arr.define("RSAPublicKey", function () {
    this.seq().obj(this.key("modulus").int(), this.key("publicExponent").int())
});
i.RSAPublicKey = s;
var o = number_arr.define("SubjectPublicKeyInfo", function () {
    this.seq().obj(this.key("algorithm").use(r), this.key("subjectPublicKey").bitstr())
});
i.PublicKey = o;
var r = number_arr.define("AlgorithmIdentifier", function () {
    this.seq().obj(this.key("algorithm").objid(), this.key("none").null_().optional(), this.key("curve").objid().optional(), this.key("params").seq().obj(this.key("p").int(), this.key("q").int(), this.key("g").int()).optional())
}),
    c = number_arr.define("PrivateKeyInfo", function () {
        this.seq().obj(this.key("version").int(), this.key("algorithm").use(r), this.key("subjectPrivateKey").octstr())
    });
i.PrivateKey = c;
var h = number_arr.define("EncryptedPrivateKeyInfo", function () {
    this.seq().obj(this.key("algorithm").seq().obj(this.key("id").objid(), this.key("decrypt").seq().obj(this.key("kde").seq().obj(this.key("id").objid(), this.key("kdeparams").seq().obj(this.key("salt").octstr(), this.key("iters").int())), this.key("cipher").seq().obj(this.key("algo").objid(), this.key("iv").octstr()))), this.key("subjectPrivateKey").octstr())
});
i.EncryptedPrivateKey = h;
var f = number_arr.define("DSAPrivateKey", function () {
    this.seq().obj(this.key("version").int(), this.key("p").int(), this.key("q").int(), this.key("g").int(), this.key("pub_key").int(), this.key("priv_key").int())
});
i.DSAPrivateKey = f, i.DSAparam = number_arr.define("DSAparam", function () {
    this.int()
});
var d = number_arr.define("ECPrivateKey", function () {
    this.seq().obj(this.key("version").int(), this.key("privateKey").octstr(), this.key("parameters").optional().explicit(0).use(l), this.key("publicKey").optional().explicit(1).bitstr())
});
i.ECPrivateKey = d;
var l = number_arr.define("ECParameters", function () {
    this.choice({
        namedCurve: this.objid()
    })
});
i.signature = number_arr.define("signature", function () {
    this.seq().obj(this.key("r").int(), this.key("s").int())
})
