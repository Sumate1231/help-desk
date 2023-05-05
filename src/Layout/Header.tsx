import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Badge, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { AccountCircle, Logout } from "@mui/icons-material";
import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InboxIcon from "@mui/icons-material/Inbox";
import StorageIcon from "@mui/icons-material/Storage";

const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function Header({ open, handleDrawerOpen }: any) {
  // const location = useLocation();
  // const branch = location.state;

  let user = JSON.parse(localStorage.getItem("user") as any);
  let authItem = JSON.parse(localStorage.getItem("auth") as any);

  console.log(user.profile[0].path_image);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  let navigate = useNavigate();

  const handleClose = (text: string) => {
    switch (text) {
      case "ออกจากระบบ":
        localStorage.removeItem("user");
        localStorage.removeItem("auth");
        navigate("/login");
        break;
      case "branch":
        if (user.change_branch_code === "1") {
          navigate("/branch");
        }
        setAnchorEl(null);

        break;
        case "profiles":
          navigate("/profiles")
          break;
    }
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" open={open} >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          แจ้งซ่อม
        </Typography>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleMenu}
          >
            {/* <AccountCircle /> */}
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt="รูปส่วนตัว" src={user.profile[0].path_image} />
            </StyledBadge>
            <Typography sx={{marginLeft: 1}}>{user.profile[0].fullname}</Typography>
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleClose("profiles")}>
              <ListItemIcon>
              <AccountCircle fontSize="small" />
              </ListItemIcon>
              โปรไฟล์
            </MenuItem>
            <MenuItem onClick={() => handleClose("")}>
              <ListItemIcon>
                <StorageIcon fontSize="small" />
              </ListItemIcon>
              {user.server_name}
            </MenuItem>
            {authItem && (
              <MenuItem onClick={() => handleClose("branch")}>
                <ListItemIcon>
                  <InboxIcon fontSize="small" />
                </ListItemIcon>
                {authItem.branch_name}
              </MenuItem>
            )}
            <Divider/>
            <MenuItem onClick={() => handleClose("ออกจากระบบ")}>
              <ListItemIcon>
                <Logout   fontSize="small" />
              </ListItemIcon>
              ออกจากระบบ
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
