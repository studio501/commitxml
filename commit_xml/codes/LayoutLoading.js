
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    nodeProgress: cc.Node,
                    labelProgress: cc.Label,
                    progressBar: cc.ProgressBar,
                    spriteLoading: cc.Sprite,
                    nodeButtons: cc.Node,
                    buttonNotice: cc.Button,
                    buttonPortalAd: cc.Button,
                    buttonKefu: cc.Button,
                    nodeRoot: cc.Node,
                    buttonStart: cc.Button,
                    partUserEnter: t("PartSysUserEnter")
                },
                init: function () {
                    ftc.isTvSource() && this.setTvFunc(), this.addClick(this.buttonNotice), this.buttonPortalAd && this.addClick(this.buttonPortalAd), this.buttonKefu && this.addClick(this.buttonKefu), this.buttonStart && this.addClick(this.buttonStart), ftc.ManagerTV.setNotShowOnEnter(this.node)
                },
                load: function () {
                    this._resLoadOver = !1, this._loginSte = 0, this.progressBar.progress = 0, this.labelProgress.string = "", this.tickAdd = 0, this.resLoadTime1 = 0, this.resLoadTime2 = 0, this._clickOk = !1, this._tickMapLoad = 0, this._loadMapCallback = void 0, this.buttonStart.node.active = !1, this.buttonKefu.node.active = !1, this._isloadingData = !1, this._isLoadingMap = !1, !fts && this.setH5(), this.nodeButtons.active = !1, this.nodeProgress.active = !0, this.buttonNotice.node.active = !1, this.initPart(this.partUserEnter), this.loadAni()
                },
                enter: function () {
                    this.updateData(), ftc.ManagerRes.startLoadGame(), fts && ftc.sendClient("c_enter")
                },
                loadAni: function () {
                    this.spriteYun || (this.limitAniSize = 1, this.spriteYun = ftc.ManagerRes.getNode("LoadingSpriteYun", cc.Sprite), this.nodeRoot.addChild(this.spriteYun.node, 128), this.spriteYun.node.x = -454, this.spriteYun.node.y = 222, this.loadResource("img/loading_yun", cc.SpriteFrame, function (t) {
                        this.spriteYun.spriteFrame = t, this.limitAniSize--
                    }.bind(this), this), this.spineMoveRoles = [], this.spineWaitRoles = [], this.spineMoveRoles[0] = this.newRole(2010, "wait4", [
                        [44, 129],
                        [-20, 129]
                    ]), this.spineMoveRoles[1] = this.newRole(2010, "wait3", [
                        [313, 129],
                        [377, 129]
                    ]), this.spineWaitRoles[0] = this.newRole(2010, "wait2", [
                        [220, 73]
                    ], -1), this.spineWaitRoles[1] = this.newRole(2010, "wait2", [
                        [131, 73]
                    ]), this.spineWaitRoles[2] = this.newRole(1004, "wait2", [
                        [180, -21]
                    ]), this.spineWaitRoles[3] = this.newRole(1002, "wait1", [
                        [184, -235]
                    ])), ftc.isIPad && (this.spriteExtBgTop || (this.spriteExtBgTop = ftc.ManagerRes.getNode("SpriteExtBgTop", cc.Sprite), this.spriteExtBgTop.sizeMode = cc.Sprite.SizeMode.CUSTOM, this.spriteExtBgTop.node.width = cc.winSize.width, this.spriteExtBgTop.node.height = 204, this.spriteExtBgTop.type = cc.Sprite.Type.TILED, this.spriteExtBgTop.node.anchorY = 1, this.spriteExtBgTop.node.position = cc.v2(0, -320), ftc.scene.node.addChild(this.spriteExtBgTop.node), this.spriteExtBgBottom = ftc.ManagerRes.getNode("SpriteExtBgBottom", cc.Sprite), this.spriteExtBgBottom.sizeMode = cc.Sprite.SizeMode.CUSTOM, this.spriteExtBgBottom.node.width = cc.winSize.width, this.spriteExtBgBottom.node.height = 204, this.spriteExtBgBottom.type = cc.Sprite.Type.TILED, this.spriteExtBgBottom.node.anchorY = 1, this.spriteExtBgBottom.node.scaleY = -1, this.spriteExtBgBottom.node.position = cc.v2(0, 320), ftc.scene.node.addChild(this.spriteExtBgBottom.node), this.loadResource("img/loading_bg", cc.SpriteFrame, function (t) {
                        this.spriteExtBgTop.spriteFrame = t, this.spriteExtBgBottom.spriteFrame = t
                    }.bind(this), this)))
                },
                playAni: function () {
                    if (!this.limitAniSize) {
                        for (var t in this.spriteYun.node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(10, 100, 0), cc.moveBy(10, -100, 0)))), this.spineWaitRoles) this.spineWaitRoles[t].setAnimation(0, this.spineWaitRoles[t].__aniName, !0);
                        this._startPlayAni = !0
                    }
                },
                newRole: function (t, e, i, a) {
                    this.limitAniSize++;
                    var n = ftc.ManagerRes.getNode("LoadingRole", sp.Skeleton);
                    return this.nodeRoot.addChild(n.node, -1), n.node.x = i[0][0], n.node.y = i[0][1], n.node.scaleX = .8, n.node.scaleY = .8, n._ftarox = i[0][0], n.__aniName = e, n._ftaroDelay = 0, n._ftaroPoints = i, a && (n.node.scaleX *= a), this.loadResource("spine/npc/map_role_" + t, sp.SkeletonData, function (t) {
                        n.skeletonData = t, n.setAnimation(0, e, !1), this.limitAniSize--
                    }.bind(this), this), n
                },
                walkRole: function (t, e) {
                    e[0] != t._ftarox ? (t._ftaroDelay = 1, t._ftarox < e[0] ? t.setAnimation(0, "dir4", !0) : t.setAnimation(0, "dir3", !0), t._ftarox = e[0], t.node.runAction(cc.moveTo(1, e[0], e[1]))) : this.waitRole(t, t._ftarodir)
                },
                waitRole: function (t, e) {
                    t._ftaroDelay = 1, e || (e = ft.rand(4) + 1), t._ftarodir = e;
                    var i = "wait" + e;
                    t.setAnimation(0, i, !0)
                },
                tickRole: function (t) {
                    if (!this._startPlayAni && this.playAni(), this._startPlayAni)
                        for (var e = 0; e < this.spineMoveRoles.length; e++) {
                            var i = this.spineMoveRoles[e];
                            i._ftaroDelay -= t, i._ftaroDelay <= 0 && (0 == ft.rand(3) ? this.waitRole(i) : this.walkRole(i, i._ftaroPoints[ft.rand(2)]))
                        }
                },
                updateData: function () {
                    this.partUserEnter.updateData(), ftc.isTv() && (this.partUserEnter.nodeSecond.active ? ftc.ManagerTV.nextFrameSelect(this.partUserEnter.buttonStart) : ftc.ManagerTV.nextFrameSelect(this.partUserEnter.buttonAccount))
                },
                tick: function (t) {
                    if (!fts && (this._isloadingData || this._isLoadingMap) && this.progressBar.progress < .99 && (this.tickAdd += t, this.tickAdd >= .06)) {
                        var e = Math.floor(this.tickAdd / .06),
                            i = this.progressBar.progress + .01 * e;
                        i > .99 && (i = .99), this.progressBar.progress = i, this._isloadingData ? this.labelProgress.string = ftc.language("\u52a0\u8f7d\u6570\u636e\u4e2d... ") + Math.floor(100 * this.progressBar.progress) + "%" : this.labelProgress.string = ftc.language("\u52a0\u8f7d\u573a\u666f\u4e2d... ") + Math.floor(100 * this.progressBar.progress) + "%", this.tickAdd -= .06 * e, this.progressBar.progress >= .99 && this._clickOk && this.runLoadingAction()
                    }
                    this._resLoadOver && this.tickRole(t), this._tickMapLoad > 0 && (this._tickMapLoad -= t, this._tickMapLoad <= 0 && (this._loadMapCallback && this._loadMapCallback(), ftc.ManagerH5.clearStorage()))
                },
                cleanup: function () {
                    ftc.callNativeFunction("hideBanner")
                },
                msg: function () {
                    this.msg = {
                        c_loadResProgress: function (t, e) {
                            if (-1 == t.cur) this._resLoadOver = !0, fts ? (this.runLoadingAction(), this.entryMain()) : (this.resLoadTime2 = ft.getSysMilli(), ftc.ManagerH5.countEvent(1, "LayoutLoading", {
                                time1: this.resLoadTime2 - this.resLoadTime1
                            }), 0 === this._loginSte ? (this.progressBar.progress = 0, this.labelProgress.string = "\u6b63\u5728\u52a0\u8f7d\u6570\u636e... 0%", this._isloadingData = !0) : this.entryMain());
                            else if (fts) this.progressBar.progress = t.cur / t.max, this.labelProgress.string = ftc.language("\u6b63\u5728\u52a0\u8f7d\u8d44\u6e90...") + Math.floor(100 * this.progressBar.progress) + "%";
                            else {
                                var i, a;
                                if (this.resLoadTime1 || (this.resLoadTime1 = ft.getSysMilli()), t.cur < t.max) {
                                    var n = t.max / 5;
                                    i = Math.floor(t.cur / n), a = t.cur % n / n
                                } else i = 4, a = 1;
                                this.labelProgress.string = ftc.language(["\u6b63\u5728\u52a0\u8f7d\u91ce\u5916...", "\u6b63\u5728\u52a0\u8f7d\u57ce\u5e02...", "\u6b63\u5728\u52a0\u8f7d\u4eba\u7269...", "\u6b63\u5728\u52a0\u8f7d\u4efb\u52a1...", "\u6b63\u5728\u52a0\u8f7d\u9053\u5177..."][i]) + Math.floor(100 * a) + "%", this.progressBar.progress = a
                            }
                        },
                        c_enter: function (t, e) {
                            e ? (ftc.showDialog({
                                text: e,
                                clickOk: function () {
                                    ftc.sysEnd()
                                }
                            }), ftc.cancelWait(!0)) : (ftc.send("getPlayer", {
                                appId: ft.getAppId(),
                                ver: ft.getVersion()
                            }), this._clickOk = !0)
                        },
                        getPlayer: function (t, e) {
                            try {
                                ftsdk && ftsdk.setChatHeaderSprite(ftc.ManagerH5.isH5() ? ft.ExtHero.getIconSprite(ftc.ManagerData.get1("ManagerHero").commander0) : null)
                            } catch (t) { }
                            if (t.init) {
                                ftc.ManagerH5.roleLogin(), this._resLoadOver && t.type == ft.type.http.Touch && this.showNotice(), this._loginSte = 1, this._isloadingData = !1, this.entryMain();
                                var i = ftc.ManagerData.get1("Player");
                                ftc.callNativeFunction("uploadRole", ftc.ManagerData.passport.account + "," + i.nick + "," + i.level), ftc.cancelWait()
                            } else t.txt && ftc.showDialog({
                                text: t.txt,
                                clickOk: function () { }
                            }), ftc.cancelWait()
                        }
                    }
                },
                setTvFunc: function () {
                    if (this.node && ftc.ManagerRes.topLayout() == this) {
                        var t = ftc.ManagerRes.getNode("TvClick", sp.Skeleton);
                        ftc.ManagerTV.loadSelectNode(t.node), cc.loader.loadRes("spine/view/tv_click", sp.SkeletonData, function (e, i) {
                            t.skeletonData = i, t.setAnimation(0, "wait1", !0)
                        }.bind(this)), this.addClick(this.buttonNotice)
                    }
                },
                setH5: function () {
                    var t = ftc.ManagerH5.isH5();
                    cc.sys.platform === cc.sys.WECHAT_GAME ? -1 != wxDownloader.REMOTE_SERVER_ROOT.indexOf("/wx") ? ftc.ManagerH5.setH5(ftc.WeChatGame) : -1 != wxDownloader.REMOTE_SERVER_ROOT.indexOf("/qq") ? ftc.ManagerH5.setH5(ftc.QQGame) : -1 != wxDownloader.REMOTE_SERVER_ROOT.indexOf("/tt") && (ftc.ManagerH5.setH5(ftc.JrttGame, void 0, !0), this.buttonStart.node.active = !0) : cc.sys.platform === cc.sys.XIAOMI_GAME ? ftc.ManagerH5.setH5(ftc.MiGame) : 604 == ftc.getSourceId() ? ftc.ManagerH5.setH5(ftc.MiH5) : 614 == ftc.getSourceId() || 814 == ftc.getSourceId() ? ftc.ManagerH5.setH5(ftc.H54399) : 615 == ftc.getSourceId() ? ftc.ManagerH5.setH5(ftc.MzGame) : cc.sys.platform === cc.sys.OPPO_GAME ? ftc.ManagerH5.setH5(ftc.OppoGame) : cc.sys.platform === cc.sys.VIVO_GAME ? ftc.ManagerH5.setH5(ftc.VivoGame) : cc.sys.platform === cc.sys.HUAWEI_GAME ? ftc.ManagerH5.setH5(ftc.HwGame) : cc.sys.platform === cc.sys.BAIDU_GAME ? ftc.ManagerH5.setH5(ftc.BdGame) : cc.sys.platform === cc.sys.JKW_GAME ? ftc.ManagerH5.setH5(ftc.JkwGame) : ftc.ManagerH5.setH5(ftc.H5), ftc.ManagerH5.isH5() && (this.buttonKefu.node.active = ftc.ManagerH5.isOpenCustomerService()), this.buttonPortalAd && (this.buttonPortalAd.node.active = ftc.ManagerH5.isH5() && "1" == ftc.ManagerH5.isOpenGamePortalAd()), t || (ftc.ManagerH5.showMenuShare(), ftc.ManagerH5.setPay(function () {
                        ftc.setPayEnd(1)
                    }, function () {
                        ftc.setPayEnd(-1)
                    }), ftc.ManagerH5.setShare(function () {
                        ftc.setShareEnd(0)
                    }, function () {
                        ftc.setShareEnd(1)
                    }), ftc.ManagerH5.initFull(function () {
                        ftc.setAdEnd(1)
                    }, function (t) {
                        0 === t.errorCode ? ftc.haveFullAd = !0 : 1 === t.errorCode && (ftc.haveFullAd = !1)
                    }))
                },
                showNotice: function () {
                    var t = !1,
                        e = ftc.ManagerData.get2("Msg");
                    for (var i in e)
                        if (ft.ExtMsg.getType(e[i]) == ft.type.msg.notice && (t = !0, e[i].id > ftc.ManagerData.get1("ManagerMsg").noticeId)) {
                            ftc.loadLayout("LayoutNotice");
                            break
                        } this.buttonNotice.node.active = t
                },
                runLoadingAction: function () {
                    this.spriteLoading.node.active = !0, cc.tween(this.spriteLoading.node).repeatForever(cc.tween().by(2, {
                        angle: -360
                    })).start()
                },
                stopLoadingAction: function () {
                    this.spriteLoading.node.active = !1, cc.tween(this.spriteLoading.node).stop()
                },
                loadMapFile: function (t) {
                    this._loadMapCallback = t;
                    try {
                        var e = ftc.ManagerData.get1("ManagerMap").cur;
                        e || (e = 3606);
                        var i = "map/" + ftd.Map.get(e, "mapfile");
                        cc.loader.loadRes(i, function (e, i) {
                            t()
                        }.bind(this)), this._tickMapLoad = 15
                    } catch (e) {
                        t()
                    }
                },
                entryMain: function () {
                    if (this._resLoadOver && 0 != this._loginSte) {
                        var t = ftc.ManagerData.get1("Player"),
                            e = t.nick;
                        e || (e = ftc.ManagerData.passport.account ? "\u73a9\u5bb6" : "\u6e38\u5ba2"), this.partUserEnter.setData(e + " \u7b49\u7ea7:" + t.level, this.clickEnter.bind(this), !0), ftc.isTv() && (this.partUserEnter.nodeSecond.active ? ftc.ManagerTV.nextFrameSelect(this.partUserEnter.buttonStart) : ftc.ManagerTV.nextFrameSelect(this.partUserEnter.buttonAccount)), this.stopLoadingAction(), this.nodeProgress.active = !1, this.nodeButtons.active = !0
                    }
                },
                clickEnter: function () {
                    ftc.loadLayout("LayoutMain", function () {
                        this.cancel(!0, !0)
                    }.bind(this), {
                        noScale: !1,
                        resName: ftc.isTv() ? "LayoutMainTv" : "LayoutMain"
                    })
                },
                onClick: function (t) {
                    this.spriteLoading.node.active || (t.target === this.buttonNotice.node ? ftc.loadLayout("LayoutNotice") : t.target === this.buttonPortalAd.node ? ftc.ManagerH5.showPortalAd() : t.target === this.buttonKefu.node ? ftc.showChat() : t.target === this.buttonStart.node && (ftc.ManagerH5.login(), this.buttonStart.node.active = !1))
                }
            })
        