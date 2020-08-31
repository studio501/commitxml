
            
             cc.Class({
                extends: ftc.BasePartItem,
                properties: {
                    labelDesc: cc.Label,
                    progressBar: cc.ProgressBar,
                    labelProgress: cc.Label,
                    nodeLayout: cc.Node,
                    buttonGet: cc.Button,
                    spriteGet: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonGet)
                },
                load: function () { },
                updateData: function (t) {
                    for (var e = ft.ExtAchievement.getInfo(this.data.id), i = -1, a = ft.ExtAchievement.getConditions(this.data.id), n = 0; n < a.length && this.data.ext >= a[n]; n++) i++;
                    var s = this.data.ste.split(","),
                        o = -1;
                    for (n = 0; n < s.length && s[n] > 0; n++) o++;
                    var r = o + 1 < a.length ? o + 1 : o;
                    this.labelProgress.string = this.data.ext + "/" + a[r], this.progressBar.progress = Number(this.data.ext) / Number(a[r]), this.labelDesc.string = e.replace("%d", a[r]), this.buttonGet.node.active = !1, this.spriteGet.node.active = !1, o < a.length - 1 ? this.buttonGet.node.active = i > o : this.spriteGet.node.active = !0, ftc.ManagerRes.restoreNodeChildren(this.nodeLayout);
                    var c = ft.ExtAchievement.getAwards(this.data.id)[r];
                    if (c) {
                        var h = ft.ExtAward.getIdNumsPreview(c);
                        for (n = 0; n < h.ids.length; n++) {
                            var f = this.newPart("PartItem");
                            f.node.scale = .8, f.setData(h.ids[n], h.nums[n]), this.nodeLayout.addChild(f.node, n)
                        }
                    }
                },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonGet.node && ftc.send("achievementGet", {
                        id: this.data.id
                    })
                }
            })
        