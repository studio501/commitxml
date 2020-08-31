
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    spriteBg1: cc.Sprite,
                    spriteBg2: cc.Sprite,
                    button1: cc.Button,
                    spriteIcon: cc.Sprite,
                    labelName1: cc.Label,
                    spriteArrow: cc.Sprite,
                    button2: cc.Button,
                    spriteDone: cc.Sprite,
                    labelName2: cc.Label,
                    spriteRedPoint: cc.Sprite
                },
                init: function () {
                    this.addClick(this.button1), this.addClick(this.button2, {
                        auto: !0
                    })
                },
                load: function () { },
                updateData: function (t) {
                    if ("number" == typeof this.data) {
                        var e = t ? t.index1 : -1;
                        this.button1.node.active = !0, this.button2.node.active = !1, this.spriteBg1.node.active = e !== this.data, this.spriteBg2.node.active = e === this.data, this.node.height = this.button1.node.height + 8, this.spriteIcon.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "achieve_icon_" + this.data), this.labelName1.string = ftc.language(["\u6210\u957f", "\u6311\u6218", "\u6536\u96c6"][this.data - 1]), this.spriteRedPoint.node.active = ft.ExtAchievement.hasAchievementComplete(ft.type.achievement.achieve, this.data), this.spriteArrow.node.angle = e !== this.data ? 90 : 0
                    } else {
                        this.button1.node.active = !1, this.button2.node.active = !0, this.button2.interactable = t.index2 !== this.index, this.node.height = this.button2.node.height + 6, this.labelName2.string = ft.ExtAchievement.getName(this.data.id);
                        var i = ft.ExtAchievement.getStatus(this.data);
                        this.spriteRedPoint.node.active = 1 === i, this.spriteDone.node.active = 2 === i
                    }
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target !== this.button1.node && t.target !== this.button2.node || ftc.sendClient("c_onSelectAchievement", this)
                }
            })
        