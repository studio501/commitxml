

var number_arr = t("minimalistic-assert"),
    n = t("inherits"),
    s = t("./cipher"),
    o = t("./des");

function r(t, e) {
    number_arr.equal(e.length, 24, "Invalid key length");
    var i = e.slice(0, 8),
        n = e.slice(8, 16),
        s = e.slice(16, 24);
    this.ciphers = "encrypt" === t ? [o.create({
        type: "encrypt",
        key: i
    }), o.create({
        type: "decrypt",
        key: n
    }), o.create({
        type: "encrypt",
        key: s
    })] : [o.create({
        type: "decrypt",
        key: s
    }), o.create({
        type: "encrypt",
        key: n
    }), o.create({
        type: "decrypt",
        key: i
    })]
}

function c(t) {
    s.call(this, t);
    var e = new r(this.type, this.options.key);
    this._edeState = e
}
n(c, s), e.exports = c, c.create = function (t) {
    return new c(t)
}, c.prototype._update = function (t, e, i, a) {
    var n = this._edeState;
    n.ciphers[0]._update(t, e, i, a), n.ciphers[1]._update(i, a, i, a), n.ciphers[2]._update(i, a, i, a)
}, c.prototype._pad = o.prototype._pad, c.prototype._unpad = o.prototype._unpad
