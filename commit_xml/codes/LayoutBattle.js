
            
             cc.Class({
                extends: t("BaseView"),
                properties: {
                    nodeButtons: cc.Node,
                    spriteBackground1: cc.Sprite,
                    spineBackground1: sp.Skeleton,
                    spineBackground2: sp.Skeleton,
                    spriteOrderIcon1: cc.Sprite,
                    spriteOrderIcon2: cc.Sprite,
                    labelOrderName1: cc.Label,
                    labelOrderName2: cc.Label,
                    labelBattleName: cc.Label,
                    labelBattleLevel: cc.Label,
                    labelBattleRound: cc.Label,
                    buttonSpeed: cc.Button,
                    buttonAuto: cc.Button,
                    buttonBag: cc.Button,
                    buttonOrder: cc.Button,
                    buttonExit: cc.Button,
                    nodeBottom: cc.Node,
                    spriteRankBg: cc.Sprite,
                    nodeRank: cc.Node,
                    nodeBagList: cc.Node,
                    nodeBlack: cc.Node,
                    listViewGoods: ftc.ListView,
                    listViewOrder: ftc.ListView,
                    nodeTip: cc.Node,
                    labelExtTip: cc.Label,
                    spriteHero: cc.Sprite,
                    labelName: cc.Label,
                    labelStage: cc.Label,
                    buttonAttack: cc.Button,
                    buttonSkill: cc.Button,
                    buttonPets: [cc.Button],
                    spineSelect: sp.Skeleton,
                    progressBarCelue: cc.ProgressBar,
                    labelProgressCelue: cc.Label,
                    nodeHeros: cc.Node,
                    buttonHeros: [cc.Button],
                    spriteRankIcons: [cc.Sprite],
                    spineRound: sp.Skeleton,
                    spineStart: sp.Skeleton,
                    labelRound: cc.Label,
                    nodeBigMove: cc.Node,
                    spriteBigMove: cc.Sprite,
                    spineBigMove0: sp.Skeleton,
                    spineBigMove1: sp.Skeleton,
                    buttonRoot: cc.Button,
                    nodeLockSkill: cc.Node,
                    nodeShowSkill: cc.Node,
                    spriteRepairIcon1: [cc.Sprite],
                    spriteRepairIcon2: [cc.Sprite],
                    nodeRepairGroup1: cc.Node,
                    nodeRepairGroup2: cc.Node,
                    nodeRepairInfo: cc.Node,
                    nodeLayoutBuff: cc.Node,
                    buttonRecordVideo: cc.Button,
                    labelRecordStatus: cc.Label,
                    spriteRecordRedPoint: cc.Sprite,
                    buttonImprint: cc.Button
                },
                init: function () {
                    this.effectResource = {}, this.prepareParts(["PartBattleBloodAni", "PartBattleBoom", "PartBattleHero", "PartBattleHeroBuff", "PartSkillInfo"]);
                    for (var t = 0; t < this.buttonHeros.length; t++) this.addClick(this.buttonHeros[t], .5, void 0, {
                        zone: 1
                    });
                    this.buttonRecordVideo && this.addClick(this.buttonRecordVideo), this.addClick(this.buttonImprint), this.addClick(this.buttonAttack), this.addClick(this.buttonAuto), this.addClick(this.buttonBag), this.addClick(this.buttonOrder), this.addClick(this.buttonSpeed), this.addClick(this.buttonExit), this.addClick(this.buttonRoot, !0), this.addClick(this.buttonSkill, .5);
                    for (t = 0; t < this.buttonPets.length; t++) this.addClick(this.buttonPets[t], .5);
                    this.initPos1 = [], this.initPos2 = [];
                    var e = cc.winSize.width / cc.winSize.height >= 2 ? ftc.PartHeroWidth / 2 : 0,
                        i = cc.winSize.width > ftc.DesignWidth ? cc.winSize.width : ftc.DesignWidth;
                    for (t = 0; t < 9; t++) {
                        var a = 2 - t % 3,
                            n = 3 - Math.ceil((t + 1) / 3),
                            s = {};
                        s.x = n * ftc.PartHeroWidth + 1.1 * ftc.PartHeroWidth + a * ftc.PartHeroWidth / 4 + e, s.y = a * ftc.PartHeroHeight + ftc.PartHeroHeight + 50, s.z = n + 3 * (2 - a), s.s = 1 - .05 * a, this.initPos1[t + 1] = s, (s = {}).x = i - (n * ftc.PartHeroWidth + 1.1 * ftc.PartHeroWidth) - a * ftc.PartHeroWidth / 4 - e, s.y = a * ftc.PartHeroHeight + ftc.PartHeroHeight + 50, s.z = n + 3 * (2 - a), s.s = 1 - .05 * a, this.initPos2[t + 1] = s
                    }
                    ftc.battleView = this, ftc.isIphoneX() ? (this.nodeButtons.width = cc.winSize.width - 100, this.spriteRankBg.node.x = 72, this.nodeRank.x = 72, this.buttonImprint.node.x = 70) : (this.nodeButtons.width = cc.winSize.width, this.spriteRankBg.node.x = 24, this.nodeRank.x = 22, this.buttonImprint.node.x = 40), ftc.ManagerTV.setNotShowOnEnter(this.node);
                    var o = this.buttonExit.node.getComponent(cc.Widget);
                    ftc.ManagerH5.hasRightTopMenu() ? (o.isAlignRight = !1, o.isAlignLeft = !0, o.left = 38.5) : (o.isAlignRight = !0, o.isAlignLeft = !1, o.left = 6.5), o.updateAlignment(), this.buttonRecordVideo && (1 == ftc.ManagerH5.isOpenRecordVideo() ? (this.buttonRecordVideo.node.active = !0, ftc.recordVideoState ? (this.labelRecordStatus.string = "\u5f55\u5c4f\u4e2d", this.spriteRecordRedPoint.node.active = !0) : (this.labelRecordStatus.string = "\u5f55\u5c4f", this.spriteRecordRedPoint.node.active = !1)) : this.buttonRecordVideo.node.active = !1)
                },
                load: function () {
                    this.spineBigMove1.setEventListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || "music_0001a" === e.data.name && ftc.playEffect("0001a")
                    }.bind(this)), this.spineBigMove1.setCompleteListener(function (t, e) {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || (this.nodeBigMove.active = !1, this.analyzeCmdParam && (this.analyzeCmd(this.analyzeCmdParam[0], this.analyzeCmdParam[1], !0), this.analyzeCmdParam = void 0))
                    }.bind(this)), this.nodeTip.active = !1, this.nodeBagList.active = !1, this.nodeRank.active = !1, this.loadingProgress = 0, this.loadingSize = 0, this._orderMoving = 0, this.spineStart.node.active = !1, this.spineRound.node.active = !1, this.nodeBottom.active = !1, this.isEnd = !1, this.isBegin = !1, this.nodeBlack.active = !1, this.itemsPreviewUse = {}, this.partItemInfo = void 0, this._unHandleMsgs = [], this.buttonAuto.node.active = !1, this.buttonExit.node.active = !1, this.buttonBag.node.active = !1, this.buttonOrder.node.active = !1, this.buttonSpeed.node.active = !1, this.nodeShowSkill.active = !1, this.nodeBigMove.active = !1, this.selectTarget = void 0, this.selectType = -1, this.selectId = 0, this.tvLatestButton = this.buttonAttack, ftc.ManagerTV.updateSelect(), this.packHeros = {}, this.skillData = {};
                    var t = ft.ExtCopy.getCopy(ftc.ManagerData.get1("ManagerCopy").cur);
                    this.isShowImprint = !!(t && t.skills.length > 0), this.buttonImprint.node.active = this.isShowImprint
                },
                enter: function () {
                    ftc.playEffect(ftc.type.effect.battleStart)
                },
                setData: function (t) {
                    t.bgMusic || (t.bgMusic = ftc.type.effect.musicBattle1), t.bgImg || (t.bgImg = "1"), this.bgMusic = t.bgMusic, this.battle = ftc.ManagerData.get2Array("Battles")[0], this.loadBackground(t.bgImg), this.updateBattleInfo(), this.updateRoundInfo(), this.updateSpeedInfo(), this.updateAutoInfo(), this.loadBattleHeros(), 1 === this.battle.id ? ftc.ManagerH5.countEvent("6_2") : 1001 === this.battle.id ? ftc.ManagerH5.countEvent("6_6") : 1002 === this.battle.id ? ftc.ManagerH5.countEvent("6_9") : 1003 === this.battle.id ? ftc.ManagerH5.countEvent("6_12") : 1004 === this.battle.id && ftc.ManagerH5.countEvent("6_15")
                },
                loadBackground: function (t) {
                    var e, i;
                    ftc.ManagerH5.isH5() ? (this.loadResource("img/battlebg" + t, cc.SpriteFrame, function (t) {
                        this.spriteBackground1.spriteFrame = t
                    }.bind(this), this), this.spineBackground1.node.active = !1) : (this.loadingSize += 1, this.loadResource("img/battlebg" + t, cc.SpriteFrame, function (t) {
                        this.spriteBackground1.spriteFrame = t, this.loadingProgress++
                    }.bind(this), this), t ? (1 == t ? i = "spine/view/battlebg1" : 2 == t ? i = "spine/view/battlebg2_3" : 3 == t ? (e = "spine/view/battlebg3_1", i = "spine/view/battlebg3_3") : 4 == t && (e = "spine/view/battlebg4_1", i = "spine/view/battlebg4_3"), e && (this.loadingSize += 1, this.loadResource(e, sp.SkeletonData, function (t) {
                        this.spineBackground1.node.active = !0, this.spineBackground1.skeletonData = t, this.spineBackground1.setAnimation(0, "wait1", !0), this.loadingProgress++
                    }.bind(this), this)), i && (this.loadingSize += 1, this.loadResource(i, sp.SkeletonData, function (t) {
                        this.spineBackground2.node.active = !0, this.spineBackground2.skeletonData = t, this.spineBackground2.setAnimation(0, "wait1", !0), this.loadingProgress++
                    }.bind(this), this))) : (this.spineBackground1.node.active = !1, this.spineBackground2.node.active = !1))
                },
                createBattleHero: function (t, e) {
                    this.loadingSize++;
                    var i = this.buttonHeros[this.battleHeros[t].pos + (this.battleHeros[t].type - 1) * ft.value.com.maxHeroNum];
                    this.packHeros[t] = {}, this.packHeros[t].button = i, this.packHeros[t].hero = this.battleHeros[t];
                    var a = i.node.getChildByName("PartBattleHero");
                    null == a ? (a = this.newPart("PartBattleHero"), i.node.addChild(a.node)) : (a = a.getComponent("PartBattleHero"), delete this.battleHeros[a.battleHero.entityId], delete this.packHeros[a.battleHero.entityId]), a.setData(this.packHeros[t], function () {
                        this.loadingProgress++
                    }.bind(this), e), i.node.active = !0, a.layout = this, this.packHeros[t].part = a
                },
                loadBattleHeros: function () {
                    this.battleHeros = ftc.ManagerData.get2("BattleHeros");
                    for (var t = 0; t < this.buttonHeros.length; t++) this.buttonHeros[t].node.active = !1;
                    for (var t in this.battleHeros) this.createBattleHero(t);
                    this.updateOrderPos(1, this.battle.pet1), this.updateOrderPos(2, this.battle.pet2), this.updateOrderInfo(1), this.updateOrderInfo(2), this.updatePets()
                },
                updateBattleInfo: function () {
                    this.labelName.string = ftd.Battle.get(this.battle.id, "name"), this.labelBattleName.node.active = !0, this.labelBattleName.node.opacity = 255, this.labelBattleName.string = ftd.Battle.get(this.battle.id, "name"), this.labelBattleLevel.string = this.battle.lv + ftc.language("\u7ea7"), this.labelBattleName.node.runAction(cc.fadeOut(3)), this.labelStage.string = "", this.nodeRepairInfo.active = ftc.ManagerData.get1("ManagerBattle").model == ft.type.battleModel.turns, this.updateRepairIcons([{
                        type: 1,
                        arr: []
                    }, {
                        type: 2,
                        arr: []
                    }])
                },
                updateTvTip: function () {
                    if (ftc.isTv()) {
                        if (ftc.isShowNewGuide()) return void ftc.hideTvTip(this.node);
                        if (this.waitInputCallback) {
                            var t = "\u3010\u8fd4\u56de\u952e\u3011";
                            this.nodeBagList.active ? t += "\u53d6\u6d88\u5217\u8868" : this.selectType > -1 ? t += "\u53d6\u6d88\u4f7f\u7528" : t += "\u64a4\u9000", 1 == this.tvZone ? -1 == this.selectType && (t += "\uff0c\u3010\u83dc\u5355\u952e\u3011\u9009\u62e9\u529f\u80fd") : t += "\uff0c\u3010\u83dc\u5355\u952e\u3011\u66f4\u6362\u76ee\u6807", ftc.setTvTip(this.node, t)
                        } else this.battle.isAuto ? ftc.setTvTip(this.node, "\u3010\u8fd4\u56de\u952e\u3011\u53d6\u6d88\u603b\u653b") : ftc.hideTvTip(this.node)
                    }
                },
                updateOrderInfo: function (t) { },
                updateOrderPos: function (t, e, i) {
                    this["orderPet" + t] = e;
                    var a, n = ftd.Pet.get(e, "a_position");
                    for (var s in this.packHeros) {
                        var o = this.packHeros[s].hero;
                        if (t == o.type) {
                            var r = o.pos,
                                c = this["initPos" + t][n[r]],
                                h = this.packHeros[s].button;
                            o.initZIndex = c.z, h.node.zIndex = c.z, i ? (a || (a = this.convertFrame2Time(5)), h.node.runAction(cc.moveTo(a, c.x, c.y))) : (h.node.x = c.x, h.node.y = c.y)
                        }
                    }
                    a && (this._orderMoving = a)
                },
                updateButtons: function () {
                    this.buttonAuto.node.active = !this.checkIsForbid(ft.type.battle.forbidAuto), this.buttonBag.node.active = !this.checkIsForbid(ft.type.battle.forbidItem), this.buttonOrder.node.active = !this.checkIsForbid(ft.type.battle.forbidOrder), this.buttonSpeed.node.active = !this.checkIsForbid(ft.type.battle.forbidSpeed), this.buttonExit.node.active = !0, this.buttonImprint.node.active = this.isShowImprint
                },
                getBattleHeroPosInfo: function (t, e) {
                    if (1 == t) {
                        var i = ftd.Pet.get(this.orderPet1, "a_position");
                        return this.initPos1[i[e]]
                    }
                    i = ftd.Pet.get(this.orderPet2, "a_position");
                    return this.initPos2[i[e]]
                },
                getBattleCenterPos: function (t) {
                    return 1 == t ? this.initPos1[5] : this.initPos2[5]
                },
                getBattleFirstCenterPos: function (t) {
                    return 1 == t ? this.initPos1[2] : this.initPos2[2]
                },
                updatePets: function (t) {
                    for (var e = this.getCommonSkills(), i = 0; i < e.length; i++) {
                        var a = this.buttonPets[i].node.getChildByName("ImageIcon").getComponent(cc.Sprite),
                            n = this.buttonPets[i].node.getChildByName("AtlasLabel").getComponent(cc.Label),
                            s = e[i] > 0;
                        if (this.buttonPets[i].interactable = s, a.node.active = s, n.node.active = s, s) {
                            a.spriteFrame = ft.ExtPet.getIconSprite(e[i]);
                            var o = void 0 == t ? 100 : t.strategyCostPer;
                            n.string = Math.floor(ftd.Pet.get(e[i], "value" + ft.type.prop.mp) * o / 100)
                        }
                    }
                },
                getCommonSkills: function () {
                    var t = this.battle.teamIndex1;
                    return ftc.ManagerData.get1("ManagerPet")["selectArtifacts" + t].split(",")
                },
                updateRoundInfo: function () {
                    this.labelBattleRound.string = ftc.language("\u56de\u5408:") + this.battle.round + "/" + ftd.Battle.get(this.battle.id, "roundlimit"), 1 === this.battle.id ? ftc.ManagerH5.countEvent("6_3", "\u56de\u5408" + this.battle.round) : 1001 === this.battle.id ? ftc.ManagerH5.countEvent("6_7", "\u56de\u5408" + this.battle.round) : 1002 === this.battle.id ? ftc.ManagerH5.countEvent("6_10", "\u56de\u5408" + this.battle.round) : 1003 === this.battle.id ? ftc.ManagerH5.countEvent("6_13", "\u56de\u5408" + this.battle.round) : 1004 === this.battle.id && ftc.ManagerH5.countEvent("6_16", "\u56de\u5408" + this.battle.round)
                },
                updateSpeedInfo: function () {
                    var t = ftc.ManagerData.get1("ManagerBattle").speed;
                    1.5 == t ? t = 2 : 2 == t && (t = 4), this.buttonSpeed.node.getChildByName("Text").getComponent(cc.Label).string = t + ftc.language("\u901f")
                },
                updateAutoInfo: function () {
                    this.buttonAuto.node.getChildByName("Text").getComponent(cc.Label).string = 1 == this.battle.isAuto ? ftc.language("\u53d6\u6d88") : ftc.language("\u603b\u653b")
                },
                updateRepairIcons: function (t) {
                    for (var e = 0; e < t.length; ++e) {
                        for (var i = t[e].type, a = t[e].arr, n = this["spriteRepairIcon" + i], s = 0; s < a.length; ++s) {
                            n[s].node.active = !0, n[s].spriteFrame = ft.ExtHero.getQualitySprite(a[s].id), n[s].node.getChildByName("ImageHero").getComponent(cc.Sprite).spriteFrame = ft.ExtHero.getIconSprite(a[s].id), n[s].node.getChildByName("ImageUp").active = 1 == a[s].up
                        }
                        for (s = a.length; s < n.length; ++s) n[s].node.active = !1;
                        this["nodeRepairGroup" + i].active = 0 != a.length
                    }
                },
                updateRankIcons: function (t) {
                    this.nodeRank.active = !0;
                    for (var e = ftc.ManagerData.get2("BattleHeros"), i = 0; i < this.spriteRankIcons.length; i++)
                        if (i >= t.length) this.spriteRankIcons[i].node.active = !1;
                        else {
                            this.spriteRankIcons[i].node.active = !0;
                            var a = e[t[i]].id;
                            this.spriteRankIcons[i].spriteFrame = ft.ExtHero.getQualitySprite(a), this.spriteRankIcons[i].node.getChildByName("ImageHero").getComponent(cc.Sprite).spriteFrame = ft.ExtHero.getIconSprite(a)
                        } this.rankArr = t, t.length && this.packHeros[t[0]] && (this.packHeros[t[0]].part.isReadAni = !1), this.updateRankSelect()
                },
                updateRankSelect: function (t) {
                    if (this.rankArr)
                        for (var e = 0; e < this.rankArr.length; e++) this.rankArr[e] == t ? this.spriteRankIcons[e].node.getChildByName("ImageBf2").active = !0 : this.spriteRankIcons[e].node.getChildByName("ImageBf2").active = !1
                },
                updateMpInfo: function () {
                    var t = this.getCurrentInputHero();
                    this.progressBarCelue.progress = t.curMp / t.maxMp, this.labelProgressCelue.string = t.curMp + "/" + t.maxMp
                },
                updateHeroAndSkill: function (t) {
                    if (t) {
                        this.nodeBottom.active = !0, this.spriteHero.spriteFrame = ft.ExtHero.getImageSprite(t.id);
                        var e = this.buttonSkill.node.getChildByName("ImageIcon").getComponent(cc.Sprite),
                            i = this.buttonSkill.node.getChildByName("AtlasLabel").getComponent(cc.Label),
                            a = this.getBattleShowSkill(t);
                        a[0] ? (e.node.active = !0, e.spriteFrame = ft.ExtSkill.getIconSprite(a[0]), this.nodeShowSkill.active = !1, ft.ExtSkill.getSkillType(a[0]) == ft.type.skill.zd ? t.cd > 0 ? (i.string = "" + t.cd, i.node.active = !0) : (i.node.active = !1, a[1] && (this.nodeShowSkill.active = !0)) : i.node.active = !1, this.nodeLockSkill.active = !a[1]) : (this.nodeShowSkill.active = !1, e.node.active = !1, i.node.active = !1, this.nodeLockSkill.active = !1)
                    } else this.nodeBottom.active = !1
                },
                updateExtInfo: function () {
                    this.nodeTip.active && (1 == this.extInfoType ? this.labelExtTip.string = ftc.language("\u5f53\u524d\u603b\u4f24\u5bb3:") + this.battle.totalAttack : 2 == this.extInfoType && (this.labelExtTip.string = ftc.language("\u654c\u65b9\u5f53\u524d\u589e\u4f24:") + 50 * (this.battle.round - 1) + "%")), 1 === this.battle.id ? ftc.ManagerH5.countEvent("6_4") : 1001 === this.battle.id ? ftc.ManagerH5.countEvent("6_8") : 1002 === this.battle.id ? ftc.ManagerH5.countEvent("6_11") : 1003 === this.battle.id ? ftc.ManagerH5.countEvent("6_14") : 1004 === this.battle.id && ftc.ManagerH5.countEvent("6_17")
                },
                getBattleShowSkill: function (t) {
                    var e, i = ft.ExtHero.getPos(t.id),
                        a = ftc.ManagerData.get2("Equip");
                    e = t.isInTeam ? ft.ExtHero.getHero(t.id) : t.id, this.skillData.heroId = t.id, this.skillData.index = 0;
                    var n = ft.ExtHero.getSkill1Id(e, i, a, !0);
                    if (ft.ExtSkill.getSkillType(n[0]) == ft.type.skill.bd && ft.ExtHero.getSkillIsOpen(e, 1)) {
                        var s = ft.ExtHero.getSkill2Id(e);
                        s && s[1] && (n = s, this.skillData.index = 1)
                    }
                    return this.skillData.skillId = n[0], this.skillData.isOpen = n[1], this.skillData.showLvInfo = !1, n
                },
                waitInput: function (t) {
                    this.waitInputCallback = t, this.itemsPreviewUse = {}, this.setSelectTarget(this.getNextInputHeroEntityId()), this.labelStage.string = ftc.language("\u6218\u6597\u90e8\u7f72\u9636\u6bb5")
                },
                switchSelectType: function (t, e, i) {
                    var a, n = this.getCurrentInputHero();
                    if (0 == t) {
                        if (a = e, ft.ExtSkill.getCD(a) > 0 && n.cd > 0) return void ftc.showTip("cd\u672a\u51b7\u5374\uff0c\u65e0\u6cd5\u4f7f\u7528")
                    } else if (1 == t) {
                        if (a = ft.ExtPet.getStrategySkill(e), ft.ExtPet.getSP(a) > n.curMp) return void ftc.showTip("\u7b56\u7565\u503c\u4e0d\u8db3\uff0c\u65e0\u6cd5\u4f7f\u7528")
                    } else if (2 == t) a = ft.ExtItem.getSkill(e);
                    else {
                        if (3 == t) return ftc.showTip("\u9009\u62e9" + ftd.Pet.get(e, "name")), void this.addInputCmd(t, e);
                        if (4 == t || 5 == t) return void this.addInputCmd(t)
                    }
                    i || (i = this.selectTarget);
                    var s = ft.ExtBattle.getSkillAllTargets(this.battleHeros, a, n, i, this.battle);
                    if (s[1] && 0 != s[1].length) {
                        if (s[0]) return this.selectType = -1, void this.addInputCmd(t, e, s[1][0].entityId);
                        for (var o in this.cleanAllTarget(), this.cleanAllSelect(), s[1]) this.packHeros[s[1][o].entityId].part.setTarget();
                        return this.nodeBottom.active = !1, this.buttonOrder.node.active = !1, this.buttonBag.node.active = !1, this.buttonExit.node.active = !1, this.buttonImprint.node.active = !1, this.selectType = t, this.selectId = e, ftc.isShowNewGuide() || (this.tvZone = 1, ftc.ManagerTV.nextFrameSelect(s[1][0].button, this.node, this.tvZone)), this.updateTvTip(), !0
                    }
                    ftc.showTip("\u4e0d\u6ee1\u8db3\u6761\u4ef6\uff0c\u65e0\u6cd5\u4f7f\u7528")
                },
                setSelectTarget: function (t) {
                    if (void 0 !== t) {
                        this.selectType = -1, this.currentActEntityId = t;
                        var e = this.getCurrentInputHero();
                        return this.spineSelect.node.active = !1, this.cleanAllSelect(), this.updateHeroAndSkill(e), this.updatePets(e), this.updateMpInfo(), this.packHeros[e.entityId].part.setSelect(), this.updateButtons(), this.updateSelectTarget(), ftc.isShowNewGuide() || (this.tvZone = 0, ftc.ManagerTV.nextSelect(this.tvLatestButton, this.node)), this.updateTvTip(), !0
                    }
                    this.waitInputCallback({
                        acts: this.acts
                    })
                },
                updateSelectTarget: function (t) {
                    if (t && (this.selectTarget = t), this.selectTarget && (!this.packHeros[this.selectTarget] || this.packHeros[this.selectTarget].hero.curHp <= 0) && (this.selectTarget = void 0), !this.selectTarget)
                        for (var e = 0; e < 5; e++) {
                            for (var i in this.packHeros) {
                                var a = this.packHeros[i].hero;
                                if (2 == a.type && a.pos == e && a.curHp > 0) {
                                    this.selectTarget = i;
                                    break
                                }
                            }
                            if (this.selectTarget) break
                        }
                    for (var e in this.cleanAllTarget(), this.packHeros)
                        if (e == this.selectTarget) {
                            this.packHeros[e].part.setTarget(!0);
                            break
                        } this.updateRankSelect(this.selectTarget)
                },
                cleanAllTarget: function () {
                    for (var t in this.packHeros) this.packHeros[t].part.cleanTarget()
                },
                cleanAllSelect: function () {
                    for (var t in this.packHeros) this.packHeros[t].part.cleanSelect()
                },
                findHeroByPos: function (t, e) {
                    for (var i in this.packHeros) {
                        var a = this.packHeros[i].hero;
                        if (a.type == t && a.pos == e) return a
                    }
                },
                getCurrentInputHero: function () {
                    return this.battleHeros[this.currentActEntityId]
                },
                getNextInputHeroEntityId: function () {
                    for (var t = 0; t < ft.value.com.maxHeroNum; t++) {
                        var e = this.findHeroByPos(1, t);
                        if (e && 1 == this.acts[e.entityId]) return e.entityId
                    }
                },
                playRoundAni: function (t, e) {
                    1 == this.battle.round ? (ftc.cancelWait(), this.spineStart.node.active = !0, this.spineStart.animation = "wait1", this.spineStart.setCompleteListener(function () {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || (this.spineStart.node.active = !1, this.playActionAni(t, e))
                    }.bind(this)), ftc.playBackMusic(this.bgMusic)) : (this.spineRound.node.active = !0, this.labelRound.node.active = !1, this.labelRound.string = this.battle.round, this.spineRound.setEventListener(function (t, e) {
                        if (!ftc.ManagerRes.checkNodeIsRestored(this.node) && "shuzi" == e.data.name) {
                            var i = this.spineRound.findBone("shuzi");
                            i && (this.labelRound.node.x = i.worldX, this.labelRound.node.y = i.worldY), this.labelRound.node.active = !0
                        }
                    }.bind(this)), this.spineRound.setCompleteListener(function () {
                        ftc.ManagerRes.checkNodeIsRestored(this.node) || (this.spineRound.node.active = !1, this.playActionAni(t, e))
                    }.bind(this)), this.spineRound.setAnimation(0, "wait1", !1))
                },
                playEndAni: function (t) {
                    this.isEnd = !0, this.waitPlayActionCallback()
                },
                playActionAni: function (t, e) {
                    this._tickActions = t, this._playAniId = 0, this.waitPlayActionCallback = e
                },
                playBigMove: function (t, e) {
                    this.nodeBigMove.active = !0, this.spriteBigMove.spriteFrame = ft.ExtHero.getImageSprite(t), this.spineBigMove0.setAnimation(0, "wait1", !1), this.spineBigMove1.setAnimation(0, "wait1", !1)
                },
                setListVisible: function (t, e) {
                    if (e && this._listViewType != e && (t = !0), t) {
                        if (1 === e) {
                            var i = ftc.ManagerData.get2("Item"),
                                a = [],
                                n = ft.ExtMap.getType(ftc.ManagerData.get1("ManagerMap").cur);
                            for (var s in i) {
                                var o = ft.ExtItem.getMapTypes(i[s].id);
                                if (o && o.length > 0) {
                                    if (-1 === o.indexOf(n)) continue
                                } else if (ft.ExtItem.mapForbidOther[n]) continue;
                                if (ft.ExtItem.getSkill(i[s].id)) {
                                    var r = i[s].num,
                                        c = 0;
                                    this.itemsPreviewUse[i[s].id] && (c = this.itemsPreviewUse[i[s].id]), r - c > 0 && a.push(i[s])
                                }
                            }
                            if (!(a.length > 0)) return void ftc.showTip("\u6ca1\u6709\u53ef\u4f7f\u7528\u9053\u5177");
                            a.sort(function (t, e) {
                                return ft.ExtItem.getIndex(t.id) - ft.ExtItem.getIndex(e.id)
                            }), this.listViewGoods.node.active = !0, this.listViewOrder.node.active = !1, 2 == this.selectType ? this.listViewGoods.updateListViewItems([this.selectId, this.itemsPreviewUse], a) : this.listViewGoods.setListView(a, [0, this.itemsPreviewUse]), ftc.ManagerTV.nextFrameSelect(this.listViewGoods.getItem(0).buttonSelf)
                        } else if (2 === e) {
                            var h = 0;
                            for (var s in this.packHeros) {
                                var f = this.packHeros[s].hero;
                                1 == f.type && f.curHp > 0 && h++
                            }
                            if (5 != h) return void ftc.showTip("\u4eba\u6570\u4e0d\u8db3\uff0c\u65e0\u6cd5\u4f7f\u7528\u9635\u6cd5");
                            var d = ftc.ManagerData.get2("Pet"),
                                l = [];
                            for (var s in d) 1 === ft.ExtPet.getType(d[s].id) && this.battle.pet1 != d[s].id && l.push(d[s]);
                            if (!(l.length > 0)) return void ftc.showTip("\u6ca1\u6709\u53ef\u66f4\u6362\u7684\u9635\u6cd5");
                            this.listViewGoods.node.active = !1, this.listViewOrder.node.active = !0, this.listViewOrder.setListView(l), ftc.ManagerTV.nextFrameSelect(this.listViewOrder.getItem(0).buttonSelf)
                        }
                        this._listViewType = e
                    }
                    this.nodeBagList.active = t, this.updateTvTip()
                },
                addInputCmd: function (t, e, i) {
                    if (this.waitInputCallback)
                        if (4 == t || 5 == t) 4 == t ? (this.waitInputCallback({
                            acts: this.acts,
                            exit: -1
                        }), ftc.playEffect(ftc.type.effect.battle_retreat)) : this.waitInputCallback({
                            acts: this.acts,
                            auto: 1
                        });
                        else {
                            if (2 == t) {
                                var a = ftc.ManagerData.get2Object("Item")[e],
                                    n = 0;
                                if (this.itemsPreviewUse[e] && (n = -this.itemsPreviewUse[e]), a.num + n <= 0) return void ftc.showTip("\u9053\u5177\u4e0d\u8db3");
                                this.itemsPreviewUse[e] || (this.itemsPreviewUse[e] = 0), this.itemsPreviewUse[e]++
                            }
                            var s = this.acts[this.currentActEntityId];
                            ft.isObject(s) && 2 == s[0] && s[1] > 0 && this.itemsPreviewUse[s[1]]--, this.acts[this.currentActEntityId] = [t, e, i], this.packHeros[this.currentActEntityId].part.setReadyAct(), this.setSelectTarget(this.getNextInputHeroEntityId())
                        }
                },
                updateData: function () { },
                analyzeCmd: function (t, e, i) {
                    if (void 0 !== t.exit) this.playEndAni(t.exit);
                    else if (void 0 !== t.sort) this.updateRankIcons(t.sort);
                    else if (void 0 != t.repair) this.updateRepairIcons(t.repair);
                    else if (void 0 != t.checkHp)
                        for (var a = 0; a < t.checkHp.length; ++a) {
                            var n = t.checkHp[a].entityId,
                                s = t.checkHp[a].hp;
                            this.packHeros[n].part.setShowHp(s), this.packHeros[n].part.setWaitAct()
                        } else {
                        if (t.addHeros) {
                            var o;
                            for (a = 0; a < t.addHeros.length; a++) this.createBattleHero(t.addHeros[a], !0), o = this.battleHeros[t.addHeros[a]].type;
                            o && this.updateOrderPos(o, this.battle["pet" + o])
                        }
                        var r, c, h = t.skill,
                            f = 0;
                        if (h) {
                            f = h[0], c = h[2], r = this.packHeros[h[1]];
                            var d = ftd.Skill.get(f, "herocutin");
                            if (!i && d) return this.analyzeCmdParam = [t, e], void this.playBigMove(r.hero.id, d)
                        }
                        this._playAniId++;
                        var l = this._playAniId;
                        if (t.readys)
                            for (var a in t.readys) {
                                var u = t.readys[a];
                                for (var p in u) {
                                    n = u[p][0];
                                    var g = u[p][1];
                                    (v = this.packHeros[n]) && (v.part.isReadAni = g)
                                }
                            }
                        if (t.buffs)
                            for (var a in t.buffs) {
                                var m = t.buffs[a];
                                for (var p in m) {
                                    var b = m[p];
                                    (w = b[4]) || (w = b[0]);
                                    var v = this.packHeros[w],
                                        y = this.packHeros[b[0]];
                                    v && y && v.part.addShowBuff(l, parseInt(a), b[1], b[2], b[3], y.part, 0 == f)
                                }
                            }
                        var _ = !1;
                        if (t.hps)
                            for (var a in t.hps) {
                                var x = t.hps[a];
                                for (var p in x) {
                                    var w, S = x[p];
                                    (w = S[4]) || (w = S[0]);
                                    v = this.packHeros[w], y = this.packHeros[S[0]];
                                    1 == S[3] && (_ = !0), v && y && v.part.addShowHp(l, parseInt(a), S[1], S[2], S[3], y.part, 0 == f, S[5], S[6])
                                }
                            }
                        if (t.subSkills) {
                            var k = [];
                            for (var a in t.subSkills) {
                                var I = t.subSkills[a];
                                for (var p in I)
                                    if (f) {
                                        v = r;
                                        if (I[p].skill) {
                                            var T = I[p].skill[1];
                                            for (var C in c)
                                                if (c[C] == T) {
                                                    v = this.packHeros[T];
                                                    break
                                                } if (E = ftd.Skill.get(I[p].skill[0], "aniaction")) {
                                                    k.push(I[p]);
                                                    continue
                                                }
                                        }
                                        v.part.addShowSkill(l, parseInt(a), I[p])
                                    } else this.analyzeCmd(I[p], !0)
                            }
                            for (a = k.length - 1; a >= 0; a--) this._tickActions.splice(1, 0, k[a])
                        }
                        if (t.changes)
                            for (a = 0; a < t.changes.length; a++) r.part.addShowChange(this.packHeros[t.changes[a]]);
                        if (t.order1 && (this.actionOrder1 = t.order1), t.order2 && (this.actionOrder2 = t.order2), h) {
                            var E = ftd.Skill.get(f, "aniaction"),
                                M = [];
                            for (var a in c) M.push(this.packHeros[c[a]]);
                            _ && "a1" == E && (E = "a5"), r.part.addAttackAct(f, E, M, e, l)
                        }
                    }
                },
                actionOrder: function (t) {
                    return this._orderMoving > 0 ? (this._orderMoving -= t, !0) : (this.actionOrder1 && (this.updateOrderPos(1, this.actionOrder1, !0), this.updateOrderInfo(this.actionOrder1)), this.actionOrder2 && (this.updateOrderPos(2, this.actionOrder2, !0), this.updateOrderInfo(this.actionOrder2)), this.actionOrder1 || this.actionOrder2 ? (this.actionOrder1 = void 0, this.actionOrder2 = void 0, !0) : void 0)
                },
                convertFrame2Time: function (t) {
                    return t / 30 / ftc.ManagerData.get1("ManagerBattle").speed
                },
                tick: function (t) {
                    if (this.loadingSize > 0) this.loadingProgress >= this.loadingSize && (this.loadingSize = 0, this.loadingProgress = 0, this.isBegin || (ftc.send("battleActionEnd"), this.isBegin = !0));
                    else {
                        if (this.waitInputCallback && this._unHandleMsgs.length > 0) {
                            for (var e = 0; e < this._unHandleMsgs.length; e++) this.msg[this._unHandleMsgs[e][0]](this._unHandleMsgs[e][1], this._unHandleMsgs[e][2]);
                            this._unHandleMsgs = []
                        }
                        if (!this.isEnd) {
                            if (this.nodeBigMove.active) return this.boneHero = this.spineBigMove0.findBone("ren"), this.spriteBigMove.node.parent.x = this.boneHero.worldX, void (this.spriteBigMove.node.parent.y = this.boneHero.worldY);
                            for (var e in this.packHeros)
                                if (this.packHeros[e].part && !this.packHeros[e].part.checkIsAniEnd()) return;
                            if (!this.actionOrder(t) && this._tickActions)
                                if (this._tickActions.length > 0) {
                                    var i = this._tickActions[0];
                                    this.analyzeCmd(i), this._tickActions.splice(0, 1)
                                } else this.waitPlayActionCallback && this.waitPlayActionCallback()
                        }
                    }
                },
                cleanup: function () { },
                checkIsForbid: function (t, e) {
                    var i = this.battle,
                        a = this.getCurrentInputHero();
                    return !!(i && (i.forbid & t) == t || a && (a.forbid & t) == t) && (e && ftc.showTip(e), !0)
                },
                showSkillInfo: function (t) {
                    t ? this.partItemInfo = ftc.showSkillInfo(t, this.skillData) : (this.partItemInfo && (this.partItemInfo.cancel(), this.partItemInfo = void 0), this._partPetInfo && (this._partPetInfo.cancel(), this._partPetInfo = void 0))
                },
                onLongClick: function (t, e) {
                    if (e) this.showSkillInfo(), this.nodeLayoutBuff.active = !1;
                    else if (t.target == this.buttonSkill.node) {
                        this.getBattleShowSkill(this.getCurrentInputHero())[0] && this.showSkillInfo(t.target, this.skillData)
                    } else {
                        for (var i = 0; i < this.buttonPets.length; i++)
                            if (t.target == this.buttonPets[i].node) {
                                var a = this.getCommonSkills()[i];
                                return void (this._partPetInfo = ftc.showItemInfo(t.target, {
                                    name: ft.ExtPet.getName(a),
                                    info: ft.ExtPet.getInfo(a)
                                }))
                            } for (i = 0; i < this.buttonHeros.length; i++)
                            if (t.target == this.buttonHeros[i].node)
                                for (var n in this.packHeros)
                                    if (this.packHeros[n].button == this.buttonHeros[i]) {
                                        if (this.packHeros[n].hero.buffs) {
                                            var s = this.packHeros[n].hero.buffs.split(";");
                                            if (s.length > 0) {
                                                for (var o = 0; o < s.length; o++) {
                                                    var r = s[o].split("|"),
                                                        c = r[0],
                                                        h = ftd.Skillbuff.get(c, "img");
                                                    r.unshift(h), s[o] = r, void 0 === r[4] && (r[4] = ftd.Skillbuff.get(c, "addnum"));
                                                    var f = ftd.Skillbuff.get(c, "addper");
                                                    r.push(f)
                                                }
                                                for (o = s.length - 1; o >= 0; o--)
                                                    for (var d = 0; d < o; d++)
                                                        if (s[d][0] == s[o][0] && s[d][1] == s[d][1]) {
                                                            s[d][4] = Number(s[d][4]) + Number(s[o][4]), s[d][3] = -2, s.splice(o, 1);
                                                            break
                                                        } this.nodeLayoutBuff.active = !0, ftc.ManagerRes.restoreNodeChildren(this.nodeLayoutBuff);
                                                var l = this.nodeLayoutBuff.parent.convertToNodeSpaceAR(t.target.convertToWorldSpaceAR(cc.v2(0, 0)));
                                                this.nodeLayoutBuff.position = cc.v2(l.x + (i < 5 ? 250 : -250), l.y + 50);
                                                var u = 0;
                                                for (var o in s) {
                                                    var p = this.newPart("PartBattleHeroBuff");
                                                    p.setData(s[o], 0 === u ? ft.ExtHero.getName(this.packHeros[n].hero.id) : ""), this.nodeLayoutBuff.addChild(p.node), u++
                                                }
                                            }
                                        }
                                        return
                                    }
                    }
                },
                onClick: function (t) {
                    if (!(this._unHandleMsgs.length > 0)) {
                        for (this.showSkillInfo(); ;) {
                            if (t.target === this.buttonRoot.node) {
                                this.selectType > -1 && (ftc.showTip("\u53d6\u6d88\u9009\u62e9"), this.setSelectTarget(this.getCurrentInputHero().entityId));
                                break
                            }
                            if (t.target === this.buttonAuto.node) {
                                if (this.checkIsForbid(ft.type.battle.forbidAuto, "\u65e0\u6cd5\u4f7f\u7528\u603b\u653b")) break;
                                this.waitInputCallback ? this.switchSelectType(5) : ftc.send("battleAuto")
                            } else if (t.target === this.buttonSpeed.node) ftc.send("battleSpeed");
                            else if (t.target === this.buttonExit.node) {
                                if (this.checkIsForbid(ft.type.battle.forbidExit, 8 === this.battle.pet1 ? "\u80cc\u6c34\u9635\u65e0\u6cd5\u64a4\u9000" : "\u5f53\u524d\u6218\u6597\u65e0\u6cd5\u64a4\u9000")) break;
                                this.switchSelectType(4)
                            } else if (this.buttonRecordVideo && t.target === this.buttonRecordVideo.node) {
                                if (ftc.recordVideoState) {
                                    if (ft.getSysSecond() - this.recordVideoTime <= 3) return void ftc.showTip("\u5f55\u5c4f\u65f6\u957f\u9700\u5927\u4e8e3s")
                                } else ftc.recordVideoState = !0;
                                this.labelRecordStatus.string = "\u5f55\u5c4f", this.spriteRecordRedPoint.node.active = !1, ftc.ManagerH5.stopRecordScreen(), ftc.ManagerH5.startRecordScreen(function (t) {
                                    "start" == t ? (ftc.recordVideoTime = ft.getSysSecond(), this.labelRecordStatus.string = "\u5f55\u5c4f\u4e2d", this.spriteRecordRedPoint.node.active = !0) : "end" == t ? (ftc.recordVideoTime = 0, ftc.recordVideoState = !1, this.labelRecordStatus.string = "\u5f55\u5c4f", this.spriteRecordRedPoint.node.active = !1, ftc.ManagerH5.stopRecordScreen(), ftc.ManagerH5.shareVideo()) : "end" == t && (ftc.recordVideoTime = 0, ftc.recordVideoState = !1, this.labelRecordStatus.string = "\u5f55\u5c4f", this.spriteRecordRedPoint.node.active = !1, ftc.ManagerH5.stopRecordScreen())
                                }.bind(this))
                            } else if (t.target === this.buttonAttack.node) {
                                if (this.checkIsForbid(ft.type.battle.forbidAttack, "\u65e0\u6cd5\u4f7f\u7528\u666e\u901a\u653b\u51fb")) break;
                                this.switchSelectType(0, ft.ExtHero.getNormalAttack(this.getCurrentInputHero().id))
                            } else {
                                if (t.target === this.buttonBag.node) {
                                    if (this.checkIsForbid(ft.type.battle.forbidItem, "\u65e0\u6cd5\u4f7f\u7528\u9053\u5177")) break;
                                    return void this.setListVisible(!this.nodeBagList.active, 1)
                                }
                                if (t.target === this.buttonOrder.node) {
                                    if (this.checkIsForbid(ft.type.battle.forbidOrder, "\u65e0\u6cd5\u4f7f\u7528\u9635\u6cd5")) break;
                                    return void this.setListVisible(!this.nodeBagList.active, 2)
                                }
                                if (t.target === this.buttonSkill.node) {
                                    if (this.checkIsForbid(ft.type.battle.forbidSkill, "\u65e0\u6cd5\u4f7f\u7528\u6280\u80fd")) break;
                                    var e = this.getBattleShowSkill(this.getCurrentInputHero()),
                                        i = e[0],
                                        a = e[1];
                                    i && (ft.ExtSkill.getSkillType(i) == ft.type.skill.zd ? a ? this.switchSelectType(0, i) : ftc.showTip("\u6280\u80fd\u672a\u5f00\u653e") : ftc.showTip("\u88ab\u52a8\u6280\u80fd"))
                                } else if (t.target === this.buttonImprint.node) ftc.loadLayout("LayoutCopySkill");
                                else if (this.waitInputCallback) {
                                    for (var n in this.packHeros)
                                        if (t.target == this.packHeros[n].button.node) {
                                            if (this.selectType > -1) this.packHeros[n].part.nodeTarget.active ? this.switchSelectType(this.selectType, this.selectId, n) : ftc.showTip("\u8bf7\u9009\u62e9\u5f85\u9009\u6846\u4e2d\u7684\u6b66\u5c06");
                                            else {
                                                if (1 == this.packHeros[n].hero.type) return void (this.acts[n] ? this.setSelectTarget(n) : ftc.showTip("\u8be5\u6b66\u5c06\u65e0\u6cd5\u884c\u52a8"));
                                                if (this.selectTarget == n) {
                                                    if (this.checkIsForbid(ft.type.battle.forbidAttack, "\u65e0\u6cd5\u4f7f\u7528\u666e\u901a\u653b\u51fb")) break;
                                                    this.switchSelectType(0, ft.ExtHero.getNormalAttack(this.getCurrentInputHero().id))
                                                } else this.updateSelectTarget(n)
                                            }
                                            break
                                        } var s = -1;
                                    for (n = 0; n < this.buttonPets.length; n++)
                                        if (t.target == this.buttonPets[n].node) {
                                            s = n;
                                            break
                                        } if (s > -1) {
                                            if (this.checkIsForbid(ft.type.battle.forbidStrategy, "\u65e0\u6cd5\u4f7f\u7528\u7b56\u7565")) break;
                                            var o = this.getCommonSkills()[s];
                                            this.switchSelectType(1, o)
                                        }
                                }
                            }
                            break
                        }
                        this.setListVisible(!1)
                    }
                },
                onKeyBack: function (t) {
                    if (!t) {
                        if (!this.waitInputCallback) return 1 == this.battle.isAuto && this.onClick({
                            target: this.buttonAuto.node
                        }), !0;
                        if (this.nodeBagList.active) this.nodeBagList.active = !1, this.updateTvTip(), ftc.ManagerTV.nextSelect(this.tvLatestButton, this.node);
                        else if (this.selectType > -1) this.tvZone = 0, this.onClick({
                            target: this.buttonRoot.node
                        }), ftc.ManagerTV.nextSelect(this.tvLatestButton, this.node);
                        else {
                            if (!this.buttonExit.node.active) return !1;
                            this.onClick({
                                target: this.buttonExit.node
                            })
                        }
                    }
                    return !0
                },
                onKeyMenu: function (t) {
                    if (!t) {
                        if (!this.waitInputCallback) return;
                        if (1 == this.tvZone && this.selectType > -1) return;
                        if (this.tvZone ? this.tvZone = 0 : this.tvZone = 1, 1 == this.tvZone) {
                            for (var e in this.packHeros)
                                if (e == this.selectTarget) {
                                    ftc.ManagerTV.nextSelect(this.packHeros[e].button, this.node, this.tvZone);
                                    break
                                }
                        } else ftc.ManagerTV.nextSelect(this.tvLatestButton, this.node);
                        this.updateTvTip()
                    }
                },
                onKeyDirection: function (t, e) {
                    if (!t)
                        if (3 == e) {
                            if (ftc.ManagerTV.getSelectButton() == this.buttonPets[0]) return ftc.ManagerTV.nextSelect(this.buttonSkill), !0
                        } else if (4 == e && ftc.ManagerTV.getSelectButton() == this.buttonSkill) return ftc.ManagerTV.nextSelect(this.buttonPets[0]), !0
                },
                onAfterKeyDirection: function (t, e) {
                    t || !this.waitInputCallback || this.tvZone || this.nodeBagList.active || (this.tvLatestButton = ftc.ManagerTV.getSelectButton())
                },
                pretreatAction: function (t) {
                    for (var e in this.packHeros) this.packHeros[e].part.curHpId = 1, this.packHeros[e].part.idShowHps = {};
                    var i = {},
                        a = function t(e) {
                            if (e.hps)
                                for (var a in e.hps)
                                    for (var n = 0; n < e.hps[a].length; ++n) {
                                        var s = e.hps[a][n][0];
                                        void 0 === i[s] && (i[s] = 0), i[s]++, e.hps[a][n].push(i[s])
                                    }
                            if (e.subSkills)
                                for (var a in e.subSkills)
                                    for (n = 0; n < e.subSkills[a].length; ++n) t(e.subSkills[a][n])
                        };
                    for (e = 0; e < t.length; ++e) a(t[e]);
                    return t
                },
                msg: function () {
                    this.msg = {
                        check: function (t, e, i) {
                            return "openNewGuide" != t && "showNewGuide" != t && "openTalk" != t || (!!this.waitInputCallback || (this._unHandleMsgs.push([t, e, i]), !1))
                        },
                        openNewGuide: function (t, e) {
                            ftc.openNewGuide(t), this.updateTvTip()
                        },
                        showNewGuide: function (t, e) {
                            ftc.showNewGuide(t), this.updateTvTip()
                        },
                        openTalk: function (t, e) {
                            ftc.throwMsg("openTalk", t, e)
                        },
                        battleAddAction: function (t, e) {
                            this.updateAutoInfo(), this.updateTvTip(), t = this.pretreatAction(t), this.playActionAni(t, function () {
                                this.waitPlayActionCallback = void 0, ftc.send("battleActionEnd")
                            }.bind(this))
                        },
                        battleInputCmd: function (t, e) {
                            this.acts = t.acts, this.waitInput(function (t) {
                                for (var e in this.waitInputCallback = void 0, this.nodeBottom.active = !1, this.buttonOrder.node.active = !1, this.buttonBag.node.active = !1, this.buttonExit.node.active = !1, this.buttonImprint.node.active = !1, this.packHeros) this.packHeros[e].part.cleanSelect(), this.packHeros[e].part.cleanTarget();
                                ftc.isTv() && (this.buttonAuto.node.active = !1, this.buttonSpeed.node.active = !1, ftc.ManagerTV.updateSelect()), ftc.send("battleInputCmd", t), this.labelStage.string = ftc.language("\u6218\u6597\u6267\u884c\u9636\u6bb5")
                            })
                        },
                        battleRoundStart: function (t, e) {
                            this.updateRoundInfo(), t = this.pretreatAction(t), this.playRoundAni(t, function () {
                                this.waitPlayActionCallback = void 0, ftc.send("battleRoundOver"), this.updateExtInfo()
                            }.bind(this))
                        },
                        battleQuit: function (t, e) {
                            ftc.playBackMusic(ftc.type.effect.musicMap), -1 == t && ftc.sendClient("c_quitBattle", "LayoutMain"), ftc.ManagerH5.isH5() ? this.cancel(!1) : (this.cancel(!1, !0), ftc.isIos() && ftc.sysGC())
                        },
                        battleSpeed: function (t, e) {
                            this.updateSpeedInfo()
                        },
                        battleAuto: function (t, e) {
                            this.updateAutoInfo(), this.updateTvTip()
                        },
                        battleSetNextTeam: function (t, e) {
                            for (var i in this.updateBattleInfo(), this.battleHeros = ftc.ManagerData.get2("BattleHeros"), this.packHeros) this.battleHeros[i].type == t && (this.packHeros[i].button.node.active = !1, ftc.ManagerRes.restoreNode(this.packHeros[i].part.node), delete this.battleHeros[i], delete this.packHeros[i]);
                            for (var i in this.isBegin = !1, this.battleHeros) this.battleHeros[i].type == t && this.createBattleHero(i);
                            this.updateOrderPos(t, this.battle["pet" + t]), this.updateOrderInfo(t), this.updatePets()
                        },
                        battleShowExtInfo: function (t, e) {
                            this.nodeTip.active = !0, this.extInfoType = t, this.updateExtInfo()
                        },
                        battleChangeBgImage: function (t, e) {
                            this.loadBackground(t)
                        },
                        c_testSuccess: function (t, e) {
                            this.waitInputCallback({
                                acts: this.acts,
                                exit: 1
                            })
                        },
                        c_testFail: function (t, e) {
                            this.waitInputCallback({
                                acts: this.acts,
                                exit: 0
                            })
                        },
                        c_move: function (t, e) {
                            var i = t.targets;
                            if (i && i.length > 0) {
                                var a, n = t.actor;
                                n.button.node.stopAllActions(), a = i.length > 2 ? this.getBattleFirstCenterPos(i[0].hero.type) : this.getBattleHeroPosInfo(i[0].hero.type, i[0].hero.pos);
                                var s = (1 == n.hero.type ? -1 : 1) * ftc.PartHeroWidth;
                                n.button.node.runAction(cc.sequence(cc.moveTo(this.convertFrame2Time(t.frame), a.x + s, a.y), cc.callFunc(function () {
                                    n.part.updateAllHpPartPos()
                                })))
                            }
                        },
                        c_back: function (t, e) {
                            var i = t.actor,
                                a = this.getBattleHeroPosInfo(i.hero.type, i.hero.pos);
                            i.button.node.runAction(cc.moveTo(this.convertFrame2Time(t.frame), a.x, a.y))
                        },
                        c_bullet: function (t, e) {
                            var i, a, n = t.actor,
                                s = t.target,
                                o = this.getBattleHeroPosInfo(n.hero.type, n.hero.pos),
                                r = this.getBattleHeroPosInfo(s.hero.type, s.hero.pos),
                                c = n.part.getBulletInitPos();
                            c ? (i = o.x + c.x, a = o.y + c.y) : (i = o.x, a = o.y);
                            var h, f = r.x,
                                d = r.y,
                                l = this.convertFrame2Time(t.frame),
                                u = this.newPart("PartBattleBoom");
                            (u.setData("bullet_" + t.id, t.playId, n, [s], 2 == n.hero.type ? -1 : 1, !1, 0), u.node.x = i, u.node.y = a, u.node.zIndex = 102, this.nodeHeros.addChild(u.node), u.node.runAction(cc.moveTo(l, f, d + t.offsetY)), 0 == t.type) ? (h = 1 == n.hero.type ? ftc.getPoint2PointAngle(f, d + t.offsetY, i, a) - 90 : ftc.getPoint2PointAngle(i, a, f, d + t.offsetY) - 90, u.node.angle = -h) : u.node.angle = 0
                        },
                        c_boom: function (t, e) {
                            if (t.from && t.actor) {
                                var i, a = this.newPart("PartBattleBoom"),
                                    n = t.actor;
                                a.setData(t.id, t.playId, t.from, t.targets, 2 == t.from.hero.type ? -1 : 1, !1, t.hitAct), 2 == t.pos ? (i = this.getBattleCenterPos(n.hero.type), a.node.x = i.x, a.node.y = i.y) : (a.node.x = n.button.node.x, a.node.y = n.button.node.y), a.node.angle = 0, this.nodeHeros.addChild(a.node), 1 == t.downLayer ? a.node.zIndex = 10 : a.node.zIndex = 103
                            } else ftc.err("\u9519\u8bef\uff1ac_boom" + t.id + ",from=" + t.from + ",actor=" + t.actor)
                        },
                        c_hp: function (t, e) {
                            var i = t.actor.newHpart(t.hurt, t.bj, t.type);
                            this.nodeHeros.addChild(i.node)
                        },
                        c_skill: function (t, e) {
                            this.analyzeCmd(t, !0)
                        },
                        c_skill2: function (t, e) {
                            this._tickActions.splice(1, 0, t)
                        },
                        c_item: function (t, e) {
                            this.nodeBagList.active = !1, this.switchSelectType(t.type, t.data.id)
                        },
                        c_shake: function (t, e) {
                            if (!this._isOnShake) {
                                t || (t = {
                                    frame: 5,
                                    type: 0
                                }), void 0 == t.frame && (t.frame = 5), this._isOnShake = !0;
                                var i, a = this.convertFrame2Time(t.frame),
                                    n = t.scaleX,
                                    s = cc.callFunc(function () {
                                        this._isOnShake = !1
                                    }.bind(this));
                                i = 1 == t.type ? cc.sequence(cc.moveBy(a / 5, cc.v2(40 * n, 0)), cc.moveBy(a / 5, cc.v2(-50 * n, 0)), cc.moveBy(a / 5, cc.v2(20 * n, 0)), cc.moveBy(a / 5 * 2, cc.v2(-10 * n, 0)), s) : 2 == t.type ? cc.sequence(cc.moveBy(a / 5, cc.v2(20 * n, 0)), cc.moveBy(a / 5, cc.v2(-30 * n, 0)), cc.moveBy(a / 5, cc.v2(20 * n, 0)), cc.moveBy(a / 5 * 2, cc.v2(-10 * n, 0)), s) : 3 == t.type ? cc.sequence(cc.moveBy(a / 6, cc.v2(10, -10)), cc.moveBy(a / 3, cc.v2(-20, 20)), cc.moveBy(a / 6, cc.v2(-10, 10)), cc.moveBy(a / 3, cc.v2(20, -20)), s) : cc.sequence(cc.moveBy(a / 5, cc.v2(0, -40)), cc.moveBy(a / 5, cc.v2(0, 40)), cc.moveBy(a / 5, cc.v2(0, -20)), cc.moveBy(a / 5 * 2, cc.v2(0, 20)), s), this.nodeHeros.runAction(i)
                            }
                        },
                        c_black: function (t, e) {
                            0 == t ? (this.nodeBlack.zIndex = 11, this.nodeBlack.active = !0) : this.nodeBlack.active = !1
                        }
                    }
                }
            })
        