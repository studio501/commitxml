
            
             ft.ExtTitle = {}, ftc && (ft.ExtTitle.getValue = function (t, e) { }, ft.ExtTitle.getCurTitle = function () {
                for (var t = ftc.ManagerData.get1("ManagerTitle").titleIds.split(","), e = "", i = 0; i < t.length; i++) t[i] > 0 && (e += ft.ExtTitle.getName(t[i]));
                return e.length > 0 ? e : "暂无称号"
            }, ft.ExtTitle.getTitles = function () {
                for (var t = ftc.ManagerData.get1("ManagerTitle").titleIds.split(","), e = 0; e < t.length; e++) 0 == t[e] && t.splice(e, 1);
                t[0] === t[1] && t.splice(1, 1);
                var i = [],
                    a = [],
                    n = ftc.ManagerData.get2Array("Title");
                for (e = 0; e < n.length; e++) {
                    var s = t.indexOf(n[e].id.toString()); - 1 !== s ? i[s] = n[e] : a.push(n[e])
                }
                return i.concat(a)
            }, ft.ExtTitle.getQualitySprite = function (t) {
                return ftc.ManagerRes.getSpriteFrame("program2", "_title_quality" + t)
            }, ft.ExtTitle.getQualityColor = function (t) {
                var e;
                switch (t) {
                    case 1:
                        e = 5723991;
                        break;
                    case 2:
                        e = 4090122;
                        break;
                    case 3:
                        e = 3954347;
                        break;
                    case 4:
                        e = 8988287;
                        break;
                    case 5:
                        e = 689522;
                        break;
                    case 6:
                        e = 11042816;
                        break;
                    case 7:
                        e = 11949583;
                        break;
                    case 8:
                        e = 8988226;
                        break;
                    case 9:
                        e = 9830400;
                        break;
                    case 10:
                        e = 7471104
                }
                return ftc.newColor(e)
            }), ft.ExtTitle.getName = function (t) {
                return ftd.Title.get(t, "name")
            }, ft.ExtTitle.getInfo = function (t) {
                return ftd.Title.get(t, "info")
            }, ft.ExtTitle.getTypes = function (t) {
                return ftd.Title.get(t, "a_type")
            }, ft.ExtTitle.getValues = function (t) {
                return ftd.Title.get(t, "a_value")
            }, ft.ExtTitle.getCountry = function (t) {
                return ftd.Title.get(t, "country")
            }, ft.ExtTitle.getWeapon = function (t) {
                return ftd.Title.get(t, "weapon")
            }, ft.ExtTitle.getHeros = function (t) {
                return ftd.Title.get(t, "a_hero")
            }, ft.ExtTitle.loadHeroValues = function (t, e, i) {
                for (var a in !i && ftc && (i = ftc.ManagerData.get1("ManagerTitle")), i.mapHeroValues = {}, t) i.mapHeroValues[t[a].id] = [];
                var n = function (t, e) {
                    for (var a = ft.ExtTitle.getTypes(e), n = ft.ExtTitle.getValues(e), s = i.mapHeroValues[t], o = 0; o < a.length; o++) s[a[o]] || (s[a[o]] = 0), s[a[o]] += n[o]
                };
                for (var a in e) {
                    var s = e[a].id,
                        o = ft.ExtTitle.getCountry(s);
                    if (o)
                        for (var r in t) {
                            var c = t[r].id;
                            o === ft.ExtHero.getCountry(c) && n(c, s)
                        } else if (ft.ExtTitle.getWeapon(s))
                        for (var r in t) {
                            c = t[r].id;
                            o === ft.ExtHero.getWeapon(c) && n(c, s)
                        } else {
                        var h = ft.ExtTitle.getHeros(s);
                        if (h && h.length)
                            for (var r in t) {
                                c = t[r].id; - 1 !== h.indexOf(c) && n(c, s)
                            } else
                            for (var r in t) n(t[r].id, s)
                    }
                }
            }, ft.ExtTitle.getValueDesc = function (t) {
                for (var e = ft.ExtTitle.getTypes(t), i = ft.ExtTitle.getValues(t), a = "", n = 0; n < e.length; n++) a += ft.ExtPropName.getName(e[n]) + " " + i[n] + "\n";
                return a
            }, ft.ExtTitle.getConditionDesc = function (t) {
                var e = "适用范围：",
                    i = ft.ExtTitle.getCountry(t);
                if (i) i === ft.type.country.Qun ? e += "群雄武将" : e += ft.type.country.countryNames[i] + "国武将";
                else if (ft.ExtTitle.getWeapon(t)) e += "使用{0}的武将".replace("{0}", ft.type.equip.equipNames[i]);
                else {
                    var a = ft.ExtTitle.getHeros(t);
                    if (a && a.length)
                        for (var n = 0, s = a.length; n < s; n++) e += ft.ExtHero.getName(a[n]) + (n < s - 1 ? "、" : "");
                    else e += "所有武将"
                }
                return e
            }, ft.ExtTitle.getExp = function (t) {
                var e = ftd.Title.get(t, "exp");
                return void 0 !== e ? e : 0
            }, ft.ExtTitle.getMaxLevel = function (t) {
                for (var e = this.getTotalExp(t), i = 0, a = 0; a < 9 && e >= ft.value.titleLvUpNeeds[a]; a++) i++;
                return i
            }, ft.ExtTitle.getNextExp = function (t) {
                var e = ft.value.titleLvUpNeeds[t];
                return void 0 !== e ? e : 0
            }, ft.ExtTitle.getTotalExp = function (t) {
                var e = 0;
                for (var i in t) e += ft.ExtTitle.getExp(t[i].id);
                return e
            }
        