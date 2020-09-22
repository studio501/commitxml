
            
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
                            this.labelCur.string = ftc.language("本周已进行{0}战斗，并击杀敌将{1}人").replace("{0}", ["初阶", "中阶", "高阶"][a]).replace("{1}", n);
                            for (var o = ft.ExtCopy.getHSLYAwardPreview(a, n, s), r = 0; r < o.ids.length; r++) {
                                var c = this.newPart("PartItem");
                                c.setData(o.ids[r], o.nums[r]), c.node.scale = .75, this.nodeLayout.addChild(c.node)
                            }
                            this.nodeAward.active = !0
                        } else this.labelCur.string = "暂无杀敌", this.nodeAward.active = !1
                    } else this.labelCur.string = "暂无杀敌", this.nodeAward.active = !1;
                    if (ftc.localDay > 0) {
                        this.labelRefreshTime.node.active = !0;
                        var h = ftc.getLocalTime(),
                            f = 5 - (Math.floor((h + 28800) / 86400) + 3) % 7,
                            d = 23 - (Math.floor(h / 3600) + 8) % 24; - 1 === f && (f = 6), this.labelRefreshTime.string = ftc.language("距离刷新剩余:") + f + ftc.language("天") + d + ftc.language("小时")
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
                            0 === t || (1 === t ? ftc.showTip("次数不足") : 2 === t ? ftc.showTip("不能进入") : 3 === t && ftc.showTip("数量不足"))
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
        