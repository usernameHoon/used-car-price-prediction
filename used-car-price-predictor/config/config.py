import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "..", "data", "used_cars.csv")
MODEL_DIR = os.path.join(BASE_DIR, "..", "models")
MODEL_MAP_PATH = os.path.join(BASE_DIR, "..", "data", "manufacturer_models.json")

CATEGORY_COLUMNS = [
    "manufacturer",
    "condition",
    "cylinders",
    "fuel",
    "transmission",
    "drive",
    "type",
    "paint_color",
]

INPUT_COLUMNS = [
    "year",
    "odometer",
    "manufacturer",
    "model",
    "condition",
    "cylinders",
    "fuel",
    "transmission",
    "drive",
    "type",
    "paint_color",
]
