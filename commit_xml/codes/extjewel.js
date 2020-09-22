
            
             ft.ExtJewel = {}, ftc && (ft.ExtJewel.getJewelsByEquip = function (t) {
                var e = ftc.ManagerData.get2("Jewel"),
                    i = [0, 0, 0];
                for (var a in e) {
                    var n = e[a];
                    t.jewelPos == n.pos && (i[n.slot] = n)
                }
                return i
            }, ft.ExtJewel.getColorType = function (t) {
                var e = this.getName(t);
                return e.startsWith("绿") ? ft.type.jewel.green : e.startsWith("蓝") ? ft.type.jewel.blue : e.startsWith("紫") ? ft.type.jewel.violet : e.startsWith("黄") ? ft.type.jewel.yellow : void 0
            }, ft.ExtJewel.getJewel = function (t, e) {
                var i = ftc.ManagerData.get2("Jewel");
                for (var a in i) {
                    var n = i[a];
                    if (n.pos == t.jewelPos && n.slot === e) return n
                }
                return null
            }, ft.ExtJewel.getIconSprite = function (t) {
                var e = ftd.Jewel.get(t, "img");
                return ftc.ManagerRes.getSpriteFrame("icon_goods", "goods_" + e)
            }, ft.ExtJewel.getNum = function (t) {
                var e = ftc.ManagerData.get2("Jewel")[t];
                return e ? e.num : 0
            }), ft.ExtJewel.load = function () {
                if (!ft.ExtJewel.mapJewelConsume) {
                    for (var t in ft.ExtJewel.mapJewelConsume = {}, ftd.Consume.data)
                        if (ft.ExtConsume.getType(t) === ft.type.compose.jewel) {
                            var e = ft.ExtConsume.getItems(t, 1),
                                i = ft.ExtItem.getJewel(e.ids[0]),
                                a = e.nums[0];
                            ft.ExtJewel.mapJewelConsume[i] = {
                                need: a,
                                out: ft.ExtConsume.getOut(t),
                                recipeId: t
                            }
                        } var n = JSON.parse(ft.ExtMsg.getBase({
                            id: ft.value.msg.jewelExchange
                        }));
                    ft.ExtJewel.mapEquipJewel = {};
                    for (t = 0; t < n.switchId2s.length; t++)
                        for (var s = 0; s < n.switchId2s[t].length; s++) ft.ExtJewel.mapEquipJewel[n.switchId2s[t][s]] = {
                            ids: n.id2s[t],
                            nums: n.num2s[t]
                        }
                }
            }, ft.ExtJewel.getJewels = function (t, e, i) {
                var a = ftc.ManagerData.get2("Jewel"),
                    n = [];
                for (var s in a) - 1 !== a[s].pos || t && ft.ExtJewel.getColorType(a[s].id) !== t || e && (!ft.ExtJewel.mapJewelConsume[a[s].id] || this.getType(a[s].id) !== i) || n.push(a[s]);
                return n.sort(function (t, e) {
                    var i = ft.ExtJewel.getType(t.id),
                        a = ft.ExtJewel.getType(e.id);
                    return i === a ? ft.ExtJewel.getPropValue(e.id) - ft.ExtJewel.getPropValue(t.id) : i - a
                }), n
            }, ft.ExtJewel.getName = function (t) {
                return ftd.Jewel.get(t, "name")
            }, ft.ExtJewel.getValueInfo = function (t) {
                var e = this.getPropType(t),
                    i = this.getPropValue(t);
                return 3 === ft.ExtPropName.getType(e) && (i += "%"), ft.ExtPropName.getName(e) + " +" + i
            }, ft.ExtJewel.getInfo = function (t) {
                var e = this.getPropType(t),
                    i = this.getPropValue(t);
                return 3 === ft.ExtPropName.getType(e) && (i += "%"), ftd.Jeweltype.get(this.getType(t), "info") + "\n\n" + ft.ExtPropName.getName(e) + " " + i
            }, ft.ExtJewel.getType = function (t) {
                return ftd.Jewel.get(t, "type")
            }, ft.ExtJewel.getPropType = function (t) {
                return ftd.Jewel.get(t, "proptype")
            }, ft.ExtJewel.getPropValue = function (t) {
                return ftd.Jewel.get(t, "propvalue")
            }, ft.ExtJewel.getSelfValue = function (t, e) {
                return this.getPropType(t.id) == e ? this.getPropValue(t.id) : 0
            }, ft.ExtJewel.getDecomposePreview = function (t) {
                var e = ft.ExtItem.mapJewels[t],
                    i = ftd.Item.get(e, "decompose");
                if (i) return ft.ExtAward.getIdNumsPreview(i)
            }
        