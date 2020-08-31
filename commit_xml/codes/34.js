
            (function (e) {
                var a = t("buffer-xor");

                function n(t) {
                    return t._prev = t._cipher.encryptBlock(t._prev), t._prev
                }
                i.encrypt = function (t, i) {
                    for (; t._cache.length < i.length;) t._cache = e.concat([t._cache, n(t)]);
                    var s = t._cache.slice(0, i.length);
                    return t._cache = t._cache.slice(i.length), a(i, s)
                }
            }).call(this, t("buffer").Buffer)
        