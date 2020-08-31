
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    listView: ftc.ListView,
                    spineHero: sp.Skeleton,
                    buttonUse: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonUse)
                },
                load: function () {
                    this.partTitle = this.newPart("PartTitle"), this.partTitle.node.position = cc.v2(0, 136), this.spineHero.node.addChild(this.partTitle.node), this.partTitle.updateData();
                    var t = ftc.ManagerData.get1("ManagerMap").skin0;
                    t > 0 && this.loadResource("spine/npc/npc_" + ft.ExtHero.getImg(t), sp.SkeletonData, function (t) {
                        t && (this.spineHero.skeletonData = t, this.spineHero.setAnimation(0, "wait2", !0))
                    }.bind(this), this), this.selectedDecoration = void 0, this.selectedIndex = -1;
                    for (var e = ft.ExtTitle.getCurTitle(), i = [], a = ftc.ManagerData.get2Array("Decoration"), n = 0; n < a.length; n++) ft.ExtDecoration.getType(a[n].id) == ft.type.decoration.decoration && i.push(a[n]);
                    i.length && (this.selectedIndex = 0, this.listView.setListView(i, {
                        title: e,
                        index: this.selectedIndex
                    }), this.setData())
                },
                setData: function (t) {
                    var e = this.listView.getDatas()[this.selectedIndex];
                    this.selectedDecoration = e, this.partTitle.updateData(e.id)
                },
                cleanup: function () { },
                updateData: function (t) {
                    var e = ft.ExtTitle.getCurTitle();
                    void 0 === t ? this.selectedIndex >= 0 && (this.listView.updateListViewItems({
                        title: e,
                        index: this.selectedIndex
                    }), this.setData()) : (this.selectedIndex = t.index, this.listView.updateListViewItems({
                        title: e,
                        index: t.index
                    }), this.setData())
                },
                tick: function (t) { },
                onClick: function (t, e) {
                    t.target === this.buttonUse.node && this.selectedDecoration && ftc.send("decorationSet", this.selectedDecoration.id)
                }
            })
        