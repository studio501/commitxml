# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess
import myutils

# State_New = ['TaskConf', 'ModuleConf', 'FormationConf', 'LordOrderConf', 'LordLvConf', 'HeroConf', 'AvatarConf', 'SkillSchemeConf', 'EquipmentConf', 'VipConf', 'StoreConf', 'AchievementConf', 'AchievementTaskList', 'SevenDayConf', 'ItemConf', 'BoxStageConf', 'ActFestivalConf', 'ChapterConf', 'LevelConf', 'LanguageConf', 'GuideConf', 'BookConf', 'BookStageConf', 'CoinGetConf', 'DayLimitConf', 'WeekLimitConf', 'DailyTaskConf', 'TowerReward', 'TowerConf', 'DialogConf', 'MapConf', 'ActivityConf', 'MonsterConf', 'LevelCoeffConf', 'SkillConf', 'SkeletonConf', 'BulletConf', 'EffectConf', 'HeroStarSpend', 'HeroOrder', 'HeroLvSpend', 'EquipmentLvConf', 'BuffConf', 'OtherItemConf', 'ChargePackConf','ConstantConf','BattleConst']


State_New = ['TaskConf', 'ModuleConf', 'FormationConf', 'LordOrderConf', 'LordLvConf', 'HeroConf', 'AvatarConf', 'SkillSchemeConf', 'EquipmentConf', 'VipConf', 'StoreConf', 'AchievementConf', 'AchievementTaskList', 'SevenDayConf', 'ItemConf', 'BoxStageConf', 'ActFestivalConf', 'ChapterConf', 'LevelConf', 'LanguageConf', 'BookConf', 'BookStageConf', 'CoinGetConf', 'DayLimitConf', 'WeekLimitConf', 'DailyTaskConf', 'TowerReward', 'TowerConf', 'MapConf', 'ActivityConf', 'MonsterConf', 'LevelCoeffConf', 'SkillConf', 'SkeletonConf', 'ConstantConf','BattleConst']


def k_in_list(k, list1):
    k = k.lower()
    for x in list1:
        if x.lower() == k:
            return True
    return False

def split_json(json_path, before_list):
    json_data = myutils.get_jsonfrom_file(json_path)
    json_dir = os.path.dirname(json_path)
    file_name = myutils.file_without_extension(json_path)

    first_part = {}
    left_part = {}
    for k in json_data:
        if k_in_list(k, before_list):
            first_part[k] = json_data[k]
        else:
            left_part[k] = json_data[k]
    
    myutils.write_dict_tofile(os.path.join(json_dir, file_name +'_ap.json'), first_part)
    myutils.write_dict_tofile(os.path.join(json_dir, file_name +'_al.json'), left_part)

    # for k in json_data:
    #     tj = json_data[k]
    #     res = {k:tj}
    #     myutils.write_dict_tofile(os.path.join(json_dir, k + '.json'), res)

def main():
    pwd = os.path.dirname(os.path.realpath(__file__))
    json_path = os.path.join(pwd, '../../assets/res/config/config.json')
    split_json(json_path, State_New)
    pass

if __name__ == "__main__":
    main()