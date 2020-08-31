
            
             ft.ExtBattle = {}, ftc, ft.ExtBattle.getAwardPreview = function (t, e) {
                var i = ftd.Battle.get(t, "a_award");
                return ft.ExtAward.getIdNumsPreview(i, e)
            }, ft.ExtBattle.getName = function (t) {
                return ftd.Battle.get(t, "name")
            }, ft.ExtBattle.getHeroIds = function (t) {
                return ftd.Battle.get(t, "a_hero")
            }, ft.ExtBattle.getAward = function (t) {
                return ftd.Battle.get(t, "a_award")
            }, ft.ExtBattle.getModel = function (t) {
                var e = ftd.Battle.get(t, "model");
                return e || 0
            }, ft.ExtBattle.getSpreadTargets = function (t, e, i, a) {
                for (var n, s, o = ftd.Pet.get(e, "a_position"), r = o[a], c = [
                    [7, 4, 1],
                    [8, 5, 2],
                    [9, 6, 3]
                ], h = 0; h < 3; h++)
                    for (var f = 0; f < 3; f++) {
                        c[h][f] == r && (n = h, s = f);
                        var d = !1;
                        for (var l in t)
                            if (t[l].type == i && o[t[l].pos] == c[h][f]) {
                                d = !0;
                                break
                            } d || (c[h][f] = 0)
                    }
                var u = [
                    [-1, 0],
                    [1, 0],
                    [0, -1],
                    [0, 1]
                ],
                    p = [
                        [n, s, 0]
                    ],
                    g = [];
                for (c[n][s] > 0 && g.push([c[n][s], 0]), c[n][s] = 0; p.length > 0;) {
                    n = p[0][0], s = p[0][1];
                    var m = p[0][2] + 1;
                    p.splice(0, 1);
                    for (h = 0; h < 4; h++) {
                        var b = c[n + u[h][0]] && c[n + u[h][0]][s + u[h][1]] || 0;
                        b > 0 && (p.push([n + u[h][0], s + u[h][1], m]), g.push([b, m]), c[n + u[h][0]][s + u[h][1]] = 0)
                    }
                }
                var v = [];
                for (h = 0; h < g.length; h++)
                    for (var l in t)
                        if (t[l].type == i && o[t[l].pos] == g[h][0]) {
                            v[g[h][1]] || (v[g[h][1]] = []), v[g[h][1]].push(t[l]);
                            break
                        } return v
            }, ft.ExtBattle.getSkillAllTargets = function (t, e, i, a, n, s) {
                var o = [],
                    r = !0,
                    c = ftd.Skill.get(e, "scope"),
                    h = i.type;
                switch (c) {
                    case 0:
                    case 2:
                    case 16:
                        if (o = 0 == c ? ft.ExtBattle.getTeamHeros(t, 3 - h) : 2 == c ? ft.ExtBattle.getTeamHeros(t, h) : ft.ExtBattle.getTeamHeros(t), a) (I = ft.ExtBattle.findSelectTeamHero(a, o)) ? o = [I] : s && (o = []);
                        r = !1;
                        break;
                    case 1:
                        o = ft.ExtBattle.getTeamHeros(t, 3 - h);
                        break;
                    case 3:
                        o = ft.ExtBattle.getTeamHeros(t, h);
                        break;
                    case 4:
                        (o = []).push(i);
                        break;
                    case 5:
                        o = ft.ExtBattle.getTeamHeros(t, h);
                        for (var f = 0; f < o.length; f++)
                            if (o[f] == i) {
                                o.splice(f, 1);
                                break
                            } break;
                    case 6:
                        if (o = ft.ExtBattle.getTeamHeros(t, 3 - h), r = !1, a)
                            if (I = ft.ExtBattle.findSelectTeamHero(a, o)) {
                                var d = ftd.Pet.get(n["pet" + (3 - h)], "a_position"),
                                    l = 3 - Math.ceil(d[I.pos] / 3);
                                for (f = o.length - 1; f >= 0; f--) {
                                    l != (g = 3 - Math.ceil(d[o[f].pos] / 3)) && o.splice(f, 1)
                                }
                                r = !0
                            } break;
                    case 7:
                        if (o = ft.ExtBattle.getTeamHeros(t, 3 - h), r = !1, a)
                            if (I = ft.ExtBattle.findSelectTeamHero(a, o)) {
                                var u = 2 - ((d = ftd.Pet.get(n["pet" + (3 - h)], "a_position"))[I.pos] - 1) % 3;
                                for (f = o.length - 1; f >= 0; f--) {
                                    u != (m = 2 - (d[o[f].pos] - 1) % 3) && o.splice(f, 1)
                                }
                                r = !0
                            } break;
                    case 8:
                        r = !1, o = ft.ExtBattle.getTeamHeros(t, h);
                        for (f = 0; f < o.length; f++)
                            if (o[f] == i) {
                                o.splice(f, 1);
                                break
                            } if (a) (I = ft.ExtBattle.findSelectTeamHero(a, o)) && (o = [I], r = !0);
                        break;
                    case 9:
                    case 10:
                        o = (I = ft.ExtBattle.findSelectTeamHero(a, t)) ? [I] : [];
                        break;
                    case 11:
                        o = ft.ExtBattle.getTeamHeros(t, 3 - h);
                        var p = [
                            [7, 4, 1],
                            [8, 5, 2],
                            [9, 6, 3]
                        ];
                        for (d = ftd.Pet.get(n["pet" + (3 - h)], "a_position"), f = o.length - 1; f >= 0; f--) {
                            for (var g = 3 - Math.ceil(d[o[f].pos] / 3), m = 2 - (d[o[f].pos] - 1) % 3, b = !0, v = 1; v <= 2 && !(g + v > 2); v++) {
                                for (var y in o)
                                    if (d[o[y].pos] == p[m][g + v]) {
                                        b = !1;
                                        break
                                    } if (!b) break
                            }
                            b || o.splice(f, 1)
                        }
                        break;
                    case 12:
                        if (r = !1, o = ft.ExtBattle.getTeamHeros(t, 3 - h), a) {
                            p = [
                                [7, 4, 1],
                                [8, 5, 2],
                                [9, 6, 3]
                            ];
                            if (I = ft.ExtBattle.findSelectTeamHero(a, o)) {
                                var _ = (d = ftd.Pet.get(n["pet" + (3 - h)], "a_position"))[I.pos];
                                for (f = 0; f < 3; f++) {
                                    for (v = 0; v < 3; v++)
                                        if (p[f][v] == _) {
                                            S = f, k = v;
                                            break
                                        } if (S) break
                                }
                                var x = [_];
                                p[S - 1] && p[S - 1][k] && x.push(p[S - 1][k]), p[S][k - 1] && x.push(p[S][k - 1]), p[S + 1] && p[S + 1][k] && x.push(p[S + 1][k]), p[S][k + 1] && x.push(p[S][k + 1]);
                                for (f = o.length - 1; f >= 0; f--) {
                                    var w = !1;
                                    for (v = 0; v < x.length; v++)
                                        if (d[o[f].pos] == x[v]) {
                                            w = !0;
                                            break
                                        } w || o.splice(f, 1)
                                }
                                r = !0
                            }
                        }
                        break;
                    case 13:
                        if (o = 0 == c ? ft.ExtBattle.getTeamHeros(t, 3 - h, !0) : ft.ExtBattle.getTeamHeros(t, h, !0), r = !1, a) (I = ft.ExtBattle.findSelectTeamHero(a, o)) && (o = [I], r = !0);
                        break;
                    case 14:
                        if (r = !1, o = ft.ExtBattle.getTeamHeros(t, 3 - h), a) {
                            var S, k, I;
                            p = [
                                [7, 4, 1],
                                [8, 5, 2],
                                [9, 6, 3]
                            ];
                            if (I = ft.ExtBattle.findSelectTeamHero(a, t)) {
                                for (_ = (d = ftd.Pet.get(n["pet" + (3 - h)], "a_position"))[I.pos], f = 0; f < 3; f++) {
                                    for (v = 0; v < 3; v++)
                                        if (p[f][v] == _) {
                                            S = f, k = v;
                                            break
                                        } if (S) break
                                }
                                x = [];
                                p[S - 1] && p[S - 1][k] && x.push(p[S - 1][k]), p[S][k - 1] && x.push(p[S][k - 1]), p[S + 1] && p[S + 1][k] && x.push(p[S + 1][k]), p[S][k + 1] && x.push(p[S][k + 1]);
                                for (f = o.length - 1; f >= 0; f--) {
                                    for (w = !1, v = 0; v < x.length; v++)
                                        if (d[o[f].pos] == x[v]) {
                                            w = !0;
                                            break
                                        } w || o.splice(f, 1)
                                }
                                r = !0
                            }
                        }
                        break;
                    case 15:
                        if (o = ft.ExtBattle.getTeamHeros(t, 3 - h), r = !1, a && i) {
                            var T = ftd.Pet.get(n["pet" + h], "a_position"),
                                C = ftd.Pet.get(n["pet" + (3 - h)], "a_position");
                            for (u = 2 - (T[i.pos] - 1) % 3, f = o.length - 1; f >= 0; f--) {
                                u != (m = 2 - (C[o[f].pos] - 1) % 3) && o.splice(f, 1)
                            }
                            r = !0
                        }
                        break;
                    case 17:
                    case 18:
                        17 === c ? o = ft.ExtBattle.getTeamHeros(t, 3 - h) : 18 === c && (o = ft.ExtBattle.getTeamHeros(t, h)), o.length > 0 ? (o = [o[Math.floor(Math.random() * o.length)]], r = !0) : o = void 0
                }
                return r || 1 != o.length || (r = !0), [r, o]
            }, ft.ExtBattle.findSelectTeamHero = function (t, e) {
                for (var i in e)
                    if (e[i].entityId == t) return e[i]
            }, ft.ExtBattle.getTeamHeros = function (t, e, i) {
                var a = [];
                for (var n in t) e && t[n].type != e || (!i && t[n].curHp > 0 || i && t[n].curHp <= 0 && !t[n].completelyDead) && a.push(t[n]);
                return a
            }, ft.ExtBattle.getMarks = function (t) {
                return ftd.Battle.get(t, "a_mark")
            }, ft.ExtBattle.getMainstays = function (t) {
                return ftd.Battle.get(t, "a_mainstay")
            }, ft.ExtBattle.selectTargetByProfession = function (t, e) {
                var i = ft.ExtHero.getProfession(t.id),
                    a = 0,
                    n = [];
                if (4 == i) {
                    for (var s = [], o = [], r = 0; r < e.length; ++r) e[r].getHpRate() >= .5 ? s.push(e[r]) : o.push(e[r]);
                    if (o.length > 0) {
                        if (1 == o.length) return o[0].entityId;
                        e = o
                    }
                }
                if (ft.value.professionPower[i])
                    for (r = 0; r < e.length; ++r) {
                        var c = ft.ExtHero.getProfession(e[r].id);
                        ft.value.professionPower[i][c] && (ft.value.professionPower[i][c] > a ? (a = ft.value.professionPower[i][c], n = [e[r]]) : ft.value.professionPower[i][c] == a && n.push(e[r]))
                    }
                if (1 == n.length) return n[0].entityId;
                if (n.length > 1) {
                    if (4 == i) {
                        var h = n[0];
                        for (r = 1; r < n.length; ++r) n[r].getHpRate() < h.getHpRate() && (h = n[r]);
                        return h.entityId
                    }
                    return n[ft.rand(n.length)].entityId
                }
                return e[ft.rand(e.length)].entityId
            }
        