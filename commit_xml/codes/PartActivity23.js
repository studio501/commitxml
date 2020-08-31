
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeLayout: cc.Node
                },
                init: function () { },
                load: function () {
                    this.partPieces = []
                },
                setData: function (t) {
                    if (void 0 !== t && (this.data = t), this.data) {
                        var e = ftc.ManagerData.get2Object("Npc"),
                            i = this.data.ext.split(","),
                            a = this.data.ste.split(",");
                        this.items = {};
                        for (var n = ft.ExtMsg.getActivityData(this.data), s = 0; s < n.items.length; s++) {
                            var o = 3501 + s,
                                r = e[o],
                                c = 0;
                            r && 0 === r.count ? c = -1 !== i.indexOf(o.toString()) ? 2 : 3 : -1 !== a.indexOf(o.toString()) && (c = 1), this.items[o] = {
                                id: s + 1,
                                entityId: this.data.entityId,
                                ste: c,
                                txt: n.items[s].txt
                            }
                        }
                        for (s = 0; s < 30; s++) {
                            var h = this.partPieces[s];
                            h || (h = this.newPart("PartActivity23Piece"), this.nodeLayout.addChild(h.node), this.partPieces[s] = h), h.setData(this.items[3501 + s])
                        }
                    }
                },
                cleanup: function () { },
                updateData: function (t) { },
                tick: function (t) { },
                onClick: function (t, e) { }
            })
        