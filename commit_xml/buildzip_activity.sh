#!bin/sh
projName=$1
level=$2
buildNum=$3
zip_md5=$4

projPath=/data/zipfiles/$projName
svndocPath=$projPath/svndocs
localePath=$svndocPath/$level
trunkPath=$svndocPath/TRUNK

svn revert --depth=infinity $trunkPath
svn up $trunkPath

cd $projPath
export PATH=/data/zipfiles/toolbin:$PATH
export PATH=/usr/local/bin:$PATH
if [[ -z "$zip_md5" ]]; then
	ldir=libaodirs/$buildNum
	rm -rf $ldir/__MACOSX
	dirs=`ls $ldir`
	num=`ls $ldir | wc -l`
	echo $num
	if [[ $num -gt 1 ]]; then
		echo "zip contains more than 1 dir!"
		exit 1
	fi
	echo $dirs
	libaoname=$dirs
	cd $projPath
	cp -pf /data/zipfiles/newActivity.sh $ldir/
	cp -prf /data/zipfiles/encrypt $ldir/
	cd $ldir
	sh ./newActivity.sh $libaoname
	rm -f newActivity.sh
	rm -rf encrypt
	zipName=lua_${libaoname}.zip
	zipPath=_actPack/$zipName
	zipName_a=lua_${libaoname}_a.zip
	zipPath_a=_actPack/${zipName_a}
	md5=`md5 $zipPath | awk '{print $4}'`
	md5_a=`md5 ${zipPath_a} | awk '{print $4}'`
else
	str=`grep "$zip_md5" $trunkPath/LUA.txt`
	if [[ -n "$str" ]]; then
		var=(${str//=/ })
		md5=${var[1]}
		zipName=${var[0]}
		zipPath=$trunkPath/$zipName
		zipName_a=${zipName/%.zip/_a.zip}
		zipPath_a=$trunkPath/${zipName_a}
		if [[ ! -f $zipPath || ! -f $zipPath_a ]]; then
			echo "Error: please check file please! md5=$zip_md5. path=$zipPath, path_a=$zipPath_a"
			exit 1
		fi
		md5_a=`md5 ${zipPath_a} | awk '{print $4}'`
	else
		echo "Error: no md5 file found! md5=$zip_md5"
		exit 1
	fi
fi

svn revert --depth=infinity $localePath
svn up $localePath
cp -pf $zipPath $localePath/
cp -pf $zipPath_a $localePath/
cd $localePath
str=`grep "$zipName=" LUA.txt`
if [[ -n $str ]]; then
	sed -i '' "s/$zipName=.*/$zipName=$md5/g" LUA.txt
else
	echo "$zipName=$md5" >> LUA.txt
fi
str=`grep "${zipName_a}=" LUA.txt`
if [[ -n $str ]]; then
	sed -i '' "s/${zipName_a}=.*/${zipName_a}=$md5_a/g" LUA.txt
else
	echo "${zipName_a}=$md5_a" >> LUA.txt
fi
svn add . --force
svn ci -m "auto commit by jenkins of LIBAO_BUILD" .
