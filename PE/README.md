# PE 파일 실험

## 산업체 데이터를 가지고 실험을 진행

#### PE_malware.ipynb

- 악성 PE파일 만으로 시그니처 생성

#### PE_benign_malware.ipynb

- 정상 파일과 악성 파일을 합쳐서 시그니처 생성

#### PE_whilte_list.ipynb

- 정상 파일에서는 화이트리스트, 악성 파일에서 시그니처 생성

#### PE_train_test.ipynb

- train, test를 나눠서 fl-score 측정
- 전처리 과정 추가

#### PE_final_test.ipynb

- 결과 분석 후 HH사이즈 증가
- fl-score 0.9
