
            
             ft.ExtHeroGroup = {}, ftc, ft.ExtHeroGroup.getProfessions = function (t) {
                return ftd.Herogroup.get(t, "a_profession")
            }, ft.ExtHeroGroup.getPet = function (t) {
                return ftd.Herogroup.get(t, "pet")
            }, ft.ExtHeroGroup.getDifficultyLevel = function (t) {
                return ftd.Herogroup.get(t, "difficultylevel")
            }, ft.ExtHeroGroup.getRandomType = function (t) {
                return ftd.Herogroup.get(t, "randomtype")
            }
        