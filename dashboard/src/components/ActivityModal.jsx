import "./ActivityModal.css";

function ActivityModal({ activity, onClose }) {
  if (!activity) return null;

  let ai = null;

  try {
    ai = JSON.parse(activity.ai_summary);
  } catch {}

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✖
        </button>

        <h2>{activity.title}</h2>

        <p>
          <strong>URL:</strong><br />
          <a
            href={activity.url}
            target="_blank"
            rel="noreferrer"
          >
            {activity.url}
          </a>
        </p>

        <p>
          <strong>Time:</strong><br />
          {new Date(activity.timestamp).toLocaleString()}
        </p>

        {activity.screenshot && (

          <img
            src={
              "http://localhost:5000/screenshots/" +
              activity.screenshot.split("\\").pop()
            }
            alt=""
            className="modal-image"
          />

        )}

        <h3>OCR Text</h3>

        <pre>{activity.ocr_text}</pre>

        {ai && (

          <div className="modal-ai">

            <h3>AI Analysis</h3>

            <p><b>Activity:</b> {ai.activity}</p>

            <p><b>Category:</b> {ai.category}</p>

            <p><b>Productivity:</b> {ai.productivity}</p>

            <p><b>Summary:</b> {ai.summary}</p>

            <p>
              <b>Keywords:</b> {ai.keywords.join(", ")}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default ActivityModal;