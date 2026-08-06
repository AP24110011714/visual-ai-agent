import { saveAs } from "file-saver";

function ExportButtons({ activities }) {

  const exportCSV = () => {

    const rows = [
      [
        "Title",
        "URL",
        "Timestamp",
        "OCR Text",
        "AI Summary"
      ]
    ];

    activities.forEach((item) => {

      rows.push([
        item.title,
        item.url,
        item.timestamp,
        item.ocr_text,
        item.ai_summary
      ]);

    });

    const csv = rows
      .map((row) =>
        row.map((col) => `"${String(col || "").replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;"
    });

    saveAs(blob, "visual-ai-report.csv");
  };

  return (
    <div className="export-buttons">

      <button onClick={exportCSV}>
        Export CSV
      </button>

    </div>
  );
}

export default ExportButtons;