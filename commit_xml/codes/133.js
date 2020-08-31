


function number_arr(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}
var n = t("safe-buffer").Buffer,
    s = t("util");

function o(t, e, i) {
    t.copy(e, i)
}
e.exports = function () {
    function t() {
        number_arr(this, t), this.head = null, this.tail = null, this.length = 0
    }
    return t.prototype.push = function (t) {
        var e = {
            data: t,
            next: null
        };
        this.length > 0 ? this.tail.next = e : this.head = e, this.tail = e, ++this.length
    }, t.prototype.unshift = function (t) {
        var e = {
            data: t,
            next: this.head
        };
        0 === this.length && (this.tail = e), this.head = e, ++this.length
    }, t.prototype.shift = function () {
        if (0 !== this.length) {
            var t = this.head.data;
            return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, t
        }
    }, t.prototype.clear = function () {
        this.head = this.tail = null, this.length = 0
    }, t.prototype.join = function (t) {
        if (0 === this.length) return "";
        for (var e = this.head, i = "" + e.data; e = e.next;) i += t + e.data;
        return i
    }, t.prototype.concat = function (t) {
        if (0 === this.length) return n.alloc(0);
        if (1 === this.length) return this.head.data;
        for (var e = n.allocUnsafe(t >>> 0), i = this.head, a = 0; i;) o(i.data, e, a), a += i.data.length, i = i.next;
        return e
    }, t
}(), s && s.inspect && s.inspect.custom && (e.exports.prototype[s.inspect.custom] = function () {
    var t = s.inspect({
        length: this.length
    });
    return this.constructor.name + " " + t
})
