import CustomBreadcrumbs from "../components/Navigation/CustomBreadcrumbs";
import { Box, Container, Grid } from "@mui/material";

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <h3>หน้าหลัก</h3>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            <CustomBreadcrumbs name="หน้าหลัก" isActive={false} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
