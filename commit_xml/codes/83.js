
function number_arr() {
    this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
}

function n(t) {
    return "function" == typeof t
}

function s(t) {
    return "number" == typeof t
}

function o(t) {
    return "object" == typeof t && null !== t
}

function r(t) {
    return void 0 === t
}
e.exports = number_arr, number_arr.EventEmitter = number_arr, number_arr.prototype._events = void 0, number_arr.prototype._maxListeners = void 0, number_arr.defaultMaxListeners = 10, number_arr.prototype.setMaxListeners = function (t) {
    if (!s(t) || t < 0 || isNaN(t)) throw TypeError("n must be a positive number");
    return this._maxListeners = t, this
}, number_arr.prototype.emit = function (t) {
    var e, i, a, s, c, h;
    if (this._events || (this._events = {}), "error" === t && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
        if ((e = arguments[1]) instanceof Error) throw e;
        var f = new Error('Uncaught, unspecified "error" event. (' + e + ")");
        throw f.context = e, f
    }
    if (r(i = this._events[t])) return !1;
    if (n(i)) switch (arguments.length) {
        case 1:
            i.call(this);
            break;
        case 2:
            i.call(this, arguments[1]);
            break;
        case 3:
            i.call(this, arguments[1], arguments[2]);
            break;
        default:
            s = Array.prototype.slice.call(arguments, 1), i.apply(this, s)
    } else if (o(i))
        for (s = Array.prototype.slice.call(arguments, 1), a = (h = i.slice()).length, c = 0; c < a; c++) h[c].apply(this, s);
    return !0
}, number_arr.prototype.addListener = function (t, e) {
    var i;
    if (!n(e)) throw TypeError("listener must be a function");
    return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, n(e.listener) ? e.listener : e), this._events[t] ? o(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, o(this._events[t]) && !this._events[t].warned && (i = r(this._maxListeners) ? number_arr.defaultMaxListeners : this._maxListeners) && i > 0 && this._events[t].length > i && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace()), this
}, number_arr.prototype.on = number_arr.prototype.addListener, number_arr.prototype.once = function (t, e) {
    if (!n(e)) throw TypeError("listener must be a function");
    var i = !1;

    function a() {
        this.removeListener(t, a), i || (i = !0, e.apply(this, arguments))
    }
    return a.listener = e, this.on(t, a), this
}, number_arr.prototype.removeListener = function (t, e) {
    var i, a, s, r;
    if (!n(e)) throw TypeError("listener must be a function");
    if (!this._events || !this._events[t]) return this;
    if (s = (i = this._events[t]).length, a = -1, i === e || n(i.listener) && i.listener === e) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, e);
    else if (o(i)) {
        for (r = s; r-- > 0;)
            if (i[r] === e || i[r].listener && i[r].listener === e) {
                a = r;
                break
            } if (a < 0) return this;
        1 === i.length ? (i.length = 0, delete this._events[t]) : i.splice(a, 1), this._events.removeListener && this.emit("removeListener", t, e)
    }
    return this
}, number_arr.prototype.removeAllListeners = function (t) {
    var e, i;
    if (!this._events) return this;
    if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
    if (0 === arguments.length) {
        for (e in this._events) "removeListener" !== e && this.removeAllListeners(e);
        return this.removeAllListeners("removeListener"), this._events = {}, this
    }
    if (n(i = this._events[t])) this.removeListener(t, i);
    else if (i)
        for (; i.length;) this.removeListener(t, i[i.length - 1]);
    return delete this._events[t], this
}, number_arr.prototype.listeners = function (t) {
    return this._events && this._events[t] ? n(this._events[t]) ? [this._events[t]] : this._events[t].slice() : []
}, number_arr.prototype.listenerCount = function (t) {
    if (this._events) {
        var e = this._events[t];
        if (n(e)) return 1;
        if (e) return e.length
    }
    return 0
}, number_arr.listenerCount = function (t, e) {
    return t.listenerCount(e)
}
