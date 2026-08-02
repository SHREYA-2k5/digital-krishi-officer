import React from "react";
import { useTranslation } from "react-i18next";

function DetectDisease({
  image,
  preview,
  translatedResult,
  loading,
  handleImage,
  handleUpload,
  startListening,
  farmerProblem,
  voiceDiagnosis,
  language,
  selectedCrop,
  setSelectedCrop,
  downloadPredictionPDF
}) {
  const { t } = useTranslation();

  return (
    <div className="card">
      <h2>{t("detectDisease.title")}</h2>

      <label className="cropSelectLabel">{t("detectDisease.cropLabel")}</label>
      <select
        className="cropSelect"
        value={selectedCrop}
        onChange={(e) => setSelectedCrop(e.target.value)}
      >
        {['Tomato', 'Potato', 'Rice', 'Cotton'].map((crop) => (
          <option key={crop} value={crop}>{crop}</option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImage}
      />

      {preview && <img src={preview} alt="preview" className="preview" />}

      <button onClick={handleUpload}>{t("detectDisease.uploadButton")}</button>

      <div className="voiceBox">
        <h2>{t("detectDisease.voiceTitle")}</h2>

        <button onClick={startListening}>{t("detectDisease.speakButton")}</button>

        {farmerProblem && (
          <div className="voiceResult">
            <h3>{t("detectDisease.farmerSaid")}</h3>
            <p>{farmerProblem}</p>
          </div>
        )}

        {voiceDiagnosis && (
          <div className="voiceDiagnosis">
            <h3>{t("detectDisease.aiSuggestion")}</h3>
            <p>{voiceDiagnosis}</p>
          </div>
        )}
      </div>

      <div className="card">
        <h2>{t("detectDisease.resultsTitle")}</h2>

        {loading ? (
          <p>{t("detectDisease.analyzing")}</p>
        ) : translatedResult ? (
          <div className="resultBox">
            <h3>{t("detectDisease.diseaseLabel")}</h3>
            <h1>{translatedResult.disease}</h1>

            <div className="confidenceRow">
              <div>
                <h3>{t("detectDisease.confidenceLabel")}</h3>
                <h1>{translatedResult.confidence}%</h1>
              </div>
              <div className="confidenceMeter">
                <div
                  className="confidenceFill"
                  style={{ width: `${translatedResult.confidence}%` }}
                />
              </div>
            </div>

            <h3>{t("detectDisease.weatherLabel")}</h3>
            <p>{translatedResult.weather}</p>

            <button className="pdfButton" type="button" onClick={downloadPredictionPDF}>
              {t("detectDisease.pdfButton")}
            </button>
          </div>
        ) : (
          <div className="empty">{t("detectDisease.emptyState")}</div>
        )}
      </div>
    </div>
  );
}

export default DetectDisease;