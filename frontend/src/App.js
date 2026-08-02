 
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import jsPDF from "jspdf";
import { useTranslation } from "react-i18next";

import { askKrishiOfficer } from "./api";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import DetectDisease from "./pages/DetectDisease";
import DiseaseLibrary from "./pages/DiseaseLibrary";
import FarmingTips from "./pages/FarmingTips";
import AskOfficer from "./pages/AskOfficer";

import "./App.css";

function App() {
  const { t } = useTranslation();

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(null);

  const [translatedResult, setTranslatedResult] =
    useState(null);
  

  const [loading, setLoading] =
    useState(false);

  const [language, setLanguage] =
    useState("en");
    

  const [weatherAlert, setWeatherAlert] =
    useState("");
  // FARMER VOICE INPUT

  const [farmerProblem, setFarmerProblem] =
    useState("");

  // VOICE AI RESPONSE

  const [voiceDiagnosis, setVoiceDiagnosis] =
    useState("");
  const [history, setHistory] =
    useState([]);
  const [dashboard, setDashboard] = useState({});

  const [selectedCrop, setSelectedCrop] =
    useState("Tomato");
  const [historyQuery, setHistoryQuery] =
    useState("");
  const [historyFilter, setHistoryFilter] =
    useState("All");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  
  const handleAsk = async () => {

  if (!question.trim()) return;

  setLoading(true);

  const response =
    await askKrishiOfficer(question);

  setAnswer(response);

  setLoading(false);
};

  const getImageDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const downloadPredictionPDF = async () => {
    if (!translatedResult) return;

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    doc.setFontSize(20);
    doc.text(t("appMessages.predictionReport"), 40, 60);

    doc.setFontSize(12);
    doc.text(`${t("appMessages.cropLabel")}: ${selectedCrop}`, 40, 100);
    doc.text(`${t("appMessages.diseaseLabel")}: ${translatedResult.disease}`, 40, 120);
    doc.text(`${t("appMessages.confidenceLabel")}: ${translatedResult.confidence}%`, 40, 140);
    doc.text(`${t("appMessages.priorityLabel")}: ${translatedResult.priority}`, 40, 160);
    doc.text(`${t("appMessages.weatherLabel")}: ${translatedResult.weather}`, 40, 180);
    doc.text(`${t("appMessages.dateLabel")}: ${new Date().toLocaleString()}`, 40, 200);

    if (image) {
      try {
        const imageData = await getImageDataUrl(image);
        doc.addImage(imageData, "JPEG", 40, 230, 510, 250);
      } catch (error) {
        console.log("PDF image load failed", error);
      }
    }

    doc.save(
      `prediction-report-${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`
    );
  };

  // LANGUAGE CODES

  const languageCodes = {

    en: "en-US",

    hi: "hi-IN",

    ta: "ta-IN",

    ml: "ml-IN",

    te: "te-IN"

  };

  // TRANSLATE FUNCTION

  const translateText = async (
    text,
    targetLang
  ) => {

    if (targetLang === "en") {

      return text;
    }

    try {

      const response = await fetch(

        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`

      );

      const data =
        await response.json();

      return data[0][0][0];

    } catch (error) {

      console.log(error);

      return text;
    }
  };

  // GET LOCATION

  const getLocation = () => {

    return new Promise((resolve) => {

      if (navigator.geolocation) {
     
        navigator.geolocation.getCurrentPosition(

          (position) => {

            resolve({

              lat:
                position.coords.latitude,

              lon:
                position.coords.longitude
            });
          },

          (error) => {

            console.log(error);

            alert(
              t("appMessages.locationDenied")
            );
          }
        );
      }
    });
  };

  // WEATHER

  const fetchWeather = async (
    coords
  ) => {

    try {

       const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
);

      const data =
        await response.json();

      if (!data.main) {

        setWeatherAlert(
          t("appMessages.weatherUnavailable")
        );

        return;
      }

      const humidity =
        data.main.humidity;

      const temp =
        data.main.temp;

      if (humidity > 70) {

        setWeatherAlert(

          t("appMessages.highHumidity")

        );
      }

      else if (temp > 35) {

        setWeatherAlert(

          t("appMessages.highTemperature")

        );
      }

      else {

        setWeatherAlert(

          t("appMessages.stableWeather")

        );
      }

    } catch (error) {

      console.log(error);

      setWeatherAlert(
        t("appMessages.weatherUnavailable")
      );
    }
  };

  // IMAGE HANDLER

  const handleImage = (e) => {

    const file = e.target.files[0];

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  // PREDICT DISEASE

  const handleUpload = async () => {

    if (!image) {

      alert(
        t("appMessages.uploadImage")
      );

      return;
    }

    setLoading(true);

    const formData =
      new FormData();

    formData.append(
      "image",
      image
    );
    formData.append(
      "crop",
      selectedCrop
    );

    try {

      // LOCATION

      const coords =
        await getLocation();

      // WEATHER

      await fetchWeather(coords);

      // AI PREDICTION

      const response =
        await axios.post(
          "https://digital-krishi-officer-2.onrender.com/predict",
          formData
        );

      const translatedDisease =
        await translateText(
          response.data.disease,
          language
        );

      const translatedSolution =
        await translateText(
          response.data.solution,
          language
        );

      const translatedPriority =
        await translateText(
          response.data.priority,
          language
        );

      setTranslatedResult({
        disease: translatedDisease,
        solution: translatedSolution,
        priority: translatedPriority,
        confidence: response.data.confidence,
        weather: weatherAlert
      });
      const newPrediction = {
        disease: translatedDisease,
        confidence: response.data.confidence,
        priority: translatedPriority,
        crop: response.data.crop || selectedCrop,
        date: response.data.date || new Date().toISOString()
      };

const updatedHistory = [

  newPrediction,

  ...history

];

setHistory(updatedHistory);

localStorage.setItem(

  "predictionHistory",

  JSON.stringify(updatedHistory)

);

    } catch (error) {

      console.log(error);

      alert(
        t("appMessages.predictionFailed")
      );

    } finally {

      setLoading(false);
    }
  };

  const diseases = [

  {
    name: "Early Blight",

    symptoms:
      "Yellow spots and concentric rings on leaves",

    cause:
      "Fungal infection",

    treatment:
      "Apply fungicide and remove infected leaves"
  },

  {
    name: "Late Blight",

    symptoms:
      "Brown patches and leaf decay",

    cause:
      "High humidity and fungal spread",

    treatment:
      "Use copper fungicide and avoid overwatering"
  },

  {
    name: "Leaf Mold",

    symptoms:
      "Yellow patches with mold underneath",

    cause:
      "Excess moisture",

    treatment:
      "Improve ventilation and apply fungicide"
  }

];

  // ANALYZE FARMER PROBLEM

  const analyzeFarmerProblem = async (
    text
  ) => {

    let diagnosis = "";

    const lowerText =
      text.toLowerCase();

    // YELLOW SPOTS

    if (

      lowerText.includes("yellow") ||

      lowerText.includes("spots")

    ) {

      diagnosis =
        "Possible Disease: Early Blight";
    }

    // DRY LEAVES

    else if (

      lowerText.includes("dry") ||

      lowerText.includes("brown")

    ) {

      diagnosis =
        "Possible Disease: Late Blight";
    }

    // WHITE POWDER

    else if (

      lowerText.includes("white") ||

      lowerText.includes("powder")

    ) {

      diagnosis =
        "Possible Fungal Infection";
    }

    // HEALTHY

    else if (

      lowerText.includes("healthy")

    ) {

      diagnosis =
        "Crop appears healthy";
    }

    // UNKNOWN

    else {

      diagnosis =

        "Unable to identify disease. Please upload crop image.";
    }

    // TRANSLATE

    const translatedDiagnosis =
      await translateText(

        diagnosis,

        language
      );

    setVoiceDiagnosis(

      translatedDiagnosis
    );
  };

  // VOICE INPUT
   

  const startListening = () => {

    const SpeechRecognition =

      window.SpeechRecognition ||

      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(

        t("appMessages.speechNotSupported")

      );

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang =
      languageCodes[language];

    recognition.continuous =
      false;

    recognition.interimResults =
      false;

    recognition.maxAlternatives =
      1;

    recognition.start();

    recognition.onresult = async (
      event
    ) => {

      const text =
        event.results[0][0].transcript;

      setFarmerProblem(text);

      // AI ANALYSIS

      analyzeFarmerProblem(text);
    };

    recognition.onerror = (
      event
    ) => {

      console.log(event.error);

      alert(
        t("appMessages.voiceFailed")
      );
    };
  };
  const fetchHistory = async () => {

  try {

    const response = await axios.get(
      "https://digital-krishi-officer-2.onrender.com/history"
    );

    setHistory(
      response.data
    );

  }

  catch(error) {

    console.log(
      error
    );

  }

};
const fetchDashboard = async () => {

  try {

    const response = await axios.get(
      "https://digital-krishi-officer-2.onrender.com/dashboard"
    );

    setDashboard(
      response.data
    );

  }

  catch(error) {

    console.log(
      error
    );

  }

};
useEffect(() => {

  fetchHistory();
  fetchDashboard();

}, []);

  const filteredHistory = history.filter((item) => {
    const query = historyQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      item.disease?.toLowerCase().includes(query) ||
      item.priority?.toLowerCase().includes(query);

    if (!matchesQuery) return false;
    if (historyFilter === "All") return true;
    if (
      historyFilter === "Healthy"
    )
      return item.disease
        ?.toLowerCase()
        .includes("healthy");
    if (
      historyFilter === "Diseased"
    )
      return !item.disease
        ?.toLowerCase()
        .includes("healthy");
    if (
      historyFilter === "High Priority"
    )
      return item.priority
        ?.toLowerCase()
        .includes("high");
    return true;
  });

  const historyTrend = Object.entries(
    history.reduce((acc, item) => {
      const key = item.disease || "Unknown";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="container">
      <Sidebar language={language} setLanguage={setLanguage} />

      <div className="main">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                dashboard={dashboard}
                history={history}
                filteredHistory={filteredHistory}
                historyQuery={historyQuery}
                setHistoryQuery={setHistoryQuery}
                historyFilter={historyFilter}
                setHistoryFilter={setHistoryFilter}
                historyTrend={historyTrend}
              />
            }
          />
          <Route
            path="/detect"
            element={
              <DetectDisease
                image={image}
                preview={preview}
                translatedResult={translatedResult}
                loading={loading}
                handleImage={handleImage}
                handleUpload={handleUpload}
                startListening={startListening}
                farmerProblem={farmerProblem}
                voiceDiagnosis={voiceDiagnosis}
                language={language}
                selectedCrop={selectedCrop}
                setSelectedCrop={setSelectedCrop}
                downloadPredictionPDF={downloadPredictionPDF}
              />
            }
          />
          <Route
            path="/library"
            element={<DiseaseLibrary diseases={diseases} />}
          />
          <Route path="/tips" element={<FarmingTips />} />
          <Route
            path="/ask"
            element={
              <AskOfficer
                question={question}
                setQuestion={setQuestion}
                handleAsk={handleAsk}
                answer={answer}
              />
            }
          />
          <Route path="*" element={<Home dashboard={dashboard} history={history} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

