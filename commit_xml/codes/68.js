

var number_arr = t("bn.js"),
    n = t("../utils"),
    s = n.getNAF,
    o = n.getJSF,
    r = n.assert;

function c(t, e) {
    this.type = t, this.p = new number_arr(e.p, 16), this.red = e.prime ? number_arr.red(e.prime) : number_arr.mont(this.p), this.zero = new number_arr(0).toRed(this.red), this.one = new number_arr(1).toRed(this.red), this.two = new number_arr(2).toRed(this.red), this.n = e.n && new number_arr(e.n, 16), this.g = e.g && this.pointFromJSON(e.g, e.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
    var i = this.n && this.p.div(this.n);
    !i || i.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red))
}

function h(t, e) {
    this.curve = t, this.type = e, this.precomputed = null
}
e.exports = c, c.prototype.point = function () {
    throw new Error("Not implemented")
}, c.prototype.validate = function () {
    throw new Error("Not implemented")
}, c.prototype._fixedNafMul = function (t, e) {
    r(t.precomputed);
    var i = t._getDoubles(),
        a = s(e, 1, this._bitLength),
        n = (1 << i.step + 1) - (i.step % 2 == 0 ? 2 : 1);
    n /= 3;
    for (var o = [], c = 0; c < a.length; c += i.step) {
        var h = 0;
        for (e = c + i.step - 1; e >= c; e--) h = (h << 1) + a[e];
        o.push(h)
    }
    for (var f = this.jpoint(null, null, null), d = this.jpoint(null, null, null), l = n; l > 0; l--) {
        for (c = 0; c < o.length; c++) {
            (h = o[c]) === l ? d = d.mixedAdd(i.points[c]) : h === -l && (d = d.mixedAdd(i.points[c].neg()))
        }
        f = f.add(d)
    }
    return f.toP()
}, c.prototype._wnafMul = function (t, e) {
    var i = 4,
        a = t._getNAFPoints(i);
    i = a.wnd;
    for (var n = a.points, o = s(e, i, this._bitLength), c = this.jpoint(null, null, null), h = o.length - 1; h >= 0; h--) {
        for (e = 0; h >= 0 && 0 === o[h]; h--) e++;
        if (h >= 0 && e++, c = c.dblp(e), h < 0) break;
        var f = o[h];
        r(0 !== f), c = "affine" === t.type ? f > 0 ? c.mixedAdd(n[f - 1 >> 1]) : c.mixedAdd(n[-f - 1 >> 1].neg()) : f > 0 ? c.add(n[f - 1 >> 1]) : c.add(n[-f - 1 >> 1].neg())
    }
    return "affine" === t.type ? c.toP() : c
}, c.prototype._wnafMulAdd = function (t, e, i, a, n) {
    for (var r = this._wnafT1, c = this._wnafT2, h = this._wnafT3, f = 0, d = 0; d < a; d++) {
        var l = (I = e[d])._getNAFPoints(t);
        r[d] = l.wnd, c[d] = l.points
    }
    for (d = a - 1; d >= 1; d -= 2) {
        var u = d - 1,
            p = d;
        if (1 === r[u] && 1 === r[p]) {
            var g = [e[u], null, null, e[p]];
            0 === e[u].y.cmp(e[p].y) ? (g[1] = e[u].add(e[p]), g[2] = e[u].toJ().mixedAdd(e[p].neg())) : 0 === e[u].y.cmp(e[p].y.redNeg()) ? (g[1] = e[u].toJ().mixedAdd(e[p]), g[2] = e[u].add(e[p].neg())) : (g[1] = e[u].toJ().mixedAdd(e[p]), g[2] = e[u].toJ().mixedAdd(e[p].neg()));
            var m = [-3, -1, -5, -7, 0, 7, 5, 1, 3],
                b = o(i[u], i[p]);
            f = Math.max(b[0].length, f), h[u] = new Array(f), h[p] = new Array(f);
            for (var v = 0; v < f; v++) {
                var y = 0 | b[0][v],
                    _ = 0 | b[1][v];
                h[u][v] = m[3 * (y + 1) + (_ + 1)], h[p][v] = 0, c[u] = g
            }
        } else h[u] = s(i[u], r[u], this._bitLength), h[p] = s(i[p], r[p], this._bitLength), f = Math.max(h[u].length, f), f = Math.max(h[p].length, f)
    }
    var x = this.jpoint(null, null, null),
        w = this._wnafT4;
    for (d = f; d >= 0; d--) {
        for (var S = 0; d >= 0;) {
            var k = !0;
            for (v = 0; v < a; v++) w[v] = 0 | h[v][d], 0 !== w[v] && (k = !1);
            if (!k) break;
            S++, d--
        }
        if (d >= 0 && S++, x = x.dblp(S), d < 0) break;
        for (v = 0; v < a; v++) {
            var I, T = w[v];
            0 !== T && (T > 0 ? I = c[v][T - 1 >> 1] : T < 0 && (I = c[v][-T - 1 >> 1].neg()), x = "affine" === I.type ? x.mixedAdd(I) : x.add(I))
        }
    }
    for (d = 0; d < a; d++) c[d] = null;
    return n ? x : x.toP()
}, c.BasePoint = h, h.prototype.eq = function () {
    throw new Error("Not implemented")
}, h.prototype.validate = function () {
    return this.curve.validate(this)
}, c.prototype.decodePoint = function (t, e) {
    t = n.toArray(t, e);
    var i = this.p.byteLength();
    if ((4 === t[0] || 6 === t[0] || 7 === t[0]) && t.length - 1 == 2 * i) return 6 === t[0] ? r(t[t.length - 1] % 2 == 0) : 7 === t[0] && r(t[t.length - 1] % 2 == 1), this.point(t.slice(1, 1 + i), t.slice(1 + i, 1 + 2 * i));
    if ((2 === t[0] || 3 === t[0]) && t.length - 1 === i) return this.pointFromX(t.slice(1, 1 + i), 3 === t[0]);
    throw new Error("Unknown point format")
}, h.prototype.encodeCompressed = function (t) {
    return this.encode(t, !0)
}, h.prototype._encode = function (t) {
    var e = this.curve.p.byteLength(),
        i = this.getX().toArray("be", e);
    return t ? [this.getY().isEven() ? 2 : 3].concat(i) : [4].concat(i, this.getY().toArray("be", e))
}, h.prototype.encode = function (t, e) {
    return n.encode(this._encode(e), t)
}, h.prototype.precompute = function (t) {
    if (this.precomputed) return this;
    var e = {
        doubles: null,
        naf: null,
        beta: null
    };
    return e.naf = this._getNAFPoints(8), e.doubles = this._getDoubles(4, t), e.beta = this._getBeta(), this.precomputed = e, this
}, h.prototype._hasDoubles = function (t) {
    if (!this.precomputed) return !1;
    var e = this.precomputed.doubles;
    return !!e && e.points.length >= Math.ceil((t.bitLength() + 1) / e.step)
}, h.prototype._getDoubles = function (t, e) {
    if (this.precomputed && this.precomputed.doubles) return this.precomputed.doubles;
    for (var i = [this], a = this, n = 0; n < e; n += t) {
        for (var s = 0; s < t; s++) a = a.dbl();
        i.push(a)
    }
    return {
        step: t,
        points: i
    }
}, h.prototype._getNAFPoints = function (t) {
    if (this.precomputed && this.precomputed.naf) return this.precomputed.naf;
    for (var e = [this], i = (1 << t) - 1, a = 1 === i ? null : this.dbl(), n = 1; n < i; n++) e[n] = e[n - 1].add(a);
    return {
        wnd: t,
        points: e
    }
}, h.prototype._getBeta = function () {
    return null
}, h.prototype.dblp = function (t) {
    for (var e = this, i = 0; i < t; i++) e = e.dbl();
    return e
}
