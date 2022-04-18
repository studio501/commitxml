#!/bin/sh
if [ -f "../../Android_Config/common.properties" ]; then
	echo "\t Load Common Properties File"
	. ../../Android_Config/common.properties
else
	echo "\t Please check common.properties in Android_Config folder"
	exit -1
fi

if [ -f "cok.properties" ]; then
	echo $BuildLangLoadProperties
	. cok.properties
else
	echo $BuildLangLoadPropertiesFail
	exit -1
fi

echo $BuildLangStart

Mode="$1"
if [[ -z $Mode ]]; then
	Mode=default
fi
shift

case $Mode in
	default|-d)
	RepackRes=false
	RebuildSo=true
	;;
	all|-a)
	RepackRes=true
	RebuildSo=true
	UsingCrashlytics=true
	;;
	java|-j)
	RepackRes=false
	RebuildSo=false
	;;
	local|-l)
	RepackRes=true
	RebuildSo=true
	UsingCrashlytics=false
	;;
	*)
	;;
esac

if [[ "$CrashlyticsEnabled" = false ]] ; then
	echo $BuildLangCrashlyticsDisabled
	UsingCrashlytics=false
fi

#ReleaseMode is set in cok.properties
#keep this option in case needed
TYPE="$1"
if [ "$TYPE" = "Release" ] || [ "$TYPE" = "release" ] ; then
	ReleaseMode=true
elif [ "$TYPE" = "Debug" ] || [ "$TYPE" = "debug" ] ; then
	ReleaseMode=false
fi
shift

Platform="$1"
if [[ -z $Platform ]]; then
	Platform="master"
fi
shift

LocalRes="$1"
if [ "$LocalRes" = "localRes" ]; then
	UserLocalRes=true
else
    UserLocalRes=false
fi
shift

echo "\t ${Info} mode:$Mode"
echo "\t Package Resource: $RepackRes"
echo "\t UserLocalRes: $UserLocalRes"
echo "\t Compile Native: $RebuildSo"
echo "\t Compile Release Mode: $ReleaseMode"
echo "\t UsingCrashlytics: $UsingCrashlytics${Normal}"

SHELL_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "SHELL_ROOT: $SHELL_ROOT"

cd ../../buildSrc

echo "build gradle plugin"
gradle clean && gradle uploadArchives --info --stacktrace

cd ../

RROJECT_NAME=":Publish.android:COK_Beta"
GRADLE_CMD="gradle"

if $UsingCrashlytics ; then
    if $ReleaseMode; then
	    GRADLE_CMD="gradle $RROJECT_NAME:crashlyticsUploadSymbolsRelease"
	else
	    GRADLE_CMD="gradle $RROJECT_NAME:crashlyticsUploadSymbolsDebug"
	fi
else
    if $ReleaseMode; then
        GRADLE_CMD="gradle $RROJECT_NAME:assembleRelease"
    else
        GRADLE_CMD="gradle $RROJECT_NAME:assembleDebug"
    fi
fi

LogMode="$1"
if [ "$LogMode" = "log" ] || [ "$LogMode" = "Log" ] ; then
    GRADLE_CMD="$GRADLE_CMD --info --stacktrace"
fi
shift

GRADLE_CMD="$GRADLE_CMD -P build_resource=$RepackRes -P build_userLocalRes=$UserLocalRes -P build_so=$RebuildSo -P build_branch=$Platform"

if $ReleaseMode; then
    GRADLE_CMD="$GRADLE_CMD -P build_release=true"
else
    GRADLE_CMD="$GRADLE_CMD -P build_release=false"
fi

gradle clean

echo $GRADLE_CMD

$GRADLE_CMD

#删除临时文件
echo "delete generate AndroidManifest: $SHELL_ROOT/src/AndroidManifest.xml"
rm -f $SHELL_ROOT/src/AndroidManifest.xml