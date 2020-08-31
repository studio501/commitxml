
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    spineScale: sp.Skeleton,
                    spineShine: sp.Skeleton
                },
                init: function () {
                    this.spineScale.setEventListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || ("shan" === e.data.name ? (this.spineShine.node.active = !0, this.spineShine.setAnimation(0, "wait1")) : "suipian" === e.data.name && (this.spineScale.node.active = !1, this._item.node.active = !0))
                    }.bind(this))
                },
                load: function () {
                    this._item = this.newPart("PartItem"), this._item.node.y = 14, this._item.setNameColor(cc.Color.WHITE), this.node.addChild(this._item.node, 1), this._item.node.active = !1, this.spineScale.node.zIndex = 2, this.spineShine.node.zIndex = 3, this.spineShine.node.active = !1, this.index < 8 ? (this.spineScale.node.active = !0, this.spineScale.setAnimation(0, "wait1", !1)) : this._item.node.active = !0
                },
                updateData: function (t) {
                    this._item.setData(this.data.id, this.data.num, !0)
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        