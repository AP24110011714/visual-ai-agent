import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  TextField,
  Chip
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import ImageIcon from "@mui/icons-material/Image";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function App() {

  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadActivities();
    
  }, []);

  const loadActivities = async () => {
    const res = await axios.get("http://localhost:5000/activities");
    setActivities(res.data);
  };

  const filtered = activities.filter((item) => {

    return (
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.url?.toLowerCase().includes(search.toLowerCase()) ||
      item.ocr_text?.toLowerCase().includes(search.toLowerCase())
    );

  });

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: "#eef2f7",
        py: 5
      }}
    >

      <Container maxWidth="xl">

        <Typography
          variant="h3"
          fontWeight="bold"
          align="center"
          gutterBottom
        >
          Visual AI Agent Dashboard
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>

          <Grid item xs={12} md={4}>

            <Card>

              <CardContent>

                <Typography variant="h5">

                  {activities.length}

                </Typography>

                <Typography>

                  Total Activities

                </Typography>

              </CardContent>

            </Card>

          </Grid>

          <Grid item xs={12} md={4}>

            <Card>

              <CardContent>

                <Typography variant="h5">

                  {activities.filter(a=>a.screenshot).length}

                </Typography>

                <Typography>

                  Screenshots

                </Typography>

              </CardContent>

            </Card>

          </Grid>

          <Grid item xs={12} md={4}>

            <Card>

              <CardContent>

                <Typography variant="h5">

                  {activities.filter(a=>a.ocr_text).length}

                </Typography>

                <Typography>

                  OCR Records

                </Typography>

              </CardContent>

            </Card>

          </Grid>

        </Grid>

        <TextField

          fullWidth

          placeholder="Search by title, URL or OCR..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          InputProps={{
            startAdornment:<SearchIcon sx={{mr:1}}/>
          }}

          sx={{mb:4}}

        />

        <Grid container spacing={3}>

          {filtered.map((item)=>(

            <Grid item xs={12} key={item.id}>

              <Card
                sx={{
                  borderRadius:4
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
                    icon={<LanguageIcon/>}
                    label={item.url}
                    sx={{mb:2}}
                  />

                  <Typography sx={{mb:2}}>

                    <AccessTimeIcon
                      fontSize="small"
                      sx={{mr:1}}
                    />

                    {new Date(item.timestamp).toLocaleString()}

                  </Typography>

                  {item.screenshot && (

                    <Box
                      component="img"
                      src={
                        "http://localhost:5000/screenshots/" +
                        item.screenshot.split("\\").pop()
                      }
                      sx={{
                        width:"100%",
                        maxHeight:350,
                        objectFit:"contain",
                        borderRadius:3,
                        border:"1px solid #ddd",
                        mb:3
                      }}
                    />

                  )}

                  <Typography
                    variant="h6"
                    gutterBottom
                  >
                    OCR Text
                  </Typography>

                  <Card
                    variant="outlined"
                    sx={{
                      p:2,
                      background:"#fafafa"
                    }}
                  >

                    <Typography
                      sx={{
                        whiteSpace:"pre-wrap"
                      }}
                    >
                      {item.ocr_text || "No OCR available"}
                    </Typography>

                  </Card>

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>

      </Container>

    </Box>

  );

}

export default App;