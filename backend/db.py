from pymongo import MongoClient
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "krishi_ai")
MONGO_TIMEOUT_MS = 5000

client = None
predictions = None
DB_AVAILABLE = False
fallback_history = []


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