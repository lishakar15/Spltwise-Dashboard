import { Card, CardContent, Typography, Button } from "@mui/material";
import React from "react";

const GroupBar = () => {
  const handleCreateGroup = () => {};
  return (
    <Card sx={{ my: 2, border: "1px solid #e5e7eb" }}>
      <CardContent
        sx={{
          mx: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ color: "black" }}>
          Groups
        </Typography>
        <Button
          variant="contained"
          onClick={handleCreateGroup}
          sx={{
            textTransform: "none",
            bgcolor: "#4338ca",
            ml: 2,
          }}
        >
          + New Group
        </Button>
      </CardContent>
    </Card>
  );
};

export default GroupBar;
