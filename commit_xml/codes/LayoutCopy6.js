
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonEntry: cc.Button,
                    buttonDetail: cc.Button,
                    labelCur: cc.Label,
                    labelRefreshTime: cc.Label,
                    nodeAward: cc.Node,
                    nodeLayout: cc.Node
                },
                init: function () {
                    this.addClick(this.buttonEntry), this.addClick(this.buttonDetail)
                },
                load: function () {
                    this.id = ft.value.copy.HSLY, this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle(ft.ExtCopy.getName(this.id)), this.node.addChild(this.partTopStatus.node), ftc.setTvTip(this.node)
                },
                setData: function (t) {
                    var e = ft.ExtCopy.getCopy(this.id);
                    if (e) {
                        var i = e.ext.split(","),
                            a = Number(i[0] - 1),
                            n = Number(i[1]),
                            s = Number(i[2]);
                        if (a >= 0 && n > 0) {
                            this.labelCur.string = ftc.language("\u672c\u5468\u5df2\u8fdb\u884c{0}\u6218\u6597\uff0c\u5e76\u51fb\u6740\u654c\u5c06{1}\u4eba").replace("{0}", ["\u521d\u9636", "\u4e2d\u9636", "\u9ad8\u9636"][a]).replace("{1}", n);
                            for (var o = ft.ExtCopy.getHSLYAwardPreview(a, n, s), r = 0; r < o.ids.length; r++) {
                                var c = this.newPart("PartItem");
                                c.setData(o.ids[r], o.nums[r]), c.node.scale = .75, this.nodeLayout.addChild(c.node)
                            }
                            this.nodeAward.active = !0
                        } else this.labelCur.string = "\u6682\u65e0\u6740\u654c", this.nodeAward.active = !1
                    } else this.labelCur.string = "\u6682\u65e0\u6740\u654c", this.nodeAward.active = !1;
                    if (ftc.localDay > 0) {
                        this.labelRefreshTime.node.active = !0;
                        var h = ftc.getLocalTime(),
                            f = 5 - (Math.floor((h + 28800) / 86400) + 3) % 7,
                            d = 23 - (Math.floor(h / 3600) + 8) % 24; - 1 === f && (f = 6), this.labelRefreshTime.string = ftc.language("\u8ddd\u79bb\u5237\u65b0\u5269\u4f59:") + f + ftc.language("\u5929") + d + ftc.language("\u5c0f\u65f6")
                    } else this.labelRefreshTime.node.active = !1
                },
                enter: function () { },
                updateData: function () {
                    this.partTopStatus.updateData()
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        copyEnter: function (t, e) {
                            0 === t || (1 === t ? ftc.showTip("\u6b21\u6570\u4e0d\u8db3") : 2 === t ? ftc.showTip("\u4e0d\u80fd\u8fdb\u5165") : 3 === t && ftc.showTip("\u6570\u91cf\u4e0d\u8db3"))
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.buttonEntry.node ? (ftc.send("copyEnter", {
                        id: ft.value.copy.HSLY
                    }), ftc.sendClient("c_copyEnter", void 0, "LayoutCopy"), this.cancel()) : t.target === this.buttonDetail.node && ftc.loadLayout("LayoutDescription", function (t) {
                        var e = ft.ExtCopy.getInfo(ft.value.copy.HSLY);
                        e = ft.replaceAll(e, "|", "\n"), t.setData({
                            info: e
                        })
                    })
                }
            })
        