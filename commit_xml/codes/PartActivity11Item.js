
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    nodeItem: cc.Node,
                    labelInfo: cc.Label,
                    buttonGet: cc.Button,
                    spriteGot: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonGet)
                },
                load: function () {
                    this.item = this.newPart("PartItem"), this.nodeItem.addChild(this.item.node)
                },
                updateData: function (t) {
                    this.param = t;
                    var e = new Date(1e3 * (ftc.getLocalTime() + 28800)),
                        i = e.getUTCDay(),
                        a = e.getUTCHours(),
                        n = parseInt(this.data.ids),
                        s = parseInt(this.data.nums),
                        o = this.data.txt;
                    n !== ft.value.item.power || 6 !== i && 0 !== i || (s = 50, o = 1 === this.data.index ? ftc.language("周末大加餐。每周六周日12-18点，即可领取50体力。") : ftc.language("周末大加餐。每周六周日18-24点登录，即可领取50体力。")), this.item.setData(n, s), this.labelInfo.string = o;
                    var r = 0 != this.param.ste.split(",")[this.data.index];
                    n === ft.value.item.power ? 1 === this.data.index ? this.buttonGet.node.active = !r && 12 <= a && a < 18 : 2 === this.data.index && (this.buttonGet.node.active = !r && 18 <= a && a < 24) : this.buttonGet.node.active = !r, this.spriteGot.node.active = r
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonGet.node && ftc.send("msgActivityGet", {
                        eid: this.param.entityId,
                        index: this.data.index
                    })
                }
            })
        