import {
  DateTimePicker,
  DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";
import {
  useController,
  UseControllerProps,
  FieldValues,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  name: string;
} & UseControllerProps<T> &
  DateTimePickerProps;

export default function DateTimeInput<T extends FieldValues>({
  label,
  name,
  control,
  ...props
}: Props<T>) {
  const { field, fieldState } = useController({ name, control });

  return (
    <DateTimePicker
      label={label}
      value={field.value ? new Date(field.value) : null}
      onChange={(date) => field.onChange(new Date(date!))}
      sx={{ width: "100%" }}
      slotProps={{
        textField: {
          onBlur: field.onBlur,
          error: !!fieldState.error,
          helperText: fieldState.error?.message,
        },
      }}
      {...props}
    />
  );
}
