
            i.read = function (t, e, i, a, n) {
                var s, o, r = 8 * n - a - 1,
                    c = (1 << r) - 1,
                    h = c >> 1,
                    f = -7,
                    d = i ? n - 1 : 0,
                    l = i ? -1 : 1,
                    u = t[e + d];
                for (d += l, s = u & (1 << -f) - 1, u >>= -f, f += r; f > 0; s = 256 * s + t[e + d], d += l, f -= 8);
                for (o = s & (1 << -f) - 1, s >>= -f, f += a; f > 0; o = 256 * o + t[e + d], d += l, f -= 8);
                if (0 === s) s = 1 - h;
                else {
                    if (s === c) return o ? NaN : 1 / 0 * (u ? -1 : 1);
                    o += Math.pow(2, a), s -= h
                }
                return (u ? -1 : 1) * o * Math.pow(2, s - a)
            }, i.write = function (t, e, i, a, n, s) {
                var o, r, c, h = 8 * s - n - 1,
                    f = (1 << h) - 1,
                    d = f >> 1,
                    l = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    u = a ? 0 : s - 1,
                    p = a ? 1 : -1,
                    g = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (r = isNaN(e) ? 1 : 0, o = f) : (o = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -o)) < 1 && (o--, c *= 2), (e += o + d >= 1 ? l / c : l * Math.pow(2, 1 - d)) * c >= 2 && (o++, c /= 2), o + d >= f ? (r = 0, o = f) : o + d >= 1 ? (r = (e * c - 1) * Math.pow(2, n), o += d) : (r = e * Math.pow(2, d - 1) * Math.pow(2, n), o = 0)); n >= 8; t[i + u] = 255 & r, u += p, r /= 256, n -= 8);
                for (o = o << n | r, h += n; h > 0; t[i + u] = 255 & o, u += p, o /= 256, h -= 8);
                t[i + u - p] |= 128 * g
            }
        