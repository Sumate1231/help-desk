import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "50vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

export const Page404 = () => (
  <Grid>
    <Container>
      <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Typography
          variant="h4"
          paragraph
        >
          Sorry, page not found!
        </Typography>

        <Typography sx={{ color: "text.secondary" }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>

        <Box
          component="img"
          src="/assets/illustrations/illustration_404.svg"
          sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
        />

        <Link to="/home">
          <Button size="large" variant="contained">
            Go to Home
          </Button>
        </Link>
      </StyledContent>
    </Container>
  </Grid>
);
