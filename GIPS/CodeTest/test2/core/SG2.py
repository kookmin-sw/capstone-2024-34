import hashlib
from sklearn.cluster import DBSCAN
import numpy as np
import sys

import string

from core.HH import DHH, THH
from core.utils import AEchunking

# from HH import DHH
# from HH import THH
# from utils import AEchunking

'''
payloads: JIG에서 구한 빅그룹
window_size: 청킹을 위한 윈도우 사이즈
vector_size: 해싱을 위한 비트맵사이즈
eps, minpts: DBSACN 하이퍼 파라미터
ngram, hh1_size, hh2_size, ratiob: DHH하이퍼 파라미터
'''


def SG2(payloads, window_size, vector_size, eps, minpts, ngram, hh1_size, hh2_size, ratio):
    fine_vectors = [] # <= 배열
    for payload in payloads:
        chunks = AEchunking(payload,window_size) # <= payload를 청킹한 값
        vector = [0 for i in range(vector_size)] # <= 배열
        for chunk in chunks:
            idx = int(hashlib.md5(chunk.encode()).hexdigest(),16) % vector_size 
            # 해싱한 값 int(hashlib.md5(chunk.encode()).hexdigest(),16) % vector_size이용 암호학적인 해시 필요 X
            vector[idx] += 1

        fine_vectors.append(vector) # 안에 vector 추가

    model = DBSCAN(eps=1-eps, min_samples=minpts, metric='cosine', n_jobs=None)
    model.fit(fine_vectors)

    cluster_labels = model.labels_

    cluster_dict = dict() # <= 딕셔너리
    for payload, cluster in zip(payloads, cluster_labels):
        if(cluster == -1): # 같은 클러스터 안에 최소 갯수도 채우지 못한 녀석
            continue

        if cluster not in cluster_dict.keys():
            cluster_dict[cluster] = [] # 딕셔너리 안에 cluster 키를 갖는 배열 추가
        cluster_dict[cluster].append(payload) # cluster배열 안에 payload추가

    cluster_signature = dict()
    for cluster_label in cluster_dict.keys():
        payloads = cluster_dict[cluster_label] # <= 각 라벨별 페이로드

        signatures = THH(
            packets = payloads,
            k = ngram,
            hh1_size = hh1_size,
            hh2_size = hh2_size,
            hh3_size = hh2_size,
            ratio = ratio,
            deduplication = True,
        )
        if len(signatures) != 0:
            cluster_signature[cluster_label] = (signatures,len(payloads)) # cluster_label 키 리스트 또는 튜플로 (signatures, payload의 길이)

    return cluster_signature 