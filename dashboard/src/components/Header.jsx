import { Typography, Box } from "@mui/material";

function Header() {
  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #1565C0, #42A5F5)",
        color: "white",
        p: 4,
        borderRadius: 3,
        mb: 4,
        boxShadow: 3
      }}
    >
      <Typography variant="h3" fontWeight="bold">
        Visual AI Agent Dashboard
      </Typography>

      <Typography variant="h6" sx={{ mt: 1 }}>
        Monitor browser activity, screenshots, and OCR results in one place.
      </Typography>
    </Box>
  );
}

export default Header;