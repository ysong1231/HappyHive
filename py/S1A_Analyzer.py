#-*- coding:utf-8 -*-
from bs4 import BeautifulSoup
import re

def judge(s, kw):
    for w in kw:
        if w not in s:
            return False
    return True

def find_key_word(s, keywords):
    flag = False
    for kw in keywords:
        kw = kw.strip().split(',')
        flag = flag|judge(s, kw)
    return flag

def read_html(file):
    html = ' '.join([re.sub(u"<.*?>|&.*?;", "", line) for line in str(file).strip().split('\\n')])
    return html

def analysis(file, keywords):
    flag = 0
    html = read_html(file)
    sentences = re.split('(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', html)
    keywords = keywords.strip().split(';')
    for s in sentences:
        if find_key_word(s, keywords):
            flag = 1
            print(s)
    return flag