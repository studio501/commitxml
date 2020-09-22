
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonTabs: [cc.Button],
                    spriteSelects: [cc.Sprite],
                    partVisit: t("PartVisit"),
                    partVisitLimited: t("PartVisitLimited"),
                    buttonExchange: cc.Button,
                    buttonPreview: cc.Button,
                    buttonDetail: cc.Button,
                    spriteRedPoint: cc.Sprite
                },
                init: function () {
                    for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t]);
                    this.addClick(this.buttonExchange), this.addClick(this.buttonPreview), this.addClick(this.buttonDetail)
                },
                load: function () {
                    this.initPart(this.partVisit), this.initPart(this.partVisitLimited), this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("寻将"), this.node.addChild(this.partTopStatus.node), this.tabIndex = void 0;
                    var t = ft.ExtMsg.getMsgByType(ft.type.activity.limitedVisit);
                    this.buttonTabs[1].node.active = !!t
                },
                setData: function (t) { },
                enter: function () {
                    void 0 === this.tabIndex && this.selectTab(0)
                },
                updateData: function () {
                    this.partTopStatus.updateData(), this.partVisit.node.active ? this.partVisit.updateData() : this.partVisitLimited.updateData(), this.spriteRedPoint.node.active = ft.ExtVisit.checkCanFreeVisit()
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        visitHero: function (t, e) {
                            if (0 === this.tabIndex ? this.visitType = this.partVisit.getVisitType() : this.visitType = this.partVisitLimited.getVisitType(), 1 === t) this.visitType === ft.type.visit.gold1 || this.visitType === ft.type.visit.gold10 ? ftc.showTip("银币不足") : this.visitType === ft.type.visit.limited10 ? ftc.showTip("求贤令不足") : ftc.showTip("元宝不足");
                            else if (2 === t) ftc.showTip("次数不足");
                            else {
                                var i = ftc.ManagerRes.findLayout("LayoutVisitResult");
                                i ? (i.updateData(t), this.updateData()) : ftc.loadLayout("LayoutVisitResult", function (e) {
                                    e.setData(t, this.visitType), this.updateData()
                                }.bind(this))
                            }
                        }
                    }
                },
                selectTab: function (t) {
                    this.tabIndex = t, this.partVisit.node.active = 0 === t, this.partVisitLimited.node.active = 1 === t, this.partVisitLimited.node.active && this.partVisitLimited.playEnterAni(), this.buttonDetail.node.active = 0 === t;
                    for (var e = 0; e < this.spriteSelects.length; e++) this.spriteSelects[e].node.active = t === e;
                    this.updateData()
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonExchange.node);
                    else if (t.target === this.buttonPreview.node) ftc.loadLayout("LayoutVisitPreview", function (t) {
                        t.setData(this.tabIndex)
                    }.bind(this));
                    else if (t.target === this.buttonDetail.node) ftc.loadLayout("LayoutVisitProbability");
                    else
                        for (var i = 0; i < this.buttonTabs.length; i++)
                            if (t.target === this.buttonTabs[i].node) {
                                this.selectTab(i);
                                break
                            }
                }
            })
        