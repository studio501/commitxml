
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeLayout: cc.Node,
                    spriteIcons: [cc.Sprite],
                    labelInfos: [cc.Label],
                    spriteIndex: cc.Sprite
                },
                init: function () { },
                load: function () {
                    this.spriteIndex.node.parent.active = !1
                },
                reset: function () {
                    for (var t = 0; t < this.labelInfos.length; t++) this.labelInfos[t].node.parent.active = !1;
                    this.spriteIndex.node.parent.active = !1
                },
                setData: function (t, e, i) {
                    var a = [];
                    a.push(ft.ExtPetValue.getWljs(t, e, i)), a.push(ft.ExtPetValue.getWljm(t, e, i)), a.push(ft.ExtPetValue.getYsjs(t, e, i)), a.push(ft.ExtPetValue.getYsjm(t, e, i)), a.push(ft.ExtPetValue.getValue1(t, e, i)), a.push(ft.ExtPetValue.getValue2(t, e, i));
                    for (var n = 0; n < a.length; n++)
                        if (a[n] > 0)
                            if (this.labelInfos[n].node.parent.active = !0, n < 4) this.labelInfos[n].string = parseInt(100 * a[n]) + "%";
                            else {
                                var s = a[n],
                                    o = ft.ExtPetValue["getProp" + (n - 3)](t, e, i),
                                    r = ft.ExtPetValue["getPer" + (n - 3)](t, e, i);
                                this.spriteIcons[n].spriteFrame = ft.ExtPropName.getSpriteIcon(o), s > 0 && (s = "+" + s), this.labelInfos[n].string = s + (r ? "%" : "")
                            }
                        else this.labelInfos[n].node.parent.active = !1
                },
                setIndex: function (t) {
                    this.spriteIndex.node.parent.active = !0, this.spriteIndex.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "fight_" + (t + 1))
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        