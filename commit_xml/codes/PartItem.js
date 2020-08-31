
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    buttonSelf: cc.Button,
                    spriteQuality: cc.Sprite,
                    spriteIcon: cc.Sprite,
                    spriteMark: cc.Sprite,
                    spriteStar: cc.Sprite,
                    labelNum: cc.Label,
                    labelLevel: cc.Label,
                    labelName: cc.Label,
                    spriteStatus: cc.Sprite,
                    spineStatus: sp.Skeleton,
                    spriteRare: cc.Sprite,
                    spriteFirst: cc.Sprite
                },
                init: function () { },
                load: function () {
                    this.node.active = !0, this.node.position = cc.v2(0, 0), this.node.scale = 1, this.node.angle = 0, this.node.opacity = 255, this.id = void 0, this.data = void 0, this.type = void 0, this._callback = void 0, this._param = void 0, this.labelLevel.node.active = !1, this.labelNum.node.active = !1, this.labelName.node.active = !1, this.labelName.node.color = ftc.newColor(8410945), this.spriteMark.node.active = !1, this.spriteStar.node.active = !1, this.spriteIcon.node.active = !1, this.buttonSelf.node.active = !0, this.spriteStatus.node.active = !1, this.spineStatus.node.active = !1, this.spriteRare.node.active = !1, this.spriteFirst.node.active = !1, this.addClick(this.buttonSelf, !0)
                },
                setData: function (t, e, i) {
                    if (this.type = ft.type.partItemType.item, this.id = t, this.data = {
                        id: t,
                        num: e
                    }, ft.ExtItem.getType(t) === ft.type.item.whole) {
                        var a = ft.ExtItem.getHero(t);
                        if (a) {
                            (r = ftd.Item.get(t, "c_work")) && (s = (r = JSON.parse(r))[0], o = r[1]), this.setHeroData({
                                id: a,
                                lv: s,
                                star: o,
                                up: 0
                            }, i)
                        } else {
                            var n = ft.ExtItem.getEquip(t);
                            if (n) {
                                var s, o, r;
                                (r = ftd.Item.get(t, "c_work")) && (s = (r = JSON.parse(r))[0], o = r[1]), this.setEquipData({
                                    id: n,
                                    lv: s,
                                    star: o,
                                    num: e
                                }, i)
                            } else {
                                var c = ft.ExtItem.getPet(t);
                                if (c) this.setPetData(c, i);
                                else {
                                    var h = ft.ExtItem.getTitle(t);
                                    if (h) this.setTitleData(h, i, t);
                                    else {
                                        var f = ft.ExtItem.getJewel(t);
                                        f ? this.setJewelData({
                                            id: f,
                                            num: e
                                        }, i) : this.setItemData(t, e, i)
                                    }
                                }
                            }
                        }
                    } else this.setItemData(t, e, i)
                },
                getData: function () {
                    return this.data
                },
                setCallback: function (t, e) {
                    this._callback = t, this._param = e
                },
                setItemData: function (t, e, i) {
                    this.labelLevel.node.active = !1, this.spriteStar.node.active = !1, this.spriteQuality.node.active = !0, this.spriteQuality.spriteFrame = ft.ExtItem.getQualitySprite(this.id), this.spriteIcon.node.active = !0, this.spriteIcon.spriteFrame = ft.ExtItem.getIconSprite(this.id);
                    var a = ft.ExtItem.getMark(this.id);
                    this.spriteMark.node.active = a > 0, this.spriteMark.node.active && (this.spriteMark.spriteFrame = ft.ExtItem.getMarkSprite(this.id)), this.labelNum.node.active = !!e, this.labelNum.node.active && (this.labelNum.string = e), this.labelName.node.active = i, this.labelName.node.active && (this.labelName.string = ft.trimName(ft.ExtItem.getName(t)));
                    var n = ft.ExtItem.getHero(t);
                    this.spriteRare.node.active = n && ft.ExtHero.getRarity(n) >= ft.type.rarity.rare
                },
                setEquipData: function (t, e) {
                    this.type = ft.type.partItemType.equip, this.data = t, this.id = t.id, this.spriteMark.node.active = !1, this.spriteQuality.node.active = !0, this.spriteIcon.node.active = !0, this.spriteQuality.spriteFrame = ft.ExtEquip.getQualitySprite(t.id), this.spriteIcon.spriteFrame = ft.ExtEquip.getIconSprite(t.id), this.labelNum.node.active = t.num > 1, this.labelNum.node.active && (this.labelNum.string = t.num), this.labelLevel.node.active = !!t.lv, this.labelLevel.node.active && (this.labelLevel.string = t.lv + ftc.language("\u7ea7")), this.labelName.node.active = e, this.labelName.node.active && (this.labelName.string = ft.trimName(ft.ExtEquip.getName(t.id))), this.spriteStar.node.active = t.star > 0, this.spriteStar.node.active && (this.spriteStar.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "common_icon_xing" + t.star))
                },
                setEquipStarActive: function (t) {
                    this.spriteStar.node.active = t
                },
                getEquipData: function () {
                    return this.data
                },
                setHeroData: function (t, e, i) {
                    this.type = ft.type.partItemType.hero, this.hero = t, this.spriteMark.node.active = !1, this.spriteIcon.node.active = !0, this.spriteQuality.node.active = !0, this.labelNum.node.active = !1, this.spriteIcon.spriteFrame = ft.ExtHero.getIconSprite(t.id), this.spriteQuality.spriteFrame = ft.ExtHero.getQualitySprite(t.id, !0), t.star && (this.spriteStar.node.active = !0, this.spriteStar.spriteFrame = ft.ExtHero.getStarSprite(t.star)), e && (this.labelName.node.active = !0, this.labelName.string = ft.trimName(ft.ExtHero.getName(t.id))), i || (this.spriteRare.node.active = ft.ExtHero.getRarity(t.id) >= ft.type.rarity.rare)
                },
                setSkillData: function (t, e) {
                    this.type = ft.type.partItemType.skill, this.id = t, this.spriteIcon.node.active = !0, this.spriteQuality.node.active = !0, this.labelNum.node.active = !1, this.spriteIcon.spriteFrame = ft.ExtSkill.getIconSprite(t), this.spriteQuality.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "common_icon_bg1"), this.labelName.node.active = e, e && (this.labelName.node.active = !0, this.labelName.string = ft.trimName(ft.ExtSkill.getName(t)))
                },
                setPetData: function (t, e) {
                    this.type = ft.type.partItemType.pet, this.id = t, this.spriteIcon.node.active = !0, this.spriteQuality.node.active = !0, this.labelNum.node.active = !1, this.spriteIcon.spriteFrame = ft.ExtPet.getIconSprite(t), this.spriteQuality.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "common_icon_bg1"), e && (this.labelName.node.active = !0, this.labelName.string = ft.trimName(ft.ExtPet.getName(t)))
                },
                setTitleData: function (t, e, i) {
                    this.type = ft.type.partItemType.title, this.id = t, this.spriteIcon.node.active = !0, this.spriteQuality.node.active = !0, this.labelNum.node.active = !1, this.spriteIcon.spriteFrame = ft.ExtItem.getIconSprite(i), this.spriteQuality.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "common_icon_bg1"), e && (this.labelName.node.active = !0, this.labelName.string = ft.trimName(ft.ExtTitle.getName(t)))
                },
                setJewelData: function (t, e) {
                    this.type = ft.type.partItemType.jewel, this.id = t.id, this.spriteIcon.node.active = !0, this.spriteQuality.node.active = !0, this.labelNum.node.active = !1, this.spriteIcon.spriteFrame = ft.ExtJewel.getIconSprite(t.id), this.spriteQuality.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "common_icon_bg1"), e && (this.labelName.node.active = !0, this.labelName.string = ft.trimName(ft.ExtJewel.getName(t.id), 6)), this.labelNum.node.active = t.num > 1, this.labelNum.node.active && (this.labelNum.string = t.num)
                },
                setJewelTypeData: function (t) {
                    this.spriteIcon.node.active = !0, this.spriteQuality.node.active = !0, this.labelNum.node.active = !1;
                    var e = ftd.Jeweltype.get(t.id, "img");
                    this.spriteIcon.spriteFrame = ftc.ManagerRes.getSpriteFrame("icon_goods", "goods_" + e), this.spriteQuality.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "common_icon_bg1")
                },
                setNum: function (t, e) {
                    t ? (this.labelNum.node.active = !0, this.labelNum.string = t) : this.labelNum.node.active = !1, this.data && (this.data.num = t), e && (this.labelNum.node.color = e)
                },
                setName: function (t) {
                    this.labelName.node.active = !0, this.labelName.string = t
                },
                setNameColor: function (t) {
                    this.labelName.node.color = t
                },
                setInteractable: function (t) {
                    this.buttonSelf.node.active = t
                },
                setStatus: function (t) {
                    1 === t ? (this.spineStatus.node.active = !1, this.spriteStatus.node.active = !0, this.spriteStatus.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "common_icon_zt_get")) : 2 === t ? (this.spineStatus.node.active = !1, this.spriteStatus.node.active = !1, this.loadResource("spine/view/equip_kuang2", sp.SkeletonData, function (t) {
                        this.spineStatus.skeletonData = t, this.spineStatus.node.active = !0, this.spineStatus.setAnimation(0, "wait1", !0)
                    }.bind(this))) : 3 === t ? (this.spineStatus.node.active = !1, this.spriteStatus.node.active = !0, this.spriteStatus.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "common_icon_gray")) : (this.spineStatus.node.active = !1, this.spriteStatus.node.active = !1)
                },
                setIconSprite: function (t) {
                    this.spriteIcon.spriteFrame = t
                },
                setBgVisible: function (t) {
                    this.spriteQuality.node.active = t
                },
                setFirstMark: function (t) {
                    this.spriteFirst.node.active = t
                },
                setSpecialStatus: function () { },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    if (t.target === this.buttonSelf.node) {
                        if (this._callback) return void this._callback(this._param);
                        var i = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
                        if (this.type === ft.type.partItemType.item) {
                            var a, n = 0,
                                s = ft.ExtItem.getType(this.id);
                            if (s === ft.type.item.piece || s === ft.type.item.battleSkin) {
                                (a = this.newPart("PartItemDetail")).setData({
                                    id: this.id
                                }), ftc.scene.node.addChild(a.node, 256), a.nodeLayoutMenu.active = !0, n = 166, (c = ft.ExtItem.getEquip(this.id)) && (a.labelMenu.string = ftc.language("\u88c5\u5907\u8be6\u60c5"), a.setMenuCallback(function () {
                                    ftc.showEquipInfo(this.node, {
                                        id: c
                                    })
                                }.bind(this)));
                                var o = ft.ExtItem.getHero(this.id);
                                if (o) {
                                    var r = ft.ExtHero.getHero(o);
                                    a.labelMenu.string = ftc.language("\u6b66\u5c06\u8be6\u60c5"), a.setMenuCallback(function () {
                                        ftc.loadLayout("LayoutHero", function (t) {
                                            t.setData(r || o)
                                        })
                                    })
                                }
                            } else if (s === ft.type.item.whole) {
                                var c;
                                if (c = ft.ExtItem.getEquip(this.id)) ftc.showEquipInfo(this.node, {
                                    id: c
                                });
                                else if (r = ft.ExtItem.getHero(this.id)) {
                                    var h = ftd.Item.get(this.id, "c_work");
                                    h && (h = JSON.parse(h), r = {
                                        id: ft.ExtItem.getHero(this.id),
                                        lv: h[0],
                                        star: h[1],
                                        up: h[2]
                                    }), ftc.loadLayout("LayoutHero", function (t) {
                                        t.setData(r)
                                    })
                                } else (a = this.newPart("PartItemDetail")).setData({
                                    id: this.id
                                }), ftc.scene.node.addChild(a.node, 256), a.nodeLayoutMenu.active = !1
                            } else (a = this.newPart("PartItemDetail")).setData({
                                id: this.id
                            }), ftc.scene.node.addChild(a.node, 256), a.nodeLayoutMenu.active = !1;
                            a && (i.y < 232 ? a.nodeRoot.y = i.y + 116 : a.nodeRoot.y = i.y - 116, i.x > cc.winSize.width - 320 - n ? a.nodeRoot.x = i.x - 160 : a.nodeRoot.x = i.x + 160)
                        } else if (this.type === ft.type.partItemType.equip) ftc.showEquipInfo(this.node, this.data);
                        else if (this.type === ft.type.partItemType.hero) ftc.loadLayout("LayoutHero", function (t) {
                            t.setData(this.hero)
                        }.bind(this));
                        else if (this.type === ft.type.partItemType.pet || this.type === ft.type.partItemType.skill || this.type === ft.type.partItemType.title || this.type === ft.type.partItemType.jewel)
                            if (this.type === ft.type.partItemType.pet) ftc.showItemInfo(this.buttonSelf.node, {
                                name: ft.ExtPet.getName(this.id),
                                info: ft.ExtPet.getInfo(this.id)
                            });
                            else if (this.type === ft.type.partItemType.skill) ftc.showItemInfo(this.buttonSelf.node, {
                                name: ft.ExtSkill.getName(this.id),
                                info: ft.ExtSkill.getInfo(this.id)
                            });
                            else if (this.type === ft.type.partItemType.title) {
                                var f = ft.ExtTitle.getInfo(this.id);
                                f += ftc.language("(\u79f0\u53f7\u7ecf\u9a8c+{0})").replace("{0}", ft.ExtTitle.getExp(this.id)) + "\n\n", f += ft.ExtTitle.getValueDesc(this.id) + "\n", f += ft.ExtTitle.getConditionDesc(this.id), ftc.showItemInfo(this.buttonSelf.node, {
                                    name: ft.ExtTitle.getName(this.id),
                                    info: f
                                })
                            } else this.type === ft.type.partItemType.jewel && ftc.showItemInfo(this.buttonSelf.node, {
                                name: ft.ExtJewel.getName(this.id),
                                info: ft.ExtJewel.getInfo(this.id)
                            });
                        else this.type === ft.type.partItemType.pet && ftc.showTip("\u663e\u793a\u9635\u6cd5\u6216\u7b56\u7565\u4fe1\u606f")
                    }
                }
            })
        