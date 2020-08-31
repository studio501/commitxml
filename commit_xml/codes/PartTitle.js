
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spriteQuality: cc.Sprite,
                    labelTitle: cc.Label,
                    spriteDecorationL: cc.Sprite,
                    spriteLevel: cc.Sprite,
                    spriteDecorationR: cc.Sprite,
                    spriteParticle: cc.Sprite
                },
                init: function () { },
                load: function () { },
                setData: function () { },
                cleanup: function () { },
                updateData: function (t) {
                    for (var e = ftc.ManagerData.get1("ManagerTitle").titleIds.split(","), i = "", a = 0; a < e.length; a++) e[a] > 0 && (i += ft.ExtTitle.getName(e[a]));
                    if (this.node.active = i.length > 0, this.node.active) {
                        this.labelTitle.string = i;
                        var n, s = ftc.ManagerData.get1("ManagerTitle").level;
                        this.spriteQuality.spriteFrame = ft.ExtTitle.getQualitySprite(s), this.labelTitle.node.getComponent(cc.LabelOutline).color = ft.ExtTitle.getQualityColor(s);
                        var o = ft.ExtTitle.getNextExp(s),
                            r = ft.ExtTitle.getTotalExp(ftc.ManagerData.get2("Title"));
                        if (r >= o) n = 3;
                        else {
                            var c = ft.value.titleLvUpNeeds[s - 1];
                            n = Math.floor((r - c) / Math.floor((o - c) / 3)) + 1
                        }
                        this.spriteLevel.spriteFrame = ft.ExtDecoration.getLvSpriteFrame(n);
                        var h = void 0 === t ? ftc.ManagerData.get1("ManagerDecoration").decorationId : t;
                        if (h) {
                            this.spriteDecorationL.node.active = !0, this.spriteDecorationR.node.active = !0;
                            var f = ftc.ManagerRes.getSpriteFrame("program", "decoration_" + h);
                            this.spriteDecorationL.spriteFrame = f, this.spriteDecorationR.spriteFrame = f
                        } else this.spriteDecorationL.node.active = !1, this.spriteDecorationR.node.active = !1
                    }
                },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        