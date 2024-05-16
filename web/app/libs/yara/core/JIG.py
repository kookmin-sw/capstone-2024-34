import math
import numpy as np


def IORA(sum_vector_):
    sum_vector = sorted(sum_vector_, reverse=True)
    total = sum(sum_vector)
    
    for idx in range(0, len(sum_vector)):
        length = len(sum_vector) - idx
        mean = total / length
        sigma = math.sqrt(mean * (length - 1) / length)
        
        thetaC = mean + 6 * sigma
        if sum_vector[idx] <= thetaC:
            break

        total -= sum_vector[idx]
    return thetaC

def JIG(vectors, thetaJ):

    M = len(vectors[0])
    MV = np.zeros(M, dtype=np.int32)
    big_group_indices = []

    # print('checking big group')
    for doc in range(len(vectors)):
        vector = vectors[doc]
        MV += vector

        encode_pos = set(np.nonzero(vector)[0])

        thetaC = IORA(MV)
        big_counter_pos = set(np.where(MV > thetaC)[0])

        overlap_set = encode_pos & big_counter_pos
        overlap_ratio = len(overlap_set) / len(encode_pos)

        if overlap_ratio >= thetaJ:
            big_group_indices.append(doc)

    return big_group_indices
