import math
import numpy as np


def IORA(sum_vector_): # 이해 가능한 사람은 공유해주세요
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

'''
vectors: virtual vector
thetaJ: hyper parameter
'''

def JIG(vectors, thetaJ):
    '''
    의사 코드
    M <= vectors의 크기
    MV <= 빅그룹을 카운팅할 배열
    big_group_indices <= 빅그룹으로 판별된 데이터를 저장할 집합
    
    for vector in vectors
        mv에 vector 추가

        thetaC <= 빅그룹 식별 임계값 IOPA 이용

        reatio <= vector의 1인 값이 추가 되었을 때 NV의 그 값이 thetaC보다 클때 카운트
        
        if reatio / K > thetaJ
            big_group_indices에 vector의 index추가

    big_group_indices 반환
    '''