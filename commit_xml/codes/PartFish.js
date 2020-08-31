

cc._RF.push(e, "a808bWIMc1CXoETKYBWZ40C", "PartFish");
var number_arr = [
    [cc.v2(100, 2), cc.v2(350, 2), cc.v2(1800, 0)],
    [cc.v2(100, 2), cc.v2(550, 50), cc.v2(1800, 0)],
    [cc.v2(100, 2), cc.v2(550, -100), cc.v2(1800, 0)]
];
cc.Class({
    extends: ftc.BasePart,
    properties: {
        spine: sp.Skeleton
    },
    init: function () { },
    load: function () {
        this.game = void 0, this.node.scale = 1
    },
    setData: function (t) {
        this.game = t, this.spawnFish(t)
    },
    spawnFish: function (t) {
        this.fishState = ftapp.type.fishState.alive;
        var e = ft.randHit(t.fishProbs, ft.rand(100));
        this.fishData = t.fishTypes[e];
        var i = "spine/view/" + this.fishData.name;
        this.loadResource(i, sp.SkeletonData, function (t) {
            this.spine.skeletonData = t, this.spine.setAnimation(0, "wait1", !0), this.spine.timeScale = .5
        }.bind(this)), this.node.scale = this.fishData.scale;
        var n = cc.v2(-100, 400 * Math.random());
        this.node.position = t.nodeRoot.convertToNodeSpaceAR(n);
        var s = Math.floor(Math.random() * number_arr.length),
            o = number_arr[s],
            r = o[0],
            c = Math.atan(r.y / r.x);
        this.node.angle = 180 * -c / 3.14, this.changeCollider(), this.swimming(o), this.lastPosition = this.node.position
    },
    changeCollider: function () {
        var t = this.node.getComponent(cc.BoxCollider);
        t.enabled = !0, t.size = cc.Size(this.fishData.size[0], this.fishData.size[1])
    },
    swimming: function (t) {
        var e = 4 * Math.random() - 2 + this.fishData.speed,
            i = cc.bezierBy(e, t);
        this.node.runAction(i)
    },
    cleanup: function () { },
    updateData: function () { },
    tick: function (t) {
        this.updateDegree()
    },
    updateDegree: function () {
        var t = this.node.position;
        if (!(this.lastPosition.sub(t).mag() < 1)) {
            var e = t.sub(this.lastPosition),
                i = cc.v2(e).signAngle(cc.v2(1, 0)) / Math.PI * 180;
            this.node.angle = -i, this.lastPosition = t, this.beAttack()
        }
    },
    beAttack: function () {
        this.isDie() ? (this.node.stopAllActions(), this.node.getComponent(cc.BoxCollider).enabled = !1, this.node.runAction(cc.moveBy(1, cc.winSize.width, 0)), this.spine.timeScale = 2) : this.despawnFish()
    },
    dieCallback: function () {
        this.node.stopAllActions(), this.game.despawnFish(this)
    },
    despawnFish: function () {
        (this.node.x > 1440 || this.node.x < -1e3 || this.node.y > 700 || this.node.y < -300) && (this.node.stopAllActions(), this.game.despawnFish(this))
    },
    isDie: function () {
        return this.fishState === ftapp.type.fishState.dead
    },
    onCollisionEnter: function (e, i) {
        e.node.getComponent(t("PartBullet")) && (this.fishState = ftapp.type.fishState.dead)
    },
    onClick: function (t, e) { }
})
