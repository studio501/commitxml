
            "function" == typeof Object.create ? e.exports = function (t, e) {
                e && (t.super_ = e, t.prototype = Object.create(e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }))
            } : e.exports = function (t, e) {
                if (e) {
                    t.super_ = e;
                    var i = function () { };
                    i.prototype = e.prototype, t.prototype = new i, t.prototype.constructor = t
                }
            }
        