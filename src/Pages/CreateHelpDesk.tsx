import GridList from "../components/CustomDatagrid/GridList";
import CustomBreadcrumbs from "../components/Navigation/CustomBreadcrumbs";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from 'react-router-dom';

const CreateHelpDesk = () => (
  <Container maxWidth="lg">
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={6}>
        <h3>แจ้งซ่อม</h3>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ p: 0 }}>
        <Box display="flex" justifyContent="flex-end">
          <CustomBreadcrumbs name="แจ้งซ่อม" isActive={true} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          component={Link}
          to="/add"
          startIcon={<AddIcon />}
        >
          <Typography sx={{ fontWeight: "bold" }}>แจ้งซ่อม</Typography>
        </Button>
      </Grid>
      <Grid item xs={12}>
        <GridList />
      </Grid>
    </Grid>
  </Container>
);

export default CreateHelpDesk;
