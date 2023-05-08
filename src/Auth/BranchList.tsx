import * as React from "react";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListSubheader,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import AuthWithBranch from "../Types/auth/authType";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BranchList() {
  // const location = useLocation();
  // const data = location.state;
  let navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") as any);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: string,
    name: string
  ) => {
    const authItem: AuthWithBranch = {
      branch_code: index,
      branch_name: name,
      is_auth: true,
    };

    const auth = localStorage.getItem("auth");
    if (auth) {
      localStorage.removeItem("auth");
    }

    localStorage.setItem("auth", JSON.stringify(authItem));
    navigate("/home");
  };

  return (
    <Container maxWidth="lg">
      <Grid
        justifyContent="center"
        alignItems="center"
        display="flex"
        sx={{ mt: 5 }}
      >
        <Card sx={{ minWidth: 450 ,p: 2}} elevation={3}>
          <CardContent>
            <Typography variant="h6" color="#3A70CE">เลือกสาขา</Typography>
            <List
              component="nav"
              // subheader={
              //   <ListSubheader sx={{ fontSize: 16 }}>เลือกสาขา</ListSubheader>
              // }
            >
              {user.branch_list &&
                user.branch_list.map((item: any) => (
                  <ListItemButton
                    key={item.branchCode}
                    // selected={selectedIndex === 0}
                    onClick={(event) =>
                      handleListItemClick(
                        event,
                        item.branchCode,
                        item.branchName
                      )
                    }
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.branchName}
                      secondary={item.branchCode}
                    />
                    <ListItemIcon>
                      <KeyboardArrowLeftIcon />
                    </ListItemIcon>
                  </ListItemButton>
                ))}
            </List>
            <Button
              sx={{ mt: 2 }}
              fullWidth
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => {
                navigate(-1);
              }}
            >
              ย้อนกลับ
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}
