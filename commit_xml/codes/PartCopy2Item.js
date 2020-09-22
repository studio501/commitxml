
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spineHero: sp.Skeleton,
                    labelFloor: cc.Label
                },
                init: function () { },
                load: function () {
                    this.spineHero.node.scaleX = -.9, this.spineHero.node.scaleY = .9
                },
                setData: function (t, e, i) {
                    this.spineHero.node.active = !1;
                    var a = ft.ExtBattle.getMainstays(i);
                    if (a && a.length > 0) {
                        var n = "spine/role/" + ft.ExtHero.getImg(a[0]);
                        this.loadResource(n, sp.SkeletonData, function (t) {
                            t && (this.spineHero.node.active = !0, this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "w1", !0))
                        }.bind(this))
                    }
                    this.labelFloor.string = ftc.language("第") + (t + 1) + "层", this.setSelect(e)
                },
                setSelect: function (t) { },
                updateData: function () { },
                cleanup: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        