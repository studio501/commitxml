
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodePanelHero: cc.Node,
                    spriteQuality1: cc.Sprite,
                    spriteIcon1: cc.Sprite,
                    labelName1: cc.Label,
                    labelPlus1: cc.Label,
                    spriteQuality2: cc.Sprite,
                    spriteIcon2: cc.Sprite,
                    labelName2: cc.Label,
                    labelPlus2: cc.Label,
                    labelWakeDesc: cc.Label,
                    nodeLayout: cc.Node,
                    labelCondition: cc.Label,
                    buttonWakeUp: cc.Button,
                    buttonDetail: cc.Button,
                    spriteNothing: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonWakeUp), this.addClick(this.buttonDetail, !0)
                },
                load: function () {
                    this.partWakeUpMaterials = [];
                    for (var t = 0; t < 4; t++) {
                        var e = this.newPart("PartWakeUpMaterial");
                        this.nodeLayout.addChild(e.node), this.partWakeUpMaterials.push(e)
                    }
                    ftc.isTv() && (this.buttonDetail.node.active = !1)
                },
                setData: function (t) {
                    this.data = t;
                    var e = ft.ExtHero.checkCanWake(this.data.id);
                    if (this.nodePanelHero.active = 0 === e, this.nodeLayout.active = 0 === e, this.spriteNothing.node.active = e > 0, e > 0) {
                        var i;
                        1 === e ? i = "已觉醒" : 2 === e ? i = "剧情武将无法觉醒" : 3 === e && (i = "非紫色武将无法觉醒"), this.labelCondition.string = ftc.language(i), this.labelWakeDesc.string = ""
                    } else {
                        this.spriteQuality1.spriteFrame = ft.ExtHero.getQualitySprite(this.data.id), this.spriteQuality2.spriteFrame = ft.ExtHero.getQualitySprite(this.data.id), this.spriteIcon1.spriteFrame = ft.ExtHero.getIconSprite(this.data.id), this.spriteIcon2.spriteFrame = ft.ExtHero.getIconSprite(this.data.id), this.labelName1.string = ft.ExtHero.getName(this.data.id), this.labelName2.string = ft.ExtHero.getName(this.data.id), this.labelPlus1.string = this.data.up ? "+" + this.data.up : "", this.labelPlus2.string = "+" + Math.min(this.data.up + 1, 4), this.labelWakeDesc.string = "", ft.ExtHero.getWakeAddPercent(this.data.up) > 0 && (this.labelWakeDesc.node.active = !0, this.labelWakeDesc.string = "+" + ft.ExtHero.getWakeAddPercent(this.data.up)), this.labelWakeDesc.string = "+" + ft.ExtHero.getWakeAddPercent(this.data.up + 1);
                        var a = ft.ExtHero.getConsumeWake(this.data.id, this.data.up + 1);
                        if (a) {
                            var n, s, o, r = a.ids,
                                c = a.nums;
                            for (this.canWakeUp = !0, h = 0; h < r.length; h++) n = ft.ExtItem.getNum(r[h]), s = c[h], this.partWakeUpMaterials[h].node.active = !0, this.partWakeUpMaterials[h].setData(r[h], n + "/" + s), n < s && (this.canWakeUp = !1);
                            for (var h = r.length; h < 4; h++) this.partWakeUpMaterials[h].node.active = !1;
                            if (this.data.up < 4) {
                                var f = ft.value.heroWakeUpLevels[this.data.up],
                                    d = ft.value.heroWakeUpStars[this.data.up];
                                o = ftc.language("武将需要等级") + f + "\n" + ftc.language("星级") + d
                            } else o = ftc.language("已觉醒至最高");
                            this.labelCondition.string = o
                        }
                    }
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    if (t.target === this.buttonWakeUp.node) {
                        if (this.data.up < 4) {
                            var i = ft.value.heroWakeUpLevels[this.data.up],
                                a = ft.value.heroWakeUpStars[this.data.up];
                            this.data.lv < i || this.data.star < a ? ftc.showTip(this.labelCondition.string) : this.canWakeUp ? ftc.send("heroWakeUp", {
                                id: this.data.id
                            }) : ftc.showTip("缺少道具")
                        }
                    } else t.target === this.buttonDetail.node && ftc.showDetailInfo(t.target, ft.ExtDetail.getInfo(ft.value.detail.hero_wake))
                }
            })
        