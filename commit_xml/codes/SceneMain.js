
            
             cc.Class({
                extends: cc.Component,
                properties: {
                    _layoutName: "SceneMain",
                    labelDevice: cc.Label,
                    nodeShielding: cc.Node
                },
                onLoad: function () {
                    ftc.scene = this, ftc._checkSign(), this.setCanvasAutoSize(), cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (t) {
                        t.keyCode > -1 && this.callbackDownAndUp(!0, t.keyCode)
                    }.bind(this), this.node), cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (t) {
                        t.keyCode > -1 && this.callbackDownAndUp(!1, t.keyCode)
                    }.bind(this), this.node), window.__errorHandler = function (t, e, i, a) {
                        fts && (ftc.player.dbFile.ERROR = !0), ftc.openTest && ftc.openLog ? ftc.err(i, a) : (ftc.uploadCatch(a, i), ftc.showErrorDialog()), ftc.forbidGame(), window.__errorHandler = void 0
                    }, this.isLoaded = !1, ftc.init(function () {
                        this.loading()
                    }.bind(this)), this._tickUpdateDeviceDt = 0
                },
                stopPlayer: function () {
                    this.mainLoop && (window.clearInterval(this.mainLoop), this.mainLoop = void 0)
                },
                loading: function () {
                    ftc.ManagerData.clean(), ftc._load(), fts ? (this.stopPlayer(), ftc.player && (ftc.player = null), ftc.player = new fts.ClientPlayer, ftc._loadCoreData(function () {
                        this._openFirstLayout(), ftc.player.init({
                            id: ftc.ManagerData.passport.account,
                            pwd: ftc.ManagerData.passport.pwd,
                            uid: ftc.ManagerData.passport.uid,
                            code: ftc.ManagerData.passport.token,
                            device: ftc.getDeviceId(),
                            source: ftc.getSourceId(),
                            language: ftc.ManagerLan.getLanguage(),
                            zone: ftc.getZone(),
                            tv: ftc.isTv(),
                            build: ftc.getBuildVersion()
                        }), this.mainLoop = window.setInterval(ftc.player.tick.bind(ftc.player), 0)
                    }.bind(this))) : this._openFirstLayout()
                },
                _openFirstLayout: function () {
                    ftc.ManagerRes.newLayout(ftc.firstViewName, function () {
                        ftc.callNativeFunction("deleteLaunchImage"), this.isLoaded = !0
                    }.bind(this))
                },
                callbackDownAndUp: function (t, e) {
                    if (!this.__keyCode || this.__keyCode == e)
                        if (this.__keyCode = t ? e : void 0, ftc.ManagerTV.keyDownCount++, e === cc.macro.KEY.back || e == cc.macro.KEY.escape) ftc.ManagerTV.onKeyBack(t) || t || this.keyExit();
                        else if (e === cc.macro.KEY.enter || e === cc.macro.KEY.select || e === cc.macro.KEY.dpadCenter) ftc.ManagerTV.onKeyOk(t);
                        else {
                            var i = 0;
                            e === cc.macro.KEY.up || e === cc.macro.KEY.dpadUp ? i = 1 : e === cc.macro.KEY.down || e === cc.macro.KEY.dpadDown ? i = 2 : e === cc.macro.KEY.left || e === cc.macro.KEY.dpadLeft ? i = 3 : e !== cc.macro.KEY.right && e !== cc.macro.KEY.dpadRight || (i = 4), i ? ftc.ManagerTV.onKeyDirection(t, i) : ftc.ManagerTV.onKeyMenu(t)
                        }
                },
                keyExit: function () {
                    this._exitTime && ft.getSysMilli() - this._exitTime <= 50 || ("1" != ftc.callNativeFunction("isExit") ? void 0 === this._exitTime || this._exitTime + 1e3 < ft.getSysMilli() ? (ftc.showExitTip(), this._exitTime = ft.getSysMilli()) : cc.game.end() : ftc.callNativeFunction("exit"))
                },
                update: function (t) {
                    this.isLoaded && (ftc._tickSendRecvMsg(t), fts && (ftc._checkSpeedUp(t), ftc._tickLocalStorage(t), ftc._tickSwitchLogin(t), ftsdk && ftsdk.tick(t)), ftc._tickPay(), ftc._tickShare(t), ftc._tickAd(), ftc._fmodUpdate(), ftc.tick(t), ftr && ftr.tick(t), this.updateDeviceTag(t))
                },
                setCanvasAutoSize: function () {
                    var t = this.getComponent(cc.Canvas);
                    ftc.setCanvasAutoSize ? ftc.setCanvasAutoSize(t) : cc.winSize.width / cc.winSize.height < 1.775 ? (ftc.isIPad = !0, t.fitHeight = !0, t.fitWidth = !0) : (t.fitHeight = !0, t.fitWidth = !1)
                },
                updateDeviceTag: function (t) {
                    if (this._tickUpdateDeviceDt += t, this._tickUpdateDeviceDt >= 1) {
                        this._tickUpdateDeviceDt = 0;
                        var e = ftc.openTest,
                            i = "";
                        fts || (i = (i = ftc.ManagerH5.getVersion()) ? "." + i : ""), e = e ? "-test" : "", ftc.localDay && (e = "-" + ftc.localDay % 10 + e), this.labelDevice.node.zIndex = 257, this.labelDevice.node.active = !0;
                        var a = ftc.ManagerData.sid.substr(0, 16) + "-" + ft.getVersion() + "." + ft.getHotupdateVersion() + i + "-" + ftc.getSourceId() + e;
                        this.labelDevice.string != a && (this.labelDevice.string = a)
                    }
                },
                setShieldingOpacity: function (t) {
                    this.nodeShielding.getChildByName("SpriteBg").opacity = t
                }
            })
        