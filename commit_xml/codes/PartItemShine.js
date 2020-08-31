
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spineScale: sp.Skeleton,
                    spineShine: sp.Skeleton
                },
                init: function () { },
                load: function () {
                    this.spineScale.setEventListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.spineScale.node) || ("shan" === e.data.name ? (this.spineShine.node.active = !0, this.spineShine.setAnimation(0, "wait1")) : "suipian" === e.data.name && (this.spineScale.node.active = !1, this.item.node.active = !0, this._data && (this.item.setData(this._data.id, this._data.num, !0), this.item.setNameColor(cc.Color.WHITE))))
                    }.bind(this)), this.spineShine.setCompleteListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.spineShine.node) || "wait1" === (t.animation ? t.animation.name : "") && this._callback && this._callback()
                    }.bind(this)), this.node.active = !0, this.node.position = cc.v2(0, 0), this.item = this.newPart("PartItem"), this.node.addChild(this.item.node, 1), this.item.node.active = !1, this.spineScale.node.active = !1, this.spineShine.node.active = !1, this.spineScale.node.zIndex = 2, this.spineShine.node.zIndex = 3, this._data = void 0, this._callback = void 0
                },
                setData: function (t) {
                    this._data = t
                },
                playAnimation: function (t) {
                    this.item.node.active = !1, this.spineShine.node.active = !1, this.spineScale.node.active = !0, this.spineScale.setAnimation(0, "wait1"), this._callback = t
                },
                setWaitAnimation: function () {
                    this.spineScale.node.active = !0, this.spineScale.setAnimation(0, "wait1")
                },
                getItem: function () {
                    return this.item
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        