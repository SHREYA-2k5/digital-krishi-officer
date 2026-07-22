from pymongo import MongoClient
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")

client = MongoClient(MONGO_URI)

db = client[os.getenv("MONGO_DB_NAME", "krishi_ai")]
predictions = db["predictions"]