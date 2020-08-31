
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    spriteLight: cc.Sprite,
                    labelDay: cc.Label,
                    spriteIcon: cc.Sprite,
                    buttonSelf: cc.Button,
                    spriteRedPoint: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf, !0)
                },
                load: function () {
                    this.spriteRedPoint.node.zIndex = 99, this.act = cc.sequence(cc.moveBy(.8, 0, 20).easing(cc.easeSineOut()), cc.moveBy(.8, 0, -20).easing(cc.easeSineIn())).repeatForever()
                },
                updateData: function (t) {
                    this.spriteIcon.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "sevenday_icon_" + (this.index + 1)), this.buttonSelf.interactable = this.index !== t, this.spriteLight.node.active = this.index === t, this.labelDay.string = this.index + 1, this.index === t ? this.spriteIcon.node.getNumberOfRunningActions() || this.spriteIcon.node.runAction(this.act) : (this.spriteIcon.node.stopAllActions(), this.spriteIcon.node.y = 10);
                    var e = !1;
                    if (ft.getSysDay() >= ftc.ManagerData.get1("ManagerMsg").sevenDayStart + this.index)
                        for (var i = 0; i < this.data.length; i++)
                            if (ft.ExtMsg.checkCanGet(this.data[i])) {
                                e = !0;
                                break
                            } this.spriteRedPoint.node.active = e
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectTabItem", this)
                }
            })
        