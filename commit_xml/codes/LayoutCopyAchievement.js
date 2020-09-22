
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    listView: ftc.ListView,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose, this.node)
                },
                load: function () {
                    ftc.setTvTip(this.node)
                },
                setData: function (t) {
                    this.copyId = t, this.listView.setListView(this.getDatas(this.copyId))
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        achievementGet: function (t, e) {
                            if (0 === t.ret) {
                                for (var i = this.listView.getDatas(), a = !0, n = 0; n < i.length; n++) {
                                    if (t.id === i[n].id)
                                        if (1 == ft.ExtAchievement.getStatus(i[n])) {
                                            a = !1, this.listView.updateListViewItems();
                                            break
                                        }
                                }
                                a && this.listView.updateListViewItems(void 0, this.getDatas(this.copyId))
                            } else ftc.showTip("领取失败")
                        }
                    }
                },
                getDatas: function (t) {
                    var e, i, a = [],
                        n = ftc.ManagerData.get2Object("Achievement");
                    if (t == ft.value.copy.XSWJ ? (e = ft.type.achievement.copyXSWJ, i = 1) : t == ft.value.copy.SBBZ ? e = ft.type.achievement.copySBBZ : t == ft.value.copy.LSHY ? e = ft.type.achievement.copyLSHY : t == ft.value.copy.QJQC && (e = ft.type.achievement.copyQJQC), e) {
                        for (var s in n)
                            if (ft.ExtAchievement.getType(s) === e && (!i || ft.ExtAchievement.getSubtype(s) === i)) {
                                var o = ft.ExtAchievement.getStatus(n[s]);
                                1 == o && (o = -1), n[s].status = o, a.push(n[s])
                            } a.sort(function (t, e) {
                                return t.status - e.status
                            })
                    }
                    return a
                },
                onClick: function (t, e) {
                    t.target === this.buttonClose.node && this.cancel()
                }
            })
        