from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
from db import save_prediction, get_history
from datetime import datetime

import os
import google.generativeai as genai
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
frontend_build_path = os.path.join(BASE_DIR, "frontend", "build")
app = Flask(__name__, static_folder=frontend_build_path, static_url_path="")
CORS(app)
load_dotenv()

if not os.path.isdir(frontend_build_path):
    print(f"WARNING: Frontend build not found at {frontend_build_path}")
else:
    print(f"Serving frontend from {frontend_build_path}")

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

gemini_model = genai.GenerativeModel("gemini-2.5-flash-lite")

# Load trained model
model = load_model("model/model.h5")

classes = ["early_blight", "healthy", "late_blight"]

# Recommendation database
recommendations = {
    "early_blight": {
        "solution": "Apply fungicide and remove infected leaves",
        "priority": "High"
    },

    "late_blight": {
        "solution": "Use disease-resistant fungicide immediately",
        "priority": "High"
    },

    "healthy": {
        "solution": "No disease detected. Maintain regular care",
        "priority": "Low"
    }
}

@app.route("/predict", methods=["POST"])
def predict():

    # Check if image exists
    if "image" not in request.files:
        return jsonify({
            "error": "No image uploaded"
        }), 400

    file = request.files["image"]
    crop = request.form.get("crop", "Unknown")

    # Open image
    image = Image.open(file).convert("RGB")

    # Resize image
    image = image.resize((224, 224))

    # Convert image to array
    image = np.array(image)

    # Normalize image
    image = image / 255.0

    # Expand dimensions
    image = np.expand_dims(image, axis=0)

    # Predict
    prediction = model.predict(image)
    print("Prediction:", prediction)

# Get index of highest probability
    predicted_index = np.argmax(prediction)

# Get disease label
    predicted_class = classes[predicted_index]

# Confidence score
    confidence = float(np.max(prediction) * 100)
    # Get recommendation
    result = recommendations[predicted_class]
    prediction_data = {
      "disease": predicted_class,
      "confidence": round(confidence, 2),
      "solution": result["solution"],
      "priority": result["priority"],
      "crop": crop,
      "date": datetime.utcnow().isoformat() + "Z"
    }

    save_prediction(prediction_data)

    return jsonify({
      "disease": predicted_class,
      "solution": result["solution"],
      "priority": result["priority"],
      "confidence": round(confidence, 2),
      "crop": crop,
      "date": prediction_data["date"]
    })
@app.route("/history", methods=["GET"])
def history():

    data = get_history()

    return jsonify(data)
@app.route("/dashboard", methods=["GET"])
def dashboard():

    data = get_history()

    total_predictions = len(data)

    healthy_count = sum(
        1 for item in data
        if item["disease"] == "healthy"
    )

    diseased_count = (
        total_predictions - healthy_count
    )

    disease_counts = {}

    for item in data:

        disease = item["disease"]

        disease_counts[disease] = (
            disease_counts.get(disease, 0) + 1
        )

    most_common_disease = (
        max(
            disease_counts,
            key=disease_counts.get
        )
        if disease_counts
        else "None"
    )

    return jsonify({

    "total_predictions":
    total_predictions,

    "healthy_count":
    healthy_count,

    "diseased_count":
    diseased_count,

    "most_common_disease":
    most_common_disease,

    "disease_counts":
    disease_counts

})
@app.route("/ask-ai", methods=["POST"])
def ask_ai():

    try:

        data = request.get_json()

        question = data.get("question", "")

        prompt = f"""
You are a Digital Krishi Officer.

Answer ONLY agriculture questions.

Return the response in Markdown.

## 🌾 Problem

One sentence.

## 💊 Recommended Action

- Maximum 2 bullet points.

## ⚠ Precautions

- Maximum 2 bullet points.

## 🌱 Prevention

- Maximum 2 bullet points.

Rules:

- Total response under 50 words.
- Simple English.
- No greetings.
- No paragraphs.

Question:
{question}
"""

        response = gemini_model.generate_content(prompt)

        return jsonify({
            "answer": response.text
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    requested_path = os.path.join(app.static_folder, path)
    if path != '' and os.path.exists(requested_path):
        return send_from_directory(app.static_folder, path)
    index_path = os.path.join(app.static_folder, 'index.html')
    if os.path.exists(index_path):
        return send_from_directory(app.static_folder, 'index.html')
    print(f"WARNING: index.html missing at {index_path}")
    return jsonify({
        "status": "OK",
        "message": "Backend API is running. Frontend static build not included in this deployment.",
        "available_routes": ["/predict", "/history", "/dashboard", "/ask-ai"]
    }), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=True)