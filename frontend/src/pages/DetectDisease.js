 import React from "react";

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
  return (
    <div className="card">

      <h2>📤 Upload Leaf Image</h2>

      <label className="cropSelectLabel">Crop</label>
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

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="preview"
        />
      )}

      <button onClick={handleUpload}>
        Predict Disease
      </button>

      <div className="voiceBox">

        <h2>🎤 Farmer Voice Input</h2>

        <button onClick={startListening}>
          Speak Your Problem
        </button>

        {farmerProblem && (
          <div className="voiceResult">
            <h3>📝 Farmer Said:</h3>
            <p>{farmerProblem}</p>
          </div>
        )}

        {voiceDiagnosis && (
          <div className="voiceDiagnosis">
            <h3>🤖 AI Suggestion:</h3>
            <p>{voiceDiagnosis}</p>
          </div>
        )}

      </div>

      <div className="card">

        <h2>📊 Prediction Results</h2>

        {loading ? (
          <p>🔎 Analyzing Crop Image...</p>
        ) : translatedResult ? (
          <div className="resultBox">

            <h3>🍃 Disease</h3>
            <h1>{translatedResult.disease}</h1>

            <div className="confidenceRow">
              <div>
                <h3>📈 Confidence</h3>
                <h1>{translatedResult.confidence}%</h1>
              </div>
              <div className="confidenceMeter">
                <div
                  className="confidenceFill"
                  style={{ width: `${translatedResult.confidence}%` }}
                />
              </div>
            </div>

            <h3>🌦 Weather Advisory</h3>
            <p>{translatedResult.weather}</p>

            <button
              className="pdfButton"
              type="button"
              onClick={downloadPredictionPDF}
            >
              Download PDF Report
            </button>

          </div>
        ) : (
          <div className="empty">
            Upload image to see AI prediction
          </div>
        )}

      </div>

    </div>
  );
}

export default DetectDisease;