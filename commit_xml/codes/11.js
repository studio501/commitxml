
var number_arr = t("inherits"),
    n = t("buffer").Buffer,
    s = t("./der");

function o(t) {
    s.call(this, t), this.enc = "pem"
}
number_arr(o, s), e.exports = o, o.prototype.decode = function (t, e) {
    for (var i = t.toString().split(/[\r\n]+/g), a = e.label.toUpperCase(), o = /^-----(BEGIN|END) ([^-]+)-----$/, r = -1, c = -1, h = 0; h < i.length; h++) {
        var f = i[h].match(o);
        if (null !== f && f[2] === a) {
            if (-1 !== r) {
                if ("END" !== f[1]) break;
                c = h;
                break
            }
            if ("BEGIN" !== f[1]) break;
            r = h
        }
    }
    if (-1 === r || -1 === c) throw new Error("PEM section not found for: " + a);
    var d = i.slice(r + 1, c).join("");
    d.replace(/[^a-z0-9\+\/=]+/gi, "");
    var l = new n(d, "base64");
    return s.prototype.decode.call(this, l, e)
}
