
            
             ft.ExtHero = {}, ftc && (ft.ExtHero.load = function (t) {
                if (!ft.ExtHero.myHeroes || t) {
                    var e = [];
                    for (var i in ftd.Hero.data) 0 === ft.ExtHero.getType(i) && e.push(i);
                    var a = ftc.ManagerData.get2("Hero");
                    for (var i in a) {
                        var n = e.indexOf(a[i].id.toString()); - 1 !== n && (e[n] = a[i])
                    }
                    e.sort(function (t, e) {
                        return t.favour && !e.favour ? -1 : !t.favour && e.favour ? 1 : ft.ExtHero.getIndex(t.id || t) - ft.ExtHero.getIndex(e.id || e)
                    }), this.allHeroes = e;
                    var s = [];
                    for (i = 0; i < e.length; i++)
                        if (void 0 === e[i].id) {
                            var o = ft.ExtItem.mapPartHeros[e[i]];
                            ft.ExtItem.getNum(o) >= ft.ExtItem.getNeedPiecesNum(o) && s.push(e[i])
                        } else s.push(e[i]);
                    this.myHeroes = s
                }
            }, ft.ExtHero.getSpineRes = function (t) {
                return "spine/role/" + this.getImg(t, !0)
            }, ft.ExtHero.getNameSprite = function (t) {
                return ftc.ManagerRes.getSpriteFrame("txt_name", "txt_name" + t)
            }, ft.ExtHero.getIconSprite = function (t) {
                var e = this.getImg(t);
                return ftc.ManagerRes.getSpriteFrame("icon_header", "header" + e)
            }, ft.ExtHero.getImageSprite = function (t, e) {
                var i = e ? t : ftd.Hero.get(t, "img");
                return ftc.ManagerRes.getSpriteFrame("icon_hero2", "image_" + i) || ftc.ManagerRes.getSpriteFrame("icon_hero2", "image_0")
            }, ft.ExtHero.getQualitySprite = function (t, e) {
                if (t) {
                    var i = ft.ExtHero.getQuality(t, e);
                    return i > 5 ? i = 5 : i < 1 && (i = 1), ftc.ManagerRes.getSpriteFrame("program", "_equip_quality" + i)
                }
                return ftc.ManagerRes.getSpriteFrame("program", "_equip_quality1")
            }, ft.ExtHero.getInfo = function (t, e) {
                return e || (e = ""), ftd.Herobiography.get(t, "info" + e)
            }, ft.ExtHero.getStarSprite = function (t) {
                return t > 5 && (t = 5), ftc.ManagerRes.getSpriteFrame("program", "common_icon_xing" + t)
            }, ft.ExtHero.getStarInfo = function (t, e) {
                var i = "";
                if (1 === e) i = "【一星】 解锁武将技能";
                else if (2 === e) i = "【二星】 技能一提升1级";
                else if (3 === e) {
                    var a = ft.ExtHero.getGrowth(t),
                        n = ftd.Growth.get(a, "type");
                    i = 1 == n ? "【三星】 武力上升15%" : 2 == n ? "【三星】 智力上升15%" : "【三星】 兵力上升15%"
                } else 4 === e ? i = "【四星】 技能一提升1级" : 5 === e && (i = "【五星】 武将兵力上升15%");
                return i
            }, ft.ExtHero.getBiographyInfo = function (t) {
                var e = "";
                return 1 === t ? e = "+50\u70b9\u7b56\u7565" : 2 === t ? e = "+10%\u5175\u529b" : 3 === t ? e = "+5%\u6b66\u529b\u548c\u667a\u529b" : 4 === t ? e = "跑图形象和警戒计+1s" : 5 === t ? e = "武将头像" : 6 === t && (e = "+5%\u66b4\u51fb\u4f24\u5bb3"), e
            }, ft.ExtHero.getPos = function (t) {
                return ftc.ManagerData.get1("ManagerHero").teamIds.split(",").indexOf(t.toString())
            }, ft.ExtHero.getFight = function (t) {
                var e = this.getValue(t, ft.type.prop.wl);
                return e += this.getValue(t, ft.type.prop.zl), e += this.getValue(t, ft.type.prop.sd) / 10, e += this.getValue(t, ft.type.prop.nl), e += this.getValue(t, ft.type.prop.hp) / 8, e += this.getValue(t, ft.type.prop.mp) / 10, Math.floor(e)
            }, ft.ExtHero.getTeamFight = function (t) {
                var e = ft.ExtHero.getTeam(ftc.ManagerData.get2Object("Hero"), ftc.ManagerData.get1("ManagerHero").teamIds, t),
                    i = 0;
                for (var a in e) e[a] && (i += ft.ExtHero.getFight(e[a]));
                return i
            }, ft.ExtHero.getHp = function (t) {
                return parseInt(t.hp * ft.ExtHero.getValue(t, ft.type.prop.hp))
            }, ft.ExtHero.getMp = function (t) {
                return parseInt(t.mp * ft.ExtHero.getValue(t, ft.type.prop.mp))
            }, ft.ExtHero.isInTeam = function (t) {
                return -1 !== ftc.ManagerData.get1("ManagerHero").teamIds.split(",").indexOf(t.toString())
            }, ft.ExtHero.getEquip = function (t, e) {
                for (var i = ft.ExtEquip.getEquipsByPos(ft.ExtHero.getPos(t)), a = 0; a < i.length; a++)
                    if (e == ft.ExtEquip.getPart(i[a].id)) return i[a];
                return null
            }, ft.ExtHero.getCountrySprite = function (t) {
                return ftc.ManagerRes.getSpriteFrame("program", "common_icon_country" + ft.ExtHero.getCountry(t))
            }, ft.ExtHero.getCountrySprite2 = function (t) {
                return ftc.ManagerRes.getSpriteFrame("program", "common_country" + ft.ExtHero.getCountry(t))
            }, ft.ExtHero.getCountryMarkSprite = function (t) {
                return ftc.ManagerRes.getSpriteFrame("program", "common_mark_" + (10 + ft.ExtHero.getCountry(t)))
            }, ft.ExtHero.getWeaponSprite = function (t) {
                return ftc.ManagerRes.getSpriteFrame("program", "common_weapon" + ftd.Hero.get(t, "weapon"))
            }, ft.ExtHero.getUpSprite = function (t) {
                if (0 < t && t <= 3) return ftc.ManagerRes.getSpriteFrame("program", "txt_hero_nameplus" + t)
            }, ft.ExtHero.getNameColor = function (t, e) {
                var i = ft.ExtHero.getQuality(t, e),
                    a = 16777215;
                return 1 == i ? a = 40964 : 2 == i ? a = 4259666 : 3 == i ? a = 4240383 : 4 == i ? a = 14043647 : 5 == i && (a = 16745537), ftc.newColor(a)
            }, ft.ExtHero.getIsOpenTeam = function (t) {
                return !(t && t > 0) || ftc.ManagerData.get1("ManagerHero").teamIds.split(",").length >= (t + 1) * ft.value.com.maxHeroNum
            }, ft.ExtHero.getHeroByPos = function (t) {
                var e = ftc.ManagerData.get1("ManagerHero").teamIds.split(",")[t];
                if (e > 0) return ftc.ManagerData.get2Object("Hero")[e]
            }, ft.ExtHero.getHero = function (t) {
                return ftc.ManagerData.get2Object("Hero")[t]
            }, ft.ExtHero.checkCanCompose = function (t) {
                var e = ft.ExtItem.mapPartHeros[t];
                return ft.ExtItem.getNum(e) >= ft.ExtItem.getNeedPiecesNum(e)
            }, ft.ExtHero.checkCanEquip = function (t) {
                for (var e = ft.type.part.weapon, i = ft.type.part.rider; e <= i; e++)
                    if (ft.ExtHero.checkCanEquipPart(t, e)) return !0;
                return !1
            }, ft.ExtHero.checkCanEquipPart = function (t, e) {
                var i = !1;
                if (!ft.ExtHero.getEquip(t.id, e)) {
                    var a = ftc.ManagerData.get2("Equip");
                    for (var n in a)
                        if (-1 === a[n].pos && (e == ft.type.part.weapon && ft.ExtEquip.getType(a[n].id) == ft.ExtHero.getWeapon(t.id) || e !== ft.type.part.weapon && e == ft.ExtEquip.getPart(a[n].id))) {
                            i = !0;
                            break
                        }
                }
                return i
            }, ft.ExtHero.checkCanLvUp = function (t) {
                return Math.min(ftc.ManagerData.get1("Player").level, ft.value.com.maxHeroLevel) > t.lv && (ft.ExtItem.getNum(ft.value.item.expMedicine1) > 0 || ft.ExtItem.getNum(ft.value.item.expMedicine2) > 0)
            }, ft.ExtHero.checkCanStarUp = function (t) {
                var e = ft.ExtHero.getConsumeStar(t.id, t.star + 1);
                if (e) {
                    var i = e.ids,
                        a = e.nums;
                    if (i[0] && a[0]) return ft.ExtItem.getNum(i[0]) >= a[0]
                }
                return !1
            }, ft.ExtHero.checkCanWakeUp = function (t) {
                if (this.checkCanWake(t.id)) return !1;
                var e = ft.ExtHero.getConsumeWake(t.id, t.up + 1);
                if (e) {
                    for (var i = e.ids, a = e.nums, n = !0, s = 0; s < i.length; s++)
                        if (ft.ExtItem.getNum(i[s]) < a[s]) {
                            n = !1;
                            break
                        } if (n) {
                            var o = ft.value.heroWakeUpLevels[t.up],
                                r = ft.value.heroWakeUpStars[t.up];
                            (t.lv < o || t.star < r) && (n = !1)
                        }
                    return n
                }
                return !1
            }, ft.ExtHero.checkCanBiographyUnlock = function (t) {
                if (t.biographyStage < ft.value.com.maxHeroBiographyStage && ft.ExtItem.mapHeroLord[t.id]) {
                    var e = ft.ExtItem.mapHeroBiography[t.id];
                    if (ft.ExtItem.getNum(e) >= ft.value.heroBiographyNeed[t.biographyStage + 1]) return !0
                }
                return 0 == (t.feats & ft.type.feat.fight) && t.fights >= ft.type.feat.needNums[0] || 0 == (t.feats & ft.type.feat.kill) && t.kills >= ft.type.feat.needNums[1]
            }, ft.ExtHero.getTeamIndex = function (t) {
                return Math.floor(ftc.ManagerData.get1("ManagerHero").teamIds.split(",").indexOf(t.toString()) / 5)
            }, ft.ExtHero.getPropLevel = function (t, e) {
                for (var i = !0, a = 0; a < e.length; a++)
                    if (t < e[a]) return i = !1, a;
                if (i) return 5
            }, ft.ExtHero.getSkills = function (t) {
                var e = [];
                if (ft.isObject(t)) {
                    var i = ft.ExtHero.getPos(t.id),
                        a = ftc.ManagerData.get2("Equip");
                    e.push(ft.ExtHero.getSkill1Id(t, i, a)), e.push(ft.ExtHero.getSkill2Id(t)), e.push(ft.ExtHero.getSkill3Id(t))
                } else
                    for (var n = 1; n <= 3; n++) {
                        var s = ftd.Hero.get(t, "a_skill" + n);
                        s ? e.push([s[0], !1]) : e.push([0, !1])
                    }
                return e
            }, ft.ExtHero.getSkillInfo = function (t, e) {
                t = ft.ExtHero.getHero(t.id);
                for (var i = ft.ExtHero.getSkills(t), a = "", n = "", s = 0; s < i.length; s++)
                    if (i[s][0] == e) {
                        var o = i[s][1];
                        if (e) {
                            var r = ft.ExtHero.getSkillIds(t.id, s + 1);
                            if (r.length > 0)
                                for (var c = 0; c < r.length; c++) o && e >= r[c] ? a += "<color=#63ff3f>" + ft.replaceAll(ft.ExtSkill.getInfo(r[c]), "|", "\n") + "</c>\n" : a += "<color=#FFE9D1>" + ft.replaceAll(ft.ExtSkill.getInfo(r[c]), "|", "\n") + "</c>\n";
                            if (1 === ft.ExtSkill.getSkillType(e)) {
                                var h = ft.ExtSkill.getCD(e);
                                if (h > 0) n += "冷却:" + h + "回合", n += "\n\u6218\u524d\u51b7\u5374:" + ft.ExtSkill.getPreCD(e) + "回合"
                            }
                        }
                        break
                    } return {
                        info: a,
                        cdInfo: n
                    }
            }, ft.ExtHero.getLords = function (t) {
                var e = [];
                0 === t && e.push({
                    type: ft.type.skin.team
                }), e.push({
                    type: ft.type.skin.commander
                });
                var i = 0;
                if (1 === t) {
                    var a = ftc.ManagerData.get1("ManagerMap").skinTypes.split(",");
                    a[0] != ft.type.skin.lord && a[0] != ft.type.skin.specify || (i = ftc.ManagerData.get1("ManagerMap").skins.split("|")[0])
                }
                var n = ftc.ManagerData.get2Array("Item");
                for (var s in n) ft.ExtItem.getType(n[s].id) === ft.type.item.specialLord && i != n[s].id && e.push({
                    type: ft.type.skin.specify,
                    id: n[s].id
                });
                var o = ftc.ManagerData.get2Array("Hero");
                for (s = 0; s < o.length; s++) {
                    var r = ft.ExtItem.mapHeroLord[o[s].id];
                    r && i != o[s].id && ft.ExtItem.getNum(r) > 0 && e.push({
                        type: ft.type.skin.lord,
                        id: o[s].id
                    })
                }
                return e
            }, ft.ExtHero.getValue = function (t, e, i, a, n) {
                var s = ft.ExtHero.getPos(t.id),
                    o = ftc.ManagerData.get2("Equip"),
                    r = ftc.ManagerData.get2("Jewel");
                return ft.ExtHero.getMaxValue(t, s, o, e, i, a, n, r)
            }, ft.ExtHero.calcRemainMaxExp = function (t) {
                for (var e = 0, i = ftc.ManagerData.get1("Player").level - t.lv, a = 0; a < i; a++) e += ft.ExtHero.getNextExp(t.lv + a);
                return (e -= t.exp) < 0 && (e = 0), e
            }, ft.ExtHero.getImg = function (t, e) {
                if (e) {
                    var i = this.getHero(t);
                    return i && i.skin > 0 ? ftd.Item.get(i.skin, "c_work") : ftd.Hero.get(t, "img")
                }
                return ftd.Hero.get(t, "img")
            }), ft.ExtHero.loadMapProfessionHeroes = function () {
                if (!this.mapProfessionHeroes)
                    for (var t in this.mapProfessionHeroes = {}, ftd.Hero.data) {
                        var e = ft.ExtHero.getProfession(t),
                            i = ft.ExtHero.getDifficultyLevel(t);
                        e > 0 && (this.mapProfessionHeroes[e] ? this.mapProfessionHeroes[e][i] ? this.mapProfessionHeroes[e][i].push(t) : this.mapProfessionHeroes[e][i] = [t] : (this.mapProfessionHeroes[e] = {}, this.mapProfessionHeroes[e][i] = [t]))
                    }
            }, ft.ExtHero.getName = function (t) {
                return ftd.Hero.get(t, "name")
            }, ft.ExtHero.getQuality = function (t, e) {
                if (e) return ft.ExtGrowth.getQuality(ft.ExtHero.getGrowth(t));
                if (ftc) {
                    var i = ftc.ManagerData.get2Object("Hero", t);
                    return i && 4 === i.up ? ft.type.quality.golden : ft.ExtGrowth.getQuality(ft.ExtHero.getGrowth(t))
                }
                return ft.ExtGrowth.getQuality(ft.ExtHero.getGrowth(t))
            }, ft.ExtHero.getRarity = function (t) {
                return ftd.Hero.get(t, "rarity")
            }, ft.ExtHero.getSkillIsOpen = function (t, e) {
                return !ft.isObject(t) || (0 === e ? t.star > 0 : 1 === e ? t.up > 1 : 2 !== e && void 0)
            }, ft.ExtHero.getMaxValue = function (t, e, i, a, n, s, o, r, c) {
                var h = ft.ExtHero.getSelfValue(t, a, n, s, o);
                if (t.entityId) switch (a != ft.type.prop.gjjl ? (h *= ft.ExtHero.getEquipValuePer(t, e, i, a), h += ft.ExtHero.getEquipValue(t, e, i, a, r), h += ft.ExtHero.getTitleValue(t, a, c), h += ft.ExtHero.getFeatValue(t, a)) : h += ft.ExtHero.getEquipValuePer(t, e, i, a), parseInt(a)) {
                    case ft.type.prop.wl:
                        h += t.addWl;
                        break;
                    case ft.type.prop.zl:
                        h += t.addZl;
                        break;
                    case ft.type.prop.nl:
                        h += t.addNl;
                        break;
                    case ft.type.prop.sd:
                        h += t.addSd
                }
                return a == ft.type.prop.gjjl ? h : parseInt(h)
            }, ft.ExtHero.getEquipValue = function (t, e, i, a, n) {
                if (e > -1) {
                    var s = 0;
                    for (var o in i) i[o].pos == e && (s += ft.ExtEquip.getStarValue(i[o], a), s += ft.ExtEquip.getExtraValue(i[o], a), s += ft.ExtEquip.getJewelValue(i[o], a, n));
                    return parseInt(s)
                }
                return 0
            }, ft.ExtHero.getEquipValuePer = function (t, e, i, a) {
                if (e > -1) {
                    var n = 0;
                    if (a != ft.type.prop.gjjl) {
                        for (var s in i) i[s].pos == e && (n += ft.ExtEquip.getLevelValue(i[s], a));
                        return 1 + n / 100
                    }
                    for (var s in i) i[s].pos == e && (n += ft.ExtEquip.getLevelValue(i[s], a));
                    return n
                }
                return a != ft.type.prop.gjjl ? 1 : 0
            }, ft.ExtHero.getTitleValue = function (t, e, i) {
                !i && ftc && (i = ftc.ManagerData.get1("ManagerTitle"));
                var a = 0;
                if (i.mapHeroValues) {
                    var n = i.mapHeroValues[t.id];
                    n && (a = n[e])
                }
                return a > 0 ? a : 0
            }, ft.ExtHero.getFeatValue = function (t, e) {
                var i = 0;
                return e == ft.type.prop.bjsh && t.feats & ft.type.feat.kill && (i += 5), i
            }, ft.ExtHero.getSelfValue = function (t, e, i, a, n) {
                var s = t.id || t,
                    o = ftd.Hero.get(s, "value" + e);
                if (void 0 !== o) {
                    var r = ft.ExtHero.getGrowth(s);
                    void 0 == i && (i = t.lv || 1), void 0 == a && (a = t.star || 0), void 0 == n && (n = t.up || 0);
                    var c = o * (ft.ExtHero.getWakeAddPercent(n) + 100) / 100;
                    return c = c * (i + 10) * (ftd.Growth.get(r, "value" + e) + ftd.Growth.get(r, "upvalue" + e) * a) / 100 * ft.ExtHero.getStarAddPer(e, a, r), t.entityId && (e == ft.type.prop.mp && t.biographyStage >= 1 ? c += 50 : e == ft.type.prop.hp && t.biographyStage >= 2 ? c *= 1.1 : (e == ft.type.prop.wl || e == ft.type.prop.zl) && t.biographyStage >= 3 && (c *= 1.05)), e == ft.type.prop.gjjl ? o : parseInt(c)
                }
                return ft.ExtPropName.getDefault(e)
            }, ft.ExtHero.getBaseValue = function (t, e) {
                return ftd.Hero.get(t, "value" + e)
            }, ft.ExtHero.getStarAddPer = function (t, e, i) {
                if (t == ft.type.prop.wl) {
                    if (e >= 3 && 1 == ftd.Growth.get(i, "type")) return 1.15
                } else if (t == ft.type.prop.zl) {
                    if (e >= 3 && 2 == ftd.Growth.get(i, "type")) return 1.15
                } else if (t == ft.type.prop.hp && 5 == e) return 1.15;
                return 1
            }, ft.ExtHero.getNormalAttack = function (t) {
                var e = ftd.Hero.get(t, "a_skill");
                for (var i in e)
                    if (ftd.Skill.get(e[i], "skilltype") == ft.type.skill.pt) return e[i];
                return 0
            }, ft.ExtHero.getSkillIds = function (t, e) {
                return ftd.Hero.get(t, "a_skill" + e)
            }, ft.ExtHero.getSkill1Id = function (t, e, i, a) {
                var n;
                if (ft.isObject(t)) {
                    if ((n = ftd.Hero.get(t.id, "a_skill1")) && n.length > 0) {
                        if (ft.ExtHero.getSkillIsOpen(t, 0)) {
                            var s = 0;
                            if (s += Math.floor(t.star / 2), s += Math.floor(t.up / 2), e > -1)
                                for (var o in i)
                                    if (i[o].pos == e) {
                                        var r = ft.ExtEquip.getSkillLevelUp(i[o].id);
                                        if (r) {
                                            s += r;
                                            break
                                        }
                                    } return s >= n.length ? [n[n.length - 1], !0] : [n[s], !0]
                        }
                        return [n[0], !1]
                    }
                } else if ((n = ftd.Hero.get(t, "a_skill1")) && n.length > 0) return a ? [n[0], !0] : [n[0], !1];
                return [0, !1]
            }, ft.ExtHero.getSkill2Id = function (t) {
                var e;
                if (ft.isObject(t)) {
                    if ((e = ftd.Hero.get(t.id, "a_skill2")) && e.length > 0) return ft.ExtHero.getSkillIsOpen(t, 1) ? t.up - 2 >= e.length ? [e[e.length - 1], !0] : [e[t.up - 2], !0] : [e[0], !1]
                } else if ((e = ftd.Hero.get(t, "a_skill2")) && e.length > 0) return [e[0], !1];
                return [0, !1]
            }, ft.ExtHero.getSkill3Id = function (t) {
                if (ft.isObject(t));
                else {
                    var e = ftd.Hero.get(t, "a_skill3");
                    if (e && e.length > 0) return [e[0], !1]
                }
                return [0, !1]
            }, ft.ExtHero.getEquipSkills = function (t, e, i) {
                var a = [];
                for (var n in i)
                    if (i[n].pos == e) {
                        var s = ft.ExtEquip.getSkillAdd(i[n].id);
                        s && a.push(s)
                    } return a
            }, ft.ExtHero.getGrowth = function (t) {
                return ftd.Hero.get(t, "upgradetype")
            }, ft.ExtHero.getType = function (t) {
                return ftd.Hero.get(t, "type")
            }, ft.ExtHero.getTeam = function (t, e, i) {
                void 0 == i && (i = 0);
                var a = [];
                e = e.split(",");
                for (var n = i * ft.value.com.maxHeroNum, s = n; s < n + ft.value.com.maxHeroNum; s++) e[s] > 0 ? a[s - n] = t[e[s]] : a[s - n] = null;
                return a
            }, ft.ExtHero.getBattleTeam = function (t, e, i) {
                void 0 == i && (i = 0);
                var a = [];
                e = e.split(",");
                var n = ft.value.com.maxHeroNum,
                    s = i * n;
                if ((i + 1) * n <= e.length) {
                    for (var o = s; o < e.length; o++) a[o - s] = t[e[o] - s];
                    return a
                }
            }, ft.ExtHero.getNextExp = function (t) {
                return Math.round(Math.pow(1.1, t - 1) * t * 50)
            }, ft.ExtHero.getNeedPiecesNum = function (t) {
                var e = ft.ExtItem.mapPartHeros[t];
                return ft.ExtItem.getNeedPiecesNum(e)
            }, ft.ExtHero.getCountry = function (t) {
                return ftd.Hero.get(t, "country")
            }, ft.ExtHero.getWeapon = function (t) {
                return ftd.Hero.get(t, "weapon")
            }, ft.ExtHero.getIndex = function (t) {
                return ftd.Hero.get(t, "index")
            }, ft.ExtHero.getConsumeLevel = function (t, e) {
                return {
                    ids: [ft.value.item.expMedicine1, ft.value.item.expMedicine2]
                }
            }, ft.ExtHero.calcTotalExp = function (t) {
                for (var e = 0, i = 1; i < t.lv; i++) e += ft.ExtHero.getNextExp(i);
                return e + t.exp
            }, ft.ExtHero.calcNeedExp = function (t, e) {
                var i = t.exp,
                    a = t.lv,
                    n = 0;
                if (i >= 0) {
                    var s = ft.ExtHero.getNextExp(a);
                    for (n += s - i, a++; a < e;) n += s, a++, s = ft.ExtHero.getNextExp(a);
                    return n
                }
            }, ft.ExtHero.calcExpAdd = function (t, e, i) {
                var a = t.lv,
                    n = ft.ExtHero.getNextExp(a),
                    s = 0,
                    o = e;
                if (a < i)
                    if (o >= n - t.exp) {
                        for (o -= n - t.exp, a++, n = ft.ExtHero.getNextExp(a); a < i && o - n >= 0;) o -= n, a++, n = ft.ExtHero.getNextExp(a);
                        a === i && o - n >= 0 ? (s = n - 1, o -= n) : (s = o, o = 0)
                    } else s = o + t.exp, o = 0;
                else a == i && (t.exp + e < n ? (t.exp += e, o = 0) : (t.exp = n - 1, o = e - (n - 1 - t.exp))), s = t.exp;
                return {
                    lv: a,
                    exp: s,
                    surplusExp: o
                }
            }, ft.ExtHero.calcExpSub = function (t, e) {
                e = Math.abs(e);
                var i = t.lv,
                    a = 0,
                    n = e;
                if (t.exp - e < 0) {
                    n -= t.exp, i--;
                    for (var s = ft.ExtHero.getNextExp(i); i > 0 && n - s >= 0;) n -= s, i--, s = ft.ExtHero.getNextExp(i);
                    0 === i ? (i = 1, a = 0) : (a = s - n, n = 0)
                } else a = t.exp - n, n = 0;
                return {
                    lv: i,
                    exp: a,
                    surplusExp: n
                }
            }, ft.ExtHero.calcExpDiff = function (t, e, i, a) {
                if (i < t) {
                    for (var n = 0, s = i; s < t; s++) n += ft.ExtPlayer.getNextExp(s);
                    return n + e - a
                }
                return i === t ? e - a : 0
            }, ft.ExtHero.getConsumeStar = function (t, e) {
                if (e > 0 && e <= 5) return {
                    ids: [ft.ExtItem.mapPartHeros[t]],
                    nums: [ft.value.heroStarNeed[e - 1]]
                }
            }, ft.ExtHero.getConsumeAttr = function (t, e) {
                return {
                    ids: ft.value.item.stoneAttrs,
                    upids: ft.value.item.stoneAttrUps
                }
            }, ft.ExtHero.checkCanWake = function (t) {
                return ft.ExtHero.getQuality(t) > 4 ? 1 : 4 === ft.ExtHero.getQuality(t) ? t < 1900 ? 0 : 2 : 3
            }, ft.ExtHero.isStoryHero = function (t) {
                return 1900 < t && t <= 2e3
            }, ft.ExtHero.getConsumeWake = function (t, e) {
                var i = ft.ExtHero.getCountry(t);
                if (0 < e && e <= 4) {
                    for (var a = [], n = [], s = 0; s < ft.value.com.maxHeroUp; s++) 0 !== ft.value.heroWakeupMaterialNums[e - 1][s] && (n.push(ft.value.heroWakeupMaterialNums[e - 1][s]), s < 3 ? a.push(ft.value.heroWakeupMaterialIds[i - 1][s]) : a.push(t + 1e3));
                    return {
                        ids: a,
                        nums: n
                    }
                }
            }, ft.ExtHero.getWakeAddPercent = function (t) {
                return t <= 3 ? 10 * t : 50
            }, ft.ExtHero.getInheritConsume = function (t) {
                var e, i;
                return t === ft.type.inherit.half ? ft.ExtItem.getNum(ft.value.item.inheritTicketHalf) > 0 ? (e = [ft.value.item.inheritTicketHalf], i = [1]) : (e = [ft.value.item.gold], i = [ft.value.com.inheritGold]) : t === ft.type.inherit.all && (ft.ExtItem.getNum(ft.value.item.inheritTicketAll) > 0 ? (e = [ft.value.item.inheritTicketAll], i = [1]) : (e = [ft.value.item.gem], i = [ft.value.com.inheritGem])), {
                    ids: e,
                    nums: i
                }
            }, ft.ExtHero.checkCanStarMax = function (t) {
                var e = ft.ExtItem.mapPartHeros[t.id],
                    i = ft.ExtItem.getNum(e);
                i += 10;
                for (var a = 0; a < t.star; a++) i += ft.value.heroStarNeed[a];
                return i >= 160
            }, ft.ExtHero.getPieceNum = function (t, e) {
                var i = ft.ExtItem.mapPartHeros[t.id],
                    a = ft.ExtItem.getNum(i, e);
                a += 10;
                for (var n = 0; n < t.star; n++) a += ft.value.heroStarNeed[n];
                return a
            }, ft.ExtHero.getHeroesCount = function (t, e) {
                for (var i = 0, a = 0; a < t.length; a++) ft.ExtHero.getCountry(t[a]) === e && i++;
                return i
            }, ft.ExtHero.getTitles = function (t) {
                return ftd.Hero.get(t, "a_title")
            }, ft.ExtHero.getProfession = function (t) {
                return ftd.Hero.get(t, "profession")
            }, ft.ExtHero.getDifficultyLevel = function (t) {
                return ftd.Hero.get(t, "difficultylevel")
            }
        