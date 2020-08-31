
            
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
                    this.sumExp = e, this.maxLevel = ft.ExtTitle.getMaxLevel(ftc.ManagerData.get2("Title")), this.updateData(), ftc.setTvTip(this.node, "\u3010\u8fd4\u56de\u952e\u3011\u5173\u95ed\u754c\u9762\uff0c\u3010\u83dc\u5355\u952e\u3011\u5207\u6362\u6807\u7b7e")
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
                    this.labelTip.string = e > 0 ? ftc.language("\u603b\u7ecf\u9a8c:") + this.sumExp + "/" + e : ftc.language("\u603b\u7ecf\u9a8c:") + this.sumExp, this.buttonUpgrade.node.active = this.maxLevel > t
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
                            0 === t ? (ftc.showTip("\u8bbe\u7f6e\u6210\u529f"), ftc.playEffect(ftc.type.effect.title_set), this.updateTitle()) : ftc.showTip("\u8bbe\u7f6e\u5931\u8d25")
                        },
                        titleUnload: function (t, e) {
                            0 === t ? (ftc.showTip("\u5378\u4e0b\u6210\u529f"), this.updateTitle()) : ftc.showTip("\u5378\u4e0b\u5931\u8d25")
                        },
                        titleLevelUp: function (t, e) {
                            0 === t ? (ftc.showTip("\u5347\u7ea7\u6210\u529f"), ftc.playEffect(ftc.type.effect.title_lvUp), this.updateData(), this.updateTitle()) : ftc.showTip("\u5347\u7ea7\u5931\u8d25")
                        },
                        decorationSet: function (t, e) {
                            0 === t ? (ftc.showTip("\u8bbe\u7f6e\u6210\u529f"), this.updateData(), this.updateTitle()) : ftc.showTip("\u8bbe\u7f6e\u5931\u8d25")
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
        