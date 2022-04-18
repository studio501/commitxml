rm -rf log.txt
adb logcat | grep 'cocos2d-x' > log.txt
