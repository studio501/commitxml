
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    partSettingInfo: t("PartSettingInfo"),
                    partSettingExchange: t("PartSettingExchange"),
                    partSetting: t("PartSetting"),
                    nodeTabs: cc.Node,
                    buttonTabs: [cc.Button]
                },
                init: function () {
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t], !0)
                },
                load: function () {
                    this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("设置"), this.node.addChild(this.partTopStatus.node), ftc.setTvTip(this.node, "【返回键】关闭界面，【菜单键】切换标签");
                    var t = ftc.ManagerData.get1("ManagerMsg").excludeMsg,
                        e = t && t.length > 0 ? t.split(",") : [];
                    ftc.localDay <= 0 || -1 !== e.indexOf(ft.type.activity.exchangeCode.toString()) ? (this.buttonTabs[2].node.active = !1, this.partSettingExchange.node.active = !1) : (this.buttonTabs[2].node.active = !0, this.partSettingExchange.updateData()), this.partSettings = [this.partSettingInfo, this.partSetting, this.partSettingExchange];
                    for (var i = 0; i < this.partSettings.length; i++) this.initPart(this.partSettings[i]);
                    this.selectTab(0)
                },
                setData: function (t) { },
                enter: function () {
                    this.updateData()
                },
                updateData: function () {
                    this.partTopStatus.updateData(), this.partSettingInfo && this.partSettingInfo.updateData()
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        mapSetSkin: function (t, e) {
                            0 === t ? (ftc.showTip("设置成功"), this.partSettingInfo.updateData()) : ftc.showTip("主公不存在")
                        },
                        openBGMusic: function (t, e) {
                            this.partSetting.openBGMusic(t, e)
                        },
                        openEffect: function (t, e) {
                            this.partSetting.openEffect(t, e)
                        },
                        openAdBox: function (t, e) {
                            this.partSetting.openAdBox(t, e)
                        },
                        openKeyDir: function (t, e) {
                            this.partSetting.openKeyDir(t, e)
                        },
                        getPlayer: function (t, e) {
                            t.type == ft.type.http.UseCdkey ? (ftc.cancelWait(), t.ste || this.cancel(), t.txt && ftc.showTip(t.txt)) : t.type == ft.type.http.ModifyNick ? this.partSettingInfo && this.partSettingInfo.updateData() : ftc.throwMsg("getPlayer", t, e)
                        }
                    }
                },
                selectTab: function (t) {
                    for (var e = [ftc.type.tab.setting_info, ftc.type.tab.setting_setting, ftc.type.tab.setting_code], i = 0; i < this.buttonTabs.length; i++) this.buttonTabs[i].node.active && (this.buttonTabs[i].interactable = i !== t, this.buttonTabs[i].node.getChildByName("spriteTabIcon").getComponent(cc.Sprite).spriteFrame = ftc.getTabSpriteFrame(e[i], t === i), this.buttonTabs[i].node.getChildByName("labelTab").color = t !== i ? ftc.newColor(ftc.value.color.tabNormal) : ftc.newColor(ftc.value.color.tabPressed), this.buttonTabs[i].node.getChildByName("labelTab").getComponent(cc.LabelOutline).color = t !== i ? ftc.newColor(ftc.value.color.tabNormalOutline) : ftc.newColor(ftc.value.color.tabPressedOutline), this.partSettings[i] && (this.partSettings[i].node.active = i === t));
                    this.tabIndex = t, ftc.ManagerTV.nextFrameSelect()
                },
                onClick: function (t, e) {
                    for (var i = 0; i < this.buttonTabs.length; i++)
                        if (t.target === this.buttonTabs[i].node) {
                            this.selectTab(i);
                            break
                        }
                },
                onKeyMenu: function (t) {
                    if (!t) {
                        for (var e = this.tabIndex;
                            (e += 1) >= this.buttonTabs.length && (e = 0), !this.buttonTabs[e].node || !this.buttonTabs[e].node.active;);
                        return this.selectTab(e), !0
                    }
                }
            })
        