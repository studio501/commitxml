
            
             ft.ExtEvent = {}, ft.ExtEvent.getNpc = function (t, e) {
                return e && e.eventNpc ? e.eventNpc : ftd.Event.get(t, "npc")
            }
        