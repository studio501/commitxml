#!bin/sh
projName=$1
level=$2
buildNum=$3
zip_md5=$4

projPath=/data/zipfiles/$projName
svndocPath=$projPath/svndocs
localePath=$svndocPath/$level
trunkPath=$svndocPath/TRUNK
localeLuaPath=$localePath/LUA.txt
cd $projPath

svn revert --depth=infinity $localePath
svn up $localePath
# svn lock $localeLuaPath

export PATH=/data/zipfiles/toolbin:$PATH
export PATH=/usr/local/bin:$PATH
if [[ $zip_md5 == "|" ]]; then
	rootdir=libaodirs-new/$buildNum
	zips=`ls $rootdir | grep .zip`
	for zipname in $zips
	do
		cd $projPath
		echo "$zipname"
		libaoname=`basename $rootdir/$zipname .zip`
		unzip $rootdir/$zipname -d $rootdir/$libaoname/ -x "*.DS_Store" "__MACOSX/*"
		ldir=$rootdir/$libaoname
		rm -rf $ldir/__MACOSX
		# dirs=`ls $ldir`
		# num=`ls $ldir | wc -l`
		# echo $num
		# if [[ $num -gt 1 ]]; then
		# 	echo "zip contains more than 1 dir!"
		# 	exit 1
		# fi
		# echo $dirs
		# libaoname=$dirs
		cd $projPath
		cp -pf /data/zipfiles/libao_new-$projName.sh $ldir/
		cp -pf $ldir/$libaoname/resources/${libaoname}_*.* libaopics/
		cd $ldir
		sh ./libao_new-$projName.sh $libaoname
		rm -f libao_new-$projName.sh

		outZips=`ls $libaoname | grep .zip`
		for outzipname in $outZips; do
			echo "outzipname: $outzipname"
			zipPath=$libaoname/$outzipname
			md5=`md5 $zipPath | awk '{print $4}'`
			cp -pf $zipPath $localePath/
			str=`grep "$outzipname=" $localeLuaPath`
			if [[ -n $str ]]; then
				sed -i '' "s/$outzipname=.*/$outzipname=$md5/g" $localeLuaPath
			else
				echo "$outzipname=$md5" >> $localeLuaPath
			fi
		done
	done
else
	md5Strs=${zip_md5//|/ }
	for md5Str in $md5Strs; do
		echo "md5Str: "$md5Str
		imd5=(${md5Str//;/ })
		smd5=${imd5[1]}
		echo "check for md5: $smd5"
		str=`grep "$smd5" $trunkPath/LUA.txt`
		if [[ -n "$str" ]]; then
			var=(${str//=/ })
			zipName=${var[0]}
			md5=${var[1]}
			zipPath=$trunkPath/$zipName

			cp -pf $zipPath $localePath/
			str=`grep "$zipName=" $localeLuaPath`
			if [[ -n $str ]]; then
				sed -i '' "s/$zipName=.*/$zipName=$md5/g" $localeLuaPath
			else
				echo "$zipName=$md5" >> $localeLuaPath
			fi
		else
			echo "Error: no md5 file found! md5=$smd5"
			exit 1
		fi
	done
fi

cd $localePath
svn add . --force
svn ci -m "auto commit by jenkins of LIBAO_BUILD" .