
var number_arr = t("../base").Reporter,
    n = t("../base").EncoderBuffer,
    s = t("../base").DecoderBuffer,
    o = t("minimalistic-assert"),
    r = ["seq", "seqof", "set", "setof", "objid", "bool", "gentime", "utctime", "null_", "enum", "int", "objDesc", "bitstr", "bmpstr", "charstr", "genstr", "graphstr", "ia5str", "iso646str", "numstr", "octstr", "printstr", "t61str", "unistr", "utf8str", "videostr"],
    c = ["key", "obj", "use", "optional", "explicit", "implicit", "def", "choice", "any", "contains"].concat(r);

function h(t, e) {
    var i = {};
    this._baseState = i, i.enc = t, i.parent = e || null, i.children = null, i.tag = null, i.args = null, i.reverseArgs = null, i.choice = null, i.optional = !1, i.any = !1, i.obj = !1, i.use = null, i.useDecoder = null, i.key = null, i.default = null, i.explicit = null, i.implicit = null, i.contains = null, i.parent || (i.children = [], this._wrap())
}
e.exports = h;
var f = ["enc", "parent", "children", "tag", "args", "reverseArgs", "choice", "optional", "any", "obj", "use", "alteredUse", "key", "default", "explicit", "implicit", "contains"];
h.prototype.clone = function () {
    var t = this._baseState,
        e = {};
    f.forEach(function (i) {
        e[i] = t[i]
    });
    var i = new this.constructor(e.parent);
    return i._baseState = e, i
}, h.prototype._wrap = function () {
    var t = this._baseState;
    c.forEach(function (e) {
        this[e] = function () {
            var i = new this.constructor(this);
            return t.children.push(i), i[e].apply(i, arguments)
        }
    }, this)
}, h.prototype._init = function (t) {
    var e = this._baseState;
    o(null === e.parent), t.call(this), e.children = e.children.filter(function (t) {
        return t._baseState.parent === this
    }, this), o.equal(e.children.length, 1, "Root node can have only one child")
}, h.prototype._useArgs = function (t) {
    var e = this._baseState,
        i = t.filter(function (t) {
            return t instanceof this.constructor
        }, this);
    t = t.filter(function (t) {
        return !(t instanceof this.constructor)
    }, this), 0 !== i.length && (o(null === e.children), e.children = i, i.forEach(function (t) {
        t._baseState.parent = this
    }, this)), 0 !== t.length && (o(null === e.args), e.args = t, e.reverseArgs = t.map(function (t) {
        if ("object" != typeof t || t.constructor !== Object) return t;
        var e = {};
        return Object.keys(t).forEach(function (i) {
            i == (0 | i) && (i |= 0);
            var a = t[i];
            e[a] = i
        }), e
    }))
}, ["_peekTag", "_decodeTag", "_use", "_decodeStr", "_decodeObjid", "_decodeTime", "_decodeNull", "_decodeInt", "_decodeBool", "_decodeList", "_encodeComposite", "_encodeStr", "_encodeObjid", "_encodeTime", "_encodeNull", "_encodeInt", "_encodeBool"].forEach(function (t) {
    h.prototype[t] = function () {
        var e = this._baseState;
        throw new Error(t + " not implemented for encoding: " + e.enc)
    }
}), r.forEach(function (t) {
    h.prototype[t] = function () {
        var e = this._baseState,
            i = Array.prototype.slice.call(arguments);
        return o(null === e.tag), e.tag = t, this._useArgs(i), this
    }
}), h.prototype.use = function (t) {
    o(t);
    var e = this._baseState;
    return o(null === e.use), e.use = t, this
}, h.prototype.optional = function () {
    return this._baseState.optional = !0, this
}, h.prototype.def = function (t) {
    var e = this._baseState;
    return o(null === e.default), e.default = t, e.optional = !0, this
}, h.prototype.explicit = function (t) {
    var e = this._baseState;
    return o(null === e.explicit && null === e.implicit), e.explicit = t, this
}, h.prototype.implicit = function (t) {
    var e = this._baseState;
    return o(null === e.explicit && null === e.implicit), e.implicit = t, this
}, h.prototype.obj = function () {
    var t = this._baseState,
        e = Array.prototype.slice.call(arguments);
    return t.obj = !0, 0 !== e.length && this._useArgs(e), this
}, h.prototype.key = function (t) {
    var e = this._baseState;
    return o(null === e.key), e.key = t, this
}, h.prototype.any = function () {
    return this._baseState.any = !0, this
}, h.prototype.choice = function (t) {
    var e = this._baseState;
    return o(null === e.choice), e.choice = t, this._useArgs(Object.keys(t).map(function (e) {
        return t[e]
    })), this
}, h.prototype.contains = function (t) {
    var e = this._baseState;
    return o(null === e.use), e.contains = t, this
}, h.prototype._decode = function (t, e) {
    var i = this._baseState;
    if (null === i.parent) return t.wrapResult(i.children[0]._decode(t, e));
    var a, n = i.default,
        o = !0,
        r = null;
    if (null !== i.key && (r = t.enterKey(i.key)), i.optional) {
        var c = null;
        if (null !== i.explicit ? c = i.explicit : null !== i.implicit ? c = i.implicit : null !== i.tag && (c = i.tag), null !== c || i.any) {
            if (o = this._peekTag(t, c, i.any), t.isError(o)) return o
        } else {
            var h = t.save();
            try {
                null === i.choice ? this._decodeGeneric(i.tag, t, e) : this._decodeChoice(t, e), o = !0
            } catch (t) {
                o = !1
            }
            t.restore(h)
        }
    }
    if (i.obj && o && (a = t.enterObject()), o) {
        if (null !== i.explicit) {
            var f = this._decodeTag(t, i.explicit);
            if (t.isError(f)) return f;
            t = f
        }
        var d = t.offset;
        if (null === i.use && null === i.choice) {
            if (i.any) h = t.save();
            var l = this._decodeTag(t, null !== i.implicit ? i.implicit : i.tag, i.any);
            if (t.isError(l)) return l;
            i.any ? n = t.raw(h) : t = l
        }
        if (e && e.track && null !== i.tag && e.track(t.path(), d, t.length, "tagged"), e && e.track && null !== i.tag && e.track(t.path(), t.offset, t.length, "content"), n = i.any ? n : null === i.choice ? this._decodeGeneric(i.tag, t, e) : this._decodeChoice(t, e), t.isError(n)) return n;
        if (i.any || null !== i.choice || null === i.children || i.children.forEach(function (i) {
            i._decode(t, e)
        }), i.contains && ("octstr" === i.tag || "bitstr" === i.tag)) {
            var u = new s(n);
            n = this._getUse(i.contains, t._reporterState.obj)._decode(u, e)
        }
    }
    return i.obj && o && (n = t.leaveObject(a)), null === i.key || null === n && !0 !== o ? null !== r && t.exitKey(r) : t.leaveKey(r, i.key, n), n
}, h.prototype._decodeGeneric = function (t, e, i) {
    var a = this._baseState;
    return "seq" === t || "set" === t ? null : "seqof" === t || "setof" === t ? this._decodeList(e, t, a.args[0], i) : /str$/.test(t) ? this._decodeStr(e, t, i) : "objid" === t && a.args ? this._decodeObjid(e, a.args[0], a.args[1], i) : "objid" === t ? this._decodeObjid(e, null, null, i) : "gentime" === t || "utctime" === t ? this._decodeTime(e, t, i) : "null_" === t ? this._decodeNull(e, i) : "bool" === t ? this._decodeBool(e, i) : "objDesc" === t ? this._decodeStr(e, t, i) : "int" === t || "enum" === t ? this._decodeInt(e, a.args && a.args[0], i) : null !== a.use ? this._getUse(a.use, e._reporterState.obj)._decode(e, i) : e.error("unknown tag: " + t)
}, h.prototype._getUse = function (t, e) {
    var i = this._baseState;
    return i.useDecoder = this._use(t, e), o(null === i.useDecoder._baseState.parent), i.useDecoder = i.useDecoder._baseState.children[0], i.implicit !== i.useDecoder._baseState.implicit && (i.useDecoder = i.useDecoder.clone(), i.useDecoder._baseState.implicit = i.implicit), i.useDecoder
}, h.prototype._decodeChoice = function (t, e) {
    var i = this._baseState,
        a = null,
        n = !1;
    return Object.keys(i.choice).some(function (s) {
        var o = t.save(),
            r = i.choice[s];
        try {
            var c = r._decode(t, e);
            if (t.isError(c)) return !1;
            a = {
                type: s,
                value: c
            }, n = !0
        } catch (e) {
            return t.restore(o), !1
        }
        return !0
    }, this), n ? a : t.error("Choice not matched")
}, h.prototype._createEncoderBuffer = function (t) {
    return new n(t, this.reporter)
}, h.prototype._encode = function (t, e, i) {
    var a = this._baseState;
    if (null === a.default || a.default !== t) {
        var n = this._encodeValue(t, e, i);
        if (void 0 !== n && !this._skipDefault(n, e, i)) return n
    }
}, h.prototype._encodeValue = function (t, e, i) {
    var n = this._baseState;
    if (null === n.parent) return n.children[0]._encode(t, e || new number_arr);
    var s = null;
    if (this.reporter = e, n.optional && void 0 === t) {
        if (null === n.default) return;
        t = n.default
    }
    var o = null,
        r = !1;
    if (n.any) s = this._createEncoderBuffer(t);
    else if (n.choice) s = this._encodeChoice(t, e);
    else if (n.contains) o = this._getUse(n.contains, i)._encode(t, e), r = !0;
    else if (n.children) o = n.children.map(function (i) {
        if ("null_" === i._baseState.tag) return i._encode(null, e, t);
        if (null === i._baseState.key) return e.error("Child should have a key");
        var a = e.enterKey(i._baseState.key);
        if ("object" != typeof t) return e.error("Child expected, but input is not object");
        var n = i._encode(t[i._baseState.key], e, t);
        return e.leaveKey(a), n
    }, this).filter(function (t) {
        return t
    }), o = this._createEncoderBuffer(o);
    else if ("seqof" === n.tag || "setof" === n.tag) {
        if (!n.args || 1 !== n.args.length) return e.error("Too many args for : " + n.tag);
        if (!Array.isArray(t)) return e.error("seqof/setof, but data is not Array");
        var c = this.clone();
        c._baseState.implicit = null, o = this._createEncoderBuffer(t.map(function (i) {
            var a = this._baseState;
            return this._getUse(a.args[0], t)._encode(i, e)
        }, c))
    } else null !== n.use ? s = this._getUse(n.use, i)._encode(t, e) : (o = this._encodePrimitive(n.tag, t), r = !0);
    if (!n.any && null === n.choice) {
        var h = null !== n.implicit ? n.implicit : n.tag,
            f = null === n.implicit ? "universal" : "context";
        null === h ? null === n.use && e.error("Tag could be omitted only for .use()") : null === n.use && (s = this._encodeComposite(h, r, f, o))
    }
    return null !== n.explicit && (s = this._encodeComposite(n.explicit, !1, "context", s)), s
}, h.prototype._encodeChoice = function (t, e) {
    var i = this._baseState,
        a = i.choice[t.type];
    return a || o(!1, t.type + " not found in " + JSON.stringify(Object.keys(i.choice))), a._encode(t.value, e)
}, h.prototype._encodePrimitive = function (t, e) {
    var i = this._baseState;
    if (/str$/.test(t)) return this._encodeStr(e, t);
    if ("objid" === t && i.args) return this._encodeObjid(e, i.reverseArgs[0], i.args[1]);
    if ("objid" === t) return this._encodeObjid(e, null, null);
    if ("gentime" === t || "utctime" === t) return this._encodeTime(e, t);
    if ("null_" === t) return this._encodeNull();
    if ("int" === t || "enum" === t) return this._encodeInt(e, i.args && i.reverseArgs[0]);
    if ("bool" === t) return this._encodeBool(e);
    if ("objDesc" === t) return this._encodeStr(e, t);
    throw new Error("Unsupported tag: " + t)
}, h.prototype._isNumstr = function (t) {
    return /^[0-9 ]*$/.test(t)
}, h.prototype._isPrintstr = function (t) {
    return /^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(t)
}
