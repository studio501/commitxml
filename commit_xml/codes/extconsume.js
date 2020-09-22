
            
             ft.ExtConsume = {}, ft.ExtConsume.load = function () {
                if (!this.mapModuleOut)
                    for (var t in this.mapModuleOut = {}, ftd.Consume.data) {
                        var e = ftd.Consume.get(t, "a_item1")[0];
                        this.mapModuleOut[e] = this.getOut(t)
                    }
            }, ft.ExtConsume.getType = function (t) {
                return ftd.Consume.get(t, "type")
            }, ft.ExtConsume.getItems = function (t, e) {
                return {
                    ids: ftd.Consume.get(t, "a_item" + e),
                    nums: ftd.Consume.get(t, "a_itemnum" + e)
                }
            }, ft.ExtConsume.getOut = function (t) {
                return ftd.Consume.get(t, "out")
            }, ftc && (ft.ExtConsume.getRecipesByType = function (t) {
                var e = [];
                if (t === ft.type.compose.jewel)
                    for (var i in ftd.Jeweltype.data) e.push(Number(i));
                else {
                    for (var i in ftd.Consume.data) this.getType(i) === t && e.push(i);
                    if (t === ft.type.compose.equip) {
                        var a = [],
                            n = [];
                        for (i = 0; i < e.length; i++) ft.ExtConsume.checkIsLock(e[i]) ? n.push(e[i]) : a.push(e[i]);
                        e = a.concat(n)
                    }
                }
                return e
            }, ft.ExtConsume.checkIsLock = function (t) {
                var e = !1;
                if (this.getType(t) === ft.type.consume.equip)
                    for (var i = this.getItems(t, 1), a = 0; a < i.ids.length; a++) {
                        var n = ftc.ManagerData.get2Object("Item", i.ids[a]);
                        if (!n || n.num + n.consume < i.nums[a]) {
                            e = !0;
                            break
                        }
                    }
                return e
            }, ft.ExtConsume.getCondition = function (t) {
                if (this.getType(t) === ft.type.consume.equip) {
                    var e = this.getItems(t, 1);
                    return "拥有" + ft.ExtItem.getName(e.ids[0]) + "后解锁"
                }
                return ""
            })
        