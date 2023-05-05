import * as React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";

interface RHFAutocompleteFieldProps<TField extends FieldValues> {
  control: Control<TField>;
  name: Path<TField>;
  placeholder?: string;
  req_name?: string;
}


export const CustomTextField = <TField extends FieldValues>(
  props: RHFAutocompleteFieldProps<TField>
) => {
  const { control, name } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: props.req_name,
      }}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <TextField
              {...field}
              required
              label={props.placeholder}
              //variant="standard"
              size="small"
              fullWidth
              type="text"
              error={error != null}
              helperText={error ? error.message : ""}
            />
          </>
        );
      }}
    />
  );
};
