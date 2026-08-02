import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import HealthTimelineChart from "../components/HealthTimelineChart";
import PredictionDetailsPanel from "../components/PredictionDetailsPanel";

function CropTimeline({ history }) {
  const { t } = useTranslation();
  const [selectedCrop, setSelectedCrop] = useState(t("timeline.filters.allCrops"));
  const [selectedPrediction, setSelectedPrediction] = useState(null);

  const groupedHistory = useMemo(() => {
    return history.reduce((acc, item) => {
      const crop = item.crop || t("timeline.unknownCrop");
      const normalizedCrop = crop || t("timeline.unknownCrop");
      acc[normalizedCrop] = acc[normalizedCrop] || [];
      acc[normalizedCrop].push(item);
      return acc;
    }, {});
  }, [history, t]);

  const cropOptions = useMemo(() => {
    return [t("timeline.filters.allCrops"), ...Object.keys(groupedHistory)];
  }, [groupedHistory, t]);

  const sortedHistory = useMemo(() => {
    return [...history].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [history]);

  const selectedHistory = useMemo(() => {
    if (selectedCrop === t("timeline.filters.allCrops")) {
      return sortedHistory;
    }
    return [...(groupedHistory[selectedCrop] || [])].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [groupedHistory, selectedCrop, sortedHistory, t]);

  const stats = useMemo(() => {
    const total = selectedHistory.length;
    const healthy = selectedHistory.filter((item) =>
      item.disease?.toLowerCase().includes("healthy")
    ).length;
    const diseased = total - healthy;
    const diseaseCounts = selectedHistory.reduce((counts, item) => {
      const disease = item.disease || t("timeline.stats.unknownDisease");
      counts[disease] = (counts[disease] || 0) + 1;
      return counts;
    }, {});

    const mostCommonDisease = Object.keys(diseaseCounts).reduce(
      (best, disease) => {
        if (!best || diseaseCounts[disease] > diseaseCounts[best]) {
          return disease;
        }
        return best;
      },
      null
    ) || t("timeline.stats.none");

    return {
      total,
      healthy,
      diseased,
      mostCommonDisease
    };
  }, [selectedHistory, t]);

  const chartData = useMemo(() => {
    return selectedHistory.map((item) => ({
      ...item,
      dateLabel: item.date ? new Date(item.date).toLocaleDateString() : "",
      confidence: Number(item.confidence) || 0,
      isHealthy: item.disease?.toLowerCase().includes("healthy")
    }));
  }, [selectedHistory]);

  return (
    <div>
      <div className="card">
        <h2>{t("timeline.title")}</h2>
        <p>{t("timeline.subtitle")}</p>

        <div className="timelineControls">
          <label className="timelineSelectLabel">{t("timeline.cropLabel")}</label>
          <select
            className="timelineSelect"
            value={selectedCrop}
            onChange={(e) => {
              setSelectedCrop(e.target.value);
              setSelectedPrediction(null);
            }}
          >
            {cropOptions.map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div>

        <div className="cropGroupCards">
          {Object.entries(groupedHistory).map(([crop, items]) => (
            <div key={crop} className="cropGroupCard">
              <h4>{crop}</h4>
              <p>{items.length} {t("timeline.entries")}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="statsGrid">
        <div className="dashboardCard">
          <h3>{t("timeline.stats.totalScans")}</h3>
          <h1>{stats.total}</h1>
        </div>
        <div className="dashboardCard">
          <h3>{t("timeline.stats.healthyScans")}</h3>
          <h1>{stats.healthy}</h1>
        </div>
        <div className="dashboardCard">
          <h3>{t("timeline.stats.diseasedScans")}</h3>
          <h1>{stats.diseased}</h1>
        </div>
        <div className="dashboardCard">
          <h3>{t("timeline.stats.mostCommonDisease")}</h3>
          <h1>{stats.mostCommonDisease}</h1>
        </div>
      </div>

      <HealthTimelineChart
        data={chartData}
        onPointSelect={setSelectedPrediction}
        healthyLabel={t("timeline.healthy")}
        diseasedLabel={t("timeline.diseased")}
      />

      <div className="timelineContent">
        <div className="timelineList">
          <h3>{t("timeline.historyTitle")}</h3>
          {selectedHistory.length === 0 ? (
            <p>{t("timeline.noHistory")}</p>
          ) : (
            selectedHistory.map((item, index) => {
              const isActive = selectedPrediction === item;
              const dateLabel = item.date
                ? new Date(item.date).toLocaleDateString()
                : t("timeline.dateUnavailable");
              return (
                <button
                  key={`${item.date}-${index}`}
                  type="button"
                  className={`timelineRow ${isActive ? "active" : ""}`}
                  onClick={() => setSelectedPrediction(item)}
                >
                  <div>
                    <h4>{item.disease}</h4>
                    <p>{dateLabel}</p>
                  </div>
                  <div className="rowMeta">
                    <span>{t("timeline.confidenceLabel")} {item.confidence}%</span>
                    <span>{item.weather || t("timeline.weatherUnavailable")}</span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        <PredictionDetailsPanel prediction={selectedPrediction} />
      </div>
    </div>
  );
}

export default CropTimeline;
