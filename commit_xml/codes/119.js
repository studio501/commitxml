
            i.publicEncrypt = t("./publicEncrypt"), i.privateDecrypt = t("./privateDecrypt"), i.privateEncrypt = function (t, e) {
                return i.publicEncrypt(t, e, !0)
            }, i.publicDecrypt = function (t, e) {
                return i.privateDecrypt(t, e, !0)
            }
        