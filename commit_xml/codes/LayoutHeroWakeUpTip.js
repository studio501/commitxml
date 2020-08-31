
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonSelf: cc.Button,
                    spineBg: sp.Skeleton,
                    spineBg2: sp.Skeleton,
                    spineHero: sp.Skeleton,
                    spriteCountry: cc.Sprite,
                    spriteWeapon: cc.Sprite,
                    spriteName: cc.Sprite,
                    spritePlus: cc.Sprite,
                    spriteStars: [cc.Sprite],
                    spineStars: [sp.Skeleton],
                    labelDesc: cc.Label,
                    partFight: t("PartFight"),
                    panelProp: cc.Node,
                    nodeTip: cc.Node
                },
                init: function () {
                    this.addClick(this.buttonSelf, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonSelf), ftc.isTv() && (this.nodeTip.active = !1)
                },
                load: function () {
                    this.spineBg2.setEventListener(function (t, e) {
                        if (!ftc.ManagerRes.checkNodeIsRestored(this.node) && (e.data.name.startsWith("1_") || "jia" === e.data.name)) {
                            var i = e.data.name.substr(2) - 1;
                            if (1 === this.type || 2 === this.type && i < this.data.star && this.loadResource("spine/view/team_xing", sp.SkeletonData, function (t) {
                                t && (this.spineStars[i].node.active = !0, this.spineStars[i].skeletonData = t, this.spineStars[i].setAnimation(0, "wait1"))
                            }.bind(this)), !this._propMove) {
                                for (var a = 0; a < this.panelProp.children.length; a++) {
                                    var n = this.panelProp.children[a],
                                        s = cc.fadeIn(.16),
                                        o = cc.moveBy(.11, -101, 0),
                                        r = cc.moveBy(.05, 1, 0),
                                        c = cc.spawn(s, cc.sequence(o, r));
                                    n.runAction(cc.sequence(cc.delayTime(.08 * a), c))
                                }
                                this._propMove = !0
                            }
                        }
                    }.bind(this)), this.spineBg2.setCompleteListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || (this.buttonSelf.interactable = !0, ftc.setTvTip(this.node))
                    }.bind(this)), this.boneHero = void 0, this._propMove = !1, this.buttonSelf.interactable = !1, this.initPart(this.partFight), ftc.hideTvTip(this.node)
                },
                setData: function (t, e) {
                    if (void 0 === e && (e = 1), this.type = e, this.data = t, this.loadAnimation(e), this.loadResource(ft.ExtHero.getSpineRes(this.data.id), sp.SkeletonData, function (t) {
                        t && (this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "ready"), this.spineHero.addAnimation(0, "w1", !0))
                    }.bind(this)), this.spriteCountry.spriteFrame = ft.ExtHero.getCountrySprite(this.data.id), this.spriteWeapon.spriteFrame = ft.ExtHero.getWeaponSprite(this.data.id), this.spriteName.spriteFrame = ft.ExtHero.getNameSprite(this.data.id), this.spriteName.node.color = ft.ExtHero.getNameColor(this.data.id), this.spritePlus.node.active = this.data.up > 0, this.data.up > 0 && (this.spritePlus.spriteFrame = ft.ExtHero.getUpSprite(this.data.up), this.spritePlus.node.active = !!this.spritePlus.spriteFrame, this.spritePlus.node.color = ft.ExtHero.getNameColor(this.data.id)), 1 === this.type) {
                        this.labelDesc.string = ftc.language("\u5168\u5c5e\u6027+") + ft.ExtHero.getWakeAddPercent(this.data.up) + "%";
                        for (var i = 0; i < this.spriteStars.length; i++) this.spineStars[i].node.active = !1, this.spriteStars[i].spriteFrame = ftc.ManagerRes.getSpriteFrame("program", this.data.star > i ? "com_star" : "com_stargray")
                    } else if (2 === this.type) {
                        this.labelDesc.string = ft.ExtHero.getStarInfo(this.data.id, this.data.star);
                        for (i = 0; i < this.spriteStars.length; i++) this.spineStars[i].node.active = !1, this.spriteStars[i].spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "com_stargray")
                    }
                    var a = ft.ExtHero.getFight(this.data);
                    this.partFight.setData(a);
                    for (i = 0; i < this.panelProp.children.length; i++) {
                        var n = this.panelProp.children[i];
                        n.opacity = 0, n.x = 100;
                        var s = n.getChildByName("spriteIcon").getComponent(cc.Sprite),
                            o = n.getChildByName("labelName").getComponent(cc.Label),
                            r = n.getChildByName("labelValue").getComponent(cc.Label),
                            c = r.node.getChildByName("labelAdd").getComponent(cc.Label);
                        s.spriteFrame = ft.ExtPropName.getSpriteIcon(i + 1), o.string = ft.ExtPropName.getName(i + 1), r.string = ft.ExtHero.getValue(this.data, i + 1), c.string = ""
                    }
                },
                loadAnimation: function (t) {
                    var e, i;
                    1 === t ? (e = "spine/view/team_juexing1", i = "spine/view/team_juexing2") : 2 === t && (e = "spine/view/team_jinjie1", i = "spine/view/team_jinjie2"), e && (this.loadResource(e, sp.SkeletonData, function (t) {
                        t && (this.spineBg.skeletonData = t, this.spineBg.setAnimation(0, "wait1"), this.spineBg.addAnimation(0, "wait2", !0))
                    }.bind(this)), this.loadResource(i, sp.SkeletonData, function (t) {
                        t && (this.spineBg2.skeletonData = t, this.spineBg2.setAnimation(0, "wait1"), this.spineBg2.updateWorldTransform(), this.boneHero = this.spineBg2.findBone("ren"))
                    }.bind(this)))
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) {
                    this.boneHero && (this.spineBg2.updateWorldTransform(), this.boneHero = this.spineBg2.findBone("ren"), this.spineHero.node.scaleX = this.boneHero.scaleX, this.spineHero.node.scaleY = this.boneHero.scaleY, this.spineHero.node.x = this.boneHero.x, this.spineHero.node.y = this.boneHero.y)
                },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && this.cancel(!0)
                }
            })
        