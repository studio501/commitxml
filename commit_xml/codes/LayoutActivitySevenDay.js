
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    listViewTab: ftc.ListView,
                    listViewLeft: ftc.ListView,
                    listViewRight: ftc.ListView
                },
                init: function () { },
                load: function () {
                    this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("", 1), ftc.setTvTip(this.node, "\u3010\u8fd4\u56de\u952e\u3011\u5173\u95ed\u754c\u9762\uff0c\u3010\u83dc\u5355\u952e\u3011\u5207\u6362\u5929\u6570"), this.node.addChild(this.partTopStatus.node);
                    var t = ft.ExtMsg.getMsgDatas(ft.type.msg.pos.sevenDay);
                    if (t && t.length) {
                        for (var e = [], i = 0; i < t.length; i++) {
                            var a = ft.ExtMsg.getPriority(t[i]),
                                n = Math.floor(a / 10) - 1;
                            n >= 0 && (e[n] ? e[n].push(t[i]) : e[n] = [t[i]])
                        }
                        this.setData(e)
                    } else ftc.showTip("\u6d3b\u52a8\u4e0d\u5b58\u5728"), this.cancel();
                    ftc.send("msgFightCount")
                },
                setData: function (t) {
                    this.datas = t, this.listViewTab.setListView(this.datas, 0), this.selectTab(0)
                },
                selectTab: function (t) {
                    this.tvTabIndex = t;
                    var e = ft.getSysDay(),
                        i = ftc.ManagerData.get1("ManagerMsg").sevenDayStart;
                    return e < i + t ? (ftc.showTip(i + t - e + ftc.language("\u5929\u540e\u5f00\u542f")), !1) : (this.datasLeft = this.datas[t], this.listViewLeft.setListView(this.datasLeft, 0), this.selectLeftTab(0), !0)
                },
                selectLeftTab: function (t) {
                    this.leftIndex = t;
                    for (var e = this.datasLeft[t], i = JSON.parse(ft.ExtMsg.getTxt(e)), a = JSON.parse(ft.ExtMsg.getBase(e)), n = {
                        title: i.name,
                        desc: i.desc,
                        ext: e.ext,
                        ste: e.ste,
                        id: e.id,
                        entityId: e.entityId
                    }, s = Number(e.ste), o = [], r = 0, c = a.conditions.length; r < c; r++) {
                        var h = (s + r) % c;
                        o.push({
                            event: a.event,
                            condition: a.conditions[h],
                            ids: a.id2s[h],
                            nums: a.num2s[h],
                            index: h
                        })
                    }
                    this.listViewRight.setListView(o, n)
                },
                enter: function () { },
                updateData: function () {
                    this.partTopStatus.updateData(), this.listViewTab.updateListViewItems(), this.listViewLeft.updateListViewItems(), this.selectLeftTab(this.leftIndex)
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectTabItem: function (t, e) {
                            this.selectTab(t.index) && this.listViewTab.updateListViewItems(t.index)
                        },
                        c_onSelectLeftItem: function (t, e) {
                            this.selectLeftTab(t.index), this.listViewLeft.updateListViewItems(t.index)
                        },
                        c_onSelectRightItem: function (t, e) {
                            t.param && ftc.send("msgActivityGet", {
                                eid: t.param.entityId
                            })
                        },
                        c_onSelectRightItem2: function (t, e) {
                            ftc.send("msgActivityGo", {
                                eid: t.param.entityId
                            })
                        },
                        msgActivityGet: function (t, e) {
                            -1 === t.ret ? ftc.showTip("\u9886\u53d6\u5931\u8d25") : 0 === t.ret && this.updateData()
                        }
                    }
                },
                onClick: function (t, e) { },
                onKeyMenu: function (t) {
                    t || (this.tvTabIndex++, this.tvTabIndex >= 7 && (this.tvTabIndex = 0), this.selectTab(this.tvTabIndex) ? this.listViewTab.updateListViewItems(this.tvTabIndex) : this.tvTabIndex = -1)
                }
            })
        