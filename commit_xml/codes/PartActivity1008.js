
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spriteBanner: cc.Sprite,
                    spriteDownload: cc.Sprite,
                    labelDeadline: cc.Label,
                    labelPointsCur: cc.Label,
                    labelPointsTotal: cc.Label,
                    buttonDetail: cc.Button,
                    listView: ftc.ListView
                },
                init: function () {
                    this.addClick(this.buttonDetail)
                },
                setData: function (e) {
                    this.data = e, this.buttonDetail.node.active = this.data.txt && this.data.txt.length > 0, this.updateDate();
                    var i = this.getListParam();
                    this.labelPointsTotal.string = i.pointTotal, this.labelPointsCur.string = i.pointCur;
                    var a = ft.ExtMsg.getActivityData(this.data);
                    a.img && (new (t("imageloader"))).imageLoadTool(ftc.resURL + a.img, function (t) {
                        t && (this.spriteDownload.spriteFrame = t)
                    }.bind(this));
                    for (var n = [], s = 0; s < a.ids.length; s++) n.push({
                        id: a.ids[s],
                        num: a.nums[s],
                        needTotalPoint: a.needTotalPoints[s],
                        needTotalPay: a.needTotalPays[s],
                        switchNum: a.switchNums[s],
                        count: a.counts[s]
                    });
                    this.listView.setListView(n, i), this.updateData(), ftc.isTv() && (this.buttonDetail.node.active = !1)
                },
                getListParam: function () {
                    var t = this.data.ext.split(","),
                        e = ft.ExtItem.getRmb() - Number(t[1]),
                        i = 10 * e,
                        a = i - Number(t[0]);
                    return {
                        data: this.data,
                        payTotal: e,
                        pointCur: a,
                        pointTotal: i
                    }
                },
                cleanup: function () { },
                updateData: function (t) {
                    if (this.data) {
                        var e = this.getListParam();
                        this.labelPointsTotal.string = e.pointTotal, this.labelPointsCur.string = e.pointCur, void 0 !== t ? this.listView.updateListViewItem(t) : this.listView.updateListViewItems(e), this.updateDate()
                    }
                },
                updateDate: function () {
                    this.labelDeadline.string = ftc.language("\u5269\u4f59\u65f6\u95f4: ") + ftc.calcTimeDelta(void 0, this.data.date1)
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonDetail.node && ftc.showDetailInfo(this.buttonDetail.node, this.data.txt)
                }
            })
        