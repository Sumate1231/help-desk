import CustomBreadcrumbs from "../components/Navigation/CustomBreadcrumbs";
import { Box, Container, Grid } from "@mui/material";

export default function ReportHelpDesk() {

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} direction="row" alignItems="center">
        <Grid item xs={6} justifyContent="flex-end">
          <h3>รายงาน</h3>
        </Grid>
        <Grid item xs={6} direction="row" justifyContent="flex-end">
          <Box display="flex" justifyContent="flex-end">
            <CustomBreadcrumbs name="รายงาน" isActive={true} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
