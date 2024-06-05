from core.MV2 import MV2
from core.JIG import JIG
from core.SG2 import SG2


def GIPS(str_feature,
		 K, M, # MV2 파라미터
		 thetaJ,  # JIG 파라미터
		 vector_size, eps, minpts, hh1_size, hh2_size, ratio # SG2
		):

	print(f'data no: {len(str_feature)}')

	str_feature = list(str_feature)
	for feature in str_feature:
		feature = list(feature)

	# 빅 그룹 식별
	minhashed_virtual_vectors = MV2(payloads=str_feature, K=K, M=M)

	big_group_indices = JIG(vectors=minhashed_virtual_vectors, thetaJ=thetaJ)
  
	big_group_payloads = []
	non_big_group_paylaods = []

	for idx, payload in enumerate(str_feature):
		if idx in big_group_indices:
			big_group_payloads.append(payload)
		else:
			non_big_group_paylaods.append(payload)
	
	# 시그니처 생성
	cluster_signatures = SG2(payloads=big_group_payloads, vector_size=vector_size, eps=eps, 
						  minpts=minpts, hh1_size=hh1_size, hh2_size=hh2_size, ratio=ratio)

	return cluster_signatures