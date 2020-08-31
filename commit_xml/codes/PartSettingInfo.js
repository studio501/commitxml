
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    spriteQuality: cc.Sprite,
                    spriteIcon: cc.Sprite,
                    buttonSetHeader: cc.Button,
                    labelNick: cc.Label,
                    buttonEditNick: cc.Button,
                    labelDocTitle: cc.Label,
                    labelDoc: cc.Label,
                    buttonEdit: cc.Button,
                    labelEdit: cc.Label,
                    buttonExit: cc.Button,
                    labelLv: cc.Label,
                    progressExp: cc.ProgressBar,
                    labelExp: cc.Label,
                    labelSamsara: cc.Label,
                    labelTitle: cc.Label,
                    buttonChangeTitle: cc.Button,
                    buttonTeams: [cc.Button],
                    listView: ftc.ListView,
                    partFight: t("PartFight"),
                    spineHero: sp.Skeleton,
                    buttonAdd: cc.Button,
                    spriteSkinIcon: cc.Sprite,
                    buttonChange: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonChange);
                    for (var t = 0; t < this.buttonTeams.length; t++) this.addClick(this.buttonTeams[t]);
                    this.addClick(this.buttonSetHeader), this.addClick(this.buttonEditNick), this.addClick(this.buttonEdit), this.addClick(this.buttonExit), this.addClick(this.buttonAdd), this.addClick(this.buttonChangeTitle)
                },
                load: function () {
                    var t = ftc.ManagerData.get1("Player"),
                        e = t.level;
                    this.labelLv.string = e, this.progressExp.progress = ft.ExtItem.getNum(ft.value.item.exp) / ft.ExtPlayer.getNextExp(e), this.labelExp.string = ft.getNumShow(ft.ExtItem.getNum(ft.value.item.exp)) + "/" + ft.getNumShow(ft.ExtPlayer.getNextExp(e)), this.labelSamsara.string = t.samsara, this.selectTeam(0), this.initPart(this.partFight)
                },
                setData: function (t) { },
                cleanup: function () { },
                updateData: function () {
                    var t = ftc.ManagerData.get1("ManagerMap").skins.split("|"),
                        e = ftc.ManagerData.get1("ManagerMap").skinTypes.split(","),
                        i = t[this.team];
                    if (0 != i) {
                        this.buttonAdd.node.active = !1;
                        var a = e[this.team];
                        if (a == ft.type.skin.commander || a == ft.type.skin.team) this.spineHero.node.active = !1, this.spriteSkinIcon.node.parent.active = !0, this.spriteSkinIcon.spriteFrame = ftc.ManagerRes.getSpriteFrame("program", "skin_" + a);
                        else {
                            this.spriteSkinIcon.node.parent.active = !1, this.spineHero.node.active = !0;
                            var n = "spine/npc/npc_" + (a == ft.type.skin.specify ? ftd.Item.get(i, "c_work") : ft.ExtHero.getImg(i));
                            this.loadResource(n, sp.SkeletonData, function (t) {
                                t && (this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "wait2", !0))
                            }.bind(this), this)
                        }
                    } else this.spineHero.node.active = !1, this.spriteSkinIcon.node.parent.active = !1, this.buttonAdd.node.active = !0;
                    this.spriteIcon.spriteFrame = ft.ExtDecoration.getCurSprite(ft.type.decoration.header), this.spriteQuality.spriteFrame = ft.ExtDecoration.getCurSprite(ft.type.decoration.headerFrame), this.updateName()
                },
                updateName: function () {
                    var t = ftc.ManagerData.get1("Player"),
                        e = ftc.ManagerData.passport,
                        i = e.account || e.uid;
                    i ? (this.labelDocTitle.string = ftc.language("\u8d26\u53f7"), this.labelDoc.string = i) : (this.labelDocTitle.string = ftc.language("\u5b58\u6863"), this.labelDoc.string = ftc.ManagerData.sid.substr(0, 16)), this.labelNick.string = t.nick, ftc.getUserCenter() ? (this.buttonEdit.node.active = !0, this.labelEdit.string = ftc.language("\u7528\u6237\u4e2d\u5fc3")) : ftc.ManagerData.passport.account.length > 18 ? (this.buttonEdit.node.active = !0, this.labelEdit.string = ftc.language("\u8bbe\u7f6e\u8d26\u53f7")) : this.buttonEdit.node.active = !1, this.buttonEditNick.node.active = "" === t.nick, this.labelTitle.string = ft.ExtTitle.getCurTitle(), this.buttonExit.node.active = !!e.account
                },
                tick: function (t) { },
                selectTeam: function (t) {
                    if (ft.ExtHero.getIsOpenTeam(t)) {
                        this.team = t;
                        for (var e = 0; e < this.buttonTeams.length; e++) this.buttonTeams[e].interactable = e !== t;
                        var i = ft.ExtHero.getTeam(ftc.ManagerData.get2Object("Hero"), ftc.ManagerData.get1("ManagerHero").teamIds, t);
                        for (e = i.length - 1; e >= 0; e--) null === i[e] && i.splice(e, 1);
                        this.listView.setListView(i), this.updateData();
                        var a = ft.ExtHero.getTeamFight(t);
                        this.partFight.setData(a)
                    } else ftc.showTip("3\u5468\u76ee\u5f00\u653e\u961f\u4f0d2")
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonSetHeader.node) ftc.loadLayout("LayoutSelectHeader");
                    else if (t.target === this.buttonEditNick.node) ftc.loadLayout("LayoutInputNick");
                    else if (t.target === this.buttonEdit.node) ftc.getUserCenter() ? ftr.showUserCenter() : ftc.ManagerData.passport.account.length > 18 && ftr.showAccount(ftr.Account.Type.SETACCOUNT, ftr.Account.MODE.SELF);
                    else if (t.target === this.buttonExit.node) ftc.sysRestart();
                    else if (t.target === this.buttonChangeTitle.node) {
                        ftc.ManagerData.get2("Title") ? ftc.loadLayout("LayoutTitle") : ftc.showTip("\u6682\u65e0\u79f0\u53f7")
                    } else if (t.target === this.buttonAdd.node || t.target === this.buttonChange.node) ftc.loadLayout("LayoutSelectSkin", function (t) {
                        t.setData(this.team)
                    }.bind(this));
                    else
                        for (var i = 0; i < this.buttonTeams.length; i++)
                            if (t.target === this.buttonTeams[i].node) {
                                this.selectTeam(i);
                                break
                            }
                }
            })
        