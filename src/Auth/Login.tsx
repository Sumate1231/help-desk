import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
} from "@mui/material";
import HandymanIcon from "@mui/icons-material/Handyman";
import { json, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import axios from "axios";
import CustomBackdrop from "../components/Dialog/CustomBackdrop";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthWithBranch from "../Types/auth/authType";
import { type } from "os";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PersonIcon from '@mui/icons-material/Person';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        แจ้งซ่อม
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const servers = [
  {
    value: "1",
    label: "UBON1, ศิริมหาชัย (โฮมวัน)",
  },
  {
    value: "2",
    label: "TRADING, บริษัท ศิริมหาชัย เทรดดิ้ง จำกัด",
  },
  {
    value: "3",
    label: "PGL, บริษัท พีจีเอล เทรดดิ้ง จำกัด",
  },
  {
    value: "4",
    label: "KCV, บริษัท เคซีวี จำกัด",
  },
  {
    value: "0",
    label: "UBONTEST, ทดสอบระบบ",
  },
];

type AuthType = {
  username: string;
  password: string;
  db_code: string;
};

export default function Login() {
  const { register, handleSubmit, control, reset } = useForm<AuthType>();
  const [error, setError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<AuthType> = (data) => {
    const authItem = new FormData();
    authItem.append("db_code", data.db_code);
    authItem.append("username", data.username);
    authItem.append("password", data.password);

    if (authItem != null) {
      setLoading(true);
      setDisabled(true);
      // <CustomBackdrop open={open}/>

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      axios
        .post(`https://localhost:44348/api/auth`, authItem, config)
        .then((response) => {
          const resStatus = response.status;
          switch (resStatus) {
            case 200:
              setLoading(false);
              setDisabled(false);
              const change_branch_code = response.data.change_branch_code;
              switch (change_branch_code) {
                case "0":
                  localStorage.setItem("user", JSON.stringify(response.data));
                  const branchItem = response.data;
                  const authItem: AuthWithBranch = {
                    branch_code: branchItem.branch_code,
                    branch_name: branchItem.branch_name,
                    is_auth: true,
                  };
                  localStorage.setItem("auth", JSON.stringify(authItem));
                  navigate("/home");
                  break;
                case "1":
                  localStorage.setItem("user", JSON.stringify(response.data));
                  navigate("/branch");
                  break;
              }
              break;
          }
        })
        .catch((error) => {
          // setOpen(false);
          setLoading(false);
          setDisabled(false);
          const resStatus = error.response;
          setError(resStatus.data.statusMessage);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 2 ,fontWeight:'bold'}}>
          HRMS
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 2 }}
        >
          <TextField
            id="db_code"
            select
            required
            fullWidth
            label="เลือกฐานข้อมูล"
            {...register("db_code")}
            defaultValue={"1"}
            autoFocus
            disabled={disabled}
          >
            {servers.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Controller
            name={"username"}
            control={control}
            defaultValue=""
            rules={{
              required: "กรุณาระบุชื่อผู้ใช้งาน",
            }}
            render={({ field, fieldState: { error } }) => {
              return (
                <FormControl
                  disabled={disabled}
                  fullWidth
                  required
                  margin="normal"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    ชื่อผู้ใช้งาน
                  </InputLabel>
                  <OutlinedInput
                    {...field}
                    required
                    fullWidth
                    id="username"
                    label="ชื่อผู้ใช้งาน"
                    type="text"
                    error={error != null}
                  />
                  {error ? (
                    <FormHelperText sx={{ color: "red" }}>
                      {error.message}
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              );
            }}
          />
          <Controller
            name={"password"}
            control={control}
            defaultValue=""
            rules={{
              required: "กรุณาระบุรหัสผ่าน",
            }}
            render={({ field, fieldState: { error } }) => {
              return (
                <FormControl
                  disabled={disabled}
                  fullWidth
                  required
                  margin="normal"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    รหัสผ่าน
                  </InputLabel>
                  <OutlinedInput
                    {...field}
                    required
                    fullWidth
                    id="password"
                    label="รหัสผ่าน"
                    type={showPassword ? "text" : "password"}
                    error={error != null}
                    autoComplete="current-password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {error ? (
                    <FormHelperText sx={{ color: "red" }}>
                      {error.message}
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              );
            }}
          />

          {error && (
            <FormHelperText sx={{ color: "red" }}>{error}</FormHelperText>
          )}

          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<LockOpenIcon />}
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            <span>เข้าสู่ระบบ</span>
          </LoadingButton>
        </Box>
      </Box>
      <Copyright sx={{ mt: 3 }} />
    </Container>
  );
}
