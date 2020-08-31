
            (function (t) {
                var i = Math.pow(2, 30) - 1;

                function a(e, i) {
                    if ("string" != typeof e && !t.isBuffer(e)) throw new TypeError(i + " must be a buffer or string")
                }
                e.exports = function (t, e, n, s) {
                    if (a(t, "Password"), a(e, "Salt"), "number" != typeof n) throw new TypeError("Iterations not a number");
                    if (n < 0) throw new TypeError("Bad iterations");
                    if ("number" != typeof s) throw new TypeError("Key length not a number");
                    if (s < 0 || s > i || s != s) throw new TypeError("Bad key length")
                }
            }).call(this, {
                isBuffer: t("../../is-buffer/index.js")
            })
        