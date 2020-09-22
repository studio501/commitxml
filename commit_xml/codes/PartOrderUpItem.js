
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    spriteIndex: cc.Sprite,
                    nodeLayout: cc.Node
                },
                init: function () { },
                load: function () {
                    this._partOrderUpItemInfos = [];
                    for (var t = 0; t < 6; t++) {
                        var e = this.newPart("PartOrderUpItemInfo");
                        this.nodeLayout.addChild(e.node, t), this._partOrderUpItemInfos.push(e)
                    }
                },
                updateData: function (t) {
                    var e = this.data.id,
                        i = this.data.up,
                        a = this.index;
                    this.spriteIndex.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "fight_" + (this.index + 1));
                    for (var n = ["物理伤害", "物理承伤", "元素伤害", "元素承伤"], s = ["getWljs", "getWljm", "getYsjs", "getYsjm"], o = [], r = 0; r < s.length; r++) {
                        var c = n[r];
                        (f = ft.ExtPetValue[s[r]](e, a, i)) === (d = ft.ExtPetValue[s[r]](e, a, i + 1)) && (d = void 0), void 0 !== d && (d = parseInt(100 * d)), o.push({
                            name: c,
                            value1: parseInt(100 * f),
                            value2: d,
                            per: 1
                        })
                    }
                    for (r = 1; r <= 2; r++) {
                        var h = ft.ExtPetValue["getProp" + r](e, a, i);
                        if (h > 0) {
                            c = ft.ExtPropName.getName(h);
                            var f, d, l = ft.ExtPetValue["getPer" + r](e, a, i);
                            (f = ft.ExtPetValue["getValue" + r](e, a, i)) === (d = ft.ExtPetValue["getValue" + r](e, a, i + 1)) && (d = void 0), void 0 !== d && (d = d), o.push({
                                name: c,
                                value1: f,
                                value2: d,
                                per: l
                            })
                        }
                    }
                    for (r = 0; r < o.length; r++) this._partOrderUpItemInfos[r].node.active = !0, this._partOrderUpItemInfos[r].setData(o[r], t);
                    for (r = o.length; r < 6; r++) this._partOrderUpItemInfos[r].node.active = !1
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        