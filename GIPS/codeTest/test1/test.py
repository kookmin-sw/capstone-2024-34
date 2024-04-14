import os
from core.AWL import AWL
from core.SG2 import SG2
from core.JIG import JIG
from core.MV2 import MV2
from pandas import *

K = 3
M = 8
thetaJ = 1/3
window_size = 3
vector_size = 64
eps = 0.6
minpts = 5
ngram = 4
hh1_size = 100
hh2_size = 100
ratio = 0.1

# K = 64
# M = 4096
# thetaJ = 0.6
# window_size = 3
# vector_size = 512
# eps = 0.6
# minpts = 5
# ngram = 4
# hh1_size = 3000
# hh2_size = 3000
# ratio = 0.1


csv_path = "GIPS/weblog.csv"
csv_data = read_csv(csv_path)
payloads = csv_data['URL'].tolist()
payloads = payloads[:100]
# payloads = ["GET /index.html HTTP/1.1", "HTTProotadmin1234@", "GET / HTTP/1.1 admin",
#             "HTTP root directory", "GET root12, admin123@", "GET root12, admin123@"]
print("===MV2 START===")
minhashed_virtual_vectors = MV2(
    payloads=payloads, window_size=window_size, K=K, M=M)

for vector in minhashed_virtual_vectors:
    print(vector)
print("===MV2 END===")

print("===JIG START===")
big_group_indices = JIG(vectors=minhashed_virtual_vectors, thetaJ=thetaJ)
print(big_group_indices)
print("===JIG END===")

big_group_payloads = []
non_big_group_paylaods = []

for idx, payload in enumerate(payloads):
    if idx in big_group_indices:
        big_group_payloads.append(payload)
    else:
        non_big_group_paylaods.append(payload)

# 시그니처 생성
print("===SG2 START===")
cluster_signatures = SG2(payloads=big_group_payloads, window_size=window_size,
                         vector_size=vector_size, eps=eps, minpts=minpts, ngram=ngram,
                         hh1_size=hh1_size, hh2_size=hh2_size, ratio=ratio)
print(f'cluster_signatures: {cluster_signatures}')
print("===SG2 END===")

print("===AWL START===")
stopwords = AWL(payloads=non_big_group_paylaods, ngram=ngram,
                hh1_size=hh1_size, hh2_size=hh2_size, ratio=ratio)
print(f'stopwords: {stopwords}')
print("===AWL END===")
