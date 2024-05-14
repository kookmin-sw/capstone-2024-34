import numpy as np
from core.utils import minHash
from tqdm import tqdm


def MV2(payloads, window_size, K, M):

    minhashed_virtual_vectors = []

    # print('make minhashed vector')
    for payload in payloads:
        chunks = list(payload)  # AEchunking(payload, W=window_size)
        encode_pos = minHash(chunks, K) % M

        vector = np.zeros(M, dtype=np.int8)
        vector[encode_pos] = 1

        minhashed_virtual_vectors.append(vector)

    return minhashed_virtual_vectors
