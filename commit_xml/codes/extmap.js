
            
             ft.ExtMap = {}, ftc && (ft.ExtMap.getGuide = function (t) {
                return ftd.Task.get(t, "guide")
            }), ft.ExtMap.getName = function (t) {
                return ftd.Map.get(t, "name")
            }, ft.ExtMap.getType = function (t) {
                return ftd.Map.get(t, "type")
            }, ft.ExtMap.getGroupNpc = function (t) {
                return ftd.Map.get(t, "groupnpc")
            }
        