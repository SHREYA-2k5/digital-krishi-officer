 <div align="center">

# 🌾 Digital Krishi Officer

### AI-Powered Smart Farming Assistant

An intelligent web application that combines **Deep Learning**, **Generative AI**, and **real-time weather information** to help farmers detect crop diseases, receive personalized farming recommendations, and make informed agricultural decisions.

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask"/>
  <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb"/>
  <img src="https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/OpenWeather-FFB703?style=for-the-badge"/>
</p>

🌐 **Live Demo:** https://digital-krishi-officer-iota.vercel.app

</div>

---

# 📌 Introduction

Digital Krishi Officer is a full-stack AI-powered web application developed to support farmers with early crop disease detection and intelligent agricultural assistance.

The platform enables users to upload crop leaf images for disease prediction using a TensorFlow deep learning model. Based on the prediction, it provides disease details, confidence scores, weather-aware recommendations, AI-generated farming guidance using Google Gemini, and downloadable PDF reports. The application also supports voice interaction, making it more accessible and user-friendly.

---

# ✨ Key Features

### 🌿 AI-Based Crop Disease Detection
- Detect diseases from crop leaf images
- TensorFlow-powered prediction model
- Displays prediction confidence score

### 🤖 AI Farming Assistant
- Powered by Google Gemini
- Answers agriculture-related questions
- Provides crop care and disease management suggestions

### 🌦 Weather Advisory
- Real-time weather information using OpenWeather API
- Weather-based crop recommendations

### 🎤 Voice Interaction
- Speech-to-text functionality
- Hands-free interaction for farmers

### 📄 PDF Report Generation
- Download detailed prediction reports
- Includes disease information and recommendations

### 💾 Prediction History
- Stores prediction records in MongoDB Atlas

### 📱 Responsive Design
- Optimized for desktop and mobile devices

---

# 🛠️ Tech Stack

| Category | Technology |
|-----------|------------|
| Frontend | React.js, HTML5, CSS3, JavaScript |
| Backend | Flask (Python) |
| Machine Learning | TensorFlow |
| AI Assistant | Google Gemini API |
| Database | MongoDB Atlas |
| Weather API | OpenWeather API |
| Deployment | Vercel, Render |

---

# 🏗️ System Workflow

```text
            Upload Leaf Image
                    │
                    ▼
             Flask Backend API
                    │
                    ▼
        TensorFlow Disease Model
                    │
                    ▼
          Disease Prediction Result
            │                    │
            ▼                    ▼
    OpenWeather API       Google Gemini
            │                    │
            └──────────┬─────────┘
                       ▼
      Intelligent Crop Recommendation
                       │
                       ▼
            Generate PDF Report
```

---

# 📁 Project Structure

```
Digital-Krishi-Officer
│
├── backend
│   ├── app.py
│   ├── requirements.txt
│   ├── models/
│   ├── routes/
│   └── utils/
│
├── frontend
│   ├── public/
│   ├── src/
│   ├── components/
│   ├── App.js
│   └── package.json
│
└── README.md
```

---

# 📸 Screenshots

> Add screenshots of your application inside an **assets/** folder.

```
assets/
│── banner.png
│── home.png
│── prediction.png
│── assistant.png
│── weather.png
│── report.png
```

Example:

```markdown
## Home Page

![Home](assets/home.png)

## Disease Prediction

![Prediction](assets/prediction.png)

## AI Assistant

![Assistant](assets/assistant.png)
```

---

# 🚀 Installation

## Clone the Repository

```bash
git clone https://github.com/SHREYA-2k5/digital-krishi-officer.git

cd digital-krishi-officer
```

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt

python app.py
```

## Frontend Setup

```bash
cd frontend

npm install

npm start
```

---

# 🔑 Environment Variables

### Frontend (.env)

```env
REACT_APP_WEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY
```

### Backend (.env)

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
MONGODB_URI=YOUR_MONGODB_URI
```

---

# 🌐 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

> **Note:** The backend is deployed on Render's free tier. The first request after a period of inactivity may take a few seconds while the service wakes up.

---

# 🚀 Future Enhancements

- 🌱 Fertilizer recommendation system
- 🐛 Pest detection using AI
- 🌍 Multi-language support
- 📊 Farmer analytics dashboard
- 📍 GPS-based personalized weather alerts
- 📱 Progressive Web Application (PWA)

---

# 👩‍💻 Developer

**Shreya V**

B.Tech Computer Science and Engineering

SRM Institute of Science and Technology

GitHub: https://github.com/SHREYA-2k5

---

<div align="center">

### 🌾 Empowering Agriculture Through Artificial Intelligence

⭐ If you found this project interesting, consider giving it a star!

</div>
