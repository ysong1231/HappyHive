#-*- coding:utf-8 -*-
import requests
from bs4 import BeautifulSoup
import xlwt
from urllib import request

def generate_url(name, start, end):
    return "https://searchwww.sec.gov/EDGARFSClient/jsp/EDGAR_MainAccess.jsp?search_text=*&sort=Date&formType=FormS1AD&isAdv=true&stemming=true&numResults=100&queryCo="+name+"&fromDate="+start+"&toDate="+end+"&numResults=100"

def get_html(url, headers = None, timeout = 5, proxies = None):
    try:
        response = requests.post(url, headers = headers, timeout = timeout, proxies = proxies)
        if response.status_code == 200:
            return response.content
    except:
        for i in range(1, 10):
            #print ('Request Timeout, retry time '+str(i)+'...')
            try:
                response = requests.post(url, headers = headers, timeout = timeout)
                if response.status_code == 200:
                    return response.content
            except:
                continue
    return -1

def read_html(url):
    wp = request.urlopen(url)
    content = wp.read()
    return content

def get_file(html):   
    soup = BeautifulSoup(html,'html.parser')
    filing = soup.find('td', class_='iframe').find_all('a', class_='filing')
    if filing == []:
        return False
    else:
        for item in filing:
            name = item.text
            if 'EX' in name:
                continue
            else:
                name = ''.join(name.split('/'))
                url = item['href'].split("'")[1]
                file = read_html(url)
                return [file, url]
        return False
    return False