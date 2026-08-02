import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Scatter
} from "recharts";

function HealthTimelineChart({ data, onPointSelect, healthyLabel, diseasedLabel }) {
  const chartData = data.map((item) => ({
    ...item,
    dateLabel: item.date ? new Date(item.date).toLocaleDateString() : "",
    confidence: Number(item.confidence) || 0,
    isHealthy: item.disease?.toLowerCase().includes("healthy")
  }));

  return (
    <div className="card timelineChartCard">
      <h3>{healthyLabel && diseasedLabel ? "" : "Confidence Timeline"}</h3>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateLabel" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
          <Tooltip
            formatter={(value) => `${value}%`}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="confidence"
            stroke="#2e7d32"
            strokeWidth={3}
            dot={false}
          />
          <Scatter
            data={chartData}
            fill="#2e7d32"
            onClick={(data) => {
              if (data && data.payload) {
                onPointSelect(data.payload);
              }
            }}
            shape={(props) => {
              const fill = props.payload.isHealthy ? "#4caf50" : "#d32f2f";
              return (
                <circle
                  cx={props.cx}
                  cy={props.cy}
                  r={6}
                  fill={fill}
                  stroke="#ffffff"
                  strokeWidth={1.5}
                />
              );
            }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="legendRow">
        <div className="legendItem">
          <span className="legendBullet healthy" /> {healthyLabel || "Healthy"}
        </div>
        <div className="legendItem">
          <span className="legendBullet diseased" /> {diseasedLabel || "Diseased"}
        </div>
      </div>
    </div>
  );
}

export default HealthTimelineChart;
