
            
             ft.ExtSkill = {}, ftc && (ft.ExtSkill.getIconSprite = function (t) {
                if (ftc) {
                    if ("number" == typeof t) var e = ftd.Skill.get(t, "img");
                    else e = ftd.Skill.get(t.id, "img");
                    return ftc.ManagerRes.getSpriteFrame("icon_skill", "skill_" + e)
                }
            }, ft.ExtSkill.getSkillTypeSprite = function (t) {
                var e = ft.ExtSkill.getSkillType(t);
                return ftc.ManagerRes.getSpriteFrame("program", e == ft.type.skill.zd ? "team_img_zhudong" : "team_img_beidong")
            }), ft.ExtSkill.getSkillType = function (t) {
                return "number" == typeof t ? ftd.Skill.get(t, "skilltype") : ftd.Skill.get(t.id, "skilltype")
            }, ft.ExtSkill.getInfo = function (t) {
                return "number" == typeof t ? ftd.Skill.get(t, "info") : ftd.Skill.get(t.id, "info")
            }, ft.ExtSkill.getName = function (t) {
                return "number" == typeof t ? ftd.Skill.get(t, "name") || "" : ftd.Skill.get(t.id, "name") || ""
            }, ft.ExtSkill.getEffects = function (t) {
                return ftd.Skill.get(t, "a_effect")
            }, ft.ExtSkill.getCD = function (t) {
                return ftd.Skill.get(t, "cd")
            }, ft.ExtSkill.getPreCD = function (t) {
                return ftd.Skill.get(t, "precd")
            }, ft.ExtSkill.getWishSkills = function () {
                var t = [],
                    e = ["12520", "12521", "12522", "12523"];
                for (var i in ftd.Skill.data) i > 12500 && i < 13e3 && -1 === e.indexOf(i) && t.push(i);
                return t
            }, ft.ExtSkill.getCurseSkills = function () {
                var t = [],
                    e = ["13521", "13522", "13523", "13524"];
                for (var i in ftd.Skill.data) i > 13500 && i < 14e3 && -1 === e.indexOf(i) && t.push(i);
                return t
            }, ft.ExtSkill.getUpgradeInfo = function (t) {
                return ftd.Skill.get(t, "upgradeinfo")
            }
        