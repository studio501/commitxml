
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    listView: ftc.ListView,
                    buttonConfirm: cc.Button,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonConfirm), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose, this.node)
                },
                load: function () {
                    ftc.setTvTip(this.node), this.callback = void 0, this.selectIndex = void 0, this.selectSkill = void 0
                },
                setData: function (t, e) {
                    this.listView.setListView(t), this.callback = e
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectSkillItem: function (t, e) {
                            this.selectIndex = t.index, this.selectSkill = t.data, this.listView.updateListViewItems(this.selectIndex)
                        }
                    }
                },
                onClick: function (t, e) {
                    t.target === this.buttonConfirm.node ? void 0 !== this.selectIndex ? (this.callback(this.selectSkill), this.cancel()) : ftc.showTip("\u8bf7\u5148\u9009\u62e9\u795d\u798f") : t.target === this.buttonClose.node && ftc.showTip("\u8bf7\u5148\u9009\u62e9\u795d\u798f")
                }
            })
        