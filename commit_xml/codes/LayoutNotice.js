
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    listView: ftc.ListView,
                    labelTitle: cc.Label,
                    hypertext: ftc.Hypertext,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonClose, {
                        zone: 1
                    }), ftc.ManagerTV.setBackButton(this.buttonClose, this.node)
                },
                load: function () {
                    this.setData()
                },
                setData: function (t) {
                    this.url = void 0;
                    var e = ftc.ManagerData.get2("Msg"),
                        i = [];
                    for (var a in e) ft.ExtMsg.getType(e[a]) == ft.type.msg.notice && i.push(e[a]);
                    i.sort(function (t, e) {
                        return t.priority - e.priority
                    }), this._noticeLength = i.length, i.length > 0 ? (this.listView.setListView(i, 0), this.setNoticeInfo(i[0]), this._selectedIndex = 0, ftc.send("msgNoticeRead", {
                        id: i[0].id,
                        type: 0
                    })) : this.labelTitle.string = ftc.language("\u6ca1\u6709\u516c\u544a"), ftc.setTvTip(this.node, "\u3010\u8fd4\u56de\u952e\u3011\u5173\u95ed\uff0c\u3010\u83dc\u5355\u952e\u3011\u5207\u6362\u516c\u544a")
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                msg: function () {
                    this.msg = {
                        c_onSelectNoticeItem: function (t, e) {
                            this.listView.updateListViewItems(t.index);
                            var i = this.listView.getDatas();
                            this.setNoticeInfo(i[t.index]), this._selectedIndex = t.index
                        }
                    }
                },
                setNoticeInfo: function (t) {
                    var e = ft.ExtMsg.getActivityData(t);
                    this.url = e.url, this.hypertext.cleanHtml(), this.hypertext.node.opacity = 0, this.hypertext.http(this.url, null, function (t) {
                        if (!ftc.ManagerRes.checkNodeIsRestored(this.node)) {
                            var e = t.title.rendered,
                                i = e.indexOf("\u3011");
                            i > 0 && (e = e.substr(i + 1)), this.labelTitle.string = e;
                            var a = ft.replaceAll(t.content.rendered, "\n", "");
                            this.hypertext.setHtml(a, this.hyperTextClick), cc.tween(this.hypertext.node).to(1, {
                                opacity: 255
                            }).start(), ftc.ManagerRes.topLayout() == this && ftc.ManagerTV.nextFrameSelect(void 0, this.node, 1)
                        }
                    }.bind(this))
                },
                hyperTextClick: function (t, e) { },
                onClick: function (t, e) {
                    t.target === this.buttonClose.node && this.cancel()
                },
                onKeyMenu: function (t) {
                    t || (this._selectedIndex++, this._selectedIndex >= this._noticeLength && (this._selectedIndex = 0), this.msg.c_onSelectNoticeItem(this.listView.getItem(this._selectedIndex)))
                }
            })
        