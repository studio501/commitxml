
            
             ft.ExtNpc = {}, ft.ExtNpc.load = function () {
                if (!ft.ExtNpc.mapNpcIds) {
                    for (var t in ft.ExtNpc.mapNpcIds = {}, ftd.Mapnpc.data) {
                        var e = ftd.Mapnpc.get(t, "Map");
                        ft.ExtNpc.mapNpcIds[e] || (ft.ExtNpc.mapNpcIds[e] = []), ft.ExtNpc.mapNpcIds[e].push({
                            npc: ftd.Mapnpc.get(t, "Npc"),
                            x: ftd.Mapnpc.get(t, "X"),
                            y: ftd.Mapnpc.get(t, "Y"),
                            width: ftd.Mapnpc.get(t, "Width"),
                            height: ftd.Mapnpc.get(t, "Height"),
                            face: ftd.Mapnpc.get(t, "Face")
                        })
                    }
                    for (var t in ft.ExtNpc.npc2Map = {}, ftd.Mapnpc.data) {
                        e = ftd.Mapnpc.get(t, "Map");
                        var i = ftd.Mapnpc.get(t, "Npc");
                        ft.ExtNpc.npc2Map[i] || (ft.ExtNpc.npc2Map[i] = {}), ft.ExtNpc.npc2Map[i][e] = !0
                    }
                    for (var t in ft.ExtNpc.map2Map = {}, ftd.Map.data) {
                        ft.ExtNpc.map2Map[t] || (ft.ExtNpc.map2Map[t] = {});
                        var a = ftd.Map.get(t, "a_mitmap"),
                            n = ftd.Map.get(t, "a_mitnpc1");
                        if (a)
                            for (var s = 0; s < a.length; s++) ft.ExtNpc.map2Map[t][a[s]] || (ft.ExtNpc.map2Map[t][a[s]] = []), ft.ExtNpc.map2Map[t][a[s]].push(n[s])
                    }
                }
            }, ftc && (ft.ExtNpc.getIconSprite = function (t) {
                return ftc.ManagerRes.getSpriteFrame("icon_header", "header" + t)
            }, ft.ExtNpc.getName = function (t) {
                return ftd.Npc.get(t, "name")
            }, ft.ExtNpc.getAwards = function (t) {
                return ftd.Npc.get(t, "a_award")
            }, ft.ExtNpc.getNpc = function (t) {
                return ftc.ManagerData.get2Object("Npc")[t]
            }, ft.ExtNpc.getNameVisible = function (t) {
                return ftd.Npc.get(t, "namevis")
            }, ft.ExtNpc.getWork = function (t) {
                return ftd.Npc.get(t, "c_work")
            }, ft.ExtNpc.getStatus = function (t) {
                return ftd.Npc.get(t, "status")
            }, ft.ExtNpc.getImageSprite = function (t) {
                var e = ftd.Npc.get(t, "img");
                return ftc.ManagerRes.getSpriteFrame("icon_hero2", "image_" + e) || ftc.ManagerRes.getSpriteFrame("icon_hero2", "image_0")
            }), ft.ExtNpc.getMapNpcIds = function (t) {
                return this.mapNpcIds[t]
            }, ft.ExtNpc.isUIShow = function (t) {
                return void 0 === t.opacity || 255 == t.opacity
            }, ft.ExtNpc.isCanWork = function (t) {
                if (t) {
                    var e = ftd.Npc.get(t.id, "count");
                    return t.count >= 0 && (0 == e || t.count > 0)
                }
                return !0
            }, ft.ExtNpc.isCanShow = function (t, e, i) {
                e ? (e.taskId && (i = i > 0 ? 0 : 1), 1 == i && 0 == e.count && ftd.Npc.get(t, "count") > 0 && i < 2 && (i = 0)) : 2 == i && (i = 1);
                return i
            }, ft.ExtNpc.checkIsDelivery = function (t, e) {
                var i = ftd.Map.get(e, "a_mitnpc1");
                if (i)
                    for (var a = 0; a < i.length; a++)
                        if (t == i[a]) return a;
                return -1
            }
        