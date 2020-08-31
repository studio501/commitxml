
            
             ft.ExtStory = {}, ftc && (ft.ExtStory.getTexts = function (t) {
                return ft.ExtStory.mapChangedStory && ft.ExtStory.mapChangedStory[t] ? ft.ExtStory.mapChangedStory[t] : ftd.Story.get(t, "a_text", !0)
            })
        