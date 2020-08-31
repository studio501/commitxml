
            
             ft.ExtTask = {}, ftc && (ft.ExtTask.getGuide = function (t) {
                return ftd.Task.get(t, "guide")
            }, ft.ExtTask.getZYTaskMain = function () {
                return ft.ExtTask.getZYTask(0)
            }, ft.ExtTask.getZYTaskBranch = function () {
                return ft.ExtTask.getZYTask(1)
            }, ft.ExtTask.getZYTask = function (t) {
                var e = ftc.ManagerData.get2("Task"),
                    i = [];
                for (var a in e) {
                    var n = e[a];
                    ft.ExtTask.getMapType(n.id) === ft.type.map.zy && ft.ExtTask.getType(n.id) === ft.type.task.branch && (0 == t && n.id >= 3e3 && n.id <= 4e3 ? i.push(n) : 1 == t && (n.id > 4e3 || n.id < 3e3) && i.push(n))
                }
                return i
            }, ft.ExtTask.getTasksByMapType = function (t) {
                var e = ftc.ManagerData.get2("Task"),
                    i = [];
                for (var a in e) {
                    var n = ft.ExtTask.getType(e[a].id);
                    n !== ft.type.task.main && n !== ft.type.task.branch && n !== ft.type.task.accept || ft.ExtTask.getMapType(e[a].id) !== t || i.push(e[a])
                }
                return i
            }, ft.ExtTask.geIconType = function (t) {
                return ftd.Task.get(t, "icontype")
            }, ft.ExtTask.geIconSpriteFrame = function (t) {
                return ftc.ManagerRes.getSpriteFrame("program", "task_icon_" + ft.ExtTask.geIconType(t))
            }, ft.ExtTask.checkGuide = function (t, e) {
                var i = ftd.Task.get(t, "guide");
                return !!i && i.split("|").indexOf(e) >= 0
            }, ft.ExtTask.getProgress = function (t) {
                var e = ftc.ManagerData.get2Object("Task", t);
                if (e) {
                    var i = ftd.Event.get(e.eventId, "c_condition");
                    if (i) {
                        var a = i.split(";")[0];
                        if (a && a.startsWith("[")) {
                            for (var n = JSON.parse(a), s = ft.toArray(n[0]), o = ft.toArray(n[1]), r = "\u9700\u8981", c = 0; c < s.length; c++) r += ft.ExtItem.getName(s[c]) + "(" + ft.ExtItem.getNum(s[c]) + "/" + o[c] + ") ";
                            return r
                        }
                    }
                    var h = ft.ExtEvent.getNpc(e.eventId, e);
                    if (h) {
                        var f, d = "\u524d\u5f80",
                            l = ft.ExtNpc.npc2Map[h];
                        for (var c in l) {
                            for (var u = ft.ExtNpc.mapNpcIds[c], p = 0; p < u.length; p++)
                                if (u[p].npc === h) {
                                    f = {
                                        x: u[p].x,
                                        y: u[p].y
                                    };
                                    break
                                } break
                        }
                        return d += f ? ftd.Map.get(c, "name") + "(" + f.x + "," + f.y + ")" : ftd.Map.get(c, "name") + " " + ftd.Npc.get(h, "name")
                    }
                }
            }), ft.ExtTask.getName = function (t) {
                return ftd.Task.get(t, "name")
            }, ft.ExtTask.getInfo = function (t) {
                return ftd.Task.get(t, "info")
            }, ft.ExtTask.getType = function (t) {
                return ftd.Task.get(t, "type")
            }, ft.ExtTask.getMapType = function (t) {
                return ftd.Task.get(t, "maptype")
            }, ft.ExtTask.geIconType = function (t) {
                return ftd.Task.get(t, "icontype")
            }, ft.ExtTask.getAwards = function (t) {
                return ftd.Task.get(t, "a_award")
            }, ft.ExtTask.getTasks = function (t) {
                return ftd.Task.get(t, "a_task")
            }, ft.ExtTask.getExp = function (t) {
                return ftd.Task.get(t, "exp")
            }, ft.ExtTask.findAvailable = function (t) {
                var e = [],
                    i = ft.ExtTask.getType(t);
                for (var a in ftd.Task.data)
                    if (0 != t || ft.ExtTask.getType(a) == i) {
                        var n = ft.ExtTask.getTasks(a),
                            s = !1;
                        if (n)
                            for (var o = 0; o < n.length; o++)
                                if (n[o] == t) {
                                    s = !0;
                                    break
                                } s && e.push(a)
                    } return e
            }, ft.ExtTask.calcTaskExp = function (t, e, i) {
                var a = ftd.Task.get(t, "exp");
                return a > 0 && (a = 50 * a * i / 100, i > 50 && (a *= Math.pow(1.09, i - 50)), a = parseInt(a)), a
            }
        