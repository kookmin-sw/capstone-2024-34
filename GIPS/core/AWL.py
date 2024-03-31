from core.HH import THH, DHH

'''
payloads: 화이트 리스트를 하기 위한 payloads
ngram, hh1_size, hh2_size, ratio: DHH 하이퍼 파라미터
'''

def AWL(payloads, ngram, hh1_size, hh2_size, hh3_size, ratio):
    
    print('start whtie list')
    stopwords = THH(
        packets = payloads,
        k = ngram,
        hh1_size = hh1_size,
        hh2_size = hh2_size,
        hh3_size = hh3_size,
        ratio = ratio,
        deduplication = True,
    )
    print('end white list')

    return stopwords
