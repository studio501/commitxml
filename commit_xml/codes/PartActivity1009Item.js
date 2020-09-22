
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    nodeItems: [cc.Node],
                    labelRemaining: cc.Label,
                    buttonExchange: cc.Button,
                    buttonTvExchange: cc.Button,
                    spriteExchange: cc.Sprite,
                    labelAdd: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonExchange), ftc.isTv() && this.addClick(this.buttonTvExchange)
                },
                load: function () {
                    this._partItems = [];
                    for (var t = 0; t < 3; t++) {
                        var e = this._partItems[t];
                        (e = this.newPart("PartItem")).node.scale = .9, this.nodeItems[t].addChild(e.node), this._partItems.push(e)
                    }
                },
                updateData: function (t) {
                    this.param = t, this.labelAdd.node.active = !1;
                    for (var e = 0; e < this.data.switchIds.length && e < 2; e++) {
                        var i = this._partItems[e];
                        i.node.active = !0, i.setData(this.data.switchIds[e], ft.ExtItem.getNum(this.data.switchIds[e]) + "/" + this.data.switchNums[e]), e > 0 && (this.labelAdd.node.active = !0)
                    }
                    for (e = this.data.switchIds.length; e < 2; e++) this._partItems[e].node.active = !1;
                    this._partItems[2].setData(this.data.id, this.data.num);
                    var a = this.param.ste.split(",")[this.index];
                    void 0 === a && (a = 0), this.remainingCount = this.data.count - Number(a || 0), this.labelRemaining.string = this.remainingCount + "/" + this.data.count, this.buttonExchange.node.active = this.remainingCount > 0, this.spriteExchange.node.active = this.remainingCount <= 0
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    if (t.target === this.buttonExchange.node)
                        if (this.remainingCount <= 0) ftc.showTip("次数不足");
                        else {
                            for (var i = !0, a = 0; a < this.data.switchIds.length; a++)
                                if (ft.ExtItem.getNum(this.data.switchIds[a]) < this.data.switchNums[a]) {
                                    i = !1;
                                    break
                                } i ? ftc.send("msgActivityGet", {
                                    eid: this.param.entityId,
                                    index: this.index
                                }) : ftc.showTip("物品数量不足")
                        }
                }
            })
        