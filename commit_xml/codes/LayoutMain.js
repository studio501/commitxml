
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    partMainControl: t("PartMainControl"),
                    partMainPointer: t("PartMainPointer"),
                    spineClick: sp.Skeleton,
                    spriteClick: cc.Sprite,
                    buttonOn: cc.Button,
                    buttonOff: cc.Button,
                    buttonBag: cc.Button,
                    buttonVisit: cc.Button,
                    buttonStrategy: cc.Button,
                    buttonTeam: cc.Button,
                    buttonEmbattle: cc.Button,
                    buttonHeros: cc.Button,
                    buttonSmelter: cc.Button,
                    buttonDecompose: cc.Button,
                    buttonCompose: cc.Button,
                    nodeSmelter: cc.Node,
                    buttonTask: cc.Button,
                    buttonImprint: cc.Button,
                    buttonCopy: cc.Button,
                    buttonCopyExit: cc.Button,
                    labelTaskProgress: cc.Label,
                    buttonPlayer: cc.Button,
                    spriteIcon: cc.Sprite,
                    spriteQuality: cc.Sprite,
                    buttonMail: cc.Button,
                    buttonNotice: cc.Button,
                    buttonMap: cc.Button,
                    buttonWorldMap: cc.Button,
                    buttonSuoDi: cc.Button,
                    buttonJingJie: cc.Button,
                    labelJingJieCd: cc.Label,
                    labelJingJieRemaining: cc.Label,
                    buttonActive: cc.Button,
                    buttonRecordVideo: cc.Button,
                    labelRecordStatus: cc.Label,
                    spriteRecordRedPoint: cc.Sprite,
                    spriteTaskRedPoint: cc.Sprite,
                    spriteCopyRedPoint: cc.Sprite,
                    spriteOnRedPoint: cc.Sprite,
                    spriteBagRedPoint: cc.Sprite,
                    spriteVisitRedPoint: cc.Sprite,
                    spriteStrategyRedPoint: cc.Sprite,
                    spriteTeamRedPoint: cc.Sprite,
                    spriteEmbattleRedPoint: cc.Sprite,
                    spriteHerosRedPoint: cc.Sprite,
                    spriteMailRedPoint: cc.Sprite,
                    spriteNoticeRedPoint: cc.Sprite,
                    spriteActiveRedPoint: cc.Sprite,
                    buttonArrowRight: cc.Button,
                    spriteArrowRight: cc.Sprite,
                    labelLevel: cc.Label,
                    progressExp: cc.ProgressBar,
                    labelSp: cc.Label,
                    labelCoordinate: cc.Label,
                    tiledMap: cc.TiledMap,
                    nodeBottomBar: cc.Node,
                    nodeRightBar: cc.Node,
                    nodeMap: cc.Node,
                    nodeTop: cc.Node,
                    nodeBottom: cc.Node,
                    nodeLeft: cc.Node,
                    nodeActivity: cc.Node,
                    nodeTvMenu: cc.Node,
                    nodeTvActivity: cc.Node,
                    nodeTvFunc: cc.Node,
                    buttonSetting: cc.Button,
                    buttonBuyGold: cc.Button,
                    buttonBuyGem: cc.Button,
                    buttonBuyPower: cc.Button
                },
                init: function () {
                    if (this.addClick(this.buttonActive), this.addClick(this.buttonBag), this.addClick(this.buttonVisit), this.addClick(this.buttonStrategy), this.addClick(this.buttonTeam), this.addClick(this.buttonEmbattle), this.addClick(this.buttonHeros), this.addClick(this.buttonDecompose), this.addClick(this.buttonCompose), this.addClick(this.buttonTask), this.addClick(this.buttonImprint), this.addClick(this.buttonCopy), this.addClick(this.buttonOn, {
                        zone: 99
                    }), this.addClick(this.buttonOff), this.addClick(this.buttonMap), this.addClick(this.buttonWorldMap), this.addClick(this.buttonSuoDi), this.addClick(this.buttonJingJie), this.addClick(this.buttonPlayer, !0), this.addClick(this.buttonMail), this.addClick(this.buttonNotice), this.addClick(this.buttonCopyExit), this.buttonArrowRight && this.addClick(this.buttonArrowRight), this.buttonSetting && this.addClick(this.buttonSetting), this.buttonBuyGold && this.addClick(this.buttonBuyGold), this.buttonBuyGem && this.addClick(this.buttonBuyGem, {
                        priority: 1
                    }), this.buttonBuyPower && this.addClick(this.buttonBuyPower), this.buttonRecordVideo && this.addClick(this.buttonRecordVideo), this.buttonSmelter && this.addClick(this.buttonSmelter), ftc.isIphoneX() ? this.nodeLeft.x = 69 : this.nodeLeft.x = 9, this.labelJingJieRemaining.node.parent.position = cc.v2(420, -82), ftc.ManagerTV.setNotShowOnEnter(this.node), ftc.ManagerTV.setNotShowOnCancel(this.node), ftc.ManagerH5.isH5() && 1 === ftc.ManagerData.get1("Player").level) {
                        var t = ftc.ManagerH5.getOtherOpenId();
                        t && (ftc.ManagerData.get1("ManagerMsg").otherOpenId || ftc.send("msgInvited", t))
                    }
                    "1" == ftc.ManagerH5.isOpenRecordVideo() && (ftc.recordVideoState = !1), ft.ExtNpc.load(), ft.ExtItem.load(), ft.ExtHero.load(), ft.ExtEquip.load(), ft.ExtJewel.load(), ft.ExtPetValue.load(), ft.ExtTitle.loadHeroValues(ftc.ManagerData.get2("Hero"), ftc.ManagerData.get2("Title"))
                },
                load: function () {
                    this.initPart(this.partMainControl), this.initPart(this.partMainPointer), this.mapModel = ftc.MapModel.getInstance(), this.mapModel.init(this, this.partMainPointer, this.spineClick, this.spriteClick), this.mapModel.firstEnterMap = !0, this.partMainControl.setData(this, this.mapModel), this.partMainControl.onEvent(this.partMainControl.node), this.partMainControl.cleanDirButtons(), this.partMainPointer.node.active = !1, this._isloaded = !1, this._oldLoaded = !1, this._unHandleMsgs = [], this._isOptionShow = !1, this._isOptionRunning = !1, this._noNpcTime = 0, this._noNpcCd = 0, this._isShowAd = !1, this._GuanYuCD = 0, this.currentMap = void 0, ft.ExtTask.hideTarget = ftc.ManagerData.get1("ManagerTask").hideGuide, this._playerToucing = !1, this.nodeTop.active = !1, this.nodeBottom.active = !1, this.nodeLeft.active = !1, this.nodeActivity.active = !1, this.buttonArrowRight.node.active = !1, this.nodeMap.active = !1, this.nodeRightBar.active = !1, this.nodeBottomBar.active = !1, this.nodeTvMenu && (this.nodeTvMenu.active = !1), this.nodeSmelter && (this.nodeSmelter.active = !1), this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("", 2), this.node.addChild(this.partTopStatus.node), this.partTopStatus.node.active = !1, this._loadActivityBtn(), this.buttonRecordVideo && (1 == ftc.ManagerH5.isOpenRecordVideo() ? (this.buttonRecordVideo.node.active = !0, ftc.recordVideoState ? (this.labelRecordStatus.string = "录屏中", this.spriteRecordRedPoint.node.active = !0) : (this.labelRecordStatus.string = "录屏", this.spriteRecordRedPoint.node.active = !1)) : this.buttonRecordVideo.node.active = !1), ftc.ManagerH5.isH5() && 615 == ftc.getSourceId() && (ftc.ManagerData.get1("ManagerMap").frameRate = 60), ftc.setFrameRate(ftc.ManagerData.get1("ManagerMap").frameRate), ftc.playBackMusic(ftc.type.effect.musicMap), ftc.showPlayerLevelUp(!0), ftc.send("startGame"), this.msg.loadMap()
                },
                enter: function () {
                    this.updateData(), this.openShowRollTitle(), ftc.ManagerH5.setUserStorage()
                },
                updateData: function () {
                    this.partTopStatus.updateData(), this.updateValues(), this.updateCopyInfo(), this.updateTaskExInfo(), this.updateFuncInfo(), this.updateFuncRedPointInfo(), this.spriteIcon.spriteFrame = ft.ExtDecoration.getCurSprite(ft.type.decoration.header), this.spriteQuality.spriteFrame = ft.ExtDecoration.getCurSprite(ft.type.decoration.headerFrame), this.nodeTvMenu && (this.nodeTvMenu.active ? ftc.ManagerTV.nextSelect() : ftc.ManagerTV.updateSelect())
                },
                tick: function (t) {
                    if (this._isloaded) {
                        if (this._unHandleMsgs.length) {
                            for (var e = 0; e < this._unHandleMsgs.length; e++) {
                                if (!this._isloaded) return void (e > 0 && this._unHandleMsgs.splice(0, e));
                                this.msg[this._unHandleMsgs[e][0]](this._unHandleMsgs[e][1], this._unHandleMsgs[e][2])
                            }
                            this._unHandleMsgs = []
                        }
                        this.partMainControl.tickMove(t), this.partMainPointer.updatePointer(), (ftc.ManagerData.isNewC1() || ftc.ManagerData.isNewC2()) && this.updateValues(), this._oldLoaded && (this.tickCD(t), this.mapModel.tickMap(t))
                    }
                    this._oldLoaded = this._isloaded
                },
                tickCD: function (t) {
                    this._noNpcTime > 0 ? (this._noNpcTime -= t, this.labelJingJieRemaining.node.parent.active = !0, this.labelJingJieRemaining.string = ftc.language("警戒计剩余:") + parseInt(this._noNpcTime)) : this.labelJingJieRemaining.node.parent.active = !1
                },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        check: function (t, e, i) {
                            switch (t) {
                                case "showWait":
                                case "showBlack":
                                    return !0
                            }
                            return !!this._isloaded || (this._unHandleMsgs.push([t, e, i]), !1)
                        },
                        final: function () {
                            this.partMainPointer.updatePointer()
                        },
                        loadMap: function (t, e) {
                            e || (ftc.ManagerData.get1("ManagerMap").cur > 0 ? (this._isloaded = !1, this.partMainControl._controlType && this.partMainControl.stopMove(), this.partMainPointer.setNextGuideNpc(null), this.currentMap = ftc.ManagerData.get2Object("Map")[ftc.ManagerData.get1("ManagerMap").cur], this.mapModel.loadMapFile(this.currentMap, t, this.loadMapOver.bind(this), !0), this.updateTaskInfo(), this.updateData(), ftc.isTv() && (this.partMainControl._controlRoleDir(!1, void 0, !0), this.nodeTvMenu && (this.nodeTvMenu.active = !1, this.buttonOn.node.active = !1)), 3606 === this.currentMap.id && ftc.ManagerH5.countEvent("6_1")) : (this._isloaded = !0, this.mapModel.firstEnterMap = !1))
                        },
                        openTalk: function (t, e) {
                            for (var i = 0; i < t.s.length; i++) {
                                var a = ftd.Story.get(t.s[i], "a_img", !0);
                                if (a)
                                    for (var n = ftd.Story.get(t.s[i], "a_name", !0), s = ft.ExtStory.getTexts(t.s[i]), o = 0; o < a.length; o++) t.t.push([a[o], n[o], s[o]])
                            }
                            var r = ftc.ManagerRes.findLayout("LayoutTalk");
                            0 != t.t.length || t.b && 0 != t.b.length ? r ? r.setData(t.t, t.b, function (t) {
                                ftc.sendCallback("openTalk", t)
                            }.bind(this), t.h, t.npcId) : ftc.loadLayout("LayoutTalk", function (e) {
                                this.partMainPointer.updatePointer(), e.setData(t.t, t.b, function (t) {
                                    ftc.sendCallback("openTalk", t)
                                }.bind(this), t.h, t.npcId)
                            }.bind(this)) : r && 0 == t.h && r.cancel()
                        },
                        closeTalk: function (t, e) {
                            var i = ftc.ManagerRes.findLayout("LayoutTalk");
                            i && (this.partMainPointer.updatePointer(), i.cancel())
                        },
                        openAward: function (t, e) {
                            if (t.items)
                                if (0 === t.type) {
                                    for (var i = [], a = [], n = 0; n < t.items.length; n++) {
                                        var s = t.items[n][0],
                                            o = t.items[n][1];
                                        if (ft.ExtItem.getType(s) === ft.type.item.whole) {
                                            var r = ft.ExtItem.getHero(s);
                                            if (r) {
                                                i.push([r, o]);
                                                continue
                                            }
                                        }
                                        a.push(t.items[n])
                                    }
                                    i.length > 0 ? ftc.loadLayout("LayoutAwardHero", function (t) {
                                        t.setData(i, function () {
                                            a.length > 0 ? ftc.loadLayout("LayoutAwardGoods", function (t) {
                                                t.setData(a, function () {
                                                    ftc.sendCallback("openAward")
                                                })
                                            }) : ftc.sendCallback("openAward")
                                        })
                                    }) : a.length > 0 && ftc.loadLayout("LayoutAwardGoods", function (t) {
                                        t.setData(a, function () {
                                            ftc.sendCallback("openAward")
                                        })
                                    })
                                } else if (1 === t.type)
                                    for (n = 0; n < t.items.length; n++) ftc.showTip(ftc.language("获得") + ft.ExtItem.getName(t.items[n][0]) + "x" + t.items[n][1]);
                            this.updateData()
                        },
                        openAward2: function (t, e) {
                            t.items && ftc.loadLayout("LayoutAwardGoods2", function (e) {
                                e.setData(t.items, t.title, t.txt, function () {
                                    ftc.sendCallback("openAward2")
                                })
                            })
                        },
                        showVisitResult: function (t, e) {
                            ftc.loadLayout("LayoutVisitResult", function (e) {
                                e.setData(t.datas, t.type)
                            })
                        },
                        showWait: function (t, e) {
                            ftc.showWait(t.text, t.time, void 0, void 0, t.type)
                        },
                        hideWait: function (t, e) {
                            ftc.cancelWait()
                        },
                        showShop: function (t, e) {
                            ftc.loadLayout("LayoutShop1", function (e) {
                                e.setData(t)
                            }, {
                                hide: !0
                            })
                        },
                        showShop2: function (t, e) {
                            ftc.loadLayout("LayoutShop2", function (e) {
                                e.setData(t)
                            }, {
                                hide: !0
                            })
                        },
                        showTip: function (t, e) {
                            ftc.showTip(t)
                        },
                        showRollTitle: function (t, e) {
                            ftc.showRollTitle([t], this)
                        },
                        openBattle: function (t, e) {
                            this.nodeTvMenu && (this.nodeTvMenu.active = !1), ftc.showWait("加载战斗资源...", 0, null, 255, ft.type.wait.battle), ftc.sendClient("c_loadBattle", t, "LayoutMain", .7)
                        },
                        c_loadBattle: function (t, e) {
                            ftc.loadLayout("LayoutBattle", function (e) {
                                e.setData(t)
                            }, {
                                hide: !0,
                                noScale: !1
                            })
                        },
                        openResult: function (t, e) {
                            ftc.loadLayout("LayoutBattleResult", function (e) {
                                e.setData(t, function () {
                                    ftc.sendCallback("openResult")
                                })
                            })
                        },
                        disableControl: function (t, e) {
                            ftc.showTop()
                        },
                        enableControl: function (t, e) {
                            ftc.cancelTop()
                        },
                        openNewGuide: function (t, e) {
                            ftc.openNewGuide(t)
                        },
                        showNewGuide: function (t, e) {
                            ftc.showNewGuide(t)
                        },
                        showView: function (t, e) {
                            var i = !1;
                            t.hide && 1 == t.hide && (i = !0), ftc.loadLayout(t.view, function (e) {
                                e.setData && e.setData(t.params)
                            }, {
                                hide: i
                            })
                        },
                        openView: function (t, e) {
                            var i = !1;
                            t.hide && 1 == t.hide && (i = !0), ftc.loadLayout(t.view, function (e) {
                                e.setData && e.setData(t.params), t.isCancel ? ftc.ManagerRes.addCallbackOnCancelView(function () {
                                    ftc.sendCallback("openView:" + t.view)
                                }, t.view, 1) : ftc.ManagerRes.addCallbackOnOpenView(function () {
                                    ftc.sendCallback("openView:" + t.view)
                                }, t.view, 1)
                            }, {
                                hide: i
                            })
                        },
                        openPopupView: function (t, e) {
                            var i = !1;
                            t.hide && 1 == t.hide && (i = !0), t.items ? ftc.loadLayout("LayoutAwardGoods2", function (e) {
                                e.setData(t.items, t.title, t.txt, function () {
                                    ftc.sendCallback("openPopupView")
                                })
                            }) : ftc.loadLayout(t.view, function (e) {
                                e.setData && e.setData(t.params), t.isCancel ? ftc.ManagerRes.addCallbackOnCancelView(function () {
                                    ftc.sendCallback("openPopupView")
                                }, t.view, 1) : ftc.ManagerRes.addCallbackOnOpenView(function () {
                                    ftc.sendCallback("openPopupView")
                                }, t.view, 1)
                            }, {
                                hide: i
                            })
                        },
                        closeView: function (t, e) {
                            var i = ftc.ManagerRes.findLayout(t);
                            i && i.cancel()
                        },
                        showBlack: function (t, e) {
                            ftc.ManagerRes.findLayout("LayoutBlack") || ftc.loadLayout("LayoutBlack", function (t) {
                                t.node.zIndex = 256, t.setFadeIn(function () {
                                    ftc.sendCallback("showBlack")
                                })
                            })
                        },
                        hideBlack: function (t, e) {
                            var i = ftc.ManagerRes.findLayout("LayoutBlack");
                            i && i.setFadeOut(function () {
                                ftc.sendCallback("hideBlack")
                            })
                        },
                        openScreenText: function (t, e) {
                            var i = this.newPart("PartScreenText");
                            i.setData(t.texts);
                            var a = ftc.ManagerRes.findLayout("LayoutBlack");
                            a || (a = ftc.ManagerRes.topLayout()), a.node.addChild(i.node, 257)
                        },
                        c_copyEnter: function (t, e) {
                            ftc.send("mapEnterMap1", {
                                point: ft.value.map1["point" + (t + 1)],
                                x: this.mapModel._mapRole.tx,
                                y: this.mapModel._mapRole.ty,
                                dir: this.mapModel._mapRole.dir
                            })
                        },
                        copyExit: function (t, e) {
                            this.updateCopyInfo()
                        },
                        getPlayer: function (t, e) {
                            0 == t.ste && t.type == ft.type.http.Touch && (this.openShowRollTitle(), this._playerToucing && (ftc.showTip("数据保存成功"), this._playerToucing = !1))
                        },
                        playerTouchStart: function () {
                            this._playerToucing = !0
                        },
                        showNewPay: function (t, e) {
                            ftr.cancelPayCountdown();
                            for (var i = [], a = t, n = 0; n < a.length; n++)
                                if (a[n]) {
                                    var s = ft.value["product" + [a[n]]];
                                    i.push([ft.value.item.gem, s.gem + s.gemAdd])
                                } ftc.loadLayout("LayoutAwardGoods", function (t) {
                                    t.setData(i)
                                })
                        },
                        finishTask: function (t, e) {
                            var i = ft.ExtTask.getMapType(t),
                                a = ft.ExtMap.getType(this.currentMap.id);
                            if (i == a) {
                                var n = ft.ExtTask.getType(t);
                                if (n == ft.type.task.main || n == ft.type.task.branch) ft.ExtTask.getTasksByMapType(a).length > 0 && ftc.loadLayout("LayoutTask", void 0, {
                                    hide: !0
                                })
                            }
                        },
                        mapUseJinjie: function (t, e) {
                            this._noNpcTime = t.noNpcTime, this._noNpcCd = t.noNpcCd, ftc.showTip("使用警戒计成功，{0}秒内将不遇敌".replace("{0}", t.noNpcTime))
                        },
                        showCopyDialog: function (t, e) {
                            var i, a = t.type;
                            1 === a ? i = ft.replaceAll("黄巾贼挑战伤害%d\n系统自动发放银币奖励%d\n希望您在以后的挑战中势如破竹", "%d", t.param.toString()) : 2 === a && (i = "敌人已经撤退，本次挑战您总共坚持了%d回合".replace("%d", t.param)), i && ftc.showDialog({
                                text: i,
                                click1: function () { }
                            })
                        },
                        c_quitBattle: function (t, e) { },
                        c_battleMusicEnd: function (t, e) { },
                        openBattleBefore: function (t, e) {
                            ftc.loadLayout("LayoutBattleBefore", function (e) {
                                e.setData(t, function (t) {
                                    ftc.sendCallback("openBattleBefore", t)
                                })
                            })
                        },
                        petDelTip: function (t, e) {
                            this.spriteStrategyRedPoint.node.active = ftc.ManagerData.get1("ManagerPet").addTipsStrategy.length > 0, this.spriteEmbattleRedPoint.node.active = ftc.ManagerData.get1("ManagerPet").addTipsEmbattle.length > 0
                        },
                        c_copyZYExit: function (t, e) {
                            var i = ft.ExtTask.getZYTaskMain(),
                                a = "你的战役主线未完成，确定退出?";
                            if (1 === i.length) {
                                var n = i[0].id;
                                ft.ExtTask.checkGuide(n, "end") && (a = "你的战役主线已完成，确定退出?")
                            }
                            ftc.showDialog({
                                text: a,
                                click1: function () {
                                    ftc.send("copyExit")
                                },
                                click2: function () { }
                            })
                        },
                        updateRoleMapSkin: function (t, e) {
                            this.mapModel.updateRoleMapSkin()
                        },
                        c_openKeyDir: function (t) {
                            this.partMainControl.nodeWalk.active = 1 == t, this.partMainControl.updateData()
                        },
                        c_updateRoleMapTitle: function (t, e) {
                            this.mapModel._mapRole && this.mapModel._mapRole.updateTitle()
                        },
                        heroAdd: function (t, e) {
                            ft.ExtTitle.loadHeroValues(ftc.ManagerData.get2("Hero"), ftc.ManagerData.get2("Title"))
                        },
                        titleAdd: function (t, e) {
                            ftc.showTip(ftc.language("获得称号") + ft.ExtTitle.getName(t)), ft.ExtTitle.loadHeroValues(ftc.ManagerData.get2("Hero"), ftc.ManagerData.get2("Title"))
                        },
                        msgActivityAdd: function (t, e) {
                            this.updateData()
                        },
                        openInteractiveView: function (t, e) {
                            ftc.loadLayout("LayoutInteractiveView", function (e) {
                                e.setData(t)
                            })
                        },
                        showAllButtons: function (t, e) {
                            this.setAllButtonsVisible(!0)
                        },
                        hideAllButtons: function (t, e) {
                            this.setAllButtonsVisible(!1)
                        },
                        refreshMainUi: function (t, e) {
                            this.updateData()
                        },
                        playSoundEffect: function (t, e) {
                            ftc.playEffect(t)
                        },
                        openSelectSkill: function (t, e) {
                            ftc.loadLayout("LayoutSelectSkill", function (e) {
                                e.setData(t, function (t) {
                                    ftc.sendCallback("openSelectSkill", t)
                                })
                            })
                        },
                        openCopyExtAward: function (t, e) {
                            ftc.loadLayout("LayoutCopyGrade", function (e) {
                                e.setData(t.items), e.setCallback(function () {
                                    ftc.sendCallback("openCopyExtAward")
                                }.bind(this))
                            }.bind(this))
                        },
                        copyAddExtAward: function (t, e) {
                            ftc.loadLayout("LayoutCopyGrade", function (e) {
                                if (t && t.ids)
                                    for (var i = [], a = 0; a < t.ids.length; a++) i.push([t.ids[a], t.nums[a]]);
                                e.setData(i), e.setCallback(function () {
                                    ftc.send("copyExit")
                                }.bind(this))
                            }.bind(this))
                        },
                        showAchievementTip: function (t, e) {
                            var i = ["日常活跃", "每周活跃", "成就", "副本成就", "副本成就"][ft.ExtAchievement.getType(t.id) - 1],
                                a = ft.ExtAchievement.getInfo(t.id);
                            if (void 0 !== t.cur) {
                                var n = ft.ExtAchievement.getConditions(t.id);
                                a = a.replace("%d", n[t.cur])
                            }
                            ftc.showAchievementTip(i, a)
                        },
                        openGameEvasion: function (t, e) {
                            ftapp.loadLayout("LayoutEvasion", function (e) {
                                e.setData(t, function (t) {
                                    ftc.sendCallback("openGameEvasion", t)
                                })
                            }, !0)
                        },
                        replaceStoryText: function (t, e) {
                            var i = ft.toArray(t.replacer),
                                a = ftd.Story.get(t.id, "a_text", !0),
                                n = (a = a.concat())[t.textIndex];
                            n = n.replace(/\{(\d+)\}/g, function (t, e) {
                                return i[e]
                            }.bind(this)), a[t.textIndex] = n, ft.ExtStory.mapChangedStory || (ft.ExtStory.mapChangedStory = {}), ft.ExtStory.mapChangedStory[t.id] = a
                        },
                        openTipDialog: function (t, e) {
                            var i = t.buttons;
                            i && 0 !== i.length || (i = ["确定", "取消"]), ftc.showDialog({
                                text: t.text,
                                button1: i[0],
                                button2: i[1],
                                click1: function () {
                                    ftc.sendCallback("openTipDialog", 1)
                                }.bind(this),
                                click2: function () {
                                    ftc.sendCallback("openTipDialog", 2)
                                }.bind(this)
                            })
                        },
                        updateMap: function (t, e) {
                            this.mapModel.updateMap(), this.updateTaskInfo(), this.updateTaskExInfo()
                        },
                        openMoveNpc: function (t, e) {
                            this.mapModel.openMoveNpc(t)
                        },
                        turnNpc: function (t, e) {
                            this.mapModel.turnNpc(t)
                        },
                        fadeToNpc: function (t, e) {
                            this.mapModel.fadeToNpc(t)
                        },
                        fadeToMapLayer: function (t, e) {
                            this.mapModel.fadeToMapLayer(t)
                        },
                        setNpcFloor: function (t, e) {
                            this.mapModel.setNpcFloor(t)
                        },
                        showNpcSign: function (t, e) {
                            this.mapModel.showNpcSign(t)
                        },
                        openMoveRole: function (t, e) {
                            this.mapModel.openMoveRole(t)
                        },
                        moveBackRole: function (t, e) {
                            this.mapModel.moveBackRole(t)
                        },
                        openMoveRoleToNpc: function (t, e) {
                            this.mapModel.openMoveRoleToNpc(t)
                        },
                        openMoveRoleToXY: function (t, e) {
                            this.mapModel.openMoveRoleToXY(t)
                        },
                        turnRole: function (t, e) {
                            this.mapModel._mapRole && this.mapModel._mapRole.showWaitAnimation(t)
                        },
                        fadeToRole: function (t, e) {
                            this.mapModel.fadeToRole(t)
                        },
                        openFocus: function (t, e) {
                            this.mapModel.openFocus(t)
                        },
                        openFocusToNpc: function (t, e) {
                            this.mapModel.openFocusToNpc(t)
                        },
                        closeFocus: function (t, e) {
                            this.mapModel.closeFocus(t)
                        },
                        setRoleFloor: function (t, e) {
                            this.mapModel.setRoleFloor(t)
                        },
                        setMapColor: function (t, e) {
                            this.mapModel.setMapColor(t)
                        },
                        mapCrashNpc: function (t, e) {
                            this.mapModel.mapCrashNpc(t)
                        },
                        setMapSpeedUp: function (t, e) {
                            this.mapModel.setMapSpeedUp(t)
                        },
                        setMapRoleAddAni: function (t, e) {
                            this.mapModel.setMapRoleAddAni(t)
                        },
                        setNpcSte: function (t, e) {
                            this.mapModel.setNpcSte(t)
                        },
                        c_updateMap: function (t, e) {
                            this.mapModel.updateMap(t)
                        },
                        showPointer: function () {
                            ft.ExtTask.hideTarget = !1, this.updateTaskExInfo(), this.partMainPointer.show()
                        },
                        hidePointer: function () {
                            ft.ExtTask.hideTarget = !0, this.updateTaskExInfo(), this.partMainPointer.hide()
                        },
                        taskSetGuide: function () { }
                    }
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonOn.node) this.nodeTvMenu ? (this.nodeTvMenu.active = !this.nodeTvMenu.active, this.partTopStatus.node.active = !this.nodeTvMenu.active) : this.showOptionBar();
                    else if (t.target === this.buttonOff.node) this.hideOptionBar();
                    else if (t.target === this.buttonMap.node) this.nodeMap.active = !this.nodeMap.active;
                    else if (t.target === this.buttonWorldMap.node) ftc.loadLayout("LayoutWorldMap", void 0, {
                        hide: !0
                    }), this.nodeMap.active && (this.nodeMap.active = !1);
                    else if (t.target === this.buttonSuoDi.node) ft.ExtMap.getType(this.currentMap.id) === ft.type.map.normal ? (ftc.send("mapUseSuodi"), this.nodeMap.active && (this.nodeMap.active = !1), this.nodeTvMenu && (this.nodeTvMenu.active = !1)) : ftc.showTip("当前地图无法使用缩地计");
                    else if (t.target === this.buttonTask.node) ftc.loadLayout("LayoutTask", void 0, {
                        hide: !0
                    });
                    else if (t.target === this.buttonImprint.node) ftc.loadLayout("LayoutCopySkill");
                    else if (t.target === this.buttonBag.node) {
                        var i = ftc.ManagerData.get2("Item"),
                            a = !1;
                        for (var n in i)
                            if (ft.ExtItem.getType(i[n].id) === ft.type.item.material || ft.ExtItem.getType(i[n].id) === ft.type.item.goods || ft.ExtItem.getType(i[n].id) === ft.type.item.piece) {
                                a = !0;
                                break
                            } a || ftc.ManagerData.get2("Equip") ? ftc.loadLayout("LayoutBag", void 0, {
                                hide: !0
                            }) : ftc.showTip("暂无物品")
                    } else if (t.target === this.buttonVisit.node) ftc.loadLayout("LayoutVisit", function (t) {
                        1 == ftc.ManagerData.get1("Player").samsara && ftc.ManagerData.get1("ManagerTask").cur <= 3 ? t.selectTab(0) : ft.ExtMsg.getMsgByType(ft.type.activity.limitedVisit) ? t.selectTab(1) : t.selectTab(0)
                    }, {
                        hide: !0
                    });
                    else if (t.target === this.buttonStrategy.node) ftc.loadLayout("LayoutStrategy", void 0, {
                        hide: !0
                    });
                    else if (t.target === this.buttonTeam.node) ftc.loadLayout("LayoutTeam", void 0, {
                        hide: !0
                    });
                    else if (t.target === this.buttonEmbattle.node) ftc.loadLayout("LayoutOrder", void 0, {
                        hide: !0
                    });
                    else if (t.target === this.buttonJingJie.node) this._noNpcCd > 0 ? ftc.showTip("警戒计冷却中") : (ftc.send("mapUseJinjie"), ftc.playEffect(ftc.type.effect.map_jinJie)), this.nodeTvMenu && (this.nodeTvMenu.active = !1), this.nodeMap.active = !1;
                    else if (t.target === this.buttonHeros.node) ftc.loadLayout("LayoutHeroes", void 0, {
                        hide: !0
                    });
                    else if (this.buttonSmelter && t.target === this.buttonSmelter.node) this.nodeSmelter.active = !this.nodeSmelter.active;
                    else if (t.target === this.buttonDecompose.node) ftc.loadLayout("LayoutDecompose", void 0, {
                        hide: !0
                    }), this.nodeSmelter && (this.nodeSmelter.active = !1);
                    else if (t.target === this.buttonCompose.node) ftc.loadLayout("LayoutCompose", void 0, {
                        hide: !0
                    }), this.nodeSmelter && (this.nodeSmelter.active = !1);
                    else if (this.buttonArrowRight && t.target === this.buttonArrowRight.node) {
                        var s = -1 === this.spriteArrowRight.node.scaleX ? 566 : 0;
                        this.spriteArrowRight.node.scaleX = -this.spriteArrowRight.node.scaleX, cc.tween(this.nodeActivity).to(.25, {
                            x: s
                        }, {
                            easing: "expoOut"
                        }).start()
                    } else if (t.target === this.buttonPlayer.node) ftc.loadLayout("LayoutSetting", void 0, {
                        hide: !0
                    });
                    else if (this.buttonSetting && t.target === this.buttonPlayer.node) ftc.loadLayout("LayoutSetting", void 0, {
                        hide: !0
                    });
                    else if (this.buttonBuyGold && t.target === this.buttonBuyGold.node) ftc.loadLayout("LayoutBuyGold");
                    else if (this.buttonBuyGem && t.target === this.buttonBuyGem.node) ftc.openBuyGem();
                    else if (this.buttonBuyPower && t.target === this.buttonBuyPower.node) ftc.loadLayout("LayoutBuyPower");
                    else if (t.target === this.buttonCopy.node) ftc.loadLayout("LayoutCopy", void 0, {
                        hide: !0
                    }), this.spriteCopyRedPoint.node.active && (this.spriteCopyRedPoint.node.active = !1, ftc.send("copyCancelTip"));
                    else if (t.target === this.buttonMail.node) {
                        var o = ftc.ManagerData.get2("Msg"),
                            r = !1;
                        for (var n in o)
                            if (-1 !== o[n].ext && ft.ExtMsg.getType(o[n]) == ft.type.msg.normal) {
                                r = !0;
                                break
                            } r ? ftc.loadLayout("LayoutMail", void 0, {
                                hide: !0
                            }) : ftc.showTip("没有邮件")
                    } else if (t.target === this.buttonNotice.node) ftc.loadLayout("LayoutActivity", function (t) {
                        t.setData(ft.type.msg.pos.notice)
                    }, {
                        hide: !0
                    });
                    else if (t.target === this.buttonActive.node) ftc.loadLayout("LayoutAchievement", void 0, {
                        hide: !0
                    });
                    else if (this.buttonRecordVideo && t.target === this.buttonRecordVideo.node) {
                        if (ftc.recordVideoState) {
                            if (ft.getSysSecond() - ftc.recordVideoTime <= 3) return void ftc.showTip("录屏时长需大于3s")
                        } else ftc.recordVideoState = !0;
                        this.labelRecordStatus.string = "录屏", this.spriteRecordRedPoint.node.active = !1, ftc.ManagerH5.stopRecordScreen(), ftc.ManagerH5.startRecordScreen(function (t) {
                            "start" == t ? (ftc.recordVideoTime = ft.getSysSecond(), this.labelRecordStatus.string = "录屏中", this.spriteRecordRedPoint.node.active = !0) : "end" == t ? (ftc.recordVideoTime = 0, ftc.recordVideoState = !1, this.labelRecordStatus.string = "录屏", this.spriteRecordRedPoint.node.active = !1, ftc.ManagerH5.stopRecordScreen(), ftc.ManagerH5.shareVideo()) : "end1" == t && (ftc.recordVideoTime = 0, ftc.recordVideoState = !1, this.labelRecordStatus.string = "录屏", this.spriteRecordRedPoint.node.active = !1, ftc.ManagerH5.stopRecordScreen())
                        }.bind(this))
                    } else if (t.target === this.buttonCopyExit.node) {
                        var c, h = ft.ExtMap.getType(this.currentMap.id),
                            f = ftc.ManagerData.get1("ManagerCopy").cur;
                        h == ft.type.map.maze ? c = "是否确定退出宝藏地图，退出后将无法再次进入？" : h == ft.type.map.flhj ? c = "是否确定退出枫林副本，退出后本周无法再次进入" : h == ft.type.map.zy ? c = "确定要退出战役么，退出后重置战役内容，并且消耗【战役挑战券】x1?" : h == ft.type.map.tfdz || h == ft.type.map.czda || h == ft.type.map.pdjd || h == ft.type.map.sbbz || h == ft.type.map.lshy ? c = "确定要退出限时副本么，退出后重置副本内容" : h == ft.type.map.hsly ? c = "火烧连营任务线每周可完成一次，离开后可以重新进入继续完成。最终战斗可多次尝试。" : h != ft.type.map.xswj && h != ft.type.map.qjqc || (c = "确定要退出副本么，退出后重置副本内容"), c ? ftc.showDialog({
                            text: c,
                            click1: function () {
                                if (h == ft.type.map.zy) ftc.sendClient("c_copyZYExit", f, "LayoutMain", 0);
                                else if (h == ft.type.map.xswj) {
                                    var t = ft.ExtCopy.getCopy(ft.value.copy.XSWJ),
                                        e = ft.ExtCopy.getAchievements(ftc.ManagerData.get2Object("Achievement")),
                                        i = ft.ExtCopy.getAchievementScore(e);
                                    t && t.ste > 0 && i > 0 ? ftc.send("copyAddExtAward", f) : ftc.send("copyExit")
                                } else ftc.send("copyExit")
                            }.bind(this),
                            click2: function () { }
                        }) : ftc.send("copyExit")
                    }
                    this.partMainControl.stopMove()
                },
                updateFuncInfo: function () {
                    for (var t in this._mapActivityPosBtns) this._mapActivityPosBtns[t].updateActive();
                    var e = ftc.ManagerData.get2Object("Item"),
                        i = e[ft.value.func.activity] && !e[ft.value.disable.activity];
                    this.buttonArrowRight.node.active = i && this.nodeActivity.active;
                    var a = ft.ExtMsg.getMsgDatas(ft.type.msg.pos.notice);
                    this.buttonNotice.node.active = a.length > 0 && i, this.buttonRecordVideo && (1 == ftc.ManagerH5.isOpenRecordVideo() ? (this.buttonRecordVideo.node.active = !0, ftc.recordVideoState ? (this.labelRecordStatus.string = "录屏中", this.spriteRecordRedPoint.node.active = !0) : (this.labelRecordStatus.string = "录屏", this.spriteRecordRedPoint.node.active = !1)) : this.buttonRecordVideo.node.active = !1)
                },
                updateFuncRedPointInfo: function () {
                    this.updateActivityRedPoint();
                    var t, e = !1;
                    if (this.buttonTeam.node.active)
                        for (var i = ft.ExtHero.getTeam(ftc.ManagerData.get2Object("Hero"), ftc.ManagerData.get1("ManagerHero").teamIds), a = 0; a < i.length; a++) {
                            var n = i[a];
                            if (n && ft.ExtHero.getType(n.id) === ft.type.hero.our && (ft.ExtHero.checkCanEquip(n) || ft.ExtHero.checkCanLvUp(n) || ft.ExtHero.checkCanStarUp(n) || ft.ExtHero.checkCanWakeUp(n) || ft.ExtHero.checkCanBiographyUnlock(n))) {
                                e = !0;
                                break
                            }
                        }
                    if (this.spriteTeamRedPoint.node.active = e, e = !1, this.buttonHeros.node.active) {
                        ft.ExtHero.load(!0);
                        for (a = 0; a < ft.ExtHero.myHeroes.length; a++) {
                            if (!ft.ExtHero.myHeroes[a].id) {
                                e = !0;
                                break
                            }
                            var s = ft.ExtHero.myHeroes[a].id,
                                o = ft.ExtHero.myHeroes[a].star,
                                r = ft.ExtItem.mapPartHeros[s],
                                c = ft.ExtItem.getNum(r),
                                h = o < ft.value.com.maxHeroStar ? ft.value.heroStarNeed[o] : 0;
                            if (h > 0 && c >= h) {
                                e = !0;
                                break
                            }
                        }
                    }
                    if (this.spriteHerosRedPoint.node.active = e, e = !1, this.buttonBag.node.active) {
                        var f = ft.ExtItem.getItemPieces();
                        for (a = 0; a < f.length; a++)
                            if (ft.ExtItem.checkRedPoint(f[a].data.id)) {
                                e = !0;
                                break
                            }
                    }
                    if (this.spriteBagRedPoint.node.active = e, this.spriteStrategyRedPoint.node.active = this.buttonStrategy.node.active && ftc.ManagerData.get1("ManagerPet").addTipsStrategy.length > 0, this.spriteEmbattleRedPoint.node.active = this.buttonEmbattle.node.active && ftc.ManagerData.get1("ManagerPet").addTipsEmbattle.length > 0, this.spriteVisitRedPoint.node.active = this.buttonVisit.node.active && ft.ExtVisit.checkCanFreeVisit(), this.spriteCopyRedPoint.node.active = 1 === ftc.ManagerData.get1("ManagerCopy").tipEveryDay, e = !1, ftc.ManagerData.get1("ManagerCopy").cur === ft.value.copy.ZY) {
                        t = ft.ExtTask.getZYTaskMain();
                        for (a = 0; a < t.length; a++)
                            if (1 === t[a].ste) {
                                e = !0;
                                break
                            } if (e) ftc.ManagerRes.findLayout("LayoutTask") || ftc.loadLayout("LayoutTask", void 0, {
                                hide: !0
                            });
                        if (!e) {
                            t = ft.ExtTask.getZYTaskBranch();
                            for (a = 0; a < t.length; a++)
                                if (1 === t[a].ste) {
                                    e = !0;
                                    break
                                }
                        }
                    } else if (this.currentMap) {
                        var d = ft.ExtMap.getType(this.currentMap.id);
                        for (var a in t = ft.ExtTask.getTasksByMapType(d))
                            if (1 === t[a].ste && (e = !0, ft.ExtTask.getType(t[a].id) === ft.type.task.main)) {
                                ftc.ManagerRes.findLayout("LayoutTask") || ftc.loadLayout("LayoutTask", void 0, {
                                    hide: !0
                                });
                                break
                            }
                    }
                    if (this.spriteTaskRedPoint.node.active = e, e = !1, this.buttonMail.node.active) {
                        var l = ftc.ManagerData.get2("Msg");
                        for (var a in l)
                            if (-1 != l[a].ext && ft.ExtMsg.getType(l[a]) == ft.type.msg.normal) {
                                var u = ft.ExtMsg.getMsgAward(l[a]);
                                if (2 != l[a].ext && u && u.ids && u.ids.length > 0) {
                                    e = !0;
                                    break
                                }
                            }
                    }
                    this.spriteMailRedPoint.node.active = e, e = !1;
                    var p = ft.ExtMsg.getMsgDatas(ft.type.msg.pos.notice),
                        g = ftc.ManagerData.get1("ManagerMsg").noticeId2;
                    for (a = 0; a < p.length; a++)
                        if (g < p[a].id) {
                            e = !0;
                            break
                        } this.spriteNoticeRedPoint.node.active = e, this.spriteActiveRedPoint.node.active = ft.ExtAchievement.hasAchievementComplete(ft.type.achievement.day) || ft.ExtAchievement.hasAchievementComplete(ft.type.achievement.achieve)
                },
                updateActivityRedPoint: function () {
                    for (var t in this._mapActivityPosBtns) this._mapActivityPosBtns[t].updateRedPoint()
                },
                updateValues: function () {
                    this.partTopStatus && this.partTopStatus.updateData();
                    var t = ftc.ManagerData.get1("Player").level;
                    this.labelLevel.string = t, this.labelSp.node.active = !1, this.progressExp.progress = ft.ExtItem.getNum(ft.value.item.exp) / ft.ExtPlayer.getNextExp(t);
                    var e = ftc.ManagerData.get2Object("Item");
                    this.buttonTeam.node.active = !(!e[ft.value.func.team] || e[ft.value.disable.team]), this.buttonHeros.node.active = !(!e[ft.value.func.heroes] || e[ft.value.disable.heroes]), this.buttonStrategy.node.active = !!e[ft.value.func.strategy], this.buttonBag.node.active = !(!e[ft.value.func.bag] || e[ft.value.disable.bag]), this.buttonEmbattle.node.active = !!e[ft.value.func.order], this.buttonVisit.node.active = !(!e[ft.value.func.visit] || e[ft.value.disable.visit]), this.buttonSmelter ? this.buttonSmelter.node.active = !(!e[ft.value.func.decompose] || e[ft.value.disable.decompose]) : (this.buttonDecompose.node.active = !(!e[ft.value.func.decompose] || e[ft.value.disable.decompose]), this.buttonCompose.node.active = this.buttonDecompose.node.active), this.buttonMap.node.active = !(!e[ft.value.func.map] || e[ft.value.disable.map]), !e[ft.value.func.map] || e[ft.value.disable.map] ? (this.buttonSuoDi.node.active = !1, this.buttonJingJie.node.active = !1) : (this.buttonSuoDi.node.active = !0, this.buttonJingJie.node.active = !0), this.buttonMail.node.active = !(!e[ft.value.func.mail] || e[ft.value.disable.mail] || ft.ExtMsg.isExclude(ft.type.msg.normal)), this.buttonActive.node.active = !(!e[ft.value.func.active] || e[ft.value.disable.active])
                },
                setAllButtonsVisible: function (t) {
                    this.nodeTop.active = t, this.nodeBottom.active = t, this.nodeLeft.active = t, this.nodeActivity.active = t, this.buttonArrowRight.node.active = t
                },
                openShowRollTitle: function () {
                    var t = ftc.ManagerData.get2("Msg");
                    if (t) {
                        var e = [];
                        for (var i in t)
                            if (t[i].type == ft.type.msg.rolltitle) {
                                var a = 1,
                                    n = ft.ExtMsg.getBase(t[i]);
                                n && (a = JSON.parse(n).count), e.push({
                                    txt: t[i].txt,
                                    count: a
                                })
                            } e.length > 0 && ftc.showRollTitle(e, this)
                    }
                },
                updateCopyInfo: function () {
                    var t = !!ftc.ManagerData.get2Object("Item")[ft.value.func.copy];
                    this.buttonCopy.node.active = t && ftd.Map.get(this.currentMap.id, "type", !0) == ft.type.map.normal, this.buttonCopyExit.node.active = !!(this.currentMap && ft.ExtMap.getType(this.currentMap.id) > ft.type.map.challenge);
                    var e = ft.ExtCopy.getCopy(ftc.ManagerData.get1("ManagerCopy").cur);
                    this.buttonImprint.node.active = !!(e && e.skills.length > 0)
                },
                updateTaskInfo: function () {
                    var t = !!ftc.ManagerData.get2Object("Item", ft.value.func.task),
                        e = !!ftc.ManagerData.get2Object("Item", ft.value.disable.task);
                    if (t && !e) {
                        var i = ft.ExtMap.getType(this.currentMap.id),
                            a = ft.ExtTask.getTasksByMapType(i);
                        this.buttonTask.node.active = a.length > 0
                    } else this.buttonTask.node.active = !1
                },
                updateTaskExInfo: function () {
                    if (this.labelTaskProgress) {
                        var t = ft.ExtTask.getProgress(ftc.ManagerData.get1("ManagerTask").cur);
                        t && !ft.ExtTask.hideTarget ? (this.labelTaskProgress.node.parent.active = !0, this.labelTaskProgress.string = t) : this.labelTaskProgress.node.parent.active = !1
                    }
                    if (!ftc.isTv() && this._mapActivityPosBtns) {
                        var e = [];
                        for (var i in this._mapActivityPosBtns) this._mapActivityPosBtns[i].node.active && e.push(this._mapActivityPosBtns[i]);
                        e.sort(function (t, e) {
                            return ft.ExtMsg.getPosIndex(t.pos) - ft.ExtMsg.getPosIndex(e.pos)
                        });
                        var a = 0;
                        for (i = 0; i < e.length; i++) a++, e[i].node.zIndex = a;
                        this._mapActivityPosBtns[ft.type.msg.pos.summer].node.zIndex > 6 && (this._mapActivityPosBtns[ft.type.msg.pos.summer].node.zIndex = 6, this._mapActivityPosBtns[ft.type.msg.pos.summer].node.setSiblingIndex(1))
                    }
                },
                showOptionBar: function () {
                    if (!this._isOptionShow && !this._isOptionRunning) {
                        this._isOptionRunning = !0, this.buttonOn.node.active = !1, this.buttonOff.node.active = !0, this.nodeBottomBar.active = !0, this.nodeRightBar.active = !0, ftc.ManagerH5.isH5() && (this.nodeActivity.active = !0, this.buttonArrowRight.node.active = !1, this.partTopStatus.node.active = !0);
                        this.nodeBottomBar.runAction(cc.fadeIn(.25)), this.nodeRightBar.runAction(cc.fadeIn(.25)), this.nodeBottomBar.runAction(cc.sequence(cc.delayTime(.25), cc.callFunc(function () {
                            this._isOptionShow = !0, this._isOptionRunning = !1
                        }.bind(this))))
                    }
                },
                hideOptionBar: function () {
                    if (this.nodeMap.active = !1, this.nodeSmelter.active = !1, this._isOptionShow && !this._isOptionRunning) {
                        this._isOptionRunning = !0, this.buttonOn.node.active = !0, this.buttonOff.node.active = !1;
                        this.nodeBottomBar.runAction(cc.fadeOut(.25)), this.nodeRightBar.runAction(cc.fadeOut(.25)), this.nodeBottomBar.runAction(cc.sequence(cc.delayTime(.25), cc.callFunc(function () {
                            this._isOptionShow = !1, this._isOptionRunning = !1, this.nodeRightBar.active = !1, this.nodeBottomBar.active = !1, ftc.ManagerH5.isH5() && (this.nodeActivity.active = !1, this.buttonArrowRight.node.active = !1, this.partTopStatus.node.active = !1)
                        }.bind(this)))), this.spriteOnRedPoint.node.active = this.spriteTeamRedPoint.node.active || this.spriteHerosRedPoint.node.active || this.spriteBagRedPoint.node.active || this.spriteStrategyRedPoint.node.active || this.spriteEmbattleRedPoint.node.active || this.spriteVisitRedPoint.node.active
                    }
                },
                loadMapOver: function () {
                    if (this.partMainControl.updateData(), this.nodeTop.active = !0, this.nodeBottom.active = !0, this.nodeLeft.active = !0, this.buttonOn.node.active = !0, !ftc.ManagerH5.isH5())
                        for (var t in this.nodeActivity.active = !0, this.partTopStatus.node.active = !0, this._mapActivityPosBtns)
                            if (this._mapActivityPosBtns[t].node.active) {
                                this.buttonArrowRight.node.active = !0;
                                break
                            } this._isloaded = !0, ft.ExtMap.getType(this.currentMap.id) === ft.type.map.sbbz ? (this.partTopStatus.setExt(9519), ftc.isTv() || (this.buttonMail.node.parent.active = !1)) : (this.partTopStatus.setExt(0), ftc.isTv() || (this.buttonMail.node.parent.active = !0)), ftc.send("mapLoadOver")
                },
                getMainRole: function () {
                    return this.mapModel._mapRole.getFirstRole()
                },
                _loadActivityBtn: function () {
                    this._mapActivityPosBtns = {};
                    var t = [ft.type.msg.pos.gift, ft.type.msg.pos.daily, ft.type.msg.pos.limited, ft.type.msg.pos.vip, ft.type.msg.pos.total, ft.type.msg.pos.nationalDay, ft.type.msg.pos.anniversary, ft.type.msg.pos.mayDay, ft.type.msg.pos.newYear, ft.type.msg.pos.summer, ft.type.msg.pos.sevenDay, ft.type.msg.pos.firstCharge, ft.type.msg.pos.guanYu];
                    if (ftc.isTv()) {
                        for (var e = 0; e < 10; e++) this._addActivityPosBtn(t[e], this.nodeTvActivity, ft.ExtMsg.getPosIndex(t[e]));
                        for (e = 10; e < 13; e++) this._addActivityPosBtn(t[e], this.nodeTvFunc, -e)
                    } else {
                        ftc.ManagerH5.isH5() ? (t.push(ft.type.msg.pos.ad), t.push(ft.type.msg.pos.invite), t.push(ft.type.msg.pos.focus), t.push(ft.type.msg.pos.rank), t.push(ft.type.msg.pos.gameAd)) : ftc.isTv() || (t.push(ft.type.msg.pos.ad), t.push(ft.type.msg.pos.invite));
                        for (e = 0; e < t.length; e++) this._addActivityPosBtn(t[e], this.nodeActivity, ft.ExtMsg.getPosIndex(t[e]))
                    }
                },
                _addActivityPosBtn: function (t, e, i) {
                    if (!this._mapActivityPosBtns[t]) {
                        var a = this.newPart("PartMainActivityPos");
                        a.setData(t), e.addChild(a.node, i), this._mapActivityPosBtns[t] = a
                    }
                },
                onKeyDirection: function (t, e) {
                    if (!this.nodeTvMenu.active) return this.partMainControl._controlRoleDir(t, e, !t), !0
                },
                onKeyBack: function (t) {
                    if (!t && this.nodeTvMenu.active) return this.onKeyMenu(!1)
                },
                onKeyMenu: function (t) {
                    if (!t && ftc.isTv()) return this.nodeTvMenu.active = !this.nodeTvMenu.active, this.partTopStatus.node.active = !this.nodeTvMenu.active, this.nodeTvMenu.active ? ftc.ManagerTV.nextFrameSelect() : ftc.ManagerTV.updateSelect(), !0
                }
            })
        