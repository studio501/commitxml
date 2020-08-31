
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    nodeItem: cc.Node,
                    buttonClick: cc.Button,
                    spriteClick: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonClick)
                },
                load: function () {
                    this._item = this.newPart("PartItem"), this._item.node.scale = .87, this._item.setInteractable(!1), this.nodeItem.addChild(this._item.node)
                },
                updateData: function (t) {
                    this._item.setData(this.data.id, this.data.num), this._item.setBgVisible(!1), this._item.setIconSprite(ftc.ManagerRes.getSpriteFrame("program", "icon_" + ft.ExtItem.getImg(this.data.id))), 1 == t.ext.split(",")[this.index] ? (this.buttonClick.node.active = !1, this.spriteClick.node.active = !1) : (this.buttonClick.node.active = !0, this.spriteClick.node.active = ft.ExtItem.getNum(this.data.id) >= this.data.num), this.param = t
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonClick.node && ftc.send("msgActivityGet", {
                        eid: this.param.entityId,
                        type: 0,
                        index: this.index
                    })
                }
            })
        