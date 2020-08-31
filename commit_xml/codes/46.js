
            (function (t) {
                e.exports = function (e, i) {
                    for (var a = Math.min(e.length, i.length), n = new t(a), s = 0; s < a; ++s) n[s] = e[s] ^ i[s];
                    return n
                }
            }).call(this, t("buffer").Buffer)
        