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
use_v4="$3"
use_remotepatch="$4"

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
	echo “create $client_dir”
	mkdir $client_dir
fi

if [ ! -d "$client_dir/.git" ]; then
	echo "create git reposity"
	cd $client_dir
	git init .
	git remote add origin ${svn_root}
	git fetch origin ${git_branch}
	git checkout -b ${git_branch} origin/${git_branch}
	cd ..
fi

# if [ ! -d "$res_dir" ]; then
# 	echo “git clone ${res_root}”
# 	git clone ${res_root} $res_dir
# fi

echo " update client " 
cd $client_dir
echo `pwd`
rm -fr *.err

function branch_status() {
	local a=$1 b=$2
	local base=$( git merge-base $a $b )
	local aref=$( git rev-parse  $a )
	local bref=$( git rev-parse  $b )

	if [[ $aref == "$bref" ]]; then
		echo up-to-date
	elif [[ $aref == "$base" ]]; then
		echo behind
	elif [[ $bref == "$base" ]]; then
		echo ahead
	else
		echo diverged
	fi
}

# last jenkis build abort will remain v4 path on current branch
# try clean previous patch
protect_counter=0
while :
do
	echo "try clean previous patch"
	retval=$( branch_status ${git_branch} "origin/${git_branch}" )
	if [ "$retval" == "ahead" ]; then
		git reset --hard HEAD~1
	else
		break
	fi
	protect_counter=$((protect_counter+1))
	if [[ ${protect_counter} > 100 ]]; then #check max 100 commit
		break
	fi
done


#svn update --set-depth infinity --username=liuzengyou --password=elextech%5858 --force --no-auth-cache 2>$logfileName.err
git reset --hard HEAD
git clean -fd 2>>$logfileName.err
git fetch origin $git_branch
localBranchCnt=`git branch | grep $git_branch | wc -l | awk '{print $1}'`
if [ $localBranchCnt -gt 0 ]; then
	git checkout $git_branch
else
	git checkout -b $git_branch "origin/${git_branch}"
fi

git pull origin $git_branch 2>>$logfileName.err

#errmsg=`cat $logfileName.err | grep -v From | grep -v "\->" | wc -l`
num=`cat $logfileName.err | grep -v From | grep -v "\->" | grep -v "git help gc" | grep -v "Auto packing the repository" | wc -l | awk '{print $1}'`
if [ $num -gt 0 ]; then
	echo `cat $logfileName.err | grep -v From | grep -v "\->"`
	echo "workspace clean"
	echo "please resolve conflict"
	exit 1
 	# cd ../
 	# rm -fr $client_dir
	# git clone ${svn_root} $client_dir
 	# cd $client_dir
 	# git checkout $git_branch
fi

if [ $use_v4 == "true" ] ;then
	echo "try apply v4 patch"
	v4_switch_script="../../switch_branch.py"
	if [ -f "$v4_switch_script" ]; then
		result=`python ${v4_switch_script} ${git_branch}`
		if [ "$result" == "ok" ]; then
			echo "apply v4 patch successful"
		else
			echo "apply v4 patch failed. please inform tangwen to push ${git_branch} with v4 patch."
			exit 1
		fi
	else
		echo "apply v4 patch failed. switch_branch.py not exist"
		exit 1
	fi
fi

if [ ! -z "${use_remotepatch}" -a "${use_remotepatch}" != " " ]; then
	echo "try apply ${use_remotepatch}"
	patch_arr=(${use_remotepatch// / })
	if [[ ${#patch_arr[@]} != 2 ]]; then
		echo "remote_branch_patch argument error, please check it."
		exit 1
	fi
	v4_switch_script="../../switch_branch.py"
	if [ -f "$v4_switch_script" ]; then
		result=`python ${v4_switch_script} ${patch_arr[1]} ${patch_arr[0]}`
		if [ "$result" == "ok" ]; then
			echo "apply ${use_remotepatch} successful"
		else
			echo "apply ${use_remotepatch} failed."
			exit 1
		fi
	else
		echo "apply ${use_remotepatch} failed. switch_branch.py not exist"
		exit 1
	fi
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

# git_nowrevision=`git log | head -n 1 | awk '{print $2}'`
# git_Last_revision=`cat ../revision.txt` >/dev/null 2>/dev/null
# #svn_revision=`svn info | grep "Last Changed Rev" |  awk '{print $4}'`
# #svn_Last_revision=`cat ../revision.txt` >/dev/null 2>/dev/null

# if [[ -n "$git_Last_revision" ]]; then
	
# 	if [ ! "$git_nowrevision" == "$git_Last_revision" ]; then
# 		#svn log -v -r $svn_Last_revision:$svn_revision --username=liuzengyou --password=elextech%5858 
# 		git log -v $git_Last_revision..$git_nowrevision
# 	fi

# fi

# echo "${git_nowrevision}" >../revision.txt	


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

