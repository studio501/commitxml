
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    nodeContent: cc.Node,
                    nodeItem: cc.Node,
                    labelName: cc.Label,
                    buttonUse: cc.Button,
                    nodeTreasure: cc.Node,
                    spriteSelect: cc.Sprite,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonUse), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerRes.storeNode(this.nodeTreasure, "nodeTreasure"), this.treasureNodes = [];
                    for (var t = 0; t < 12; t++) {
                        var e = ftc.ManagerRes.getNode("nodeTreasure");
                        e.parent = this.nodeContent, this.treasureNodes.push(e)
                    }
                    ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    this.partItems = [];
                    for (var t = 0, e = 0; e < 12; e++) {
                        5 !== e && 7 !== e || (t += 2);
                        var i = (e + t) % 4,
                            a = Math.floor((e + t) / 4);
                        this.treasureNodes[e].position = cc.v2(179 * i - 268, 151 - 100 * a), (n = this.newPart("PartItem")).node.scale = .7, n.node.y = 8, this.treasureNodes[e].addChild(n.node), this.partItems.push(n)
                    }
                    var n;
                    (n = this.newPart("PartItem")).setData(ft.value.item.treasureKey), n.node.scale = .6, this.nodeItem.addChild(n.node), this.spriteSelect.node.zIndex = 999, this.spriteSelect.node.active = !1, this._queuePos = [], this.result = 0, this.itemSeqence = [0, 1, 2, 3, 5, 7, 11, 10, 9, 8, 6, 4], this.setData(), ftc.setTvTip(this.node)
                },
                setData: function (t) {
                    var e = [],
                        i = [];
                    for (var a in ftd.Visit.data) ft.ExtVisit.getType(a) === ft.type.visit.treasure && (e.push(ft.ExtVisit.getItem(a)), i.push(ft.ExtVisit.getNum(a)));
                    for (a = 0; a < this.partItems.length && a < e.length; a++) this.partItems[this.itemSeqence[a]].setData(e[a], i[a], !0)
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () {
                    this.labelName.string = ft.ExtItem.getNum(ft.value.item.treasureKey) + "/1"
                },
                tick: function (t) {
                    if (this._queuePos.length > 0 && (this._queuePos[0][0] -= t, this._queuePos[0][0] <= 0 && (this.spriteSelect.node.active = !0, this.spriteSelect.node.position = this._queuePos[0][1], this._queuePos.splice(0, 1)), 0 === this._queuePos.length)) {
                        var e = this.partItems[this.itemSeqence[this.result]].getData();
                        ftc.cancelTop(), ftc.loadLayout("LayoutAwardGoods", function (t) {
                            t.setData([
                                [e.id, e.num]
                            ])
                        })
                    }
                },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        visitTreasure: function (t, e) {
                            if (1 !== t) {
                                for (var i = 0; i < this.partItems.length; i++) {
                                    var a = this.partItems[i].getData();
                                    if (t[0] == a.id && t[1] == a.num) {
                                        this.result = this.itemSeqence.indexOf(i);
                                        break
                                    }
                                }
                                this._queuePos = [];
                                for (i = 0; i < 25 + this.result; i++) {
                                    var n = this.treasureNodes[this.itemSeqence[i % 12]].position;
                                    this._queuePos.push([.05 * (i / 7 + 1), n])
                                }
                                this.updateData()
                            } else ftc.showTip(ft.ExtItem.getName(ft.value.item.treasureKey) + ftc.language("\u6570\u91cf\u4e0d\u8db3"))
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.buttonUse.node ? ft.ExtItem.getNum(ft.value.item.treasureKey) < 1 ? ftc.showTip(ft.ExtItem.getName(ft.value.item.treasureKey) + ftc.language("\u6570\u91cf\u4e0d\u8db3")) : (ftc.send("visitTreasure"), ftc.showTop()) : t.target === this.buttonClose.node && this.cancel()
                }
            })
        