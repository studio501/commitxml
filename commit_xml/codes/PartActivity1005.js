
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    spriteBanner: cc.Sprite,
                    spriteDownload: cc.Sprite,
                    labelDeadline: cc.Label,
                    buttonDetail: cc.Button,
                    listView: ftc.ListView
                },
                init: function () {
                    this.addClick(this.buttonDetail)
                },
                load: function () { },
                setData: function (e) {
                    this.data = e, this.updateDate(), this.buttonDetail.node.active = this.data.txt && this.data.txt.length > 0;
                    var i = ft.ExtMsg.getActivityData(this.data);
                    i.img && (new (t("imageloader"))).imageLoadTool(ftc.resURL + i.img, function (t) {
                        t && (this.spriteDownload.spriteFrame = t)
                    }.bind(this));
                    for (var a = [], n = 0; n < i.id2s.length; n++) a.push({
                        type: i.type,
                        ids: i.id2s[n],
                        nums: i.num2s[n],
                        pay: i.pays[n],
                        single: i.singles[n],
                        count: i.counts[n]
                    });
                    this.listView.setListView(a, this.data), ftc.isTv() && (this.buttonDetail.node.active = !1)
                },
                enter: function () { },
                updateData: function (t) {
                    this.data && (void 0 !== t ? this.listView.updateListViewItem(t) : this.listView.updateListViewItems(), this.updateDate())
                },
                updateDate: function () {
                    this.labelDeadline.string = ftc.language("\u5269\u4f59\u65f6\u95f4: ") + ftc.calcTimeDelta(void 0, this.data.date1)
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                onClick: function (t, e) {
                    t.target === this.buttonDetail.node && ftc.showDetailInfo(this.buttonDetail.node, this.data.txt)
                }
            })
        