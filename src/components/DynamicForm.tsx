import React from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
} from "react-hook-form";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
} from "@mui/material";
import { FormConfig, FormField } from "../types/incident";
import { strings } from "../constants/strings";

interface DynamicFormProps {
  config: FormConfig;
  onSubmit: SubmitHandler<Record<string, string>>;
  onCancel: () => void;
  userRole: "USER" | "ADMIN";
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  config,
  onSubmit,
  onCancel,
  userRole,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Record<string, string>>();

  const renderField = (field: FormField): React.ReactElement | null => {
    if (!field.roles.includes(userRole)) {
      return null;
    }

    return (
      <Controller
        key={field.name}
        name={field.name}
        control={control}
        rules={{
          required: field.required
            ? strings.reportIncidentModal.requiredError
            : false,
        }}
        defaultValue=""
        render={({
          field: controllerField,
        }: {
          field: ControllerRenderProps<Record<string, string>, string>;
          fieldState: ControllerFieldState;
          formState: UseFormStateReturn<Record<string, string>>;
        }) => {
          switch (field.type) {
            case "text":
              return (
                <TextField
                  {...controllerField}
                  label={field.label}
                  variant="outlined"
                  fullWidth
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message as string}
                  required={field.required}
                />
              );
            case "textarea":
              return (
                <TextField
                  {...controllerField}
                  label={field.label}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message as string}
                  required={field.required}
                />
              );
            case "select":
              return (
                <FormControl
                  fullWidth
                  error={!!errors[field.name]}
                  required={field.required}
                >
                  <InputLabel>{field.label}</InputLabel>
                  <Select {...controllerField} label={field.label}>
                    {field.options?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors[field.name] && (
                    <FormHelperText>
                      {errors[field.name]?.message as string}
                    </FormHelperText>
                  )}
                </FormControl>
              );
            default:
              console.warn(`Unhandled form field type: ${field.type}`);
              return <></>;
          }
        }}
      />
    );
  };

  const renderedFields = config.fields
    .map(renderField)
    .filter((field) => field !== null);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {renderedFields}
      <Box className="form-actions">
        <Button onClick={onCancel} color="secondary">
          {strings.dynamicForm.cancelButton}
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {strings.dynamicForm.submitButton}
        </Button>
      </Box>
    </form>
  );
};

export default DynamicForm;
