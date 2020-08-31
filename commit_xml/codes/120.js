
var number_arr = t("create-hash"),
    n = t("safe-buffer").Buffer;

function s(t) {
    var e = n.allocUnsafe(4);
    return e.writeUInt32BE(t, 0), e
}
e.exports = function (t, e) {
    for (var i, o = n.alloc(0), r = 0; o.length < e;) i = s(r++), o = n.concat([o, number_arr("sha1").update(t).update(i).digest()]);
    return o.slice(0, e)
}
