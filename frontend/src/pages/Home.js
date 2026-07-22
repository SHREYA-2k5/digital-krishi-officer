 import React from "react";

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

  return (

    <div>

      {/* HERO */}

      <div className="hero">

        <h1>
          AI Powered Crop Disease Detection
        </h1>

        <p>
          Upload crop leaf images and get instant AI-powered disease prediction with multilingual farming solutions.
        </p>

      </div>

      {/* DASHBOARD */}

      <div className="card">

        <h2>📊 Analytics Dashboard</h2>

        <div className="dashboardGrid">

          <div className="dashboardCard">
            <h3>Total Predictions</h3>
            <h1>{dashboard?.total_predictions || 0}</h1>
          </div>

          <div className="dashboardCard">
            <h3>Healthy Crops</h3>
            <h1>{dashboard?.healthy_count || 0}</h1>
          </div>

          <div className="dashboardCard">
            <h3>Diseased Crops</h3>
            <h1>{dashboard?.diseased_count || 0}</h1>
          </div>

          <div className="dashboardCard">
            <h3>Most Common Disease</h3>
            <h1>{dashboard?.most_common_disease || "None"}</h1>
          </div>

        </div>

      </div>

      {/* TREND CHART */}

      <div className="card">

        <h2>📈 Prediction Trends</h2>

        {historyTrend?.length === 0 ? (
          <p>No trend data yet</p>
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

      {/* HISTORY */}

      <div className="card">

        <h2>📜 Prediction History</h2>

        <div className="historyControls">
          <input
            className="searchInput"
            type="text"
            placeholder="Search Disease..."
            value={historyQuery}
            onChange={(e) => setHistoryQuery(e.target.value)}
          />
          <div className="filterTabs">
            {['All', 'Healthy', 'Diseased', 'High Priority'].map((filter) => (
              <button
                key={filter}
                className={
                  historyFilter === filter
                    ? 'filterButton active'
                    : 'filterButton'
                }
                onClick={() => setHistoryFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {filteredHistory?.length === 0 ? (
          <p>No matching history</p>
        ) : (
          filteredHistory.map((item, index) => (
            <div
              key={index}
              className="libraryCard"
            >
              <h3>{item.disease}</h3>
              <p>Confidence: {item.confidence}%</p>
              <p>Priority: {item.priority}</p>
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