import { useTranslation } from "react-i18next";

function PredictionDetailsPanel({ prediction }) {
  const { t } = useTranslation();

  if (!prediction) {
    return (
      <div className="card timelineDetailPanel emptyDetail">
        <h3>{t("timeline.selectPointTitle")}</h3>
        <p>{t("timeline.selectPointSubtitle")}</p>
      </div>
    );
  }

  const dateLabel = prediction.date
    ? new Date(prediction.date).toLocaleString()
    : t("timeline.dateUnavailable");

  return (
    <div className="card timelineDetailPanel">
      <h3>{t("timeline.detailsTitle")}</h3>
      <p>
        <strong>{t("timeline.dateLabel")}:</strong> {dateLabel}
      </p>
      <p>
        <strong>{t("timeline.cropLabel")}:</strong> {prediction.crop || t("timeline.unknownCrop")}
      </p>
      <p>
        <strong>{t("timeline.diseaseLabel")}:</strong> {prediction.disease}
      </p>
      <p>
        <strong>{t("timeline.confidenceLabel")}:</strong> {prediction.confidence}%
      </p>
      <p>
        <strong>{t("timeline.weatherCondition")}</strong> {prediction.weather || t("timeline.weatherUnavailable")}
      </p>
      <div className="detailSection">
        <strong>{t("timeline.recommendationLabel")}:</strong>
        <p>{prediction.solution || t("timeline.noRecommendation")}</p>
      </div>
    </div>
  );
}

export default PredictionDetailsPanel;
