
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    labelDay: cc.Label,
                    nodeItem: cc.Node,
                    buttonGet: cc.Button,
                    spriteGot: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonGet)
                },
                load: function () {
                    this._item = this.newPart("PartItem"), this.nodeItem.addChild(this._item.node)
                },
                updateData: function (t) {
                    this.param = t, this.labelDay.string = ftc.language("第") + (this.index + 1) + ftc.language("天");
                    var e = this.data.id,
                        i = this.data.num;
                    this._item.setData(e, i, !0), this.buttonGet.node.active = !0, this.spriteGot.node.active = !1;
                    var a = this.param.ste.split(",")[this.index];
                    void 0 === a && (a = 0), this.spriteGot.node.active = a > 0;
                    var n = ft.getSysDay(),
                        s = 0 == a && this.param.ext + this.index <= n;
                    this.buttonGet.node.active = s, this._item.setStatus(0), s && (this.param.ext + this.index === n ? (this._item.setStatus(2), this.labelDay.string = ftc.language("可以领取")) : this.labelDay.string = ftc.language("可以补签"))
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonGet.node && (this.param.ext + this.index < ft.getSysDay() ? ft.ExtItem.getGem() >= 50 ? ftc.showDialog({
                        text: ftc.language("将花费50元宝进行补签，是否确定?"),
                        click1: function () {
                            ftc.send("msgActivityGet", {
                                eid: this.param.entityId,
                                index: this.index
                            })
                        }.bind(this),
                        click2: function () { }
                    }) : ftc.showTip("补签所需元宝不足") : ftc.send("msgActivityGet", {
                        eid: this.param.entityId,
                        index: this.index
                    }))
                }
            })
        