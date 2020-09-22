
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    nodeRoot: cc.Node,
                    spriteCountry: cc.Sprite,
                    spriteWeapon: cc.Sprite,
                    spriteName: cc.Sprite,
                    spritePlus: cc.Sprite,
                    progressExp: cc.ProgressBar,
                    labelExp: cc.Label,
                    labelLv: cc.Label,
                    spineLvUp: sp.Skeleton,
                    spineBoomFlash: sp.Skeleton,
                    spineLvUp0: sp.Skeleton,
                    spineHero: sp.Skeleton,
                    spineLvUp1: sp.Skeleton,
                    spriteStars: [cc.Sprite],
                    partFight: t("PartFight"),
                    buttonFavour: cc.Button,
                    spriteFavour1: cc.Sprite,
                    spriteFavour2: cc.Sprite,
                    partExpTip: cc.Node,
                    nodeCompose: cc.Node,
                    labelProgress: cc.Label,
                    buttonCompose: cc.Button,
                    buttonLeft: cc.Button,
                    buttonRight: cc.Button,
                    nodeTabs: cc.Node,
                    buttonTabs: [cc.Button],
                    spriteRedPoints: [cc.Sprite],
                    buttonClose: cc.Button
                },
                init: function () {
                    this.prepareParts(["PartHeroSkill", "PartWakeUpMaterial", "PartHeroStarUp", "PartSkillInfo"]), this.parts = ["PartHeroDetail", "PartHeroLvUp", "PartHeroStarUp", "PartHeroAttribute", "PartHeroWakeUp", "PartHeroBiography"];
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t], !0);
                    this.addClick(this.buttonCompose), this.addClick(this.buttonLeft, !0), this.addClick(this.buttonRight, !0), this.addClick(this.buttonFavour, !0), this.addClick(this.buttonClose, {
                        zone: 99
                    }), this.spineLvUp1.setCompleteListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "wait2" === (t.animation ? t.animation.name : "") && (this.spineLvUp0.node.active = !1, this.spineLvUp1.node.active = !1)
                    }.bind(this)), ftc.ManagerTV.setBackButton(this.buttonClose), this.buttonFavour.node.active = !1, this.partExpTip.active = !1
                },
                load: function () {
                    this.partHeros = [], this.heroes = void 0, this.index = void 0, this.oldExp = void 0, this.oldLv = void 0, this.hero = void 0, this.canCompose = void 0, this.initPart(this.partFight), this.spineLvUp0.node.active = !1, this.spineLvUp1.node.active = !1, this.oldFight = void 0, this.isNewHero = !0, this.oldSpineName = void 0, this._spineResName = void 0, this.expValue = 0, this.name = "武力", this.partExpTipPos = this.partExpTip.getPosition(), ftc.setTvTip(this.node, "【返回键】关闭界面，【菜单键】切换标签")
                },
                selectTab: function (t) {
                    if (this.tvTabIndex = t, this.hero.entityId && ft.ExtHero.getType(this.hero.id) === ft.type.hero.our) {
                        for (var e = 0; e < this.buttonTabs.length; e++) this.buttonTabs[e].interactable = t !== e, this.buttonTabs[e].node.getChildByName("labelTab").color = t !== e ? ftc.newColor(ftc.value.color.tabNormal) : ftc.newColor(ftc.value.color.tabPressed), this.buttonTabs[e].node.getChildByName("labelTab").getComponent(cc.LabelOutline).color = t !== e ? ftc.newColor(ftc.value.color.tabNormalOutline) : ftc.newColor(ftc.value.color.tabPressedOutline), this.partHeros[e] ? (this.partHeros[e].node.active = t === e, this.partHeros[e].setData(this.hero)) : t === e && ftc.loadPart(this.parts[t], function (e) {
                            this.partHeros[t] = e, this.partHeros[t].node.active = !0, this.partHeros[t].setData(this.hero), this.nodeRoot.addChild(this.partHeros[t].node), this[this.parts[t]] = e
                        }.bind(this));
                        ftc.ManagerTV.nextFrameSelect()
                    } else 0 !== t && (this.hero.entityId && ft.ExtHero.getType(this.hero.id) === ft.type.hero.story ? ftc.showTip("剧情武将无法操作") : ftc.showTip("未拥有武将"))
                },
                setHeroInfo: function (t) {
                    this.hero = t;
                    var e = t.id || t,
                        i = t.lv || 1,
                        a = t.star || 0,
                        n = t.up || 0;
                    this.spriteCountry.spriteFrame = ft.ExtHero.getCountrySprite(e), this.spriteWeapon.spriteFrame = ft.ExtHero.getWeaponSprite(e), this.spriteName.spriteFrame = ft.ExtHero.getNameSprite(e), this.spriteName.node.color = ft.ExtHero.getNameColor(e), this.spritePlus.node.active = n > 0, n > 0 && (this.spritePlus.spriteFrame = ft.ExtHero.getUpSprite(n), this.spritePlus.node.active = !!this.spritePlus.spriteFrame, this.spritePlus.node.color = ft.ExtHero.getNameColor(e));
                    var s = Math.round(t.exp) ? Math.round(t.exp) : 0;
                    this.progressExp.progress = s / ft.ExtHero.getNextExp(i), this.labelExp.string = ft.getNumShow(s) + "/" + ft.getNumShow(ft.ExtHero.getNextExp(i)), this.labelLv.string = i + ftc.language("级"), this.oldExp = ft.getNumShow(s), this.oldlv = i;
                    for (var o = 0; o < this.spriteStars.length; o++) this.spriteStars[o].node.active = !0, this.spriteStars[o].spriteFrame = ftc.ManagerRes.getSpriteFrame("program", a > o ? "com_star" : "com_stargray");
                    if (this._spineResName !== ft.ExtHero.getSpineRes(e) && (this._spineResName = ft.ExtHero.getSpineRes(e), this.loadResource(this._spineResName, sp.SkeletonData, function (t) {
                        t && (this.oldSpineName && this.releaseResource(this.oldSpineName), this.oldSpineName = this._spineResName, this.spineHero.skeletonData = null, this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "w1", !0))
                    }.bind(this))), !this.heroes || ftc.isTv() || ftc.ManagerH5.isH5() ? (this.buttonLeft.node.active = !1, this.buttonRight.node.active = !1) : (this.buttonLeft.node.active = this.index > 0, this.buttonRight.node.active = this.index < this.heroes.length - 1), this.buttonFavour.node.active = !1, t.entityId && ft.ExtHero.getType(t.id) === ft.type.hero.our) {
                        var r = ft.ExtHero.getFight(t);
                        for (var o in this.oldFight ? this.partFight.setData(this.oldFight, r) : this.partFight.setData(r), this.oldFight = r, this.partHeros)
                            if (this.partHeros[o].node.active) {
                                this.partHeros[o].setData(t);
                                break
                            } this.partFight.node.active = !0, this.nodeCompose.active = !1, this.setTabRedPoint(t), this.updateFavour(t.favour)
                    } else {
                        var c = function () {
                            this.partHeros[0].setData(t);
                            for (var i = 0; i < this.buttonTabs.length; i++) this.partHeros[i] && (this.partHeros[i].node.active = 0 === i), this.buttonTabs[i].interactable = 0 !== i, this.buttonTabs[i].node.getChildByName("labelTab").color = 0 !== i ? ftc.newColor(ftc.value.color.tabNormal) : ftc.newColor(ftc.value.color.tabPressed), this.buttonTabs[i].node.getChildByName("labelTab").getComponent(cc.LabelOutline).color = 0 !== i ? ftc.newColor(ftc.value.color.tabNormalOutline) : ftc.newColor(ftc.value.color.tabPressedOutline);
                            if (t.entityId) {
                                var a = ft.ExtHero.getFight(t);
                                this.partFight.setData(a), this.partFight.node.active = !0, this.nodeCompose.active = !1, this.updateFavour(t.favour)
                            } else if (this.partFight.node.active = !1, this.nodeCompose.active = this.canCompose && !ft.ExtHero.isStoryHero(e), this.nodeCompose.active) {
                                var n = ft.ExtItem.mapPartHeros[e],
                                    s = ft.ExtItem.getNum(n),
                                    o = ft.ExtHero.getNeedPiecesNum(e);
                                this.labelProgress.string = s + "/" + o, this.pieceIsEnough = s >= o
                            }
                            this.setTabRedPoint()
                        }.bind(this);
                        this.partHeros[0] ? c() : ftc.loadPart("PartHeroDetail", function (t) {
                            this.PartHeroDetail = t, this.PartHeroDetail.node.active = !0, this.nodeRoot.addChild(this.PartHeroDetail.node), this.partHeros[0] = this.PartHeroDetail, c()
                        }.bind(this))
                    }
                },
                updateFavour: function (t) {
                    ftc.isTv() || (this.buttonFavour.node.active = !0, this.spriteFavour1.node.active = 0 === t, this.spriteFavour2.node.active = 1 === t)
                },
                setTabRedPoint: function (t) {
                    t && 0 === ft.ExtHero.getType(t.id) ? (this.spriteRedPoints[0].node.active = ft.ExtHero.checkCanLvUp(t), this.spriteRedPoints[1].node.active = ft.ExtHero.checkCanStarUp(t), this.spriteRedPoints[2].node.active = ft.ExtHero.checkCanWakeUp(t), this.spriteRedPoints[3].node.active = ft.ExtHero.checkCanBiographyUnlock(t)) : (this.spriteRedPoints[0].node.active = !1, this.spriteRedPoints[1].node.active = !1, this.spriteRedPoints[2].node.active = !1, this.spriteRedPoints[3].node.active = !1)
                },
                setData: function (t, e, i) {
                    if (e && (this.canCompose = e), void 0 === i && (i = 0), t.heroes) {
                        this.hero = t.heroes[t.index], this.heroes = [], this.index = t.index;
                        for (var a = 0; a < t.heroes.length; a++) t.heroes[a] ? this.heroes.push(t.heroes[a]) : a < t.index && this.index--
                    } else this.hero = t;
                    if (void 0 === this.hero.id) {
                        var n = ftc.ManagerData.get2("Hero");
                        for (var a in n)
                            if (this.hero == n[a].id) {
                                this.hero = n[a];
                                break
                            }
                    }
                    this.hero.entityId || this.heroes ? (this.selectTab(i), this.setHeroInfo(this.hero), this.nodeRoot.x = 49, this.nodeTabs.active = !0) : (this.setHeroInfo(this.hero), this.nodeRoot.x = 0, this.nodeTabs.active = !1)
                },
                enter: function () { },
                updateHeroes: function () {
                    var t = ftc.ManagerData.get2("Hero");
                    if (this.heroes)
                        for (var e = 0; e < this.heroes.length; e++)
                            if (void 0 === this.heroes[e].id)
                                for (var i in t)
                                    if (this.heroes[e] == t[i].id) {
                                        this.heroes[e] = t[i], this.hero == t[i].id && (this.hero = t[i]);
                                        break
                                    }
                },
                updateData: function () {
                    this.hero && this.setHeroInfo(this.hero)
                },
                tick: function (t) {
                    this.isExpProgress && this.updateBarAnimation(.015)
                },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        itemCompose: function (t, e) {
                            0 === t && (this.updateHeroes(), this.updateData(), this.hero && ftc.loadLayout("LayoutAwardHero", function (t) {
                                t.setData([
                                    [this.hero.id, 1]
                                ])
                            }.bind(this)))
                        },
                        heroExp: function (t, e) {
                            this.newlv = this.hero.lv, this.isExpProgress = !0, this.hero.exp && (this.newExp = Math.round(this.hero.exp) ? Math.round(this.hero.exp) : 0), this.difexp = ft.ExtHero.calcExpDiff(this.newlv, this.newExp, this.oldlv, this.oldExp), this.expValue = this.difexp, this.expType = 1, this.updateExpTip(this.difexp), this.updateData(), t > 0 && (this.spineLvUp0.node.active = !0, this.spineLvUp1.node.active = !0, this.spineLvUp0.setAnimation(0, "wait1"), this.spineLvUp0.addAnimation(0, "wait2"), this.spineLvUp1.setAnimation(0, "wait1"), this.spineLvUp1.addAnimation(0, "wait2"), this.spineHero.setAnimation(0, "ready"), this.spineHero.addAnimation(0, "w1", !0), ftc.playEffect(ftc.type.effect.player_lvUp))
                        },
                        heroStar: function (t, e) {
                            ftc.playEffect(ftc.type.effect.heroUp), ftc.loadLayout("LayoutHeroWakeUpTip", function (t) {
                                this.heroes && this.heroes[this.index] ? t.setData(this.heroes[this.index], 2) : t.setData(this.hero, 2)
                            }.bind(this)), this.updateData()
                        },
                        heroAddValue: function (t, e) {
                            this.updateData(), this.PartHeroAttribute && (t && (this.name = ft.ExtPropName.getName(t.type), this.expValue = t.num, this.expType = 2, this.updateExpTip(t.num)), ftc.playEffect(ftc.type.effect.hero_addValue), this.PartHeroAttribute.playAnimation(t.type))
                        },
                        heroWakeUp: function (t, e) {
                            t > 0 && (ftc.playEffect(ftc.type.effect.heroUp), ftc.loadLayout("LayoutHeroWakeUpTip", function (t) {
                                this.heroes && this.heroes[this.index] ? t.setData(this.heroes[this.index]) : t.setData(this.hero)
                            }.bind(this)), this.updateData())
                        },
                        heroBiographyUnlock: function (t, e) {
                            0 === t ? (ftc.showTip("解锁成功"), this.updateData()) : 1 === t ? ftc.showTip("碎片不足") : 2 === t && ftc.showTip("主公不存在")
                        },
                        heroFeatUnlock: function (t, e) {
                            0 === t ? (ftc.showTip("解锁成功"), this.updateData()) : 1 === t ? ftc.showTip("条件不满足") : 2 === t && ftc.showTip("武将不存在")
                        },
                        heroFavour: function (t, e) {
                            this.hero && (ftc.showTip(this.hero.favour ? "已设为常用武将" : "已取消常用武将"), this.spriteFavour1.node.active = 0 === this.hero.favour, this.spriteFavour2.node.active = 1 === this.hero.favour)
                        },
                        c_onClickHeroAttrUp: function (t, e) {
                            ftc.send("heroAddValue", {
                                id: t.data.id,
                                type: t.data.type,
                                num: t.data.useNum,
                                isUp: !1
                            })
                        },
                        c_onClickHeroAttrUp2: function (t, e) {
                            ftc.send("heroAddValue", {
                                id: t.data.id,
                                type: t.data.type,
                                num: t.data.useNum,
                                isUp: !0
                            })
                        },
                        c_onSelectAttributeItem: function (t, e) {
                            this.PartHeroAttribute && this.PartHeroAttribute.onSelectAttributeItem(t)
                        },
                        c_onSelectLvUpItem: function (t, e) {
                            this.PartHeroLvUp && this.PartHeroLvUp.onSelectLvUpItem(t)
                        },
                        c_onHeroExpLvUpItem: function (t, e) {
                            this.spineLvUp.setAnimation(0, "wait1")
                        },
                        c_onHeroBoomFlash: function (t, e) {
                            this.spineBoomFlash.setAnimation(0, "wait1")
                        }
                    }
                },
                updateBarAnimation: function (t) {
                    if (this.newlv === this.oldLv) {
                        t = this.difexp / 1e3, this.progressExp.progress += t;
                        var e = this.oldExp / ft.ExtHero.getNextExp(this.currentLv);
                        this.progressExp.progress >= e && (this.isExpProgress = !1, this.progressExp.progress = this.oldExp / ft.ExtHero.getNextExp(this.oldLv))
                    }
                },
                updateExpTip: function (t) {
                    if (t > 0) {
                        this.expTipIndex = 0, this.partExpTip.active = !0;
                        var e = cc.moveBy(.45, cc.v2(0, 60)),
                            i = cc.callFunc(this.showExpTip, this),
                            a = cc.callFunc(this.hideExpTip, this);
                        this.partExpTip.runAction(cc.sequence(i, e, a, i, e, a, i, e, a, cc.callFunc(function () {
                            1 == this.expType && (this.difexp = 0), this.partExpTip.stopAllActions()
                        }.bind(this))))
                    }
                },
                showExpTip: function () {
                    this.expTipIndex++, this.partExpTip.active = !0, 1 == this.expType ? this.partExpTip.getChildByName("labelName").getComponent(cc.Label).string = ftc.language("经验+") : this.partExpTip.getChildByName("labelName").getComponent(cc.Label).string = this.name + "+", this.partExpTip.getChildByName("labelValue").getComponent(cc.Label).string = ft.getNumShow((this.expValue * this.expTipIndex / 3).toFixed(2))
                },
                hideExpTip: function () {
                    this.partExpTip.active = !1, this.partExpTip.setPosition(this.partExpTipPos)
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonCompose.node) this.pieceIsEnough ? ftc.send("itemCompose", {
                        id: this.hero.id || this.hero
                    }) : ftc.showTip("碎片不足");
                    else if (t.target === this.buttonFavour.node) ftc.send("heroFavour", this.hero.id);
                    else if (t.target === this.buttonLeft.node) this.index > 0 && (this.index--, this.oldFight = void 0, this.isNewHero = !0, this.setHeroInfo(this.heroes[this.index])), this.buttonLeft.node.active = this.index > 0, this.buttonRight.node.active = this.index < this.heroes.length - 1, ftc.ManagerTV.nextSelect();
                    else if (t.target === this.buttonRight.node) this.index < this.heroes.length - 1 && (this.index++, this.oldFight = void 0, this.isNewHero = !0, this.setHeroInfo(this.heroes[this.index])), this.buttonLeft.node.active = this.index > 0, this.buttonRight.node.active = this.index < this.heroes.length - 1, ftc.ManagerTV.nextSelect();
                    else if (t.target === this.buttonClose.node) this.cancel();
                    else
                        for (var i = 0; i < this.buttonTabs.length; i++)
                            if (t.target === this.buttonTabs[i].node) {
                                this.selectTab(i);
                                break
                            }
                },
                onKeyMenu: function (t) {
                    if (!t) return this.tvTabIndex++, this.tvTabIndex >= this.buttonTabs.length && (this.tvTabIndex = 0), this.selectTab(this.tvTabIndex), !0
                }
            })
        