from flask import Flask, request, jsonify
from flask_cors import CORS
from config.config import DATA_PATH, CATEGORY_COLUMNS, INPUT_COLUMNS
from config.model_manager import ModelManager
from config.utils import handle_error, validate_and_process_input
import pandas as pd
import traceback


app = Flask(__name__)
CORS(app)  # 개발용 전체 origin 허용

# 모델 관리 객체 생성
model_manager = ModelManager()


@app.route("/models/<manufacturer>", methods=["GET"])
def get_models_by_manufacturer(manufacturer):
    models = model_manager.get_models_by_manufacturer(manufacturer)
    if not models:
        return handle_error(f"No models found for manufacturer: {manufacturer}", 404)
    return jsonify(models)


@app.route("/options", methods=["GET"])
def get_options():
    try:
        df = pd.read_csv(DATA_PATH)
        options = {
            col: sorted(df[col].dropna().unique().tolist())
            for col in CATEGORY_COLUMNS
            if col in df.columns
        }
        return jsonify(options)
    except Exception as e:
        return handle_error(f"옵션 API 오류: {str(e)}")


@app.route("/predict_api", methods=["POST"])
def predict_api():
    try:
        data = request.get_json()
        if not data:
            return handle_error("No input data provided", 400)

        # 입력값 검증 및 변환
        row = validate_and_process_input(
            data, INPUT_COLUMNS, model_manager.label_encoders
        )
        if isinstance(row, tuple):  # 오류 처리 시 반환되는 tuple
            return row  # 오류 응답 반환

        # 예측
        predictions = model_manager.predict(row)
        return jsonify(predictions)

    except Exception as e:
        return handle_error(f"예측 API 오류: {str(e)}", trace=traceback.format_exc())


if __name__ == "__main__":
    app.run(debug=True)
