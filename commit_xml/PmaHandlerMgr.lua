

local PmaHandlerMgr = {}

-- premulti alpha 基于这样的事实
-- (资源pma) + (blendFunc pma) = 显示ok
-- (资源nopma) + (blendFunc nopma) = 显示ok

-- (资源pma) + (blendFunc nopma) = 显示颜色变浅,偏暗
-- (资源no pma) + (blendFunc pma) = 显示颜色增强, 爆白

-- (资源pma+shader pma) + (blendFunc pma) = 显示颜色变浅

-- 这个表由 check_pma.py 脚本自动生成
-- *重要: 放入此两个表的资源, 指明image,texture 的premultialpha为false, 因此 draw 的时候使用的_blendFunc 为 ALPHA_NON_PREMULTIPLIED
local None_pma_res = {{resName="World_1.pvr",raceType="-1"},{resName="Common_310.pvr",raceType="-1"},{resName="Common_9.pvr",raceType="-1"},{resName="Imperial_0.pvr",raceType="0"},{resName="_alpha_sk_AgathaGoddess_face_out1.pvr.ccz",raceType="-1"},{resName="_alpha_sk_AgathaGoddess_face_out.pvr.ccz",raceType="-1"},{resName="_alpha_sk_AgathaGoddess_face_out_gongji.pvr.ccz",raceType="-1"},{resName="_alpha_sk_AgathaGoddess_face_out_gongji1.pvr.ccz",raceType="-1"},{resName="KnightActivity.pvr.ccz",raceType="-1"},{resName="Imperial_0.pvr.ccz",raceType="1"},{resName="mainCity3.pvr.ccz",raceType="-1"},{resName="mainCity4.pvr.ccz",raceType="-1"},{resName="_alpha_sk_flyship_face_out.pvr.ccz",raceType="-1"},{resName="_alpha_sk_flyship_face_out_gongji.pvr.ccz",raceType="-1"},{resName="XueHuaZhuanChang_face.pvr.ccz",raceType="-1"},{resName="KingdomChange4_face.pvr.ccz",raceType="-1"},{resName="KingdomChange5_face.pvr.ccz",raceType="-1"},{resName="KingdomChange3_face.pvr.ccz",raceType="-1"},{resName="KingdomChange2_face.pvr.ccz",raceType="-1"},{resName="KingdomChange_face.pvr.ccz",raceType="-1"},{resName="KingdomChange1_face.pvr.ccz",raceType="-1"},{resName="Chapter_Story_2.pvr.ccz",raceType="-1"},{resName="Chapter_Story_1.pvr.ccz",raceType="-1"},{resName="Imperial_23.pvr.ccz",raceType="3"},{resName="Imperial_0.pvr.ccz",raceType="3"},{resName="Imperial_21.pvr.ccz",raceType="3"},{resName="Imperial_25.pvr.ccz",raceType="3"},{resName="Imperial_24.pvr.ccz",raceType="3"},{resName="Imperial_26.pvr.ccz",raceType="3"},{resName="Imperial_27.pvr.ccz",raceType="3"},{resName="Imperial_29.pvr.ccz",raceType="3"},{resName="Imperial_23.pvr.ccz",raceType="4"},{resName="Imperial_21.pvr.ccz",raceType="4"},{resName="Imperial_25.pvr.ccz",raceType="4"},{resName="Imperial_24.pvr.ccz",raceType="4"},{resName="Imperial_26.pvr.ccz",raceType="4"},{resName="Imperial_29.pvr.ccz",raceType="4"},{resName="Imperial_0.pvr.ccz",raceType="2"},{resName="Imperial_21.pvr.ccz",raceType="2"},{resName="Imperial_25.pvr.ccz",raceType="2"},{resName="Imperial_24.pvr.ccz",raceType="2"},{resName="Imperial_26.pvr.ccz",raceType="2"},{resName="Imperial_27.pvr.ccz",raceType="2"},{resName="Imperial_29.pvr.ccz",raceType="2"},{resName="craft_miniMap2.pvr.ccz",raceType="-1"},{resName="craft_miniMap1.pvr.ccz",raceType="-1"},{resName="WorldCraft_room.pvr.ccz",raceType="-1"},{resName="WorldCraft_face.pvr.ccz",raceType="-1"},{resName="world_craft_map_4.pvr.ccz",raceType="-1"},{resName="WorldCraft_building.pvr.ccz",raceType="-1"},{resName="WorldCraft_rule.pvr.ccz",raceType="-1"},{resName="world_craft_map_1.pvr.ccz",raceType="-1"},{resName="bank_new.pvr.ccz",raceType="-1"},{resName="AllianceDuel_1_face.pvr.ccz",raceType="-1"},{resName="AllianceDuel_face.pvr.ccz",raceType="-1"},{resName="GoldEggHammer.pvr.ccz",raceType="-1"},{resName="GoldEgg.pvr.ccz",raceType="-1"},{resName="GoldEggHammer.pvr.ccz",raceType="-1"},{resName="_alpha_sk_halo_iceworld_face_front.pvr.ccz",raceType="-1"},{resName="tactical_face.pvr.ccz",raceType="-1"},{resName="COSAct_face.pvr.ccz",raceType="-1"}}

