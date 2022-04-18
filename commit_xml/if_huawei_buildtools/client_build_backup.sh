#!/bin/sh

# cd /data/htdocs/ifadmin/admin

curDate=`date '+%Y%m%d'`
curTime=`date '+%H%M-%S'`

echo "****************start git upadte ${curDate}-${curTime}*********************"

svn_root="http://svn.xinggeq.com/svn/if/trunk/src/client"	 # trunk
res_root="git@git.elex-tech.com:if.game.client/clientres.git"
# svn_root="http://svn.xinggeq.com/svn/if/branches/production/src/client"	 # branch
# svn_root="svn list  http://svn.xinggeq.com/svn/if/tags/client/2.0.7/client"	 # tag
client_dir="client"
res_dir="clientres"
project_dir="project"
package_dir="package"
packageso_dir="package-so"
logfileName="${curDate}-${curTime}"
svndirfile="svndirfile"

if [ ! -d "$project_dir" ]; then

	mkdir $project_dir
	
fi

cd $project_dir

# 判断svn地址变化，如果不一样则删除重新checkout

svn_root="$1"
git_branch="$2"

if [ -f "$svndirfile" ]; then

	svn_old_dir=`cat $svndirfile`

	if [ ! "$svn_old_dir" == "$svn_root" ]; then
		echo "clean project"
		rm -fr $client_dir
		rm -fr revision.txt	
	fi
fi

echo "${svn_root}" >$svndirfile

if [ ! -d "$client_dir" ]; then

	#echo "svn checkout ${svn_root}"

	#svn checkout ${svn_root} --depth=infinity --username=liuzengyou --password=elextech%5858 --force --no-auth-cache 
	echo “git clone ${svn_root}”
	git clone ${svn_root} $client_dir
fi

if [ ! -d "$res_dir" ]; then
	echo “git clone ${res_root}”
	git clone ${res_root} $res_dir
fi

echo " update client " 
cd $client_dir
echo `pwd`
rm -fr *.err

#svn update --set-depth infinity --username=liuzengyou --password=elextech%5858 --force --no-auth-cache 2>$logfileName.err
git reset --hard HEAD 2>>$logfileName.err
git clean -fd 2>>$logfileName.err
git pull 2>>$logfileName.err

git checkout $git_branch

#errmsg=`cat $logfileName.err | grep -v From | grep -v "\->" | wc -l`
num=`cat $logfileName.err | grep -v From | grep -v "\->" | wc -l | awk '{print $1}'`
if [ $num -gt 0 ]; then
	echo `cat $logfileName.err | grep -v From | grep -v "\->"`
	echo "workspace clean"
 	cd ../
 	rm -fr $client_dir
	git clone ${svn_root} $client_dir
 	#svn checkout ${svn_root} --depth=infinity --username=liuzengyou --password=elextech%5858 --force --no-auth-cache
 	cd $client_dir
 	git checkout $git_branch
fi

echo "[update done]" 
echo "" 

if [ ! -d "$package_dir" ]; then

	mkdir $package_dir
fi

if [ ! -d "$packageso_dir" ]; then

	mkdir $packageso_dir
fi

# cd Publish.android/IF_Inner
# sh build.sh all debug false true

echo "=========================git update info =========================="

git_nowrevision=`git log | head -n 1 | awk '{print $2}'`
git_Last_revision=`cat ../revision.txt` >/dev/null 2>/dev/null
#svn_revision=`svn info | grep "Last Changed Rev" |  awk '{print $4}'`
#svn_Last_revision=`cat ../revision.txt` >/dev/null 2>/dev/null

if [[ -n "$git_Last_revision" ]]; then
	
	if [ ! "$git_nowrevision" == "$git_Last_revision" ]; then
		#svn log -v -r $svn_Last_revision:$svn_revision --username=liuzengyou --password=elextech%5858 
		git log -v $git_Last_revision..$git_nowrevision
	fi

fi

echo "${git_nowrevision}" >../revision.txt	


echo "=============================end===================================="


cd ../../workspace

if [ ! -d "$package_dir" ]; then

	mkdir $package_dir
fi

if [ ! -d "$packageso_dir" ]; then

	mkdir $packageso_dir
fi

#rm -fr $package_dir/*
#rm -fr $packageso_dir/*

#cd ../
#if [ -d "workspace/$package_dir" ]; then

#	ln -s $PWD/project/client/$package_dir/ $PWD/workspace/$package_dir/
#fi

#if [ -d "workspace/$packageso_dir" ]; then

#	ln -s $PWD/project/client/$packageso_dir/ $PWD/workspace/$packageso_dir/
#fi

