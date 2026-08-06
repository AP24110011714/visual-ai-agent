import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

function ExportButton({ activities }) {

  const exportCSV = () => {

    const headers = [
      "Title",
      "URL",
      "Timestamp",
      "OCR Text"
    ];

    const rows = activities.map((item) => [

      item.title,

      item.url,

      item.timestamp,

      (item.ocr_text || "").replace(/\n/g, " ")

    ]);

    const csv = [

      headers.join(","),

      ...rows.map((row) =>
        row.map((value) => `"${value}"`).join(",")
      )

    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "browser_activities.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

  };

  return (

    <Button
      variant="contained"
      color="primary"
      size="large"
      startIcon={<DownloadIcon />}
      onClick={exportCSV}
      sx={{
        mb: 4,
        borderRadius: 2
      }}
    >
      Export Activities as CSV
    </Button>

  );

}

export default ExportButton;