
            
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
                            0 !== t && ftc.showTip("领取奖励失败")
                        }
                    }
                },
                selectTab: function (t) {
                    this.tabIndex = t;
                    for (var e = 0; e < this.buttonTabs.length; e++) this.buttonTabs[e].interactable = t !== e, this.buttonTabs[e].node.getChildByName("labelTab").color = t !== e ? ftc.newColor(ftc.value.color.tabNormal) : ftc.newColor(ftc.value.color.tabPressed), this.buttonTabs[e].node.getChildByName("labelTab").getComponent(cc.LabelOutline).color = t !== e ? ftc.newColor(ftc.value.color.tabNormalOutline) : ftc.newColor(ftc.value.color.tabPressedOutline);
                    this.setPageSprite(this.tabIndex), this.pageView.scrollToPage(0), this.setPageTip(this.pageView), 0 === this.tabIndex ? (this.labelTxt0.string = "按右边图片指引，将", this.labelTxt.string = "添加到您的小程序，即可获得如下奖励") : 1 === this.tabIndex ? (this.labelTxt0.string = "按右边图片指引，关注", this.labelTxt.string = "公众号，通过公众号打开游戏即可领取奖励。") : 2 === this.tabIndex && (this.labelTxt0.string = "按右边图片指引，将", this.labelTxt.string = "添加至您的手机桌面，通过桌面图标打开游戏即可领取奖励"), ftc.ManagerRes.restoreNodeChildren(this.nodeLayoutAward);
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
                            this.labelTip.string = "点击右上角三个点，再点击“添加到我的小程序”";
                            break;
                        case 1:
                            this.labelTip.string = "点击右上角关闭圈圈，回到微信首页。";
                            break;
                        case 2:
                            this.labelTip.string = "微信首页下滑找到“我的小程序”进入游戏领取奖励"
                    } else if (1 === this.tabIndex) switch (e) {
                        case 0:
                            this.labelTip.string = "点击右上角三个点，再点击“三国演义吞噬无界”头像";
                            break;
                        case 1:
                            this.labelTip.string = "点击“该团队的相关公众号”，选择《三国演义吞噬无界》并关注";
                            break;
                        case 2:
                            this.labelTip.string = "点击右下角“小程序”，点击进入《三国演义吞噬无界》领取奖励", i = cc.v2(-97, -151)
                    } else if (2 === this.tabIndex) switch (e) {
                        case 0:
                            this.labelTip.string = "点击右上角三个点，再点击“添加到桌面”", i = cc.v2(-97, -151);
                            break;
                        case 1:
                            this.labelTip.string = "为微信打开“创建桌面快捷方式”的权限，点击右上角三个点，完成桌面快捷添加", i = cc.v2(-97, -181);
                            break;
                        case 2:
                            this.labelTip.string = "从手机桌面，点开“三国演义吞噬无界”领取奖励", i = cc.v2(-97, -151)
                    }
                    this.labelTip.string.length > 20 ? (this.labelTip.overflow = cc.Label.Overflow.RESIZE_HEIGHT, this.labelTip.node.width = 388, this.labelTip.node.parent.height = 80, this.labelTip.node.getComponent(cc.Widget).updateAlignment()) : (this.labelTip.overflow = cc.Label.Overflow.NONE, this.labelTip.node.parent.height = 49, this.labelTip.node.getComponent(cc.Widget).updateAlignment()), this.spriteGirl.node.position = i
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonGet.node) {
                        var i = !1;
                        this.id === ft.value.msg.focus ? i = ftc.ManagerH5.enterFromMiniProgram() : this.id === ft.value.msg.focusPublic ? i = ftc.ManagerH5.enterFromPublic() : this.id === ft.value.msg.focusDesktop && (i = ftc.ManagerH5.enterFromDesktop()), i ? (ftc.ManagerH5.countEvent("11_" + this.tabIndex), ftc.send("msgFocusGet", this.id)) : ftc.showTip("请按右侧指示完成操作后再来领取奖励")
                    } else if (t.target === this.buttonClose.node) this.cancel();
                    else
                        for (var a = 0; a < this.buttonTabs.length; a++)
                            if (t.target === this.buttonTabs[a].node) {
                                this.selectTab(a);
                                break
                            }
                }
            })
        