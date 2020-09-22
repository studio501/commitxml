

window.ftc = window.ftc || {}, ftc.WeChatGame = {}, ftc.WeChatGame.hasRightTopMenu = !0, ftc.WeChatGame.bannerAd0 = null, ftc.WeChatGame.rewardedVideoAd1 = null, ftc.WeChatGame.from = null, ftc.WeChatGame.exportJson = {}, ftc.WeChatGame.otherOpenId = null, ftc.WeChatGame.sceneValue = null, ftc.WeChatGame.iconAd = null, ftc.WeChatGame.portalAd = null;
var number_arr = null;
ftc.WeChatGame.bannerId = "adunit-5a1d41591de49a20", ftc.WeChatGame.videoAdId = ["adunit-3e02e324bcc45c7d", "adunit-0a124c48e6001b29", "adunit-f90dc813ee8680d7"], ftc.WeChatGame.title = ["三分天下？分田、分地、分妹子……", "缺妹子吗？会卖萌，还能打。。。", "据说只有2%的男人才能挟天子以令诸侯。"], ftc.WeChatGame.init = function (t) {
    window.mainH5ServerIp = "server.ftaro.com", window.mainH5ServerPort = 34001, window.mainH5SourceId = 601, t()
}, ftc.WeChatGame.wxLogin = function () {
    ftc.log("ftc.WeChatGame.wxLogin"), wx.login({
        success: function (t) {
            if (ftc.log("ftc.WeChatGame.res"), t.code) {
                ftc.log("ftc.WeChatGame.res.code" + t.code);
                var e = !1;
                ftc.pomeloLogin("", "", t.code, function () {
                    ftc.log("ftc.WeChatGame.pomeloLogin.res.code" + t.code), e = !0, ftc.WeChatGame.getServerOpenId(), ftc.WeChatGame.checkForUpdateVersion()
                }.bind(this)), window.setTimeout(function () {
                    e || ftc.WeChatGame.countEvent("wxLogin", t.code)
                }, 5e3)
            }
        }
    })
}, ftc.WeChatGame.login = function () {
    wx.onShow(function (t) {
        ftc.WeChatGame.sceneValue = t.scene
    }), ftc.WeChatGame.wxLogin(), ftc.WeChatGame.createGamePortal()
}, ftc.WeChatGame.openCustomer = function (t) {
    wx.openCustomerServiceConversation({})
}, ftc.WeChatGame.enterFromMiniProgram = function () {
    var t = wx.getLaunchOptionsSync();
    return 1089 == ftc.WeChatGame.sceneValue || 1089 == t.scene || 1001 == ftc.WeChatGame.sceneValue || 1001 == t.scene
}, ftc.WeChatGame.enterFromDesktop = function () {
    var t = wx.getLaunchOptionsSync();
    return 1023 == ftc.WeChatGame.sceneValue || 1023 == t.scene
}, ftc.WeChatGame.enterFromPublic = function () {
    var t = wx.getLaunchOptionsSync();
    return 1035 == ftc.WeChatGame.sceneValue || 1035 == t.scene
}, ftc.WeChatGame.authorize = function () {
    var t = window.wx.getSystemInfoSync(),
        e = t.screenWidth,
        i = t.screenHeight;
    wx.getSetting({
        success: function (t) {
            if (t.authSetting["scope.userInfo"]) wx.getUserInfo({
                success: function (t) {
                    ftc.WeChatGame.exportJson.userInfo = t.userInfo, ftc.WeChatGame.exportJson.encryptedData = t.encryptedData, ftc.WeChatGame.exportJson.iv = t.iv, ftc.WeChatGame.getUserInfo({
                        encryptedData: ftc.WeChatGame.exportJson.encryptedData,
                        iv: ftc.WeChatGame.exportJson.iv,
                        source: ftc.getSourceId()
                    })
                }
            });
            else {
                var a = wx.createUserInfoButton({
                    type: "text",
                    text: "",
                    style: {
                        left: 10,
                        top: 76,
                        width: e,
                        height: i,
                        backgroundColor: "#00000000",
                        color: "#ffffff",
                        fontSize: 20,
                        textAlign: "center",
                        lineHeight: i
                    }
                });
                a.onTap(function (t) {
                    t.userInfo && (ftc.WeChatGame.exportJson.userInfo = t.userInfo, ftc.WeChatGame.exportJson.encryptedData = t.encryptedData, ftc.WeChatGame.exportJson.iv = t.iv, ftc.WeChatGame.getUserInfo({
                        encryptedData: ftc.WeChatGame.exportJson.encryptedData,
                        iv: ftc.WeChatGame.exportJson.iv,
                        source: ftc.getSourceId()
                    }), a.destroy())
                })
            }
        }
    })
}, ftc.WeChatGame.compareVersion = function (t, e) {
    t = t.split("."), e = e.split(".");
    for (var i = Math.max(t.length, e.length); t.length < i;) t.push("0");
    for (; e.length < i;) e.push("0");
    for (var a = 0; a < i; a++) {
        var n = parseInt(t[a]),
            s = parseInt(e[a]);
        if (n > s) return 1;
        if (n < s) return -1
    }
    return 0
}, ftc.WeChatGame.createGamePortal = function () {
    var t = wx.getSystemInfoSync().SDKVersion;
    ftc.WeChatGame.compareVersion(t, "2.7.5") > 0 && null == ftc.WeChatGame.portalAd && (ftc.WeChatGame.portalAd = wx.createGamePortal({
        adUnitId: "PBgAASKh6RXXFwgo"
    }), ftc.WeChatGame.portalAd.onLoad(function () {
        console.log("portalAd onLoad")
    }), ftc.WeChatGame.portalAd.onError(function () {
        console.log("portalAd onError")
    }))
}, ftc.WeChatGame.showPortalAd = function () {
    ftc.WeChatGame.portalAd && ftc.WeChatGame.portalAd.load().then(function () {
        ftc.WeChatGame.portalAd.show()
    }).catch(function (t) {
        console.error(t)
    })
}, ftc.WeChatGame.hidePortalAd = function () {
    ftc.WeChatGame.portalAd && ftc.WeChatGame.portalAd.hide()
}, ftc.WeChatGame.createGameClub = function () {
    wx.getSystemInfoSync();
    null == this.clubButton && (this.clubButton = wx.createGameClubButton({
        icon: "green",
        style: {
            left: 60,
            top: 76,
            width: 40,
            height: 40
        }
    })), ftc.WeChatGame.isShowGameClub(!0)
}, ftc.WeChatGame.isShowGameClub = function (t) {
    t ? this.clubButton.show() : this.clubButton.hide()
}, ftc.WeChatGame.setUserReferrer = function (t) {
    pomelo.request("game.gamehandler.setWxUserReferrer", t, function (t) {
        t.result
    }.bind(this))
}, ftc.WeChatGame.getUserInfo = function (t) {
    pomelo.request("game.gamehandler.setWxUserInfo", t, function (t) {
        t.result
    }.bind(this))
}, ftc.WeChatGame.getServerOpenId = function () {
    if (number_arr = ftc.serverOpenid, ftc.log("weChatGame_openid" + ftc.serverOpenid), number_arr) {
        var t = wx.getLaunchOptionsSync();
        if ("{}" != JSON.stringify(t.query) && (t.query.openId || t.query.TDChannelId || t.query.sidId) && (t.query.openId ? ftc.WeChatGame.otherOpenId = t.query.openId : ftc.WeChatGame.otherOpenId = "", t.query.sidId && (ftc.WeChatGame.otherOpenId = t.query.sidId), t.query.TDChannelId ? ftc.WeChatGame.from = t.query.TDChannelId : ftc.WeChatGame.from = "", t.query.shareId || t.query.sharetype)) {
            var e = t.query.shareId,
                i = t.query.sharetype;
            ftc.WeChatGame.countEvent("share" + e + "_" + i, ftc.WeChatGame.title[e])
        }
    }
}, ftc.WeChatGame.getPayInfo = function (t) {
    t()
}, ftc.WeChatGame.paySuccessCallback = function (t) {
    pomelo.request("game.gamehandler.getPayCallback", t, function (t) {
        t.result
    }.bind(this))
}, ftc.WeChatGame.getOrderIds = function () {
    return ["2", "3", "6", "1"]
}, ftc.WeChatGame.startPay = function (t, e, i) {
    var a = wx.getSystemInfoSync();
    wx.requestMidasPayment({
        mode: t.mode,
        env: 0,
        offerId: t.offerId,
        currencyType: t.currencyType,
        platform: a.platform,
        buyQuantity: t.buyQuantity,
        zoneId: "1",
        success: function () {
            e(), ftc.WeChatGame.paySuccessCallback({
                source: ftc.getSourceId(),
                zoneId: "1",
                pf: a.platform,
                userIp: "",
                orderId: ftc.ManagerH5.getStartPayInfo().orderId
            })
        },
        fail: function (t, e) {
            i()
        }
    })
}, ftc.WeChatGame.initFull = function (t, e) {
    try {
        ftc.WeChatGame.adType = 0, ftc.WeChatGame.rewardedVideoAd1 = wx.createRewardedVideoAd({
            adUnitId: ftc.WeChatGame.videoAdId[0]
        }), ftc.WeChatGame.rewardedVideoAd1.onLoad(function () {
            e({
                errorCode: 0
            })
        }), ftc.WeChatGame.rewardedVideoAd1.onClose(function (i) {
            i && i.isEnded || void 0 === i ? t() : e({
                errorCode: 2
            }), ftc.WeChatGame.rewardedVideoAd1 = wx.createRewardedVideoAd({
                adUnitId: ftc.WeChatGame.videoAdId[ftc.WeChatGame.adType]
            })
        }), ftc.WeChatGame.rewardedVideoAd1.onError(function (t) {
            e({
                errorCode: 1
            })
        })
    } catch (t) {
        ft.console("ftc.WeChatGame.createVideo", t)
    }
}, ftc.WeChatGame.showFull = function (t) {
    try {
        if (ftc.WeChatGame.adType = t, ftc.WeChatGame.rewardedVideoAd1) return ftc.WeChatGame.rewardedVideoAd1.show().catch(function (t) {
            ftc.WeChatGame.rewardedVideoAd1.load().then(function () {
                ftc.WeChatGame.rewardedVideoAd1.show()
            })
        }), "1"
    } catch (t) {
        ft.console("ftc.WeChatGame.showVideoGold", t)
    }
    return "0"
}, ftc.WeChatGame.startShare = function (t, e, i, n, s) {
    var o = ft.rand(3);
    null == e && null == i && (e = ftc.WeChatGame.title[o], i = "https://cdn.ftaro.com/kingwar4_h5/4016/share/share" + (0 == o ? "" : o) + ".png"), GameGlobal && GameGlobal.tdAppSdk && GameGlobal.tdAppSdk.share({
        title: e,
        path: ftc.WeChatGame.title[o]
    }), n(), wx.shareAppMessage({
        title: e,
        imageUrl: i,
        query: "openId=" + number_arr + "&shareId=" + o + "&sharetype=" + t
    })
}, ftc.WeChatGame.showMenuShare = function () {
    var t = wx.getSystemInfoSync().SDKVersion;
    wx.showShareMenu({
        withShareTicket: !0,
        menus: ["shareAppMessage", "shareTimeline"],
        success: function (e) {
            var i = ft.rand(3);
            wx.onShareAppMessage(function () {
                return GameGlobal && GameGlobal.tdAppSdk && GameGlobal.tdAppSdk.share({
                    title: ftc.WeChatGame.title[i],
                    path: ftc.WeChatGame.title[i]
                }), {
                    title: ftc.WeChatGame.title[i],
                    imageUrl: "https://cdn.ftaro.com/kingwar4_h5/4016/share/share" + (0 == i ? "" : i) + ".png",
                    query: "openId=" + number_arr + "&shareId=" + i + "&sharetype=0"
                }
            });
            ftc.WeChatGame.compareVersion(t, "2.11.3") > 0 && wx.onShareTimeline(function () {
                return {
                    title: ftc.WeChatGame.title[i],
                    imageUrl: "https://cdn.ftaro.com/kingwar4_h5/4016/share/share" + (0 == i ? "" : i) + ".png",
                    query: "openId=" + number_arr + "&shareId=" + i + "&sharetype=0"
                }
            })
        },
        fail: function () { },
        complete: function () { }
    })
}, ftc.WeChatGame.setUserStorage = function () {
    var t = {
        kv_list: [{
            key: "score",
            value: "" + ft.ExtHero.getTeamFight(0)
        }],
        source: ftc.getSourceId()
    };
    pomelo.request("game.gamehandler.setUserStorage", t, function (t) {
        t.result
    }.bind(this))
}, ftc.WeChatGame.getFriendRank = function () {
    cc.sys.platform === cc.sys.WECHAT_GAME && CC_WECHATGAME && (window.wx.postMessage({
        messageType: 3,
        MAIN_MENU_NUM: "ftc",
        score: ft.ExtHero.getTeamFight(0),
        level: ftc.ManagerData.get1("Player").level,
        samsara: ftc.ManagerData.get1("Player").samsara
    }), window.wx.postMessage({
        messageType: 1,
        MAIN_MENU_NUM: "ftc"
    }))
}, ftc.WeChatGame.groupFriendRank = function () {
    cc.sys.platform === cc.sys.WECHAT_GAME && CC_WECHATGAME && window.wx.shareAppMessage({
        success: function (t) {
            void 0 != t.shareTickets && t.shareTickets.length > 0 && window.wx.postMessage({
                messageType: 5,
                MAIN_MENU_NUM: "ftc",
                shareTicket: t.shareTickets[0]
            })
        }
    })
}, ftc.WeChatGame.gc = function () {
    return wx.triggerGC(), !0
}, ftc.WeChatGame.restart = function () {
    return wx.exitMiniProgram({
        success: function () { },
        fail: function () { },
        complete: function () { }
    }), !0
}, ftc.WeChatGame.end = function () {
    return wx.exitMiniProgram({
        success: function () { },
        fail: function () { },
        complete: function () { }
    }), !0
}, ftc.WeChatGame.openShare = function () {
    return "1"
}, ftc.WeChatGame.isOpenGamePortalAd = function () {
    return "1"
}, ftc.WeChatGame.openFullAd = function () {
    return "1"
}, ftc.WeChatGame.openAd = function () {
    return "0"
}, ftc.WeChatGame.openRank = function () {
    return "1"
}, ftc.WeChatGame.isShowRecharge = function () {
    return !!ftc.isAndroid()
}, ftc.WeChatGame.getVersion = function () {
    return "1"
}, ftc.WeChatGame.openPay = function () {
    return cc.sys.os == cc.sys.OS_IOS ? "0" : "1"
}, ftc.WeChatGame.isOpenInvite = function () {
    return "1"
}, ftc.WeChatGame.isOpenMiniProgram = function () {
    return "1"
}, ftc.WeChatGame.isOpenPublic = function () {
    return "1"
}, ftc.WeChatGame.isOpenDesktop = function () {
    return cc.sys.os == cc.sys.OS_IOS ? "0" : "1"
}, ftc.WeChatGame.countEvent = function (t, e, i) {
    GameGlobal && GameGlobal.tdAppSdk && GameGlobal.tdAppSdk.event({
        id: t,
        label: e,
        params: i
    })
}, ftc.WeChatGame.getOtherOpenId = function () {
    return ftc.WeChatGame.otherOpenId
}, ftc.WeChatGame.getFrom = function () {
    return ftc.WeChatGame.from
}, ftc.WeChatGame.downloadFile = function (t, e) {
    var i = wx.env.USER_DATA_PATH,
        a = t.slice(t.lastIndexOf("/")),
        n = i + a,
        s = wx.getFileSystemManager();
    s.access({
        path: n,
        success: function () {
            cc.loader.load(n, function (t, i) {
                if (!t) {
                    var a = new cc.SpriteFrame(i);
                    if (a) return void e(a)
                }
                e(null)
            })
        },
        fail: function () {
            wx.downloadFile({
                url: t,
                success: function (t) {
                    200 === t.statusCode ? s.saveFile({
                        tempFilePath: t.tempFilePath,
                        filePath: i + a,
                        success: function (t) {
                            cc.loader.load(t.savedFilePath, function (t, i) {
                                if (!t) {
                                    var a = new cc.SpriteFrame(i);
                                    if (a) return void e(a)
                                }
                                e(null)
                            })
                        },
                        fail: function () {
                            e(null)
                        }
                    }) : e(null)
                },
                fail: function () {
                    e(null)
                }
            })
        }
    })
}, ftc.WeChatGame.setClipboardData = function (t) {
    return wx.setClipboardData({
        data: t
    }), !0
}, ftc.WeChatGame.checkForUpdateVersion = function () {
    try {
        var t = wx.getUpdateManager();
        t.onCheckForUpdate(function (t) { }), t.onUpdateReady(function () {
            t.applyUpdate(), pomelo.request("game.gamehandler.setPlayerOld", function (t) {
                t.result
            }.bind(this))
        }), t.onUpdateFailed(function () { })
    } catch (t) {
        ft.console("ftc.WeChatGame.checkForUpdateVersion", t)
    }
}, ftc.WeChatGame.textCheck = function (t, e) {
    pomelo.request("game.gamehandler.msgSecCheck", {
        source: ftc.getSourceId(),
        content: t
    }, function (t) {
        e(t.result, t.txt)
    }.bind(this))
}, ftc.WeChatGame.clearStorage = function () {
    try {
        wx.clearStorageSync()
    } catch (t) { }
}, ftc.WeChatGame.checkIsUserAdvisedToRest = function (t) {
    wx.checkIsUserAdvisedToRest({
        todayPlayedTime: t,
        success: function (t) {
            t.result
        },
        fail: function (t) { },
        complete: function (t) { }
    })
}
