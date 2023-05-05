import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CustomBreadcrumbs from "../components/Navigation/CustomBreadcrumbs";
// import Image from "mui-image";

const Profiles = () => {
  let user = JSON.parse(localStorage.getItem("user") as any);
  let authItem = JSON.parse(localStorage.getItem("auth") as any);


  return (
    <>
      <Container>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <h3>โปรไฟล์</h3>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ p: 0 }}>
            <Box display="flex" justifyContent="flex-end">
              <CustomBreadcrumbs name="โปรไฟล์" isActive={true} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Card elevation={3} sx={{ p: 2 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Avatar
                      alt="รูปส่วนตัว"
                      variant={"rounded"}
                      src={user.profile[0].path_image}
                      style={{
                        width: "24vh",
                        height: "38vh",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                      subheader="ข้อมูลผู้ใช้"
                    >
                      <ListItem>
                        <Typography sx={{ fontWeight: "bold", marginRight: 2 }}>
                          รหัสพนักงาน :
                        </Typography>
                        <ListItemText primary={user.profile[0].personCode} />
                      </ListItem>
                      <ListItem>
                        <Typography sx={{ fontWeight: "bold", marginRight: 2 }}>
                          ชื่อ-สกุล :
                        </Typography>
                        <ListItemText primary={user.profile[0].fullname} />
                      </ListItem>
                      <ListItem>
                        <Typography sx={{ fontWeight: "bold", marginRight: 2 }}>
                          ตำแหน่ง :
                        </Typography>
                        <ListItemText primary={user.profile[0].positionNameT} />
                      </ListItem>
                      <ListItem>
                        <Typography sx={{ fontWeight: "bold", marginRight: 2 }}>
                          แผนก :
                        </Typography>
                        <ListItemText primary={user.profile[0].cmb2NameT} />
                      </ListItem>
                      <ListItem>
                        <Typography sx={{ fontWeight: "bold", marginRight: 2 }}>
                          ฝ่าย :
                        </Typography>
                        <ListItemText primary={user.profile[0].cmb1NameT} />
                      </ListItem>
                      <ListItem>
                        <Typography sx={{ fontWeight: "bold", marginRight: 2 }}>
                          ผู้บังคับบัญชา :
                        </Typography>
                        <ListItemText
                          primary={user.profile[0].supervisorName}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                      subheader="ข้อมูลระบบ"
                    >
                      <ListItem>
                        <Typography sx={{ fontWeight: "bold", marginRight: 2 }}>
                          สาขา :
                        </Typography>
                        <ListItemText primary={authItem.branch_name} />
                      </ListItem>
                      <ListItem>
                        <Typography sx={{ fontWeight: "bold", marginRight: 2 }}>
                          Server :
                        </Typography>
                        <ListItemText primary={user.server_name} />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profiles;
