
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spriteBanner: cc.Sprite,
                    spriteDownload: cc.Sprite,
                    labelDeadline: cc.Label,
                    buttonDetail: cc.Button,
                    progressBar: cc.ProgressBar,
                    labelProgress: cc.Label,
                    nodeContent: cc.Node,
                    nodeItem1033: cc.Node,
                    spriteSelect: cc.Sprite,
                    buttonVisit1: cc.Button,
                    buttonVisit5: cc.Button
                },
                init: function () {
                    ftc.ManagerRes.storeNode(this.nodeItem1033, "nodeItem1033"), this.nodeItems = [];
                    for (var t = 0; t < 14; t++) {
                        var e = ftc.ManagerRes.getNode("nodeItem1033");
                        e.parent = this.nodeContent, this.nodeItems.push(e)
                    }
                    this.addClick(this.buttonVisit1), this.addClick(this.buttonVisit5), this.addClick(this.buttonDetail), this.spriteSelect.node.zIndex = 100
                },
                load: function () {
                    this.partItems = [];
                    for (var t = 0, e = [0, 1, 2, 3, 4, 5, 11, 17, 16, 15, 14, 13, 12, 6], i = 0; i < e.length; i++) {
                        var a = (t = e[i]) % 6,
                            n = Math.floor(t / 6);
                        this.nodeItems[i].position = cc.v2(114 * a - 285, 102 - 102 * n);
                        var s = this.newPart("PartItem");
                        s.node.y = 2, s.node.scale = .85, this.nodeItems[i].addChild(s.node), this.partItems.push(s)
                    }
                    this._isShining = !1, this._queuePos = [], this.spriteSelect.node.active = !1, this._partItemSpecial = void 0
                },
                setData: function (e) {
                    this.data = e, this.updateDate(), this.buttonDetail.node.active = this.data.txt && this.data.txt.length > 0, ftc.isTv() && (this.buttonDetail.node.active = !1);
                    var i = ft.ExtMsg.getActivityData(this.data);
                    i.img && (new (t("imageloader"))).imageLoadTool(ftc.resURL + i.img, function (t) {
                        t && (this.spriteDownload.spriteFrame = t)
                    }.bind(this));
                    this.activity = ft.ExtMsg.getActivityData(e);
                    for (var a = this.activity.getIds, n = this.activity.getNums, s = 0; s < this.partItems.length && s < a.length; s++) this.partItems[s].setData(a[s], n[s]), a[s] !== this.activity.specialId || this._partItemSpecial || (this._partItemSpecial = this.newPart("PartItemSpecial"), this._partItemSpecial.node.scale = 1.13, this.nodeItems[s].addChild(this._partItemSpecial.node, 100));
                    this.updateData()
                },
                cleanup: function () { },
                updateData: function () {
                    for (var t = [this.buttonVisit1.node, this.buttonVisit5.node], e = 0; e < t.length; e++) {
                        var i = t[e].getChildByName("spriteConsume").getComponent(cc.Sprite),
                            a = t[e].getChildByName("labelConsume").getComponent(cc.Label);
                        i.spriteFrame = ft.ExtItem.getLittleIconSprite(this.activity.consumeId), a.string = this.activity.consumeNum * [1, 5][e] + (this.activity.consumeId === ft.value.item.gem2 ? "" : "/" + ft.ExtItem.getNum(this.activity.consumeId))
                    }
                    this.buttonVisit1.interactable = ft.ExtItem.getNum(this.activity.consumeId) >= 1 * this.activity.consumeNum, this.buttonVisit5.interactable = ft.ExtItem.getNum(this.activity.consumeId) >= 5 * this.activity.consumeNum, this.progressBar.progress = this.data.ext / this.activity.extMax, this.labelProgress.string = "\u7d2f\u8ba1\u5e78\u8fd0\u503c:" + this.data.ext + "/" + this.activity.extMax
                },
                updateDate: function () {
                    this.labelDeadline.string = ftc.language("\u5269\u4f59\u65f6\u95f4: ") + ftc.calcTimeDelta(void 0, this.data.date1)
                },
                setResult: function (t) {
                    this.result = [];
                    for (var e = t, i = 0; i < e.length; i++) {
                        var a = this.partItems[e[i]].getData();
                        this.result.push([a.id, a.num])
                    }
                    this._queuePos = [];
                    var n = 15 + e[0];
                    for (i = 0; i < n; i++) {
                        var s = this.partItems[i % 14].node.parent.position;
                        this._queuePos.push([.02 * (i / 7 + 1), s]), i === n - 1 && this._queuePos.push([1.2, s])
                    }
                    for (i = 1; i < e.length; i++) {
                        var o = e[i] - e[i - 1];
                        o <= 0 && (o += 14);
                        for (var r = n; r < n + o; r++) {
                            s = this.partItems[r % 14].node.parent.position;
                            this._queuePos.push([.02 * ((r - n) / 7 + 1), s]), r === n + o - 1 && this._queuePos.push([1.2, s])
                        }
                        n += o
                    }
                    this.spriteSelect.node.active = !0, this.spriteSelect.node.position = cc.Vec2(-285, 102)
                },
                tick: function (t) {
                    this._isShining || this._queuePos.length > 0 && (1.2 === this._queuePos[0][0] ? (this._isShining = !0, this.spriteSelect.node.runAction(cc.sequence(cc.fadeOut(.2), cc.fadeIn(.2), cc.fadeOut(.2), cc.fadeIn(.2), cc.callFunc(function () {
                        this._queuePos.splice(0, 1), this._isShining = !1, 0 === this._queuePos.length && (ftc.cancelTop(), ftc.loadLayout("LayoutAwardGoods", function (t) {
                            t.setData(this.result)
                        }.bind(this)))
                    }.bind(this))))) : (this._queuePos[0][0] -= t, this._queuePos[0][0] <= 0 && (this.spriteSelect.node.active = !0, this.spriteSelect.node.position = this._queuePos[0][1], this._queuePos.splice(0, 1)), 0 === this._queuePos.length && (ftc.cancelTop(), ftc.loadLayout("LayoutAwardGoods", function (t) {
                        t.setData(this.result)
                    }.bind(this)))))
                },
                onClick: function (t, e) {
                    t.target === this.buttonVisit1.node ? (ftc.send("msgActivityGet", {
                        eid: this.data.entityId,
                        type: 0
                    }), ftc.showTop()) : t.target === this.buttonVisit5.node && (ftc.send("msgActivityGet", {
                        eid: this.data.entityId,
                        type: 1
                    }), ftc.showTop())
                }
            })
        