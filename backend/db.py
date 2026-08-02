from pymongo import MongoClient
import os
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FALLBACK_HISTORY_FILE = os.path.join(BASE_DIR, "fallback_history.json")

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "krishi_ai")
MONGO_TIMEOUT_MS = 10000

client = None
predictions = None
DB_AVAILABLE = False
fallback_history = []


def _load_fallback_history():
    global fallback_history
    if os.path.exists(FALLBACK_HISTORY_FILE):
        try:
            with open(FALLBACK_HISTORY_FILE, "r", encoding="utf-8") as fh:
                fallback_history = json.load(fh)
                if not isinstance(fallback_history, list):
                    fallback_history = []
                print(f"Loaded fallback history from {FALLBACK_HISTORY_FILE}")
        except Exception as exc:
            print(f"WARNING: Could not load fallback history: {exc}")
            fallback_history = []


def _save_fallback_history():
    try:
        with open(FALLBACK_HISTORY_FILE, "w", encoding="utf-8") as fh:
            json.dump(fallback_history, fh, ensure_ascii=False, indent=2)
            print(f"Persisted fallback history to {FALLBACK_HISTORY_FILE}")
    except Exception as exc:
        print(f"WARNING: Could not persist fallback history: {exc}")


def build_mongo_client(insecure=False):
    options = {
        "serverSelectionTimeoutMS": MONGO_TIMEOUT_MS,
        "connectTimeoutMS": MONGO_TIMEOUT_MS,
        "socketTimeoutMS": MONGO_TIMEOUT_MS,
    }
    if insecure:
        options["tlsAllowInvalidCertificates"] = True
        options["tlsAllowInvalidHostnames"] = True
    return MongoClient(MONGO_URI, **options)


_load_fallback_history()

try:
    client = build_mongo_client()
    client.admin.command("ping")
    db = client[MONGO_DB_NAME]
    predictions = db["predictions"]
    DB_AVAILABLE = True
    print(f"MongoDB connected to {MONGO_URI}")
except Exception as exc:
    print(f"WARNING: MongoDB unavailable ({MONGO_URI}): {exc}")
    try:
        client = build_mongo_client(insecure=True)
        client.admin.command("ping")
        db = client[MONGO_DB_NAME]
        predictions = db["predictions"]
        DB_AVAILABLE = True
        print(f"MongoDB connected insecurely to {MONGO_URI}")
    except Exception as exc2:
        print(f"WARNING: MongoDB insecure retry failed ({MONGO_URI}): {exc2}")
        predictions = None
        DB_AVAILABLE = False


def save_prediction(prediction_data):
    if DB_AVAILABLE and predictions is not None:
        try:
            predictions.insert_one(prediction_data)
            return True
        except Exception as exc:
            print(f"MongoDB insert failed: {exc}")
    fallback_history.append(prediction_data)
    return False


def get_history():
    if DB_AVAILABLE and predictions is not None:
        try:
            return list(predictions.find({}, {"_id": 0}))
        except Exception as exc:
            print(f"MongoDB query failed: {exc}")
    return list(fallback_history)