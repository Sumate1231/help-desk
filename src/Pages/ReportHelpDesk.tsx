import { LoadingButton } from "@mui/lab";
import CustomDatePicker from "../components/DatePicker/CustomDatePicker";
import CustomDateRangePicker from "../components/DatePicker/CustomDateRangePicker";
import CustomBreadcrumbs from "../components/Navigation/CustomBreadcrumbs";
import { Box, Container, Grid, Stack } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import GridList from "../components/CustomDatagrid/GridList";

export default function ReportHelpDesk() {
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2} direction="row" alignItems="center">
          <Grid item xs={12} sm={6} justifyContent="flex-end">
            <h3>รายงาน</h3>
          </Grid>
          <Grid item xs={12} sm={6} direction="row" justifyContent="flex-end">
            <Box display="flex" justifyContent="flex-end">
              <CustomBreadcrumbs name="รายงาน" isActive={true} />
            </Box>
          </Grid>
          <Grid sx={{ mt: 1 }} item xs={12}>
            <Stack
              spacing={2}
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
            >
              <CustomDateRangePicker />
              <LoadingButton
                loading={loading}
                loadingPosition="start"
                startIcon={<SearchIcon />}
                variant="contained"
                type="submit"
                sx={{ mt: 3, mb: 2 }}
              >
                <span>ค้นหา</span>
              </LoadingButton>
            </Stack>
            <Box sx={{ mt: 2 }}>
              <GridList />
            </Box>
            {/* <CustomDatePicker name="จากวันที่" />
            <CustomDatePicker name="ถึงวันที่" /> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
