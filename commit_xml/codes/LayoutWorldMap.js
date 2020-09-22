

cc._RF.push(e, "3364dVSdiFMZJ/H+6OP3Stu", "LayoutWorldMap");
var number_arr = 120,
    n = 100,
    s = 200,
    o = 250,
    r = 300,
    c = 0,
    h = 1;
cc.Class({
    extends: ftc.BaseView,
    properties: {
        tiledMap: cc.TiledMap,
        nodeScaleButtons: cc.Node,
        buttonEnlarge: cc.Button,
        buttonReduce: cc.Button,
        spineMine: sp.Skeleton,
        spriteTask: cc.Sprite,
        nodeClouds: [cc.Node],
        nodeBirds: [cc.Node],
        nodeTask: cc.Node,
        nodeTaskDir: cc.Node,
        listViewInfo: ftc.ListView
    },
    init: function () {
        this.prepareParts(["PartMapNpc"]), this._mapInfo = {}, this.addClick(this.buttonEnlarge), this.addClick(this.buttonReduce);
        for (var t = 0; t < this.nodeBirds.length; ++t) this.nodeBirds[t].active = !1;
        for (t = 0; t < this.nodeClouds.length; ++t) this.nodeClouds[t].active = !1;
        this.spineMine.node.zIndex = s + 1, this.spineMine.node.active = !1, this.spriteTask.node.zIndex = s, this.spriteTask.node.active = !1, this.nodeTask.zIndex = number_arr, this.nodeTask.active = !1, this.nodeTaskDir.zIndex = o, this.nodeTaskDir.active = !1, this.nodeScaleButtons.active = !1, this.listViewInfo.node.zIndex = r, this.listViewInfo.node.active = !1, this.tiledMap.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this), this.tiledMap.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this), this.tiledMap.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this), ftc.ManagerTV.setNotShowOnEnter(this.node)
    },
    touchStart: function (t) {
        this._mapRunning || (this._touchSPos = t.getLocation(), this._origMapPos = this.tiledMap.node.position, this._touchMove = !1)
    },
    touchMove: function (t) {
        var e = t.getLocation();
        this._touchMove ? (this.moveTiledMap(e), this.listViewInfo.node.active = !1, this._showNpcId = -1) : (e.x - this._touchSPos.x) * (e.x - this._touchSPos.x) + (e.y - this._touchSPos.y) * (e.y - this._touchSPos.y) >= 100 && (this._touchMove = !0)
    },
    touchEnd: function (t) {
        var e = t.getLocation();
        this._touchMove ? this.moveTiledMap(e) : this.checkNpcClick(e)
    },
    moveTiledMap: function (t) {
        var e = this.node.convertToNodeSpaceAR(t),
            i = e.x - this._touchSPos.x,
            a = e.y - this._touchSPos.y,
            n = this._origMapPos.x + i,
            s = this._origMapPos.y + a;
        n = ft.max(this._mapBorder.minX, n), n = ft.min(this._mapBorder.maxX, n), s = ft.max(this._mapBorder.minY, s), s = ft.min(this._mapBorder.maxY, s), this.tiledMap.node.x = n, this.tiledMap.node.y = s, this.updateTaskDir()
    },
    checkNpcClick: function (t) {
        var e = this.tiledMap.node.convertToNodeSpaceAR(t),
            i = e.x / ftc.TileSize,
            a = e.y / ftc.TileSize;
        for (var n in this.partNpcs) {
            var s = this.partNpcs[n];
            if (s.tx <= i && i < s.tx + s.tw && s.ty <= a && a < s.ty + s.th) return this._scaleStatus == h && this.scaleMap(c, t), void (this._showNpcId != s.npc.id ? (this.listViewInfo.node.active = !1, this.moveNpcToScreenCentre(s, !1, function () {
                ftc.playEffect(ftc.type.effect.worldMap_click), this.showMapInfo(s.npc.id)
            }.bind(this))) : (this.listViewInfo.node.active = !1, this._showNpcId = -1))
        }
        this._scaleStatus == h && this.scaleMap(c, t), this.listViewInfo.node.active = !1, this._showNpcId = -1
    },
    load: function () {
        ftc.showWait("加载地图中...", 0, void 0, 255, ft.type.wait.car), this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("世界地图", 1), this.partTopStatus.setCloseCallback(function () {
            this.cancel(!1, !0), (ftc.isIos() || ftc.ManagerH5.isH5()) && ftc.sysGC()
        }.bind(this)), this.node.addChild(this.partTopStatus.node), ftc.setTvTip(this.node, "【返回键】关闭界面，【菜单键】放大缩小"), this._mapLoaded = !1, this._markedSign = !1, this._mapRunning = !1, this._touchSPos = void 0, this._touchMove = !1, this._narrowScale = 1, this._enlargeScale = 1, this._mineNpc = void 0, this._taskNpc = void 0, this._mapBorder = {
            minX: 0,
            maxX: 0,
            minY: 0,
            maxY: 0
        }, this._scaleStatus = -1, this._showNpcId = -1, this.listViewInfo.node.active = !1, this.spineMine.node.active = !1, this.spriteTask.node.active = !1, this.nodeTask.active = !1, this.tiledMap.node.stopAllActions(), this.tiledMap.node.position = cc.v2(0, 0), this.loadMapFile(2)
    },
    setData: function (t) { },
    enter: function () {
        this.updateData()
    },
    updateData: function () {
        this.partTopStatus.updateData()
    },
    tick: function (t) {
        this._mapLoaded && !this._markedSign && (this.signMapPoint(!1), this._markedSign = !0), this._mapLoaded && this._mapRunning && this.updateTaskDir()
    },
    cleanup: function () { },
    msg: function () {
        this.msg = {}
    },
    onClick: function (t, e) {
        if (!this._mapRunning)
            if (t.target === this.buttonEnlarge.node) {
                var i = cc.v2(0, 0);
                this._mineNpc && (i = this.tiledMap.node.convertToWorldSpaceAR(this._mineNpc.node.position)), this.scaleMap(1 - this._scaleStatus, i), this._mineNpc && this.moveNpcToScreenCentre(this._mineNpc), ftc.ManagerTV.updateSelect(this.node)
            } else if (t.target === this.buttonReduce.node) {
                i = cc.v2(0, 0);
                this._mineNpc && (this.moveNpcToScreenCentre(this._mineNpc, !0), i = this.tiledMap.node.convertToWorldSpaceAR(this._mineNpc.node.position)), this.scaleMap(1 - this._scaleStatus, i), ftc.ManagerTV.updateSelect(this.node)
            } else {
                if (this._scaleStatus == h) return;
                for (var a in this.partNpcs)
                    if (this.partNpcs[a].node == t.target) return void (this._showNpcId != this.partNpcs[a].npc.id ? (ftc.playEffect(ftc.type.effect.worldMap_click), this.showMapInfo(this.partNpcs[a].npc.id)) : (this.listViewInfo.node.active = !1, this._showNpcId = -1))
            }
    },
    loadMapFile: function (t) {
        var e = "map/" + ftd.Map.get(t, "mapfile");
        cc.loader.loadRes(e, function (i, a) {
            if (ftc.cancelWait(), !ftc.ManagerRes.isLoadResErr(i, e, !0)) {
                if (!a) return;
                this.tiledMap.tmxAsset = a, this._mapInfo = {}, ftc.TileSize = this.tiledMap.getTileSize().width;
                var n = this.tiledMap.getProperties(),
                    s = [0, 0];
                if (n.padding)
                    for (var o = n.padding.split(","), r = 0; r < ft.min(o.length, s.length); ++r) s[r] = Number(o[r]);
                var c = this.tiledMap.getMapSize().width - s[0],
                    h = this.tiledMap.getMapSize().height - s[1];
                this._mapInfo.mapSize = {
                    width: c,
                    height: h
                }, this._mapInfo.mapCurSize = {
                    width: c * ftc.TileSize,
                    height: h * ftc.TileSize
                }, this.tiledMap.node.width = this._mapInfo.mapCurSize.width, this.tiledMap.node.height = this._mapInfo.mapCurSize.height;
                var f = ft.max(cc.winSize.width / this.tiledMap.node.width, cc.winSize.height / this.tiledMap.node.height);
                this._narrowScale = ft.max(.5, f), this._mapBorder.minX = cc.winSize.width - this._mapInfo.mapCurSize.width, this._mapBorder.minY = cc.winSize.height - this._mapInfo.mapCurSize.height, this.tiledMap.node.scale = 1;
                var d = this.tiledMap.getLayers();
                for (r = 0; r < d.length; ++r) - 1 != d[r].name.indexOf("yd") && this.loadYdLayer(d[r]);
                this.loadMapNpcs(t), this.loadSpraies(), this.loadClouds(), this.loadBirds(), this.nodeScaleButtons.active = !ftc.isTv()
            }
        }.bind(this))
    },
    loadMapNpcs: function (t) {
        var e = ft.ExtNpc.getMapNpcIds(t);
        this.mapNpcs = [], this.partNpcs = [];
        for (var i = 0; i < e.length; ++i) this.mapNpcs.push({
            id: e[i].npc,
            x: e[i].x,
            y: e[i].y,
            tw: e[i].width,
            th: e[i].height
        });
        if (this._loadNpcSize = 0, this._loadNpcProgress = 0, this._loadNpcSize = this.mapNpcs.length, this.mapNpcs.length)
            for (i = 0; i < this._loadNpcSize; i++) this.newMapNpc(this.mapNpcs[i], function () {
                if (this._loadNpcProgress++, this._loadNpcProgress >= this._loadNpcSize) {
                    this._mapLoaded = !0, this.signMapPoint(!0);
                    var t = cc.v2(0, 0);
                    this._mineNpc ? (t = this.tiledMap.node.convertToWorldSpaceAR(this._mineNpc.node.position), this.scaleMap(c, t), this.moveNpcToScreenCentre(this._mineNpc, !0)) : this.scaleMap(c, t), this._mineNpc && ftc.ManagerTV.nextSelect(this._mineNpc)
                }
            }.bind(this))
    },
    newMapNpc: function (t, e) {
        this.partNpcs[t.id] = this.newPart("PartMapNpc"), ftc.isTv() && ftc.ManagerTV.addClick(this.node, this.partNpcs[t.id], void 0, this.onClick.bind(this)), this.partNpcs[t.id].setData(t, e, this.tiledMap.node), this.tiledMap.node.addChild(this.partNpcs[t.id].node, n)
    },
    loadYdLayer: function (t) {
        var e = t.getProperties(),
            i = e.spos.split(","),
            a = cc.v2(Number(i[0]) * ftc.TileSize, Number(i[1]) * ftc.TileSize),
            n = e.epos.split(","),
            s = cc.v2(Number(n[0]) * ftc.TileSize, Number(n[1]) * ftc.TileSize);
        t.node.stopAllActions(), t.node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function () {
            t.node.position = a
        }.bind(this)), cc.moveTo(e.time, s))))
    },
    loadSpraies: function () {
        this.loadResource("spine/npc/scene_18", sp.SkeletonData, function (t) {
            var e = new cc.Node,
                i = e.addComponent(sp.Skeleton);
            this.tiledMap.node.addChild(e), e.position = cc.v2(1030, 800), i.skeletonData = t, i.animation = "wait1"
        }.bind(this))
    },
    loadClouds: function () {
        for (var t = 0; t < 2; ++t) {
            var e = 0 == t ? .75 : .25,
                i = 0 == t ? 500 : -500,
                a = .5 * this._mapInfo.mapCurSize.width + i,
                n = this._mapInfo.mapCurSize.height * e + ft.rand(200) - 100;
            this.nodeClouds[t].zIndex = s, this.nodeClouds[t].scale = 3 + (ft.rand(20) - 10) / 100, this.nodeClouds[t].position = cc.v2(a, n), this.nodeClouds[t].active = !0, this.runCloud(this.nodeClouds[t], t, a)
        }
    },
    runCloud: function (t, e, i) {
        var a = 0 == e ? .75 : .25,
            n = -i - 2.3 * t.width,
            s = (i - n) / (15 + ft.rand(10));
        t.stopAllActions(), t.runAction(cc.sequence(cc.moveBy(s, n, 0), cc.delayTime(ft.rand(30) / 10), cc.callFunc(function () {
            var i = this._mapInfo.mapCurSize.width + 2.3 * t.width,
                n = this._mapInfo.mapCurSize.height * a + ft.rand(200) - 100;
            t.scale = 3 + (ft.rand(20) - 10) / 100, t.position = cc.v2(i, n), this.runCloud(t, e, i)
        }.bind(this))))
    },
    loadBirds: function () {
        for (var t = [cc.v2(1350, 1300), cc.v2(1500, 400), cc.v2(1800, 600), cc.v2(1e3, 800), cc.v2(1600, 200), cc.v2(800, 1400)], e = [cc.v2(1350, 1800), cc.v2(1500, -200), cc.v2(2300, 1e3), cc.v2(0, -200), cc.v2(2300, 200), cc.v2(-200, 1400)], i = [cc.v2(1350, -200), cc.v2(1500, 1800), cc.v2(1e3, -200), cc.v2(2e3, 1800), cc.v2(-200, 200), cc.v2(2300, 1400)], a = 0; a < 6; ++a) {
            this.nodeBirds[a].position = t[a];
            var n = .7 + (ft.rand(20) - 10) / 100;
            this.nodeBirds[a].scaleX = this.nodeBirds[a].scaleX / Math.abs(this.nodeBirds[a].scaleX) * n, this.nodeBirds[a].scaleY = this.nodeBirds[a].scaleY / Math.abs(this.nodeBirds[a].scaleY) * n, this.nodeBirds[a].zIndex = s + 1, this.nodeBirds[a].active = !0, this.runBird(this.nodeBirds[a], e[a], i[a])
        }
    },
    runBird: function (t, e, i) {
        var a = Math.sqrt((i.x - t.x) * (i.x - t.x) + (i.y - t.y) * (i.y - t.y)) / (130 + ft.rand(20));
        t.stopAllActions(), t.runAction(cc.sequence(cc.moveTo(a, i), cc.delayTime(ft.rand(30) / 10), cc.callFunc(function () {
            t.position = e;
            var a = .7 + (ft.rand(20) - 10) / 100;
            t.scaleX = t.scaleX / Math.abs(t.scaleX) * a, t.scaleY = t.scaleY / Math.abs(t.scaleY) * a, this.runBird(t, e, i)
        }.bind(this))))
    },
    showMapInfo: function (t) {
        var e = ftd.Npc.get(t, "c_work").split(":")[1];
        if (void 0 != e) {
            var i = ftd.Npcworldinfo.get(e, "a_text");
            this.listViewInfo.setListView(i);
            var a = this.partNpcs[t].tx * ftc.TileSize,
                n = this.partNpcs[t].ty * ftc.TileSize,
                s = ftd.Npcworldinfo.get(e, "dir"),
                o = this.listViewInfo.node.getChildByName("SpriteBG"),
                r = this.listViewInfo.node.getChildByName("view");
            0 == s ? (this.listViewInfo.node.position = cc.v2(a - .5 * this.listViewInfo.node.width + 20, n + this.listViewInfo.node.height + 20), o.scaleX = -1, o.scaleY = 1, r.x = -7.2) : 1 == s ? (this.listViewInfo.node.position = cc.v2(a - .5 * this.listViewInfo.node.width + 20, n + 35), o.scaleX = -1, o.scaleY = -1, r.x = -7.2) : 2 == s ? (this.listViewInfo.node.position = cc.v2(a + .5 * this.listViewInfo.node.width + 45, n + this.listViewInfo.node.height + 20), o.scaleX = 1, o.scaleY = 1, r.x = 7.2) : (this.listViewInfo.node.position = cc.v2(a + .5 * this.listViewInfo.node.width + 45, n + 35), o.scaleX = 1, o.scaleY = -1, r.x = 7.2), this._showNpcId = t, this.listViewInfo.node.active = !0
        }
    },
    getPartByNpcId: function (t) {
        for (var e in this.partNpcs)
            if (this.partNpcs[e].npc.id == t) return this.partNpcs[e]
    },
    getSignPosition: function (t) {
        for (var e in this.partNpcs)
            if (this.partNpcs[e].npc.id == t) return this.partNpcs[e]
    },
    updateTaskDir: function () {
        if (this.nodeTask.active) {
            var t = this.nodeTask.convertToWorldSpaceAR(cc.v2(0, 0)),
                e = t.x,
                i = t.y,
                a = 30 * this.tiledMap.node.scale,
                n = !0;
            if (t.y < a && (i = a, n = !1), t.y > cc.winSize.height - a && (i = cc.winSize.height - a, n = !1), t.x < a && (e = a, n = !1), t.x > cc.winSize.width - a && (e = cc.winSize.width - a, n = !1), e = ft.min(ft.max(e, a), cc.winSize.width - a), i = ft.min(ft.max(i, a), cc.winSize.height - a), this.nodeTaskDir.active = !0, n) this._mineNpc == this._taskNpc ? (this.nodeTaskDir.angle = 0, this.nodeTaskDir.position = cc.v2(this.nodeTask.x, this.nodeTask.y - 20)) : (this.nodeTaskDir.angle = 0, this.nodeTaskDir.position = cc.v2(this.nodeTask.x, this.nodeTask.y + 5));
            else {
                var s = this.tiledMap.node.convertToNodeSpaceAR(cc.v2(e, i)),
                    o = Math.atan2(i - t.y, e - t.x) / Math.PI * 180;
                this.nodeTaskDir.angle = o - 90, this.nodeTaskDir.position = s
            }
        }
    },
    signMapPoint: function (t) {
        var e = ftc.ManagerData.get2Object("Map");
        if (t) {
            var i = ftc.ManagerData.get1("ManagerHero").commander0,
                a = i > 1e3 ? ft.ExtHero.getImg(i) : i;
            for (var n in -1 === [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1022, 1035, 1042, 1070, 2010, 2545, 1021, 1031, 1017, 1029, 1040, 1093, 1037, 1076, 3, 1018, 1041, 1575].indexOf(Number(a)) && (a = 2010), this.loadResource("spine/npc/map_role_" + a, sp.SkeletonData, function (t) {
                this.spineMine.skeletonData = t, this.spineMine.animation = "wait2"
            }.bind(this)), e) {
                if (ft.ExtMap.getType(e[n].id) == ft.type.map.normal) {
                    var s = ft.ExtMap.getGroupNpc(e[n].id);
                    (h = this.getSignPosition(s)) && (this._mineNpc = this.getPartByNpcId(s), this.spineMine.node.position = cc.v2((h.tx + h.tw / 2) * ftc.TileSize, (h.ty + h.th) * ftc.TileSize - 40), this.spineMine.node.active = !0);
                    break
                }
            }
        } else {
            var o = ftc.ManagerData.get1("ManagerTask").cur;
            if (o) {
                var r = ftc.ManagerData.get2Object("Task", o);
                if (r) {
                    this.spriteTask.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "map_legend6_1");
                    var c = ft.ExtEvent.getNpc(r.eventId, r);
                    if (c) {
                        e = ft.ExtNpc.npc2Map[c];
                        for (var n in e) {
                            var h;
                            s = ft.ExtMap.getGroupNpc(n);
                            if (h = this.getSignPosition(s)) {
                                this._taskNpc = this.getPartByNpcId(s);
                                var f = h.node.x - .5 * h.labelName.node.width - .5 * this.spriteTask.node.width * .55,
                                    d = h.node.y + h.labelName.node.y - .5 * this.spriteTask.node.height + 8;
                                this.spriteTask.node.position = cc.v2(f, d), this.spriteTask.node.active = !0, this.nodeTask.position = cc.v2(h.node.x, h.node.y - 3), this.nodeTask.active = !0, this.updateTaskDir();
                                break
                            }
                        }
                    }
                }
            }
        }
    },
    scaleMap: function (t, e) {
        if (this._scaleStatus != t) {
            t == h && (this.listViewInfo.node.active = !1, this._showNpcId = -1);
            var i = 1;
            t == h ? (i = this._narrowScale, this.buttonReduce.interactable = !1, this.buttonEnlarge.interactable = !0) : (i = this._enlargeScale, this.buttonReduce.interactable = !0, this.buttonEnlarge.interactable = !1), this._scaleStatus = t;
            var a = this.node.convertToNodeSpaceAR(e),
                n = this.tiledMap.node.convertToNodeSpaceAR(e);
            this.tiledMap.node.scale = i, this._mapBorder.minX = cc.winSize.width - this._mapInfo.mapCurSize.width * i, this._mapBorder.minY = cc.winSize.height - this._mapInfo.mapCurSize.height * i;
            var s = a.x - n.x * i,
                o = a.y - n.y * i;
            s = ft.max(this._mapBorder.minX, s), s = ft.min(this._mapBorder.maxX, s), o = ft.max(this._mapBorder.minY, o), o = ft.min(this._mapBorder.maxY, o), this.tiledMap.node.x = s, this.tiledMap.node.y = o, this.updateTaskDir()
        }
    },
    onKeyDirection: function (t, e) {
        if (this._mapRunning) return !0
    },
    onAfterKeyDirection: function (t, e) {
        if (this._mapRunning) return !0;
        if (ftc.isTv() && this.node.selectTvClick && !t) {
            this.listViewInfo.node.active = !1;
            var i = ftc.ManagerTV.getSelectButton();
            this.moveNpcToScreenCentre(i)
        }
    },
    onKeyMenu: function (t) {
        if (t && (this.onClick({
            target: this.buttonReduce.node
        }), this._scaleStatus == c)) {
            var e = ftc.ManagerTV.getSelectButton();
            this.moveNpcToScreenCentre(e)
        }
        return !0
    },
    moveNpcToScreenCentre: function (t, e, i) {
        var a = t.node.position,
            n = this.tiledMap.node.convertToWorldSpaceAR(a),
            s = .5 * cc.winSize.width - n.x,
            o = .5 * cc.winSize.height - n.y,
            r = this.tiledMap.node.position,
            c = r.x + s,
            h = r.y + o;
        if (c = ft.max(this._mapBorder.minX, c), c = ft.min(this._mapBorder.maxX, c), h = ft.max(this._mapBorder.minY, h), h = ft.min(this._mapBorder.maxY, h), this.tiledMap.node.stopAllActions(), e) this.tiledMap.node.position = cc.v2(c, h), ftc.ManagerTV.updateSelect(this.node), i && i();
        else {
            ftc.ManagerTV.setOpacity(0);
            var f = Math.sqrt((c - r.x) * (c - r.x) + (h - r.y) * (h - r.y)) / 900;
            this._mapRunning = !0, this.tiledMap.node.runAction(cc.sequence(cc.moveTo(f, c, h), cc.callFunc(function () {
                this._mapRunning = !1, this.updateTaskDir(), ftc.ManagerTV.setOpacity(255), ftc.ManagerTV.updateSelect(this.node), i && i()
            }.bind(this))))
        }
    }
})
