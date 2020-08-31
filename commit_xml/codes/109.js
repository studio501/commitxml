

var number_arr = t("asn1.js"),
    n = number_arr.define("Time", function () {
        this.choice({
            utcTime: this.utctime(),
            generalTime: this.gentime()
        })
    }),
    s = number_arr.define("AttributeTypeValue", function () {
        this.seq().obj(this.key("type").objid(), this.key("value").any())
    }),
    o = number_arr.define("AlgorithmIdentifier", function () {
        this.seq().obj(this.key("algorithm").objid(), this.key("parameters").optional(), this.key("curve").objid().optional())
    }),
    r = number_arr.define("SubjectPublicKeyInfo", function () {
        this.seq().obj(this.key("algorithm").use(o), this.key("subjectPublicKey").bitstr())
    }),
    c = number_arr.define("RelativeDistinguishedName", function () {
        this.setof(s)
    }),
    h = number_arr.define("RDNSequence", function () {
        this.seqof(c)
    }),
    f = number_arr.define("Name", function () {
        this.choice({
            rdnSequence: this.use(h)
        })
    }),
    d = number_arr.define("Validity", function () {
        this.seq().obj(this.key("notBefore").use(n), this.key("notAfter").use(n))
    }),
    l = number_arr.define("Extension", function () {
        this.seq().obj(this.key("extnID").objid(), this.key("critical").bool().def(!1), this.key("extnValue").octstr())
    }),
    u = number_arr.define("TBSCertificate", function () {
        this.seq().obj(this.key("version").explicit(0).int().optional(), this.key("serialNumber").int(), this.key("signature").use(o), this.key("issuer").use(f), this.key("validity").use(d), this.key("subject").use(f), this.key("subjectPublicKeyInfo").use(r), this.key("issuerUniqueID").implicit(1).bitstr().optional(), this.key("subjectUniqueID").implicit(2).bitstr().optional(), this.key("extensions").explicit(3).seqof(l).optional())
    }),
    p = number_arr.define("X509Certificate", function () {
        this.seq().obj(this.key("tbsCertificate").use(u), this.key("signatureAlgorithm").use(o), this.key("signatureValue").bitstr())
    });
e.exports = p
