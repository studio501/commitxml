# 只需要建立 57117_ad1_new.png和activity_57117_list_cell_head_new.pn的俩张图
# 
thisPath=`dirname $0`  ##拖入shell到命令行 输入活动id号
echo "goto $thisPath"
cd $thisPath
dir=$1/
echo $dir
if [ -n "$dir" ]; then #判断变量是否有值
	fileType=${dir%%/}
	echo "The file type is $fileType"
	desDir="_activity_pack"
	if [[ -d $desDir ]]; then
		echo "remove $desDir"
		rm -rf $desDir
	fi
	mkdir $desDir

	cd $dir

	#生成校验文件
	echo "write file===========>${fileType}.cfgp"
	str="files=actMainPlus.lua, ${fileType}/resources/activity_${fileType}_new.plist"
	echo "write contant:\n***************************\n${str}\n***************************"
	echo $str >>  ../${desDir}/${fileType}.cfgp

	cd ..
	python encrypt/xxtea-cocos.py ${desDir} 0
	mv "encrypt_output/${fileType}.cfgp" "${desDir}/${fileType}.cfgp"
	# exit 1
	cd $dir

	activity_name_new="activity_${fileType}_new"
	##图片打包
	if [[ -f "${fileType}_ad1_new.png" && -f "activity_${fileType}_list_cell_head_new.png" ]]; then
		echo "pic exist"
		#ios
		if [[ -d "resources_ios" ]]; then
			echo "remove resources_ios"
			rm -rf resources_ios
		fi
		mkdir resources_ios
		TexturePacker ./ --format cocos2d --texture-format pvr2ccz --premultiply-alpha --opt PVRTC4 --size-constraints POT --sheet "${activity_name_new}.pvr.ccz" --data "${activity_name_new}.plist"
		cp "${activity_name_new}.pvr.ccz" "${activity_name_new}.plist" resources_ios
		rm -rf "${activity_name_new}.pvr.ccz" "${activity_name_new}.plist"
		mv resources_ios ../${desDir}/resources_ios
		#android
		if [[ -d "resources_android" ]]; then
			echo "remove resources_android"
			rm -rf resources_android
		fi
		mkdir resources_android
		alpha_activity_name_new="_alpha_${activity_name_new}"
		TexturePacker ./ --texture-format png --png-opt-level 0 --opt RGBA8888 --premultiply-alpha --size-constraints POT --sheet "${alpha_activity_name_new}.png" --data "${activity_name_new}.plist" 			
        sed -i.bak 's/'$alpha_activity_name_new'.png/'$alpha_activity_name_new'.pkm/g' $activity_name_new.plist
        rm -rf *.bak
        
		etcpack "$alpha_activity_name_new.png" resources_android -c etc1 -as
		cp "${activity_name_new}.plist" resources_android
		rm -rf "$alpha_activity_name_new.png" "${activity_name_new}.plist"
		mv resources_android ../${desDir}/resources_android	
	else
		echo "ERROR:  XXX=============>pic not exist error "
		exit 1
	fi
	echo "File $fileName finished!"
	cd ..

	# 打包
	packDir2="_actPack"
	if [[ -d $packDir2 ]]; then
		echo "remove $packDir2"
		rm -rf $packDir2
	fi
	mkdir $packDir2
	mkdir "_actPack/lua/"

	packDir="_actPack/lua/${fileType}"
	mkdir $packDir

	# ios资源
	cp "$desDir/${fileType}.cfgp" "$packDir/${fileType}.cfgp"
	cp -rf "$desDir/resources_ios" "$packDir/resources"

	cd _actPack
    zip -r "lua_${fileType}.zip" "lua"
    cd ..

    # Android资源
    rm -rf "$packDir/resources"
    cp -rf "$desDir/resources_android" "$packDir/resources"
	cd _actPack
    zip -r "lua_${fileType}_a.zip" "lua"
    cd ..

    rm -rf "_actPack/lua/"
    rm -rf $desDir

    md5 "_actPack/lua_${fileType}.zip"
    md5 "_actPack/lua_${fileType}_a.zip"
    exit 0
else
	echo "ERROR XXX=======>fileType is NULL!!!"
	exit 1
fi

		


