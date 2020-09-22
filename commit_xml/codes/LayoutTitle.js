
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    nodeRoot: cc.Node,
                    buttonUpgrade: cc.Button,
                    buttonDetail: cc.Button,
                    labelTip: cc.Label,
                    buttonTabs: [cc.Button],
                    buttonClose: cc.Button
                },
                init: function () {
                    this.prepareParts(["PartTitleDecoration", "PartTitleDetail"]), this.addClick(this.buttonUpgrade), this.addClick(this.buttonDetail);
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t], !0);
                    this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    ftc.setTvTip(this.node), ftc.isTv() && (this.buttonDetail.node.active = !1), this.partTitles = [];
                    var t = this.newPart("PartTitleDetail");
                    this.nodeRoot.addChild(t.node), this.partTitles.push(t), t = this.newPart("PartTitleDecoration"), this.nodeRoot.addChild(t.node), this.partTitles.push(t), this.selectTab(0);
                    var e = 0,
                        i = ftc.ManagerData.get2("Title");
                    for (var a in i) e += ft.ExtTitle.getExp(i[a].id);
                    this.sumExp = e, this.maxLevel = ft.ExtTitle.getMaxLevel(ftc.ManagerData.get2("Title")), this.updateData(), ftc.setTvTip(this.node, "【返回键】关闭界面，【菜单键】切换标签")
                },
                setData: function (t) { },
                selectTab: function (t) {
                    this.tableIndex = t;
                    for (var e = 0; e < this.buttonTabs.length; e++) this.buttonTabs[e].interactable = t !== e, this.buttonTabs[e].node.getChildByName("labelTab").color = t !== e ? ftc.newColor(ftc.value.color.tabNormal) : ftc.newColor(ftc.value.color.tabPressed), this.buttonTabs[e].node.getChildByName("labelTab").getComponent(cc.LabelOutline).color = t !== e ? ftc.newColor(ftc.value.color.tabNormalOutline) : ftc.newColor(ftc.value.color.tabPressedOutline), this.partTitles[e].node.active = t === e;
                    ftc.ManagerTV.nextSelect()
                },
                enter: function () { },
                updateData: function () {
                    var t = ftc.ManagerData.get1("ManagerTitle").level,
                        e = ft.ExtTitle.getNextExp(t);
                    this.labelTip.string = e > 0 ? ftc.language("总经验:") + this.sumExp + "/" + e : ftc.language("总经验:") + this.sumExp, this.buttonUpgrade.node.active = this.maxLevel > t
                },
                updateTitle: function () {
                    ftc.sendClient("c_updateRoleMapTitle", void 0, "LayoutMain"), this.partTitles[0].updateData(), this.partTitles[1].updateData()
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectTitleItem: function (t, e) {
                            this.partTitles[0].updateData(t)
                        },
                        c_onSelectDecorationItem: function (t, e) {
                            this.partTitles[1].updateData(t)
                        },
                        titleSet: function (t, e) {
                            0 === t ? (ftc.showTip("设置成功"), ftc.playEffect(ftc.type.effect.title_set), this.updateTitle()) : ftc.showTip("设置失败")
                        },
                        titleUnload: function (t, e) {
                            0 === t ? (ftc.showTip("卸下成功"), this.updateTitle()) : ftc.showTip("卸下失败")
                        },
                        titleLevelUp: function (t, e) {
                            0 === t ? (ftc.showTip("升级成功"), ftc.playEffect(ftc.type.effect.title_lvUp), this.updateData(), this.updateTitle()) : ftc.showTip("升级失败")
                        },
                        decorationSet: function (t, e) {
                            0 === t ? (ftc.showTip("设置成功"), this.updateData(), this.updateTitle()) : ftc.showTip("设置失败")
                        }
                    }
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonUpgrade.node) ftc.send("titleLevelUp");
                    else if (t.target === this.buttonDetail.node) ftc.showDetailInfo(t.target, ft.ExtDetail.getInfo(ft.value.detail.setting_title));
                    else if (t.target === this.buttonClose.node) this.cancel();
                    else
                        for (var i = 0; i < this.buttonTabs.length; i++)
                            if (t.target === this.buttonTabs[i].node) {
                                this.selectTab(i);
                                break
                            }
                },
                onKeyMenu: function (t) {
                    if (!t) return this.tableIndex++, this.tableIndex >= this.buttonTabs.length && (this.tableIndex = 0), this.selectTab(this.tableIndex), !0
                }
            })
        