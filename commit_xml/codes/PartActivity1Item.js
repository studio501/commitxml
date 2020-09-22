
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    labelDay: cc.Label,
                    nodeItem: cc.Node,
                    labelName: cc.Label,
                    buttonGet: cc.Button,
                    spriteGot: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonGet)
                },
                load: function () {
                    this.item = this.newPart("PartItem"), this.item.node.scale = 1, this.nodeItem.addChild(this.item.node)
                },
                updateData: function (t) {
                    this.param = t, this.labelDay.string = ftc.language("第") + (this.index + 1) + ftc.language("天");
                    var e = this.data.aids.split(",")[0],
                        i = this.data.anums.split(",")[0];
                    this.item.setData(e, i);
                    var a = this.index == this.param.ext && 0 == this.param.ste,
                        n = this.index < this.param.ext;
                    this.buttonGet.node.active = a, this.spriteGot.node.active = n
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonGet.node && ftc.send("msgActivityGet", {
                        eid: this.param.entityId
                    })
                }
            })
        