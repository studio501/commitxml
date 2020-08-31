

window.ftc = window.ftc || {}, ftc.firstViewName = "LayoutLoading", ftc.ActiveNative = !0, ftc.RestoreNodeTime = 18e4, ftc.PartItem = t("PartItem"), ftc.guideCache = [], ftc.mapDialogNoTip = {}, ftc.partWait = null, ftc.resURL = "https://cdn.ftaro.com/activity/0/", ftc.PartHeroWidth = 128, ftc.PartHeroHeight = 116, ftc.isOpenPayView = !1, ftc._nodeAchievementTipBuffers = [], ftc.StandardSpeed = 0, ftc.startShareKingWar = function (t) {
    ftc.ManagerH5.isH5() ? ftc.ManagerH5.startShare(t) : ftc.startShare(ftc.language("\u5c0f\u9738\u738b\u300a\u541e\u98df\u5929\u5730\u300b\u590d\u523b\u7248\uff0c\u624b\u673a\u4e0a\u4e5f\u80fd\u73a9\u4e86"), ftc.language("\u8fd8\u8bb0\u5f97fc\u7ecf\u5178\u6e38\u620f\u300a\u541e\u98df\u5929\u5730\u300b\u5427\uff1f\u51fa\u624b\u673a\u91cd\u5236\u7248\u4e86\u5466\uff0c\u5267\u60c5\u3001\u73a9\u6cd5\u9ad8\u5ea6\u8fd8\u539f\uff0c\u8ba9\u4f60\u91cd\u65b0\u62fe\u8d77\u7ae5\u5e74\u7684\u8bb0\u5fc6\u3002")), ftc.ManagerRes.findLayout("LayoutActivity") && (ftc.delaySuccessShare = 3)
}, ftc.showTip = function (t, e) {
    (t || 0 === t) && void 0 !== (t = ftc.language(t, e)) && null !== t && ftc.ManagerRes.newPart("PartTip", "PartTip", ftc.scene, function (e) {
        e.show({
            str: t,
            duration: 1
        })
    }, "_ftaro")
}, ftc.showErrorDialog = function () {
    ftc.showDialog({
        text: "\u5f88\u62b1\u6b49\uff0c\u7a0b\u5e8f\u4e0d\u5c0f\u5fc3\u51fa\u9519\u4e86!",
        clickOk: function () {
            ftc.sysEnd()
        }
    })
}, ftc.showDialog = function (t, e) {
    ftc.loadLayout("LayoutDialogTip1", function (i) {
        e && e(), i.setData(t)
    })
}, ftc.setDialogNoTip = function (t, e) {
    ftc.mapDialogNoTip[t] = e
}, ftc.onClick = function (t) {
    t || (t = ftc.type.effect.click), ftc.playEffect(t)
}, ftc.playEffect = function (t, e) {
    var i = ftc.ManagerData.get1("ManagerMap");
    i && i.isOpenEffect && t && ftc.ManagerRes.playEffect(t, e)
}, ftc.playBackMusic = function (t, e) {
    var i = ftc.ManagerData.get1("ManagerMap");
    i && i.isOpenBGMusic && ftc.ManagerRes.playBackMusic(t, e)
}, ftc.pauseBackMusic = function () {
    ftc.ManagerData.get1("ManagerMap") && ftc.ManagerRes.stopBackMusic()
}, ftc.getTabSpriteFrame = function (t, e) {
    var i = "tab_" + t + (e ? "_2" : "_1");
    return ftc.ManagerRes.getSpriteFrame("program", i)
}, ftc.showWait = function (t, e, i, a, n) {
    if (!ftc.partWait) {
        var s = ftc.ManagerRes.getNode("PartWait", "PartWait", !0);
        s && (ftc.partWait = s, ftc.scene.node.addChild(ftc.partWait.node, 255))
    }
    ftc.partWait && ftc.partWait.showWait(t, e, i, a, n)
}, ftc.cancelWait = function (t) {
    if (ftc.partWait) {
        ftc.partWait.cancelWait(t);
        var e = ftc.ManagerRes.topLayout();
        e && ftc.ManagerTV.autoShowOnCancel(e.node)
    }
}, ftc.newColor = function (t) {
    var e = t >> 16 & 255,
        i = t >> 8 & 255,
        a = 255 & t;
    return new cc.Color(e, i, a)
}, ftc.showDetailInfo = function (t, e) {
    this._showInfo("PartDetailInfo", t, e)
}, ftc.showItemInfo = function (t, e) {
    return this._showInfo("PartItemInfo", t, e)
}, ftc.showSkillInfo = function (t, e) {
    return this._showInfo("PartSkillInfo", t, e)
}, ftc.showEquipInfo = function (t, e) {
    this._showInfo("PartEquipInfo", t, e)
}, ftc._showInfo = function (t, e, i) {
    var a = ftc.ManagerRes.newPart(t);
    a.setData(i), ftc.scene.node.addChild(a.node, 256);
    var n = a.nodeRoot.width;
    "PartDetailInfo" === t && (n = 430);
    var s = e.convertToWorldSpaceAR(cc.v2(0, 0));
    return s.x + n > cc.winSize.width ? a.nodeRoot.anchorX = 1 : a.nodeRoot.anchorX = 0, s.y > cc.winSize.height / 2 ? a.nodeRoot.anchorY = 1 : a.nodeRoot.anchorY = 0, a.node.runAction(cc.sequence(cc.delayTime(.1), cc.callFunc(function () {
        0 === a.nodeRoot.anchorY && s.y + a.nodeRoot.height > cc.winSize.height ? s.y = cc.winSize.height - a.nodeRoot.height - 20 : 1 === a.nodeRoot.anchorY && s.y - a.nodeRoot.height < 0 && (s.y = 20 + a.nodeRoot.height), 0 === a.nodeRoot.anchorX && s.x + a.nodeRoot.width > cc.winSize.width ? s.x = cc.winSize.width - a.nodeRoot.width : 1 === a.nodeRoot.anchorX && s.x - a.nodeRoot.width < 0 && (s.x = a.nodeRoot.width), a.nodeRoot.position = s, a.node.runAction(cc.fadeIn(.1))
    }))), a.node.opacity = 0, a
}, ftc.openNewGuide = function (t) {
    var e = function () {
        ftc.partGuide || (ftc.partGuide = ftc.ManagerRes.newPart("PartGuide", "PartGuide", ftc.scene), ftc.scene.node.addChild(ftc.partGuide.node)), ftc.partGuide.setData(t, function () {
            ftc.sendCallback("openNewGuide")
        })
    };
    ftc.ManagerRes.topLayout().getName() === t.view ? e() : ftc.setViewOnEnterCallback(t.view, e)
}, ftc.showNewGuide = function (t) {
    ftc.guideCache.push(t);
    var e = function () {
        ftc.partGuide || (ftc.partGuide = ftc.ManagerRes.newPart("PartGuide", "PartGuide", ftc.scene), ftc.scene.node.addChild(ftc.partGuide.node, 256)), ftc.partGuide.setData(t)
    };
    ftc.ManagerRes.topLayout().getName() === t.view ? e() : ftc.setViewOnEnterCallback(t.view, e)
}, ftc.isShowNewGuide = function () {
    return !(!ftc.partGuide || !ftc.partGuide.node.active)
}, ftc.openBuyGem = function () {
    if (ftc.ManagerH5.isH5() && 1 != ftc.ManagerH5.openPay()) {
        if (807 !== ftc.getSourceId() || 809 !== ftc.getSourceId()) {
            var t = "\u8be5\u6e20\u9053\u6682\u4e0d\u652f\u6301\u5145\u503c\uff0c\u8bf7\u8054\u7cfb\u5ba2\u670d\n\u5fae\u4fe1\u53f7:18067965129";
            810 === ftc.getSourceId() && (t = "\u8be5\u6e20\u9053\u6682\u4e0d\u652f\u6301\u5145\u503c\uff0c\u8bf7\u8054\u7cfb\u5ba2\u670d"), ftc.showDialog({
                text: t,
                click1: function () { }
            })
        }
    } else 1 == ftc.callNativeFunction("getProductPrices") ? ftc.showTip("\u672a\u83b7\u53d6\u5230\u5546\u54c1\u5217\u8868\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5") : ftc.loadLayout("LayoutBuyGem", void 0, {
        hide: !0
    })
}, ftc.startLoading = function () {
    if (!ftc.partLoading) {
        var t = ftc.ManagerRes.newPart("PartLoading", "PartLoading", ftc.scene);
        t && (ftc.partLoading = t, ftc.scene.node.addChild(ftc.partLoading.node, 255))
    }
    ftc.partLoading && (ftc.partLoading.node.active = !0, ftc.partLoading.startLoading())
}, ftc.stopLoading = function () {
    ftc.partLoading && (ftc.partLoading.stopLoading(), ftc.partLoading.node.active = !1)
}, ftc.loadLayout = function (t, e, i) {
    ftc.showTop(!0), ftc.ManagerRes.newLayout(t, function (t) {
        ftc.cancelTop(), e && e(t)
    }, i)
}, ftc.loadPart = function (t, e, i, a) {
    ftc.showTop(!0), void 0 === a && (a = t), ftc.ManagerRes.newPart(a, t, i, function (t) {
        ftc.cancelTop(), e && e(t)
    })
}, ftc.showPlayerLevelUp = function (t) {
    if (t) ftc.oldPlayerLevel = ftc.ManagerData.get1("Player").level;
    else {
        var e = ftc.ManagerData.get1("Player").level;
        if (4 < e && e <= 6 && ftc.ManagerData.get1("ManagerMsg").otherOpenId && ftc.ManagerH5.setUserReferrer({
            referrer: ftc.ManagerData.get1("ManagerMsg").otherOpenId,
            from: ftc.ManagerH5.getFrom(),
            source: ftc.getSourceId()
        }), ftc.oldPlayerLevel < e) {
            var i = ftc.oldPlayerLevel;
            ftc.oldPlayerLevel = e, ftc.loadLayout("LayoutPlayerLevelUp", function (t) {
                t.setData(i, e)
            }.bind(this))
        }
    }
}, ftc.showAchievementTip = function (t, e) {
    if (!(ftc.ManagerData.get1("Player").level < 35)) {
        var i = ftc.ManagerRes.getNode("PartAchievementTip", "PartAchievementTip");
        i.node.x = cc.winSize.width / 2, i.node.y = 210, 0 === ftc._nodeAchievementTipBuffers.length ? i.setData({
            title: t,
            info: e,
            delay: 0
        }) : (i.node.y -= (i.node.height + 5) * ftc._nodeAchievementTipBuffers.length, i.setData({
            title: t,
            info: e,
            delay: .5 * ftc._nodeAchievementTipBuffers.length
        })), ftc._nodeAchievementTipBuffers.splice(0, 0, i.node), i.node.zIndex = 1024, ftc.scene.node.addChild(i.node)
    }
}, ftc.calcTimeDelta = function (t, e) {
    t || (t = new Date(1e3 * ftc.getLocalTime()));
    var i = (e = new Date(e)).getTime() - t.getTime(),
        a = Math.floor(i / 864e5),
        n = i % 864e5,
        s = Math.floor(n / 36e5),
        o = n % 36e5,
        r = Math.floor(o / 6e4);
    return a > 0 ? a + "\u5929" + s + "\u5c0f\u65f6" : s > 0 ? s + "\u5c0f\u65f6" + r + "\u5206\u949f" : r > 0 ? r + "\u5206\u949f" : "0\u5206\u949f"
}, ftc.calcSecondDelta = function (t, e) {
    return t || (t = new Date(1e3 * ftc.getLocalTime())), e = new Date(e), Math.floor((e.getTime() - t.getTime()) / 1e3)
}, ftc.convertTime2Tip = function (t) { }, ftc.replaceDigitColor = function (t, e) {
    var i = "<color=#" + e + ">";
    return t.replace(/-?\+?\d+(\.\d+)?%?/g, function (t) {
        return i + t + "</c>"
    })
}, ftc.getPoint2PointAngle = function (t, e, i, a) {
    var n = e - a,
        s = t - i,
        o = Math.abs(n) / Math.abs(s),
        r = 0,
        c = 3.1415926;
    return n > 0 && s < 0 ? r = 180 * Math.atan(o) / c - 90 : n > 0 && s > 0 ? r = 90 - 180 * Math.atan(o) / c : n < 0 && s < 0 ? r = 180 * -Math.atan(o) / c - 90 : n < 0 && s > 0 ? r = 180 * Math.atan(o) / c + 90 : 0 == n ? r = s < 0 ? -90 : 90 : 0 == s && (r = n < 0 ? -180 : 0), r
}, ftc.registDirs = [], ftc.registPrefabs = ["part/PartWait", "part/PartLoading", "part/PartTip", "part/PartDetailInfo", "part/PartGuide", "part/PartItem", "part/PartItemDetail", "part/PartItemInfo", "part/PartTopStatus", "part/PartMainNpc", "part/PartMainRole", "part/PartMainWj", "part/PartTitle", "part/PartScreenText", "part/PartAchievementTip", "part/PartEquipInfo", "part/PartMainActivityPos"], ftc.registTextures = ["program", "program2", "icon_equip", "icon_goods", "icon_skill", "icon_hero", "icon_hero2", "icon_header", "txt", "txt_name"], ftc.registImgs = [], ftc.registAudios = [], ftc.TypeWJ = {
    null: -1,
    stop: 0,
    through: 1,
    push: 2
}, ftc.TypeHeroAct = {
    wait: "w",
    attack: "a",
    ready: "ready",
    hit: "h",
    hitDie: "d",
    die: "guihuo",
    jump: "jump"
}, ftc.value = {
    color: {
        tabNormal: 13015159,
        tabNormalOutline: 3220769,
        tabPressed: 16575714,
        tabPressedOutline: 5841436,
        normal: 4855815,
        green: 65280,
        red: 16711680,
        lackRed: 14035456
    }
}, ftc.type = {
    effect: {
        musicMap: "map_bg",
        musicBattle1: "battle_bg1",
        musicBattle2: "battle_bg2",
        battleLose: "battle_lose",
        battleWin: "battle_win",
        click: "click",
        clickClose: "click_close",
        showUI: "show_ui",
        walk: "walk",
        gold: "gold",
        getGoods: "get_goods",
        battleStart: "battle_start",
        heroUp: "hero_up",
        pub: "pub",
        loading0: "loading0",
        loading1: "loading1",
        loading2: "loading2",
        equip: "equip",
        battle_retreat: "",
        equip_lvUp: "equip_lvup",
        equip_wakeup: "equip_wakeup",
        error: "error",
        hero_addValue: "hero_addvalue",
        map_acceptTask: "map_accepttask",
        map_encounter: "map_encounter",
        map_huiFu: "map_huifu",
        map_jinJie: "map_jinjie",
        map_transfer: "map_transfer",
        openBox: "openbox",
        order_change: "order_change",
        order_swap: "order_swap",
        player_lvUp: "player_lvup",
        shop_get: "shop_get",
        title_lvUp: "title_lvup",
        title_set: "title_set",
        visit_get: "visit_get",
        worldMap_click: "worldmap_click",
        battle_biaoji: "battle_biaoji",
        battle_chenmo: "battle_chenmo",
        battle_chiyao: "battle_chiyao",
        battle_dupaopao: "battle_dupaopao",
        battle_huixinyao: "battle_huixinyao",
        battle_hunluan: "battle_hunluan",
        battle_liannu: "battle_liannu",
        battle_lose: "battle_lose",
        battle_qianghua: "battle_qianghua",
        battle_ruohua: "battle_ruohua",
        battle_yixin: "battle_yixin",
        click_entergame: "click_entergame",
        env_bianfu: "env_bianfu",
        env_daditu: "env_daditu",
        env_dishui: "env_dishui",
        get_goods: "get_goods",
        npc_daojudian: "npc_daojudian",
        npc_fangjudian: "npc_fangjudian",
        npc_huo: "npc_huo",
        npc_jiaobushen: "npc_jiaobushen",
        npc_jiuguan: "npc_jiuguan",
        npc_wuqidian: "npc_wuqidian",
        walk_chuan: "walk_chuan",
        game2_luoshui: "game2_luoshui",
        game2_shouji: "game2_shouji"
    },
    dialogNoTip: {
        turntable: 1,
        ccjj: 2
    },
    tab: {
        bag_goods: 1,
        bag_piece: 2,
        bag_equip: 3,
        decompose_equip: 4,
        decompose_piece: 5,
        decompose_biography: 6,
        setting_info: 7,
        setting_setting: 8,
        setting_code: 9,
        shop_honor: 10,
        shop_spirit: 11,
        shop_hufu: 12,
        shop_biography: 13,
        team: 7,
        active_day: 14,
        active_week: 15,
        achievement: 16,
        rank_friend: 17,
        rank_world: 18,
        bag_resource: 19,
        decompose_jewel: 20,
        decompose_other: 21,
        shop_other: 22,
        compose_equip: 23,
        compose_material: 24,
        compose_jewel: 25
    }
}
