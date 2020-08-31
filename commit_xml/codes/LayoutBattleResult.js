
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonSelf: cc.Button,
                    nodeLayoutHero: cc.Node,
                    labelLv: cc.Label,
                    progressLv: cc.ProgressBar,
                    labelExp: cc.Label,
                    nodeLayoutAward: cc.Node,
                    buttonLeft: cc.Button,
                    buttonRight: cc.Button,
                    spineResult: sp.Skeleton,
                    nodeTip: cc.Node,
                    buttonRefresh: cc.Button,
                    nodePartFight: cc.Node,
                    buttonAd1: cc.Button
                },
                init: function () {
                    this.prepareParts(["PartBattleResultItem", "PartFight", "PartItemShine"]), this.addClick(this.buttonSelf, {
                        zone: 99
                    }), this.addClick(this.buttonLeft, !0), this.addClick(this.buttonRight, !0), this.addClick(this.buttonRefresh), this.addClick(this.buttonAd1, !0), this.hideShielding(), ftc.isTv() && (this.nodeTip.active = !1)
                },
                load: function () {
                    this.spineResult.setEventListener(function (t, e) {
                        if (!ftc.ManagerRes.checkNodeIsRestored(this.node))
                            if (e.data.name.startsWith("role_")) {
                                var i = e.data.name.substr(5) - 1;
                                1 == this.data.win ? this.heroItems[i].playJumpAni() : this.heroItems[i].playReadyAni()
                            } else if (e.data.name.startsWith("1_")) {
                                i = e.data.name.substr(2) - 1;
                                this.awardItems[i] && this.award.ids[i] && (this.awardItems[i].node.active = !0, this.awardItems[i].setData({
                                    id: this.award.ids[i],
                                    num: this.award.nums[i]
                                }), this.awardItems[i].playAnimation())
                            } else if (e.data.name.startsWith("shengji_")) {
                                i = e.data.name.substr(8) - 1;
                                var a = !1;
                                this.heroItems[i].node.active && this.heroItems[i].isLvUp && (a = !0, this.isLvUp = !0), a && this.heroItems[i].playLvUpAni()
                            } else "fight" === e.data.name && (this.partFight.node.active = this.isLvUp, this.isLvUp && (this.partFight.node.scale = .3, this.partFight.node.runAction(cc.spawn(cc.scaleTo(.3, 1), cc.callFunc(function () {
                                var t = ft.ExtHero.getTeamFight(this.teamIndex);
                                this.partFight.setData(t - 1e3, t, !0)
                            }.bind(this))))))
                    }.bind(this)), ftc.ManagerTV.setBackButton(this.buttonSelf, this.node), this.buttonAd1.node.active = !1, this.heroItems = [];
                    for (var t = 0, e = ft.value.com.maxHeroNum; t < e; t++) {
                        var i = this.newPart("PartBattleResultItem");
                        this.nodeLayoutHero.addChild(i.node, t), this.heroItems.push(i)
                    }
                    this.awardItems = [];
                    for (t = 0, e = 6; t < e; t++) {
                        i = this.newPart("PartItemShine");
                        this.nodeLayoutAward.addChild(i.node, t), this.awardItems.push(i)
                    }
                    this.partFight = this.newPart("PartFight"), this.partFight.node.active = !1, this.nodePartFight.addChild(this.partFight.node), this.buttonLeft.node.active = !1, this.buttonRight.node.active = !1, this.teamIndex = -1, this.labelExp.string = "+0", this.buttonRefresh.node.active = !ft.ExtItem.getNum(ft.value.disable.bag) && ft.ExtMap.getType(ftc.ManagerData.get1("ManagerMap").cur) != ft.type.map.xswj, this.tickAdd = 0, 0 == ftc.ManagerData.get1("Player").vip && ftc.ManagerH5.showBanner()
                },
                setData: function (t, e) {
                    this.data = t, this.callback = e, this.setTeamInfo(ftc.ManagerData.get1("ManagerBattle").teamIndex, !0), this.setAwardInfo();
                    var i = function (t) {
                        this.loadResource(t, sp.SkeletonData, function (t) {
                            t && (this.spineResult.skeletonData = t, this.spineResult.setAnimation(0, "wait1", !1), this.spineResult.addAnimation(0, "wait2", !0))
                        }.bind(this))
                    }.bind(this),
                        a = Number(this.data.id);
                    if (1001 !== a && 1002 !== a && 1003 !== a && 1004 !== a && 1008 !== a && 1117 !== a && 1118 !== a || ftc.ManagerH5.countEvent("8_" + a + "_" + this.data.win), 1 === this.data.win ? (ftc.playEffect(ftc.type.effect.battleWin), i("spine/view/battleResult_win")) : (ftc.playEffect(ftc.type.effect.battleLose), i("spine/view/battleResult_lose")), this.openAdBox = !1, ftc.ManagerData.get1("ManagerMap").isOpenAdBox && !ft.ExtMsg.isExclude(ft.type.activity.battleAdBox) && "1" === ftc.callNativeFunction("openFullAd")) {
                        var n = !ftc.ManagerH5.isH5() && (ft.ExtPlayer.getLevel() < ft.value.com.showAdLevel || ftc.ManagerData.get1("ManagerMsg").adAwardCount <= 0),
                            s = ft.ExtTask.getTasksByMapType(0);
                        for (var o in s)
                            if (ft.ExtTask.getType(s[o].id) == ft.type.task.main) {
                                s[o].id < 6 && (n = !0);
                                break
                            } if (!n)
                            if (ft.ExtMap.getType(ftc.ManagerData.get1("ManagerMap").cur) === ft.type.map.normal)
                                if (1 === this.data.win)
                                    if (ftc.isLastBattleWatchAd) ftc.isLastBattleWatchAd = !1;
                                    else 1 === ft.rand(2) && (this.openAdBox = ftc.haveFullAd);
                                else this.buttonAd1.node.active = ftc.haveFullAd
                    }
                    this.labelLv.string = this.data.newLvl + ftc.language("\u7ea7"), this.progressLv.progress = this.data.newExp / ft.ExtPlayer.getNextExp(this.data.newLvl);
                    var r = 0;
                    for (o = this.data.oldLvl; o < this.data.newLvl; o++) r += ft.ExtPlayer.getNextExp(o);
                    r = r - this.data.oldExp + this.data.newExp, this.labelExp.string = "+0", this.addExp = r, this.addedExp = 0, this.expAdd = Math.ceil(r / 60)
                },
                setTeamInfo: function (t, e) {
                    this.teamIndex = t, this.isLvUp = !1;
                    for (var i = ft.ExtHero.getTeam(ftc.ManagerData.get2Object("Hero"), ftc.ManagerData.get1("ManagerHero").teamIds, t), a = [], n = 0; n < i.length; n++) i[n] && a.push(i[n]);
                    var s = !1;
                    for (n = 0; n < this.heroItems.length; n++) {
                        var o;
                        if (a[n]) this.heroItems[n].node.active = !0, this.data.heros && (o = this.data.heros[a[n].id]), s = a[n].id == this.data.maxHurtHero, this.heroItems[n].setData(a[n], this.data.win, o, s, e);
                        else this.heroItems[n].node.active = !1
                    }
                    this.data.teamSize > 1 && ft.ExtHero.getIsOpenTeam(1) ? (this.buttonLeft.node.active = this.teamIndex > 0, this.buttonRight.node.active = this.teamIndex < this.data.teamSize - 1, ftc.setTvTip(this.node, "\u3010\u8fd4\u56de\u952e\u3011\u5173\u95ed\u754c\u9762\uff0c\u3010\u83dc\u5355\u952e\u3011\u5207\u6362\u663e\u793a\u961f\u4f0d")) : (this.buttonLeft.node.active = !1, this.buttonRight.node.active = !1, ftc.setTvTip(this.node))
                },
                setAwardInfo: function () {
                    for (var t = [], e = [], i = 0; i < this.data.items.length; i++) ft.ExtItem.getType(this.data.items[i][0]) !== ft.type.item.base && this.data.items[i][0] !== ft.value.item.exp && (t.push(this.data.items[i][0]), e.push(this.data.items[i][1]));
                    this.award = {
                        ids: t,
                        nums: e
                    };
                    for (i = 0; i < this.awardItems.length; i++) this.awardItems[i].node.active = !1
                },
                enter: function () {
                    ftc.showPlayerLevelUp()
                },
                updateData: function () {
                    for (var t = ft.ExtHero.getTeam(ftc.ManagerData.get2Object("Hero"), ftc.ManagerData.get1("ManagerHero").teamIds, this.teamIndex), e = [], i = 0; i < t.length; i++) t[i] && e.push(t[i]);
                    for (i = 0; i < this.heroItems.length; i++) e[i] ? (this.heroItems[i].node.active = !0, this.heroItems[i].updateData(e[i])) : this.heroItems[i].node.active = !1
                },
                tick: function (t) {
                    if (!(this.addedExp >= this.addExp))
                        for (this.tickAdd += t; this.tickAdd > .016;) this.addedExp + this.expAdd > this.addExp && (this.expAdd = this.addExp - this.addedExp), this.addedExp += this.expAdd, this.labelExp.string = "+" + ft.getNumShow(this.addedExp), this.tickAdd -= .016
                },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        heroRefreshStatus: function (t, e) {
                            0 === t ? this.updateData() : -1 === t && ftc.showTip("\u9ad8\u7ea7\u91ce\u8425\u5e10\u6570\u91cf\u4e0d\u8db3")
                        },
                        heroAdRefreshStatus: function (t, e) {
                            this.buttonAd1.node.active = !1, this.updateData()
                        },
                        c_successFullAd: function (t, e) {
                            ftc.ManagerH5.countEvent("9_2"), ftc.send("heroAdRefreshStatus")
                        }
                    }
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonSelf.node) this.openAdBox ? (ftc.ManagerH5.countEvent("9_3"), ftc.ManagerH5.hideBanner(), ftc.loadLayout("LayoutAwardGoods3", function (t) {
                        this.callback && t.setData(this.callback), this.cancel()
                    }.bind(this))) : (this.callback && this.callback(), ftc.ManagerH5.hideBanner(), this.cancel());
                    else if (t.target === this.buttonLeft.node) this.teamIndex > 0 && (this.teamIndex--, this.setTeamInfo(this.teamIndex));
                    else if (t.target === this.buttonRight.node) this.teamIndex < this.data.teamSize - 1 && (this.teamIndex++, this.setTeamInfo(this.teamIndex));
                    else if (t.target === this.buttonRefresh.node) ft.ExtItem.getNum(ft.value.item.yeYingZhang1) + ft.ExtItem.getNum(ft.value.item.yeYingZhang2) ? ftc.loadLayout("LayoutDialogTip2", function (t) {
                        t.setData(2)
                    }) : ftc.showTip("\u91ce\u8425\u5e10\u6570\u91cf\u4e0d\u8db3");
                    else if (t.target === this.buttonAd1.node) {
                        var i;
                        i = ftc.ManagerH5.isH5() ? ftc.ManagerH5.showFull(1) : ftc.callNativeFunction("showFull", ft.type.fullAd.battleResult), ftc.ManagerH5.countEvent("9_1"), "1" != i ? ftc.showTip("\u6682\u65e0\u5e7f\u544a\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5") : ftc.watchingAd = !0
                    }
                },
                onKeyMenu: function (t) {
                    if (!t) return this.buttonRight.node.active ? this.onClick({
                        target: this.buttonRight.node
                    }) : this.buttonLeft.node.active && this.setTeamInfo(ftc.ManagerData.get1("ManagerBattle").teamIndex), !0
                }
            })
        