from core.HH import DHH

'''
payloads: 화이트 리스트를 하기 위한 payloads
ngram, hh1_size, hh2_size, ratio: DHH 하이퍼 파라미터
'''


def AWL(payloads, ngram, hh1_size, hh2_size, ratio):

    stopwords = DHH(
        packets=payloads,
        k=ngram,
        hh1_size=hh1_size,
        hh2_size=hh2_size,
        ratio=ratio,
        deduplication=True,
    )

    return stopwords
