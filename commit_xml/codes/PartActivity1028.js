
            
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
                    this.data = e, this.txt = this.data.txt, this.updateDate(), this.buttonDetail.node.active = this.txt && this.txt.length > 0;
                    var i = ft.ExtMsg.getActivityData(this.data);
                    i.img && (new (t("imageloader"))).imageLoadTool(ftc.resURL + i.img, function (t) {
                        if (t) this.spriteDownload.node.active = !0, this.spriteDownload.spriteFrame = t;
                        else {
                            var e = ftc.ManagerRes.getSpriteFrame("txt", "activity_banner_" + this.data.id);
                            e && (this.spriteDownload.node.active = !1, this.spriteBanner.spriteFrame = e)
                        }
                    }.bind(this));
                    for (var a = [], n = 0; n < i.id2s.length; n++) a.push({
                        switchIds: i.switchId2s[n],
                        switchNums: i.switchNum2s[n],
                        ids: i.id2s[n],
                        nums: i.num2s[n],
                        count: i.counts[n],
                        single: i.singles[n]
                    });
                    this.listView.setListView(a, this.data), ftc.isTv() && (this.buttonDetail.node.active = !1)
                },
                cleanup: function () { },
                updateData: function (t) {
                    this.listView.updateListViewItems(), this.updateDate()
                },
                updateDate: function () {
                    this.labelDeadline.string = ftc.language("剩余时间: ") + ftc.calcTimeDelta(void 0, this.data.date1)
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonDetail.node && ftc.showDetailInfo(this.buttonDetail.node, this.txt)
                }
            })
        