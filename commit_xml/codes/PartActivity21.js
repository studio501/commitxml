
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    buttonTabs: [cc.Button],
                    nodeBgs: [cc.Node],
                    nodeGames: [cc.Node],
                    spriteInfoBg: cc.Sprite,
                    spriteInfoTv: cc.Sprite,
                    spriteInfo: cc.Sprite,
                    spriteQRCode: cc.Sprite,
                    buttonDetail: cc.Button,
                    nodeLayout: cc.Node,
                    spineHero: sp.Skeleton
                },
                init: function () {
                    this.addClick(this.buttonDetail);
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t])
                },
                load: function () {
                    this._partItems = []
                },
                setData: function (t) {
                    this.data = t, ftc.ManagerH5.isH5() ? (this.buttonTabs[0].node.active = !1, this.selectTab(1)) : this.selectTab(0)
                },
                selectTab: function (t) {
                    this.tabIndex = t;
                    for (var e = 0; e < this.buttonTabs.length; e++) this.buttonTabs[e].interactable = t !== e, this.nodeGames[e].active = t === e;
                    0 === t ? (this.spriteInfoTv.node.active = ftc.isTv(), this.spriteInfo.node.active = !ftc.isTv(), ftc.isTv() ? (this.nodeLayout.position = cc.v2(106, -110), this.spriteInfoBg.node.height = 155) : (this.nodeLayout.position = cc.v2(0, -120), this.spriteInfoBg.node.height = 175), this.nodeBgs[0].active = !0, this.nodeBgs[1].active = !1) : (this.nodeLayout.position = cc.v2(131, -56), this.nodeBgs[0].active = !1, this.nodeBgs[1].active = !0);
                    var i = ft.ExtMsg.getAward(this.data),
                        a = i.ids[t],
                        n = i.nums[t],
                        s = -1 !== this.data.ste.split(",").indexOf(["6", "4", "7"]);
                    for (e = 0; e < a.length; e++) {
                        var o = this._partItems[e];
                        if (o || (o = this.newPart("PartItem"), this.nodeLayout.addChild(o.node), this._partItems[e] = o), o.node.active = !0, o.setData(a[e], n[e]), s && o.setStatus(1), 0 === e && 0 !== t) {
                            var r = ft.ExtItem.getHero(a[0]);
                            this.loadResource(ft.ExtHero.getSpineRes(r), sp.SkeletonData, function (t) {
                                t && (this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "w1", !0))
                            }.bind(this))
                        }
                    }
                    for (e = a.length; e < this._partItems.length; e++) this._partItems[e].node.active = !1
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    if (t.target === this.buttonDetail.node) {
                        var i = "";
                        0 === this.tabIndex ? i = ft.ExtDetail.getInfo(ft.value.detail.xsld_xyx) : 1 === this.tabIndex ? i = ft.ExtDetail.getInfo(ft.value.detail.xsld_cc) : 2 === this.tabIndex && (i = ft.ExtDetail.getInfo(ft.value.detail.xsld_hjjb)), ftc.showDetailInfo(this.buttonDetail.node, i)
                    } else
                        for (var a = 0; a < this.buttonTabs.length; a++)
                            if (t.target === this.buttonTabs[a].node) {
                                this.selectTab(a);
                                break
                            }
                }
            })
        