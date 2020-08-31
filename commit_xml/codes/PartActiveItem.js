
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    labelName: cc.Label,
                    labelInfo: cc.Label,
                    nodeLayout: cc.Node,
                    buttonGo: cc.Button,
                    buttonGet: cc.Button,
                    labelProgress: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonGo), this.addClick(this.buttonGet)
                },
                updateData: function (t) {
                    this.labelName.string = ft.ExtAchievement.getName(this.data.id);
                    var e = ft.ExtAchievement.getConditions(this.data.id),
                        i = this.data.index + 1;
                    this.labelProgress.node.active = !0, this.labelProgress.string = parseInt(this.data.ext) + "/" + e[i], this.buttonGo.node.active = !1, this.buttonGet.node.active = !0, this.data.index < e.length - 1 ? this.buttonGet.interactable = this.data.cur > this.data.index : this.labelProgress.node.active = !1;
                    var a = ft.ExtAchievement.getInfo(this.data.id);
                    this.labelInfo.string = a.replace("%d", e[i]), ftc.ManagerRes.restoreNodeChildren(this.nodeLayout);
                    var n = ft.ExtAchievement.getAwards(this.data.id)[i];
                    if (n)
                        for (var s = ft.ExtAward.getIdNumsPreview(n), o = 0; o < s.ids.length; o++) {
                            var r = this.newPart("PartItem");
                            r.node.scale = .85, r.setData(s.ids[o], s.nums[o]), this.nodeLayout.addChild(r.node, o)
                        }
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonGo.node || t.target === this.buttonGet.node && ftc.send("achievementGet", {
                        id: this.data.id
                    })
                }
            })
        