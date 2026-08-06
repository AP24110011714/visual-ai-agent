import {
  Grid,
  Card,
  CardContent,
  Typography
} from "@mui/material";

import LanguageIcon from "@mui/icons-material/Language";
import ImageIcon from "@mui/icons-material/Image";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

function StatsCards({ activities }) {

  const totalActivities = activities.length;

  const totalScreenshots = activities.filter(
    (a) => a.screenshot
  ).length;

  const totalOCR = activities.filter(
    (a) => a.ocr_text
  ).length;

  return (

    <Grid container spacing={3} sx={{ mb: 4 }}>

      <Grid item xs={12} md={4}>

        <Card
          sx={{
            bgcolor: "#1976d2",
            color: "white",
            borderRadius: 3
          }}
        >

          <CardContent>

            <LanguageIcon sx={{ fontSize: 40 }} />

            <Typography variant="h4" fontWeight="bold">

              {totalActivities}

            </Typography>

            <Typography>

              Total Activities

            </Typography>

          </CardContent>

        </Card>

      </Grid>

      <Grid item xs={12} md={4}>

        <Card
          sx={{
            bgcolor: "#2e7d32",
            color: "white",
            borderRadius: 3
          }}
        >

          <CardContent>

            <ImageIcon sx={{ fontSize: 40 }} />

            <Typography variant="h4" fontWeight="bold">

              {totalScreenshots}

            </Typography>

            <Typography>

              Screenshots

            </Typography>

          </CardContent>

        </Card>

      </Grid>

      <Grid item xs={12} md={4}>

        <Card
          sx={{
            bgcolor: "#ed6c02",
            color: "white",
            borderRadius: 3
          }}
        >

          <CardContent>

            <TextSnippetIcon sx={{ fontSize: 40 }} />

            <Typography variant="h4" fontWeight="bold">

              {totalOCR}

            </Typography>

            <Typography>

              OCR Records

            </Typography>

          </CardContent>

        </Card>

      </Grid>

    </Grid>

  );

}

export default StatsCards;