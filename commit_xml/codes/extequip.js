
            
             ft.ExtEquip = {}, ft.ExtEquip.load = function () {
                if (!ft.ExtEquip.mapEquipPack)
                    for (var t in ft.ExtEquip.mapEquipPack = {}, ftd.Equippack.data)
                        for (var e = ft.ExtEquipPack.getEquips(t), i = 0; i < e.length; i++) ft.ExtEquip.mapEquipPack[e[i]] = t
            }, ftc && (ft.ExtEquip.getName = function (t) {
                return 99 == ftc.getSourceId() ? ftd.Equip.get(t, "name") + "(" + t + ")" : ftd.Equip.get(t, "name")
            }, ft.ExtEquip.getInfo = function (t) {
                var e = ftd.Equip.get(t, "info"),
                    i = ftd.Equip.get(t, "a_othervaluetype");
                if (i) {
                    var a = ftd.Equip.get(t, "a_othervalue");
                    for (var n in i) e += ft.ExtPropName.getName(i[n]) + "+" + a[n]
                }
                return e
            }, ft.ExtEquip.getSkillInfo = function (t) {
                var e = "",
                    i = ft.ExtEquip.getSkillAdd(t);
                if (i > 0) e = ft.ExtSkill.getName(i) + "\n" + ft.ExtSkill.getInfo(i);
                else {
                    var a = ft.ExtEquip.getSkillLevelUp(t);
                    if (a > 0) {
                        var n = ft.ExtHero.getSkillIds(ft.ExtEquip.getType(t), 1);
                        n && n.length > 0 && (e = ft.ExtSkill.getName(n[0]) + "\n\u6280\u80fd\u7b49\u7ea7+" + a)
                    }
                }
                return e
            }, ft.ExtEquip.getIconSprite = function (t) {
                var e = ftd.Equip.get(t, "img");
                return ftc.ManagerRes.getSpriteFrame("icon_equip", "equip_" + e)
            }, ft.ExtEquip.getQualitySprite = function (t) {
                var e = ft.ExtEquip.getQuality(t);
                return e > 5 ? e = 5 : e < 1 && (e = 1), ftc.ManagerRes.getSpriteFrame("program", "_equip_quality" + e)
            }, ft.ExtEquip.getStarSprite = function (t) {
                if (t > 0) return ftc.ManagerRes.getSpriteFrame("program", "common_icon_xing" + t)
            }, ft.ExtEquip.getNum = function (t) {
                var e = ftc.ManagerData.get2("Equip");
                for (var i in e)
                    if (e[i].id == t) return e[i].num;
                return 0
            }, ft.ExtEquip.getDecomposePreview = function (t) {
                var e = ftd.Equip.get(t, "a_decompose");
                return ft.ExtAward.getIdNumsPreview(e)
            }, ft.ExtEquip.getEquip = function (t) {
                return ftc.ManagerData.get2Object("Equip")[t]
            }, ft.ExtEquip.getEquipsByPos = function (t) {
                var e = [];
                if (t >= 0) {
                    var i = ftc.ManagerData.get2("Equip");
                    for (var a in i) i[a].pos == t && e.push(i[a])
                }
                return e
            }, ft.ExtEquip.getEquipsByType = function (t) {
                var e = ftc.ManagerData.get2("Equip"),
                    i = [];
                for (var a in e) ft.ExtEquip.getType(e[a].id) == t && i.push(e[a]);
                return i
            }, ft.ExtEquip.getEquipsByPart = function (t, e, i) {
                var a = [],
                    n = ftc.ManagerData.get2("Equip");
                if (t === ft.type.part.exclusive)
                    for (var s in n) ft.ExtEquip.getType(n[s].id) > 1e3 && a.push(n[s]);
                else
                    for (var s in n) t == ft.ExtEquip.getPart(n[s].id) && (t == ft.type.part.weapon && e && e != ft.ExtEquip.getType(n[s].id) && ft.ExtEquip.getType(n[s].id) !== ft.type.equip.general || a.push(n[s]));
                if (i) {
                    var o = ft.ExtHero.getPos(i);
                    a.sort(function (t, e) {
                        return t.pos === o ? -1 : e.pos === o ? 1 : -1 === t.pos && -1 === e.pos || -1 !== t.pos && -1 !== e.pos ? ft.ExtEquip.getQuality(t.id) === ft.ExtEquip.getQuality(e.id) ? e.lv - t.lv : ft.ExtEquip.getQuality(e.id) - ft.ExtEquip.getQuality(t.id) : -1 === t.pos ? -1 : 1
                    })
                } else a.sort(function (t, e) {
                    return ft.ExtEquip.getQuality(t.id) === ft.ExtEquip.getQuality(e.id) ? e.lv - t.lv : ft.ExtEquip.getQuality(e.id) - ft.ExtEquip.getQuality(t.id)
                });
                return a
            }, ft.ExtEquip.getInfoArr = function (t) {
                var e, i = t.id || t,
                    a = ft.ExtEquip.getType(i);
                a > 1e3 && (e = ft.ExtHero.getName(a) + "\u4e13\u5c5e");
                var n, s = "";
                e && (s += e + "\n"), s += ft.ExtEquip.getInfo(i);
                var o = ft.ExtEquip.getSkillAdd(i);
                if (o > 0) n = "<color=#59221C>[" + ft.ExtSkill.getName(o) + "</color>]\n" + ft.ExtSkill.getInfo(o);
                else {
                    var r = ft.ExtEquip.getSkillLevelUp(i);
                    if (r > 0) {
                        var c = ft.ExtHero.getSkillIds(ft.ExtEquip.getType(i), 1);
                        c && c.length > 0 && (n = "<color=#59221C>[" + ft.ExtSkill.getName(c[0]) + "</color>]\n \u6280\u80fd\u7b49\u7ea7+" + r)
                    }
                }
                return [s, n]
            }), ft.ExtEquip.getPart = function (t) {
                var e = ft.ExtEquip.getType(t);
                return e > 1e3 ? ft.type.part.exclusive : e === ft.type.equip.general || e === ft.type.equip.sword || e === ft.type.equip.spear || e === ft.type.equip.blade || e === ft.type.equip.bow || e === ft.type.equip.axe ? ft.type.part.weapon : e - 4
            }, ft.ExtEquip.getSkillAdd = function (t) {
                return ftd.Equip.get(t, "skilladd")
            }, ft.ExtEquip.getSkillLevelUp = function (t) {
                return ftd.Equip.get(t, "skilllevelup")
            }, ft.ExtEquip.getType = function (t) {
                return ftd.Equip.get(t, "type")
            }, ft.ExtEquip.getUpgradeType = function (t) {
                return ftd.Equip.get(t, "upgradetype")
            }, ft.ExtEquip.getCopy = function (t) {
                return ftd.Equip.get(t, "copy")
            }, ft.ExtEquip.getLevelValue = function (t, e, i) {
                var a = ftd.Equip.get(t.id, "value" + e);
                if (e == ft.type.prop.gjjl) return a;
                if (void 0 !== a) {
                    if (e == ftd.Equip.get(t.id, "upgradetype")) void 0 == i && (i = t.lv), a += ftd.Equip.get(t.id, "upgradefactor") * (i - 1);
                    return Math.round(100 * a) / 100
                }
                return 0
            }, ft.ExtEquip.getAdvancedTypes = function (t, e) {
                var i = ftd.Equip.get(t, "a_advancedtype");
                if (i && i[e]) return i[e].split(",")
            }, ft.ExtEquip.getStarValue = function (t, e, i, a) {
                var n, s = 0;
                if ((void 0 == i && (i = t.star), i > 0) && (n = ftd.Equip.get(t.id, "a_advancedtype"))) {
                    var o = n[i - 1];
                    if (o) {
                        var r = (o = o.split(",")).indexOf(e.toString()); - 1 !== r && (s = ftd.Equip.get(t.id, "a_advancedfactor")[i - 1].split(",")[r])
                    }
                    n[i - 1] == e && (s = ftd.Equip.get(t.id, "a_advancedfactor")[i - 1])
                }
                if ((s = Number(s), !a) && (n = ftd.Equip.get(t.id, "a_othervaluetype")))
                    for (var c in n) n[c] == e && (s += ftd.Equip.get(t.id, "a_othervalue")[c]);
                return Math.round(100 * s) / 100
            }, ft.ExtEquip.getExtraValue = function (t, e, i) {
                var a = this.getExtraTypes(t.id);
                if (a)
                    for (var n = 0; n < a.length; n++)
                        if (a[n] == e) {
                            void 0 === i && (i = t.lv);
                            var s = this.getExtraBases(t.id),
                                o = this.getExtraGrowths(t.id);
                            return s[n] + o[n] * (i - 1)
                        } return 0
            }, ft.ExtEquip.getJewelValue = function (t, e, i) {
                var a = 0;
                for (var n in i) {
                    var s = i[n];
                    s.pos == t.jewelPos && (a += ft.ExtJewel.getSelfValue(s, e))
                }
                return a
            }, ft.ExtEquip.getSaleGold = function (t) {
                return ftd.Item.get(ft.ExtEquip.getItemId(t), "salegold")
            }, ft.ExtEquip.getItemId = function (t) {
                return ft.ExtItem.mapWholeEquips[t]
            }, ft.ExtEquip.getQuality = function (t) {
                return ftd.Equip.get(t, "quality")
            }, ft.ExtEquip.getBaseProperty = function (t) {
                if (ftc) {
                    var e = {};
                    for (var i in ft.type.prop) {
                        var a = ftd.Equip.get(t, "value" + ft.type.prop[i]);
                        0 != a && (e[ft.type.prop[i]] = a)
                    }
                    return e
                }
            }, ft.ExtEquip.getUpgradeFactor = function (t) {
                if (ftc) return ftd.Equip.get(t, "upgradefactor")
            }, ft.ExtEquip.getUpgradeCost = function (t) {
                return ftd.Equip.get(t, "upgradecost")
            }, ft.ExtEquip.getUpgradeType = function (t) {
                if (ftc) return ftd.Equip.get(t, "upgradetype")
            }, ft.ExtEquip.getOnload = function (t, e) {
                var i = [];
                for (var a in e) e[a].pos == t && (i[ft.ExtEquip.getType(e[a].id) - 1] = e[a]);
                return i
            }, ft.ExtEquip.getNeedPiecesNum = function (t) {
                var e = ft.ExtItem.mapPartEquips[t];
                return ft.ExtItem.getNeedPiecesNum(e)
            }, ft.ExtEquip.getConsumeLevel = function (t, e) {
                if (void 0 !== e) {
                    var i = 0;
                    return i = e < 112 ? parseInt(ftd.Equip.get(t, "upgradecost") * Math.pow(1.1, e) * .9) : parseInt(5e3 * e * Math.sqrt(e) * .9), {
                        ids: [ft.value.item.gold],
                        nums: [i]
                    }
                }
                return {
                    ids: [ft.value.item["equipUpgrade" + ft.ExtEquip.getPart(t)]],
                    nums: [1]
                }
            }, ft.ExtEquip.calcNeedGold = function (t, e, i) {
                if (void 0 === e && (e = 1), void 0 !== i) {
                    for (var a = ft.ExtItem.getGold(), n = 0, s = ftd.Equip.get(t, "upgradecost"), o = 0; o < e && n <= a; o++) n += ft.ExtEquip.getLvGold(s, i + o);
                    return n
                }
            }, ft.ExtEquip.getLvGold = function (t, e) {
                return e < 112 ? parseInt(t * Math.pow(1.1, e) * .9) : parseInt(5e3 * e * Math.sqrt(e) * .9)
            }, ft.ExtEquip.getMaxStar = function (t) {
                var e = ftd.Equip.get(t, "a_advanceditem");
                return e ? e.length : 0
            }, ft.ExtEquip.canStarUp = function (t) {
                return ft.ExtEquip.getMaxStar(t) > 0
            }, ft.ExtEquip.getConsumeStar = function (t, e) {
                if (e >= 0 && e < 10) return {
                    ids: ftd.Equip.get(t, "a_advanceditem")[e].split(","),
                    nums: ftd.Equip.get(t, "a_advancednum")[e].split(",")
                }
            }, ft.ExtEquip.getExtraTypes = function (t) {
                return ftd.Equip.get(t, "a_extratype")
            }, ft.ExtEquip.getExtraBases = function (t) {
                return ftd.Equip.get(t, "a_extrabase")
            }, ft.ExtEquip.getExtraGrowths = function (t) {
                return ftd.Equip.get(t, "a_extragrowth")
            }, ft.ExtEquip.getCost = function (t, e) {
                var i = [],
                    a = [],
                    n = 0;
                if (t.star > 0)
                    for (var s = 1; s <= t.star; s++) {
                        var o = ft.ExtEquip.getConsumeStar(t.id, s - 1);
                        o && o.ids && (i = i.concat(o.ids), a = a.concat(o.nums))
                    }
                for (s = i.length - 1; s > 0; s--) {
                    var r = i.indexOf(i[s]);
                    r < s && (a[r] = Number(a[r]) + Number(a[s]), i.splice(s, 1), a.splice(s, 1))
                }
                if (t.goldLv > 0) {
                    var c = ft.ExtEquip.getUpgradeCost(t.id);
                    for (s = 0; s < t.goldLv; s++) n += ft.ExtEquip.getLvGold(c, s);
                    i.push(ft.value.item.gold), a.push(parseInt(n * e * .5))
                }
                return {
                    lvGold: n,
                    ids: i,
                    nums: a
                }
            }
        