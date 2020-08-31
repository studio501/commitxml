
            
             cc.Class({
                extends: ftc.BasePart,
                properties: {
                    nodeNormal: cc.Node,
                    buttonMax: cc.Button,
                    buttonOk: cc.Button,
                    editBoxInput: cc.EditBox,
                    buttonClsList: cc.Button,
                    buttonClsEdit: cc.Button,
                    buttonSearch: cc.Button,
                    spriteBg: cc.Sprite,
                    listView: ftc.ListView,
                    nodeDetail: cc.Node,
                    labelDetail: cc.Label,
                    labelMaxMin: cc.RichText
                },
                init: function () {
                    this.addClick(this.buttonMax), this.addClick(this.buttonOk), this.addClick(this.buttonClsEdit), this.addClick(this.buttonClsList), this.addClick(this.buttonSearch), this.msg(), this.listView._isAddToNode = !0, ft.bindMsg(this)
                },
                load: function () {
                    this.node.active = !1;
                    var t = cc.sys.localStorage.getItem("test_code" + ft.getAppId());
                    this.editBoxInput.string = t || "", this.listView.setListView([])
                },
                setData: function () {
                    this.node.active || this.showMin()
                },
                updateData: function () { },
                tick: function (t) {
                    for (var e = ftc._getLog(), i = e.length, a = i && this.listView.isBottom(), n = 0; n < i; n++) {
                        void 0 == e[n].num && (e[n].num = 1);
                        var s = this.listView.getDatas(),
                            o = s.length;
                        if (o > 0) {
                            var r = s[o - 1];
                            if (r.s == e[n].s) {
                                r.t = e[n].t, r.num += e[n].num, this.listView.updateListViewItem(o - 1);
                                continue
                            }
                        }
                        this.listView.addListViewItem(e[n])
                    }
                    a && this.listView.toBottom()
                },
                cleanup: function () { },
                showDetail: function (t, e) {
                    t ? (this.nodeDetail.active = !0, this.labelDetail.string = t.substr(0, 5e3), this.labelDetail.node.color = e) : (this.nodeDetail.active = !1, this.labelDetail.string = "")
                },
                showNormal: function () {
                    this.node.active = !0, this.nodeNormal.active = !0, this.spriteBg.node.active = !0, this.listView.node.active = !0, this.listDataBuffer && (this.listView.setListView(this.listDataBuffer), this.listDataBuffer = null), this.labelMaxMin.string = "<u>Min</u>"
                },
                showMin: function () {
                    this.node.active = !0, this.nodeNormal.active = !1, this.showDetail(), this.spriteBg.node.active = !1, this.listView.node.active = !1, this.labelMaxMin.string = "<u>Max</u>"
                },
                fillEditor: function (t) {
                    this.editBoxInput.string = t
                },
                onClick: function (t) {
                    if (t.target === this.buttonMax.node) {
                        if (this.nodeDetail.active) return void this.showDetail();
                        this.nodeNormal.active ? this.showMin() : this.showNormal()
                    } else if (t.target === this.buttonClsList.node) this.listView.setListView([]);
                    else if (t.target === this.buttonClsEdit.node) this.editBoxInput.string = "", cc.sys.localStorage.setItem("test_code" + ft.getAppId(), "");
                    else if (t.target === this.buttonOk.node) {
                        var e = this.editBoxInput.string;
                        cc.sys.localStorage.setItem("test_code" + ft.getAppId(), e), e = ft.replaceAll(e, ";\r\n", ";"), e = ft.replaceAll(e, "\r\n", ";"), e = ft.replaceAll(e, ";\n", ";"), e = ft.replaceAll(e, "\n", ";"), e = ft.replaceAll(e, "\uff0c", ","), e = ft.replaceAll(e, "\uff1a", ":"), e = ft.replaceAll(e, "\u3000", " "), ftc.send("code", {
                            code: e,
                            debug: 1
                        })
                    } else if (t.target === this.buttonSearch.node)
                        if (this.editBoxInput.string.length > 0) {
                            null == this.listDataBuffer && (this.listDataBuffer = this.listView.getDatas());
                            for (var i = [], a = 0; a < this.listDataBuffer.length; a++) this.listDataBuffer[a].s.indexOf(this.editBoxInput.string) >= 0 && i.push(this.listDataBuffer[a]);
                            this.listView.setListView(i)
                        } else this.listDataBuffer && (this.listView.setListView(this.listDataBuffer), this.listDataBuffer = null)
                },
                msg: function () {
                    this.msg = {
                        c_output: function (t, e) {
                            var i = "{\r\n";
                            for (var a in ftc.ManagerData._data1) i += '\t["' + a + '"]=' + JSON.stringify(ftc.ManagerData._data1[a]) + ",\r\n";
                            for (var a in i += "}", jsb.fileUtils.writeStringToFile(i, "c1.json"), ftc.log("\u5199\u51fa\u6587\u4ef6" + jsb.fileUtils.getWritablePath() + "c1.json"), i = "{\r\n", ftc.ManagerData._data2) {
                                i += '\t["' + a + '"]={\r\n';
                                var n = "";
                                for (var s in ftc.ManagerData._data2[a]) n += '\t\t["' + s + '"]=' + JSON.stringify(ftc.ManagerData._data2[a][s]) + ",\r\n";
                                i += n, i += "\t}\r\n"
                            }
                            i += "}", jsb.fileUtils.writeStringToFile(i, "c2.json"), ftc.log("\u5199\u51fa\u6587\u4ef6" + jsb.fileUtils.getWritablePath() + "c2.json")
                        },
                        exportDB: function (t, e) {
                            ftc.isWindows() && !cc.sys.isBrowser ? (ftc.log("\u5199\u51fa\u6587\u4ef6" + jsb.fileUtils.getWritablePath() + "f_out.txt"), this.msg.outf(t)) : this.editBoxInput.string = t
                        },
                        inf: function (t, e) {
                            var i = jsb.fileUtils.getStringFromFile("f_in.txt");
                            i = ft.replaceAll(i, ";\r\n", ";"), i = ft.replaceAll(i, ";\n", ";"), i = ft.replaceAll(i, "\r\n", ";"), i = ft.replaceAll(i, "\n", ";"), ftc.send("code", {
                                code: i,
                                debug: 1
                            })
                        },
                        outf: function (t, e) {
                            var i = jsb.fileUtils.getStringFromFile("f_out.txt");
                            "" != i && (i += "\r\n"), jsb.fileUtils.writeStringToFile(i + t, "f_out.txt")
                        },
                        injs: function (t, e) {
                            var i = jsb.fileUtils.getStringFromFile("f_in.js");
                            for (i = ft.replaceAll(i, "'", "`"), i = ft.replaceAll(i, '"', "\u201c"), i = ft.replaceAll(i, "\t", ""); ;) {
                                if (!((o = i.indexOf("/*")) >= 0)) break;
                                var a = i.indexOf("*/", o);
                                i = i.substr(0, o) + i.substr(a + 2)
                            }
                            ft.replaceAll(i, "\r\n", "\n");
                            for (var n = i.split("\n"), s = 0; s < n.length; s++) {
                                var o;
                                if (n[s] = n[s].trim(), n[s]) (o = n[s].indexOf("//")) > 0 && ":" != n[s].charAt(o - 1) ? n[s] = n[s].substr(0, o) : 0 == o && (n[s] = "")
                            }
                            if (n.length > 0) {
                                i = n[0];
                                for (s = 1; s < n.length; s++)
                                    if (n[s]) {
                                        var r = n[s].charAt(n[s].length - 1);
                                        if ("," == r || "{" == r || "}" == r || "(" == r || ")" == r || "[" == r || "]" == r) i += n[s];
                                        else if (s < n.length - 1) {
                                            var c = n[s + 1].charAt(0);
                                            i += ")" == c || "}" == c || "]" == c ? n[s] : n[s] + ";"
                                        } else i += n[s] + ";"
                                    } i = ft.replaceAll(i, ";;", "~");
                                var h = "exejs:'" + (i = ft.replaceAll(i, ";", "~")) + "'";
                                if (ftc.send("code", {
                                    code: h,
                                    debug: 1
                                }), t.js) jsb.fileUtils.writeStringToFile(h, "f_out.js");
                                else if (t.png && (h = fts._createImageData(h))) {
                                    var f = jsb.fileUtils.getDataFromFile(t.png),
                                        d = 8;
                                    105 == f[12] && 72 == f[13] && 68 == f[14] && 82 == f[15] && (d += (f[8] << 24) + (f[9] << 16) + (f[10] << 8) + f[11] + 12);
                                    for (n = [], s = 0; s < 8; s++) n.push(f[s]);
                                    var l = h.length;
                                    n.push((4278190080 & l) >> 24), n.push((16711680 & l) >> 16), n.push((65280 & l) >> 8), n.push(255 & l), n.push(105), n.push(72), n.push(68), n.push(82);
                                    for (s = 0; s < l; s++) n.push(h[s]);
                                    n.push(0), n.push(0), n.push(0), n.push(0);
                                    for (s = d; s < f.length; s++) n.push(f[s]);
                                    jsb.fileUtils.writeDataToFile(new Uint8Array(n), t.png)
                                }
                            }
                        },
                        injsb: function (t, e) {
                            var i = jsb.fileUtils.getStringFromFile("f_in.jsb");
                            i = ft.replaceAll(i, '"', "`"), i = "{`data`:" + (i = ft.replaceAll(i, ";", "~")) + ",`d1`:{},`d2`:{}}", ftc.send("code", {
                                code: "importDB:'" + i + "'"
                            })
                        },
                        ram: function (t, e) {
                            t ? (ftc.ManagerRes.countNodeTotalDestroy = 0, ftc.ManagerRes.countNodeTotalNew = 0, ftc.ManagerRes.countNodeTotalRestored = 0, ftc.ManagerRes.countNodeTotalDestroyPartItem = 0, ftc.ManagerRes.countNodeTotalNewPartItem = 0, ftc.ManagerRes.countNodeTotalRestoredPartItem = 0, ftc.log("\u7edf\u8ba1\u5df2\u6e05\u96f6")) : (ftc.log("***\u5185\u5b58\u8d44\u6e90\u7edf\u8ba1***"), ftc.log("                \u5f53\u524d\u603b\u521b\u5efa\u8282\u70b9(Layout/Part):" + ftc.ManagerRes.countNodeTotalNew), ftc.log("                \u5f53\u524d\u603b\u5220\u9664\u8282\u70b9(Layout/Part):" + ftc.ManagerRes.countNodeTotalDestroy), ftc.log("                \u5f53\u524d\u603b\u56de\u6536\u8282\u70b9(Layout/Part):" + ftc.ManagerRes.countNodeTotalRestored), ftc.log("                \u5f53\u524d\u4f7f\u7528\u4e2d\u8282\u70b9(Layout/Part):" + (ftc.ManagerRes.countNodeTotalNew - ftc.ManagerRes.countNodeTotalRestored - ftc.ManagerRes.countNodeTotalDestroy)), ftc.log("                \u5f53\u524d\u603b\u521b\u5efa\u8282\u70b9(PartItem):" + ftc.ManagerRes.countNodeTotalNewPartItem), ftc.log("                \u5f53\u524d\u603b\u5220\u9664\u8282\u70b9(PartItem):" + ftc.ManagerRes.countNodeTotalDestroyPartItem), ftc.log("                \u5f53\u524d\u603b\u56de\u6536\u8282\u70b9(PartItem):" + ftc.ManagerRes.countNodeTotalRestoredPartItem), ftc.log("                \u5f53\u524d\u4f7f\u7528\u4e2d\u8282\u70b9(PartItem):" + (ftc.ManagerRes.countNodeTotalNewPartItem - ftc.ManagerRes.countNodeTotalRestoredPartItem - ftc.ManagerRes.countNodeTotalDestroyPartItem)))
                        }
                    }
                }
            })
        