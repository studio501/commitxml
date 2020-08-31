
            
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
                    this.param = t, this.labelDay.string = ftc.language("\u7b2c") + (this.index + 1) + ftc.language("\u5929");
                    var e = this.data.id,
                        i = this.data.num;
                    this._item.setData(e, i, !0), this.buttonGet.node.active = !0, this.spriteGot.node.active = !1;
                    var a = this.param.ste.split(",")[this.index];
                    void 0 === a && (a = 0), this.spriteGot.node.active = a > 0;
                    var n = ft.getSysDay(),
                        s = 0 == a && this.param.ext + this.index <= n;
                    this.buttonGet.node.active = s, this._item.setStatus(0), s && (this.param.ext + this.index === n ? (this._item.setStatus(2), this.labelDay.string = ftc.language("\u53ef\u4ee5\u9886\u53d6")) : this.labelDay.string = ftc.language("\u53ef\u4ee5\u8865\u7b7e"))
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonGet.node && (this.param.ext + this.index < ft.getSysDay() ? ft.ExtItem.getGem() >= 50 ? ftc.showDialog({
                        text: ftc.language("\u5c06\u82b1\u8d3950\u5143\u5b9d\u8fdb\u884c\u8865\u7b7e\uff0c\u662f\u5426\u786e\u5b9a?"),
                        click1: function () {
                            ftc.send("msgActivityGet", {
                                eid: this.param.entityId,
                                index: this.index
                            })
                        }.bind(this),
                        click2: function () { }
                    }) : ftc.showTip("\u8865\u7b7e\u6240\u9700\u5143\u5b9d\u4e0d\u8db3") : ftc.send("msgActivityGet", {
                        eid: this.param.entityId,
                        index: this.index
                    }))
                }
            })
        