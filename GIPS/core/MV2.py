import numpy as np
from core.utils import AEchunking, minHash

'''
paylaods: 입력 데이터(패킷 페이로드)
window_size: CDC(cotent defined chuncking)으로 청킹하는 모듈
K: minhash의 개수 = 2^14 = 16384
M: bitmap의 사이즈 = 64
'''


def MV2(payloads, window_size, K, M):
    minhashed_virtual_vectors = [] # minhashed_virtual_vectors <= 배열

    for payload in payloads:
        chunks = AEchunking(payload,window_size) # chunks <= payload를 청킹한 값
        encode_pos = minHash(chunks,K) # encode_pos <= chunks를 민해싱한 값
        encode_pos = encode_pos % M

        vector = np.zeros(M,dtype=np.int8) # vector <= 비트맵
        vector[encode_pos] = 1

        minhashed_virtual_vectors.append(vector)# minhashed_virtual_vector에 vector 추가

    return minhashed_virtual_vectors