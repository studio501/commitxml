
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spine: sp.Skeleton,
                    sprite: cc.Sprite,
                    tx: 0,
                    ty: 0,
                    tw: 1,
                    th: 1
                },
                init: function () { },
                load: function () {
                    this.floor = 0, this.moveDir = 0, this.moveSpeed = 0, this._isMoving = !1
                },
                setData: function (t) {
                    var e = t;
                    this.tx = e.tx, this.ty = e.ty, this.type = e.type, this.loadResource("spine/npc/map_role_" + e.id, sp.SkeletonData, function (t) {
                        t && (this.spine.skeletonData = t, this.spine.setAnimation(0, "wait" + ft.DIRRIGHT, !0))
                    }.bind(this))
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                tickMove: function (t) {
                    var e;
                    if ((this.node.ftMoveTick && this.node.ftMoveTick(t), this.moveDir && this.moveSpeed && !this._isMoving) && (this.moveDir === ft.DIRUP ? this.node.y < cc.winSize.height - 192 && (e = this.node.y + .5 * ftc.TileSize) : this.moveDir === ft.DIRDOWN && this.node.y > 64 && (e = this.node.y - .5 * ftc.TileSize), e)) {
                        var i = .5 * ftc.TileSize / this.moveSpeed;
                        this._isMoving = !0, ftc.startMoveAction(this.node, i, this.node.x, e, function () {
                            this._isMoving = !1
                        }.bind(this)), 1 === this.type && ftc.playEffect(ftc.type.effect.walk)
                    }
                },
                onClick: function (t, e) { },
                showDirAnimation: function (t) {
                    t > 0 && this.spine.setAnimation(0, "dir" + t, !0)
                },
                showWaitAnimation: function (t) {
                    t > 0 && this.spine.setAnimation(0, "wait" + t, !0)
                },
                pauseAnimation: function () {
                    this.spine.paused = !0
                },
                resumeAnimation: function () {
                    this.spine.paused = !1
                },
                setMove: function (t, e) {
                    this.moveDir = t, this.moveSpeed = e, this._isMoving = !1
                }
            })
        