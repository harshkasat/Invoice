import json


def validate_json(json_data):
    try:
        validate_json = json.loads(json_data)
        return validate_json
    except ValueError:
        return False