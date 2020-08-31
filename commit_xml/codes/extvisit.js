
            
             ft.ExtVisit = {}, ftc && (ft.ExtVisit.checkCanFreeVisit = function () {
                if (ftc.localDay > 0) {
                    var t = ftc.ManagerData.get1("ManagerVisit");
                    if (t.freeGoldVisit < ft.value.visit.freeGoldTimes || ftc.getLocalTime() - t.freeGemVisitTime > ft.value.visit.freeGemCoolDown) return !0
                }
                return !1
            }), ft.ExtVisit.getItem = function (t) {
                return ftd.Visit.get(t, "item")
            }, ft.ExtVisit.getNum = function (t) {
                return ftd.Visit.get(t, "itemnum")
            }, ft.ExtVisit.getProbability = function (t) {
                return ftd.Visit.get(t, "probability")
            }, ft.ExtVisit.getWeight = function (t) {
                return ftd.Visit.get(t, "weight")
            }, ft.ExtVisit.getType = function (t) {
                return ftd.Visit.get(t, "type")
            }, ft.ExtVisit.isMust = function (t) {
                return 1 == ftd.Visit.get(t, "lx")
            }, ft.ExtVisit.getCondition = function (t) {
                return ftd.Visit.get(t, "condition")
            }, ft.ExtVisit.isRare = function (t) {
                var e = ft.ExtVisit.getItem(t),
                    i = ft.ExtItem.getHero(e);
                return ft.ExtHero.getRarity(i) >= ft.type.rarity.rare
            }
        