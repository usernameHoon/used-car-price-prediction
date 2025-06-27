import joblib
import json
import pandas as pd
import os
from config.config import MODEL_DIR, MODEL_MAP_PATH


class ModelManager:
    def __init__(self):
        self.rf_model = None
        self.xgb_model = None
        self.lgb_model = None
        self.label_encoders = None
        self.feature_columns = None
        self.load_models()

    def load_models(self):
        """모델과 리소스를 로드하는 함수"""
        try:
            self.rf_model = joblib.load(os.path.join(MODEL_DIR, "rf_model.pkl"))
            self.xgb_model = joblib.load(os.path.join(MODEL_DIR, "xgb_model.pkl"))
            self.lgb_model = joblib.load(os.path.join(MODEL_DIR, "lgbm_model.pkl"))
            self.label_encoders = joblib.load(
                os.path.join(MODEL_DIR, "label_encoders.pkl")
            )
            self.feature_columns = joblib.load(
                os.path.join(MODEL_DIR, "feature_columns.pkl")
            )
        except Exception as e:
            print(f"❌ 모델 로딩 실패: {e}")

    def get_models_by_manufacturer(self, manufacturer):
        """제조사에 해당하는 모델 목록을 반환하는 함수"""
        try:
            with open(MODEL_MAP_PATH, "r", encoding="utf-8") as f:
                model_data = json.load(f)

            return model_data.get(manufacturer.lower(), [])
        except Exception as e:
            print(f"❌ 모델 API 오류: {e}")
            return []

    def predict(self, input_data):
        """모델 예측을 위한 함수"""
        row_df = pd.DataFrame([input_data])
        row_df = pd.get_dummies(row_df)

        # 누락된 컬럼 보정
        missing_cols = [
            col for col in self.feature_columns if col not in row_df.columns
        ]
        if missing_cols:
            missing_df = pd.DataFrame({col: [0] for col in missing_cols})
            row_df = pd.concat([row_df, missing_df], axis=1)

        row_df = row_df[self.feature_columns].copy()

        # 예측
        rf_pred = self.rf_model.predict(row_df)[0]
        xgb_pred = self.xgb_model.predict(row_df)[0]
        lgb_pred = self.lgb_model.predict(row_df)[0]
        avg_pred = (rf_pred + xgb_pred + lgb_pred) / 3

        return {
            "RandomForest": round(float(rf_pred), 2),
            "XGBoost": round(float(xgb_pred), 2),
            "LightGBM": round(float(lgb_pred), 2),
            "Average": round(float(avg_pred), 2),
        }
