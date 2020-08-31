

cc._RF.push(e, "68be3mUOSNFl5NtFjLG7spm", "LayoutCopy3");
var number_arr = {
    all: 0,
    notOwned: 1,
    owned: 2,
    names: ["\u5168\u90e8", "\u672a\u62e5\u6709", "\u5df2\u62e5\u6709"]
};
cc.Class({
    extends: ftc.BaseView,
    properties: {
        nodeRoot: cc.Node,
        listView: ftc.ListView,
        nodeEquipItem: cc.Node,
        labelName: cc.Label,
        labelHero: cc.Label,
        labelInfo: cc.Label,
        buttonEquipDetail: cc.Button,
        toggleChallenge: cc.Toggle,
        buttonChallenge: cc.Button,
        toggleMopUp: cc.Toggle,
        buttonMopUp: cc.Button,
        spriteIconConsume: cc.Sprite,
        labelConsume: cc.Label,
        labelTicket: cc.Label,
        buttonEnter: cc.Button,
        labelTimes: cc.Label,
        buttonAdd: cc.Button,
        buttonSelect1: cc.Button,
        buttonSelect2: cc.Button
    },
    init: function () {
        this.prepareParts(["PartMenu"]), this.addClick(this.buttonEnter, {
            zone: 1
        }), this.addClick(this.buttonEquipDetail, !0), this.addClick(this.buttonChallenge, {
            zone: 1
        }), this.addClick(this.buttonMopUp, {
            zone: 1
        }), this.addClick(this.buttonAdd, {
            zone: 1
        }), this.addClick(this.buttonSelect1, !0), this.addClick(this.buttonSelect2, !0)
    },
    load: function () {
        this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("\u6218\u795e\u5175"), this.node.addChild(this.partTopStatus.node), ftc.isTv() && (this.buttonSelect1.node.active = !1, this.buttonSelect2.node.active = !1), this.id = void 0, this.mode = ft.type.copyMode.challenge, this._canEnter = 1, this._selectedIndex = 0, this._tvSelectZone = 0, this.datas1 = void 0, this.datas2 = void 0, this._equipId = 0, this.addPartMenu(), this._equipItem = this.newPart("PartItem"), this._equipItem.node.scale = .9, this.nodeEquipItem.addChild(this._equipItem.node)
    },
    setData: function (t) {
        this.id = ft.value.copy.ShenBing, this.datas = this.getListData(ft.type.country.all, ftc.isTv() ? number_arr.all : number_arr.notOwned), 0 === this.datas.length && (this.datas = this.getListData(ft.type.country.all, number_arr.all)), this.listView.setListView(this.datas), ftc.sendClient("c_onSelectCopy3Item", this.listView.getFirstItem()), this.updateTv(this.datas.length), this.updateTvTip(), this.buttonSelect1.node.getChildByName("Text").getComponent(cc.Label).string = ftc.language("\u56fd\u5bb6:") + ft.type.country.countryNames[this.select1], this.buttonSelect2.node.getChildByName("Text").getComponent(cc.Label).string = number_arr.names[this.select2]
    },
    enter: function () { },
    updateData: function () {
        this.listView.getItem(this._selectedIndex) && (this.partTopStatus.updateData(), this.listView.updateListViewItem(this._selectedIndex), this.selectMode(this.mode))
    },
    addPartMenu: function () {
        var t = this.nodeRoot.convertToNodeSpaceAR(this.buttonSelect1.node.convertToWorldSpaceAR(cc.v2(0, 0)));
        this._partMenuSelect1 = this.newPart("PartMenu"), this._partMenuSelect1.setData(ft.type.country.countryNames, this.onClickSelect1.bind(this)), this._partMenuSelect1.nodeLayout.position = cc.v2(t.x, t.y + 26), this.node.addChild(this._partMenuSelect1.node), this._partMenuSelect1.node.active = !1, t = this.nodeRoot.convertToNodeSpaceAR(this.buttonSelect2.node.convertToWorldSpaceAR(cc.v2(0, 0))), this._partMenuSelect2 = this.newPart("PartMenu"), this._partMenuSelect2.setData(number_arr.names, this.onClickSelect2.bind(this)), this._partMenuSelect2.nodeLayout.position = cc.v2(t.x, t.y + 26), this.node.addChild(this._partMenuSelect2.node), this._partMenuSelect2.node.active = !1
    },
    onClickSelect1: function (t) {
        if (-1 !== t) {
            var e = this.getListData(t);
            e.length > 0 ? (this.buttonSelect1.node.getChildByName("Text").getComponent(cc.Label).string = ftc.language("\u56fd\u5bb6:") + ft.type.country.countryNames[t], this.listView.setListView(e, 0), this.setEquipInfo(e[0]), this._selectedIndex = 0, this.selectMode(this.mode), this.tvZone = 1) : (ftc.showTip("\u65e0\u6b64\u56fd\u5bb6\u7684\u795e\u5175"), this.tvZone = 0), this._partMenuSelect1.node.active = !1, ftc.ManagerTV.nextSelect(void 0, this.node, this.tvZone)
        }
        this.buttonSelect1.node.getChildByName("SpriteArrow").scaleY = 1
    },
    onClickSelect2: function (t) {
        if (-1 !== t) {
            var e = this.getListData(void 0, t);
            e.length > 0 ? (this.buttonSelect2.node.getChildByName("Text").getComponent(cc.Label).string = number_arr.names[t], this.listView.setListView(e, 0), this._selectedIndex = 0, this.setEquipInfo(e[0]), this._canEnter = this.listView.getItem(this._selectedIndex).canChallenge, this.selectMode(this.mode), this.tvZone = 1) : (t == number_arr.owned ? ftc.showTip("\u65e0") : t == number_arr.notOwned && ftc.showTip("\u5168\u90e8\u6311\u6218\u5b8c\u6210"), this.tvZone = 0), this._partMenuSelect2.node.active = !1, ftc.ManagerTV.nextSelect(void 0, this.node, this.tvZone)
        }
        this.buttonSelect2.node.getChildByName("SpriteArrow").scaleY = 1
    },
    setEquipInfo: function (t) {
        var e;
        ft.isNumber(t) ? (e = t, t = null, this._equipItem.setEquipData({
            id: e
        }), this.data = {
            id: e
        }) : (e = t.id, this._equipItem.setEquipData(t), this.data = t), this._equipId = e, this.heroId = ft.ExtEquip.getType(e), this.labelName.string = ft.ExtEquip.getName(e), this.labelHero.string = ft.ExtHero.getName(this.heroId), this.labelInfo.string = ft.ExtEquip.getInfo(e)
    },
    selectMode: function (t) {
        this.mode = t, this.toggleChallenge.isChecked = t === ft.type.copyMode.challenge, this.toggleMopUp.isChecked = t === ft.type.copyMode.mopUp, this.listView.getItem(this._selectedIndex) && (this._canEnter = this.listView.getItem(this._selectedIndex).canChallenge);
        var e = ft.ExtCopy.getRemainingCount(this.id);
        this.labelTimes.string = e + "/" + ft.ExtCopy.getCount(this.id), this.labelTimes.node.color = ftc.newColor(e >= ft.ExtCopy.getCount(this.id) ? ftc.value.color.normal : ftc.value.color.lackRed), this.buttonAdd.node.active = !!(0 === e && ftc.ManagerData.get1("ManagerCopy").battleZSBBuy > 0), this._canEnter &= e > 0;
        var i = ft.ExtCopy.getConsume(this.id),
            a = ft.ExtItem.getNum(i.ids[0]),
            n = i.nums[0];
        if (this._canEnter &= a >= n, t === ft.type.copyMode.mopUp) {
            this.labelTicket.node.parent.active = !0;
            a = ft.ExtItem.getNum(ft.value.item.mopUpTicket);
            this.labelTicket.string = a + "/" + ft.value.com.mopUpTicketNumDaily, this.labelTicket.node.color = ftc.newColor(a >= ft.value.com.mopUpTicketNumDaily ? ftc.value.color.normal : ftc.value.color.lackRed), this._canEnter &= ft.ExtCopy.isFinishChallenge(this.id, this.heroId) && a >= ft.value.com.mopUpTicketNumDaily
        } else this.labelTicket.node.parent.active = !1, this._canEnter &= 1;
        this.buttonEnter.interactable = this._canEnter
    },
    getListData: function (t, e) {
        if (void 0 === t && (t = this.select1), void 0 === e && (e = this.select2), !this.datas1) {
            this.datas1 = [], this.datas2 = [];
            var i = ftc.ManagerData.get2Object("Equip"),
                n = {};
            for (var s in ftd.Equip.data) {
                var o = ft.ExtEquip.getType(s);
                o > 1e3 && 1584 !== o && 1574 !== o && 1591 !== o && ft.ExtItem.mapPartEquips[s] && (i[s] ? (this.datas2.push(i[s]), n[i[s].id] = ft.ExtHero.getIndex(o)) : (this.datas1.push(Number(s)), n[s] = ft.ExtHero.getIndex(o)))
            }
            this.datas1.sort(function (t, e) {
                return n[t] - n[e]
            }), this.datas2.sort(function (t, e) {
                return n[t.id] - n[e.id]
            })
        }
        var r;
        if (e === number_arr.all ? r = this.datas1.concat(this.datas2) : e === number_arr.notOwned ? r = this.datas1.concat() : e === number_arr.owned && (r = this.datas2.concat()), t !== ft.type.country.all)
            for (s = r.length - 1; s >= 0; s--) {
                var c = r[s].id || r[s],
                    h = ft.ExtEquip.getType(c);
                ft.ExtHero.getCountry(h) !== t && r.splice(s, 1)
            }
        return r.length > 0 && (this.select1 = t, this.select2 = e), r
    },
    tick: function (t) { },
    cleanup: function () { },
    msg: function () {
        this.msg = {
            c_onSelectCopy3Item: function (t, e) {
                this.listView.updateListViewItems(t.index), this._selectedIndex = t.index, this._canEnter = t.canChallenge, this.setEquipInfo(t.data), this.selectMode(this.mode)
            },
            copyEnter: function (t, e) {
                0 === t || (1 === t ? ftc.showTip("\u6b21\u6570\u4e0d\u8db3") : 2 === t ? ftc.showTip("\u4e0d\u80fd\u8fdb\u5165") : 3 === t ? ftc.showTip("\u4f53\u529b\u4e0d\u8db3") : 4 === t && ftc.showTip("\u6311\u6218\u5238\u4e0d\u8db3"))
            },
            copyEnd: function (t, e) {
                this.id == t.id && this.updateData()
            },
            copyZSBBuyCount: function (t, e) {
                0 === t ? (ftc.showTip("\u8d2d\u4e70\u6210\u529f"), this.updateData()) : ftc.showTip("\u8d2d\u4e70\u5931\u8d25")
            },
            copyMopUp: function (t, e) {
                0 === t ? this.updateData() : 1 === t ? ftc.showTip("\u6b21\u6570\u4e0d\u8db3") : 2 === t ? ftc.showTip("\u4e0d\u80fd\u8fdb\u5165") : 3 === t && ftc.showTip("\u4f53\u529b\u4e0d\u8db3")
            }
        }
    },
    onClick: function (t, e) {
        if (t.target === this.buttonEquipDetail.node) ftc.showEquipInfo(this.nodeEquipItem, this.data);
        else if (t.target === this.buttonChallenge.node) this.selectMode(ft.type.copyMode.challenge);
        else if (t.target === this.buttonMopUp.node) this.selectMode(ft.type.copyMode.mopUp);
        else if (t.target === this.buttonEnter.node)
            if (this.toggleChallenge.isChecked) {
                var i = ft.ExtEquip.getCopy(this._equipId);
                i ? (ftc.send("copyEnter", {
                    id: i,
                    param: this.heroId
                }), this.cancel(), ftc.sendClient("c_copyEnter", void 0, "LayoutCopy")) : ftc.send("copyEnter", {
                    id: ft.value.copy.ShenBing,
                    param: this.heroId
                })
            } else ftc.send("copyMopUp", {
                id: ft.value.copy.ShenBing,
                param: this.heroId
            });
        else t.target === this.buttonAdd.node ? ft.ExtItem.getNum(ft.value.item.gem) < ft.value.com.copyShenBingBuyCount ? ftc.showTip("\u5143\u5b9d\u4e0d\u8db3") : ftc.showDialog({
            text: "\u786e\u5b9a\u82b1\u8d39%d\u5143\u5b9d\u8d2d\u4e701\u6b21\u6311\u6218".replace("%d", ft.value.com.copyShenBingBuyCount),
            click1: function () {
                ftc.send("copyZSBBuyCount")
            },
            click2: function () { }
        }) : t.target === this.buttonSelect1.node ? (this._partMenuSelect1.node.active = !this._partMenuSelect1.node.active, this.buttonSelect1.node.getChildByName("SpriteArrow").scaleY = -this.buttonSelect1.node.getChildByName("SpriteArrow").scaleY) : t.target === this.buttonSelect2.node && (this._partMenuSelect2.node.active = !this._partMenuSelect2.node.active, this.buttonSelect2.node.getChildByName("SpriteArrow").scaleY = -this.buttonSelect2.node.getChildByName("SpriteArrow").scaleY)
    },
    onKeyBack: function () {
        if (1 === this._tvSelectZone) return this._tvSelectZone = 0, ftc.ManagerTV.nextSelect(this.listView.getItem(this._selectedIndex).buttonSelf, this.node, 0), this.updateTvTip(), !0
    },
    onKeyOk: function (t) {
        if (!t && 0 === this._tvSelectZone) return this._tvSelectZone = 1, ftc.ManagerTV.nextSelect(void 0, this.node, 1), this.updateTvTip(), !0
    },
    updateTv: function (t) {
        t && ftc.ManagerTV.nextSelect(this.listView.getItem(0).buttonSelf)
    },
    updateTvTip: function () {
        var t;
        t = 0 === this._tvSelectZone ? "\u3010\u8fd4\u56de\u952e\u3011\u5173\u95ed\u754c\u9762\uff0c\u3010\u786e\u5b9a\u952e\u3011\u64cd\u4f5c" : "\u3010\u8fd4\u56de\u952e\u3011\u8fd4\u56de\u5217\u8868", ftc.setTvTip(this.node, t)
    }
})
