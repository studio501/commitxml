
            
             ft.ExtCopy = {}, ftc && (ft.ExtCopy.getSpineRes = function (t) {
                return "spine/role/" + [1039, 1024, 2546][t]
            }, ft.ExtCopy.getIconSprite = function (t) {
                return ftc.ManagerRes.getSpriteFrame("program", "copy_item_tietu" + ft.ExtCopy.getIcon(t))
            }, ft.ExtCopy.getCopy = function (t) {
                return ftc.ManagerData.get2Object("Copy")[t]
            }, ft.ExtCopy.getRemainingCount = function (t) {
                var e = this.getCopy(t);
                return e ? e.count : this.getCount(t)
            }, ft.ExtCopy.checkCanChallenge = function (t, e) {
                if (t === ft.value.copy.ShenBing) {
                    var i = e,
                        a = ft.ExtItem.getEquip(e),
                        n = ft.ExtEquip.getType(a),
                        s = ft.ExtHero.getHero(n);
                    if (s && s.star >= 3 && !ft.ExtEquip.getEquip(a) && ft.ExtItem.getNum(i) < ft.ExtItem.getNeedPiecesNum(i)) {
                        var o = ft.ExtCopy.getCount(t);
                        return ft.ExtCopy.getCopy(t) && (o = ft.ExtCopy.getCopy(t).count), o > 0
                    }
                    return !1
                }
            }, ft.ExtCopy.isFinishChallenge = function (t, e) {
                var i = ft.ExtCopy.getCopy(t);
                return !!i && (t === ft.value.copy.ShenBing ? -1 !== ftc.ManagerData.get1("ManagerCopy").battleZSB.split(",").indexOf(e.toString()) : t === ft.value.copy.ZY ? ft.ExtItem.getNum(ft.value.item["zyCount" + e]) > 0 : t === ft.value.copy.ZSJ ? ftc.ManagerData.get1("ManagerCopy").battleZSJ.split(",")[e] > 0 : !(1 != i.ste))
            }, ft.ExtCopy.checkConsume = function (t) {
                var e = ftd.Copy.get(t, "a_consumeitem"),
                    i = ftd.Copy.get(t, "a_consumeitemnum");
                if (e && i)
                    for (var a = 0; a < e.length; a++)
                        if (ft.ExtItem.getNum(e[a]) < i[a]) return !1;
                return !0
            }, ft.ExtCopy.getCopySkillIds = function (t) {
                for (var e = ftc.ManagerData.get1("ManagerCopy").copySkillIds.split("|"), i = 0; i < e.length; i++) {
                    var a = e[i].split("_");
                    if (t == a[0]) return [a[1], a[2]]
                }
            }, ft.ExtCopy.isOpen = function (t) {
                var e = parseInt(ftd.Copy.get(t, "c_open").split(":")[1]);
                return ftc.ManagerData.get1("Player").level >= e
            }), ft.ExtCopy.getConsume = function (t) {
                return {
                    ids: ftd.Copy.get(t, "a_consumeitem"),
                    nums: ftd.Copy.get(t, "a_consumeitemnum")
                }
            }, ft.ExtCopy.getName = function (t) {
                return ftd.Copy.get(t, "name")
            }, ft.ExtCopy.getInfo = function (t) {
                return ftd.Copy.get(t, "info")
            }, ft.ExtCopy.getIcon = function (t) {
                return ftd.Copy.get(t, "img")
            }, ft.ExtCopy.getAwards = function (t, e) {
                var i = ftd.Copy.get(t, "a_award");
                return ft.ExtAward.getIdNumsPreview(void 0 !== e ? i[e] : i)
            }, ft.ExtCopy.getCount = function (t) {
                return ftd.Copy.get(t, "count")
            }, ft.ExtCopy.getType = function (t) {
                return ftd.Copy.get(t, "type")
            }, ft.ExtCopy.getHSLYAwardPreview = function (t, e, i) {
                for (var a, n, s, o = [], r = [], c = ft.value.HSLYAwards[t][0], h = ft.value.HSLYAwards[t][1], f = ft.value.HSLYAwards[t][2], d = 0; d < h.length; d++)
                    if (e > h[d]) {
                        a = f[d];
                        break
                    } return o.push(c), r.push(a), t >= 2 && 1 === i ? (n = ft.value.HSLYExtAwards[2][0], s = ft.value.HSLYExtAwards[2][1]) : t > 1 || 1 === t && 1 === i ? (n = ft.value.HSLYExtAwards[1][0], s = ft.value.HSLYExtAwards[1][1]) : (t > 0 || 0 === t && 1 === i) && (n = ft.value.HSLYExtAwards[0][0], s = ft.value.HSLYExtAwards[0][1]), n && (o.push(n), r.push(s)), {
                        ids: o,
                        nums: r
                    }
            }, ft.ExtCopy.getAchievements = function (t) {
                var e = [];
                for (var i in t) ft.ExtAchievement.getType(i) === ft.type.achievement.copyXSWJ && 2 === ft.ExtAchievement.getSubtype(i) && e.push(t[i]);
                return e
            }, ft.ExtCopy.getAchievementScore = function (t) {
                for (var e = 0, i = 0; i < t.length; i++) e += t[i].ext * ft.ExtAchievement.getConditions(t[i].id)[0];
                return e
            }, ft.ExtCopy.getAchievementGrade = function (t) {
                return t < 100 ? 1 : t < 500 ? 2 : t < 1e3 ? 3 : t < 1500 ? 4 : 5
            }, ft.ExtCopy.getExtAward = function (t) {
                var e = ft.ExtCopy.getAchievementGrade(t),
                    i = Math.round(t / 15);
                return i += [0, 5, 20, 30, 50][e - 1], {
                    ids: [ft.value.item.yearPicture],
                    nums: [i]
                }
            }, ft.ExtCopy.getLevel = function (t) {
                return ftd.Copy.get(t, "level", !0)
            }, ft.ExtCopy.getSamsara = function (t) {
                return ftd.Copy.get(t, "samsara", !0)
            }
        