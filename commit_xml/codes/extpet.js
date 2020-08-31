

ft.ExtPet = {}, ftc && (ft.ExtPet.getPet = function (t) {
    return ftc.ManagerData.get2Object("Pet")[t]
}, ft.ExtPet.getArtifact = function (t) {
    return ft.ExtPet.getPet(t)
}, ft.ExtPet.getName = function (t) {
    return ftd.Pet.get(t, "name")
}, ft.ExtPet.getInfo = function (t) {
    return ftd.Pet.get(t, "info")
}, ft.ExtPet.getIconSprite = function (t) {
    var e = ft.ExtPet.getIcon(t);
    return ftd.Pet.get(t, "type") == ft.type.pet.embattle ? ftc.ManagerRes.getSpriteFrame("icon_skill", "matrix_" + e) : ftc.ManagerRes.getSpriteFrame("icon_skill", "skill_" + e)
}, ft.ExtPet.isExist = function (t) {
    var e = ftc.ManagerData.get2("Pet");
    for (var i in e)
        if (e[i].id == t) return !0;
    return !1
}, ft.ExtPet.getIcon = function (t) {
    return ftd.Pet.get(t, "img")
}, ft.ExtPet.getQualitySprite = function (t) {
    return ftc.ManagerRes.getSpriteFrame("program", "_equip_quality1")
}), ft.ExtPet.getType = function (t) {
    return ftd.Pet.get(t, "type")
}, ft.ExtPet.getPosition = function (t) {
    return ftd.Pet.get(t, "a_position")
}, ft.ExtPet.getSP = function (t) {
    return ftd.Pet.get(t, "value6")
}, ft.ExtPet.getStrategySkill = function (t) {
    return ftd.Pet.get(t, "skill")
}, ft.ExtPet.getLevel = function (t) {
    return ftd.Pet.get(t, "level")
}, ft.ExtPet.getUpNeedMaterials = function (t) {
    var e = 0;
    switch (t) {
        case 0:
            e = 10;
            break;
        case 1:
            e = 50;
            break;
        case 2:
            e = 100;
            break;
        case 3:
            e = 250;
            break;
        case 4:
            e = 400;
            break;
        case 5:
            e = 550;
            break;
        case 6:
            e = 700;
            break;
        case 7:
            e = 850;
            break;
        case 8:
            e = 1e3
    }
    return {
        ids: [ft.value.item.petBook1, ft.value.item.petBook2],
        nums: [e, t]
    }
}, ft.ExtPet.getNextGold = function (t) {
    return t < ft.value.com.maxPetUp ? 1e4 + 2e4 * t : 0
}
