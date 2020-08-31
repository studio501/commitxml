
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    labelTitle: cc.Label,
                    listView: ftc.ListView,
                    scrollView: cc.ScrollView,
                    labelProbability1: cc.Label,
                    nodeLayout: cc.Node,
                    labelProbability2: cc.Label,
                    labelHeroes: cc.Label,
                    labelDesc: cc.Label,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.prepareParts(["PartVisitPreviewHero"]), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    ftc.setTvTip(this.node)
                },
                setData: function (t) {
                    0 === t ? (this.labelTitle.string = ftc.language("\u7a00\u6709\u5956\u52b1\u9884\u89c8"), this.loadVisitPreview()) : (this.labelTitle.string = ftc.language("\u5956\u52b1\u9884\u89c8"), this.loadVisitLimitedPreview()), this.listView.node.active = 0 === t, this.scrollView.node.active = 1 === t
                },
                loadVisitPreview: function () {
                    var t = [],
                        e = [],
                        i = [],
                        a = ftc.ManagerData.get2Object("Hero");
                    for (var n in ftd.Visit.data) {
                        var s = ft.ExtVisit.getType(n);
                        if (s === ft.type.visit.gold || s === ft.type.visit.gem) {
                            var o = ft.ExtVisit.getItem(n),
                                r = ft.ExtItem.getHero(o);
                            if (r && ft.ExtHero.getQuality(r) >= ft.type.quality.violet) {
                                var c = a[r];
                                if (ft.ExtItem.getNum(o) >= 160 || c && ft.ExtHero.checkCanStarMax(c)) {
                                    for (var h = !1, f = 0; f < i.length; f++)
                                        if (i[f].id === r) {
                                            h = !0;
                                            break
                                        } h || i.push({
                                            id: r,
                                            isOpen: !1,
                                            tip: "\u5df2\u62e5\u6709"
                                        });
                                    continue
                                }
                                var d = !1;
                                for (f = 0; f < t.length; f++)
                                    if (t[f].id === r) {
                                        d = !0;
                                        break
                                    } if (d) continue;
                                var l = ft.ExtVisit.getCondition(n);
                                if (l) {
                                    var u = l.split(","),
                                        p = Number(u[0]),
                                        g = Number(u[1]),
                                        m = Number(u[2]);
                                    if (p > 0) {
                                        if (ftc.ManagerData.get1("Player").level < p) {
                                            e.push({
                                                id: r,
                                                isOpen: !1,
                                                tip: p + "\u7ea7\u540e\u5f00\u653e"
                                            });
                                            continue
                                        }
                                    } else if (!ft.ExtHero.getHero(r) || ft.ExtHero.getHero(r).star < g || ftc.ManagerData.get1("Player").samsara < m) {
                                        var b = "";
                                        g > 0 && (b += "\u6b66\u5c06" + g + "\u661f"), m > 0 && (b += m + "\u5468\u76ee"), e.push({
                                            id: r,
                                            isOpen: !1,
                                            tip: b + "\u540e\u5f00\u653e"
                                        });
                                        continue
                                    }
                                }
                                t.push({
                                    id: r,
                                    isOpen: !0
                                })
                            }
                        }
                    }
                    var v = function (t, e) {
                        return ft.ExtHero.getIndex(t.id) - ft.ExtHero.getIndex(e.id)
                    };
                    t.sort(v), e.sort(v), i.sort(v), this.listView.setListView(t.concat(e).concat(i)), this.updateTv(t.length)
                },
                loadVisitLimitedPreview: function () {
                    var t = ft.ExtMsg.getMsgByType(ft.type.activity.limitedVisit);
                    if (t) {
                        var e = ft.ExtMsg.getActivityData(t),
                            i = e.ids;
                        ftc.ManagerRes.restoreNodeChildren(this.nodeLayout);
                        for (var a = 0; a < i.length; a++) {
                            var n = ft.ExtVisit.getItem(i[a]);
                            if (h = ft.ExtItem.getHero(n)) {
                                var s = this.newPart("PartVisitPreviewHero");
                                s.setData({
                                    id: h,
                                    isOpen: !0
                                }), s.node.y = 16, this.nodeLayout.addChild(s.node)
                            }
                        }
                        var o = [],
                            r = [],
                            c = [];
                        for (var a in ftd.Visit.data) {
                            if (ft.ExtVisit.getType(a) === ft.type.visit.limited) {
                                var h;
                                n = ft.ExtVisit.getItem(a);
                                if (h = ft.ExtItem.getHero(n)) {
                                    var f = ft.ExtVisit.getCondition(a);
                                    if (f && -1 === e.noConditions.indexOf(parseInt(a))) {
                                        var d = f.split(",");
                                        Number(d[1]) > 0 && c.push(ft.ExtHero.getName(h))
                                    }
                                    if (-1 === i.indexOf(Number(a))) {
                                        var l = ft.ExtHero.getName(h); - 1 === c.indexOf(l) && o.push(ft.ExtHero.getName(h))
                                    }
                                    ft.ExtHero.getRarity(h) >= ft.type.rarity.rare && r.push(ft.ExtHero.getName(h))
                                }
                            }
                        }
                        this.labelHeroes.string = c.join("/") + "(\u4ee5\u4e0a\u6b66\u5c06\u9700\u8981\u4e09\u661f\u540e\u5f00\u542f)\n\n" + o.join("/");
                        var u = "\u6c42\u8d24\u82e5\u6e34\u4e2d\uff0c\u5982\u679c\u8fde\u7eed5\u6b21\u6ca1\u6709\u83b7\u5f97\u7a00\u6709\u6b66\u5c06\u788e\u7247\uff0c\u5219\u4e0b\u4e00\u6b21\u5fc5\u5b9a\u83b7\u5f97\u7a00\u6709\u6b66\u5c06\u788e\u7247\u3002\n\n";
                        u += "\u7a00\u6709\u6b66\u5c06\u5305\u62ec:\n" + r.join("/"), this.labelDesc.string = u
                    }
                },
                updateTv: function (t) {
                    t && ftc.ManagerTV.nextSelect(this.listView.getItem(0).buttonSelf)
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectVisitPreviewItem: function (t, e) {
                            t.data.entityId ? (ftc.send("c_onSelectListHeroItem", t, "LayoutSetting"), this.cancel()) : t.data.isOpen || ftc.showTip(t.data.tip)
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.buttonClose.node && this.cancel()
                }
            })
        