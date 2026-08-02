import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home({
  dashboard,
  history,
  filteredHistory,
  historyQuery,
  setHistoryQuery,
  historyFilter,
  setHistoryFilter,
  historyTrend
}) {
  const { t } = useTranslation();

  const filterOptions = [
    { value: "All", label: t("home.filters.all") },
    { value: "Healthy", label: t("home.filters.healthy") },
    { value: "Diseased", label: t("home.filters.diseased") },
    { value: "High Priority", label: t("home.filters.highPriority") }
  ];

  return (
    <div>
      <div className="hero">
        <h1>{t("home.heroTitle")}</h1>
        <p>{t("home.heroSubtitle")}</p>
        <div className="heroActions">
          <Link className="primaryButton" to="/timeline">
            {t("home.viewTimelineButton")}
          </Link>
        </div>
      </div>

      <div className="card">
        <h2>{t("home.dashboardTitle")}</h2>

        <div className="dashboardGrid">
          <div className="dashboardCard">
            <h3>{t("home.stats.totalPredictions")}</h3>
            <h1>{dashboard?.total_predictions || 0}</h1>
          </div>

          <div className="dashboardCard">
            <h3>{t("home.stats.healthyCrops")}</h3>
            <h1>{dashboard?.healthy_count || 0}</h1>
          </div>

          <div className="dashboardCard">
            <h3>{t("home.stats.diseasedCrops")}</h3>
            <h1>{dashboard?.diseased_count || 0}</h1>
          </div>

          <div className="dashboardCard">
            <h3>{t("home.stats.mostCommonDisease")}</h3>
            <h1>{dashboard?.most_common_disease || t("home.stats.none")}</h1>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>{t("home.trendsTitle")}</h2>

        {historyTrend?.length === 0 ? (
          <p>{t("home.noTrendData")}</p>
        ) : (
          <div className="trendChart">
            {historyTrend.map((item) => (
              <div key={item.name} className="trendRow">
                <div className="trendLabel">{item.name}</div>
                <div className="trendBarWrapper">
                  <div
                    className="trendBar"
                    style={{ width: `${Math.min(item.count * 12, 100)}%` }}
                  />
                </div>
                <div className="trendCount">{item.count}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h2>{t("home.historyTitle")}</h2>

        <div className="historyControls">
          <input
            className="searchInput"
            type="text"
            placeholder={t("home.searchPlaceholder")}
            value={historyQuery}
            onChange={(e) => setHistoryQuery(e.target.value)}
          />
          <div className="filterTabs">
            {filterOptions.map((filter) => (
              <button
                key={filter.value}
                className={
                  historyFilter === filter.value
                    ? "filterButton active"
                    : "filterButton"
                }
                onClick={() => setHistoryFilter(filter.value)}
                type="button"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {filteredHistory?.length === 0 ? (
          <p>{t("home.noHistory")}</p>
        ) : (
          filteredHistory.map((item, index) => (
            <div key={index} className="libraryCard">
              <h3>{item.disease}</h3>
              <p>{t("home.confidence")}: {item.confidence}%</p>
              <p>{t("home.priority")}: {item.priority}</p>
              {item.date && (
                <p className="timestamp">
                  {new Date(item.date).toLocaleDateString()} • {new Date(item.date).toLocaleTimeString()}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;