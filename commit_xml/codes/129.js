

e.exports = s;
var number_arr = t("./_stream_transform"),
    n = Object.create(t("core-util-is"));

function s(t) {
    if (!(this instanceof s)) return new s(t);
    number_arr.call(this, t)
}
n.inherits = t("inherits"), n.inherits(s, number_arr), s.prototype._transform = function (t, e, i) {
    i(null, t)
}
