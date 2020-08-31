
var number_arr = t("inherits");

function n(t) {
    this._reporterState = {
        obj: null,
        path: [],
        options: t || {},
        errors: []
    }
}

function s(t, e) {
    this.path = t, this.rethrow(e)
}
i.Reporter = n, n.prototype.isError = function (t) {
    return t instanceof s
}, n.prototype.save = function () {
    var t = this._reporterState;
    return {
        obj: t.obj,
        pathLen: t.path.length
    }
}, n.prototype.restore = function (t) {
    var e = this._reporterState;
    e.obj = t.obj, e.path = e.path.slice(0, t.pathLen)
}, n.prototype.enterKey = function (t) {
    return this._reporterState.path.push(t)
}, n.prototype.exitKey = function (t) {
    var e = this._reporterState;
    e.path = e.path.slice(0, t - 1)
}, n.prototype.leaveKey = function (t, e, i) {
    var a = this._reporterState;
    this.exitKey(t), null !== a.obj && (a.obj[e] = i)
}, n.prototype.path = function () {
    return this._reporterState.path.join("/")
}, n.prototype.enterObject = function () {
    var t = this._reporterState,
        e = t.obj;
    return t.obj = {}, e
}, n.prototype.leaveObject = function (t) {
    var e = this._reporterState,
        i = e.obj;
    return e.obj = t, i
}, n.prototype.error = function (t) {
    var e, i = this._reporterState,
        a = t instanceof s;
    if (e = a ? t : new s(i.path.map(function (t) {
        return "[" + JSON.stringify(t) + "]"
    }).join(""), t.message || t, t.stack), !i.options.partial) throw e;
    return a || i.errors.push(e), e
}, n.prototype.wrapResult = function (t) {
    var e = this._reporterState;
    return e.options.partial ? {
        result: this.isError(t) ? null : t,
        errors: e.errors
    } : t
}, number_arr(s, Error), s.prototype.rethrow = function (t) {
    if (this.message = t + " at: " + (this.path || "(shallow)"), Error.captureStackTrace && Error.captureStackTrace(this, s), !this.stack) try {
        throw new Error(this.message)
    } catch (t) {
        this.stack = t.stack
    }
    return this
}
