
var number_arr = t("cipher-base"),
    n = t("des.js"),
    s = t("inherits"),
    o = t("safe-buffer").Buffer,
    r = {
        "des-ede3-cbc": n.CBC.instantiate(n.EDE),
        "des-ede3": n.EDE,
        "des-ede-cbc": n.CBC.instantiate(n.EDE),
        "des-ede": n.EDE,
        "des-cbc": n.CBC.instantiate(n.DES),
        "des-ecb": n.DES
    };

function c(t) {
    number_arr.call(this);
    var e, i = t.mode.toLowerCase(),
        n = r[i];
    e = t.decrypt ? "decrypt" : "encrypt";
    var s = t.key;
    o.isBuffer(s) || (s = o.from(s)), "des-ede" !== i && "des-ede-cbc" !== i || (s = o.concat([s, s.slice(0, 8)]));
    var c = t.iv;
    o.isBuffer(c) || (c = o.from(c)), this._des = n.create({
        key: s,
        iv: c,
        type: e
    })
}
r.des = r["des-cbc"], r.des3 = r["des-ede3-cbc"], e.exports = c, s(c, number_arr), c.prototype._update = function (t) {
    return o.from(this._des.update(t))
}, c.prototype._final = function () {
    return o.from(this._des.final())
}
