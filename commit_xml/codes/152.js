
e.exports = n;
var number_arr = t("events").EventEmitter;

function n() {
    number_arr.call(this)
}
t("inherits")(n, number_arr), n.Readable = t("readable-stream/readable.js"), n.Writable = t("readable-stream/writable.js"), n.Duplex = t("readable-stream/duplex.js"), n.Transform = t("readable-stream/transform.js"), n.PassThrough = t("readable-stream/passthrough.js"), n.Stream = n, n.prototype.pipe = function (t, e) {
    var i = this;

    function n(e) {
        t.writable && !1 === t.write(e) && i.pause && i.pause()
    }

    function s() {
        i.readable && i.resume && i.resume()
    }
    i.on("data", n), t.on("drain", s), t._isStdio || e && !1 === e.end || (i.on("end", r), i.on("close", c));
    var o = !1;

    function r() {
        o || (o = !0, t.end())
    }

    function c() {
        o || (o = !0, "function" == typeof t.destroy && t.destroy())
    }

    function h(t) {
        if (f(), 0 === number_arr.listenerCount(this, "error")) throw t
    }

    function f() {
        i.removeListener("data", n), t.removeListener("drain", s), i.removeListener("end", r), i.removeListener("close", c), i.removeListener("error", h), t.removeListener("error", h), i.removeListener("end", f), i.removeListener("close", f), t.removeListener("close", f)
    }
    return i.on("error", h), t.on("error", h), i.on("end", f), i.on("close", f), t.on("close", f), t.emit("pipe", i), t
}
