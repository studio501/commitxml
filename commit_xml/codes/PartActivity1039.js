
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    labelDate: cc.Label,
                    nodeLayoutAward: cc.Node,
                    buttonDetail: cc.Button,
                    buttonGo: cc.Button,
                    spriteRedPoint: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonDetail), this.addClick(this.buttonGo)
                },
                load: function () { },
                setData: function (t) {
                    this.data = t;
                    for (var e = JSON.parse(t.base), i = 0; i < e.showIds.length; i++) {
                        var a = this.newPart("PartItem");
                        a.node.scale = .65, a.setData(e.showIds[i], e.showNums[i]), this.nodeLayoutAward.addChild(a.node, i)
                    }
                    this.buttonDetail.node.active = this.data.txt && this.data.txt.length > 0, this.updateData(), this.updateDate()
                },
                cleanup: function () { },
                updateData: function () {
                    this.spriteRedPoint.node.active = ft.ExtMsg.checkCanGet(this.data)
                },
                updateDate: function () {
                    this.labelDate.string = ftc.language("\u5269\u4f59\u65f6\u95f4: ") + ftc.calcTimeDelta(void 0, this.data.date1)
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonDetail.node ? ftc.showDetailInfo(this.buttonDetail.node, this.data.txt) : t.target === this.buttonGo.node && ftc.loadLayout("LayoutActivityTrial", void 0, {
                        hide: !0
                    })
                }
            })
        