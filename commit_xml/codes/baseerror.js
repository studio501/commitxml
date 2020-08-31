
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
                        txt: "\u8d26\u53f7\u4e0d\u5b58\u5728"
                    },
                    IDErrorNoHeader: {
                        id: 2,
                        txt: "\u5b58\u6863\u4e0d\u5b58\u5728"
                    },
                    IDErrorIllegal: {
                        id: 3,
                        txt: "\u6570\u636e\u975e\u6cd5\u8bbf\u95ee"
                    }
                }, ft.gameErrors = {}, ft.getError = function (t) {
                    return ft.systemErrors[t] ? ft.systemErrors[t] : !!ft.gameErrors[t] && ft.gameErrors[t]
                }
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        