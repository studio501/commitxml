

var number_arr = t("../utils"),
    n = t("./256");

function s() {
    if (!(this instanceof s)) return new s;
    n.call(this), this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]
}
number_arr.inherits(s, n), e.exports = s, s.blockSize = 512, s.outSize = 224, s.hmacStrength = 192, s.padLength = 64, s.prototype._digest = function (t) {
    return "hex" === t ? number_arr.toHex32(this.h.slice(0, 7), "big") : number_arr.split32(this.h.slice(0, 7), "big")
}
