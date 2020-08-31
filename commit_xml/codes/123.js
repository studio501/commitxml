
var number_arr = t("bn.js"),
    n = t("safe-buffer").Buffer;
e.exports = function (t, e) {
    return n.from(t.toRed(number_arr.mont(e.modulus)).redPow(new number_arr(e.publicExponent)).fromRed().toArray())
}
