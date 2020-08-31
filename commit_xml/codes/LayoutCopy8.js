
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    spriteHeroBg: cc.Sprite,
                    layoutRewards: cc.Node,
                    labelInfo: cc.Label,
                    labelProgress: cc.Label,
                    buttonEnter: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonEnter)
                },
                load: function () {
                    this.id = ft.value.copy.LZHJ, this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle(ft.ExtCopy.getName(this.id)), this.node.addChild(this.partTopStatus.node), ftc.setTvTip(this.node)
                },
                setData: function (t) {
                    this.labelInfo.string = ft.replaceAll(ft.ExtCopy.getInfo(this.id), "|", "\n"), ftc.ManagerRes.restoreNodeChildren(this.layoutRewards);
                    var e = ft.ExtCopy.getAwards(ft.value.copy.LZHJ);
                    if (e && e.ids)
                        for (var i = 0; i < e.ids.length; i++) {
                            var a = this.newPart("PartItem");
                            a.node.scale = 1, a.setData(e.ids[i], e.nums[i]), this.layoutRewards.addChild(a.node)
                        }
                    this.updateData()
                },
                enter: function () { },
                updateData: function () {
                    var t = 0,
                        e = ftc.ManagerData.get2("Npc");
                    for (var i in e) 3530 < e[i].id && e[i].id <= 3580 && 0 === e[i].count && t++;
                    this.labelProgress.string = t + "/50", this.count = t
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                onClick: function (t, e) {
                    t.target === this.buttonEnter.node && (this.count >= 50 ? ftc.showTip("\u5df2\u6311\u6218\u5b8c\u6240\u6709\u5b88\u5c06") : (ftc.send("copyEnter", {
                        id: this.id
                    }), ftc.sendClient("c_copyEnter", void 0, "LayoutCopy"), this.cancel()))
                }
            })
        