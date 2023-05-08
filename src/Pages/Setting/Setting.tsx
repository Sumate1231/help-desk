import { Box, Container, Grid } from "@mui/material";
import React from "react";
import CustomBreadcrumbs from "../../components/Navigation/CustomBreadcrumbs";

export const Setting = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <h3>ตั้งค่า</h3>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ p: 0 }}>
          <Box display="flex" justifyContent="flex-end">
            <CustomBreadcrumbs name="ตั้งค่า" isActive={true} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
