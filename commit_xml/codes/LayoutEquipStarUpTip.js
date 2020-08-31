
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonSelf: cc.Button,
                    spineBg: sp.Skeleton,
                    spineStarUp: sp.Skeleton,
                    spineBg2: sp.Skeleton,
                    labelName: cc.Label,
                    nodeEquip: cc.Node,
                    nodeItems: [cc.Node],
                    spriteStars: [cc.Sprite],
                    spineStars: [sp.Skeleton],
                    nodeProp: cc.Node,
                    labelValue0: cc.Label,
                    labelValue1: cc.Label,
                    nodeTip: cc.Node
                },
                init: function () {
                    this.addClick(this.buttonSelf, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonSelf), ftc.isTv() && (this.nodeTip.active = !1, ftc.setTvTip(this.node))
                },
                load: function () {
                    this.spineStarUp.setEventListener(function (t, e) {
                        if (!ftc.ManagerRes.checkNodeIsRestored(this.spineStarUp.node) && "equip" === e.data.name) {
                            cc.tween({
                                a: 1
                            }).to(.3, {
                                a: 1
                            }, {
                                progress: function (t, e, i, a) {
                                    for (var n = 0; n < this._valueObjects.length; n++) this["labelValue" + n].string = Math.ceil(this._valueObjects[n].value1 + (this._valueObjects[n].value2 - this._valueObjects[n].value1) * a);
                                    return 1
                                }.bind(this)
                            }).start(), this.loadResource("spine/view/team_xing", sp.SkeletonData, function (t) {
                                if (t) {
                                    var e = this._star % 5,
                                        i = this.spineStars[e];
                                    i.node.active = !0, i.skeletonData = t, i.setAnimation(0, this._star + 1 > 5 ? "wait1_1" : "wait1", !1), i.addAnimation(0, this._star + 1 > 5 ? "wait2_1" : "wait2", !0)
                                }
                            }.bind(this))
                        }
                    }.bind(this)), this._partItems = [];
                    for (var t = 0; t < this.nodeItems.length; t++) {
                        var e = this.newPart("PartItem");
                        this.nodeItems[t].addChild(e.node), this._partItems.push(e)
                    }
                    this._partEquip = this.newPart("PartItem"), this.nodeEquip.addChild(this._partEquip.node)
                },
                setData: function (t, e) {
                    this.data = t, this._star = e, ftc.playEffect(ftc.type.effect.equip_wakeup), this.spineBg.setAnimation(0, "wait1", !1), this.spineBg.addAnimation(0, "wait2", !0), this.spineBg.timeScale = .75, this.spineStarUp.timeScale = .75, this.spineBg2.timeScale = .75, this.labelName.string = ft.ExtEquip.getName(this.data.id), this._partEquip.setEquipData(t), this._partEquip.setEquipStarActive(!1), this._partEquip.setInteractable(!1);
                    var i = ft.ExtEquip.getConsumeStar(this.data.id, this._star);
                    if (i) {
                        for (var a = 0; a < i.ids.length; a++) this._partItems[a].node.active = !0, this._partItems[a].setData(i.ids[a], i.nums[a]);
                        for (a = i.ids.length; a < this._partItems.length; a++) this._partItems[a].node.active = !1;
                        this.spineStarUp.setAnimation(0, "wait1_" + i.ids.length, !1), this.spineStarUp.addAnimation(0, "wait2", !0), this.spineBg2.setAnimation(0, "wait1_" + i.ids.length, !1), this.spineBg2.addAnimation(0, "wait2", !0)
                    }
                    this._valueObjects = [];
                    var n = ft.ExtEquip.getAdvancedTypes(this.data.id, Math.max(this._star, 0));
                    if (n) {
                        for (a = 0; a < n.length; a++) {
                            var s = n[a],
                                o = this.nodeProp.children[a];
                            o.active = !0;
                            var r = o.getChildByName("spriteIcon").getComponent(cc.Sprite),
                                c = o.getChildByName("labelName").getComponent(cc.Label),
                                h = o.getChildByName("labelValue").getComponent(cc.Label),
                                f = h.node.getChildByName("labelAdd").getComponent(cc.Label),
                                d = ft.ExtEquip.getStarValue(this.data, s, this._star, !0),
                                l = ft.ExtEquip.getStarValue(this.data, s, this._star + 1, !0);
                            r.spriteFrame = ft.ExtPropName.getSpriteIcon(s), c.string = ft.ExtPropName.getName(s), h.string = d, f.string = "", this._valueObjects.push({
                                value1: d,
                                value2: l
                            })
                        }
                        for (a = n.length; a < this.nodeProp.children.length; a++) this.nodeProp.children[a].active = !1
                    }
                    for (a = 0; a < this.spriteStars.length; a++) {
                        this.spineStars[a].node.active = !1, this.spriteStars[a].node.active = !0;
                        var u = this._star > a ? "com_star" : "com_stargray";
                        this._star > a + 5 && (u = "com_star2"), this.spriteStars[a].spriteFrame = ftc.ManagerRes.getSpriteFrame("program", u)
                    }
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && this.cancel()
                }
            })
        