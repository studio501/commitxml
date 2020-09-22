
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    listView: ftc.ListView,
                    labelTime: cc.Label,
                    labelTxt: cc.Label,
                    labelProgress: cc.Label,
                    spineHero: sp.Skeleton,
                    buttonGet: cc.Button,
                    spriteGet: cc.Sprite,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.prepareParts(["PartItemSpecial"]), this.addClick(this.buttonGet), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    ftc.setTvTip(this.node), this.spineHero.setCompleteListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "dir3" === (t.animation ? t.animation.name : "") && (this.spineHero.addAnimation(0, "wait3", !0, 3), this.spineHero.addAnimation(0, "dir3", !0, 3))
                    }.bind(this));
                    var t = ft.ExtMsg.getMsgByType(ft.type.activity.monthSign);
                    if (t) {
                        for (var e = ft.ExtMsg.getActivityData(t), i = [], a = 0; a < e.ids.length; a++) i.push({
                            id: e.ids[a],
                            num: e.nums[a],
                            isSpecial: e.indexes.indexOf(a + 1) >= 0
                        });
                        this.listView.setListView(i, t), this.msgSign = t, this.activity = e, this.labelTime.string = ftc.language("剩余时间: ") + ftc.calcTimeDelta(void 0, t.date1), this.labelTxt.string = t.txt, this.labelProgress.string = "累计签到:" + t.ext + "/" + e.ids.length, this.spineHero.node.active = !1;
                        var n = ft.ExtItem.getType(e.itemId);
                        if (n === ft.type.item.specialLord) {
                            var s = ft.ExtItem.getNeedPiecesNum(e.itemId);
                            s && this.loadResource("spine/npc/npc_" + s, sp.SkeletonData, function (t) {
                                t && (this.spineHero.node.active = !0, this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "wait3", !0, 3), this.spineHero.addAnimation(0, "dir3", !0, 3))
                            }.bind(this))
                        } else if (n === ft.type.item.lord) {
                            var o = ft.ExtItem.getHero(e.itemId);
                            o && this.loadResource("spine/npc/npc_" + ft.ExtHero.getImg(o), sp.SkeletonData, function (t) {
                                t && (this.spineHero.node.active = !0, this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "wait3", !0, 3), this.spineHero.addAnimation(0, "dir3", !0, 3))
                            }.bind(this))
                        }
                        this.buttonGet.node.active = 0 === Number(t.ste), this.spriteGet.node.active = !this.buttonGet.node.active
                    } else this.cancel()
                },
                setData: function (t) { },
                enter: function () { },
                updateData: function () {
                    this.listView.updateListViewItems(), this.buttonGet.node.active = 0 === Number(this.msgSign.ste), this.spriteGet.node.active = !this.buttonGet.node.active, this.labelProgress.string = "累计签到:" + this.msgSign.ext + "/" + this.activity.ids.length
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        msgActivityGet: function (t, e) {
                            t.eid === this.msgSign.entityId && this.updateData()
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.buttonGet.node ? ftc.send("msgActivityGet", {
                        eid: this.msgSign.entityId
                    }) : t.target === this.buttonClose.node && this.cancel()
                }
            })
        