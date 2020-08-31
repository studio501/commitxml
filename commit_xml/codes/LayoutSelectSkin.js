
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    labelTitle: cc.Label,
                    listView: ftc.ListView,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose)
                },
                load: function () {
                    ftc.setTvTip(this.node)
                },
                setData: function (t) {
                    var e;
                    this.team = t, e = 0 === t ? "\u7f16\u961f\u4e00\u5730\u56fe\u5f62\u8c61" : "\u7f16\u961f\u4e8c\u5730\u56fe\u5f62\u8c61", this.labelTitle.string = ftc.language(e);
                    var i = ft.ExtHero.getLords(this.team);
                    this.listView.setListView(i, t), this.updateTv(i.length)
                },
                updateTv: function (t) {
                    t && ftc.ManagerTV.nextSelect(this.listView.getItem(0).buttonSelf)
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectSkinItem: function (t, e) {
                            t.data ? (ftc.send("mapSetSkin", {
                                type: t.data.type,
                                id: t.data.id,
                                team: this.team
                            }), this.cancel()) : ftc.showTip("\u8bbe\u7f6e\u5931\u8d25")
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.buttonClose.node && this.cancel()
                }
            })
        