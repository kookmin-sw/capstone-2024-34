# **PLATFORM GIPS** | 생성형 침입 방지 기술기반 보안 플랫폼

2024 국민대학교 소프트웨어학부 캡스톤 디자인 | 산학협력 34조 | 국민대학교 정보보호연구실 & (주)누리랩

---

## 1. 프로젝트 소개

생성형 침입 방지 기술 (GIPS: Generative Intrusion Prevention on data Stream) 알고리즘을 기반으로 자동화된 데이터 분석 및 패턴 인식 알고리즘을 개선합니다. 악성 PE 파일로 부터 추출한 공통 시그니처를 Yara Rule 형태로 자동 생성해 주는 기능이 구현되어 다양한 분석 툴에서 활용할 수 있습니다. 또한 다양한 데이터 소스로부터 손쉽게 분석이 가능하도록 시각화하여 보여주는 Web 플랫폼을 구성하여 증가하고 있는 제로데이 공격과 같은 보안 위협을 식별할 수 있는 플랫폼을 구축하였습니다.

#### [소개 페이지 바로가기](https://kookmin-sw.github.io/capstone-2024-34/)

### 2. Abstract

Improve automated data analysis and pattern recognition algorithms based on the Generative Intrusion Prevention on data Stream (GIPS) algorithm. A function that automatically generates common signatures extracted from malicious PE files in the form of Yara Rules has been implemented, which can be utilized by various analysis tools. In addition, a web platform that visualizes and displays data from various data sources for easy analysis has been constructed to identify security threats such as zero-day attacks, which are on the rise.

### 3. 팀 소개

|   담당   |  이름  |
| :------: | :----: |
|   팀장   | 엄석현 |
|   팀원   | 김태경 |
|   팀원   | 김태윤 |
|   팀원   | 박준서 |
| 지도교수 | 윤명근 |

### 4. 사용법

1. 사전 운영환경 설치
   구동을 위해 Web및 파이썬 라이브러리 환경을 설치합니다.

```bash
cd web
pip install -r requirements.txt
npm install
npm run dev
```

2. env 설정
   /web 폴더에 .env 환경설정 파일을 생성합니다.

```json
DATABASE_URL = "file:./infosec_platform.db"
JWT_SECRET_KEY = "시크릿키 생성"
NEXTAUTH_SECRET= "시크릿키 생성"
NEXTAUTH_URL = "http://localhost:3000"
NEXT_PUBLIC_BASE_URL = "http://localhost:3000"
```

3. 로컬 서버 구동

```bash
npm run dev
```

### 5. 기타

#### 사용기술

<img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
<img src="https://img.shields.io/badge/scikit learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white"/>
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"/>

#### 협업도구

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"/>
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"/>
<img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"/>

#### 참고문헌

Seo, HyungBin, and MyungKeun Yoon. ["Generative intrusion detection and prevention on data stream."](https://www.usenix.org/conference/usenixsecurity23/presentation/seo) 32nd USENIX Security Symposium (USENIX Security 23). 2023.
