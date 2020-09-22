
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    nodeRoot: cc.Node,
                    listView: ftc.ListView,
                    layoutAward1: cc.Node,
                    layoutAward2: cc.Node,
                    spriteRedPoints: [cc.Sprite],
                    nodeItem: cc.Node,
                    labelTime: cc.Label,
                    nodeConsumeItems: [cc.Node],
                    buttonClose: cc.Button
                },
                init: function () {
                    this.prepareParts(["PartActivity1004_2"]), this.addClick(this.buttonClose, !0)
                },
                load: function () {
                    ftc.setTvTip(this.node);
                    var t = ft.ExtMsg.getMsgByType(ft.type.activity.heroTrial);
                    if (t) {
                        this.msgTrial = t;
                        var e = ft.ExtMsg.getActivityData(t);
                        this.activity = e;
                        var i = [];
                        this._consumeItemIds = [];
                        for (var a = 0, n = e.consumeIds.length; a < n; a++) {
                            var s = e.consumeIds[a],
                                o = e.consumeNums[a];
                            i.push({
                                id: s,
                                num: o
                            }), -1 === this._consumeItemIds.indexOf(s) && this._consumeItemIds.push(s)
                        }
                        this.listView.setListView(i, t), this.labelTime.string = ftc.language("剩余时间: ") + ftc.calcTimeDelta(void 0, t.date1), this._partItems = [];
                        for (a = 0; a < this.activity.ids.length; a++) {
                            var r = this.newPart("PartItem");
                            r.node.scale = .87, r.setData(this.activity.ids[a], this.activity.nums[a]), r.addClick(r.buttonSelf), this._partItems.push(r)
                        }
                        for (a = 0; a < 4; a++) this.layoutAward1.addChild(this._partItems[a].node, a), this.layoutAward2.addChild(this._partItems[a + 4].node, a);
                        this.nodeItem.addChild(this._partItems[this._partItems.length - 1].node);
                        for (a = 0; a < this._consumeItemIds.length; a++) {
                            var c = this.nodeConsumeItems[a];
                            c.active = !0, c.getChildByName("spriteExt").getComponent(cc.Sprite).spriteFrame = ft.ExtItem.getLittleIconSprite(this._consumeItemIds[a])
                        }
                        var h = ftc.ManagerData.get2Object("Msg", e.activityId);
                        if (h) {
                            var f = this.newPart("PartActivity1004", "PartActivity1004_2");
                            f.setData(h), f.node.position = cc.v2(357, 26), this.nodeRoot.addChild(f.node), this.partActivity = f
                        }
                        this.updateData()
                    } else this.cancel()
                },
                setData: function (t) { },
                enter: function () { },
                updateData: function (t) {
                    this.listView.updateListViewItems();
                    var e = this.msgTrial.ste.split(","),
                        i = this.msgTrial.ext.split(",");
                    if (void 0 !== t) this._setAwardItem(t, e[t], i);
                    else
                        for (var a = 0; a < 9; a++) this._setAwardItem(a, e[a], i);
                    for (a = 0; a < this._consumeItemIds.length; a++) {
                        this.nodeConsumeItems[a].getChildByName("labelExt").getComponent(cc.Label).string = ft.ExtItem.getNum(this._consumeItemIds[a])
                    }
                },
                _getAwardStatus: function (t, e, i) {
                    var a = !0;
                    if (-1 !== e) {
                        for (var n = 0; n < 4; n++)
                            if (1 != t[4 * e + n]) {
                                a = !1;
                                break
                            }
                    } else if (-1 !== i) {
                        for (n = 0; n < 4; n++)
                            if (1 != t[i + 4 * n]) {
                                a = !1;
                                break
                            }
                    } else
                        for (n = 0; n < 16; n++)
                            if (1 != t[n]) {
                                a = !1;
                                break
                            } return a
                },
                _getRowCol: function (t) {
                    var e = -1,
                        i = -1;
                    return t < 4 ? e = t : t < 8 && (i = t % 4), [e, i]
                },
                _setAwardItem: function (t, e, i) {
                    if (1 != e) {
                        var a = this._getRowCol(t),
                            n = this._getAwardStatus(i, a[0], a[1]) ? 2 : 0;
                        this._partItems[t].setStatus(n), 2 === n ? this._partItems[t].setCallback(function (t) {
                            ftc.send("msgActivityGet", {
                                eid: this.msgTrial.entityId,
                                type: 1,
                                index: t
                            })
                        }.bind(this), t) : this._partItems[t].setCallback(void 0), this.spriteRedPoints[t] && (this.spriteRedPoints[t].node.active = !1)
                    } else this._partItems[t].setStatus(1), this._partItems[t].setCallback(void 0), this.spriteRedPoints[t] && (this.spriteRedPoints[t].node.active = !0)
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        msgActivityGet: function (t, e) {
                            if (t.eid === this.msgTrial.entityId) 0 === t.ret && (0 === t.type ? (ftc.showTip("点亮成功"), this.updateData()) : this.updateData(t.index));
                            else {
                                var i = this.partActivity;
                                i && (-1 === t.ret ? ftc.showTip("领取失败") : 0 === t.ret && (i.updateData(t.index), this.updateData()))
                            }
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.buttonClose.node && this.cancel()
                },
                onKeyBack: function (t) {
                    t || this.cancel()
                }
            })
        