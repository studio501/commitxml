
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    buttonSelf: cc.Button,
                    spriteIcon: cc.Sprite,
                    labelName: cc.Label,
                    spriteLock: cc.Sprite,
                    labelLock: cc.Label,
                    spriteZhu: cc.Sprite,
                    spriteSelect: cc.Sprite
                },
                init: function () {
                    this.addClick(this.buttonSelf)
                },
                load: function () {
                    this.skill = void 0, this.heroId = void 0, this.index = void 0
                },
                setData: function (t, e) {
                    var i;
                    if (0 === e)
                        if (ft.isObject(t)) {
                            var a = ft.ExtHero.getPos(t.id),
                                n = ftc.ManagerData.get2("Equip");
                            i = ft.ExtHero.getSkill1Id(t, a, n)
                        } else i = ft.ExtHero.getSkill1Id(t);
                    else 1 === e ? i = ft.ExtHero.getSkill2Id(t) : 2 === e && (i = ft.ExtHero.getSkill3Id(t));
                    this.heroId = t.id || t, this.skill = i, this.index = e;
                    var s = i[0],
                        o = i[1],
                        r = "";
                    s ? o || (r = ftc.language(["一星开启", "觉醒+2开启", "暂未开放"][e])) : r = "暂未开放", this.skillId = s;
                    var c = !!this.skillId;
                    this.spriteIcon.node.active = c, this.labelName.node.active = c, this.spriteZhu.node.active = c, this.spriteSelect && (this.spriteSelect.node.active = !1), c && (this.spriteIcon.spriteFrame = ft.ExtSkill.getIconSprite(s), this.labelName.string = ft.ExtSkill.getName(s), this.spriteZhu.spriteFrame = ft.ExtSkill.getSkillTypeSprite(s)), this.spriteLock.node.active = r, r && (this.labelLock.string = r)
                },
                setSelect: function (t) {
                    this.spriteSelect && (this.spriteSelect.node.active = t)
                },
                setName: function (t) {
                    this.labelName.string = t
                },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonSelf.node && this.skill[0] && ftc.showSkillInfo(this.buttonSelf.node, {
                        heroId: this.heroId,
                        index: this.index,
                        skillId: this.skill[0],
                        isOpen: this.skill[1],
                        showLvInfo: !0
                    })
                }
            })
        