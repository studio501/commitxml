
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    nodeItem: cc.Node,
                    labelName: cc.Label,
                    spriteGot: cc.Sprite
                },
                init: function () { },
                load: function () {
                    this.item = this.newPart("PartItem"), this.nodeItem.addChild(this.item.node)
                },
                updateData: function (t) {
                    this.param = t, this.item.setData(this.data.ids, this.data.nums), this.labelName.string = ft.ExtItem.getName(this.data.ids);
                    var e = this.param.ext.split(","),
                        i = Math.floor(Number(e[0]) % 30);
                    1 == this.param.ste && 0 == i && Number(e[0]) > 0 && (i = 30);
                    var a = i > this.index;
                    this.spriteGot.node.active = a;
                    var n = i == this.index && 0 == this.param.ste;
                    this.item.setStatus(n ? 2 : 0)
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t) { }
            })
        