import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  value: string;
  name: string;
  helperText: string;
  label: string;
  error: boolean;
  handleBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  handleChange?: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  handleFocus?: {
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  };
  placeholder: string;
  type?: "text" | "password";
}

export default function CustomeFormikTextField(props: Props) {
  const {
    value,
    error,
    helperText,
    name,
    label,
    handleBlur,
    handleChange,
    placeholder,
    type = "text",
    handleFocus,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      label={label}
      name={name}
      value={value}
      fullWidth
      error={error}
      helperText={helperText}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
      placeholder={placeholder}
      variant="outlined"
      slotProps={{
        ...(type === "password" && {
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              fontFamily: "Poppins, sans-serif",
            },
          },
        }),
        inputLabel: {
          shrink: true,
          sx: {
            transform: "translate(14px, 0) scale(1)",
            position: "revert",
            fontFamily: "var(--font-poppins)",
            fontSize: "23px",
            color: "#28335B",
          },
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& legend": { display: "none" },
          "& fieldset": {
            top: 0,
            border: "2px solid #707070",
            borderRadius: "8px",
          },
          "&.Mui-focused:not(.Mui-error) fieldset": {
            borderColor: "#707070",
          },
          "& input": {
            fontFamily: " var(--font-poppins)",
            fontSize: "17px",
            height: "0.7375em",
          },
        },
        "& .MuiInputLabel-root.Mui-focused:not(.Mui-error)": {
          color: "#28335B", // label color on focus (no error)
        },
      }}
    />
  );
}
