#!bin/sh
thisPath=$(pwd) #拖入命令行，输入礼包名
cd $thisPath
echo "move to path:$thisPath"
packName=$1

ios_md5="kong"
android_md5="kong"

function packageWithLangAndPlat(){
	langName=$1
	echo "packageWithLangAndPlat: $langName"
	plat=$2
	echo "packageWithLangAndPlat: $plat"
	justLang=$3
	echo "packageWithLangAndPlat: $justLang"
	# libaoName=${libaoName%%/}
	libaoName="${packName}_${langName}"
	echo "move to file: $libaoName"
	# cd $libaoName
	if [ -f "$thisPath/$packName/lua_${libaoName}.zip" ]; then #判断是否存在文件
		echo "===============>remove old lua_${libaoName}.zip"
		rm -rf lua_${libaoName}.zip
	fi	
	if [ -d "$thisPath/$packName/lua" ]; then
		echo "===============>remove old lua"
		rm -rf lua
	fi
	mkdir lua
	# -----------------------------------------------------------------------------resources文件夹
	resname=$libaoName
	resname="resources_${langName}"
	if [ -d "$thisPath/$packName/$resname" ]; then #判断是否存在
		echo "===============>do resources--->start"

		if [ -d "$thisPath/$packName/temp" ]; then
		rm -rf temp
		fi
		mkdir temp
		if [ $plat == 0 ]; then
			# ios
			# TexturePacker "${resname}/" --opt RGBA8888 --size-constraints POT --sheet "${libaoName}.pvr.ccz" --data "${libaoName}.plist"
			TexturePacker "${resname}/" --opt PVRTC4 --premultiply-alpha --size-constraints POT --sheet "${libaoName}.pvr.ccz" --data "${libaoName}.plist"

			cp "${libaoName}.pvr.ccz" "${libaoName}.plist" "$thisPath/$packName/temp"
	        rm -rf "${libaoName}.pvr.ccz" "${libaoName}.plist"
	    else
	    	# Android
	    	# TexturePacker "${resname}/" --texture-format png --png-opt-level 0 --opt RGBA8888 --size-constraints POT --sheet "${libaoName}.png" --data "${libaoName}.plist"
	    	# TexturePacker "${resname}/" --texture-format png --opt RGBA8888 --size-constraints POT --sheet "${libaoName}.png" --data "${libaoName}.plist"

   #          echo "===============>copy packName/$resname .lua 11111111"
			# etcpack "${libaoName}.png" android -c etc1 -as	
			# echo "===============>copy packName/$resname .lua 11111111"
			# cp "android/${libaoName}.pkm" "android/${libaoName}_alpha.pkm" "$thisPath/$packName/temp"
			# cp "${libaoName}.plist" "$thisPath/$packName/temp"
			# rm -rf android
			# rm "${libaoName}.plist" "${libaoName}.png"

			TexturePacker "${resname}/" --opt RGBA8888 --premultiply-alpha --size-constraints POT --sheet "${libaoName}.pvr.ccz" --data "${libaoName}.plist"
			cp "${libaoName}.pvr.ccz" "${libaoName}.plist" "$thisPath/$packName/temp"
	        rm -rf "${libaoName}.pvr.ccz" "${libaoName}.plist"
	    fi

		#------------------------配置文件,必须存在
		if [ -f "$thisPath/$packName/${resname}/${libaoName}.lua" ]; then #判断是否存在文件
			echo "===============>copy ${libaoName}.lua"
			cp "${resname}/${libaoName}.lua" "$thisPath/$packName/temp"
		else
			echo "XXX=======>libao ${libaoName}.lua is NULL!!!"
		fi

		cp -rf "$thisPath/$packName/temp"  "$thisPath/$packName/lua"
        rm -rf "$thisPath/$packName/temp"
        cd lua
        mv temp resources
        cd ..
        echo "===============>do resources--->finish"
	else
		echo "XXX=======>libao resources_${langName} is NULL!!!"
	fi

	#-----------------------------------------------------------------------------skeleton文件夹
	if [ -d "$thisPath/$packName/skeleton" ]; then #判断是否存在
		echo "===============>do skeleton--->start"
		if [ -d "$thisPath/$packName/temp" ]; then
		rm -rf temp
		fi
		mkdir temp
		cp "skeleton/sk_${packName}_icon.json" "skeleton/sk_${libaoName}_icon.json"
		if [ $plat == 0 ]; then
			echo "===============>do skeleton--->start IOS "
			TexturePacker  skeleton/ --format libgdx --texture-format pvr2ccz --premultiply-alpha --opt RGBA8888 --size-constraints POT --sheet "_alpha_sk_${libaoName}_icon.pvr.ccz" --data "sk_${libaoName}_icon.atlas"
			if [ -d "$thisPath/$packName/temp/ios" ]; then
				rm -rf temp/ios
			fi
			mkdir temp/ios
			cp "_alpha_sk_${libaoName}_icon.pvr.ccz" "sk_${libaoName}_icon.atlas" "skeleton/sk_${libaoName}_icon.json" "$thisPath/$packName/temp/ios"
            rm -rf "_alpha_sk_${libaoName}_icon.pvr.ccz" "sk_${libaoName}_icon.atlas"
            # cp -rf "$thisPath/$packName/temp/ios"  "$thisPath/$packName/temp"
            # rm -rf "$thisPath/$packName/ios"
        else
       	 	if [ -d "$thisPath/$packName/android" ]; then
				rm -rf android
			fi
            TexturePacker skeleton/ --format libgdx --texture-format png --premultiply-alpha --png-opt-level 0 --opt RGBA8888 --size-constraints POT --sheet "_alpha_sk_${libaoName}_icon.png" --data "sk_${libaoName}_icon.atlas"
            
   			fullFileName=_alpha_sk_${libaoName}_icon
   			fileName=sk_${libaoName}_icon
            sed -i.bak 's/'$fullFileName'.png/'$fullFileName'.pkm/g' $fileName.atlas
            rm -rf *.bak
            
			etcpack "_alpha_sk_${libaoName}_icon.png" android -c etc1 -as
			# cp "skeleton/sk_${packName}_icon.json" "skeleton/sk_${libaoName}_icon.json"
			cp "sk_${libaoName}_icon.atlas" "skeleton/sk_${libaoName}_icon.json" "$thisPath/$packName/android"

			rm -rf "sk_${libaoName}_icon.atlas" "_alpha_sk_${libaoName}_icon.png"
			cp -rf "$thisPath/$packName/android"  "$thisPath/$packName/temp"
            rm -rf "$thisPath/$packName/android"
            
            # rm -rf "$thisPath/$packName/temp"
        fi
        cp -rf "$thisPath/$packName/temp"  "$thisPath/$packName/lua"
        rm -rf "$thisPath/$packName/skeleton/sk_${libaoName}_icon.json"
        echo "===============>do skeleton--->finish"
        cd lua
        mv temp skeleton
        cd ..
	else
		echo "XXX=======>libao skeleton is NULL!!!"
	fi

	# -----------------------------------------------------------------------------icon文件夹
    if [ -d "$thisPath/$packName/icon" ]; then #判断是否存在
		echo "===============>do icon--->start"
		if [ -d "$thisPath/$packName/temp2" ]; then
			rm -rf temp2
		fi
		mkdir temp2
		cp "$thisPath/$packName/icon/${packName}_new_icon.png" "$thisPath/$packName/temp2"
		mv "temp2/${packName}_new_icon.png" "temp2/${libaoName}_new_icon.png"
		TexturePacker temp2/ --premultiply-alpha --opt RGBA8888 --size-constraints POT --sheet "${libaoName}_new_icon.pvr.ccz" --data "${libaoName}_new_icon.plist"
		rm -rf temp2

		if [ -d "$thisPath/$packName/temp" ]; then
			rm -rf temp
		fi
		mkdir temp
		cp "${libaoName}_new_icon.pvr.ccz" "${libaoName}_new_icon.plist" "$thisPath/$packName/temp"
        rm -rf "${libaoName}_new_icon.pvr.ccz" "${libaoName}_new_icon.plist"

		cp -rf "$thisPath/$packName/temp"  "$thisPath/$packName/lua"
        rm -rf "$thisPath/$packName/temp"
        cd lua
        mv temp LiBaoIcon
        cd ..
	else
		echo "===============>not has icon"
	fi

	#-----------------------------------------------------------------------------particles文件夹
   	echo "===============>do particles--->start"
    if [ -d "$thisPath/$packName/particles" ]; then
		cp -rf "$thisPath/$packName/particles"  "$thisPath/$packName/lua"
	fi
    echo "===============>do particles--->finish"

	#-----------------------------------------------------------------------------ccbi文件夹
	echo "===============>do ccbi--->start"
	if [ -d "$thisPath/$packName/ccbi" ]; then
		rm -rf ccbi
	fi
	mkdir ccbi
	touch "GoldExchangeAdv${libaoName}LuaCell_NEW.ccbi"
	cp -rf "GoldExchangeAdv${libaoName}LuaCell_NEW.ccbi"  "$thisPath/$packName/ccbi"
    rm -rf "GoldExchangeAdv${libaoName}LuaCell_NEW.ccbi"
	cp -rf "$thisPath/$packName/ccbi"  "$thisPath/$packName/lua"
    rm -rf "$thisPath/$packName/ccbi"
    echo "===============>do ccbi--->finish"

    #-----------------------------------------------------------------------------压缩成zip
    echo "===============>do zip"
    zip -r "lua_${libaoName}.zip" lua
    rm -rf lua
    echo "===============>finish"
    md5aaa=`md5 lua_${libaoName}.zip | awk '{print $4}'`
    echo "===============>tmd5 is $md5aaa"
    if [ $plat == 0 ]; then
    	if [ $ios_md5 == "kong" ]; then
    		echo "===============>ios_md5 1111111111 is $ios_md5"
    		ios_md5="${justLang};${md5aaa}"
    	else
    		echo "===============>ios_md5 222222222 is $ios_md5"
    		ios_md5="${ios_md5}|${justLang};${md5aaa}"
    	fi
    else
    	if [ $android_md5 == "kong" ]; then
    		echo "===============>android_md5 1111111111 is $android_md5"
    		android_md5="${justLang};${md5aaa}"
    	else
    		echo "===============>android_md5 2222222222 is $android_md5"
    		android_md5="${android_md5}|${justLang};${md5aaa}"
    	fi
    fi
}

