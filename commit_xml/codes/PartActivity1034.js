
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    buttonTabs: [cc.Button],
                    partActivity1033: t("PartActivity1033")
                },
                init: function () {
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t]), this.buttonTabs[t].node.zIndex = 10
                },
                load: function () {
                    this.initPart(this.partActivity1033)
                },
                setData: function (t) {
                    this.data = t;
                    var e = ft.ExtMsg.getActivityData(this.data);
                    this.activityIds = e.activityIds;
                    for (var i = 0; i < this.activityIds.length; i++) {
                        var a = ftc.ManagerData.get2Object("Msg", this.activityIds[i]);
                        this.buttonTabs[i].node.active = !0, this.buttonTabs[i].node.getChildByName("Label").getComponent(cc.Label).string = ft.ExtMsg.getTitle(a)
                    }
                    for (i = this.activityIds.length; i < this.buttonTabs.length; i++) this.buttonTabs[i].node.active = !1;
                    this.selectTab(0)
                },
                selectTab: function (t) {
                    this.partActivity1033.setData(ftc.ManagerData.get2Object("Msg", this.activityIds[t]));
                    for (var e = 0; e < this.buttonTabs.length; e++) this.buttonTabs[e].interactable = t !== e
                },
                cleanup: function () { },
                updateData: function (t) {
                    t ? this.partActivity1033.setResult(t) : this.partActivity1033.updateData()
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
        