
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    labelGem: cc.Label,
                    spriteIcon: cc.Sprite,
                    labelAdd: cc.Label,
                    labelRMB: cc.Label,
                    nodeReputation: cc.Node,
                    labelReputation: cc.Label,
                    spineStar: sp.Skeleton
                },
                init: function () {
                    this.addClick(this.buttonSelf), this.spineStar.setCompleteListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || (this.spineStar.node.active = !1, ftc.sendClient("c_buyGemItemStarEnd"))
                    }.bind(this))
                },
                updateData: function (t) {
                    this.spriteIcon.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "buygem_img" + this.data.id), this.labelGem.string = this.data.gem, this.data.gemAdd > 0 ? (this.labelAdd.node.parent.active = !0, this.labelAdd.string = this.data.gemAdd) : this.labelAdd.node.parent.active = !1, this.labelRMB.string = t[this.index], "zh" === ftc.ManagerLan.getLanguage() ? this.nodeReputation.active = !1 : (this.nodeReputation.active = !0, this.labelReputation.string = this.data.price)
                },
                playStarAni: function () {
                    this.spineStar.node.active = !0, this.spineStar.setAnimation(0, "a1")
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectBuyGemItem", this)
                }
            })
        