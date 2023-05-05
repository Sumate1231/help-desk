import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
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
import PhoneInput from "react-phone-number-input";
import CustomFileUploader from "../../components/Dialog/CustomFileUploader";

const getUploadParams = () => {
  return { url: "https://httpbin.org/post" };
};

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

const CreateForm = () => {
  const dataList = [
    {
      id: "",
      name_1: "เลือก",
    },
    {
      id: "1",
      name_1: "text1",
    },
    {
      id: "2",
      name_1: "text2",
    },
  ];

  const { register, handleSubmit, control ,formState,reset} = useForm<Inputs>();

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
  const [value, setValue] = React.useState()

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
                <div>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2 }}
                  >
                    <FormControl fullWidth>
                      <CustomAutocomplete
                        options={dataList}
                        control={control}
                        name="cate_code"
                        placeholder="ชนิดงานซ่อม"
                        req_name="กรุณาเลือกชนิดงานซ่อม"
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <CustomAutocomplete
                        options={dataList}
                        control={control}
                        name="type_code"
                        placeholder="ประเภทงานซ่อม"
                        req_name="กรุณาเลือกประเภทงานซ่อม"
                      />
                    </FormControl>
                  </Stack>
                </div>
                <div>
                  <Stack
                    sx={{ marginTop: 2 }}
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2 }}
                  >
                    <FormControl fullWidth>
                      <CustomAutocomplete
                        options={dataList}
                        control={control}
                        name="asset_code"
                        placeholder="รหัสทรัพย์สิน"
                        req_name="กรุณาเลือกรหัสทรัพย์สิน"
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <CustomAutocomplete
                        options={dataList}
                        control={control}
                        name="location_asset"
                        placeholder="ที่ตั้งทรัพย์สิน"
                        req_name="กรุณาเลือกที่ตั้งทรัพย์สิน"
                      />
                    </FormControl>
                  </Stack>
                </div>
                <div>
                  <Stack
                    sx={{ marginTop: 2 }}
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2 }}
                  >
                    <FormControl fullWidth>
                      <CustomAutocomplete
                        options={dataList}
                        control={control}
                        name="dep_code"
                        placeholder="แผนก/ฝ่าย"
                        req_name="กรุณาเลือกแผนก/ฝ่าย"
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <CustomAutocomplete
                        options={dataList}
                        control={control}
                        name="user_code"
                        placeholder="เลือกผู้ใช้งาน"
                        req_name="กรุณาเลือกเลือกผู้ใช้งาน"
                      />
                    </FormControl>
                  </Stack>
                </div>
                <div>
                  <Stack
                    sx={{ marginTop: 2 }}
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
                  <Box sx={{ mt: 2 }}>
                    {/* <Dropzone
                      getUploadParams={getUploadParams}
                      LayoutComponent={Layout}
                      onSubmit={handleSubmit}
                      classnas={{
                        inputLabelWithFiles: defaultClassNames.inputLabel,
                      }}
                      inputContent="เลือกไฟล์"
                    /> */}
                    <CustomFileUploader/>
                  </Box>
                </div>
                <div>
                  <FormControlLabel
                    sx={{ fontWeight: "bold", mt: 2 }}
                    control={<Checkbox {...register("is_fast")} />}
                    label="เร่งด่วน"
                  />
                </div>
                <div>
                  <Stack
                    sx={{ marginTop: 2 }}
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
                      onClick={() => {reset()}}
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
