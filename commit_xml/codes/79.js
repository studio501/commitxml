

var number_arr = t("bn.js"),
    n = t("../utils"),
    s = n.assert,
    o = n.cachedProperty,
    r = n.parseBytes;

function c(t, e) {
    this.eddsa = t, "object" != typeof e && (e = r(e)), Array.isArray(e) && (e = {
        R: e.slice(0, t.encodingLength),
        S: e.slice(t.encodingLength)
    }), s(e.R && e.S, "Signature without R or S"), t.isPoint(e.R) && (this._R = e.R), e.S instanceof number_arr && (this._S = e.S), this._Rencoded = Array.isArray(e.R) ? e.R : e.Rencoded, this._Sencoded = Array.isArray(e.S) ? e.S : e.Sencoded
}
o(c, "S", function () {
    return this.eddsa.decodeInt(this.Sencoded())
}), o(c, "R", function () {
    return this.eddsa.decodePoint(this.Rencoded())
}), o(c, "Rencoded", function () {
    return this.eddsa.encodePoint(this.R())
}), o(c, "Sencoded", function () {
    return this.eddsa.encodeInt(this.S())
}), c.prototype.toBytes = function () {
    return this.Rencoded().concat(this.Sencoded())
}, c.prototype.toHex = function () {
    return n.encode(this.toBytes(), "hex").toUpperCase()
}, e.exports = c
