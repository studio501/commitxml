
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    nodeItems: [cc.Node],
                    labelDesc: cc.Label,
                    labelProgress: cc.Label,
                    buttonGet: cc.Button,
                    spriteGet: cc.Sprite,
                    buttonTvGet: cc.Button,
                    buttonRecharge: cc.Button,
                    labelOr1: cc.Label,
                    labelOr2: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonGet), this.addClick(this.buttonRecharge), ftc.isTv() && this.addClick(this.buttonTvGet)
                },
                load: function () {
                    this.awardItems = [];
                    for (var t = 0; t < this.nodeItems.length; t++) {
                        var e = this.newPart("PartItem");
                        e.node.scale = .8, this.nodeItems[t].addChild(e.node), this.awardItems.push(e)
                    }
                },
                updateData: function (t) {
                    this.param = t, this.labelOr1.node.active = !1, this.labelOr2.node.active = !1;
                    for (var e = 0; e < this.data.ids.length; e++) this.awardItems[e].node.active = !0, this.awardItems[e].setData(this.data.ids[e], this.data.nums[e]), 1 === this.data.single && e > 0 && (this["labelOr" + e].node.active = !0);
                    for (e = this.data.ids.length; e < this.awardItems.length; e++) this.awardItems[e].node.active = !1;
                    this.spriteGet.node.active = !1, this.buttonGet.node.active = !1, this.buttonRecharge.node.active = !1, this.labelProgress.node.active = !0;
                    var i = 0; - 1 !== this.param.ext && (i = 0 < this.param.ext.length && this.param.ext.length < ftc.ManagerData.get1("Player").pay.length ? this.param.ext.length + 1 : this.param.ext.length);
                    var a = ftc.ManagerData.get1("Player").pay.substring(i),
                        n = a ? a.split(",") : [];
                    if (0 === this.data.type) {
                        var s = ftc.ManagerData.get1("Player").rmb - Number(this.param.ext);
                        this.labelDesc.string = ftc.language("累计充值%d元即可领取").replace("%d", this.data.pay), this.labelProgress.string = "(" + s + "/" + this.data.pay + ")", void 0 === (r = this.param.ste.split(",")[this.index]) && (r = 0), (r = Number(r)) >= this.data.count ? (this.spriteGet.node.active = !0, this.labelProgress.node.active = !1) : s >= this.data.pay ? this.buttonGet.node.active = !0 : this.buttonRecharge.node.active = !0
                    } else {
                        var o = 0;
                        for (e = 0; e < n.length; e++) ft.value["product" + [n[e]]].price == this.data.pay && o++;
                        var r;
                        void 0 === (r = this.param.ste.split(",")[this.index]) && (r = 0), r = Number(r), this.labelDesc.string = ftc.language("单笔充值%d元即可领取").replace("%d", this.data.pay), this.labelProgress.string = "(" + r + "/" + this.data.count + ")", r >= this.data.count ? (this.spriteGet.node.active = !0, this.labelProgress.node.active = !1) : o > r ? this.buttonGet.node.active = !0 : this.buttonRecharge.node.active = !0
                    }
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    if (t.target === this.buttonGet.node)
                        if (1 === this.data.single && this.data.ids.length > 1) {
                            var i = this.index;
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
                            index: this.index
                        });
                    else t.target === this.buttonRecharge.node && ftc.openBuyGem()
                }
            })
        