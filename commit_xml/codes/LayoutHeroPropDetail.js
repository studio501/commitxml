
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    labelTitle: cc.Label,
                    graphics: cc.Graphics,
                    labelNames: [cc.Label],
                    spriteDots: [cc.Sprite],
                    nodeProp: cc.Node,
                    listView: ftc.ListView,
                    buttonClose: cc.Button,
                    buttonInfoClose: cc.Button,
                    buttonSelf: cc.Button,
                    nodeInfo: cc.Node,
                    labelName: cc.Label,
                    labelInfo: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonSelf, !0), this.addClick(this.buttonInfoClose, {
                        zone: 1
                    }), this.buttonPropNames = [], this.spritePropIcons = [], this.labelPropNames = [], this.labelPropValues = [];
                    for (var t = 0; t < this.nodeProp.children.length; t++) {
                        var e = this.nodeProp.children[t],
                            i = e.getComponent(cc.Button),
                            a = e.getChildByName("spriteIcon").getComponent(cc.Sprite),
                            n = e.getChildByName("labelName").getComponent(cc.Label),
                            s = e.getChildByName("labelValue").getComponent(cc.Label);
                        this.buttonPropNames.push(i), this.spritePropIcons.push(a), this.labelPropNames.push(n), this.labelPropValues.push(s)
                    }
                    for (t = 0; t < this.buttonPropNames.length; t++) this.addClick(this.buttonPropNames[t]);
                    this.addClick(this.buttonClose), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    this.nodeInfo.active = !1
                },
                setData: function (t) {
                    this.data = t;
                    var e = this.data.id || this.data,
                        i = !!this.data.id;
                    this.labelTitle.string = ft.ExtHero.getName(e);
                    for (var a = 0; a < this.labelPropNames.length; a++) this.spritePropIcons[a].spriteFrame = ft.ExtPropName.getSpriteIcon(a + 1), this.labelPropNames[a].string = ft.ExtPropName.getName(a + 1) + ":", this.labelPropValues[a].string = ft.ExtHero.getSelfValue(this.data, a + 1, 1, 0, 0);
                    var n = [];
                    for (a = 0; a < 6; a++) {
                        var s = ft.ExtHero.getGrowth(e);
                        n.push(ft.ExtHero.getBaseValue(e, a + 1) * ft.ExtGrowth.getValue(s, a + 1) / 100)
                    }
                    var o = [ft.ExtHero.getPropLevel(n[0], [55, 100, 150, 180, 200]), ft.ExtHero.getPropLevel(n[1], [30, 45, 90, 140, 170]), ft.ExtHero.getPropLevel(n[2], [2.5, 3.5, 4.5, 5.5, 6.8]), ft.ExtHero.getPropLevel(n[3], [15, 30, 45, 70, 100]), ft.ExtHero.getPropLevel(n[4], [400, 600, 800, 1e3, 1600]), ft.ExtHero.getPropLevel(n[5], [1, 1.5, 2.5, 3.5, 4.5])],
                        r = ["D", "C", "B", "A", "S", "SS"],
                        c = [15, 30, 45, 60, 75, 75],
                        h = [];
                    for (a = 0; a < o.length; a++) {
                        var f = c[o[a]] * Math.sin(-Math.PI / 6 + Math.PI / 3 * a),
                            d = c[o[a]] * Math.cos(-Math.PI / 6 + Math.PI / 3 * a);
                        h.push(new cc.v2(f, d)), this.spriteDots[a].node.position = h[a], this.labelNames[a].string = ft.ExtPropName.getName(a + 1) + r[o[a]]
                    }
                    this.graphics.clear(!0), this.graphics.moveTo(h[0].x, h[0].y), this.graphics.lineTo(h[1].x, h[1].y), this.graphics.lineTo(h[2].x, h[2].y), this.graphics.lineTo(h[3].x, h[3].y), this.graphics.lineTo(h[4].x, h[4].y), this.graphics.lineTo(h[5].x, h[5].y), this.graphics.close(), this.graphics.stroke(), this.graphics.fill();
                    var l = [];
                    for (var a in ftd.Propname.data) 1 !== ft.ExtPropName.getType(a) && "number" == typeof ft.ExtPropName.getDefault(a) && l.push(a);
                    var u = [];
                    for (a = 0; a < l.length; a++) {
                        var p = ft.ExtPropName.getCouple(l[a]);
                        if (p)
                            for (var g = a + 1; g < l.length; g++) {
                                if (p === ft.ExtPropName.getCouple(l[g])) {
                                    var m;
                                    i ? (_ = ft.ExtHero.getValue(this.data, l[a]), m = ft.ExtHero.getValue(this.data, l[g])) : (_ = ft.ExtHero.getSelfValue(this.data, l[a]), m = ft.ExtHero.getSelfValue(this.data, l[g]));
                                    var b = 100 - (100 + _) * (100 - m) / 100 + (2 === (y = ft.ExtPropName.getType(l[a])) ? "" : "%"),
                                        v = l[g];
                                    l[g] == ft.type.prop.zljm && (v = ft.type.prop.zljc, b = -(100 - (100 + _) * (100 - m) / 100) + (2 === y ? "" : "%")), u.push({
                                        id: v,
                                        name: ft.ExtPropName.getName(v),
                                        value: b
                                    });
                                    break
                                }
                            } else {
                            var y = ft.ExtPropName.getType(l[a]),
                                _ = i ? ft.ExtHero.getValue(this.data, l[a]) : ft.ExtHero.getSelfValue(this.data, l[a]);
                            u.push({
                                id: l[a],
                                name: ft.ExtPropName.getName(l[a]),
                                value: _ + (2 === y ? "" : "%")
                            })
                        }
                    }
                    this.listView.setListView(u)
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectHeroPropDetailItem: function (t, e) {
                            this.nodeInfo.active = !0, this.nodeInfo.position = this.listView.getScrollView().content.convertToWorldSpaceAR(t.node.position), this.nodeInfo.x += 50, this.labelName.string = ft.ExtPropName.getName(t.data.id), this.labelInfo.string = ft.ExtPropName.getInfo(t.data.id)
                        }
                    }
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonClose.node) this.cancel(!0);
                    else if (t.target == this.buttonSelf.node || t.target == this.buttonInfoClose.node) this.nodeInfo.active && (this.nodeInfo.active = !1, ftc.ManagerTV.nextSelect());
                    else
                        for (var i = 0; i < this.buttonPropNames.length; i++)
                            if (t.target === this.buttonPropNames[i].node) {
                                var a = this.buttonPropNames[i].node.convertToWorldSpaceAR(cc.v2(0, 0));
                                this.nodeInfo.active = !0, this.nodeInfo.position = a, this.nodeInfo.x += 50, this.labelName.string = ft.ExtPropName.getName(i + 1), this.labelInfo.string = ft.ExtPropName.getInfo(i + 1), ftc.ManagerTV.nextSelect(this.buttonInfoClose, this.node);
                                break
                            }
                }
            })
        