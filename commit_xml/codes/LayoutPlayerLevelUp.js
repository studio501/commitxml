
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonSelf: cc.Button,
                    spineLevelUp: sp.Skeleton,
                    nodeLayoutLevel: cc.Node,
                    spriteLevels: [cc.Sprite],
                    nodeLabels: cc.Node,
                    labelPower1: cc.Label,
                    labelPower2: cc.Label,
                    labelEquipLevel1: cc.Label,
                    labelEquipLevel2: cc.Label,
                    labelHeroLevel1: cc.Label,
                    labelHeroLevel2: cc.Label,
                    labelDesc1: cc.Label,
                    labelDesc2: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonSelf, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonSelf, this.node)
                },
                load: function () {
                    ftc.setTvTip(this.node), this.spineLevelUp.setEventListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "player_shengji" === e.data.name && (ftc.playEffect(ftc.type.effect.player_lvUp), this.nodeLabels.runAction(cc.fadeIn(.5)), this.nodeLayoutLevel.runAction(cc.fadeIn(.5)))
                    }.bind(this)), this.spineLevelUp.setCompleteListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "wait2" === (t.animation ? t.animation.name : "") && (this.canClose = !0)
                    }.bind(this)), this.canClose = !1
                },
                setData: function (t, e) {
                    this.nodeLayoutLevel.opacity = 0, this.nodeLabels.opacity = 0, this.spineLevelUp.setAnimation(0, "wait1"), this.spineLevelUp.addAnimation(0, "wait2", !0), this.setLevel(e);
                    var i = ft.ExtPlayer.getPowerSize(t),
                        a = ft.ExtPlayer.getPowerSize(e);
                    this.labelPower1.string = i, this.labelPower2.string = a, this.labelEquipLevel1.string = t, this.labelEquipLevel2.string = Math.min(e, ft.value.com.maxEquipLevel), this.labelHeroLevel1.string = t, this.labelHeroLevel2.string = Math.min(e, ft.value.com.maxHeroLevel);
                    var n = {};
                    for (var s in ftd.Event.data)
                        if (999 === ftd.Event.get(s, "task"))
                            for (var o = ftd.Event.get(s, "c_condition").split(":")[1], r = ftd.Event.get(s, "c_work").split(";"), c = 0; c < r.length; c++) r[c].startsWith("addPet") && (n[o] = JSON.parse(r[c].split(":")[1]));
                    var h = "",
                        f = "";
                    for (s = t + 1; s <= e; s++) {
                        var d = n[s];
                        if (d)
                            for (c = 0; c < d.length; c++) {
                                var l = ft.ExtItem.getPet(d[c]);
                                1 === ft.ExtPet.getType(l) ? h += ft.ExtPet.getName(l) + " " : f += ft.ExtPet.getName(l) + " "
                            }
                    }
                    this.labelDesc1.node.active = h, h && (this.labelDesc1.string = "\u89e3\u9501\u9635\u6cd5:" + h), this.labelDesc2.node.active = f, f && (this.labelDesc2.string = "\u89e3\u9501\u7b56\u7565:" + f)
                },
                setLevel: function (t) {
                    for (var e = []; t;) e.splice(0, 0, t % 10), t = parseInt(t / 10);
                    for (var i = 0; i < e.length; i++) this.spriteLevels[i].node.active = !0, this.spriteLevels[i].spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "level_" + e[i]);
                    for (i = e.length; i < this.spriteLevels.length; i++) this.spriteLevels[i].node.active = !1
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                onClick: function (t, e) {
                    this.canClose && this.cancel()
                }
            })
        