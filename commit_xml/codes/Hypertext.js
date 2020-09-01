

cc.Class({
    extends: cc.Component,
    properties: {
        _content: null,
        _scrollView: null,
        _partBuffer: [],
        _bufferLabels: [],
        _bufferImages: [],
        _bufferNetImages: [],
        _bufferButtons: [],
        _bufferNetButtons: [],
        _bufferLayouts: []
    },
    onLoad: function () {
        this._init && (this._init(), this._init = void 0)
    },
    _clickMove: function (t) {
        if (this._scrollView.vertical) {
            this._startPoint !== t.touch._startPoint && (this._startPoint = t.touch._startPoint, this._startOffset = this._scrollView.getScrollOffset().y);
            var e = t.touch._point.y - t.touch._startPoint.y,
                i = this.scrollBar.height - this._bar.height,
                a = this._startOffset - e * this._scrollView.getMaxScrollOffset().y / i;
            this._scrollView.scrollToOffset(cc.v2(0, a), 0)
        } else {
            this._startPoint !== t.touch._startPoint && (this._startPoint = t.touch._startPoint, this._startOffset = this._scrollView.getScrollOffset().x);
            e = t.touch._point.x - t.touch._startPoint.x, i = this.scrollBar.width - this._bar.width;
            var n = this._startOffset + -this._scrollView.getMaxScrollOffset().x * e / i;
            this._scrollView.scrollToOffset(cc.v2(-n, 0), 0)
        }
    },
    _clickEnd: function (t) {
        this._startPoint = void 0
    },
    _init: function () {
        this.setLayout();
        var t = this.node.getChildByName("view");
        this._content = t.getChildByName("content"), this._scrollView = this.node.getComponent(cc.ScrollView), this._contentAnchor = 0, this.scrollBar = this.node.getChildByName("scrollBar"), this.scrollBar && (this._bar = this.scrollBar.getChildByName("bar"), this._bar.on(cc.Node.EventType.TOUCH_MOVE, this._clickMove.bind(this)), this._bar.on(cc.Node.EventType.TOUCH_END, this._clickEnd.bind(this)), this.addTVClick(this._bar.getComponent(cc.Sprite), !0)), this.__secondFrameEnter = 0, this._h = {
            h1: 40,
            h2: 30,
            h3: 23.4,
            h4: 20,
            h5: 16.6,
            h6: 15
        }, this._class_font_size = {
            "has-huge-font-size": 40,
            "has-large-font-size": 30,
            "has-medium-font-size": 23.4,
            "has-normal-font-size": 20,
            "has-small-font-size": 16.6
        }, this._class_color = {
            "has-pale-pink-color": cc.color(247, 141, 167),
            "has-vivid-red-color": cc.color(207, 46, 46),
            "has-luminous-vivid-orange-color": cc.color(255, 105, 0),
            "has-luminous-vivid-amber-color": cc.color(252, 185, 0),
            "has-light-green-cyan-color": cc.color(123, 220, 181),
            "has-vivid-green-cyan-color": cc.color(0, 208, 132),
            "has-pale-cyan-blue-color": cc.color(142, 209, 252),
            "has-vivid-cyan-blue-color": cc.color(6, 147, 227),
            "has-vivid-purple-color": cc.color(155, 81, 224),
            "has-very-light-gray-color": cc.color(238, 238, 238),
            "has-cyan-bluish-gray-color": cc.color(171, 184, 195),
            "has-very-dark-gray-color": cc.color(49, 49, 49)
        }
    },
    _initSize: function () {
        this._content.height = 0, 1 == this._content.anchorY ? 0 != this._content.anchorX && (this._contentAnchor = -this._content.anchorX * this._content.width) : ftc.err("Hypertext content Y\u951a\u70b9\u8981\u6c42\u4e3a1")
    },
    addClick: function (t, e) {
        ftc.ManagerRes.addClick(this._isAddToNode, t, e, !1, {
            zone: 1
        }, 2)
    },
    addTVClick: function (t, e) {
        ftc.ManagerTV.addClick(this._isAddToNode.node, t, void 0, void 0, {
            list: this,
            zone: 1,
            bar: e
        })
    },
    onClick: function (t) {
        t.target.__href ? ftc.showBroser(t.target.__href) : this.clickCallback && t.target.click && this.clickCallback(t.target.click[0], t.target.click[1])
    },
    update: function (t) {
        this.__secondFrameEnter <= 1 && (this.__secondFrameEnter++, 2 == this.__secondFrameEnter && !this._init && this._initSize && (this._initSize(), this._initSize = void 0))
    },
    _destroyComponents: function (t) {
        if (t)
            for (var e = 0; e < t.length; e++) t[e].isValid && t[e].destroy()
    },
    onDestroy: function () {
        this.cleanHtml(), this._destroyComponents(this._bufferButtons), this._destroyComponents(this._bufferNetButtons), this._destroyComponents(this._bufferNetImages), this._destroyComponents(this._bufferImages), this._destroyComponents(this._bufferLabels), this._destroyComponents(this._bufferLayouts), this._bufferButtons = void 0, this._bufferNetButtons = void 0, this._bufferNetImages = void 0, this._bufferImages = void 0, this._bufferLabels = void 0, this._bufferLayouts = void 0
    },
    restoreNodes: function () {
        this.cleanHtml()
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
    cleanHtml: function () {
        if (this._partBuffer) {
            for (var t = 0; t < this._partBuffer.length; t++) this._restoreComponent(this._partBuffer[t]);
            this._partBuffer = void 0
        }
    },
    _getComponent: function (t) {
        var e, i, a;
        switch (t) {
            case "Label":
                e = this._bufferLabels, i = cc.Label;
                break;
            case "Sprite":
                e = this._bufferImages, i = cc.Sprite;
                break;
            case "SpriteNet":
                e = this._bufferNetImages, i = cc.Sprite;
                break;
            case "Button":
                e = this._bufferButtons, i = cc.Button;
                break;
            case "ButtonNet":
                e = this._bufferNetButtons, i = cc.Button;
                break;
            case "Layout":
                e = this._bufferLayouts, i = cc.Layout;
                break;
            default:
                return
        }
        return e.length ? (a = e[0], e.splice(0, 1)) : (a = ftc.ManagerRes.getNode("Hypertext" + t, i)).bufferType = t, a
    },
    _restoreComponent: function (t) {
        if (t.node) {
            t.node.parent && t.node.removeFromParent(!1);
            var e, i = !1;
            switch (t.bufferType) {
                case "Label":
                    e = this._bufferLabels, t.node.__href && (i = !0);
                    break;
                case "Sprite":
                    e = this._bufferImages;
                    break;
                case "SpriteNet":
                    e = this._bufferNetImages, i = !0;
                    break;
                case "Button":
                    e = this._bufferButtons;
                    break;
                case "ButtonNet":
                    e = this._bufferNetButtons;
                    break;
                case "Layout":
                    e = this._bufferLayouts;
                    break;
                default:
                    return void ftc.err("\u63a7\u4ef6\u56de\u6536\u51fa\u9519:" + type)
            }
            if (i) t.node.destroy();
            else {
                for (var a = 0; a < e.length; a++)
                    if (e[a] === t) return;
                e.push(t)
            }
        }
    },
    setHtml: function (t, e) {
        this._init && (this._init(), this._init = void 0), this._initSize && (this._initSize(), this._initSize = void 0), ftc.ManagerTV.cleanClicks(this.node), this.cleanHtml(), this._partBuffer = [], this._scrollView.stopAutoScroll(), this._content.y = 0, this.clickCallback = e, t = this._removeNotes(t), t = ft.replaceAll(t, "<br/>", "\n"), t = ft.replaceAll(t, "<br>", "\n"), t = ft.replaceAll(t, "<br />", "\n");
        var i = this._complie(t);
        this._resetParams(), this._dataList(i, this._content)
    },
    _resetParams: function () {
        this._olIndex = 1, this._tableIndex = 0, this._rowWidths = []
    },
    _dataList: function (t, e) {
        for (var i = 0; i < t.list.length; i++) {
            var a = t.list[i];
            if (a.list) {
                var n = e;
                a.tag && (n = this._newLayout(a, e)), this._dataList(a, n)
            } else {
                if (a.tags) {
                    for (var s = !1, o = 0; o < a.tags.length; o++) {
                        var r = a.tags[o][0];
                        if ("img" == r) {
                            this._newImg(a, e), s = !0;
                            break
                        }
                        if ("button" == r) {
                            this._newButton(a, e), s = !0;
                            break
                        }
                    }
                    if (s) continue
                }
                this._newLabel(a, e)
            }
        }
    },
    _readProperty: function (t) {
        for (var e = {}, i = 1; i < t.length; i++) {
            var a = t[i];
            switch (a[0]) {
                case "src":
                    e.url = a[1];
                    break;
                case "width":
                    e.width = parseInt(a[1]);
                    break;
                case "height":
                    e.height = parseInt(a[1]);
                    break;
                case "style":
                    for (var n = "", s = 1; s < a.length; s++) n += a[s];
                    var o = n.split(":");
                    for (s = 0; s < o.length; s += 2) "color" == o[s] && (e.labelColor = this._convert2Color(o[s + 1]));
                    break;
                case "class":
                    for (s = 1; s < a.length; s++) {
                        var r = this._class_font_size[a[s]];
                        if (r) e.labelSize = r;
                        else if ("has-text-color" == a[s]) {
                            for (var c = s + 1; c < a.length; c++)
                                if (r = this._class_color[a[c]]) {
                                    e.labelColor = r;
                                    break
                                }
                        } else if ("has-background" == a[s])
                            for (c = a.length - 1; c > s; c--)
                                if (r = this._class_color[a[c]]) {
                                    e.bgColor = r;
                                    break
                                }
                    }
                    break;
                case "click":
                    for (n = "", s = 1; s < a.length; s++) n += a[s];
                    e.click = n.split(":");
                    break;
                case "href":
                    e.href = a[1]
            }
        }
        return e
    },
    _convert2Color: function (t) {
        return cc.color(parseInt(t.substr(1, 2), 16), parseInt(t.substr(3, 2), 16), parseInt(t.substr(5, 2), 16))
    },
    _addToParent: function (t, e, i) {
        return e.addChild(i.node), this._partBuffer.push(i), i.node
    },
    _isLayoutTag: function (t) {
        switch (t) {
            case "p":
            case "table":
            case "tr":
            case "tbody":
            case "colgroup":
            case "figure":
            case "ol":
            case "ul":
            case "html":
            case "head":
            case "body":
                return !0
        }
        return !1
    },
    _newLayout: function (t, e) {
        var i = this._getComponent("Layout");
        i.type = cc.Layout.Type.VERTICAL, i.resizeMode = cc.Layout.ResizeMode.CONTAINER, i.paddingTop = 0, i.paddingBottom = 0, i.node.anchorX = 0, i.node.anchorY = 1, i.node.height = 0, i.node.x = i.node.y = 0;
        var a = t.tag[0],
            n = !1;
        switch (a) {
            case "p":
                this._resetParams(), i.paddingTop = 10, i.paddingBottom = 10, i.node.width = e.width, i.type = cc.Layout.Type.GRID, i.node.prop = this._readProperty(t.tag);
                break;
            case "table":
                this._resetParams(), i.type = cc.Layout.Type.GRID;
                var s = this._readProperty(t.tag);
                i.node.prop = this._readProperty(t.tag), s.width ? i.node.width = s.width : i.node.width = e.width;
                break;
            case "tr":
                i.node.width = e.width, i.type = cc.Layout.Type.GRID;
                break;
            case "ul":
                this._olIndex > 0 && (this._olIndex *= -1);
            case "tbody":
            case "colgroup":
            case "figure":
            case "ol":
            case "html":
            case "head":
            case "body":
                n = !0;
            default:
                return this._restoreComponent(i), !n && ftc.warn("\u672a\u8bc6\u522b\u7684Node\u6807\u7b7e:" + a), e
        }
        return i.node.prop && i.node.prop.bgColor, this._addToParent("Layout", e, i)
    },
    _newLabel: function (t, e) {
        var i = this._getComponent("Label");
        i.node.color = cc.Color.BLACK, e.prop && e.prop.labelColor && (i.node.color = e.prop.labelColor), i.node.anchorX = 0, i.node.width = 0, i.node.x = i.node.y = 0, i.overflow = cc.Label.Overflow.NONE, void 0 !== t.txt ? i.string = t.txt : i.string = "", i.horizontal = cc.Label.HorizontalAlign.LEFT, i.fontSize = this._h.h4, e.prop && e.prop.labelSize && (i.fontSize = e.prop.labelSize), i.enableBold = !1, i.enableItalic = !1, i.enableUnderline = !1;
        var a = !1,
            n = !1;
        if (t.tags) {
            for (var s, o = 0; o < t.tags.length; o++) {
                var r = t.tags[o];
                switch (r[0]) {
                    case "a":
                        i.enableUnderline = !0, i.node.color = cc.Color.BLUE, (s = this._readProperty(r)).href && (i.node.__href = s.href, i.node.addComponent(cc.Button), this.addClick(i.node.getComponent(cc.Button)));
                        break;
                    case "strong":
                        i.enableBold = !0;
                        break;
                    case "u":
                        i.enableUnderline = !0;
                        break;
                    case "em":
                        i.enableItalic = !0;
                        break;
                    case "title":
                        i.fontSize = 30, a = !0;
                        break;
                    case "h1":
                    case "h2":
                    case "h3":
                    case "h4":
                    case "h5":
                    case "h6":
                        i.fontSize = this._h[r[0]];
                        break;
                    case "hr":
                        i.string = "\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014", i.overflow = cc.Label.Overflow.CLAMP, i.node.width = e.width, a = !0;
                        break;
                    case "li":
                        this._olIndex > 0 ? (i.string = "    " + this._olIndex + "." + i.string, this._olIndex++) : i.string = "    \u25cf" + i.string, a = !0;
                        break;
                    case "td":
                    case "th":
                        i.overflow = cc.Label.Overflow.RESIZE_HEIGHT, this._rowWidths.length ? (this._tableIndex >= this._rowWidths.length && (this._tableIndex = 0), i.node.width = this._rowWidths[this._tableIndex], this._tableIndex++) : i.node.width = 200;
                        break;
                    case "span":
                        s = this._readProperty(r);
                        break;
                    case "col":
                        s = this._readProperty(r), this._rowWidths[this._tableIndex++] = s.width, n = !0;
                    default:
                        return this._restoreComponent(i), void (!n && ftc.warn("\u672a\u8bc6\u522b\u7684Label\u6807\u7b7e:" + r[0]))
                }
            }
            s && (s.labelColor && (i.node.color = s.labelColor), s.labelSize && (i.fontsize = s.labelSize))
        }
        i.overflow == cc.Label.Overflow.NONE && (a || i.string.length > 32) && (i.node.width = e.width, i.overflow = cc.Label.Overflow.RESIZE_HEIGHT), i.lineHeight = i.fontSize + 2, this._addToParent("Label", e, i)
    },
    _newImg: function (t, e) {
        for (var i, a, n = 0; n < t.tags.length; n++) {
            var s = t.tags[n];
            if ("img" === s[0]) {
                i = this._readProperty(s);
                break
            }
        }
        i.url && (0 == i.url.indexOf("http") && (a = this._getComponent("SpriteNet"), ftc.loadNetImage(i.url, function (t) {
            t && (a.spriteFrame = t)
        }.bind(this)), this._addToParent("SpriteNet", e, a)), a.node.x = a.node.y = 0, a.node.anchorX = 0, a.type = cc.Sprite.Type.SIMPLE, i.width && i.height ? (a.sizeMode = cc.Sprite.SizeMode.CUSTOM, a.node.width = i.width, a.node.height = i.height) : a.sizeMode = cc.Sprite.SizeMode.RAW)
    },
    _newButton: function (t, e) {
        for (var i, a = 0; a < t.tags.length; a++) {
            var n = t.tags[a];
            if ("button" === n[0]) {
                i = this._readProperty(n);
                break
            }
        }
        var s, o = !1;
        i.url && 0 == i.url.indexOf("http") ? (s = this._getComponent("ButtonNet"), o = !0) : s = this._getComponent("Button");
        var r = s.node.getComponent(cc.Sprite);
        r || (s.node.addComponent(cc.Sprite), r = s.node.getComponent(cc.Sprite)), s.node.y = 0, s.node.width = 140, s.node.height = 50, i.url && o && ftc.loadNetImage(i.url, function (t) {
            t && (r.spriteFrame = t)
        }.bind(this));
        var c = s.node.getComponent(cc.Label);
        t.txt ? (c || (s.node.addComponent(cc.Label), c = s.node.getComponent(cc.Label)), c.string = t.txt) : c && (c.string = ""), i.width && (s.node.width = i.width), i.height && (s.node.height = i.height), i.click ? (s.node.click = i.click, this.addClick(s)) : this.addTVClick(s), s.node.x = s.node.width / 2, this._addToParent(o ? "ButtonNet" : "Button", e, s)
    },
    _complie: function (t) {
        for (var e, i = {
            list: []
        }, a = [], n = 0, s = 0, o = i, r = 0; r < t.length; r++) {
            var c = t[r];
            if ("<" === c) s < r && this._pushItem(o, a, t.substring(s, r)), "/" === t[r + 1] ? (n = r + 2, e = !0) : (n = r + 1, e = !1);
            else if (">" === c) {
                s = r + 1;
                var h = t.substring(n, r);
                if (e) {
                    if (h = ft.replaceAll(h, " ", ""), this._isLayoutTag(h)) {
                        o = o.parent;
                        continue
                    }
                    a.splice(a.length - 1, 1)
                } else {
                    var f;
                    if (h = ft.replaceAll(h, '"', ""), "/" === t[r - 1] ? (e = !0, f = h.substr(0, h.length - 1).split(" ")) : f = h.split(" "), this._isLayoutTag(f[0])) {
                        var d = {
                            tag: this._handleTagProperty(f),
                            list: [],
                            parent: o
                        };
                        o.list.push(d), e || (o = d);
                        continue
                    }
                    if (a.push(f), e) this._pushItem(o, a), a.splice(a.length - 1, 1);
                    else switch (a[a.length - 1][0]) {
                        case "hr":
                        case "img":
                        case "input":
                        case "param":
                        case "meta":
                        case "link":
                            this._pushItem(o, a), a.splice(a.length - 1, 1)
                    }
                }
            }
        }
        return i
    },
    _removeNotes: function (t) {
        for (var e = 0; e < t.length - 2; e++)
            if ("<" == t[e] && "!" == t[e + 1])
                for (var i = e + 4; i < t.length; i++)
                    if (">" == t[i] && "-" == t[i - 1]) {
                        t = ft.replaceAll(t, t.substring(e, i + 1), "");
                        break
                    } return t
    },
    _handleTagProperty: function (t) {
        for (var e = [t[0]], i = 1; i < t.length; i++) t[i].indexOf("=") >= 0 ? e.push(t[i].split("=")) : e.length > 1 && e[e.length - 1].push(t[i]);
        return e
    },
    _pushItem: function (t, e, i) {
        var a;
        if (e.length) {
            a = [];
            for (var n = 0; n < e.length; n++) a.push(this._handleTagProperty(e[n]))
        }
        if (i) {
            for (n = 0; n < i.length - 3; n++)
                if ("&" == i[n] && "#" == i[n + 1]) {
                    for (var s = 0, o = n + 4; o < i.length; o++)
                        if (";" == i[o]) {
                            s = o - n - 2;
                            break
                        } var r = parseInt(i.substr(n + 2, s));
                    i = ft.replaceAll(i, i.substr(n, s + 3), String.fromCharCode(r))
                } i = ft.replaceAll(i, "&quot;", '"'), i = ft.replaceAll(i, "&amp;", "&"), i = ft.replaceAll(i, "&lt;", "<"), i = ft.replaceAll(i, "&gt;", ">"), i = ft.replaceAll(i, "&nbsp;", " ")
        } (a || i) && t.list.push({
            tags: a,
            txt: i
        })
    },
    http: function (t, e, i) {
        ftc.showTop(!0), fts || (t = ft.replaceAll(t, "http://", "https://")), ft.httpConnect(e ? "POST" : "GET", t, e, function (t, e) {
            if (ftc.cancelTop(), t) {
                if (-1 == e || 0 == e) return void ftr.showTip("\u8fde\u63a5\u51fa\u9519");
                try {
                    i(JSON.parse(e))
                } catch (t) {
                    ftc.console("\u63a5\u6536\u6570\u636e\u5f02\u5e38:" + e + t)
                }
            } else ftr.showTip(e)
        }.bind(this))
    }
})
