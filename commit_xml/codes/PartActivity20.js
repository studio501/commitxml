
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeLayout: cc.Node,
                    buttonGo: cc.Button,
                    spriteGet: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonGo)
                },
                load: function () {
                    this.it = this.newPart("PartItem"), this.nodeLayout.addChild(this.it.node)
                },
                setData: function (t) {
                    t && (this.data = t);
                    var e = ft.ExtMsg.getActivityData(this.data).items[0];
                    this.it.setData(e.ids, e.nums), this.buttonGo.node.active = 0 == this.data.ste, this.spriteGet.node.active = 0 != this.data.ste
                },
                cleanup: function () { },
                updateData: function () {
                    this.setData()
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonGo.node && ftc.send("msgActivityGet", {
                        eid: this.data.entityId
                    })
                }
            })
        