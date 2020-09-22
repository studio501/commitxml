var number_arr = [3, 16, 17];
cc.Class({
    extends: ftc.BaseView,
    properties: {
        nodeLayout: cc.Node,
        listView: ftc.ListView,
        nodeAnniversaryUI: cc.Node,
        nodeNewYearUI: cc.Node,
        nodeMayDayUI: cc.Node,
        nodeSummerUI1: cc.Node,
        nodeSummerUI2: cc.Node,
        spriteNewYear: cc.Sprite,
        buttonTabs: [cc.Button],
        spriteRedPoints: [cc.Sprite]
    },
    init: function () {
        this.prepareParts(["PartActivity23Piece", "PartItemSpecial"]);
        for (var t = 0; t < this.buttonTabs.length; t++) this.addClick(this.buttonTabs[t], !0)
    },
    load: function () {
        this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("活动"), this.node.addChild(this.partTopStatus.node), this.partActivities = [], this.selectedIndex = -1, ftc.ManagerTV.setNotShowOnEnter(this.node), this.tvSelectList = !0, this.updateTvTip(), this._tickDate = 0, this.curPartActivity = void 0, this.tabIndex = 0, this._tabLength = 0
    },
    setData: function (t, e) {
        if (this.pos = t, this.partTopStatus.setTitle(ft.ExtMsg.getPosTitle(t)), t !== ft.type.msg.pos.limited && t !== ft.type.msg.pos.anniversary || ftc.localDay <= 0 && ftc.showTip("连接网络获取更多活动数据"), this.nodeAnniversaryUI && (this.nodeAnniversaryUI.active = t === ft.type.msg.pos.anniversary), this.nodeNewYearUI && (this.nodeNewYearUI.active = t === ft.type.msg.pos.newYear), this.spriteNewYear && (this.spriteNewYear.node.active = t === ft.type.msg.pos.newYear), this.nodeMayDayUI && (this.nodeMayDayUI.active = t === ft.type.msg.pos.mayDay), this.nodeSummerUI1 && (this.nodeSummerUI1.active = this.nodeSummerUI2.active = t === ft.type.msg.pos.summer), this.datas = ft.ExtMsg.getMsgDatas(t), this.datas) {
            var i = 0;
            if (e)
                for (var a = 0; a < this.datas.length; a++)
                    if (ft.ExtMsg.getType(this.datas[a]) == e) {
                        i = a;
                        break
                    } if (this.listView.setListView(this.datas, i, i > 0 ? i : void 0), this.updateActivity(i), this.selectedIndex = i, ftc.isTv() && (this.toTvUpdate = !0), this.pos === ft.type.msg.pos.notice) {
                        var n = ftc.ManagerData.get1("ManagerMsg").noticeId2,
                            s = n;
                        for (a = 0; a < this.datas.length; a++) s < this.datas[a].id && (s = this.datas[a].id);
                        s > n && ftc.send("msgNoticeRead", {
                            id: s,
                            type: 1
                        })
                    }
        }
    },
    selectTab: function (t, e, i) {
        if (!this._tabLength) {
            this._tabLength = 0;
            for (var n = 0; n < number_arr.length; n++) ft.ExtMsg.getMsgDatas(number_arr[n]).length > 0 ? (this.buttonTabs[n].node.active = !0, this._tabLength++, i && 1 === this._tabLength && (t = n), this.spriteRedPoints[n].node.active = ft.ExtMsg.checkCanGetByPos(number_arr[n])) : this.buttonTabs[n].node.active = !1
        }
        this.tabIndex = t, this.setData(number_arr[t], e);
        for (n = 0; n < this.buttonTabs.length; n++) this.buttonTabs[n].interactable = this.tabIndex !== n, this.buttonTabs[n].node.getChildByName("labelTab").color = this.tabIndex !== n ? ftc.newColor(ftc.value.color.tabNormal) : ftc.newColor(ftc.value.color.tabPressed), this.buttonTabs[n].node.getChildByName("labelTab").getComponent(cc.LabelOutline).color = this.tabIndex !== n ? ftc.newColor(ftc.value.color.tabNormalOutline) : ftc.newColor(ftc.value.color.tabPressedOutline)
    },
    updateActivity: function (t) {
        this.partTopStatus.setExt();
        var e = this.listView.getDatas()[t];
        e && this.selectActivity(e)
    },
    selectActivity: function (t) {
        if (this.partActivities[t.entityId]) {
            for (var e in this.partActivities) this.partActivities[e].node.active = !1;
            this.curPartActivity = this.partActivities[t.entityId], this.curPartActivity.node.active = !0, this.curPartActivity.updateData()
        } else this.newPartActivity(t, function (e) {
            this.partActivities[t.entityId] = e;
            var i = ft.ExtMsg.getUnionMsgs(t);
            if (i)
                for (var a = 0; a < i.length; a++) this.partActivities[i[a].entityId] = e;
            for (var a in this.partActivities) this.partActivities[a].node.active = !1;
            this.curPartActivity = this.partActivities[t.entityId], this.curPartActivity.node.active = !0
        }.bind(this))
    },
    newPartActivity: function (t, e) {
        var i = "PartActivity" + ft.ExtMsg.getType(t),
            a = i,
            n = ft.ExtMsg.getUIType(t);
        n > 0 && 103 != n && (a += "_" + n), ftc.loadPart(a, function (i) {
            i && (i.node.position = cc.v2(147, -32), i.setData(t), this.nodeLayout.addChild(i.node, 10), e && e(i))
        }.bind(this), void 0, i)
    },
    enter: function () { },
    updateData: function () {
        this.partTopStatus.updateData(), this.listView.updateListViewItems(this.selectedIndex), this.updateActivity(this.selectedIndex), this.buttonTabs.length > 0 && (this.spriteRedPoints[this.tabIndex].node.active = ft.ExtMsg.checkCanGetByPos([ft.type.msg.pos.limited, ft.type.msg.pos.limited_month, ft.type.msg.pos.limited_gift][this.tabIndex]))
    },
    tick: function (t) {
        if (this.toTvUpdate && (this.toTvUpdate = void 0, this.selectedIndex < this.datas.length)) {
            var e = this.listView.getItem(this.selectedIndex);
            e && ftc.ManagerTV.nextSelect(e.buttonSelf)
        }
        this._tickDate += t, this._tickDate >= 60 && (this._tickDate -= 60, this.curPartActivity && this.curPartActivity.updateDate && this.curPartActivity.updateDate())
    },
    cleanup: function () { },
    msg: function () {
        this.msg = {
            c_onSelectActivityItem: function (t, e) {
                this.selectedIndex = t.index, this.updateData()
            },
            c_shareSuccess: function (t, e) {
                ftc.addEventLog(103, 3);
                var i = ftc.ManagerData.get2Object("Msg")[ft.value.msg.giftShare];
                i ? ftc.send("msgActivityGet", {
                    eid: i.entityId
                }) : ftc.showTip("活动不存在")
            },
            c_onSelectActivity: function (t, e) {
                for (var i = this.listView.getDatas(), a = 0; a < i.length; a++)
                    if (i[a].id == t) {
                        this.selectedIndex = a, this.listView.toIndex(a), this.updateData();
                        break
                    }
            },
            c_gotoActivity: function (t) {
                var e = ftc.ManagerData.get2Object("Msg", t);
                if (e)
                    if (e.type == ft.type.activity.monthSign) ftc.loadLayout("LayoutActivitySign");
                    else {
                        var i = number_arr.indexOf(Number(e.pos)),
                            n = i >= 0 ? "LayoutActivityLimited" : "LayoutActivity";
                        ftc.loadLayout("LayoutActivity", function (t) {
                            var a = ft.ExtMsg.getType(e);
                            i >= 0 ? t.selectTab(i, a) : t.setData(e.pos, a)
                        }.bind(this), {
                            hide: !0,
                            resName: n
                        })
                    }
            },
            msgActivityGet: function (t, e) {
                var i = this.partActivities[t.eid];
                i && (-1 === t.ret ? ftc.showTip("领取失败") : 0 === t.ret ? (ft.ExtMsg.getType(ftc.ManagerData.get2("Msg", t.eid)) == ft.type.activity.moonlightBox ? i.updateData(t) : i.updateData(t.index), this.listView.updateListViewItem(this.selectedIndex)) : 1 === t.ret ? (this.datas = ft.ExtMsg.getMsgDatas(this.pos), this.datas.length > 0 ? (this.listView.setListView(this.datas, 0), this.updateActivity(0), this.selectedIndex = 0) : this.cancel()) : 2 === t.ret && ftc.showTip("请连接网络!!!"))
            },
            getPlayer: function (t, e) {
                ftc.cancelWait(), t.type == ft.type.http.GetActiveCdkey ? t.ste ? t.txt && ftc.showTip(t.txt) : (this.updateActivity(this.selectedIndex), ftc.showTip("领取成功")) : ftc.throwMsg("getPlayer", t, e)
            },
            copyEnter: function (t, e) {
                if (0 === t)
                    for (;
                        "LayoutMain" !== ftc.ManagerRes.topLayout().getName();) ftc.ManagerRes.topLayout().cancel();
                else 2 === t && ftc.showTip("等级不足")
            },
            c_showExt: function (t, e) {
                this.partTopStatus.setExt(t)
            }
        }
    },
    onClick: function (t) {
        for (var e = 0; e < this.buttonTabs.length; e++)
            if (t.target === this.buttonTabs[e].node) {
                this.selectTab(e);
                break
            }
    },
    onKeyMenu: function (t) {
        if (0 !== this.buttonTabs.length && !t) {
            var e = this.tabIndex;
            do {
                ++e > 2 && (e = 0)
            } while (0 === ft.ExtMsg.getMsgDatas(number_arr[e]).length);
            return this.selectTab(e), this.tvSelectList = !0, this.updateTvTip(), !0
        }
    },
    onKeyOk: function (t) {
        if (!t && this.tvSelectList) return this.tvSelectList = !1, ftc.ManagerTV.nextSelect(void 0, this.node, 0), this.updateTvTip(), !0
    },
    onKeyBack: function (t) {
        if (!t && !this.tvSelectList) return this.toTvUpdate = !0, this.tvSelectList = !0, this.updateTvTip(), !0
    },
    updateTvTip: function () {
        this.tvSelectList ? this._tabLength > 1 ? ftc.setTvTip(this.node, "【返回键】关闭界面,【菜单键】切换标签，【确认键】活动详情") : ftc.setTvTip(this.node, "【返回键】关闭界面，【确认键】活动详情") : this._tabLength ? ftc.setTvTip(this.node, "【返回键】返回列表,【菜单键】切换标签") : ftc.setTvTip(this.node, "【返回键】返回列表")
    }
})
