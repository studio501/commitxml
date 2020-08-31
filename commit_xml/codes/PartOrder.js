
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeRoot: cc.Node,
                    spriteName: cc.Sprite,
                    labelInfo1: cc.Label,
                    labelInfo2: cc.Label
                },
                init: function () {
                    var t = [888, 488, 788.3, 395.7, 674, 284, 646, 488, 551.8, 395.1, 437, 284, 405, 488, 314, 395, 201, 284];
                    this.initPos1 = [];
                    for (var e = 0; e < 9; e += 1) this.initPos1[e + 1] = cc.v2(t[2 * e], t[2 * e + 1]);
                    this.node.on(cc.Node.EventType.TOUCH_START, this.clickStart.bind(this)), this.node.on(cc.Node.EventType.TOUCH_MOVE, this.clickMove.bind(this)), this.node.on(cc.Node.EventType.TOUCH_END, this.clickEnd.bind(this)), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.clickCancel.bind(this)), ftc.ManagerTV.setNotShowOnEnter(this.node)
                },
                clickStart: function (t) {
                    if (this._interactable && !this._clicking) {
                        this._selectedHero && this._selectedHero.setSelect(!1), this._clicking = !1;
                        for (var e = this.nodeRoot.convertToNodeSpaceAR(t.touch.getLocation()), i = ft.value.com.maxHeroNum - 1; i >= 0; i--)
                            if (Math.abs(e.x - this.heroPoss2[i].x) <= 70 && Math.abs(e.y - this.heroPoss2[i].y) <= 70) {
                                var a = this.partOrderHeroes[i];
                                return this._selectedHero ? (this.swapOrderHero(this._selectedHero, a), this._selectedHero = null, !1) : !!a.getData() && (this._selectedHero = a, this._selectedHero.setSelect(!0), this._selectZIndex = this._selectedHero.node.zIndex, this._selectedHero.node.zIndex = 299, this._selectStartPos = a.node.position, this._clicking = !0, !0)
                            } return this._selectedHero = null, !1
                    }
                },
                clickMove: function (t) {
                    if (this._selectedHero) {
                        this._selectedHero.node.x += t.touch.getDelta().x, this._selectedHero.node.y += t.touch.getDelta().y;
                        var e = this.nodeRoot.convertToNodeSpaceAR(t.touch.getLocation());
                        this.checkTouchPosition(e)
                    }
                },
                clickEnd: function (t) {
                    if (this._clicking = !1, this._selectedHero) {
                        for (var e = this.nodeRoot.convertToNodeSpaceAR(t.touch.getLocation()), i = ft.value.com.maxHeroNum - 1; i >= 0; i--)
                            if (Math.abs(e.x - this.heroPoss2[i].x) <= 70 && Math.abs(e.y - this.heroPoss2[i].y) <= 70) {
                                var a = this.getPartOrderHero(this.heroPoss2[i]);
                                if (a) {
                                    if (a !== this._selectedHero) {
                                        this._selectedHero.node.zIndex = this._selectZIndex, this.swapOrderHero(this._selectedHero, a), this._selectedHero = null;
                                        for (var n = 0; n < this.heroBgs2.length; n++) this.heroBgs2[n].setSelect(!1)
                                    } else this._selectedHero.node.zIndex = this._selectZIndex, this._selectedHero.node.position = this._selectStartPos, this._selectedHero.setSelect(!0);
                                    return
                                }
                            } this._selectedHero.node.zIndex = this._selectZIndex, this._selectedHero.node.position = this._selectStartPos, this._selectedHero.setSelect(!1), this._selectedHero = null
                    }
                },
                clickCancel: function (t) {
                    this._clicking = !1, this._selectedHero && (this._selectedHero.node.zIndex = this._selectZIndex, this._selectedHero.node.position = this._selectStartPos, this._selectedHero.setSelect(!1), this._selectedHero = null)
                },
                checkTouchPosition: function (t) {
                    for (var e = !1, i = ft.value.com.maxHeroNum - 1; i >= 0; i--) !e && Math.abs(t.x - this.heroPoss2[i].x) <= 70 && Math.abs(t.y - this.heroPoss2[i].y) <= 70 ? (e = !0, this.heroBgs2[i].setSelect(!0)) : this.heroBgs2[i].setSelect(!1)
                },
                swapOrderHero: function (t, e) {
                    var i = this.partOrderHeroes.indexOf(t),
                        a = this.partOrderHeroes.indexOf(e);
                    if (-1 !== i && -1 !== a) {
                        t.setSelect(!1), t.node.zIndex = e.node.zIndex, e.node.zIndex = this._selectZIndex, t.node.position = e.node.position, e.node.position = this._selectStartPos;
                        var n = t;
                        this.partOrderHeroes[i] = e, this.partOrderHeroes[i].bg = this.heroBgs2[i], this.partOrderHeroes[a] = n, this.partOrderHeroes[a].bg = this.heroBgs2[a], ftc.send("heroChangeBattlePos", {
                            team: this.team,
                            pos1: a + ft.value.com.maxHeroNum * this.team,
                            pos2: i + ft.value.com.maxHeroNum * this.team
                        }), ftc.playEffect(ftc.type.effect.order_swap)
                    }
                },
                getPartOrderHero: function (t) {
                    for (var e = 0; e < this.partOrderHeroes.length; e++)
                        if (parseInt(t.x) == parseInt(this.partOrderHeroes[e].node.x) && parseInt(t.y) == parseInt(this.partOrderHeroes[e].node.y)) return this.partOrderHeroes[e];
                    return null
                },
                load: function () {
                    this.partOrderHeroBgs = [], this.partOrderHeroes = [], this.partOrderHeroBgInfos = [];
                    for (var t = 0; t < 9; t++) {
                        var e = this.newPart("PartOrderHeroBg"),
                            i = this.initPos1[t + 1];
                        e.node.x = i.x, e.node.y = i.y, this.nodeRoot.addChild(e.node), this.partOrderHeroBgs.push(e)
                    }
                    for (t = 0; t < 5; t++) {
                        var a = this.newPart("PartOrderHero");
                        this.nodeRoot.addChild(a.node), this.partOrderHeroes.push(a), ftc.isTv() && (a.getComponent(cc.Button) || a.addComponent(cc.Button), this.addClick(a.getComponent(cc.Button), {
                            zone: 1
                        }))
                    }
                    for (t = 0; t < 9; t++) {
                        var n = this.newPart("PartOrderHeroBgInfo");
                        i = this.initPos1[t + 1];
                        n.node.x = i.x, n.node.y = i.y, this.nodeRoot.addChild(n.node, 200 + t), this.partOrderHeroBgInfos.push(n)
                    }
                    this._selectedHero = null, this._clicking = !1, this._interactable = !0
                },
                selectTeam: function (t) {
                    this.team = t;
                    for (var e = ft.ExtHero.getTeam(ftc.ManagerData.get2Object("Hero"), ftc.ManagerData.get1("ManagerHero").teamIds, t), i = ftc.ManagerData.get1("ManagerHero").battlePos.split(","), a = [], n = (o = ft.value.com.maxHeroNum * t) + ft.value.com.maxHeroNum; o < n; o++) {
                        var s = e[parseInt(i[o]) % ft.value.com.maxHeroNum];
                        a.push(s)
                    }
                    this._isTeamFull = !0;
                    for (var o = 0; o < a.length; o++) this.partOrderHeroes[o].node.active = !!a[o], this.partOrderHeroes[o].setData(a[o]), a[o] || (this._isTeamFull = !1)
                },
                isTeamFull: function () {
                    return this._isTeamFull
                },
                setOrder: function (t, e) {
                    this.id = t, this._selectedHero = null;
                    var i = ftc.ManagerData.get2Object("Pet", t),
                        a = t;
                    this.spriteName.spriteFrame = ftc.ManagerRes.getSpriteFrame("txt", "txt_order_" + a);
                    var n = ft.ExtPet.getInfo(a);
                    this.labelInfo2.node.active = !1, n.length <= 8 ? (this.labelInfo1.node.x = 0, this.labelInfo1.string = n) : (this.labelInfo2.node.active = !0, this.labelInfo1.node.x = -14, this.labelInfo2.node.x = 11, this.labelInfo1.string = n.substring(0, 8), this.labelInfo2.string = n.substring(8));
                    for (var s = ft.ExtPet.getPosition(a), o = 0; o < this.partOrderHeroBgs.length; o++) this.partOrderHeroBgs[o].reset(), this.partOrderHeroBgInfos[o].reset();
                    for (o = 0; o < s.length; o++) this.partOrderHeroBgs[s[o] - 1].setData(), e ? this.partOrderHeroBgInfos[s[o] - 1].setIndex(o) : this.partOrderHeroBgInfos[s[o] - 1].setData(a, o, i.up);
                    this.heroPoss2 = [], this.heroBgs2 = [];
                    var r = [2, 5, 8, 1, 4, 7, 0, 3, 6];
                    for (o = 0; o < this.partOrderHeroes.length; o++) {
                        this.heroPoss2.push(this.initPos1[s[o]]);
                        var c = this.initPos1[s[o]];
                        this.partOrderHeroes[o].node.x = c.x, this.partOrderHeroes[o].node.y = c.y, this.partOrderHeroes[o].node.zIndex = 100 + r[s[o] - 1], this.partOrderHeroes[o].bg = this.partOrderHeroBgs[s[o] - 1], this.heroBgs2[o] = this.partOrderHeroBgs[s[o] - 1]
                    }
                },
                setInteractable: function (t) {
                    this._interactable = t
                },
                playAni: function () {
                    for (var t = ft.ExtPet.getPosition(this.id), e = 0; e < t.length; e++) this.partOrderHeroBgs[t[e] - 1].playAni()
                },
                setData: function (t) { },
                enter: function () { },
                updateData: function () {
                    var t = ftc.ManagerData.get2Object("Pet", this.id);
                    if (t) {
                        for (var e = ft.ExtPet.getPosition(this.id), i = 0; i < this.partOrderHeroBgs.length; i++) this.partOrderHeroBgs[i].reset(), this.partOrderHeroBgInfos[i].reset();
                        for (i = 0; i < e.length; i++) this.partOrderHeroBgs[e[i] - 1].setData(), this.partOrderHeroBgInfos[e[i] - 1].setData(this.id, i, t.up)
                    }
                },
                tick: function (t) { },
                cleanup: function () { },
                onClick: function (t, e) {
                    if (ftc.isTv())
                        for (var i = 0; i < this.partOrderHeroes.length; i++)
                            if (t.target === this.partOrderHeroes[i].node) {
                                var a = this.getPartOrderHero(this.heroPoss2[i]);
                                this._selectedHero ? (this.swapOrderHero(this._selectedHero, a), ftc.ManagerTV.nextSelect(this._selectedHero.getComponent(cc.Button), this.node), this._selectedHero = null) : a.getData() && (this._selectedHero = a, this._selectedHero.setSelect(!0), this._selectStartPos = a.node.position);
                                break
                            }
                }
            })
        