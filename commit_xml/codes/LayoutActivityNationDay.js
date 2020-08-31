
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    nodeRoot: cc.Node,
                    nodeLayoutTab: cc.Node,
                    spriteRedPoints: [cc.Sprite],
                    buttonClose: cc.Button
                },
                init: function () {
                    this.buttonTabs = [];
                    for (var t = 0; t < this.nodeLayoutTab.children.length; t++) this.buttonTabs.push(this.nodeLayoutTab.children[t].getComponent(cc.Button));
                    for (t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t]);
                    this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    this.partActivities = {};
                    for (var e = ft.ExtMsg.getMsgDatas(ft.type.msg.pos.nationalDay), i = e.length; i < 5; i++) e.push(null);
                    this.datas = e;
                    for (i = 0; i < this.buttonTabs.length; i++) {
                        var a = this.buttonTabs[i].node.getChildByName("spriteIcon").getComponent(cc.Sprite),
                            n = this.buttonTabs[i].node.getChildByName("labelName").getComponent(cc.Label);
                        if (e[i])
                            if (n.string = ft.ExtMsg.getTitle(e[i]), e[i].img) (new (t("imageloader"))).imageLoadTool(ftc.resURL + e[i].img, function (t) {
                                t && (a.spriteFrame = t)
                            }.bind(this))
                    }
                    this.updateData(), this.selectTab(0), ftc.setTvTip(this.node)
                },
                setData: function (t) { },
                enter: function () { },
                updateData: function () {
                    this.spriteRedPoints[0].node.active = ft.ExtMsg.checkCanGet(this.datas[0]), this.spriteRedPoints[1].node.active = ft.ExtMsg.checkCanGet(this.datas[1])
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        msgActivityGet: function (t, e) {
                            var i = this.partActivities[t.eid];
                            i && (-1 === t.ret ? ftc.showTip("\u9886\u53d6\u5931\u8d25") : 0 === t.ret && (i.updateData(t.index), this.updateData()))
                        },
                        copyEnter: function (t, e) {
                            0 === t ? this.cancel() : 2 === t && ftc.showTip("\u7b49\u7ea7\u4e0d\u8db3")
                        }
                    }
                },
                selectTab: function (t) {
                    var e = this.datas[t];
                    if (e) {
                        for (var i = 0; i < this.buttonTabs.length; i++) this.buttonTabs[i].interactable = t !== i;
                        if (this.partActivities[e.entityId])
                            for (var i in this.partActivities) this.partActivities[i].node.active = e.entityId == i, this.partActivities[i].node.active && this.partActivities[i].updateData();
                        else this.newPartActivity(e, function (t) {
                            for (var i in this.partActivities[e.entityId] = t, this.partActivities) this.partActivities[i].node.active = e.entityId == i
                        }.bind(this))
                    } else ftc.showTip("\u6d3b\u52a8\u4e0d\u5b58\u5728")
                },
                newPartActivity: function (t, e) {
                    var i = "PartActivity" + ft.ExtMsg.getType(t),
                        a = i,
                        n = ft.ExtMsg.getUIType(t);
                    n > 0 && (a += "_" + n), ftc.loadPart(a, function (i) {
                        i && (i.setData(t), this.nodeRoot.addChild(i.node, -1), e && e(i))
                    }.bind(this), void 0, i)
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonClose.node) this.cancel();
                    else
                        for (var i = 0; i < this.buttonTabs.length; i++)
                            if (t.target === this.buttonTabs[i].node) {
                                this.selectTab(i);
                                break
                            }
                }
            })
        