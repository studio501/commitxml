

ftc.MapModel = cc.Class({
    statics: {
        _mapModel: null,
        getInstance: function () {
            return ftc.MapModel._mapModel || (ftc.MapModel._mapModel = new ftc.MapModel), ftc.MapModel._mapModel
        },
        DirXY: [0, [0, 1],
            [0, -1],
            [-1, 0],
            [1, 0]
        ],
        DirCorner: [0, [
            [
                [-1, 0],
                [-1, 1]
            ],
            [
                [1, 0],
                [1, 1]
            ]
        ],
            [
                [
                    [-1, 0],
                    [-1, -1]
                ],
                [
                    [1, 0],
                    [1, -1]
                ]
            ],
            [
                [
                    [0, 1],
                    [-1, 1]
                ],
                [
                    [0, -1],
                    [-1, -1]
                ]
            ],
            [
                [
                    [0, 1],
                    [1, 1]
                ],
                [
                    [0, -1],
                    [1, -1]
                ]
            ]
        ],
        getReverseDir: function (t) {
            return t % 2 == 1 ? t++ : t--, t
        },
        getDirXY: function (t) {
            return this.DirXY[t]
        }
    },
    ctor: function () {
        this._mapConfig = null
    },
    init: function (e, i, a, n) {
        this._astar = t("astar"), this._partWJWait = [], this._partWJShow = [], this.mapNpcVisibles = {}, this._mapRole = null, this._mapInfo = null, this._isMoving = !1, this._queueDirs = [], this._addDt = 0, this._stepCrashNpc = 0, this._nextGuideNpc = null, this.stepCount = 0, this._isLastDir = !1, this._isUpdateMapNpcs = !0, this._partNpcs = {}, this._curSpeed = 0, this._loadNpcProgress = 0, this._layerfog = null, this.layoutMain = e, this.tiledMap = e.tiledMap, this.spineClick = void 0, this.spriteClick = void 0, this.partPointer = void 0, a && (this.spineClick = a, this.spineClick.node.active = !1, this.spineClick.setCompleteListener(function (t, e) {
            this.spineClick.node.active = !1
        }.bind(this))), n && (this.spriteClick = n, this.spriteClick.node.active = !1), i && (this.partPointer = i)
    },
    loadMapFile: function (t, e, i, a) {
        var n;
        n = 31 <= e && e <= 35 ? ft.type.wait.ship : ft.type.wait.car, this.firstEnterMap || ftc.showWait("\u52a0\u8f7d\u5730\u56fe\u4e2d...", 0, i, 255, n), this.mapNpcs = ftc.ManagerData.get2("MapNpc"), this._isloaded = !1, this._deleteMapNpcs(), this._deleteMapWjs(), this.roleSpeedUp = ftc.ManagerData.get1("ManagerMap").speedUp, this.currentMap = t;
        var s = this.currentMap.id,
            o = this.currentMap.point,
            r = this.currentMap.x,
            c = this.currentMap.y,
            h = "map/" + ftd.Map.get(s, "mapfile");
        if (null == this._mapInfo || this._mapInfo.mapFile != h) this._loadMapConfig(function () {
            this._loadMapFile0(s, h, o, r, c, i, a)
        }.bind(this));
        else {
            this._loadWeather(s);
            var f = this._loadMapNpcs(o, r, c, function () {
                this._loadNpcProgress++, this._loadNpcProgress >= this._loadNpcSize && (this.firstEnterMap ? (this.firstEnterMap = !1, i && i()) : (ftc.sysGC(), cc.tween(this.layoutMain.node).delay(.7).call(function () {
                    ftc.cancelWait(), i && i()
                }.bind(this)).start()))
            }.bind(this));
            a && (this._loadMapHero(this.currentMap.dir, f[0], f[1]), this._updateMapPointer(), this._checkNpcs(f[0], f[1], !0))
        }
    },
    isCrashWall: function (t, e, i) {
        var a = this._mapInfo.collisions[i + 1];
        return !a[e] || a[e][t] % 2 == 1
    },
    checkNpcClick: function (t) {
        var e = (t.x - this.tiledMap.node.x) / ftc.TileSize,
            i = (t.y - this.tiledMap.node.y) / ftc.TileSize;
        for (var a in this._partNpcs) {
            var n = this._partNpcs[a];
            if (this.checkNpcIsCanShow(n.npc) && 100 === n.npc.floor && n.isContains(e, i)) return this.startNpcEvent(n, !0), !0
        }
    },
    planWalkToPosition: function (t, e) {
        if (this._mapRole) {
            this._queueDirs = [];
            var i, a, n = this._mapRole.tx,
                s = this._mapRole.ty;
            if (e ? (i = t.x, a = t.y) : (i = Math.floor((t.x - this.tiledMap.node.x) / ftc.TileSize), a = Math.floor((t.y - this.tiledMap.node.y) / ftc.TileSize)), n != i || s != a) {
                var o = this._mapInfo.collisions[this._mapRole.floor + 1],
                    r = this._mapInfo.collisionNpcs[this._mapRole.floor + 1];
                if (r)
                    for (var c in r) {
                        if (d = r[c])
                            for (var h = d.tx; h < d.tw + d.tx; h++)
                                for (var f = d.ty; f < d.ty + d.th; f++) o[f] && (o[f][h] -= 2)
                    }
                for (var c in this._mapInfo.collisionNpcs[this._mapRole.floor + 1] = [], this._partNpcs) {
                    var d;
                    if ((d = this._partNpcs[c]).node.active && d.npc.floor == this._mapRole.floor) {
                        for (h = d.tx; h < d.tw + d.tx; h++)
                            for (f = d.ty; f < d.ty + d.th; f++) o[f] && (o[f][h] += 2);
                        this._mapInfo.collisionNpcs[this._mapRole.floor + 1].push({
                            tx: d.tx,
                            ty: d.ty,
                            tw: d.tw,
                            th: d.th
                        })
                    }
                }
                try {
                    this._queueDirs = this._astar.findWay(o, {
                        x: n,
                        y: s
                    }, {
                        x: i,
                        y: a
                    })
                } catch (t) {
                    ft.console("\u70b9\u51fb\u51fa\u9519", t), this._queueDirs = []
                }
                0 == this._queueDirs.length ? this._isLastDir = !0 : this._layerfog ? (this.spriteClick.node.active = !0, this.spriteClick.node.opacity = 255, cc.tween(this.spriteClick.node).to(1, {
                    opacity: 0
                }, {
                    easing: "quintOut"
                }).start(), this.spriteClick.node.zIndex = 900, this.spriteClick.node.x = (i + .5) * ftc.TileSize, this.spriteClick.node.y = (a + .5) * ftc.TileSize) : (this.spineClick.node.active = !0, this.spineClick.setAnimation(0, "wait1", !1), this.spineClick.node.zIndex = 900, this.spineClick.node.x = t.x - this.tiledMap.node.x, this.spineClick.node.y = t.y - this.tiledMap.node.y)
            }
        }
    },
    startNpcEvent: function (t, e) {
        var i = t.npc;
        this._crashNpc = t, this._sendMapSetPos(this.currentMap.id, this._mapRole.dir, this._mapRole.tx, this._mapRole.ty);
        var a = ftd.Npc.get(i.id, "a_talk", !0),
            n = ftc.ManagerData.get1("ManagerNpc").noTalkNpcIds,
            s = !1;
        if (n && (s = n.indexOf(i.id + ",") >= 0), ft.ExtNpc.isCanWork(ftc.ManagerData.get2Object("Npc")[i.id]) && (t.fixedDir || e || t.showWaitAnimation(ftc.MapModel.getReverseDir(this._mapRole.dir))), !s && a && a.length > 0) {
            for (var o = [], r = 0; r < a.length; r++)
                for (var c = ftd.Story.get(a[r], "a_img", !0), h = ftd.Story.get(a[r], "a_name", !0), f = ft.ExtStory.getTexts(a[r]), d = 0; d < c.length; d++) o.push([c[d], h[d], f[d]]);
            ftc.loadLayout("LayoutTalk", function (t) {
                t.setData(o, void 0, function () {
                    this._sendMsgCrashNpc(i, 0)
                }.bind(this), void 0, i.id)
            }.bind(this))
        } else this._sendMsgCrashNpc(i, 0);
        this._isLastDir = !0
    },
    tickMap: function (t) {
        this._isUpdateMapNpcs && (this._updateMapNpcs(), this._updateMapPointer(), this._isUpdateMapNpcs = !1), this._mapRole && (this._isMoving || this._focusToPos() || this._startMoveDir(), this._tickMapAni(t), this._tickMapNpcMove(t), t += this._addDt, this._addDt = 0, this.tiledMap.node.ftMoveTick && this.tiledMap.node.ftMoveTick(t), this._mapRole.moveTick(t), this.partPointer.tickPointer(t))
    },
    checkNpcIsCanShow: function (t) {
        return t.v = this._isCanShow(t), t.v && ft.ExtNpc.isUIShow(t)
    },
    findMapNpcs: function (t, e) {
        var i = [];
        for (var a in this.mapNpcs) this.mapNpcs[a].id == t && (!this._partNpcs[a] && e > 0 && (this.mapNpcs[a].opacity = e, this._partNpcs[a] = this._newMapNpc(this.mapNpcs[a])), this._partNpcs[a] && i.push(this._partNpcs[a]));
        return i
    },
    getZIndex: function (t, e) {
        var i = this.addLayerZOrder - t - 2;
        return -1 == e ? i -= 100 : 0 == e ? i += 100 : 1 == e && (i += 200), i
    },
    loadMap: function (t, e, i) {
        this._loadMapFile1(t, "map/" + ftd.Map.get(e, "mapfile"), i)
    },
    updateMap: function (t) {
        for (var e in this._isUpdateMapNpcs = !0, this._newMapParts(), t && ftc.ManagerH5.isH5() && 1 === ftc.ManagerData.get1("Player").samsara && ftc.ManagerH5.countEvent("5_" + t, "\u5b8c\u6210\u4e8b\u4ef6"), this.mapNpcVisibles = {}, this.mapNpcs) {
            var i = this.mapNpcs[e];
            i.id > 0 && (this.mapNpcVisibles[i.id] = i.visible)
        }
    },
    openMoveNpc: function (t) {
        for (var e = this.findMapNpcs(t.npc, t.opacity), i = 0; i < e.length; i++)
            if (e[i]) {
                e[i]._moveRepeat = 0, e[i]._isApiTick = !0;
                var a = {};
                a.walktype = ft.type.npcWalk.custom, a.walkdirs = t.dirs, a.walkspeed = t.speed, a.walkrepeat = t.repeat, a.opacity = t.opacity, i === e.length - 1 && (a.callbackName = "openMoveNpc", ftc.showTop()), e[i].motion = a, e[i].npc.opacity = t.opacity, e[i].node.opacity != t.opacity && (e[i].npc.opacity = t.opacity, e[i].npc.toOpacity = [t.opacity, this._curSpeed / t.speed * t.dirs.length], e[i].updateData())
            }
    },
    turnNpc: function (t) {
        for (var e = this.findMapNpcs(t.npc), i = 0; i < e.length; i++) e[i].setDir(t.dir)
    },
    fadeToNpc: function (t) {
        t.time > 0 && ftc.showTop();
        for (var e = 0; e < t.npcs.length; e++)
            for (var i = this.findMapNpcs(t.npcs[e], t.opacity), a = 0; a < i.length; a++) i[a] && (i[a].npc.opacity = t.opacity, 0 == t.time ? 0 == t.opacity ? (i[a].node.opacity = 0, i[a].node.active = !1) : (i[a].node.opacity = t.opacity, i[a].node.active = !0) : i[a].npc.toOpacity = [t.opacity, t.time, !0], this._isUpdateMapNpcs = !0)
    },
    fadeToMapLayer: function (t) {
        t.time > 0 && ftc.showTop();
        var e = this.tiledMap.getLayer(t.name);
        e ? t.time > 0 ? e.node.runAction(cc.sequence(cc.fadeTo(t.time, t.opacity), cc.callFunc(function () {
            ftc.cancelTop(), ftc.sendCallback("fadeToMapLayer")
        }))) : e.node.opacity = t.opacity : t.time > 0 && (ftc.cancelTop(), ftc.sendCallback("fadeToMapLayer"))
    },
    setNpcFloor: function (t) {
        for (var e = this.findMapNpcs(t.npc), i = 0; i < e.length; i++) e[i] && (e[i].npc.floor = t.floor, e[i].node.zIndex = this.getZIndex(e[i].ty, t.floor))
    },
    showNpcSign: function (t) {
        for (var e = this.findMapNpcs(t.npc), i = 0; i < e.length; i++) e[i].updateStatus(t.type, t.tmp)
    },
    fadeToRole: function (t) {
        null == t.time && (t.time = 0), t.time > 0 && ftc.showTop(), this._mapRole.fadeTo(t.time, t.opacity)
    },
    openMoveRole: function (t) {
        ftc.showTop(), this._queueDirs = [];
        for (var e = 0; e < t.dirs.length; e++) this._queueDirs[e] = t.dirs[e];
        this._controlSpeed = t.speed, this._isApiQueueDir = !0
    },
    moveBackRole: function (t) {
        ftc.showTop();
        var e = ftc.MapModel.getReverseDir(this._mapRole.dir);
        this._queueDirs = [];
        for (var i = 0; i < t.distance; i++) this._queueDirs.push(e);
        this._mapRole.lockDir(), this._controlSpeed = t.speed, this._isApiQueueDir = !0
    },
    openMoveRoleToNpc: function (t) {
        ftc.showTop();
        for (var e = this.findMapNpcs(t.toNpc), i = 0; i < e.length; i++) {
            if (this._mapRole.tx == e[i].tx && this._mapRole.ty == e[i].ty) ftc.cancelTop(), ftc.sendCallback("openMoveRoleToNpc");
            else {
                this._mapRole.tx = e[i].tx, this._mapRole.ty = e[i].ty;
                var a = (this._mapRole.tx + 1) * ftc.TileSize,
                    n = this._mapRole.ty * ftc.TileSize;
                this._isMoving = !0, ftc.startMoveAction(this.partPointer.node, t.time, a, n + 50), this._mapRole.moveTo(t.time, a, n, function () {
                    this._isMoving = !1, ftc.cancelTop(), ftc.send("mapSetWorldPoint", {
                        npc: t.toNpc,
                        dir: this._mapRole.dir
                    }), ftc.sendCallback("openMoveRoleToNpc")
                }.bind(this))
            }
            break
        }
    },
    openMoveRoleToXY: function (t) {
        this.planWalkToPosition({
            x: t.x,
            y: t.y
        }, !0), this._queueDirs.length ? (ftc.showTop(), this._controlSpeed = t.speed, this._isApiQueueDir = !0) : ftc.sendCallback("openMoveRole")
    },
    openFocus: function (t) {
        ftc.showTop(), this.tiledMapFocus = t, this._isLastDir = !0
    },
    openFocusToNpc: function (t) {
        ftc.showTop();
        var e = this.findMapNpcs(t.npc);
        e.length > 0 && (t.x = e[0].tx, t.y = e[0].ty), this.tiledMapFocus = t, this._isLastDir = !0
    },
    closeFocus: function (t) {
        this.tiledMapFocus = {
            x: this._mapRole.tx,
            y: this._mapRole.ty,
            speed: 10,
            scale: 1
        }, ftc.showTop(), this._isLastDir = !0
    },
    setRoleFloor: function (t) {
        this._mapRole.floor = t, this._mapRole.setZIndex(this.getZIndex(this._mapRole.ty, this._mapRole.floor))
    },
    setMapColor: function (t) {
        for (var e = this.tiledMap.getLayers(), i = 0; i < e.length; i++) e[i].node.color = cc.color(t.r, t.g, t.b)
    },
    mapCrashNpc: function (t) {
        this._isCrashNpc = void 0
    },
    setMapSpeedUp: function (t) {
        this.roleSpeedUp = t, this._curSpeed = ftc.StandardSpeed / t, this._mapRole.updateSpeed(t)
    },
    setMapRoleAddAni: function (t) {
        this._mapRole && this._mapRole.updateAddAni(t)
    },
    setNpcSte: function (t) {
        for (var e = this.findMapNpcs(t.npc), i = 0; i < e.length; i++) e[i].showAniOpen(t.ste)
    },
    updateRoleMapSkin: function () {
        this._mapRole && this._mapRole.updateSkin()
    },
    _loadMapConfig: function (t) {
        this._mapConfig ? t() : cc.loader.loadRes("map/mapconfig.json", function (e, i) {
            i && (this._mapConfig = i.json, this._switchConfigCollision(this._mapConfig), t())
        }.bind(this))
    },
    _switchConfigCollision: function (t) {
        if (t.collision) {
            var e = t.collision;
            for (var i in e)
                if (e[i]) {
                    var a = e[i].split(",");
                    e[i] = cc.v2(Number(a[0]), Number(a[1]))
                }
        } else if (t instanceof Object)
            for (var n in t) this._switchConfigCollision(t[n])
    },
    _loadMapFile0: function (t, e, i, a, n, s, o) {
        this.tiledMap.tmxAsset = null, this.layoutMain.node.active = !0, cc.loader.loadRes(e, function (r, c) {
            if (ftc.ManagerRes.isLoadResErr(r, e, !0)) this._loadMapFile0(t, e, i, a, n, s, o);
            else {
                if (!c) return;
                if (t == this.currentMap.id) {
                    this.layoutMain.node.active = !0, this.tiledMap.tmxAsset = c, this._mapInfo = {}, this._mapInfo.mapFile = e, ftc.TileSize = this.tiledMap.getTileSize().width, ftc.StandardSpeed = ftc.TileSize / 32 * .1;
                    var h = this.tiledMap.getMapSize().width,
                        f = this.tiledMap.getMapSize().height;
                    if (this._mapInfo.mapSize = {
                        width: h,
                        height: f
                    }, this._mapInfo.collisions = [], this._mapInfo.collisionNpcs = [], this._mapInfo.anis = [], this._layerfog = this.tiledMap.getLayer("fog"), this._layerfog)
                        for (var d = 0; d < this.tiledMap._tilesets.length; d++)
                            if ("map3" === this.tiledMap._tilesets[d].name) {
                                this._layerfogFirstGid = this.tiledMap._tilesets[d].firstGid;
                                break
                            } var l = this.tiledMap.getLayers();
                    this.addLayerZOrder = 3e3;
                    for (d = 0; d < l.length; ++d) - 1 != l[d].name.indexOf("fog") ? l[d].node.zIndex = 3301 + d : -1 != l[d].name.indexOf("u") || -1 != l[d].name.indexOf("dc") ? l[d].node.zIndex = 3201 + d : -1 != l[d].name.indexOf("xl") ? l[d].node.zIndex = 101 + d : -1 != l[d].name.indexOf("yd") ? l[d].node.zIndex = 101 + d : -1 != l[d].name.indexOf("gy") ? l[d].node.zIndex = 3101 + d : l[d].node.zIndex = 101 + d, l[d].node.opacity = l[d]._opacity;
                    for (var u = 0; u < 3; u++) {
                        this._mapInfo.collisions[u] = [];
                        for (d = -2; d < f + 2; d++) this._mapInfo.collisions[u][d] = [];
                        var p;
                        if (p = u - 1 == 0 ? this.tiledMap.getLayer("pz") : this.tiledMap.getLayer("pz" + (u - 1))) {
                            p.node.active = !1;
                            for (d = 0; d < h; d++)
                                for (var g = 0; g < f; g++) p.getTileGIDAt(d, g) ? this._mapInfo.collisions[u][parseInt(f) - g - 1][d] = 1 : this._mapInfo.collisions[u][parseInt(f) - g - 1][d] = 0
                        }
                    }
                    this._wjSortZ = {};
                    var m = this.tiledMap.getObjectGroups();
                    this._wjId = 0;
                    for (d = 0; d < m.length; d++)
                        if (m[d].enabled = !1, 0 == m[d].getGroupName().indexOf("ani")) {
                            var b = m[d].getGroupName().split(","),
                                v = [0, 3, b[1]];
                            for (g = 2; g < b.length; g++) {
                                var y = this.tiledMap.getLayer(b[g]);
                                y.node.active = !1, v.push(y)
                            }
                            this._mapInfo.anis.push(v)
                        } else 0 == m[d].getGroupName().indexOf("wj") ? this._loadWJLayer(m[d], !1) : 0 == m[d].getGroupName().indexOf("dh") && this._loadWJLayer(m[d], !0);
                    for (var _ in this._dataWJs = [], this._wjSortZ) {
                        this._wjSortZ[_] = this._wjSortZ[_].sort(function (t, e) {
                            return e.height - t.height
                        });
                        for (g = 0; g < this._wjSortZ[_].length; ++g) this._dataWJs.push(this._wjSortZ[_][g])
                    }
                    var x = this._loadMapNpcs(i, a, n, function () {
                        this._loadNpcProgress++, this._loadNpcProgress >= this._loadNpcSize && (this.firstEnterMap ? (this.firstEnterMap = !1, s && s()) : (ftc.sysGC(), cc.tween(this.layoutMain.node).delay(.7).call(function () {
                            ftc.cancelWait(), s && s()
                        }.bind(this)).start()))
                    }.bind(this));
                    o && (this._loadMapHero(this.currentMap.dir, x[0], x[1]), this._updateMapPointer(), this._checkNpcs(x[0], x[1], !0))
                }
            }
        }.bind(this))
    },
    _loadMapFile1: function (t, e, i) {
        t.tmxAsset = null, cc.loader.loadRes(e, function (a, n) {
            if (ftc.ManagerRes.isLoadResErr(a, e, !0)) this._loadMapFile1(t, e, i);
            else {
                if (!n) return;
                t.tmxAsset = n;
                var s = t.getMapSize().width,
                    o = t.getMapSize().height,
                    r = {};
                r.mapFile = e, r.mapSize = {
                    width: s,
                    height: o
                }, r.collisions = [], r.collisionNpcs = [], r.anis = [];
                for (var c = t.getLayers(), h = 0; h < c.length; ++h) - 1 != c[h].name.indexOf("fog") ? c[h].node.zIndex = 3301 + h : -1 != c[h].name.indexOf("u") || -1 != c[h].name.indexOf("dc") ? c[h].node.zIndex = 3201 + h : -1 != c[h].name.indexOf("xl") ? c[h].node.zIndex = 101 + h : -1 != c[h].name.indexOf("yd") ? c[h].node.zIndex = 101 + h : -1 != c[h].name.indexOf("gy") ? c[h].node.zIndex = 3101 + h : c[h].node.zIndex = 101 + h, c[h].node.opacity = c[h]._opacity;
                var f = t.getObjectGroups();
                this._wjId = 0;
                for (h = 0; h < f.length; h++) f[h].enabled = !1, 0 == f[h].getGroupName().indexOf("wj") ? this._loadWJLayer1(f[h], !1, t) : 0 == f[h].getGroupName().indexOf("dh") && this._loadWJLayer1(f[h], !0, t);
                i && i()
            }
        }.bind(this))
    },
    _loadWeather: function (t) { },
    _loadWJLayer: function (t, e) {
        if (t.node.active)
            for (var i = t.getObjects(), a = 0; a < i.length; ++a)
                if ("" != i[a].name) {
                    var n = i[a],
                        s = n.name.indexOf("/"); - 1 != s && (n.path = n.name.substring(0, s)), n.curname = n.name.substring(s + 1);
                    var o = this.getZIndex(i[a].y / ftc.TileSize, 0);
                    n.tx = n.x / ftc.TileSize, n.ty = n.y / ftc.TileSize, n.tw = n.width / ftc.TileSize, n.th = n.height / ftc.TileSize, n.ani = e, n.zindex = o - 3, n.floor = 0, n.id = this._wjId++;
                    var r = this._mapConfig[n.path];
                    if (r && r[n.curname] && (n.properties = r[n.curname], n.properties.collision))
                        for (var c = n.properties.collision, h = 0; h < c.length; ++h) {
                            var f = n.tx + c[h].x,
                                d = n.ty + c[h].y;
                            this._mapInfo.collisions[n.floor + 1][d] || (this._mapInfo.collisions[n.floor + 1][d] = []), this._mapInfo.collisions[n.floor + 1][d][f] = 1
                        }
                    this._wjSortZ[o] || (this._wjSortZ[o] = []), this._wjSortZ[o].push(n)
                }
    },
    _loadWJLayer1: function (t, e, i) {
        for (var a = t.getObjects(), n = 0; n < a.length; ++n)
            if ("" != a[n].name) {
                var s = a[n],
                    o = s.name.indexOf("/");
                s.path = s.name.substring(0, o), s.curname = s.name.substring(o + 1);
                var r = this.getZIndex(a[n].y / ftc.TileSize, 0);
                s.tx = s.x / ftc.TileSize, s.ty = s.y / ftc.TileSize, s.tw = s.width / ftc.TileSize, s.th = s.height / ftc.TileSize, s.ani = e, s.zindex = r - 3, s.floor = 0, s.id = this._wjId++;
                var c = this._mapConfig[s.path];
                c && c[s.curname] && (s.properties = c[s.curname]);
                var h = ftc.ManagerRes.newPart("PartMainWj", void 0, this.layoutMain);
                i.node.addChild(h.node), h.setData(s), h.updateZIndex()
            }
    },
    _loadMapHero: function (t, e, i) {
        if (null == this._mapRole && (this._mapRole = ftc.ManagerRes.newPart("PartMainRole", void 0, this.layoutMain)), this.partPointer.node.removeFromParent(!1), this.tiledMap.node.addChild(this.partPointer.node), this.partPointer.bindMapRole(this._mapRole), this.partPointer.node.zIndex = 9999, this._mapRole.setData(this.tiledMap.node, t, e, i, this.roleSpeedUp), this._moveMapAndHero(0, 0), this._layerfog) {
            for (var a = this._layerfog.getLayerSize(), n = [], s = 0; s < 2; s++)
                for (var o = 2; o >= 0; o--) n.push([e + s, a.height - (i + o + 1)]);
            this._fogGidArray = this._layerfog._tiles, this._fogActiveArray = [];
            var r = ftc.ManagerData.get2Object("Map", this.currentMap.id).fogsActive.split(",");
            for (s = 0; s < r.length; s++) 1 == r[s] && n.push([s % a.width, Math.floor(s / a.width)]);
            this._updateFog(n)
        }
    },
    _deleteMapNpcs: function () {
        for (var t in this._partNpcs) this._partNpcs[t] && (this._partNpcs[t].deleteStatus(), this._partNpcs[t].cancel());
        this._partNpcs = {}
    },
    _loadMapNpcs: function (t, e, i, a) {
        for (var n in this._curSpeed = ftc.StandardSpeed / this.roleSpeedUp, this._partNpcs = {}, e >= 0 && i >= 0 && this.isCrashWall(e, i, ftc.ManagerData.get1("ManagerMap").floor) && (e = -1, i = -1), this.mapNpcs) {
            var s = this.mapNpcs[n];
            s.opacity = void 0, s.toOpacity = void 0, s.id > 0 && (s.status = ftd.Npc.get(s.id, "status", !0), (e < 0 || i < 0) && t == s.id && (e = s.x, i = s.y))
        }
        return this._newMapParts(a), this._updateMapNpcs(), this._stepCrashNpc = this.currentMap.step, [e, i]
    },
    _newMapWJ: function (t) {
        if (0 == this._partWJWait.length) {
            var e = ftc.ManagerRes.newPart("PartMainWj", void 0, this.layoutMain);
            this.tiledMap.node.addChild(e.node), this._partWJWait.push(e)
        }
        return (e = this._partWJWait[0]).setData(t), this._partWJWait.splice(0, 1), e
    },
    _wjOutWindow: function (t, e, i) {
        return e + ftc.TileSize * t.tw < -ftc.TileSize || i + ftc.TileSize * (t.th + 1) < -ftc.TileSize || e > cc.winSize.width + ftc.TileSize || i > cc.winSize.height + ftc.TileSize
    },
    _updateInWindowWJ: function (t, e) {
        for (var i = this._partWJShow.length - 1; i >= 0; --i) {
            var a = this._partWJShow[i].wj;
            if (this._wjOutWindow(a, a.x + t, a.y + e)) (s = this._partWJShow[i]).setNodeActive(!1), this._partWJWait.push(s), this._partWJShow.splice(i, 1)
        }
        for (i = 0; i < this._dataWJs.length; ++i) {
            a = this._dataWJs[i];
            if (!this._wjOutWindow(a, a.x + t, a.y + e)) {
                for (var n = !1, s = null, o = 0; o < this._partWJShow.length; ++o)
                    if (this._partWJShow[o].wj.id == a.id) {
                        s = this._partWJShow[o], n = !0;
                        break
                    } n || ((s = this._newMapWJ(a)).setNodeActive(!0), this._partWJShow.push(s)), s.updateZIndex()
            }
        }
    },
    _deleteMapWjs: function () {
        for (var t = 0; t < this._partWJShow.length; ++t) {
            var e = this._partWJShow[t];
            e.setNodeActive(!1), this._partWJWait.push(e)
        }
        this._partWJShow = []
    },
    _newMapNpc: function (t, e) {
        var i = this.allNpcs[t.id];
        i && i.floor > -2 ? (t.floor = i.floor, t.ste = i.ste) : t.floor = ftd.Npc.get(t.id, "floor", !0);
        var a = ftc.ManagerRes.newPart("PartMainNpc", void 0, this.layoutMain);
        return a.setData(t, e, this.tiledMap.node), a.bindMapModel(this), this.tiledMap.node.addChild(a.node, this.getZIndex(t.y, t.floor)), a
    },
    _newMapParts: function (t) {
        this.allNpcs = ftc.ManagerData.get2Object("Npc"), this._loadNpcSize = 0, this._loadNpcProgress = 0;
        var e = [];
        for (var i in this.mapNpcs) {
            var a = this.mapNpcs[i];
            a.id > 0 && (a.v = this._isCanShow(a), a.v && (this._partNpcs[i] || e.push(a)))
        }
        if (this._loadNpcSize = e.length, e.length)
            for (i = 0; i < this._loadNpcSize; i++) this._partNpcs[e[i].entityId] = this._newMapNpc(e[i], t)
    },
    _updateMapNpcs: function () {
        for (var t in this.mapNpcs) this._partNpcs[t] && this._partNpcs[t].updateData();
        if (this.currentMap && 1 === this.currentMap.id) {
            var e = ftc.ManagerData.get2Object("Hero"),
                i = ftc.ManagerData.get2Object("Equip"),
                a = ftc.ManagerData.get2Object("Item"),
                n = (ftc.ManagerData.get1("Player").level, 0);
            for (var t in this._partNpcs) {
                var s = ft.ExtNpc.getStatus(this.mapNpcs[t].id);
                if (n = 0, 10 === s) {
                    var o = ft.value.copy.ShenBing,
                        r = ft.ExtCopy.getCount(o);
                    if (ft.ExtCopy.getCopy(o) && (r = ft.ExtCopy.getCopy(o).count), r > 0) {
                        var c = ft.ExtNpc.getWork(this.mapNpcs[t].id).split(";")[0],
                            h = ft.ExtItem.getEquip(c),
                            f = e[ft.ExtEquip.getType(h)];
                        f && f.star >= 3 && !i[h] && (!a[c] || a[c].num < ft.ExtItem.getNeedPiecesNum(c)) && (n = 6)
                    }
                } else if (11 === s || 12 === s || 13 === s || 14 === s || 15 === s) {
                    if (11 === s ? o = ft.value.copy.ZSJ : 12 === s ? o = ft.value.copy.HJZ : 13 === s ? o = ft.value.copy.ZYS : 14 === s ? o = ft.value.copy.YXT : 15 === s && (o = ft.value.copy.CCJJ), ft.ExtCopy.isOpen(o)) {
                        r = ft.ExtCopy.getCount(o);
                        ft.ExtCopy.getCopy(o) && (r = ft.ExtCopy.getCopy(o).count), r > 0 && (n = 6)
                    }
                } else if (16 === s) {
                    o = ft.value.copy.HSLY;
                    if (ft.ExtCopy.isOpen(o)) {
                        var d = ft.ExtCopy.getCopy(o);
                        d && 1 === d.ste || (n = 6)
                    }
                }
                this._partNpcs[t].updateStatus(n)
            }
        }
    },
    _updateMapPointer: function () {
        if (this.partPointer) {
            var t = this.partPointer.getPointerNpcId(this.currentMap, this.allNpcs, this.mapNpcVisibles);
            if (this.partPointer.node.active = !1, t) {
                for (var e in this._partNpcs) {
                    if ((i = this._partNpcs[e]).npc.id == t) return void this.partPointer.setNextGuideNpc(i)
                }
                for (var e in this._partNpcs) {
                    var i;
                    if ((i = this._partNpcs[e]).npc.id > 20 && i.npc.id <= 36) return void this.partPointer.setNextGuideNpc(i)
                }
            } else this.partPointer.setNextGuideNpc(null)
        }
    },
    _tickMapAni: function (t) {
        if (this._mapInfo)
            for (var e = 0; e < this._mapInfo.anis.length; e++) {
                var i = this._mapInfo.anis[e];
                i[0] += t, i[0] > i[2] && (i[0] -= i[2], i[i[1]].node.active = !1, i[1]++, i[1] >= i.length && (i[1] = 3), i[i[1]].node.active = !0)
            }
    },
    _tickMapNpcMove: function (t) {
        var e = ftc.ManagerRes.topLayout() == this.layoutMain;
        for (var i in this._partNpcs) {
            var a = this._partNpcs[i];
            (e || a._isApiTick) && a.tickMove(t) && a.checkMotion(this._mapRole, this.tiledMap.node.x, this.tiledMap.node.y, this._curSpeed)
        }
    },
    _isCanShow: function (t) {
        var e = this.mapNpcs[t.entityId].visible;
        return ft.ExtNpc.isCanShow(t.id, this.allNpcs[t.id], e)
    },
    _focusToPos: function () {
        if (this.tiledMapFocus) {
            var t = this._getMapXY(this.tiledMapFocus.x, this.tiledMapFocus.y),
                e = this.tiledMap.node.x / ftc.TileSize,
                i = this.tiledMap.node.y / ftc.TileSize,
                a = Math.sqrt(Math.pow(e - t[0], 2) + Math.pow(i - t[1], 2)),
                n = this._curSpeed / this.tiledMapFocus.speed * a,
                s = (1 - this.tiledMapFocus.scale) * this.tiledMapFocus.x,
                o = (1 - this.tiledMapFocus.scale) * this.tiledMapFocus.y;
            return t[0] += s, t[1] += o, n > 0 ? (this._isMoving = !0, this.tiledMap.node.runAction(cc.scaleTo(n, this.tiledMapFocus.scale)), ftc.startMoveAction(this.tiledMap.node, n, t[0] * ftc.TileSize, t[1] * ftc.TileSize, function () {
                this._isMoving = !1, ftc.sendCallback("openFocus"), ftc.cancelTop(), this.partPointer.updatePointer()
            }.bind(this))) : (ftc.sendCallback("openFocus"), ftc.cancelTop()), this.tiledMapFocus = void 0, !0
        }
    },
    _startMoveDir: function () {
        if (null !== this._mapRole && null !== this._queueDirs) {
            var t = this._queueDirs.length > 0;
            if (!this._isApiQueueDir && ftc.ManagerRes.topLayout() != this.layoutMain && t && (this._isLastDir = !0), !this._isLastDir && t) {
                var e = this._queueDirs[0];
                this._queueDirs.splice(0, 1), 0 == this._queueDirs.length && (this._isLastDir = !0);
                var i = ftc.MapModel.getDirXY(e),
                    a = i[0] + this._mapRole.tx,
                    n = i[1] + this._mapRole.ty;
                if (this.isCrashWall(a, n, this._mapRole.floor)) {
                    var s = this._checkIsCanZhuanwan(this._mapRole.tx, this._mapRole.ty, e);
                    if (!s) return this._mapRole.showDirAnimation(e), void (this._isLastDir = !0);
                    i = [s[0], s[1]], e = s[2], this._mapRole.showDirAnimation(e), a = i[0] + this._mapRole.tx, n = i[1] + this._mapRole.ty
                } else this._mapRole.showDirAnimation(e);
                var o = this._checkNpcs(a, n);
                if (-1 != o) {
                    if (!o && this.layoutMain._noNpcTime <= 0 && this._stepCrashNpc > 0 && (this._stepCrashNpc--, this._stepCrashNpc <= 0)) {
                        if (this._stepCrashNpc = this.currentMap.step, ft.ExtItem.getNum(ft.value.item.power) >= 5 || ft.ExtMap.getType(this.currentMap.id) == ft.type.map.zy) return ftc.send("mapCrashHideNpc", {
                            x: a,
                            y: n
                        }), this._isLastDir = !0, this._isCrashNpc = !0, void ftc.playEffect(ftc.type.effect.map_encounter);
                        ftc.showTip("\u4f53\u529b\u4e0d\u8db3,\u65e0\u6cd5\u6218\u6597")
                    }
                    return this.stepCount++, this._moveMapAndHero(i[0], i[1]), !0
                }
                this._isLastDir = !0
            } else this._isLastDir && (this._stopMoveDir(), this._isLastDir = !1, this._controlSpeed && (ftc.cancelTop(), this._controlSpeed = void 0, this._mapRole.unlockDir(), ftc.sendCallback("openMoveRole"), this.partPointer.updatePointer(), this._sendMapSetPos(this.currentMap.id, this._mapRole.dir, this._mapRole.tx, this._mapRole.ty)), this._isApiQueueDir = null)
        }
    },
    _sendMapSetPos: function (t, e, i, a) {
        ftc.send("mapSetPos", {
            id: t,
            dir: e,
            x: i,
            y: a,
            step: this.stepCount
        }), this.stepCount = 0
    },
    _sendMsgCrashNpc: function (t, e, i, a) {
        if (ft.ExtNpc.isCanWork(ftc.ManagerData.get2Object("Npc")[t.id])) {
            void 0 !== i && void 0 !== a && (-1 != ft.ExtNpc.checkIsDelivery(t.id, this.currentMap.id) && (i = t.x - ftc.MapModel.getDirXY(this._mapRole.dir)[0] * t.tw, a = t.y - ftc.MapModel.getDirXY(this._mapRole.dir)[1] * t.th), this._sendMapSetPos(this.currentMap.id, this._mapRole.dir, i, a)), this._isCrashNpc = !0, ftc.send("mapCrashNpc", {
                entityId: t.entityId,
                dir: this._mapRole.dir,
                out: e
            });
            for (var n = this.findMapNpcs(t.id), s = 0; s < n.length; s++) n[s].showAniOpen(1)
        }
    },
    _checkNpcs: function (t, e, i) {
        var a = 0;
        for (var n in this.mapNpcs) {
            var s = this.mapNpcs[n];
            if (s.id > 0 && this.checkNpcIsCanShow(s) && s.floor >= -1 && s.floor < 100)
                if (this._partNpcs[n].isContains(t, e)) {
                    if (this._partNpcs[n].npc.floor == this._mapRole.floor) return this.startNpcEvent(this._partNpcs[n]), -1;
                    if (!i && s.id <= 20) continue;
                    this._partNpcs[n].getInNpc(s.entityId) || (this._partNpcs[n].setInNpc(s.entityId, !0), this._sendMsgCrashNpc(s, 0, t, e), a = 1)
                } else this._partNpcs[n].getInNpc(s.entityId) && (this._partNpcs[n].setInNpc(s.entityId, !1), a = 2)
        }
        return a
    },
    _checkIsCanZhuanwan: function (t, e, i) {
        if (!this._controlType) {
            var a = this._mapInfo.collisions[this._mapRole.floor + 1];
            try {
                for (var n = 0; n < 2; n++) {
                    for (var s = ftc.MapModel.DirCorner[i][n], o = 0, r = 0; r < 2; r++) a[e + s[r][1]][t + s[r][0]] || o++;
                    if (2 == o) return i <= 2 ? 0 == n ? [-1, 0, ft.DIRLEFT] : [1, 0, ft.DIRRIGHT] : 0 == n ? [0, 1, ft.DIRUP] : [0, -1, ft.DIRDOWN]
                }
            } catch (t) {
                ft.console("_checkIsCanZhuanwan", t)
            }
        }
    },
    _stopMoveDir: function (t) {
        this._mapRole.showWaitAnimation(t), this._queueDirs = []
    },
    _getMapXY: function (t, e) {
        var i, a = cc.winSize.width / ftc.TileSize,
            n = ftc.DesignHeight / ftc.TileSize,
            s = a / 2 - t - .5,
            o = n / 2 - e - 1;
        this._mapInfo.mapSize.width < a ? s = (a - this._mapInfo.mapSize.width) / 2 : (s < (i = a - this._mapInfo.mapSize.width) && (s = i + (Math.ceil(s) - s)), s > 0 && (s -= Math.ceil(s)));
        this._mapInfo.mapSize.height < n ? o = (n - this._mapInfo.mapSize.height) / 2 : (o < (i = n - this._mapInfo.mapSize.height) && (o = i + (Math.ceil(o) - o)), o > 0 && (o -= Math.ceil(o)));
        return [s, o]
    },
    _moveMapAndHero: function (t, e) {
        this._mapRole.addTx(t), this._mapRole.addTy(e);
        var i = this._mapRole.getZIndex(),
            a = this.getZIndex(this._mapRole.ty, this._mapRole.floor);
        this._mapRole.setZIndex(a < i || 0 == t && 0 == e ? a : i);
        var n, s = this._getMapXY(this._mapRole.tx, this._mapRole.ty),
            o = s[0] * ftc.TileSize,
            r = s[1] * ftc.TileSize;
        if (0 == t && 0 == e) {
            this.tiledMap.node.stopAllActions(), this._mapRole.stopAllActions(), this.tiledMap.node._ftMoveTime = 0, this.partPointer.node._ftMoveTime = 0, this._isMoving = !1, this.tiledMap.node.setPosition(o, r);
            var c = cc.v2((this._mapRole.tx + .5) * ftc.TileSize, (this._mapRole.ty + .5) * ftc.TileSize);
            this._mapRole.setPosition(c.x, c.y), this.partPointer.node.setPosition(c.x, c.y + 50)
        } else {
            this._isMoving = !0;
            var h = this._curSpeed;
            this._controlSpeed && (h /= this._controlSpeed);
            var f = Math.abs(this._oldMapx - s[0]) + Math.abs(this._oldMapy - s[1]);
            f > 0 && ftc.startMoveAction(this.tiledMap.node, h * f, o, r);
            var d = cc.v2((this._mapRole.tx + .5) * ftc.TileSize, (this._mapRole.ty + .5) * ftc.TileSize);
            this._mapRole.moveTo(h, d.x, d.y, function (t) {
                this._isMoving = !1, this._mapRole.setZIndex(a), this._addDt = t, this._layerfog
            }.bind(this)), ftc.playEffect(ftc.type.effect.walk), this.partPointer.node.active ? ftc.startMoveAction(this.partPointer.node, h, d.x, d.y + 50) : this.partPointer.node.setPosition(d.x, d.y + 50)
        }
        for (var l in this._partNpcs) {
            this._partNpcs[l].checkIsInWindow(o, r)
        }
        if ((this._updateInWindowWJ(o, r), this.partPointer.updatePointer(), this._mapRole.node.setSiblingIndex(-1), this._oldMapx = s[0], this._oldMapy = s[1], this._layerfog) && (t < 0 ? n = ft.DIRLEFT : t > 0 ? n = ft.DIRRIGHT : e < 0 ? n = ft.DIRDOWN : e > 0 && (n = ft.DIRUP), void 0 !== n)) {
            var u = this._layerfog.getLayerSize().height;
            this._moveFog(cc.v2(this._mapRole.tx, u - (this._mapRole.ty + 1)), n)
        }
        this.layoutMain.labelCoordinate.string = ft.ExtMap.getName(ftc.ManagerData.get1("ManagerMap").cur) + "(" + this._mapRole.tx + ", " + this._mapRole.ty + ")"
    },
    _moveFog: function (t, e) {
        var i = [];
        e === ft.DIRUP ? (i.push([t.x, t.y - 2]), i.push([t.x + 1, t.y - 2])) : e === ft.DIRDOWN ? (i.push([t.x, t.y]), i.push([t.x + 1, t.y])) : e === ft.DIRLEFT ? (i.push([t.x, t.y - 2]), i.push([t.x, t.y - 1]), i.push([t.x, t.y])) : e === ft.DIRRIGHT && (i.push([t.x + 1, t.y - 2]), i.push([t.x + 1, t.y - 1]), i.push([t.x + 1, t.y])), this._updateFog(i)
    },
    _updateFog: function (t) {
        for (var e = this._layerfog.getLayerSize(), i = [], a = 0; a < t.length; a++) {
            var n = t[a][0] + t[a][1] * e.width;
            if (1 != this._fogActiveArray[n]) {
                this._fogActiveArray[n] = 1, i.push(n);
                for (var s = [
                    [t[a][0] - 1, t[a][1]],
                    [t[a][0], t[a][1]],
                    [t[a][0] - 1, t[a][1] + 1],
                    [t[a][0], t[a][1] + 1]
                ], o = [], r = 0; r < s.length; r++) o.push(s[r][0] + s[r][1] * e.width);
                for (r = 0; r < o.length; r++) o[r] >= 0 && (this._fogGidArray[o[r]] += 1 << r, this._fogGidArray[o[r]] > this._layerfogFirstGid + 15 && (this._fogGidArray[o[r]] = this._layerfogFirstGid + 15), this._layerfog.setTileGIDAt(this._fogGidArray[o[r]], s[r]))
            }
        }
        i.length > 0 && ftc.send("mapActiveFog", {
            id: this.currentMap.id,
            indexes: i
        })
    }
})
