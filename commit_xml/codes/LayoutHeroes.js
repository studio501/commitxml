
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    nodeRoot: cc.Node,
                    labelNum: cc.Label,
                    buttonSelect: cc.Button,
                    labelSelect: cc.Label,
                    spriteArrow: cc.Sprite,
                    buttonAll: cc.Button,
                    labelAll: cc.Label,
                    listView: ftc.ListView
                },
                init: function () {
                    this.prepareParts(["PartMenu"]), this.addClick(this.buttonSelect, !0), this.addClick(this.buttonAll, !0), ftc.isTv() && (this.buttonSelect.node.active = !1, this.buttonAll.node.active = !1)
                },
                load: function () {
                    this.isShowAll = !1, this.country = ft.type.country.all, this.listView.setListView(this.isShowAll ? ft.ExtHero.allHeroes : ft.ExtHero.myHeroes), this.labelAll.string = ftc.language("拥有"), this.labelSelect.string = ftc.language("国家:全部"), this.spriteArrow.node.scaleY = -1, ft.ExtHero.load(!0), this.labelNum.string = ft.ExtHero.myHeroes.length + "/" + ft.ExtHero.allHeroes.length, this.addPartMenu(), this.partTopStatus = this.newPart("PartTopStatus"), this.partTopStatus.setTitle("武将"), this.node.addChild(this.partTopStatus.node), this.updateTvTip()
                },
                updateTvTip: function () {
                    var t = "【返回键】关闭界面，【菜单键】切换";
                    this.isShowAll ? t += "拥有武将" : t += "全部武将", ftc.setTvTip(this.node, t)
                },
                addPartMenu: function () {
                    var t = this.nodeRoot.convertToNodeSpaceAR(this.buttonSelect.node.convertToWorldSpaceAR(cc.v2(0, 0)));
                    this._partMenuCountry = this.newPart("PartMenu"), this._partMenuCountry.setData(ft.type.country.countryNames, this.onClickCountry.bind(this)), this._partMenuCountry.nodeLayout.position = cc.v2(t.x, t.y + 26), this.node.addChild(this._partMenuCountry.node), this._partMenuCountry.node.active = !1
                },
                onClickCountry: function (t) {
                    if (-1 !== t) {
                        this.country = t;
                        var e = this.getListDatas(t);
                        e.length > 0 ? (this.labelSelect.string = ftc.language("国家:") + ft.type.country.countryNames[t], this.listView.setListView(e), this.tvZone = 1) : (ftc.showTip("无此国家的人物"), this.tvZone = 0), this._partMenuCountry.node.active = !1, ftc.ManagerTV.nextSelect(void 0, this.node, this.tvZone)
                    }
                    this.spriteArrow.node.scaleY = -1
                },
                getListDatas: function (t) {
                    for (var e = this.isShowAll ? ft.ExtHero.allHeroes : ft.ExtHero.myHeroes, i = [], a = 0; a < e.length; a++) t !== ft.type.country.all && ft.ExtHero.getCountry(e[a].id || e[a]) !== t || i.push(e[a]);
                    return i
                },
                setData: function (t) { },
                enter: function () { },
                updateData: function () {
                    this.partTopStatus.updateData(), ft.ExtHero.load(!0), this.listView.updateListViewItems(void 0, this.getListDatas(this.country))
                },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectHeroesItem: function (t, e) {
                            ftc.loadLayout("LayoutHero", function (e) {
                                e.setData({
                                    index: t.index,
                                    heroes: this.listView.getDatas()
                                }, !0)
                            }.bind(this))
                        },
                        c_toIndex: function (t, e) {
                            this.listView.toIndex(t)
                        }
                    }
                },
                onClick: function (t) {
                    t.target === this.buttonSelect.node ? (this._partMenuCountry.node.active = !this._partMenuCountry.node.active, this.spriteArrow.node.scaleY = -this.spriteArrow.node.scaleY) : t.target === this.buttonAll.node && (this.isShowAll = !this.isShowAll, this.labelAll.string = this.isShowAll ? ftc.language("全部") : ftc.language("拥有"), this.listView.setListView(this.isShowAll ? ft.ExtHero.allHeroes : ft.ExtHero.myHeroes))
                },
                onKeyMenu: function (t) {
                    t || (this.isShowAll = !this.isShowAll, this.listView.setListView(this.isShowAll ? ft.ExtHero.allHeroes : ft.ExtHero.myHeroes), ftc.ManagerTV.nextSelect(this.listView.getItem(0).buttonSelf), this.updateTvTip())
                }
            })
        