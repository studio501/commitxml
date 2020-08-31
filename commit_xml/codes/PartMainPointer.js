
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {},
                init: function () {
                    this._nextGuideNpc = null, this._hide = ftc.ManagerData.get1("ManagerTask").hideGuide
                },
                load: function () { },
                setData: function (t) { },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t) { },
                getPointerNpcId: function (t, e, i) {
                    var a = ftc.ManagerData.get1("ManagerTask").cur;
                    if (a && t) {
                        var n = ftc.ManagerData.get2Object("Task")[a];
                        if (n && 0 == n.ste) {
                            var s = n.eventId,
                                o = ft.ExtEvent.getNpc(s, n);
                            if (o && o > 0) {
                                if (ft.ExtNpc.npc2Map[o][t.id]) return o;
                                var r = ftd.Event.get(s, "excludemap", !0),
                                    c = ftd.Event.get(s, "excludenpc", !0),
                                    h = {};
                                if (r)
                                    for (var f in r) h[r[f]] || (h[r[f]] = {}), h[r[f]][c[f]] = !0;
                                var d = [];
                                for (var f in ft.ExtNpc.map2Map)
                                    for (var l in ft.ExtNpc.map2Map[f])
                                        for (var u = ft.ExtNpc.map2Map[f][l], p = 0; p < u.length; p++) {
                                            var g, m = u[p],
                                                b = e[m];
                                            if (g = b ? b.v : void 0 !== i[m] ? i[m] : ftd.Npc.get(m, "c_show", !0) ? 1 : 0, (!h[f] || !h[f][m]) && ft.ExtNpc.isCanShow(m, b, g)) {
                                                d.push([f, l, m]);
                                                break
                                            }
                                        }
                                for (var v = [
                                    [
                                        [t.id]
                                    ]
                                ], y = 0; v[y].length > 0;) {
                                    v[y + 1] = [];
                                    for (f = 0; f < v[y].length; f++) {
                                        var _ = v[y][f][0];
                                        for (l = d.length - 1; l >= 0; l--)
                                            if (_ == d[l][0]) {
                                                if (v[y + 1].push([d[l][1], f, d[l][2]]), ft.ExtNpc.npc2Map[o][d[l][1]]) {
                                                    var x = v[y + 1].length - 1;
                                                    for (p = y + 1; p > 1; p--) x = v[p][x][1];
                                                    return v[1][x][2]
                                                }
                                                d.splice(l, 1)
                                            }
                                    }
                                    y++
                                }
                            }
                        }
                    }
                },
                bindMapRole: function (t) {
                    this._mapRole = t
                },
                setNextGuideNpc: function (t) {
                    this._nextGuideNpc = t, this.updatePointer()
                },
                updatePointer: function () {
                    this._nextGuideNpc && this._nextGuideNpc.node && !ftc.ManagerData.get2Object("Item", ft.value.disable.guide) ? this._nextGuideNpc.node.x === this._mapRole.getRolePosition().x && this._nextGuideNpc.node.y === this._mapRole.getRolePosition().y ? this.node.active = !1 : (this.node.active = !0, this.node.angle = -ftc.getPoint2PointAngle(this._nextGuideNpc.node.x, this._nextGuideNpc.node.y, this._mapRole.getRolePosition().x, this._mapRole.getRolePosition().y)) : this.node.active = !1
                },
                tickPointer: function (t) {
                    this.node.ftMoveTick && this.node.ftMoveTick(t), this.updatePointer()
                },
                show: function () {
                    this._hide = !1
                },
                hide: function () {
                    this._hide = !0
                }
            })
        