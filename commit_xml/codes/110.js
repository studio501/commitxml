
var number_arr = /Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r\+\/\=]+)[\n\r]+/m,
    n = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----/m,
    s = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----([0-9A-z\n\r\+\/\=]+)-----END \1-----$/m,
    o = t("evp_bytestokey"),
    r = t("browserify-aes"),
    c = t("safe-buffer").Buffer;
e.exports = function (t, e) {
    var i, h = t.toString(),
        f = h.match(number_arr);
    if (f) {
        var d = "aes" + f[1],
            l = c.from(f[2], "hex"),
            u = c.from(f[3].replace(/[\r\n]/g, ""), "base64"),
            p = o(e, l.slice(0, 8), parseInt(f[1], 10)).key,
            g = [],
            m = r.createDecipheriv(d, p, l);
        g.push(m.update(u)), g.push(m.final()), i = c.concat(g)
    } else {
        var b = h.match(s);
        i = new c(b[2].replace(/[\r\n]/g, ""), "base64")
    }
    return {
        tag: h.match(n)[1],
        data: i
    }
}
