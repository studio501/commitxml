

cc._RF.push(e, "f7060Y9WvxOa6i8lPMZsfbI", "PageViewIndicatorCustom");
var number_arr = cc.Enum({
    HORIZONTAL: 0,
    VERTICAL: 1
});
cc.Class({
    extends: cc.Component,
    properties: {
        _layout: null,
        _pageView: null,
        _indicators: [],
        spriteFrame: {
            default: null,
            type: cc.SpriteFrame
        },
        spriteFrameHighlight: {
            default: null,
            type: cc.SpriteFrame
        },
        direction: {
            default: number_arr.HORIZONTAL,
            type: number_arr
        },
        cellSize: {
            default: cc.size(20, 20)
        },
        spacing: {
            default: 0
        }
    },
    statics: {
        Direction: number_arr
    },
    onLoad: function () {
        this._updateLayout()
    },
    setPageView: function (t) {
        this._pageView = t, this._refresh()
    },
    _updateLayout: function () {
        this._layout = this.getComponent(cc.Layout), this._layout || (this._layout = this.addComponent(cc.Layout)), this.direction === number_arr.HORIZONTAL ? (this._layout.type = cc.Layout.Type.HORIZONTAL, this._layout.spacingX = this.spacing) : this.direction === number_arr.VERTICAL && (this._layout.type = cc.Layout.Type.VERTICAL, this._layout.spacingY = this.spacing), this._layout.resizeMode = cc.Layout.ResizeMode.CONTAINER
    },
    _createIndicator: function () {
        var t = new cc.Node;
        t.parent = this.node, t.width = this.cellSize.width, t.height = this.cellSize.height;
        var e = new cc.Node,
            i = e.addComponent(cc.Sprite);
        i.spriteFrame = this.spriteFrame, e.parent = t, e.name = "nodeNormal";
        var a = new cc.Node;
        return (i = a.addComponent(cc.Sprite)).spriteFrame = this.spriteFrameHighlight, a.parent = t, a.active = !1, a.name = "nodeHighlight", t
    },
    _changedState: function () {
        var t = this._indicators;
        if (0 !== t.length) {
            var e = this._pageView._curPageIdx;
            if (!(e >= t.length)) {
                for (var i = 0; i < t.length; ++i) {
                    var a = t[i];
                    a.getChildByName("nodeNormal").active = !0, a.getChildByName("nodeHighlight").active = !1
                }
                t[e].getChildByName("nodeNormal").active = !1, t[e].getChildByName("nodeHighlight").active = !0
            }
        }
    },
    _refresh: function () {
        if (this._pageView) {
            var t = this._indicators,
                e = this._pageView.getPages();
            if (e.length !== t.length) {
                var i = 0;
                if (e.length > t.length)
                    for (i = 0; i < e.length; ++i) t[i] || (t[i] = this._createIndicator());
                else
                    for (i = t.length - e.length; i > 0; --i) {
                        var a = t[i - 1];
                        this.node.removeChild(a), t.splice(i - 1, 1)
                    }
                this._layout && this._layout.enabledInHierarchy && this._layout.updateLayout(), this._changedState()
            }
        }
    }
});
cc._RF.pop()
