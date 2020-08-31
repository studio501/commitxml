
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spriteBg1: cc.Sprite,
                    spineVisit: sp.Skeleton,
                    spineSmoke: sp.Skeleton,
                    spineParticle: sp.Skeleton,
                    spineHeroes: [sp.Skeleton],
                    buttonVisit: cc.Button,
                    spriteIcon: cc.Sprite,
                    labelPrice: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonVisit), this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this), this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this), this.spriteBg1.node.zIndex = 2
                },
                touchStart: function () {
                    this.pauseHeroesTurn()
                },
                touchMove: function () { },
                touchEnd: function () {
                    this.resumeHeroesTurn()
                },
                touchCancel: function () { },
                load: function () {
                    if (this.activity = void 0, this.msgLimitedVisit = ft.ExtMsg.getMsgByType(ft.type.activity.limitedVisit), this.msgLimitedVisit) {
                        var t = ft.ExtMsg.getActivityData(this.msgLimitedVisit);
                        this.activity = t;
                        for (var e = [], i = 0; i < t.ids.length; i++) {
                            var a = ft.ExtVisit.getItem(t.ids[i]);
                            (n = ft.ExtItem.getHero(a)) && e.push(n)
                        }
                        for (var i in ftd.Visit.data) {
                            if (!(e.length < 4)) break;
                            if (ft.ExtVisit.getType(i) === ft.type.visit.limited) {
                                var n;
                                a = ft.ExtVisit.getItem(i);
                                (n = ft.ExtItem.getHero(a)) && ft.ExtHero.getRarity(n) >= ft.type.rarity.rare && e.push(n)
                            }
                        }
                        i = 0;
                        for (var s = e.length; i < s; i++) this.loadHero(i, e[i], s);
                        for (i = e.length; i < this.spineHeroes.length; i++) this.spineHeroes[i].node.parent.active = !1;
                        this.spriteIcon.spriteFrame = ft.ExtItem.getLittleIconSprite(t.consumeId), this.updateData(), this.spineVisit.skeletonData = null, this.isloaded = !1, this.loadResource("spine/view/visitlimited_10", sp.SkeletonData, function (t) {
                            t && (this.isloaded = !0, this.spineVisit.skeletonData = t, this.spineVisit.setAnimation(0, "wait1"), this.spineVisit.addAnimation(0, "wait2", !0))
                        }.bind(this))
                    }
                },
                loadHero: function (t, e, i) {
                    this.loadResource(ft.ExtHero.getSpineRes(e), sp.SkeletonData, function (e) {
                        if (e) {
                            this.spineHeroes[t].node.parent.active = !0, this.spineHeroes[t].skeletonData = e, this.spineHeroes[t].setAnimation(0, "w1", !0);
                            var a = {
                                a: 390,
                                b: 106
                            };
                            a.centerPosition = cc.v2(-15, -96), a.moveInAnticlockwise = !0, a.zOrder = [1, 3], a.initRad = t * (1 / i);
                            var n = cc.ovalBy(24, a);
                            cc.director.getActionManager().addAction(cc.repeatForever(n), this.spineHeroes[t].node.parent, !1)
                        }
                    }.bind(this))
                },
                setData: function (t) { },
                updateData: function () {
                    this.activity && (this.labelPrice.string = ft.ExtItem.getNum(this.activity.consumeId) + "/" + this.activity.consumeNum)
                },
                tick: function (t) { },
                cleanup: function () { },
                pauseHeroesTurn: function () {
                    for (var t = 0; t < this.spineHeroes.length; t++) this.spineHeroes[t].node.parent.pauseAllActions()
                },
                resumeHeroesTurn: function () {
                    for (var t = 0; t < this.spineHeroes.length; t++) this.spineHeroes[t].node.parent.resumeAllActions()
                },
                playEnterAni: function () {
                    this.isloaded && (this.spineVisit.setAnimation(0, "wait1"), this.spineVisit.addAnimation(0, "wait2", !0)), this.spineSmoke.setAnimation(0, "wait1"), this.spineParticle.setAnimation(0, "wait1"), this.spineParticle.addAnimation(0, "wait2", !0)
                },
                getVisitType: function () {
                    return this.visitType
                },
                onClick: function (t, e) {
                    t.target === this.buttonVisit.node && this.msgLimitedVisit && (this.visitType = ft.type.visit.limited10, ftc.send("visitHero", {
                        type: this.visitType,
                        eid: this.msgLimitedVisit.entityId
                    }))
                }
            })
        