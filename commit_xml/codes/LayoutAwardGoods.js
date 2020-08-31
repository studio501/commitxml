
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    buttonSelf: cc.Button,
                    spineShow: sp.Skeleton,
                    listView: ftc.ListView,
                    nodeTip: cc.Node
                },
                init: function () {
                    ftc.ManagerTV.setBackButton(this.buttonSelf, this.node), this.addClick(this.buttonSelf, {
                        zone: 99
                    }), ftc.isTv() && (this.nodeTip.active = !1)
                },
                load: function () {
                    this.spineShow.setEventListener(function (t, e) {
                        if (!ftc.ManagerRes.checkNodeIsRestored(this.node) && e.data.name.startsWith("1_")) {
                            var i = e.data.name.substr(2) - 1;
                            if (i < 8 && (i < this.datas.length ? (this.listView.addListViewItem(this.datas[i]), i === this.datas.length - 1 && (this.listView.node.getChildByName("view").getComponent(cc.Mask).enabled = !1)) : (this.buttonSelf.interactable = !0, ftc.ManagerRes.topLayout() == this && (ftc.ManagerTV.updateSelect(this.node), ftc.setTvTip(this.node))), 7 === i && this.datas.length > 7)) {
                                for (var a = 8; a < this.datas.length; a++) this.listView.addListViewItem(this.datas[a]);
                                this.datas.length > 8 && (this.listView.node.getChildByName("view").getComponent(cc.Mask).enabled = !0), this.buttonSelf.interactable = !0, ftc.ManagerRes.topLayout() == this && (ftc.ManagerTV.updateSelect(this.node), ftc.setTvTip(this.node))
                            }
                        }
                    }.bind(this)), this._callback = null, this._canClose = !1, this.datas = [], ftc.playEffect(ftc.type.effect.getGoods), this.spineShow.setAnimation(0, "wait1"), this.buttonSelf.interactable = !1, ftc.hideTvTip(this.node)
                },
                setData: function (t, e) {
                    for (var i = [], a = [], n = 0; n < t.length; n++) i.push(t[n][0]), a.push(t[n][1]);
                    var s = {};
                    for (n = 0; n < i.length; n++) ft.ExtItem.getType(i[n]) === ft.type.item.base && i[n] !== ft.value.item.exp || ft.ExtItem.getType(i[n]) === ft.type.item.task || (s[i[n]] ? s[i[n]] += a[n] : s[i[n]] = a[n]);
                    if (s[ft.value.item.exp]) {
                        var o = ft.getNumShow(s[ft.value.item.exp]);
                        if (o.length > 6) {
                            var r = o.search(/[\u4e00-\u9fa5]/);
                            o = o.slice(0, r) + "\n" + o.slice(r), s[ft.value.item.exp] = o
                        }
                    }
                    var c = [];
                    for (var n in s) c.push({
                        id: n,
                        num: s[n]
                    });
                    this.datas = c, this.listView.setListView([]);
                    var h = c.length;
                    h <= 4 ? (this.listView.node.width = 108 * h, this.listView.node.height = 145, this.listView.node.x = -54 * h, this.listView.node.y = -70) : (this.listView.node.width = 432, this.listView.node.height = 260, this.listView.node.x = -216, this.listView.node.y = -18), this.listView.margin = h <= 8 ? 0 : 14, this._callback = e
                },
                setEquipData: function (t) {
                    var e = this.newPart("PartItem");
                    e.setEquipData(t), e.node.x = cc.winSize.width / 2, e.node.y = cc.winSize.height / 2 - 150, this.node.addChild(e.node)
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {}
                },
                cancelSelf: function () {
                    this.cancel(), this._callback && this._callback(), ftc.showPlayerLevelUp()
                },
                onClick: function (t) {
                    t.target === this.buttonSelf.node && this.cancelSelf()
                },
                onKeyBack: function (t) {
                    return t || this.cancelSelf(), !0
                }
            })
        