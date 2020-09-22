
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    nodeItem: cc.Node,
                    progressBar: cc.ProgressBar,
                    labelProgress: cc.Label,
                    spriteShadow: cc.Sprite,
                    labelCondition: cc.Label,
                    spriteSelect: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf, {
                        auto: !0
                    })
                },
                load: function () {
                    this._item = this.newPart("PartItem"), this._item.setInteractable(!1), this.nodeItem.addChild(this._item.node)
                },
                updateData: function (t) {
                    if (this.canChallenge = !1, this.spriteShadow.node.active = !1, this.spriteSelect.node.active = this.index === t, ft.isNumber(this.data)) {
                        var e = ft.ExtEquip.getType(this.data);
                        this._item.setHeroData({
                            id: e
                        }, void 0, !0);
                        var i = ft.ExtItem.mapPartEquips[this.data],
                            a = ft.ExtItem.getNum(i),
                            n = ft.ExtItem.getNeedPiecesNum(i);
                        if (this.progressBar.progress = a / n, this.labelProgress.string = a + "/" + n, this.progressBar.progress >= 1) this.spriteShadow.node.active = !0, this.labelCondition.string = "碎片已满\n请前往合成";
                        else {
                            var s = ftc.ManagerData.get2Object("Hero", e);
                            s ? s.star < 3 ? (this.spriteShadow.node.active = !0, this.labelCondition.string = "武将未满3星") : this.canChallenge = !0 : (this.spriteShadow.node.active = !0, this.labelCondition.string = "未拥有该武将")
                        }
                    } else {
                        e = ft.ExtEquip.getType(this.data.id);
                        this._item.setHeroData({
                            id: e
                        }, void 0, !0), this.progressBar.progress = 1, this.labelProgress.string = "已拥有", this.labelCondition.string = ""
                    }
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectCopy3Item", this)
                }
            })
        