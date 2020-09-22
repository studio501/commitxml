
            
             cc.Class({
                extends: ftc.BaseView,
                properties: {
                    listView: ftc.ListView,
                    nodeItem: cc.Node,
                    labelTip: cc.Label,
                    labelTip2: cc.Label,
                    buttonSub: cc.Button,
                    buttonAdd: cc.Button,
                    buttonConfirm: cc.Button,
                    slider: cc.Slider,
                    progressBar: cc.ProgressBar,
                    buttonClose: cc.Button
                },
                init: function () {
                    this.addClick(this.buttonConfirm), this.addClick(this.buttonSub), this.addClick(this.buttonAdd), this.addClick(this.buttonClose, {
                        zone: 99
                    }), ftc.ManagerTV.setBackButton(this.buttonClose), this.slider.node.on("slide", function (t) {
                        this.itemNum = parseInt(this.slider.progress * this.data.item.num), this.itemNum <= 0 && (this.itemNum = 1), this.progressBar.progress = this.slider.progress, this.updateTip()
                    }, this)
                },
                load: function () {
                    this.item = this.newPart("PartItem"), this.nodeItem.addChild(this.item.node), this.selectedItemNum = void 0, ftc.setTvTip(this.node)
                },
                setData: function (t, e) {
                    this.data = t, this.callback = e, this.item.setData(this.data.item.id), this.itemNum = this.data.item.num, this.slider.progress = 1, this.progressBar.progress = 1;
                    for (var i = [], a = 0; a < this.data.ids.length; a++) i.push({
                        id: this.data.ids[a],
                        num: this.data.nums[a]
                    });
                    this.listView.setListView(i, 0), this.selectedItemIndex = 0, this.selectedItemNum = this.data.nums[0], this.itemName = ft.ExtItem.getName(this.data.ids[0]), this.updateTip(), i.length < 5 ? this.listView.node.x = 55.5 * -i.length + 7.5 : this.listView.node.x = -229
                },
                enter: function () {
                    this.updateData()
                },
                updateData: function () { },
                tick: function (t) { },
                cleanup: function () { },
                msg: function () {
                    this.msg = {
                        c_onSelectDialogTip5Item: function (t, e) {
                            this.listView.updateListViewItems(t.index), this.selectedItemIndex = t.index, this.selectedItemNum = t.data.num, this.itemName = ft.ExtItem.getName(t.data.id), this.updateTip()
                        }
                    }
                },
                updateTip: function () {
                    this.labelTip2.string = this.itemNum + "/" + this.data.item.num, this.labelTip.string = "共可获得{0}个{1}".replace(/\{(\d+)\}/g, function (t, e) {
                        return [this.itemNum * this.selectedItemNum, this.itemName][e]
                    }.bind(this))
                },
                onClick: function (t, e) {
                    if (t.target === this.buttonConfirm.node) this.callback && this.callback(this.selectedItemIndex, this.itemNum), this.cancel();
                    else if (t.target === this.buttonSub.node) {
                        if (this.itemNum > 1) {
                            this.itemNum -= 1;
                            var i = this.itemNum / this.data.item.num;
                            this.slider.progress = i, this.progressBar.progress = i, this.updateTip()
                        }
                    } else if (t.target === this.buttonAdd.node) {
                        if (this.itemNum < this.data.item.num) {
                            this.itemNum += 1;
                            i = this.itemNum / this.data.item.num;
                            this.slider.progress = i, this.progressBar.progress = i, this.updateTip()
                        }
                    } else t.target === this.buttonClose.node && (this.callback && this.callback(0), this.cancel())
                }
            })
        