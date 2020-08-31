
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    buttonDetail: cc.Button,
                    listView: ftc.ListView,
                    partActivity12: t("PartActivity12"),
                    labelDay: cc.Label,
                    buttonGet: cc.Button,
                    spriteGet: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonDetail, !0), this.addClick(this.buttonGet)
                },
                load: function () {
                    this.initPart(this.partActivity12)
                },
                setData: function (t) {
                    this.data = t, this.update = !1;
                    var e = ft.ExtMsg.getActivityData(this.data),
                        i = [],
                        a = this.data.ext.split(","),
                        n = a[0];
                    1 == this.data.ste && (n = Number(n) - 1);
                    for (var s = Math.floor(n / 30), o = 0; o < 30; o++) i.push(e.items[30 * s + o]);
                    this.listView.setListView(i, this.data, n % 30), this.labelDay.string = a[1], this.buttonGet.node.active = 0 == this.data.ste, this.spriteGet.node.active = !this.buttonGet.node.active, this.partActivity12.setData(ft.ExtMsg.getMsgByType(ft.type.activity.dailySignSevenDay)), this.buttonDetail.node.active = !!ft.ExtMsg.getTxt(this.data), ftc.isTv() && (this.buttonDetail.node.active = !1)
                },
                cleanup: function () { },
                updateData: function () {
                    this.listView.updateListViewItems(), this.partActivity12.updateData();
                    var t = this.data.ext.split(",")[1];
                    this.labelDay.string = t, this.buttonGet.node.active = 0 == this.data.ste, this.spriteGet.node.active = !this.buttonGet.node.active
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonDetail.node ? ftc.showDetailInfo(this.buttonDetail.node, ft.ExtMsg.getTxt(this.data)) : t.target === this.buttonGet.node && ftc.send("msgActivityGet", {
                        eid: this.data.entityId
                    })
                }
            })
        