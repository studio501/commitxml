
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spriteBj: cc.Sprite,
                    showMiss: cc.Sprite,
                    showAdd: cc.Label,
                    showSub: cc.Label,
                    showSub2: cc.Label,
                    showBj: cc.Label,
                    aniUp: cc.Animation
                },
                init: function () {
                    this.aniUp.on("finished", this.onRemove, this)
                },
                onRemove: function () {
                    for (var t = this.partHero.allHpParts, e = 0; e < t.length; e++)
                        if (t[e] == this) {
                            t.splice(e, 1);
                            break
                        } ftc.ManagerRes.restoreNode(this.node)
                },
                setData: function (t, e, i, a) {
                    this.partHero = a, this.node.active = !0, this.showMiss.node.active = !1, this.showAdd.node.active = !1, this.showSub.node.active = !1, this.showSub2.node.active = !1, this.spriteBj.node.active = !1, this.showBj.node.active = !1, 1 == e && t <= 0 ? (this.showBj.node.active = !0, this.showBj.string = -1 * t, this.spriteBj.node.active = !0) : e > 1 ? (this.showMiss.node.active = !0, this.showMiss.spriteFrame = ftc.ManagerRes.getSpriteFrame("txt", "battle_prompt_" + e)) : t <= 0 ? 1 == i ? (this.showSub2.node.active = !0, this.showSub2.string = -1 * t) : (this.showSub.node.active = !0, this.showSub.string = -1 * t) : (this.showAdd.node.active = !0, this.showAdd.string = t), this.aniUp.play("NodeBattleHp", 0)
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                onClick: function (t, e) { }
            })
        