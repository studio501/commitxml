
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    nodeItems: [cc.Node],
                    labelDesc: cc.Label,
                    buttonGet: cc.Button,
                    spriteGet: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonGet)
                },
                load: function () {
                    this.awardItems = []
                },
                updateData: function (t) {
                    this.param = t;
                    for (var e = 0; e < this.data.ids.length; e++) {
                        var i = this.awardItems[e];
                        i || ((i = this.newPart("PartItem")).node.scale = .9, this.nodeItems[e].addChild(i.node), this.awardItems[e] = i), i.node.active = !0, i.setData(this.data.ids[e], this.data.nums[e]), 1 === this.data.single && e > 0 && (this["labelOr" + e].node.active = !0)
                    }
                    for (e = this.data.ids.length; e < this.awardItems.length; e++) this.awardItems[e].node.active = !1;
                    this.labelDesc.string = ft.ExtMsg.getEventDesc(this.data.consumeType) + this.data.ext + "/" + this.data.consumeNum, this.spriteGet.node.active = this.data.ste > 0, this.buttonGet.node.active = 0 == this.data.ste && this.data.ext >= this.data.consumeNum
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    if (t.target === this.buttonGet.node)
                        if (1 === this.data.single && this.data.ids.length > 1) {
                            var i = this.data.index;
                            ftc.loadLayout("LayoutSelectGoods", function (t) {
                                t.setData({
                                    ids: this.data.ids,
                                    nums: this.data.nums
                                }, function (t) {
                                    ftc.send("msgActivityGet", {
                                        eid: this.param.entityId,
                                        index: i,
                                        index2: t.index
                                    })
                                }.bind(this))
                            }.bind(this))
                        } else ftc.send("msgActivityGet", {
                            eid: this.param.entityId,
                            index: this.data.index
                        })
                }
            })
        