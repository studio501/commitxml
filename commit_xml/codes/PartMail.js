
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    listView: ftc.ListView,
                    labelNum: cc.Label,
                    buttonOneKeyGet: cc.Button,
                    labelTitle: cc.Label,
                    labelInfo: cc.Label,
                    labelTime: cc.Label,
                    nodeAttachment: cc.Node,
                    nodeLayout: cc.Node,
                    buttonDelete: cc.Button,
                    buttonGet: cc.Button,
                    buttonGo: cc.Button,
                    nodeContent: cc.Node,
                    nodeNothing: cc.Node
                },
                init: function () {
                    this.addClick(this.buttonOneKeyGet, !0), this.addClick(this.buttonDelete, !0), this.addClick(this.buttonGet, !0), this.addClick(this.buttonGo, !0), this.listView.setLayout("LayoutMail")
                },
                setData: function (t) {
                    var e = ftc.ManagerData.get2("Msg"),
                        i = [];
                    for (var a in this.count = 0, this.amount = 0, e) - 1 !== e[a].ext && ft.ExtMsg.getType(e[a]) == ft.type.msg.normal && (i.push(e[a]), 1 != e[a].ext && 2 != e[a].ext || (this.count += 1), this.amount += 1);
                    i.length > 0 ? (i.sort(function (t, e) {
                        var i = ft.ExtMsg.getPriority(t),
                            a = ft.ExtMsg.getPriority(e);
                        return i === a ? e.entityId - t.entityId : i - a
                    }), this.listView.setListView(i, 0), this.selectMailItem(0), this.nodeContent.active = !0, this.nodeNothing.active = !1) : (this.listView.setListView([]), this.clearMailInfo(), this.nodeContent.active = !1, this.nodeNothing.active = !0), this.labelNum.string = this.count + "/" + this.amount
                },
                selectMailItem: function (t) {
                    this.clearMailInfo(), this.listView.updateListViewItems(t), this._index = t;
                    var e = this.listView.getDatas()[t];
                    0 == e.ext && ftc.send("msgRead", e.entityId), this.labelTitle.string = ft.ExtMsg.getTitle(e);
                    var i = ft.ExtMsg.getTxt(e);
                    this.labelInfo.string = i.replace("|", "\n"), this.labelTime.string = e.date ? e.date : "", this.nodeAttachment.active = !1;
                    var a = ft.ExtMsg.getMsgAward(e),
                        n = !1;
                    if (a && a.ids && a.ids.length > 0) {
                        this.nodeAttachment.active = !0, n = !0;
                        for (var s = a.ids, o = a.nums, r = 0; r < s.length; r++) {
                            var c = this.newPart("PartItem");
                            c.setData(s[r], o[r]), 2 == e.ext && c.setStatus(1), this.nodeLayout.addChild(c.node)
                        }
                    }
                    this.buttonGet.node.active = 2 != e.ext && n, this.buttonDelete.node.active = !this.buttonGet.node.active, ftc.isTv() && (this.tvSte = 0, this.buttonGet.node.active ? this.tvSte = 1 : this.buttonDelete.node.active && (this.tvSte = 2)), this.buttonGo.node.active = !(!a || !a.url)
                },
                clearMailInfo: function () {
                    this.labelTitle.string = "", this.labelInfo.string = "", this.labelTime.string = "", ftc.ManagerRes.restoreNodeChildren(this.nodeLayout)
                },
                updateMailItems: function (t) {
                    for (var e = this.listView.getDatas(), i = 0; i < e.length; i++)
                        for (var a = 0; a < t.length; a++)
                            if (e[i].id == t[a]) {
                                this.listView.updateListViewItems(i);
                                break
                            } this.selectMailItem(this._index)
                },
                readMail: function (t) {
                    this.listView.updateListViewItem(this._index), this.setMailNum()
                },
                deleteMail: function (t) {
                    for (var e = this.listView.getDatas(), i = 0; i < e.length; i++)
                        if (e[i].entityId == t) {
                            this.listView.deleteListViewItem(i);
                            break
                        } e.length > 0 ? this.selectMailItem(0) : (this.clearMailInfo(), this.nodeContent.active = !1, this.nodeNothing.active = !0), this.setMailNum()
                },
                setMailNum: function () {
                    var t = ftc.ManagerData.get2("Msg");
                    for (var e in this.count = 0, this.amount = 0, t) - 1 != t[e].ext && ft.ExtMsg.getType(t[e]) == ft.type.msg.normal && (1 != t[e].ext && 2 != t[e].ext || (this.count += 1), this.amount += 1);
                    this.labelNum.string = this.count + "/" + this.amount
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    if (t.target === this.buttonOneKeyGet.node) {
                        var i = this.listView.getDatas().length;
                        if (i > 0) {
                            for (var a = [], n = 0; n < i; n++) a.push(this.listView.getDatas()[n].entityId);
                            ftc.send("msgReceive", a)
                        } else ftc.showTip("没有邮件")
                    } else if (t.target === this.buttonDelete.node) {
                        (s = this.listView.getDatas()[this._index]) && ftc.send("msgDelete", s.entityId)
                    } else if (t.target === this.buttonGet.node) {
                        (s = this.listView.getDatas()[this._index]) && ftc.send("msgReceive", s.entityId)
                    } else if (t.target === this.buttonGo.node) {
                        var s;
                        if (s = this.listView.getDatas()[this._index]) {
                            var o = ft.ExtMsg.getActivityData(s).url;
                            o && ftc.showBroser(o)
                        }
                    }
                }
            })
        