
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    buttonSelf: cc.Button,
                    spriteBg: cc.Sprite,
                    nodeAni: cc.Node,
                    spineLight: sp.Skeleton,
                    spriteTip: cc.Sprite,
                    labelTip: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonSelf), this.spineLight.setCompleteListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "wait2" === (t.animation ? t.animation.name : "") && (this.labelTip.node.active = !1, this.spriteBg.node.active = !0, this.spriteBg.spriteFrame || (this.spriteBg.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "activity_23_" + this.data.id)))
                    }.bind(this))
                },
                load: function () {
                    this.buttonSelf.interactable = !1, this.spriteBg.active = !1, this.spriteBg.spriteFrame = null, this.spriteTip.node.active = !1, this.labelTip.node.active = !1, this.nodeAni.getComponent(cc.Mask).enabled = !1
                },
                setData: function (t) {
                    this.data = t;
                    var e = t.ste;
                    3 === e ? (this.spriteBg.active = !0, this.spriteBg.spriteFrame || (this.spriteBg.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "activity_23_" + t.id))) : 2 === e ? (this.labelTip.node.active = !0, this.buttonSelf.interactable = !0, this.nodeAni.active = !0) : 1 === e && (this.buttonSelf.interactable = !0, this.spriteTip.node.active = !0)
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && (1 === this.data.ste ? ftc.showItemInfo(this.buttonSelf.node, {
                        name: ftc.language("\u63d0\u793a\u4fe1\u606f"),
                        info: this.data.txt
                    }) : 2 === this.data.ste && (ftc.send("msgActivityGet", {
                        eid: this.data.entityId,
                        index: 3500 + this.data.id
                    }), this.buttonSelf.interactable = !1, this.nodeAni.getComponent(cc.Mask).enabled = !1, this.spineLight.setAnimation(0, "wait2", !1)))
                }
            })
        