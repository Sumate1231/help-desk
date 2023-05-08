import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import CustomBreadcrumbs from "../../components/Navigation/CustomBreadcrumbs";
import Stack from "@mui/material/Stack";
// import CustomDropzone from "../../components/Dialog/CustomDropzone";
import Dropzone, {
  ILayoutProps,
  Input,
  defaultClassNames,
} from "react-dropzone-uploader";
import { LoadingButton } from "@mui/lab";
import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm, SubmitHandler } from "react-hook-form";
import { CustomAutocomplete } from "../../components/Dialog/CustomAutocomplete";
import { CustomTextField } from "../../components/Dialog/CustomTextField";
import CustomFileUploader from "../../components/Dialog/CustomFileUploader";
import { type } from "os";
import axios from "axios";
import { error } from "console";
import CustomBackdrop from "../../components/Dialog/CustomBackdrop";

const Layout = ({
  input,
  previews,
  submitButton,
  dropzoneProps,
  files,
  extra: { maxFiles },
}: ILayoutProps) => {
  return (
    <div>
      {previews}

      <div {...dropzoneProps}>{files.length < maxFiles && input}</div>

      {files.length > 0 && submitButton}
    </div>
  );
};

const handleSubmit = (files: any, allFiles: any) => {
  console.log(files.map((f: any) => f.meta));
  allFiles.forEach((f: any) => f.remove());
};

type Inputs = {
  cate_code: string;
  type_code: string;
  asset_code: string;
  location_asset: string;
  dep_code: string;
  user_code: string;
  tel: number;
  description: string;
  is_fast: boolean;
};

type dataList = {
  code: string;
  name_1: string;
  for_key: string;
};

