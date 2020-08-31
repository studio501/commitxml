
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    buttonSelf: cc.Button,
                    spriteIcon: cc.Sprite,
                    spineIcon: sp.Skeleton,
                    spriteRedPoint: cc.Sprite,
                    labelName: cc.Label,
                    labelInfo: cc.Label
                },
                init: function () {
                    this.addClick(this.buttonSelf), ftc.isTv() && (this.node.width = 86, this.node.height = 95)
                },
                load: function () {
                    this.node.active = !0, this.spineIcon.node.active = !1, this.spriteRedPoint.node.active = !1, this.labelInfo.node.active = !1, this._tickGuanYu = 0
                },
                setData: function (t) {
                    if ((this.pos = t, this.spriteIcon.node.active = !0, this.spriteIcon.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "activity_pos" + this.pos), this.labelName.string = ftc.language(ft.ExtMsg.getPosTitle(this.pos)), this.pos === ft.type.msg.pos.ad) && (this.node.active = !1, "1" == ftc.callNativeFunction("openFullAd") && ftc.localDay > 0)) {
                        var e = ftc.ManagerData.get2Object("Msg", ft.value.msg.watchAd);
                        e ? e.ste > 0 && (this._isShowAd = !0, this.labelInfo.string = ftc.language("\u5269\u4f59\u6b21\u6570:") + e.ste) : (ftc.send("msgActivityAdd", ft.value.msg.watchAd), this._isShowAd = !0, this.labelInfo.string = ftc.language("\u5269\u4f59\u6b21\u6570:") + 5), this.labelInfo.node.active = !0, this.node.active = !0
                    }
                },
                cleanup: function () { },
                updateData: function () { },
                updateActive: function () {
                    var t = ftc.ManagerData.get2Object("Item");
                    if (t[ft.value.func.activity] && !t[ft.value.disable.activity]) {
                        var e = ftc.ManagerH5.isH5(),
                            i = this.pos,
                            a = !0;
                        switch (i) {
                            case ft.type.msg.pos.gift:
                            case ft.type.msg.pos.daily:
                            case ft.type.msg.pos.vip:
                            case ft.type.msg.pos.limited:
                                break;
                            case ft.type.msg.pos.anniversary:
                            case ft.type.msg.pos.nationalDay:
                            case ft.type.msg.pos.mayDay:
                            case ft.type.msg.pos.newYear:
                            case ft.type.msg.pos.summer:
                                (a = ft.ExtMsg.getMsgDatas(i).length > 0) && (this.spineIcon.node.active = -1 !== ftc.ManagerData.get1("ManagerMsg").posTips.indexOf(i + ""));
                                break;
                            case ft.type.msg.pos.sevenDay:
                                a = ftc.ManagerData.get2Object("Msg", ft.value.msg.sevenDay);
                                break;
                            case ft.type.msg.pos.total:
                                a = ftc.ManagerData.get2Object("Msg", ft.value.msg.giftTotal);
                                break;
                            case ft.type.msg.pos.focus:
                                var n = ft.ExtMsg.getFocusSte();
                                a = n >= 1, this.spriteRedPoint.node.active = n >= 2;
                                break;
                            case ft.type.msg.pos.invite:
                                var s = ftc.ManagerData.get2Object("Msg", ft.value.msg.invite);
                                (a = !!s && "1" == ftc.callNativeFunction("isOpenInvite")) && (this.spriteRedPoint.node.active = ftc.ManagerData.get1("ManagerMsg").inviteCount > Number(s.ext));
                                break;
                            case ft.type.msg.pos.ad:
                                if (e || (ftc.haveFullAd = "0" === ftc.callNativeFunction("getFullAdState")), this._isShowAd && ftc.haveFullAd) {
                                    var o = ftc.ManagerData.get2Object("Msg", ft.value.msg.watchAd);
                                    o && 0 == o.ste ? a = !1 : (a = !0, this.labelInfo.string = ftc.language("\u5269\u4f59\u6b21\u6570:") + (o ? o.ste : 5))
                                } else a = !1;
                                break;
                            case ft.type.msg.pos.firstCharge:
                                a = !!ftc.ManagerData.get2Object("Msg", ft.value.msg.firstCharge);
                                break;
                            case ft.type.msg.pos.guanYu:
                                var r = ftc.ManagerData.get2Object("Msg", ft.value.msg.guanYu);
                                r ? (this._tickGuanYu = r.ext - ft.getSysSecond(), this._tickGuanYu <= 0 ? (a = !1, ftc.send("msgDelete", r.entityId)) : (this.labelInfo.node.active = !0, a = !0)) : a = !1;
                                break;
                            case ft.type.msg.pos.gameAd:
                                a = "1" == ftc.ManagerH5.isOpenGamePortalAd();
                                break;
                            case ft.type.msg.pos.rank:
                                a = "1" == ftc.ManagerH5.openRank() && !ft.ExtMsg.isExclude(ft.value.msg.rank)
                        }
                        this.node.active = a
                    } else this.node.active = !1
                },
                updateRedPoint: function () {
                    if (this.node.active)
                        if (this.pos === ft.type.msg.pos.limited) this.spriteRedPoint.node.active = ft.ExtMsg.checkCanGetByPos(this.pos) || ft.ExtMsg.checkCanGetByPos(ft.type.msg.pos.limited_month) || ft.ExtMsg.checkCanGetByPos(ft.type.msg.pos.limited_gift);
                        else if (this.pos === ft.type.msg.pos.sevenDay) {
                            for (var t = !1, e = ft.ExtMsg.getMsgDatas(ft.type.msg.pos.sevenDay), i = ftc.ManagerData.get1("ManagerMsg").sevenDayStart, a = ft.getSysDay(), n = 0; n < e.length; n++) {
                                var s = ft.ExtMsg.getPriority(e[n]);
                                if (!(a >= i + (Math.floor(s / 10) - 1))) break;
                                if (ft.ExtMsg.checkCanGet(e[n])) {
                                    t = !0;
                                    break
                                }
                            }
                            this.spriteRedPoint.node.active = t
                        } else this.spriteRedPoint.node.active = ft.ExtMsg.checkCanGetByPos(this.pos)
                },
                tick: function (t) {
                    if (this._tickGuanYu > 0) {
                        var e = ft.prefixZeroTime(Math.floor(this._tickGuanYu / 3600)),
                            i = ft.prefixZeroTime(Math.floor(this._tickGuanYu / 60 % 60)),
                            a = ft.prefixZeroTime(Math.floor(this._tickGuanYu % 60));
                        this.labelInfo.string = e + ":" + i + ":" + a, this._tickGuanYu -= t
                    }
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonSelf.node) {
                        var i = this.pos;
                        switch (i) {
                            case ft.type.msg.pos.gift:
                                var a = ft.ExtMsg.getMsgDatas(ft.type.msg.pos.gift);
                                a && a.length > 0 ? ftc.loadLayout("LayoutActivity", function (t) {
                                    t.setData(ft.type.msg.pos.gift)
                                }, {
                                    hide: !0
                                }) : ftc.showTip("\u6682\u65e0\u6d3b\u52a8");
                                break;
                            case ft.type.msg.pos.daily:
                            case ft.type.msg.pos.vip:
                                ftc.localDay <= 0 ? ftc.showTip("\u8fde\u63a5\u7f51\u7edc\u83b7\u53d6\u66f4\u591a\u6d3b\u52a8\u6570\u636e") : ftc.loadLayout("LayoutActivity", function (t) {
                                    t.setData(i)
                                }, {
                                    hide: !0
                                });
                                break;
                            case ft.type.msg.pos.limited:
                                ftc.loadLayout("LayoutActivity", function (t) {
                                    t.selectTab(0, void 0, !0)
                                }, {
                                    hide: !0,
                                    resName: "LayoutActivityLimited"
                                });
                                break;
                            case ft.type.msg.pos.sevenDay:
                                ftc.localDay <= 0 ? ftc.showTip("\u8fde\u63a5\u7f51\u7edc\u83b7\u53d6\u66f4\u591a\u6d3b\u52a8\u6570\u636e") : ftc.loadLayout("LayoutActivitySevenDay", void 0, {
                                    hide: !0
                                });
                                break;
                            case ft.type.msg.pos.total:
                                ftc.loadLayout("LayoutActivity", function (t) {
                                    t.setData(ft.type.msg.pos.total)
                                }, {
                                    hide: !0
                                });
                                break;
                            case ft.type.msg.pos.focus:
                                ftc.loadLayout("LayoutActivityFocus");
                                break;
                            case ft.type.msg.pos.invite:
                                ftc.loadLayout("LayoutActivityInvite");
                                break;
                            case ft.type.msg.pos.nationalDay:
                                ftc.localDay <= 0 ? ftc.showTip("\u8fde\u63a5\u7f51\u7edc\u83b7\u53d6\u66f4\u591a\u6d3b\u52a8\u6570\u636e") : ftc.loadLayout("LayoutActivityNationDay", void 0, {
                                    hide: !0
                                });
                                break;
                            case ft.type.msg.pos.ad:
                                ftc.loadLayout("LayoutDialogTipAd"), ftc.ManagerH5.countEvent("8_1");
                                break;
                            case ft.type.msg.pos.mayDay:
                            case ft.type.msg.pos.newYear:
                            case ft.type.msg.pos.anniversary:
                            case ft.type.msg.pos.summer:
                                ftc.localDay <= 0 ? ftc.showTip("\u8fde\u63a5\u7f51\u7edc\u83b7\u53d6\u66f4\u591a\u6d3b\u52a8\u6570\u636e") : (this.spineIcon.node.active && (this.spineIcon.node.active = !1, ftc.send("msgDelPosTip", i)), ftc.loadLayout("LayoutActivity", function (t) {
                                    t.setData(i)
                                }, {
                                    hide: !0
                                }));
                                break;
                            case ft.type.msg.pos.firstCharge:
                                ftc.localDay <= 0 ? ftc.showTip("\u8fde\u63a5\u7f51\u7edc\u83b7\u53d6\u66f4\u591a\u6d3b\u52a8\u6570\u636e") : ftc.loadLayout("LayoutActivityFirstCharge", function (t) {
                                    t.setData(ft.type.msg.pos.firstCharge)
                                });
                                break;
                            case ft.type.msg.pos.guanYu:
                                ftc.loadLayout("LayoutActivity", function (t) {
                                    t.setData(ft.type.msg.pos.limited, ft.type.activity.limitedGuanYu)
                                }, {
                                    hide: !0
                                });
                                break;
                            case ft.type.msg.pos.gameAd:
                                ftc.ManagerH5.showPortalAd();
                                break;
                            case ft.type.msg.pos.rank:
                                ftc.loadLayout("LayoutRank")
                        }
                    }
                }
            })
        