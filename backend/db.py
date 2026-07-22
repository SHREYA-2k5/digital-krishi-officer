from pymongo import MongoClient

client = MongoClient(
    "mongodb://localhost:27017/"
)

db = client["krishi_ai"]

predictions = db["predictions"]