local None_pma_res_ext = {
{resName="_alpha_Imperial_0.pkm",raceType="0"},

{resName="_alpha_scrollbk1_1.pkm",raceType="1"},
{resName="_alpha_Imperial_0.pkm",raceType="1"},

{resName="_alpha_Imperial_29.pkm",raceType="2"},
{resName="_alpha_Imperial_24.pkm",raceType="2"},
{resName="_alpha_Imperial_25.pkm",raceType="2"},
{resName="_alpha_Imperial_27.pkm",raceType="2"},
{resName="_alpha_Imperial_26.pkm",raceType="2"},
{resName="_alpha_Imperial_0.pkm",raceType="2"},
{resName="_alpha_Imperial_21.pkm",raceType="2"},

{resName="_alpha_Imperial_29.pkm",raceType="3"},
{resName="_alpha_Imperial_24.pkm",raceType="3"},
{resName="_alpha_Imperial_25.pkm",raceType="3"},
{resName="_alpha_scrollbk1_3.pkm",raceType="3"},
{resName="_alpha_Imperial_27.pkm",raceType="3"},
{resName="_alpha_Imperial_26.pkm",raceType="3"},
{resName="_alpha_Imperial_0.pkm",raceType="3"},
{resName="_alpha_Imperial_23.pkm",raceType="3"},
{resName="_alpha_Imperial_21.pkm",raceType="3"},
{resName="_alpha_Imperial_28.pkm",raceType="3"},
{resName="_alpha_mainCity3.pkm",raceType="3"},

{resName="_alpha_mainCity4.pkm",raceType="4"},
{resName="_alpha_Imperial_29.pkm",raceType="4"},
{resName="_alpha_Imperial_24.pkm",raceType="4"},
{resName="_alpha_Imperial_25.pkm",raceType="4"},
{resName="_alpha_Imperial_26.pkm",raceType="4"},
{resName="_alpha_Imperial_23.pkm",raceType="4"},
{resName="_alpha_Imperial_21.pkm",raceType="4"},


}

for _, v in ipairs(None_pma_res_ext) do
    table.insert(None_pma_res,v)
end

local None_pma_res_norace = {{resName="_alpha_World_4.pkm"},{resName="_alpha_World_2.pkm"},{resName="_alpha_World_1.pkm"},{resName="_alpha_WorldCraft_room.pkm"},{resName="_alpha_WorldCraft_building.pkm"},{resName="_alpha_WorldCraft_rule.pkm"},{resName="_alpha_world_craft_map_1.pkm"},{resName="_alpha_world_craft_map_4.pkm"},{resName="_alpha_craft_miniMap2.pkm"},{resName="_alpha_craft_miniMap1.pkm"},{resName="_alpha_WorldCraft_face.pkm"},{resName="_alpha_Common_3.pkm"},{resName="_alpha_Common_502.pkm"},{resName="_alpha_tactical_face.pkm"},{resName="_alpha_KnightActivity.pkm"}}

-- *重要: 此情况是基于 blendFunc为 ALPHA_PREMULTIPLIED下, 资源若处理pma, 则shader使用nonpma , 资源使用pma则shader使用nonpma
-- *重要: 这样就保证最终只进行一次pma处理
local DoHad_pma_res_android = {{resName="_alpha_Particle.pkm"}}
local DoNo_pma_res_android = {{resName="_alpha_sk_LiBao_king_z3_icon.pkm"},{resName="_alpha_sk_halo_iceworld_face_front.pkm"},{resName="_alpha_sk_AgathaGoddess_face_out_gongji1.pkm"},{resName="_alpha_sk_AgathaGoddess_face_out_gongji.pkm"},{resName="_alpha_sk_AgathaGoddess_face_out1.pkm"},{resName="_alpha_sk_AgathaGoddess_face_out.pkm"}}
local OldLibaoMd5Arrary = {
    16400, -- 老礼包烟花
    32784 -- 老礼包加速
}

local TooBrightArray = {
    "_alpha_sk_face_dermiterFarmer"
}

local function trimLibaoName(libao_name)
    local res,f = string.gsub(libao_name,"^_alpha_sk_LiBao_(.*)_default_a_icon.pkm$","%1")
    return res,f
end
-- none pma return 1 将会指明使用哪个blendFunc
function PmaHandlerMgr.check_pma_forblendfunc(resName)
    if not resName then
        return
    end

    local raceType = CCCommonUtilsForLua:call("RACETYPE")
    local raceTypeStr = tostring(raceType)
    local res = table.find(None_pma_res,function ( cur )
        return string.find(resName, cur.resName) and (cur.raceType == "-1" or cur.raceType == raceTypeStr)
    end )
    if res then
        return 1
    end

    res = table.find(None_pma_res_norace,function ( cur )
        return string.find(resName, cur.resName)
    end)
    if res then
        return 1
    end

    return 0
end

-- has pma return 1 no pma return 2
-- not specify yet return 0
-- 将会指明使用哪个shader
function PmaHandlerMgr.check_pma_forshaderusage( resName )
    if not resName then
        return
    end

    local res = table.find(DoHad_pma_res_android,function ( cur )
        return string.find(resName, cur.resName)
    end )
    if res then
        cclog("check_androidres_pma return 1")
        return 1
    end

    -- 老礼包默认烟花动画没使用alpha 预乘
    if string.find(resName,"_alpha_sk_LiBao_") then
        local fileUtils = cc.FileUtils:getInstance()
        local file_path = string.format("%s%s%s",fileUtils:getWritablePath(),"lua/skeleton/android/",resName)
        local file_md5 = fileUtils:isFileExist(file_path) and fileUtils:getFileSize(file_path)
        if file_md5 and table.contains(OldLibaoMd5Arrary, file_md5) then
            return 2
        end
    end

    res = table.find(DoNo_pma_res_android,function ( cur )
        return string.find(resName, cur.resName)
    end )

    if res then
        return 2
    end

    -- for _, v in ipairs(TooBrightArray) do
    --     if string.find(resName, v) then
    --         return 2
    --     end
    -- end

    return 0
end

return PmaHandlerMgr