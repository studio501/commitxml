
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spineHero: sp.Skeleton
                },
                init: function () { },
                setData: function (t) {
                    this.data = t, this.data && this.loadResource(ft.ExtHero.getSpineRes(this.data.id), sp.SkeletonData, function (t) {
                        t && (this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "w1", !0))
                    }.bind(this))
                },
                getData: function () {
                    return this.data
                },
                setSelect: function (t) {
                    this.bg && this.bg.setSelect(t)
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        