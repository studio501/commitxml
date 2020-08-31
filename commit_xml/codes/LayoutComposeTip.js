
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonSelf: cc.Button,
                    spine1: sp.Skeleton,
                    spine2: sp.Skeleton,
                    nodeItem: cc.Node,
                    spriteTip: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf), this.spine1.setCompleteListener(function (t) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "wait1" === (t.animation ? t.animation.name : "") && (this.spriteTip.node.active = !0, this.spine1.setAnimation(0, "wait2", !0), this.spine2.setAnimation(0, "wait2", !0), this._canClose = !0)
                    }.bind(this)), this.spine2.setEventListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "equip" === e.data.name && (this._item.node.active = !0)
                    }.bind(this))
                },
                load: function () {
                    this.spine1.setAnimation(0, "wait1"), this.spine2.setAnimation(0, "wait1"), this._canClose = !1, this.spriteTip.node.active = !1, this._item = this.newPart("PartItem"), this.nodeItem.addChild(this._item.node), this._item.node.active = !1
                },
                setData: function (t, e) {
                    t === ft.type.compose.equip ? this._item.setEquipData(e) : this._item.setData(e.id, e.num)
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && this._canClose && this.cancel()
                }
            })
        