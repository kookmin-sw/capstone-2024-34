import numpy as np
from core.utils import AEchunking, minHash
from tqdm import tqdm


'''
paylaods: 입력 데이터(패킷 페이로드)
window_size: CDC(cotent defined chuncking)으로 청킹하는 모듈
K: minhash의 개수
M: bitmap의 사이즈
'''
def MV2(payloads, window_size, K, M):
    '''
    의사 코드
    minhashed_virtual_vectors <= 배열

    for payload in playloads
        chunks <= payload를 청킹한 값
        encode_pos <= chunks를 민해싱한 값

        vector <= 비트맵
        encoding <= 해싱값에 맞는 위치에 인코딩한 값

        minhashed_virtual_vector에 vector 추가

    minhashed_virtual_vectors 반환
    '''

    minhashed_virtual_vectors = []

    print('make minhashed vector')
    for payload in tqdm(payloads):
        chunks = AEchunking(payload, W=window_size)
        encode_pos = minHash(chunks, K) % M

        vector = np.zeros(M, dtype=np.int8)
        vector[encode_pos] = 1

        minhashed_virtual_vectors.append(vector)

    return minhashed_virtual_vectors
