import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Divider
} from "@mui/material";

import LanguageIcon from "@mui/icons-material/Language";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

function ActivityCard({ item }) {

  const imageName = item.screenshot
    ? item.screenshot.split("\\").pop()
    : "";

  return (

    <Card
      elevation={4}
      sx={{
        mb: 4,
        borderRadius: 3
      }}
    >

      <CardContent>

        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
        >
          {item.title}
        </Typography>

        <Chip
          icon={<LanguageIcon />}
          label={item.url}
          clickable
          component="a"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            mb: 2,
            maxWidth: "100%"
          }}
        />

        <Typography
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2
          }}
        >
          <AccessTimeIcon sx={{ mr: 1 }} />

          {new Date(item.timestamp).toLocaleString()}
        </Typography>

        {item.screenshot && (

          <Box
            component="img"
            src={`http://localhost:5000/screenshots/${imageName}`}
            alt="Screenshot"
            sx={{
              width: "100%",
              borderRadius: 2,
              border: "1px solid #ddd",
              maxHeight: 450,
              objectFit: "contain",
              mb: 3
            }}
          />

        )}

        <Divider sx={{ mb: 2 }} />

        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2
          }}
        >
          <TextSnippetIcon sx={{ mr: 1 }} />

          OCR Text
        </Typography>

        <Box
          sx={{
            background: "#f5f5f5",
            borderRadius: 2,
            p: 2,
            border: "1px solid #ddd"
          }}
        >

          <Typography
            sx={{
              whiteSpace: "pre-wrap",
              fontFamily: "monospace"
            }}
          >
            {item.ocr_text || "No OCR text available."}
          </Typography>

        </Box>

      </CardContent>

    </Card>

  );

}

export default ActivityCard;