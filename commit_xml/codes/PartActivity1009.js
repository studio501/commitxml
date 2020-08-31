
            
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
                    this.data = e, this.data.id === ft.value.msg.wuziliangjiang || this.data.id === ft.value.msg.yuanshenduohui ? this.txt = ft.ExtMsg.getTxt(this.data) : this.txt = this.data.txt, this.updateDate(), this.buttonDetail.node.active = this.txt && this.txt.length > 0;
                    var i = ft.ExtMsg.getActivityData(this.data);
                    i.img && (new (t("imageloader"))).imageLoadTool(ftc.resURL + i.img, function (t) {
                        if (t) this.spriteDownload.node.active = !0, this.spriteDownload.spriteFrame = t;
                        else {
                            var e = ftc.ManagerRes.getSpriteFrame("txt", "activity_banner_" + this.data.id);
                            e && (this.spriteDownload.node.active = !1, this.spriteBanner.spriteFrame = e)
                        }
                    }.bind(this));
                    var a = [];
                    if (this.data.id === ft.value.msg.wuziliangjiang || this.data.id === ft.value.msg.yuanshenduohui)
                        for (var n = i.items, s = 0; s < n.length; s++) a.push({
                            switchIds: n[s].switchId2s,
                            switchNums: n[s].switchNum2s,
                            id: n[s].ids,
                            num: n[s].nums,
                            count: n[s].counts
                        });
                    else
                        for (s = 0; s < i.ids.length; s++) a.push({
                            switchIds: i.switchId2s[s],
                            switchNums: i.switchNum2s[s],
                            id: i.ids[s],
                            num: i.nums[s],
                            count: i.counts[s]
                        });
                    this.listView.setListView(a, this.data), ftc.isTv() && (this.buttonDetail.node.active = !1)
                },
                cleanup: function () { },
                updateData: function (t) {
                    this.listView.updateListViewItems(), this.updateDate()
                },
                updateDate: function () {
                    this.data.id === ft.value.msg.wuziliangjiang || this.data.id === ft.value.msg.yuanshenduohui ? this.labelDeadline.string = ftc.language("\u5269\u4f59%{0}\u5929", {
                        0: this.data.ext - ft.getSysDay()
                    }) : this.labelDeadline.string = ftc.language("\u5269\u4f59\u65f6\u95f4: ") + ftc.calcTimeDelta(void 0, this.data.date1)
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonDetail.node && ftc.showDetailInfo(this.buttonDetail.node, this.txt)
                }
            })
        