
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeRoot: cc.Node,
                    nodeItem: cc.Node,
                    labelName: cc.Label,
                    labelNum: cc.Label,
                    labelIntro: cc.Label,
                    labelInfo: cc.RichText,
                    nodeSkill: cc.Node,
                    labelSkill: cc.RichText,
                    nodePack: cc.Node,
                    labelPack: cc.RichText,
                    nodeProp: cc.Node,
                    labelProp: cc.RichText,
                    buttonTvClose: cc.Button
                },
                init: function () {
                    this.node.on(cc.Node.EventType.TOUCH_END, function () {
                        this.cancel()
                    }, this), this.node._touchListener.swallowTouches = !1, this.addClick(this.buttonTvClose), ftc.ManagerTV.setBackButton(this.buttonTvClose, this.node)
                },
                load: function () {
                    this._partItem = this.newPart("PartItem"), this._partItem.node.scale = .76, this._partItem.setInteractable(!1), this.nodeItem.addChild(this._partItem.node)
                },
                setData: function (t) {
                    var e = t.id,
                        i = 1,
                        a = 0;
                    t.entityId && (i = t.lv, a = t.star, t.up), this._partItem.setEquipData(t, !1), this.labelName.string = ft.ExtEquip.getName(e), this.labelNum.string = "\u62e5\u6709\u6570\u91cf:" + ft.ExtEquip.getNum(e);
                    var n = ft.ExtEquip.getType(e);
                    n > 1e3 && (this.labelIntro.string = ft.ExtHero.getName(n) + "\u4e13\u5c5e\u6b66\u5668"), this.labelIntro.node.active = n > 1e3;
                    var s = ft.ExtEquip.getInfo(e);
                    this.labelInfo.string = ftc.replaceDigitColor(s, "d77332"), this.nodeSkill.active = !1;
                    var o = ft.ExtEquip.getSkillAdd(e);
                    if (o > 0) this.nodeSkill.active = !0, this.labelSkill.string = ft.ExtSkill.getName(o) + "\n" + ftc.replaceDigitColor(ft.ExtSkill.getInfo(o), "d77332");
                    else {
                        var r = ft.ExtEquip.getSkillLevelUp(e);
                        if (r > 0) {
                            this.nodeSkill.active = !0;
                            var c = ft.ExtHero.getSkillIds(ft.ExtEquip.getType(e), 1);
                            c && c.length > 0 && (this.labelSkill.string = ft.ExtSkill.getName(c[0]) + "\n\u6280\u80fd\u7b49\u7ea7+" + r)
                        }
                    }
                    var h = ft.ExtEquip.mapEquipPack[e];
                    h && (this.labelPack.string = ft.ExtEquipPack.getName(h)), this.nodePack.active = !!h;
                    s = "";
                    for (var f = 0; f < ft.value.com.basePropCount; f++) {
                        var d = ft.ExtPropName.getName(f + 1);
                        0 !== (l = ft.ExtEquip.getLevelValue(t, f + 1, i)) && (f + 1 === ft.type.prop.gjjl ? s += d + l + "\n" : s += d + l + "%\n")
                    }
                    for (f = 0; f < ft.value.com.basePropCount; f++) {
                        d = ft.ExtPropName.getName(f + 1);
                        0 !== (l = ft.ExtEquip.getExtraValue(t, f + 1, i)) && (s += d + l + "  ")
                    }
                    for (f = 0; f < ft.value.com.basePropCount; f++) {
                        var l;
                        d = ft.ExtPropName.getName(f + 1);
                        0 !== (l = ft.ExtEquip.getStarValue(t, f + 1, a)) && (s += d + (l > 0 ? "" : "-") + Math.abs(l) + "\n")
                    }
                    this.labelProp.string = ftc.replaceDigitColor(s, "d77332")
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonTvClose.node && this.cancel()
                }
            })
        