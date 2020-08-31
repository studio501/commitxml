cc.Class({
    extends: ftc.BaseView,
    properties: {
        spineBg: sp.Skeleton,
        nodeLayout: cc.Node,
        spineHero: sp.Skeleton,
        buttonRecharge: cc.Button,
        spriteCharge: cc.Sprite,
        spriteGet: cc.Sprite,
        buttonClose: cc.Button
    },
    init: function () {
        this.addClick(this.buttonRecharge), this.addClick(this.buttonClose, {
            zone: 99
        }), ftc.ManagerTV.setBackButton(this.buttonClose)
    },
    setData: function (t) {
        ftc.setTvTip(this.node), this.data = ft.ExtMsg.getMsgDatas(ft.type.msg.pos.firstCharge, ft.type.activity.giftFirstCharge);
        for (var e = this.nodeLayout.children.length - 1; e >= 0; e--) ftc.ManagerRes.restoreNode(this.nodeLayout.children[e]);
        var i = ft.ExtMsg.getActivityData(this.data).items[0],
            a = i.id2s,
            n = i.num2s;
        for (e = 0; e < a.length; e++)
            if (0 === e) {
                var s = ft.ExtItem.getHero(a[0]);
                (o = this.newPart("PartItem")).setData(a[0], n[0]), o.setStatus(2), this.nodeLayout.addChild(o.node, e), this.loadResource(ft.ExtHero.getSpineRes(s), sp.SkeletonData, function (t) {
                    t && (this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "w1", !0))
                }.bind(this), this)
            } else {
                var o;
                (o = this.newPart("PartItem")).setData(a[e], n[e]), this.nodeLayout.addChild(o.node, e)
            } ftc.ManagerLan.isZH() ? this.spineBg.setAnimation(0, "wait1", !0) : this.spineBg.setAnimation(0, "wait2", !0), this.updateData()
    },
    cleanup: function () { },
    updateData: function () {
        this.spriteCharge.node.active = 0 == ftc.ManagerData.get1("Player").rmb, this.spriteGet.node.active = !this.spriteCharge.node.active
    },
    tick: function (t) { },
    onClick: function (t, e) {
        t.target === this.buttonRecharge.node ? ftc.ManagerData.get1("Player").rmb > 0 ? (ftc.send("msgActivityGet", {
            eid: this.data.entityId
        }), this.cancel()) : ftc.openBuyGem() : t.target === this.buttonClose.node && this.cancel()
    }
})
