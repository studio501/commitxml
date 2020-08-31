
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    buttonModels: [cc.Button],
                    spriteSelects: [cc.Sprite],
                    buttonMusic: cc.Button,
                    buttonSound: cc.Button,
                    toggleMusic: cc.Toggle,
                    toggleSound: cc.Toggle,
                    button30: cc.Button,
                    button45: cc.Button,
                    button60: cc.Button,
                    toggle30: cc.Toggle,
                    toggle45: cc.Toggle,
                    toggle60: cc.Toggle,
                    buttonAdBox: cc.Button,
                    toggleAdBox: cc.Toggle,
                    layoutButtons: cc.Layout,
                    buttonKefu: cc.Button,
                    buttonShare: cc.Button,
                    buttonForum: cc.Button,
                    buttonHelp: cc.Button,
                    buttonAbout: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonKefu), this.addClick(this.buttonShare);
                    for (var t = 0; t < this.buttonModels.length; t++) this.addClick(this.buttonModels[t]);
                    this.addClick(this.buttonMusic), this.addClick(this.buttonSound), this.addClick(this.button30), this.addClick(this.button45), this.addClick(this.button60), this.addClick(this.buttonAdBox), this.addClick(this.buttonHelp), this.addClick(this.buttonForum), this.addClick(this.buttonAbout), this.buttonShare.node.active = "1" == ftc.callNativeFunction("openShare"), this.buttonKefu.node.active = !1, this.buttonForum.node.active = 1 == ftc.callNativeFunction("isShowForum"), this.buttonHelp.node.active = !ft.ExtMsg.isExclude(ft.type.activity.help), ftc.ManagerH5.isH5() && (this.buttonKefu.node.active = ftc.ManagerH5.isOpenCustomerService(), this.buttonHelp.node.active = !1);
                    var e = 5;
                    this.buttonShare.node.active || e--, this.buttonKefu.node.active || e--, this.buttonForum.node.active || e--, this.layoutButtons.spacingX = 108 - 20 * e
                },
                load: function () {
                    for (var t = ftc.ManagerData.get1("ManagerMap").isOpenKeyDir, e = 0; e < this.spriteSelects.length; e++) this.spriteSelects[e].node.active = t == e;
                    this.toggleMusic.isChecked = ftc.ManagerData.get1("ManagerMap").isOpenBGMusic, this.toggleSound.isChecked = ftc.ManagerData.get1("ManagerMap").isOpenEffect;
                    var i = ftc.ManagerData.get1("ManagerMap").frameRate;
                    this.toggle30.isChecked = 30 === i, this.toggle45.isChecked = 45 === i, this.toggle60.isChecked = 60 === i, this.toggleAdBox.isChecked = ftc.ManagerData.get1("ManagerMap").isOpenAdBox
                },
                setData: function (t) { },
                cleanup: function () { },
                updateData: function () { },
                tick: function (t) { },
                openBGMusic: function (t, e) {
                    this.toggleMusic.isChecked = ftc.ManagerData.get1("ManagerMap").isOpenBGMusic, ftc.ManagerData.get1("ManagerMap").isOpenBGMusic ? ftc.playBackMusic(ftc.type.effect.musicMap) : ftc.pauseBackMusic()
                },
                openEffect: function (t, e) {
                    this.toggleSound.isChecked = ftc.ManagerData.get1("ManagerMap").isOpenEffect
                },
                openAdBox: function (t, e) {
                    this.toggleAdBox.isChecked = ftc.ManagerData.get1("ManagerMap").isOpenAdBox
                },
                openKeyDir: function (t, e) {
                    for (var i = ftc.ManagerData.get1("ManagerMap").isOpenKeyDir, a = 0; a < this.spriteSelects.length; a++) this.spriteSelects[a].node.active = i == a;
                    ftc.sendClient("c_openKeyDir", ftc.ManagerData.get1("ManagerMap").isOpenKeyDir, "LayoutMain")
                },
                selectModel: function (t) {
                    for (var e = 0; e < this.spriteSelects.length; e++) this.buttonModels[e].interactable = e !== t, this.spriteSelects[e].node.active = e === t
                },
                updateFrameInfo: function (t) {
                    ftc.setFrameRate(t), ftc.send("openFrameRate", t), this.toggle30.isChecked = 30 === t, this.toggle45.isChecked = 45 === t, this.toggle60.isChecked = 60 === t
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonMusic.node) ftc.send("openBGMusic", ftc.ManagerData.get1("ManagerMap").isOpenBGMusic ? 0 : 1);
                    else if (t.target === this.buttonSound.node) ftc.send("openEffect", ftc.ManagerData.get1("ManagerMap").isOpenEffect ? 0 : 1);
                    else if (t.target === this.button30.node) this.updateFrameInfo(30);
                    else if (t.target === this.button45.node) this.updateFrameInfo(45), ftc.isIos() && ftc.showTip("\u6b64\u6863\u4f4d\u9700\u8981\u91cd\u542f\u751f\u6548");
                    else if (t.target === this.button60.node) this.updateFrameInfo(60);
                    else if (t.target === this.buttonAdBox.node) ftc.send("openAdBox", ftc.ManagerData.get1("ManagerMap").isOpenAdBox ? 0 : 1);
                    else if (t.target === this.buttonKefu.node) ftc.showChat();
                    else if (t.target === this.buttonShare.node) ftc.startShareKingWar(ft.type.share.setting);
                    else if (t.target === this.buttonAbout.node) ftc.loadLayout("LayoutAbout");
                    else if (t.target === this.buttonHelp.node) ftr.showHelp();
                    else if (t.target === this.buttonForum.node) ftc.callNativeFunction("showForum");
                    else
                        for (var i = 0; i < this.buttonModels.length; i++)
                            if (t.target === this.buttonModels[i].node) {
                                this.selectModel(i), ftc.send("openKeyDir", i);
                                break
                            }
                }
            })
        