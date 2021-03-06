
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    spriteIcon: cc.Sprite,
                    spriteTxt: cc.Sprite,
                    spriteGray: cc.Sprite,
                    spriteDescBg: cc.Sprite,
                    labelDesc: cc.Label,
                    spriteMark: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                load: function () {
                    this.conditionDesc = void 0
                },
                updateData: function (t) {
                    this.conditionDesc = void 0, this.spriteIcon.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "copy_icon_" + this.data), this.spriteTxt.spriteFrame = ftc.ManagerRes.getSpriteFrame("txt", "txt_copy_" + this.data), this.spriteMark.node.active = this.data === ft.value.copy.YXT2, this.spriteGray.node.active = !1;
                    var e, i = ft.ExtCopy.getLevel(this.data),
                        a = ft.ExtCopy.getSamsara(this.data),
                        n = ftc.ManagerData.get1("Player");
                    if (n.level < i) this.spriteGray.node.active = !0, this.conditionDesc = i + "级", e = "需要等级:" + this.conditionDesc;
                    else if (n.samsara < a) this.spriteGray.node.active = !0, this.conditionDesc = a + "周目", e = "需要周目:" + this.conditionDesc;
                    else {
                        var s = ftc.ManagerData.get1("ManagerCopy");
                        switch (this.data) {
                            case ft.value.copy.HJZ:
                            case ft.value.copy.ZYS:
                            case ft.value.copy.ShenBing:
                            case ft.value.copy.ZSJ:
                            case ft.value.copy.YWC:
                                e = "剩余次数:" + ft.ExtCopy.getRemainingCount(this.data);
                                break;
                            case ft.value.copy.YXT:
                                e = "剩余次数:" + ft.ExtCopy.getRemainingCount(this.data), e += "\n\u5f53\u524d\u5c42\u6570:" + s.battleYXT;
                                break;
                            case ft.value.copy.YXT2:
                                e = "当前层数:" + s.battleYXT3, e += "\n\u8ddd\u79bb\u5237\u65b0:" + ftc.calcTimeDelta(void 0, 1e3 * (86400 * (ft.getSysDay() + 1) - 28800));
                                break;
                            case ft.value.copy.CCJJ:
                                e = "当前坚持:" + s.battleCCJJ2, e += "\n\u8ddd\u79bb\u7ed3\u7b97:" + ftc.calcTimeDelta(void 0, 1e3 * (86400 * ft.getDay(ft.getSysDay() % 7 == 3 ? ft.getSysDay() + 7 : ft.getSysDay(), 0, !1) - 28800));
                                break;
                            case ft.value.copy.ZY:
                                e = "战役挑战券: " + ft.ExtItem.getNum(ft.value.item.campaignTicket) + "/1", e += "\n\u6218\u5f79\u626b\u8361\u5238: " + ft.ExtItem.getNum(ft.value.item.mopUpTicket) + "/" + ft.value.com.mopUpTicketNumWeekly;
                                break;
                            case ft.value.copy.FLHJ:
                                e = "剩余次数:" + ft.ExtCopy.getRemainingCount(this.data), e += "\n\u8ddd\u79bb\u5237\u65b0:" + ftc.calcTimeDelta(void 0, 1e3 * (86400 * ft.getDay(ft.getSysDay() % 7 == 4 ? ft.getSysDay() + 7 : ft.getSysDay(), 1, !1) - 28800));
                                break;
                            case ft.value.copy.TFDZ:
                                break;
                            case ft.value.copy.HSLY:
                                var o = ft.ExtCopy.getCopy(this.data);
                                if (o) {
                                    var r = o.ext.split(","),
                                        c = Number(r[0] - 1),
                                        h = Number(r[1]);
                                    e = c >= 0 && h > 0 ? ftc.language("本周已击杀敌将{1}人").replace("{1}", h) : "暂无杀敌"
                                } else e = "暂无杀敌";
                                e += "\n\u8ddd\u79bb\u5237\u65b0:" + ftc.calcTimeDelta(void 0, 1e3 * (86400 * ft.getDay(ft.getSysDay() % 7 == 3 ? ft.getSysDay() + 7 : ft.getSysDay(), 0, !1) - 28800));
                                break;
                            case ft.value.copy.CZDA:
                            case ft.value.copy.XSWJ:
                            case ft.value.copy.PDJD:
                            case ft.value.copy.SBBZ:
                                break;
                            case ft.value.copy.LZHJ:
                                var f = 0,
                                    d = ftc.ManagerData.get2("Npc");
                                for (var l in d) 3530 < d[l].id && d[l].id <= 3580 && 0 === d[l].count && f++;
                                e = "已挑战守将:" + f + "/50", this.spriteGray.node.active = f >= 50;
                                break;
                            default:
                                e = "无"
                        }
                    }
                    this.labelDesc.string = e
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectCopyRightItem", this)
                }
            })
        