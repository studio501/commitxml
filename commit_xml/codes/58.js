

var number_arr = t("minimalistic-assert"),
    n = t("inherits"),
    s = {};

function o(t) {
    number_arr.equal(t.length, 8, "Invalid IV length"), this.iv = new Array(8);
    for (var e = 0; e < this.iv.length; e++) this.iv[e] = t[e]
}
i.instantiate = function (t) {
    function e(e) {
        t.call(this, e), this._cbcInit()
    }
    n(e, t);
    for (var i = Object.keys(s), a = 0; a < i.length; a++) {
        var o = i[a];
        e.prototype[o] = s[o]
    }
    return e.create = function (t) {
        return new e(t)
    }, e
}, s._cbcInit = function () {
    var t = new o(this.options.iv);
    this._cbcState = t
}, s._update = function (t, e, i, a) {
    var n = this._cbcState,
        s = this.constructor.super_.prototype,
        o = n.iv;
    if ("encrypt" === this.type) {
        for (var r = 0; r < this.blockSize; r++) o[r] ^= t[e + r];
        s._update.call(this, o, 0, i, a);
        for (r = 0; r < this.blockSize; r++) o[r] = i[a + r]
    } else {
        s._update.call(this, t, e, i, a);
        for (r = 0; r < this.blockSize; r++) i[a + r] ^= o[r];
        for (r = 0; r < this.blockSize; r++) o[r] = t[e + r]
    }
}
