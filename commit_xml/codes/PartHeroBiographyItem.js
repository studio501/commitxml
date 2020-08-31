
            
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
                    if (this.data = t, this.index = e, 0 === e) this.labelTitle.string = "\u300a" + ft.ExtHero.getName(this.data.id) + ftc.language("\u4f20\u8bb0") + "\u300b", this.labelInfo.string = ft.ExtHero.getInfo(this.data.id);
                    else if (e < 5) {
                        var i = ft.ExtItem.mapHeroBiography[this.data.id];
                        if (this.data.biographyStage < this.index) {
                            this.labelAdd.node.active = !1, this.labelInfo.node.active = !1, this.buttonUnlock.node.active = !0, this.labelDesc && (this.labelDesc.string = ft.ExtHero.getBiographyInfo(this.index));
                            for (var a = ft.ExtItem.getNum(i), n = 0; n <= this.data.biographyStage; n++) a += ft.value.heroBiographyNeed[n];
                            var s = 0;
                            for (n = 0; n <= this.index; n++) s += ft.value.heroBiographyNeed[n];
                            var o = ft.ExtHero.getName(this.data.id),
                                r = s > a ? "<color=#ff00000>" : "<color=#108B00>";
                            this.labelTitle2.string = "\u300a" + o + ftc.language("\u4f20\u8bb0") + "\u300b(" + r + a + "/" + s + "</color><color=#865420>)"
                        } else this.labelInfo.node.active = !0, this.labelAdd.node.active = !0, this.labelAdd.string = ft.ExtHero.getBiographyInfo(this.index), this.buttonUnlock.node.active = !1, this.labelTitle2.string = ftc.language("\u4f20\u8bb0") + this.index, this.labelInfo.string = ft.replaceAll(ft.ExtHero.getInfo(this.data.id, this.index), "|", "\n")
                    } else {
                        var c, h, f, d, l;
                        if (5 === this.index ? (c = this.data.feats & ft.type.feat.fight, s = 100, h = this.data.fights, f = ftc.language("\u6377\u62a5\u9891\u4f20"), d = ftc.language("\u5b8c\u6210\u8fde\u6218\u6218\u6597"), l = ftc.language("\u53ef\u5728\u8bbe\u7f6e\u754c\u9762\u66f4\u6539\u5934\u50cf")) : 6 === this.index && (c = this.data.feats & ft.type.feat.kill, s = 1e4, h = this.data.kills, f = ftc.language("\u4e07\u4eba\u654c"), d = ftc.language("\u51fb\u6740\u654c\u5c06"), l = ftc.language("\u4e45\u7ecf\u6c99\u573a\u624d\u80fd\u83b7\u5f97\u8fd9\u9879\u8363\u8a89")), c) this.labelInfo.node.active = !0, this.labelAdd.node.active = !0, this.labelAdd.string = ft.ExtHero.getBiographyInfo(this.index), this.buttonUnlock.node.parent.active = !1, this.buttonDetail.node.active = !1, this.labelTitle2.string = f, this.labelInfo.string = l;
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
                        if (this.index < 5) this.data.biographyStage + 1 === this.index ? ftc.send("heroBiographyUnlock", this.data.id) : ftc.showTip("\u8bf7\u5148\u89e3\u9501\u4e4b\u524d\u7684\u4f20\u8bb0");
                        else {
                            var i = 5 === this.index ? ft.type.feat.fight : ft.type.feat.kill;
                            (i === ft.type.feat.fight ? this.data.fights >= ft.type.feat.needNums[0] : this.data.kills >= ft.type.feat.needNums[1]) ? ftc.send("heroFeatUnlock", {
                                id: this.data.id,
                                type: i
                            }) : ftc.showTip("\u6761\u4ef6\u672a\u6ee1\u8db3")
                        }
                    else if (this.buttonDetail && t.target === this.buttonDetail.node) {
                        var a = 5 === this.index ? "\u9700\u8981\u5728\u8fde\u6218\u6218\u6597\u4e2d\u83b7\u80dc\u624d\u4f1a\u8bb0\u5f55\n\u8fde\u6218\u6218\u6597\u53ef\u4ee5\u5728\u67ab\u6797\u5e7b\u5883\u548c\u4e71\u6218\u5e7b\u5883\u7b49\u5730\u65b9\u53c2\u4e0e" : "\u9700\u8981\u5bfc\u81f4\u654c\u65b9\u6b66\u5c06\u6b7b\u4ea1\u7684\u6700\u540e\u4e00\u51fb\u7531\u6b64\u6b66\u5c06\u9020\u6210\u624d\u4f1a\u8bb0\u5f55\n\u6bd2\u7c7b\u6301\u7eed\u6263\u5175\u529b\u7684\u6280\u80fd\u65e0\u6cd5\u8bb0\u5f55";
                        ftc.showDetailInfo(this.buttonDetail.node, a)
                    }
                }
            })
        