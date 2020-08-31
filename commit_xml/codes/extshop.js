
            
             ft.ExtShop = {}, ftc && (ft.ExtShop.getShopDatas = function (t) {
                if (1 === ft.ExtShop.getType(t)) {
                    for (var e = ftd.Shop.get(t, "a_item"), i = ftd.Shop.get(t, "a_itemnum"), a = ftd.Shop.get(t, "a_itemcount"), n = ftd.Shop.get(t, "size"), s = [], o = 0; o < n; o++) s.push({
                        id: e[o],
                        num: i[o],
                        count: a[o]
                    });
                    return s
                }
                var r = ftc.ManagerData.get2Object("Shop", t);
                if (r) {
                    if (t == ft.value.shop.mystery) {
                        var c = Math.floor((ftc.getLocalTime() + 28800) / 43200);
                        if (r.refreshHour !== c) return
                    }
                    if (r.itemIds.length > 0) {
                        var h = !1;
                        t == ft.value.shop.mystery && (h = !0);
                        s = [], e = r.itemIds.split(","), i = r.itemNums.split(","), a = r.counts.split(",");
                        var f = r.currencyIds.split(","),
                            d = r.currencyNums.split(",");
                        for (o = 0; o < e.length; o++) {
                            var l, u = e[o],
                                p = Number(i[o]),
                                g = ft.ExtItem.getBuyGem(u);
                            if (g > 0) l = g * p;
                            else {
                                var m = ft.ExtItem.getBuyGold(u);
                                m > 0 && (l = m * p)
                            }
                            h ? s.push({
                                id: u,
                                num: p,
                                count: a[o],
                                currency: f[o],
                                currencyNum: d[o],
                                oldCurrencyNum: l
                            }) : s.push({
                                id: u,
                                num: p,
                                count: a[o],
                                currency: f[o],
                                currencyNum: d[o]
                            })
                        }
                        return s
                    }
                }
            }), ft.ExtShop.getName = function (t) {
                return ftd.Shop.get(t, "name")
            }, ft.ExtShop.getType = function (t) {
                return ftd.Shop.get(t, "type")
            }, ft.ExtShop.getCity = function (t) {
                return ftd.Shop.get(t, "city")
            }, ft.ExtShop.checkCanBuy = function (t, e) {
                var i = ft.ExtItem.getParamIds(t),
                    a = 0,
                    n = 0,
                    s = 4;
                12015 == t && (s = 3);
                for (var o = 0; o < i.length; o++) {
                    var r = e[ft.ExtItem.getHero(i[o])];
                    r && (r.star >= 3 && a++, r.up >= s && n++)
                }
                return a >= 3 && n >= 1
            }
        