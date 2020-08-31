
            i.encrypt = function (t, e) {
                return t._cipher.encryptBlock(e)
            }, i.decrypt = function (t, e) {
                return t._cipher.decryptBlock(e)
            }
        