const CreateForm = () => {
  const user = JSON.parse(localStorage.getItem("user") as any);
  const auth = JSON.parse(localStorage.getItem("auth") as any);
  const token = user.token;

  const [assets, setAssets] = React.useState<dataList[] | []>([]);
  const [assLocation, setAssLocation] = React.useState<dataList[] | []>([]);
  const [department, setDepartment] = React.useState<dataList[] | []>([]);
  const [userList, setUserList] = React.useState<dataList[] | []>([]);
  const [category, setCategory] = React.useState<dataList[] | []>([]);
  const [helpType, setHelpType] = React.useState<dataList[] | []>([]);
  const [loadPage, setLoadPage] = React.useState(false);
  const [locaValue, setLocaValue] = React.useState("");
  const [cateValue, setCateValue] = React.useState("");

  const loadData = async () => {
    setLoadPage(true);
    axios
      .get("https://localhost:44348/api/assets", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoadPage(false);
        const json = res.data;
        setAssets(json.data.assets);
        setAssLocation(json.data.assetLocation);
        setDepartment(json.data.department);
        setUserList(json.data.userList);
        setCategory(json.data.category);
        setHelpType(json.data.help_type);
      })
      .catch((error) => {
        setLoadPage(false);
        console.log(error);
      });
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const setLocation = (location_code: string) => {
    setLocaValue(location_code);
  };

  const newLocation = assLocation.filter((row) => {
    return row.code == locaValue;
  });

  const setCate = (cate_id: string) => {
    // console.log(cate_id)
    setCateValue(cate_id);
  };

  const newCate = category.filter((row) => {
    return row.code == cateValue;
  });

  const { register, handleSubmit, control, formState, reset } =
    useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    // setLoading(true);
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const [loading, setLoading] = React.useState(false);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <h3>เพิ่มรายการแจ้งซ่อม</h3>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ p: 0 }}>
          <Box display="flex" justifyContent="flex-end">
            <CustomBreadcrumbs name="เพิ่มรายการแจ้งซ่อม" isActive={true} />
          </Box>
        </Grid>
        <CustomBackdrop open={loadPage} />
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardHeader
              title="กรอกข้อมูล"
              subheader={new Date().toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            />
            <CardContent>
              <Box
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                noValidate
                autoComplete="off"
                // sx={{ "& > :not(style)": { m: 1},}}
                // sx={{
                //   "& > :not(style)": { m: 1, width: "50ch" },
                // }}
              >
                {/* <div>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2 }}
                  >
                    <List
                      dense={true}
                      subheader={
                        <Typography sx={{ fontSize: 16 }}>
                          ข้อมูลผู้แจ้ง
                        </Typography>
                      }
                    >
                      <ListItem>
                        <ListItemText
                          primary={user.profile[0].fullname}
                          secondary={"ชื่อ-สกุล"}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={`${auth.branch_code} - ${auth.branch_name}`}
                          secondary={"สาขา"}
                        />
                      </ListItem>
                    </List>
                  </Stack>
                </div> */}
                <div>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2 }}
                  >
                    <FormControl fullWidth>
                      <CustomAutocomplete
                        options={helpType}
                        control={control}
                        name="cate_code"
                        placeholder="ชนิดงานซ่อม"
                        req_name="กรุณาเลือกชนิดงานซ่อม"
                        setFunction={setCate}
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <CustomAutocomplete
                        options={newCate}
                        control={control}
                        name="type_code"
                        placeholder="ประเภทงานซ่อม"
                        req_name="กรุณาเลือกประเภทงานซ่อม"
                        // setLocation={setLocation}
                      />
                    </FormControl>
                  </Stack>
                </div>
                <div>
                  <Stack
                    sx={{ marginTop: 3 }}
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2 }}
                  >
                    <FormControl fullWidth>
                      <CustomAutocomplete
                        options={assets}
                        control={control}
                        name="asset_code"
                        placeholder="รหัสทรัพย์สิน"
                        req_name="กรุณาเลือกรหัสทรัพย์สิน"
                        setFunction={setLocation}
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <CustomAutocomplete
                        options={newLocation}
                        control={control}
                        name="location_asset"
                        placeholder="ที่ตั้งทรัพย์สิน"
                        req_name="กรุณาเลือกที่ตั้งทรัพย์สิน"
                        // setLocation={setLocation}
                      />
                    </FormControl>
                  </Stack>
                </div>
                <div>
                  <Stack
                    sx={{ marginTop: 3 }}
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2 }}
                  >
                    <FormControl fullWidth>
                      <CustomAutocomplete
                        options={department}
                        control={control}
                        name="dep_code"
                        placeholder="แผนก/ฝ่าย"
                        req_name="กรุณาเลือกแผนก/ฝ่าย"
                        // setLocation={setLocation}
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <CustomAutocomplete
                        options={userList}
                        control={control}
                        name="user_code"
                        placeholder="เลือกผู้ใช้งาน"
                        req_name="กรุณาเลือกเลือกผู้ใช้งาน"
                        // setLocation={setLocation}
                      />
                    </FormControl>
                  </Stack>
                </div>
                <div>
                  <Stack
                    sx={{ marginTop: 3 }}
                    direction={{ sx: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2 }}
                  >
                    <CustomTextField
                      control={control}
                      name="tel"
                      placeholder="เบอร์ติดต่อกลับ"
                      req_name="กรุณาระบุเบอร์ติดต่อกลับ"
                    />

                    <CustomTextField
                      control={control}
                      name="description"
                      placeholder="แจ้งอาการ"
                      req_name="กรุณาระบุอาการ"
                    />
                  </Stack>
                </div>
                <div>
                  <Box sx={{ mt: 3 }}>
                    {/* <Dropzone
                      getUploadParams={getUploadParams}
                      LayoutComponent={Layout}
                      onSubmit={handleSubmit}
                      classnas={{
                        inputLabelWithFiles: defaultClassNames.inputLabel,
                      }}
                      inputContent="เลือกไฟล์"
                    /> */}
                    <CustomFileUploader />
                  </Box>
                </div>
                <div>
                  <FormControlLabel
                    sx={{ fontWeight: "bold", mt: 3 }}
                    control={<Checkbox {...register("is_fast")} />}
                    label="เร่งด่วน"
                  />
                </div>
                <div>
                  <Stack
                    sx={{ marginTop: 3 }}
                    direction={{ sx: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2 }}
                  >
                    <LoadingButton
                      loading={loading}
                      loadingPosition="start"
                      startIcon={<SaveIcon />}
                      variant="contained"
                      type="submit"
                    >
                      <span>เข้าสู่ระบบ</span>
                    </LoadingButton>

                    <LoadingButton
                      // loading={loading}
                      // loadingPosition="start"
                      startIcon={<CancelIcon />}
                      variant="outlined"
                      type="button"
                      onClick={() => {
                        reset();
                      }}
                      // color="success"
                      // sx={{bgcolor: "#3f51b5"}}
                    >
                      <span>ยกเลิก</span>
                    </LoadingButton>
                  </Stack>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateForm;
