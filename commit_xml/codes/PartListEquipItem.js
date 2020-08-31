
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    buttonSelf: cc.Button,
                    nodeItem: cc.Node,
                    spineLvUp: sp.Skeleton,
                    labelName: cc.Label,
                    labelInfo: cc.Label,
                    labelStatus: cc.Label,
                    labelNum: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                load: function () {
                    this.item = this.newPart("PartItem"), this.item.setInteractable(!1), this.nodeItem.addChild(this.item.node), this.spineLvUp.node.active = !1
                },
                updateData: function (t) {
                    this.item.setEquipData(this.data), this.labelName.string = ft.ExtEquip.getName(this.data.id);
                    for (var e = "", i = 0; i < ft.value.com.basePropCount; i++) {
                        var a = ft.ExtPropName.getName(i + 1);
                        0 !== (n = ft.ExtEquip.getLevelValue(this.data, i + 1)) && (i + 1 === ft.type.prop.gjjl ? e += a + n + "  " : e += a + n + "%  ")
                    }
                    for (i = 0; i < ft.value.com.basePropCount; i++) {
                        a = ft.ExtPropName.getName(i + 1);
                        0 !== (n = ft.ExtEquip.getExtraValue(this.data, i + 1)) && (e += a + n + "  ")
                    }
                    for (i = 0; i < ft.value.com.basePropCount; i++) {
                        var n;
                        a = ft.ExtPropName.getName(i + 1);
                        0 !== (n = ft.ExtEquip.getStarValue(this.data, i + 1)) && (e += a + (n > 0 ? "" : "-") + Math.abs(n) + "  ")
                    }
                    if (this.labelInfo.string = e, this.labelNum.node.active = this.data.pos < 0, this.data.pos >= 0) {
                        var s = ft.ExtHero.getHeroByPos(this.data.pos);
                        s && (this.labelStatus.string = ft.ExtHero.getName(s.id))
                    } else this.labelStatus.string = "", this.labelNum.string = ftc.language("\u6570\u91cf:") + this.data.num
                },
                playAni: function () {
                    this.spineLvUp.node.active = !0, this.spineLvUp.setAnimation(0, "wait1", !1)
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && ftc.sendClient("c_onSelectEquipItem", this)
                }
            })
        