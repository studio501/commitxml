
            
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
                    ftc.send("getUids", {}), ftr.showWait("\u6b63\u5728\u52a0\u8f7d\u6570\u636e...")
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        getPlayer: function (t, e) {
                            this.selectUid ? (ftr.cancelWait(), 0 == t.ste && t.type == ft.type.http.Touch ? (ftr.showWait("\u6b63\u5728\u767b\u5f55..."), ftc.send("login", {
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
                                text: "\u786e\u8ba4\u65b0\u5efa\u5b58\u6863\u5e76\u5f00\u59cb\u6e38\u620f\u5417?",
                                click1: function () {
                                    ftc.send("readyTouch"), ftr.showWait("\u6b63\u5728\u4fdd\u5b58\u6570\u636e\u4e2d..."), this.selectUid = 1
                                }.bind(this),
                                click2: function () { }
                            })
                        },
                        c_enterDocItem: function (t, e) {
                            var i = this.listView.getDatas()[t.index];
                            i && (i.uid == ftc.ManagerData.passport.uid ? (this._callbackEntry && this._callbackEntry(), this.cancel()) : (this.selectUid = i.uid, ftc.send("readyTouch"), ftr.showWait("\u6b63\u5728\u4fdd\u5b58\u6570\u636e\u4e2d...")))
                        },
                        c_deleteDocItem: function (t, e) {
                            ftr.showDialog({
                                text: "\u5220\u9664\u5b58\u6863\u9700\u8981\u7b49\u5f853\u5929\uff0c\u662f\u5426\u7ee7\u7eed\u5220\u9664\u6b64\u5b58\u6863\uff1f",
                                click1: function () {
                                    var e = this.listView.getDatas()[t.index];
                                    e && (ftc.send("getUids", {
                                        type: 1,
                                        uid: e.uid
                                    }), ftr.showWait("\u6b63\u5728\u63d0\u4ea4\u5220\u9664\u8bf7\u6c42..."))
                                }.bind(this),
                                click2: function () { }
                            })
                        },
                        c_cancelDocItem: function (t, e) {
                            ftr.showDialog({
                                text: "\u786e\u5b9a\u8981\u64a4\u9500\u5220\u9664\u4e48\uff0c\u64a4\u9500\u5220\u9664\u540e\u53ef\u7acb\u5373\u6062\u590d\u5b58\u6863\uff1f",
                                click1: function () {
                                    var e = this.listView.getDatas()[t.index];
                                    e && (ftc.send("getUids", {
                                        type: 2,
                                        uid: e.uid
                                    }), ftr.showWait("\u6b63\u5728\u63d0\u4ea4\u64a4\u6d88\u8bf7\u6c42..."))
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
        