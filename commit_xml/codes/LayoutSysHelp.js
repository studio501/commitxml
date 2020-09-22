
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonCustomer: cc.Button,
                    buttonClose: cc.Button,
                    buttonBack: cc.Button,
                    listViewLeft: ftc.ListView,
                    listView: ftc.ListView,
                    hypertext: ftc.Hypertext,
                    nodeWait: cc.Node,
                    spriteWait: cc.Sprite,
                    nodeDialog: cc.Node,
                    labelTitle: cc.Label,
                    labelTime: cc.Label,
                    nodeImageBg: cc.Node,
                    nodeLeft: cc.Node,
                    nodeRight: cc.Node
                },
                init: function () {
                    this.addClick(this.buttonClose), this.addClick(this.buttonCustomer), this.addClick(this.buttonBack, {
                        zone: 1
                    }), this.buttonCustomer.node.active = ftc.getChat(), cc.tween(this.spriteWait.node).repeatForever(cc.tween().by(2, {
                        angle: -360
                    })).start()
                },
                load: function () {
                    this.nodeDialog.active = !1, this.nodeImageBg.active = !1, this.nodeLeft.active = !1, this.nodeRight.active = !1
                },
                setData: function (t) {
                    if (t) this.showDialog(t);
                    else {
                        this.nodeImageBg.active = !0, this.nodeLeft.active = !0, this.nodeRight.active = !0;
                        var e = {};
                        e.gid = ft.getAppId();
                        t = "http://chat.ftaro.com/AppService.ashx";
                        ftc.openTest && (t = "http://test.ftaro.com:8800/chat/AppService.ashx"), this.arrData = [], this.selectMainIndex = -1, this.selectIndex = -1, this.hypertext.http(t, "method=LoadQaMenus&parms=" + JSON.stringify(e), function (t) {
                            var e = 0;
                            for (var i in t) {
                                this.arrData[e] = {
                                    name: i,
                                    value: t[i],
                                    mIndex: e
                                };
                                var a = [];
                                for (var n in t[i]) ft.isObject(t[i][n]) && a.push({
                                    name: n,
                                    value: t[i][n],
                                    mIndex: e
                                });
                                this.arrData[e].list = a, e++
                            }
                            this.updateLeftList(0, 0)
                        }.bind(this)), this.nodeDialog.active = !1, this.dataStack = []
                    }
                },
                cleanup: function () { },
                enter: function () { },
                updateData: function () { },
                updateLeftList: function (t, e) {
                    if (t != this.selectMainIndex) {
                        this.selectMainIndex = t, this.listData = [];
                        for (var i = 0, a = 0; a < this.arrData.length; a++)
                            if (this.arrData[a].index = i++, this.listData.push(this.arrData[a]), this.selectMainIndex == a) {
                                var n = this.arrData[a].list;
                                this.selectIndex = n.length ? a + 1 : a;
                                for (var s = 0; s < n.length; s++) n[s].index = i++, this.listData.push(n[s])
                            } this.listViewLeft.setListView(this.listData, {
                                main: this.selectMainIndex,
                                sub: this.selectIndex
                            })
                    } else if (this.selectIndex != e) {
                        var o = {
                            main: this.selectMainIndex,
                            sub: e
                        };
                        this.listViewLeft.updateListViewItem(this.selectIndex, void 0, o), this.selectIndex = e, this.listViewLeft.updateListViewItem(this.selectIndex, void 0, o)
                    }
                    if (this.popContent(!0), this.listData) {
                        var r = this.listData[this.selectIndex];
                        r && this.pushContent(r.value)
                    }
                },
                showDialog: function (t) {
                    this.hypertext.cleanHtml(), this.hypertext.node.opacity = 0, this.hypertext.http(t, null, function (t) {
                        this.nodeDialog.active = !0;
                        var e = t.title.rendered,
                            i = e.indexOf("】");
                        i > 0 && (e = e.substr(i + 1)), this.labelTitle.string = e, this.labelTime.string = t.date;
                        var a = ft.replaceAll(t.content.rendered, "\n", "");
                        this.hypertext.setHtml(a, this.hyperTextClick), cc.tween(this.hypertext.node).to(1, {
                            opacity: 255
                        }).start(), ftc.ManagerTV.nextSelect(this.buttonBack, this.node, 1)
                    }.bind(this))
                },
                updateContent: function (t) {
                    if (0 != t.length) {
                        var e = t[t.length - 1];
                        e.api ? this.hypertext.http(e.api, null, function (t) {
                            this.listView.setListView(t);
                            var e = this.listView.getFirstItem();
                            e && ftc.ManagerTV.nextFrameSelect(e.buttonSelf, this.node, 0)
                        }.bind(this)) : e.url && this.showDialog(e.url)
                    }
                },
                hyperTextClick: function (t, e) {
                    ft.console("超级文本点击事件", t, e)
                },
                pushContent: function (t) {
                    this.dataStack.push(t), this.updateContent(this.dataStack)
                },
                popContent: function (t) {
                    t ? this.dataStack = [] : this.dataStack.length && this.dataStack.splice(this.dataStack.length - 1, 1)
                },
                msg: function () {
                    this.msg = {
                        c_sysItemLeft: function (t, e) {
                            this.updateLeftList(t.mIndex, t.index)
                        },
                        c_sysItemContent: function (t, e) {
                            this.pushContent(t)
                        }
                    }
                },
                onClick: function (t) {
                    if (!this.nodeWait.active)
                        if (t.target === this.buttonClose.node) this.cancel(void 0, !0);
                        else if (t.target === this.buttonCustomer.node) ftc.showChat();
                        else if (t.target === this.buttonBack.node)
                            if (this.nodeImageBg.active) {
                                this.nodeDialog.active = !1;
                                var e = this.listView.getItem(this.listView.getFirstIndex());
                                e && ftc.ManagerTV.nextFrameSelect(e.buttonSelf, this.node, 0), this.popContent()
                            } else this.cancel(void 0, !0)
                },
                onKeyBack: function (t) {
                    if (!t && !this.nodeWait.active) return this.nodeDialog.active ? this.onClick({
                        target: this.buttonBack.node
                    }) : this.onClick({
                        target: this.buttonClose.node
                    }), !0
                }
            })
        