
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    labelTitle: cc.Label,
                    nodeLayout: cc.Node,
                    labelDesc: cc.Label,
                    buttonGet: cc.Button,
                    buttonGo: cc.Button,
                    labelProgress: cc.Label,
                    spriteGot: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonGet), this.addClick(this.buttonGo)
                },
                load: function () {
                    this.param = void 0, ftc.ManagerRes.restoreNodeChildren(this.nodeLayout)
                },
                updateData: function (t) {
                    this.param = t, this.labelTitle.string = t.title, this.labelDesc.string = t.desc.replace("%d", this.data.condition);
                    for (var e = 0; e < this.data.ids.length; e++) {
                        var i = this.newPart("PartItem");
                        i.setData(this.data.ids[e], this.data.nums[e]), i.node.scale = .85, this.nodeLayout.addChild(i.node, e)
                    }
                    if (this.data.event === ft.type.event.QRQD) this.labelProgress.node.active = !1, this.buttonGet.node.active = !t.ste, this.buttonGet.interactable = !0, this.buttonGo.node.active = !1, this.spriteGot.node.active = t.ste;
                    else {
                        if (this.labelProgress.string = Number(t.ext) + "/" + this.data.condition, this.buttonGet.node.active = Number(t.ste) == this.data.index, this.buttonGet.node.active && (this.buttonGet.interactable = Number(t.ext) >= this.data.condition), this.buttonGo.node.active = !1, this.buttonGet.node.active && !this.buttonGet.interactable) ft.ExtMsg.getWork(t.id) && (this.buttonGo.node.active = !0, this.buttonGet.node.active = !1);
                        this.spriteGot.node.active = t.ste > this.data.index, this.labelProgress.node.active = this.buttonGet.node.active || this.buttonGo.node.active
                    }
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonGet.node ? ftc.sendClient("c_onSelectRightItem", this) : t.target === this.buttonGo.node && ftc.sendClient("c_onSelectRightItem2", this)
                }
            })
        