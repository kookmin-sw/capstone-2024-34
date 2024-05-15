from core.HH import HH


def AWL(payloads, hh1_size, hh2_size, ratio):

    # print('start whtie list')
    stopwords = HH(
        packets=payloads,
        hh1_size=hh1_size,
        hh2_size=hh2_size,
        ratio=ratio,
        deduplication=True,
    )
    # print('end white list')

    return stopwords
