import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        component={"div"}
      >
        <Typography varient="h5">Subramanian.J-School Management System</Typography>

        <Typography varient="p">CopyRight@2025</Typography>
      </Box>
    </>
  );
}
