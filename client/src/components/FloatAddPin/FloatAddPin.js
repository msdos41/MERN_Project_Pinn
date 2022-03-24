import React from "react";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function FloatAddPin() {

  const handleClick = () => {
    console.log("Fab click");
  };
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab color='primary' aria-label='add' onClick={handleClick}>
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default FloatAddPin;
