
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    listView: ftc.ListView,
                    buttonBox: cc.Button,
                    progressBar: cc.ProgressBar,
                    labelProgress: cc.Label,
                    labelTip: cc.Label,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonBox), this.addClick(this.buttonClose)
                },
                load: function () {
                    var t = ft.ExtMsg.getMsgDatas(ft.type.msg.pos.invite, ft.type.activity.invite),
                        e = ftc.ManagerData.sid;
                    if (t && e) {
                        this.msgInvite = t;
                        var i = {};
                        i.openid = ftc.serverOpenid, i.sid = e, ftc.send("h5GetReferrerCount", i)
                    } else this.cancel()
                },
                initList: function () {
                    for (var t = JSON.parse(ft.ExtMsg.getBase(this.msgInvite)), e = t.ids[0], i = t.nums[0], a = [], n = 0; n < 5; n++) a.push({
                        id: e,
                        num: i
                    });
                    this.listView.setListView(a, this.msgInvite), this.updateData()
                },
                setData: function (t) { },
                enter: function () { },
                updateData: function () {
                    var t = Number(this.msgInvite.ext),
                        e = Number(this.msgInvite.ste);
                    t % 5 == 0 && t / 5 > e ? this.buttonBox.node.runAction(cc.sequence(cc.scaleTo(.5, 1.1), cc.scaleTo(.5, 1)).repeatForever()) : (this.buttonBox.node.stopAllActions(), this.buttonBox.node.scale = 1);
                    var i = t % 5;
                    0 === i && 5 * e < t && (i = 5), this.progressBar.progress = i / 5, this.labelProgress.string = i + "/5"
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        msgActivityGet: function (t, e) {
                            0 !== t.ret && 1 !== t.ret || (this.listView.updateListViewItems(), this.updateData())
                        },
                        getPlayer: function (t, e) {
                            0 == t.ste && t.type == ft.basehttp.H5GetReferrerCount && this.initList()
                        }
                    }
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonBox.node) {
                        if (this.msgInvite) {
                            var i = Number(this.msgInvite.ext),
                                a = Number(this.msgInvite.ste);
                            if (i % 5 == 0 && i / 5 > a) ftc.send("msgActivityGet", {
                                eid: this.msgInvite.entityId,
                                index: 0
                            });
                            else {
                                for (var n = JSON.parse(ft.ExtMsg.getBase(this.msgInvite)), s = n.extIds, o = n.extNums, r = [], c = [], h = 0; h < s.length; h++) r.push(s[h]), c.push(o[h]);
                                ftc.loadLayout("LayoutAwardPreview", function (t) {
                                    t.setData({
                                        ids: r,
                                        nums: c
                                    })
                                })
                            }
                        }
                    } else t.target === this.buttonClose.node && this.cancel()
                }
            })
        