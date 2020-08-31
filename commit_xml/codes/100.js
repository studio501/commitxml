
var number_arr = [].indexOf;
e.exports = function (t, e) {
    if (number_arr) return t.indexOf(e);
    for (var i = 0; i < t.length; ++i)
        if (t[i] === e) return i;
    return -1
}
