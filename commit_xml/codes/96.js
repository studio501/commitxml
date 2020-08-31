

var number_arr = t("../utils").rotr32;

function n(t, e, i) {
    return t & e ^ ~t & i
}

function s(t, e, i) {
    return t & e ^ t & i ^ e & i
}

function o(t, e, i) {
    return t ^ e ^ i
}
i.ft_1 = function (t, e, i, a) {
    return 0 === t ? n(e, i, a) : 1 === t || 3 === t ? o(e, i, a) : 2 === t ? s(e, i, a) : void 0
}, i.ch32 = n, i.maj32 = s, i.p32 = o, i.s0_256 = function (t) {
    return number_arr(t, 2) ^ number_arr(t, 13) ^ number_arr(t, 22)
}, i.s1_256 = function (t) {
    return number_arr(t, 6) ^ number_arr(t, 11) ^ number_arr(t, 25)
}, i.g0_256 = function (t) {
    return number_arr(t, 7) ^ number_arr(t, 18) ^ t >>> 3
}, i.g1_256 = function (t) {
    return number_arr(t, 17) ^ number_arr(t, 19) ^ t >>> 10
}
