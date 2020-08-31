
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    listView: ftc.ListView,
                    labelTarget: cc.Label,
                    labelInfo: cc.Label,
                    labelProgress: cc.Label,
                    layoutReward: cc.Node,
                    buttonGet: cc.Button,
                    buttonGuide: cc.Button,
                    buttonTabs: [cc.Button],
                    spriteRedPoint: cc.Sprite,
                    nodeContent: cc.Node,
                    nodeTabs: cc.Node
                },
                init: function () {
                    this.addClick(this.buttonGet, !0), this.addClick(this.buttonGuide, !0);
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t], !0)
                },
                load: function () {
                    this.selectedIndex = void 0, this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setCloseCallback(function () {
                        this.checkHasUnGetMainTask() || (this.isNeedCheckTask && ftc.send("checkTask"), this.cancel())
                    }.bind(this)), this.node.addChild(this.partTopStatus.node), this.mapType = ft.ExtMap.getType(ftc.ManagerData.get1("ManagerMap").cur), this.partTopStatus.setTitle(this.mapType == ft.type.map.zy ? "\u6218\u5f79\u4efb\u52a1" : "\u4efb\u52a1");
                    var t = this.getCanAcceptTasks().length > 0;
                    this.nodeTabs.active = t, this.nodeContent.position = t ? cc.v2(65.8, -33) : cc.v2(0, -33), this.selectTab(0, !0)
                },
                setData: function () { },
                enter: function () { },
                checkHasUnGetMainTask: function () {
                    var t = ftc.ManagerData.get2("Task");
                    for (var e in t)
                        if (ftd.Task.get(t[e].id, "type") == ft.type.task.main) {
                            if (1 == t[e].ste) return ftc.showTip("\u8bf7\u5148\u9886\u53d6\u4e3b\u7ebf\u5956\u52b1"), !0;
                            break
                        } return !1
                },
                getTasks: function () {
                    if (0 === this.tabIndex) {
                        var t = [];
                        if (this.mapType != ft.type.map.zy)
                            for (var e = ft.ExtTask.getTasksByMapType(this.mapType), i = 0; i < e.length; i++) {
                                var a = ft.ExtTask.getType(e[i].id);
                                a === ft.type.task.main ? t.splice(0, 0, e[i]) : a === ft.type.task.branch && t.splice(1, 0, e[i])
                            } else t = ft.ExtTask.getZYTaskMain().concat(ft.ExtTask.getZYTaskBranch());
                        return t
                    }
                    return this.getCanAcceptTasks()
                },
                getCanAcceptTasks: function () {
                    for (var t = [], e = ft.ExtTask.getTasksByMapType(this.mapType), i = 0; i < e.length; i++) {
                        ft.ExtTask.getType(e[i].id) === ft.type.task.accept && t.push(e[i])
                    }
                    return t
                },
                updateTvTip: function (t) {
                    var e = "\u3010\u8fd4\u56de\u952e\u3011\u5173\u95ed\u754c\u9762";
                    t && (e += "\uff0c\u3010\u786e\u5b9a\u952e\u3011" + t), this.nodeTabs.active && (e += "\uff0c\u3010\u83dc\u5355\u952e\u3011\u5207\u6362\u6807\u7b7e"), ftc.setTvTip(this.node, e)
                },
                setTaskInfo: function (t) {
                    this.selectedIndex = t;
                    var e = this.listView.getDatas()[t];
                    if (e && e.eventId) {
                        var i = ft.ExtEvent.getNpc(e.eventId, e);
                        if (i) {
                            var a, n = ft.ExtNpc.npc2Map[i];
                            for (var s in n) {
                                this.labelTarget.node.active = !0;
                                for (var o = ft.ExtNpc.mapNpcIds[s], r = 0; r < o.length; r++)
                                    if (o[r].npc === i) {
                                        a = {
                                            x: o[r].x,
                                            y: o[r].y
                                        };
                                        break
                                    } break
                            }
                            this.labelTarget.string = a ? ftd.Map.get(s, "name") + "(" + a.x + "," + a.y + ")\uff0c" + ftc.language("\u5bfb\u627e") + ftd.Npc.get(i, "name") : ftd.Map.get(s, "name") + " " + ftd.Npc.get(i, "name")
                        } else this.labelTarget.string = "";
                        ft.ExtTask.hideTarget && (this.labelTarget.string = "\u672a\u77e5"), 1108 === e.id && (this.labelTarget.string = ftc.language("\u9003\u51fa\u516b\u9635\u56fe"))
                    } else this.labelTarget.string = ftc.language("\u4efb\u52a1\u5df2\u5b8c\u6210");
                    var c = ftd.Event.get(e.eventId, "c_condition");
                    if (c) {
                        var h = c.split(";")[0];
                        if (h && h.startsWith("[")) {
                            var f = JSON.parse(h),
                                d = ft.toArray(f[0]),
                                l = ft.toArray(f[1]),
                                u = "",
                                p = "\u9700\u8981";
                            for (s = 0; s < d.length; s++) u += ft.ExtItem.getName(d[s]) + "(" + ft.ExtItem.getNum(d[s]) + "/" + l[s] + ") ", p += ft.ExtItem.getName(d[s]) + (s === d.length - 1 ? "" : "\u3001");
                            this.labelProgress.node.parent.active = !0, this.labelProgress.string = u
                        } else this.labelProgress.node.parent.active = !1
                    } else this.labelProgress.node.parent.active = !1;
                    this.labelProgress.node.parent.active && (this.labelTarget.string = p), ftc.ManagerRes.restoreNodeChildren(this.layoutReward);
                    var g = ft.ExtAward.getIdNumsPreview(ft.ExtTask.getAwards(e.id));
                    if (ft.ExtTask.getType(e.id) === ft.type.task.accept) this.layoutReward.parent.active = !1;
                    else if (this.layoutReward.parent.active = !0, g && e.ste < 2) {
                        d = g.ids, l = g.nums;
                        var m, b = ft.ExtTask.getExp(e.id);
                        if (b > 0) {
                            var v = ftc.ManagerData.get1("Player");
                            b = ft.ExtTask.calcTaskExp(e.id, v.samsara, v.level);
                            var y = d.indexOf(ft.value.item.exp); - 1 === y ? (b = ft.getNumShow(b), d.push(ft.value.item.exp), l.push(b)) : (b = ft.getNumShow(l[y] + b), l[y] = b)
                        }
                        for (s = 0; s < d.length; s++) ft.ExtItem.getType(d[s]) === ft.type.item.task || d[s] !== ft.value.item.exp && ft.ExtItem.getType(d[s]) === ft.type.item.base || ((m = this.newPart("PartItem")).node.scale = .9, m.setData(d[s], l[s]), m.setInteractable(!0), this.layoutReward.addChild(m.node));
                        this.layoutReward.active = !0
                    } else this.layoutReward.active = !1;
                    if (this.buttonGet.node.getChildByName("Label").getComponent(cc.Label).string = ftc.language("\u9886\u53d6"), ft.ExtTask.getType(e.id) === ft.type.task.main && ft.ExtTask.checkGuide(e.id, "end")) {
                        this.buttonGuide.node.active = !1, this.buttonGet.node.active = !0;
                        var _ = ftc.ManagerData.get1("Player").samsara;
                        this.labelInfo.string = ft.ExtTask.getInfo(e.id).replace("{0}", _ + 1), 2 == e.ste && (this.buttonGet.node.getChildByName("Label").getComponent(cc.Label).string = ftc.language("\u65b0\u5468\u76ee"), this.isCancelOnClick = !0)
                    } else if (this.isCancelOnClick = !1, this.labelInfo.string = ft.ExtTask.getInfo(e.id), 1 === e.ste) this.buttonGuide.node.active = !1, this.buttonGet.node.active = !0;
                    else {
                        this.buttonGet.node.active = !1;
                        var x = ftc.ManagerData.get1("ManagerTask").cur == e.id;
                        e.eventId > 0 ? this.buttonGuide.node.active = !x : this.buttonGuide.node.active = !1
                    }
                    ftc.isTv() && (this.tvIsGet = 0, this.buttonGet.node.active ? (this.updateTvTip(this.buttonGet.node.getChildByName("Label").getComponent(cc.Label).string), this.tvIsGet = 1) : this.buttonGuide.node.active ? (this.updateTvTip("\u9009\u62e9\u6307\u5f15"), this.tvIsGet = 2) : this.updateTvTip())
                },
                updateData: function () {
                    this.partTopStatus.updateData(), this.selectTab(this.tabIndex)
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectTaskItem: function (t, e) {
                            t.index > 0 && this.checkHasUnGetMainTask() || (this.listView.updateListViewItems(t.index), this.setTaskInfo(t.index))
                        },
                        taskSetGuide: function (t, e) {
                            this.listView.updateListViewItems(), this.setTaskInfo(this.selectedIndex), ftc.sendClient("c_updateMap", void 0, "LayoutMain")
                        },
                        taskFinish: function (t, e) {
                            if (this.tasks = this.getTasks(), this.tasks.length > 0 ? (this.listView.setListView(this.tasks, 0), this.setTaskInfo(0), ftc.sendClient("c_updateMap", void 0, "LayoutMain"), this.isNeedCheckTask = !0) : this.updateData(), t && ftc.ManagerH5.isH5() && 1 === ftc.ManagerData.get1("Player").samsara) {
                                var i = ft.ExtTask.getType(t);
                                i === ft.type.task.main ? (ftc.ManagerH5.countEvent("3_" + t, "\u5b8c\u6210\u4e3b\u7ebf\u4efb\u52a1"), 1 == t && ftc.ManagerH5.countEvent("6_5")) : i === ft.type.task.branch && ftc.ManagerH5.countEvent("4_" + t, "\u5b8c\u6210\u652f\u7ebf\u4efb\u52a1")
                            }
                            25 !== t && 50 !== t && 100 !== t || ftsdk && ftsdk.showUserComment()
                        }
                    }
                },
                selectTab: function (t, e) {
                    this.tabIndex = t, this.tvTabIndex = t;
                    var i = this.getTasks();
                    if (i.length > 0) {
                        for (var a = 0; a < this.buttonTabs.length; a++) this.buttonTabs[a].interactable = t !== a, this.buttonTabs[a].node.getChildByName("labelTab").color = t !== a ? ftc.newColor(ftc.value.color.tabNormal) : ftc.newColor(ftc.value.color.tabPressed), this.buttonTabs[a].node.getChildByName("labelTab").getComponent(cc.LabelOutline).color = t !== a ? ftc.newColor(ftc.value.color.tabNormalOutline) : ftc.newColor(ftc.value.color.tabPressedOutline);
                        var n = -1;
                        for (a = 0; a < i.length; a++)
                            if (1 == i[a].ste) {
                                n = a;
                                break
                            } if (e) {
                                var s = ftc.ManagerData.get1("ManagerTask").cur;
                                if (s > 0)
                                    if (-1 === n) {
                                        for (a = 0; a < i.length; a++)
                                            if (i[a].id == s) {
                                                n = a;
                                                break
                                            } - 1 === n && 0 === this.tabIndex && this.nodeTabs.active ? this.selectTab(1, !0) : (this.listView.setListView(i, -1 !== n ? n : 0), this.setTaskInfo(-1 !== n ? n : 0))
                                    } else this.listView.setListView(i, n), this.setTaskInfo(n);
                                else this.listView.setListView(i, 0), this.setTaskInfo(0)
                            } else this.listView.setListView(i, -1 !== n ? n : 0), this.setTaskInfo(-1 !== n ? n : 0)
                    } else ftc.showTip("\u6682\u65e0\u4efb\u52a1")
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonGet.node) (i = this.listView.getDatas()[this.selectedIndex]) && (this.isCancelOnClick ? ftc.showDialog({
                        text: "\u786e\u5b9a\u5f00\u542f\u65b0\u5468\u76ee?",
                        click1: function () {
                            this.isCancelOnClick = void 0, this.cancel(), ftc.send("taskFinish", i.id)
                        }.bind(this),
                        click2: function () { }
                    }) : ftc.send("taskFinish", i.id));
                    else if (t.target === this.buttonGuide.node) {
                        var i;
                        (i = this.listView.getDatas()[this.selectedIndex]) && ftc.send("taskSetGuide", i.id)
                    } else
                        for (var a = 0; a < this.buttonTabs.length; a++)
                            if (t.target === this.buttonTabs[a].node) {
                                this.selectTab(a);
                                break
                            }
                },
                onKeyOk: function (t) {
                    if (!t) return 1 == this.tvIsGet ? this.onClick({
                        target: this.buttonGet.node
                    }) : 2 == this.tvIsGet && this.onClick({
                        target: this.buttonGuide.node
                    }), !0
                },
                onKeyMenu: function (t) {
                    if (!t) {
                        this.tvTabIndex++, this.tvTabIndex >= this.buttonTabs.length && (this.tvTabIndex = 0), this.selectTab(this.tvTabIndex);
                        var e = this.listView.getFirstItem();
                        return e && ftc.ManagerTV.nextFrameSelect(e.buttonSelf), !0
                    }
                }
            })
        