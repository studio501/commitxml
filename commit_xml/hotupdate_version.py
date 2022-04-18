# -*- coding: utf-8 -*
from __future__ import print_function
import sys,re
from bs4 import BeautifulSoup
import requests

ServerUrl = "http://10.1.25.230:8080/job/IF_DYNAMIC_RESOURCE"

VersionRe = re.compile(r'.*(?:release_(.*?)_release_(.*?)_[ai]_\w{32}\.zip).*')

def read_log(version_number):
    log_url = '{0}/{1}/console'.format(ServerUrl,version_number)
    req = requests.get(log_url)
    if not req.ok:
        return None
    req_text = req.content

    soup = BeautifulSoup(req_text, 'lxml')

    lines = soup.select("#main-panel > pre")[0].text.split('\n')

    version = None
    for line in lines[::-1]:
        if len(VersionRe.findall(line)) > 0:
            version = VersionRe.sub(r'\2',line)
            return version

    return None

def main():
    if len(sys.argv) == 2:
        min_version = int(sys.argv[1])
        for i in range(0xff):
            check_version = min_version + i
            res = read_log(check_version)
            if not res:
                break

            print('build version: {0} ===> hotUpdate version: {1}'.format(check_version, res))
    else:
        print(u'打印热更版本, 输入最低构建版本')
        print('usage: python hotupdate_version.py minBuildVersion')
        print('eg: python hotupdate_version.py 6875')
    pass

if __name__ == "__main__":
    main()