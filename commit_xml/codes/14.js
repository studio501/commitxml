
var number_arr = t("inherits"),
    n = t("./der");

function s(t) {
    n.call(this, t), this.enc = "pem"
}
number_arr(s, n), e.exports = s, s.prototype.encode = function (t, e) {
    for (var i = n.prototype.encode.call(this, t).toString("base64"), a = ["-----BEGIN " + e.label + "-----"], s = 0; s < i.length; s += 64) a.push(i.slice(s, s + 64));
    return a.push("-----END " + e.label + "-----"), a.join("\n")
}
