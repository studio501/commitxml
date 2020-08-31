
            
             ft.ExtItem = {}, ft.ExtItem.load = function () {
                if (!ft.ExtItem.mapWholeEquips) {
                    for (var t in ft.ExtItem.mapPartEquips = {}, ft.ExtItem.mapPartHeros = {}, ft.ExtItem.mapWholeEquips = {}, ft.ExtItem.mapWholePets = {}, ft.ExtItem.mapHeroSpirit = {}, ft.ExtItem.mapHeroBiography = {}, ft.ExtItem.mapHeroLord = {}, ft.ExtItem.mapJewels = {}, ft.ExtItem.mapHeroBattleSkin = {}, ftd.Item.data) {
                        var e = ftd.Item.get(t, "type");
                        if (e == ft.type.item.piece) (i = ftd.Item.get(t, "equip")) ? ft.ExtItem.mapPartEquips[i] = t : (i = ftd.Item.get(t, "hero")) && (ft.ExtItem.mapPartHeros[i] = t);
                        else if (e == ft.type.item.whole) {
                            (i = ftd.Item.get(t, "equip")) ? ft.ExtItem.mapWholeEquips[i] = t : (i = ftd.Item.get(t, "pet")) ? ft.ExtItem.mapWholePets[i] = t : (i = ftd.Item.get(t, "jewel")) && (ft.ExtItem.mapJewels[i] = t)
                        } else if (e == ft.type.item.spirit) {
                            (i = ftd.Item.get(t, "hero")) && (ft.ExtItem.mapHeroSpirit[i] = t)
                        } else if (e == ft.type.item.biography) {
                            (i = ftd.Item.get(t, "hero")) && (ft.ExtItem.mapHeroBiography[i] = t)
                        } else if (e == ft.type.item.lord) {
                            (i = ftd.Item.get(t, "hero")) && (ft.ExtItem.mapHeroLord[i] = t)
                        } else if (e == ft.type.item.battleSkin) {
                            var i;
                            (i = ftd.Item.get(t, "hero")) && (ft.ExtItem.mapHeroBattleSkin[i] ? ft.ExtItem.mapHeroBattleSkin[i].push(t) : ft.ExtItem.mapHeroBattleSkin[i] = [0, t])
                        }
                    }
                    ft.ExtItem.mapForbidOther = {}, ft.ExtItem.mapForbidOther[ft.type.map.xswj] = 1, ft.ExtItem.mapForbidOther[ft.type.map.qjqc] = 1, ftc && fts && (ft.ExtItem.mapdata = {
                        mapPartEquips: ft.ExtItem.mapPartEquips,
                        mapPartHeros: ft.ExtItem.mapPartHeros,
                        mapWholeEquips: ft.ExtItem.mapWholeEquips,
                        mapWholePets: ft.ExtItem.mapWholePets,
                        mapHeroSpirit: ft.ExtItem.mapHeroSpirit,
                        mapHeroBiography: ft.ExtItem.mapHeroBiography,
                        mapHeroLord: ft.ExtItem.mapHeroLord,
                        mapJewels: ft.ExtItem.mapJewels
                    }, fts.loadMemoryValues(ft.ExtItem, "mapdata"), ft.ExtItem.mapPartEquips = ft.ExtItem.mapdata.mapPartEquips, ft.ExtItem.mapPartHeros = ft.ExtItem.mapdata.mapPartHeros, ft.ExtItem.mapWholeEquips = ft.ExtItem.mapdata.mapWholeEquips, ft.ExtItem.mapWholePets = ft.ExtItem.mapdata.mapWholePets, ft.ExtItem.mapHeroSpirit = ft.ExtItem.mapdata.mapHeroSpirit, ft.ExtItem.mapHeroBiography = ft.ExtItem.mapdata.mapHeroBiography, ft.ExtItem.mapHeroLord = ft.ExtItem.mapdata.mapHeroLord, ft.ExtItem.mapJewels = ft.ExtItem.mapdata.mapJewels)
                }
            }, ft.ExtItem.getName = function (t) {
                return 99 == ftc.getSourceId() ? ftd.Item.get(t, "name") + "(" + t + ")" : ftd.Item.get(t, "name")
            }, ft.ExtItem.getNum = function (t, e) {
                var i = 0;
                if (ftc && (e = ftc.ManagerData.get2Object("Item")), !e) return 0;
                var a, n = e[t];
                return n && (i += n.num), t == ft.value.item.gem ? a = e[ft.value.item.gem2] : t == ft.value.item.gem2 && (a = e[ft.value.item.gem]), a && (i += a.num), i
            }, ftc && (ft.ExtItem.getIconSprite = function (t) {
                var e = ftd.Item.get(t, "type");
                if (e == ft.type.item.piece || e == ft.type.item.whole) {
                    var i = ftd.Item.get(t, "hero");
                    if (i) return ft.ExtHero.getIconSprite(i);
                    if (i = ftd.Item.get(t, "equip")) return ft.ExtEquip.getIconSprite(i);
                    if (i = ftd.Item.get(t, "pet")) return ft.ExtPet.getIconSprite(i)
                }
                var a = ftd.Item.get(t, "img");
                return ftc.ManagerRes.getSpriteFrame("icon_goods", "goods_" + a)
            }, ft.ExtItem.getLittleIconSprite = function (t) {
                var e = ftd.Item.get(t, "img"),
                    i = ftc.ManagerRes.getSpriteFrame("program", "icon_" + e);
                return i || ft.ExtItem.getIconSprite(t)
            }, ft.ExtItem.getQualitySprite = function (t) {
                var e = ftd.Item.get(t, "type");
                if (e == ft.type.item.piece || e == ft.type.item.whole) {
                    var i = ftd.Item.get(t, "hero");
                    if (i) return ft.ExtHero.getQualitySprite(i, !0);
                    if (i = ftd.Item.get(t, "equip")) return ft.ExtEquip.getQualitySprite(i);
                    if (i = ftd.Item.get(t, "pet")) return ft.ExtPet.getQualitySprite(i)
                }
                return ftc.ManagerRes.getSpriteFrame("program", "common_icon_bg1")
            }, ft.ExtItem.getInfo = function (t) {
                if (ftd.Item.get(t, "type") == ft.type.item.whole) {
                    var e = ftd.Item.get(t, "hero");
                    if (e) return ft.ExtHero.getInfo(e);
                    if (e = ftd.Item.get(t, "equip")) return ft.ExtEquip.getInfo(e);
                    if (e = ftd.Item.get(t, "pet")) return ft.ExtPet.getInfo(e)
                }
                return ft.replaceAll(ftd.Item.get(t, "info"), "|", "\n")
            }, ft.ExtItem.getGem = function () {
                return ft.ExtItem.getNum(ft.value.item.gem)
            }, ft.ExtItem.getGold = function () {
                return ft.ExtItem.getNum(ft.value.item.gold)
            }, ft.ExtItem.getPower = function () {
                return ft.ExtItem.getNum(ft.value.item.power)
            }, ft.ExtItem.getMark = function (t) {
                return ftd.Item.get(t, "mark")
            }, ft.ExtItem.getMarkSprite = function (t) {
                var e = ft.ExtItem.getMark(t);
                return e ? ftc.ManagerRes.getSpriteFrame("program", "common_mark_" + e) : null
            }, ft.ExtItem.checkRedPoint = function (t) {
                var e = !1,
                    i = ft.ExtItem.getHero(t);
                if (i) {
                    var a = ft.ExtHero.getHero(i),
                        n = ft.ExtItem.mapPartHeros[i],
                        s = ft.ExtItem.getNum(n),
                        o = 0;
                    a ? a.star < ft.value.com.maxHeroStar && (o = ft.value.heroStarNeed[a.star]) : o = ft.ExtItem.getNeedPiecesNum(n), o > 0 && s >= o && (e = !0)
                }
                if (i = ft.ExtItem.getEquip(t)) {
                    n = ft.ExtItem.mapPartEquips[i];
                    e = (s = ft.ExtItem.getNum(n)) >= (o = ft.ExtItem.getNeedPiecesNum(n))
                }
                return e
            }, ft.ExtItem.getItemPieces = function (t) {
                var e = ftc.ManagerData.get2("Item"),
                    i = [],
                    a = [];
                for (var n in e) e[n].num > 0 && ft.ExtItem.getType(e[n].id) === ft.type.item.piece && (t && 2 !== t || !ft.ExtItem.getEquip(e[n].id) || i.push({
                    kind: 1,
                    data: e[n]
                }), t && 1 !== t || !ft.ExtItem.getHero(e[n].id) || a.push({
                    kind: 1,
                    data: e[n]
                }));
                var s = function (t, e) {
                    return ft.ExtItem.getQuality(t.data.id) === ft.ExtItem.getQuality(e.data.id) ? e.data.num - t.data.num : ft.ExtItem.getQuality(e.data.id) - ft.ExtItem.getQuality(t.data.id)
                };
                return i.sort(s), a.sort(s), i.concat(a)
            }, ft.ExtItem.getRmb = function () {
                return this.getNum(ft.value.item.rmb) + ftc.ManagerData.get1("Player").rmb
            }), ft.ExtItem.getSaleGold = function (t) {
                return ftd.Item.get(t, "salegold")
            }, ft.ExtItem.getBuyGold = function (t) {
                return ftd.Item.get(t, "buygold")
            }, ft.ExtItem.getBuyGem = function (t) {
                return ftd.Item.get(t, "buyjade")
            }, ft.ExtItem.getType = function (t) {
                return ftd.Item.get(t, "type")
            }, ft.ExtItem.getMapTypes = function (t) {
                return ftd.Item.get(t, "a_maptype")
            }, ft.ExtItem.getHero = function (t) {
                return ftd.Item.get(t, "hero")
            }, ft.ExtItem.getEquip = function (t) {
                return ftd.Item.get(t, "equip")
            }, ft.ExtItem.getTitle = function (t) {
                return ftd.Item.get(t, "title")
            }, ft.ExtItem.getJewel = function (t) {
                return ftd.Item.get(t, "jewel")
            }, ft.ExtItem.getSkill = function (t) {
                return ftd.Item.get(t, "skill")
            }, ft.ExtItem.getQuality = function (t) {
                var e = ftd.Item.get(t, "type");
                if (e == ft.type.item.piece || e == ft.type.item.whole) {
                    var i = ftd.Item.get(t, "equip");
                    if (i) return ft.ExtEquip.getQuality(i);
                    var a = ftd.Item.get(t, "hero");
                    if (a) return ft.ExtHero.getQuality(a)
                }
                return 0
            }, ft.ExtItem.getNeedPiecesNum = function (t) {
                return ftd.Item.get(t, "c_work")
            }, ft.ExtItem.getPet = function (t) {
                return ftd.Item.get(t, "pet")
            }, ft.ExtItem.getDecomposePreview = function (t) {
                var e = ftd.Item.get(t, "decompose");
                if (e) return ft.ExtAward.getIdNumsPreview(e)
            }, ft.ExtItem.getParamIds = function (t) {
                return ftd.Item.get(t, "a_paramid")
            }, ft.ExtItem.getParamNums = function (t) {
                return ftd.Item.get(t, "a_paramnum")
            }, ft.ExtItem.getDecompose = function (t) {
                return ftd.Item.get(t, "decompose")
            }, ft.ExtItem.getTopLimit = function (t) {
                return ftd.Item.get(t, "toplimit")
            }, ft.ExtItem.getIndex = function (t) {
                var e = ftd.Item.get(t, "index");
                return ft.isNumber(e) ? e : 9999
            }, ft.ExtItem.isGem = function (t) {
                return t == ft.value.item.gem || t == ft.value.item.gem2
            }, ft.ExtItem.getImg = function (t) {
                return ftd.Item.get(t, "img")
            }
        