
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    scrollView: cc.ScrollView,
                    partActivity1007: t("PartActivity1007")
                },
                init: function () {
                    this.buttonTabs = [];
                    for (var t = this.scrollView.content.children, e = 0; e < t.length; e++) this.buttonTabs[e] = t[e].getComponent(cc.Button), this.addClick(this.buttonTabs[e])
                },
                load: function () {
                    this.data = void 0, this.activityIds = void 0, this.tabIndex = -1, this.initPart(this.partActivity1007)
                },
                setData: function (t) {
                    this.data = t;
                    var e = ft.ExtMsg.getActivityData(this.data),
                        i = e.activityIds.length;
                    this.activityIds = e.activityIds;
                    for (var a = 0; a < i; a++) {
                        this.buttonTabs[a].node.active = !0;
                        var n = ftc.ManagerData.get2Object("Msg", this.activityIds[a]);
                        this.buttonTabs[a].node.getChildByName("Label").getComponent(cc.Label).string = ft.ExtMsg.getTitle(n)
                    }
                    for (a = i; a < this.buttonTabs.length; a++) this.buttonTabs[a].node.active = !1;
                    this.selectTab(0)
                },
                selectTab: function (t) {
                    this.tabIndex = t, this.partActivity1007.setData(ftc.ManagerData.get2Object("Msg", this.activityIds[t]));
                    for (var e = 0; e < this.buttonTabs.length; e++) this.buttonTabs[e].interactable = t !== e
                },
                cleanup: function () { },
                updateData: function () {
                    this.partActivity1007.updateData()
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    for (var i = 0; i < this.buttonTabs.length; i++)
                        if (t.target === this.buttonTabs[i].node) {
                            this.selectTab(i);
                            break
                        }
                }
            })
        