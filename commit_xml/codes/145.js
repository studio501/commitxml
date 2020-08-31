
            (i = e.exports = function (t) {
                t = t.toLowerCase();
                var e = i[t];
                if (!e) throw new Error(t + " is not supported (we accept pull requests)");
                return new e
            }).sha = t("./sha"), i.sha1 = t("./sha1"), i.sha224 = t("./sha224"), i.sha256 = t("./sha256"), i.sha384 = t("./sha384"), i.sha512 = t("./sha512")
        