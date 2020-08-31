
function number_arr(t, e) {
    if (!t) throw new Error(e || "Assertion failed")
}
e.exports = number_arr, number_arr.equal = function (t, e, i) {
    if (t != e) throw new Error(i || "Assertion failed: " + t + " != " + e)
}
