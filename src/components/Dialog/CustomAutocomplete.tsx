import * as React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface RHFAutocompleteFieldProps<
  O extends { code: string; name_1: string },
  TField extends FieldValues
> {
  control: Control<TField>;
  name: Path<TField>;
  options: O[];
  placeholder?: string;
  req_name?: string;
  setFunction?: any;
}

export const CustomAutocomplete = <
  O extends { code: string; name_1: string },
  TField extends FieldValues
>(
  props: RHFAutocompleteFieldProps<O, TField>
) => {
  const { control, options, name, setFunction } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: props.req_name,
      }}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        return (
          <>
            <Autocomplete
              blurOnSelect
              value={
                value
                  ? options.find((option) => {
                      return value === option.code;
                    }) ?? null
                  : null
              }
              getOptionLabel={(option) => {
                return option.name_1;
              }}
              onChange={(event: any, newValue) => {
                // console.log(newValue ? newValue.for_key : null);
                const loCode: any = newValue ? newValue.for_key : null;
                {setFunction && setFunction(loCode)}
                onChange(newValue ? newValue.code : null);
              }}
              options={options}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.code}>
                    {option.name_1}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={props.placeholder}
                  inputRef={ref}
                  //   variant="standard"
                  required
                  size="small"
                  error={error != null}
                  helperText={error ? error.message : ""}
                />
              )}
            />
            {/* {error ? (
              <span style={{ color: "red" }}>{error.message}</span>
            ) : null} */}
          </>
        );
      }}
    />
  );
};
