
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spineHero: sp.Skeleton,
                    buttonGet: cc.Button,
                    spriteGet: cc.Sprite,
                    progressBar: cc.ProgressBar,
                    nodeLayoutAward: cc.Node
                },
                init: function () {
                    this.addClick(this.buttonGet)
                },
                load: function () {
                    this.partItems = [], ftc.ManagerRes.restoreNodeChildren(this.nodeLayoutAward)
                },
                setData: function (t) {
                    this.loadResource("spine/role/1563", sp.SkeletonData, function (t) {
                        t && (this.spineHero.node.scaleX = -1, this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "w1", !0))
                    }.bind(this)), this.data = t;
                    for (var e = ft.ExtMsg.getAward(this.data), i = 0; i < e.ids.length; i++) {
                        if (!this.partItems[i]) {
                            var a = this.newPart("PartItem");
                            a.setName(ftc.language("\u7b2c" + (i + 1) + ftc.language("\u5929"))), a.setNameColor(cc.Color.WHITE), a.node.scale = .85, this.nodeLayoutAward.addChild(a.node, i), this.partItems[i] = a
                        }
                        a.setData(e.ids[i], e.nums[i])
                    }
                    var n = 0 == this.data.ste ? this.data.ext + 1 : this.data.ext;
                    this.progressBar.progress = (Number(n) - 1) / 6, this.updateData()
                },
                cleanup: function () { },
                updateData: function () {
                    for (var t = 0; t < this.partItems.length; t++) this.partItems[t].setStatus(this.data.ext > t ? 1 : 0);
                    this.buttonGet.node.active = 0 == this.data.ste, this.spriteGet.node.active = 1 == this.data.ste
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    0 == this.data.ste ? ftc.send("msgActivityGet", {
                        eid: this.data.entityId
                    }) : ftc.showTip("\u5df2\u9886\u53d6")
                }
            })
        