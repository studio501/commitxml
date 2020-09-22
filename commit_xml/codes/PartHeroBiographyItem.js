
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    labelTitle: cc.Label,
                    labelTitle2: cc.RichText,
                    labelAdd: cc.Label,
                    buttonUnlock: cc.Button,
                    labelDesc: cc.Label,
                    labelInfo: cc.Label,
                    buttonDetail: cc.Button
                },
                init: function () {
                    this.buttonUnlock && this.addClick(this.buttonUnlock), this.buttonDetail && this.addClick(this.buttonDetail)
                },
                setData: function (t, e) {
                    if (this.data = t, this.index = e, 0 === e) this.labelTitle.string = "《" + ft.ExtHero.getName(this.data.id) + ftc.language("传记") + "》", this.labelInfo.string = ft.ExtHero.getInfo(this.data.id);
                    else if (e < 5) {
                        var i = ft.ExtItem.mapHeroBiography[this.data.id];
                        if (this.data.biographyStage < this.index) {
                            this.labelAdd.node.active = !1, this.labelInfo.node.active = !1, this.buttonUnlock.node.active = !0, this.labelDesc && (this.labelDesc.string = ft.ExtHero.getBiographyInfo(this.index));
                            for (var a = ft.ExtItem.getNum(i), n = 0; n <= this.data.biographyStage; n++) a += ft.value.heroBiographyNeed[n];
                            var s = 0;
                            for (n = 0; n <= this.index; n++) s += ft.value.heroBiographyNeed[n];
                            var o = ft.ExtHero.getName(this.data.id),
                                r = s > a ? "<color=#ff00000>" : "<color=#108B00>";
                            this.labelTitle2.string = "《" + o + ftc.language("传记") + "》(" + r + a + "/" + s + "</color><color=#865420>)"
                        } else this.labelInfo.node.active = !0, this.labelAdd.node.active = !0, this.labelAdd.string = ft.ExtHero.getBiographyInfo(this.index), this.buttonUnlock.node.active = !1, this.labelTitle2.string = ftc.language("传记") + this.index, this.labelInfo.string = ft.replaceAll(ft.ExtHero.getInfo(this.data.id, this.index), "|", "\n")
                    } else {
                        var c, h, f, d, l;
                        if (5 === this.index ? (c = this.data.feats & ft.type.feat.fight, s = 100, h = this.data.fights, f = ftc.language("捷报频传"), d = ftc.language("完成连战战斗"), l = ftc.language("可在设置界面更改头像")) : 6 === this.index && (c = this.data.feats & ft.type.feat.kill, s = 1e4, h = this.data.kills, f = ftc.language("万人敌"), d = ftc.language("击杀敌将"), l = ftc.language("久经沙场才能获得这项荣誉")), c) this.labelInfo.node.active = !0, this.labelAdd.node.active = !0, this.labelAdd.string = ft.ExtHero.getBiographyInfo(this.index), this.buttonUnlock.node.parent.active = !1, this.buttonDetail.node.active = !1, this.labelTitle2.string = f, this.labelInfo.string = l;
                        else {
                            this.labelAdd.node.active = !1, this.labelInfo.node.active = !1, this.buttonUnlock.node.parent.active = !0, this.buttonDetail.node.active = s > h, this.buttonUnlock.node.active = s <= h, this.labelDesc && (this.labelDesc.string = ft.ExtHero.getBiographyInfo(this.index));
                            r = s > h ? "<color=#ff00000>" : "<color=#108B00>";
                            this.labelTitle2.string = d + "(" + r + h + "/" + s + "</color><color=#865420>)"
                        }
                    }
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    if (this.buttonUnlock && t.target === this.buttonUnlock.node)
                        if (this.index < 5) this.data.biographyStage + 1 === this.index ? ftc.send("heroBiographyUnlock", this.data.id) : ftc.showTip("请先解锁之前的传记");
                        else {
                            var i = 5 === this.index ? ft.type.feat.fight : ft.type.feat.kill;
                            (i === ft.type.feat.fight ? this.data.fights >= ft.type.feat.needNums[0] : this.data.kills >= ft.type.feat.needNums[1]) ? ftc.send("heroFeatUnlock", {
                                id: this.data.id,
                                type: i
                            }) : ftc.showTip("条件未满足")
                        }
                    else if (this.buttonDetail && t.target === this.buttonDetail.node) {
                        var a = 5 === this.index ? "需要在连战战斗中获胜才会记录\n连战战斗可以在枫林幻境和乱战幻境等地方参与" : "需要导致敌方武将死亡的最后一击由此武将造成才会记录\n毒类持续扣兵力的技能无法记录";
                        ftc.showDetailInfo(this.buttonDetail.node, a)
                    }
                }
            })
        