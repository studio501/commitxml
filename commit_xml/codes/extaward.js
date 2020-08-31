
            
             ft.ExtAward = {}, ftc && (ft.ExtAward.isFirstAward = function (t) {
                return !ftc.ManagerData.get2Object("Award", t)
            }), ft.ExtAward.getIdNumsPreview = function (t, e) {
                if (!t) return !1;
                ft.isObject(t) || (t = [t]);
                for (var i = [], a = [], n = [], s = 0; s < t.length; s++) {
                    for (var o = ftd.Award.get(t[s], "a_item"), r = ftd.Award.get(t[s], "a_itemnum"), c = ftd.Award.get(t[s], "a_itemprobability"), h = 0; h < o.length; h++) {
                        var f = i.indexOf(o[h]); - 1 == f ? (i.push(o[h]), a.push(r[h]), n.push(c[h])) : 100 == n[f] && 100 == c[h] || n[f] < 100 && c[h] < 100 ? a[f] += r[h] : (i.push(o[h]), a.push(r[h]), n.push(c[h]))
                    }
                    var d = ftd.Award.get(t[s], "a_item0");
                    if (d && e) {
                        e.ids || (e.ids = [], e.nums = []);
                        var l = ftd.Award.get(t[s], "a_itemnum0");
                        e.ids = e.ids.concat(d), e.nums = e.nums.concat(l)
                    }
                }
                return {
                    ids: i,
                    nums: a,
                    gls: n
                }
            }, ft.ExtAward.getType = function (t) {
                return ftd.Award.get(t, "type")
            }, ft.ExtAward.getFirstAward = function (t) {
                var e = ftd.Award.get(t, "a_item0");
                if (e && e.length > 0) return {
                    ids: e,
                    nums: ftd.Award.get(t, "a_itemnum0")
                }
            }
        