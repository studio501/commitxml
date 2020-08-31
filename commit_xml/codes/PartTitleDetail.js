
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    listView: ftc.ListView,
                    nodeTitle: cc.Node,
                    labelInfo: cc.Label,
                    labelValue: cc.Label,
                    labelCondition: cc.Label,
                    buttonSet1: cc.Button,
                    buttonSet2: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonSet1), this.addClick(this.buttonSet2)
                },
                load: function () {
                    this.selectedTitle = void 0, this.selectedIndex = 0;
                    var t = ft.ExtTitle.getTitles();
                    this.listView.setListView(t, this.selectedIndex), this.setData(), this.partTitle = this.newPart("PartTitle"), this.partTitle.node.position = cc.v2(0, 0), this.nodeTitle.addChild(this.partTitle.node), this.partTitle.updateData()
                },
                setData: function (t) {
                    var e = this.listView.getDatas()[this.selectedIndex];
                    this.setTitleInfo(e)
                },
                cleanup: function () { },
                updateData: function (t) {
                    if (void 0 === t) {
                        for (var e = ft.ExtTitle.getTitles(), i = 0; i < e.length; i++)
                            if (this.selectedTitle.id === e[i].id) {
                                this.selectedIndex = i;
                                break
                            } this.listView.updateListViewItems(this.selectedIndex, e), this.setData(), this.partTitle.updateData()
                    } else this.selectedIndex = t.index, this.listView.updateListViewItems(t.index), this.setTitleInfo(t.data)
                },
                setTitleInfo: function (t) {
                    if (this.selectedTitle = t, t) {
                        this.labelInfo.string = ft.ExtTitle.getInfo(t.id), this.labelValue.string = ft.ExtTitle.getValueDesc(t.id), this.labelCondition.string = ft.ExtTitle.getConditionDesc(t.id);
                        var e = ftc.ManagerData.get1("ManagerTitle").titleIds.split(","),
                            i = this.buttonSet1.node.getChildByName("Text").getComponent(cc.Label),
                            a = this.buttonSet2.node.getChildByName("Text").getComponent(cc.Label);
                        i.string = e[0] == t.id ? ftc.language("\u53d6\u4e0b\u524d\u79f0\u53f7") : ftc.language("\u8bbe\u4e3a\u524d\u79f0\u53f7"), a.string = e[1] == t.id ? ftc.language("\u53d6\u4e0b\u540e\u79f0\u53f7") : ftc.language("\u8bbe\u4e3a\u540e\u79f0\u53f7")
                    } else this.labelInfo.string = "", this.labelValue.string = ""
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSet1.node ? this.setTitle(0) : t.target === this.buttonSet2.node && this.setTitle(1)
                },
                setTitle: function (t) {
                    this.selectedTitle && (ftc.ManagerData.get1("ManagerTitle").titleIds.split(",")[t] == this.selectedTitle.id ? ftc.send("titleUnload", {
                        id: this.selectedTitle.id,
                        pos: t
                    }) : ftc.send("titleSet", {
                        id: this.selectedTitle.id,
                        pos: t
                    }))
                }
            })
        