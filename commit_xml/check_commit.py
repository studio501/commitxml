from tempfile import tempdir


# -*- coding: utf-8 -*
import sys,os,re,subprocess,time

def main():
    pass
    pwd = os.getcwd()
    os.chdir(os.getenv('TK_CLIENT'))
    branches = ['develop', 'online', 'release', 'feature/sdk']

    for i, b in enumerate(branches):
        print('==========================={0}==========================='.format(b))
        subprocess.call(['git','fetch', 'origin', b])
        time.sleep( 0.5 )
        subprocess.call(['git','log', 'origin/{}'.format(b),'-5', '--no-merges','--author=tangwen','--pretty=oneline'])
        print('')
        print('')
        print('')

    os.chdir(pwd)


if __name__ == "__main__":
    main()