# -*- coding: utf-8 -*
from __future__ import print_function
import time
import sys,os,re,subprocess
from unicodedata import name
from weakref import ref
import requests
from requests.auth import HTTPBasicAuth
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait as wait
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains

CommitId_re = re.compile(r'\"COMMIT_ID\":\s*\"(.*)?\"')


headers = {'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'}


def refresh_cdn():
    driver = webdriver.Chrome()
    driver.get("http://paas.bk.hortorgames.com/o/bk_sops/template/home/43/")

    name = driver.find_element_by_xpath('//*[@id="user"]')
    pwd = driver.find_element_by_xpath('//*[@id="password"]')
    loginbtn = driver.find_element_by_xpath('//*[@id="login-form"]/div[2]/div[4]/button')

    name.clear()
    name.send_keys("tangwen")
    pwd.clear()
    pwd.send_keys("Inryygy@08077355")
    loginbtn.click()
    time.sleep( 8 )

    worktitle = driver.find_element_by_xpath('//*[@id="app"]/header/nav/div/div/span')
    print(worktitle.text)

    actions = ActionChains(driver)
    men_menu = driver.find_element_by_xpath('//*[@id="app"]/header/nav/div/div')
    actions.move_to_element(men_menu).perform()
    time.sleep( 0.5 )

    workbtns = driver.find_elements_by_xpath('//*[@id="app"]/header/nav/div/div/div/a')
    time.sleep( 0.1 )
    workbtns[0].click()

    time.sleep( 5 )
    tasks = driver.find_elements_by_xpath('//*[@id="app"]/div/div/div/div[3]/div/div[3]/table/tbody/tr')
    print(len(tasks))
    for i in range(len(tasks)):
        ta = driver.find_element_by_xpath('//*[@id="app"]/div/div/div/div[3]/div/div[3]/table/tbody/tr[{0}]/td[2]/div/a'.format(i+1))
        if ta.text == u'正式服源站更新-不刷CDN':
            print(ta.text)
            tn = driver.find_element_by_xpath('//*[@id="app"]/div/div/div/div[3]/div/div[3]/table/tbody/tr[{0}]/td[7]/div/div/a[1]'.format(i+1))
            tn.click()

            time.sleep(5)
            next_btn = driver.find_element_by_xpath('//*[@id="app"]/div/div/div[2]/div[2]/button')
            next_btn.click()

            time.sleep(10)
            next_btn = driver.find_element_by_xpath('//*[@id="app"]/div/div/div[2]/div[3]/button[2]')
            next_btn.click()

            time.sleep(10)
            next_btn = driver.find_element_by_xpath('//*[@id="app"]/div/div/div[2]/div[1]/div/div[1]/button[1]')
            next_btn.click()

            time.sleep(60)
            print('refresh cdn successful.')
            break


    a = 100

