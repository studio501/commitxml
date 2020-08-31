
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    listView: ftc.ListView,
                    spriteHeader: cc.Sprite,
                    spriteHeaderFrame: cc.Sprite,
                    labelInfo: cc.Label,
                    buttonEnable: cc.Button,
                    buttonTabs: [cc.Button],
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonEnable, !0);
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t], !0);
                    this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    ftc.setTvTip(this.node, "\u3010\u8fd4\u56de\u952e\u3011\u5173\u95ed\u754c\u9762\uff0c\u3010\u83dc\u5355\u952e\u3011\u5207\u6362\u6807\u7b7e\uff0c\u3010\u786e\u5b9a\u952e\u3011\u542f\u7528"), this.id = void 0;
                    var t = ftc.ManagerData.get1("ManagerDecoration");
                    this.spriteHeader.spriteFrame = ft.ExtDecoration.getSpriteFrame(t.headerId), this.spriteHeaderFrame.spriteFrame = ft.ExtDecoration.getSpriteFrame(t.headerFrameId), this.labelInfo.string = ft.ExtDecoration.getInfo(t.headerId), this.selectTab(0)
                },
                setData: function () { },
                updateTv: function (t) {
                    t && ftc.ManagerTV.nextSelect(this.listView.getItem(0).buttonSelf)
                },
                enter: function () { },
                updateData: function () {
                    var t = !1;
                    t = this.type === ft.type.decoration.header ? ftc.ManagerData.get1("ManagerDecoration").headerId == this.id : ftc.ManagerData.get1("ManagerDecoration").headerFrameId == this.id, this.buttonEnable.node.getChildByName("Label").getComponent(cc.Label).string = t ? "\u542f\u7528\u4e2d" : "\u542f\u7528", this.buttonEnable.interactable = !t
                },
                tick: function (t) { },
                cleanup: function () { },
                selectTab: function (t) {
                    this.tabIndex = t;
                    for (var e = 0; e < this.buttonTabs.length; e++) this.buttonTabs[e].interactable = t !== e, this.buttonTabs[e].node.getChildByName("labelTab").color = t !== e ? ftc.newColor(ftc.value.color.tabNormal) : ftc.newColor(ftc.value.color.tabPressed), this.buttonTabs[e].node.getChildByName("labelTab").getComponent(cc.LabelOutline).color = t !== e ? ftc.newColor(ftc.value.color.tabNormalOutline) : ftc.newColor(ftc.value.color.tabPressedOutline);
                    this.type = 0 === t ? ft.type.decoration.header : ft.type.decoration.headerFrame;
                    var i, a = ft.ExtDecoration.getDatas(this.type),
                        n = ftc.ManagerData.get1("ManagerDecoration");
                    this.type === ft.type.decoration.header ? (i = a.indexOf(n.headerId), this.spriteHeaderFrame.spriteFrame = ft.ExtDecoration.getIconSprite(n.headerFrameId)) : (i = a.indexOf(n.headerFrameId), 0 == ft.ExtDecoration.getImg(n.headerId) ? this.spriteHeader.spriteFrame = ft.ExtHero.getIconSprite(ftc.ManagerData.get1("ManagerHero").commander0) : this.spriteHeader.spriteFrame = ft.ExtDecoration.getIconSprite(n.headerId)), -1 === i && (i = 0), this.listView.setListView(a, i), this.setHeaderInfo(a[i]), this.updateTv(a.length)
                },
                setHeaderInfo: function (t) {
                    this.id = t, this.type === ft.type.decoration.header ? 0 == ft.ExtDecoration.getImg(this.id) ? this.spriteHeader.spriteFrame = ft.ExtHero.getIconSprite(ftc.ManagerData.get1("ManagerHero").commander0) : this.spriteHeader.spriteFrame = ft.ExtDecoration.getIconSprite(this.id) : this.spriteHeaderFrame.spriteFrame = ft.ExtDecoration.getIconSprite(this.id), this.labelInfo.string = ft.ExtDecoration.getName(this.id) + "\n\n" + ft.ExtDecoration.getInfo(this.id), this.updateData()
                },
                msg: function () {
                    this.msg = {
                        c_onSelectHeaderItem: function (t, e) {
                            this.setHeaderInfo(t.data), this.listView.updateListViewItems(t.index)
                        },
                        decorationHeaderSet: function (t, e) {
                            0 == t ? (this.updateData(), this.listView.updateListViewItems(), ftc.showTip("\u542f\u7528\u6210\u529f")) : ftc.showTip("\u542f\u7528\u5931\u8d25")
                        }
                    }
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonEnable.node) this.id ? ftc.ManagerData.get2Object("Decoration", this.id) ? ftc.send("decorationHeaderSet", this.id) : ftc.showTip("\u672a\u62e5\u6709") : ftc.showTip("\u672a\u9009\u4e2d");
                    else if (t.target === this.buttonClose.node) this.cancel();
                    else
                        for (var i = 0; i < this.buttonTabs.length; i++)
                            if (t.target === this.buttonTabs[i].node) {
                                this.selectTab(i);
                                break
                            }
                },
                onKeyMenu: function (t) {
                    if (!t) return this.tabIndex++, this.tabIndex >= this.buttonTabs.length && (this.tabIndex = 0), this.selectTab(this.tabIndex), !0
                },
                onKeyOk: function (t) {
                    if (!t) {
                        if (this.buttonEnable.interactable) return this.onClick({
                            target: this.buttonEnable.node
                        }), !0;
                        ftc.showTip("\u4f7f\u7528\u4e2d")
                    }
                }
            })
        