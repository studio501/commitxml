
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spriteBanner: cc.Sprite,
                    spriteDownload: cc.Sprite,
                    labelDeadline: cc.Label,
                    buttonDetail: cc.Button,
                    listView: ftc.ListView
                },
                init: function () {
                    this.buttonDetail && this.addClick(this.buttonDetail)
                },
                load: function () { },
                setData: function (e) {
                    this.data = e;
                    var i = ft.ExtMsg.getActivityData(this.data);
                    if (this.activity = i, 0 == this.data.ui || 103 == this.data.ui) {
                        if (this.buttonDetail.node.active = this.data.txt && this.data.txt.length > 0, i.img) (new (t("imageloader"))).imageLoadTool(ftc.resURL + i.img, function (t) {
                            t && (this.spriteDownload.spriteFrame = t)
                        }.bind(this));
                        this.updateDate(), ftc.isTv() && (this.buttonDetail.node.active = !1)
                    }
                    this.updateData(0)
                },
                cleanup: function () { },
                updateData: function (t) {
                    if (this.data) {
                        if (void 0 !== t) {
                            for (var e = this.data.ext.split(","), i = this.data.ste.split(","), a = [], n = [], s = 0; s < this.activity.consumeTypes.length; s++) - 1 === n.indexOf(this.activity.consumeTypes[s]) && n.push(this.activity.consumeTypes[s]);
                            for (s = 0; s < this.activity.id2s.length; s++) {
                                for (var o = this.activity.consumeNums[s], r = 0, c = 0; c < n.length; c++)
                                    if (n[c] === this.activity.consumeTypes[s]) {
                                        r = void 0 === e[c] ? 0 : Number(e[c]);
                                        break
                                    } var h, f = i[s];
                                void 0 === f && (f = 0), h = f > 0 ? 0 : r >= o ? 2 : 1, a.push({
                                    consumeType: this.activity.consumeTypes[s],
                                    consumeNum: o,
                                    ids: this.activity.id2s[s],
                                    nums: this.activity.num2s[s],
                                    single: this.activity.singles[s],
                                    ext: r,
                                    ste: f,
                                    index: s,
                                    status: h
                                })
                            }
                            a.sort(function (t, e) {
                                return e.status - t.status
                            }), this.listView.setListView(a, this.data)
                        } else this.listView.updateListViewItems();
                        this.updateDate()
                    }
                },
                updateDate: function () {
                    this.labelDeadline && (this.labelDeadline.string = ftc.language("\u5269\u4f59\u65f6\u95f4: ") + ftc.calcTimeDelta(void 0, this.data.date1))
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonDetail.node && ftc.showDetailInfo(this.buttonDetail.node, this.data.txt)
                }
            })
        