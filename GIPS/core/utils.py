import math
import datasketch
import numpy as np

def AEchunking(doc, W):
    chunks = []
    window = str()
    window_count = 0
    
    for i, word in enumerate(doc):
        if window_count > W:
            chunks.append(window)
            window = str()
            window_count = 0
        elif word > doc[i - window_count]:
            window_count = 0
        window += word
        window_count += 1
        
    if len(window)!=0:
        chunks.append(window)
    return chunks

def minHash(chunks, K, SEED=42):
    signature = datasketch.minhash.MinHash(num_perm=K, seed=SEED)
    for chunk in chunks:
        signature.update(chunk.encode())
    return np.array(signature.digest(), np.int32)
