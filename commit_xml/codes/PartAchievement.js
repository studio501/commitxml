
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    listView: ftc.ListView,
                    progressBar: cc.ProgressBar,
                    labelNumTotal: cc.Label,
                    nodeBoxes: [cc.Node],
                    buttonBoxes: [cc.Button],
                    labelNums: [cc.Label],
                    labelInfo: cc.Label,
                    labelProgress: cc.Label,
                    buttonDetail: cc.Button,
                    nodeLayout: cc.Node,
                    buttonGet: cc.Button,
                    spriteGet: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonGet, !0), this.addClick(this.buttonDetail, !0);
                    for (var t = 0; t < this.buttonBoxes.length; t++) this.addClick(this.buttonBoxes[t]);
                    ftc.isTv() && (this.buttonDetail.node.active = !1)
                },
                load: function () {
                    this.unfinishedTasks = void 0, this.achievement = void 0, this.selectedAchievement = void 0, this.tabIndex = void 0;
                    for (var t = 0; t < this.nodeBoxes.length; t++) this.nodeBoxes[t].active = !1;
                    this.datas = [ft.type.achievement.growth, ft.type.achievement.challenge, ft.type.achievement.collect], this.selectedIndexs = [0, 0, 0], this.selectTab(0), this.updateData()
                },
                setData: function (t) {
                    this.updateData()
                },
                selectTab: function (t) {
                    var e = this.datas[t];
                    if ("number" == typeof e)
                        if (void 0 === this.tabIndex || this.tabIndex !== e) {
                            this.tabIndex = e, this.datas = this.getDatas(e);
                            var i = e + this.selectedIndexs[this.tabIndex - 1];
                            this.listView.setListView(this.datas, {
                                index1: this.tabIndex,
                                index2: i
                            }), this.datas[i] && this.setAchievementInfo(this.datas[i]), ftc.isTv() && (this.listView.getItem(i) ? ftc.ManagerTV.nextSelect(this.listView.getItem(i).button2) : ftc.ManagerTV.nextSelect())
                        } else this.datas = [ft.type.achievement.growth, ft.type.achievement.challenge, ft.type.achievement.collect], this.listView.setListView(this.datas), this.tabIndex = void 0, this.selectedAchievement = void 0, this.listView.getItem(t) && ftc.ManagerTV.nextSelect(this.listView.getItem(t).button1);
                    else {
                        for (var a = -1, n = 0; n < this.datas.length && (!ft.isObject(this.datas[n]) || (a++, this.datas[n].id !== e.id)); n++);
                        this.selectedIndexs[this.tabIndex - 1] = a, this.listView.updateListViewItems({
                            index1: this.tabIndex,
                            index2: t
                        }), this.setAchievementInfo(e)
                    }
                },
                getDatas: function (t) {
                    var e = [ft.type.achievement.growth, ft.type.achievement.challenge, ft.type.achievement.collect],
                        i = ftc.ManagerData.get2("Achievement"),
                        a = [];
                    for (var n in i) {
                        if (ft.ExtAchievement.getType(i[n].id) === ft.type.achievement.achieve) {
                            var s = ft.ExtAchievement.getSubtype(i[n].id);
                            if (0 === s) this.achievement = i[n];
                            else if (s === t) {
                                var o = ft.ExtAchievement.getStatus(i[n]);
                                1 == o && (o = -1), i[n].status = o, a.push(i[n])
                            }
                        }
                    }
                    a.sort(function (t, e) {
                        return t.status - e.status
                    });
                    for (n = a.length - 1; n >= 0; n--) e.splice(t, 0, a[n]);
                    return e
                },
                getTvIsCanGet: function () {
                    if (this.buttonGet.node.active)
                        for (var t = this.listView.getDatas(), e = ftc.ManagerTV.getSelectNode(), i = 0; i < t.length; i++) {
                            var a = this.listView.getItem(i);
                            if (a && e == a.node) return "number" != typeof t[i]
                        }
                },
                setAchievementInfo: function (t) {
                    if (t.id) {
                        this.selectedAchievement = t;
                        var e = ft.ExtAchievement.getEvent(t.id);
                        if (e === ft.type.eventAchievement.WJSJ) {
                            this.labelInfo.string = ft.ExtAchievement.getInfo(t.id);
                            for (var i = ft.ExtAchievement.getConditions(t.id), a = t.ste.split(","), n = 0, s = 0; s < i.length; s++) a[s] && n++;
                            if (this.labelProgress.string = n + "/" + i.length, this.labelProgress.node.color = n < i.length ? ftc.newColor(13512192) : ftc.newColor(1084160), ftc.ManagerRes.restoreNodeChildren(this.nodeLayout), f = ft.ExtAchievement.getAwards(t.id)[0]) {
                                var o = ft.ExtAward.getIdNumsPreview(f);
                                for (s = 0; s < o.ids.length; s++) {
                                    (l = this.newPart("PartItem")).setData(o.ids[s], o.nums[s]), this.nodeLayout.addChild(l.node, s)
                                }
                            }
                            this.buttonGet.node.active = 0 == t.ext && n === i.length, this.spriteGet.node.active = 1 == t.ext
                        } else {
                            var r = ft.ExtAchievement.getInfo(t.id),
                                c = -1;
                            for (i = ft.ExtAchievement.getConditions(t.id), s = 0; s < i.length && t.ext >= i[s]; s++) c++;
                            a = t.ste.split(",");
                            var h = -1;
                            for (s = 0; s < a.length && a[s] > 0; s++) h++;
                            var f, d = h + 1 < i.length ? h + 1 : h;
                            if (this.labelProgress.string = t.ext + "/" + i[d], this.labelProgress.node.color = t.ext < i[d] ? ftc.newColor(13512192) : ftc.newColor(1084160), this.labelInfo.string = r.replace("%d", i[d]), this.buttonGet.node.active = !1, this.spriteGet.node.active = !1, h < i.length - 1 ? this.buttonGet.node.active = c > h : this.spriteGet.node.active = !0, ftc.ManagerRes.restoreNodeChildren(this.nodeLayout), f = ft.ExtAchievement.getAwards(t.id)[d])
                                for (o = ft.ExtAward.getIdNumsPreview(f), s = 0; s < o.ids.length; s++) {
                                    var l;
                                    (l = this.newPart("PartItem")).setData(o.ids[s], o.nums[s]), this.nodeLayout.addChild(l.node, s)
                                }
                            this.buttonDetail.node.active = !1, ftc.isTv() || this.spriteGet.node.active || e === ft.type.eventAchievement.WMZZ && (this.buttonGet.node.active || (this.unfinishedTasks || (this.unfinishedTasks = this.getUnfinishedTasks()), this.buttonDetail.node.active = this.unfinishedTasks.length > 0))
                        }
                    }
                },
                cleanup: function () { },
                updateData: function (t) {
                    if (this.achievement) {
                        var e = ft.ExtAchievement.getConditions(this.achievement.id),
                            i = e[e.length - 1];
                        this.labelNumTotal.string = this.achievement.ext, this.progressBar.progress = this.achievement.ext / i, this.boxStes = [];
                        for (var a = 0, n = e.length; a < n; a++) {
                            this.nodeBoxes[a].active = !0;
                            var s = this.progressBar.node.width * (e[a] / i);
                            this.buttonBoxes[a].node.x = s, this.labelNums[a].node.x = s, this.labelNums[a].string = e[a], this.boxStes[a] = ft.ExtAchievement.getStatus(this.achievement, a), this.buttonBoxes[a].node.stopAllActions(), this.buttonBoxes[a].node.scale = 1, 1 === this.boxStes[a] && this.buttonBoxes[a].node.runAction(cc.sequence(cc.scaleTo(.5, 1.2), cc.scaleTo(.5, 1)).repeatForever()), this.buttonBoxes[a].interactable = 2 !== this.boxStes[a]
                        }
                        for (a = e.length; a < this.nodeBoxes.length; a++) this.nodeBoxes[a].active = !1
                    }
                    if (void 0 !== t && t.id !== this.achievement.id) {
                        var o = this.listView.getDatas(),
                            r = !0;
                        for (a = 0; a < o.length; a++) {
                            if (t.id === o[a].id)
                                if (1 == ft.ExtAchievement.getStatus(o[a])) {
                                    r = !1, this.setAchievementInfo(o[a]);
                                    break
                                }
                        }
                        r && (this.datas = this.getDatas(this.tabIndex), this.listView.updateListViewItems({
                            index1: this.tabIndex,
                            index2: this.tabIndex
                        }, this.datas), this.setAchievementInfo(this.datas[this.tabIndex]))
                    }
                },
                tick: function (t) { },
                getUnfinishedTasks: function () {
                    var t = "",
                        e = ftc.ManagerData.get1("ManagerTask").finishedWMZZTasks;
                    if ("-1" === e) {
                        var i = ftc.ManagerData.get2("Task"),
                            a = 0;
                        for (var n in i) {
                            var s = i[n].id,
                                o = ft.ExtTask.getType(s);
                            if (ft.ExtTask.getMapType(s) === ft.type.map.normal && o !== ft.type.task.main && o !== ft.type.task.achieve && 6041 !== s) {
                                if (++a > 3) {
                                    t += "...";
                                    break
                                }
                                t += ft.ExtTask.getName(s) + "\n"
                            }
                        }
                    } else {
                        var r = e.split(","),
                            c = ft.achievementTasks1,
                            h = ft.achievementTasks2;
                        a = 0;
                        for (n = 0; n < c.length; n++)
                            if (-1 === r.indexOf(c[n] + "")) {
                                if (++a > 3) return t += "...";
                                t += ft.ExtTask.getName(c[n]) + "\n"
                            } for (n = 0; n < h.length; n++) {
                                for (var f = !1, d = "", l = 0; l < h[n].length; l++) - 1 !== r.indexOf(h[n][l] + "") && (f = !0), "" === d ? d = ft.ExtTask.getName(h[n][l]) : d += " \u6216 " + ft.ExtTask.getName(h[n][l]);
                                if (!f) {
                                    if (++a > 3) return t += "...";
                                    t += d + "\n"
                                }
                            }
                    }
                    return t
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonGet.node) this.selectedAchievement && ftc.send("achievementGet", {
                        id: this.selectedAchievement.id
                    });
                    else if (t.target === this.buttonDetail.node) {
                        if (this.selectedAchievement) ft.ExtAchievement.getEvent(this.selectedAchievement.id) === ft.type.eventAchievement.WMZZ && (this.unfinishedTasks && this.unfinishedTasks.length > 0 ? ftc.showItemInfo(t.target, {
                            name: ftc.language("\u672a\u5b8c\u6210\u7684\u652f\u7ebf"),
                            info: this.unfinishedTasks
                        }) : ftc.showItemInfo(t.target, {
                            name: ftc.language("\u5df2\u5b8c\u6210\u6240\u6709\u652f\u7ebf"),
                            info: "\u5f00\u542f\u65b0\u5468\u76ee\u540e\u5373\u53ef\u9886\u53d6"
                        }))
                    } else
                        for (var i = 0; i < this.buttonBoxes.length; i++)
                            if (t.target === this.buttonBoxes[i].node) {
                                if (2 === this.boxStes[i]) ftc.showTip("\u5df2\u9886\u53d6");
                                else if (1 === this.boxStes[i]) ftc.send("achievementGet", {
                                    id: this.achievement.id,
                                    index: i
                                }), ftc.playEffect(ftc.type.effect.openBox);
                                else {
                                    var a = ft.ExtAchievement.getAwards(this.achievement.id)[i],
                                        n = ft.ExtAward.getIdNumsPreview(a);
                                    ftc.loadLayout("LayoutAwardPreview", function (t) {
                                        t.setData(n)
                                    })
                                }
                                break
                            }
                }
            })
        