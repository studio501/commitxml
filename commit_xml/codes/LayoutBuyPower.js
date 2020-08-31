
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonSelf: cc.Button,
                    nodeGem: cc.Node,
                    nodeItem: cc.Node,
                    spriteSelect1: cc.Sprite,
                    spriteSelect2: cc.Sprite,
                    buttonGem: cc.Button,
                    buttonItem: cc.Button,
                    spriteIcon: cc.Sprite,
                    labelNum: cc.Label,
                    labelPowerNum: cc.Label,
                    labelDesc: cc.Label,
                    labelTimes: cc.Label,
                    buttonConfirm: cc.Button,
                    labelRemainingTime: cc.Label,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonSelf, !0), this.addClick(this.buttonGem), this.addClick(this.buttonItem), this.addClick(this.buttonConfirm), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    this.labelRemainingTime.node.active = !1, this.powerSize = ft.ExtPlayer.getPowerSize(ftc.ManagerData.get1("Player").level), this.freeGetPowerRemainingTime = void 0, ftc.send("getFreeGetPowerTime"), this.tickAdd = -1;
                    var t = this.newPart("PartItem");
                    t.setData(ft.value.item.gem), t.setName(ftc.language("\u5143\u5b9d\u6062\u590d")), t.setInteractable(!1), this.nodeGem.addChild(t.node);
                    var e = this.newPart("PartItem");
                    e.setData(ft.value.item.powerMedicine, ft.ExtItem.getNum(ft.value.item.powerMedicine) + ""), e.setName(ftc.language("\u4f53\u529b\u836f\u6062\u590d")), e.setInteractable(!1), this.nodeItem.addChild(e.node), this.itemPowerMedicine = e, this.spriteSelect1.node.active = !0, this.spriteSelect2.node.active = !1
                },
                setData: function (t) { },
                enter: function () {
                    this.updateData(), ftc.setTvTip(this.node)
                },
                updateData: function () {
                    if (this.spriteSelect1.node.active) {
                        this.labelTimes.node.active = !0;
                        var t = ftc.ManagerData.get1("ManagerItem").buyPowerCount;
                        t >= ft.value.com.exchangePowerTimes && (t = ft.value.com.exchangePowerTimes - 1), this.spriteIcon.spriteFrame = ft.ExtItem.getLittleIconSprite(ft.value.item.gem);
                        var e = ft.value.com.exchangePowerGem[t];
                        this.labelNum.string = e, this.labelDesc.string = ftc.language("\u6d88\u8017%d\u5143\u5b9d\u6062\u590d100\u4f53\u529b").replace("%d", e), this.labelPowerNum.string = "100";
                        var i = ft.value.com.exchangePowerTimes - ftc.ManagerData.get1("ManagerItem").buyPowerCount + "/" + ft.value.com.exchangePowerTimes;
                        this.labelTimes.string = ftc.language("(\u4eca\u65e5\u53ef\u7528%d)").replace("%d", i)
                    } else this.labelTimes.node.active = !1, this.spriteIcon.spriteFrame = ft.ExtItem.getLittleIconSprite(ft.value.item.powerMedicine), this.labelNum.string = "1", this.labelPowerNum.string = "50", this.labelDesc.string = ftc.language("\u6d88\u80171\u4f53\u529b\u836f\u6062\u590d50\u4f53\u529b")
                },
                tick: function (t) {
                    this.tickAdd >= 0 && (this.tickAdd += t, this.tickAdd >= 1 && (this.updateRemainingTime(1), this.tickAdd -= 1))
                },
                updateRemainingTime: function (t) {
                    if (!(ftc.localDay <= 0))
                        if (ft.ExtItem.getPower() < this.powerSize && this.freeGetPowerRemainingTime) {
                            this.labelRemainingTime.node.active = !0;
                            var e = ft.value.com.powerRecoverTime;
                            this.freeGetPowerRemainingTime += t, this.freeGetPowerRemainingTime > e && (this.freeGetPowerRemainingTime -= e);
                            var i = e - parseInt(this.freeGetPowerRemainingTime) + e * (this.powerSize - ft.ExtItem.getPower() - 1),
                                a = ft.prefixZeroTime(Math.floor(i / 3600)),
                                n = ft.prefixZeroTime(Math.floor(i / 60) % 60),
                                s = ft.prefixZeroTime(i % 60);
                            this.labelRemainingTime.string = ftc.language("\u4f53\u529b\u6062\u590d\u65f6\u95f4") + a + ":" + n + ":" + s
                        } else this.labelRemainingTime.node.active = !1
                },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        itemBuyPower: function (t, e) {
                            0 === t ? ftc.showTip("\u5143\u5b9d\u4e0d\u8db3") : 1 === t ? ftc.showTip("\u6b21\u6570\u4e0d\u8db3") : 2 === t && (ftc.showTip("\u8d2d\u4e70\u6210\u529f"), this.updateData())
                        },
                        itemUse: function (t, e) {
                            this.itemPowerMedicine && this.itemPowerMedicine.setData(ft.value.item.powerMedicine, ft.ExtItem.getNum(ft.value.item.powerMedicine) + "")
                        },
                        getFreeGetPowerTime: function (t, e) {
                            this.freeGetPowerRemainingTime = ftc.getLocalTime() - parseInt(t), this.tickAdd = 0, this.updateRemainingTime(0)
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node || t.target === this.buttonClose.node ? this.cancel() : t.target === this.buttonGem.node ? (this.spriteSelect1.node.active = !0, this.spriteSelect2.node.active = !1, this.updateData()) : t.target === this.buttonItem.node ? (this.spriteSelect1.node.active = !1, this.spriteSelect2.node.active = !0, this.updateData()) : t.target === this.buttonConfirm.node && (this.spriteSelect1.node.active ? ftc.showDialog({
                        text: "\u786e\u5b9a\u8d2d\u4e70\u4f53\u529b?",
                        click1: function () {
                            ftc.send("itemBuyPower")
                        },
                        click2: function () { }
                    }) : ft.ExtItem.getNum(ft.value.item.powerMedicine) > 0 ? ftc.send("itemUse", {
                        id: ft.value.item.powerMedicine
                    }) : ftc.showTip("\u4f53\u529b\u836f\u4e0d\u8db3"))
                }
            })
        