
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spriteIconLeft1: cc.Sprite,
                    labelLeftPrice1: cc.Label,
                    buttonLeftBuy1: cc.Button,
                    spriteRedPointLeft: cc.Sprite,
                    spriteIconLeft2: cc.Sprite,
                    labelLeftPrice2: cc.Label,
                    buttonLeftBuy2: cc.Button,
                    labelRightTip: cc.Label,
                    labelRightFreeTime: cc.Label,
                    spriteIconRight1: cc.Sprite,
                    labelRightPrice1: cc.Label,
                    buttonRightBuy1: cc.Button,
                    spriteRedPointRight: cc.Sprite,
                    spriteIconRight2: cc.Sprite,
                    labelRightPrice2: cc.Label,
                    buttonRightBuy2: cc.Button,
                    spriteBuy2: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonLeftBuy1), this.addClick(this.buttonLeftBuy2), this.addClick(this.buttonRightBuy1), this.addClick(this.buttonRightBuy2)
                },
                load: function () {
                    this.goldVisit = {
                        labelPrice1: this.labelLeftPrice1,
                        labelPrice2: this.labelLeftPrice2
                    }, this.gemVisit = {
                        labelTip: this.labelRightTip,
                        labelFreeTime: this.labelRightFreeTime,
                        labelPrice1: this.labelRightPrice1,
                        labelPrice2: this.labelRightPrice2,
                        spriteIcon1: this.spriteIconRight1,
                        spriteIcon2: this.spriteIconRight2
                    }, this.tickAdd = 0, this.updateData()
                },
                setData: function (t) { },
                updateData: function () {
                    var t = ftc.localDay > 0,
                        e = ftc.ManagerData.get1("ManagerVisit").freeGoldVisit;
                    t && 0 === e ? (this.goldVisit.labelPrice1.string = ftc.language("\u514d\u8d39"), this.spriteRedPointLeft.node.active = !0) : (this.goldVisit.labelPrice1.string = ft.value.visit.gold1, this.spriteRedPointLeft.node.active = !1), this.goldVisit.labelPrice2.string = ft.value.visit.gold10;
                    var i = ftc.getLocalTime() - ftc.ManagerData.get1("ManagerVisit").freeGemVisitTime > ft.value.visit.freeGemCoolDown;
                    this.gemVisit.labelFreeTime.node.parent.active = !0, this.gemVisit.labelFreeTime.node.active = t, t ? i ? (this.gemVisit.labelTip.node.parent.active = !1, this.spriteRedPointRight.node.active = !0, this.remainingTime = 0, this.gemVisit.labelFreeTime.string = "") : (this.gemVisit.labelTip.string = ftc.language("\u514d\u8d39\u65f6\u95f4"), this.spriteRedPointRight.node.active = !1, this.remainingTime = parseInt(ft.value.visit.freeGemCoolDown - (ftc.getLocalTime() - ftc.ManagerData.get1("ManagerVisit").freeGemVisitTime)), this.updateRemainingTime()) : (this.gemVisit.labelTip.string = ftc.language("\u8054\u7f51\u540e\n\u53ef\u514d\u8d39"), this.spriteRedPointRight.node.active = !1), t && i ? (this.gemVisit.spriteIcon1.spriteFrame = ft.ExtItem.getLittleIconSprite(ft.value.item.recruitTicket), this.gemVisit.labelPrice1.string = ftc.language("\u514d\u8d39")) : ft.ExtItem.getNum(ft.value.item.recruitTicket) > 0 ? (this.gemVisit.spriteIcon1.spriteFrame = ft.ExtItem.getLittleIconSprite(ft.value.item.recruitTicket), this.gemVisit.labelPrice1.string = ft.ExtItem.getNum(ft.value.item.recruitTicket) + "/1") : (this.gemVisit.spriteIcon1.spriteFrame = ft.ExtItem.getLittleIconSprite(ft.value.item.gem), this.gemVisit.labelPrice1.string = ft.value.visit.gem1), ft.ExtItem.getNum(ft.value.item.recruitTicket) >= 10 ? (this.gemVisit.spriteIcon2.spriteFrame = ft.ExtItem.getLittleIconSprite(ft.value.item.recruitTicket), this.gemVisit.labelPrice2.string = ft.ExtItem.getNum(ft.value.item.recruitTicket) + "/10") : (this.gemVisit.spriteIcon2.spriteFrame = ft.ExtItem.getLittleIconSprite(ft.value.item.gem), this.gemVisit.labelPrice2.string = ft.value.visit.gem10)
                },
                tick: function (t) {
                    this.tickAdd += t, this.tickAdd >= 1 && (this.updateRemainingTime(), this.tickAdd = 0)
                },
                updateRemainingTime: function (t) {
                    if (this.remainingTime > 0) {
                        var e = this.remainingTime--,
                            i = ft.prefixZeroTime(Math.floor(e / 3600)),
                            a = ft.prefixZeroTime(Math.floor(e % 3600 / 60)),
                            n = ft.prefixZeroTime(e % 60);
                        this.labelRightFreeTime.string = i + ":" + a + ":" + n + ftc.language("\u540e"), 0 === e && (this.labelRightTip.string = ftc.language("\u73b0\u5728"))
                    }
                },
                cleanup: function () { },
                getVisitType: function () {
                    return this.visitType
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonLeftBuy1.node) !(ftc.ManagerData.get1("ManagerVisit").freeGoldVisit < ft.value.visit.freeGoldTimes) && ft.ExtItem.getGold() < ft.value.visit.gold1 ? ftc.showTip("\u94f6\u5e01\u4e0d\u8db3") : (this.visitType = ft.type.visit.gold1, ftc.send("visitHero", {
                        type: this.visitType
                    }));
                    else if (t.target === this.buttonLeftBuy2.node) ft.ExtItem.getGold() < ft.value.visit.gold10 ? ftc.showTip("\u94f6\u5e01\u4e0d\u8db3") : (this.visitType = ft.type.visit.gold10, ftc.send("visitHero", {
                        type: this.visitType
                    }));
                    else if (t.target === this.buttonRightBuy1.node) {
                        !(ftc.getLocalTime() - ftc.ManagerData.get1("ManagerVisit").freeGemVisitTime > ft.value.visit.freeGemCoolDown) && ft.ExtItem.getNum(ft.value.item.recruitTicket) < 1 && ft.ExtItem.getGem() < ft.value.visit.gem1 ? ftc.showTip("\u5143\u5b9d\u4e0d\u8db3") : (this.visitType = ft.type.visit.gem1, ftc.send("visitHero", {
                            type: this.visitType
                        }))
                    } else t.target === this.buttonRightBuy2.node && (ft.ExtItem.getNum(ft.value.item.recruitTicket) < 10 && ft.ExtItem.getGem() < ft.value.visit.gem10 ? ftc.showTip("\u5143\u5b9d\u4e0d\u8db3") : (this.visitType = ft.type.visit.gem10, ftc.send("visitHero", {
                        type: this.visitType
                    })))
                }
            })
        