# 重组结构体
function renameAllRes(){
	langName=$1
	plat=$2
	justLang=$3

	echo "renameAllRes libao langName is $langName"
	tmpfile="$thisPath/$packName/resources_${langName}"
	if [ -d $tmpfile ]; then
		rm -rf $tmpfile
	fi
	mkdir $tmpfile

	if [[ ${langName} == "default" || ${langName} == "default_a" ]]; then
		cp -r "$thisPath/$packName/resources/${packName}_view_v4.png" "$thisPath/$packName/resources/${packName}.lua" "$thisPath/$packName/resources_${langName}"
		mv "$thisPath/$packName/resources_${langName}/${packName}_view_v4.png" "$thisPath/$packName/resources_${langName}/${packName}_${langName}_view_v4.png"
		mv "$thisPath/$packName/resources_${langName}/${packName}.lua" "$thisPath/$packName/resources_${langName}/${packName}_${langName}.lua"
	else
		cp -r "$thisPath/$packName/resources/${packName}.lua" "$thisPath/$packName/resources_${langName}"
		cp "$thisPath/$packName/resources_localize/${packName}_${justLang}_view_v4.png" "$thisPath/$packName/resources_${langName}/"
		mv "$thisPath/$packName/resources_${langName}/${packName}_${justLang}_view_v4.png" "$thisPath/$packName/resources_${langName}/${packName}_${langName}_view_v4.png"
		mv "$thisPath/$packName/resources_${langName}/${packName}.lua" "$thisPath/$packName/resources_${langName}/${packName}_${langName}.lua"
	fi

	packageWithLangAndPlat $langName $plat $justLang

	echo "renameAllRes 4444444444 !!! $tmpfile"
	rm -rf resources_${langName}
}

