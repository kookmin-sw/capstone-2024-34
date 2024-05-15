import numpy as np
from core.utils import AEchunking, minHash
from tqdm import tqdm


def MV2(payloads, K, M):

    minhashed_virtual_vectors = []

    print('make minhashed vector')
    for payload in tqdm(payloads):
        chunks = list(payload)  # AEchunking(payload, W=window_size)
        encode_pos = minHash(chunks, K) % M

        vector = np.zeros(M, dtype=np.int8)
        vector[encode_pos] = 1

        minhashed_virtual_vectors.append(vector)

    return minhashed_virtual_vectors
