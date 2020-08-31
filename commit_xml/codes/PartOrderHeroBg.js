
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spriteHeroBg: cc.Sprite,
                    spriteHeroSelect: cc.Sprite,
                    spineUp: sp.Skeleton
                },
                init: function () { },
                reset: function () {
                    this.getComponent(cc.Sprite).enabled = !0, this.spriteHeroBg.node.active = !1, this.spriteHeroSelect.node.active = !1, this.spineUp.node.active = !1
                },
                setData: function (t) {
                    this.getComponent(cc.Sprite).enabled = !1, this.spriteHeroBg.node.active = !0
                },
                setSelect: function (t) {
                    this.spriteHeroSelect.node.active = t
                },
                playAni: function () {
                    this.spineUp.node.active = !0, this.spineUp.setAnimation(0, "wait1")
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        