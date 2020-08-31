
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonTabs: [cc.Button],
                    spriteRedPoints: [cc.Sprite],
                    spriteLeftBg: cc.Sprite,
                    labelTxt0: cc.Label,
                    labelTxt: cc.Label,
                    nodeLayoutAward: cc.Node,
                    pageView: cc.PageView,
                    indicator: t("PageViewIndicatorCustom"),
                    spritePages: [cc.Sprite],
                    spriteGirl: cc.Sprite,
                    labelTip: cc.Label,
                    buttonGet: cc.Button,
                    spriteGet: cc.Sprite,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonGet), this.addClick(this.buttonClose);
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t]);
                    this.pageView.indicator = this.indicator, this.pageView.node.on("page-turning", this.setPageTip, this)
                },
                load: function () {
                    this.tabIndex = 0, this.setData()
                },
                setData: function (t) {
                    var e = [];
                    e.push(ftc.ManagerH5.isOpenMiniProgram()), e.push(ftc.ManagerH5.isOpenPublic()), e.push(ftc.ManagerH5.isOpenDesktop());
                    for (var i = 0; i < e.length; i++) this.buttonTabs[i].node.active = 1 == e[i];
                    this.selectTab(0)
                },
                enter: function () { },
                updateData: function () {
                    var t = ftc.ManagerData.get1("ManagerMsg"),
                        e = [];
                    e.push(ftc.ManagerH5.enterFromMiniProgram()), e.push(ftc.ManagerH5.enterFromPublic()), e.push(ftc.ManagerH5.enterFromDesktop());
                    for (var i = [t.focusSte, t.focusPublicSte, t.focusDesktopSte], a = 0; a < i.length; a++) this.spriteRedPoints[a].node.active = 0 == i[a] && e[a];
                    var n = i[this.tabIndex];
                    this.buttonGet.node.active = 1 != n, this.spriteGet.node.active = 1 == n
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        msgFocusGet: function (t, e) {
                            0 !== t && ftc.showTip("\u9886\u53d6\u5956\u52b1\u5931\u8d25")
                        }
                    }
                },
                selectTab: function (t) {
                    this.tabIndex = t;
                    for (var e = 0; e < this.buttonTabs.length; e++) this.buttonTabs[e].interactable = t !== e, this.buttonTabs[e].node.getChildByName("labelTab").color = t !== e ? ftc.newColor(ftc.value.color.tabNormal) : ftc.newColor(ftc.value.color.tabPressed), this.buttonTabs[e].node.getChildByName("labelTab").getComponent(cc.LabelOutline).color = t !== e ? ftc.newColor(ftc.value.color.tabNormalOutline) : ftc.newColor(ftc.value.color.tabPressedOutline);
                    this.setPageSprite(this.tabIndex), this.pageView.scrollToPage(0), this.setPageTip(this.pageView), 0 === this.tabIndex ? (this.labelTxt0.string = "\u6309\u53f3\u8fb9\u56fe\u7247\u6307\u5f15\uff0c\u5c06", this.labelTxt.string = "\u6dfb\u52a0\u5230\u60a8\u7684\u5c0f\u7a0b\u5e8f\uff0c\u5373\u53ef\u83b7\u5f97\u5982\u4e0b\u5956\u52b1") : 1 === this.tabIndex ? (this.labelTxt0.string = "\u6309\u53f3\u8fb9\u56fe\u7247\u6307\u5f15\uff0c\u5173\u6ce8", this.labelTxt.string = "\u516c\u4f17\u53f7\uff0c\u901a\u8fc7\u516c\u4f17\u53f7\u6253\u5f00\u6e38\u620f\u5373\u53ef\u9886\u53d6\u5956\u52b1\u3002") : 2 === this.tabIndex && (this.labelTxt0.string = "\u6309\u53f3\u8fb9\u56fe\u7247\u6307\u5f15\uff0c\u5c06", this.labelTxt.string = "\u6dfb\u52a0\u81f3\u60a8\u7684\u624b\u673a\u684c\u9762\uff0c\u901a\u8fc7\u684c\u9762\u56fe\u6807\u6253\u5f00\u6e38\u620f\u5373\u53ef\u9886\u53d6\u5956\u52b1"), ftc.ManagerRes.restoreNodeChildren(this.nodeLayoutAward);
                    var i = [51, 53, 54];
                    this.id = i[t];
                    var a = JSON.parse(ftd.Msg.get(i[t], "base", !0));
                    for (e = 0; e < a.ids.length; e++) {
                        var n = this.newPart("PartItem");
                        n.setData(a.ids[e], a.nums[e]), n.node.scale = .7, this.nodeLayoutAward.addChild(n.node, e)
                    }
                    this.updateData(), ftc.ManagerH5.countEvent("10_" + this.tabIndex)
                },
                setPageSprite: function (t) {
                    var e = "h5/focus_bg" + [2, 1, 2][t];
                    ftc.ManagerRes.loadResource(e, cc.SpriteFrame, function (t) {
                        t && (this.spriteLeftBg.spriteFrame = t)
                    }.bind(this), this), this.loadPageSprite(t, 0), this.loadPageSprite(t, 1), this.loadPageSprite(t, 2)
                },
                loadPageSprite: function (t, e) {
                    var i = "h5/focus_" + (t + 1) + "_" + (e + 1);
                    ftc.ManagerRes.loadResource(i, cc.SpriteFrame, function (t) {
                        t && (this.spritePages[e].spriteFrame = t)
                    }.bind(this), this)
                },
                setPageTip: function (t) {
                    var e = t.getCurrentPageIndex(),
                        i = cc.v2(-97, -130);
                    if (0 === this.tabIndex) switch (e) {
                        case 0:
                            this.labelTip.string = "\u70b9\u51fb\u53f3\u4e0a\u89d2\u4e09\u4e2a\u70b9\uff0c\u518d\u70b9\u51fb\u201c\u6dfb\u52a0\u5230\u6211\u7684\u5c0f\u7a0b\u5e8f\u201d";
                            break;
                        case 1:
                            this.labelTip.string = "\u70b9\u51fb\u53f3\u4e0a\u89d2\u5173\u95ed\u5708\u5708\uff0c\u56de\u5230\u5fae\u4fe1\u9996\u9875\u3002";
                            break;
                        case 2:
                            this.labelTip.string = "\u5fae\u4fe1\u9996\u9875\u4e0b\u6ed1\u627e\u5230\u201c\u6211\u7684\u5c0f\u7a0b\u5e8f\u201d\u8fdb\u5165\u6e38\u620f\u9886\u53d6\u5956\u52b1"
                    } else if (1 === this.tabIndex) switch (e) {
                        case 0:
                            this.labelTip.string = "\u70b9\u51fb\u53f3\u4e0a\u89d2\u4e09\u4e2a\u70b9\uff0c\u518d\u70b9\u51fb\u201c\u4e09\u56fd\u6f14\u4e49\u541e\u566c\u65e0\u754c\u201d\u5934\u50cf";
                            break;
                        case 1:
                            this.labelTip.string = "\u70b9\u51fb\u201c\u8be5\u56e2\u961f\u7684\u76f8\u5173\u516c\u4f17\u53f7\u201d\uff0c\u9009\u62e9\u300a\u4e09\u56fd\u6f14\u4e49\u541e\u566c\u65e0\u754c\u300b\u5e76\u5173\u6ce8";
                            break;
                        case 2:
                            this.labelTip.string = "\u70b9\u51fb\u53f3\u4e0b\u89d2\u201c\u5c0f\u7a0b\u5e8f\u201d\uff0c\u70b9\u51fb\u8fdb\u5165\u300a\u4e09\u56fd\u6f14\u4e49\u541e\u566c\u65e0\u754c\u300b\u9886\u53d6\u5956\u52b1", i = cc.v2(-97, -151)
                    } else if (2 === this.tabIndex) switch (e) {
                        case 0:
                            this.labelTip.string = "\u70b9\u51fb\u53f3\u4e0a\u89d2\u4e09\u4e2a\u70b9\uff0c\u518d\u70b9\u51fb\u201c\u6dfb\u52a0\u5230\u684c\u9762\u201d", i = cc.v2(-97, -151);
                            break;
                        case 1:
                            this.labelTip.string = "\u4e3a\u5fae\u4fe1\u6253\u5f00\u201c\u521b\u5efa\u684c\u9762\u5feb\u6377\u65b9\u5f0f\u201d\u7684\u6743\u9650\uff0c\u70b9\u51fb\u53f3\u4e0a\u89d2\u4e09\u4e2a\u70b9\uff0c\u5b8c\u6210\u684c\u9762\u5feb\u6377\u6dfb\u52a0", i = cc.v2(-97, -181);
                            break;
                        case 2:
                            this.labelTip.string = "\u4ece\u624b\u673a\u684c\u9762\uff0c\u70b9\u5f00\u201c\u4e09\u56fd\u6f14\u4e49\u541e\u566c\u65e0\u754c\u201d\u9886\u53d6\u5956\u52b1", i = cc.v2(-97, -151)
                    }
                    this.labelTip.string.length > 20 ? (this.labelTip.overflow = cc.Label.Overflow.RESIZE_HEIGHT, this.labelTip.node.width = 388, this.labelTip.node.parent.height = 80, this.labelTip.node.getComponent(cc.Widget).updateAlignment()) : (this.labelTip.overflow = cc.Label.Overflow.NONE, this.labelTip.node.parent.height = 49, this.labelTip.node.getComponent(cc.Widget).updateAlignment()), this.spriteGirl.node.position = i
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonGet.node) {
                        var i = !1;
                        this.id === ft.value.msg.focus ? i = ftc.ManagerH5.enterFromMiniProgram() : this.id === ft.value.msg.focusPublic ? i = ftc.ManagerH5.enterFromPublic() : this.id === ft.value.msg.focusDesktop && (i = ftc.ManagerH5.enterFromDesktop()), i ? (ftc.ManagerH5.countEvent("11_" + this.tabIndex), ftc.send("msgFocusGet", this.id)) : ftc.showTip("\u8bf7\u6309\u53f3\u4fa7\u6307\u793a\u5b8c\u6210\u64cd\u4f5c\u540e\u518d\u6765\u9886\u53d6\u5956\u52b1")
                    } else if (t.target === this.buttonClose.node) this.cancel();
                    else
                        for (var a = 0; a < this.buttonTabs.length; a++)
                            if (t.target === this.buttonTabs[a].node) {
                                this.selectTab(a);
                                break
                            }
                }
            })
        