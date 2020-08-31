
            var indexOf = require("indexof"),
                Object_keys = function (t) {
                    if (Object.keys) return Object.keys(t);
                    var e = [];
                    for (var i in t) e.push(i);
                    return e
                },
                forEach = function (t, e) {
                    if (t.forEach) return t.forEach(e);
                    for (var i = 0; i < t.length; i++) e(t[i], i, t)
                },
                defineProp = function () {
                    try {
                        return Object.defineProperty({}, "_", {}),
                            function (t, e, i) {
                                Object.defineProperty(t, e, {
                                    writable: !0,
                                    enumerable: !1,
                                    configurable: !0,
                                    value: i
                                })
                            }
                    } catch (t) {
                        return function (t, e, i) {
                            t[e] = i
                        }
                    }
                }(),
                globals = ["Array", "Boolean", "Date", "Error", "EvalError", "Function", "Infinity", "JSON", "Math", "NaN", "Number", "Object", "RangeError", "ReferenceError", "RegExp", "String", "SyntaxError", "TypeError", "URIError", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "undefined", "unescape"];

            function Context() { }
            Context.prototype = {};
            var Script = exports.Script = function (t) {
                if (!(this instanceof Script)) return new Script(t);
                this.code = t
            };
            Script.prototype.runInContext = function (t) {
                if (!(t instanceof Context)) throw new TypeError("needs a 'context' argument.");
                var e = document.createElement("iframe");
                e.style || (e.style = {}), e.style.display = "none", document.body.appendChild(e);
                var i = e.contentWindow,
                    a = i.eval,
                    n = i.execScript;
                !a && n && (n.call(i, "null"), a = i.eval), forEach(Object_keys(t), function (e) {
                    i[e] = t[e]
                }), forEach(globals, function (e) {
                    t[e] && (i[e] = t[e])
                });
                var s = Object_keys(i),
                    o = a.call(i, this.code);
                return forEach(Object_keys(i), function (e) {
                    (e in t || -1 === indexOf(s, e)) && (t[e] = i[e])
                }), forEach(globals, function (e) {
                    e in t || defineProp(t, e, i[e])
                }), document.body.removeChild(e), o
            }, Script.prototype.runInThisContext = function () {
                return eval(this.code)
            }, Script.prototype.runInNewContext = function (t) {
                var e = Script.createContext(t),
                    i = this.runInContext(e);
                return forEach(Object_keys(e), function (i) {
                    t[i] = e[i]
                }), i
            }, forEach(Object_keys(Script.prototype), function (t) {
                exports[t] = Script[t] = function (e) {
                    var i = Script(e);
                    return i[t].apply(i, [].slice.call(arguments, 1))
                }
            }), exports.createScript = function (t) {
                return exports.Script(t)
            }, exports.createContext = Script.createContext = function (t) {
                var e = new Context;
                return "object" == typeof t && forEach(Object_keys(t), function (i) {
                    e[i] = t[i]
                }), e
            }
        