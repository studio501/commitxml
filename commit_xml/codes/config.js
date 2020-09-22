
(function (t) {

    cc._RF.push(e, "3619bT2Q8ZIQIxtwGTCmoQV", "config");
    try {
        window.ft = window.ft || {}
    } catch (e) {
        t.ft = t.ft || {}
    }
    ft.getAppId = function () {
        return 0
    }, ft.getAppName = function () {
        return "三国演义:吞噬无界"
    }, ft.getVersion = function () {
        return 4333
    }, ft.getHotupdateVersion = function () {
        return 0
    }, ft.getHotupdateFile = function () {
        return 0
    }, ft.toArray = function (t) {
        return t instanceof Array ? t : [t]
    }, ft.max = function (t, e) {
        return t > e ? t : e
    }, ft.min = function (t, e) {
        return t < e ? t : e
    }, ft.distance2Point = function (t, e, i, a, n, s, o, r) {
        if (n) {
            for (var c = void 0, h = 0; h < n; h++)
                for (var f = 0; f < s; f++)
                    for (var d = 0; d < o; d++)
                        for (var l = 0; l < r; l++) {
                            var u = Math.abs(t + h - (i + d)) + Math.abs(e + f - (a + l));
                            (void 0 === c || c > u) && (c = u)
                        }
            return c
        }
        return Math.abs(t - i) + Math.abs(e - a)
    }, ft.convertDayToWeekDay = function (t) {
        return (t = parseInt(t)) > 0 ? (t + 3) % 7 + 1 : 0
    }, ft.getLastSunday = function (t) {
        return this.getDay(t, 0, !0)
    }, ft.getLastMonday = function (t) {
        return this.getDay(t, 1, !0)
    }, ft.getDay = function (t, e, i) {
        if ((t = parseInt(t)) > 7)
            for (e = (e + 3) % 7; t % 7 !== e;) i ? t-- : t++;
        return t
    }, ft.prefixZeroTime = function (t) {
        return 0 <= t && t < 10 && (t = "0" + t), t
    }, ft.getNumShow = function (t) {
        return t < 1e5 ? t : t < 1e9 ? (t / 1e4).toFixed(2) + "万" : t < 1e13 ? (t / 1e8).toFixed(2) + "亿" : t < 1e17 ? (t / 1e12).toFixed(2) + "万亿" : t < 1e21 ? (t / 1e16).toFixed(2) + "亿亿" : (t / 1e20).toFixed(2) + "万亿亿"
    }, ft.trimName = function (t, e) {
        return t ? (void 0 === e && (e = 5), t.length > e && (t = t.substr(0, e) + ".."), t) : ""
    }, ft.getSysDay = function () {
        return ftc ? ftc.localDay > 0 ? ftc.localDay : Math.floor((ftc.getLocalTime() + 28800) / 86400) : Math.floor((ft.getSysSecond() + 28800) / 86400)
    }, ft.getNumberInNormalDistribution = function (t, e) {
        return t + ft.uniform2NormalDistribution() * e
    }, ft.uniform2NormalDistribution = function () {
        for (var t = 0, e = 0; e < 12; e++) t += Math.random();
        return t - 6
    }, ft.buffRemoveTimes = {
        nil: 0,
        afterRound: 1,
        afterHit: 2,
        afterHurt: 3,
        afterAct: 4
    }, ft.effectTimes = {
        enter: 0,
        before: 1,
        beforeWhenAll: 2,
        when: 3,
        afterWhenAll: 4
    }, ft.buffTimes = {
        nil: 0,
        enter: 1,
        beforeRound: 2,
        afterRound: 3,
        beforeHit: 4,
        afterHit: 5,
        beforeSelect: 6,
        beforeSkill: 7,
        afterSkill: 8,
        beforeWhenSkill: 9,
        afterWhenSkill: 10,
        beforeWhenSkillAll: 11,
        afterWhenSkillAll: 12,
        anyDie: 13,
        afterChangeHp: 14,
        afterAddHp: 15,
        afterSubHp: 16,
        afterAnySkill: 17,
        beforeDead: 18,
        teammateDead: 19,
        enemyDead: 20
    }, ft.achievementTasks1 = [1001, 1002, 1003, 1004, 1005, 1010, 1011, 1601, 1621, 1631, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1025, 1026, 1027, 1028, 1029, 1032, 1033, 1034, 1035, 1039, 1602, 1603, 1608, 1609, 1611, 1613, 1624, 1626, 1627, 1628, 1629, 1630, 1632, 1633], ft.achievementTasks2 = [
        [1063, 1072],
        [1089, 1088]
    ], ft.value = {
        map1: {
            point1: 1,
            point2: 2,
            point3: 3,
            point4: 4,
            point5: 5
        },
        item: {
            gem: 1,
            gold: 2,
            power: 3,
            score: 4,
            gem2: 5,
            exp: 6,
            rmb: 7,
            equipUpgrade1: 116,
            equipUpgrade2: 117,
            equipUpgrade3: 118,
            equipUpgrade4: 138,
            equipUpgrade5: 139,
            equipUpgrade6: 140,
            equipUpgrade7: 261,
            upgradeBox: 124,
            recruitTicket: 119,
            hpMedicine: 101,
            hpMedicines: [101, 102, 103, 104],
            mpMedicines: [108, 121, 122],
            expMedicine1: 141,
            expMedicine2: 210,
            inheritTicketHalf: 208,
            inheritTicketAll: 209,
            stoneAttrs: [204, 205, 206, 207],
            stoneAttrUps: [134, 135, 136, 137],
            challengeTicket: 120,
            mopUpTicket: 142,
            campaignTicket: 132,
            fantasylandScore: 323,
            fantasylandBox: 259,
            fantasylandSandglass: 262,
            spirit: 155,
            honor: 133,
            huFu: 324,
            biographyPiece: 325,
            treasureKey: 131,
            turntableTicket: 330,
            boatLamp: 331,
            vitalityPointDay: 92,
            vitalityPointWeek: 93,
            achievementPoint: 94,
            treasureMaps: [326, 327, 328, 329],
            zyCount0: 373,
            zyCount1: 374,
            zyCount2: 375,
            zyCount3: 376,
            diLuMaPiece: 240,
            chaseWindDiLuMa: 716,
            powerMedicine: 322,
            yeYingZhang1: 114,
            yeYingZhang2: 123,
            tfdzCount: 8005,
            czdaCount: 8009,
            pdjdCount: 8012,
            sbbzCount: 9514,
            lshyCount: 9533,
            primaryMould: 964,
            spiritCrystal: 350,
            equipPerforation: 948,
            inlayPowder: 949,
            jewelUnloadTool: 950,
            yearPicture: 5540,
            xswjCounts: [9505, 9506, 9507, 9508, 9509],
            petBook1: 5600,
            petBook2: 5601
        },
        func: {
            team: 11,
            heroes: 12,
            strategy: 13,
            bag: 14,
            order: 15,
            visit: 16,
            decompose: 17,
            map: 18,
            mail: 19,
            active: 21,
            task: 22,
            copy: 23,
            activity: 24
        },
        disable: {
            bag: 25,
            team: 26,
            heroes: 27,
            visit: 28,
            decompose: 29,
            map: 30,
            mail: 34,
            active: 35,
            activity: 36,
            task: 37,
            guide: 38
        },
        msg: {
            giftSevenDay: 1,
            giftNextDay: 2,
            giftTotal: 4,
            giftGrowth: 5,
            giftDoc: 6,
            giftVip: 7,
            giftShare: 8,
            firstCharge: 9,
            sevenDaySign: 11,
            dailySign: 12,
            guanYu: 13,
            dailyVip: 14,
            wuziliangjiang: 20,
            yuanshenduohui: 21,
            watchAd: 22,
            sevenDay: 23,
            focus: 51,
            invite: 52,
            focusPublic: 53,
            focusDesktop: 54,
            jewelExchange: 55,
            awardLvUp: 101,
            awardCCJJ: 102,
            rank: 105
        },
        copy: {
            HJZ: 1,
            ZYS: 2,
            YXT: 3,
            ShenBing: 4,
            YXT2: 5,
            CCJJ: 6,
            ZSJ: 7,
            ZY: 8,
            FLHJ: 9,
            TFDZ: 10,
            HSLY: 11,
            CZDA: 12,
            XSWJ: 13,
            PDJD: 14,
            SBBZ: 15,
            LSHY: 16,
            QJQC: 18,
            LZHJ: 19,
            YWC: 20
        },
        popupView: {
            sign: 1,
            notice: 2,
            ccjjAward: 3,
            hslyAward: 4
        },
        heroStarNeed: [10, 20, 30, 40, 50],
        heroSpiritNeed: [1, 2, 3, 5],
        heroAttrNeed: [1, 2, 3, 5],
        heroAttrAddMax: [500, 200, 50, 100],
        heroWakeUpLevels: [25, 50, 75, 100],
        heroWakeUpStars: [1, 2, 3, 4],
        heroBiographyNeed: [0, 5, 15, 30, 50],
        heroWakeupMaterialIds: [
            [144, 148, 152],
            [145, 149, 153],
            [146, 150, 154],
            [143, 147, 151]
        ],
        heroWakeupMaterialNums: [
            [200, 50, 0, 1],
            [100, 100, 40, 2],
            [0, 50, 100, 3],
            [0, 0, 150, 5]
        ],
        equipStarNeed: [25, 50, 75, 100, 125, 150, 175, 200, 225, 250],
        decomposeGolds: [1e3, 2500, 5e3, 1e4, 2e4],
        expMedicineValue: [1e4, .25],
        xswjAwardNums: [100, 200, 300, 400, 900],
        visit: {
            gold1: 6e3,
            gold10: 5e4,
            gem1: 15,
            gem10: 100,
            gemTimesDaily: 2e4,
            freeGoldTimes: 1,
            freeGemCoolDown: 86400
        },
        com: {
            bagSize: 200,
            maxHeroLevel: 360,
            maxEquipLevel: 360,
            maxHeroNum: 5,
            maxHeroUp: 4,
            maxHeroStar: 5,
            maxHeroBiographyStage: 4,
            maxEquipStar: 5,
            maxPetLevel: 15,
            maxTeam: 2,
            strategySize: 14,
            inheritGold: 3600,
            inheritGem: 180,
            maxPetUp: 9,
            exchangeGoldGem: 100,
            exchangeGold: 2e5,
            exchangeGoldTimes: 25,
            exchangePowerGem: [50, 100, 150, 200, 250, 300],
            exchangePower: 100,
            exchangePowerTimes: 6,
            powerRecoverTime: 300,
            fantasylandBoxScore: 600,
            onlineActivityStartId: 1e3,
            mopUpTicketNumDaily: 1,
            mopUpTicketNumWeekly: 5,
            copyShenBingBuyCount: 100,
            copyShenJiangBuyCount: [200, 500],
            giftVipNeed: 30,
            equipSwitchStar: 5,
            biographyDecomposeGold: 1e4,
            itemDecomposeGold: 1e4,
            jewelDecomposeGold: 1e4,
            biographyMaxNum: 100,
            basePropCount: 8,
            noNpcTimebase: 20,
            noNpcCd: 0,
            copyZSJTimes: 60,
            showAdLevel: 5,
            adAwardIds: [2501, 2502, 2503, 2504, 2505],
            yearPictureMax: 1e3
        },
        shop: {
            honor: 101,
            spirit: 102,
            huFu: 103,
            biography: 104,
            mystery: 105,
            other: 106,
            crystal: 107,
            copy1: 201,
            copy2: 202
        },
        product1: {
            id: 1,
            gem: 60,
            gemAdd: 0,
            price: 6
        },
        product2: {
            id: 2,
            gem: 300,
            gemAdd: 50,
            price: 30
        },
        product3: {
            id: 3,
            gem: 1080,
            gemAdd: 200,
            price: 108
        },
        product4: {
            id: 4,
            gem: 2080,
            gemAdd: 550,
            price: 208
        },
        product5: {
            id: 5,
            gem: 3880,
            gemAdd: 1188,
            price: 388
        },
        product6: {
            id: 6,
            gem: 6480,
            gemAdd: 2168,
            price: 648
        },
        product7: {
            id: 7,
            gem: 1,
            gemAdd: 0,
            price: 1
        },
        product11: {
            id: 11,
            gem: 1380,
            gemAdd: 0,
            price: 108
        },
        product12: {
            id: 12,
            gem: 2830,
            gemAdd: 0,
            price: 208
        },
        product13: {
            id: 13,
            gem: 5468,
            gemAdd: 0,
            price: 388
        },
        product14: {
            id: 14,
            gem: 7200,
            gemAdd: 0,
            price: 500
        },
        product15: {
            id: 15,
            gem: 9380,
            gemAdd: 0,
            price: 648
        },
        product16: {
            id: 16,
            gem: 15e3,
            gemAdd: 0,
            price: 1e3
        },
        product17: {
            id: 17,
            gem: 22500,
            gemAdd: 0,
            price: 1500
        },
        product18: {
            id: 18,
            gem: 31e3,
            gemAdd: 0,
            price: 2e3
        },
        product19: {
            id: 19,
            gem: 48e3,
            gemAdd: 0,
            price: 3e3
        },
        product20: {
            id: 20,
            gem: 66e3,
            gemAdd: 0,
            price: 4e3
        },
        product21: {
            id: 21,
            gem: 85e3,
            gemAdd: 0,
            price: 5e3
        },
        cdKey: {
            length: 18
        },
        inheritRate: [.5, 1],
        strategies: [1001, 1006, 1011, 1111, 1031, 1036, 1109, 1103, 1107, 1110, 1116, 1113, 1114, 1115],
        strategy: {
            zhaoXiang: 1115
        },
        titleLvUpNeeds: [0, 10, 20, 50, 100, 160, 250, 340, 430, 520],
        equipUnlockSlotNeeds: [1, 5, 10],
        HSLYAwards: [
            [958, [10, 5, 0],
                [3, 2, 1]
            ],
            [959, [16, 8, 0],
                [6, 5, 4]
            ],
            [959, [43, 32, 15, 0],
                [10, 9, 8, 7]
            ]
        ],
        HSLYExtAwards: [
            [960, 2],
            [961, 1],
            [961, 2]
        ],
        professionPower: {
            1: {
                1: 3,
                2: 4,
                3: 6,
                4: 7,
                5: 4,
                6: 5
            },
            2: {
                1: 4,
                2: 6,
                3: 3,
                4: 2,
                5: 6,
                6: 7
            },
            3: {
                1: 3,
                2: 5,
                3: 4,
                4: 7,
                5: 5,
                6: 6
            },
            4: {
                1: 3,
                2: 5,
                3: 4,
                4: 7,
                5: 5,
                6: 6
            },
            5: {
                1: 5,
                2: 6,
                3: 4,
                4: 3,
                5: 6,
                6: 7
            },
            6: {
                1: 4,
                2: 6,
                3: 3,
                4: 2,
                5: 6,
                6: 7
            }
        },
        detail: {
            decompose_equip: 1,
            decompose_piece: 2,
            decompose_biography: 3,
            decompose_jewel: 4,
            decompose_other: 5,
            copy_gd: 6,
            equip_wakeup: 7,
            hsly_jewelExchange: 8,
            hero_attr: 9,
            hero_wake: 10,
            compose: 11,
            setting_title: 12,
            hero_biography_lz: 13,
            hero_biography_wrd: 14,
            ldjl: 15,
            xsld_xyx: 16,
            xsld_cc: 17,
            xsld_hjjb: 18,
            ywc: 20
        },
        achievement: {
            ywc0: 10005,
            ywc1: 10006,
            ywc2: 10007,
            ywc3: 10008,
            ywc4: 10009
        }
    }, ft.type = {
        http: {
            GetUsrSession: "GetUsrSession",
            Touch: "TouchV2",
            UseCdkey: "UseCdkey",
            CheckUsrSession: "CheckUsrSession",
            GetActiveCdkey: "GetActiveCdkey",
            ModifyNick: "ModifyNick"
        },
        msg: {
            normal: 1001,
            notice: 1002,
            rolltitle: 1003,
            pos: {
                gift: 1,
                daily: 2,
                limited: 3,
                sevenDay: 4,
                vip: 5,
                total: 6,
                focus: 7,
                invite: 8,
                nationalDay: 9,
                anniversary: 10,
                ad: 11,
                mayDay: 12,
                firstCharge: 13,
                newYear: 14,
                signIn: 15,
                limited_month: 16,
                limited_gift: 17,
                other: 18,
                notice: 19,
                summer: 20,
                guanYu: 21,
                gameAd: 22,
                rank: 23
            }
        },
        activity: {
            giftSevenDay: 1,
            giftNextDay: 2,
            giftZiZhuang: 3,
            giftTotal: 4,
            giftGrowth: 5,
            giftDoc: 6,
            giftVip: 7,
            giftShare: 8,
            giftFirstCharge: 9,
            dailyWelfare: 11,
            dailySignSevenDay: 12,
            dailySign: 13,
            limitedGuanYu: 15,
            dailyVip: 20,
            limitedLink: 21,
            limitedLinkAward: 22,
            diluma: 23,
            exchangeCode: 24,
            service: 25,
            watchAd: 26,
            sevenDay: 27,
            focus: 28,
            invite: 29,
            rank: 30,
            focusPublic: 32,
            focusDesktop: 33,
            inviter: 35,
            battleAdBox: 37,
            loginDoc: 38,
            multiDoc: 39,
            help: 40,
            wuziliangjiang: 1009,
            yuanshenduohui: 1009,
            limitedConsume: 1004,
            limitedRecharge: 1005,
            limitedSign: 1006,
            limitedShop: 1007,
            limitedPoints: 1008,
            exchange: 1009,
            turntable: 1010,
            CaoChuanJieJian: 1011,
            fish: 1012,
            battleOutput: 1013,
            holidaySign: 1014,
            limitedCopy: 1015,
            moonlightBox: 1016,
            limitedVisit: 1017,
            pointsGet: 1025,
            dungeonChallenge: 1027,
            exchange2: 1028,
            giftFocus: 1029,
            giftComment: 1030,
            monthSign: 1031,
            monthShop: 1032,
            snatchTreasure: 1033,
            snatchTreasureAll: 1034,
            heroTrial: 1039
        },
        event: {
            TLXH: 1,
            WJZM: 2,
            YBXH: 3,
            ZDWC: 4,
            XMRS: 5,
            BSTJ: 6,
            ZBQH: 7,
            WJSJ: 8,
            JBXH: 9,
            WCZM: 10,
            WCZX: 11,
            TZFB: 12,
            SYZP: 13,
            SYCL: 14,
            SYJN: 15,
            FJTJ: 16,
            ZBSJ: 17,
            ZWJGS: 18,
            ZWJXJ: 19,
            WJJX: 20,
            ZBJX: 21,
            ZXRW: 22,
            ZDL: 23,
            XJCS: 24,
            WJSX: 25,
            ZBDJ: 27,
            DWDJ: 28,
            ZZSJ: 29,
            QRQD: 30,
            XHYP: 31,
            HFCL: 32,
            HDCH: 33,
            ZBT: 34,
            ZJJS: 35,
            HDJZ: 36,
            MRDL: 37,
            CSWJ: 38
        },
        eventAchievement: {
            XHYB: 1,
            ZXRW: 2,
            WJJY: 3,
            TZFB: 4,
            ZDSL: 5,
            TZZFB: 6,
            ZBT: 7,
            WCZM: 8,
            DJDD: 9,
            RHYD: 10,
            ZHYD: 11,
            MRHY: 12,
            CJD: 13,
            XHYP: 14,
            LJSD: 15,
            XZBS: 16,
            ASDR: 17,
            WCZY: 18,
            SYYB: 19,
            ZBQH: 20,
            HJYB: 21,
            CCQJ: 22,
            ZSLB: 23,
            ZSZY: 24,
            ZSDW: 25,
            SGWJ: 26,
            WeiGWJ: 27,
            WuGWJ: 28,
            QXWJ: 29,
            SGWJX: 30,
            WeiGWJX: 31,
            WuGWJX: 32,
            QXWJX: 33,
            ZBSJ: 34,
            WJSJ: 35,
            WMZZ: 36,
            YTTX: 37,
            HDCH: 38,
            ZJJS: 39,
            CSWJ: 40,
            ZJRW: 41,
            TGFB: 101,
            XMDR: 102,
            HDWP: 103,
            HDZF: 104,
            HDZZ: 105,
            SSPT: 151,
            UPWJ: 154,
            SYCL: 155,
            SSHX: 156,
            BJ: 157,
            BUFF: 158,
            YSWP: 159
        },
        eventCopy: {},
        map: {
            normal: 0,
            challenge: 1,
            zy: 2,
            maze: 3,
            flhj: 4,
            tfdz: 5,
            hsly: 6,
            world: 7,
            czda: 8,
            xswj: 9,
            pdjd: 10,
            sbbz: 11,
            lshy: 12,
            qjqc: 15
        },
        task: {
            main: 1,
            branch: 2,
            achieve: 3,
            hide: 4,
            accept: 5
        },
        consume: {
            equip: 1,
            jewel: 2,
            material: 3
        },
        pet: {
            embattle: 1,
            strategy: 2
        },
        item: {
            all: -1,
            baseVisible: 0,
            base: 1,
            material: 2,
            goods: 3,
            piece: 4,
            whole: 5,
            task: 6,
            spirit: 7,
            biography: 8,
            lord: 9,
            heroMaterial: 11,
            equipMaterial: 12,
            specialLord: 13,
            battleSkin: 14,
            goodsNames: ["全部", "可用道具", "不可用道具"],
            pieceNames: ["全部", "武将碎片", "装备碎片"]
        },
        equip: {
            general: 0,
            sword: 1,
            spear: 2,
            blade: 3,
            bow: 4,
            axe: 5,
            clothes: 6,
            decoration: 7,
            armet: 8,
            shoes: 9,
            rider: 10,
            equipNames: ["通用武器", "剑", "枪", "刀", "弓", "斧", "衣服", "饰品", "头盔", "鞋子", "坐骑"]
        },
        part: {
            all: 0,
            weapon: 1,
            clothes: 2,
            decoration: 3,
            armet: 4,
            shoes: 5,
            rider: 6,
            exclusive: 7,
            partNames: ["全部", "武器", "衣服", "饰品", "头盔", "鞋子", "坐骑", "专属"]
        },
        prop: {
            wl: 1,
            zl: 2,
            sd: 3,
            nl: 4,
            hp: 5,
            mp: 6,
            kx: 7,
            gjjl: 8,
            bj: 9,
            bjdk: 10,
            bjsh: 11,
            bjjm: 12,
            wlmz: 13,
            wlsb: 14,
            clmz: 15,
            clsb: 16,
            wlct: 17,
            clct: 18,
            wljs: 19,
            wljm: 20,
            hxjs: 21,
            hxjm: 22,
            sxjs: 23,
            sxjm: 24,
            txjs: 25,
            txjm: 26,
            lxjs: 27,
            lxjm: 28,
            cfz: 29,
            zljc: 30,
            zljm: 31
        },
        battle: {
            forbidExit: 1,
            forbidAuto: 2,
            forbidSkill: 4,
            forbidItem: 8,
            forbidStrategy: 16,
            forbidOrder: 32,
            forbidAttack: 64,
            forbidSpeed: 128,
            forbidBuff: 256
        },
        battleModel: {
            normal: 0,
            multi: 1,
            turns: 2
        },
        award: {
            modelAlone: 0,
            modelSum: 1,
            battle: 1,
            task: 2,
            achieve: 3
        },
        shop: {
            item: 1,
            equip: 2,
            hero: 3
        },
        lan: {
            zh: 0,
            tr: 1,
            en: 2,
            jk: 3
        },
        hero: {
            our: 0,
            enemy: 1,
            story: 2
        },
        country: {
            all: 0,
            Wei: 1,
            Shu: 2,
            Wu: 3,
            Qun: 4,
            countryNames: ["全部", "魏", "蜀", "吴", "群"]
        },
        quality: {
            white: 1,
            green: 2,
            blue: 3,
            violet: 4,
            golden: 5
        },
        list: {
            ChangeHero: 1,
            Inherit: 2,
            UseGoods: 3,
            UseStrategy: 4,
            EquipUpgrade: 5,
            ChangeEquip: 6,
            ChangeCommander: 7,
            EquipSwitch: 8,
            UseGoods2: 9,
            ChooseHero: 10,
            ChooseJewel: 11,
            ChooseJewelUpgrade: 12
        },
        skill: {
            pt: 0,
            zd: 1,
            bd: 2,
            cl: 3,
            dj: 4
        },
        inherit: {
            half: 0,
            all: 1
        },
        visit: {
            gold: 0,
            gem: 1,
            treasure: 2,
            limited: 3,
            gold1: 1,
            gold10: 2,
            gem1: 3,
            gem10: 4,
            limited10: 5
        },
        achievement: {
            day: 1,
            week: 2,
            achieve: 3,
            copyXSWJ: 4,
            copySBBZ: 5,
            copyLSHY: 6,
            copyQJQC: 7,
            statistics: 1001,
            growth: 1,
            challenge: 2,
            collect: 3
        },
        partItemType: {
            item: 0,
            equip: 1,
            hero: 2,
            skill: 3,
            pet: 4,
            title: 5,
            jewel: 6
        },
        wait: {
            car: 1,
            ship: 2,
            battle: 3,
            inn: 4
        },
        gemGet: {
            task: 1,
            sign: 2,
            vip: 3,
            sevenDay: 4,
            achieve: 5,
            mail: 6,
            recharge: 7
        },
        share: {
            menu: 0,
            invite: 1,
            activity: 2,
            setting: 3
        },
        skin: {
            lord: 0,
            commander: 1,
            team: 2,
            lock: 3,
            specify: 4
        },
        bannerAd: {
            talk: 1,
            awardGoods3: 2,
            battleResult: 3
        },
        chatType: {
            autoTalk: 0,
            selfTalk: 1,
            historyTalk: 2
        },
        fullAd: {
            main: 1,
            awardGoods3: 2,
            battleResult: 3
        },
        jewel: {
            all: 0,
            green: 1,
            blue: 2,
            violet: 3,
            yellow: 4,
            jewelNames: ["全部", "绿宝石", "蓝宝石", "紫宝石", "黄宝石"]
        },
        resource: {
            all: 0,
            heroMaterial: 11,
            equipMaterial: 12,
            jewel: 3,
            resourceNames: ["全部", "武将相关", "装备相关", "宝石"]
        },
        compose: {
            equip: 1,
            jewel: 2,
            material: 3
        },
        rarity: {
            green: 1,
            blue: 2,
            violet: 3,
            rare: 4,
            legend: 5
        },
        npc: {
            normal: 1,
            light: 2
        },
        npcWalk: {
            motionless: 0,
            turn: 1,
            custom: 2,
            random: 3
        },
        copy: {
            daily: 1,
            weekly: 2,
            limited: 3,
            challenge: 4,
            shenBing: 5,
            names: ["", "日常副本", "周常副本", "限时副本", "挑战副本", "神兵副本"]
        },
        copyMode: {
            challenge: 0,
            mopUp: 1
        },
        feat: {
            fight: 1,
            kill: 2,
            needNums: [100, 1e4]
        },
        decoration: {
            decoration: 1,
            header: 2,
            headerFrame: 3
        }
    }
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
