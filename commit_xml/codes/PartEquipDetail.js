
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeBaseProp: cc.Node,
                    layoutBaseProp: cc.Node,
                    nodeSkill: cc.Node,
                    labelSkillName: cc.Label,
                    labelSkillInfo: cc.Label,
                    nodeWakeProp: cc.Node,
                    layoutWakeProp: cc.Node,
                    nodeJewelProp: cc.Node,
                    layoutJewelProp: cc.Node,
                    nodePackInfo: cc.Node,
                    labelName: cc.Label,
                    labelEquips: cc.RichText,
                    labelEquips2: cc.RichText,
                    labelDescs: [cc.Label],
                    labelValues: [cc.Label]
                },
                init: function () { },
                setData: function (t) {
                    this.data = t;
                    for (var e = this.data.id || this.data, i = !!this.data.id, a = 0; a < this.layoutBaseProp.children.length; a++) this.layoutBaseProp.children[a].active = !1;
                    for (a = 0; a < this.layoutWakeProp.children.length; a++) this.layoutWakeProp.children[a].active = !1;
                    for (a = 0; a < this.layoutJewelProp.children.length; a++) this.layoutJewelProp.children[a].active = !1;
                    var n = 0;
                    for (a = 0; a < ft.value.com.basePropCount; a++) {
                        if (c = i ? ft.ExtEquip.getLevelValue(this.data, a + 1) : ft.ExtEquip.getLevelValue({
                            id: e
                        }, a + 1, 1)) {
                            (x = this.layoutBaseProp.children[n]).active = !0;
                            var s = x.getChildByName("spriteIcon").getComponent(cc.Sprite),
                                o = x.getChildByName("labelName").getComponent(cc.Label),
                                r = x.getChildByName("labelValue").getComponent(cc.Label);
                            s.spriteFrame = ft.ExtPropName.getSpriteIcon(a + 1), o.string = ft.ExtPropName.getName(a + 1), a + 1 === ft.type.prop.gjjl ? r.string = c : r.string = c + "%", n++
                        }
                    }
                    for (a = 0; a < ft.value.com.basePropCount; a++) {
                        var c;
                        if (c = i ? ft.ExtEquip.getExtraValue(this.data, a + 1) : ft.ExtEquip.getExtraValue({
                            id: e
                        }, a + 1, 1)) {
                            (x = this.layoutBaseProp.children[n]).active = !0;
                            s = x.getChildByName("spriteIcon").getComponent(cc.Sprite), o = x.getChildByName("labelName").getComponent(cc.Label), r = x.getChildByName("labelValue").getComponent(cc.Label);
                            s.spriteFrame = ft.ExtPropName.getSpriteIcon(a + 1), o.string = ft.ExtPropName.getName(a + 1), r.string = c, n++
                        }
                    }
                    var h = !1,
                        f = ft.ExtEquip.getSkillAdd(e);
                    if (f > 0) h = !0, this.labelSkillName.string = ft.ExtSkill.getName(f), this.labelSkillInfo.string = ft.ExtSkill.getInfo(f);
                    else {
                        var d = ft.ExtEquip.getSkillLevelUp(e);
                        if (d > 0) {
                            var l = ft.ExtHero.getSkillIds(ft.ExtEquip.getType(e), 1);
                            l && l.length > 0 && (h = !0, this.labelSkillName.string = ft.ExtSkill.getName(l[0]), this.labelSkillInfo.string = "\u6280\u80fd\u7b49\u7ea7+" + d)
                        }
                    }
                    if (this.nodeSkill.active = h, this.nodeWakeProp.active = ft.ExtEquip.canStarUp(e), this.nodeWakeProp.active) {
                        n = 0;
                        var u, p = this.data.star || 0,
                            g = ft.ExtEquip.getMaxStar(e);
                        if (p >= g) {
                            if (u = ft.ExtEquip.getAdvancedTypes(e, p - 1))
                                for (a = 0; a < u.length; a++) {
                                    (x = this.layoutWakeProp.children[n]).active = !0;
                                    s = x.getChildByName("spriteIcon").getComponent(cc.Sprite), o = x.getChildByName("labelName").getComponent(cc.Label);
                                    var m = x.getChildByName("labelValue1").getComponent(cc.Label),
                                        b = x.getChildByName("labelValue2").getComponent(cc.Label),
                                        v = x.getChildByName("spriteArrow").getComponent(cc.Sprite);
                                    s.spriteFrame = ft.ExtPropName.getSpriteIcon(u[a]), o.string = ft.ExtPropName.getName(u[a]), m.string = ft.ExtEquip.getStarValue({
                                        id: e
                                    }, u[a], g, !0), v.node.active = !1, b.node.active = !1, n++
                                }
                        } else if (u = ft.ExtEquip.getAdvancedTypes(e, p))
                            for (a = 0; a < u.length; a++) {
                                (x = this.layoutWakeProp.children[n]).active = !0;
                                s = x.getChildByName("spriteIcon").getComponent(cc.Sprite), o = x.getChildByName("labelName").getComponent(cc.Label), m = x.getChildByName("labelValue1").getComponent(cc.Label), b = x.getChildByName("labelValue2").getComponent(cc.Label), v = x.getChildByName("spriteArrow").getComponent(cc.Sprite);
                                s.spriteFrame = ft.ExtPropName.getSpriteIcon(u[a]), o.string = ft.ExtPropName.getName(u[a]), m.string = ft.ExtEquip.getStarValue({
                                    id: e
                                }, u[a], p, !0), b.string = ft.ExtEquip.getStarValue({
                                    id: e
                                }, u[a], Math.min(p + 1, g), !0), v.node.active = !0, b.node.active = !0, n++
                            }
                    }
                    if (this.nodeJewelProp.active = i && ft.ExtEquip.mapEquipPack[e] && ft.ExtEquip.getQuality(e) >= ft.type.quality.golden, this.nodeJewelProp.active) {
                        var y = ft.ExtJewel.getJewelsByEquip(this.data),
                            _ = !1;
                        n = 0;
                        for (a = 0; a < y.length; a++)
                            if (y[a]) {
                                var x;
                                _ = !0, (x = this.layoutJewelProp.children[n]).active = !0;
                                s = x.getChildByName("spriteIcon").getComponent(cc.Sprite), o = x.getChildByName("labelName").getComponent(cc.Label), r = x.getChildByName("labelValue").getComponent(cc.Label);
                                var w = ft.ExtJewel.getPropType(y[a].id);
                                s.spriteFrame = ft.ExtPropName.getSpriteIcon(w), o.string = ft.ExtPropName.getName(w), r.string = ft.ExtJewel.getPropValue(y[a].id) + (3 === ft.ExtPropName.getType(w) ? "%" : ""), n++
                            } _ || (this.nodeJewelProp.active = !1)
                    }
                    var S = ft.ExtEquip.mapEquipPack[e];
                    if (this.nodePackInfo.active = !!S, this.nodePackInfo.active) {
                        var k = ft.ExtEquipPack.getEquips(S),
                            I = 0,
                            T = {};
                        if (void 0 !== this.data.pos) {
                            var C = ft.ExtEquip.getEquipsByPos(this.data.pos);
                            for (a = 0; a < k.length; a++)
                                for (var E = 0; E < C.length; E++)
                                    if (k[a] === C[E].id) {
                                        T[k[a]] = k[a], I++;
                                        break
                                    }
                        }
                        this.labelName.string = ft.ExtEquipPack.getName(S);
                        var M = "",
                            P = "";
                        for (a = 0; a < k.length; a += 2) T[k[a]] ? M += "<color=#108B00>" + ft.ExtEquip.getName(k[a]) + "</c>\n" : M += "<color=#805741>" + ft.ExtEquip.getName(k[a]) + "</c>\n", a + 1 < k.length && (T[k[a + 1]] ? P += "<color=#108B00>" + ft.ExtEquip.getName(k[a + 1]) + "</c>\n" : P += "<color=#805741>" + ft.ExtEquip.getName(k[a + 1]) + "</c>\n");
                        this.labelEquips.string = M, this.labelEquips2.string = P;
                        var D = ft.ExtEquipPack.getNums(S),
                            L = ft.ExtEquipPack.getInfos(S);
                        for (a = 0; a < D.length && a < this.labelDescs.length; a++) this.labelDescs[a].node.active = !0, this.labelValues[a].node.active = !0, this.labelDescs[a].string = D[a] + ftc.language("\u4ef6\u5957\u88c5\u5c5e\u6027:"), this.labelValues[a].string = L[a], this.labelValues[a].node.color = I >= D[a] ? ftc.newColor(1084160) : ftc.newColor(8410945);
                        for (a = D.length; a < this.labelValues.length; a++) this.labelDescs[a].node.active = !1, this.labelValues[a].node.active = !1
                    }
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        