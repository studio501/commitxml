
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    listView: ftc.ListView,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonClose)
                },
                load: function () {
                    this.selectUid = void 0, ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                setData: function (t) {
                    this._callbackEntry = t
                },
                enter: function () {
                    ftc.send("getUids", {}), ftr.showWait("正在加载数据...")
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        getPlayer: function (t, e) {
                            this.selectUid ? (ftr.cancelWait(), 0 == t.ste && t.type == ft.type.http.Touch ? (ftr.showWait("正在登录..."), ftc.send("login", {
                                uid2: this.selectUid
                            })) : t.txt && ftr.showTip(t.txt), this.selectUid = void 0) : ftc.throwMsg("getPlayer", t, e, this)
                        },
                        sysGetUids: function (t, e) {
                            if (ftr.cancelWait(), 0 === t.result) {
                                for (var i = t.data, a = t.delete || {}, n = ftc.ManagerData.passport.uid, s = 0, o = 0; o < i.length; o++) i[o] && (i[o].delete = a[i[o].uid], i[o].uid == n && (s = o));
                                for (o = i.length; o < 5; o++) i.push(null);
                                this.listView.setListView(i, s)
                            } else t.txt && ftr.showTip(t.txt)
                        },
                        c_addDocItem: function (t, e) {
                            ftr.showDialog({
                                text: "确认新建存档并开始游戏吗?",
                                click1: function () {
                                    ftc.send("readyTouch"), ftr.showWait("正在保存数据中..."), this.selectUid = 1
                                }.bind(this),
                                click2: function () { }
                            })
                        },
                        c_enterDocItem: function (t, e) {
                            var i = this.listView.getDatas()[t.index];
                            i && (i.uid == ftc.ManagerData.passport.uid ? (this._callbackEntry && this._callbackEntry(), this.cancel()) : (this.selectUid = i.uid, ftc.send("readyTouch"), ftr.showWait("正在保存数据中...")))
                        },
                        c_deleteDocItem: function (t, e) {
                            ftr.showDialog({
                                text: "删除存档需要等待3天，是否继续删除此存档？",
                                click1: function () {
                                    var e = this.listView.getDatas()[t.index];
                                    e && (ftc.send("getUids", {
                                        type: 1,
                                        uid: e.uid
                                    }), ftr.showWait("正在提交删除请求..."))
                                }.bind(this),
                                click2: function () { }
                            })
                        },
                        c_cancelDocItem: function (t, e) {
                            ftr.showDialog({
                                text: "确定要撤销删除么，撤销删除后可立即恢复存档？",
                                click1: function () {
                                    var e = this.listView.getDatas()[t.index];
                                    e && (ftc.send("getUids", {
                                        type: 2,
                                        uid: e.uid
                                    }), ftr.showWait("正在提交撤消请求..."))
                                }.bind(this),
                                click2: function () { }
                            })
                        }
                    }
                },
                onClick: function (t) {
                    t.target === this.buttonClose.node && this.cancel()
                }
            })
        