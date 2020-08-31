
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    listView: ftc.ListView,
                    labelTotalScore: cc.Label,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose, this.node)
                },
                load: function () {
                    ftc.setTvTip(this.node);
                    var t = ft.ExtCopy.getAchievements(ftc.ManagerData.get2Object("Achievement")),
                        e = [];
                    for (var i in t) e.push(t[i]);
                    this.listView.setListView(e), this.labelTotalScore.string = "\u603b\u5206: " + ft.ExtCopy.getAchievementScore(e)
                },
                setData: function (t) { },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                onClick: function (t, e) {
                    t.target === this.buttonClose.node && this.cancel()
                }
            })
        