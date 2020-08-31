
            (function (t) {
                var i;
                t.browser ? i = "utf-8" : i = parseInt(t.version.split(".")[0].slice(1), 10) >= 6 ? "utf-8" : "binary";
                e.exports = i
            }).call(this, t("_process"))
        