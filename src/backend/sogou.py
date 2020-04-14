import requests
import re
import hashlib
from multiprocessing import Pool, TimeoutError
import time
import os

HEADERS = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9,zh;q=0.8,zh-CN;q=0.7',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Host': 'fanyi.sogou.com',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
    'Referer': 'https://fanyi.sogou.com/',
    'Origin': 'https://fanyi.sogou.com'
}

s = requests.Session()
s.headers.update(HEADERS)

window_seccode = '8511813095152'
#window_sgtkn = 'FDCA43D2DE451487F3F6519865593A5DF3375F4B5E87CBF1'


def init():
    res = s.get('https://fanyi.sogou.com')
    # print(res.headers)
    # print(s.cookies)
    res = s.get('https://fanyi.sogou.com/logtrace', headers={'Accept': '*/*'})
    # print(res.request.headers)
    rawList = re.search('window\.seccode.+',
                        res.text).group(0)[0:-1].split(';')

    global window_seccode
    window_seccode = rawList[0].split('=')[1]
    # window_sgtkn = rawList[1].split('=')[1]
    # print(window_seccode)


def translate(q, f='auto', t='zh-CHS'):
    uuid = '123'
    result = hashlib.md5(f'{f}{t}{q}{window_seccode}'.encode())
    sig = result.hexdigest()
    # print(sig)
    payload = {
        'from': f,
        'to': t,
        'text': q,
        'client': 'pc',
        'fr': 'browser_pc',
        'pid': 'sogou-dict-vr',
        'dict': 'true',
        'word_group': 'true',
        'second_query': 'true',
        'uuid': uuid,
        'needQc': '1',
        's': sig
    }
    res = s.post('https://fanyi.sogou.com/reventondc/translateV2', data=payload,
                 headers={
                     'Accept': 'application/json',
                     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                     'X-Requested-With': 'XMLHttpRequest'})

    # print(res.request.headers)

    res_json = res.json()

    # print(res_json)

    # window_sgtkn_old = window_sgtkn
    sgtkn = res_json['data']['sgtkn']
    # print(f'{window_sgtkn_old}, {window_sgtkn}')
    # print(res.json())

    approve(uuid, sgtkn)

    # return res_json['data']['common_dict']['dict'][0] if res_json['data']['common_dict'] else res_json['data']['translate']
    return res_json['data']


def approve(uuid, sgtkn):
    res = s.get(f'https://fanyi.sogou.com/approve?uuid={uuid}&token={sgtkn}', headers={
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin'
    })
    print(res.text)


init()

if __name__ == "__main__":
    for i in range(10):
        r = translate('hello')
        print(r['data']['translate']['dit'])
        # time.sleep(1)

    s.close()
