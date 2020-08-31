window.ftc = window.ftc || {}, ftc.ManagerRes = {
    _stackLayouts: [],
    _resource: {},
    _nodes: {},
    _autoReleaseRes: {},
    _autoReleaseResType: {},
    _autoReleaseResLock: {},
    _loadingProgress: 0,
    _totalLoadingSize: 0,
    ___resourceBuffer: [],
    countNodeTotalDestroy: 0,
    countNodeTotalNew: 0,
    countNodeTotalRestored: 0,
    countNodeTotalNewPartItem: 0,
    countNodeTotalRestoredPartItem: 0,
    countNodeTotalDestroyPartItem: 0,
    latestOptionUrl: "",
    init: function () {
        this.__newLayoutCallback = [], this._callbackOnOpenLayout = {}, this._callbackOnCancelLayout = {}, this.__audioIds = {}
    },
    startLoadGame: function () {
        this._registDirs = ftc.registDirs, this._registPrefabs = ftc.registPrefabs, this._registTextures = ftc.registTextures, this._registAudios = ftc.registAudios, this._registImgs = ftc.registImgs, this._loadingProgress = 0, this._totalLoadingSize = this._registDirs.length + this._registPrefabs.length + this._registTextures.length + this._registAudios.length + this._registImgs.length, cc.audioEngine.setMaxAudioInstance(128), this._totalLoadingSize ? (ftc.sendClient("c_loadResProgress", {
            cur: 0,
            max: this._totalLoadingSize
        }), fts ? this._loadResource() : ftc.ManagerH5.loadFormData(function (t) {
            ft._loadAllFormJson(t, function () {
                this._loadResource()
            }.bind(this))
        }.bind(this))) : ftc.sendClient("c_loadResProgress", {
            cur: -1,
            max: 0
        })
    },
    finishLoadGame: function () {
        !window.ftaroHotUpdate || window.ftaroHotUpdate.indexOf("" + ft.getVersion()) >= 0 ? ftc.sendClient("c_loadResProgress", {
            cur: -1,
            max: this._totalLoadingSize
        }) : (cc.log("***\u8bf7\u4fee\u6539\u70ed\u66f4\u65b0\u7248\u672c!!!***"), ftr.showDialog({
            text: "\u70ed\u66f4\u65b0\u7248\u672c\u4e0d\u5339\u914d!!!",
            clickOk: function () {
                ftc.sysRestart()
            }
        }))
    },
    _loadResource: function () {
        try {
            if (this._registDirs.length > 0) cc.loader.loadResDir(this._registDirs[0], this._loadResDirCallback.bind(this));
            else if (this._registPrefabs.length > 0) cc.loader.loadResArray(this._registPrefabs, cc.Prefab, this._loadResDirCallback.bind(this));
            else if (this._registTextures.length > 0) {
                var t = this._registTextures[0];
                if (0 == t.indexOf("txt")) {
                    var e = ftc.ManagerLan.getLanguage();
                    "zh" != e && (t += "_" + e)
                }
                cc.loader.loadRes("texture/" + t, cc.SpriteAtlas, this._loadResCallback.bind(this))
            } else this._registImgs.length > 0 ? cc.loader.loadRes("img/" + this._registImgs[0], cc.SpriteFrame, this._loadResCallback.bind(this)) : this._registAudios.length > 0 ? this.loadSound(this._registAudios[0], this._loadResCallback.bind(this)) : this.finishLoadGame()
        } catch (t) {
            cc.error(t.toString())
        }
    },
    _loadResDirCallback: function (t, e) {
        if (ft.isObject(e)) {
            for (var i = 0; i < e.length; i++) this._resource[e[i].name] && ftc.warn("\u8d44\u6e90\u6587\u4ef6\u91cd\u540d " + e[i].name), this._resource[e[i].name] = e[i];
            this._registDirs.length > 0 ? (this._loadingProgress++, this._registDirs.splice(0, 1)) : this._registPrefabs.length > 0 && (this._loadingProgress += e.length, this._registPrefabs = [], ftc.registPrefabs = []), ftc.sendClient("c_loadResProgress", {
                cur: this._loadingProgress,
                max: this._totalLoadingSize
            })
        }
        this._loadResource()
    },
    _loadResCallback: function (t, e) {
        this.isLoadResErr(t) || (this._registTextures.length > 0 ? (this._resource[this._registTextures[0]] && ftc.warn("\u8d44\u6e90\u6587\u4ef6\u91cd\u540d " + this._registTextures[0]), this._resource[this._registTextures[0]] = e, this._registTextures.splice(0, 1)) : this._registImgs.length > 0 ? (this._resource[this._registImgs[0]] && ftc.warn("\u8d44\u6e90\u6587\u4ef6\u91cd\u540d " + this._registImgs[0]), this._resource[this._registImgs[0]] = e, this._registImgs.splice(0, 1)) : this._registAudios.length > 0 && this._registAudios.splice(0, 1), this._loadingProgress++, ftc.sendClient("c_loadResProgress", {
            cur: this._loadingProgress,
            max: this._totalLoadingSize
        })), this._loadResource()
    },
    isLoadResErr: function (t, e, i) {
        if (ft.isObject(t) && "{}" == JSON.stringify(t) && (t = void 0), t && e && (ft.isObject(t) && (t = JSON.stringify(t)), ftc.warn("\u52a0\u8f7d\u8d44\u6e90\u4e0d\u6210\u529f " + e + " err:" + t)), ftc.ManagerH5.isH5()) {
            if (t && this.loadResourceError < 5) return this.loadResourceError++, cc.log("\u52a0\u8f7d\u8d44\u6e90\u51fa\u9519:" + t.message || t), !0;
            t && this.loadResourceError >= 5 && i && (ftc.ManagerH5.clearStorage(), ftr.showDialog({
                text: "\u7f51\u7edc\u4e0d\u7a33\u5b9a\uff0c\u8d44\u6e90\u52a0\u8f7d\u51fa\u9519\uff0c\u8bf7\u91cd\u65b0\u8fdb\u5165\u6e38\u620f\uff01",
                clickOk: function () {
                    ftc.sysRestart()
                }
            })), this.loadResourceError = 0
        }
        return !1
    },
    getSpriteFrame: function (name, e) {
        if (164 == name.charCodeAt(0) && 170 == name.charCodeAt(1)) {
            var i = ftc.ManagerLan.getLanguage();
            "zh" != i && (name += "_" + i)
        }
        if (this._resource[name]) {
            if (1 === this._resource[name])
                return;
            if (this._resource[name].getSpriteFrame)
                return this._resource[name].getSpriteFrame(e);
            this._resource[name] = 1;
            try {
                cc.loader.loadRes("texture/" + name, cc.SpriteAtlas, function (e, i) {
                    !e && i && (this._resource[name] = i)
                }.bind(this))
            } catch (t) {
                cc.error(t.toString())
            }
        } else ftc.warn("getSpriteFrame \u672a\u627e\u5230" + e)
    },
    getResource: function (name) {
        return this._resource[name]
    },
    allLayouts: function () {
        return this._stackLayouts
    },
    countLayout: function () {
        return this._stackLayouts.length
    },
    pushLayout: function (tLayout) {
        var e = this._stackLayouts;
        tLayout.node.zIndex = 2 * e.length, e.push(tLayout)
    },
    topLayout: function () {
        var t = this.allLayouts();
        if (t.length > 0) return t[t.length - 1]
    },
    findLayout: function (name) {
        for (var e = this.allLayouts(), i = 0; i < e.length; i++)
            if (e[i]._layoutName === name) return e[i];
        return null
    },
    findLayoutByNode: function (tNode) {
        for (var e = this.allLayouts(), i = 0; i < e.length; i++)
            if (e[i].node === tNode) return e[i]
    },
    removeLayout: function (name) {
        ftc._recordUILog(ftc._uiLogType.RemoveLayout, name);
        for (var e = this.allLayouts(), i = e.length - 1; i >= 0; i--)
            if (e[i]._layoutName === name) {
                e.splice(i, 1);
                for (var a = i; a < e.length; a++) e[a].node.zIndex = 2 * a;
                return this.updateShielding(), !0
            } return !1
    },
    updateShielding: function () {
        ftc.scene.nodeShielding.active = !1;
        var t = this._stackLayouts[this._stackLayouts.length - 1];
        t && t._showShielding && -1 != t._showShielding && t.node.zIndex > 0 && (ftc.scene.nodeShielding.active = !0, ftc.scene.nodeShielding.zIndex = t.node.zIndex - 1, ftc.scene.setShieldingOpacity(ftc.DialogShadeOpacity))
    },
    playSound: function (name, vol, loop) {
        if (this._resource[name]) return void 0 === vol && (vol = 1), ftc.openFmod ? (0 == name.indexOf("effect/") ? ft_c_fmod_effect_play(this._resource[name], parseInt(100 * vol)) : ft_c_fmod_music_play(this._resource[name], parseInt(100 * vol), loop), this.__audioIds[name] = this._resource[name]) : this.__audioIds[name] = cc.audioEngine.play(this._resource[name], loop, vol), this.__audioIds[name]
    },
    pauseSound: function (name, e) {
        this.__audioIds[name] && (ftc.openFmod ? 0 == name.indexOf("music/") ? ft_c_fmod_music_pause(this.__audioIds[name], e) : ftc.err("\u4e0d\u652f\u6301effect\u6682\u505c") : e ? cc.audioEngine.pause(this.__audioIds[name]) : cc.audioEngine.resume(this.__audioIds[name]))
    },
    soundIsPlaying: function (name) {
        return !!this.__audioIds[name] && (ftc.openFmod && 0 == name.indexOf("music/") ? ft_c_fmod_music_is_playing(this.__audioIds[name]) : void ftc.err("\u4e0d\u652f\u6301\u7684\u64cd\u4f5c"))
    },
    loadSound: function (name, call_back) {
        if (this._resource[name]) call_back && call_back(this._resource[name]);
        else if (ftc.openFmod) {
            var i = function () {
                var i = ftc.getResUuid("audio/" + name);
                (i = "res/raw-assets/" + i.substr(0, 2) + "/" + i).indexOf(".") < 0 && (i += ".mp3"), 0 == name.indexOf("effect/") ? this._resource[name] = ft_c_fmod_effect_load(i) : this._resource[name] = ft_c_fmod_music_load(i), call_back && call_back(this._resource[name])
            }.bind(this);
            call_back ? setTimeout(i, 0) : i()
        } else try {
            cc.loader.loadRes("audio/" + name, function (i, a) {
                a && !i ? (this._resource[name] = a, call_back && call_back(a)) : ftc.warn("\u64ad\u653e\u58f0\u97f3\u51fa\u9519 " + name + i)
            }.bind(this))
        } catch (t) {
            cc.error(t.toString())
        }
    },
    releaseSound: function (name) {
        this._resource[name] && (ftc.openFmod ? 0 == name.indexOf("effect/") ? ft_c_fmod_effect_release(this._resource[name]) : ft_c_fmod_music_release(this._resource[name]) : cc.loader.releaseRes("audio/" + name), delete this._resource[name], delete this.__audioIds[name])
    },
    playEffect: function (name, vol) {
        0 != name.indexOf("effect/") && (name = "effect/" + name), this._resource[name] ? this.playSound(name, vol) : this.loadSound(name, function () {
            this.playSound(name, vol)
        }.bind(this))
    },
    playBackMusic: function (name, vol) {
        0 != name.indexOf("music/") && (name = "music/" + name), this._resource[name] ? (this.stopBackMusic(), this._lastMusic = this.playSound(name, vol, !0)) : this.loadSound(name, function () {
            this.stopBackMusic(), this._lastMusic = this.playSound(name, vol, !0)
        }.bind(this))
    },
    stopBackMusic: function () {
        void 0 !== this._lastMusic && (ftc.openFmod ? ft_c_fmod_music_stop(this._lastMusic) : cc.audioEngine.stop(this._lastMusic)), this._lastMusic = void 0
    },
    setAutoReleaseWithLayout: function (t, e, i) {
        t._autoReleaseRes || (t._autoReleaseRes = {}), t._autoReleaseRes[e] = i || !1
    },
    _addAutoReleaseRes: function (t, e) {
        var resName = t[0],
            resType = t[1];
        this._autoReleaseResLock[resName] > 0 && this._autoReleaseResLock[resName]--, void 0 === this._autoReleaseRes[resName] ? this._autoReleaseRes[resName] = 1 : this._autoReleaseRes[resName]++, e.___resourceBufferCount || (e.___resourceBufferCount = {}), e.___resourceBufferCount[resName] ? e.___resourceBufferCount[resName]++ : e.___resourceBufferCount[resName] = 1, this._autoReleaseResType[resName] = resType
    },
    _subAutoReleaseRes: function (t, e) {
        if (this._autoReleaseRes[t]) {
            var i = e.___resourceBufferCount[t];
            if (i && (this._autoReleaseRes[t] -= i, 0 == this._autoReleaseResLock[t] && this._autoReleaseRes[t] <= 0)) return cc.loader.releaseRes(t, this._autoReleaseResType[t]), ft.console("\u91ca\u653e\u8d44\u6e901:" + t), this._autoReleaseRes[t] = void 0, this._autoReleaseResType[t] = void 0, !0
        }
    },
    releaseResource: function (t, e) {
        if (void 0 != t)
            if (e) t.___resourceBufferCount && (ftc.ManagerRes._subAutoReleaseRes(e, t), t.___resourceBufferCount[e] = void 0);
            else {
                if (t.___resourceBufferCount) {
                    for (var i in t.___resourceBufferCount) ftc.ManagerRes._subAutoReleaseRes(i, t);
                    t.___resourceBufferCount = void 0
                }
                if (t._autoReleaseRes) {
                    for (var a in t._autoReleaseRes) this._autoReleaseRes[a] || (t._autoReleaseRes[a] ? cc.loader.releaseRes(a, t._autoReleaseRes[a]) : cc.loader.releaseRes(a), ft.console("\u91ca\u653e\u8d44\u6e902:" + a));
                    t._autoReleaseRes = void 0
                }
            }
    },
    getNode: function (t, compName, i) {
        var resNode;
        if (ftc.RestoreNodeTime > 0 && (this._nodes[t] || (this._nodes[t] = []), this._nodes[t].length > 0)) return (resNode = this._nodes[t][this._nodes[t].length - 1]).__ftRestored = void 0, this.countNodeTotalRestored--, this._nodes[t].splice(this._nodes[t].length - 1, 1), compName ? resNode.getComponent(compName) : resNode;
        if (this._resource[t]) {
            if (!this._resource[t].isValid) return void ftc.err("\u7ed3\u70b9\u5df2\u88ab\u91ca\u653e\uff0c\u65e0\u6cd5\u521b\u5efa" + t);
            resNode = cc.instantiate(this._resource[t])
        } else i || (resNode = new cc.Node, compName && resNode.addComponent(compName));
        if (resNode) return this.countNodeTotalNew++, ft.console("newNode:" + t), resNode.__ftRestoreName = t, compName ? resNode.getComponent(compName) : resNode
    },
    restoreNodeChildren: function (t, e) {
        for (var i = t.children.length - 1; i >= 0; i--) this.restoreNode(t.children[i], e)
    },
    restoreNodes: function (t, e) {
        if (t && t.__partBuffer) {
            for (var i = 0; i < t.__partBuffer.length; i++) ftc.ManagerRes.restoreNode(t.__partBuffer[i], e);
            t.__partBuffer = void 0
        }
    },
    cleanNodes: function () {
        if (ftc.RestoreNodeTime > 0) {
            var t = ft.getSysMilli(),
                e = 0;
            for (var i in this._nodes) {
                for (var a = this._nodes[i], n = 0; n < a.length; n++)
                    if (a[n].isValid) {
                        if (!(a[n].__restoreTime >= 0 && a[n].__restoreTime < t - ftc.RestoreNodeTime)) break;
                        a[n].isValid && (a[n].destroy(), e++)
                    } n > 0 && a.splice(0, n)
            }
            e > 0 && (this.countNodeTotalDestroy += e, this.countNodeTotalRestored -= e, ft.console("cleanNodes:" + e))
        }
    },
    storeNode: function (t, e) {
        t.__ftRestoreName = e, this._resource[t.__ftRestoreName] && this._resource[t.__ftRestoreName].isValid ? t.destroy() : (this._resource[t.__ftRestoreName] = t, t.removeFromParent(!1))
    },
    checkNodeIsRestored: function (t) {
        return !(t && t.isValid && !t.__ftRestored)
    },
    restoreNode: function (t, e) {
        if (!this.checkNodeIsRestored(t))
            if (t.__ftRestoreName) {
                if (t.__ftRestored = !0, ftc.RestoreNodeTime > 0 && !e && t.__ftRestoreName) return this._nodes[t.__ftRestoreName] || (this._nodes[t.__ftRestoreName] = []), ftc.ManagerRes.restoreNodes(t, e), t.stopAllActions(), t.removeFromParent(!1), t.__restoreTime = ft.getSysMilli(), this._nodes[t.__ftRestoreName].push(t), ft.console("restoreNode:" + t.__ftRestoreName), void this.countNodeTotalRestored++;
                this.countNodeTotalDestroy++, ft.console("destroy node:" + t.__ftRestoreName), ftc.ManagerRes.restoreNodes(t, e), t.destroy()
            } else ftc.ManagerRes.restoreNodes(t, e)
    },
    _loadResource0: function (t, e, i, a, n) {
        try {
            e ? cc.loader.loadRes(t, e, function (s, o) {
                if (!this.isLoadResErr(s, t) || n) {
                    if (a && !ftc.ManagerRes.checkNodeIsRestored(a.node)) try {
                        s ? i() : (ftc.ManagerRes._addAutoReleaseRes([t, e], a), i(o))
                    } catch (e) {
                        ftc.uploadCatch(e, "ManagerRes._loadResource0:" + t + "," + a.node.name)
                    }
                } else this._loadResource0(t, e, i, a)
            }.bind(this)) : cc.loader.loadRes(t, function (s, o) {
                if (!this.isLoadResErr(s, t) || n) {
                    if (a && !ftc.ManagerRes.checkNodeIsRestored(a.node)) try {
                        s ? i() : (ftc.ManagerRes._addAutoReleaseRes([t, e], a), i(o))
                    } catch (e) {
                        ftc.uploadCatch(e, "ManagerRes._loadResource0:" + t + "," + a.node.name)
                    }
                } else this._loadResource0(t, e, i, a)
            }.bind(this))
        } catch (t) {
            cc.error(t.toString())
        }
    },
    loadResource: function (t, e, i, a, n) {
        void 0 === i && (i = e, e = void 0), this._autoReleaseResLock[t] || (this._autoReleaseResLock[t] = 0), this._autoReleaseResLock[t]++, this._loadResource0(t, e, i, a, n)
    },
    initPart: function (t, e, i) {
        if (e.node)
            if (e.node.__partBuffer || (e.node.__partBuffer = []), t.node) {
                if (e.node.__partBuffer.push(t.node), t.init) {
                    if (void 0 === i && t.name && (i = t.name.substring(t.name.indexOf("<") + 1, t.name.length - 1)), t._layoutName = i, ftc.replacePartFunc[i])
                        for (var a in ftc.replacePartFunc[i]) t[a] = ftc.replacePartFunc[i][a].bind(t);
                    t.init(), t.init = void 0
                }
                t.load && t.load()
            } else e.node.__partBuffer.push(t)
    },
    _loadPartResource: function (t, e, i, a, n) {
        try {
            this.latestOptionUrl = "_loadPartResource:" + t + "," + e + "," + i.name, cc.loader.loadRes(this._convertField2Prefix(n || i.__ftField) + "part/" + t, cc.Prefab, function (s, o) {
                if (this.isLoadResErr(s, t)) this._loadPartResource(t, e, i, a, n);
                else {
                    if (o) {
                        this._resource[t] = o;
                        var r = ftc.ManagerRes.getNode(t, e, !0);
                        r ? (this.initPart(r, i, t), a(r)) : cc.log("\u52a0\u8f7dPart\u8d44\u6e90\u51fa\u9519:" + t)
                    } else a();
                    this.latestOptionUrl = ""
                }
            }.bind(this))
        } catch (t) {
            cc.error(t.toString())
        }
    },
    newPart: function (t, e, i, a, n) {
        ft.isObject(e) && (i = e, e = void 0), void 0 == e && (e = t), void 0 == i && (i = ftc.ManagerRes.topLayout());
        var s = ftc.ManagerRes.getNode(e, t, !0);
        if (s) return this.initPart(s, i, e), a && a(s), s;
        a ? this._loadPartResource(e, t, i, a, n) : ftc.err("\u65e0\u6cd5\u521b\u5efaPart:" + e + "," + t)
    },
    _loadLayout: function (t, e) {
        t.load && t.load(), ftc._checkUnHandlerMsg(), t.__secondFrameEnter = 0, e && e(t)
    },
    _initLayout: function (t, e, i, a) {
        if (t._layoutName = e, t.__ftField = i.field, -1 != t._showShielding && (t._showShielding = !i.hide), t.node.active = !0, i.hide) {
            var n = ftc.ManagerRes.topLayout();
            n && (n.node.active = !1)
        }
        if (ftc.ManagerRes.pushLayout(t), t.init && ftc.replaceLayoutFunc[e])
            for (var s in ftc.replaceLayoutFunc[e]) {
                var o = ftc.replaceLayoutFunc[e][s];
                if ("function" == typeof o) t[s] = o.bind(t);
                else if ("msg" == s)
                    for (var r in t.msg && "function" == typeof t.msg && (t.msg(), ft.bindMsg(t)), o) t.msg[r] = o[r].bind(t)
            }
        if (ftc.scene.node.addChild(t.node), ftc.ManagerRes.updateShielding(), t._prepareParts) {
            var c = [];
            for (s = t._prepareParts.length - 1; s >= 0; s--) this._resource[t._prepareParts[s]] || c.push(this._convertField2Prefix(i.field) + "part/" + t._prepareParts[s]);
            if (c.length > 0) try {
                cc.loader.loadResArray(c, cc.Prefab, function (e, i) {
                    if (i) {
                        for (var n = 0; n < i.length; n++) this._resource[i[n].name] = i[n];
                        t._prepareParts = void 0
                    }
                    this._loadLayout(t, a)
                }.bind(this))
            } catch (t) {
                cc.error(t.toString())
            } else t._prepareParts = void 0, this._loadLayout(t, a)
        } else this._loadLayout(t, a)
    },
    _loadResource1: function (t, e, i) {
        try {
            this.latestOptionUrl = "_loadResource1:" + t + "," + e + "," + i, cc.loader.loadRes(t, cc.Prefab, function (a, n) {
                if (this.isLoadResErr(a, i)) this._loadResource1(t, e, i);
                else {
                    if (n) {
                        var s = cc.instantiate(n);
                        s.__ftRestoreName = i;
                        var o = s.getComponent(e);
                        if (o) {
                            this.countNodeTotalNew++, ftc.ManagerRes._addAutoReleaseRes([t, cc.Prefab], o);
                            for (var r = -1, c = 0; c < this.__newLayoutCallback.length; c++)
                                if (this.__newLayoutCallback[c][1] == e && !this.__newLayoutCallback[c][0]) {
                                    r = c;
                                    break
                                } for (r > -1 ? (this.__newLayoutCallback[r][0] = !0, this.__newLayoutCallback[r][4] = o) : ftc.err("\u52a0\u8f7d\u754c\u9762\u51fa\u9519\uff1a" + e + "," + i); this.__newLayoutCallback.length && this.__newLayoutCallback[0][0];) {
                                    var h = this.__newLayoutCallback[0];
                                    ftc.ManagerRes._initLayout(h[4], h[1], h[3], h[2]), this.__newLayoutCallback.splice(0, 1)
                                }
                        } else ftc.err("\u672a\u627e\u5230\u811a\u672c" + e)
                    }
                    this.latestOptionUrl = ""
                }
            }.bind(this))
        } catch (t) {
            cc.error(t.toString())
        }
    },
    newLayout: function (t, e, i) {
        ft.console("newLayout:" + t), ftc._recordUILog(ftc._uiLogType.NewLayout, t), ftc.ManagerRes.lockClicking = 1, ftc.setTvTip(void 0, void 0, 3), ftc.ManagerTV.updateSelect(), i || (i = {}), i.resName || (i.resName = t);
        var a = ftc.ManagerRes.getNode(i.resName, t, !0);
        if (a) this.__newLayoutCallback.length > 0 ? this.__newLayoutCallback.push([!0, t, e, i, a]) : ftc.ManagerRes._initLayout(a, t, i, e);
        else {
            var n = this._convertField2Prefix(i.field) + "view/" + i.resName;
            this.__newLayoutCallback.push([!1, t, e, i]), this._autoReleaseResLock[t] || (this._autoReleaseResLock[t] = 0), this._autoReleaseResLock[t]++, this._loadResource1(n, t, i.resName)
        }
    },
    _convertField2Prefix: function (t) {
        return t ? t + "/" : ""
    },
    addListViewToTopLayout: function (t, e) {
        var i;
        if (i = e ? ft.isObject(e) ? e : this.findLayout(e) : this.topLayout()) return i.node._allListView || (i.node._allListView = []), i.node._allListView.push(t), i
    },
    restoreListViewNodes: function (t) {
        if (t._allListView)
            for (var e = 0; e < t._allListView.length; e++) t._allListView[e].restoreNodes()
    },
    _checkCallbackOnView: function (t) {
        if (void 0 !== t) {
            for (var e = t.length, i = 0; i < e; i++) t[i][0](), t[i][1] > 0 && t[i][1]--;
            for (i = e - 1; i >= 0; i--) t[i][1] || t.splice(i, 1)
        }
    },
    checkCallbackOnOpenView: function (t) {
        this._checkCallbackOnView(this._callbackOnOpenLayout[t]), this._checkCallbackOnView(this._callbackOnOpenLayout.all_view)
    },
    checkCallbackOnCancelView: function (t) {
        this._checkCallbackOnView(this._callbackOnCancelLayout[t]), this._checkCallbackOnView(this._callbackOnCancelLayout.all_view)
    },
    addCallbackOnOpenView: function (t, e, i) {
        e || (e = "all_view"), i || (i = -1), this._callbackOnOpenLayout[e] || (this._callbackOnOpenLayout[e] = []), this._callbackOnOpenLayout[e].push([t, i])
    },
    addCallbackOnCancelView: function (t, e, i) {
        e || (e = "all_view"), i || (i = -1), this._callbackOnCancelLayout[e] || (this._callbackOnCancelLayout[e] = []), this._callbackOnCancelLayout[e].push([t, i])
    },
    addClick: function (t, e, i, a, n, s) {
        if (null != e) {
            if (!e._sprite && e._getTarget) {
                var o = e._getTarget();
                e._sprite = e._getTargetSprite(o)
            }
            i && void 0 == a && void 0 == n ? (ft.isObject(i) && (n = i, i = void 0), !0 !== i && !1 !== i || (a = i, i = void 0)) : i && a && void 0 == n && ft.isObject(a) && (n = a, a = void 0), !i || t.onLongClick ? (t._ftClickStart && (e.node.off(cc.Node.EventType.TOUCH_START, t._ftClickStart), t._ftClickStart = void 0), t._ftClickCancel && (e.node.off(cc.Node.EventType.TOUCH_CANCEL, t._ftClickCancel), t._ftClickCancel = void 0), t._ftClickEnd && (e.node.off(cc.Node.EventType.TOUCH_END, t._ftClickEnd), t._ftClickEnd = void 0), t._ftClickStart = function (a) {
                if ((s || ftc.ManagerRes.topLayout() == t) && e.interactable) {
                    if (1 == ftc.ManagerRes.lockClicking) return;
                    ftc.ManagerRes.lockClicking = e, i && (t.__longPressTime = i, t.__longPressEvent = a)
                }
            }.bind(t), t._ftClickCancel = function (a) {
                if ((s || ftc.ManagerRes.topLayout() == t) && e.interactable) {
                    if (ftc.ManagerRes.lockClicking != e) return;
                    if (i) {
                        if (-1 == t.__longPressTime) {
                            var n = t._layoutName ? t._layoutName : t.name;
                            e.name && ftc._recordUILog(ftc._uiLogType.LongClickButton, n + "/" + e.name.substr(0, e.name.indexOf("<"))), t.onLongClick(t.__longPressEvent, !0)
                        }
                        t.__longPressTime = 0
                    }
                }
            }.bind(t), t._ftClickEnd = function (i) {
                if (e._pressed = !1, e._updateState(), (s || ftc.ManagerRes.topLayout() == t) && e.interactable) {
                    if (ftc.ManagerRes.lockClicking != e) return;
                    if (-1 == t.__longPressTime) return t.__longPressTime = 0, void t.onLongClick(t.__longPressEvent, !0);
                    t.__longPressTime = 0;
                    var a = t._layoutName ? t._layoutName : t.name;
                    e.name && ftc._recordUILog(ftc._uiLogType.ClickButton, a + "/" + e.name.substr(0, e.name.indexOf("<"))), ftc.onClick(n && n.sound ? n.sound : ""), ftc.ManagerTV.checkSelectNode && ftc.ManagerTV.checkSelectNode(), t.onClick(i)
                }
            }.bind(t), e.node.on(cc.Node.EventType.TOUCH_START, t._ftClickStart), e.node.on(cc.Node.EventType.TOUCH_CANCEL, t._ftClickCancel), e.node.on(cc.Node.EventType.TOUCH_END, t._ftClickEnd), !a && ftc.isTv() ? (2 == s && (n || (n = {}), n.list = t._parentListView), ftc.ManagerTV.addClick(t.node, e, t._ftClickStart, t._ftClickEnd, n)) : n && n.phoneBack && ftc.ManagerTV.setPhoneBack(t.node, e, t._ftClickStart, t._ftClickEnd)) : ftc.err(t.name + " \u7f3a\u5c11\u5b9a\u4e49onLongClick")
        } else ftc.err(t.name + " \u6709\u672a\u7ed1\u5b9abutton")
    }
}
