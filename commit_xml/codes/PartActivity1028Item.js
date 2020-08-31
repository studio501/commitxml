
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    nodeItems: [cc.Node],
                    labelRemaining: cc.Label,
                    buttonExchange: cc.Button,
                    buttonTvExchange: cc.Button,
                    spriteExchange: cc.Sprite,
                    labelAdd: cc.Label,
                    labelOr: cc.Label,
                    labelAdd2: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonExchange), ftc.isTv() && this.addClick(this.buttonTvExchange)
                },
                load: function () {
                    this._partItems = [];
                    for (var t = 0; t < 4; t++) {
                        var e = this._partItems[t];
                        (e = this.newPart("PartItem")).node.scale = .9, this.nodeItems[t].addChild(e.node), this._partItems.push(e)
                    }
                },
                updateData: function (t) {
                    this.param = t, this.labelAdd.node.active = !1;
                    for (var e = 0; e < this.data.switchIds.length && e < 2; e++) {
                        (i = this._partItems[e]).node.active = !0, i.setData(this.data.switchIds[e], ft.ExtItem.getNum(this.data.switchIds[e]) + "/" + this.data.switchNums[e]), e > 0 && (this.labelAdd.node.active = !0)
                    }
                    for (e = this.data.switchIds.length; e < 2; e++) this._partItems[e].node.active = !1;
                    this.labelOr.node.active = !1, this.labelAdd2.node.active = !1;
                    for (e = 0; e < this.data.ids.length; e++) {
                        var i;
                        (i = this._partItems[2 + e]).node.active = !0, i.setData(this.data.ids[e], this.data.nums[e]), e > 0 && (1 == this.data.single ? this.labelOr.node.active = !0 : this.labelAdd2.node.active = !0)
                    }
                    for (e = 2 + this.data.ids.length; e < 4; e++) this._partItems[e].node.active = !1;
                    var a = this.param.ste.split(",")[this.index];
                    void 0 === a && (a = 0), this.remainingCount = this.data.count - Number(a || 0), this.labelRemaining.string = this.remainingCount + "/" + this.data.count, this.buttonExchange.node.active = this.remainingCount > 0, this.spriteExchange.node.active = this.remainingCount <= 0
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    if (t.target === this.buttonExchange.node)
                        if (this.remainingCount <= 0) ftc.showTip("\u6b21\u6570\u4e0d\u8db3");
                        else {
                            for (var i = !0, a = 0; a < this.data.switchIds.length; a++)
                                if (ft.ExtItem.getNum(this.data.switchIds[a]) < this.data.switchNums[a]) {
                                    i = !1;
                                    break
                                } i ? this.data.ids.length > 1 && 1 == this.data.single ? ftc.loadLayout("LayoutSelectGoods", function (t) {
                                    t.setData({
                                        ids: this.data.ids,
                                        nums: this.data.nums
                                    }, function (t) {
                                        ftc.send("msgActivityGet", {
                                            eid: this.param.entityId,
                                            index: this.index,
                                            index2: t.index
                                        })
                                    }.bind(this))
                                }.bind(this)) : ftc.send("msgActivityGet", {
                                    eid: this.param.entityId,
                                    index: this.index
                                }) : ftc.showTip("\u7269\u54c1\u6570\u91cf\u4e0d\u8db3")
                        }
                }
            })
        