# plat 0 ios 1 android
echo "11111111111111111 !!!"
if [ -n "$packName" ]; then #判断变量是否有值
	echo "pack libao =============> $packName"
	if [ -d "$thisPath/$packName" ]; then #判断是否存在
		echo "move to file: $packName"
		cd $packName
		if [ -f "$thisPath/$packName/lua_${packName}.zip" ]; then #判断是否存在文件
			echo "===============>remove old lua_${packName}.zip"
			rm -rf lua_${packName}.zip
		fi
		if [ -d "$thisPath/$packName/lua" ]; then
			echo "===============>remove old lua"
			rm -rf lua
		fi

		renameAllRes "default" 0 "default"
		renameAllRes "default_a" 1 "default"

		if [ -d "$thisPath/$packName/resources_localize" ]; then #判断是否存在
        	# 把resources_localize 拷贝到 tmp_localize
        	rm -rf "$thisPath/$packName/tmp_localize"
        	cp -r "$thisPath/$packName/resources_localize" "$thisPath/$packName/tmp_localize"
			# echo "===============>do resources_localize--->start"
			# localizeNum=1
			# 遍历tmp_localize下的所有png图片，然后根据名字判断显示的地区，并组建类似["localize"]={["CN"]=1,["TW"]=2,},的字符串插入对应的配置lua，
			# 同时修改png文件名为localize1.png，以便根据["localize"]中的配置进行读取
			for pngFile in $thisPath/$packName/tmp_localize/*.png
			do
				echo "pngFile is: $pngFile"
				tmpPngFile=""
				tmpPngFile=${pngFile##*$packName}
				tmpPngFile=${tmpPngFile#*_}
				tmpPngFile=${tmpPngFile%_view_v4.png*}
				# 截取文件名中的 CN_TW_US 等等
				echo "333333333 tmpPngFile is: $tmpPngFile"

				renameAllRes $tmpPngFile 0 $tmpPngFile
				renameAllRes "${tmpPngFile}_a" 1 $tmpPngFile
			done

        	rm -rf "$thisPath/$packName/tmp_localize"
			echo "===============>do resources_localize--->end ~~~~~~~~~"
		else
			echo "libao resources_localize is NULL!!!"
		fi

	else
		echo "XXX=======>libao PATH is NULL!!!"
	fi

	echo "===============>md5_ios is $ios_md5"
    echo "===============>md5_android is $android_md5"
else
	echo "XXX=======>libaoName is NULL!!!"
fi
echo "22222222222222222 !!!"






