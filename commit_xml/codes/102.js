
function number_arr(t) {
    return !!t.constructor && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t)
}

function n(t) {
    return "function" == typeof t.readFloatLE && "function" == typeof t.slice && number_arr(t.slice(0, 0))
}
e.exports = function (t) {
    return null != t && (number_arr(t) || n(t) || !!t._isBuffer)
}
