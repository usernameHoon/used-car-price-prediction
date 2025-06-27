from flask import jsonify


def handle_error(error_message, status_code=500, trace=None):
    """
    오류를 처리하고 JSON 형태로 반환하는 함수
    trace가 제공되면 스택 트레이스를 포함시킴
    """
    response = {"error": error_message}
    if trace:
        response["trace"] = trace
    return jsonify(response), status_code


def validate_and_process_input(data, input_columns, label_encoders):
    """입력값 검증 및 변환을 담당하는 함수"""
    row = {}
    for col in input_columns:
        if col not in data:
            return handle_error(f"Missing field: {col}", 400)

        value = data[col].strip().title() if isinstance(data[col], str) else data[col]

        if col in label_encoders:
            encoder = label_encoders[col]
            try:
                # 값 변환 (예: 'Ford' → 0)
                value = encoder.transform([value])[0]
            except Exception as error_message:
                # 변환 실패 시 유효값을 반환하고 에러 메시지 포함
                valid_values = encoder.classes_.tolist()
                error_message = f"Invalid value '{value}' for '{col}'. Valid values are: {valid_values}"
                return handle_error(error_message, 400)

        row[col] = value
    return row
