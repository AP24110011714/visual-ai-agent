import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./App.css";
import Charts from "./components/Charts";
import ExportButtons from "./components/ExportButtons";
import ActivityModal from "./components/ActivityModal";

function App() {
  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [productivityFilter, setProductivityFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [selectedActivity, setSelectedActivity] = useState(null);

  const loadActivities = async () => {
    try {
      const response = await axios.get("http://localhost:5000/activities");
      setActivities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadActivities();

    const interval = setInterval(loadActivities, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredActivities = useMemo(() => {
    return [...activities]
      .filter((item) => {
        let ai = null;

        try {
          ai = JSON.parse(item.ai_summary);
        } catch {}

        const searchMatch =
          item.title?.toLowerCase().includes(search.toLowerCase()) ||
          item.url?.toLowerCase().includes(search.toLowerCase()) ||
          item.ocr_text?.toLowerCase().includes(search.toLowerCase());

        const categoryMatch =
          categoryFilter === "All" ||
          (ai && ai.category === categoryFilter);

        const productivityMatch =
          productivityFilter === "All" ||
          (ai && ai.productivity === productivityFilter);

        return searchMatch && categoryMatch && productivityMatch;
      })
      .sort((a, b) => {
        if (sortOrder === "Newest") {
          return new Date(b.timestamp) - new Date(a.timestamp);
        } else {
          return new Date(a.timestamp) - new Date(b.timestamp);
        }
      });
  }, [
    activities,
    search,
    categoryFilter,
    productivityFilter,
    sortOrder
  ]);

  const totalActivities = activities.length;
  const totalScreenshots = activities.filter((a) => a.screenshot).length;
  const totalAI = activities.filter((a) => a.ai_summary).length;

  const highProductivity = activities.filter((a) => {
    try {
      return JSON.parse(a.ai_summary)?.productivity === "High";
    } catch {
      return false;
    }
  }).length;

  return (
    <div className="app">

      <header className="header">
        <h1>Visual AI Agent Dashboard</h1>
        <p>Browser Activity Monitoring using OCR & AI</p>
      </header>

      <div className="stats">

        <div className="stat-card">
          <h2>{totalActivities}</h2>
          <p>Total Activities</p>
        </div>

        <div className="stat-card">
          <h2>{totalScreenshots}</h2>
          <p>Screenshots</p>
        </div>

        <div className="stat-card">
          <h2>{totalAI}</h2>
          <p>AI Analysed</p>
        </div>

        <div className="stat-card">
          <h2>{highProductivity}</h2>
          <p>High Productivity</p>
        </div>

      </div>

      <Charts activities={activities} />

      <ExportButtons activities={activities} />

      <div className="filters">

        <input
          type="text"
          placeholder="Search title, URL or OCR..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Learning">Learning</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Communication">Communication</option>
          <option value="Development">Development</option>
          <option value="Professional">Professional</option>
          <option value="Search Engine">Search Engine</option>
        </select>

        <select
          value={productivityFilter}
          onChange={(e) => setProductivityFilter(e.target.value)}
        >
          <option value="All">All Productivity</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>

      </div>

      {filteredActivities.length === 0 ? (
        <div className="empty">
          <h3>No matching activities found.</h3>
        </div>
      ) : (
        filteredActivities.map((item) => {
          let ai = null;

          try {
            ai = JSON.parse(item.ai_summary);
          } catch {}

          return (
<div
  className="activity-card"
  key={item.id}
  onClick={() => setSelectedActivity(item)}
  style={{ cursor: "pointer" }}
>
              <div className="activity-header">

                <div>
                  <h2>{item.title}</h2>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="url"
                  >
                    {item.url}
                  </a>
                </div>

                <span>
                  {new Date(item.timestamp).toLocaleString()}
                </span>

              </div>

              {item.screenshot && (
                <img
                  className="screenshot"
                  src={
                    "http://localhost:5000/screenshots/" +
                    item.screenshot.split("\\").pop()
                  }
                  alt="Screenshot"
                />
              )}

              <div className="ocr">
                <h3>OCR Text</h3>
                <pre>{item.ocr_text || "No OCR Available"}</pre>
              </div>

              {ai && (
                <div className="ai-box">

                  <h3>AI Analysis</h3>

                  <p><strong>Activity:</strong> {ai.activity}</p>
                  <p><strong>Category:</strong> {ai.category}</p>
                  <p><strong>Productivity:</strong> {ai.productivity}</p>
                  <p><strong>Summary:</strong> {ai.summary}</p>
                  <p>
                    <strong>Keywords:</strong> {ai.keywords.join(", ")}
                  </p>

                </div>
              )}

            </div>
          );
        })
      )}

<ActivityModal
  activity={selectedActivity}
  onClose={() => setSelectedActivity(null)}
/>
    </div>
  );
}

export default App;