def test(a = 'abcd'):
    # global driver
    # # driver = webdriver.Firefox()
    # https://xxz-xyzw.hortorgames.com/manager/game/getVersionList?channel=hortor
    # https://xxz-xyzw-manager.hortorgames.com/game/version
    driver = webdriver.Chrome()
    driver.get("https://xxz-xyzw-manager.hortorgames.com/game/version")
    
    name = driver.find_element_by_xpath('//*[@id="pane-account"]/form/div[1]/div/div/input')
    pwd = driver.find_element_by_xpath('//*[@id="pane-account"]/form/div[2]/div/div/input')
    name.clear()
    name.send_keys("tangwen@hortorgames.com")
    pwd.clear()
    pwd.send_keys("tw$a23223")
    
    # //*[@id="pane-account"]/form/div[4]/div/button
    loginbtn = driver.find_element_by_xpath('//*[@id="pane-account"]/form/div[4]/div/button')
    loginbtn.click()
    time.sleep( 2 )

    # //*[@id="app"]/section/section/main/section/section/main/div[1]/div/div[2]/div[3]/table/tbody
    # //*[@id="app"]/section/section/main/section/section/main/div[1]/div/div[2]/div[3]/table/tbody
    # /html/body/div/section/section/main/section/section/main/div[1]/div/div[2]/div[3]/table/tbody
    # //*[@id="app"]/section/section/main/section/section/main/div[1]/div/div[2]/div[3]/table
    # #app > section > section > main > section > section > main > div.el-card.box-card.is-always-shadow > div > div.el-table.el-table--fit.el-table--scrollable-x.el-table--enable-row-hover.el-table--enable-row-transition.el-table--mini > div.el-table__body-wrapper.is-scrolling-left > table > tbody
    # div_body = driver.find_element_by_xpath('//*[@id="app"]/section/section/main/section/section/main/div[1]/div/div[2]/div[3]')
    
    # temp_title = driver.find_element_by_xpath('//*[@id="app"]/section/section/main/section/section/main/div[1]/div/div[2]/div[3]/table/tbody/tr[1]/td[2]')

    div_body = driver.find_elements_by_xpath('//*[@id="app"]/section/section/main/section/section/main/div[1]/div/div[2]/div[3]/table/tbody/tr')
    div_body_len = len(div_body) #div_body.size()

    dst_version = "0.0.0.1-wx"
    # //*[@id="app"]/section/section/main/section/section/main/div[2]/div/div[2]/div/div/div/div[2]/div/div[2]/div/div[3]/div[2]/div[2]/span

    # btn
    # //*[@id="app"]/section/section/main/section/section/main/div[1]/div/div[2]/div[3]/table/tbody/tr[11]/td[6]/div/button[1]

    for i in range(div_body_len):
        version = driver.find_element_by_xpath('//*[@id="app"]/section/section/main/section/section/main/div[1]/div/div[2]/div[3]/table/tbody/tr[{0}]/td[2]/div'.format(i+1))
        print(version.text)
        if version.text == dst_version:
            bundleBtn = driver.find_element_by_xpath('//*[@id="app"]/section/section/main/section/section/main/div[1]/div/div[2]/div[3]/table/tbody/tr[{0}]/td[6]/div/button[1]'.format(i+1))
            bundleBtn.click()
            time.sleep( 4 )

            # commit_txt = wait(driver, 10).until(EC.presence_of_element_located((By.XPATH,'//*[@id="app"]/section/section/main/section/section/main/div[2]/div/div[2]/div/div/div/div[2]/div/div[2]/div/div[3]/div[2]')))

            commit_txt = driver.find_elements_by_xpath('//*[@id="app"]/section/section/main/section/section/main/div[2]/div/div[2]/div/div/div/div[2]/div/div[2]/div/div[3]/div')
            print(len(commit_txt))
            for x in commit_txt:
                print(x.text)
                gp = CommitId_re.findall(x.text)
                if len(gp) > 0:
                    print(gp[0])
                    break
            break

        # tr = driver.find_element_by_xpath('//*[@id="app"]/section/section/main/section/section/main/div[1]/div/div[2]/div[3]/table/tbody/tr[{0}]'.format(i))

    ad = 100

    # # assert "Python" in driver.title
    # elem = driver.find_element_by_name("user")
    # elem.clear()
    # elem.send_keys("tangwen")

    # elem = driver.find_element_by_xpath('//*[@id="password"]')
    # elem.clear()
    # elem.send_keys("Inryygy@08077355")

    # # /html/body/div/form/button
    # elem = driver.find_element_by_xpath("html/body/div/form/button")
    # elem.click()


    # elem.send_keys(Keys.RETURN)
    # assert "No results found." not in driver.page_source
    # driver.close()

    # res = ['1','99','99']
    # add_version_code(res,10)
    # print(res)
    # sn_add_and_commit('/Users/tangwen/Documents/my_projects/cok/ccbDyRes/dynamicResource')

    # is_ci = None

    # is_ci = is_ci or 'abc'
    # print(is_ci)
    # a = []
    # a.append(None)
    # print(len(a))
    # b = {'c':1}
    # print(b.get('d'))
    # p = '/Users/tangwen/Documents/my_projects/cok/ccbDyRes/dynamicResource/Aphrodite_face/_alpha_sk_Aphrodite_face_out.tps'
    # check_tps_file(p)
    # a = '/Users/tangwen/Downloads/iceAndFire/ice2/b'
    # b = find_plist_file(a)
    # print(b)

    # a = '/Users/tangwen/Documents/my_projects/cok/client/IF/Resources/lua_static/game/tournament/abc.plist'
    # b = change_file_ext(a,'.png')
    # print(b)
    # print('a'*10)
    # print(is_dir_exist_non_case_sensible('.','abcd'))


def main():
    pass
    url = "https://xxz-xyzw-manager.hortorgames.com/game/version"
    cookies = ""
    # req_text = requests.get(url,cookies=get_cookie(),headers=headers).content
    # Authorization
    # headers={'accessToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhaWQiOjIwOSwiZXhwIjoxNjU4MTM5MjYyfQ.KNowKQ7GbX0O-jaDjElPPbkNMepuY2IEmEhHnphfKX0'}
    ta = HTTPBasicAuth('tangwen@hortorgames.com', 'tw$a23223')
    # req_text = requests.get(url,headers=headers, auth = ta).content
    req_text = requests.get(url).content
    a = 100

if __name__ == "__main__":
    refresh_cdn()
    # test()
    # main()