

var number_arr;

function n(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t
}
cc.Class((n(number_arr = {
    extends: cc.Component,
    properties: {
        itemName: "",
        margin: 0,
        _partItem: cc.Node,
        _content: null,
        _scrollView: null,
        _datas: [],
        _itemInfos: [],
        _lineSize: 1,
        _partBuffer: [],
        _startTick: 0,
        _message: null,
        _restoreBuffers: [],
        _contentTempY: 0,
        _delayVisibleItems: [],
        _verticalBegPos: 0
    },
    onLoad: function () {
        this._init && (this._init(), this._init = void 0), this.__secondFrameEnter = 0
    },
    update: function (t) {
        this.__secondFrameEnter <= 1 && (this.__secondFrameEnter++, 2 == this.__secondFrameEnter && !this._init && this._initSize && (this._initSize(), this._initSize = void 0))
    },
    onDestroy: function () {
        if (this._restoreBuffers) {
            for (var t = 0; t < this._restoreBuffers.length; t++) this._restoreBuffers[t].isValid && (this._restoreBuffers[t].destroy(), this._isAddToNode && (ftc.ManagerRes.countNodeTotalDestroyPartItem++, ftc.ManagerRes.countNodeTotalRestoredPartItem--));
            this._partItem.isValid && this._partItem.destroy(), this._restoreBuffers = void 0
        }
    },
    newPartItem: function (t) {
        if (!this._itemInfos[t]) return !1;
        if (void 0 === this._datas[t]) return !1;
        var e;
        for (var i in this._unVisibleNodesIndex)
            if (e = this._unVisibleNodesIndex[i]) {
                e.node.removeFromParent(!1), e.node.active = !0, this._partBuffer[i] = void 0, this._unVisibleNodesIndex[i] = void 0;
                break
            } if (!e) {
                var a;
                if (this._restoreBuffers.length > 0 ? (a = this._restoreBuffers[0], this._restoreBuffers.splice(0, 1), this._isAddToNode && ftc.ManagerRes.countNodeTotalRestoredPartItem--) : (a = cc.instantiate(this._partItem), this._isAddToNode && ftc.ManagerRes.countNodeTotalNewPartItem++), (e = a.getComponent(this.itemName))._parentListView = this, e.init) {
                    if (ftc.replacePartFunc[this.itemName])
                        for (var i in ftc.replacePartFunc[this.itemName]) e[i] = ftc.replacePartFunc[this.itemName][i].bind(e);
                    e.init(), e.init = void 0
                }
                e.load && e.load(), a.active = !0
            }
        return this._partBuffer[t] = e, e.setData(t, this._datas[t], this._param), e.node.parent && e.node.removeFromParent(!1), this._content.addChild(e.node), this._updateItemInfo(t), e
    },
    restoreNode: function (t) {
        ftc.ManagerRes.restoreNodes(t), t.removeFromParent(!1), this._restoreBuffers.push(t), this._isAddToNode && ftc.ManagerRes.countNodeTotalRestoredPartItem++
    },
    setLayout: function (t) {
        if (!this._isAddToNode) {
            if (!t)
                for (var e = this.node;
                    (e = e.parent) && e != ftc.scene.node;) {
                    var i = ftc.ManagerRes.findLayoutByNode(e);
                    if (i) {
                        t = i;
                        break
                    }
                }
            this._isAddToNode = ftc.ManagerRes.addListViewToTopLayout(this, t)
        }
    },
    _init: function () {
        if ("" != this.itemName) {
            ftc.isTv() ? this._tickLoad = 1 : this._tickLoad = 4, this.setLayout();
            var t = this.node.getChildByName("view");
            this._content = t.getChildByName("content"), this._partItem = this._content.getChildByName("item"), this._scrollView = this.node.getComponent(cc.ScrollView), this._lineSize = 1, this._contentAnchor = 0, this._partItem.removeFromParent(!1)
        } else ftc.err("\u672a\u586b\u5199ListView \u4e2d\u7684 ItemName")
    },
    _initSize: function () {
        if (this._scrollView.vertical) {
            if (this._lineSize = Math.floor(this._content.width / this._partItem.width), this._partItem.getComponent(cc.Widget) ? this._verticalBegPos = 0 : this._verticalBegPos = (this._content.width - this._lineSize * this._partItem.width) / 2, this._content.height = 0, 1 != this._content.anchorY) return void ftc.err("ListView content Y\u951a\u70b9\u8981\u6c42\u4e3a1");
            0 != this._content.anchorX && (this._contentAnchor = -this._content.anchorX * this._content.width)
        } else {
            if (this._lineSize = Math.floor(this._content.height / this._partItem.height), this._content.width = 0, 0 != this._content.anchorX) return void ftc.err("ListView content X\u951a\u70b9\u8981\u6c42\u4e3a0");
            1 != this._content.anchorY && (this._contentAnchor = (1 - this._content.anchorY) * this._content.height)
        }
        this._lineSize <= 0 && ftc.err("ListView content\u5bbd\u5ea6\u6216\u9ad8\u5ea6\u4e0d\u8db3")
    }
}, "update", function (t) {
    if (this._startTick) {
        if (1 == this._message ? this._toBottom() : 2 == this._message ? this._toTop() : 3 == this._message ? this._toIndex() : this._scrollView.vertical ? Math.abs(this._content.y - this._contentTempPos) > this._partItem.height / 4 && (this._updateNodes = this._content.y >= this._contentTempPos ? 1 : -1, this._contentTempPos = this._content.y) : Math.abs(this._content.x - this._contentTempPos) > this._partItem.width / 4 && (this._updateNodes = this._content.x <= this._contentTempPos ? 1 : -1, this._contentTempPos = this._content.x), this._message = 0, this._tickShowVisibleNodes()) return;
        this._updateNodes && (this._updateVisibleNodes(this._updateNodes), this._updateNodes = 0, this._tickShowVisibleNodes())
    }
}), n(number_arr, "_tickShowVisibleNodes", function () {
    if (this._delayVisibleItems.length) {
        for (var t = Math.ceil(this._delayVisibleItems.length / this._tickLoad), e = 0; e < t; e++) this._setPartBufferActive(this._delayVisibleItems[e]);
        return this._delayVisibleItems.splice(0, t), !0
    }
}), n(number_arr, "_setLinePartBufferNotActive", function (t) {
    for (var e = 0; e < this._lineSize; e++) {
        var i = t + e;
        this._partBuffer[i] && (this._partBuffer[i].node.active = !1, this._unVisibleNodesIndex[i] = this._partBuffer[i])
    }
}), n(number_arr, "_setPartBufferActive", function (t) {
    var e = this._partBuffer[t];
    if (e) e.node.active = !0;
    else if (!this.newPartItem(t)) return;
    this._unVisibleNodesIndex[t] = void 0, this._updatePartPos(t)
}), n(number_arr, "_updatePartPos", function (t) {
    var e = this._partBuffer[t],
        i = this._itemInfos[t];
    this._scrollView.vertical ? (e.node.x = i[0] + e.node.anchorX * e.node.width + this._contentAnchor, e.node.y = -i[1] - this.margin + (e.node.anchorY - 1) * e.node.height) : (e.node.x = i[0] + this.margin + e.node.anchorX * e.node.width, e.node.y = -i[1] + (e.node.anchorY - 1) * e.node.height + this._contentAnchor)
}), n(number_arr, "_flagLinePartBufferActive", function (t, e) {
    for (var i = 0; i < this._lineSize; i++) {
        var a = t + i;
        if (a >= this._itemInfos.length) return;
        1 == e ? this._delayVisibleItems.push(a) : this._delayVisibleItems.splice(0, 0, a)
    }
}), n(number_arr, "_updateVisibleNodes", function (t) {
    if (this._scrollView.vertical) {
        var e = this._content.y;
        e < 0 ? e = 0 : e > this._content.height && (e = this._content.height);
        for (var i = e - this._partItem.height / this._lineSize, a = e + this.node.height + this._partItem.height / this._lineSize, n = 0; n < this._itemInfos.length; n += this._lineSize) {
            (o = this._itemInfos[n][1]) + (this._itemInfos[n][2] ? this._itemInfos[n][2] : this._partItem.height) < i ? this._setLinePartBufferNotActive(n) : o > a ? this._setLinePartBufferNotActive(n) : this._flagLinePartBufferActive(n, t)
        }
    } else {
        var s = -this._content.x;
        s < 0 ? s = 0 : s > this._content.width && (s = this._content.width);
        for (i = s - this._partItem.width / this._lineSize, a = s + this.node.width + this._partItem.width / this._lineSize, n = 0; n < this._itemInfos.length; n += this._lineSize) {
            var o;
            (o = this._itemInfos[n][0]) + (this._itemInfos[n][2] ? this._itemInfos[n][2] : this._partItem.width) < i ? this._setLinePartBufferNotActive(n) : o > a ? this._setLinePartBufferNotActive(n) : this._flagLinePartBufferActive(n, t)
        }
    }
}), n(number_arr, "_toTop", function () {
    if (this._scrollView.vertical) {
        if (this._content.height <= this.node.height) return
    } else if (this._content.width <= this.node.width) return;
    return this._scrollView.stopAutoScroll(), this._scrollView.vertical ? this._content.y = 0 : this._content.x = 0, this._updateNodes = -1, !0
}), n(number_arr, "_toIndex", function (t) {
    if (this._scrollView.vertical) {
        if (this._content.height <= this.node.height) return
    } else if (this._content.width <= this.node.width) return;
    if (void 0 == t && (t = this._messageParam), this._scrollView.stopAutoScroll(), this._scrollView.vertical) {
        var e = this._getContentPos(t);
        this._updateNodes = e >= this._content.y ? 1 : -1, this._content.y = e
    } else {
        var i = this._getContentPos(t);
        this._updateNodes = i <= this._content.x ? 1 : -1, this._content.x = -i
    }
    return !0
}), n(number_arr, "_toBottom", function () {
    if (this._scrollView.vertical) {
        if (this._content.height <= this.node.height) return
    } else if (this._content.width <= this.node.width) return;
    return this._scrollView.stopAutoScroll(), this._scrollView.vertical ? this._content.y = this._getContentPos(this._itemInfos.length) : this._content.x = -this._getContentPos(this._itemInfos.length), this._updateNodes = 1, !0
}), n(number_arr, "_getContentPos", function (t) {
    return t >= this._itemInfos.length && (t = this._itemInfos.length - 1), t < 0 && (t = 0), this._scrollView.vertical ? this._content.height - this._itemInfos[t][1] < this.node.height ? this._content.height - this.node.height : this._itemInfos[t][1] : this._content.width - this._itemInfos[t][0] < this.node.width ? this._content.width - this.node.width : this._itemInfos[t][0]
}), n(number_arr, "restoreNodes", function () {
    if (this._content)
        for (var t = this._content.children.length - 1; t >= 0; t--) this.restoreNode(this._content.children[t])
}), n(number_arr, "_getItemEndPos", function (t) {
    var e = 0;
    if (t >= 0 && this._itemInfos.length > 0 && t < this._itemInfos.length) {
        var i = this._itemInfos[t][2];
        this._scrollView.vertical ? (i || (i = this._partItem.height), e = this._itemInfos[t][1] + i) : (i || (i = this._partItem.width), e = this._itemInfos[t][0] + i)
    }
    return e
}), n(number_arr, "_getItemBegPos", function (t) {
    var e = 0;
    return t >= 0 && this._itemInfos.length > 0 && t < this._itemInfos.length && (e = this._scrollView.vertical ? this._itemInfos[t][1] : this._itemInfos[t][0]), e
}), n(number_arr, "_updateContentSize", function () {
    var t = this.margin + this._getItemEndPos(this._itemInfos.length - 1);
    this._scrollView.vertical ? this._content.height = t : this._content.width = t
}), n(number_arr, "_initItemInfos", function () {
    this._itemInfos = [];
    for (var t = this._datas.length, e = this._scrollView.vertical, i = this._partItem.width, a = this._partItem.height, n = 0; n < t; n++) e ? this._itemInfos.push([n % this._lineSize * i + this._verticalBegPos, Math.floor(n / this._lineSize) * a]) : this._itemInfos.push([Math.floor(n / this._lineSize) * i, n % this._lineSize * a]);
    this._updateContentSize()
}), n(number_arr, "_insertItemInfo", function (t) {
    var e = this._getItemEndPos(Math.floor(t / this._lineSize) * this._lineSize - 1);
    this._scrollView.vertical ? this._itemInfos.splice(t, 0, [t % this._lineSize * this._partItem.width + this._verticalBegPos, e]) : this._itemInfos.splice(t, 0, [e, t % this._lineSize * this._partItem.height]), this._reInitItems(t + 1)
}), n(number_arr, "_deleteItemInfo", function (t) {
    this._itemInfos.splice(t, 1), this._reInitItems(t)
}), n(number_arr, "_updateItemInfo", function (t) {
    if (this._scrollView.vertical) {
        if ((this._itemInfos[t][2] ? this._itemInfos[t][2] : this._partItem.height) == this._partBuffer[t].node.height) return;
        this._itemInfos[t][2] = this._partBuffer[t].node.height
    } else {
        if ((this._itemInfos[t][2] ? this._itemInfos[t][2] : this._partItem.width) == this._partBuffer[t].node.width) return;
        this._itemInfos[t][2] = this._partBuffer[t].node.width
    }
    this._reInitItems(t + 1)
}), n(number_arr, "_reInitItems", function (t) {
    for (var e, i = this._itemInfos.length, a = this._scrollView.vertical, n = 0, s = this._partItem.width, o = this._partItem.height, r = t; r < i; r++) r > 0 && (e = this._itemInfos[r - 1]), a ? (e && (n = e[1], Math.floor(r / this._lineSize) > Math.floor((r - 1) / this._lineSize) && (n += e[2] ? e[2] : o)), this._itemInfos[r] = [r % this._lineSize * s + this._verticalBegPos, n]) : (e && (n = e[0], Math.floor(r / this._lineSize) > Math.floor((r - 1) / this._lineSize) && (n += e[2] ? e[2] : s)), this._itemInfos[r] = [n, r % this._lineSize * o]);
    this._updateContentSize()
}), n(number_arr, "setListView", function (t, e, i) {
    this._init && (this._init(), this._init = void 0), this._initSize && (this._initSize(), this._initSize = void 0), ftc.ManagerTV.cleanClicks(this.node), this._scrollView.stopAutoScroll(), this._startTick = 0, this._param = e, this._partBuffer = [], this._unVisibleNodesIndex = [], this._delayVisibleItems = [], this.restoreNodes(), this._datas = t || [], this._initItemInfos(), this._scrollView.vertical ? this._content.y = 0 : this._content.x = 0, this._contentTempPos = 0, this._startTick = 1, this._updateNodes = 1, void 0 !== i ? this.toIndex(i) : this.update()
}), n(number_arr, "setListViewSize", function (t) {
    if (this._scrollView.vertical) {
        this._initListViewHeight || (this._initListViewHeight = this._scrollView.node.height);
        var e = this._partItem.height * t;
        e > this._initListViewHeight ? e = this._initListViewHeight : this._content.height = e, this._view.height = e, this._scrollView.node.height = e, .5 == this._scrollView.node.anchorY && (this._view.y = -e / 2)
    } else {
        this._initListViewWidth || (this._initListViewWidth = this._scrollView.node.width);
        var i = this._partItem.width * t;
        i > this._initListViewWidth ? i = this._initListViewWidth : this._content.width = i, this._view.width = i, this._scrollView.node.width = i, .5 == this._scrollView.node.anchorX && (this._view.x = -i / 2)
    }
}), n(number_arr, "addListViewItem", function (t, e) {
    if (this._init && (this._init(), this._init = void 0), this._initSize && (this._initSize(), this._initSize = void 0), void 0 === e || e >= this._datas.length || -1 == e) this._datas.push(t), this._insertItemInfo(this._itemInfos.length), this._scrollView.vertical ? this._content.height <= this.node.height + this._partItem.height && (this._updateNodes = 1) : this._content.width <= this.node.width + this._partItem.width && (this._updateNodes = 1);
    else {
        this._datas.splice(e, 0, t), this._partBuffer.splice(e, 0, null);
        for (var i = e + 1; i < this._partBuffer.length; i++) this._partBuffer[i] && this._partBuffer[i].setData(i, this._datas[i], this._param);
        this._insertItemInfo(e), this._updateNodes = 1
    }
}), n(number_arr, "deleteListViewItem", function (t) {
    if (t < this._datas.length) {
        this._datas.splice(t, 1), this._partBuffer[t] && this.restoreNode(this._partBuffer[t].node), this._unVisibleNodesIndex.splice(t, 1), this._partBuffer.splice(t, 1);
        for (var e = t; e < this._partBuffer.length; e++) this._partBuffer[e] && this._partBuffer[e].setData(e, this._datas[e], this._param);
        this._deleteItemInfo(t), this._updateNodes = 1
    }
}), n(number_arr, "updateListViewItem", function (t, e, i) {
    void 0 !== i && (this._param = i), void 0 !== e && (this._datas[t] = e), t < this._partBuffer.length && this._partBuffer[t] && (this._partBuffer[t].setData(t, this._datas[t], this._param), this._updateItemInfo(t), this._updatePartPos(t))
}), n(number_arr, "updateListViewItems", function (t, e) {
    if (void 0 !== t && (this._param = t), e) {
        if (e.length < this._datas.length)
            for (var i = this._datas.length - 1; i >= e.length; i--) this.deleteListViewItem(i);
        else if (e.length > this._datas.length)
            for (i = this._datas.length; i < e.length; i++) this.addListViewItem(e[i]);
        this._datas = e
    }
    for (i = 0; i < this._partBuffer.length; i++) this._partBuffer[i] && (this._partBuffer[i].setData(i, this._datas[i], this._param), this._updateItemInfo(i), this._updatePartPos(i))
}), n(number_arr, "getDatas", function () {
    return this._datas
}), n(number_arr, "getScrollView", function () {
    return this._scrollView
}), n(number_arr, "getFirstIndex", function () {
    for (var t = 0; t < this._itemInfos.length; t++)
        if (this._scrollView.vertical) {
            if (this._itemInfos[t][1] >= this._content.y) return t
        } else if (this._itemInfos[t][0] >= -this._content.x) return t;
    return -1
}), n(number_arr, "getItem", function (t) {
    return this._partBuffer[t]
}), n(number_arr, "toIndex", function (t) {
    t >= 0 && t < this._datas.length && (this._message = 3, this._messageParam = t)
}), n(number_arr, "toTop", function () {
    this._message = 2
}), n(number_arr, "toBottom", function () {
    this._message = 1
}), n(number_arr, "isBottom", function () {
    if (this._scrollView.vertical) {
        if (this._content.y + this.node.height >= this._content.height) return !0
    } else if (-this._content.x + this.node.width >= this._content.width) return !0;
    return !1
}), n(number_arr, "getFirstItem", function () {
    if (this._partBuffer.length) return this.getItem(0)
}), n(number_arr, "getDefaultItemSize", function () {
    return {
        x: this._partItem.width,
        y: this._partItem.height
    }
}), number_arr))
