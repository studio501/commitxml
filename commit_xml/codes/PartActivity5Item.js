
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    labelLv: cc.Label,
                    nodeItem: cc.Node,
                    labelName: cc.Label,
                    buttonGet: cc.Button,
                    spriteGot: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonGet)
                },
                load: function () {
                    this.item = this.newPart("PartItem"), this.item.node.scale = .9, this.nodeItem.addChild(this.item.node)
                },
                updateData: function (t) {
                    this.labelLv.string = ftc.language("\u7b49\u7ea7") + this.data.levels;
                    var e = this.data.id2s[0],
                        i = this.data.num2s[0];
                    this.item.setData(e, i), this.labelName.string = ft.ExtItem.getName(e), this.buttonGet.node.active = 0 === this.index && ftc.ManagerData.get1("Player").level >= this.data.levels, this.spriteGot.node.active = this.data.levels <= t
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    if (t.target === this.buttonGet.node) {
                        var i = ftc.ManagerData.get2Object("Msg")[ft.value.msg.giftGrowth];
                        i && ftc.send("msgActivityGet", {
                            eid: i.entityId
                        })
                    }
                }
            })
        