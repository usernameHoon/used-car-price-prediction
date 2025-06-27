# 🚗 Used Cars Dataset을 이용한 AI 기반 중고차 가격 예측 서비스

사용자가 입력한 차량 정보를 기반으로, Kaggle에서 제공하는 Used Cars Dataset으로 학습된 AI가 중고차 가격을 예측해주는 웹 서비스입니다.
프론트엔드로는 React, 백엔드로는 Spring 및 Python을 사용하였습니다.

---

## ✨ 주요 기능
### 중고차 가격 예측
  + 사용자가 제조사, 모델, 연식, 주행 거리 등 차량 정보를 입력하면, 학습된 AI 모델이 해당 차량의 가격을 실시간으로 예측합니다.

### 제조사에 따른 모델 자동 필터링
  + 제조사 선택 시, 해당 제조사에 속한 차량 모델만 자동으로 필터링되어 사용자 경험을 향상시킵니다.

### 예측 결과 시각화
  + 예측된 가격을 시각적 차트로 표시하며, 상세 결과는 모달창을 통해 확인 가능합니다.

---

## 🛠 프로젝트 구성

| 영역       | 기술 스택                                  |
|------------|------------------------------------------- |
| 프론트엔드 | React, Axios, Tailwind CSS                  |
| 백엔드     | Spring Boot, Spring Data JPA               |
| AI 서버    | Python, scikit-learn, Flask                |

---

## 📁 디렉토리 구조

```
used-car-price-prediction
├── frontend/ # React 프로젝트 (사용자 인터페이스)
├── backend/ # Spring Boot 프로젝트 (API 서버)
├── used-car-price-predictor/ # Python ML 서버 (예측 모델 API)
└── README.md
```

---

## 🤖 AI 모델 정보
+ 사용 데이터: ([Kaggle - Used Cars Dataset](https://www.kaggle.com/datasets/austinreese/craigslist-carstrucks-data))

+ 주요 전처리: 범주형 변수 인코딩, 이상치 제거, 특성 선택

+ 사용 모델:
  + RandomForestRegressor
  + XGBoostRegressor
  + LightGBMRegressor

---

## 💡 실행 화면

---

## 📌 기타 참고 사항
+ **모델 파일 용량 이슈**로 인해 .pkl 모델 파일 및 데이터 파일은 Git에 포함되어 있지 않습니다.
