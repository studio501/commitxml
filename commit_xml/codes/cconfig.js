

window.ftc = window.ftc || {}, ftc.firstViewName = "LayoutLoading", ftc.ActiveNative = !0, ftc.RestoreNodeTime = 18e4, ftc.PartItem = t("PartItem"), ftc.guideCache = [], ftc.mapDialogNoTip = {}, ftc.partWait = null, ftc.resURL = "https://cdn.ftaro.com/activity/0/", ftc.PartHeroWidth = 128, ftc.PartHeroHeight = 116, ftc.isOpenPayView = !1, ftc._nodeAchievementTipBuffers = [], ftc.StandardSpeed = 0, ftc.startShareKingWar = function (t) {
    ftc.ManagerH5.isH5() ? ftc.ManagerH5.startShare(t) : ftc.startShare(ftc.language("小霸王《吞食天地》复刻版，手机上也能玩了"), ftc.language("还记得fc经典游戏《吞食天地》吧？出手机重制版了呦，剧情、玩法高度还原，让你重新拾起童年的记忆。")), ftc.ManagerRes.findLayout("LayoutActivity") && (ftc.delaySuccessShare = 3)
}, ftc.showTip = function (t, e) {
    (t || 0 === t) && void 0 !== (t = ftc.language(t, e)) && null !== t && ftc.ManagerRes.newPart("PartTip", "PartTip", ftc.scene, function (e) {
        e.show({
            str: t,
            duration: 1
        })
    }, "_ftaro")
}, ftc.showErrorDialog = function () {
    ftc.showDialog({
        text: "很抱歉，程序不小心出错了!",
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
            var t = "该渠道暂不支持充值，请联系客服\n微信号:18067965129";
            810 === ftc.getSourceId() && (t = "该渠道暂不支持充值，请联系客服"), ftc.showDialog({
                text: t,
                click1: function () { }
            })
        }
    } else 1 == ftc.callNativeFunction("getProductPrices") ? ftc.showTip("未获取到商品列表，请稍后再试") : ftc.loadLayout("LayoutBuyGem", void 0, {
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
    return a > 0 ? a + "天" + s + "小时" : s > 0 ? s + "小时" + r + "分钟" : r > 0 ? r + "分钟" : "0\u5206\u949f"
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
