
            (function (t) {
                function e(t) {
                    return Object.prototype.toString.call(t)
                }
                i.isArray = function (t) {
                    return Array.isArray ? Array.isArray(t) : "[object Array]" === e(t)
                }, i.isBoolean = function (t) {
                    return "boolean" == typeof t
                }, i.isNull = function (t) {
                    return null === t
                }, i.isNullOrUndefined = function (t) {
                    return null == t
                }, i.isNumber = function (t) {
                    return "number" == typeof t
                }, i.isString = function (t) {
                    return "string" == typeof t
                }, i.isSymbol = function (t) {
                    return "symbol" == typeof t
                }, i.isUndefined = function (t) {
                    return void 0 === t
                }, i.isRegExp = function (t) {
                    return "[object RegExp]" === e(t)
                }, i.isObject = function (t) {
                    return "object" == typeof t && null !== t
                }, i.isDate = function (t) {
                    return "[object Date]" === e(t)
                }, i.isError = function (t) {
                    return "[object Error]" === e(t) || t instanceof Error
                }, i.isFunction = function (t) {
                    return "function" == typeof t
                }, i.isPrimitive = function (t) {
                    return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || void 0 === t
                }, i.isBuffer = t.isBuffer
            }).call(this, {
                isBuffer: t("../../is-buffer/index.js")
            })
        