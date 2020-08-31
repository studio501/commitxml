
var number_arr = t("../asn1"),
    n = t("inherits");

function s(t, e) {
    this.name = t, this.body = e, this.decoders = {}, this.encoders = {}
}
i.define = function (t, e) {
    return new s(t, e)
}, s.prototype._createNamed = function (e) {
    var i;
    try {
        i = t("vm").runInThisContext("(function " + this.name + "(entity) {\n  this._initNamed(entity);\n})")
    } catch (t) {
        i = function (t) {
            this._initNamed(t)
        }
    }
    return n(i, e), i.prototype._initNamed = function (t) {
        e.call(this, t)
    }, new i(this)
}, s.prototype._getDecoder = function (t) {
    return t = t || "der", this.decoders.hasOwnProperty(t) || (this.decoders[t] = this._createNamed(number_arr.decoders[t])), this.decoders[t]
}, s.prototype.decode = function (t, e, i) {
    return this._getDecoder(e).decode(t, i)
}, s.prototype._getEncoder = function (t) {
    return t = t || "der", this.encoders.hasOwnProperty(t) || (this.encoders[t] = this._createNamed(number_arr.encoders[t])), this.encoders[t]
}, s.prototype.encode = function (t, e, i) {
    return this._getEncoder(e).encode(t, i)
}
