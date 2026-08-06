import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#8b5cf6",
  "#06b6d4"
];

function Charts({ activities }) {
  const categoryCounts = {};
  const productivityCounts = {
    High: 0,
    Medium: 0,
    Low: 0
  };

  activities.forEach((item) => {
    if (!item.ai_summary) return;

    try {
      const ai = JSON.parse(item.ai_summary);

      categoryCounts[ai.category] =
        (categoryCounts[ai.category] || 0) + 1;

      productivityCounts[ai.productivity] =
        (productivityCounts[ai.productivity] || 0) + 1;

    } catch {}
  });

  const pieData = Object.keys(categoryCounts).map((key) => ({
    name: key,
    value: categoryCounts[key]
  }));

  const barData = Object.keys(productivityCounts).map((key) => ({
    name: key,
    value: productivityCounts[key]
  }));

  return (
    <div className="charts">

      <div className="chart-card">

        <h2>Activity Categories</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>

      <div className="chart-card">

        <h2>Productivity</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="value"
              fill="#2563eb"
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Charts;