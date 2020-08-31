
            
             ft.ExtMsg = {}, ftc && (ft.ExtMsg.getHeroDesc = function (t) {
                var e = [14, 13, 12, 11, 10][t];
                return ftc.ManagerRes.getSpriteFrame("txt", "txt_activity_" + e)
            }, ft.ExtMsg.checkCanGetByPos = function (t) {
                for (var e = this.getMsgDatas(t), i = 0; i < e.length; i++)
                    if (this.checkCanGet(e[i])) return !0
            }, ft.ExtMsg.checkCanGet = function (t) {
                if (!t) return !1;
                var e = !1;
                switch (Number(ft.ExtMsg.getType(t))) {
                    case ft.type.activity.giftSevenDay:
                        e = 0 == t.ste;
                        break;
                    case ft.type.activity.giftNextDay:
                        e = 1 === t.ste;
                        break;
                    case ft.type.activity.giftZiZhuang:
                        break;
                    case ft.type.activity.giftTotal:
                        var i = (a = ft.ExtMsg.getActivityData(t)).items[Number(t.ext)];
                        e = ftc.ManagerData.get1("Player").rmb >= i.totals;
                        break;
                    case ft.type.activity.giftGrowth:
                        i = (a = ft.ExtMsg.getActivityData(t)).items[Number(t.ext)];
                        e = ftc.ManagerData.get1("Player").level >= i.levels;
                        break;
                    case ft.type.activity.giftDoc:
                        e = !0;
                        break;
                    case ft.type.activity.giftVip:
                        e = 0 == t.ste && ftc.ManagerData.get1("Player").rmb > ft.value.com.giftVipNeed;
                        break;
                    case ft.type.activity.giftShare:
                        break;
                    case ft.type.activity.giftFirstCharge:
                        e = 0 == t.ste && ftc.ManagerData.get1("Player").rmb > 0;
                        break;
                    case ft.type.activity.dailyWelfare:
                        for (var a = ft.ExtMsg.getActivityData(t), n = t.ste.split(","), s = new Date(1e3 * (ftc.getLocalTime() + 28800)), o = s.getUTCDay(), r = s.getUTCHours(), c = 0; c < n.length; c++)
                            if (0 == n[c]) {
                                if (0 === c) {
                                    e = !0;
                                    break
                                }
                                if ((i = a.items[c]).ids === ft.value.item.power) {
                                    if (1 === c) {
                                        if (12 <= r && r < 18) {
                                            e = !0;
                                            break
                                        }
                                    } else if (2 === c && 18 <= r) {
                                        e = !0;
                                        break
                                    }
                                } else if (i.ids === ft.value.item.campaignTicket && 6 == o) {
                                    e = !0;
                                    break
                                }
                            } break;
                    case ft.type.activity.dailySignSevenDay:
                        e = 0 == t.ste || Number(t.ste) + 1 === ft.getSysDay();
                        break;
                    case ft.type.activity.dailySign:
                    case ft.type.activity.dailyVip:
                        e = 0 == t.ste;
                        break;
                    case ft.type.activity.limitedSign:
                        (n = t.ste.split(","))[_ = ft.getSysDay() - t.ext] && 0 != n[_] || (e = !0);
                        break;
                    case ft.type.activity.limitedGuanYu:
                        e = !0;
                        break;
                    case ft.type.activity.limitedConsume:
                        var h = t.ext.split(","),
                            f = (n = t.ste.split(","), a = ft.ExtMsg.getActivityData(t), []);
                        for (c = 0; c < a.consumeTypes.length; c++) - 1 === f.indexOf(a.consumeTypes[c]) && f.push(a.consumeTypes[c]);
                        for (c = 0; c < a.consumeTypes.length; c++)
                            if (!n[c] || 0 == n[c]) {
                                for (var d = 0, l = 0; l < f.length; l++)
                                    if (f[l] === a.consumeTypes[c]) {
                                        d = h[l];
                                        break
                                    } if (d >= a.consumeNums[c]) {
                                        e = !0;
                                        break
                                    }
                            } break;
                    case ft.type.activity.diluma:
                        e = t.ext.length > 0;
                        break;
                    case ft.type.activity.sevenDay:
                        if ((a = JSON.parse(ft.ExtMsg.getBase(t))).event === ft.type.event.QRQD) {
                            if ("" == t.ste) {
                                var u = ft.ExtMsg.getPriority(t);
                                ft.getSysDay() >= ftc.ManagerData.get1("ManagerMsg").sevenDayStart + (Math.floor(u / 10) - 1) && (e = !0)
                            }
                        } else {
                            var p = 0;
                            for (l = 0; l < a.conditions.length; l++) t.ext >= a.conditions[l] && p++;
                            e = p > t.ste
                        }
                        break;
                    case ft.type.activity.holidaySign:
                        var g = t.ext.split(",");
                        a = JSON.parse(ft.ExtMsg.getBase(t));
                        e = 0 == t.ste ? g[0] < a.ids.length : g[0] > g[1] && g[1] < a.extIds.length;
                        break;
                    case ft.type.activity.limitedCopy:
                        a = ft.ExtMsg.getActivityData(t);
                        if (0 == t.ste) {
                            var m = a.countId;
                            e = ft.ExtItem.getNum(m) > t.ext
                        }
                        a.copyId === ft.value.copy.SBBZ && (e || (e = ft.ExtAchievement.hasAchievementComplete(ft.type.achievement.copySBBZ)));
                        break;
                    case ft.type.activity.moonlightBox:
                        p = (a = ft.ExtMsg.getActivityData(t)).getCountMax;
                        var b = 0;
                        for (n = t.ste.split(","), c = 0; c < n.length; c++) n[c] && (b += Number(n[c]));
                        if (b < p)
                            if (t.ext >= a.chargeMax && (e = !0), !e) (y = ftc.ManagerData.get2Object("Msg", a.activityId)) && (e = ft.ExtMsg.checkCanGet(y));
                        break;
                    case ft.type.activity.limitedVisit:
                        break;
                    case ft.type.activity.dungeonChallenge:
                        var v = ftc.ManagerData.get2Object("Achievement");
                        for (var c in v) {
                            if (ft.ExtAchievement.getType(c) === ft.type.achievement.copyXSWJ && 1 === ft.ExtAchievement.getSubtype(c))
                                if (1 === ft.ExtAchievement.getStatus(v[c])) {
                                    e = !0;
                                    break
                                }
                        }
                        break;
                    case ft.type.activity.heroTrial:
                        a = ft.ExtMsg.getActivityData(t), n = t.ste.split(","), h = t.ext.split(",");
                        for (var y, _ = 0; _ < 9; _++)
                            if (1 != n[_]) {
                                var x = -1,
                                    w = -1;
                                _ < 4 ? x = _ : _ < 8 && (w = _ % 4);
                                var S = !0;
                                if (-1 !== x) {
                                    for (c = 0; c < 4; c++)
                                        if (1 != h[4 * x + c]) {
                                            S = !1;
                                            break
                                        }
                                } else if (-1 !== w) {
                                    for (c = 0; c < 4; c++)
                                        if (1 != h[w + 4 * c]) {
                                            S = !1;
                                            break
                                        }
                                } else
                                    for (c = 0; c < 16; c++)
                                        if (1 != h[c]) {
                                            S = !1;
                                            break
                                        } if (S) {
                                            e = !0;
                                            break
                                        }
                            } if (!e) (y = ftc.ManagerData.get2Object("Msg", a.activityId)) && (e = ft.ExtMsg.checkCanGet(y))
                }
                if (!e) {
                    var k = this.getUnionMsgs(t);
                    if (k && k.length > 0)
                        for (c = 0; c < k.length && !(e = this.checkCanGet(k[c])); c++);
                }
                return e
            }, ft.ExtMsg.getMsgDatas = function (t, e) {
                var i = [],
                    a = ftc.ManagerData.get1("ManagerMsg").excludeMsg = "",
                    n = a && a.length > 0 ? a.split(",") : [],
                    s = ftc.ManagerData.get2("Msg");
                for (var o in s)
                    if (ft.ExtMsg.getPos(s[o]) == t && -1 === n.indexOf(ft.ExtMsg.getType(s[o]) + "") && (!ft.ExtMsg.isNeedNet(s[o]) || ft.ExtMsg.isNeedNet(s[o]) && ftc.localDay > 0)) {
                        var r = ft.ExtMsg.getType(s[o]);
                        if (r === ft.type.activity.limitedGuanYu) {
                            if (ftc.getLocalTime() > s[o].ext) continue
                        } else if ((r == ft.type.activity.giftFocus || r == ft.type.activity.giftComment) && "1" == s[o].ste) continue;
                        if (s[o].id === ft.value.msg.giftShare) {
                            if ("1" != ftc.callNativeFunction("openShare")) continue
                        } else if (s[o].id === ft.value.msg.giftDoc && ftc.ManagerH5.isH5()) continue;
                        i.push(s[o])
                    } if (void 0 === e) return i.sort(function (t, e) {
                        return ft.ExtMsg.getPriority(t) - ft.ExtMsg.getPriority(e)
                    });
                for (o = 0; o < i.length; o++)
                    if (ft.ExtMsg.getType(i[o]) == e) return i[o]
            }, ft.ExtMsg.getMsgByType = function (t) {
                var e = ftc.ManagerData.get2("Msg");
                for (var i in e) {
                    var a = e[i];
                    if (ft.ExtMsg.getType(a) == t) return a
                }
            }, ft.ExtMsg.isExclude = function (t) {
                var e = ftc.ManagerData.get1("ManagerMsg").excludeMsg;
                return !!(e && e.length > 0) && -1 !== e.split(",").indexOf(t.toString())
            }, ft.ExtMsg.getOnlineDate = function (t, e) {
                if (t = t.split(" ")[0], 1 === e) return t;
                if (2 === e) {
                    var i = t.indexOf("/");
                    return t.substring(i + 1)
                }
            }, ft.ExtMsg.getFocusSte = function () {
                var t = [];
                t.push(ftc.ManagerH5.isOpenMiniProgram()), t.push(ftc.ManagerH5.isOpenPublic()), t.push(ftc.ManagerH5.isOpenDesktop());
                for (var e = !1, i = 0; i < t.length; i++)
                    if (1 == t[i]) {
                        e = !0;
                        break
                    } if (e) {
                        var a = ftc.ManagerData.get1("ManagerMsg"),
                            n = [];
                        n.push(a.focusSte), n.push(a.focusPublicSte), n.push(a.focusDesktopSte);
                        var s = !0;
                        for (i = 0; i < t.length; i++)
                            if (1 == t[i] && 1 != n[i]) {
                                s = !1;
                                break
                            } if (s) return 0;
                        var o = [];
                        o.push(ftc.ManagerH5.enterFromMiniProgram()), o.push(ftc.ManagerH5.enterFromPublic()), o.push(ftc.ManagerH5.enterFromDesktop());
                        for (i = 0; i < t.length; i++)
                            if (1 == t[i] && 0 == n[i] && o[i]) return 2;
                        return 1
                    }
                return 0
            }, ft.ExtMsg.getPosTitle = function (t) {
                var e;
                switch (t = Number(t)) {
                    case ft.type.msg.pos.gift:
                        e = "\u7cbe\u5f69\u6d3b\u52a8";
                        break;
                    case ft.type.msg.pos.daily:
                        e = "\u6bcf\u65e5\u6d3b\u52a8";
                        break;
                    case ft.type.msg.pos.limited:
                        e = "\u9650\u65f6\u6d3b\u52a8";
                        break;
                    case ft.type.msg.pos.limited_month:
                        e = "\u6708\u5ea6\u6d3b\u52a8";
                        break;
                    case ft.type.msg.pos.limited_gift:
                        e = "\u793c\u5305\u6d3b\u52a8";
                        break;
                    case ft.type.msg.pos.sevenDay:
                        e = "\u4e03\u65e5\u6d3b\u52a8";
                        break;
                    case ft.type.msg.pos.vip:
                        e = "\u5c0a\u4eab\u4f1a\u5458";
                        break;
                    case ft.type.msg.pos.total:
                        e = "\u7d2f\u8ba1\u793c\u5305";
                        break;
                    case ft.type.msg.pos.focus:
                        e = "\u5173\u6ce8\u5956\u52b1";
                        break;
                    case ft.type.msg.pos.invite:
                        e = "\u9080\u8bf7\u5956\u52b1";
                        break;
                    case ft.type.msg.pos.nationalDay:
                        e = "\u56fd\u5e86\u6d3b\u52a8";
                        break;
                    case ft.type.msg.pos.anniversary:
                        e = "\u5468\u5e74\u5e86\u5178";
                        break;
                    case ft.type.msg.pos.ad:
                        e = "\u5e7f\u544a\u798f\u5229";
                        break;
                    case ft.type.msg.pos.mayDay:
                        e = "\u52b3\u52a8\u8282\u6d3b\u52a8";
                        break;
                    case ft.type.msg.pos.firstCharge:
                        e = "\u9996\u5145\u793c\u5305";
                        break;
                    case ft.type.msg.pos.newYear:
                        e = "\u65b0\u6625\u6d3b\u52a8";
                        break;
                    case ft.type.msg.pos.summer:
                        e = "\u6691\u671f\u6d3b\u52a8";
                        break;
                    case ft.type.msg.pos.guanYu:
                        e = "\u5173\u7fbd\u793c\u5305";
                        break;
                    case ft.type.msg.pos.gameAd:
                        e = "\u5927\u5bb6\u7231\u73a9";
                        break;
                    case ft.type.msg.pos.rank:
                        e = "\u6392\u884c\u699c"
                }
                return e || "\u6d3b\u52a8"
            }, ft.ExtMsg.getUnionMsgs = function (t) {
                var e = Number(this.getType(t));
                if (e === ft.type.activity.monthShop || e === ft.type.activity.snatchTreasureAll) {
                    for (var i = [], a = this.getActivityData(t), n = 0; n < a.activityIds.length; n++) i.push(ftc.ManagerData.get2Object("Msg", a.activityIds[n]));
                    return i
                }
                if (e === ft.type.activity.dailySign) {
                    i = [];
                    var s = this.getMsgByType(ft.type.activity.dailySignSevenDay);
                    return s && i.push(s), i
                }
            }, ft.ExtMsg.getPosIndex = function (t) {
                var e = 0;
                switch (t) {
                    case ft.type.msg.pos.gift:
                        e = 1;
                        break;
                    case ft.type.msg.pos.daily:
                        e = 2;
                        break;
                    case ft.type.msg.pos.limited:
                        e = 5;
                        break;
                    case ft.type.msg.pos.sevenDay:
                        e = 8;
                        break;
                    case ft.type.msg.pos.vip:
                        e = 3;
                        break;
                    case ft.type.msg.pos.total:
                        e = 4;
                        break;
                    case ft.type.msg.pos.focus:
                        e = 12;
                        break;
                    case ft.type.msg.pos.invite:
                        e = 7;
                        break;
                    case ft.type.msg.pos.nationalDay:
                    case ft.type.msg.pos.newYear:
                    case ft.type.msg.pos.anniversary:
                    case ft.type.msg.pos.mayDay:
                    case ft.type.msg.pos.summer:
                        e = 100;
                        break;
                    case ft.type.msg.pos.ad:
                        e = 11;
                        break;
                    case ft.type.msg.pos.firstCharge:
                        e = 10;
                        break;
                    case ft.type.msg.pos.guanYu:
                        e = 9;
                        break;
                    case ft.type.msg.pos.gameAd:
                        e = 14;
                        break;
                    case ft.type.msg.pos.rank:
                        e = 13
                }
                return e
            }), ft.ExtMsg.getTitle = function (t) {
                return ft.ExtMsg.isLocalMsg(t.id) ? ftd.Msg.get(t.id, "title") : t.title
            }, ft.ExtMsg.getIntro = function (t) {
                return ft.ExtMsg.isLocalMsg(t.id) ? ftd.Msg.get(t.id, "intro") : t.intro
            }, ft.ExtMsg.getUIType = function (t) {
                return ft.ExtMsg.isLocalMsg(t.id) ? ftd.Msg.get(t.id, "ui") : t.ui
            }, ft.ExtMsg.getPriority = function (t) {
                return ft.ExtMsg.isLocalMsg(t.id) ? ftd.Msg.get(t.id, "priority") : t.priority
            }, ft.ExtMsg.getMsgAward = function (t) {
                var e;
                if (e = ft.ExtMsg.isLocalMsg(t.id) ? ftd.Msg.get(t.id, "base") : t.base) return JSON.parse(e)
            }, ft.ExtMsg.getBase = function (t) {
                return ft.ExtMsg.isLocalMsg(t.id) ? ftd.Msg.get(t.id, "base") : t.base
            }, ft.ExtMsg.getTxt = function (t) {
                return ft.ExtMsg.isLocalMsg(t.id) ? ftd.Msg.get(t.id, "txt") : t.txt
            }, ft.ExtMsg.isActivity = function (t) {
                return t && t.id
            }, ft.ExtMsg.getActivityData = function (t) {
                if (t) {
                    var e = ft.ExtMsg.getBase(t);
                    if (e) {
                        if (!ft.ExtMsg.isLocalMsg(t.id)) {
                            var i = JSON.parse(e);
                            if (ftc) {
                                var a = ftc.ManagerLan.getLanguage();
                                "zh" != a && i["img_" + a] && (i.img = i["img_" + a])
                            }
                            return i
                        }
                        var n = JSON.parse(e);
                        if (n.ids || n.id2s) {
                            var s = [],
                                o = [],
                                r = {};
                            for (var c in n) o.push(c);
                            var h, f = ft.ExtMsg.getTxt(t);
                            if (f) try {
                                h = JSON.parse(f)
                            } catch (t) {
                                h = f
                            }
                            var d = (n.ids || n.id2s).length;
                            for (c = 0; c < d; c++) {
                                for (var l = {}, u = 0; u < o.length; u++) n[o[u]] instanceof Array ? l[o[u]] = n[o[u]][c] : void 0 === r[o[u]] && (r[o[u]] = n[o[u]]);
                                h && h.txts && (l.txt = h.txts[c]), s.push(l)
                            }
                            return r.items = s, r
                        }
                    }
                }
            }, ft.ExtMsg.getAward = function (t) {
                if ("number" != typeof t || !ftc || (t = ftc.ManagerData.get2Object("Msg")[t])) {
                    var e = [],
                        i = [],
                        a = ft.ExtMsg.getActivityData(t);
                    if (a && a.items.length > 0) {
                        var n, s;
                        a.items[0].ids ? (n = "ids", s = "nums") : (n = "id2s", s = "num2s");
                        for (var o = 0; o < a.items.length; o++) e.push(a.items[o][n]), i.push(a.items[o][s]);
                        return {
                            ids: e,
                            nums: i
                        }
                    }
                }
            }, ft.ExtMsg.getType = function (t) {
                return ft.ExtMsg.isLocalMsg(t.id) ? ftd.Msg.get(t.id, "type") : t.type
            }, ft.ExtMsg.getPos = function (t) {
                return ft.ExtMsg.isLocalMsg(t.id) ? ftd.Msg.get(t.id, "pos") : t.pos
            }, ft.ExtMsg.getWork = function (t) {
                return ftd.Msg.get(t, "c_work")
            }, ft.ExtMsg.isNeedNet = function (t) {
                return !ft.ExtMsg.isLocalMsg(t.id) || 1 === ftd.Msg.get(t.id, "net")
            }, ft.ExtMsg.isLocalMsg = function (t) {
                return !!ftd.Msg.data[t]
            }, ft.ExtMsg.getEventDesc = function (t) {
                var e;
                switch (t) {
                    case ft.type.event.TLXH:
                        e = "\u6d88\u8017\u4f53\u529b:";
                        break;
                    case ft.type.event.WJZM:
                        e = "\u793c\u8d24\u4e0b\u58eb:";
                        break;
                    case ft.type.event.YBXH:
                        e = "\u6d88\u8017\u5143\u5b9d:";
                        break;
                    case ft.type.event.ZDWC:
                        e = "\u5b8c\u6210\u6218\u6597:";
                        break;
                    case ft.type.event.XMRS:
                        e = "\u6d88\u706d\u654c\u519b:";
                        break;
                    case ft.type.event.BSTJ:
                        e = "\u884c\u8d70\u6b65\u6570:";
                        break;
                    case ft.type.event.ZBQH:
                        e = "\u88c5\u5907\u5f3a\u5316:";
                        break;
                    case ft.type.event.WJSJ:
                        e = "\u6b66\u5c06\u5347\u7ea7:";
                        break;
                    case ft.type.event.JBXH:
                        e = "\u94f6\u5e01\u6d88\u8017:";
                        break;
                    case ft.type.event.WCZM:
                        e = "\u5b8c\u6210\u5468\u76ee:";
                        break;
                    case ft.type.event.WCZX:
                        e = "\u5b8c\u6210\u4e3b\u7ebf:";
                        break;
                    case ft.type.event.TZFB:
                        e = "\u6311\u6218\u526f\u672c:";
                        break;
                    case ft.type.event.SYZP:
                        e = "\u4f7f\u7528\u8f6c\u76d8:";
                        break;
                    case ft.type.event.SYCL:
                        e = "\u4f7f\u7528\u7b56\u7565:";
                        break;
                    case ft.type.event.SYJN:
                        e = "\u4f7f\u7528\u6280\u80fd:";
                        break;
                    case ft.type.event.FJTJ:
                        e = "\u4f7f\u7528\u5206\u89e3:";
                        break;
                    case ft.type.event.MRDL:
                        e = "\u6bcf\u65e5\u767b\u5f55:";
                        break;
                    case ft.type.event.CSWJ:
                        e = "\u62e5\u6709\u6a59\u8272\u6b66\u5c06:"
                }
                return e
            }, ft.ExtMsg.isCompleted = function (t) {
                var e = JSON.parse(this.getBase(t));
                return t.ste >= e.conditions.length
            }
        