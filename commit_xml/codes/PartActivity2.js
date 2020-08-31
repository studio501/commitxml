
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spineHero: sp.Skeleton,
                    buttonGet: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonGet)
                },
                setData: function (t) {
                    this.data = t;
                    var e = ft.ExtMsg.getActivityData(this.data).items[0].ids,
                        i = ft.ExtItem.getHero(e);
                    this.loadResource(ft.ExtHero.getSpineRes(i), sp.SkeletonData, function (t) {
                        t && (this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "w1", !0))
                    }.bind(this), this), this.buttonGet.interactable = this.data.ste >= 1
                },
                cleanup: function () { },
                updateData: function () {
                    this.buttonGet.interactable = this.data.ste >= 1
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonGet.node && ftc.send("msgActivityGet", {
                        eid: this.data.entityId
                    })
                }
            })
        