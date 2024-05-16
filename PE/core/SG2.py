import hashlib
from sklearn.cluster import DBSCAN
import numpy as np

from core.HH import HH

from tqdm import tqdm


def SG2(payloads, window_size, vector_size, eps, minpts, ngram, hh1_size, hh2_size, hh3_size, ratio):
    fine_vectors = []

    print('chunking')
    for payload in tqdm(payloads):
        chunks = payload  # AEchunking(payload, window_size)
        vector = np.zeros(vector_size, dtype=np.int8)
        for chunk in chunks:
            idx = int(hashlib.md5(chunk.encode()).hexdigest(),
                      16) % vector_size
            vector[idx] += 1

        fine_vectors.append(vector)

    print('start DBSCAN')
    model = DBSCAN(eps=1-eps, min_samples=minpts, metric='cosine', n_jobs=8)
    model.fit(fine_vectors)
    print('end DBSCAN')

    cluster_labels = model.labels_

    cluster_dict = dict()
    for payload, label in zip(payloads, cluster_labels):
        if label == -1:
            continue

        if label not in cluster_dict.keys():
            cluster_dict[label] = []
        cluster_dict[label].append(payload)

    print('make signature')
    cluster_signature = dict()
    for cluster_label in tqdm(cluster_dict.keys()):
        payloads = cluster_dict[cluster_label]

        signatures = HH(
            packets=payloads,
            hh1_size=hh1_size,
            hh2_size=hh2_size,
            ratio=ratio,
            deduplication=True,
        )

        cluster_signature[cluster_label] = signatures
    print('end signature')

    return cluster_signature
