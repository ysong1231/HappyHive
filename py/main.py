#-*- coding:utf-8 -*-
import sys
import S1A_Crawler as sc
import S1A_Analyzer as sa

def reformat_str(s):
    return ' '.join(s.strip().split('_'))

def reformat_date(d):
    if d == 'None':
        return d
    d = d.split('-')
    return '/'.join([d[1], d[2], d[0]])

def main(name, keywords, start, end):
    url = sc.generate_url(name, start, end)
    response = sc.get_html(url)
    if response == -1:
        print('101')#fail to find the company
        return False
    res = sc.get_file(response)
    if not res:
        print('102')#fial to acquire the file
        return False
    else:
        file, url = res
        #f = open('C:/AppServ/MySites/SEC Form Helper/temp/S-1A/S-1A for '+name+'.html', 'wb')
        #f.write(file)
        #f.close()
        print(url)
        #print('S-1A for '+name+'.html')#return temp file name
        flag = sa.analysis(file, keywords)
    if flag:
        return True
    else:
        print('103')#fial to find sentences with keywords
        return False
    
if __name__ == "__main__":
    main(name = reformat_str(sys.argv[1]), keywords = reformat_str(sys.argv[2]), start = reformat_date(sys.argv[3]), end = reformat_date(sys.argv[4]))