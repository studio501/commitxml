

cc.Class({
    extends: ftc.BasePart,
    properties: {
        spine: sp.Skeleton,
        sprite: cc.Sprite,
        labelName: cc.Label,
        npc: null,
        tx: 0,
        ty: 0,
        tw: 2,
        th: 2,
        _inNpcIds: null
    },
    init: function () { },
    setData: function (t, e, i) {
        var a = ft.ExtNpc.getNameVisible(t.id);
        a > 0 ? (this.labelName.node.active = !0, this.labelName.string = ft.ExtNpc.getName(t.id), 1 == a ? (this.sprite.node.y = -10, this.labelName.node.anchorX = 1, this.labelName.node.anchorY = 0, this.labelName.node.width = 24, this.labelName.node.position = cc.v2(-32, 16), this.labelName.overflow = cc.Label.Overflow.RESIZE_HEIGHT) : 2 == a && (this.sprite.node.y = -32, this.labelName.node.anchorX = .5, this.labelName.node.anchorY = 1, this.labelName.node.position = cc.v2(0, -30), this.labelName.overflow = cc.Label.Overflow.NONE)) : this.labelName.node.active = !1, this.parentNode = i, this.node.scale = 1, this.npc = t, this.tw = t.tw, this.th = t.th, void 0 === this.tw && (this.tw = 2), void 0 === this.th && (this.th = 2), this.tx = parseInt(t.x), this.ty = parseInt(t.y);
        var n, s = ftd.Npc.get(t.id, "img");
        (void 0 === this.npc.opacity || 255 == this.npc.opacity ? this.node.opacity = 255 : this.node.opacity = this.npc.opacity, this._isAniLoaded = !0, s) ? s >= 3020 && s < 3100 || s > 4e3 ? (this.spine.node.active = !1, this.sprite.node.active = !0, this.sprite.spriteFrame = ftc.ManagerRes.getSpriteFrame("icon_hero", "hero" + s), this.sprite.node.stopAllActions(), this.npc.move && 2 == this.npc.move[0] || this.sprite.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(ft.rand(100) / 300), cc.scaleTo(.625, 1.03), cc.scaleTo(.625, 1)))), e && e()) : (s >= 3e3 ? n = "spine/npc/hero" + s : (n = "spine/role/" + s, this.isBattleAni = !0), this.spine.node.active = !0, this.sprite.node.active = !1, this._isAniLoaded = !1, this.loadResource(n, sp.SkeletonData, function (t) {
            t && (this._isAniLoaded = !0, this._noAni = !1, this.spine.skeletonData = t, this.isBattleAni ? this.spine.node.scale = .9 : this.spine.node.scale = 1, this.spine.animation = "", this.showAniWait()), e && e()
        }.bind(this))) : (this.spine.node.active = !1, this.sprite.node.active = !1, e && e());
        this.node.setPosition((this.tx + this.tw / 2) * ftc.TileSize, (this.ty + .5) * ftc.TileSize)
    },
    addTx: function (t) {
        this.tx += t
    },
    addTy: function (t) {
        this.ty += t
    },
    enter: function () { },
    tick: function (t) { },
    cleanup: function () { },
    onClick: function (t) { }
})
