
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    sprite: cc.Sprite,
                    spine: sp.Skeleton,
                    wj: null
                },
                init: function () { },
                load: function () { },
                setData: function (t) {
                    if (this.wj = t, this.floor = t.floor, this.type = ftc.TypeWJ.stop, this.tip = "", this.collision = [], t.properties)
                        for (var e in t.properties)
                            if ("collision" == e)
                                for (var i = t.properties[e], a = 0; a < i.length; ++a) this.collision.push(cc.v2(t.tx + i[a].x, t.ty + i[a].y));
                            else "type" == e ? this.type = t.properties[e] : "tip" == e ? this.tip = t.properties[e] : "floor" == e && (this.floor = t.properties[e]);
                    this.node.anchorX = .5, this.node.anchorY = .5, this.spine.node.active = !1, this.sprite.node.active = !1, t.ani ? this.loadResource("spine/npc/" + t.curname, sp.SkeletonData, function (t) {
                        if (t) {
                            this.spine.skeletonData = t;
                            for (var e = 1; e <= 4; ++e)
                                if (this.spine.findAnimation("wait" + e)) {
                                    this.spine.animation = "wait" + e;
                                    break
                                } this.spine.node.active = !0
                        }
                    }.bind(this)) : (this.sprite.spriteFrame = ftc.ManagerRes.getSpriteFrame(t.path, t.curname), this.sprite.node.active = !0), this.node.setPosition(t.x + .5 * t.width, t.y + .5 * t.height)
                },
                setNodeActive: function (t) {
                    t || (this.node.stopAllActions(), this.wj.ani && ftc.ManagerRes.releaseResource(this)), this.node.active = t
                },
                updateZIndex: function () {
                    this.node.zIndex = this.wj.zindex, this.node.setSiblingIndex(-1)
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        