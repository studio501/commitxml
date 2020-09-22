
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    panelHeroList: cc.Node,
                    listView: ftc.ListView,
                    buttonTeam: cc.Button,
                    nodeTeam: cc.Node,
                    spriteButtonTeamBg: cc.Sprite,
                    buttonTeamTabs: [cc.Button],
                    buttonRecord: cc.Button,
                    spineHero: sp.Skeleton,
                    spriteStars: [cc.Sprite],
                    spriteCountry: cc.Sprite,
                    spriteWeapon: cc.Sprite,
                    spriteName: cc.Sprite,
                    spritePlus: cc.Sprite,
                    buttonCommander: cc.Button,
                    progressLv: cc.ProgressBar,
                    labelExp: cc.Label,
                    labelLv: cc.Label,
                    partFight: t("PartFight"),
                    buttonChangeHero: cc.Button,
                    nodeEquips: cc.Node,
                    teamEquips: [t("PartTeamEquip")],
                    nodeButtons: cc.Node,
                    buttonStrengthen: cc.Button,
                    buttonOrder: cc.Button,
                    buttonStrategy: cc.Button,
                    buttonDetail: cc.Button,
                    spriteDetailRedPoint: cc.Sprite,
                    PartHeroDetail: t("PartHeroDetail")
                },
                init: function () {
                    this.prepareParts(["PartHeroSkill", "PartSkillInfo"]), this.addClick(this.buttonTeam, !0), this.addClick(this.buttonRecord, !0), this.addClick(this.buttonCommander), this.addClick(this.buttonChangeHero, !0), this.addClick(this.buttonDetail), this.addClick(this.buttonStrengthen), this.addClick(this.buttonOrder, !0), this.addClick(this.buttonStrategy, !0);
                    for (var t = 0; t < this.buttonTeamTabs.length; t++) this.addClick(this.buttonTeamTabs[t], !0);
                    this.panelHeroList.getComponent(cc.Widget).enabled = !1, ftc.isIphoneX() ? this.panelHeroList.x = 117 : this.panelHeroList.x = 67
                },
                load: function () {
                    this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("编队"), this.node.addChild(this.partTopStatus.node), this.selectTeamTab(0);
                    for (var t = 0; t < this.teamEquips.length; t++) this.initPart(this.teamEquips[t]);
                    this.initPart(this.PartHeroDetail), this.initPart(this.partFight);
                    var e = ftc.ManagerData.get2Object("Item");
                    ftc.isTv() ? (this.buttonOrder.node.active = !1, this.buttonStrategy.node.active = !1, this.buttonTeam.node.active = !1, ft.ExtHero.getIsOpenTeam(1) && this.updateTvTip(), this.nodeButtons.y = -237, this.partFight.node.y = -157) : (this.buttonOrder.node.active = !!e[ft.value.func.order], this.buttonStrategy.node.active = !!e[ft.value.func.buttonStrategy]);
                    this.buttonTeam.node.active = !(ft.ExtMap.getType(ftc.ManagerData.get1("ManagerMap").cur) === ft.type.map.zy && ftc.ManagerData.get1("ManagerTask").cur >= 3301)
                },
                selectTeamTab: function (t) {
                    if (ft.ExtHero.getIsOpenTeam(t)) {
                        for (var e = ft.ExtHero.getTeam(ftc.ManagerData.get2Object("Hero"), ftc.ManagerData.get1("ManagerHero").teamIds, t), i = !0, a = 0; a < e.length; a++)
                            if (e[a]) {
                                i = !1;
                                break
                            } if (i) ftc.loadLayout("LayoutList", function (e) {
                                e.setData({
                                    type: ft.type.list.ChangeHero,
                                    pos: t * ft.value.com.maxHeroNum
                                })
                            });
                        else {
                            this.teamIndex = t;
                            for (a = 0; a < this.buttonTeamTabs.length; a++);
                            this.setHeroList(t);
                            var n = this.listView.getItem(0);
                            n && ftc.ManagerTV.nextSelect(n.buttonSelf, this.node)
                        }
                    } else 1 === t && ftc.showTip("3\u5468\u76ee\u5f00\u653e\u961f\u4f0d\u4e8c")
                },
                updateTvTip: function () {
                    var t = "【返回键】关闭界面，【菜单键】切换队伍";
                    0 == this.teamIndex ? t += "2" : t += "1", ftc.setTvTip(this.node, t)
                },
                setHeroList: function (t, e) {
                    var i = ft.ExtHero.getTeam(ftc.ManagerData.get2Object("Hero"), ftc.ManagerData.get1("ManagerHero").teamIds, t);
                    if (void 0 === e)
                        for (var a = 0; a < i.length; a++)
                            if (i[a]) {
                                e = a;
                                break
                            } i[e % 5] && (this.selectedIndex = e % 5, this.listView.setListView(i, e), this.setHeroInfo(e))
                },
                setHeroInfo: function (t) {
                    var e = this.listView.getDatas()[t];
                    this.selectedData = e;
                    var i = e.id,
                        a = e.lv,
                        n = e.up,
                        s = e.star;
                    this.spriteCountry.spriteFrame = ft.ExtHero.getCountrySprite(i), this.spriteWeapon.spriteFrame = ft.ExtHero.getWeaponSprite(i), this.spriteName.spriteFrame = ft.ExtHero.getNameSprite(i), this.spriteName.node.color = ft.ExtHero.getNameColor(i), this.spritePlus.node.active = n > 0, n > 0 && (this.spritePlus.spriteFrame = ft.ExtHero.getUpSprite(n), this.spritePlus.node.active = !!this.spritePlus.spriteFrame, this.spritePlus.node.color = ft.ExtHero.getNameColor(i)), this.labelLv.string = a + ftc.language("级"), this.progressLv.node.active = e.id, this.progressLv.progress = Math.round(e.exp) / ft.ExtHero.getNextExp(a), this.labelExp.string = ft.getNumShow(Math.round(e.exp)) + "/" + ft.getNumShow(ft.ExtHero.getNextExp(a)), this.buttonCommander.interactable = ftc.ManagerData.get1("ManagerHero")["commander" + this.teamIndex] != i;
                    for (var o = 0; o < this.spriteStars.length; o++) this.spriteStars[o].spriteFrame = ftc.ManagerRes.getSpriteFrame("program", s > o ? "com_star" : "com_stargray");
                    this.loadResource(ft.ExtHero.getSpineRes(i), sp.SkeletonData, function (t) {
                        t && (this.spineHero.skeletonData = null, this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "w1", !0))
                    }.bind(this), this), this.spriteDetailRedPoint.node.active = ft.ExtHero.getType(i) === ft.type.hero.our && (ft.ExtHero.checkCanLvUp(e) || ft.ExtHero.checkCanStarUp(e) || ft.ExtHero.checkCanWakeUp(e) || ft.ExtHero.checkCanBiographyUnlock(e));
                    var r = [ft.type.part.weapon, ft.type.part.armet, ft.type.part.clothes, ft.type.part.decoration, ft.type.part.shoes, ft.type.part.rider, ft.type.part.exclusive];
                    this.equips = [];
                    for (o = 0; o < r.length; o++) {
                        var c = ft.ExtHero.getEquip(e.id, r[o]);
                        if (this.equips.push(c), this.teamEquips[o].setPart(r[o]), c || r[o] !== ft.type.part.exclusive ? (this.teamEquips[o].node.active = !0, this.teamEquips[o].setData(c, o)) : (this.teamEquips[o].node.active = !1, this.teamEquips[o].setData(null, o)), r[o] !== ft.type.part.exclusive)
                            if (c) {
                                var h = !1,
                                    f = ftc.ManagerData.get2("Equip");
                                for (var d in f)
                                    if (-1 === f[d].pos && (r[o] === ft.type.part.weapon && ft.ExtEquip.getType(f[d].id) === ft.ExtHero.getWeapon(e.id) || r[o] !== ft.type.part.weapon && r[o] === ft.ExtEquip.getPart(f[d].id)) && (f[d].lv > c.lv && ft.ExtEquip.getQuality(f[d].id) >= ft.ExtEquip.getQuality(c.id) || ft.ExtEquip.getQuality(f[d].id) > ft.ExtEquip.getQuality(c.id))) {
                                        h = !0;
                                        break
                                    } this.teamEquips[o].setRedPoint(!1), this.teamEquips[o].setUpTip(h)
                            } else this.teamEquips[o].setRedPoint(ft.ExtHero.checkCanEquipPart(e, r[o])), this.teamEquips[o].setUpTip(!1);
                        else this.teamEquips[o].setRedPoint(!1), this.teamEquips[o].setUpTip(!1)
                    }
                    var l = ft.ExtHero.getFight(e);
                    this.partFight.setData(l), this.nodeEquips.active = -1 !== ft.ExtHero.getPos(e.id), this.PartHeroDetail.setData(e)
                },
                setData: function (t) { },
                enter: function () {
                    this.data && this.data.index && this.listView.toIndex(this.data.index)
                },
                updateData: function () {
                    this.partTopStatus.updateData(), this.setHeroList(this.teamIndex, this.selectedIndex)
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectHeroItem: function (t, e) {
                            t.data ? (this.selectedIndex = t.index, this.listView.updateListViewItems(t.index), this.setHeroInfo(t.index)) : ftc.loadLayout("LayoutList", function (e) {
                                e.setData({
                                    type: ft.type.list.ChangeHero,
                                    pos: t.index + this.teamIndex * ft.value.com.maxHeroNum
                                })
                            }.bind(this))
                        },
                        c_onSelectHeroItem2: function (t, e) {
                            ftc.loadLayout("LayoutList", function (t) {
                                t.setData({
                                    type: ft.type.list.ChangeHero,
                                    pos: this.selectedIndex + this.teamIndex * ft.value.com.maxHeroNum
                                })
                            }.bind(this))
                        },
                        c_onSelectListHeroItem: function (t, e) {
                            ftc.send("heroOnload", t)
                        },
                        c_onClickTeamEquip1: function (t, e) {
                            if (t.getPart() !== ft.type.part.exclusive) {
                                var i = ft.ExtEquip.getEquipsByPart(t.getPart(), ft.ExtHero.getWeapon(this.selectedData.id), this.selectedData.id);
                                i.length > 0 ? ftc.loadLayout("LayoutList", function (t) {
                                    t.setData({
                                        type: ft.type.list.ChangeEquip,
                                        datas: i,
                                        pos: this.selectedIndex + this.teamIndex * ft.value.com.maxHeroNum
                                    })
                                }.bind(this)) : ftc.showTip("无适用装备")
                            }
                        },
                        c_onClickTeamEquip2: function (t, e) {
                            ftc.loadLayout("LayoutEquipDetail", function (e) {
                                e.setData({
                                    pos: this.selectedIndex + this.teamIndex * ft.value.com.maxHeroNum,
                                    index: t.index
                                }, !0)
                            }.bind(this))
                        },
                        heroOnload: function (t, e) {
                            t.ret ? (this.selectedIndex = t.pos % ft.value.com.maxHeroNum, this.teamIndex = Math.floor(t.pos / ft.value.com.maxHeroNum), this.updateData()) : ftc.showTip("1\u961f\u8bf7\u81f3\u5c11\u4fdd\u7559\u4e00\u4e2a\u975e\u5267\u60c5\u6b66\u5c06")
                        },
                        equipLevelUp: function (t, e) {
                            if (t && t.length > 0)
                                for (var i = 0; i < t.length; i++)
                                    for (var a = t[i][0], n = 0; n < this.teamEquips.length; n++)
                                        if (this.teamEquips[n].node.active) {
                                            var s = this.teamEquips[n].getData();
                                            if (s && s.entityId == a) {
                                                this.teamEquips[n].playLvUp();
                                                break
                                            }
                                        } this.updateData()
                        },
                        heroCommander: function (t, e) {
                            0 !== t && (this.listView.updateListViewItems(this.selectedIndex), this.setHeroInfo(this.selectedIndex))
                        },
                        equipOnload: function () {
                            ftc.playEffect(ftc.type.effect.equip), this.updateData()
                        },
                        equipUnload: function () {
                            ftc.playEffect(ftc.type.effect.equip), this.updateData()
                        }
                    }
                },
                setTeamTabVisible: function (t) {
                    var e = t ? 1 : -246;
                    this.spriteButtonTeamBg.node.runAction(cc.moveTo(.12, cc.v2(0, e)).easing(cc.easeQuadraticActionIn()))
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonTeam.node) this.setTeamTabVisible(this.spriteButtonTeamBg.node.y < 0);
                    else if (t.target === this.buttonRecord.node) ftc.showTip("未开放"), this.setTeamTabVisible(!1);
                    else if (t.target === this.buttonCommander.node) ftc.send("heroCommander", {
                        id: this.selectedData.id,
                        team: this.teamIndex
                    });
                    else if (t.target === this.buttonChangeHero.node) ftc.loadLayout("LayoutList", function (t) {
                        t.setData({
                            type: ft.type.list.ChangeHero,
                            pos: this.selectedIndex + this.teamIndex * ft.value.com.maxHeroNum
                        })
                    }.bind(this));
                    else if (t.target === this.buttonStrengthen.node) ftc.loadLayout("LayoutDialogTip2", function (t) {
                        t.setData(1, this.selectedData.id)
                    }.bind(this));
                    else if (t.target === this.buttonOrder.node) ftc.loadLayout("LayoutOrder", void 0);
                    else if (t.target === this.buttonStrategy.node) ftc.loadLayout("LayoutStrategy", void 0, {
                        hide: !0
                    });
                    else if (t.target === this.buttonDetail.node) ftc.loadLayout("LayoutHero", function (t) {
                        t.setData({
                            heroes: this.listView.getDatas(),
                            index: this.selectedIndex
                        })
                    }.bind(this));
                    else
                        for (var i = 0; i < this.buttonTeamTabs.length; i++)
                            if (t.target === this.buttonTeamTabs[i].node) {
                                this.selectTeamTab(i), this.setTeamTabVisible(!1);
                                break
                            }
                },
                onKeyMenu: function (t) {
                    if (!t && ft.ExtHero.getIsOpenTeam(1)) return this.selectTeamTab(1 - this.teamIndex), this.updateTvTip(), !0
                }
            })
        