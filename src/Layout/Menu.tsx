import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useNavigate } from "react-router-dom";
import { NavLink as RouterLink } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Menu({ open, handleDrawerClose }: any) {
  const theme = useTheme();

  const navigate = useNavigate();

  const handlePath = (text: number) => {
    switch (text) {
      case 0:
        navigate("/home");
        break;
      case 1:
        navigate("/create");
        break;
      case 2:
        navigate("/report");
        break;
      case 3:
        navigate("/setting");
    }
  };

  function iconMenu(text: any) {
    switch (text) {
      case "หน้าหลัก":
        return <HomeIcon />;
      case "แจ้งซ่อม":
        return <AddBoxIcon />;
      case "รายงาน":
        return <AssessmentIcon />;
      case "ตั้งค่า":
        return <SettingsIcon />;
    }
  }

  const menu = [
    {
      title: "หน้าหลัก",
      path: "/home",
    },
    {
      title: "แจ้งซ่อม",
      Path: "/create",
    },
    {
      title: "รายงาน",
      Path: "/report",
    },
    {
      title: "ตั้งค่า",
      Path: "/setting",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      // PaperProps={{
      //   sx: {
      //     backgroundColor: "#11192A",
      //     color: "orange",
      //   },
      // }}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menu.map((i, index) => (
          <ListItem key={i.title} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => handlePath(index)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {iconMenu(i.title)}
              </ListItemIcon>
              <ListItemText
                sx={{
                  opacity: open ? 1 : 0,
                  "&.active": {
                    color: "text.primary",
                    bgcolor: "action.selected",
                    fontWeight: "fontWeightBold",
                  },
                }}
                primary={i.title}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
