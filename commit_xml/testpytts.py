# -*- coding: utf-8 -*
from __future__ import print_function
import sys,os,re,subprocess
import pyttsx

def main():
    engine = pyttsx.init()
    engine.say('Greetings!')
    engine.say('How are you today?')
    engine.say('这是什么旋律? 哈哈哈哈')
    engine.runAndWait()
    pass

if __name__ == "__main__":
    main()