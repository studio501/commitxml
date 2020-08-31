
            
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
                    this.addClick(this.buttonDetail)
                },
                setData: function (e) {
                    this.data = e, this.buttonDetail.node.active = this.data.txt && this.data.txt.length > 0, this.updateDate();
                    var i = ft.ExtMsg.getActivityData(this.data);
                    i.img && (new (t("imageloader"))).imageLoadTool(ftc.resURL + i.img, function (t) {
                        t && (this.spriteDownload.spriteFrame = t)
                    }.bind(this));
                    for (var a = [], n = 0; n < i.ids.length; n++) a.push({
                        id: i.ids[n],
                        num: i.nums[n]
                    });
                    this.listView.setListView(a, this.data), ftc.isTv() && (this.buttonDetail.node.active = !1)
                },
                cleanup: function () { },
                updateData: function () {
                    this.listView.updateListViewItems(), this.updateDate()
                },
                updateDate: function () {
                    this.labelDeadline.string = ftc.language("\u5269\u4f59\u65f6\u95f4: ") + ftc.calcTimeDelta(void 0, this.data.date1)
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonDetail.node && ftc.showDetailInfo(this.buttonDetail.node, this.data.txt)
                }
            })
        