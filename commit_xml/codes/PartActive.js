
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    progressBar: cc.ProgressBar,
                    labelNumTotal: cc.Label,
                    nodeBoxes: [cc.Node],
                    buttonBoxes: [cc.Button],
                    labelNums: [cc.Label],
                    labelTip: cc.Label,
                    listView: ftc.ListView
                },
                init: function () {
                    for (var t = 0; t < this.buttonBoxes.length; t++) this.addClick(this.buttonBoxes[t])
                },
                load: function () {
                    this.vitality = void 0
                },
                setData: function (t) {
                    this.type = t;
                    var e = ftc.ManagerData.get2("Achievement"),
                        i = [];
                    for (var a in e) {
                        if (ft.ExtAchievement.getType(e[a].id) === this.type)
                            if (1 === ft.ExtAchievement.getSubtype(e[a].id)) {
                                var n = this.newListData(e[a]);
                                n && i.push(n)
                            } else this.vitality = e[a]
                    }
                    i.length > 0 ? (this.labelTip.node.active = !1, i.sort(function (t, e) {
                        return e.ste - t.ste
                    }), this.listView.setListView(i)) : (this.labelTip.node.active = !0, this.listView.setListView([])), this.updateData()
                },
                newListData: function (t) {
                    for (var e = ft.ExtAchievement.getConditions(t.id), i = t.ste.split(","), a = !0, n = 0; n < e.length; n++)
                        if (0 == i[n] || !i[n]) {
                            a = !1;
                            break
                        } if (!a) {
                            for (var s = -1, o = 0; o < i.length; o++) {
                                var r = Number(i[o]);
                                if (!(r > 0)) break;
                                s++
                            }
                            var c = -1;
                            for (o = 0; o < e.length && t.ext >= e[o]; o++) c++;
                            return r = c > s ? 1 : 0, {
                                id: t.id,
                                ext: t.ext,
                                cur: c,
                                index: s,
                                ste: r
                            }
                        }
                },
                cleanup: function () { },
                updateData: function (t) {
                    if (this.vitality) {
                        var e = (o = ft.ExtAchievement.getConditions(this.vitality.id))[o.length - 1];
                        this.labelNumTotal.string = this.vitality.ext, this.progressBar.progress = this.vitality.ext / e, this.boxStes = [];
                        for (var i = 0, a = o.length; i < a; i++) {
                            this.nodeBoxes[i].active = !0;
                            var n = this.progressBar.node.width * (o[i] / e);
                            this.buttonBoxes[i].node.x = n, this.labelNums[i].node.x = n, this.labelNums[i].string = o[i], this.boxStes[i] = ft.ExtAchievement.getStatus(this.vitality, i), this.buttonBoxes[i].node.stopAllActions(), this.buttonBoxes[i].node.scale = 1, 1 === this.boxStes[i] && this.buttonBoxes[i].node.runAction(cc.sequence(cc.scaleTo(.5, 1.2), cc.scaleTo(.5, 1)).repeatForever()), this.buttonBoxes[i].interactable = 2 !== this.boxStes[i]
                        }
                        for (i = o.length; i < this.buttonBoxes.length; i++) this.nodeBoxes[i].active = !1
                    }
                    if (void 0 !== t && t.id !== this.vitality.id) {
                        var s = ftc.ManagerData.get2Object("Achievement")[t.id],
                            o = ft.ExtAchievement.getConditions(s.id),
                            r = this.listView.getDatas();
                        for (i = 0; i < r.length; i++)
                            if (r[i].id === s.id) {
                                for (var c = s.ste.split(","), h = !0, f = 0; f < o.length; f++)
                                    if (0 == c[f] || !c[f]) {
                                        h = !1;
                                        break
                                    } if (h) this.listView.deleteListViewItem(i), this.labelTip.node.active = 0 === this.listView.getDatas().length;
                                else {
                                    var d = this.newListData(s);
                                    1 === d.ste ? this.listView.updateListViewItem(i, this.newListData(s)) : (r[i] = d, r.sort(function (t, e) {
                                        return e.ste - t.ste
                                    }), this.listView.setListView(r))
                                }
                                break
                            }
                    }
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    for (var i = 0; i < this.buttonBoxes.length; i++)
                        if (t.target === this.buttonBoxes[i].node) {
                            if (2 === this.boxStes[i]) ftc.showTip("\u5df2\u9886\u53d6");
                            else if (1 === this.boxStes[i]) ftc.send("achievementGet", {
                                id: this.vitality.id,
                                index: i
                            }), ftc.playEffect(ftc.type.effect.openBox);
                            else {
                                var a = ft.ExtAchievement.getAwards(this.vitality.id)[i],
                                    n = ft.ExtAward.getIdNumsPreview(a);
                                ftc.loadLayout("LayoutAwardPreview", function (t) {
                                    t.setData(n)
                                })
                            }
                            break
                        }
                }
            })
        