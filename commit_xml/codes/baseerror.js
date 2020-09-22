
            (function (t) {
                
                cc._RF.push(e, "78e5f2cH1lHYKdfAmiDrBug", "baseerror");
                try {
                    window.ft = window.ft || {}
                } catch (e) {
                    t.ft = t.ft || {}
                }
                ft.systemErrors = {
                    IDErrorNoAccount: {
                        id: 1,
                        txt: "账号不存在"
                    },
                    IDErrorNoHeader: {
                        id: 2,
                        txt: "存档不存在"
                    },
                    IDErrorIllegal: {
                        id: 3,
                        txt: "数据非法访问"
                    }
                }, ft.gameErrors = {}, ft.getError = function (t) {
                    return ft.systemErrors[t] ? ft.systemErrors[t] : !!ft.gameErrors[t] && ft.gameErrors[t]
                }
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        