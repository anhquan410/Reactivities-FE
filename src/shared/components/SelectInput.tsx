import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  options: { text: string; value: string }[];
  label: string;
} & UseControllerProps<T> &
  SelectProps;

function SelectInput<T extends FieldValues>({
  options,
  label,
  control,
  name,
  ...props
}: Props<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} {...field} {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}

export default SelectInput;
