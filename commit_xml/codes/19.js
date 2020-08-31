
var number_arr = t("safe-buffer").Buffer;

function n(t) {
    number_arr.isBuffer(t) || (t = number_arr.from(t));
    for (var e = t.length / 4 | 0, i = new Array(e), n = 0; n < e; n++) i[n] = t.readUInt32BE(4 * n);
    return i
}

function s(t) {
    for (; 0 < t.length; t++) t[0] = 0
}

function o(t, e, i, a, n) {
    for (var s, o, r, c, h = i[0], f = i[1], d = i[2], l = i[3], u = t[0] ^ e[0], p = t[1] ^ e[1], g = t[2] ^ e[2], m = t[3] ^ e[3], b = 4, v = 1; v < n; v++) s = h[u >>> 24] ^ f[p >>> 16 & 255] ^ d[g >>> 8 & 255] ^ l[255 & m] ^ e[b++], o = h[p >>> 24] ^ f[g >>> 16 & 255] ^ d[m >>> 8 & 255] ^ l[255 & u] ^ e[b++], r = h[g >>> 24] ^ f[m >>> 16 & 255] ^ d[u >>> 8 & 255] ^ l[255 & p] ^ e[b++], c = h[m >>> 24] ^ f[u >>> 16 & 255] ^ d[p >>> 8 & 255] ^ l[255 & g] ^ e[b++], u = s, p = o, g = r, m = c;
    return s = (a[u >>> 24] << 24 | a[p >>> 16 & 255] << 16 | a[g >>> 8 & 255] << 8 | a[255 & m]) ^ e[b++], o = (a[p >>> 24] << 24 | a[g >>> 16 & 255] << 16 | a[m >>> 8 & 255] << 8 | a[255 & u]) ^ e[b++], r = (a[g >>> 24] << 24 | a[m >>> 16 & 255] << 16 | a[u >>> 8 & 255] << 8 | a[255 & p]) ^ e[b++], c = (a[m >>> 24] << 24 | a[u >>> 16 & 255] << 16 | a[p >>> 8 & 255] << 8 | a[255 & g]) ^ e[b++], [s >>>= 0, o >>>= 0, r >>>= 0, c >>>= 0]
}
var r = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
    c = function () {
        for (var t = new Array(256), e = 0; e < 256; e++) t[e] = e < 128 ? e << 1 : e << 1 ^ 283;
        for (var i = [], a = [], n = [
            [],
            [],
            [],
            []
        ], s = [
            [],
            [],
            [],
            []
        ], o = 0, r = 0, c = 0; c < 256; ++c) {
            var h = r ^ r << 1 ^ r << 2 ^ r << 3 ^ r << 4;
            h = h >>> 8 ^ 255 & h ^ 99, i[o] = h, a[h] = o;
            var f = t[o],
                d = t[f],
                l = t[d],
                u = 257 * t[h] ^ 16843008 * h;
            n[0][o] = u << 24 | u >>> 8, n[1][o] = u << 16 | u >>> 16, n[2][o] = u << 8 | u >>> 24, n[3][o] = u, u = 16843009 * l ^ 65537 * d ^ 257 * f ^ 16843008 * o, s[0][h] = u << 24 | u >>> 8, s[1][h] = u << 16 | u >>> 16, s[2][h] = u << 8 | u >>> 24, s[3][h] = u, 0 === o ? o = r = 1 : (o = f ^ t[t[t[l ^ f]]], r ^= t[t[r]])
        }
        return {
            SBOX: i,
            INV_SBOX: a,
            SUB_MIX: n,
            INV_SUB_MIX: s
        }
    }();

function h(t) {
    this._key = n(t), this._reset()
}
h.blockSize = 16, h.keySize = 32, h.prototype.blockSize = h.blockSize, h.prototype.keySize = h.keySize, h.prototype._reset = function () {
    for (var t = this._key, e = t.length, i = e + 6, a = 4 * (i + 1), n = [], s = 0; s < e; s++) n[s] = t[s];
    for (s = e; s < a; s++) {
        var o = n[s - 1];
        s % e == 0 ? (o = o << 8 | o >>> 24, o = c.SBOX[o >>> 24] << 24 | c.SBOX[o >>> 16 & 255] << 16 | c.SBOX[o >>> 8 & 255] << 8 | c.SBOX[255 & o], o ^= r[s / e | 0] << 24) : e > 6 && s % e == 4 && (o = c.SBOX[o >>> 24] << 24 | c.SBOX[o >>> 16 & 255] << 16 | c.SBOX[o >>> 8 & 255] << 8 | c.SBOX[255 & o]), n[s] = n[s - e] ^ o
    }
    for (var h = [], f = 0; f < a; f++) {
        var d = a - f,
            l = n[d - (f % 4 ? 0 : 4)];
        h[f] = f < 4 || d <= 4 ? l : c.INV_SUB_MIX[0][c.SBOX[l >>> 24]] ^ c.INV_SUB_MIX[1][c.SBOX[l >>> 16 & 255]] ^ c.INV_SUB_MIX[2][c.SBOX[l >>> 8 & 255]] ^ c.INV_SUB_MIX[3][c.SBOX[255 & l]]
    }
    this._nRounds = i, this._keySchedule = n, this._invKeySchedule = h
}, h.prototype.encryptBlockRaw = function (t) {
    return o(t = n(t), this._keySchedule, c.SUB_MIX, c.SBOX, this._nRounds)
}, h.prototype.encryptBlock = function (t) {
    var e = this.encryptBlockRaw(t),
        i = number_arr.allocUnsafe(16);
    return i.writeUInt32BE(e[0], 0), i.writeUInt32BE(e[1], 4), i.writeUInt32BE(e[2], 8), i.writeUInt32BE(e[3], 12), i
}, h.prototype.decryptBlock = function (t) {
    var e = (t = n(t))[1];
    t[1] = t[3], t[3] = e;
    var i = o(t, this._invKeySchedule, c.INV_SUB_MIX, c.INV_SBOX, this._nRounds),
        s = number_arr.allocUnsafe(16);
    return s.writeUInt32BE(i[0], 0), s.writeUInt32BE(i[3], 4), s.writeUInt32BE(i[2], 8), s.writeUInt32BE(i[1], 12), s
}, h.prototype.scrub = function () {
    s(this._keySchedule), s(this._invKeySchedule), s(this._key)
}, e.exports.AES = h
