

ft.ExtAchievement = {}, ftc && (ft.ExtAchievement.hasAchievementComplete = function (t, e) {
    var i = ftc.ManagerData.get2("Achievement");
    for (var a in i)
        if (!(t && this.getType(i[a].id) !== t || e && this.getSubtype(i[a].id) !== e || 1 !== this.getStatus(i[a]))) return !0;
    return !1
}), ft.ExtAchievement.getName = function (t) {
    return ftd.Achievement.get(t, "name")
}, ft.ExtAchievement.getType = function (t) {
    return ftd.Achievement.get(t, "type")
}, ft.ExtAchievement.getSubtype = function (t) {
    return ftd.Achievement.get(t, "subtype")
}, ft.ExtAchievement.getInfo = function (t) {
    return ftd.Achievement.get(t, "info")
}, ft.ExtAchievement.getEvent = function (t) {
    return ftd.Achievement.get(t, "event")
}, ft.ExtAchievement.getConditions = function (t) {
    return ftd.Achievement.get(t, "a_condition")
}, ft.ExtAchievement.getAwards = function (t) {
    return ftd.Achievement.get(t, "a_award")
}, ft.ExtAchievement.getStatus = function (t, e) {
    var i = this.getConditions(t.id),
        a = t.ste.split(",");
    if (this.getEvent(t.id) === ft.type.eventAchievement.WJSJ) {
        if (1 == t.ext) return 2;
        for (var n = 0, s = 0; s < i.length; s++) a[s] && n++;
        return n < i.length ? 0 : 1
    }
    if (void 0 === e) {
        var o = -1;
        for (s = 0; s < i.length && t.ext >= i[s]; s++) o++;
        var r = -1;
        for (s = 0; s < a.length; s++) {
            if (!(Number(a[s]) > 0)) break;
            r++
        }
        return r === i.length - 1 ? 2 : o > r ? 1 : 0
    }
    return a[e] > 0 ? 2 : t.ext >= i[e] ? 1 : 0
}, ft.ExtAchievement.isWMZZTask = function (t) {
    if (t = Number(t), -1 !== ft.achievementTasks1.indexOf(t)) return !0;
    for (var e = ft.achievementTasks2, i = 0; i < e.length; i++)
        for (var a = 0; a < e[i].length; a++)
            if (e[i][a] === t) return !0;
    return !1
}, ft.ExtAchievement.getEventCondition = function (t) {
    return ftd.Achievement.get(t, "eventcondition")
}
