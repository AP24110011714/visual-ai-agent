import {
  TextField,
  InputAdornment
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ search, setSearch }) {

  return (

    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search by title, URL or OCR text..."

      value={search}

      onChange={(e) => setSearch(e.target.value)}

      sx={{
        mb: 4,
        backgroundColor: "white",
        borderRadius: 2
      }}

      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="primary" />
          </InputAdornment>
        )
      }}
    />

  );

}

export default SearchBar;