import { TextField, TextFieldProps } from "@mui/material";
import {
  useController,
  UseControllerProps,
  FieldValues,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  name: string;
} & UseControllerProps<T> &
  TextFieldProps;

export default function TextInput<T extends FieldValues>({
  label,
  name,
  control,
  ...props
}: Props<T>) {
  const { field, fieldState } = useController({ name, control });

  return (
    <TextField
      {...props}
      {...field}
      fullWidth
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      label={label}
    />
  );
}
