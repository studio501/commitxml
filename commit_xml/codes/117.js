
            (function (t) {
                
                void 0 === t || !t.version || 0 === t.version.indexOf("v0.") || 0 === t.version.indexOf("v1.") && 0 !== t.version.indexOf("v1.8.") ? e.exports = {
                    nextTick: function (e, i, a, n) {
                        if ("function" != typeof e) throw new TypeError('"callback" argument must be a function');
                        var s, o, r = arguments.length;
                        switch (r) {
                            case 0:
                            case 1:
                                return t.nextTick(e);
                            case 2:
                                return t.nextTick(function () {
                                    e.call(null, i)
                                });
                            case 3:
                                return t.nextTick(function () {
                                    e.call(null, i, a)
                                });
                            case 4:
                                return t.nextTick(function () {
                                    e.call(null, i, a, n)
                                });
                            default:
                                for (s = new Array(r - 1), o = 0; o < s.length;) s[o++] = arguments[o];
                                return t.nextTick(function () {
                                    e.apply(null, s)
                                })
                        }
                    }
                } : e.exports = t
            }).call(this, t("_process"))
        