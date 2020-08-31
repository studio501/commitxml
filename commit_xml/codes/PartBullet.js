
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {},
                init: function () { },
                load: function () {
                    this._speed = 500
                },
                setData: function (t, e, i) { },
                shot: function (t) {
                    this.game = t, this.enabled = !0;
                    var e = t.nodePoint.parent.convertToWorldSpaceAR(t.nodePoint.getPosition());
                    this._angle = t.nodePoint.angle, this.node.angle = this._angle;
                    var i = cc.v2(e.x + 50 * Math.sin(this._angle / 180 * 3.14), e.y - 50 * Math.cos(this._angle / 180 * 3.14));
                    this.node.position = i, this.node.parent = this.game.node, this._vx = this._speed * Math.sin(this._angle / 180 * 3.14), this._vy = -this._speed * Math.cos(this._angle / 180 * 3.14), this._ax = this._vx > 0 ? -5 : 5, this._ax = 0, this._ay = 0, this._totalTime = 0, this.node.getComponent(cc.BoxCollider).enabled = !0
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) {
                    this._totalTime += t, this._vx += this._ax * this._totalTime, this._vy += this._ay * this._totalTime;
                    var e = this.node.x,
                        i = this.node.y;
                    e += t * this._vx, i += t * this._vy, this.node.x = e, this.node.y = i, (this.node.x > cc.winSize.width + 100 || this.node.x < -100 || this.node.y > cc.winSize.height + 100 || this.node.y < 0) && this.game.despawnBullet(this)
                },
                onCollisionEnter: function (e, i) {
                    if (!(this.node.y < 0 || this.node.x < 0 || this.node.x > cc.winSize.width)) {
                        ftc.playEffect(ftc.type.effect.game2_shouji), this.game.despawnBullet(this), this.node.getComponent(cc.BoxCollider).enabled = !1;
                        var a = e.world.points,
                            n = a[0].add(a[3]).mul(.5);
                        this.game.gainScore(n, e.getComponent(t("PartFish")).fishData.score)
                    }
                },
                onClick: function (t, e) { }
            })
        