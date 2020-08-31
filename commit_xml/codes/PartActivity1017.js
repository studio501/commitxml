
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    labelInfo: cc.Label,
                    labelDate: cc.Label,
                    nodeLayout: cc.Node,
                    buttonGo: cc.Button,
                    buttonDetail: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonGo), this.addClick(this.buttonDetail)
                },
                load: function () { },
                setData: function (t) {
                    this.data = t;
                    var e = ft.ExtMsg.getActivityData(this.data);
                    this.updateDate(), ftc.ManagerRes.restoreNodeChildren(this.nodeLayout);
                    for (var i = 0; i < e.ids.length; i++) {
                        var a = ft.ExtVisit.getItem(e.ids[i]),
                            n = ft.ExtVisit.getNum(e.ids[i]),
                            s = this.newPart("PartItem");
                        s.node.scale = .9, s.setData(a, n), this.nodeLayout.addChild(s.node, i)
                    }
                    this.buttonDetail.node.active = this.data.txt && this.data.txt.length > 0, ftc.isTv() && (this.buttonDetail.node.active = !1)
                },
                cleanup: function () { },
                updateData: function () {
                    this.updateDate()
                },
                updateDate: function () {
                    this.labelDate.string = ftc.language("\u5269\u4f59\u65f6\u95f4: ") + ftc.calcTimeDelta(void 0, this.data.date1)
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonGo.node ? ftc.loadLayout("LayoutVisit", function (t) {
                        t.selectTab(1)
                    }, {
                        hide: !0
                    }) : t.target === this.buttonDetail.node && ftc.showDetailInfo(this.buttonDetail.node, this.data.txt)
                }
            })
        